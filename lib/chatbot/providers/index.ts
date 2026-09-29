import { geminiProvider } from './gemini';
import { groqProvider } from './groq';
import { openRouterProvider } from './openrouter';
import { azureProvider } from './azure';
import { ChatProviderInput, ChatProviderResult, ChatProvider } from './types';

// Export metrics to be tracked by logs
export const providerMetrics = {
  retries: 0,
  quotaFailures: 0,
};

async function callWithRetry(
  provider: ChatProvider,
  input: ChatProviderInput,
  onQuotaFailure: () => void
): Promise<ChatProviderResult> {
  let attempt = 1;
  const maxAttempts = 3;
  let delay = 1000; // 1 second initial delay

  while (attempt <= maxAttempts) {
    try {
      return await provider.generateResponse(input);
    } catch (err: any) {
      const errMsg = err?.message || '';
      
      // Detect permanent quota exhaustion or rate limit (HTTP 429 or RESOURCE_EXHAUSTED)
      const isQuotaError = 
        errMsg.includes('429') || 
        errMsg.toLowerCase().includes('resource_exhausted') || 
        errMsg.toLowerCase().includes('quota') ||
        errMsg.toLowerCase().includes('rate limit');

      if (isQuotaError) {
        console.warn(`[WARN] Quota exhausted for provider "${provider.name}". Triggering immediate failover.`);
        onQuotaFailure();
        throw err; // Fail over immediately without retrying
      }

      if (attempt === maxAttempts) {
        throw err;
      }

      providerMetrics.retries++;
      console.warn(`[WARN] Provider "${provider.name}" attempt ${attempt} failed. Retrying in ${delay}ms... Error:`, errMsg);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff (1s -> 2s -> 4s)
      attempt++;
    }
  }
  throw new Error(`Provider "${provider.name}" failed after ${maxAttempts} attempts.`);
}

export async function generateWithProviders(
  input: ChatProviderInput
): Promise<ChatProviderResult | null> {
  // Ordered sequence: Gemini -> Groq -> OpenRouter -> Azure
  const providers: ChatProvider[] = [
    geminiProvider,
    groqProvider,
    openRouterProvider,
    azureProvider
  ];

  // Reset metrics per query block
  providerMetrics.retries = 0;
  providerMetrics.quotaFailures = 0;

  for (const provider of providers) {
    if (provider.isConfigured()) {
      try {
        const result = await callWithRetry(provider, input, () => {
          providerMetrics.quotaFailures++;
        });
        return result;
      } catch (err) {
        console.warn(`[WARN] Provider "${provider.name}" failed or triggered quota failover. Trying next configured provider...`);
      }
    }
  }

  return null;
}
