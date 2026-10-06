"use client";
import Link from "next/link";
import Image from "next/image";
import "./Footer.css";
const CITIZEN_IDENTITY = {
  heading: "Citizen & Identity",
  links: [
    { label: "PAN Card Services", href: "/services/pan-card-services" },
    { label: "Aadhaar Services", href: "/services/aadhaar-services" },
    { label: "E-Governance Services", href: "/services/e-governance-services" },
    { label: "Pension & Governance Services", href: "/services/pension-government-schemes" },
  ],
};
const PAYMENTS_CASH = {
  heading: "Payments & Cash",
  links: [
    { label: "Payment Gateway Integration", href: "/services/payment-gateway-integration" },
    { label: "AEPS Services", href: "/services/aeps-services" },
    { label: "Micro ATM Services", href: "/services/micro-atm-services" },
    { label: "Money Transfer Services", href: "/services/money-transfer-services" },
  ],
};
const BANKING_FINANCIAL = {
  heading: "Banking & Financial",
  links: [
    { label: "Core Banking Services", href: "/services/core-banking-services" },
    { label: "Connected Banking Services", href: "/services/connected-banking-services" },
    { label: "Banking Tie-Up Services", href: "/services/banking-tie-up-services" },
    { label: "Loan & Credit Integration Services", href: "/services/loan-insurance-services" },
    { label: "Investment Services", href: "/services/investment-services" },
    { label: "Fintech & Financial Integration", href: "/services/fintech-financial-integration" },
  ],
};
const RETAIL_COMMERCE = {
  heading: "Retail & Commerce",
  links: [
    { label: "Bill Payment Services", href: "/services/bill-payment-services" },
    { label: "Recharge Services", href: "/services/recharge-services" },
    { label: "Travel Services", href: "/services/travel-booking-services" },
    { label: "E-Commerce Services", href: "/services/e-commerce-services" },
    { label: "E-Commerce Solutions", href: "/services/e-commerce-solutions" },
    { label: "Shipping & Logistics Integration", href: "/services/shipping-logistics-integration" },
  ],
};
const ENTERPRISE_TECH = {
  heading: "Enterprise Tech",
  links: [
    { label: "Web & App Development", href: "/services/web-app-development" },
    { label: "IT & Cloud Services", href: "/services/it-cloud-services" },
    { label: "Business Automation", href: "/services/business-automation" },
    { label: "Digital & IT Services", href: "/services/digital-it-services" },
    { label: "Other Value-Added Services", href: "/services/value-added-services" },
  ],
};
const COMPANY = {
  heading: "Company",
  links: [
    { label: "About Us", href: "/about" },
    { label: "All Services", href: "/services" },
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
  { label: "Instagram", icon: "/assets/images/icon-instagram.svg" },
  { label: "Facebook", icon: "/assets/images/icon-facebook.svg" },
];
export default function Footer() {
  return (
    <footer className="footer">
      {/* ── Ambient color splashes ───────── */}
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
                  <Image
                    src={social.icon}
                    alt=""
                    width={18}
                    height={18}
                    aria-hidden="true"
                  />
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
