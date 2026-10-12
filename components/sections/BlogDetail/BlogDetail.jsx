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
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-");
}

function parseDynamicPost(post) {
  const raw =
    post.rawContent ||
    (Array.isArray(post.content) ? post.content.join("\n\n") : post.content) ||
    "";

  if (!raw.trim()) {
    return {
      tocItems: [{ id: "overview", label: "Overview" }],
      sections: [
        {
          id: "overview",
          title: "Overview",
          elements: [<p key="empty" className="article-p">{post.description || ""}</p>],
        },
      ],
    };
  }

  const lines = raw.split("\n");
  const sections = [];
  let currentSection = {
    id: "overview",
    title: "Overview",
    elements: [],
  };
  let currentList = [];
  let inCodeBlock = false;
  let codeBuffer = [];

  const flushList = () => {
    if (currentList.length > 0) {
      currentSection.elements.push(
        <ul key={`ul-${currentSection.elements.length}`} className="article-bullet-list">
          {currentList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        currentSection.elements.push(
          <pre
            key={`code-${currentSection.elements.length}`}
            style={{
              background: "#0F172A",
              color: "#E2E8F0",
              padding: "16px 20px",
              borderRadius: "10px",
              fontSize: "13px",
              overflowX: "auto",
              fontFamily: "monospace",
              lineHeight: 1.6,
              margin: "12px 0",
            }}
          >
            <code>{codeBuffer.join("\n")}</code>
          </pre>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      if (currentSection.elements.length > 0 || currentSection.id !== "overview") {
        sections.push(currentSection);
      }
      const title = trimmed.replace(/^##\s+/, "");
      currentSection = {
        id: slugify(title) || `section-${sections.length + 1}`,
        title,
        elements: [],
      };
    } else if (trimmed.startsWith("### ")) {
      flushList();
      currentSection.elements.push(
        <h3 key={`h3-${index}`} className="section-subtitle">
          {trimmed.replace(/^###\s+/, "")}
        </h3>
      );
    } else if (trimmed.startsWith("> ")) {
      flushList();
      const quoteText = trimmed.replace(/^>\s+/, "").replace(/\*\*(.*?)\*\*/g, "$1");
      currentSection.elements.push(
        <blockquote key={`quote-${index}`} className="article-blockquote">
          {quoteText}
        </blockquote>
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentList.push(trimmed.replace(/^[-*]\s+/, ""));
    } else if (trimmed === "") {
      flushList();
    } else {
      flushList();
      currentSection.elements.push(
        <p key={`p-${index}`} className="article-p">
          {trimmed}
        </p>
      );
    }
  });

  flushList();
  if (inCodeBlock && codeBuffer.length > 0) {
    currentSection.elements.push(
      <pre
        key={`code-${currentSection.elements.length}`}
        style={{
          background: "#0F172A",
          color: "#E2E8F0",
          padding: "16px 20px",
          borderRadius: "10px",
          fontSize: "13px",
          overflowX: "auto",
          fontFamily: "monospace",
          lineHeight: 1.6,
        }}
      >
        <code>{codeBuffer.join("\n")}</code>
      </pre>
    );
  }

  sections.push(currentSection);

  const tocItems = sections.map((s) => ({
    id: s.id,
    label: s.title,
  }));

  return { tocItems, sections };
}

export default function BlogDetail({ post }) {
  // Deterministic related posts: filter out current article, take top 3
  const relatedPosts = GRID_POSTS.filter((p) => p.id !== post.id).slice(0, 3);
  const isRbiGuide =
    post.id === "rbi-pa-pg-licensing-guide-2026" ||
    post.slug === "rbi-payment-aggregator-licensing-guide-2026";

  const dynamicParsed = !isRbiGuide ? parseDynamicPost(post) : null;
  const tocItems = isRbiGuide ? RBI_TOC_ITEMS : dynamicParsed.tocItems;

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
        author={post.author}
      />

      {/* 3. Main Article Layout: Sticky Sidebar TOC + Content */}
      <main className="article-main-layout">
        <div className="article-layout-container">
          {/* Left Column: Sticky Table of Contents & Reading Progress */}
          <ArticleTOC items={tocItems} />

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
                {dynamicParsed &&
                  dynamicParsed.sections.map((sec, sIdx) => (
                    <section key={sec.id} id={sec.id} className="article-section">
                      <h2 className="section-title">{sec.title}</h2>
                      {sIdx === 0 && post.description && (
                        <p className="article-lede">{post.description}</p>
                      )}
                      {sec.elements}
                    </section>
                  ))}
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
