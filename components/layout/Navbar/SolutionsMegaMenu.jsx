"use client";
import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  ArrowLeftRight,
  Landmark,
  Handshake,
  Fingerprint,
  UserRound,
  TrendingUp,
  IdCard,
  Smartphone,
  Network,
  Globe,
  Code2,
  Bot,
  Package,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import "./SolutionsMegaMenu.css";
export const SOLUTIONS = [
  {
    id: "payments-banking",
    title: "Payments & Banking",
    description: "For businesses looking to move money or build fintech apps",
    categoryHref: "/services#payments-cash",
    services: [
      {
        title: "Payment Gateway",
        description:
          "PCI-DSS compliant multi-currency & multi-method processing.",
        icon: CreditCard,
        href: "/services/payment-gateway-integration",
      },
      {
        title: "Money Transfers & Payouts",
        description: "IMPS, NEFT, and RTGS real-time settlements.",
        icon: ArrowLeftRight,
        href: "/services/money-transfer-services",
      },
      {
        title: "Connected Banking Services",
        description:
          "Open banking APIs, account aggregation, and CBS solutions.",
        icon: Landmark,
        href: "/services/connected-banking-services",
      },
      {
        title: "Banking Tie-Up Services",
        description: "API integrations, co-branded products, and banking tie-ups.",
        icon: Handshake,
        href: "/services/banking-tie-up-services",
      },
      {
        title: "Fintech Integration",
        description: "APIs linking financial and business platforms securely.",
        icon: Network,
        href: "/services/fintech-financial-integration",
      },
      {
        title: "Core Banking Systems",
        description: "Centralized ledgers, reporting, and CBS modules.",
        icon: Landmark,
        href: "/services/core-banking-services",
      },
    ],
  },
  {
    id: "agent-csp",
    title: "Agent & CSP Services",
    description: "For agents providing rural/local financial services",
    categoryHref: "/services#payments-cash",
    services: [
      {
        title: "AEPS Services",
        description:
          "Aadhaar cash withdrawal, balance check, and biometric banking.",
        icon: Fingerprint,
        href: "/services/aeps-services",
      },
      {
        title: "Micro ATM Services",
        description: "Debit card cash withdrawal and mini statements at CSPs.",
        icon: Smartphone,
        href: "/services/micro-atm-services",
      },
      {
        title: "Loan & Insurance",
        description: "Personal and business loan support, insurance services.",
        icon: UserRound,
        href: "/services/loan-insurance-services",
      },
      {
        title: "Investment Services",
        description: "Mutual funds, SIPs, fixed deposits, and eligible schemes.",
        icon: TrendingUp,
        href: "/services/investment-services",
      },
      {
        title: "Aadhaar Services",
        description: "Aadhaar demographic assistance and verified citizen support.",
        icon: Fingerprint,
        href: "/services/aadhaar-services",
      },
      {
        title: "Value-Added Services",
        description: "Everyday financial, document, and assisted services in one spot.",
        icon: Package,
        href: "/services/value-added-services",
      },
    ],
  },
  {
    id: "egovernance-utilities",
    title: "E-Governance & Utilities",
    description: "For businesses offering citizen services and bill payments",
    categoryHref: "/services#citizen-identity",
    services: [
      {
        title: "PAN Card Services",
        description: "New PAN registration, updates, corrections, and reissues.",
        icon: IdCard,
        href: "/services/pan-card-services",
      },
      {
        title: "Bill Payment Services",
        description: "Electricity, water, gas, and utility bill payments via BBPS.",
        icon: Smartphone,
        href: "/services/bill-payment-services",
      },
      {
        title: "Recharge Services",
        description: "Prepaid, postpaid, DTH, and FASTag recharges.",
        icon: Smartphone,
        href: "/services/recharge-services",
      },
      {
        title: "Pension & Government Schemes",
        description: "Social security schemes, documentation, and welfare assistance.",
        icon: Network,
        href: "/services/pension-government-schemes",
      },
      {
        title: "E-Governance Services",
        description: "Assisted citizen service filings and official portal guidance.",
        icon: Network,
        href: "/services/e-governance-services",
      },
      {
        title: "Travel Booking Services",
        description: "Train, flight, bus, and hotel booking with guided CSP support.",
        icon: Globe,
        href: "/services/travel-booking-services",
      },
    ],
  },
  {
    id: "business-it",
    title: "Business & IT Infrastructure",
    description: "For enterprises needing tech, marketing, and logistics",
    categoryHref: "/services#enterprise-tech",
    services: [
      {
        title: "Web & App Development",
        description: "Custom web applications, portals, and mobile app solutions.",
        icon: Code2,
        href: "/services/web-app-development",
      },
      {
        title: "IT & Cloud Services",
        description: "Cloud infrastructure, DevOps, migration, and managed IT.",
        icon: Network,
        href: "/services/it-cloud-services",
      },
      {
        title: "Business Automation",
        description: "Automate repetitive workflows, CRM, and operational processes.",
        icon: Bot,
        href: "/services/business-automation",
      },
      {
        title: "Digital & IT Services",
        description: "Full-spectrum digital engineering, marketing, and IT consulting.",
        icon: Code2,
        href: "/services/digital-it-services",
      },
      {
        title: "E-Commerce Services",
        description: "Online store setup, Shopify, WooCommerce, and checkout APIs.",
        icon: Package,
        href: "/services/e-commerce-services",
      },
      {
        title: "Shipping & Logistics Integration",
        description: "Multi-carrier shipping APIs, label printing, and live tracking.",
        icon: Package,
        href: "/services/shipping-logistics-integration",
      },
    ],
  },
];
const SERVICE_HREF = "/services";
export default function SolutionsMegaMenu({ id }) {
  const [activeId, setActiveId] = useState(SOLUTIONS[0].id);
  const active = SOLUTIONS.find((c) => c.id === activeId) ?? SOLUTIONS[0];
  return (
    <div className="mega-menu" id={id} role="menu" aria-label="Solutions">
      {/* ── Left: categories ─────────────────────────────────────────── */}
      <div
        className="mega-menu__left"
        role="tablist"
        aria-orientation="vertical"
      >
        {SOLUTIONS.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`mega-cat${isActive ? " mega-cat--active" : ""}`}
              onMouseEnter={() => setActiveId(cat.id)}
              onFocus={() => setActiveId(cat.id)}
              onClick={() => setActiveId(cat.id)}
            >
              <span className="mega-cat__title">{cat.title}</span>
              <span className="mega-cat__desc">{cat.description}</span>
            </button>
          );
        })}
      </div>

      <div className="mega-menu__divider" aria-hidden="true" />

      {/* ── Right: services for the active category ─────────────────── */}
      <div className="mega-menu__right">
        <div
          className="mega-services"
          role="tabpanel"
          aria-label={`${active.title} services`}
        >
          {active.services.map((service) => {
            const Icon = service.icon;
            const href = service.href || SERVICE_HREF;
            return (
              <Link
                key={service.title}
                href={href}
                className="service-card"
                role="menuitem"
              >
                <span className="service-card__icon" aria-hidden="true">
                  <Icon size={28} strokeWidth={1.75} />
                </span>
                <span className="service-card__body">
                  <span className="service-card__title">{service.title}</span>
                  <span className="service-card__desc">
                    {service.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <Link href={active.categoryHref || SERVICE_HREF} className="mega-view-all">
          <span>View all {active.title} Solutions</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
