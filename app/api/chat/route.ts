import { NextRequest, NextResponse } from 'next/server';
import { normalizeQuery } from '@/lib/chatbot/query-normalizer';
import { buildConversationContext, limitConversationHistory } from '@/lib/chatbot/context-manager';
import { evaluateScope } from '@/lib/chatbot/scope-guard';
import { detectIntent } from '@/lib/chatbot/intent-detector';
import { retrieveKnowledge } from '@/lib/chatbot/retriever';
import { generateFollowUps } from '@/lib/chatbot/follow-up-generator';
import { generateFallbackResponse } from '@/lib/chatbot/fallback-generator';
import { validateResponse } from '@/lib/chatbot/response-validator';
import { generateWithProviders } from '@/lib/chatbot/providers';
import { providerMetrics } from '@/lib/chatbot/providers/index';
import { checkLeadSecurity } from '@/lib/chatbot/lead-qualification';
import { ChatIntent } from '@/lib/chatbot/types';
import { chatCache } from '@/lib/chatbot/cache';
import { chatRateLimiter } from '@/lib/chatbot/rate-limiter';
import { logChatRequest } from '@/lib/chatbot/logger';

function buildPromptInjectionResponse(input: { requestId: string }) {
  const msg = 'I’m designed to assist only with GateXPay services, integrations, onboarding, and verified website information. Please share whether you need assistance with a payment gateway, CSP solution, enterprise API, or another GateXPay service.';
  const followUps = [
    'Explore payment gateway integration?',
    'Learn about CSP services?',
    'Discuss a custom technology requirement?'
  ];
  return {
    success: true,
    message: msg,
    response: msg, // Legacy compatibility
    reply: msg, // Legacy compatibility
    followUps,
    suggestions: followUps, // Legacy compatibility
    intent: 'out_of_scope' as ChatIntent,
    requiresClarification: false,
    requestId: input.requestId
  };
}

function buildOutOfScopeResponse(input: { requestId: string }) {
  const msg = 'I’m designed to assist with GateXPay products, payment solutions, retail financial technology services, API integrations, and merchant onboarding. I cannot provide an answer to that external topic, but I can help you identify the most suitable GateXPay solution for your website, application, retail network, or business. Please share what type of payment or technology requirement you are working on.';
  const followUps = [
    'Explore payment gateway services?',
    'Learn about CSP solutions?',
    'Discuss a custom API integration?'
  ];
  return {
    success: true,
    message: msg,
    response: msg, // Legacy compatibility
    reply: msg, // Legacy compatibility
    followUps,
    suggestions: followUps, // Legacy compatibility
    intent: 'out_of_scope' as ChatIntent,
    requiresClarification: false,
    requestId: input.requestId
  };
}

function buildClarificationResponse(input: { intent: ChatIntent; topic?: string; requestId: string }) {
  const msg = 'Could you clarify whether you are asking about GateXPay’s payment gateway integration, CSP onboarding, or custom API development?';
  const followUps = [
    'Payment gateway integration?',
    'CSP onboarding?',
    'Custom API development?'
  ];
  return {
    success: true,
    message: msg,
    response: msg, // Legacy compatibility
    reply: msg, // Legacy compatibility
    followUps,
    suggestions: followUps, // Legacy compatibility
    intent: input.intent,
    topic: input.topic,
    requiresClarification: true,
    requestId: input.requestId
  };
}

