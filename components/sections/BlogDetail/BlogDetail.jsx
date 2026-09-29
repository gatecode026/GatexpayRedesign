import { formatBlogDate, GRID_POSTS } from "@/data/blog-posts";
import ArticleHero from "./ArticleHero";
import ArticleHeader from "./ArticleHeader";
import ArticleTOC from "./ArticleTOC";
import RequirementsTable from "./RequirementsTable";
import InlineCTA from "./InlineCTA";
import EscrowCodeBlock from "./EscrowCodeBlock";
import WarningCards from "./WarningCards";
import ComplianceChecklist from "./ComplianceChecklist";
import AuthorCard from "./AuthorCard";
import RelatedInsights from "./RelatedInsights";
import "./BlogDetail.css";
const RBI_TOC_ITEMS = [
  { id: "pa-pg-framework", label: "What Is the PA-PG Framework?" },
  { id: "who-must-comply", label: "Who Must Comply?" },
  { id: "net-worth-requirements", label: "Net Worth Requirements" },
  { id: "escrow-account-obligations", label: "Escrow Account Obligations" },
  {
    id: "technical-security-standards",
    label: "Technical & Security Standards",
  },
  { id: "penalties-for-non-compliance", label: "Penalties for Non-Compliance" },
  {
    id: "practical-compliance-checklist",
    label: "Practical Compliance Checklist",
  },
];
export default function BlogDetail({ post }) {
  // Deterministic related posts: filter out current article, take top 3
  const relatedPosts = GRID_POSTS.filter((p) => p.id !== post.id).slice(0, 3);
  const isRbiGuide =
    post.id === "rbi-pa-pg-licensing-guide-2026" ||
    post.slug === "rbi-payment-aggregator-licensing-guide-2026";
  return (
    <div className="blog-detail-page">
      {/* 1. Article Hero with Breadcrumbs */}
      <ArticleHero image={post.image} title={post.title} />

      {/* 2. Article Header & Metadata */}
      <ArticleHeader
        category={post.category}
        title={post.title}
        publishedAt={formatBlogDate(post.publishedAt)}
        readTime={post.readTime}
      />

      {/* 3. Main Article Layout: Sticky Sidebar TOC + Content */}
      <main className="article-main-layout">
        <div className="article-layout-container">
          {/* Left Column: Sticky Table of Contents & Reading Progress */}
          <ArticleTOC
            items={
              isRbiGuide
                ? RBI_TOC_ITEMS
                : [
                    { id: "overview", label: "Overview" },
                    { id: "key-takeaways", label: "Key Takeaways" },
                    { id: "deep-dive", label: "Deep Dive" },
                  ]
            }
          />

          {/* Right Column: Article Content */}
          <article className="article-content-column" id="article-content-body">
            {isRbiGuide ? (
              <>
                {/* Section 1: What Is the PA-PG Framework? */}
                <section id="pa-pg-framework" className="article-section">
                  <h2 className="section-title">
                    What Is the PA-PG Framework?
                  </h2>
                  <p className="article-p">
                    In March 2020, the Reserve Bank of India issued its landmark
                    guidelines on Payment Aggregators (PAs) and Payment Gateways
                    (PGs), creating the most consequential structural change to
                    India&apos;s online payments ecosystem in a decade. The
                    framework drew a sharp legal line between two entities that
                    most of the industry had been treating as synonymous.
                  </p>
                  <p className="article-p">
                    A Payment Aggregator is an entity that facilitates
                    e-commerce merchants by collecting payments on behalf of
                    merchants and settling those funds to merchant accounts. A
                    Payment Gateway, by contrast, is purely a technology
                    provider that routes payment instructions without touching
                    the funds. Only PAs require RBI authorization; PGs do not —
                    but they must register with the RBI and comply with
                    technical and security standards.
                  </p>
                  <blockquote className="article-blockquote">
                    &ldquo;If you&apos;re a business that collects payments for
                    merchants, no matter how small, you should be asking
                    yourself: am I considered a PA according to the RBI&apos;s
                    definition?&rdquo;
                  </blockquote>
                </section>

                {/* Section 2: Who Must Comply? */}
                <section id="who-must-comply" className="article-section">
                  <h2 className="section-title">Who Must Comply?</h2>
                  <p className="article-p">
                    The short answer: if money flows through your platform
                    before reaching a merchant, you are operating as a Payment
                    Aggregator and must seek authorization. This includes a
                    surprisingly wide range of businesses:
                  </p>
                  <ul className="article-bullet-list">
                    <li>
                      SaaS platforms offering built-in checkout to their clients
                    </li>
                    <li>
                      Marketplaces that hold seller funds before disbursement
                    </li>
                    <li>
                      Subscription billing platforms that collect from end-users
                    </li>
                    <li>
                      Delivery, healthtech, and B2B platforms with split payment
                      flows
                    </li>
                  </ul>
                  <p className="article-p">
                    If you currently rely on a white-labeled solution (such as
                    GateXPay&apos;s PA infrastructure), you are typically
                    classified as a merchant, not a PA. However, if you are
                    re-selling payment access to sub-merchants, the rules apply
                    to you directly.
                  </p>
                </section>

                {/* Section 3: Net Worth Requirements */}
                <section
                  id="net-worth-requirements"
                  className="article-section"
                >
                  <h2 className="section-title">Net Worth Requirements</h2>
                  <p className="article-p">
                    This is where many startups trip up. The RBI has established
                    a two-tier net worth threshold that applies to PA
                    applicants:
                  </p>
                  <RequirementsTable />
                </section>

                {/* Inline CTA */}
                <InlineCTA />

                {/* Section 4: Escrow Account Obligations */}
                <section
                  id="escrow-account-obligations"
                  className="article-section"
                >
                  <h2 className="section-title">Escrow Account Obligations</h2>
                  <p className="article-p">
                    Perhaps the most operationally burdensome requirement is the
                    mandatory escrow account. Every licensed PA must maintain a
                    designated escrow account with a scheduled commercial bank.
                    The purpose is straightforward: merchant funds must never
                    commingle with the PA&apos;s own operating capital.
                  </p>
                  <h3 className="section-subtitle">Settlement Timelines</h3>
                  <p className="article-p">
                    The RBI mandates T+1 settlement for merchant funds once
                    funds are received in the escrow. &lsquo;T&rsquo; represents
                    the day funds are credited to the PA&apos;s escrow account,
                    not the day the customer completes payment. Disciplined
                    reconcilers rely on real-time webhooks to trigger payouts
                    without delay:
                  </p>
                  <EscrowCodeBlock />
                </section>

                {/* Section 5: Technical & Security Standards */}
                <section
                  id="technical-security-standards"
                  className="article-section"
                >
                  <h2 className="section-title">
                    Technical &amp; Security Standards
                  </h2>
                  <p className="article-p">
                    Both PAs and PGs must comply with the following technical
                    obligations, which are audited annually by a CERT-In
                    empanelled security auditor:
                  </p>
                  <ul className="article-bullet-list">
                    <li>
                      PCI-DSS compliance — Level 1 for volumes above 6 million
                      transactions/year
                    </li>
                    <li>
                      ISO 27001 certification for information security
                      management systems
                    </li>
                    <li>
                      2-Factor Authentication (2FA) for all merchant logins and
                      admin panels
                    </li>
                    <li>
                      Tokenization of card data — raw PANs must not remain on
                      seats of your infrastructure
                    </li>
                    <li>
                      Annual Vulnerability Assessment &amp; Penetration Testing
                      (VAPT) by a CERT-In empanelled auditor
                    </li>
                  </ul>
                </section>

                {/* Section 6: Penalties for Non-Compliance */}
                <section
                  id="penalties-for-non-compliance"
                  className="article-section"
                >
                  <h2 className="section-title">
                    Penalties for Non-Compliance
                  </h2>
                  <p className="article-p">
                    The RBI&apos;s enforcement posture has hardened considerably
                    since 2022. Operating as an unauthorized PA can result in:
                  </p>
                  <WarningCards />
                </section>

                {/* Section 7: Practical Compliance Checklist */}
                <section
                  id="practical-compliance-checklist"
                  className="article-section"
                >
                  <h2 className="section-title">
                    Practical Compliance Checklist
                  </h2>
                  <p className="article-p">
                    Use this checklist to assess your current standing before
                    initiating the RBI application. All items must be in place
                    before submission:
                  </p>
                  <ComplianceChecklist />
                </section>

                {/* Author Card */}
                <AuthorCard />
              </>
            ) : (
              <>
                <section id="overview" className="article-section">
                  <h2 className="section-title">Overview</h2>
                  <p className="article-lede">{post.description}</p>
                  {post.content.map((p, i) => (
                    <p key={i} className="article-p">
                      {p}
                    </p>
                  ))}
                </section>
                <InlineCTA />
                <AuthorCard />
              </>
            )}
          </article>
        </div>
      </main>

      {/* 4. Related Insights */}
      <RelatedInsights posts={relatedPosts} />
    </div>
  );
}
