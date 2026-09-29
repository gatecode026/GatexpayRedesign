import { ConversationContext } from './types';

// Regex patterns for sensitive credentials
const PATTERNS = {
  cardNumber: /\b(?:\d[ -]*?){13,16}\b/,
  cvv: /\b\d{3,4}\b/,
  otp: /\b\d{4,6}\b/,
};

const SENSITIVE_KEYWORDS = [
  'password', 'passcode', 'pin', 'cvv', 'otp', 'card number', 'card pin', 'netbanking password', 'aadhaar card number'
];

export interface LeadSecurityCheck {
  isSafe: boolean;
  warningMessage?: string;
}

export function checkLeadSecurity(query: string): LeadSecurityCheck {
  const lower = query.toLowerCase();

  // 1. Check CVV if card context or explicit CVV
  if (PATTERNS.cvv.test(query) && (lower.includes('cvv') || lower.includes('card') || lower.includes('security code'))) {
    return {
      isSafe: false,
      warningMessage: 'Security Warning: Please never share your Card CVV or security codes. GateXPay will never ask for sensitive credentials.'
    };
  }

  // 2. Check Card Number
  if (PATTERNS.cardNumber.test(query)) {
    return {
      isSafe: false,
      warningMessage: 'Security Warning: Please never share your Credit/Debit Card numbers. GateXPay will never ask for sensitive credentials.'
    };
  }

  // 3. Check explicit sensitive keywords and patterns
  const credentialLeakRegex = /(?:password|passcode|pin|otp)\s*(?:is|:|=)\s*\w+/i;
  if (credentialLeakRegex.test(query)) {
    return {
      isSafe: false,
      warningMessage: 'Security Warning: Please never share passwords, PINs, OTPs, or private authentication details. Keep your account secure.'
    };
  }

  return { isSafe: true };
}

export function qualifyLead(
  query: string,
  context: ConversationContext
): { updatedContext: ConversationContext; promptMessage?: string } {
  const lower = query.toLowerCase();
  const updatedContext = { ...context };

  // Simple lead identification logic
  if (lower.includes('want to integrate') || lower.includes('need payment gateway') || lower.includes('register as agent')) {
    updatedContext.collectedLeadData = updatedContext.collectedLeadData || {};
    updatedContext.collectedLeadData.requirement = query;
  }

  return {
    updatedContext
  };
}
