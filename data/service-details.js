/**
 * Service detail pages (/services/[slug]).
 *
 * Content only — presentation lives in components/sections/ServiceDetail.
 * Add a service by adding an entry here; the route, sections and metadata
 * are generated from it.
 */
const PG = "/assets/service_detail_payment_gateway";
export const SERVICE_DETAILS = [
  {
    slug: "payment-gateway-integration",
    categoryId: "payments-cash",
    name: "Payment Gateway Integration",
    metaTitle: "Payment Gateway Integration Services | GateXPay",
    metaDescription:
      "From start-ups to enterprises, GateXPay helps you integrate reliable and scalable payment gateways that deliver a seamless checkout experience for your customers.",
    hero: {
      titleLead: "Payment Gateway",
      titleAccent: "Integration",
      description:
        "From start-ups to enterprises, GateXPay helps you integrate reliable and scalable payment gateways that deliver a seamless checkout experience for your customers.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services#payments-cash",
      },
      image: {
        src: "/assets/services-detail/payment-gateway/hero-payment-gateway-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of a customer completing a card payment on a secure checkout connected to banks, mobile, web and shopping channels",
      },
    },
    highlights: [
      {
        icon: "zap",
        title: "99.9% Uptime",
        text: "Reliable & high performing infrastructure",
      },
      {
        icon: "shield-check",
        title: "Bank Grade Security",
        text: "Your Transactions, Always Protected",
      },
      {
        icon: "hand-coins",
        title: "Instant Settlement",
        text: "Faster Access to your Funds",
      },
    ],
    included: {
      heading: {
        line1: "What’s Included in",
        accent: "Payment Gateway Integration",
      },
      items: [
        {
          icon: "hand-coins",
          title: "Multi-Payment\nAcceptance",
          text: "Accept UPI, cards, net banking, wallets and QR payments through a unified checkout experience.",
        },
        {
          icon: "shield-check",
          title: "Secure Payment\nInfrastructure",
          text: "Protect every transaction with encrypted APIs, authentication layers and security-focused payment architecture.",
        },
        {
          icon: "zap",
          title: "Real-Time\nTransaction Processing",
          text: "Give customers instant payment confirmation with reliable processing and live transaction status updates.",
        },
        {
          icon: "layout-dashboard",
          title: "Smart Payment\nDashboard",
          text: "Monitor transactions, settlements, payment status and performance from a centralized dashboard.",
        },
        {
          icon: "monitor-cloud",
          title: "Cloud-Ready &\nScalable",
          text: "Build payment infrastructure that can scale with transaction volumes, applications and growing business needs.",
        },
        {
          icon: "code-xml",
          title: "Custom API &\nPlatform Integration",
          text: "Connect payment capabilities with websites, apps, marketplaces and enterprise platforms through flexible APIs.",
        },
      ],
    },
    technology: {
      heading: { line1: "Technology That Moves", accent: "Payments Forward" },
      slides: [
        {
          number: "01",
          title: "Frontend",
          text: "We build responsive, intuitive payment experiences that make every checkout feel fast, familiar and frictionless.",
          technologies: [
            {
              name: "JavaScript",
              logo: `${PG}/icons/icon_23_JavaScript_logo.svg`,
            },
            { name: "React.js", logo: `${PG}/icons/icon_27_React_logo.svg` },
            { name: "HTML5", logo: `${PG}/icons/icon_32_HTML5_logo.svg` },
            { name: "CSS3", logo: `${PG}/icons/icon_css3_logo_2x.png` },
          ],
          image: {
            src: "/assets/services-detail/payment-gateway/technology-architecture-diagram.png",
            width: 1374,
            height: 1145,
            alt: "GateXPay architecture diagram showing client platforms, API Gateway, core payment engines, and acquirer/bank networks",
          },
        },
      ],
    },
    process: {
      heading: {
        line1: "From First Conversation",
        line2Lead: "to ",
        accent: "Live Payments",
      },
      steps: [
        {
          icon: "scan-search",
          title: "Understand",
          text: "We start by understanding your business model, payment flows, customer journey, and technical requirements.",
        },
        {
          icon: "workflow",
          title: "Architect",
          text: "Our team maps the right gateway, payment methods, APIs, security layers, and infrastructure around your requirements.",
        },
        {
          icon: "code-xml",
          title: "Integrate",
          text: "We integrate the payment infrastructure across your website, mobile app, or platform and configure the required payment workflows.",
        },
        {
          icon: "rocket",
          title: "Launch",
          text: "We validate transactions, security, callbacks, settlements, and edge cases before taking your payment system live.",
        },
      ],
    },
    faqs: [
      {
        q: "What is Payment Gateway Integration?",
        a: "Payment gateway integration is the process of connecting a secure digital payment system with a website, mobile app, or business platform to enable online transactions. It helps businesses accept digital payments securely, process transactions instantly, and support multiple payment methods.",
      },
      {
        q: "What payment methods do you support?",
        a: "We support UPI payments, debit and credit card payments, net banking integration, digital wallet integration, QR code payment systems, and online banking transactions.",
      },
      {
        q: "Is GateXPay PCI DSS compliant?",
        a: "Yes, GateXPay adheres to the Payment Card Industry Data Security Standard (PCI DSS), ensuring the highest levels of security for your payment data with encrypted transactions, secure payment APIs, fraud prevention systems, and multi-layer authentication.",
      },
      {
        q: "How secure is your payment infrastructure?",
        a: "Our payment infrastructure includes encrypted transaction processing, secure payment APIs, fraud prevention systems, multi-layer authentication, and protected payment environments to ensure maximum security for every transaction.",
      },
      {
        q: "Can you integrate with my existing systems?",
        a: "Absolutely. Our API-first approach allows businesses to integrate quickly with payment gateways, banking systems, e-commerce platforms, and existing business systems. We offer seamless integration with popular CRMs, POS systems, and inventory management systems.",
      },
    ],
  },
  {
    slug: "pan-card-services",
    categoryId: "citizen-identity",
    name: "PAN Card Services",
    metaTitle: "PAN Card Services - Fast Application & Corrections | GateXPay",
    metaDescription:
      "Whether you're applying for your first PAN or updating an existing one, we help you navigate the process with clear document guidance, guaranteed tracking, and speak-to-us support.",
    hero: {
      titleLead: "PAN Card Services",
      description:
        "Whether you're applying for your first PAN or updating an existing one, we help you navigate the process with clear document guidance, secure handling, and application support.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services#citizen-identity",
      },
      image: {
        src: "/assets/services-detail/pan-card/hero-pan-card-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of Indian PAN card application, verified documents and secure government filing",
      },
    },
    highlights: [
      {
        icon: "zap",
        title: "Fast Processing",
        text: "Fast turnaround for apps and updates.",
      },
      {
        icon: "lock",
        title: "Secure Handling",
        text: "Complete privacy for your KYC documents.",
      },
      {
        icon: "handshake",
        title: "Guided Support",
        text: "Prevent application rejections.",
      },
    ],
    included: {
      heading: { line1: "What’s Included in", accent: "PAN Card Services" },
      items: [
        {
          icon: "credit-card",
          title: "New PAN Card\nApplication",
          text: "Apply for a fresh PAN card with step-by-step document guidance and seamless online submission.",
        },
        {
          icon: "shield-check",
          title: "PAN Card Correction\n& Update",
          text: "Update your name, photo, signature, or address on your existing PAN card with verified filing.",
        },
        {
          icon: "refresh-cw",
          title: "Duplicate / Lost\nPAN Card",
          text: "Lost or damaged your PAN? Get a duplicate card re-issued and delivered to your doorstep.",
        },
      ],
    },
    showcase: {
      heading: { line1: "Have Your Documents", accent: "Ready" },
      description:
        "Keep these official government documents ready for a smooth, single-submission application process:",
      checklist: [
        {
          label: "Identity Proof",
          detail: "Aadhaar Card, Passport, or Voter ID",
        },
        {
          label: "Address Proof",
          detail: "Utility Bill, Bank Statement, or Driving License",
        },
        {
          label: "Date of Birth Proof",
          detail: "Birth Certificate or Matriculation Marksheet",
        },
        {
          label: "Recent Passport-Size Photographs",
          detail: "2 colored photos with clean white background",
        },
        {
          label: "Existing PAN Card Copy",
          detail: "Required for corrections, updates, or duplicate requests",
        },
      ],
      callout: {
        title: "Missing any documents?",
        text: "Our documentation specialists can guide you on acceptable government-approved alternatives if any proof is missing.",
        icon: "lightbulb",
      },
      image: {
        src: "/assets/services-detail/pan-card/document-verification-graphic.png",
        width: 1536,
        height: 1024,
        alt: "Official Indian identity documents, passport, Aadhaar and PAN card verification graphic",
      },
    },
    process: {
      heading: {
        line1: "From Documents to Done",
        line2Lead: "in ",
        accent: "4 Simple Steps",
      },
      steps: [
        {
          icon: "scan-search",
          title: "Choose Service",
          text: "Select new PAN, correction, or duplicate card based on your requirement.",
        },
        {
          icon: "file-text",
          title: "Submit Documents",
          text: "Upload your clear documents or have our team verify them for complete accuracy.",
        },
        {
          icon: "workflow",
          title: "Application Processing",
          text: "We digitally verify and file your application directly with the certifying authorities.",
        },
        {
          icon: "rocket",
          title: "PAN Card Delivery",
          text: "Receive your e-PAN instantly and your physical card at your registered address.",
        },
      ],
    },
    faqs: [
      {
        q: "What is the difference between an e-PAN and a physical PAN card?",
        a: "An e-PAN is a digitally signed PAN card in PDF format issued by the Income Tax Department with equal legal validity to a physical card. Once your application is approved, the e-PAN is delivered to your registered email immediately, while the laminated physical PAN card is dispatched by India Post to your registered address within 7 to 10 working days.",
      },
      {
        q: "Which documents are valid as proof of identity and address?",
        a: "For Indian citizens, an Aadhaar card is the most convenient document as it simultaneously verifies identity, address, and date of birth. Alternatively, you can use a Passport, Voter ID, or Driving License for identity, and utility bills (electricity, water, piped gas) or bank account statements (not older than 3 months) for address proof.",
      },
      {
        q: "How do I correct errors in my existing PAN card (name, DOB, or photo)?",
        a: "You can apply for our PAN Card Correction & Update service. Submit your 10-digit PAN number along with supporting documentation proving the correct details (such as an updated Aadhaar card, marriage certificate for surname changes, or matriculation certificate for DOB). We will review the documents and process the correction request directly with the certifying agency.",
      },
      {
        q: "What should I do if my PAN card is lost or damaged?",
        a: "If your physical PAN card is lost or damaged, you do not need to apply for a new PAN number (holding two PAN cards is illegal). You simply apply for a 'Duplicate / Lost PAN Card Reprint.' We file the reissue request using your existing PAN and Aadhaar records, and a fresh physical card with your existing PAN number will be dispatched to your address.",
      },
      {
        q: "Can a minor or a non-resident Indian (NRI) apply for a PAN card?",
        a: "Yes. Minors can apply through their parents or legal guardians acting as Representative Assessees. NRIs and foreign citizens can also apply using Form 49AA with designated passport and overseas address documentation, which our team fully assists with.",
      },
    ],
  },
  {
    slug: "digital-marketing-services",
    categoryId: "enterprise-tech",
    name: "Digital Marketing Services",
    metaTitle: "Digital Marketing Services - SEO, PPC & Growth | GateXPay",
    metaDescription:
      "Reach the right audience, generate qualified leads and build brand presence for your business with data-driven marketing campaigns built to scale your business growth.",
    hero: {
      titleLead: "Digital Marketing",
      titleLine2: "Services",
      description:
        "Reach the right audience, generate qualified leads and build brand presence for your business with data-driven marketing campaigns built to scale your business growth.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services#enterprise-tech",
      },
      image: {
        src: "/assets/services-detail/digital-marketing/hero-digital-marketing-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of digital marketing campaign optimization, analytics growth charts and multi-channel targeting",
      },
    },
    highlights: [
      {
        icon: "target",
        title: "Targeted Advertising",
        text: "Focus ad spend on your ideal customers.",
      },
      {
        icon: "trending-up",
        title: "Data-Driven ROI",
        text: "Real-time analytics and growth tracking.",
      },
      {
        icon: "rocket",
        title: "Multi-Channel Growth",
        text: "Omnichannel execution that scales.",
      },
    ],
    included: {
      heading: {
        line1: "What’s Included in",
        accent: "Our Digital Marketing Services",
      },
      items: [
        {
          icon: "search",
          title: "Search Engine\nOptimization (SEO)",
          text: "Rank higher on search engines and drive consistent organic traffic to your business website.",
        },
        {
          icon: "mouse-pointer-click",
          title: "Pay-Per-Click\nAdvertising (PPC)",
          text: "Run targeted Google Ads and paid campaigns that convert high-intent clicks into paying customers.",
        },
        {
          icon: "trending-up",
          title: "Performance\nMarketing",
          text: "Maximize ROI across channels with data-driven ad spend, tracking, and continuous conversion rate optimization.",
        },
        {
          icon: "share-2",
          title: "Social Media\nMarketing",
          text: "Engage your community and build brand authority across Meta, Instagram, LinkedIn, and YouTube.",
        },
        {
          icon: "mail",
          title: "Email & SMS\nAutomation",
          text: "Nurture leads and retain customers with personalized, automated email and messaging funnels.",
        },
        {
          icon: "bar-chart-3",
          title: "Analytics &\nConversion Tracking",
          text: "Track every metric that matters — from traffic acquisition and click-through rates to revenue and LTV.",
        },
      ],
    },
    showcase: {
      heading: { line1: "Platforms & Tools", accent: "We Master" },
      description:
        "We leverage industry-leading advertising platforms, analytics suites, and creative tools to deliver measurable growth and maximum return on marketing investment.",
      checklist: [
        {
          label: "Google Ads Network",
          detail:
            "Search, Display, Performance Max, App Campaigns & YouTube Video Ads",
        },
        {
          label: "Meta & Social Advertising",
          detail:
            "High-converting Facebook & Instagram custom audience funnels",
        },
        {
          label: "B2B & Professional Channels",
          detail:
            "LinkedIn Account-Based Marketing (ABM) for targeted enterprise leads",
        },
        {
          label: "Advanced Measurement",
          detail:
            "Google Analytics 4 (GA4), Server-Side GTM, and Conversion APIs",
        },
        {
          label: "Retention & Funnel Automation",
          detail:
            "Automated email sequences, SMS notifications, and CRM retargeting",
        },
      ],
      callout: {
        title: "Full Performance Transparency",
        text: "Every client gets real-time access to live reporting dashboards with 100% transparent attribution and weekly strategy reviews.",
        icon: "bar-chart-3",
      },
      image: {
        src: "/assets/services-detail/digital-marketing/marketing-platforms-graphic.png",
        width: 1536,
        height: 1024,
        alt: "Marketing platforms graphic showing Google Ads, Meta Ads, Instagram, LinkedIn, and Analytics",
      },
    },
    process: {
      heading: {
        line1: "From Documents to Done",
        line2Lead: "in ",
        accent: "4 Simple Steps",
      },
      steps: [
        {
          icon: "scan-search",
          title: "Initial Audit",
          text: "Comprehensive analysis of your current digital presence, competitors, and growth opportunities.",
        },
        {
          icon: "workflow",
          title: "Strategy Blueprint",
          text: "Tailored marketing roadmap defining target personas, key channels, and measurable KPIs.",
        },
        {
          icon: "code-xml",
          title: "Campaign Execution",
          text: "Deploying high-converting ad creatives, copy, landing pages, and automated funnels.",
        },
        {
          icon: "rocket",
          title: "Optimize & Scale",
          text: "Continuous A/B testing, performance tracking, and scaling the highest-performing campaigns.",
        },
      ],
    },
    faqs: [
      {
        q: "How do you determine which marketing channels are right for our business?",
        a: "We conduct an in-depth audit of your industry, competitor landscape, target audience demographics, and past campaign performance. For high-intent immediate lead generation, we typically prioritize Google Search Ads and Performance Max. For brand discovery, visual engagement, and retargeting, we leverage Meta (Facebook & Instagram), LinkedIn, and YouTube campaigns.",
      },
      {
        q: "How soon can we expect measurable results from SEO versus Paid Advertising (PPC)?",
        a: "Paid advertising campaigns (Google Ads, Meta Ads) start generating traffic and qualified leads within 24 to 48 hours of campaign launch. Search Engine Optimization (SEO) builds sustainable compounding value, with meaningful ranking improvements, organic traffic boosts, and search visibility typically appearing within 3 to 6 months of ongoing technical and content optimization.",
      },
      {
        q: "How do you measure and report campaign ROI and conversions?",
        a: "We set up end-to-end server-side tracking, Google Analytics 4 (GA4), and conversion APIs so that every marketing dollar spent is mapped directly to leads, demo bookings, or purchases. You receive a live, transparent dashboard updated in real-time, along with weekly executive summaries and dedicated account manager reviews.",
      },
      {
        q: "Do you provide ad creative design, copywriting, and landing page optimization?",
        a: "Yes. Our digital marketing service is full-stack. Our creative team designs high-converting ad banners, video creatives, persuasive ad copy, and responsive landing pages with continuous A/B testing to ensure maximum click-through and conversion rates.",
      },
      {
        q: "Can you scale campaigns as our business grows?",
        a: "Absolutely. Our data-driven methodology allows us to identify your highest-performing ad sets and audience segments, progressively reallocating budget to maximize Return on Ad Spend (ROAS) and Customer Lifetime Value (LTV) while maintaining low customer acquisition costs (CAC).",
      },
    ],
  },
  {
    slug: "bill-payment-services",
    categoryId: "retail-commerce",
    name: "Bill Payment & Recharge",
    metaTitle: "Bill Payment & Recharge Services - BBPS Integrated | GateXPay",
    metaDescription:
      "Whether you're paying utility bills or topping up mobile plans, we help you manage all recurring payments in one unified interface with instant confirmation and automated reminders.",
    hero: {
      titleLead: "Bill Payment",
      titleLine2: "& Recharge",
      description:
        "Whether you're paying utility bills or topping up mobile plans, we help you manage all recurring payments in one unified interface with instant confirmation and automated reminders.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services#retail-commerce",
      },
      image: {
        src: "/assets/services-detail/bill-payment/hero-bill-payment-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of online utility bill payments, electricity, gas, water and mobile recharge",
      },
    },
    highlights: [
      {
        icon: "zap",
        title: "Instant Confirmation",
        text: "Instant receipt generation and bill settlement.",
      },
      {
        icon: "shield-check",
        title: "BBPS Enabled",
        text: "National Bharat Bill Payment System integrated.",
      },
      {
        icon: "layers",
        title: "All Utility Coverage",
        text: "Electricity, water, gas, DTH, broadband & FASTag.",
      },
    ],
    included: {
      heading: { line1: "Bills & Recharges", accent: "We Support" },
      items: [
        {
          icon: "smartphone",
          title: "Mobile Recharge\n& Postpaid",
          text: "Prepaid and postpaid mobile recharges across Jio, Airtel, Vi, and BSNL with instant top-ups.",
        },
        {
          icon: "lightbulb",
          title: "Electricity\nBill Payment",
          text: "Pay electricity bills across state and private electricity distribution boards (DISCOMs) seamlessly.",
        },
        {
          icon: "tv",
          title: "DTH & Cable\nRecharge",
          text: "Instant recharge for all major direct-to-home satellite providers including Tata Play, Airtel DTH, and Dish TV.",
        },
        {
          icon: "wifi",
          title: "Broadband &\nLandline Bills",
          text: "Pay fiber broadband and landline bills seamlessly without service interruption.",
        },
        {
          icon: "droplets",
          title: "Water & Gas\nUtility Services",
          text: "Clear municipal water charges, piped natural gas (PNG), and LPG cylinders with ease.",
        },
        {
          icon: "credit-card",
          title: "FASTag & Toll\nRecharge",
          text: "Recharge highway FASTag wallets instantly to ensure smooth, cashless toll transit nationwide.",
        },
      ],
    },
    showcase: {
      heading: { line1: "What You Need", accent: "to Bring" },
      description:
        "Keep your account information handy for instant bill retrieval and 100% verified settlement:",
      checklist: [
        {
          label: "Consumer ID / Customer Number",
          detail:
            "Printed on your monthly electricity, gas, or water bill copy",
        },
        {
          label: "Registered Mobile Number",
          detail:
            "For mobile recharge and receiving instant payment SMS confirmation",
        },
        {
          label: "Bill Account Number or CA Number",
          detail: "Unique identifier provided by your utility service provider",
        },
        {
          label: "Operator / Service Provider Selection",
          detail:
            "Select your respective electricity board, telecom, or DTH provider",
        },
      ],
      callout: {
        title: "Need help finding your consumer number?",
        text: "Check your previous physical bill copy, email statement, or recent SMS notification from your service provider.",
        icon: "receipt",
      },
      image: {
        src: "/assets/services-detail/bill-payment/bill-payment-mockup.png",
        width: 1417,
        height: 1110,
        alt: "Mockup of mobile bill payments with consumer number, electricity and utility recharge",
      },
    },
    process: {
      heading: {
        line1: "From Documents to Done",
        line2Lead: "in ",
        accent: "4 Simple Steps",
      },
      steps: [
        {
          icon: "scan-search",
          title: "Select Service",
          text: "Choose the utility or recharge category and select your operator or board.",
        },
        {
          icon: "file-text",
          title: "Enter Details",
          text: "Input your consumer ID, phone number, or account identifier to fetch the bill.",
        },
        {
          icon: "hand-coins",
          title: "Review & Pay",
          text: "Check bill details, choose your preferred payment option, and complete payment.",
        },
        {
          icon: "rocket",
          title: "Instant Confirmation",
          text: "Get instant transaction receipt, BBPS reference ID, and SMS confirmation.",
        },
      ],
    },
    faqs: [
      {
        q: "What utility services and recharge operators are supported on GateXPay?",
        a: "We support over 20,000+ billers across India integrated via the Bharat Bill Payment System (BBPS). This includes all major mobile prepaid and postpaid telecom operators (Jio, Airtel, Vi, BSNL), state and private electricity distribution boards (DISCOMs), DTH providers (Tata Play, Airtel DTH, Dish TV, Sun Direct), piped gas, water authorities, broadband ISPs, and national FASTag toll services.",
      },
      {
        q: "How quickly is my bill payment or mobile recharge credited?",
        a: "Mobile, DTH, and FASTag recharges are processed and credited in real time (within 5 to 10 seconds). Utility bill payments (electricity, gas, water) are settled instantly via BBPS, generating an official BBPS transaction reference ID and timestamped digital receipt immediately upon successful payment.",
      },
      {
        q: "What happens if money is deducted from my bank but the transaction status shows pending?",
        a: "In rare cases of bank network latency, the BBPS system automatically verifies the payment status within a short reconciliation window. If the biller confirms receipt, your bill is cleared and you receive an SMS confirmation. If the transaction fails, the deducted amount is automatically refunded back to your source account within 2 to 4 banking days.",
      },
      {
        q: "Can I download official receipts for tax and business accounting?",
        a: "Yes. Every completed transaction provides an instant, downloadable PDF receipt bearing the official BBPS assurance logo, unique Biller Transaction ID, consumer details, payment breakdown, and timestamp, suitable for corporate expense claims and GST filing.",
      },
      {
        q: "Can I set up automated reminders and auto-pay for recurring monthly bills?",
        a: "Yes. Once you pay a utility bill, you can save your consumer account number to receive automated SMS and email reminders before the due date, ensuring you never incur late payment surcharges or service interruptions.",
      },
    ],
  },
];
export function getServiceDetail(slug) {
  if (slug === "bill-payment-recharge") {
    return SERVICE_DETAILS.find((s) => s.slug === "bill-payment-services");
  }
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}
