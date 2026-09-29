import { CHATBOT_CONFIG } from "../config";
import { SYSTEM_PROMPT } from "../system-prompt";
export class GroqProvider {
  name = "groq";
  isConfigured() {
    return !!CHATBOT_CONFIG.groq.apiKey;
  }
  async generateResponse(input) {
    if (!this.isConfigured()) {
      throw new Error("Groq API key is not configured.");
    }
    const knowledgeContext = input.knowledge
      .map(
        (k) =>
          `[Title: ${k.item.title}]\nCategory: ${k.item.category}\nVerified Facts: ${k.item.answer}`
      )
      .join("\n\n");
    const systemInstruction = `${SYSTEM_PROMPT}\n\nSupplied GateXPay Knowledge Context:\n${knowledgeContext}`;
    const url = CHATBOT_CONFIG.groq.endpoint;
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      CHATBOT_CONFIG.requestTimeoutMs
    );
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CHATBOT_CONFIG.groq.apiKey}`,
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemInstruction },
            ...input.history,
          ],
          model: CHATBOT_CONFIG.groq.model,
          max_tokens: 300,
          temperature: 0.2,
        }),
        signal: controller.signal,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API error: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      const message = data.choices?.[0]?.message?.content || "";
      return {
        message,
        provider: "groq",
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
export const groqProvider = new GroqProvider();
