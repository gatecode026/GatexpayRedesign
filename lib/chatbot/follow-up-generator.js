export function generateFollowUps(input) {
  let suggestions = [];
  const intent = input.intent || "unclear";

  switch (intent) {
    case "compliance_license":
      suggestions = [
        "What services does GateXPay offer?",
        "How does GateXPay partner with banks?",
        "What are the onboarding requirements?",
      ];
      break;

    case "csp_vs_tsp":
      suggestions = [
        "How can I apply for CSP services?",
        "How do I integrate the TSP Payment Gateway?",
        "What documents are needed for onboarding?",
      ];
      break;

    case "payment_gateway":
    case "payment_gateway_overview":
      suggestions = [
        "Which payment methods are supported?",
        "How can I integrate the Payment Gateway?",
        "What are the charges for Payment Gateway?",
      ];
      break;

    case "payment_methods":
      suggestions = [
        "How can I integrate the Payment Gateway?",
        "What documents are needed for onboarding?",
        "What are the pricing charges?",
      ];
      break;

    case "payment_gateway_integration":
      suggestions = [
        "Which payment methods are supported?",
        "What documents are required for onboarding?",
        "How do I get sandbox API credentials?",
      ];
      break;

    case "onboarding_documents":
    case "get_started":
      suggestions = [
        "How do I get started with onboarding?",
        "What are the pricing and setup charges?",
        "How can I contact the support team?",
      ];
      break;

    case "pricing":
      suggestions = [
        "What documents are needed for a quote?",
        "How do I contact sales for pricing?",
        "How can I integrate the Payment Gateway?",
      ];
      break;

    case "contact":
    case "contact_phone":
    case "contact_email":
    case "contact_address":
      suggestions = [
        "What are your business hours?",
        "How can I request a payment gateway demo?",
        "Where is your office located?",
      ];
      break;

    case "aeps":
    case "micro_atm":
    case "csp_services":
      suggestions = [
        "What hardware is required for Micro ATM?",
        "What is the difference between CSP and TSP?",
        "How do retail agents register for AEPS?",
      ];
      break;

    case "security":
      suggestions = [
        "Is GateXPay PCI-DSS compliant?",
        "What is your system uptime?",
        "How are transactions encrypted?",
      ];
      break;

    case "about_company":
    case "leadership":
      suggestions = [
        "What services does GateXPay offer?",
        "Is GateXPay a bank or NBFC?",
        "Where is your headquarters located?",
      ];
      break;

    case "services":
      suggestions = [
        "What does the Payment Gateway do?",
        "What is the difference between CSP and TSP?",
        "How do I get started?",
      ];
      break;

    default:
      suggestions = [
        "What services does GateXPay offer?",
        "How do I integrate the payment gateway?",
        "What documents are required for onboarding?",
      ];
      break;
  }

  // Ensure unique, exactly 3 follow-ups
  const uniqueSuggestions = Array.from(new Set(suggestions)).slice(0, 3);
  const defaults = [
    "What services does GateXPay offer?",
    "How do I integrate the payment gateway?",
    "What documents are required for onboarding?",
  ];

  for (const d of defaults) {
    if (uniqueSuggestions.length >= 3) break;
    if (!uniqueSuggestions.includes(d)) {
      uniqueSuggestions.push(d);
    }
  }

  return uniqueSuggestions;
}
