import { ConversationContext, ChatIntent } from './types';
import { CHATBOT_CONFIG } from './config';

export function limitConversationHistory(messages: any[]): any[] {
  const maxLimit = CHATBOT_CONFIG.limits.maxHistoryLength;
  if (messages.length > maxLimit) {
    return messages.slice(-maxLimit);
  }
  return messages;
}

export function buildConversationContext(history: any[]): ConversationContext {
  const context: ConversationContext = {
    previousQuestions: [],
    collectedLeadData: {}
  };

  // Traverse history to recover previous state
  for (const msg of history) {
    if (!msg || !msg.content) continue;
    const content = msg.content.toLowerCase();

    if (msg.role === 'user') {
      context.previousQuestions?.push(msg.content);
      
      // Basic business type heuristic
      if (content.includes('grocery') || content.includes('shop') || content.includes('store') || content.includes('e-commerce')) {
        context.businessType = 'retail/e-commerce';
      }
      
      // Integration platform heuristics
      if (content.includes('react native') || content.includes('flutter') || content.includes('android') || content.includes('ios') || content.includes('mobile app')) {
        context.integrationPlatform = 'mobile_app';
      } else if (content.includes('wordpress') || content.includes('woocommerce') || content.includes('shopify') || content.includes('website')) {
        context.integrationPlatform = 'website';
      }
    }

    if (msg.role === 'assistant') {
      // Restore topic based on content clues
      if (content.includes('payment gateway')) {
        context.activeTopic = 'payment_gateway';
        context.activeIntent = 'payment_gateway';
      } else if (content.includes('aeps') || content.includes('aadhaar')) {
        context.activeTopic = 'aeps';
        context.activeIntent = 'aeps';
      } else if (content.includes('micro atm') || content.includes('matm')) {
        context.activeTopic = 'micro_atm';
        context.activeIntent = 'micro_atm';
      } else if (content.includes('csp')) {
        context.activeTopic = 'csp_services';
        context.activeIntent = 'csp_services';
      } else if (content.includes('tsp')) {
        context.activeTopic = 'tsp_services';
        context.activeIntent = 'tsp_services';
      }
    }
  }

  return context;
}
