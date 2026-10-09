import { gatexpayKnowledgeBase } from "./knowledge-base";
import { CHATBOT_CONFIG } from "./config";

// Direct mapping between specific intents and preferred KB item IDs
const INTENT_TARGET_MAP = {
  compliance_license: ["about_company_clarification"],
  contact_phone: ["contact_phone", "contact_general"],
  contact_email: ["contact_email", "contact_general"],
  contact_address: ["contact_address", "contact_general"],
  contact: ["contact_general", "contact_phone", "contact_email"],
  leadership: ["leadership_details"],
  about_company: ["about_company_overview", "company_statistics"],
  onboarding_documents: ["onboarding_documents"],
  get_started: ["getting_started_guide", "onboarding_documents"],
  pricing: ["pricing_general"],
  payment_methods: ["payment_gateway_details"],
  payment_gateway_overview: ["payment_gateway_details"],
  payment_gateway_integration: ["payment_gateway_details", "services_tsp_overview"],
  payment_gateway: ["payment_gateway_details"],
  csp_vs_tsp: ["csp_vs_tsp_comparison", "services_csp_overview", "services_tsp_overview"],
  csp_services: ["services_csp_overview"],
  tsp_services: ["services_tsp_overview"],
  aeps: ["services_aeps_details"],
  micro_atm: ["services_micro_atm_details"],
  services: ["general_services"],
  greeting: ["general_greeting"],
  gratitude: ["general_gratitude"],
};

export function retrieveKnowledge(input) {
  const norm = input.query?.normalized || "";
  const query = input.query || {};
  const intent = input.intent || "unclear";
  const context = input.context || {};
  const aspects = query.aspects || [];

  const verifiedItems = gatexpayKnowledgeBase.filter((item) => item.verified);
  const scoredItems = [];

  // Determine target item IDs if intent is recognized
  const targetIds = INTENT_TARGET_MAP[intent] || [];

  // For multi-part queries, determine combined targets
  let multiPartTargets = [];
  if (query.isMultiPart) {
    if (aspects.includes("integration") && aspects.includes("pricing")) {
      multiPartTargets = ["payment_gateway_details", "pricing_general", "services_tsp_overview"];
    } else if (aspects.includes("documents") && aspects.includes("pricing")) {
      multiPartTargets = ["onboarding_documents", "pricing_general"];
    }
  }

  for (const item of verifiedItems) {
    let score = 0;

    // 1. Direct Intent Target Mapping Match (Weight: 10)
    if (targetIds.includes(item.id)) {
      score += 10;
    }

    // 2. Multi-Part Target Mapping Match (Weight: 8)
    if (multiPartTargets.includes(item.id)) {
      score += 8;
    }

    // 3. Exact Question Match (Weight: 8)
    const exactMatch = item.questions.some(
      (q) => q.toLowerCase().trim() === norm
    );
    if (exactMatch) {
      score += 8;
    }

    // 4. Normalized Question Substring / High Jaccard overlap (Weight: 4)
    const partialQuestionMatch = item.questions.some((q) => {
      const qNorm = q.toLowerCase().trim();
      return norm.includes(qNorm) || qNorm.includes(norm);
    });
    if (partialQuestionMatch) {
      score += 4;
    }

    // 5. Title Match (Weight: 3 for distinctive title words)
    const titleWords = item.title
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 3 && !["with", "from", "that", "this", "details"].includes(w));
    const titleMatchCount = titleWords.filter((w) => norm.includes(w)).length;
    score += Math.min(titleMatchCount * 3, 6);

    // 6. Keywords Match (Weight: 1.5 per specific keyword)
    const kwMatches = item.keywords.filter((kw) => {
      if (kw.length <= 2) return false;
      return norm.includes(kw.toLowerCase());
    }).length;
    score += Math.min(kwMatches * 1.5, 6);

    // 7. Context Match (Weight: 2, ONLY if query has pronoun reference or is an elliptical question)
    const isEllipticalOrPronoun =
      query.hasPronounRef ||
      norm.includes("how long") ||
      norm.includes("how to integrate") ||
      norm.includes("how much") ||
      (norm.split(/\s+/).length <= 4 && !targetIds.length);

    if (isEllipticalOrPronoun && context.activeProduct) {
      if (
        (context.activeProduct === "payment_gateway" && item.id === "payment_gateway_details") ||
        (context.activeProduct === "aeps" && item.id === "services_aeps_details") ||
        (context.activeProduct === "micro_atm" && item.id === "services_micro_atm_details") ||
        (context.activeProduct === "csp" && item.id === "services_csp_overview") ||
        (context.activeProduct === "tsp" && item.id === "services_tsp_overview")
      ) {
        score += 3;
      }
    }

    // 8. Negative Penalty for Mismatched Direct Categories
    // If the user asked specifically about phone/email/address, penalize other services
    if (intent === "contact_phone" && item.id !== "contact_phone") {
      score -= 5;
    } else if (intent === "contact_email" && item.id !== "contact_email") {
      score -= 5;
    } else if (intent === "contact_address" && item.id !== "contact_address") {
      score -= 5;
    } else if (intent === "compliance_license" && item.id !== "about_company_clarification") {
      score -= 5;
    }

    if (score > 2) {
      scoredItems.push({
        item,
        score,
      });
    }
  }

  // Sort descending by score
  scoredItems.sort((a, b) => b.score - a.score);

  // Take top items up to config limit
  const maxItems = query.isMultiPart || intent === "csp_vs_tsp" ? 3 : 2;
  const resultItems = scoredItems.slice(0, maxItems);

  // Calculate confidence scaled between 0 and 1
  const bestScore = scoredItems[0]?.score || 0;
  const confidence = Math.min(bestScore / 12, 1.0);

  const thresholdStrong = CHATBOT_CONFIG.retrieval.thresholdStrong; // 0.70
  const thresholdMedium = CHATBOT_CONFIG.retrieval.thresholdMedium; // 0.45

  let hasStrongMatch = false;
  if (confidence >= thresholdStrong) {
    hasStrongMatch = true;
  } else if (confidence >= thresholdMedium && (targetIds.length > 0 || multiPartTargets.length > 0)) {
    hasStrongMatch = true;
  }

  return {
    items: resultItems,
    confidence,
    hasStrongMatch,
  };
}
