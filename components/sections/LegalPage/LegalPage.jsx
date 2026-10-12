"use client";

import Link from "next/link";
import {
  Lock,
  FileText,
  RotateCcw,
  Cookie,
  CircleHelp,
  ShieldCheck,
  TriangleAlert,
  Shield,
  Ban,
  UserCheck,
  KeyRound,
  ClipboardCheck,
  ChevronRight,
} from "lucide-react";
import ContactHelpButton from "./ContactHelpButton";
import LegalTOC from "./LegalTOC";
import { LEGAL_POLICIES } from "@/data/policies-data";
import "./LegalPage.css";

export const LEGAL_NAV = [
  { slug: "privacy", liveSlug: "privacy-policy", label: "Privacy Policy", icon: Lock },
  { slug: "terms", liveSlug: "terms-conditions", label: "Terms & Conditions", icon: FileText },
  { slug: "refund", liveSlug: "refund-policy", label: "Refund Policy", icon: RotateCcw },
  { slug: "cookies", liveSlug: "cookie-policy", label: "Cookies Policy", icon: Cookie },
  { slug: "disclaimer", liveSlug: "disclaimer-policy", label: "Disclaimer Policy", icon: CircleHelp },
  { slug: "security", liveSlug: "security-policy", label: "Security Policy", icon: ShieldCheck },
  { slug: "grievance", liveSlug: "grievance-redressal", label: "Grievance Redressal", icon: TriangleAlert },
  { slug: "vendor", liveSlug: "vendor-disclaimer", label: "Fraud & AML Prevention", icon: Shield },
  { slug: "prohibited", liveSlug: "prohibited-activities", label: "Prohibited Activities", icon: Ban },
  { slug: "merchant", liveSlug: "merchant-onboarding", label: "Customers Due Diligence", icon: UserCheck },
  { slug: "data", liveSlug: "data-protection", label: "Data Protection Policy", icon: KeyRound },
  { slug: "aml-kyc", liveSlug: "aml-kyc", label: "Anti-Bribery Policy", icon: ClipboardCheck },
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
          <div className="legal-hero-left">
            <nav className="legal-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <ChevronRight size={13} aria-hidden="true" />
              <Link href="/policy/privacy-policy">Legal</Link>
              <ChevronRight size={13} aria-hidden="true" />
              <span className="legal-breadcrumb-current">{pageTitle}</span>
            </nav>

            <h1 className="legal-hero-title">{pageTitle}</h1>
            <p className="legal-hero-desc">{content?.description}</p>

            <div className="legal-hero-meta-bar">
              <span>Last Updated: {content?.lastUpdated || "05 May 2024"}</span>
              <span className="legal-hero-meta-divider" aria-hidden="true">|</span>
              <span>Effective Date: {content?.effectiveDate || "15 May 2024"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Body: 3-Column Layout (Sidebar + Content + TOC) ── */}
      <section className="legal-body">
        <div className="container legal-body-inner">
          {/* Left Navigation Sidebar */}
          <aside className="legal-sidebar">
            <div className="legal-sidebar-card">
              <div className="legal-sidebar-header">
                <span>LEGAL &amp; COMPLIANCE</span>
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
                      <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                      <span className="legal-sidebar-link-text">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="legal-help-card">
              <h4>Need Help?</h4>
              <p>
                Our legal team is here to assist you with compliance inquiries.
              </p>
              <div className="legal-help-actions">
                <ContactHelpButton />
              </div>
            </div>
          </aside>

          {/* Central Main Content */}
          <main className="legal-content">
            <div className="legal-sections-wrapper">
              {content?.sections?.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="legal-section"
                >
                  <h2 className="legal-section-title">{section.heading}</h2>
                  <div className="legal-section-body">
                    {section.blocks.map((block, i) =>
                      block.type === "p" ? (
                        <p key={i}>{block.text}</p>
                      ) : (
                        <ul key={i} className="legal-section-list">
                          {block.items.map((item, itemIdx) => {
                            const cleanItem = item.replace(/^\*\*(.*?)\*\*/, "$1");
                            const colonIndex = cleanItem.indexOf(":");
                            if (colonIndex > 0 && colonIndex < 45) {
                              const label = cleanItem.slice(0, colonIndex);
                              const remainder = cleanItem.slice(colonIndex + 1);
                              return (
                                <li key={itemIdx}>
                                  <strong>{label}:</strong>{remainder}
                                </li>
                              );
                            }
                            return (
                              <li key={itemIdx}>
                                {item.replace(/\*\*/g, "")}
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
              <h4>Gatexpay Technologies Private Limited</h4>
              <p>
                412, Sumer Nagar, Mansarovar, Jaipur, Rajasthan 302020
              </p>
              <p className="legal-company-email">
                Email: <a href="mailto:info@gatexpay.in">info@gatexpay.in</a>
              </p>
            </div>
          </main>

          {/* Right Sticky Table of Contents */}
          {content && content.sections?.length > 0 && (
            <LegalTOC
              items={content.sections.map((s) => ({
                id: s.id,
                label: s.tocLabel || s.heading.replace(/^\d+\.\s*/, ""),
              }))}
            />
          )}
        </div>
      </section>
    </>
  );
}
