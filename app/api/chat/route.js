import { NextResponse } from "next/server";
import { normalizeQuery } from "@/lib/chatbot/query-normalizer";
import {
  buildConversationContext,
  limitConversationHistory,
} from "@/lib/chatbot/context-manager";
import { evaluateScope } from "@/lib/chatbot/scope-guard";
import { detectIntent } from "@/lib/chatbot/intent-detector";
import { retrieveKnowledge } from "@/lib/chatbot/retriever";
import { generateFollowUps } from "@/lib/chatbot/follow-up-generator";
import { generateFallbackResponse } from "@/lib/chatbot/fallback-generator";
import { validateResponse } from "@/lib/chatbot/response-validator";
import { generateWithProviders } from "@/lib/chatbot/providers";
import { providerMetrics } from "@/lib/chatbot/providers/index";
import { checkLeadSecurity } from "@/lib/chatbot/lead-qualification";
import { chatCache, buildChatCacheKey } from "@/lib/chatbot/cache";
import { chatRateLimiter } from "@/lib/chatbot/rate-limiter";
import { logChatRequest } from "@/lib/chatbot/logger";

function buildPromptInjectionResponse(input) {
  const msg =
    "I’m designed to assist only with GateXPay services, integrations, onboarding, and verified website information. Please share whether you need assistance with a payment gateway, CSP solution, enterprise API, or another GateXPay service.";
  const followUps = [
    "Explore payment gateway integration?",
    "Learn about CSP services?",
    "Discuss a custom technology requirement?",
  ];
  return {
    success: true,
    message: msg,
    response: msg,
    reply: msg,
    followUps,
    suggestions: followUps,
    intent: "out_of_scope",
    requiresClarification: false,
    requestId: input.requestId,
  };
}

function buildOutOfScopeResponse(input) {
  const msg =
    "I’m designed to assist with GateXPay products, payment solutions, retail financial technology services, API integrations, and merchant onboarding. I cannot provide an answer to that external topic, but I can help you identify the most suitable GateXPay solution for your website, application, retail network, or business. Please share what type of payment or technology requirement you are working on.";
  const followUps = [
    "Explore payment gateway services?",
    "Learn about CSP solutions?",
    "Discuss a custom API integration?",
  ];
  return {
    success: true,
    message: msg,
    response: msg,
    reply: msg,
    followUps,
    suggestions: followUps,
    intent: "out_of_scope",
    requiresClarification: false,
    requestId: input.requestId,
  };
}

function buildClarificationResponse(input) {
  const msg =
    "I don't have verified information about that topic in the GateXPay knowledge base. Could you clarify whether you are asking about GateXPay’s payment gateway integration, CSP onboarding, or custom API development?";
  const followUps = [
    "What services does GateXPay offer?",
    "Payment gateway integration?",
    "CSP onboarding?",
  ];
  return {
    success: true,
    message: msg,
    response: msg,
    reply: msg,
    followUps,
    suggestions: followUps,
    intent: input.intent || "unclear",
    topic: input.topic || "unclear",
    requiresClarification: true,
    requestId: input.requestId,
  };
}

function buildSafeErrorResponse(input) {
  const msg = "Connection error. Please check your network and try again.";
  const followUps = [
    "What services do you offer?",
    "What are CSP and TSP services?",
    "How do I integrate the payment gateway?",
  ];
  return {
    success: false,
    message: msg,
    response: msg,
    reply: msg,
    followUps,
    suggestions: followUps,
    intent: "unclear",
    requiresClarification: false,
    requestId: input.requestId,
  };
}