function buildSafeErrorResponse(input: { requestId: string }) {
  const msg = 'Connection error. Please check your network and try again.';
  const followUps = [
    'What services do you offer?',
    'What are CSP and TSP services?',
    'How do I integrate the payment gateway?'
  ];
  return {
    success: false,
    message: msg,
    response: msg, // Legacy compatibility
    reply: msg, // Legacy compatibility
    followUps,
    suggestions: followUps, // Legacy compatibility
    intent: 'unclear' as ChatIntent,
    requiresClarification: false,
    requestId: input.requestId
  };
}

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  // 1. IP Rate Limiting Check
  const ip = (req as any).ip || req.headers.get('x-forwarded-for') || '127.0.0.1';
  if (chatRateLimiter.isRateLimited(ip)) {
    const rateLimitMsg = 'Too many requests. Please wait a moment before trying again.';
    const followUps = [
      'What services do you offer?',
      'What are CSP and TSP services?',
      'How do I integrate the payment gateway?'
    ];
    logChatRequest({
      requestId,
      durationMs: Date.now() - startTime,
      quotaFailures: 0,
      retries: 0,
      cacheHit: false,
      fallbackUsed: false,
      provider: 'rate_limit'
    });
    return NextResponse.json({
      success: false,
      message: rateLimitMsg,
      response: rateLimitMsg, // Legacy compatibility
      reply: rateLimitMsg, // Legacy compatibility
      followUps,
      suggestions: followUps, // Legacy compatibility
      intent: 'unclear' as ChatIntent,
      requiresClarification: false,
      requestId
    }, { status: 429 });
  }

  try {
    const body = await req.json();
    const messages = body?.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const history = limitConversationHistory(messages);
    const latestMessage = history[history.length - 1];

    if (!latestMessage || latestMessage.role !== 'user') {
      return NextResponse.json({ error: 'A valid user message is required.' }, { status: 400 });
    }

    // Lead Security Check (blocks cards/PINs/CVVs leakage)
    const securityCheck = checkLeadSecurity(latestMessage.content);
    if (!securityCheck.isSafe) {
      const warningMsg = securityCheck.warningMessage || '';
      const followUps = [
        'What services do you offer?',
        'What are CSP and TSP services?',
        'How do I integrate the payment gateway?'
      ];
      logChatRequest({
        requestId,
        durationMs: Date.now() - startTime,
        cacheHit: false,
        fallbackUsed: false,
        provider: 'security_filter'
      });
      return NextResponse.json({
        success: true,
        message: warningMsg,
        response: warningMsg,
        reply: warningMsg, // Legacy compatibility
        followUps,
        suggestions: followUps, // Legacy compatibility
        intent: 'unclear' as ChatIntent,
        requiresClarification: false,
        requestId
      });
    }

    const normalizedQuery = normalizeQuery(latestMessage.content);
    const context = buildConversationContext(history);
    
    // 2. Cache Lookup
    const cacheKey = normalizedQuery.normalized;
    const cachedResponse = chatCache.get(cacheKey);
    if (cachedResponse) {
      const durationMs = Date.now() - startTime;
      console.log(`[INFO] Cache hit for query: "${cacheKey}"`);
      logChatRequest({
        requestId,
        durationMs,
        cacheHit: true,
        fallbackUsed: false,
        provider: 'cache'
      });
      return NextResponse.json({
        success: true,
        message: cachedResponse.reply,
        response: cachedResponse.reply, // Legacy compatibility
        reply: cachedResponse.reply, // Legacy compatibility
        followUps: cachedResponse.followUps,
        suggestions: cachedResponse.followUps, // Legacy compatibility
        intent: cachedResponse.intent,
        topic: cachedResponse.topic,
        requiresClarification: false,
        requestId
      });
    }

    const scope = evaluateScope(normalizedQuery, context);

    if (scope.status === 'prompt_injection') {
      logChatRequest({
        requestId,
        durationMs: Date.now() - startTime,
        cacheHit: false,
        fallbackUsed: false,
        provider: 'scope_guard'
      });
      return NextResponse.json(buildPromptInjectionResponse({ requestId }));
    }

    if (scope.status === 'out_of_scope') {
      logChatRequest({
        requestId,
        durationMs: Date.now() - startTime,
        cacheHit: false,
        fallbackUsed: false,
        provider: 'scope_guard'
      });
      return NextResponse.json(buildOutOfScopeResponse({ requestId }));
    }

    const intent = detectIntent({
      query: normalizedQuery,
      context,
    });

    const retrieval = retrieveKnowledge({
      query: normalizedQuery,
      intent,
      context,
    });

    const followUps = generateFollowUps({
      intent,
      context,
      knowledge: retrieval.items,
    });

    // Try live AI providers (Gemini -> Groq -> OpenRouter -> Azure)
    const providerResult = await generateWithProviders({
      history,
      intent,
      context,
      knowledge: retrieval.items,
    });

    if (providerResult) {
      const validation = validateResponse({
        response: providerResult.message,
        intent,
        scope,
        knowledge: retrieval.items,
      });

      if (validation.valid && validation.sanitizedResponse) {
        const durationMs = Date.now() - startTime;
        console.log(`[INFO] Chat API resolved via ${providerResult.provider} in ${durationMs}ms. Request ID: ${requestId}`);
        
        // 3. Cache the successful sanitized response (5 minutes TTL)
        chatCache.set(cacheKey, {
          reply: validation.sanitizedResponse,
          followUps,
          intent,
          topic: context.activeTopic
        }, 5 * 60 * 1000);

        logChatRequest({
          requestId,
          provider: providerResult.provider,
          durationMs,
          retries: providerMetrics.retries,
          quotaFailures: providerMetrics.quotaFailures,
          cacheHit: false,
          fallbackUsed: false
        });
        
        return NextResponse.json({
          success: true,
          message: validation.sanitizedResponse,
          response: validation.sanitizedResponse, // Legacy compatibility for Chatbot.tsx
          reply: validation.sanitizedResponse, // Legacy compatibility
          followUps,
          suggestions: followUps, // Legacy compatibility
          intent,
          topic: context.activeTopic,
          requiresClarification: false,
          confidence: retrieval.confidence,
          requestId,
        });
      } else {
        console.warn(`[WARN] AI response failed output validation: ${validation.violations.join(', ')}. Falling back to local response.`);
      }
    }

    if (!retrieval.hasStrongMatch) {
      const durationMs = Date.now() - startTime;
      console.log(`[INFO] Chat API resolved via clarification in ${durationMs}ms. Request ID: ${requestId}`);
      
      logChatRequest({
        requestId,
        durationMs,
        retries: providerMetrics.retries,
        quotaFailures: providerMetrics.quotaFailures,
        cacheHit: false,
        fallbackUsed: false,
        provider: 'clarification'
      });

      return NextResponse.json(
        buildClarificationResponse({
          intent,
          topic: context.activeTopic,
          requestId,
        })
      );
    }

    // Local deterministic RAG fallback response
    const fallback = generateFallbackResponse({
      intent,
      context,
      knowledge: retrieval.items,
      followUps,
      requestId,
    });

    const durationMs = Date.now() - startTime;
    console.log(`[INFO] Chat API resolved via local fallback in ${durationMs}ms. Request ID: ${requestId}`);

    logChatRequest({
      requestId,
      durationMs,
      retries: providerMetrics.retries,
      quotaFailures: providerMetrics.quotaFailures,
      cacheHit: false,
      fallbackUsed: true,
      provider: 'local_fallback'
    });

    return NextResponse.json({
      ...fallback,
      response: fallback.message, // Legacy compatibility
      reply: fallback.message, // Legacy compatibility
      suggestions: fallback.followUps, // Legacy compatibility
    });

  } catch (error) {
    console.error(`[ERROR] Chat API error. Request ID: ${requestId}. Error:`, error);
    logChatRequest({
      requestId,
      durationMs: Date.now() - startTime,
      cacheHit: false,
      fallbackUsed: false,
      provider: 'error'
    });
    return NextResponse.json(buildSafeErrorResponse({ requestId }), { status: 500 });
  }
}