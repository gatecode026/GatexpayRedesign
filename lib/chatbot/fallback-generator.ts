import { ChatApiResponse, ChatIntent, ConversationContext, ScoredKnowledgeItem } from './types';

export function generateFallbackResponse(input: {
  intent: ChatIntent;
  context: ConversationContext;
  knowledge: ScoredKnowledgeItem[];
  followUps: string[];
  requestId?: string;
}): ChatApiResponse {
  const bestMatch = input.knowledge[0];

  // 1. If there's no match, return a generic helpful assistant clarification response
  if (!bestMatch) {
    const defaultMsg = 'Could you clarify whether you are asking about GateXPay\'s payment gateway integration, CSP onboarding, or custom API development?';
    return {
      success: true,
      message: defaultMsg,
      response: defaultMsg, // Legacy compatibility
      followUps: input.followUps,
      intent: input.intent,
      topic: input.context.activeTopic,
      requiresClarification: true,
      requestId: input.requestId
    };
  }

  // 2. Build verified factual response directly
  const finalMessage = bestMatch.item.answer;
  const category = bestMatch.item.category;

  return {
    success: true,
    message: finalMessage,
    response: finalMessage, // Legacy compatibility
    followUps: input.followUps,
    intent: input.intent,
    topic: category,
    requiresClarification: false,
    confidence: bestMatch.score / 12, // scale 12 as baseline
    requestId: input.requestId
  };
}