export async function POST(req) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  // 1. IP Rate Limiting Check
  const ip = req.ip || req.headers.get("x-forwarded-for") || "127.0.0.1";
  if (chatRateLimiter.isRateLimited(ip)) {
    const rateLimitMsg =
      "Too many requests. Please wait a moment before trying again.";
    const followUps = [
      "What services do you offer?",
      "What are CSP and TSP services?",
      "How do I integrate the payment gateway?",
    ];
    logChatRequest({
      requestId,
      durationMs: Date.now() - startTime,
      quotaFailures: 0,
      retries: 0,
      cacheHit: false,
      fallbackUsed: false,
      provider: "rate_limit",
    });
    return NextResponse.json(
      {
        success: false,
        message: rateLimitMsg,
        response: rateLimitMsg,
        reply: rateLimitMsg,
        followUps,
        suggestions: followUps,
        intent: "unclear",
        requiresClarification: false,
        requestId,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const messages = body?.messages;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const history = limitConversationHistory(messages);
    const latestMessage = history[history.length - 1];

    if (!latestMessage || latestMessage.role !== "user") {
      return NextResponse.json(
        { error: "A valid user message is required." },
        { status: 400 }
      );
    }

    // 2. Sensitive Credential / PII Check (Card numbers, CVV, OTP)
    const securityCheck = checkLeadSecurity(latestMessage.content);
    if (!securityCheck.isSafe) {
      const warningMsg = securityCheck.warningMessage || "";
      const followUps = [
        "What services do you offer?",
        "What are CSP and TSP services?",
        "How do I integrate the payment gateway?",
      ];
      logChatRequest({
        requestId,
        durationMs: Date.now() - startTime,
        cacheHit: false,
        fallbackUsed: false,
        provider: "security_filter",
      });
      return NextResponse.json({
        success: true,
        message: warningMsg,
        response: warningMsg,
        reply: warningMsg,
        followUps,
        suggestions: followUps,
        intent: "unclear",
        requiresClarification: false,
        requestId,
      });
    }

    // 3. Normalization & Context Reconstruction
    const normalizedQuery = normalizeQuery(latestMessage.content);
    const context = buildConversationContext(history);

    // 4. Scope Guard Evaluation (Prompt Injections & Off-Topic Filtering)
    const scope = evaluateScope(normalizedQuery, context);
    if (scope.status === "prompt_injection") {
      logChatRequest({
        requestId,
        durationMs: Date.now() - startTime,
        cacheHit: false,
        fallbackUsed: false,
        provider: "scope_guard",
      });
      return NextResponse.json(buildPromptInjectionResponse({ requestId }));
    }
    if (scope.status === "out_of_scope") {
      logChatRequest({
        requestId,
        durationMs: Date.now() - startTime,
        cacheHit: false,
        fallbackUsed: false,
        provider: "scope_guard",
      });
      return NextResponse.json(buildOutOfScopeResponse({ requestId }));
    }

    // 5. Intent Detection
    const intent = detectIntent({
      query: normalizedQuery,
      context,
    });

    // 6. Context-Aware Cache Lookup
    const cacheKey = buildChatCacheKey({
      normalizedQuery,
      intent,
      activeProduct: context.activeProduct,
      detectedLanguage: normalizedQuery.detectedLanguage,
    });

    if (cacheKey) {
      const cachedResponse = chatCache.get(cacheKey);
      if (cachedResponse) {
        const durationMs = Date.now() - startTime;
        logChatRequest({
          requestId,
          durationMs,
          cacheHit: true,
          fallbackUsed: false,
          provider: "cache",
        });
        return NextResponse.json({
          success: true,
          message: cachedResponse.reply,
          response: cachedResponse.reply,
          reply: cachedResponse.reply,
          followUps: cachedResponse.followUps,
          suggestions: cachedResponse.followUps,
          intent: cachedResponse.intent,
          topic: cachedResponse.topic,
          requiresClarification: false,
          confidence: 1.0,
          requestId,
        });
      }
    }

    // 7. Grounded Knowledge Retrieval
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

    // 8. If query is unsupported / unclear with no verified matches, return clarification immediately
    if (intent === "unclear" && !retrieval.hasStrongMatch) {
      const durationMs = Date.now() - startTime;
      logChatRequest({
        requestId,
        durationMs,
        retries: 0,
        quotaFailures: 0,
        cacheHit: false,
        fallbackUsed: false,
        provider: "clarification",
      });
      return NextResponse.json(
        buildClarificationResponse({
          intent,
          topic: context.activeProduct,
          requestId,
        })
      );
    }

    // 9. Try Live AI Provider (Gemini -> Groq -> OpenRouter -> Azure)
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
        const activeFollowUps = validation.extractedFollowUps || followUps;

        // Cache the verified response
        if (cacheKey) {
          chatCache.set(
            cacheKey,
            {
              reply: validation.sanitizedResponse,
              followUps: activeFollowUps,
              intent,
              topic: context.activeProduct || intent,
            },
            5 * 60 * 1000
          );
        }

        logChatRequest({
          requestId,
          provider: providerResult.provider,
          durationMs,
          retries: providerMetrics.retries,
          quotaFailures: providerMetrics.quotaFailures,
          cacheHit: false,
          fallbackUsed: false,
        });

        return NextResponse.json({
          success: true,
          message: validation.sanitizedResponse,
          response: validation.sanitizedResponse,
          reply: validation.sanitizedResponse,
          followUps: activeFollowUps,
          suggestions: activeFollowUps,
          intent,
          topic: context.activeProduct || intent,
          requiresClarification: false,
          confidence: retrieval.confidence,
          requestId,
        });
      }
    }

    // 10. Local Tailored Deterministic Fallback Response
    const fallback = generateFallbackResponse({
      intent,
      context,
      knowledge: retrieval.items,
      query: normalizedQuery,
      followUps,
      requestId,
    });

    // Cache the deterministic fallback
    if (cacheKey && !fallback.requiresClarification) {
      chatCache.set(
        cacheKey,
        {
          reply: fallback.message,
          followUps: fallback.followUps,
          intent,
          topic: fallback.topic,
        },
        5 * 60 * 1000
      );
    }

    const durationMs = Date.now() - startTime;
    logChatRequest({
      requestId,
      durationMs,
      retries: providerMetrics.retries,
      quotaFailures: providerMetrics.quotaFailures,
      cacheHit: false,
      fallbackUsed: true,
      provider: "local_fallback",
    });

    return NextResponse.json({
      ...fallback,
      response: fallback.message,
      reply: fallback.message,
      suggestions: fallback.followUps,
    });
  } catch (error) {
    console.error(`[ERROR] Chat API exception. Request ID: ${requestId}. Error:`, error);
    logChatRequest({
      requestId,
      durationMs: Date.now() - startTime,
      cacheHit: false,
      fallbackUsed: false,
      provider: "error",
    });
    return NextResponse.json(buildSafeErrorResponse({ requestId }), {
      status: 500,
    });
  }
}
