export function generateFallbackResponse(input) {
  const intent = input.intent || "unclear";
  const knowledge = input.knowledge || [];
  const query = input.query || {};
  const requestId = input.requestId;
  const followUps = input.followUps || [];

  let finalMessage = "";
  let topic = intent;
  let requiresClarification = false;

  switch (intent) {
    case "compliance_license":
      finalMessage =
        "No, GateXPay is not a bank or an NBFC. Gatexpay Technologies Private Limited operates solely as a technology and facilitation platform. We do not independently function as a bank, licensed payment aggregator, or regulated deposit-taking institution. All financial transactions and banking operations are delivered through regulated partner banks and authorized payment aggregators.";
      topic = "compliance";
      break;

    case "payment_gateway_overview":
      finalMessage =
        "GateXPay's Payment Gateway enables businesses to accept digital payments seamlessly across websites and mobile applications. It supports all standard payment methods including UPI, credit and debit cards, net banking, and digital wallets with high-availability routing.";
      topic = "payment_gateway";
      break;

    case "payment_gateway_integration":
      finalMessage =
        "To integrate the GateXPay Payment Gateway:\n1. Complete merchant onboarding and get your API credentials.\n2. Review the developer API documentation and SDK guides.\n3. Integrate the checkout APIs or plugins into your platform (web, Android, iOS).\n4. Test transactions in the sandbox environment before switching to live production.";
      topic = "payment_gateway";
      break;

    case "payment_methods":
      finalMessage =
        "GateXPay supports the following verified payment methods:\n1. UPI (Google Pay, PhonePe, Paytm, BHIM, and QR codes)\n2. Credit and Debit Cards (Visa, MasterCard, RuPay)\n3. Net Banking (major public and private sector banks)\n4. Digital Wallets.";
      topic = "payment_gateway";
      break;

    case "pricing":
      finalMessage =
        "GateXPay pricing plans are custom-tailored based on your transaction volume, business model, and required integrations. The website does not quote fixed public commercial rates or commission figures. Please contact our team at info@gatexpay.in or +91 8502888838 to receive a customized quotation.";
      topic = "pricing";
      break;

    case "onboarding_documents":
      finalMessage =
        "For merchant onboarding and KYC compliance, you need to submit the following documents:\n1. Business registration certificate\n2. PAN card of the business\n3. GST certificate\n4. Business address proof\n5. Verified bank account details\n6. Identity and address proof of the authorized representative\n7. Website or mobile application link.";
      topic = "onboarding";
      break;

    case "csp_vs_tsp":
      finalMessage =
        "Here is the key distinction between GateXPay CSP and TSP services:\n\n1. Customer Service Point (CSP): Retail facilitation solutions designed for shopkeepers and retail agents to provide cash withdrawals (AEPS), Micro ATMs, domestic money transfers, and BBPS bill payments to walk-in consumers.\n\n2. Technology Service Provider (TSP): Enterprise technology solutions offering secure payment gateway integrations, developer APIs, unified banking platforms, and custom software development for businesses.";
      topic = "comparison";
      break;

    case "get_started":
      finalMessage =
        "To get started with GateXPay:\n1. Choose your required service (Payment Gateway, CSP retail network, or custom TSP API).\n2. Submit the required KYC documents (business registration, PAN, GST, and bank proof).\n3. Receive your developer sandbox credentials or retail agent portal access.\n4. Complete integration testing and start live processing.";
      topic = "onboarding";
      break;

    case "contact_phone":
      finalMessage =
        "You can reach GateXPay support by phone at +91 8502888838.";
      topic = "contact";
      break;

    case "contact_email":
      finalMessage =
        "You can reach GateXPay support by email at info@gatexpay.in.";
      topic = "contact";
      break;

    case "contact_address":
      finalMessage =
        "Our office is located at: 412, Sumer Nagar, Mansarovar, Jaipur, Rajasthan - 302020.";
      topic = "contact";
      break;

    case "contact":
      finalMessage =
        "You can contact GateXPay support through the following channels:\n- Phone: +91 8502888838\n- Email: info@gatexpay.in\n- Office Address: 412, Sumer Nagar, Mansarovar, Jaipur, Rajasthan - 302020.";
      topic = "contact";
      break;

    case "services":
      finalMessage =
        "GateXPay offers a comprehensive suite of digital finance and technology solutions, including:\n1. Payment Gateway integrations (supporting UPI, Cards, NetBanking, and Wallets)\n2. Customer Service Point (CSP) services (facilitating AEPS, Micro ATMs, money transfers, and BBPS)\n3. Technology Service Provider (TSP) custom development (API integrations, unified banking systems, and custom web/mobile app development).";
      topic = "services";
      break;

    case "leadership":
      finalMessage =
        "GateXPay was founded by our leadership team: Vansh Chaudhary, Chief Executive Officer (CEO), and Govind Jain, Chief Financial Officer (CFO).";
      topic = "about_company";
      break;

    case "about_company":
      finalMessage =
        "Gatexpay Technologies Private Limited is a Jaipur-based fintech infrastructure company. We operate as a Technology Service Provider (TSP) and Customer Service Point (CSP) facilitation platform to bridge the gap between businesses and the digital payment ecosystem.";
      topic = "about_company";
      break;

    case "greeting":
      finalMessage =
        "Hello! Welcome to GateXPay. How can I assist you with our payment solutions, CSP services, or developer integrations today?";
      topic = "greeting";
      break;

    case "gratitude":
      finalMessage =
        "You are welcome! Please let us know if you need any further assistance with GateXPay services.";
      topic = "gratitude";
      break;

    case "multi_part":
      finalMessage =
        "Here are the details regarding your request:\n\n1. Payment Gateway Integration: Complete merchant onboarding to obtain API credentials, review developer SDKs, integrate checkout APIs, and test in sandbox before moving to production.\n\n2. Pricing: GateXPay pricing is custom-tailored based on your business volume and integration model. There are no fixed public rates; contact sales at info@gatexpay.in for a commercial proposal.";
      topic = "payment_gateway";
      break;

    default:
      if (knowledge.length > 0 && knowledge[0].score >= 6) {
        finalMessage = knowledge[0].item.answer;
        topic = knowledge[0].item.category;
      } else {
        finalMessage =
          "I don't have verified information about that topic in the GateXPay knowledge base. I can help you with GateXPay services such as Payment Gateway, CSP retail solutions, onboarding documents, or developer APIs. What would you like to explore?";
        requiresClarification = true;
        topic = "unclear";
      }
      break;
  }

  return {
    success: true,
    message: finalMessage,
    response: finalMessage,
    reply: finalMessage,
    followUps,
    suggestions: followUps,
    intent,
    topic,
    requiresClarification,
    confidence: requiresClarification ? 0.3 : 0.95,
    requestId,
  };
}
