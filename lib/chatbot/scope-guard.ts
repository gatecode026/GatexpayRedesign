import { NormalizedQuery, ConversationContext, ScopeEvaluation } from './types';

const PROMPT_INJECTION_KEYWORDS = [
  'ignore previous instructions',
  'ignore all previous instructions',
  'ignore rules',
  'system prompt',
  'ignore all instructions',
  'override rules',
  'forget instructions',
  'you are now a',
  'jailbreak'
];

const FINTECH_KEYWORDS = [
  'gatexpay', 'gate', 'pay', 'payment', 'gateway', 'pg', 'upi', 'card', 
  'visa', 'mastercard', 'rupay', 'aeps', 'aadhaar', 'atm', 'micro atm', 
  'matm', 'money transfer', 'bbps', 'bill', 'recharge', 'pan', 'pancard', 
  'fintech', 'api', 'banking', 'integration', 'onboarding', 'settlement', 
  'charge', 'pricing', 'cost', 'fee', 'commission', 'support', 'contact', 
  'office', 'address', 'kyc', 'compliance', 'redressal', 'founder', 
  'ceo', 'cfo', 'vansh', 'govind'
];

const OUT_OF_SCOPE_TOPICS = [
  'weather', 'politics', 'president', 'prime minister', 'election', 
  'recipe', 'joke', 'poem', 'story', 'medical', 'medicine', 'disease', 
  'legal advice', 'lawsuit', 'homework', 'assignment', 'cryptocurrency mining',
  'bitcoin mining', 'crypto mining'
];

export function evaluateScope(
  query: NormalizedQuery,
  context?: ConversationContext
): ScopeEvaluation {
  const normText = query.normalized;

  // 1. Prompt Injection Detection
  const hasInjection = PROMPT_INJECTION_KEYWORDS.some(kw => normText.includes(kw));
  if (hasInjection) {
    return {
      status: 'prompt_injection',
      isPromptInjection: true,
      reason: 'Detected potential prompt injection attempt.'
    };
  }

  // 2. Explicit Out of Scope Topics Check
  const isExplicitlyOut = OUT_OF_SCOPE_TOPICS.some(topic => normText.includes(topic));
  if (isExplicitlyOut) {
    return {
      status: 'out_of_scope',
      isPromptInjection: false,
      reason: 'Query covers an explicitly disallowed out-of-scope topic.'
    };
  }

  // 3. Fintech / GateXPay Keywords Match
  const hasFintechKeyword = FINTECH_KEYWORDS.some(kw => normText.includes(kw));
  if (hasFintechKeyword) {
    return {
      status: 'in_scope',
      isPromptInjection: false
    };
  }

  // 4. Contextual Scope Check
  // If we have an active topic/intent in the conversation history, then implicit questions (e.g. "how to integrate?") are in-scope.
  if (context && (context.activeTopic || context.activeIntent)) {
    return {
      status: 'in_scope',
      isPromptInjection: false
    };
  }

  // 5. Implicit Business/Support questions check (e.g. "how long does it take?", "can I use this for my store?")
  if (
    normText.includes('how quickly') || 
    normText.includes('how long') || 
    normText.includes('how much') ||
    normText.includes('cost') ||
    normText.includes('checkout') ||
    normText.includes('suitable for') ||
    normText.includes('work with') ||
    normText.includes('integrate') ||
    normText.includes('registration')
  ) {
    return {
      status: 'uncertain',
      isPromptInjection: false
    };
  }

  // 6. Generic coding tasks check (e.g., "write a python function to sort")
  if (
    (normText.includes('write a') && (normText.includes('code') || normText.includes('function') || normText.includes('script') || normText.includes('program'))) &&
    !normText.includes('gatexpay') && !normText.includes('api')
  ) {
    return {
      status: 'out_of_scope',
      isPromptInjection: false,
      reason: 'Generic coding request unrelated to GateXPay.'
    };
  }

  // 7. Otherwise, mark as uncertain so the retriever/intent-detector can verify
  return {
    status: 'uncertain',
    isPromptInjection: false
  };
}
