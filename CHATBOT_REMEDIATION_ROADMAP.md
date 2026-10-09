# GateXPay Chatbot — Prioritized Remediation Roadmap

This roadmap provides concrete, prioritized remediation tasks based on the findings discovered during the comprehensive audit.

---

## Priority Classification Framework

- **P0 (Critical)**: Active security vulnerabilities, data leaks, credential disclosures, or severe compliance violations.
- **P1 (High)**: Major reliability failures, primary AI provider silent failures causing 3.5s latency degradation, unconfigured failover credentials, or broken rate limiting across clusters.
- **P2 (Medium)**: Intent detection gaps, retriever scoring inaccuracies on compound questions, in-memory cache scaling limitations.
- **P3 (Low)**: Quality-of-life enhancements, UI streaming responses, persistent session storage.

---

## 1. P0 Findings — Critical Security & Exposure

*Note: The audit found **ZERO active database leakage vulnerabilities** and **ZERO cross-user data leakage vulnerabilities** because the chatbot is completely decoupled from MongoDB and holds no persistent state.*

### [P0-01] Single-Node Memory Rate Limiting in Serverless / Multi-Instance Deployments
- **Root Cause**: `chatRateLimiter` (`lib/chatbot/rate-limiter.js`) stores IP request counts in a local Javascript `Map`. In a multi-instance Vercel/Node cluster, requests from the same IP hit different instances, multiplying effective rate limits by the number of containers.
- **Evidence**: `lib/chatbot/rate-limiter.js:2` (`requests = new Map()`).
- **Affected Files**: [`lib/chatbot/rate-limiter.js`](file:///R:/gatexpayy/lib/chatbot/rate-limiter.js).
- **Business Impact**: A malicious actor could bypass the 15 req/min rate limit by hitting distributed instances, causing increased server resource consumption.
- **Recommended Fix**: Migrate rate limiter to Redis / Upstash (`@upstash/ratelimit` or Redis sliding-window counter) using the client IP hash.
- **Regression Risk**: Low. Requires Redis connection configuration.
- **Verification Test**: Simulate concurrent distributed requests from the same IP; verify total window limit is strictly 15 requests across all worker threads.

---

## 2. P1 Findings — High Reliability & Architecture Failures

### [P1-01] Primary AI Provider Silent HTTP 404 & 3.5-Second Latency Penalty
- **Root Cause**: In `lib/chatbot/config.js:5`, the Gemini model is hardcoded as `model: "gemini-2.0-flash"`. Google Generative AI has deprecated this model endpoint, returning `HTTP 404 ("This model models/gemini-2.0-flash is no longer available. Please update your code to use models/gemini-3.8-flash...")`.
- **Mechanism**: The backend attempts Gemini, fails, retries up to 3 times with exponential backoff (1s, 2s, 4s), and only then falls back to local deterministic responses. This injects **~3,500ms of useless blocking latency** on every single user question!
- **Evidence**: Runtime test returned `Gemini HTTP Status: 404`. Average response latency is 3,550ms instead of ~40ms for local fallback or ~500ms for live LLM.
- **Affected Files**: [`lib/chatbot/config.js`](file:///R:/gatexpayy/lib/chatbot/config.js), [`lib/chatbot/providers/gemini.js`](file:///R:/gatexpayy/lib/chatbot/providers/gemini.js).
- **Business Impact**: Every user experiences a slow, sluggish 3.5s delay before receiving a canned answer.
- **Recommended Fix**:
  1. Update `CHATBOT_CONFIG.gemini.model` to an active model such as `gemini-1.5-flash` or `gemini-2.5-flash`.
  2. Implement fast-fail on 404/model deprecation in `callWithRetry` so non-recoverable client/model errors do not retry 3 times with 1-4s backoff.
- **Regression Risk**: Very Low.
- **Verification Test**: Run `test_gemini_direct.js`; verify HTTP 200 returned within 600ms.

### [P1-02] Secondary AI Failover Credentials Missing in Environment
- **Root Cause**: In `lib/chatbot/providers/index.js`, the failover sequence is defined as `Gemini -> Groq -> OpenRouter -> Azure`. However, `.env.local` only contains `GEMINI_API_KEY` (which is failing with 404) and `AZURE_OPENAI_ENDPOINT` without `AZURE_OPENAI_API_KEY`. `GROQ_API_KEY` and `OPENROUTER_API_KEY` are completely absent.
- **Evidence**: Inspected `.env.local` keys; tested Azure client directly (`Azure API Key configured: false`).
- **Affected Files**: [`.env.local`](file:///R:/gatexpayy/.env.local), [`lib/chatbot/providers/index.js`](file:///R:/gatexpayy/lib/chatbot/providers/index.js).
- **Business Impact**: The advertised 4-tier provider failover architecture is inoperable; failure of Gemini immediately defaults to local static fallback.
- **Recommended Fix**: Add a valid `AZURE_OPENAI_API_KEY` or `GROQ_API_KEY` to provide true multi-provider redundancy.
- **Regression Risk**: Zero.
- **Verification Test**: Disable Gemini API key temporarily; verify the system seamlessly falls over to Groq or Azure and returns an AI-generated answer.

---

## 3. P2 Findings — Medium Retrieval & Intent Quality

### [P2-01] Missing "Compliance / Regulatory" Rule in Intent Detector
- **Root Cause**: `lib/chatbot/intent-detector.js` contains 18 rules for `payment_gateway`, `aeps`, `contact`, `location`, etc., but does **not** contain an intent rule for `compliance` or `licensing`. When a user asks *"Are you an RBI-licensed bank or NBFC?"*, intent detector returns `"unclear"`. Because confidence doesn't meet the 0.75 threshold without intent boosting, the chatbot returns a generic clarification prompt rather than the verified legal disclaimer in `about_company_clarification`.
- **Evidence**: TC-04 test result returned `intent: unclear` and prompted clarification instead of returning the compliance answer.
- **Affected Files**: [`lib/chatbot/intent-detector.js`](file:///R:/gatexpayy/lib/chatbot/intent-detector.js).
- **Business Impact**: Critical compliance and regulatory questions (which protect GateXPay from misrepresentation) are not answered directly.
- **Recommended Fix**: Add `{ intent: "compliance", keywords: ["bank", "nbfc", "rbi", "license", "licensing", "aggregator", "regulated"] }` to `INTENT_RULES` in `lib/chatbot/intent-detector.js`.
- **Regression Risk**: Low.
- **Verification Test**: Send *"Are you a bank or NBFC?"*; verify `intent: "compliance"` and the official non-bank disclaimer is returned.

### [P2-02] In-Memory Cache Key Ignores Contextual Follow-Up Ambiguity
- **Root Cause**: In `app/api/chat/route.js:184`, the cache key is solely `normalizedQuery.normalized`. If User A asks *"How do I integrate it?"* in the context of Payment Gateway, the answer for Payment Gateway is cached under key `"how do i integrate it"`. If User B later asks *"How do I integrate it?"* in the context of Micro ATM, User B will receive the cached Payment Gateway answer!
- **Evidence**: `app/api/chat/route.js:184` (`const cacheKey = normalizedQuery.normalized;`).
- **Affected Files**: [`app/api/chat/route.js`](file:///R:/gatexpayy/app/api/chat/route.js).
- **Business Impact**: Cross-topic contextual collision for identical follow-up phrasings.
- **Recommended Fix**: Construct cache key incorporating active topic: `const cacheKey = `${context.activeTopic || "global"}:${normalizedQuery.normalized}`;`.
- **Regression Risk**: Low.
- **Verification Test**: Send *"How do I integrate it?"* under PG context, then under AEPS context; verify independent, context-specific cached responses.

---

## 4. P3 Findings — Non-Critical Quality-of-Life Enhancements

### [P3-01] Streaming Responses (SSE / ReadableStream) Not Supported
- **Root Cause**: `Chatbot.jsx` uses standard `await fetch()` and awaits full JSON payload. `route.js` returns `NextResponse.json()`.
- **Affected Files**: [`components/common/Chatbot/Chatbot.jsx`](file:///R:/gatexpayy/components/common/Chatbot/Chatbot.jsx), [`app/api/chat/route.js`](file:///R:/gatexpayy/app/api/chat/route.js).
- **Business Impact**: Users see a loading typing bubble until the entire response is received, rather than smooth token-by-token streaming.
- **Recommended Fix**: Implement `AIStream` or Server-Sent Events (`text/event-stream`) for live token streaming.
- **Regression Risk**: Medium (requires frontend and backend streaming adapter changes).
