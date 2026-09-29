import Link from "next/link";
import {
  Lock,
  FileText,
  RotateCcw,
  Cookie,
  CircleHelp,
  ShieldCheck,
  TriangleAlert,
  Layers,
  Ban,
  UserCheck,
  KeyRound,
  ClipboardCheck,
  ChevronRight,
  Calendar,
  Clock,
  Sparkles,
  Building,
  CheckCircle2,
} from "lucide-react";
import ContactHelpButton from "./ContactHelpButton";
import LegalTOC from "./LegalTOC";
import PolicyActions from "./PolicyActions";
import PolicyInfographics from "./PolicyInfographics";
import { LEGAL_POLICIES } from "@/data/policies-data";
import "./LegalPage.css";
export const LEGAL_NAV = [
  {
    slug: "privacy",
    liveSlug: "privacy-policy",
    label: "Privacy Policy",
    icon: Lock,
  },
  {
    slug: "terms",
    liveSlug: "terms-conditions",
    label: "Terms & Conditions",
    icon: FileText,
  },
  {
    slug: "refund",
    liveSlug: "refund-policy",
    label: "Refund Policy",
    icon: RotateCcw,
  },
  {
    slug: "cookies",
    liveSlug: "cookie-policy",
    label: "Cookies Policy",
    icon: Cookie,
  },
  {
    slug: "disclaimer",
    liveSlug: "disclaimer-policy",
    label: "Disclaimer Policy",
    icon: CircleHelp,
  },
  {
    slug: "security",
    liveSlug: "security-policy",
    label: "Security Policy",
    icon: ShieldCheck,
  },
  {
    slug: "grievance",
    liveSlug: "grievance-redressal",
    label: "Grievance Redressal",
    icon: TriangleAlert,
  },
  {
    slug: "vendor",
    liveSlug: "vendor-disclaimer",
    label: "Vendor & Third-Party Notice",
    icon: Layers,
  },
  {
    slug: "prohibited",
    liveSlug: "prohibited-activities",
    label: "Prohibited Activities",
    icon: Ban,
  },
  {
    slug: "merchant",
    liveSlug: "merchant-onboarding",
    label: "Merchant Onboarding",
    icon: UserCheck,
  },
  {
    slug: "data",
    liveSlug: "data-protection",
    label: "Data Protection Policy",
    icon: KeyRound,
  },
  {
    slug: "aml-kyc",
    liveSlug: "aml-kyc",
    label: "AML/KYC Policy",
    icon: ClipboardCheck,
  },
];
export function getLegalTitle(slug) {
  return LEGAL_POLICIES[slug]?.title ?? "Legal & Compliance";
}
export default function LegalPage({ slug, rawSlug }) {
  const content = LEGAL_POLICIES[slug];
  const activeNav = LEGAL_NAV.find((n) => n.slug === slug) ?? LEGAL_NAV[0];
  const pageTitle = content?.title ?? activeNav.label;
  return (
    <>
      {/* ── Hero / Header ────────────────────────────────────────── */}
      <section className="legal-hero">
        <div className="container">
          <div className="legal-hero-grid">
            <div className="legal-hero-left">
              <nav className="legal-breadcrumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <ChevronRight size={14} aria-hidden="true" />
                <Link href="/policy/privacy-policy">Legal Policies</Link>
                <ChevronRight size={14} aria-hidden="true" />
                <span className="legal-breadcrumb-current">{pageTitle}</span>
              </nav>

              <div className="legal-hero-pill-badge">
                <span className="legal-pulse-dot" aria-hidden="true" />
                <span>{content.pill || "Official Regulatory Framework"}</span>
              </div>

              <h1 className="legal-hero-title">{pageTitle}</h1>
              <p className="legal-hero-desc">{content.description}</p>

              <div className="legal-hero-meta-bar">
                <div className="legal-meta-item">
                  <Calendar size={14} />
                  <span>
                    Effective: <strong>{content.effectiveDate}</strong>
                  </span>
                </div>
                <div className="legal-meta-divider" aria-hidden="true" />
                <div className="legal-meta-item">
                  <Clock size={14} />
                  <span>
                    Last Updated: <strong>{content.lastUpdated}</strong>
                  </span>
                </div>
                <div className="legal-meta-divider" aria-hidden="true" />
                <div className="legal-meta-item is-verified">
                  <CheckCircle2 size={14} />
                  <span>Legally Enforceable &amp; Active</span>
                </div>
              </div>

              <PolicyActions
                policyTitle={pageTitle}
                canonicalSlug={content.liveSlug}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Body: Sidebar + Highlights + Content + TOC ────────── */}
      <section className="legal-body section">
        <div className="container legal-body-inner">
          {/* Left Navigation Sidebar */}
          <aside className="legal-sidebar">
            <div className="legal-sidebar-card">
              <div className="legal-sidebar-header">
                <span>Compliance Directory</span>
                <span className="legal-sidebar-counter">12 Policies</span>
              </div>
              <nav
                className="legal-sidebar-nav"
                aria-label="Legal policies navigation"
              >
                {LEGAL_NAV.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.slug === activeNav.slug;
                  return (
                    <Link
                      key={item.slug}
                      href={`/policy/${item.liveSlug}`}
                      className={`legal-sidebar-link ${isActive ? "is-active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                      <span className="legal-sidebar-link-text">
                        {item.label}
                      </span>
                      {isActive && (
                        <span className="legal-sidebar-active-indicator" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="legal-help-card">
              <div className="legal-help-icon">
                <Building size={20} />
              </div>
              <h4>Compliance Questions?</h4>
              <p>
                Direct inquiries to our Legal &amp; Risk Redressal desk at
                Jaipur Headquarters.
              </p>
              <div className="legal-help-actions">
                <ContactHelpButton />
              </div>
            </div>
          </aside>

          {/* Central Main Content */}
          <main className="legal-content">
            {/* 3 Key Highlights Cards */}
            {content.highlights && content.highlights.length > 0 && (
              <div className="legal-highlights-grid">
                {content.highlights.map((highlight, idx) => (
                  <div key={idx} className="legal-highlight-card">
                    <div className="legal-highlight-top">
                      <span className="legal-highlight-idx">0{idx + 1}</span>
                      <Sparkles size={16} className="legal-highlight-sparkle" />
                    </div>
                    <h4>{highlight.title}</h4>
                    <p>{highlight.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Policy Visual Infographic / Flow Diagram */}
            <PolicyInfographics slug={slug} />

            {/* Structured Legal Sections */}
            <div className="legal-sections-wrapper">
              {content.sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="legal-section"
                >
                  <div className="legal-section-header">
                    <h2>{section.heading}</h2>
                    <a
                      href={`#${section.id}`}
                      className="legal-section-anchor"
                      aria-label={`Link to ${section.heading}`}
                    >
                      #
                    </a>
                  </div>
                  <div className="legal-section-body">
                    {section.blocks.map((block, i) =>
                      block.type === "p" ? (
                        <p key={i}>{block.text}</p>
                      ) : (
                        <ul key={i} className={block.bold ? "is-bold" : ""}>
                          {block.items.map((item, itemIdx) => {
                            const [label, ...rest] = item.split(": ");
                            const remainder = rest.join(": ");
                            return (
                              <li key={itemIdx}>
                                {block.bold && remainder ? (
                                  <>
                                    <strong>{label}:</strong> {remainder}
                                  </>
                                ) : (
                                  item
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Official Corporate Entity Sign-off Box */}
            <div className="legal-company-box">
              <div className="legal-company-badge">
                <CheckCircle2 size={16} />
                <span>Officially Executed &amp; Governed</span>
              </div>
              <h4>GateXpay Technologies Private Limited</h4>
              <p>
                Registered Corporate Office: 412, Sumer Nagar, Mansarovar,
                Jaipur, Rajasthan, 302020
              </p>
              <div className="legal-company-meta">
                <span>
                  Official Inquiries:{" "}
                  <a href="mailto:info@gatexpay.in">info@gatexpay.in</a>
                </span>
                <span className="legal-company-divider">|</span>
                <span>
                  Website:{" "}
                  <a
                    href="https://www.gatexpay.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.gatexpay.in
                  </a>
                </span>
              </div>
            </div>
          </main>

          {/* Right Sticky Table of Contents */}
          {content && content.sections.length > 0 && (
            <LegalTOC
              items={content.sections.map((s) => ({
                id: s.id,
                label: s.tocLabel,
              }))}
            />
          )}
        </div>
      </section>
    </>
  );
}
