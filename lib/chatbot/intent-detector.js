export function detectIntent(input) {
  const norm = input.query?.normalized || "";
  const query = input.query || {};
  const products = query.products || [];
  const aspects = query.aspects || [];
  const context = input.context || {};

  // 1. Comparison Intent Check (e.g., "What is the difference between CSP and TSP?")
  if (
    aspects.includes("comparison") ||
    (norm.includes("csp") && norm.includes("tsp")) ||
    norm.includes("difference between") ||
    norm.includes("kya fark hai") ||
    norm.includes("kya antar hai")
  ) {
    return "csp_vs_tsp";
  }

  // 2. Compliance / Bank / NBFC Licensing Clarification
  if (
    aspects.includes("compliance_license") ||
    norm.includes("is gatexpay a bank") ||
    norm.includes("kya gatexpay bank hai") ||
    norm.includes("bank or nbfc") ||
    norm.includes("are you a bank") ||
    norm.includes("rbi approved") ||
    norm.includes("payment aggregator license")
  ) {
    return "compliance_license";
  }

  // 3. Multi-part Intent Check (e.g., "How do I integrate Payment Gateway and what are the charges?")
  if (query.isMultiPart) {
    return "multi_part";
  }

  // 4. Greetings and Gratitude
  if (
    /^(hi|hello|hey|hyy|hy|hii|hiii|greetings|hola|namaste|good morning|good evening)\b/i.test(
      norm
    ) &&
    norm.split(/\s+/).length <= 4
  ) {
    return "greeting";
  }

  if (
    /^(thanks|thank you|thankyou|dhanyawad|shukriya|great|awesome)\b/i.test(
      norm
    ) &&
    norm.split(/\s+/).length <= 4
  ) {
    return "gratitude";
  }

  // 4. Payment Methods Supported Check
  if (
    aspects.includes("payment_methods") ||
    norm.includes("which payment methods") ||
    norm.includes("payment methods are supported") ||
    norm.includes("methods are supported") ||
    norm.includes("supported payment") ||
    norm.includes("payment options") ||
    norm.includes("support upi") ||
    norm.includes("accept cards") ||
    norm.includes("kaun se payment method")
  ) {
    return "payment_methods";
  }

  // 5. Contact Intents (Specific channels vs General)
  if (aspects.includes("contact_phone") || norm.includes("phone number") || norm.includes("contact number") || norm.includes("call you")) {
    return "contact_phone";
  }
  if (aspects.includes("contact_email") || norm.includes("email address") || norm.includes("mail id") || norm.includes("email you")) {
    return "contact_email";
  }
  if (aspects.includes("contact_address") || norm.includes("office located") || norm.includes("where is your office") || norm.includes("office address") || norm.includes("kahan hai office")) {
    return "contact_address";
  }
  if (
    aspects.includes("contact_general") &&
    !aspects.includes("payment_methods") &&
    (norm.includes("contact") || norm.includes("reach") || norm.includes("get in touch") || norm.includes("help desk") || norm.includes("sampark") || (norm.includes("support") && !norm.includes("supported")))
  ) {
    return "contact";
  }

  // 6. Leadership & Founder
  if (
    norm.includes("founder") ||
    norm.includes("ceo") ||
    norm.includes("cfo") ||
    norm.includes("vansh") ||
    norm.includes("govind") ||
    norm.includes("who started") ||
    norm.includes("leadership")
  ) {
    return "leadership";
  }

  // 7. Company Overview
  if (
    norm.includes("what is gatexpay") ||
    norm.includes("tell me about gatexpay") ||
    norm.includes("who is gatexpay") ||
    norm.includes("gatexpay kya hai") ||
    norm.includes("about company") ||
    (norm.includes("about") && norm.includes("gatexpay"))
  ) {
    return "about_company";
  }

  // 8. Documents / Onboarding Requirements
  if (
    aspects.includes("documents") ||
    norm.includes("documents required") ||
    norm.includes("what documents do i need") ||
    norm.includes("registration documents") ||
    norm.includes("kyc documents") ||
    norm.includes("kaun se documents") ||
    norm.includes("dastavej") ||
    norm.includes("kagaz")
  ) {
    return "onboarding_documents";
  }

  // 9. Getting Started / Onboarding Flow
  if (
    aspects.includes("get_started") ||
    norm.includes("how do i get started") ||
    norm.includes("how to get started") ||
    norm.includes("how to start") ||
    norm.includes("kaise start kare") ||
    norm.includes("shuru kaise kare")
  ) {
    return "get_started";
  }

  // 10. Pricing & Charges
  if (
    aspects.includes("pricing") ||
    norm.includes("charges") ||
    norm.includes("pricing") ||
    norm.includes("cost") ||
    norm.includes("fees") ||
    norm.includes("rates") ||
    norm.includes("commission") ||
    norm.includes("kitna charge")
  ) {
    return "pricing";
  }

  // 11. Payment Methods Supported
  if (
    aspects.includes("payment_methods") ||
    norm.includes("which payment methods") ||
    norm.includes("payment methods are supported") ||
    norm.includes("payment options") ||
    norm.includes("support upi") ||
    norm.includes("accept cards") ||
    norm.includes("kaun se payment method")
  ) {
    return "payment_methods";
  }

  // 12. Integration Specific
  if (
    aspects.includes("integration") ||
    norm.includes("how can i integrate") ||
    norm.includes("how to integrate") ||
    norm.includes("developer api") ||
    norm.includes("api integration") ||
    norm.includes("kaise jode") ||
    norm.includes("connect gateway")
  ) {
    // If explicit product is Payment Gateway OR context was Payment Gateway
    if (products.includes("payment_gateway") || context.activeProduct === "payment_gateway") {
      return "payment_gateway_integration";
    }
    return "api_integration";
  }

  // 13. Payment Gateway Overview / Features
  if (
    products.includes("payment_gateway") ||
    norm.includes("payment gateway") ||
    norm.includes("pg service")
  ) {
    if (norm.includes("what does") || norm.includes("kya karta hai") || norm.includes("features") || norm.includes("overview")) {
      return "payment_gateway_overview";
    }
    return "payment_gateway";
  }

  // 14. AEPS, Micro ATM, BBPS, Money Transfer
  if (products.includes("aeps") || norm.includes("aeps") || norm.includes("aadhaar")) {
    return "aeps";
  }
  if (products.includes("micro_atm") || norm.includes("micro atm") || norm.includes("matm")) {
    return "micro_atm";
  }
  if (products.includes("bbps") || norm.includes("bbps") || norm.includes("bill payment")) {
    return "bbps";
  }
  if (products.includes("money_transfer") || norm.includes("money transfer") || norm.includes("dmt")) {
    return "money_transfer";
  }

  // 15. CSP Services
  if (products.includes("csp") || norm.includes("csp")) {
    return "csp_services";
  }

  // 16. TSP Services / Custom Development
  if (products.includes("tsp") || norm.includes("tsp")) {
    return "tsp_services";
  }
  if (products.includes("custom_development") || norm.includes("development") || norm.includes("custom software")) {
    return "custom_development";
  }

  // 17. General Services Overview
  if (
    norm.includes("what services does gatexpay offer") ||
    norm.includes("what services do you offer") ||
    norm.includes("services offer") ||
    norm.includes("solutions do you provide") ||
    norm.includes("kya services dete ho") ||
    norm.includes("services kya hai") ||
    (norm.includes("service") && (norm.includes("offer") || norm.includes("provide") || norm.includes("kya")))
  ) {
    return "services";
  }

  // 18. Security & Uptime
  if (
    norm.includes("security") ||
    norm.includes("secure") ||
    norm.includes("uptime") ||
    norm.includes("pci") ||
    norm.includes("safe")
  ) {
    return "security";
  }

  // 19. Context-dependent Follow-Up Check (Pronouns: "it", "that", "iska", "isme")
  if (
    (query.hasPronounRef || norm.includes("how long") || norm.includes("how much") || norm.length <= 15) &&
    context.activeProduct
  ) {
    if (aspects.includes("integration") || norm.includes("integrate")) {
      return context.activeProduct === "payment_gateway" ? "payment_gateway_integration" : "api_integration";
    }
    if (aspects.includes("pricing") || norm.includes("charge") || norm.includes("cost")) {
      return "pricing";
    }
    if (aspects.includes("documents") || norm.includes("doc")) {
      return "onboarding_documents";
    }
    return `follow_up_${context.activeProduct}`;
  }

  return "unclear";
}
