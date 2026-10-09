# GateXPay Chatbot — Complete Data Source Map

This document maps every discovered data source, knowledge store, database collection, and hardcoded asset in the GateXPay application to evaluate how the chatbot acquires information.

---

## 1. Summary of Data Access Mechanisms

| Category | Present in Codebase? | Accessible by Chatbot? | Evidence File |
|---|---|---|---|
| **MongoDB / Mongoose Collections** | YES (`Enquiry`, `User`, `Notification`, etc.) | **NO (0% Database Access)** | [`app/api/chat/route.js`](file:///R:/gatexpayy/app/api/chat/route.js) |
| **Vector Database / Embeddings** | **NO** (No Pinecone, Chroma, Qdrant, pgvector) | **NO** | [`package.json`](file:///R:/gatexpayy/package.json) |
| **Document Ingestion / OCR / PDF Parsing** | **NO** | **NO** | [`package.json`](file:///R:/gatexpayy/package.json) |
| **External Web Search / Third-Party APIs** | **NO** (No Google, Bing, SerpAPI, Tavily) | **NO** | [`lib/chatbot/providers/`](file:///R:/gatexpayy/lib/chatbot/providers) |
| **In-Memory Static Knowledge Base** | **YES** (19 structured JSON objects) | **YES (100% Primary Source)** | [`lib/chatbot/knowledge-base.js`](file:///R:/gatexpayy/lib/chatbot/knowledge-base.js) |
| **Hardcoded Prompts & Rules** | **YES** | **YES** | [`lib/chatbot/system-prompt.js`](file:///R:/gatexpayy/lib/chatbot/system-prompt.js) |
| **Transient In-Memory Cache** | **YES** (5-minute TTL Map) | **YES** | [`lib/chatbot/cache.js`](file:///R:/gatexpayy/lib/chatbot/cache.js) |
| **Transient In-Memory IP Rate Limiter** | **YES** (15 req/min Map) | **YES** | [`lib/chatbot/rate-limiter.js`](file:///R:/gatexpayy/lib/chatbot/rate-limiter.js) |

---

## 2. Exhaustive Data Source Inventory

| Source ID | Source Type | File / Function | Data Retrieved | Retrieval Method | Permissions | Freshness | Used in Answer? | Evidence | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| **DS-01** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`about_company_overview`) | Company name, Jaipur HQ, TSP & CSP facilitation scope | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 2-25 | VERIFIED |
| **DS-02** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`about_company_clarification`) | Non-bank, non-NBFC, non-PA disclaimer; partner banking rails | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 26-44 | VERIFIED |
| **DS-03** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`contact_phone`) | Phone: `+91 8502888838` | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 45-70 | VERIFIED |
| **DS-04** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`contact_email`) | Email: `info@gatexpay.in` | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 71-94 | VERIFIED |
| **DS-05** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`contact_address`) | Address: `412, Sumer Nagar, Mansarovar, Jaipur, Rajasthan - 302020` | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 95-120 | VERIFIED |
| **DS-06** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`contact_general`) | Consolidated phone, email, and office address | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 121-138 | VERIFIED |
| **DS-07** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`leadership_details`) | Founders: Vansh Chaudhary (CEO), Govind Jain (CFO) | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 139-166 | VERIFIED |
| **DS-08** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`services_csp_overview`) | Retail agent suite: AEPS, Micro ATM, DMT, BBPS, e-PAN, eKYC | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 167-193 | VERIFIED |
| **DS-09** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`services_tsp_overview`) | Core engineering: PG APIs, banking APIs, web/mobile dev, cloud hosting | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 194-221 | VERIFIED |
| **DS-10** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`payment_gateway_details`) | Payment gateway: UPI, cards, net banking, wallets, plugins | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 222-250 | VERIFIED |
| **DS-11** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`services_aeps_details`) | AEPS biometric cash withdrawal, balance enquiry, mini statements | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 251-274 | VERIFIED |
| **DS-12** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`services_micro_atm_details`) | Micro ATM card swiping hardware, real-time settlement routing | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 275-298 | VERIFIED |
| **DS-13** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`pricing_general`) | Custom quotation policy; refusal to state public fixed fees | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 299-316 | VERIFIED |
| **DS-14** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`security_compliance_details`) | 99.9% uptime design claim, PCI-DSS alignment via banking partners | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 317-342 | VERIFIED |
| **DS-15** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`company_statistics`) | 500+ businesses enabled, 50+ integrations, 5+ years expertise | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 343-367 | VERIFIED |
| **DS-16** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`onboarding_documents`) | 7 required merchant KYC documents (Certificate, PAN, GST, etc.) | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 368-393 | VERIFIED |
| **DS-17** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`general_greeting`) | Standard friendly greeting message | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 394-421 | VERIFIED |
| **DS-18** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`general_gratitude`) | Standard gratitude acknowledgement | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 422-443 | VERIFIED |
| **DS-19** | In-Memory Static KB | `lib/chatbot/knowledge-base.js` (`general_services`) | 3-pillar services summary (PG, CSP, TSP) | Keyword/intent scoring via `retrieveKnowledge` | Public | Static (`lastVerifiedAt: 2026-08-03`) | **YES** | Lines 444-471 | VERIFIED |
| **DS-20** | Hardcoded Prompt | `lib/chatbot/system-prompt.js` (`SYSTEM_PROMPT`) | Tone, compliance guardrails, refusal constraints, formatting rules | Injected into provider system message | System Internal | Static | **YES** (when LLM called) | Lines 1-30 | CODE-CONFIRMED |
| **DS-21** | In-Memory Cache | `lib/chatbot/cache.js` (`chatCache`) | Cached JSON response object `{ reply, followUps, intent, topic }` | Map lookup by normalized string | None (IP agnostic) | 5-minute TTL | **YES** (on repeat query) | Lines 1-23 | VERIFIED |
| **DS-22** | Application Database | `models/enquiry.model.js` (`EnquiryCollection`) | Customer leads, phone numbers, requirements, service types | **NOT CONNECTED** | Admin JWT | Live DB | **NO** (0 queries made) | No import in route | VERIFIED |
| **DS-23** | Application Database | `models/user.model.js` (`UserCollection`) | Admin credentials, password hashes, roles | **NOT CONNECTED** | Admin JWT | Live DB | **NO** (0 queries made) | No import in route | VERIFIED |
| **DS-24** | Application Database | `models/notification.model.js` (`NotificationCollection`) | Admin system notifications | **NOT CONNECTED** | Admin JWT | Live DB | **NO** (0 queries made) | No import in route | VERIFIED |
| **DS-25** | External Web Search | N/A | Live search results, internet documents | **NOT IMPLEMENTED** | N/A | Real-time | **NO** (0 calls made) | No external search SDK | VERIFIED |
| **DS-26** | Vector Store | N/A | Vector embeddings, semantic indices | **NOT IMPLEMENTED** | N/A | Real-time | **NO** (0 embeddings) | No vector DB dependency | VERIFIED |
