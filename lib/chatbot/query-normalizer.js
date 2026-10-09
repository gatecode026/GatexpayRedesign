const HINGLISH_KEYWORDS = [
  "kya",
  "hai",
  "kaise",
  "hoga",
  "chahiye",
  "ko",
  "se",
  "nahi",
  "aur",
  "ke",
  "liye",
  "karna",
  "kab",
  "milega",
  "ka",
  "ki",
  "main",
  "bhi",
  "tha",
  "batao",
  "karo",
  "kahan",
  "shuru",
  "fark",
  "antar",
  "lagta",
  "lagte",
  "dekhna",
];

const PRONOUN_FOLLOWUP_PATTERNS = [
  /\b(it|this|that|these|those)\b/i,
  /\b(that service|this service|same service|this product|that product)\b/i,
  /\b(iska|iske|iski|isme|inme|ispar|uske|usme)\b/i,
  /\b(for it|about it|integrate it|cost of it|pricing for it)\b/i,
];

export function normalizeQuery(query) {
  const original = query || "";
  let normalized = original.toLowerCase().trim();

  // Normalize punctuation and repeated whitespace
  normalized = normalized.replace(/\s+/g, " ");

  // Create alphanumeric tokens, preserving Devanagari Unicode
  const tokens = normalized
    .replace(/[^\w\s\u0900-\u097F]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  // 1. Language Detection
  let detectedLanguage = "english";
  if (/[\u0900-\u097F]/.test(query)) {
    detectedLanguage = "hindi";
  } else {
    const matchesHinglish = tokens.some((token) =>
      HINGLISH_KEYWORDS.includes(token)
    );
    if (matchesHinglish) {
      detectedLanguage = "hinglish";
    } else if (/[a-zA-Z0-9]/.test(query)) {
      detectedLanguage = "english";
    } else {
      detectedLanguage = "unknown";
    }
  }

  // 2. Mentioned Products / Services Detection
  const products = [];
  if (
    normalized.includes("payment gateway") ||
    normalized.includes("pg") ||
    normalized.includes("gateway")
  ) {
    products.push("payment_gateway");
  }
  if (
    normalized.includes("csp") ||
    normalized.includes("customer service point")
  ) {
    products.push("csp");
  }
  if (
    normalized.includes("tsp") ||
    normalized.includes("technology service provider")
  ) {
    products.push("tsp");
  }
  if (normalized.includes("aeps") || normalized.includes("aadhaar")) {
    products.push("aeps");
  }
  if (
    normalized.includes("micro atm") ||
    normalized.includes("matm") ||
    normalized.includes("swipe machine")
  ) {
    products.push("micro_atm");
  }
  if (
    normalized.includes("bbps") ||
    normalized.includes("bill payment") ||
    normalized.includes("recharge")
  ) {
    products.push("bbps");
  }
  if (
    normalized.includes("money transfer") ||
    normalized.includes("dmt") ||
    normalized.includes("imps")
  ) {
    products.push("money_transfer");
  }
  if (
    normalized.includes("custom development") ||
    normalized.includes("software development") ||
    normalized.includes("app development") ||
    normalized.includes("web development")
  ) {
    products.push("custom_development");
  }

  // 3. Question Aspects Detection
  const aspects = [];
  const PRICING_REGEX =
    /\b(pricing|price|cost|costs|charge|charges|fee|fees|rate|rates|mdr|commission|kharch)\b/i;
  if (
    PRICING_REGEX.test(normalized) ||
    normalized.includes("kitna charge") ||
    normalized.includes("kitne paise")
  ) {
    aspects.push("pricing");
  }

  if (
    normalized.includes("integrate") ||
    normalized.includes("integration") ||
    normalized.includes("how to integrate") ||
    normalized.includes("api") ||
    normalized.includes("sdk") ||
    normalized.includes("plugin") ||
    normalized.includes("developer") ||
    normalized.includes("kaise jode") ||
    normalized.includes("connect")
  ) {
    aspects.push("integration");
  }

  if (
    normalized.includes("payment method") ||
    normalized.includes("payment methods") ||
    normalized.includes("which methods") ||
    normalized.includes("methods are supported") ||
    normalized.includes("payment options") ||
    normalized.includes("upi") ||
    normalized.includes("netbanking") ||
    normalized.includes("net banking") ||
    normalized.includes("digital wallet") ||
    normalized.includes("wallets") ||
    normalized.includes("kaun se payment") ||
    (normalized.includes("accept") && (normalized.includes("card") || normalized.includes("cards")))
  ) {
    aspects.push("payment_methods");
  }

  if (
    normalized.includes("document") ||
    normalized.includes("documents") ||
    normalized.includes("doc") ||
    normalized.includes("docs") ||
    normalized.includes("kyc") ||
    normalized.includes("paper") ||
    normalized.includes("papers") ||
    normalized.includes("onboarding documents") ||
    normalized.includes("dastavej") ||
    normalized.includes("kagaz")
  ) {
    aspects.push("documents");
  }

  if (
    normalized.includes("bank") ||
    normalized.includes("nbfc") ||
    normalized.includes("license") ||
    normalized.includes("licensed") ||
    normalized.includes("rbi") ||
    normalized.includes("regulated") ||
    normalized.includes("aggregator license")
  ) {
    aspects.push("compliance_license");
  }

  if (
    normalized.includes("phone") ||
    normalized.includes("call") ||
    normalized.includes("number") ||
    normalized.includes("mobile")
  ) {
    aspects.push("contact_phone");
  }

  if (
    normalized.includes("email") ||
    normalized.includes("mail") ||
    normalized.includes("write to")
  ) {
    aspects.push("contact_email");
  }

  if (
    normalized.includes("address") ||
    normalized.includes("office") ||
    normalized.includes("location") ||
    normalized.includes("where") ||
    normalized.includes("kahan hai")
  ) {
    aspects.push("contact_address");
  }

  if (
    (normalized.includes("support") && !normalized.includes("supported")) ||
    normalized.includes("contact") ||
    normalized.includes("help") ||
    normalized.includes("reach") ||
    normalized.includes("sampark")
  ) {
    aspects.push("contact_general");
  }

  if (
    normalized.includes("difference") ||
    normalized.includes("vs") ||
    normalized.includes("versus") ||
    normalized.includes("fark") ||
    normalized.includes("antar") ||
    (normalized.includes("csp") && normalized.includes("tsp"))
  ) {
    aspects.push("comparison");
  }

  if (
    normalized.includes("get started") ||
    normalized.includes("getting started") ||
    normalized.includes("how do i get started") ||
    normalized.includes("how to start") ||
    normalized.includes("how to apply") ||
    normalized.includes("shuru kaise") ||
    normalized.includes("start kaise")
  ) {
    aspects.push("get_started");
  }

  // 4. Pronoun and Follow-up Pattern Recognition
  const hasPronounRef = PRONOUN_FOLLOWUP_PATTERNS.some((pattern) =>
    pattern.test(normalized)
  );

  // 5. Multi-topic Question Flag
  const isMultiPart =
    (aspects.includes("integration") && aspects.includes("pricing")) ||
    (aspects.includes("documents") && aspects.includes("pricing")) ||
    (aspects.includes("integration") && aspects.includes("documents")) ||
    ((normalized.includes(" and ") ||
      normalized.includes(" aur ") ||
      normalized.includes(" as well as ")) &&
      aspects.length >= 2);

  return {
    original,
    normalized,
    tokens,
    detectedLanguage,
    products,
    aspects,
    hasPronounRef,
    isMultiPart,
  };
}
