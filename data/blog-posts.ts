// Gate X Pay Insights — blog article data model.
// Single source of truth used by the listing page (search/filter/load-more)
// and the article detail route, so every surface stays in sync.

export type BlogCategory =
  | "Compliance & Regulation"
  | "Engineering & Tech"
  | "Business Growth"
  | "Company News";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string[];
  image: string;
  category: BlogCategory;
  publishedAt: string; // ISO date
  readTime: number; // minutes
  featured?: boolean;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Compliance & Regulation",
  "Engineering & Tech",
  "Business Growth",
  "Company News",
];

export const CATEGORY_BADGE: Record<BlogCategory, { bg: string; text: string }> = {
  "Compliance & Regulation": { bg: "#DCFCE7", text: "#16A34A" },
  "Engineering & Tech": { bg: "#DBEAFE", text: "#0284C7" },
  "Business Growth": { bg: "#FEE2E2", text: "#FF3636" },
  "Company News": { bg: "#FEF3C7", text: "#D97706" },
};

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "rbi-pa-pg-licensing-guide-2026",
    slug: "rbi-payment-aggregator-licensing-guide-2026",
    title:
      "Understanding RBI's Payment Aggregator Licensing: A Complete Compliance Guide for Indian Fintechs in 2026",
    description:
      "The RBI's PA-PG framework has fundamentally reshaped how businesses collect payments online. This deep-dive covers every requirement from net worth thresholds to escrow obligations and what non-compliance actually costs you.",
    content: [
      "Payment aggregation in India now sits squarely inside the RBI's regulatory perimeter, and that changes how every business — from a marketplace to a single merchant — needs to think about who they route transactions through.",
      "The practical impact shows up in three places: how customer funds are held before settlement, how quickly a licensed aggregator can onboard a new merchant, and how audit trails are maintained for every transaction leg.",
      "For businesses evaluating a payment partner, the fastest way to de-risk this is to confirm licensing status directly and ask how escrow and settlement timelines are handled — not just whether a checkout button exists.",
    ],
    image: "/assets/images/card-rbi.png",
    category: "Compliance & Regulation",
    publishedAt: "2026-09-12",
    readTime: 8,
    featured: true,
  },
  {
    id: "tokenization-api-60-minutes",
    slug: "tokenization-api-integration-60-minutes",
    title: "Integrating GateXPay's Tokenization API in Under 60 Minutes",
    description:
      "A step-by-step walkthrough for backend engineers: from sandbox credentials to your first tokenized transaction, with copy-paste examples in Node.js and PHP.",
    content: [
      "Card tokenization replaces sensitive card data with a reference token, so your servers never need to store raw PAN data — which simplifies both security posture and PCI scope.",
      "Getting a sandbox key, generating a token, and charging against it is a three-step loop. Most integration time is spent on webhook handling for token lifecycle events, not the initial charge itself.",
      "Once the happy path works, the next thing worth testing is token expiry and re-tokenization — the two cases that most commonly break checkout flows in production.",
    ],
    image: "/assets/images/card-it-software.jpg",
    category: "Engineering & Tech",
    publishedAt: "2026-09-05",
    readTime: 6,
  },
  {
    id: "fintech-scaled-10cr-100cr-gmv",
    slug: "fintech-scaled-10cr-to-100cr-gmv",
    title: "How a Mid-Sized Fintech Scaled from ₹10 Cr to ₹100 Cr Monthly GMV",
    description:
      "A behind-the-scenes case study on architecture decisions, payment routing strategy, and the reconciliation systems that held up under 10x transaction growth.",
    content: [
      "Growth on this scale rarely breaks at the payment gateway itself — it breaks at reconciliation, where a small mismatch rate becomes a large absolute number once volume multiplies.",
      "The team's biggest architectural change was moving from a single settlement pipeline to a multi-rail routing layer, letting them shift volume across providers based on live success rates.",
      "The lesson that generalizes: instrument reconciliation and success-rate monitoring before you need them, not after a spike in support tickets forces the issue.",
    ],
    image: "/assets/images/card-fintech.jpg",
    category: "Business Growth",
    publishedAt: "2026-09-03",
    readTime: 9,
  },
  {
    id: "gatexpay-csp-2-rural-banking",
    slug: "gatexpay-launches-csp-2-0-rural-banking",
    title: "GateXPay Launches CSP 2.0: Banking-as-a-Service for Rural India",
    description:
      "We're proud to announce our expanded CSP platform, bringing Micro ATM, AEPS, and full banking correspondent services to underserved districts across India.",
    content: [
      "CSP 2.0 extends our existing agency banking stack with a redesigned agent onboarding flow, faster biometric authentication, and same-day settlement for cash-out transactions.",
      "The rollout prioritizes districts with the lowest branch density, working with existing GateXPay banking correspondents to reach customers who currently travel long distances for basic banking.",
      "This builds directly on our Micro ATM and AEPS services — CSP 2.0 is the same trusted infrastructure, packaged for correspondents who want to offer a fuller range of banking services from one counter.",
    ],
    image: "/assets/images/card-startups.jpg",
    category: "Company News",
    publishedAt: "2026-09-08",
    readTime: 7,
  },
  {
    id: "aml-kyc-business-correspondents-2026",
    slug: "aml-kyc-rules-business-correspondents-2026",
    title: "AML/KYC Rules Every Business Correspondent Must Follow in 2026",
    description:
      "From customer due diligence to suspicious transaction reporting — a practical breakdown of what AEPS and Micro ATM operators are legally required to do.",
    content: [
      "Business correspondents sit at the front line of financial inclusion, which is exactly why AML/KYC obligations apply to them even though they're not the licensed bank themselves.",
      "In practice, this means verifying customer identity at onboarding, watching for transaction patterns that don't match a customer's stated profile, and keeping records auditable for the retention period your partner bank requires.",
      "The operators who stay out of trouble treat this as a daily habit built into their transaction workflow, not a periodic compliance exercise handled separately from day-to-day service.",
    ],
    image: "/assets/images/card-insurance.jpg",
    category: "Compliance & Regulation",
    publishedAt: "2026-08-28",
    readTime: 5,
  },
  {
    id: "idempotent-payment-webhooks",
    slug: "idempotent-payment-webhooks-guide",
    title: "Building Idempotent Payment Webhooks That Never Double-Charge",
    description:
      "Network retries and duplicate events are inevitable. Here's the idempotency-key pattern GateXPay's own gateway uses in production, explained for API consumers.",
    content: [
      "Any webhook consumer will eventually receive the same event twice — a retried delivery, a network blip, a redeployed server picking up a queued message. Designing for that from day one avoids a painful production incident later.",
      "The fix is a durable idempotency key: store the event ID before you act on it, and check that store before processing anything, so a duplicate delivery is a no-op instead of a second charge or a second email.",
      "This pattern costs almost nothing to add early and is genuinely difficult to retrofit once a payment flow is live and handling real customer money.",
    ],
    image: "/assets/images/card-banking.jpg",
    category: "Engineering & Tech",
    publishedAt: "2026-08-22",
    readTime: 7,
  },
  {
    id: "checkout-conversion-payment-ux",
    slug: "ecommerce-checkout-conversion-payment-ux",
    title: "Why Your Checkout Page Is Losing Customers (And How to Fix It)",
    description:
      "We analyzed checkout drop-off across 40+ merchants on GateXPay. The single biggest lever wasn't discounts — it was payment method ordering.",
    content: [
      "Across the merchants we looked at, the checkout flows with the lowest drop-off consistently surfaced the customer's most-used payment method first, rather than burying it under a generic 'more options' menu.",
      "Discount codes and free-shipping thresholds moved the needle too, but nowhere near as much as simply reducing the number of taps between 'cart' and 'paid.'",
      "The practical takeaway: audit your checkout for friction before you audit it for incentives — a faster path to payment usually outperforms a bigger discount.",
    ],
    image: "/assets/images/card-ecommerce.jpg",
    category: "Business Growth",
    publishedAt: "2026-08-19",
    readTime: 6,
  },
  {
    id: "gatexpay-healthcare-billing-partnership",
    slug: "gatexpay-partners-healthcare-billing",
    title: "GateXPay Partners with Regional Hospital Networks for Digital Billing",
    description:
      "Our new healthcare billing integration lets clinics accept insurance, UPI, and card payments from a single reconciled dashboard.",
    content: [
      "Hospital billing desks typically juggle multiple payment rails and an insurance settlement process that runs on its own timeline — this partnership brings all of it into one reconciled view.",
      "Front-desk staff can now accept UPI, card, and insurance co-pay in the same transaction flow, while the back office sees a single settlement report instead of stitching several together.",
      "We're rolling this out first with regional hospital networks that already use GateXPay for other services, with a broader healthcare rollout planned in the coming months.",
    ],
    image: "/assets/images/card-healthcare.jpg",
    category: "Company News",
    publishedAt: "2026-08-15",
    readTime: 4,
  },
  {
    id: "micro-atm-aeps-financial-inclusion",
    slug: "micro-atm-aeps-rural-financial-inclusion",
    title: "Micro ATM and AEPS: The Compliance Layer Behind Financial Inclusion",
    description:
      "How biometric authentication, RBI's BC guidelines, and settlement timelines combine to make last-mile cash-out both compliant and reliable.",
    content: [
      "Micro ATM and AEPS transactions look simple to the customer — a fingerprint and a withdrawal — but behind that moment sits a compliance chain linking the agent, the bank, and the settlement network.",
      "Biometric authentication satisfies the identity-verification requirement in real time, while settlement timelines determine how quickly the agent's own float gets reimbursed.",
      "Understanding this chain matters for correspondents choosing a technology partner: the interface is the easy part, reliable settlement is what keeps an agent's business running day to day.",
    ],
    image: "/assets/images/card-education.jpg",
    category: "Compliance & Regulation",
    publishedAt: "2026-08-10",
    readTime: 6,
  },
  {
    id: "fintech-startups-first-web-app-mistakes",
    slug: "webapp-development-fintech-startups",
    title: "What Fintech Startups Get Wrong About Their First Web App",
    description:
      "Common architecture mistakes we see in early-stage fintech products — and the patterns GateXPay's engineering team recommends instead.",
    content: [
      "The most common mistake isn't a technology choice — it's treating payment state as something the frontend can be the source of truth for, instead of always reconciling against the backend.",
      "A close second is skipping structured logging on money-moving code paths early, which makes the first production incident far harder to debug than it needed to be.",
      "Neither fix is expensive to build in from the start; both are expensive to retrofit once real transactions and real customers depend on the system.",
    ],
    image: "/assets/images/card-startups.jpg",
    category: "Engineering & Tech",
    publishedAt: "2026-08-05",
    readTime: 8,
  },
  {
    id: "travel-platform-refund-processing",
    slug: "travel-booking-refund-processing-case-study",
    title: "How a Travel Platform Cut Refund Processing Time by 70%",
    description:
      "Automated refund workflows and real-time payment status webhooks turned a two-week manual process into same-day settlements.",
    content: [
      "Refunds on travel bookings are notoriously slow because they usually involve multiple parties — the platform, the payment processor, and sometimes the underlying vendor — each with their own timeline.",
      "Automating the handoff between these steps with webhook-driven status updates removed the manual follow-up that previously stretched a refund out over two weeks.",
      "Customers noticed immediately: faster refunds became one of the platform's most-cited reasons for repeat bookings in their own post-purchase surveys.",
    ],
    image: "/assets/images/card-travel.jpg",
    category: "Business Growth",
    publishedAt: "2026-07-30",
    readTime: 5,
  },
  {
    id: "gatexpay-5000-banking-correspondents",
    slug: "gatexpay-5000-banking-correspondents-milestone",
    title: "GateXPay Crosses 5,000 Active Banking Correspondents Nationwide",
    description:
      "A look back at what it took to onboard, train, and support five thousand agents delivering core banking services in tier-3 and tier-4 towns.",
    content: [
      "Five thousand active correspondents means five thousand small businesses now offering banking services in towns where the nearest branch can be an hour away.",
      "Getting here took as much investment in agent training and support as it did in the underlying banking technology — a correspondent's trust in the system is what keeps them active month over month.",
      "It's a milestone we're proud of, and a floor, not a ceiling — our roadmap for the next year focuses on reaching correspondents in even smaller towns.",
    ],
    image: "/assets/images/card-real-estate.jpg",
    category: "Company News",
    publishedAt: "2026-07-24",
    readTime: 4,
  },
  {
    id: "dpdp-act-payment-platforms-2026",
    slug: "dpdp-act-compliance-payment-platforms-2026",
    title: "Data Localization and DPDP Act Compliance: What Payment Platforms Must Do",
    description:
      "India's Digital Personal Data Protection Act adds new obligations for anyone processing payment data. Here's what changes operationally.",
    content: [
      "The DPDP Act treats payment and identity data as personal data requiring explicit consent, clear purpose limitation, and defined retention — obligations that sit on top of existing RBI data-storage rules for payment platforms.",
      "Operationally, this usually means auditing where customer data actually lives, tightening consent capture at signup, and building a real process for data-deletion requests rather than handling them ad hoc.",
      "Businesses that already comply with RBI's data localization requirements have a head start, but consent and deletion workflows are the parts most teams still need to build.",
    ],
    image: "/assets/images/card-fintech.jpg",
    category: "Compliance & Regulation",
    publishedAt: "2026-07-18",
    readTime: 7,
  },
];

export const FEATURED_POST: BlogPost =
  BLOG_POSTS.find((post) => post.featured) ?? BLOG_POSTS[0];

export const GRID_POSTS: BlogPost[] = BLOG_POSTS.filter((post) => !post.featured);
