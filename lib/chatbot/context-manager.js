import { CHATBOT_CONFIG } from "./config";

export function limitConversationHistory(messages) {
  const maxLimit = CHATBOT_CONFIG.limits.maxHistoryLength;
  if (!messages || !Array.isArray(messages)) return [];
  if (messages.length > maxLimit) {
    return messages.slice(-maxLimit);
  }
  return messages;
}

export function buildConversationContext(history) {
  const context = {
    previousQuestions: [],
    collectedLeadData: {},
    activeProduct: null,
    activeAspect: null,
    activeIntent: null,
    activeTopic: null,
  };

  if (!history || !Array.isArray(history) || history.length === 0) {
    return context;
  }

  // Inspect history in chronological order
  for (const msg of history) {
    if (!msg || !msg.content) continue;
    const content = msg.content.toLowerCase();

    if (msg.role === "user") {
      context.previousQuestions.push(msg.content);

      // Business & integration platform heuristic tracking
      if (
        content.includes("grocery") ||
        content.includes("shop") ||
        content.includes("store") ||
        content.includes("e-commerce")
      ) {
        context.businessType = "retail/e-commerce";
      }

      if (
        content.includes("react native") ||
        content.includes("flutter") ||
        content.includes("android") ||
        content.includes("ios") ||
        content.includes("mobile app")
      ) {
        context.integrationPlatform = "mobile_app";
      } else if (
        content.includes("wordpress") ||
        content.includes("woocommerce") ||
        content.includes("shopify") ||
        content.includes("website")
      ) {
        context.integrationPlatform = "website";
      }
    }

    if (msg.role === "assistant") {
      // Restore last discussed product/service
      if (content.includes("payment gateway") || content.includes("payment methods")) {
        context.activeProduct = "payment_gateway";
        context.activeTopic = "payment_gateway";
        context.activeIntent = "payment_gateway";
      } else if (content.includes("aeps") || content.includes("aadhaar")) {
        context.activeProduct = "aeps";
        context.activeTopic = "aeps";
        context.activeIntent = "aeps";
      } else if (content.includes("micro atm") || content.includes("matm")) {
        context.activeProduct = "micro_atm";
        context.activeTopic = "micro_atm";
        context.activeIntent = "micro_atm";
      } else if (content.includes("customer service point") || content.includes("csp")) {
        context.activeProduct = "csp";
        context.activeTopic = "csp_services";
        context.activeIntent = "csp_services";
      } else if (content.includes("technology service provider") || content.includes("tsp")) {
        context.activeProduct = "tsp";
        context.activeTopic = "tsp_services";
        context.activeIntent = "tsp_services";
      }

      // Restore last aspect
      if (content.includes("document") || content.includes("kyc")) {
        context.activeAspect = "documents";
      } else if (content.includes("pricing") || content.includes("rates") || content.includes("fees")) {
        context.activeAspect = "pricing";
      } else if (content.includes("integration") || content.includes("api")) {
        context.activeAspect = "integration";
      }
    }
  }

  return context;
}
