import { gatexpayKnowledgeBase } from "./knowledge-base";
import { CHATBOT_CONFIG } from "./config";
function getCategoryGroup(intent) {
  if (
    intent === "api_integration" ||
    intent === "custom_development" ||
    intent === "documentation"
  ) {
    return "tsp_services";
  }
  if (intent === "money_transfer" || intent === "bbps") {
    return "csp_services";
  }
  if (intent === "location") {
    return "contact";
  }
  if (intent === "services") {
    return "services";
  }
  return intent;
}
export function retrieveKnowledge(input) {
  const norm = input.query.normalized;
  const tokens = input.query.tokens;
  // Filter only verified knowledge items
  const verifiedItems = gatexpayKnowledgeBase.filter((item) => item.verified);
  const scoredItems = [];
  for (const item of verifiedItems) {
    let score = 0;
    // 1. Exact Question Match (weight = 5)
    const exactMatch = item.questions.some(
      (q) => q.toLowerCase().trim() === norm
    );
    if (exactMatch) {
      score += 5;
    }
    // 2. Title Match (weight = 4)
    if (
      item.title
        .toLowerCase()
        .split(/\s+/)
        .some((word) => word.length > 3 && norm.includes(word))
    ) {
      score += 4;
    }
    // 3. Intent Match (weight = 4)
    const categoryGroup = getCategoryGroup(input.intent);
    if (item.category === categoryGroup) {
      score += 4;
    }
    // 4. Keyword Match (weight = 2 per matching keyword)
    const matchingKeywordsCount = item.keywords.filter((kw) =>
      norm.includes(kw)
    ).length;
    score += matchingKeywordsCount * 2;
    // 5. Related Topics Match (weight = 1)
    if (
      item.relatedTopics &&
      item.relatedTopics.some((topic) => norm.includes(topic.toLowerCase()))
    ) {
      score += 1;
    }
    // 6. Previous Context Match (weight = 3)
    const contextCategoryGroup = input.context?.activeIntent
      ? getCategoryGroup(input.context.activeIntent)
      : "";
    if (contextCategoryGroup && item.category === contextCategoryGroup) {
      score += 3;
    }
    if (score > 0) {
      scoredItems.push({
        item,
        score,
      });
    }
  }
  // Sort by score descending
  scoredItems.sort((a, b) => b.score - a.score);
  // Take top items up to config limit
  const resultItems = scoredItems.slice(0, CHATBOT_CONFIG.retrieval.maxItems);
  // Calculate confidence scaled between 0 and 1
  const bestScore = scoredItems[0]?.score || 0;
  const confidence = Math.min(bestScore / 12, 1.0); // scale 12 as max baseline
  const thresholdStrong = CHATBOT_CONFIG.retrieval.thresholdStrong; // 0.75
  const thresholdMedium = CHATBOT_CONFIG.retrieval.thresholdMedium; // 0.50
  let hasStrongMatch = false;
  if (confidence >= thresholdStrong) {
    hasStrongMatch = true;
  } else if (confidence >= thresholdMedium && input.context?.activeTopic) {
    hasStrongMatch = true;
  }
  return {
    items: resultItems,
    confidence,
    hasStrongMatch,
  };
}
