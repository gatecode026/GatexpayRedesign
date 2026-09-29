import { NormalizedQuery, ConversationContext, ChatIntent } from './types';

interface IntentRule {
  intent: ChatIntent;
  keywords: string[];
  phrases?: string[];
}

const INTENT_RULES: IntentRule[] = [
  {
    intent: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'hyy', 'hy', 'hii', 'hiii', 'greetings', 'hola', 'morning', 'afternoon', 'gmorning', 'gevening']
  },
  {
    intent: 'gratitude',
    keywords: ['thanks', 'thank you', 'appreciate', 'thankyou', 'great', 'awesome', 'nice']
  },
  {
    intent: 'about_company',
    keywords: ['about', 'overview', 'who', 'vansh', 'govind', 'founder', 'founders', 'ceo', 'cfo', 'owner']
  },
  {
    intent: 'csp_services',
    keywords: ['csp', 'retail', 'agent', 'retailer']
  },
  {
    intent: 'tsp_services',
    keywords: ['tsp', 'technology', 'enterprise']
  },
  {
    intent: 'payment_gateway',
    keywords: ['gateway', 'pg', 'payment gateway', 'upi', 'card', 'cards', 'visa', 'mastercard', 'rupay', 'checkout', 'scan']
  },
  {
    intent: 'aeps',
    keywords: ['aeps', 'aadhaar', 'fingerprint', 'biometric']
  },
  {
    intent: 'micro_atm',
    keywords: ['micro atm', 'matm', 'swipe', 'pos machine', 'terminal']
  },
  {
    intent: 'bbps',
    keywords: ['bbps', 'bill', 'recharge', 'electricity', 'water', 'gas', 'broadband']
  },
  {
    intent: 'money_transfer',
    keywords: ['transfer', 'dmt', 'money transfer', 'imps', 'neft']
  },
  {
    intent: 'api_integration',
    keywords: ['api', 'apis', 'sdk', 'plugin', 'integration']
  },
  {
    intent: 'custom_development',
    keywords: ['development', 'web', 'app', 'react native', 'flutter', 'android', 'ios', 'custom software']
  },
  {
    intent: 'pricing',
    keywords: ['pricing', 'cost', 'fee', 'charges', 'mdr', 'rates', 'commission']
  },
  {
    intent: 'onboarding',
    keywords: ['onboarding', 'document', 'documents', 'apply', 'registration', 'register']
  },
  {
    intent: 'documentation',
    keywords: ['documentation', 'docs', 'manual', 'guide']
  },
  {
    intent: 'security',
    keywords: ['security', 'safe', 'pci', 'compliant', 'compliance', 'pci-dss', 'encryption', 'secure']
  },
  {
    intent: 'settlement',
    keywords: ['settlement', 'payout', 'payouts', 'real-time settlement', 'instant settlement']
  },
  {
    intent: 'contact',
    keywords: ['contact', 'phone', 'email', 'phone number', 'support', 'help']
  },
  {
    intent: 'location',
    keywords: ['location', 'office', 'address', 'where', 'jaipur', 'mansarovar']
  },
  {
    intent: 'services',
    keywords: ['services', 'offer', 'offerings', 'solutions', 'products', 'what do you do']
  }
];

export function detectIntent(input: {
  query: NormalizedQuery;
  context?: ConversationContext;
}): ChatIntent {
  const norm = input.query.normalized;
  
  let bestIntent: ChatIntent = 'unclear';
  let highestScore = 0;

  for (const rule of INTENT_RULES) {
    let score = 0;
    
    // Keyword match (increases score by 2 for each keyword present)
    for (const kw of rule.keywords) {
      if (norm.includes(kw)) {
        score += 2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestIntent = rule.intent;
    }
  }

  // If score is weak or tie/zero, default to previous context topic/intent
  if (highestScore === 0 && input.context) {
    const isVeryShort = norm.length <= 4;
    const isFintechAcronym = ['csp', 'tsp', 'pg', 'upi', 'aeps', 'matm', 'dmt', 'bbps', 'atm', 'pan', 'gst'].includes(norm);
    if (input.context.activeIntent && (!isVeryShort || isFintechAcronym)) {
      return input.context.activeIntent;
    }
  }

  // Handle follow-up queries that don't have clear topic but context exists
  if (
    highestScore === 0 && 
    (norm.includes('how long') || norm.includes('how much') || norm.includes('what documents') || norm.includes('how to integrate')) &&
    input.context?.activeTopic
  ) {
    return 'follow_up';
  }

  return bestIntent;
}
