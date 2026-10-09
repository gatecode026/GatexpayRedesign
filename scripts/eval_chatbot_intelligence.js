const { normalizeQuery } = require('../lib/chatbot/query-normalizer');
const { detectIntent } = require('../lib/chatbot/intent-detector');
const { retrieveKnowledge } = require('../lib/chatbot/retriever');
const { generateFallbackResponse } = require('../lib/chatbot/fallback-generator');
const { checkScopeGuard } = require('../lib/chatbot/scope-guard');

const testCases = [
  {
    id: 1,
    query: "What services does GateXPay offer?",
    expectedIntent: "services",
    expectedAspect: "overview",
  },
  {
    id: 2,
    query: "What does the Payment Gateway do?",
    expectedIntent: "payment_gateway_overview",
    expectedAspect: "overview",
  },
  {
    id: 3,
    query: "How can I integrate the Payment Gateway?",
    expectedIntent: "payment_gateway_integration",
    expectedAspect: "integration",
  },
  {
    id: 4,
    query: "Which payment methods are supported?",
    expectedIntent: "payment_methods",
    expectedAspect: "methods",
  },
  {
    id: 5,
    query: "What are the charges?",
    expectedIntent: "pricing",
    expectedAspect: "pricing",
  },
  {
    id: 6,
    query: "What documents are required for onboarding?",
    expectedIntent: "onboarding_documents",
    expectedAspect: "documents",
  },
  {
    id: 7,
    query: "Is GateXPay a bank or NBFC?",
    expectedIntent: "compliance_license",
    expectedAspect: "compliance",
  },
  {
    id: 8,
    query: "How can I contact support?",
    expectedIntent: "contact",
    expectedAspect: "contact",
  },
  {
    id: 9,
    query: "What is the difference between CSP and TSP?",
    expectedIntent: "csp_vs_tsp",
    expectedAspect: "comparison",
  },
  {
    id: 10,
    query: "How do I get started?",
    expectedIntent: "get_started",
    expectedAspect: "onboarding",
  },
  {
    id: 11,
    query: "How can I integrate it?",
    context: { activeProduct: "payment_gateway", lastIntent: "payment_gateway_overview" },
    expectedIntent: "payment_gateway_integration",
    expectedAspect: "integration",
  },
  {
    id: 12,
    query: "Where is your office located?",
    context: { activeProduct: "payment_gateway", lastIntent: "payment_gateway_integration" },
    expectedIntent: "contact_address",
    expectedAspect: "contact",
  },
  {
    id: 13,
    query: "What is the price of Bitcoin?",
    isOutOfScope: true,
  },
  {
    id: 14,
    query: "How do I integrate Payment Gateway and what are the charges?",
    expectedIntent: "multi_part",
    expectedAspect: "integration",
  },
  {
    id: 15,
    query: "GateXPay kya hai?",
    expectedIntent: "about_company",
    expectedAspect: "overview",
  },
  {
    id: 16,
    query: "Payment gateway kaise integrate kare aur kitna charge lagega?",
    expectedIntent: "multi_part",
    expectedAspect: "integration",
  },
];

console.log("===============================================================================");
console.log("   GATEXPAY CHATBOT EVALUATION SUITE — 16 SCENARIOS");
console.log("===============================================================================\n");

let passed = 0;
let total = testCases.length;

testCases.forEach((tc) => {
  const norm = normalizeQuery(tc.query);
  
  if (tc.isOutOfScope) {
    const scope = checkScopeGuard(tc.query, norm);
    const pass = scope.blocked && scope.reason === 'out_of_scope';
    if (pass) passed++;
    console.log(`[#${tc.id}] "${tc.query}"`);
    console.log(`      Scope Guard: BLOCKED (Out of Scope) | PASS: ${pass}\n`);
    return;
  }

  const detected = detectIntent(norm, tc.context || {});
  const retrieved = retrieveKnowledge(tc.query, detected.intent, {
    context: tc.context || {},
    normalized: norm,
  });

  const intentMatch = detected.intent === tc.expectedIntent;
  const pass = intentMatch && retrieved.items.length > 0;
  if (pass) passed++;

  console.log(`[#${tc.id}] "${tc.query}"`);
  console.log(`      Expected: ${tc.expectedIntent} | Actual: ${detected.intent}`);
  console.log(`      Retrieved: ${retrieved.items.map(i => i.id).join(', ') || 'NONE'}`);
  console.log(`      PASS: ${pass ? 'PASS' : 'FAIL'}\n`);
});

console.log("===============================================================================");
console.log(`RESULT: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
console.log("===============================================================================");

if (passed !== total) {
  process.exit(1);
}
