export const POPULAR_TAGS = [
  "Payment Gateway",
  "Custom Web App",
  "AEPS",
  "API Integration",
  "eKYC",
];
export const SERVICE_CATEGORIES = [
  {
    id: "payments-cash",
    sidebarTitle: "Payments & Cash",
    heading: "Payment & Cash",
    description:
      "Secure infrastructure for moving money, accepting payments, and managing liquidity at scale.",
    iconName: "wallet",
    badge: "PAYMENT",
    badgeColor: "#00C0FD",
    services: [
      {
        id: "payment-gateway",
        title: "Payment Gateway Integration",
        description:
          "PCI-DSS compliant payment gateway with multi-currency and multi-method support.",
        badge: "PAYMENT",
        badgeColor: "#00C0FD",
        isHighlighted: true,
        highlightBg: "#F2FCFF",
        highlightBorder: "#00C0FD",
        image:
          "/assets/services-listing/service-payment-gateway-integration.png",
        href: "/services/payment-gateway-integration",
      },
      {
        id: "aeps-services",
        title: "AEPS Services",
        description:
          "Aadhaar-enabled payment system for cash withdrawal, balance enquiry, and mini statements.",
        badge: "PAYMENT",
        badgeColor: "#00C0FD",
        image: "/assets/services-listing/service-aeps.png",
        href: "/services/aeps-services",
      },
      {
        id: "micro-atm-services",
        title: "Micro ATM Services",
        description:
          "Portable, card-based micro-ATM for cash withdrawal via debit card anywhere.",
        badge: "PAYMENT",
        badgeColor: "#00C0FD",
        image: "/assets/services-listing/service-micro-atm.png",
        href: "/services/micro-atm-services",
      },
      {
        id: "money-transfer-services",
        title: "Money Transfer Services",
        description:
          "IMPS, NEFT, RTGS, and domestic money transfers with real-time settlement.",
        badge: "PAYMENT",
        badgeColor: "#00C0FD",
        image: "/assets/services-listing/service-money-transfer.png",
        href: "/services/money-transfer-services",
      },
    ],
  },
  {
    id: "banking-financial",
    sidebarTitle: "Banking & Financial",
    heading: "Banking & Financial",
    description:
      "Embedded finance APIs, lending, and investment products to power your financial platform.",
    iconName: "banknote",
    badge: "BANK",
    badgeColor: "#046790",
    services: [
      {
        id: "core-banking-services",
        title: "Core Banking Services",
        description:
          "Integrated CBS solutions for CSP agents enabling full banking operations.",
        badge: "BANK",
        badgeColor: "#046790",
        image: "/assets/services-listing/service-core-banking.png",
        href: "/services/core-banking-services",
      },
      {
        id: "connected-banking-services",
        title: "Connected Banking Services",
        description:
          "Connect applications with banking APIs, payment systems, and financial workflows.",
        badge: "BANK",
        badgeColor: "#046790",
        isHighlighted: true,
        highlightBg: "#F2F7F9",
        highlightBorder: "#046790",
        image: "/assets/services-listing/service-connected-banking.png",
        href: "/services/connected-banking-services",
      },
      {
        id: "banking-tie-up-services",
        title: "Banking Tie-Up Services",
        description:
          "Strategic banking partnerships for co-branded products, credit lines, and more.",
        badge: "BANK",
        badgeColor: "#046790",
        image: "/assets/services-listing/service-banking-tie-up.png",
        href: "/services/banking-tie-up-services",
      },
      {
        id: "loan-insurance-services",
        title: "Loan & Insurance Services",
        description:
          "Personal loans, home loans, crop insurance, term plans, and health coverage.",
        badge: "BANK",
        badgeColor: "#046790",
        image: "/assets/services-listing/service-loan-and-insurance.png",
        href: "/services/loan-insurance-services",
      },
      {
        id: "investment-services",
        title: "Investment Services",
        description:
          "Mutual funds, SIPs, fixed deposits, and insurance products available at fingertips.",
        badge: "BANK",
        badgeColor: "#046790",
        image: "/assets/services-listing/service-investment-services.png",
        href: "/services/investment-services",
      },
      {
        id: "fintech-financial-integration",
        title: "FinTech & Financial Integration",
        description:
          "Connect payment gateways, banking APIs, digital-banking services, and transaction workflows.",
        badge: "BANK",
        badgeColor: "#046790",
        image:
          "/assets/services-listing/service-fintech-financial-integration.png",
        href: "/services/fintech-financial-integration",
      },
    ],
  },
  {
    id: "retail-commerce",
    sidebarTitle: "Retail & Commerce",
    heading: "Retail & Commerce",
    description:
      "Expand your retail footprint with utility billing, travel ticketing, and e-commerce infrastructure.",
    iconName: "shopping-bag",
    badge: "COMMERCE",
    badgeColor: "#64748B",
    services: [
      {
        id: "bill-payment-services",
        title: "Bill Payment Services",
        description:
          "Electricity, water, gas, broadband, and insurance premium payments via BBPS.",
        badge: "COMMERCE",
        badgeColor: "#64748B",
        isHighlighted: true,
        highlightBg: "#F7F8F9",
        highlightBorder: "#64748B",
        image: "/assets/services-listing/service-bill-payment.png",
        href: "/services/bill-payment-services",
      },
      {
        id: "recharge-services",
        title: "Recharge Services",
        description:
          "Mobile, DTH, FASTag, and data recharges across all operators nationwide with instant confirmation.",
        badge: "COMMERCE",
        badgeColor: "#64748B",
        image: "/assets/services-listing/service-recharge.png",
        href: "/services/recharge-services",
      },
      {
        id: "travel-booking-services",
        title: "Travel Booking Services",
        description:
          "Book trains, flights, buses, and hotels with guided CSP assistance and secure payments.",
        badge: "COMMERCE",
        badgeColor: "#64748B",
        image: "/assets/about_us/images/img_dd166e132a.png",
        href: "/services/travel-booking-services",
      },
      {
        id: "ecommerce-services",
        title: "E-Commerce Services",
        description:
          "B2C/B2B e-commerce integrations for product discovery, ordering, and payment collection.",
        badge: "COMMERCE",
        badgeColor: "#64748B",
        image: "/assets/services-listing/service-ecommerce.png",
        href: "/services/e-commerce-services",
      },
      {
        id: "ecommerce-solutions",
        title: "E-Commerce Solutions",
        description:
          "Full-stack e-commerce platforms with payment, inventory, and analytics built in.",
        badge: "COMMERCE",
        badgeColor: "#64748B",
        image: "/assets/services-listing/service-ecommerce-solutions.png",
        href: "/services/e-commerce-solutions",
      },
      {
        id: "shipping-logistics-integration",
        title: "Shipping & Logistics Integration",
        description:
          "Connect shipping, courier, inventory, tracking, and fulfillment systems through secure APIs.",
        badge: "COMMERCE",
        badgeColor: "#64748B",
        image: "/assets/services-listing/service-shipping-logistics.png",
        href: "/services/shipping-logistics-integration",
      },
    ],
  },
  {
    id: "citizen-identity",
    sidebarTitle: "Citizen & Identity",
    heading: "Citizen & Identity",
    description:
      "Reliable APIs for verified citizen services, identity authentication, and government program enrolments.",
    iconName: "landmark",
    badge: "CITIZEN",
    badgeColor: "#0F172A",
    services: [
      {
        id: "pan-card-services",
        title: "PAN Card Services",
        description:
          "Instant PAN card application, correction, and e-PAN delivery with NSDL/UTIITSL integration.",
        badge: "CITIZEN",
        badgeColor: "#0F172A",
        isHighlighted: true,
        highlightBg: "#FAFAFB",
        highlightBorder: "#0F172A",
        image: "/assets/services-listing/service-pan-card.png",
        href: "/services/pan-card-services",
      },
      {
        id: "aadhaar-services",
        title: "Aadhaar Services Assistance",
        description:
          "Get reliable assistance for Aadhaar enrolment, updates, corrections, downloads, PVC card requests, and authorised UIDAI service processes.",
        badge: "CITIZEN",
        badgeColor: "#0F172A",
        image: "/assets/services-listing/service-aadhaar.png",
        href: "/services/aadhaar-services",
      },
      {
        id: "e-governance-services",
        title: "E-Governance Services",
        description:
          "Access government certificates, digital services, scheme assistance, and identity-related support through guided E-Governance services at participating GateXPay CSP locations.",
        badge: "CITIZEN",
        badgeColor: "#0F172A",
        image: "/assets/services-listing/service-egovernance.png",
        href: "/services/e-governance-services",
      },
      {
        id: "pension-government-schemes",
        title: "Pension & Government Scheme Assistance",
        description:
          "Get guided assistance for pension, farmer, healthcare, and government welfare schemes through document support, eligibility guidance, and application facilitation.",
        badge: "CITIZEN",
        badgeColor: "#0F172A",
        image: "/assets/services-listing/service-pension-government.png",
        href: "/services/pension-government-schemes",
      },
    ],
  },
  {
    id: "enterprise-tech",
    sidebarTitle: "Enterprise Tech",
    heading: "Enterprise Tech",
    description:
      "Scalable web platforms, cloud infrastructure, and marketing automation to accelerate your growth.",
    iconName: "briefcase-business",
    badge: "ENTERPRISE",
    badgeColor: "#0284C7",
    services: [
      {
        id: "web-app-development",
        title: "Web & App Development",
        description:
          "Custom-built web platforms and mobile apps with cutting-edge technology stack.",
        badge: "ENTERPRISE",
        badgeColor: "#0284C7",
        image: "/assets/services-listing/service-web-app-development.png",
        href: "/services/web-app-development",
      },
      {
        id: "it-cloud-services",
        title: "IT & Cloud Services",
        description:
          "Cloud migration, DevOps, infrastructure management, and SaaS implementations.",
        badge: "ENTERPRISE",
        badgeColor: "#0284C7",
        isHighlighted: true,
        highlightBg: "#F2F9FC",
        highlightBorder: "#0284C7",
        image: "/assets/services-listing/service-it-cloud.png",
        href: "/services/it-cloud-services",
      },
      {
        id: "business-automation",
        title: "Business Automation",
        description:
          "Workflow automation, RPA, and AI-driven process optimization for enterprises.",
        badge: "ENTERPRISE",
        badgeColor: "#0284C7",
        image: "/assets/services-listing/service-business-automation.png",
        href: "/services/business-automation",
      },
      {
        id: "digital-it-services",
        title: "Digital & IT Services",
        description:
          "End-to-end digital transformation and IT solutions for CSP-enabled businesses.",
        badge: "ENTERPRISE",
        badgeColor: "#0284C7",
        image: "/assets/services-listing/service-digital-it-services.png",
        href: "/services/digital-it-services",
      },
      {
        id: "digital-marketing-services",
        title: "Digital Marketing Services",
        description:
          "SEO, paid campaigns, social media, and content strategies to grow your brand.",
        badge: "ENTERPRISE",
        badgeColor: "#0284C7",
        image: "/assets/services-listing/service-digital-marketing.png",
        href: "/services/digital-marketing-services",
      },
      {
        id: "value-added-services",
        title: "Value-Added Services",
        description:
          "Everyday financial, digital, travel, document, and assisted services through our CSP network.",
        badge: "ENTERPRISE",
        badgeColor: "#0284C7",
        image: "/assets/services-listing/service-other-value-added.png",
        href: "/services/value-added-services",
      },
    ],
  },
];
export const SERVICES_FAQS = [
  {
    q: "What happens after the design is ready & I approve?",
    a: "Absolutely. We integrate seamlessly with your existing core banking, ERP, and CRM systems through open APIs, so you don't need to rebuild your stack.",
  },
  {
    q: "How long does it take to integrate GateXPay's payment gateway?",
    a: "Most merchants go live within 3–5 business days using our REST APIs and pre-built SDKs. Our technical team provides hands-on integration support throughout the process.",
  },
  {
    q: "Is GateXPay PCI-DSS compliant and secure?",
    a: "Yes. GateXPay is PCI-DSS compliant and uses end-to-end tokenization, encryption, and real-time fraud monitoring to keep every transaction secure.",
  },
  {
    q: "Can GateXPay integrate with my existing banking or ERP systems?",
    a: "Yes, our modular API architecture allows seamless interoperability with legacy core banking solutions, custom databases, and popular enterprise ERPs.",
  },
  {
    q: "What support is available after I go live?",
    a: "Every merchant receives dedicated technical account management, 24/7 incident response, proactive system monitoring, and SLA-backed uptime guarantees.",
  },
];
/**
 * Autocomplete suggestions based on query
 */
