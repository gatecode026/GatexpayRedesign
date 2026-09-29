export function generateFollowUps(input) {
  let suggestions = [];
  switch (input.intent) {
    case "payment_gateway":
      suggestions = [
        "Which payment methods are supported?",
        "What documents are required?",
        "How can I begin integration?",
      ];
      break;
    case "aeps":
    case "micro_atm":
    case "csp_services":
      suggestions = [
        "How does AEPS onboarding work?",
        "What hardware is required?",
        "How can I contact the CSP team?",
      ];
      break;
    case "pricing":
      suggestions = [
        "Which service do you need pricing for?",
        "What business volume should I mention?",
        "How can I request a quotation?",
      ];
      break;
    case "contact":
    case "location":
      suggestions = [
        "How can I discuss a payment gateway?",
        "Can I request an integration consultation?",
        "What information should I share with the team?",
      ];
      break;
    case "security":
    case "compliance":
      suggestions = [
        "Is the gateway PCI-DSS compliant?",
        "What are the integration security steps?",
        "What is your system uptime?",
      ];
      break;
    default:
      suggestions = [
        "What services do you offer?",
        "What are CSP and TSP services?",
        "How do I integrate the payment gateway?",
      ];
      break;
  }
  // Double check uniqueness and exact count (exactly 3)
  const uniqueSuggestions = Array.from(new Set(suggestions)).slice(0, 3);
  // Fallback to defaults if not enough
  while (uniqueSuggestions.length < 3) {
    const defaults = [
      "What services do you offer?",
      "What are CSP and TSP services?",
      "How do I integrate the payment gateway?",
    ];
    for (const d of defaults) {
      if (!uniqueSuggestions.includes(d)) {
        uniqueSuggestions.push(d);
      }
      if (uniqueSuggestions.length === 3) break;
    }
  }
  return uniqueSuggestions;
}
