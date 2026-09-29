import { ChatIntent, ConversationContext, ScoredKnowledgeItem } from '../types';

export interface ChatProviderInput {
  history: any[];
  intent: ChatIntent;
  context: ConversationContext;
  knowledge: ScoredKnowledgeItem[];
}

export interface ChatProviderResult {
  message: string;
  provider: 'gemini' | 'azure' | 'groq' | 'openrouter';
}

export interface ChatProvider {
  name: string;
  isConfigured(): boolean;
  generateResponse(input: ChatProviderInput): Promise<ChatProviderResult>;
}
