"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import "./IndustrySection.css";

const STACK_KEYS = [
  "Real Estate",
  "Travel & Tourism",
  "Startups",
  "Insurance",
  "Fintech",
  "Banking",
  "Education",
  "IT & Software",
  "Health Care",
  "E-Commerce",
];

const INDUSTRY_DATA = {
  "Real Estate": {
    tag: "Real Estate",
    title: "Digitize property transactions and streamline rent collections.",
    useCases: [
      "Automate monthly rent and society maintenance collections via payment links.",
      "Provide instant access to home loan and credit services for prospective buyers.",
      "Manage property portfolios and tenant data through custom business automation.",
    ],
    poweredBy: [
      "All Payment Services",
      "Loan & Credit Services",
      "Business Automation",
    ],
    img: "/assets/images/industry-realestate.png",
  },
  "Travel & Tourism": {
    tag: "Travel & Tourism",
    title: "Unified booking engines and secure global payment routing.",
    useCases: [
      "Power your travel portal with robust domestic and international booking APIs.",
      "Process high-value travel transactions securely with tokenization.",
      "Equip local travel agents with AEPS and fund transfer tools to serve walk-in clients.",
    ],
    poweredBy: [
      "Travel Services",
      "E-Commerce Bookings",
      "Domestic Money Transfer",
    ],
    img: "/assets/images/industry-travel.png",
  },
  Startups: {
    tag: "Startups",
    title: "Launch fast with pre-integrated payment and credit workflows.",
    useCases: [
      "Embed banking services directly into your application with lightweight APIs.",
      "Automate vendor payouts and employee reimbursements with instant settlements.",
      "Scale securely with PCI-DSS-aligned infrastructure from day one.",
    ],
    poweredBy: [
      "Fintech Integration",
      "Core Banking Services",
      "Payment Gateway",
    ],
    img: "/assets/images/industry-startups.png",
  },
  Insurance: {
    tag: "Insurance",
    title: "Automate policy premium collections and instant claim payouts.",
    useCases: [
      "Enable recurring auto-debit for insurance premiums across UPI and cards.",
      "Facilitate instant claim settlements directly into verified bank accounts.",
      "Streamline insurance agent commissions with real-time automated disbursements.",
    ],
    poweredBy: ["Recurring Payments", "Instant Settlements", "Policy APIs"],
    img: "/assets/images/industry-insurance.png",
  },
  Fintech: {
    tag: "Fintech",
    title: "The foundational layer for modern financial applications.",
    useCases: [
      "Issue branded prepaid cards and virtual accounts via modular fintech APIs.",
      "Deploy UPI, AEPS, and BBPS integrations through a single unified dashboard.",
      "Run real-time risk checks and automated KYC before transaction authorization.",
    ],
    poweredBy: [
      "UPI & AEPS Stacks",
      "Prepaid Card APIs",
      "KYC & Verification Suite",
    ],
    img: "/assets/images/industry-fintech.png",
  },
  Banking: {
    tag: "Banking",
    title: "Enterprise-grade core banking infrastructure built for scale.",
    useCases: [
      "Modernize legacy banking systems with cloud-native core banking APIs.",
      "Power branchless banking networks with robust micro-ATM and biometric setups.",
      "Secure high-volume interbank transfers with ISO 27001-certified rails.",
    ],
    poweredBy: [
      "Core Banking Engine",
      "Micro-ATM Integration",
      "Security & Compliance Suite",
    ],
    img: "/assets/images/industry-banking.png",
  },
  Education: {
    tag: "Education",
    title: "Simplify fee collections with smart reconciliation engines.",
    useCases: [
      "Collect tuition and examination fees through multi-channel payment links.",
      "Automate reconciliation across thousands of student accounts in real time.",
      "Offer education-loan integrations at checkout for higher-ticket courses.",
    ],
    poweredBy: [
      "Smart Fee Collection",
      "Automated Reconciliation",
      "Education Credit APIs",
    ],
    img: "/assets/images/industry-education.png",
  },
  "IT & Software": {
    tag: "IT & Software",
    title: "Global billing, SaaS subscriptions, and developer-first APIs.",
    useCases: [
      "Manage recurring SaaS billing with multi-currency support and tax compliance.",
      "Integrate payments into custom enterprise ERPs with webhook-driven logic.",
      "Automate cloud infrastructure billing and client invoicing end-to-end.",
    ],
    poweredBy: [
      "SaaS Billing Engine",
      "Developer Webhooks",
      "Enterprise ERP Sync",
    ],
    img: "/assets/images/industry-itsoftware.png",
  },
  "Health Care": {
    tag: "Health Care",
    title: "HIPAA-aligned healthcare payments and contactless settlements.",
    useCases: [
      "Process hospital bills and consultation fees at the counter or via mobile links.",
      "Enable instant third-party insurance claim approvals and co-pay collections.",
      "Automate vendor procurement payments for pharmacies and medical equipment.",
    ],
    poweredBy: [
      "Healthcare POS",
      "Insurance TPA Rails",
      "Instant Vendor Payouts",
    ],
    img: "/assets/images/industry-healthcare.png",
  },
  "E-Commerce": {
    tag: "E-Commerce",
    title: "High-conversion checkouts with multi-rail redundancy.",
    useCases: [
      "Reduce cart abandonment with one-click UPI, saved cards, and BNPL options.",
      "Protect against checkout failures with dynamic AI-powered gateway routing.",
      "Process instant automated refunds to keep customer trust and retention high.",
    ],
    poweredBy: [
      "Smart Dynamic Routing",
      "One-Click Checkout",
      "Instant Refund Rails",
    ],
    img: "/assets/images/industry-ecommerce.png",
  },
};

