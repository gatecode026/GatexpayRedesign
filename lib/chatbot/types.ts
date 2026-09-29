export type ChatIntent =
  | 'greeting'
  | 'about_company'
  | 'services_overview'
  | 'csp_services'
  | 'tsp_services'
  | 'payment_gateway'
  | 'aeps'
  | 'micro_atm'
  | 'bbps'
  | 'money_transfer'
  | 'api_integration'
  | 'custom_development'
  | 'pricing'
  | 'onboarding'
  | 'documentation'
  | 'security'
  | 'compliance'
  | 'settlement'
  | 'technical_support'
  | 'contact'
  | 'location'
  | 'lead_generation'
  | 'comparison'
  | 'follow_up'
  | 'gratitude'
  | 'services'
  | 'unclear'
  | 'out_of_scope';

export interface KnowledgeItem {
  id: string;
  category: string;
  title: string;
  keywords: string[];
  questions: string[];
  answer: string;
  shortAnswer?: string;
  relatedTopics?: string[];
  sourcePath: string;
  verified: boolean;
  lastVerifiedAt?: string;
  approvedBy?: string;
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface ScoredKnowledgeItem {
  item: KnowledgeItem;
  score: number;
}

export interface RetrievalResult {
  items: ScoredKnowledgeItem[];
  confidence: number;
  hasStrongMatch: boolean;
}

export interface ConversationContext {
  activeIntent?: ChatIntent;
  activeTopic?: string;
  mentionedService?: string;
  businessType?: string;
  integrationPlatform?: 'website' | 'mobile_app' | 'pos' | 'retail' | 'other';
  previousQuestions?: string[];
  collectedLeadData?: {
    name?: string;
    company?: string;
    phone?: string;
    email?: string;
    requirement?: string;
  };
}

export interface NormalizedQuery {
  original: string;
  normalized: string;
  tokens: string[];
  detectedLanguage?: 'english' | 'hinglish' | 'hindi' | 'unknown';
}

export type ScopeResult = 'in_scope' | 'out_of_scope' | 'uncertain' | 'prompt_injection';

export interface ScopeEvaluation {
  status: ScopeResult;
  isPromptInjection: boolean;
  reason?: string;
}

export interface ValidationResult {
  valid: boolean;
  violations: string[];
  sanitizedResponse?: string;
}

export interface ChatApiResponse {
  success: boolean;
  message: string;
  followUps: string[];
  intent: ChatIntent;
  topic?: string;
  requiresClarification: boolean;
  confidence?: number;
  requestId?: string;
  response?: string; // legacy compatibility
}

export interface InternalChatMetadata {
  provider: 'gemini' | 'azure' | 'fallback';
  durationMs: number;
  retrievalConfidence: number;
  validationAttempts: number;
}