export function getServiceSuggestions(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const candidates = [];
  // Category names & variations
  SERVICE_CATEGORIES.forEach((cat) => {
    if (cat.sidebarTitle.toLowerCase().includes(q)) {
      candidates.push(cat.sidebarTitle);
    }
    if (
      cat.heading.toLowerCase().includes(q) &&
      !candidates.includes(cat.heading)
    ) {
      candidates.push(cat.heading);
    }
    // Also simplified "Payments" if "Payments & Cash"
    if (
      cat.id === "payments-cash" &&
      "payments".includes(q) &&
      !candidates.includes("Payments")
    ) {
      candidates.unshift("Payments");
    }
  });
  // Service titles
  SERVICE_CATEGORIES.forEach((cat) => {
    cat.services.forEach((srv) => {
      if (
        srv.title.toLowerCase().includes(q) &&
        !candidates.includes(srv.title)
      ) {
        candidates.push(srv.title);
      }
    });
  });
  // Limit to top 6 suggestions
  return candidates.slice(0, 6);
}
/**
 * Search services deterministically across all categories
 */
export function searchAllServices(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const exactTitle = [];
  const partialTitle = [];
  const categoryMatch = [];
  const descMatch = [];
  const seenIds = new Set();
  SERVICE_CATEGORIES.forEach((cat) => {
    const isCatMatch =
      cat.heading.toLowerCase().includes(q) ||
      cat.sidebarTitle.toLowerCase().includes(q);
    cat.services.forEach((srv) => {
      if (seenIds.has(srv.id)) return;
      const titleLower = srv.title.toLowerCase();
      const descLower = srv.description.toLowerCase();
      const badgeLower = srv.badge.toLowerCase();
      if (titleLower === q) {
        exactTitle.push(srv);
        seenIds.add(srv.id);
      } else if (titleLower.includes(q)) {
        partialTitle.push(srv);
        seenIds.add(srv.id);
      } else if (isCatMatch || badgeLower.includes(q)) {
        categoryMatch.push(srv);
        seenIds.add(srv.id);
      } else if (descLower.includes(q)) {
        descMatch.push(srv);
        seenIds.add(srv.id);
      }
    });
  });
  return [...exactTitle, ...partialTitle, ...categoryMatch, ...descMatch];
}
