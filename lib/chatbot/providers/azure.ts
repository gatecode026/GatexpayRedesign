import { ChatProvider, ChatProviderInput, ChatProviderResult } from './types';
import { CHATBOT_CONFIG } from '../config';
import { SYSTEM_PROMPT } from '../system-prompt';

export class AzureProvider implements ChatProvider {
  name = 'azure';

  isConfigured(): boolean {
    return !!CHATBOT_CONFIG.azure.apiKey && !!CHATBOT_CONFIG.azure.endpoint;
  }

  async generateResponse(input: ChatProviderInput): Promise<ChatProviderResult> {
    if (!this.isConfigured()) {
      throw new Error('Azure API credentials are not fully configured.');
    }

    const knowledgeContext = input.knowledge
      .map(k => `[Title: ${k.item.title}]\nCategory: ${k.item.category}\nVerified Facts: ${k.item.answer}`)
      .join('\n\n');

    const systemInstruction = `${SYSTEM_PROMPT}\n\nSupplied GateXPay Knowledge Context:\n${knowledgeContext}`;

    const url = `${CHATBOT_CONFIG.azure.endpoint}/chat/completions`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CHATBOT_CONFIG.requestTimeoutMs);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CHATBOT_CONFIG.azure.apiKey}`,
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemInstruction },
            ...input.history
          ],
          model: CHATBOT_CONFIG.azure.deployment,
          max_tokens: 300,
          temperature: 0.2,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Azure API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const message = data.choices?.[0]?.message?.content || '';

      return {
        message,
        provider: 'azure',
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
export const azureProvider = new AzureProvider();
