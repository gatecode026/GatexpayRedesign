import { geminiProvider } from "./gemini";
import { groqProvider } from "./groq";
import { openRouterProvider } from "./openrouter";
import { azureProvider } from "./azure";
// Export metrics to be tracked by logs
export const providerMetrics = {
  retries: 0,
  quotaFailures: 0,
};
async function callWithRetry(provider, input, onQuotaFailure) {
  let attempt = 1;
  const maxAttempts = 3;
  let delay = 1000; // 1 second initial delay
  while (attempt <= maxAttempts) {
    try {
      return await provider.generateResponse(input);
    } catch (err) {
      const errMsg = err?.message || "";
      // Detect permanent quota exhaustion, auth failure, bad request, or invalid model (HTTP 400, 401, 403, 404, 429)
      const isFatalClientError =
        errMsg.includes("400") ||
        errMsg.includes("401") ||
        errMsg.includes("403") ||
        errMsg.includes("404") ||
        errMsg.includes("429") ||
        errMsg.toLowerCase().includes("not found") ||
        errMsg.toLowerCase().includes("resource_exhausted") ||
        errMsg.toLowerCase().includes("quota") ||
        errMsg.toLowerCase().includes("rate limit");
      if (isFatalClientError) {
        console.warn(
          `[WARN] Client/Configuration error for provider "${provider.name}" (${errMsg}). Triggering immediate failover.`
        );
        onQuotaFailure();
        throw err; // Fail over immediately without retrying
      }
      if (attempt === maxAttempts) {
        throw err;
      }
      providerMetrics.retries++;
      console.warn(
        `[WARN] Provider "${provider.name}" attempt ${attempt} failed. Retrying in ${delay}ms... Error:`,
        errMsg
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff (1s -> 2s -> 4s)
      attempt++;
    }
  }
  throw new Error(
    `Provider "${provider.name}" failed after ${maxAttempts} attempts.`
  );
}
export async function generateWithProviders(input) {
  // Ordered sequence: Gemini -> Groq -> OpenRouter -> Azure
  const providers = [
    geminiProvider,
    groqProvider,
    openRouterProvider,
    azureProvider,
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
        console.warn(
          `[WARN] Provider "${provider.name}" failed or triggered quota failover. Trying next configured provider...`
        );
      }
    }
  }
  return null;
}
