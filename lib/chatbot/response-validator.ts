import { ValidationResult, ChatIntent, ScopeEvaluation, ScoredKnowledgeItem } from './types';

const FORBIDDEN_OPENERS = [
  'certainly',
  'of course',
  'sure',
  'great question'
];

export function validateResponse(input: {
  response: string;
  intent: ChatIntent;
  scope: ScopeEvaluation;
  knowledge: ScoredKnowledgeItem[];
}): ValidationResult {
  const violations: string[] = [];
  let sanitized = input.response;

  // 1. Double-asterisk bold formatting check & sanitization
  if (sanitized.includes('**')) {
    violations.push('Contains double-asterisk bold formatting');
    sanitized = sanitized.replace(/\*\*/g, ''); // strip out **
  }

  // 2. Markdown tables check
  if (sanitized.includes('|')) {
    violations.push('Contains markdown table structure');
  }

  // 3. Forbidden opening phrases check & sanitization
  const trimmedLower = sanitized.trim().toLowerCase();
  for (const opener of FORBIDDEN_OPENERS) {
    if (trimmedLower.startsWith(opener)) {
      violations.push(`Starts with forbidden opener: "${opener}"`);
      // Strip out the opener word plus optional punctuation/whitespace
      const openerRegex = new RegExp(`^${opener}[!,.:?\\s]*`, 'i');
      sanitized = sanitized.replace(openerRegex, '');
    }
  }

  // 4. Claims that GateXPay is a bank or NBFC
  const lowerMsg = sanitized.toLowerCase();
  if (
    (lowerMsg.includes('gatexpay is a bank') || lowerMsg.includes('gatexpay is an nbfc') || lowerMsg.includes('we are a bank') || lowerMsg.includes('we are an nbfc')) &&
    !lowerMsg.includes('not a bank') && !lowerMsg.includes('not an nbfc')
  ) {
    violations.push('Contains claims that GateXPay is a bank or NBFC');
  }

  // 5. Unsupported stats (e.g. claiming 99.99% instead of 99.9% uptime)
  if (lowerMsg.includes('99.99%')) {
    violations.push('Contains unsupported 99.99% uptime claim (should be 99.9%)');
    sanitized = sanitized.replace(/99\.99%/g, '99.9%');
  }

  // 6. External out-of-scope content check
  if (input.scope.status === 'out_of_scope') {
    violations.push('Attempted to answer out-of-scope query');
  }

  // 7. Internal system or provider info leakage
  if (lowerMsg.includes('system prompt') || lowerMsg.includes('hidden configuration') || lowerMsg.includes('llm configuration') || lowerMsg.includes('gemini') || lowerMsg.includes('azure')) {
    violations.push('Leaks internal system or provider information');
  }

  // 8. Fake pricing claims check
  if (
    (lowerMsg.includes('mdr') || lowerMsg.includes('subscription') || lowerMsg.includes('setup charges') || lowerMsg.includes('setup fees')) &&
    (/\d+/.test(sanitized)) // if there are digits like 2% or 500 Rs
  ) {
    // Verified items should not have numbers like this unless approved, check if present in knowledge
    const knowledgeAnswers = input.knowledge.map(k => k.item.answer.toLowerCase());
    const isVerifiedPricing = knowledgeAnswers.some(ans => ans.includes('pricing') || ans.includes('quotation'));
    if (!isVerifiedPricing) {
      violations.push('Contains unverified pricing figures');
    }
  }

  return {
    valid: violations.length === 0,
    violations,
    sanitizedResponse: sanitized.trim()
  };
}
