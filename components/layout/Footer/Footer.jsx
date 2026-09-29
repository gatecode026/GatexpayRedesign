"use client";
import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import "./Footer.css";
const toLinks = (labels) => labels.map((label) => ({ label, href: "#" }));
const CITIZEN_IDENTITY = {
  heading: "Citizen & Identity",
  links: toLinks([
    "PAN Card Services",
    "Aadhaar Services",
    "E-Governance Services",
    "Pension & Governance Services",
  ]),
};
const PAYMENTS_CASH = {
  heading: "Payments & Cash",
  links: toLinks([
    "Payment Gateway Integration",
    "AEPS Services",
    "Micro ATM Services",
    "Money Transfer Services",
  ]),
};
const BANKING_FINANCIAL = {
  heading: "Banking & Financial",
  links: toLinks([
    "Core Banking Services",
    "Connected Banking Services",
    "Banking Tie-Up Services",
    "Loan & Insurance Services",
    "Investment Services",
    "Fintech & Financial Integration",
  ]),
};
const RETAIL_COMMERCE = {
  heading: "Retail & Commerce",
  links: toLinks([
    "Bill Payment Services",
    "Recharge Services",
    "Travel Services",
    "E-Commerce Services",
    "E-Commerce Solutions",
    "Shipping & Logistics Integration",
  ]),
};
const ENTERPRISE_TECH = {
  heading: "Enterprise Tech",
  links: toLinks([
    "Web & App Development",
    "IT & Cloud Services",
    "Business Automation",
    "Digital & IT Services",
    "Digital Marketing Services",
    "Other Value-Added Services",
  ]),
};
const COMPANY = {
  heading: "Company",
  links: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ],
};
const LEGAL_COMPLIANCE = {
  heading: "Legal & Compliance",
  links: [
    { label: "Privacy Policy", href: "/policy/privacy-policy" },
    { label: "Terms & Conditions", href: "/policy/terms-conditions" },
    { label: "Refund Policy", href: "/policy/refund-policy" },
    { label: "Cookies Policy", href: "/policy/cookie-policy" },
    { label: "Disclaimer Policy", href: "/policy/disclaimer-policy" },
    { label: "Security Policy", href: "/policy/security-policy" },
    { label: "Grievance Redressal", href: "/policy/grievance-redressal" },
    { label: "Vendor & Third-Party Notice", href: "/policy/vendor-disclaimer" },
    { label: "Prohibited Activities", href: "/policy/prohibited-activities" },
    { label: "Merchant Onboarding", href: "/policy/merchant-onboarding" },
    { label: "Data Protection Policy", href: "/policy/data-protection" },
    { label: "AML/KYC Policy", href: "/policy/aml-kyc" },
  ],
};
const FOOTER_COLUMNS = [
  { sections: [CITIZEN_IDENTITY, PAYMENTS_CASH] },
  { sections: [BANKING_FINANCIAL] },
  { sections: [RETAIL_COMMERCE] },
  { sections: [ENTERPRISE_TECH, COMPANY] },
  { sections: [LEGAL_COMPLIANCE] },
];
const SOCIAL_LINKS = [
  { label: "X", icon: "/assets/images/icon-x.svg" },
  { label: "LinkedIn", icon: "/assets/images/icon-linkedin.svg" },
  { label: "Instagram", icon: null },
  { label: "Facebook", icon: "/assets/images/icon-facebook.svg" },
];
export default function Footer() {
  return (
    <footer className="footer">
      {/* ── Ambient color splashes (exact match to Figma reference) ───────── */}
      <div className="footer-glow footer-glow--top-left" aria-hidden="true" />
      <div className="footer-glow footer-glow--mid-left" aria-hidden="true" />
      <div className="footer-glow footer-glow--top-right" aria-hidden="true" />
      <div
        className="footer-glow footer-glow--right-aurora"
        aria-hidden="true"
      />
      <div
        className="footer-glow footer-glow--bottom-right"
        aria-hidden="true"
      />
      <div className="footer-glow footer-glow--center-x" aria-hidden="true" />

      <div className="container container--page footer-inner">
        {/* ── Navigation columns ───────────────────────────────────────── */}
        <div className="footer-nav-grid">
          {FOOTER_COLUMNS.map((column, i) => (
            <nav
              key={i}
              className="footer-col"
              aria-label={column.sections.map((s) => s.heading).join(" / ")}
            >
              {column.sections.map((section) => (
                <div key={section.heading} className="footer-section">
                  <h4 className="footer-col-heading">{section.heading}</h4>
                  <ul className="footer-col-links">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          ))}
        </div>

        {/* ── Company info + contact ───────────────────────────────────── */}
        <div className="footer-info-row">
          <div className="footer-info-left">
            <p className="footer-about">
              GateXPay provides a comprehensive payment and CSP/TSP
              infrastructure designed to help businesses seamlessly secure,
              process, and scale digital transactions. From core banking
              integrations to e-governance solutions, we empower modern
              platforms with high-performance financial technology.
            </p>

            <div
              className="footer-badges"
              aria-label="Compliance certifications"
            >
              <Image
                src="/assets/images/badge-pci-1.svg"
                alt="PCI DSS Compliant"
                width={48}
                height={28}
              />
              <Image
                src="/assets/images/badge-iso.svg"
                alt="ISO 27001 Certified"
                width={28}
                height={28}
              />
              <div
                className="footer-badge-rbi"
                aria-label="Reserve Bank of India Authorized"
              >
                <Image
                  src="/assets/images/badge-cert-2.svg"
                  alt=""
                  width={28}
                  height={28}
                />
                <Image
                  src="/assets/images/badge-cert-3.svg"
                  alt="Reserve Bank of India"
                  width={75}
                  height={20}
                />
              </div>
            </div>
          </div>

          <div className="footer-info-right">
            <h4 className="footer-col-heading">Reach Us</h4>

            <address className="footer-contact">
              <div className="footer-contact-item">
                <Image
                  src="/assets/images/icon-map-pin.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                />
                <span>412, Sumer Nagar, Mansarovar, Jaipur, 302020</span>
              </div>
              <a href="tel:+918502888838" className="footer-contact-item">
                <Image
                  src="/assets/images/icon-phone.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                />
                <span>+91 8502888838</span>
              </a>
              <a href="mailto:info@gatecode.in" className="footer-contact-item">
                <Image
                  src="/assets/images/icon-mail.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                />
                <span>info@gatecode.in</span>
              </a>
            </address>

            <div className="footer-social">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="footer-social-icon"
                >
                  {social.icon ? (
                    <Image
                      src={social.icon}
                      alt=""
                      width={18}
                      height={18}
                      aria-hidden="true"
                    />
                  ) : (
                    <Instagram size={18} strokeWidth={2} aria-hidden="true" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Huge wordmark ────────────────────────────────────────────── */}
        <div className="footer-wordmark">
          <Image
            src="/assets/images/gatexpay-watermark.svg"
            alt="GateXPay"
            width={1280}
            height={198}
            className="footer-wordmark-img"
          />
        </div>

        <div className="footer-divider" />

        {/* ── Copyright ────────────────────────────────────────────────── */}
        <div className="footer-legal">
          <p>Gatexpay Technologies Pvt. Ltd. © Copyright 2026</p>
        </div>
      </div>
    </footer>
  );
}
