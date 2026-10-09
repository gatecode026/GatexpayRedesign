# MASTER AUDIT REPORT — GateXPay Chatbot Intelligence, Data Sources, Retrieval & Answer Accuracy

**Audit Scope**: End-to-end Chatbot Architecture, Data Ingestion, Retrieval Mechanisms, LLM Orchestration, Security Constraints, and Answer Truth in the GateXPay Application.  
**Auditor Role**: Principal AI Engineer, LLM Systems Architect, Application Security Specialist & QA Auditor.  
**Audit Date**: October 9, 2026.  
**Overall Verdict**: **NEEDS IMPROVEMENT** (High Security Isolation & Verified Safety Controls, but Primary External AI Provider Disabled by Model Deprecation Leading to 3.5s Latency Penalty & Silent Fallback to Local Knowledge Base).

---

## 1. Executive Summary

This comprehensive audit analyzed the end-to-end implementation of the chatbot in the GateXPay codebase. Every conclusion in this report is grounded in **verifiable code inspection** (`CODE-CONFIRMED`) and **live HTTP runtime execution** (`VERIFIED`) against the active application environment.

### Core Discoveries:
1. **Zero Database Access (100% Isolated)**: The chatbot has **zero connections to MongoDB** (`models/enquiry.model.js`, `models/user.model.js`, `models/notification.model.js`). It cannot query, read, leak, or modify customer records, leads, admin credentials, order volumes, or transaction histories.
2. **Deterministic RAG Architecture (No Vector DB / No Web Search)**: The system does not use Pinecone, Qdrant, Chroma, or embeddings. It employs a **custom in-memory deterministic retrieval system** with 19 compliance-approved static knowledge records ([`lib/chatbot/knowledge-base.js`](file:///R:/gatexpayy/lib/chatbot/knowledge-base.js)).
3. **Primary AI Provider Failure & Silent Fallback**: The configured primary LLM model in [`lib/chatbot/config.js`](file:///R:/gatexpayy/lib/chatbot/config.js) is `gemini-2.0-flash`. Live testing revealed Google's API returns **HTTP 404** (*"This model models/gemini-2.0-flash is no longer available"*). Because fallback providers (`groq`, `openrouter`, `azure`) lack complete API credentials in `.env.local`, the system fails over after 3 retries (causing a ~3,500ms delay) and silently serves verbatim static text from [`lib/chatbot/fallback-generator.js`](file:///R:/gatexpayy/lib/chatbot/fallback-generator.js).
4. **Strong Security & Sensitive Data Shields**: The chatbot features an effective 3-tier defense:
   - **Credential Blocker** ([`checkLeadSecurity`](file:///R:/gatexpayy/lib/chatbot/lead-qualification.js)): Regex detects 13-16 digit card numbers, CVVs, passwords, PINs, and OTPs, immediately returning a security refusal in <45ms.
   - **Scope Guard** ([`evaluateScope`](file:///R:/gatexpayy/lib/chatbot/scope-guard.js)): Detects prompt injection ("ignore previous instructions", "jailbreak") and out-of-scope topics (weather, politics, generic coding) in <35ms.
   - **Response Validator** ([`validateResponse`](file:///R:/gatexpayy/lib/chatbot/response-validator.js)): Enforces compliance by rejecting bold markdown, markdown tables, false bank/NBFC claims, and unverified pricing digits.

---

## 2. Overall Chatbot Architecture

The GateXPay chatbot is implemented as a lightweight, resilient hybrid retrieval engine designed to assist prospective clients with fintech solutions while preventing hallucinations and unauthorized data disclosures.

### High-Level Architectural Flow:
```
[ User in Browser ]
       │
       ▼ (React State: messages[])
[ components/common/Chatbot/Chatbot.jsx ]
       │
       ▼ (HTTP POST /api/chat with { messages })
[ app/api/chat/route.js ]
       │
       ├──► 1. Rate Limiter (lib/chatbot/rate-limiter.js) [15 req/min]
       ├──► 2. Security Credential Filter (lib/chatbot/lead-qualification.js) [Regex Card/CVV/OTP]
       ├──► 3. Query Normalization & Language Detect (lib/chatbot/query-normalizer.js) [Eng/Hindi/Hinglish]
       ├──► 4. In-Memory Response Cache (lib/chatbot/cache.js) [5-min TTL]
       ├──► 5. Scope Guard (lib/chatbot/scope-guard.js) [Injection & Out-of-Scope Detection]
       ├──► 6. Intent Detector (lib/chatbot/intent-detector.js) [18 Keyword Rules]
       ├──► 7. Knowledge Retriever (lib/chatbot/retriever.js) [Scored Match over 19 Verified Items]
       ├──► 8. Follow-Up Suggestion Generator (lib/chatbot/follow-up-generator.js) [3 Structured Chips]
       ├──► 9. Multi-Provider Orchestrator (lib/chatbot/providers/index.js) [Gemini -> Groq -> OpenRouter -> Azure]
       │         │
       │         ├── (Model Deprecated / 404 / Missing Keys)
       │         ▼
       ├──► 10. Output Validator (lib/chatbot/response-validator.js)
       │         │ (If AI Fails or Fails Validation)
       │         ▼
       └──► 11. Local Deterministic Fallback Generator (lib/chatbot/fallback-generator.js)
```

---

## 3. End-to-End Message Flow

### A. Frontend Layer
- **Component File**: [`components/common/Chatbot/Chatbot.jsx`](file:///R:/gatexpayy/components/common/Chatbot/Chatbot.jsx) (387 lines), styled by [`Chatbot.css`](file:///R:/gatexpayy/components/common/Chatbot/Chatbot.css).
- **Mounted In**: [`ConditionalLayout.jsx`](file:///R:/gatexpayy/components/layout/ConditionalLayout/ConditionalLayout.jsx) on all public website pages; hidden automatically on `/admin*` routes (`pathname?.startsWith("/admin")`).
- **State Lifecycle**:
  - `messages`: Initialized to `[{ role: "assistant", content: "Hi! I am the GateXPay AI Assistant..." }]`.
  - `suggestions`: Initialized to 4 starter question chips (`STARTER_QUESTIONS`).
  - `isRequestPending`: `useRef(false)` prevents concurrent/duplicate form submissions.
  - `send(text)`: Trims query, appends `{ role: "user", content: msg }`, clears input, and calls `fetch("/api/chat")`.
- **Payload Contract**:
  ```json
  {
    "messages": [
      { "role": "user", "content": "..." },
      { "role": "assistant", "content": "..." },
      { "role": "user", "content": "..." }
    ]
  }
  ```
- **Context & Persistence**:
  - `sessionId`, `userId`, `tenantId`, `authContext`: **NONE**.
  - Local persistence: **NONE** (No `localStorage`, no `sessionStorage`, no cookies). Chat history resets on page reload.
  - Streaming: **NOT supported**. Single JSON roundtrip.
  - Canned UI Fallbacks: If network fetch fails, UI catches error and renders: *"Connection error. Please check your network and try again."*

### B. Backend Layer
- **Route File**: [`app/api/chat/route.js`](file:///R:/gatexpayy/app/api/chat/route.js) (368 lines).
- **Endpoint**: `POST /api/chat`.
- **Authentication**: Public unauthenticated route.
- **Middleware**: None.

---

## 4. Confirmed Model and Provider Configuration

### A. Provider Hierarchy
Configured in [`lib/chatbot/providers/index.js`](file:///R:/gatexpayy/lib/chatbot/providers/index.js):
1. **Primary**: Google Gemini ([`geminiProvider`](file:///R:/gatexpayy/lib/chatbot/providers/gemini.js))
2. **Secondary**: Groq ([`groqProvider`](file:///R:/gatexpayy/lib/chatbot/providers/groq.js))
3. **Tertiary**: OpenRouter ([`openRouterProvider`](file:///R:/gatexpayy/lib/chatbot/providers/openrouter.js))
4. **Quaternary**: Azure OpenAI ([`azureProvider`](file:///R:/gatexpayy/lib/chatbot/providers/azure.js))

### B. Runtime Environment Status

| Provider | Configured Key in `.env.local` | Target Endpoint | Configured Model | Runtime Execution Result |
|---|---|---|---|---|
| **Gemini** | `GEMINI_API_KEY` (Present) | `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions` | `gemini-2.0-flash` | **FAILED (HTTP 404: Model no longer available)** |
| **Groq** | `GROQ_API_KEY` (**Missing**) | `https://api.groq.com/openai/v1/chat/completions` | `llama-3.3-70b-versatile` | **SKIPPED (`!isConfigured()`)** |
| **OpenRouter** | `OPENROUTER_API_KEY` (**Missing**) | `https://openrouter.ai/api/v1/chat/completions` | `google/gemini-2.0-flash-exp:free` | **SKIPPED (`!isConfigured()`)** |
| **Azure** | `AZURE_OPENAI_API_KEY` (**Missing**)<br>`AZURE_OPENAI_ENDPOINT` (Present) | `{endpoint}/chat/completions` | `gpt-4o` | **SKIPPED (`!isConfigured()`)** |

### C. Live AI Execution Finding
Direct execution test against the Gemini endpoint confirmed:
```json
{
  "error": {
    "code": 404,
    "message": "This model models/gemini-2.0-flash is no longer available. Please update your code to use models/gemini-3.8-flash for the latest features and improvements."
  }
}
```
**Conclusion**: Currently, 100% of chatbot responses are served by the **local deterministic fallback generator** ([`lib/chatbot/fallback-generator.js`](file:///R:/gatexpayy/lib/chatbot/fallback-generator.js)). The system retries Gemini 3 times before falling back, creating an unnecessary ~3.5-second latency delay on every request.

---

## 5. Complete Data Source Inventory

The chatbot draws its answers **exclusively** from a static in-memory JavaScript file: [`lib/chatbot/knowledge-base.js`](file:///R:/gatexpayy/lib/chatbot/knowledge-base.js).

### Inventory Breakdown:
- **Total Knowledge Items**: 19 items across 14 categories.
- **Verification Status**: 100% marked `verified: true`, `approvedBy: "Compliance"`, `lastVerifiedAt: "2026-08-03"`.
- **Categories Covered**:
  1. `about_company` (3 items): Overview, founders (Vansh Chaudhary CEO, Govind Jain CFO), track record (500+ businesses, 50+ integrations, 5+ years).
  2. `compliance` (1 item): Important licensing clarification (Non-bank, non-NBFC, non-PA disclaimer).
  3. `contact` (4 items): Phone (`+91 8502888838`), Email (`info@gatexpay.in`), Address (`412, Sumer Nagar, Mansarovar, Jaipur, Rajasthan - 302020`), General Contact.
  4. `csp_services` (1 item): Customer Service Point retail agent suite.
  5. `tsp_services` (1 item): Technology Service Provider enterprise API suite.
  6. `payment_gateway` (1 item): Payment methods (UPI, cards, netbanking, wallets).
  7. `aeps` (1 item): Aadhaar Enabled Payment System biometric cash withdrawal.
  8. `micro_atm` (1 item): POS card-swipe withdrawal hardware.
  9. `pricing` (1 item): Custom quote policy refusing fixed public commercial rates.
  10. `security` (1 item): 99.9% uptime design claim, PCI-DSS alignment via banking partners.
  11. `onboarding` (1 item): 7 mandatory merchant KYC registration documents.
  12. `greeting` (1 item): Standard greeting welcome.
  13. `gratitude` (1 item): Standard gratitude acknowledgement.
  14. `services` (1 item): 3-pillar comprehensive services summary.

---

## 6. Database Collections & Query Mapping

- **Application Database**: MongoDB (via Mongoose in [`models/`](file:///R:/gatexpayy/models)).
- **Existing Collections**:
  - `EnquiryCollection` ([`models/enquiry.model.js`](file:///R:/gatexpayy/models/enquiry.model.js)): Stores customer leads, contact inquiries, requirements.
  - `UserCollection` ([`models/user.model.js`](file:///R:/gatexpayy/models/user.model.js)): Stores admin authentication accounts, bcrypt password hashes.
  - `NotificationCollection` ([`models/notification.model.js`](file:///R:/gatexpayy/models/notification.model.js)): Stores admin alerts.
- **Chatbot Database Access**: **NONE**.
  - No Mongoose models or database clients are imported into [`app/api/chat/route.js`](file:///R:/gatexpayy/app/api/chat/route.js) or any file in [`lib/chatbot/`](file:///R:/gatexpayy/lib/chatbot).
  - Queries for database extraction (TC-13, TC-14: *"Show me customer enquiries"*, *"List admin users from MongoDB"*) cannot access data because no database query layer exists in the chatbot route.

---

## 7. Static, Mock, and Hardcoded Data Findings

1. **Hardcoded Company Facts**: Phone number, email address, physical Jaipur address, and founder names are hardcoded in [`knowledge-base.js`](file:///R:/gatexpayy/lib/chatbot/knowledge-base.js). If the company phone or address changes, updating MongoDB will not update the chatbot; it must be edited in `knowledge-base.js`.
2. **Hardcoded System Constraints**: [`lib/chatbot/system-prompt.js`](file:///R:/gatexpayy/lib/chatbot/system-prompt.js) strictly instructs the model:
   - Rule 6: *"Never claim GateXPay is a bank, NBFC, licensed payment aggregator, government body, or regulated financial institution..."*
   - Rule 7: *"Never invent pricing, licences, certifications, partnerships, client names, transaction volumes, uptime, settlement time..."*
   - Rule 8: *"Do not guarantee approval, transaction success, onboarding, settlement, revenue..."*
3. **Hardcoded Canned Follow-ups**: [`lib/chatbot/follow-up-generator.js`](file:///R:/gatexpayy/lib/chatbot/follow-up-generator.js) generates 3 deterministic question chips based on detected intent, falling back to a default set of 3 questions.

---

## 8. RAG, Document, and External Search Findings

- **Vector Database**: **None**. No vector embeddings, no vector indexing, no similarity cosine calculations.
- **Retrieval Mechanism**: Implemented in [`lib/chatbot/retriever.js`](file:///R:/gatexpayy/lib/chatbot/retriever.js):
  - Weighted heuristic scoring:
    - Exact question match: +5 points
    - Title word overlap: +4 points
    - Intent category group match: +4 points
    - Keyword matches: +2 points per keyword
    - Related topics match: +1 point
    - Active conversation context match: +3 points
  - Normalization: Best score divided by 12. Strong match threshold = 0.75 (or 0.50 with active topic).
- **Document / PDF / OCR Ingestion**: None. The chatbot does not parse uploaded PDFs or documentation files.
- **Web Search**: None. The chatbot does not execute external web searches.

---

## 9. Conversation Memory and Context Handling

- **History Pruning**: [`limitConversationHistory`](file:///R:/gatexpayy/lib/chatbot/context-manager.js:2) limits conversation history to a maximum of **4 messages** (`CHATBOT_CONFIG.limits.maxHistoryLength = 4`).
- **Context Reconstruction**: [`buildConversationContext`](file:///R:/gatexpayy/lib/chatbot/context-manager.js:9) scans past messages to extract:
  - `activeTopic`: e.g. `payment_gateway`, `aeps`, `micro_atm`, `csp_services`, `tsp_services`.
  - `businessType`: e.g. `retail/e-commerce`.
  - `integrationPlatform`: e.g. `mobile_app`, `website`.
- **Session Isolation**: Each request is stateless. The browser sends its own message history in the HTTP POST body. Conversation context is isolated per request; there is **zero risk of cross-user memory leakage**.

---

## 10. Answer Generation & Grounding Behavior

When the AI provider is active, [`SYSTEM_PROMPT`](file:///R:/gatexpayy/lib/chatbot/system-prompt.js) injects the retrieved knowledge items under `Supplied GateXPay Knowledge Context:`.  
The output is then vetted by [`validateResponse`](file:///R:/gatexpayy/lib/chatbot/response-validator.js):
- Sanitizes double-asterisk bold formatting (`**`).
- Flags markdown tables (`|`).
- Strips forbidden conversational fillers ("certainly", "of course", "sure", "great question").
- Replaces hallucinated `99.99%` uptime with the verified `99.9%` metric.
- Rejects unverified numerical pricing claims (MDR percentages, setup fees).
- Rejects false claims that GateXPay is a bank or NBFC.

If the output validator detects violations or if the AI provider fails, [`generateFallbackResponse`](file:///R:/gatexpayy/lib/chatbot/fallback-generator.js) delivers the exact verified text from `knowledge-base.js`.

---

## 11. Business Calculation and Data Consistency Findings

- **Arithmetic & Dynamic Totals**: The chatbot performs **no dynamic financial calculations**, no fee computations, and no transaction aggregations.
- **Fixed Pricing Refusal**: When asked for commercial rates, the chatbot explicitly states that pricing is custom-tailored based on business volume and refuses to quote public figures (verified in TC-05).
- **Discrepancy with Admin Dashboard**: Because the chatbot has no database connection, it cannot report dashboard statistics (e.g., total leads, unread count). When asked for internal metrics, it prompts for clarification or redirects to public services.

---

## 12. Security and Privacy Assessment

| Security Dimension | Evaluation | Status |
|---|---|---|
| **SQL / NoSQL Injection** | No queries executed against any database; NoSQL injection impossible | **SECURE** |
| **PII & Card Number Leakage** | `checkLeadSecurity` regex blocks card numbers (13-16 digits), CVVs, passwords, PINs, and OTPs before prompt assembly | **SECURE** |
| **Prompt Injection & Jailbreak** | `evaluateScope` detects "ignore instructions", "system prompt", "jailbreak" keywords; returns redirection prompt in <35ms | **SECURE** |
| **System Prompt Disclosure** | Prompt instruction explicitly forbids leaking instructions; scope guard blocks prompt extraction queries | **SECURE** |
| **Cross-User Data Isolation** | No server-side session persistence; each request is self-contained | **SECURE** |
| **Rate Limiting** | In-memory IP rate limiter enforces 15 requests per minute; returns HTTP 429 when exceeded | **SECURE** (Single-node) |
| **API Key Exposure** | Keys are stored in `.env.local` server-side; none are leaked to frontend bundles | **SECURE** |

---

## 13. Performance, Reliability, and Observability

- **Security Rejection Latency**: **27ms – 43ms** (Near-instant execution for prompt injection, out-of-scope queries, and credential filters).
- **In-Memory Cache Latency**: **<15ms** on cache hit.
- **Normal Query Latency**: **~3,500ms** (Severely degraded by Gemini 404 retries with exponential backoff before local fallback execution).
- **Observability**: [`logChatRequest`](file:///R:/gatexpayy/lib/chatbot/logger.js) outputs structured JSON logs to stdout with `requestId`, `durationMs`, `provider`, `cacheHit`, and `fallbackUsed`.

---

## 14. Reproducible Test Results Summary

Full execution details are documented in [`CHATBOT_TEST_MATRIX.md`](file:///R:/gatexpayy/CHATBOT_TEST_MATRIX.md).

- **18 Test Cases Executed**:
  - **17 PASSED** (Known answers, office location, contact phone, prompt injection refusal, card number blocking, credential leak blocking, out-of-scope redirection, generic coding refusal, database extraction refusal, multi-turn context retention, history pruning, Hinglish support).
  - **1 RATE LIMITED AS EXPECTED** (TC-16 triggered the 15 req/min security threshold on the 16th rapid request, verified and passed on reset).
  - **0 FAILED**.

---

## 15. Confirmed Bugs & Root Causes

1. **Primary AI Model Deprecation (HTTP 404)**:
   - *Location*: [`lib/chatbot/config.js:5`](file:///R:/gatexpayy/lib/chatbot/config.js).
   - *Bug*: Model `gemini-2.0-flash` is no longer supported by Google Generative AI endpoint.
   - *Impact*: Injects ~3.5 seconds of retry delay into every user query before falling back to static text.
2. **Missing Backup Credentials in Environment**:
   - *Location*: [`.env.local`](file:///R:/gatexpayy/.env.local).
   - *Bug*: `GROQ_API_KEY`, `OPENROUTER_API_KEY`, and `AZURE_OPENAI_API_KEY` are missing or unconfigured.
   - *Impact*: Eliminates multi-provider failover capability.
3. **Missing "Compliance / Licensing" Intent Rule**:
   - *Location*: [`lib/chatbot/intent-detector.js`](file:///R:/gatexpayy/lib/chatbot/intent-detector.js).
   - *Bug*: No intent rule maps queries like *"Are you an RBI bank or NBFC?"* to intent `compliance`.
   - *Impact*: Returns a generic clarification prompt instead of the verified legal non-bank disclaimer.
4. **Context-Blind Cache Key**:
   - *Location*: [`app/api/chat/route.js:184`](file:///R:/gatexpayy/app/api/chat/route.js).
   - *Bug*: `cacheKey = normalizedQuery.normalized`.
   - *Impact*: Follow-up queries like *"How do I integrate it?"* cache under the query string alone, risking cross-topic collision between Payment Gateway and AEPS.

---

## 16. Prioritized Remediation Summary

Detailed action items are documented in [`CHATBOT_REMEDIATION_ROADMAP.md`](file:///R:/gatexpayy/CHATBOT_REMEDIATION_ROADMAP.md):
- **P0-01**: Migrate in-memory rate limiter to Redis/Upstash for multi-instance production clusters.
- **P1-01**: Upgrade Gemini model in `config.js` to an active model (e.g. `gemini-1.5-flash` or `gemini-2.5-flash`) and implement fast-fail on 404.
- **P1-02**: Populate secondary AI credentials (`AZURE_OPENAI_API_KEY` or `GROQ_API_KEY`) for true failover redundancy.
- **P2-01**: Add `compliance` intent rule to `intent-detector.js`.
- **P2-02**: Prepend `activeTopic` to the cache key in `route.js`.
- **P3-01**: Implement Server-Sent Events (SSE) streaming for real-time token rendering.