function IndustryCardBody({ data }) {
  return (
    <>
      <div className="industry-card-img-wrap">
        <Image
          src={data.img}
          alt={data.tag}
          fill
          sizes="(min-width: 1441px) 680px, (min-width: 1024px) 520px, (min-width: 768px) 420px, 92vw"
          className="industry-card-img object-cover"
        />
      </div>

      <div className="industry-card-content">
        <div className="industry-card-head">
          <span className="industry-card-label">{data.tag}</span>
          <h3 className="industry-card-title">{data.title}</h3>
        </div>

        <div className="industry-card-block">
          <span className="industry-card-label">Use Cases</span>
          <div className="industry-card-usecases">
            {data.useCases.map((uc) => (
              <p key={uc}>{uc}</p>
            ))}
          </div>
        </div>

        <div className="industry-card-block">
          <span className="industry-card-label">Powered By</span>
          <div className="industry-card-pills">
            {data.poweredBy.map((pill) => (
              <span key={pill} className="industry-pill">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function IndustrySection() {
  const [active, setActive] = useState("Real Estate");
  const ref = useRef(null);
  const tabsScrollRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("in-view", e.isIntersecting)
        ),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  // Keep active tab centered in horizontal scroll
  useEffect(() => {
    const scrollEl = tabsScrollRef.current;
    if (!scrollEl) return;
    const activeTab = scrollEl.querySelector(".industry-tab.active");
    if (activeTab) {
      const scrollLeft =
        activeTab.offsetLeft -
        scrollEl.offsetWidth / 2 +
        activeTab.offsetWidth / 2;
      scrollEl.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [active]);

  const handleTabClick = (tab) => {
    setActive(tab);
  };

  const activeIndex = STACK_KEYS.indexOf(active);

  return (
    <section className="industry-section section" id="industries" ref={ref}>
      {/* Header + Tabs Bar */}
      <div className="industry-tabs-wrap">
        <div className="container container--page">
          <h2 className="industry-heading reveal">
            Infrastructure Built for Your Industry
          </h2>
          <nav className="industry-tabs" aria-label="Industries We Offer">
            <span className="industry-tabs-label">Industries We Offer:</span>
            <div className="industry-tabs-scroll" ref={tabsScrollRef}>
              {STACK_KEYS.map((tab, idx) => (
                <div key={tab} className="industry-tab-item">
                  <button
                    type="button"
                    aria-current={active === tab ? "true" : undefined}
                    className={`industry-tab ${active === tab ? "active" : ""}`}
                    onClick={() => handleTabClick(tab)}
                  >
                    <span className="industry-tab-text">{tab}</span>
                  </button>
                  {idx < STACK_KEYS.length - 1 && (
                    <span className="industry-tab-divider" aria-hidden="true">
                      |
                    </span>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className="container container--page">
        {/* Showcase card stage - natural height, 0px blank space */}
        <div className="industry-showcase-stage">
          {STACK_KEYS.map((key) => {
            const isCurrent = key === active;
            return (
              <div
                key={key}
                className={`industry-card industry-showcase-card ${isCurrent ? "is-active" : ""}`}
                aria-hidden={!isCurrent}
              >
                <IndustryCardBody data={INDUSTRY_DATA[key]} />
              </div>
            );
          })}
        </div>

        {/* Interactive Progress dots */}
        <div className="industry-stack-dots" role="tablist" aria-label="Industry slides">
          {STACK_KEYS.map((key, i) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`View ${key} industry`}
              className={`industry-stack-dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => handleTabClick(key)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
