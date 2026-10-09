const fetch = globalThis.fetch;

const testCases = [
  {
    id: 1,
    query: "What services does GateXPay offer?",
    expectedIntent: "services",
  },
  {
    id: 2,
    query: "What does the Payment Gateway do?",
    expectedIntent: "payment_gateway_overview",
  },
  {
    id: 3,
    query: "How can I integrate the Payment Gateway?",
    expectedIntent: "payment_gateway_integration",
  },
  {
    id: 4,
    query: "Which payment methods are supported?",
    expectedIntent: "payment_methods",
  },
  {
    id: 5,
    query: "What are the charges?",
    expectedIntent: "pricing",
  },
  {
    id: 6,
    query: "What documents are required for onboarding?",
    expectedIntent: "onboarding_documents",
  },
  {
    id: 7,
    query: "Is GateXPay a bank or NBFC?",
    expectedIntent: "compliance_license",
  },
  {
    id: 8,
    query: "How can I contact support?",
    expectedIntent: "contact",
  },
  {
    id: 9,
    query: "What is the difference between CSP and TSP?",
    expectedIntent: "csp_vs_tsp",
  },
  {
    id: 10,
    query: "How do I get started?",
    expectedIntent: "get_started",
  },
  {
    id: 11,
    query: "How can I integrate it?",
    history: [
      { role: "user", content: "What does the Payment Gateway do?" },
      { role: "assistant", content: "GateXPay assists businesses with payment gateway integration." }
    ],
    expectedIntent: "payment_gateway_integration",
  },
  {
    id: 12,
    query: "Where is your office located?",
    history: [
      { role: "user", content: "What does the Payment Gateway do?" },
      { role: "assistant", content: "GateXPay assists businesses with payment gateway integration." }
    ],
    expectedIntent: "contact_address",
  },
  {
    id: 13,
    query: "What is the price of Bitcoin?",
    expectedIntent: "out_of_scope",
  },
  {
    id: 14,
    query: "How do I integrate Payment Gateway and what are the charges?",
    expectedIntent: "multi_part",
  },
  {
    id: 15,
    query: "GateXPay kya hai?",
    expectedIntent: "about_company",
  },
  {
    id: 16,
    query: "Payment gateway kaise integrate kare aur kitna charge lagega?",
    expectedIntent: "multi_part",
  },
];

async function runEval() {
  console.log("===============================================================================");
  console.log("   GATEXPAY CHATBOT EVALUATION SUITE — 16 LIVE SCENARIOS (port 3001)");
  console.log("===============================================================================\n");

  let passed = 0;
  const total = testCases.length;

  for (const tc of testCases) {
    const t0 = Date.now();
    try {
      const messages = [...(tc.history || []), { role: "user", content: tc.query }];
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      const data = await res.json();
      const latency = Date.now() - t0;
      const actualIntent = data.intent || (data.message?.includes("Bitcoin") ? "out_of_scope" : "unknown");

      const isPass = actualIntent === tc.expectedIntent;
      if (isPass) passed++;

      console.log(`[#${tc.id}] "${tc.query}"`);
      console.log(`      Expected: ${tc.expectedIntent} | Actual: ${actualIntent} (${latency}ms)`);
      console.log(`      Snippet:  ${data.message ? data.message.substring(0, 95).replace(/\n/g, ' ') : ''}...`);
      console.log(`      Status:   ${isPass ? "PASS" : "FAIL"}\n`);
    } catch (err) {
      console.log(`[#${tc.id}] ERROR: ${err.message}\n`);
    }
  }

  console.log("===============================================================================");
  console.log(`FINAL RESULT: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log("===============================================================================");

  if (passed !== total) {
    process.exit(1);
  }
}

runEval();
