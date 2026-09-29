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
  type LucideIcon,
} from "lucide-react";
import "./SolutionsMegaMenu.css";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type Category = {
  id: string;
  title: string;
  description: string;
  services: Service[];
};

export const SOLUTIONS: Category[] = [
  {
    id: "payments-banking",
    title: "Payments & Banking",
    description: "For businesses looking to move money or build fintech apps",
    services: [
      {
        title: "Payment Gateway",
        description: "PCI-DSS compliant multi-currency & multi-method processing.",
        icon: CreditCard,
      },
      {
        title: "Money Transfers & Payouts",
        description: "IMPS, NEFT, and RTGS real-time settlements.",
        icon: ArrowLeftRight,
      },
      {
        title: "Connected & Core Banking",
        description: "Open banking APIs, account aggregation, and CBS solutions.",
        icon: Landmark,
      },
      {
        title: "Banking Partnerships",
        description: "Co-branded products and strategic banking tie-ups.",
        icon: Handshake,
      },
    ],
  },
  {
    id: "agent-csp",
    title: "Agent & CSP Services",
    description: "For agents providing rural/local financial services",
    services: [
      {
        title: "Micro ATM & AEPS",
        description: "Cash withdrawals, balance enquiries, and mini statements via card.",
        icon: Fingerprint,
      },
      {
        title: "Loans & Insurance",
        description: "Personal/home loans, term plans, and health coverage.",
        icon: UserRound,
      },
      {
        title: "Investment Wealth",
        description: "Mutual funds, SIPs, and fixed deposits.",
        icon: TrendingUp,
      },
    ],
  },
  {
    id: "egovernance-utilities",
    title: "E-Governance & Utilities",
    description: "For businesses offering citizen services and bill payments",
    services: [
      {
        title: "Identity & Onboarding",
        description: "PAN card processing, Aadhaar authentication, and eKYC services.",
        icon: IdCard,
      },
      {
        title: "Bill Payments & Recharge",
        description: "BBPS utilities, mobile, DTH, and data card recharges.",
        icon: Smartphone,
      },
      {
        title: "Government Schemes",
        description: "NPS, PMJDY, APY, and certificate issuance.",
        icon: Network,
      },
      {
        title: "Travel Bookings",
        description: "Bus, train, and flight ticket integrations.",
        icon: Globe,
      },
    ],
  },
  {
    id: "business-it",
    title: "Business & IT Infrastructure",
    description: "For enterprises needing tech, marketing, and logistics",
    services: [
      {
        title: "Web & App Development",
        description: "Custom platforms and cloud SaaS implementations.",
        icon: Code2,
      },
      {
        title: "Business Automation",
        description: "AI-driven process optimization and RPA.",
        icon: Bot,
      },
      {
        title: "E-Commerce & Logistics",
        description: "Storefront platforms, inventory, and real-time courier APIs.",
        icon: Package,
      },
      {
        title: "Digital Marketing",
        description: "SEO, paid campaigns, and brand growth strategies.",
        icon: Megaphone,
      },
    ],
  },
];

const SERVICE_HREF = "/services";

interface SolutionsMegaMenuProps {
  id: string;
}

export default function SolutionsMegaMenu({ id }: SolutionsMegaMenuProps) {
  const [activeId, setActiveId] = useState(SOLUTIONS[0].id);
  const active = SOLUTIONS.find((c) => c.id === activeId) ?? SOLUTIONS[0];

  return (
    <div className="mega-menu" id={id} role="menu" aria-label="Solutions">
      {/* ── Left: categories ─────────────────────────────────────────── */}
      <div className="mega-menu__left" role="tablist" aria-orientation="vertical">
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
            return (
              <Link key={service.title} href={SERVICE_HREF} className="service-card" role="menuitem">
                <span className="service-card__icon" aria-hidden="true">
                  <Icon size={28} strokeWidth={1.75} />
                </span>
                <span className="service-card__body">
                  <span className="service-card__title">{service.title}</span>
                  <span className="service-card__desc">{service.description}</span>
                </span>
              </Link>
            );
          })}
        </div>

        <Link href={SERVICE_HREF} className="mega-view-all">
          <span>View all {active.title} Solutions</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
