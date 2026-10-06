/**
 * Service detail pages (/services/[slug]).
 *
 * Content only — presentation lives in components/sections/ServiceDetail.
 * Add a service by adding an entry here; the route, sections and metadata
 * are generated from it.
 */
const PG = "/assets/service_detail_payment_gateway";
const ARCH_IMG = "/assets/services-detail/payment-gateway/technology-architecture-diagram.png";

const LOGOS = {
  react: `${PG}/icons/icon_27_React_logo.svg`,
  js: `${PG}/icons/icon_23_JavaScript_logo.svg`,
  html5: `${PG}/icons/icon_32_HTML5_logo.svg`,
  css3: `${PG}/icons/icon_css3_logo_2x.png`
};

export const SERVICE_DETAILS = [
  // 1. Payment Gateway Integration
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
      { icon: "zap", title: "99.9% Uptime", text: "Reliable & high performing infrastructure" },
      { icon: "shield-check", title: "Bank Grade Security", text: "Your Transactions, Always Protected" },
      { icon: "hand-coins", title: "Instant Settlement", text: "Faster Access to your Funds" },
    ],
    included: {
      heading: { line1: "What’s Included in", accent: "Payment Gateway Integration" },
      items: [
        { icon: "hand-coins", title: "Multi-Payment\\nAcceptance", text: "Accept UPI, cards, net banking, wallets and QR payments through a unified checkout experience." },
        { icon: "shield-check", title: "Secure Payment\\nInfrastructure", text: "Protect every transaction with encrypted APIs, authentication layers and security-focused payment architecture." },
        { icon: "zap", title: "Real-Time\\nTransaction Processing", text: "Give customers instant payment confirmation with reliable processing and live transaction status updates." },
        { icon: "layout-dashboard", title: "Smart Payment\\nDashboard", text: "Monitor transactions, settlements, payment status and performance from a centralized dashboard." },
        { icon: "monitor-cloud", title: "Cloud-Ready &\\nScalable", text: "Build payment infrastructure that can scale with transaction volumes, applications and growing business needs." },
        { icon: "code-xml", title: "Custom API &\\nPlatform Integration", text: "Connect payment capabilities with websites, apps, marketplaces and enterprise platforms through flexible APIs." },
      ],
    },
    technology: {
      heading: { line1: "Technology That Moves", accent: "Payments Forward" },
      slides: [
        {
          number: "01",
          title: "Frontend Development",
          text: "We build responsive, intuitive payment experiences that make every checkout feel fast, familiar and frictionless.",
          technologies: [{ name: "JavaScript", logo: LOGOS.js }, { name: "React.js", logo: LOGOS.react }, { name: "HTML5", logo: LOGOS.html5 }, { name: "CSS3", logo: LOGOS.css3 }],
          image: {
            src: ARCH_IMG,
            width: 1374,
            height: 1145,
            alt: "GateXPay architecture diagram showing client platforms, API Gateway, core payment engines, and acquirer/bank networks",
          },
        },
        {
          number: "02",
          title: "Backend Development",
          text: "Our backend systems are built to handle secure transaction processing, API communication, and complex payment workflows.",
          technologies: [{ name: "Node.js", logo: "/assets/tech-icons/node.svg" }, { name: "Java", logo: "/assets/tech-icons/java.svg" }, { name: "Python", logo: "/assets/tech-icons/python.svg" }, { name: ".NET", logo: "/assets/tech-icons/dotnet.svg" }],
          image: {
            src: ARCH_IMG,
            width: 1374,
            height: 1145,
            alt: "GateXPay backend payment processing architecture",
          },
        },
        {
          number: "03",
          title: "Cloud Technology",
          text: "Cloud-based deployment enables flexibility, reliability, and better performance for growing payment ecosystems.",
          technologies: [{ name: "Cloud hosting", logo: "/assets/tech-icons/cloud.svg" }, { name: "Load balancing", logo: "/assets/tech-icons/scale.svg" }, { name: "Data backup", logo: "/assets/tech-icons/backup.svg" }, { name: "High availability systems", logo: "/assets/tech-icons/performance.svg" }],
          image: {
            src: ARCH_IMG,
            width: 1374,
            height: 1145,
            alt: "Scalable cloud infrastructure for high performance payments",
          },
        },
        {
          number: "04",
          title: "Security & Database Technology",
          text: "We implement secure databases and protection mechanisms to support safe transaction processing.",
          technologies: [{ name: "SQL Databases", logo: "/assets/tech-icons/database.svg" }, { name: "NoSQL Databases", logo: "/assets/tech-icons/database.svg" }, { name: "API Security", logo: "/assets/tech-icons/security.svg" }, { name: "Encryption Systems", logo: "/assets/tech-icons/security.svg" }],
          image: {
            src: ARCH_IMG,
            width: 1374,
            height: 1145,
            alt: "Security and database architecture",
          },
        },
      ],
    },
    process: {
      heading: { line1: "From First Conversation", line2Lead: "to ", accent: "Live Payments" },
      steps: [
        { icon: "scan-search", title: "Understand", text: "We begin by understanding your business model, payment requirements, customer journey, existing systems, and technical objectives." },
        { icon: "workflow", title: "Architect", text: "Our experts define the right payment gateway architecture, integration approach, security requirements, and technology roadmap." },
        { icon: "code-xml", title: "Integrate", text: "We connect payment infrastructure with your website, mobile application, or business platform while configuring required payment workflows." },
        { icon: "rocket", title: "Launch", text: "Before going live, we test transactions, security, payment callbacks, settlements, and system performance to ensure smooth operations." },
      ],
    },
    faqs: [
      { q: "What is Payment Gateway Integration?", a: "Payment gateway integration is the process of connecting a secure payment system with a website, mobile application, or business platform to enable online transactions. It allows businesses to accept digital payments, process transactions securely, and provide customers with a smooth checkout experience." },
      { q: "What payment methods can be integrated?", a: "Payment gateway solutions can support multiple payment methods including UPI, cards, net banking, wallets, and QR-based payments depending on business requirements." },
      { q: "Is Payment Gateway Integration secure?", a: "Yes. Secure payment integrations use encryption, authentication mechanisms, API security practices, and transaction monitoring to protect payment information." },
      { q: "Can you integrate payment gateways with existing websites or applications?", a: "Yes. Payment gateways can be integrated with websites, mobile applications, marketplaces, and enterprise platforms through secure APIs and customized workflows." },
      { q: "How long does payment gateway integration take?", a: "The timeline depends on the platform complexity, required features, payment providers, and customization requirements." },
    ],
    finalCta: {
      titleLead: "Ready to Scale Your",
      titleAccent: "Payment Infrastructure?",
      description: "Build secure, reliable, and scalable payment experiences for your customers with expert payment integration solutions. Get customized payment infrastructure designed around your business requirements.",
      ctaLabel: "Talk to an Expert",
    },
  },

  // 2. PAN Card Services
  {
    slug: "pan-card-services",
    categoryId: "citizen-identity",
    name: "PAN Card Services",
    metaTitle: "PAN Card Services | New PAN Application & Correction Assistance",
    metaDescription: "Get secure PAN Card Services for new applications, corrections, updates, and reissue support. Complete your PAN process with expert guidance and reliable assistance.",
    hero: {
      titleLead: "Get Your PAN Card Easily With",
      titleAccent: "Secure Documentation & Expert Assistance",
      description: "Whether you are applying for a new PAN card, updating existing details, or requesting a reissue, GateXPay helps you complete the process with proper document guidance, secure handling, and reliable application support. Our PAN Card Services simplify the application journey by helping individuals and businesses manage PAN-related requirements through trusted CSP assistance.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: { text: "View Similar Services", href: "/services#citizen-identity" },
      image: {
        src: "/assets/services-detail/pan-card/hero-pan-card-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of PAN card verification and secure citizen application assistance",
      },
    },
    highlights: [
      { icon: "zap", title: "Fast Processing", subtitle: "Smoother Application Process", text: "Get professional assistance for PAN applications and updates with a smoother documentation process." },
      { icon: "shield-check", title: "Secure Handling", subtitle: "Privacy-Focused Procedures", text: "Your personal and KYC documents are handled carefully with privacy-focused procedures." },
      { icon: "handshake", title: "Guided Support", subtitle: "Proper Guidance Throughout", text: "Reduce errors and improve application success with proper guidance throughout the process." },
    ],
    included: {
      heading: { line1: "What's Included in", accent: "PAN Card Services" },
      items: [
        { icon: "credit-card", title: "New PAN Card\\nApplication", text: "Get support for new PAN registration with proper document verification and application guidance." },
        { icon: "file-text", title: "PAN Card Correction\\n& Updates", text: "Make necessary changes to your PAN information including name, address, date of birth, photo and signature." },
        { icon: "refresh-cw", title: "Duplicate PAN Card\\n/ Reissue", text: "Get assistance for duplicate PAN card requests and reissue procedures when your original PAN card is lost or damaged." },
        { icon: "user-check", title: "Document Verification\\nAssistance", text: "Ensure identity, address, and date of birth documents are correctly formatted before submission." },
        { icon: "workflow", title: "Application Submission\\nGuidance", text: "Receive end-to-end guidance for official portal filings and compliance requirements." },
        { icon: "scan-search", title: "Status Tracking\\nSupport", text: "Receive your application tracking details and monitor your PAN card dispatch progress easily." },
      ],
    },
    showcase: {
      heading: { line1: "Have Your Documents", accent: "Ready" },
      description: "To complete your PAN card process smoothly, keep the required identity and verification documents ready.",
      checklist: [
        { label: "Aadhaar Card", detail: "Used as an identity and verification document for PAN applications" },
        { label: "Proof of Identity", detail: "Driving Licence, Voter ID, or other government-approved identity documents" },
        { label: "Proof of Address", detail: "Required for confirming your residential information" },
        { label: "Proof of Date of Birth", detail: "Documents required to verify your date of birth details" },
        { label: "Passport Size Photograph", detail: "Recent photograph required for PAN card processing" },
      ],
      callout: {
        title: "Making a Correction?",
        text: "Keep your current PAN information and supporting documents ready to ensure a smoother process.",
        icon: "lightbulb",
      },
      image: {
        src: "/assets/services-detail/pan-card/document-verification-graphic.png",
        width: 1536,
        height: 1024,
        alt: "Required documents checklist graphic for PAN card application",
      },
    },
    process: {
      heading: { line1: "From Documents", line2Lead: "to ", accent: "Completed PAN Application" },
      steps: [
        { icon: "map-pin", title: "Visit a CSP Point", text: "Locate and visit your nearest GateXPay Customer Service Point for PAN card assistance." },
        { icon: "file-text", title: "Submit Documents", text: "Provide your required KYC documents and application details to our trained service agents." },
        { icon: "workflow", title: "Application Processing", text: "We digitally submit and verify your request through the required PAN application process." },
        { icon: "rocket", title: "Track Status", text: "Receive your application tracking details and monitor your PAN card progress easily." },
      ],
    },
    faqs: [
      { q: "What is a PAN card used for?", a: "A PAN card is a unique identification document used for tax filing, banking transactions, investments, financial activities, and identity verification in India." },
      { q: "Can I apply for a PAN card through CSP services?", a: "Yes, you can get assistance for PAN card applications through authorized CSP service points where experts help with documentation and submission." },
      { q: "How can I correct details on my PAN card?", a: "You can update PAN details such as name, address, date of birth, photograph, or signature by submitting the required correction request with supporting documents." },
      { q: "What documents are required for a PAN card?", a: "Generally, identity proof, address proof, date of birth proof, and a recent photograph are required for PAN card applications." },
      { q: "Can I get a duplicate PAN card if mine is lost?", a: "Yes, you can apply for a duplicate PAN card or reissue when your original PAN card is lost, damaged, or unavailable." },
    ],
    finalCta: {
      titleLead: "Ready to Complete Your",
      titleAccent: "PAN Card Application?",
      description: "Get reliable PAN card assistance with secure documentation support and a simple application process. Our experts help you complete PAN applications, corrections, and reissue requests with confidence.",
      ctaLabel: "Talk to an Expert",
    },
  },

  // 3. Bill Payment & Recharge Services
  {
    slug: "bill-payment-services",
    categoryId: "retail-commerce",
    name: "Bill Payment & Recharge Services",
    metaTitle: "Bill Payment & Recharge Services | Secure Digital Payment Solutions",
    metaDescription: "Manage mobile recharge, utility bills, DTH, FASTag, and other payments easily with GateXPay Bill Payment & Recharge Services. Secure, convenient, and reliable payment support.",
    hero: {
      titleLead: "Pay Bills & Recharge Services Easily With",
      titleAccent: "Secure, Fast & Reliable Assistance",
      description: "GateXPay helps customers complete everyday payments and recharge requirements through a simple and convenient service network. From mobile recharge and utility payments to DTH, FASTag, and other supported services, our Bill Payment & Recharge Services provide a reliable way to manage essential payments with secure processing and guided assistance.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: { text: "View Similar Services", href: "/services#retail-commerce" },
      image: {
        src: "/assets/services-detail/bill-payment/hero-bill-payment-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of online utility bill payments, electricity, gas, water and mobile recharge",
      },
    },
    highlights: [
      { icon: "zap", title: "Instant Settlement", subtitle: "Faster Transaction Confirmation", text: "Experience faster transaction confirmation with reliable payment processing and quick service updates." },
      { icon: "hand-coins", title: "Pay in Cash", subtitle: "Assisted Payment Support", text: "Make payments easily without requiring internet banking or UPI access through assisted payment support." },
      { icon: "globe", title: "All-India Coverage", subtitle: "Multiple Utility Providers", text: "Access support for multiple national and regional utility providers through the GateXPay network." },
    ],
    included: {
      heading: { line1: "Bills & Recharges", accent: "We Support" },
      items: [
        { icon: "smartphone", title: "Mobile Recharge", text: "Recharge prepaid and postpaid connections across supported operators with a quick and convenient payment experience." },
        { icon: "tv", title: "DTH Recharge", text: "Recharge DTH connections and subscription plans through a simple assisted payment process." },
        { icon: "lightbulb", title: "Utility Bill Payments", text: "Complete essential electricity, water, and gas payments with secure assistance and reliable processing." },
        { icon: "wifi", title: "Broadband & Landline", text: "Pay broadband and landline bills quickly through convenient service points to keep connectivity active." },
        { icon: "credit-card", title: "FASTag & Insurance", text: "Complete FASTag top-ups and selected insurance premium payments through assisted digital payment services." },
        { icon: "layers", title: "Other Billers", text: "Support for additional billers and payment services helps customers manage different payment requirements from one convenient platform." },
      ],
    },
    showcase: {
      heading: { line1: "What You Need", accent: "to Bring" },
      description: "Keep the following information ready for a smooth payment experience:",
      checklist: [
        { label: "Consumer Number / CA Number / Account ID", detail: "Required for identifying your utility account and processing payments" },
        { label: "Mobile Number or DTH ID", detail: "Provide your registered mobile number or DTH customer ID for recharge services" },
        { label: "Latest Bill Copy", detail: "A recent bill copy is recommended to verify payment details accurately" },
        { label: "Payment Amount", detail: "Keep the required payment amount ready before completing the transaction" },
      ],
      callout: {
        title: "Not Sure What Details You Need?",
        text: "Bring your latest bill and our service representatives will help identify the required information for your payment.",
        icon: "receipt",
      },
      image: {
        src: "/assets/services-detail/bill-payment/bill-payment-mockup.png",
        width: 1417,
        height: 1110,
        alt: "Mockup of bill payment screen and utility details",
      },
    },
    process: {
      heading: { line1: "From Bill Details to", accent: "Completed Payment" },
      steps: [
        { icon: "map-pin", title: "Visit a CSP Point", text: "Find your nearest GateXPay Customer Service Point and share the service you need to complete." },
        { icon: "file-text", title: "Provide Your Details", text: "Share your operator name, consumer number, account ID, or recharge details with our representative." },
        { icon: "hand-coins", title: "Review & Pay", text: "Confirm your bill amount or recharge value and complete the payment securely." },
        { icon: "rocket", title: "Get Confirmation", text: "Receive your transaction receipt and payment confirmation after successful processing." },
      ],
    },
    faqs: [
      { q: "What are Bill Payment Services?", a: "Bill Payment Services allow customers to pay utility and service bills through secure digital payment systems with convenient processing support." },
      { q: "What types of bills can be paid through GateXPay?", a: "Customers can pay multiple services including mobile recharge, DTH recharge, electricity bills, water bills, gas payments, broadband bills, FASTag recharge, insurance payments, and other supported billers." },
      { q: "Are online bill payments secure?", a: "Yes. Secure payment systems use transaction verification processes and reliable infrastructure to help protect customer payment information." },
      { q: "Can businesses use your Bill Payment Services?", a: "Yes. Businesses can integrate or provide assisted payment services through suitable CSP and digital payment solutions." },
      { q: "Why are digital bill payment services important?", a: "Digital bill payment services save time, improve accessibility, reduce manual processes, and provide customers with easier ways to manage regular payments." },
    ],
    finalCta: {
      titleLead: "Ready to Simplify Your",
      titleAccent: "Payment Services?",
      description: "Provide customers with secure, convenient, and scalable bill payment solutions designed for modern financial needs. Connect with GateXPay to build reliable payment services for your customers and business network.",
      ctaLabel: "Talk to an Expert",
    },
  },

  // 4. Digital Marketing Services
  {
    slug: "digital-marketing-services",
    categoryId: "enterprise-tech",
    name: "Digital Marketing Services",
    metaTitle: "Digital Marketing Services | SEO, Ads & Growth Solutions",
    metaDescription: "Grow your online presence with GateXPay Digital Marketing Services including SEO, social media marketing, paid advertising, content strategy, and analytics-driven solutions.",
    hero: {
      titleLead: "Grow Your Online Presence With",
      titleAccent: "Data-Driven Digital Marketing Strategies",
      description: "In today's competitive digital landscape, businesses need more than just visibility — they need the right audience, meaningful engagement, and measurable growth. GateXPay helps businesses build stronger digital presence through strategic Digital Marketing Services that combine SEO, content, social media, paid advertising, and performance analytics to generate sustainable results.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: { text: "View Similar Services", href: "/services#enterprise-tech" },
      image: {
        src: "/assets/services-detail/digital-marketing/hero-digital-marketing-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of digital marketing campaign optimization, analytics growth charts and multi-channel targeting",
      },
    },
    highlights: [
      { icon: "target", title: "Precision Targeting", subtitle: "Reach the Right Audience", text: "Reach the right audience by identifying customer intent, market opportunities, and relevant digital channels." },
      { icon: "trending-up", title: "Know What Works", subtitle: "Meaningful Data Insights", text: "Track campaign performance, audience behaviour, and marketing results through meaningful data insights." },
      { icon: "rocket", title: "Long-Term Growth", subtitle: "Continuous Brand Optimization", text: "Build stronger brand authority through consistent strategies, valuable content, and continuous optimization." },
    ],
    included: {
      heading: { line1: "What's Included in", accent: "Our Digital Marketing Services" },
      items: [
        { icon: "search", title: "SEO & Organic\\nGrowth", text: "Improve search visibility with strategic SEO practices focusing on keyword research, technical SEO, and valuable content." },
        { icon: "share-2", title: "Social Media\\nMarketing", text: "Build meaningful connections with your audience through engaging content, community interaction, and platform-specific campaigns." },
        { icon: "mouse-pointer-click", title: "Performance\\nMarketing", text: "Generate measurable results through paid advertising on Google Ads, Meta Ads, and YouTube Ads." },
        { icon: "file-text", title: "Content\\nMarketing", text: "Create high-quality content that educates, engages, and converts visitors into loyal customers." },
        { icon: "mail", title: "Email Marketing &\\nCustomer Retention", text: "Develop targeted email campaigns and automated workflows that nurture leads and encourage repeat engagement." },
        { icon: "bar-chart-3", title: "Analytics &\\nReporting", text: "Measure marketing performance through actionable insights, traffic analysis, and conversion tracking." },
      ],
    },
    showcase: {
      heading: { line1: "Platforms & Tools", accent: "We Master" },
      description: "Data-driven marketing powered by reliable technology. We use industry-standard marketing platforms and analytics tools to optimize campaigns and make informed decisions.",
      checklist: [
        { label: "Google Ads & Meta Business Suite", detail: "Campaign setup, audience targeting, and budget optimization across Google, Facebook, and Instagram" },
        { label: "LinkedIn & YouTube Advertising", detail: "B2B professional networking and engaging high-intent video campaigns" },
        { label: "Google Analytics & Search Console", detail: "Comprehensive traffic analysis, keyword ranking insights, and search performance monitoring" },
        { label: "Automated Communication & CRM", detail: "Lead nurturing sequences, customer journeys, and automated email workflows" },
        { label: "Conversion Tracking & Reporting", detail: "End-to-end attribution, audience insights, and regular transparent growth reports" },
      ],
      callout: {
        title: "Data-Driven Strategy",
        text: "We don't rely on assumptions. Every optimization is backed by verified performance metrics and customer insights.",
        icon: "bar-chart-3",
      },
      image: {
        src: "/assets/services-detail/digital-marketing/marketing-platforms-graphic.png",
        width: 1536,
        height: 1024,
        alt: "Marketing platforms and analytics graphic",
      },
    },
    process: {
      heading: { line1: "From Strategy", line2Lead: "to ", accent: "Digital Growth" },
      steps: [
        { icon: "scan-search", title: "Understand", text: "We discover your business objectives, target audience, competitors, and growth challenges before creating a strategy." },
        { icon: "workflow", title: "Strategize", text: "We identify the right channels, content opportunities, campaign priorities, and measurable goals aligned with your business needs." },
        { icon: "code-xml", title: "Execute & Optimize", text: "SEO improvements, content campaigns, advertising initiatives, and social strategies are implemented and refined." },
        { icon: "rocket", title: "Measure & Scale", text: "We analyze performance data, identify opportunities, and refine strategies to improve long-term marketing outcomes." },
      ],
    },
    faqs: [
      { q: "What are Digital Marketing Services?", a: "Digital Marketing Services help businesses promote their products and services online through strategies like SEO, social media marketing, paid advertising, content marketing, and analytics." },
      { q: "Does GateXPay provide SEO services?", a: "Yes, businesses can use SEO-focused strategies to improve online visibility, search rankings, website performance, and organic growth opportunities." },
      { q: "Can businesses run paid advertising campaigns with GateXPay?", a: "Yes. We help businesses plan, create, and optimize paid campaigns across platforms such as Google, Meta, YouTube, and other relevant advertising channels." },
      { q: "Are digital marketing services suitable for startups?", a: "Yes. Digital marketing helps startups establish online visibility, reach potential customers, test growth opportunities, and build brand awareness." },
      { q: "Why is digital marketing important for businesses?", a: "Digital marketing allows businesses to connect with customers online, measure performance, improve customer engagement, and create scalable growth opportunities." },
    ],
    finalCta: {
      titleLead: "Ready To Grow Your",
      titleAccent: "Digital Presence?",
      description: "Build a stronger online presence with marketing strategies designed around your business objectives. From SEO and content to paid campaigns and analytics, GateXPay helps businesses create measurable digital growth opportunities.",
      ctaLabel: "Talk to an Expert",
    },
  },


  // 5. Core Banking Services
  {
    slug: "core-banking-services",
    categoryId: "banking-financial",
    name: "Core Banking Services",
    metaTitle: "Core Banking Services | Assisted CSP Banking Solutions | GateXPay",
    metaDescription: "Access everyday banking activities closer to where you live or work. GateXPay supports assisted banking through its CSP network for cash transactions, transfers, account assistance, and banking requests.",
    hero: {
      titleLead: "Core Banking",
      titleAccent: "Services",
      description: "Access everyday banking activities closer to where you live or work. GateXPay supports assisted banking through its CSP network for services such as cash transactions, transfers, account assistance, and banking requests.",
      ctaLabel: "Find Banking Support",
      secondaryAction: { text: "Explore Services", href: "/services#banking-financial" },
      image: {
        src: "/assets/services-detail/core-banking/hero-core-banking-illustration.png",
        width: 1536,
        height: 1024,
        alt: "GateXPay Core Banking CSP network illustration with banking activities, accounts, and transactions",
      },
    },
    highlights: [
      { icon: "building-2", title: "Assisted Banking Access", text: "Get help with routine banking activities locally" },
      { icon: "shield-check", title: "Transaction Support", text: "Guided assistance through supported banking channels" },
      { icon: "map-pin", title: "Convenient Service Points", text: "Access banking assistance through nearby CSP outlets" },
    ],
    included: {
      heading: { line1: "What's Included in", accent: "Core Banking Services" },
      items: [
        { icon: "user-check", title: "Account\\nServices", text: "Get assistance with savings account opening and other supported account-related requests through a GateXPay CSP service point." },
        { icon: "hand-coins", title: "Cash\\nTransactions", text: "Access assisted cash deposit and cash withdrawal services for eligible accounts, subject to the bank, account type, and available service channel." },
        { icon: "refresh-cw", title: "Fund\\nTransfers", text: "Request supported fund transfers, including NEFT, RTGS, IMPS, inter-bank transfers, and beneficiary assistance where available for the customer’s account." },
        { icon: "file-text", title: "Passbooks &\\nStatements", text: "Get assistance with passbook updates, account statement requests, and access to available transaction information through supported banking service channels." },
        { icon: "coins", title: "Deposit\\nAssistance", text: "Customers can seek guidance for supported fixed deposit and recurring deposit requests based on their bank’s applicable products, processes, and eligibility requirements." },
        { icon: "workflow", title: "Banking\\nRequests", text: "Receive assistance with supported account requests such as cheque book requests, beneficiary-related help, and other routine service needs available through the CSP." },
      ],
    },
    technology: {
      heading: { line1: "Banking Infrastructure That Supports", accent: "Everyday Transactions" },
      slides: [
        {
          number: "01",
          title: "CSP Service Access",
          text: "Assisted Local Access. GateXPay’s CSP service model helps customers request routine banking activities through assisted service points, reducing dependence on visiting a full bank branch for every supported requirement.",
          technologies: [
            { name: "CSP Service Assistance", logo: "/assets/tech-icons/access.svg" },
            { name: "Customer Request Handling", logo: "/assets/tech-icons/crm.svg" },
            { name: "Account-Related Support", logo: "/assets/tech-icons/auth.svg" },
            { name: "Assisted Banking Access", logo: "/assets/tech-icons/server.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Core banking CSP service access architecture diagram" },
        },
        {
          number: "02",
          title: "Transaction Processing",
          text: "Supported Transaction Handling. After the required customer and transaction details are provided, CSP agents submit eligible requests through the banking or service channel available for that particular transaction.",
          technologies: [
            { name: "Cash Transaction Requests", logo: "/assets/tech-icons/payment.svg" },
            { name: "Fund Transfer Submission", logo: "/assets/tech-icons/integration.svg" },
            { name: "Account Service Requests", logo: "/assets/tech-icons/api.svg" },
            { name: "Transaction References", logo: "/assets/tech-icons/monitoring.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Core banking transaction processing infrastructure diagram" },
        },
        {
          number: "03",
          title: "Bank & Payment Connectivity",
          text: "Connected Banking Channels. GateXPay supports banking-service connectivity for eligible account activities and transfer methods, including NEFT, RTGS, and IMPS where those options are available through the relevant channel.",
          technologies: [
            { name: "NEFT Transfers", logo: "/assets/tech-icons/gateway.svg" },
            { name: "RTGS Transfers", logo: "/assets/tech-icons/gateway.svg" },
            { name: "IMPS Transfers", logo: "/assets/tech-icons/performance.svg" },
            { name: "Inter-Bank Support", logo: "/assets/tech-icons/integration.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Connected banking channels and payment networks diagram" },
        },
        {
          number: "04",
          title: "Security & Verification",
          text: "Customer Verification. Depending on the requested service, customers may need to provide identification, account information, registered mobile details, or other information required to verify and submit the transaction.",
          technologies: [
            { name: "Identity Detail Checks", logo: "/assets/tech-icons/auth.svg" },
            { name: "Account Info Review", logo: "/assets/tech-icons/database.svg" },
            { name: "Transaction Verification", logo: "/assets/tech-icons/security.svg" },
            { name: "Controlled Submission", logo: "/assets/tech-icons/access.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Core banking security and verification diagram" },
        },
        {
          number: "05",
          title: "Transaction Visibility",
          text: "Records & Confirmation. Where supported, customers receive a receipt, reference number, confirmation, statement, or other transaction record that helps them identify and follow the banking activity requested.",
          technologies: [
            { name: "Transaction Receipts", logo: "/assets/tech-icons/monitoring.svg" },
            { name: "Reference Numbers", logo: "/assets/tech-icons/security.svg" },
            { name: "Account Statements", logo: "/assets/tech-icons/database.svg" },
            { name: "Balance Information", logo: "/assets/tech-icons/performance.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Transaction confirmation and record visibility diagram" },
        },
        {
          number: "06",
          title: "Service Operations",
          text: "Distributed CSP Support. The service model is designed around CSP-based operations, helping multiple assisted service points handle customer banking requests through the banking channels available to each outlet.",
          technologies: [
            { name: "CSP Operational Support", logo: "/assets/tech-icons/server.svg" },
            { name: "Customer Servicing", logo: "/assets/tech-icons/crm.svg" },
            { name: "Banking Request Routing", logo: "/assets/tech-icons/gateway.svg" },
            { name: "Service-Point Operations", logo: "/assets/tech-icons/automation.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Distributed CSP service network operations diagram" },
        },
      ],
    },
    process: {
      heading: { line1: "From Service Request", line2Lead: "to ", accent: "Transaction Confirmation" },
      steps: [
        { icon: "map-pin", title: "Visit", text: "Visit a GateXPay CSP point and request the banking service you need." },
        { icon: "user-check", title: "Verify", text: "Provide the required identification, account, or transaction details for service verification." },
        { icon: "refresh-cw", title: "Process", text: "The CSP agent submits the eligible request through the supported banking channel." },
        { icon: "receipt", title: "Confirm", text: "Receive the applicable receipt, reference number, or confirmation after the request is processed." },
      ],
    },
    faqs: [
      { q: "What are Core Banking Services at GateXPay?", a: "On this page, Core Banking Services means customer-facing access to routine banking activities through GateXPay’s CSP network. It refers to assisted services such as cash transactions, transfers, account support, passbook or statement requests—not the core banking software platform used internally by banks." },
      { q: "Which banking services can I access through GateXPay?", a: "Depending on your bank and the available service channel, you may be able to request account opening assistance, cash deposits or withdrawals, NEFT, RTGS or IMPS transfers, passbook updates, account statements, cheque book requests, deposit guidance, and other account-related support." },
      { q: "Can I deposit or withdraw cash through a CSP?", a: "Cash deposit and withdrawal assistance may be available through supported CSP banking channels. Availability can vary according to your bank, account type, transaction requirements, service-point capabilities, and applicable banking rules. The CSP agent can confirm whether the requested cash service is available before processing." },
      { q: "Can I make NEFT, RTGS, or IMPS transfers?", a: "Supported CSP locations may assist with NEFT, RTGS, IMPS, or other bank-transfer requests where the relevant banking channel is available. You may need the beneficiary’s account number, IFSC, and other transaction details. Availability and applicable requirements can differ by bank and transfer type." },
      { q: "What documents or account details may be required?", a: "Requirements depend on the banking activity requested. You may be asked for valid identification, your account number, IFSC, registered mobile number, passbook, or other account information. Some services may require additional verification or documentation based on the bank’s process and applicable rules." },
      { q: "Are these services available for every bank?", a: "Not necessarily. Service availability can depend on the customer’s bank, account type, requested transaction, supported banking channel, and the capabilities available at the CSP location. Customers should confirm the specific service with the CSP before relying on it for a particular transaction." },
      { q: "How do I receive confirmation after a transaction?", a: "Depending on the banking service and available channel, you may receive a receipt, transaction reference number, system confirmation, statement entry, or other applicable record. Keep this information until you have confirmed that the transaction or service request is reflected correctly in your bank account." },
    ],
    finalCta: {
      titleLead: "Bring Everyday Banking",
      titleAccent: "Closer to Customers",
      description: "GateXPay helps enable assisted access to common banking activities through CSP service infrastructure designed around practical customer support and routine transaction needs.",
      ctaLabel: "Talk to an Expert",
    },
  },

  // 6. Connected Banking Services
  {
    slug: "connected-banking-services",
    categoryId: "banking-financial",
    name: "Connected Banking Services",
    metaTitle: "Connected Banking Services | Banking API & Financial Infrastructure | GateXPay",
    metaDescription: "GateXPay helps businesses connect applications with banking APIs, payment systems, financial workflows and supporting digital infrastructure for automated operations.",
    hero: {
      titleLead: "Connected Banking",
      titleAccent: "Services",
      description: "GateXPay helps businesses connect applications with banking APIs, payment systems, financial workflows and supporting digital infrastructure—bringing transaction data, automation and operational visibility into an integration layer designed around existing systems.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "Explore TSP Services",
        href: "/services#enterprise-tech",
      },
      image: {
        src: "/assets/services-detail/connected-banking/hero-connected-banking-illustration.png",
        width: 1536,
        height: 1024,
        alt: "GateXPay Connected Banking Services integration infrastructure",
      },
    },
    highlights: [
      {
        icon: "network",
        title: "API Connectivity",
        text: "Connect applications through supported financial APIs.",
      },
      {
        icon: "shield-check",
        title: "Protected Integration",
        text: "Authentication, encryption and protected data handling.",
      },
      {
        icon: "boxes",
        title: "Flexible Architecture",
        text: "Designed around existing platforms and workflows.",
      },
    ],
    included: {
      heading: { line1: "What's Included in", accent: "Connected Banking Services" },
      items: [
        {
          icon: "network",
          title: "Banking API\\nIntegration",
          text: "Connect business applications with banking APIs for account-related workflows, balance enquiries, transaction data exchange and automated financial operations where supported. Explore our [API integration services](/services/web-app-development) to connect broader business platforms.",
        },
        {
          icon: "credit-card",
          title: "Payment System\\nIntegration",
          text: "Integrate [payment gateway integration](/services/payment-gateway-integration), UPI-related services, digital wallets and merchant payment systems with business applications and operational workflows based on available provider interfaces.",
        },
        {
          icon: "shield-check",
          title: "Secure Integration\\nInfrastructure",
          text: "Build integration layers using controlled API access, authentication, encryption and protected data-handling practices appropriate to the system architecture and implementation requirements.",
        },
        {
          icon: "activity",
          title: "Transaction Workflows\\n& Monitoring",
          text: "Configure transaction-related workflows, payment-status updates, financial activity tracking and monitoring interfaces so relevant operational information can move between connected systems.",
        },
        {
          icon: "layout-dashboard",
          title: "Dashboards &\\nReporting",
          text: "Surface transaction information, settlement tracking, financial reports and operational metrics through dashboards designed around the information teams need to monitor, aligned with comprehensive [financial technology services](/services/fintech-financial-integration).",
        },
        {
          icon: "database",
          title: "Cloud & Data\\nInfrastructure",
          text: "Develop supporting cloud, application and data infrastructure for connected financial systems, with architecture selected according to integration scope, workload and deployment requirements through scalable [cloud infrastructure services](/services/it-cloud-services).",
        },
      ],
    },
    technology: {
      heading: { line1: "Technology Behind", accent: "Connected Financial Operations" },
      description: "The technology stack described for GateXPay's existing service includes frontend frameworks, backend technologies, REST APIs, AWS and database technologies used across application and integration layers.",
      slides: [
        {
          number: "01",
          title: "Frontend",
          text: "Build banking dashboards, operational portals, transaction views and financial workflow interfaces that give users a practical way to interact with connected systems and relevant transaction information.",
          technologies: [
            { name: "React.js", logo: LOGOS.react },
            { name: "Next.js", logo: "/assets/tech-icons/nextjs.svg" },
            { name: "JavaScript", logo: LOGOS.js },
            { name: "HTML5", logo: LOGOS.html5 },
            { name: "CSS3", logo: LOGOS.css3 },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Connected banking frontend architecture" },
        },
        {
          number: "02",
          title: "Backend",
          text: "Backend technologies can support application logic, API orchestration, transaction-related services, workflow automation and integration layers. The exact stack should be selected for each project's architecture and requirements.",
          technologies: [
            { name: "Node.js", logo: "/assets/tech-icons/node.svg" },
            { name: "PHP", logo: "/assets/tech-icons/php.svg" },
            { name: "Laravel", logo: "/assets/tech-icons/integration.svg" },
            { name: "Python", logo: "/assets/tech-icons/python.svg" },
            { name: "Express.js", logo: "/assets/tech-icons/server.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Connected banking backend architecture" },
        },
        {
          number: "03",
          title: "APIs & Integration",
          text: "REST APIs can connect business applications with relevant banking, financial and payment systems so defined data exchanges and operational workflows can run between otherwise separate platforms, delivered as part of GateXPay's [Technology Service Provider services](/services#enterprise-tech).",
          technologies: [
            { name: "REST APIs", logo: "/assets/tech-icons/api.svg" },
            { name: "Banking Integrations", logo: "/assets/tech-icons/gateway.svg" },
            { name: "Financial-System Integrations", logo: "/assets/tech-icons/integration.svg" },
            { name: "Payment-Related Integrations", logo: "/assets/tech-icons/payment.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "API and banking integration architecture diagram" },
        },
        {
          number: "04",
          title: "Cloud & Data",
          text: "Depending on architecture requirements, AWS, MongoDB and MySQL can support parts of the application, integration or data layer without assuming the same deployment model for every implementation.",
          technologies: [
            { name: "AWS", logo: "/assets/tech-icons/cloud.svg" },
            { name: "MongoDB", logo: "/assets/tech-icons/database.svg" },
            { name: "MySQL", logo: "/assets/tech-icons/database.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Cloud security and data infrastructure diagram" },
        },
      ],
    },
    process: {
      heading: { line1: "From First Conversation to", accent: "Connected Financial Systems" },
      steps: [
        {
          icon: "scan-search",
          title: "Understand",
          text: "Review existing systems, banking requirements, workflows, access needs and external integration dependencies.",
        },
        {
          icon: "workflow",
          title: "Architect",
          text: "Define APIs, data movement, application components, integration scope and the proposed technical architecture.",
        },
        {
          icon: "code-xml",
          title: "Integrate",
          text: "Build and configure the required application components, APIs and financial-system integration workflows.",
        },
        {
          icon: "shield-check",
          title: "Validate",
          text: "Test workflows and integrations, resolve issues and prepare the implementation for production use and support.",
        },
      ],
    },
    faqs: [
      {
        q: "What are Connected Banking Services?",
        a: "Connected Banking Services connect business software with banking APIs, payment systems, transaction workflows and related financial infrastructure. In GateXPay's context, the focus is technology integration: connecting applications, automating defined workflows and making relevant transaction or operational information available within business systems.",
      },
      {
        q: "What can GateXPay integrate through Connected Banking Services?",
        a: "Depending on the project and available interfaces, an implementation may include banking API integration, account-related workflows, balance enquiries, payment gateways, UPI-related services, digital wallets, transaction processing, settlement tracking, dashboards and supporting cloud infrastructure, interconnecting with comprehensive [digital payment services](/services/payment-gateway-integration).",
      },
      {
        q: "Can Connected Banking Services integrate with our existing platform?",
        a: "Potentially, yes. Compatibility depends on your existing architecture, available APIs, technical documentation, authentication requirements, provider access and the workflows that need to exchange information. GateXPay can assess these dependencies before defining the integration approach and scope of [API integration services](/services/web-app-development).",
      },
      {
        q: "Which technologies does GateXPay use for connected banking projects?",
        a: "The existing technology set includes React.js, Next.js, JavaScript, HTML5 and CSS3 for frontend work; Node.js, PHP, Laravel, Python and Express.js for backend development; plus REST APIs, AWS, MongoDB and MySQL. The appropriate stack depends on the project architecture rather than every technology being used together.",
      },
      {
        q: "How do you approach security in connected banking integrations?",
        a: "The source material identifies secure API infrastructure, encryption, authentication mechanisms and protected customer-data handling as relevant capabilities. The specific controls should be defined around the architecture, data being exchanged, provider requirements and access model rather than treated as a universal security guarantee.",
      },
      {
        q: "Can Connected Banking Services support fintech and enterprise platforms?",
        a: "The existing service is positioned for organisations including fintech businesses, enterprises, merchant platforms, digital service providers, CSP operators and financial institutions. Our dedicated [fintech services](/services/fintech-financial-integration) help tailor practical implementations to the organisation's systems, integration requirements and access to external banking or payment interfaces.",
      },
      {
        q: "How long does a connected banking integration take?",
        a: "There is no reliable universal timeframe. Delivery depends on the number of integrations, API availability, documentation quality, existing architecture, authentication requirements, workflow complexity, external-provider dependencies and testing requirements. These factors should be assessed before a project schedule is committed.",
      },
      {
        q: "What happens after the integration goes live?",
        a: "Post-launch work can include implementation support, workflow validation, issue resolution and monitoring of the connected application components. Responsibilities should be defined clearly because the availability, transaction processing and settlement performance of external banks or payment providers remain dependent on those providers.",
      },
    ],
    finalCta: {
      titleLead: "Build the Right",
      titleAccent: "Connected Banking Infrastructure",
      description: "Discuss your current systems, required integrations and financial workflows with GateXPay to define an implementation approach that fits your architecture and operational requirements.",
      ctaLabel: "Discuss Your Requirements",
      features: [
        { icon: "shield-check", bold: "Secure", light: "Integration" },
        { icon: "layers", bold: "Flexible", light: "Architecture" },
        { icon: "headphones", bold: "Ongoing", light: "Support" },
      ],
    },
  },

  // 7. Fintech & Financial Integration
  {
    slug: "fintech-financial-integration",
    categoryId: "banking-financial",
    name: "FinTech & Financial Integration Services",
    metaTitle: "FinTech & Financial Integration Services | GateXPay",
    metaDescription: "Connect payment gateways, banking APIs, digital-banking services, transaction workflows and business applications through scalable financial technology infrastructure.",
    hero: {
      titleLead: "FinTech & Financial",
      titleAccent: "Integration Services",
      description: "Connect payment gateways, banking APIs, digital-banking services, transaction workflows and business applications through financial technology infrastructure designed around your existing systems and operational requirements.",
      ctaLabel: "Discuss Your Integration",
      secondaryAction: {
        text: "Explore Financial Services",
        href: "/services#banking-financial",
      },
      image: {
        src: "/assets/services-detail/fintech-financial-integration/hero-fintech-financial-integration-illustration.png",
        width: 1536,
        height: 1024,
        alt: "FinTech & Financial Integration Services platform illustration",
      },
    },
    highlights: [
      {
        icon: "shield-check",
        title: "Protected Data Flows",
        text: "Authentication and encrypted transaction handling",
      },
      {
        icon: "network",
        title: "Connected Systems",
        text: "APIs linking financial and business platforms",
      },
      {
        icon: "boxes",
        title: "Flexible Infrastructure",
        text: "Architecture designed around integration requirements",
      },
    ],
    included: {
      heading: { line1: "What's Included in", accent: "FinTech & Financial Integration Services" },
      items: [
        {
          icon: "credit-card",
          title: "Payment\\nIntegration",
          text: "Connect [payment gateway integration](/services/payment-gateway-integration), UPI, wallets and card-payment flows with websites, applications and merchant systems through structured transaction integrations.",
        },
        {
          icon: "landmark",
          title: "Banking API\\nIntegration",
          text: "Integrate banking APIs for account verification, balance enquiries, transaction-status checks, financial data exchange and workflow automation within existing platforms. Discover our broader [banking and financial services](/services#banking-financial).",
        },
        {
          icon: "shield-check",
          title: "Financial Security\\nInfrastructure",
          text: "Build financial integrations around authenticated API access, encrypted transaction flows, protected data handling and security controls appropriate to the implementation, following rigorous [security and compliance](/policy/security) standards.",
        },
        {
          icon: "fingerprint",
          title: "AEPS &\\nDigital Banking",
          text: "Connect [AEPS services](/services/aeps-services), digital-banking APIs, customer-authentication workflows and related banking services with applications designed to support financial-service access.",
        },
        {
          icon: "layout-dashboard",
          title: "Dashboards &\\nReporting",
          text: "Bring transaction monitoring, settlement tracking, financial analytics and customer-management information into dashboards that support day-to-day operational visibility.",
        },
        {
          icon: "database",
          title: "Cloud Financial\\nInfrastructure",
          text: "Structure payment and financial workloads across cloud infrastructure, databases and automated workflows to support reliable transaction processing and application connectivity through [IT and cloud services](/services/it-cloud-services).",
        },
      ],
    },
    technology: {
      heading: { line1: "Technology Behind", accent: "Connected Financial Systems" },
      slides: [
        {
          number: "01",
          title: "Financial User Interfaces",
          text: "Build responsive interfaces for payment journeys, account interactions, transaction views and operational dashboards across web-based financial applications.",
          technologies: [
            { name: "JavaScript", logo: LOGOS.js },
            { name: "React.js", logo: LOGOS.react },
            { name: "Next.js", logo: "/assets/tech-icons/nextjs.svg" },
            { name: "HTML5", logo: LOGOS.html5 },
            { name: "CSS3", logo: LOGOS.css3 },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Fintech frontend architecture" },
        },
        {
          number: "02",
          title: "Integration Logic",
          text: "Develop the application logic that manages API requests, authentication flows, transaction handling, financial workflows and communication between connected systems.",
          technologies: [
            { name: "Node.js", logo: "/assets/tech-icons/node.svg" },
            { name: "PHP", logo: "/assets/tech-icons/php.svg" },
            { name: "Laravel", logo: "/assets/tech-icons/integration.svg" },
            { name: "Python", logo: "/assets/tech-icons/python.svg" },
            { name: "Express.js", logo: "/assets/tech-icons/server.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Fintech backend architecture" },
        },
        {
          number: "03",
          title: "Infrastructure & Data",
          text: "Support financial applications with cloud services, databases and data layers used for transaction records, application workflows and operational information.",
          technologies: [
            { name: "AWS Cloud Services", logo: "/assets/tech-icons/cloud.svg" },
            { name: "Firebase", logo: "/assets/tech-icons/cloud.svg" },
            { name: "MongoDB", logo: "/assets/tech-icons/database.svg" },
            { name: "MySQL", logo: "/assets/tech-icons/database.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Cloud security and database architecture" },
        },
        {
          number: "04",
          title: "Financial Connectivity",
          text: "Connect applications with payment infrastructure and banking systems through REST APIs, structured data exchange and implementation-specific financial workflows. Connect applications seamlessly through our specialized [API integration](/services/web-app-development) services.",
          technologies: [
            { name: "REST APIs", logo: "/assets/tech-icons/api.svg" },
            { name: "Payment Infrastructure", logo: "/assets/tech-icons/payment.svg" },
            { name: "Banking API Connectivity", logo: "/assets/tech-icons/gateway.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Fintech API integration architecture" },
        },
      ],
    },
    process: {
      heading: { line1: "From First Conversation to", accent: "Connected Financial Systems" },
      steps: [
        {
          icon: "scan-search",
          title: "Understand",
          text: "Review existing systems, financial workflows, integration requirements, APIs and technical dependencies.",
        },
        {
          icon: "workflow",
          title: "Architect",
          text: "Define system connections, authentication methods, data flows and the required integration architecture.",
        },
        {
          icon: "code-xml",
          title: "Integrate",
          text: "Implement APIs, payment connections and financial workflows within the agreed application architecture.",
        },
        {
          icon: "shield-check",
          title: "Validate",
          text: "Test transaction flows, integration behaviour and deployment readiness, then support implementation after release. Where integrations require application-level development, explore our [web and app development](/services/web-app-development) capabilities.",
        },
      ],
    },
    faqs: [
      {
        q: "What are FinTech & Financial Integration Services?",
        a: "FinTech & Financial Integration Services connect financial technologies with websites, applications and operational systems. This can include payment gateways, banking APIs, AEPS, authentication workflows, transaction processing, financial dashboards, settlement tracking and the infrastructure required to exchange financial data between systems.",
      },
      {
        q: "What financial systems can GateXPay integrate?",
        a: "GateXPay's stated integration capabilities include online payment gateways, UPI and wallets, card-payment systems, banking APIs, account-verification services, balance-enquiry and transaction-status APIs, AEPS, digital-banking services, financial dashboards and related payment infrastructure. The exact scope depends on the systems, APIs and provider access available for the project.",
      },
      {
        q: "Can GateXPay integrate a payment gateway with an existing website or application?",
        a: "Yes. Seamless [payment gateway integration](/services/payment-gateway-integration) can connect payment flows with an existing website, application or merchant platform. Depending on the project, this may include UPI, wallets, cards and transaction-processing workflows. Implementation depends on the existing application architecture and the payment provider's APIs, documentation and authentication requirements.",
      },
      {
        q: "What banking APIs can be connected?",
        a: "GateXPay's existing service scope includes banking API connectivity for functions such as account verification, balance enquiries, transaction-status checks, financial data exchange and workflow automation. Available functions ultimately depend on the APIs, credentials, documentation and approvals provided by the relevant banking or financial-service provider.",
      },
      {
        q: "Does GateXPay support AEPS and digital-banking integrations?",
        a: "The service includes comprehensive [AEPS services](/services/aeps-services) and integration support, digital-banking APIs, customer-authentication workflows and banking-service connectivity. The specific implementation will depend on the service provider, available interfaces, authentication requirements and any external approval or onboarding requirements.",
      },
      {
        q: "How is security handled in financial integrations?",
        a: "Security considerations can include authenticated API access, encrypted data flows, protected transaction handling, customer-data safeguards, integration testing and monitoring. The controls required for a project depend on the connected systems, provider specifications, application architecture and applicable business or regulatory requirements.",
      },
      {
        q: "Can transaction dashboards and financial reporting be integrated?",
        a: "Yes. Financial integrations can include transaction monitoring, settlement tracking, financial analytics, customer-management dashboards and performance visibility. The reporting layer can be designed around the data made available by connected payment, banking and business systems.",
      },
      {
        q: "How long does a financial integration project take?",
        a: "There is no reliable standard timeframe without reviewing the integration scope. Timing depends on the number of systems involved, API availability, provider documentation, authentication requirements, existing application architecture, testing requirements and any external compliance, onboarding or approval dependencies. A technical assessment is therefore required before estimating implementation time.",
      },
    ],
    finalCta: {
      titleLead: "Connect the Financial Systems",
      titleAccent: "Your Business Depends On",
      description: "Discuss your existing applications, required APIs, payment flows, banking connections and transaction requirements so the right integration architecture can be defined. You can also [contact GateXPay](/contact) directly to scope your requirements.",
      ctaLabel: "Discuss Your Project",
      features: [
        { icon: "shield", bold: "Protected", light: "Flows" },
        { icon: "network", bold: "API", light: "Connected" },
        { icon: "boxes", bold: "Flexible", light: "Architecture" },
      ],
    },
  },

  // 8. Loan & Credit Integration Services
  {
    slug: "loan-insurance-services",
    categoryId: "banking-financial",
    name: "Loan & Credit Integration Services",
    metaTitle: "Digital Lending & Loan Integration Services | GateXPay",
    metaDescription:
      "Build secure digital lending workflows with loan origination, KYC, credit assessment, loan management, repayment and integration services from GateXPay.",
    hero: {
      titleLead: "Loan & Credit",
      titleAccent: "Integration Services",
      description:
        "Build secure digital lending journeys with integrated loan origination, credit assessment, verification, repayment workflows, and scalable financial technology infrastructure.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services",
      },
      image: {
        src: "/assets/services-detail/loan-insurance/hero-loan-insurance-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of digital loan and credit integration workflow, verification, and financial systems",
      },
    },
    highlights: [
      {
        icon: "shield-check",
        title: "Secure Lending Workflows",
        subtitle: "Protect Sensitive Financial Data",
        text: "Protect Sensitive Financial Data — Support digital lending operations through secure integrations, controlled access, encrypted data exchange, and structured verification workflows.",
      },
      {
        icon: "zap",
        title: "Faster Loan Processing",
        subtitle: "Streamline Credit Journeys",
        text: "Streamline Credit Journeys — Automate application intake, document verification, credit checks, approval workflows, disbursement coordination, and repayment processes.",
      },
      {
        icon: "trending-up",
        title: "Scalable Credit Infrastructure",
        subtitle: "Built for Banks, NBFCs & Fintechs",
        text: "Built for Banks, NBFCs & Fintechs — Create flexible lending infrastructure that supports growing application volumes, multiple loan products, and connected financial systems.",
      },
    ],
    included: {
      heading: {
        line1: "What’s Included in",
        accent: "Loan & Credit Services",
      },
      items: [
        {
          icon: "file-text",
          title: "Loan Origination\nIntegration",
          text: "Digitize application intake, verification, assessment, approval, and loan onboarding workflows.",
        },
        {
          icon: "bar-chart-3",
          title: "Credit Assessment\nIntegration",
          text: "Connect eligible credit bureau and assessment systems for informed lending decisions.",
        },
        {
          icon: "shield-check",
          title: "KYC & Identity\nVerification",
          text: "Integrate identity verification and KYC workflows into digital credit journeys.",
        },
        {
          icon: "layout-dashboard",
          title: "Loan Management\nWorkflows",
          text: "Manage repayment schedules, account servicing, status updates, and lending operations centrally.",
        },
        {
          icon: "credit-card",
          title: "Credit Card\nManagement",
          text: "Support card lifecycle workflows, transaction visibility, limits, controls, and account servicing.",
        },
        {
          icon: "refresh-cw",
          title: "Repayment & Collection\nIntegration",
          text: "Automate repayment tracking, payment reminders, reconciliation, and collection workflow integrations.",
        },
      ],
    },
    showcase: {
      heading: { line1: "Have Your Integration", accent: "Requirements Ready" },
      description:
        "We can help map the technical architecture, integrations, workflows, and implementation requirements for your digital lending ecosystem.",
      checklist: [
        { label: "Existing loan or credit product details" },
        { label: "Current lending or loan management system" },
        { label: "Available APIs and technical documentation" },
        { label: "KYC and identity verification requirements" },
        { label: "Credit bureau or assessment integrations" },
        { label: "Repayment and collection workflow requirements" },
        { label: "User roles and access-control requirements" },
        { label: "Reporting and reconciliation requirements" },
      ],
      callout: {
        icon: "workflow",
        title: "Planning a New Lending Product?",
        text: "We can help map the technical architecture, integrations, workflows, and implementation requirements for your digital lending ecosystem. Explore our [Web & App Development Services](/services/web-app-development) for custom lending platforms, portals, and dashboards.",
      },
      image: {
        src: "/assets/services-detail/loan-insurance/lending-integration-showcase-graphic.png",
        width: 1536,
        height: 1024,
        alt: "GateXPay digital lending and credit assessment integration architecture diagram showing loan origination, credit scoring, KYC verification, and instant disbursement",
      },
    },
    process: {
      heading: {
        line1: "From Lending Requirements to",
        accent: "Live Integration",
      },
      steps: [
        {
          icon: "scan-search",
          title: "Understand",
          text: "Define Lending Requirements — We assess your loan products, user journeys, existing systems, integrations, operational workflows, and technical requirements.",
        },
        {
          icon: "workflow",
          title: "Architect",
          text: "Design the Lending Workflow — Our team maps application flows, verification steps, credit assessment integrations, data exchange, repayment logic, and system architecture.",
        },
        {
          icon: "code-xml",
          title: "Integrate",
          text: "Connect Lending Systems — We integrate lending applications, loan management systems, verification services, credit assessment tools, payments, and supporting platforms.",
        },
        {
          icon: "rocket",
          title: "Launch",
          text: "Test, Deploy & Support — We test workflows, integrations, security controls, data synchronization, exception handling, and production readiness before deployment.",
        },
      ],
    },
    faqs: [
      {
        q: "What are Loan & Credit Integration Services?",
        a: "Loan and credit integration services connect digital applications, loan origination systems, verification tools, credit assessment systems, payment infrastructure, and loan management platforms into a coordinated lending workflow. These integrations help financial institutions reduce manual processes and improve operational visibility across the lending lifecycle.",
      },
      {
        q: "What is a loan origination system?",
        a: "A loan origination system supports the early stages of lending, including application intake, identity verification, document collection, eligibility assessment, credit evaluation, approval workflows, and customer onboarding. GateXPay can help integrate compatible loan origination systems with other financial and operational platforms.",
      },
      {
        q: "Can GateXPay integrate with an existing loan management system?",
        a: "Yes, where supported by the existing platform. Integration can be implemented through APIs, webhooks, middleware, secure data exchange, or other supported mechanisms. The exact architecture depends on your current loan management system and technology environment.",
      },
      {
        q: "Can you integrate KYC and credit bureau services?",
        a: "Yes. GateXPay can help integrate compatible KYC, identity verification, and credit assessment services into a digital lending workflow. Actual lending decisions, eligibility criteria, underwriting rules, and regulatory obligations remain with the relevant regulated financial institution.",
      },
      {
        q: "Can banks and NBFCs use these services?",
        a: "Yes. The integration architecture can be designed for banks, NBFCs, fintech companies, credit platforms, and other financial service businesses that require connected digital lending workflows. Learn more about our [Banking Technology Services](/services/connected-banking-services).",
      },
      {
        q: "Can repayment workflows be automated?",
        a: "Yes. Depending on the connected systems, lending platforms can automate repayment schedules, payment reminders, transaction-status updates, reconciliation, and collection-related workflows. For payment connectivity, explore our [Payment Gateway Integration Services](/services/payment-gateway-integration).",
      },
    ],
    finalCta: {
      titleLead: "Ready to Modernize Your",
      titleAccent: "Lending Infrastructure?",
      description:
        "Connect loan origination, verification, credit assessment, repayment, and loan management workflows through secure, scalable digital infrastructure.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "Explore Financial Technology Services",
        href: "/services",
      },
      features: [
        {
          icon: "shield-check",
          bold: "Secure Integrations",
          light: "Controlled financial data exchange",
        },
        {
          icon: "workflow",
          bold: "Flexible Architecture",
          light: "Built around your lending workflows",
        },
        {
          icon: "trending-up",
          bold: "Scalable Systems",
          light: "Support growing digital operations",
        },
      ],
    },
  },

  // 9. Banking Tie-Up Services
  {
    slug: "banking-tie-up-services",
    categoryId: "banking-financial",
    name: "Banking Tie-Up Services",
    metaTitle: "Banking API Integration & Tie-Up Services | GateXPay",
    metaDescription:
      "Build secure digital banking infrastructure with banking API integration, payment gateway connectivity, transaction workflows and financial technology solutions from GateXPay.",
    hero: {
      titleLead: "Banking Tie-Up",
      titleAccent: "Services",
      description:
        "Build secure banking connectivity with API integrations, payment infrastructure, financial workflows, and scalable digital banking solutions tailored to your business.",
      ctaLabel: "Talk to an Expert",
      ctaHref: "/contact-us",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services",
      },
      image: {
        src: "/assets/services-detail/banking-tie-up/hero-banking-tie-up-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of banking tie-up, API connectivity, and institutional financial partnerships",
      },
    },
    highlights: [
      {
        icon: "landmark",
        title: "Secure Banking Connectivity",
        subtitle: "Connect Financial Systems Reliably",
        text: "Integrate banking systems, payment platforms, APIs, and operational workflows through secure and structured financial technology infrastructure.",
      },
      {
        icon: "network",
        title: "API-First Integration",
        subtitle: "Built for Connected Finance",
        text: "Support banking API integration, transaction workflows, payment connectivity, reporting, and third-party financial system integration.",
      },
      {
        icon: "trending-up",
        title: "Scalable Financial Infrastructure",
        subtitle: "Designed for Growing Operations",
        text: "Create flexible digital banking environments that support increasing transaction volumes, users, integrations, and operational requirements.",
      },
    ],
    included: {
      heading: { line1: "What's Included in Our", accent: "Banking Tie-Up Services" },
      items: [
        {
          icon: "handshake",
          title: "Banking Partnership Support",
          text: "Support technical onboarding and integration requirements for eligible banking partnerships.",
        },
        {
          icon: "network",
          title: "Banking API Integration",
          text: "Connect compatible banking systems and financial applications through secure API integrations. Explore our [API Integration Services](/services/api-integration).",
        },
        {
          icon: "credit-card",
          title: "Payment Gateway Integration",
          text: "Integrate digital payment workflows for secure transaction processing and merchant experiences. Learn more in our [Payment Gateway Integration Services](/services/payment-gateway-integration).",
        },
        {
          icon: "refresh-cw",
          title: "Transaction & Settlement Systems",
          text: "Support transaction tracking, settlement workflows, reconciliation, and operational reporting.",
        },
        {
          icon: "layout-dashboard",
          title: "Financial Dashboard Integration",
          text: "Centralize transaction visibility, financial reports, customer activity, and operational insights.",
        },
        {
          icon: "cloud",
          title: "Cloud Banking Infrastructure",
          text: "Build scalable financial technology environments with secure connectivity and synchronized data flows. See our [IT & Cloud Services](/services/it-cloud-services).",
        },
      ],
    },
    showcase: {
      heading: { line1: "Platforms & Tools", accent: "We Master" },
      description:
        "We work with modern cloud infrastructure, APIs, databases, payment systems, and security technologies to build reliable banking and financial integrations.",
      checklist: [
        {
          label: "Cloud & Infrastructure",
          detail: "AWS, Cloud Computing, Load Balancing, Containerized Environments",
        },
        {
          label: "APIs & Integration",
          detail: "REST APIs, Webhooks, JSON APIs, API Gateways",
        },
        {
          label: "Backend & Databases",
          detail: "Node.js, Python, MySQL, MongoDB",
        },
        {
          label: "Payments & Banking",
          detail: "Banking APIs, Payment Gateway APIs, UPI Integrations, Settlement APIs",
        },
        {
          label: "Security & Access",
          detail: "OAuth 2.0, API Authentication, Encryption, Role-Based Access Control",
        },
        {
          label: "Monitoring & Reporting",
          detail: "Transaction Monitoring, Logging Systems, Reporting Dashboards, Reconciliation Tools",
        },
      ],
      callout: {
        icon: "shield-check",
        title: "Secure Banking Architecture",
        text: "Every banking connectivity workflow is built around strict data protection, API authentication, and automated reconciliation without compromising regulatory compliance.",
      },
      image: {
        src: "/assets/services-detail/banking-tie-up/banking-platforms-graphic.png",
        width: 1536,
        height: 1024,
        alt: "GateXPay Banking Tie-Up and financial API integration ecosystem architecture diagram",
      },
    },
    process: {
      heading: {
        line1: "From Banking Requirements to",
        accent: "Connected Systems",
      },
      steps: [
        {
          icon: "scan-search",
          title: "Assess Business Requirements",
          text: "We evaluate your business model, banking needs, transaction flows, existing systems, operational requirements, and integration objectives.",
        },
        {
          icon: "workflow",
          title: "Plan Infrastructure Architecture",
          text: "Our team defines APIs, system architecture, payment flows, security controls, reporting requirements, and integration dependencies.",
        },
        {
          icon: "code-xml",
          title: "Connect Banking Systems",
          text: "We develop and configure compatible banking, payment, settlement, reporting, and financial platform integrations.",
        },
        {
          icon: "rocket",
          title: "Test, Deploy & Support",
          text: "We validate transaction flows, API connectivity, reconciliation, security controls, error handling, and production readiness.",
        },
      ],
    },
    faqs: [
      {
        q: "What are Banking Tie-Up Services?",
        a: "Banking Tie-Up Services help businesses establish the technical and operational connectivity required to work with compatible banking and financial systems. These services may include banking API integration, payment connectivity, transaction workflows, settlement systems, reporting infrastructure, and related technology support.",
      },
      {
        q: "What is banking API integration?",
        a: "Banking API integration connects a business application or financial platform with supported banking systems so authorized data and transaction instructions can move securely between systems. Depending on the integration, APIs may support transaction processing, account-related workflows, settlement data, reporting, verification, or other financial operations.",
      },
      {
        q: "Can GateXPay help integrate payment gateways?",
        a: "Yes. GateXPay can help businesses integrate compatible payment gateways and transaction systems into websites, applications, merchant platforms, and financial workflows. For a dedicated overview, explore our [Payment Gateway Integration Services](/services/payment-gateway-integration).",
      },
      {
        q: "Can fintech startups use Banking Tie-Up Services?",
        a: "Yes. Fintech companies may require banking connectivity, payment APIs, transaction systems, settlement workflows, and reporting infrastructure as they build financial products. The exact integration scope depends on the business model, partner institution, technical requirements, and applicable regulatory obligations.",
      },
      {
        q: "Are your banking integrations secure?",
        a: "Banking integrations can be designed around secure API communication, authentication, encrypted data transfer, controlled system access, logging, monitoring, and other appropriate security controls. Specific security requirements depend on the systems involved and the policies of the relevant financial institutions.",
      },
      {
        q: "Does GateXPay guarantee a banking partnership?",
        a: "No banking partnership should be presented as guaranteed. Eligibility, onboarding, approval, commercial terms, and regulatory requirements are determined by the relevant banking or financial institution. GateXPay can support the technology, integration, and implementation requirements associated with eligible banking relationships.",
      },
    ],
    finalCta: {
      titleLead: "Ready to Build Connected",
      titleAccent: "Banking Infrastructure?",
      description:
        "Integrate banking APIs, payment systems, settlement workflows, reporting, and financial applications through secure, scalable technology infrastructure.",
      ctaLabel: "Talk to an Expert",
      ctaHref: "/contact-us",
      secondaryCtaLabel: "Explore Banking & Financial Services",
      secondaryCtaHref: "/services",
      trustPoints: [
        {
          label: "API-Driven",
          desc: "Built for connected financial systems",
        },
        {
          label: "Secure Architecture",
          desc: "Structured access and data protection",
        },
        {
          label: "Scalable Infrastructure",
          desc: "Designed for growing operations",
        },
      ],
    },
  },

  // 10. Investment Services
  {
    slug: "investment-services",
    categoryId: "banking-financial",
    name: "Investment Services",
    metaTitle: "Investment Services Through CSP Network | GateXPay",
    metaDescription:
      "Access mutual fund, SIP, fixed deposit, recurring deposit and eligible savings scheme assistance through GateXPay’s supported CSP service channels.",
    hero: {
      titleLead: "Investment",
      titleAccent: "Services",
      description:
        "Access mutual funds, deposits, and eligible savings schemes with assisted onboarding, documentation, transactions, and investment service support through GateXPay.",
      ctaLabel: "Talk to an Expert",
      ctaHref: "/contact-us",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services",
      },
      image: {
        src: "/assets/services-detail/investment-services/hero-investment-services-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of digital investment and savings services assistance at GateXPay CSP locations",
      },
    },
    highlights: [
      {
        icon: "trending-up",
        title: "Assisted Investment Access",
        subtitle: "Support Through the Process",
        text: "Get help understanding available service categories, completing documentation, onboarding, and accessing eligible investment channels.",
      },
      {
        icon: "layers",
        title: "Multiple Investment Options",
        subtitle: "Choices for Different Goals",
        text: "Access supported mutual funds, deposits, and government savings schemes based on availability and applicable eligibility requirements.",
      },
      {
        icon: "shield-check",
        title: "Secure Service Process",
        subtitle: "Protected Documentation & Transactions",
        text: "Complete investment-related service requests through controlled workflows and applicable financial institution or investment platforms.",
      },
    ],
    included: {
      heading: { line1: "What's Included in Our", accent: "Investment Services" },
      items: [
        {
          icon: "trending-up",
          title: "Mutual Fund Assistance",
          text: "Get assisted access to eligible mutual fund investment and transaction processes through authorized channels.",
        },
        {
          icon: "refresh-cw",
          title: "SIP Investment Support",
          text: "Start or manage supported systematic investment plan transactions through applicable channels and platform integrations.",
        },
        {
          icon: "landmark",
          title: "Fixed Deposit Assistance",
          text: "Get support accessing eligible fixed deposit products from participating institutions and partner banks.",
        },
        {
          icon: "coins",
          title: "Recurring Deposit Support",
          text: "Receive assistance with supported recurring deposit account and contribution processes through participating branches.",
        },
        {
          icon: "building-2",
          title: "Government Savings Schemes",
          text: "Get guidance on accessing eligible government-backed savings schemes through authorized channels.",
        },
        {
          icon: "file-text",
          title: "Investment Service Support",
          text: "Access onboarding, documentation, transaction, status, and service-related assistance where supported. Explore our [Value-Added Services](/services/value-added-services).",
        },
      ],
    },
    showcase: {
      heading: { line1: "Platforms & Service Channels", accent: "We Support" },
      description:
        "We work with applicable digital investment, banking, KYC, payment, and government service channels to help customers complete supported investment-related processes efficiently.",
      checklist: [
        {
          label: "Mutual Fund Platforms",
          detail: "For eligible mutual fund transactions — Support for digital mutual fund onboarding, SIP processing, investment transactions, and applicable service workflows",
        },
        {
          label: "Banking Platforms",
          detail: "For deposit-based products — Assisted access to supported bank channels for eligible fixed deposit and recurring deposit services",
        },
        {
          label: "KYC & Verification Systems",
          detail: "For investor onboarding — Support for applicable identity verification, PAN validation, KYC documentation, and customer onboarding processes",
        },
        {
          label: "Government Savings Channels",
          detail: "For eligible savings schemes — Assistance accessing supported government savings products and related application or service processes",
        },
        {
          label: "Payment & Transaction Systems",
          detail: "For investment payments — Support for applicable digital payment, bank transfer, mandate, and transaction confirmation workflows",
        },
        {
          label: "Reporting & Service Tracking",
          detail: "For better visibility — Access available transaction references, acknowledgements, statements, or status information through relevant service platforms",
        },
      ],
      callout: {
        icon: "shield-check",
        title: "Assisted & Compliant Processing",
        text: "All investment-related services follow applicable financial platform, KYC, and regulatory guidelines to ensure transparent and reliable customer assistance.",
      },
      image: {
        src: "/assets/services-detail/investment-services/investment-channels-graphic.png",
        width: 1536,
        height: 1024,
        alt: "GateXPay Investment Services overview showing mutual funds, deposits, KYC, and savings schemes",
      },
    },
    process: {
      heading: {
        line1: "From Financial Goal to",
        accent: "Investment",
      },
      steps: [
        {
          icon: "scan-search",
          title: "Identify Your Requirement",
          text: "Tell us the investment or savings service you want to access and provide the relevant basic information.",
        },
        {
          icon: "file-text",
          title: "Complete Verification & KYC",
          text: "Submit applicable PAN, identity, KYC, banking, and service-specific information required by the relevant provider.",
        },
        {
          icon: "workflow",
          title: "Process Investment Request",
          text: "Your eligible investment or savings request is processed through the applicable institution or service platform.",
        },
        {
          icon: "ticket",
          title: "Receive Acknowledgement",
          text: "Receive available transaction confirmation, account information, reference details, or status updates for your completed request.",
        },
      ],
    },
    faqs: [
      {
        q: "What are Investment Services?",
        a: "Investment services help individuals access financial products designed for saving or investing money. Depending on availability, these may include mutual funds, SIPs, fixed deposits, recurring deposits, and certain government savings schemes. GateXPay can provide assisted service support for eligible investment-related processes through applicable service channels.",
      },
      {
        q: "Does GateXPay provide investment advice?",
        a: "GateXPay's service should not be interpreted as personalized investment advice unless such advice is provided through an appropriately authorized professional or regulated entity. Our service can assist customers with supported investment processes, documentation, onboarding, and transactions through applicable channels.",
      },
      {
        q: "Can I start a SIP through GateXPay Investment Services?",
        a: "Where supported by the applicable platform or financial institution, customers may receive assistance with SIP onboarding, documentation, payment setup, and related service processes. Investment availability and eligibility depend on the relevant product and provider.",
      },
      {
        q: "Do you provide assistance with fixed deposits and recurring deposits?",
        a: "GateXPay may assist customers with supported fixed deposit and recurring deposit processes offered through participating institutions or service channels. Interest rates, tenure, eligibility, premature-withdrawal conditions, and returns are determined by the respective financial institution.",
      },
      {
        q: "What documents may be required for investment services?",
        a: "Requirements vary by product and provider, but customers may need PAN, valid identity and address proof, bank account details, an active mobile number, KYC information, and other product-specific documentation. For identity and tax documentation assistance, see our [PAN Card Services](/services/pan-card-services) and [Aadhaar Services](/services/aadhaar-services).",
      },
      {
        q: "Are investment returns guaranteed?",
        a: "No investment return should be presented as guaranteed unless the specific financial product contract explicitly provides for it. Market-linked investments can fluctuate in value, while deposit or savings products are governed by the terms of the issuing institution or scheme.",
      },
    ],
    finalCta: {
      titleLead: "Ready to Start Your",
      titleAccent: "Investment Journey?",
      description:
        "Access supported investment and savings services with assisted onboarding, documentation, transaction support, and guidance through applicable service channels.",
      ctaLabel: "Talk to an Expert",
      ctaHref: "/contact-us",
      secondaryCtaLabel: "Explore Financial Services",
      secondaryCtaHref: "/services",
      trustPoints: [
        {
          label: "Assisted Onboarding",
          desc: "Support through key steps",
        },
        {
          label: "Multiple Service Categories",
          desc: "Investments and savings options",
        },
        {
          label: "Clear Processing",
          desc: "Applicable acknowledgements and records",
        },
      ],
    },
  },


  // 11. AEPS Services
  {
    slug: "aeps-services",
    categoryId: "payments-cash",
    name: "Aadhaar Enabled Payment System (AEPS) Services",
    metaTitle: "AEPS Services - Aadhaar Cash Withdrawal & Banking | GateXPay",
    metaDescription:
      "Access AEPS services with GateXPay for Aadhaar cash withdrawal, balance enquiry, mini statement and supported Aadhaar-enabled banking services.",
    hero: {
      titleLead: "Aadhaar Enabled Payment System (AEPS)",
      titleAccent: "Services",
      description:
        "Access essential banking services using your Aadhaar-linked bank account and biometric authentication at supported GateXPay Customer Service Points.",
      ctaLabel: "Find AEPS Assistance",
      secondaryAction: { text: "View Similar Services", href: "/services#payments-cash" },
      image: {
        src: "/assets/services-detail/aeps/hero-aeps-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of AEPS assisted banking, Aadhaar cash withdrawal, and biometric authentication",
      },
    },
    highlights: [
      {
        icon: "fingerprint",
        title: "Aadhaar-Based Banking",
        text: "Authenticate Securely — Access supported banking services using your Aadhaar-linked account and biometric authentication without carrying a debit card.",
      },
      {
        icon: "building-2",
        title: "Assisted Banking Access",
        text: "Support at Your Local CSP — Complete supported AEPS transactions with assistance at an authorised Customer Service Point or compatible banking touchpoint.",
      },
      {
        icon: "check-circle",
        title: "Quick Transaction Status",
        text: "Know Your Transaction Result — Receive transaction confirmation or a receipt after successful processing through the participating banking network.",
      },
    ],
    included: {
      heading: { line1: "AEPS Banking Services", accent: "We Support" },
      items: [
        {
          icon: "hand-coins",
          title: "AEPS Cash Withdrawal",
          text: "Withdraw cash from an Aadhaar-linked bank account through biometric authentication at supported service points.",
        },
        {
          icon: "layout-dashboard",
          title: "Balance Enquiry",
          text: "Check the available balance of your supported Aadhaar-linked bank account quickly and conveniently.",
        },
        {
          icon: "receipt",
          title: "Mini Statement",
          text: "View recent account transaction information where supported by your participating bank.",
        },
        {
          icon: "landmark",
          title: "Cash Deposit",
          text: "Deposit cash into an eligible Aadhaar-enabled bank account where the service is supported.",
        },
        {
          icon: "workflow",
          title: "Aadhaar Fund Transfer",
          text: "Initiate supported Aadhaar-based fund transfers through participating banks and enabled AEPS channels. Need interbank transfers? Explore our [Money Transfer Services](/services/money-transfer-services).",
        },
        {
          icon: "fingerprint",
          title: "Aadhaar Pay",
          text: "Make supported merchant payments using an Aadhaar-linked account and biometric authentication. For card and point-of-sale options, see our [Micro ATM Services](/services/micro-atm-services).",
        },
      ],
    },
    showcase: {
      heading: { line1: "What You Need", accent: "to Bring" },
      description:
        "NPCI specifies Aadhaar identification, bank details, biometric verification, and the relevant transaction type among the information required for an AEPS transaction.",
      checklist: [
        {
          label: "Aadhaar Number or Supported Virtual ID",
          detail: "Your 12-digit Aadhaar number or 16-digit Virtual ID for identity verification.",
        },
        {
          label: "Aadhaar-Linked Bank Account",
          detail: "An active savings or current bank account linked with your Aadhaar number.",
        },
        {
          label: "Name of Your Bank",
          detail: "The participating member bank where your Aadhaar-linked account is maintained.",
        },
        {
          label: "Biometric Authentication",
          detail: "Fingerprint or iris scan verified live through UIDAI-certified biometric devices.",
        },
        {
          label: "Transaction Type You Want to Perform",
          detail: "Specify cash withdrawal, balance enquiry, mini statement, deposit, or fund transfer.",
        },
        {
          label: "Transaction Amount Where Applicable",
          detail: "The exact cash withdrawal or deposit value within permissible bank limits.",
        },
      ],
      callout: {
        title: "Not Sure Which Details You Need?",
        text: "Bring your Aadhaar details and tell our service representative which banking service you need. They can guide you through the applicable AEPS process. Need help with AEPS? [Contact Us](/contact).",
        icon: "lightbulb",
      },
      image: {
        src: "/assets/services-detail/aeps/aeps-details-graphic.png",
        width: 1536,
        height: 1024,
        alt: "Checklist graphic of required details for AEPS Aadhaar banking, biometric verification, and transaction receipt",
      },
    },
    process: {
      heading: { line1: "From Aadhaar Verification to", accent: "Completed Banking" },
      steps: [
        {
          icon: "map-pin",
          title: "Visit a Service Point",
          text: "Go to a supported GateXPay Customer Service Point and request the AEPS banking service you need.",
        },
        {
          icon: "file-text",
          title: "Share Required Details",
          text: "Provide your Aadhaar or supported Virtual ID, select your linked bank, and choose the required transaction.",
        },
        {
          icon: "fingerprint",
          title: "Complete Biometric Verification",
          text: "Verify your identity using the supported biometric authentication process before the banking request is processed.",
        },
        {
          icon: "rocket",
          title: "Complete Your Transaction",
          text: "After successful processing, receive the applicable cash, payment confirmation, balance information, statement, or transaction receipt.",
        },
      ],
    },
    faqs: [
      {
        q: "What is AEPS?",
        a: "AEPS stands for Aadhaar Enabled Payment System. It is a bank-led system that enables eligible customers to perform supported banking transactions through Aadhaar authentication at Micro ATM, kiosk, mobile, or Business Correspondent touchpoints.",
      },
      {
        q: "What services are available through AEPS?",
        a: "Depending on your bank and the enabled service, AEPS can support transactions such as cash withdrawal, cash deposit, balance enquiry, mini statement, Aadhaar-based fund transfer and purchase transactions. For other assisted payment services, explore our [Bill Payment & Recharge Services](/services/bill-payment-services).",
      },
      {
        q: "Can I withdraw money using my Aadhaar card?",
        a: "An eligible customer with an Aadhaar-linked bank account can use AEPS cash withdrawal through a supported Business Correspondent or Micro ATM touchpoint using Aadhaar authentication. Service availability and transaction limits depend on the participating bank and applicable rules.",
      },
      {
        q: "Do I need a debit card or ATM PIN for AEPS?",
        a: "AEPS transactions are based on Aadhaar authentication rather than conventional debit-card authentication. Depending on the transaction and enabled channel, customers generally provide Aadhaar or Virtual ID, their bank details and biometric authentication. For card-based ATM services, explore our [Micro ATM Services](/services/micro-atm-services).",
      },
      {
        q: "Is AEPS secure?",
        a: "AEPS uses Aadhaar authentication and participating banking infrastructure to validate eligible transactions. Customers should use authorised service points, verify transaction details before authentication, and retain the transaction confirmation or receipt. NPCI's procedural guidelines require Aadhaar-enabled financial transactions to follow defined authentication and device-security specifications.",
      },
      {
        q: "Who can use AEPS services?",
        a: "A resident with an Aadhaar number linked to an eligible bank account can use supported AEPS services, subject to the participating bank and transaction availability. AEPS can be particularly useful for customers seeking assisted banking access through nearby service points. For additional identity and citizen services, check our [Aadhaar Services](/services/aadhaar-services) and [PAN Card Services](/services/pan-card-services).",
      },
    ],
    finalCta: {
      titleLead: "Need Essential Banking Services",
      titleAccent: "Near You?",
      description:
        "Access supported AEPS banking services through your Aadhaar-linked bank account with assisted biometric authentication at a GateXPay service point. You can also [contact GateXPay](/contact) directly to discuss your requirements.",
      ctaLabel: "Find AEPS Assistance",
      secondaryAction: {
        text: "Explore Banking Services",
        href: "/services#payments-cash",
      },
      features: [
        { icon: "fingerprint", bold: "Aadhaar Enabled", light: "Biometric authentication" },
        { icon: "building-2", bold: "Assisted Banking", light: "CSP-based support" },
        { icon: "layers", bold: "Multiple Services", light: "Withdrawal, balance & more" },
      ],
    },
  },

  // 12. Micro ATM Services
  {
    slug: "micro-atm-services",
    categoryId: "payments-cash",
    name: "Micro ATM Services",
    metaTitle: "Micro ATM Services | Cash Withdrawal & Banking Support | GateXPay",
    metaDescription:
      "Access Micro ATM services for cash withdrawal, balance enquiry, mini statements and Aadhaar-enabled banking through supported GateXPay service points.",
    hero: {
      titleLead: "Micro ATM",
      titleAccent: "Services",
      description:
        "Access essential banking services through nearby Micro ATM points for cash withdrawal, balance enquiry, mini statements, and assisted transactions.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: { text: "View Similar Services", href: "/services#payments-cash" },
      image: {
        src: "/assets/services-detail/micro-atm/hero-micro-atm-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of Micro ATM device terminal, portable cash withdrawal, and assisted banking point",
      },
    },
    highlights: [
      {
        icon: "smartphone",
        title: "Convenient Banking Access",
        text: "Banking Closer to You — Access supported banking services through assisted Micro ATM points without depending on a traditional ATM or bank branch.",
      },
      {
        icon: "shield-check",
        title: "Secure Authentication",
        text: "Verified Transaction Processing — Transactions are processed using supported authentication methods, helping protect customer access and reduce unauthorized usage.",
      },
      {
        icon: "globe",
        title: "Wider Service Reach",
        text: "Useful for Underserved Areas — Micro ATM services help extend basic banking access to customers in rural, semi-urban, and other underserved locations.",
      },
    ],
    included: {
      heading: { line1: "Micro ATM Services", accent: "We Support" },
      items: [
        {
          icon: "hand-coins",
          title: "Cash Withdrawal",
          text: "Withdraw cash from supported bank accounts through authorized Micro ATM transaction channels.",
        },
        {
          icon: "layout-dashboard",
          title: "Balance Enquiry",
          text: "Check available account balance through a supported and authenticated Micro ATM transaction.",
        },
        {
          icon: "receipt",
          title: "Mini Statement",
          text: "View recent account transaction information where mini-statement functionality is supported.",
        },
        {
          icon: "fingerprint",
          title: "Aadhaar-Enabled Transactions",
          text: "Access eligible banking services through supported Aadhaar-based authentication and connected payment infrastructure. Learn more about our [AEPS Services](/services/aeps-services).",
        },
        {
          icon: "handshake",
          title: "Assisted Banking Services",
          text: "Receive transaction assistance through an authorized Customer Service Point or service representative. Need fund transfers? Explore our [Money Transfer Services](/services/money-transfer-services).",
        },
        {
          icon: "check-circle",
          title: "Transaction Confirmation",
          text: "Receive transaction status or confirmation after successful processing through the supported banking network.",
        },
      ],
    },
    showcase: {
      heading: { line1: "What You Need", accent: "to Bring" },
      description:
        "Keep the following required account and authentication details ready for a smooth Micro ATM transaction at your nearest service point:",
      checklist: [
        {
          label: "Aadhaar Card",
          detail: "Required where Aadhaar-based biometric authentication is used. Need updates? Explore [Aadhaar Services](/services/aadhaar-services).",
        },
        {
          label: "Bank Account Linked With Supported Service",
          detail: "Active savings or current account linked to the required banking or subsidy facility.",
        },
        {
          label: "Registered Mobile Number",
          detail: "Available for receiving one-time passwords (OTP) and bank transaction SMS alerts where required.",
        },
        {
          label: "Debit Card",
          detail: "Valid debit or ATM card with chip/magnetic stripe where card-based Micro ATM transactions are supported.",
        },
        {
          label: "Biometric Authentication",
          detail: "Live fingerprint scan on certified biometric scanners for Aadhaar-authenticated transactions.",
        },
        {
          label: "Required Transaction Amount or Request",
          detail: "Specify the exact withdrawal sum or banking query within bank-permitted daily limits.",
        },
      ],
      callout: {
        title: "Not Sure What You Need?",
        text: "Bring your available banking details and valid identification. The service representative can help determine what is required for the supported transaction. Learn more about our [Aadhaar Enabled Payment Services](/services/aeps-services).",
        icon: "lightbulb",
      },
      image: {
        src: "/assets/services-detail/micro-atm/micro-atm-details-graphic.png",
        width: 1536,
        height: 1024,
        alt: "Checklist graphic of Micro ATM portable terminal, debit card EMV insertion, biometric scan, cash dispensed, and receipt",
      },
    },
    process: {
      heading: { line1: "From Card Insertion to", accent: "Instant Cash & Banking" },
      steps: [
        {
          icon: "map-pin",
          title: "Visit a Service Point",
          text: "Reach a participating Customer Service Point or supported Micro ATM location and request the banking service you need.",
        },
        {
          icon: "file-text",
          title: "Provide Required Details",
          text: "Provide the relevant account, card, Aadhaar, mobile, or authentication details required for the selected transaction.",
        },
        {
          icon: "workflow",
          title: "Complete the Transaction",
          text: "The transaction is submitted through the supported banking or payment network using the applicable authentication method.",
        },
        {
          icon: "rocket",
          title: "Receive Cash or Status",
          text: "After successful processing, receive your cash, transaction status, or confirmation according to the requested service.",
        },
      ],
    },
    faqs: [
      {
        q: "What is a Micro ATM?",
        a: "A Micro ATM is a compact banking terminal used by authorized service representatives to help customers perform supported banking transactions outside a traditional bank branch or ATM. Depending on the service and banking network, Micro ATM functionality can include cash withdrawal, balance enquiry, mini statements, and other assisted banking services.",
      },
      {
        q: "What services are available through a Micro ATM?",
        a: "Supported services can include cash withdrawal, balance enquiry, mini statements, and other assisted banking transactions. The exact services available depend on the connected bank, payment network, device capabilities, and service provider. For retail utility payments, explore our [Bill Payment Services](/services/bill-payment-services) and [Recharge Services](/services/recharge-services).",
      },
      {
        q: "Can I withdraw cash using a Micro ATM?",
        a: "Yes, cash withdrawal may be available through supported Micro ATM services after the customer completes the required authentication. Availability, limits, and authentication requirements may vary by bank and transaction channel.",
      },
      {
        q: "Do Micro ATM transactions require Aadhaar?",
        a: "Not always. Some Micro ATM services may support Aadhaar-based authentication, while others may use debit cards, PINs, or other supported banking credentials. For Aadhaar-based banking transactions, explore our [AEPS Services](/services/aeps-services).",
      },
      {
        q: "Are Micro ATM transactions secure?",
        a: "Micro ATM transactions use authentication and connected banking or payment systems to process requests. Customers should only use authorized service points, protect their PIN and OTP, verify transaction details, and never share sensitive credentials unnecessarily.",
      },
      {
        q: "Who can use Micro ATM Services?",
        a: "Eligible customers of supported banks may use Micro ATM services, subject to the available transaction type, authentication method, account status, and applicable banking rules. These services can be especially useful where access to bank branches or conventional ATMs is limited. For identity documents, explore our [PAN Card Services](/services/pan-card-services) and [Aadhaar Services](/services/aadhaar-services).",
      },
    ],
    finalCta: {
      titleLead: "Need Convenient Access to",
      titleAccent: "Assisted Banking Services?",
      description:
        "Use supported Micro ATM services for cash withdrawal, balance enquiry, mini statements, and other essential banking transactions through accessible service points. You can also [contact GateXPay](/contact) directly to discuss your requirements.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "Explore Banking Services",
        href: "/services#payments-cash",
      },
      features: [
        { icon: "building-2", bold: "Accessible Banking", light: "Useful beyond traditional branches" },
        { icon: "shield-check", bold: "Secure Processing", light: "Authenticated transactions" },
        { icon: "handshake", bold: "Simple Assistance", light: "Guided service support" },
      ],
    },
  },

  // 13. Money Transfer Services
  {
    slug: "money-transfer-services",
    categoryId: "payments-cash",
    name: "Money Transfer Services",
    metaTitle: "Money Transfer Services | Domestic & Remittance Support | GateXPay",
    metaDescription:
      "Access secure domestic money transfer, IMPS, NEFT and supported remittance services with assisted transaction support through GateXPay CSP locations.",
    hero: {
      titleLead: "Money Transfer",
      titleAccent: "Services",
      description:
        "Send money securely through supported domestic and remittance services with guided assistance, account verification, transaction tracking, and convenient CSP access.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services#payments-cash",
      },
      image: {
        src: "/assets/services-detail/money-transfer/hero-money-transfer-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of secure domestic money transfer, IMPS, NEFT and remittance services at GateXPay CSP network",
      },
    },
    highlights: [
      {
        icon: "zap",
        title: "Fast Transaction Support",
        subtitle: "Guided Domestic Bank Transfers",
        text: "Get guided support for eligible domestic bank transfers and remittance transactions through GateXPay Customer Service Points.",
      },
      {
        icon: "shield-check",
        title: "Secure Verification",
        subtitle: "Verified Sender & Beneficiary",
        text: "Sender and beneficiary details are verified through applicable transaction and identity-check processes before supported transfers are initiated.",
      },
      {
        icon: "landmark",
        title: "Multiple Transfer Options",
        subtitle: "IMPS, NEFT & Remittance Options",
        text: "Access supported domestic money transfer, bank transfer, and eligible remittance services from a single assisted service point.",
      },
    ],
    included: {
      heading: {
        line1: "Money Transfer Services",
        accent: "We Support",
      },
      items: [
        {
          icon: "landmark",
          title: "Domestic Money\\nTransfer",
          text: "Send funds to supported bank accounts in India through assisted money transfer services at your local CSP. Need biometric cash withdrawal? Explore our [AEPS Services](/services/aeps-services).",
        },
        {
          icon: "zap",
          title: "IMPS Money\\nTransfer",
          text: "Initiate eligible IMPS transfers for fast bank-to-bank fund movement through supported channels with instant beneficiary credit.",
        },
        {
          icon: "building-2",
          title: "NEFT Money\\nTransfer",
          text: "Transfer funds to supported bank accounts using applicable NEFT payment and settlement channels for reliable national banking settlements.",
        },
        {
          icon: "globe",
          title: "Indo-Nepal\\nRemittance",
          text: "Access supported India-to-Nepal remittance services subject to applicable verification and transaction requirements.",
        },
        {
          icon: "coins",
          title: "Cash-to-Account\\nTransfer",
          text: "Deposit cash for transfer to an eligible beneficiary bank account through supported CSP services. For debit-card withdrawals, visit our [Micro ATM Services](/services/micro-atm-services).",
        },
        {
          icon: "receipt",
          title: "Transaction Status\\nSupport",
          text: "Receive transaction references and assistance for checking the status of completed or pending transfers.",
        },
      ],
    },
    showcase: {
      heading: {
        line1: "What You Need",
        accent: "to Bring",
      },
      description:
        "Provide accurate sender and beneficiary details at your nearest GateXPay Customer Service Point to initiate your transfer smoothly.",
      checklist: [
        {
          label: "Sender's Active Mobile Number",
          detail: "Used for sender registration, transaction verification, and receiving status SMS updates.",
        },
        {
          label: "Beneficiary's Full Name",
          detail: "The exact legal name of the recipient as recorded with their bank.",
        },
        {
          label: "Beneficiary Bank Name",
          detail: "The destination commercial or regional rural bank where the account is held.",
        },
        {
          label: "Bank Account Number",
          detail: "Carefully confirmed account number to ensure funds reach the intended beneficiary.",
        },
        {
          label: "IFSC Code",
          detail: "11-character Indian Financial System Code identifying the beneficiary branch.",
        },
        {
          label: "Transfer Amount",
          detail: "The desired transfer value within permissible transaction and per-remittance limits.",
        },
        {
          label: "Valid Identity Details Where Required",
          detail: "Government-issued identity proof for KYC verification when applicable or for higher transfer limits.",
        },
        {
          label: "Additional Beneficiary Information for Remittances",
          detail: "Recipient citizenship and identification details required for supported Indo-Nepal remittance services.",
        },
      ],
      callout: {
        title: "Not Sure What Details You Need?",
        text: "Bring the beneficiary's available bank information and your identification documents. Our service team can help identify the information required for the applicable transfer type. Need help with identity-related services? Explore our [Aadhaar Services](/services/aadhaar-services) or [PAN Card Services](/services/pan-card-services).",
        icon: "lightbulb",
      },
      note: "Requirements may vary by transaction type, service provider, transfer amount, destination, and applicable regulatory or KYC requirements.",
      image: {
        src: "/assets/services-detail/money-transfer/money-transfer-details-graphic.png",
        width: 1536,
        height: 1024,
        alt: "Checklist graphic of details required for domestic money transfer, IMPS, NEFT, and remittance verification",
      },
    },
    process: {
      heading: {
        line1: "From Transfer Request to",
        accent: "Instant Remittance",
      },
      steps: [
        {
          icon: "map-pin",
          title: "Visit a CSP Service Point",
          text: "Visit a supported GateXPay Customer Service Point and tell the representative which money transfer service you need.",
        },
        {
          icon: "file-text",
          title: "Share Transfer Details",
          text: "Provide your mobile number, beneficiary bank information, transfer amount, and any required identity or remittance details.",
        },
        {
          icon: "shield-check",
          title: "Confirm the Transaction",
          text: "Review the beneficiary details and transfer amount before the transaction is processed through the applicable supported payment channel.",
        },
        {
          icon: "receipt",
          title: "Receive Transaction Reference",
          text: "Receive the available transaction receipt or reference number and use it to confirm or track the transfer status.",
        },
      ],
    },
    faqs: [
      {
        q: "What are Money Transfer Services?",
        a: "Money transfer services allow individuals to send funds from one location or account to another using supported banking or remittance channels. At assisted Customer Service Points, users may be able to initiate eligible domestic bank transfers and other supported remittance transactions with guided assistance.",
      },
      {
        q: "Does GateXPay support Domestic Money Transfer?",
        a: "GateXPay Customer Service Points can provide assisted support for eligible domestic money transfer transactions to supported bank accounts across India. The available transfer method, processing time, limits, and requirements depend on the underlying banking or service provider network. For bill payments, explore our [Bill Payment Services](/services/bill-payment-services).",
      },
      {
        q: "What is the difference between IMPS and NEFT money transfer?",
        a: "IMPS and NEFT are electronic fund-transfer mechanisms used for moving money between bank accounts in India. IMPS is designed for instant round-the-clock transfers, while NEFT processes settlements in half-hourly batches. The applicable service, transfer timing, transaction limits, and availability depend on the connected bank or payment provider.",
      },
      {
        q: "Can I transfer cash to someone's bank account?",
        a: "Where supported, a customer may provide cash at an assisted service point for transfer to an eligible beneficiary bank account after completing the required verification process. Availability and limits depend on the service provider and applicable transaction rules. For card withdrawals, explore [Micro ATM Services](/services/micro-atm-services).",
      },
      {
        q: "Does GateXPay support Indo-Nepal money transfer?",
        a: "GateXPay may support eligible India-to-Nepal remittance services through applicable service channels and partners. Customers should confirm current availability, identification requirements, transaction limits, fees, exchange rates, and beneficiary requirements before initiating a remittance.",
      },
      {
        q: "Are money transfer services secure?",
        a: "Money transfer transactions should use verified beneficiary details, supported transaction networks, applicable authentication measures, and transaction references. Customers should always verify the recipient's bank details before approving a transfer and retain the transaction receipt or reference number. For online digital checkout solutions, explore our [Payment Gateway Integration](/services/payment-gateway-integration).",
      },
    ],
    finalCta: {
      titleLead: "Need to Send",
      titleAccent: "Money Securely?",
      description:
        "Get assisted support for domestic bank transfers and eligible remittance services through a convenient GateXPay Customer Service Point. You can also [contact our support team](/contact) to learn more.",
      ctaLabel: "Get Transfer Assistance",
      secondaryAction: {
        text: "Talk to an Expert",
        href: "/contact",
      },
      features: [
        {
          icon: "headphones",
          bold: "Guided Assistance",
          light: "Help throughout the transfer process",
        },
        {
          icon: "shield-check",
          bold: "Secure Verification",
          light: "Transaction details checked before processing",
        },
        {
          icon: "layers",
          bold: "Convenient Access",
          light: "Supported transfer services in one place",
        },
      ],
    },
  },

  // 14. Travel Booking Services
  {
    slug: "travel-booking-services",
    categoryId: "retail-commerce",
    name: "Travel Booking Services",
    metaTitle: "Travel Booking Services | Train, Flight, Bus & Hotel | GateXPay",
    metaDescription:
      "Book train, flight, bus and hotel travel through GateXPay CSP services with guided booking support, secure payments and convenient travel assistance.",
    hero: {
      titleLead: "Travel Booking",
      titleAccent: "Services",
      description:
        "Book trains, flights, buses, hotels, and travel services conveniently through GateXPay CSP support with secure payments and guided assistance.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services#retail-commerce",
      },
      image: {
        src: "/assets/services-detail/travel/hero-travel-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of travel booking services for trains, flights, buses and hotels through GateXPay CSP support",
      },
    },
    highlights: [
      {
        icon: "layers",
        title: "Multiple Travel Options",
        subtitle: "Plan More in One Place",
        text: "Access supported train, flight, bus, hotel, and travel booking services through a convenient CSP-assisted process.",
      },
      {
        icon: "shield-check",
        title: "Secure Payments",
        subtitle: "Clear & Protected Bookings",
        text: "Complete supported travel transactions through secure payment workflows with clear booking details and transaction confirmation.",
      },
      {
        icon: "headphones",
        title: "Guided Booking Support",
        subtitle: "Dedicated Assistance Every Step",
        text: "Get assistance with passenger details, travel preferences, booking options, payment, confirmations, and supported post-booking requests.",
      },
    ],
    included: {
      heading: {
        line1: "Travel Services",
        accent: "We Support",
      },
      items: [
        {
          icon: "train",
          title: "Train Ticket\\nBooking",
          text: "Get assistance with train searches, passenger details, ticket booking, and booking-status information through supported booking channels.",
        },
        {
          icon: "plane",
          title: "Flight Ticket\\nBooking",
          text: "Search and book supported domestic and international flights based on route, schedule, and live airline availability.",
        },
        {
          icon: "bus",
          title: "Bus Ticket\\nBooking",
          text: "Find supported bus routes, operators, schedules, seating options, and available fares across private and state transport operators.",
        },
        {
          icon: "hotel",
          title: "Hotel Booking\\nAssistance",
          text: "Find and reserve suitable hotel options based on destination, travel dates, occupancy, budget, and accommodation preferences.",
        },
        {
          icon: "luggage",
          title: "Holiday Package\\nAssistance",
          text: "Get assistance exploring suitable travel packages and itineraries based on destination, dates, and budget.",
        },
        {
          icon: "ticket",
          title: "Booking Support\\n& Status",
          text: "Access booking confirmations, PNR status information, and supported cancellation or refund guidance. For local bill recharges, explore our [Bill Payment & Recharge Services](/services/bill-payment-recharge).",
        },
      ],
    },
    showcase: {
      heading: {
        line1: "What You Need",
        accent: "to Bring",
      },
      description:
        "Keep the following passenger, journey, and identification details ready when visiting your local Customer Service Point for a smooth travel booking experience.",
      checklist: [
        {
          label: "Valid Government-Issued ID Where Required",
          detail: "Aadhaar card, PAN card, passport, or voter ID for identity verification on flights and trains.",
        },
        {
          label: "Passenger or Traveller Full Name",
          detail: "Accurate name as listed on the official ID of each passenger travelling.",
        },
        {
          label: "Mobile Number & Email Address",
          detail: "Required for receiving instant booking confirmations, PNR SMS, and digital e-tickets.",
        },
        {
          label: "Travel Origin & Destination",
          detail: "Clear departure station/airport and destination city or station for itinerary searches.",
        },
        {
          label: "Preferred Travel Date & Time",
          detail: "Target departure dates, return journey dates, and preferred departure time windows.",
        },
        {
          label: "Co-Passenger Details",
          detail: "Full names, ages, and seat preferences for family members or accompanying travellers.",
        },
        {
          label: "Age & Gender Details Where Required",
          detail: "Necessary for berth quotas, senior citizen concessions where applicable, or child fare calculation.",
        },
        {
          label: "Travel Preferences",
          detail: "Class of travel (Sleeper, 3AC, Economy), berth/seat choice (window, aisle), or hotel room types.",
        },
        {
          label: "Payment Amount or Method",
          detail: "Cash or supported digital payment methods to complete ticket issuance immediately.",
        },
      ],
      callout: {
        title: "Not Sure What Details You Need?",
        text: "Bring your travel plan and available passenger information. Our CSP representative can help identify the details required for the selected booking service. Need help with another customer service? Explore our [CSP Services](/services).",
        icon: "lightbulb",
      },
      image: {
        src: "/assets/services-detail/travel/travel-details-graphic.png",
        width: 1536,
        height: 1024,
        alt: "Checklist graphic of details required for train, flight, bus, and hotel travel bookings",
      },
    },
    process: {
      heading: {
        line1: "From Travel Plans to",
        accent: "Confirmed Bookings",
      },
      steps: [
        {
          icon: "map-pin",
          title: "Visit a CSP Point",
          text: "Visit a supported GateXPay Customer Service Point and tell us the travel service you need.",
        },
        {
          icon: "file-text",
          title: "Provide Travel Information",
          text: "Share passenger details, destination, travel dates, preferences, and any information required for the selected booking.",
        },
        {
          icon: "shield-check",
          title: "Choose a Suitable Option",
          text: "Review available routes, schedules, fares, or accommodation options and confirm your preferred booking before payment.",
        },
        {
          icon: "ticket",
          title: "Receive Booking Details",
          text: "Receive the available ticket, booking reference, or confirmation details after successful processing.",
        },
      ],
    },
    faqs: [
      {
        q: "What travel services does GateXPay provide?",
        a: "GateXPay CSP-supported travel services can assist customers with train ticket booking, flight ticket booking, bus reservations, hotel booking, and other supported travel requirements. Service availability may depend on the connected booking provider, route, destination, and CSP location.",
      },
      {
        q: "Can I book flight tickets through GateXPay CSP services?",
        a: "Yes. Customers can receive assistance with supported domestic and international flight searches and bookings, subject to route, fare, seat availability, and the terms of the relevant travel provider.",
      },
      {
        q: "Does GateXPay provide train ticket booking assistance?",
        a: "GateXPay CSP locations can assist with supported train ticket booking workflows, passenger-detail entry, booking-status information, and related travel assistance where the service is available through participating travel service networks.",
      },
      {
        q: "Can I book bus tickets through GateXPay?",
        a: "Yes. Supported CSP travel services can help customers search available bus routes, operators, timings, fares, and seating options before completing a booking.",
      },
      {
        q: "Can I get hotel booking assistance?",
        a: "Yes. Customers can receive assistance finding supported hotel options based on their destination, check-in and check-out dates, occupancy, budget, and other preferences.",
      },
      {
        q: "What details are required for travel booking?",
        a: "Requirements vary by service. Common details include the traveller's name, contact information, travel dates, origin and destination, passenger details, and valid identification where required. Need identity updates? Check our [Aadhaar Services](/services/aadhaar-services).",
      },
      {
        q: "Can travel bookings be cancelled or refunded?",
        a: "Cancellation and refund eligibility depends on the relevant airline, railway, bus operator, hotel, booking provider, fare rules, and cancellation policy. GateXPay can assist with supported cancellation or refund workflows where available.",
      },
      {
        q: "Are travel booking payments secure?",
        a: "GateXPay uses supported digital payment and transaction workflows for travel bookings. Customers should always verify the booking amount and traveller details before confirming payment. For other payment-related services, explore our [Bill Payment & Recharge Services](/services/bill-payment-recharge) and [Money Transfer Services](/services/money-transfer-services).",
      },
    ],
    finalCta: {
      titleLead: "Ready to Plan Your",
      titleAccent: "Next Journey?",
      description:
        "Get convenient assistance for supported train, flight, bus, hotel, and travel bookings through the GateXPay CSP network. You can also [contact our support team](/contact) to learn more about travel service availability.",
      ctaLabel: "Find Travel Support",
      secondaryAction: {
        text: "Explore CSP Services",
        href: "/services",
      },
      features: [
        {
          icon: "layers",
          bold: "Multiple Booking Options",
          light: "Train, flight, bus and hotel support",
        },
        {
          icon: "headphones",
          bold: "Guided Assistance",
          light: "Help through the booking process",
        },
        {
          icon: "shield-check",
          bold: "Secure Transactions",
          light: "Clear payment and confirmation workflow",
        },
      ],
    },
  },

  // 15. Shipping & Logistics Integration
  {
    slug: "shipping-logistics-integration",
    categoryId: "retail-commerce",
    name: "Shipping & Logistics Integration",
    metaTitle: "Shipping & Logistics Integration Services | GateXPay",
    metaDescription: "Automate shipping, tracking, inventory and fulfillment with GateXPay's secure shipping and logistics integration services, APIs and cloud solutions.",
    hero: {
      titleLead: "Shipping & Logistics",
      titleAccent: "Integration",
      description: "Connect shipping, courier, inventory, tracking, and fulfillment systems through secure APIs that automate logistics operations and support scalable business growth.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "Explore Technology Services",
        href: "/services",
      },
      image: {
        src: "/assets/services-detail/shipping-logistics/hero-shipping-logistics-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of smart shipping and automated logistics supply chain",
      },
    },
    highlights: [
      {
        icon: "network",
        title: "API-First Integration",
        text: "Connect Your Logistics Ecosystem — Integrate shipping carriers, courier partners, inventory systems, marketplaces, and business applications through secure, scalable APIs.",
      },
      {
        icon: "scan-search",
        title: "Real-Time Visibility",
        text: "Track Every Shipment — Enable real-time shipment tracking, delivery updates, operational dashboards, and automated customer notifications across connected logistics workflows.",
      },
      {
        icon: "boxes",
        title: "Scalable Infrastructure",
        text: "Built for Growing Operations — Create cloud-ready logistics infrastructure capable of supporting increasing orders, shipment volumes, integrations, and multi-channel operations.",
      },
    ],
    included: {
      heading: { line1: "What's Included in", accent: "Shipping & Logistics Integration" },
      items: [
        {
          icon: "network",
          title: "Shipping API\\nIntegration",
          text: "Connect shipping platforms, carriers, and business applications through secure [API integration services](/services/web-app-development) designed for automated operations.",
        },
        {
          icon: "boxes",
          title: "Order &\\nInventory Sync",
          text: "Synchronize orders, inventory levels, warehouses, and shipment information automatically across your [e-commerce solutions](/services/e-commerce-solutions).",
        },
        {
          icon: "map-pin",
          title: "Real-Time Shipment\\nTracking",
          text: "Track shipment movements, delivery statuses, exceptions, and customer updates centrally with live tracking events.",
        },
        {
          icon: "truck",
          title: "Courier Partner\\nIntegration",
          text: "Connect multiple courier providers for streamlined booking, tracking, and multi-carrier fulfillment workflows.",
        },
        {
          icon: "workflow",
          title: "Logistics\\nAutomation",
          text: "Automate labels, order routing, notifications, scheduling, returns, and repetitive workflows. Integrate with [payment gateway integration](/services/payment-gateway-integration) to connect payments with fulfillment.",
        },
        {
          icon: "database",
          title: "Cloud Logistics\\nInfrastructure",
          text: "Build scalable logistics environments with secure synchronization and reliable system connectivity via scalable [cloud services](/services/it-cloud-services).",
        },
      ],
    },
    technology: {
      heading: { line1: "Technology That Powers", accent: "Smarter Logistics" },
      description: "We combine modern application technologies, logistics APIs, cloud infrastructure, and security controls to build reliable, integration-ready logistics ecosystems.",
      slides: [
        {
          number: "01",
          title: "Frontend",
          text: "Create fast, intuitive dashboards for shipment tracking, order management, inventory visibility, and logistics operations.",
          technologies: [
            { name: "JavaScript", logo: LOGOS.js },
            { name: "React.js", logo: LOGOS.react },
            { name: "HTML5", logo: LOGOS.html5 },
            { name: "CSS3", logo: LOGOS.css3 },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Logistics management frontend architecture" },
        },
        {
          number: "02",
          title: "Backend",
          text: "Build secure services that manage shipping APIs, automation logic, integrations, order processing, and real-time logistics data.",
          technologies: [
            { name: "Node.js", logo: "/assets/tech-icons/node.svg" },
            { name: "Python", logo: "/assets/tech-icons/python.svg" },
            { name: "PHP", logo: "/assets/tech-icons/php.svg" },
            { name: "Laravel", logo: "/assets/tech-icons/integration.svg" },
            { name: "Express.js", logo: "/assets/tech-icons/server.svg" },
            { name: "REST APIs", logo: "/assets/tech-icons/api.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Logistics backend processing diagram" },
        },
        {
          number: "03",
          title: "Cloud & Logistics Infrastructure",
          text: "Support scalable logistics automation with cloud-based infrastructure and real-time data exchange between connected business systems.",
          technologies: [
            { name: "AWS", logo: "/assets/tech-icons/cloud.svg" },
            { name: "Cloud Infrastructure", logo: "/assets/tech-icons/cloud.svg" },
            { name: "Shipping APIs", logo: "/assets/tech-icons/api.svg" },
            { name: "Courier APIs", logo: "/assets/tech-icons/shipping.svg" },
            { name: "Webhooks", logo: "/assets/tech-icons/webhook.svg" },
            { name: "Real-Time Data Synchronization", logo: "/assets/tech-icons/integration.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Logistics API integration architecture" },
        },
        {
          number: "04",
          title: "Security & Integration",
          text: "Protect operational and shipment information while controlling communication between applications, partners, users, and logistics platforms through enterprise [cybersecurity services](/policy/security).",
          technologies: [
            { name: "API Authentication", logo: "/assets/tech-icons/auth.svg" },
            { name: "Encrypted Data Transfer", logo: "/assets/tech-icons/security.svg" },
            { name: "Role-Based Access Control", logo: "/assets/tech-icons/access.svg" },
            { name: "Secure API Connectivity", logo: "/assets/tech-icons/api.svg" },
            { name: "Access Management", logo: "/assets/tech-icons/auth.svg" },
            { name: "System Monitoring", logo: "/assets/tech-icons/monitoring.svg" },
          ],
          image: { src: ARCH_IMG, width: 1374, height: 1145, alt: "Cloud security for logistics platforms" },
        },
      ],
    },
    process: {
      heading: { line1: "From Logistics Complexity to", accent: "Connected Operations" },
      steps: [
        {
          icon: "scan-search",
          title: "Map Your Logistics Workflow",
          text: "We evaluate existing shipping processes, carriers, inventory systems, fulfillment workflows, integration requirements, and operational challenges.",
        },
        {
          icon: "workflow",
          title: "Design the Integration",
          text: "Our team defines system architecture, APIs, data flows, automation rules, security requirements, and integration dependencies.",
        },
        {
          icon: "code-xml",
          title: "Connect & Automate",
          text: "We integrate shipping, courier, inventory, tracking, warehouse, and business systems while automating critical logistics workflows.",
        },
        {
          icon: "rocket",
          title: "Test, Deploy & Optimize",
          text: "We validate integrations, data synchronization, tracking events, security controls, exception handling, and production performance before deployment.",
        },
      ],
    },
    faqs: [
      {
        q: "What are Shipping & Logistics Integration Services?",
        a: "Shipping and logistics integration connects your e-commerce platform, ERP, inventory system, warehouse software, courier services, and shipping applications so logistics data can move automatically between systems. It can reduce manual processing while improving shipment visibility and fulfillment efficiency.",
      },
      {
        q: "Can GateXPay integrate multiple courier and shipping providers?",
        a: "Yes. GateXPay can develop API-based integrations between compatible courier services, shipping platforms, marketplaces, and your existing technology environment. Integration scope depends on the APIs and technical capabilities available from each provider.",
      },
      {
        q: "Can you provide real-time shipment tracking integration?",
        a: "Yes. We can integrate shipment tracking APIs, webhooks, delivery-status events, tracking dashboards, and customer notifications to provide near-real-time visibility where supported by the connected carrier.",
      },
      {
        q: "Can logistics integration connect with our existing ERP, CRM, or inventory system?",
        a: "Yes, provided the systems support appropriate APIs, webhooks, databases, middleware, or other integration mechanisms. We assess the existing technology environment before recommending the integration architecture. Learn more about our [Web & App Development Services](/services/web-app-development) for custom business platforms and operational dashboards.",
      },
      {
        q: "How does logistics automation improve operations?",
        a: "Logistics automation can reduce repetitive manual work by automating tasks such as order routing, shipping-label generation, inventory synchronization, tracking updates, delivery notifications, and return workflows. Businesses processing digital orders may also benefit from [Payment Gateway Integration](/services/payment-gateway-integration) to connect payment and fulfillment workflows.",
      },
      {
        q: "Are your shipping and logistics integrations secure?",
        a: "We design integrations around secure API communication, authentication, authorization, encrypted data transmission, controlled system access, logging, and other security practices appropriate to the implementation. The exact security controls depend on the connected platforms, infrastructure, data sensitivity, and business requirements.",
      },
    ],
    finalCta: {
      titleLead: "Ready to Connect Your",
      titleAccent: "Logistics Operations?",
      description: "Build a scalable shipping and logistics ecosystem that connects orders, inventory, couriers, tracking, and fulfillment through secure digital infrastructure. You can also [contact GateXPay](/contact) directly to scope your requirements.",
      ctaLabel: "Talk to an Expert",
      features: [
        { icon: "shield-check", bold: "Secure Integrations", light: "API-first connectivity" },
        { icon: "workflow", bold: "Automation Ready", light: "Reduce manual workflows" },
        { icon: "boxes", bold: "Built to Scale", light: "Support growing operations" },
      ],
    },
  },

  // 16. E-Commerce Services
  {
    slug: "e-commerce-services",
    categoryId: "retail-commerce",
    name: "E-Commerce Services",
    metaTitle: "E-Commerce Website Development Services | GateXPay",
    metaDescription:
      "Build and scale your online store with GateXPay e-commerce development services, payment integration, inventory workflows, shipping and SEO support.",
    hero: {
      titleLead: "E-Commerce",
      titleAccent: "Services",
      description:
        "Launch, manage, and scale your online store with secure payments, optimized storefronts, inventory workflows, marketing, and commerce integrations.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services",
      },
      image: {
        src: "/assets/services-detail/ecommerce-services/hero-ecommerce-services-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of online e-commerce storefront development and integrations",
      },
    },
    highlights: [
      {
        icon: "shopping-bag",
        title: "Conversion-Focused Stores",
        subtitle: "Built to Sell Better",
        text: "Built to Sell Better — Create responsive, easy-to-navigate storefronts designed around product discovery, checkout usability, and a smoother customer buying experience.",
      },
      {
        icon: "credit-card",
        title: "Secure Payment Integration",
        subtitle: "Enable Convenient Checkout",
        text: "Enable Convenient Checkout — Connect compatible payment gateways, UPI, cards, net banking, and other supported payment methods through secure checkout workflows.",
      },
      {
        icon: "trending-up",
        title: "Scalable Commerce Setup",
        subtitle: "Ready for Business Growth",
        text: "Ready for Business Growth — Build commerce infrastructure that can support expanding product catalogs, increasing orders, additional channels, and future integrations.",
      },
    ],
    included: {
      heading: {
        line1: "What’s Included in Our",
        accent: "E-Commerce Services",
      },
      items: [
        {
          icon: "store",
          title: "E-Commerce Website\nDevelopment",
          text: "Build responsive online stores with structured catalogs, checkout flows, and customer-friendly navigation. Explore [Web & App Development](/services/web-app-development).",
        },
        {
          icon: "layers",
          title: "Shopify & WooCommerce\nSetup",
          text: "Configure suitable commerce platforms, themes, products, plugins, and essential store functionality.",
        },
        {
          icon: "credit-card",
          title: "Payment Gateway\nIntegration",
          text: "Integrate compatible payment gateways for secure and convenient online checkout experiences. Learn more with our [Payment Gateway Integration](/services/payment-gateway-integration).",
        },
        {
          icon: "package",
          title: "Product & Inventory\nManagement",
          text: "Organize product catalogs, stock information, variants, pricing, and inventory workflows efficiently.",
        },
        {
          icon: "truck",
          title: "Shipping & Order\nIntegration",
          text: "Connect order processing, shipping partners, tracking, and fulfillment workflows across your store. Connect with [Shipping & Logistics Integration](/services/shipping-logistics-integration).",
        },
        {
          icon: "bar-chart-3",
          title: "E-Commerce SEO\n& Growth",
          text: "Improve product visibility with technical SEO, optimized content, analytics, and growth-focused strategies. Explore our [Digital Marketing Services](/services/digital-marketing-services).",
        },
      ],
    },
    showcase: {
      heading: { line1: "Platforms & Tools", accent: "We Master" },
      description:
        "We work with proven e-commerce platforms, payment systems, analytics tools, and integrations to build stores around your operational requirements.",
      checklist: [
        { label: "E-Commerce Platforms" },
        { label: "Payments & Checkout" },
        { label: "Marketing & Analytics" },
        { label: "Operations & Integrations" },
      ],
      callout: {
        icon: "shield-check",
        title: "Reliable Commerce Architecture",
        text: "We only deploy and integrate proven platforms our engineering team actively supports. Every checkout flow is hardened for PCI-DSS compliance, data security, and high-concurrency peak sales.",
      },
      image: {
        src: "/assets/services-detail/ecommerce-services/ecommerce-platforms-graphic.png",
        width: 1536,
        height: 1024,
        alt: "GateXPay E-Commerce Services architecture diagram showing storefronts, payment gateways, inventory management, shipping, and growth analytics",
      },
    },
    process: {
      heading: {
        line1: "From Store Idea to",
        accent: "Live Commerce",
      },
      steps: [
        {
          icon: "scan-search",
          title: "Understand",
          text: "Define Your Commerce Goals — We assess your products, customer journey, target market, operational requirements, integrations, and existing digital infrastructure.",
        },
        {
          icon: "workflow",
          title: "Plan",
          text: "Choose the Right Commerce Stack — We define the platform, store architecture, product structure, payment flow, shipping setup, and required integrations.",
        },
        {
          icon: "code-xml",
          title: "Build",
          text: "Develop & Integrate — We configure or develop the storefront, product catalog, checkout, payment gateway, shipping, analytics, and supporting workflows.",
        },
        {
          icon: "rocket",
          title: "Launch",
          text: "Test, Go Live & Optimize — We test usability, checkout, payments, mobile responsiveness, integrations, and key store workflows before production launch.",
        },
      ],
    },
    faqs: [
      {
        q: "What are E-Commerce Services?",
        a: "E-commerce services help businesses create and operate online stores through storefront development, product catalog setup, payment integration, inventory management, shipping workflows, analytics, and digital growth support. GateXPay can help businesses connect these components into a practical online commerce ecosystem.",
      },
      {
        q: "Does GateXPay provide e-commerce website development?",
        a: "Yes. GateXPay can support e-commerce website development using suitable platforms such as Shopify, WooCommerce, or custom development depending on the business, product catalog, integrations, and scalability requirements.",
      },
      {
        q: "Can you integrate a payment gateway into an online store?",
        a: "Yes. We can integrate compatible payment gateway services into supported e-commerce platforms and custom stores. For more detail, explore our [Payment Gateway Integration Services](/services/payment-gateway-integration).",
      },
      {
        q: "Do you provide Shopify and WooCommerce development?",
        a: "Yes. GateXPay can assist with Shopify and WooCommerce store setup, theme configuration, product structure, payment integration, shipping setup, and compatible third-party integrations.",
      },
      {
        q: "Can you help improve an existing e-commerce website?",
        a: "Yes. Existing stores can be reviewed for usability, mobile responsiveness, checkout flow, payment integration, product organization, performance, analytics, and search visibility. For broader development requirements, see our [Web & App Development Services](/services/web-app-development).",
      },
      {
        q: "Do you provide SEO for e-commerce stores?",
        a: "Yes. E-commerce SEO can include technical optimization, category and product-page structure, metadata, internal linking, indexation review, content optimization, and performance measurement. For broader acquisition strategy, explore our [Digital Marketing Services](/services/digital-marketing-services).",
      },
    ],
    finalCta: {
      titleLead: "Ready to Build an E-Commerce Store",
      titleAccent: "That Can Grow?",
      description:
        "Create a responsive online storefront with secure payments, connected operations, scalable integrations, and customer-focused shopping experiences.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "Explore Digital Commerce Services",
        href: "/services",
      },
      features: [
        {
          icon: "shield-check",
          bold: "Secure Checkout",
          light: "Integrated payment workflows",
        },
        {
          icon: "layers",
          bold: "Flexible Platforms",
          light: "Shopify, WooCommerce & custom",
        },
        {
          icon: "trending-up",
          bold: "Growth Ready",
          light: "Built for expanding operations",
        },
      ],
    },
  },

  // 17. E-Commerce Solutions
  {
    slug: "e-commerce-solutions",
    categoryId: "retail-commerce",
    name: "E-Commerce Solutions",
    metaTitle: "E-Commerce Development Services | GateXPay",
    metaDescription:
      "Build scalable e-commerce websites with custom development, payment gateway integration, inventory management, mobile commerce and API integrations from GateXPay.",
    hero: {
      titleLead: "E-Commerce",
      titleAccent: "Solutions",
      description:
        "Build secure, scalable online stores with seamless payments, inventory management, order automation, mobile commerce, and customer-focused shopping experiences.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services",
      },
      image: {
        src: "/assets/services-detail/ecommerce-solutions/hero-ecommerce-solutions-illustration.png",
        width: 1536,
        height: 1024,
        alt: "GateXPay E-Commerce Solutions showing secure online storefront, mobile commerce, checkout and inventory automation",
      },
    },
    highlights: [
      {
        icon: "shopping-bag",
        title: "Conversion-Focused Commerce",
        subtitle: "Built to Turn Visitors Into Customers",
        text: "Built to Turn Visitors Into Customers — Create intuitive shopping journeys with responsive interfaces, streamlined checkout experiences, and customer-focused e-commerce functionality.",
      },
      {
        icon: "credit-card",
        title: "Secure Payment Integration",
        subtitle: "Make Checkout Simple",
        text: "Make Checkout Simple — Connect compatible payment gateways, UPI, cards, wallets, and transaction workflows through secure digital payment integrations.",
      },
      {
        icon: "trending-up",
        title: "Built for Growth",
        subtitle: "Scale Beyond Your First Store",
        text: "Scale Beyond Your First Store — Develop commerce infrastructure that can support expanding product catalogues, increasing orders, integrations, traffic, and customer demand.",
      },
    ],
    included: {
      heading: {
        line1: "What’s Included in Our",
        accent: "E-Commerce Solutions",
      },
      items: [
        {
          icon: "store",
          title: "E-Commerce Website\nDevelopment",
          text: "Build responsive, SEO-ready online stores designed around your products and customers. Explore our [Web & App Development](/services/web-app-development) services.",
        },
        {
          icon: "code-xml",
          title: "Custom Commerce\nDevelopment",
          text: "Develop custom storefronts, business workflows, features, and integrations around operational requirements.",
        },
        {
          icon: "credit-card",
          title: "Payment Gateway\nIntegration",
          text: "Connect compatible payment gateways, UPI, wallets, cards, and secure checkout workflows. Explore our [Payment Gateway Integration Services](/services/payment-gateway-integration) for more information.",
        },
        {
          icon: "package",
          title: "Order & Inventory\nManagement",
          text: "Synchronize products, stock, orders, fulfilment statuses, and operational data efficiently. Connect with [Shipping & Logistics Integration](/services/shipping-logistics-integration).",
        },
        {
          icon: "smartphone",
          title: "E-Commerce App\nDevelopment",
          text: "Create mobile commerce experiences for customers across supported Android and iOS environments.",
        },
        {
          icon: "network",
          title: "Commerce API\nIntegration",
          text: "Connect shipping, CRM, ERP, analytics, payment, marketplace, and third-party business systems. Learn more with our [API Integration Services](/services/api-integration).",
        },
      ],
    },
    showcase: {
      heading: { line1: "Platforms & Tools", accent: "We Master" },
      description:
        "We work with modern commerce platforms, development frameworks, payment technologies, cloud services, and analytics tools to build connected e-commerce ecosystems.",
      checklist: [
        { label: "Commerce Platforms" },
        { label: "Frontend & Application" },
        { label: "Backend & APIs" },
        { label: "Payments & Integrations" },
        { label: "Cloud & Analytics" },
      ],
      callout: {
        icon: "shield-check",
        title: "Production-Grade Commerce Stack",
        text: "We only deploy and integrate verified technologies GateXPay engineering actively supports. Every store is built with secure checkout flows, inventory synchronization, and performance monitoring.",
      },
      image: {
        src: "/assets/services-detail/ecommerce-solutions/ecommerce-solutions-platforms-graphic.png",
        width: 1536,
        height: 1024,
        alt: "GateXPay E-Commerce Solutions architecture showing platforms, frontend, backend APIs, payments, and cloud analytics",
      },
    },
    process: {
      heading: {
        line1: "From Commerce Idea to",
        accent: "Live Store",
      },
      steps: [
        {
          icon: "scan-search",
          title: "Understand",
          text: "Define Your Commerce Goals — We understand your products, customers, business model, operational workflows, integration requirements, and growth objectives.",
        },
        {
          icon: "workflow",
          title: "Plan",
          text: "Architect the Platform — We define storefront structure, user journeys, technology architecture, payment flows, integrations, inventory requirements, and development roadmap.",
        },
        {
          icon: "code-xml",
          title: "Build",
          text: "Develop & Integrate — Our team develops the commerce platform and connects payments, inventory, shipping, analytics, and supported third-party systems.",
        },
        {
          icon: "rocket",
          title: "Launch",
          text: "Test, Deploy & Optimize — We validate functionality, responsive behaviour, checkout flows, integrations, performance, and tracking before production deployment.",
        },
      ],
    },
    faqs: [
      {
        q: "What are E-Commerce Development Services?",
        a: "E-commerce development services involve designing, building, integrating, and maintaining digital platforms that enable businesses to sell products or services online. A modern e-commerce solution can include storefront development, product management, checkout, payment gateway integration, inventory management, order processing, shipping integrations, analytics, and customer account functionality.",
      },
      {
        q: "Does GateXPay develop custom e-commerce websites?",
        a: "Yes. GateXPay can develop customised e-commerce websites based on business requirements, customer journeys, product structures, payment needs, integrations, and operational workflows. Depending on the project, development may involve a commerce platform or a custom technology architecture. Explore our [Web & App Development](/services/web-app-development) services for more details.",
      },
      {
        q: "Do you provide Shopify and WooCommerce development?",
        a: "GateXPay can work with supported commerce platforms such as Shopify and WooCommerce where they are appropriate for the project. The recommended platform depends on catalogue size, required functionality, integrations, scalability needs, operational complexity, and long-term business goals.",
      },
      {
        q: "Can you integrate payment gateways into an online store?",
        a: "Yes. We can integrate compatible payment gateways and payment methods based on provider support and business requirements. This can include cards, UPI, wallets, payment status handling, transaction workflows, and supporting checkout integrations. Explore our [Payment Gateway Integration Services](/services/payment-gateway-integration) for more information.",
      },
      {
        q: "Can you integrate inventory and order management systems?",
        a: "Yes. We can connect compatible inventory, warehouse, ERP, order management, and fulfilment systems using available APIs or other supported integration methods. This helps businesses reduce manual updates and maintain better visibility across products, stock, orders, and fulfilment. Explore our [Shipping & Logistics Integration](/services/shipping-logistics-integration) solutions.",
      },
      {
        q: "Are your e-commerce websites mobile-friendly?",
        a: "Yes. Responsive design should be a standard requirement for modern e-commerce development. We design storefront experiences to work across commonly used desktop, tablet, and mobile screen sizes while maintaining usable navigation, product discovery, and checkout journeys.",
      },
    ],
    finalCta: {
      titleLead: "Ready to Build an E-Commerce",
      titleAccent: "Platform That Can Grow?",
      description:
        "Launch a secure, scalable commerce experience with integrated payments, order management, inventory, analytics, and customer-focused digital journeys.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "Explore Technology Services",
        href: "/services",
      },
      features: [
        {
          icon: "shield-check",
          bold: "Secure Checkout",
          light: "Integrated payment workflows",
        },
        {
          icon: "workflow",
          bold: "Flexible Integrations",
          light: "Connect business systems",
        },
        {
          icon: "layers",
          bold: "Scalable Commerce",
          light: "Built for growing operations",
        },
      ],
    },
  },


  // 18. E-Governance Services
  {
    slug: "e-governance-services",
    categoryId: "citizen-identity",
    name: "E-Governance Services",
    metaTitle: "E-Governance Services & Certificate Assistance | GateXPay",
    metaDescription:
      "Access E-Governance services through GateXPay CSP assistance for certificates, digital identity, DigiLocker, government schemes and supported citizen services.",
    hero: {
      titleLead: "E-Governance",
      titleAccent: "Services",
      description:
        "Access government certificates, digital services, scheme assistance, and identity-related support through guided E-Governance services at participating GateXPay CSP locations.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: { text: "View Similar Services", href: "/services#citizen-identity" },
      image: {
        src: "/assets/services-detail/e-governance/hero-e-governance-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of E-Governance services, digital citizen portal access, and government certificates",
      },
    },
    highlights: [
      {
        icon: "handshake",
        title: "Guided Assistance",
        text: "Support at Every Step — Get help understanding application requirements, preparing documents, and completing eligible digital government service requests.",
      },
      {
        icon: "shield-check",
        title: "Secure Document Handling",
        text: "Privacy-Focused Support — Documents and personal information are handled carefully during supported application and verification processes.",
      },
      {
        icon: "building-2",
        title: "Accessible CSP Network",
        text: "Government Services Made Easier — Access assisted digital services through participating Customer Service Points, including support for citizens who prefer in-person guidance.",
      },
    ],
    included: {
      heading: { line1: "What's Included in", accent: "E-Governance Services" },
      items: [
        {
          icon: "file-text",
          title: "Certificate Application\\nAssistance",
          text: "Get support for eligible birth, death, income, caste, domicile, and residence certificate applications through official portals.",
        },
        {
          icon: "building-2",
          title: "Government Scheme\\nAssistance",
          text: "Receive guided support for eligible government welfare schemes and benefit-related application processes. Learn more about our [Government Scheme Services](/services/pension-government-schemes).",
        },
        {
          icon: "user-check",
          title: "Digital Identity\\nServices",
          text: "Get assistance with supported [Aadhaar Services](/services/aadhaar-services), e-KYC processes, and digital identity requirements.",
        },
        {
          icon: "database",
          title: "DigiLocker\\nAssistance",
          text: "Receive help creating, accessing, and using DigiLocker for eligible digital documents and verified credentials.",
        },
        {
          icon: "workflow",
          title: "PAN & Aadhaar\\nLinking Support",
          text: "Get guided assistance with supported PAN and Aadhaar linking or verification-related processes. Explore our [PAN Card Services](/services/pan-card-services) for additional support.",
        },
        {
          icon: "scan-search",
          title: "Application Status\\nSupport",
          text: "Get help understanding application status, acknowledgements, required actions, and available next steps. Financial benefits can be withdrawn via [AEPS Services](/services/aeps-services) and [Micro ATM Services](/services/micro-atm-services).",
        },
      ],
    },
    showcase: {
      heading: { line1: "Have Your Documents", accent: "Ready" },
      description:
        "Required documents vary by service, state, scheme, and applicant category. Keep original and supporting documents available where applicable.",
      checklist: [
        {
          label: "Aadhaar Card",
          detail: "Primary identity and address document for e-Governance filings. Need updates? Explore [Aadhaar Services](/services/aadhaar-services).",
        },
        {
          label: "Valid Government-Issued Identity Proof",
          detail: "Voter ID, Passport, Driving Licence, or verified [PAN Card](/services/pan-card-services).",
        },
        {
          label: "Proof of Address",
          detail: "Electricity bill, ration card, domicile certificate, or registered rent agreement.",
        },
        {
          label: "Passport-Size Photograph",
          detail: "Recent standard passport-size photograph where physical verification or forms require them.",
        },
        {
          label: "Mobile Number Linked to Applicable Services",
          detail: "Active mobile number for receiving portal OTPs, application updates, and notifications.",
        },
        {
          label: "Supporting Certificate or Eligibility Documents",
          detail: "Previous educational certificates, land records, or family documents for caste/income verification.",
        },
        {
          label: "Previous Certificate or Application Reference",
          detail: "Existing certificate number or acknowledgement receipt for renewals or corrections, if applicable.",
        },
        {
          label: "Scheme-Specific Documents",
          detail: "Target beneficiary proofs for welfare programs. See [Government Scheme Services](/services/pension-government-schemes).",
        },
      ],
      callout: {
        title: "Applying for a Certificate?",
        text: "For birth, income, caste, domicile, or other certificate services, additional documents may be required depending on your state, issuing authority, and application type. Need help with your documents? [Get Assistance](/contact)",
        icon: "lightbulb",
      },
      image: {
        src: "/assets/services-detail/e-governance/document-verification-graphic.png",
        width: 1536,
        height: 1024,
        alt: "Required documents checklist graphic for E-Governance certificate and digital services assistance",
      },
    },
    process: {
      heading: { line1: "From Document Submission to", accent: "Digital Government Services" },
      steps: [
        {
          icon: "map-pin",
          title: "Visit a CSP Service Point",
          text: "Visit a participating GateXPay Customer Service Point and explain the government service, certificate, or application assistance you require.",
        },
        {
          icon: "file-text",
          title: "Provide Required Documents",
          text: "Share the applicable identity, address, eligibility, and supporting documents required for the selected service.",
        },
        {
          icon: "workflow",
          title: "Complete Digital Application",
          text: "Our service team assists with entering details, uploading applicable documents, and submitting the request through the appropriate supported channel.",
        },
        {
          icon: "rocket",
          title: "Receive Status or Confirmation",
          text: "Use available acknowledgement or reference details to follow the application status and receive further instructions or confirmation.",
        },
      ],
    },
    faqs: [
      {
        q: "What are E-Governance Services?",
        a: "E-Governance Services are digitally enabled government services that allow citizens to access information, submit applications, obtain certificates, and use public services through online or assisted channels. GateXPay CSP locations can provide assistance for selected services where applicable.",
      },
      {
        q: "What E-Governance services can GateXPay assist with?",
        a: "Depending on availability and applicable government portals, assistance may include certificate applications, digital identity-related services, DigiLocker support, government scheme applications, PAN-Aadhaar-related assistance, and other supported citizen services. Availability may vary by location and government authority.",
      },
      {
        q: "Can I apply for a birth certificate online through a CSP?",
        a: "Where the relevant government authority provides an online application facility and the service is supported at the CSP, GateXPay can assist with document preparation and the digital application process. Issuance, approval, and processing are handled by the applicable government authority.",
      },
      {
        q: "Can I get help with an income, caste, or domicile certificate?",
        a: "Yes, assistance may be available for eligible income certificate, caste certificate, domicile certificate, and residence certificate applications. Requirements differ by state and applicant category, so supporting documents should be verified before submission. You can also consult our [PAN Card Services](/services/pan-card-services) and [Aadhaar Services](/services/aadhaar-services) for identity verification.",
      },
      {
        q: "Are E-Governance services available at every GateXPay CSP?",
        a: "Service availability can vary by CSP location, state, government portal, and applicable authorization. It is best to confirm whether the required service is available before visiting a specific service point.",
      },
      {
        q: "What documents are required for E-Governance services?",
        a: "Common requirements may include Aadhaar, identity proof, address proof, photographs, mobile number, and service-specific supporting documents. Exact documentation depends on the government service, state, scheme, and issuing authority. For financial assistance schemes, explore our [Pension & Government Scheme Assistance](/services/pension-government-schemes).",
      },
    ],
    finalCta: {
      titleLead: "Need Help Accessing",
      titleAccent: "Digital Government Services?",
      description:
        "Get guided support for eligible certificate applications, digital identity services, government schemes, and other supported E-Governance services through GateXPay CSP assistance. You can also [contact GateXPay](/contact) directly to discuss your requirements.",
      ctaLabel: "Find Assistance",
      secondaryAction: {
        text: "Explore CSP Services",
        href: "/services#citizen-identity",
      },
      features: [
        { icon: "handshake", bold: "Guided Support", light: "Help with applications & docs" },
        { icon: "building-2", bold: "Accessible Services", light: "Participating CSP network" },
        { icon: "shield-check", bold: "Process Clarity", light: "Clear requirements upfront" },
      ],
    },
  },

  // 19. Pension & Government Scheme Assistance
  {
    slug: "pension-government-schemes",
    categoryId: "citizen-identity",
    name: "Pension & Government Scheme Assistance",
    metaTitle: "Pension & Government Scheme Assistance Services | GateXPay",
    metaDescription:
      "Get assistance with pension schemes, APY, NPS, PM-Kisan and government welfare services through GateXPay CSP support for documents and applications.",
    hero: {
      titleLead: "Pension & Government Scheme",
      titleAccent: "Assistance",
      description:
        "Get guided assistance for pension, farmer, healthcare, and government welfare schemes through document support, eligibility guidance, and application facilitation.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: { text: "View Similar Services", href: "/services#citizen-identity" },
      image: {
        src: "/assets/services-detail/pension-governance/hero-pension-governance-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of pension and government welfare scheme assistance, document support, and citizen services",
      },
    },
    highlights: [
      {
        icon: "handshake",
        title: "Guided Application Support",
        text: "Help at Every Step — Get assistance with scheme information, document preparation, application submission steps, and status-related guidance through GateXPay CSP services.",
      },
      {
        icon: "shield-check",
        title: "Secure Document Handling",
        text: "Privacy-Focused Assistance — Applicant documents and personal information are handled carefully during verification, application support, and permitted service processes.",
      },
      {
        icon: "layers",
        title: "Multiple Scheme Categories",
        text: "Access Relevant Welfare Services — Receive assistance across eligible pension, farmer, healthcare, financial inclusion, and government welfare schemes from one service point.",
      },
    ],
    included: {
      heading: { line1: "What's Included in", accent: "Pension & Government Scheme Services" },
      items: [
        {
          icon: "user-check",
          title: "Pension Scheme\\nAssistance",
          text: "Get guidance for eligible pension schemes, enrollment requirements, documentation, and application procedures. Need identity verification? Explore our [Aadhaar Services](/services/aadhaar-services) and [PAN Card Services](/services/pan-card-services).",
        },
        {
          icon: "shield-check",
          title: "Atal Pension Yojana\\nSupport",
          text: "Receive assistance understanding APY enrollment requirements, documentation, account details, and applicable procedures.",
        },
        {
          icon: "landmark",
          title: "NPS\\nAssistance",
          text: "Get support with National Pension System information, documentation, registration guidance, and related service requests.",
        },
        {
          icon: "droplets",
          title: "Farmer Scheme\\nAssistance",
          text: "Access guidance for schemes such as PM-Kisan and other eligible agricultural welfare programs.",
        },
        {
          icon: "activity",
          title: "Healthcare Scheme\\nSupport",
          text: "Receive assistance with applicable healthcare welfare schemes, beneficiary documentation, and application-related requirements.",
        },
        {
          icon: "building-2",
          title: "Government Welfare\\nSchemes",
          text: "Get guidance on eligible social security, financial inclusion, housing, and government welfare programs. Benefit payments can be accessed via [AEPS Services](/services/aeps-services) and [Micro ATM Services](/services/micro-atm-services).",
        },
      ],
    },
    showcase: {
      heading: { line1: "Have Your Documents", accent: "Ready" },
      description:
        "Document requirements vary by scheme, applicant category, eligibility criteria, and government guidelines. Keeping commonly requested documents ready can make the application process smoother. Exact documents depend on the selected government scheme and current eligibility rules. Additional documentation may be requested by the relevant authority.",
      checklist: [
        {
          label: "Aadhaar Card",
          detail: "Valid identification and identity proof for scheme registration. Need updates? Explore our [Aadhaar Services](/services/aadhaar-services).",
        },
        {
          label: "Aadhaar-linked Mobile Number",
          detail: "Required for receiving official authentication OTPs and scheme status alerts.",
        },
        {
          label: "Active Bank Account Details",
          detail: "Required for Direct Benefit Transfer (DBT) and pension disbursements.",
        },
        {
          label: "Bank Passbook or Cancelled Cheque",
          detail: "Documentary verification of account holder name, account number, and IFSC code.",
        },
        {
          label: "Passport-Size Photograph",
          detail: "Recent standard photographs for physical or digital application records.",
        },
        {
          label: "Age or Date-of-Birth Proof",
          detail: "Birth certificate, school certificate, or valid [PAN Card](/services/pan-card-services) for age verification.",
        },
        {
          label: "Address Proof",
          detail: "Proof of residence confirming local jurisdiction or state domicile eligibility.",
        },
        {
          label: "Income Certificate",
          detail: "Official revenue authority certificate where scheme eligibility is income-linked.",
        },
        {
          label: "Category or Eligibility Certificate",
          detail: "Social category, disability, or target beneficiary certificate where applicable.",
        },
        {
          label: "Farmer or Land-Related Documents",
          detail: "Land records, Khasra/Khatauni, or farmer identification where applicable for agricultural schemes.",
        },
      ],
      callout: {
        title: "Need Help With Your Documents?",
        text: "Our CSP support team can help you understand which documents may be required for your selected service before application. [Get Assistance](/contact)",
        icon: "lightbulb",
      },
      image: {
        src: "/assets/services-detail/pension-governance/document-verification-graphic.png",
        width: 1536,
        height: 1024,
        alt: "Checklist graphic of required documents for pension and government welfare scheme assistance",
      },
    },
    process: {
      heading: { line1: "From Scheme Eligibility to", accent: "Submitted Application" },
      steps: [
        {
          icon: "scan-search",
          title: "Understand Scheme Eligibility",
          text: "We help identify the relevant scheme requirements, applicant category, eligibility conditions, and commonly required documents.",
        },
        {
          icon: "file-text",
          title: "Arrange Required Documents",
          text: "Our team guides applicants in preparing the available identity, bank, income, age, or scheme-specific supporting documents.",
        },
        {
          icon: "workflow",
          title: "Application Assistance",
          text: "We assist with applicable digital application processes and submission steps through supported and permitted channels.",
        },
        {
          icon: "rocket",
          title: "Follow Application Progress",
          text: "Get assistance understanding available application status updates, pending requirements, or next steps where tracking facilities are provided.",
        },
      ],
    },
    faqs: [
      {
        q: "What are Pension & Government Scheme Assistance Services?",
        a: "Pension and government scheme assistance services help eligible citizens understand scheme requirements, prepare documents, navigate application procedures, and access available support channels. GateXPay provides facilitation and application-related assistance through its CSP service network. Final eligibility and approval remain subject to the rules of the relevant government scheme or authority.",
      },
      {
        q: "Which government schemes can GateXPay assist with?",
        a: "Depending on service availability and applicable procedures, assistance may include pension and welfare-related programs such as Atal Pension Yojana (APY), National Pension System (NPS), PM-Kisan related services, healthcare welfare schemes, financial inclusion programs, and other eligible central or state schemes. Availability can vary by scheme, jurisdiction, applicant eligibility, and supported service channel.",
      },
      {
        q: "Can GateXPay help with Atal Pension Yojana?",
        a: "GateXPay can provide application-related guidance for eligible users seeking information or assistance regarding Atal Pension Yojana procedures, documentation, and enrollment requirements. The scheme itself is governed by the applicable official authority, and participation is subject to current eligibility and contribution rules. Connected banking details can be arranged via supported [banking services](/services/core-banking-services).",
      },
      {
        q: "What documents are required for government scheme applications?",
        a: "Common documents may include Aadhaar, mobile number, bank account details, photographs, address proof, age proof, income certificates, and scheme-specific eligibility documents. The exact requirements vary by government scheme, so applicants should verify the current checklist before submission. For identity document support, explore our [Aadhaar Services](/services/aadhaar-services) and [PAN Card Services](/services/pan-card-services).",
      },
      {
        q: "Can farmers get assistance with PM-Kisan related services?",
        a: "Eligible farmers may receive guidance with applicable PM-Kisan-related documentation, registration procedures, beneficiary information, or service requirements where such assistance is supported. Final eligibility and benefit approval are determined through the applicable government process. Beneficiaries can also access cash withdrawal support through our [Micro ATM Services](/services/micro-atm-services).",
      },
      {
        q: "Does GateXPay guarantee approval or government benefits?",
        a: "No. GateXPay provides assistance and facilitation services only. Eligibility, application acceptance, benefit amount, approval, timelines, and continued participation are determined by the relevant government department, scheme authority, or authorized platform.",
      },
    ],
    finalCta: {
      titleLead: "Need Help Accessing",
      titleAccent: "Government Scheme Services?",
      description:
        "Get guided support for pension, farmer, healthcare, and welfare scheme applications, documentation, and service-related procedures through GateXPay CSP assistance. You can also [contact GateXPay](/contact) directly to discuss your requirements.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "Explore Citizen Services",
        href: "/services#citizen-identity",
      },
      features: [
        { icon: "handshake", bold: "Guided Support", light: "Understand each step clearly" },
        { icon: "file-text", bold: "Document Assistance", light: "Prepare the right information" },
        { icon: "layers", bold: "Multiple Services", light: "Access support through one network" },
      ],
    },
  },

  // 20. Web & App Development
  {
    slug: "web-app-development",
    categoryId: "enterprise-tech",
    name: "Web & App Development",
    metaTitle: "Web & App Development Services | GateXPay",
    metaDescription:
      "Build scalable websites, web applications and mobile apps with GateXPay’s custom development, e-commerce, API integration and cloud-ready solutions.",
    hero: {
      titleLead: "Build Fast, Secure, Scalable Websites & Mobile Applications That",
      titleAccent: "Drive Business Growth",
      description:
        "Build fast, secure, scalable websites and mobile applications designed around your business goals, customer journeys, integrations, and future growth.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: { text: "View Similar Services", href: "/services" },
      image: {
        src: "/assets/services-detail/web-app-development/hero-web-app-development-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of web and mobile software development ecosystem",
      },
    },
    highlights: [
      {
        icon: "target",
        title: "Business-Focused Development",
        text: "Built Around Real Goals — We design digital products around your users, workflows, integrations, performance needs, and measurable business objectives.",
      },
      {
        icon: "cpu",
        title: "Modern Technology Stack",
        text: "Built for Performance & Scale — Develop with proven frontend, backend, mobile, database, and cloud technologies selected for your product requirements.",
      },
      {
        icon: "rocket",
        title: "End-to-End Delivery",
        text: "From Planning to Launch — Cover strategy, UI/UX, development, integrations, testing, deployment, and post-launch technical support within one delivery process.",
      },
    ],
    included: {
      heading: {
        line1: "What's Included in Our",
        accent: "Web & App Development Services",
      },
      items: [
        {
          icon: "globe",
          title: "Website\nDevelopment",
          text: "Build responsive business websites, corporate platforms, landing pages, and content-driven digital experiences.",
        },
        {
          icon: "smartphone",
          title: "Mobile App\nDevelopment",
          text: "Develop Android, iOS, and cross-platform applications with intuitive, reliable user experiences.",
        },
        {
          icon: "layout-dashboard",
          title: "Custom Web\nApplications",
          text: "Create scalable portals, dashboards, CRM systems, workflow tools, and custom business applications.",
        },
        {
          icon: "shopping-cart",
          title: "E-Commerce\nDevelopment",
          text: "Build online stores with product management, ordering, payments, inventory, and customer journeys. Explore our [E-Commerce Solutions](/services/ecommerce-solutions).",
        },
        {
          icon: "network",
          title: "API & System\nIntegration",
          text: "Connect payment gateways, third-party APIs, databases, platforms, and existing business systems securely. Explore [Payment Gateway Integration](/services/payment-gateway-integration) and [Shipping & Logistics Integration](/services/shipping-logistics-integration).",
        },
        {
          icon: "cloud",
          title: "Cloud-Ready\nDevelopment",
          text: "Design applications for scalable deployment, reliable performance, data synchronization, and future expansion. Seamlessly connect with [Business Automation](/services/business-automation).",
        },
      ],
    },
    showcase: {
      heading: { line1: "Platforms & Tools", accent: "We Master" },
      description:
        "We work across modern frontend, backend, mobile, database, cloud, and integration technologies to build maintainable, scalable digital products.",
      checklist: [
        {
          label: "Frontend",
          detail: "React.js, Next.js, JavaScript, HTML5, CSS3",
        },
        {
          label: "Backend",
          detail: "Node.js, Express.js, PHP, Laravel, Python",
        },
        {
          label: "Mobile",
          detail: "Flutter, Android Development, iOS Development",
        },
        {
          label: "Database & Cloud",
          detail: "MySQL, MongoDB, Firebase, Cloud Infrastructure",
        },
        {
          label: "Integrations",
          detail: "REST APIs, Payment Gateways, Third-Party APIs, Webhooks",
        },
      ],
      callout: {
        icon: "code-xml",
        title: "Production-Tested Architecture",
        text: "We only display and build with technologies our team actively masters. Every stack choice prioritizes maintainability, security, and scalability for your business without compromising long-term support.",
      },
      image: {
        src: "/assets/services-detail/web-app-development/web-dev-platforms-graphic.png",
        width: 1024,
        height: 768,
        alt: "GateXPay Web and App Development technology ecosystem illustration showing frontend, backend, mobile, cloud and API integrations",
      },
    },
    process: {
      heading: { line1: "From Concept & Discovery to", accent: "Production Launch" },
      steps: [
        {
          icon: "scan-search",
          title: "Discover",
          text: "Understand Your Requirements — We define business goals, users, functionality, integrations, technical constraints, timelines, and success criteria before development begins.",
        },
        {
          icon: "workflow",
          title: "Design",
          text: "Plan UI/UX & Architecture — We structure user journeys, interface requirements, application architecture, data flows, integrations, and core technical components.",
        },
        {
          icon: "code-xml",
          title: "Develop",
          text: "Build & Integrate — Our team develops the application, connects required APIs and systems, and iteratively validates functionality throughout implementation.",
        },
        {
          icon: "rocket",
          title: "Launch",
          text: "Test, Deploy & Support — We perform functional, responsive, integration, performance, and deployment checks before launching the completed digital product.",
        },
      ],
    },
    faqs: [
      {
        q: "What are Web & App Development Services?",
        a: "Web and app development services cover the planning, design, development, integration, deployment, and maintenance of websites, web applications, and mobile applications. GateXPay develops digital solutions based on business requirements, user needs, technical integrations, performance goals, and scalability requirements.",
      },
      {
        q: "Does GateXPay develop both websites and mobile applications?",
        a: "Yes. GateXPay can develop responsive websites, web applications, Android and iOS applications, and cross-platform mobile apps depending on the project's requirements. For businesses needing connected transaction functionality, we can also support [Payment Gateway Integration](/services/payment-gateway-integration).",
      },
      {
        q: "Can you develop custom web applications?",
        a: "Yes. We can build custom web applications such as business portals, operational dashboards, CRM interfaces, workflow systems, customer platforms, analytics tools, and other requirement-specific solutions. Unlike template-based websites, custom web application development is structured around your particular workflows and integrations.",
      },
      {
        q: "Do you provide e-commerce website development?",
        a: "Yes. We can develop e-commerce websites with product catalogues, shopping carts, customer accounts, order management, payment integration, inventory connectivity, and other required functionality. Explore our [E-Commerce Solutions](/services/ecommerce-solutions) for related commerce services.",
      },
      {
        q: "What technologies does GateXPay use for development?",
        a: "Depending on the project, our technology stack can include React.js, Next.js, JavaScript, Node.js, Express.js, PHP, Laravel, Python, Flutter, MySQL, MongoDB, Firebase, REST APIs, and cloud infrastructure. The final stack should be selected according to performance, scalability, integration, security, maintenance, and business requirements rather than technology trends alone.",
      },
      {
        q: "Are GateXPay websites SEO-friendly?",
        a: "We can implement development practices that support technical SEO, including responsive layouts, semantic HTML, crawlable site structures, performance optimization, metadata implementation, structured internal linking, and other search-friendly technical foundations. SEO rankings cannot be guaranteed because rankings also depend on content quality, authority, competition, backlinks, search intent, and ongoing optimization.",
      },
    ],
    finalCta: {
      titleLead: "Ready to Build Your Next",
      titleAccent: "Digital Product?",
      description:
        "Turn your idea into a scalable website, mobile app, e-commerce platform, or custom digital solution built around your business requirements.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "Explore Technology Services",
        href: "/services",
      },
      features: [
        {
          icon: "layers",
          bold: "Modern Development",
          light: " — Current, maintainable technologies",
        },
        {
          icon: "network",
          bold: "Integration Ready",
          light: " — Connect APIs and business systems",
        },
        {
          icon: "shield-check",
          bold: "Built to Scale",
          light: " — Architecture designed for growth",
        },
      ],
    },
  },

  // 21. IT & Cloud Services
  {
    slug: "it-cloud-services",
    categoryId: "enterprise-tech",
    name: "IT & Cloud Services",
    metaTitle: "IT & Cloud Services | Managed Cloud Solutions | GateXPay",
    metaDescription:
      "Build secure, scalable cloud infrastructure with GateXPay IT & Cloud Services, including migration, DevOps, cloud security, monitoring and managed IT support.",
    hero: {
      titleLead: "Build Secure, Scalable Cloud Infrastructure With",
      titleAccent: "Expert Managed IT Services",
      description:
        "Build secure, scalable cloud infrastructure with expert migration, DevOps, security, monitoring, and managed IT services tailored to your business.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: { text: "View Similar Services", href: "/services" },
      image: {
        src: "/assets/services-detail/it-cloud/hero-it-cloud-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of enterprise IT and cloud infrastructure management",
      },
    },
    highlights: [
      {
        icon: "cloud",
        title: "Cloud-Ready Infrastructure",
        text: "Built to Scale with Your Business — Design flexible cloud environments that support growing applications, workloads, users, data, and evolving business requirements.",
      },
      {
        icon: "shield-check",
        title: "Secure by Design",
        text: "Protect Systems and Data — Strengthen cloud environments through access controls, encryption, network security, monitoring, backup, and structured security practices.",
      },
      {
        icon: "trending-up",
        title: "Continuous Optimization",
        text: "Improve Performance Over Time — Monitor infrastructure health, automate deployments, optimize resource usage, and improve reliability as your technology environment evolves.",
      },
    ],
    included: {
      heading: {
        line1: "What's Included in Our",
        accent: "IT & Cloud Services",
      },
      items: [
        {
          icon: "cloud",
          title: "Cloud Consulting\n& Architecture",
          text: "Plan scalable cloud environments aligned with business, application, security, and performance requirements.",
        },
        {
          icon: "refresh-cw",
          title: "Cloud Migration\nServices",
          text: "Move compatible applications, workloads, databases, and infrastructure to modern cloud environments.",
        },
        {
          icon: "code-xml",
          title: "DevOps & CI/CD\nAutomation",
          text: "Automate builds, testing, deployment, infrastructure provisioning, and application delivery workflows. Seamlessly connect with [Business Automation](/services/business-automation).",
        },
        {
          icon: "shield-check",
          title: "Cloud Security\nServices",
          text: "Strengthen cloud environments with identity controls, encryption, network security, and monitoring. Explore our [Cybersecurity Services](/services/cybersecurity).",
        },
        {
          icon: "database",
          title: "Backup & Disaster\nRecovery",
          text: "Protect critical workloads through structured backup, redundancy, recovery planning, and restoration processes.",
        },
        {
          icon: "headphones",
          title: "Managed IT &\nCloud Support",
          text: "Monitor, maintain, troubleshoot, patch, and optimize cloud and IT infrastructure continuously. Connect with [Web & App Development](/services/web-app-development) and [API Integration Services](/services/api-integration).",
        },
      ],
    },
    showcase: {
      heading: { line1: "Platforms & Tools", accent: "We Master" },
      description:
        "We work across leading cloud, DevOps, infrastructure, monitoring, security, and automation technologies to build reliable environments around your business requirements.",
      checklist: [
        {
          label: "Cloud Platforms",
          detail: "Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP) — Compute, virtual machines, serverless, managed databases, storage, and scalable infrastructure",
        },
        {
          label: "DevOps & Automation",
          detail: "Docker, Kubernetes, Terraform, Jenkins, GitHub Actions — Containerization, workload orchestration, Infrastructure as Code, and automated CI/CD pipelines",
        },
        {
          label: "Monitoring & Infrastructure",
          detail: "Grafana, AWS CloudWatch, Linux, Windows Server — Real-time telemetry dashboards, operational visibility, and high-availability enterprise server administration",
        },
        {
          label: "Security & Networking",
          detail: "Cloudflare, IAM, SSL/TLS, VPN & Firewalls — DNS management, content delivery, encrypted data in transit, traffic protection, and perimeter access controls",
        },
      ],
      callout: {
        icon: "shield-check",
        title: "Production-Grade Engineering",
        text: "We only display and build with technologies our technical team actively deploys and manages. Every architecture decision prioritizes uptime, data protection, and enterprise compliance.",
      },
      image: {
        src: "/assets/services-detail/it-cloud/it-cloud-platforms-graphic.png",
        width: 1536,
        height: 1024,
        alt: "GateXPay IT and Cloud Services architecture diagram showing cloud platforms, DevOps automation, telemetry monitoring, and perimeter security",
      },
    },
    process: {
      heading: {
        line1: "From Legacy Infrastructure to",
        accent: "Optimized Cloud",
      },
      steps: [
        {
          icon: "scan-search",
          title: "Assess",
          text: "Audit Your Infrastructure — We review applications, servers, databases, network architecture, security controls, workloads, dependencies, and current operational challenges.",
        },
        {
          icon: "workflow",
          title: "Architect",
          text: "Design the Cloud Environment — We define cloud architecture, infrastructure components, security controls, migration strategy, automation requirements, and recovery planning.",
        },
        {
          icon: "code-xml",
          title: "Migrate & Automate",
          text: "Deploy Your Infrastructure — We configure cloud resources, migrate compatible workloads, implement DevOps automation, and integrate monitoring and security controls.",
        },
        {
          icon: "rocket",
          title: "Monitor & Optimize",
          text: "Maintain Performance — We monitor infrastructure, resolve operational issues, optimize resources, manage updates, and support changing business requirements.",
        },
      ],
    },
    faqs: [
      {
        q: "What are IT & Cloud Services?",
        a: "IT and cloud services include the planning, deployment, migration, management, security, monitoring, and optimization of digital infrastructure. They can include cloud computing, managed IT services, DevOps, backup and disaster recovery, cloud security, and infrastructure support.",
      },
      {
        q: "Which cloud platforms does GateXPay work with?",
        a: "GateXPay can support cloud environments built on platforms such as Amazon Web Services, Microsoft Azure, and Google Cloud Platform, depending on project requirements and technical scope. The recommended platform depends on factors such as application architecture, workload requirements, security needs, scalability, integrations, and budget.",
      },
      {
        q: "Can GateXPay help migrate existing systems to the cloud?",
        a: "Yes. We can assess compatible applications and infrastructure, plan the migration architecture, configure cloud resources, migrate workloads, test the environment, and support deployment. For complex systems, migrations may be completed in stages to reduce operational risk.",
      },
      {
        q: "Do you provide managed IT services?",
        a: "Yes. Managed IT services can include infrastructure monitoring, system maintenance, troubleshooting, performance optimization, patch management, backup oversight, and ongoing technical support based on the agreed service scope.",
      },
      {
        q: "How do you secure cloud infrastructure?",
        a: "Cloud security can include identity and access management, network segmentation, encryption, firewall configuration, secure connectivity, monitoring, logging, vulnerability management, backup, and recovery controls. Security architecture should always be tailored to the system, data sensitivity, threat profile, and applicable compliance requirements. Explore our [Cybersecurity Services](/services/cybersecurity) for dedicated protection.",
      },
      {
        q: "Can you implement DevOps and CI/CD pipelines?",
        a: "Yes. GateXPay can implement CI/CD workflows using technologies such as GitHub Actions, Jenkins, Docker, Kubernetes, and Terraform where appropriate. These workflows can automate testing, infrastructure provisioning, deployment, and application release processes. Learn how this pairs with [Business Automation](/services/business-automation).",
      },
    ],
    finalCta: {
      titleLead: "Ready to Modernize Your",
      titleAccent: "IT Infrastructure?",
      description:
        "Build secure, scalable cloud environments with expert migration, DevOps automation, infrastructure management, security, monitoring, and ongoing technical support.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "Explore Technology Services",
        href: "/services",
      },
      features: [
        {
          icon: "cloud",
          bold: "Cloud Expertise",
          light: " — Modern infrastructure architecture",
        },
        {
          icon: "shield-check",
          bold: "Security Focused",
          light: " — Controls built into deployment",
        },
        {
          icon: "layers",
          bold: "Built to Scale",
          light: " — Infrastructure that grows with demand",
        },
      ],
    },
  },

  // 22. Business Automation
  {
    slug: "business-automation",
    categoryId: "enterprise-tech",
    name: "Business Automation",
    metaTitle: "Business Automation Services & Workflow Automation | GateXPay",
    metaDescription:
      "Automate workflows, CRM, operations, reporting and business processes with GateXPay’s scalable business automation, API integration and cloud solutions.",
    hero: {
      titleLead: "Automate Repetitive Workflows & Build Scalable",
      titleAccent: "Digital Operations",
      description:
        "Automate repetitive workflows, connect business systems, reduce manual effort, and build scalable digital operations with tailored business automation solutions.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: { text: "View Similar Services", href: "/services" },
      image: {
        src: "/assets/services-detail/business-automation/hero-business-automation-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of business process workflow automation and system integration",
      },
    },
    highlights: [
      {
        icon: "workflow",
        title: "Smarter Workflows",
        text: "Reduce Repetitive Manual Tasks — Automate approvals, notifications, data movement, recurring tasks, and operational workflows across connected business systems.",
      },
      {
        icon: "network",
        title: "Connected Operations",
        text: "Bring Systems Together — Integrate CRM, ERP, billing, inventory, communication, databases, and third-party applications into coordinated digital workflows.",
      },
      {
        icon: "trending-up",
        title: "Built to Scale",
        text: "Automation That Grows With You — Design flexible automation infrastructure that can support increasing users, transactions, processes, departments, and operational complexity.",
      },
    ],
    included: {
      heading: {
        line1: "What's Included in Our",
        accent: "Business Automation Services",
      },
      items: [
        {
          icon: "workflow",
          title: "Workflow\nAutomation",
          text: "Automate approvals, tasks, notifications, routing, and repetitive business processes across teams.",
        },
        {
          icon: "user-check",
          title: "CRM\nAutomation",
          text: "Streamline lead management, follow-ups, customer communication, sales workflows, and service processes.",
        },
        {
          icon: "settings",
          title: "Operations\nAutomation",
          text: "Automate inventory, billing, reporting, employee processes, and routine operational activities. Seamlessly connect with [Shipping & Logistics Integration](/services/shipping-logistics-integration).",
        },
        {
          icon: "network",
          title: "System\nIntegration",
          text: "Connect business applications, databases, APIs, and platforms for seamless information exchange. Explore our [API Integration Services](/services/api-integration).",
        },
        {
          icon: "cloud",
          title: "Cloud\nAutomation",
          text: "Build scalable cloud workflows, scheduled processes, synchronization, monitoring, and automated digital operations. Learn more with our [IT & Cloud Services](/services/it-cloud-services).",
        },
        {
          icon: "bar-chart-3",
          title: "Reporting &\nAnalytics",
          text: "Turn operational data into automated reports, dashboards, alerts, and actionable business insights. Explore [Web & App Development](/services/web-app-development) for custom operational dashboards.",
        },
      ],
    },
    showcase: {
      heading: { line1: "Platforms & Tools", accent: "We Master" },
      description:
        "We build automation around your existing technology stack using modern development frameworks, APIs, cloud platforms, databases, and workflow technologies.",
      checklist: [
        {
          label: "Node.js & Python",
          detail: "Backend services, data processing, scripting, automation logic, and system integrations",
        },
        {
          label: "React.js & Web Portals",
          detail: "Operational dashboards, workflow monitoring, and intuitive automation interfaces",
        },
        {
          label: "Laravel & PHP",
          detail: "Enterprise business applications, workflow portals, and backend process pipelines",
        },
        {
          label: "AWS & Google Cloud",
          detail: "Cloud infrastructure, serverless execution, scheduled jobs, and scalable digital operations",
        },
        {
          label: "MySQL & MongoDB",
          detail: "Structured transactional data, operational logs, and flexible document workflow storage",
        },
      ],
      callout: {
        icon: "network",
        title: "Supporting Integration Capabilities",
        text: "REST APIs • Webhooks • Firebase • Authentication Systems • Cloud Monitoring • Scheduled Jobs • Database Integrations • Third-Party APIs",
      },
      image: {
        src: "/assets/services-detail/business-automation/business-automation-platforms-graphic.png",
        width: 1024,
        height: 768,
        alt: "GateXPay Business Automation platform orchestration diagram showing workflow triggers, CRM/ERP sync, cloud worker robots, databases, and real-time dashboard",
      },
    },
    process: {
      heading: {
        line1: "From Manual Processes to",
        accent: "Automated Operations",
      },
      steps: [
        {
          icon: "scan-search",
          title: "Understand",
          text: "Identify Automation Opportunities — We review existing workflows, repetitive tasks, systems, bottlenecks, users, dependencies, and business objectives.",
        },
        {
          icon: "workflow",
          title: "Map",
          text: "Design the Workflow — Our team maps processes, automation triggers, approval rules, data flows, integrations, user roles, and exception scenarios.",
        },
        {
          icon: "code-xml",
          title: "Automate",
          text: "Build & Integrate — We develop automation workflows and connect applications, APIs, databases, cloud services, and operational systems.",
        },
        {
          icon: "rocket",
          title: "Optimize",
          text: "Measure & Improve — We monitor automation performance, identify bottlenecks, refine workflows, and improve efficiency as business requirements evolve.",
        },
      ],
    },
    faqs: [
      {
        q: "What are Business Automation Services?",
        a: "Business Automation Services use software, integrations, APIs, and workflow technologies to reduce repetitive manual work and coordinate business processes digitally. Automation can be applied to approvals, customer management, reporting, billing, inventory, communications, data synchronization, and other recurring operational activities.",
      },
      {
        q: "What business processes can be automated?",
        a: "Businesses can automate workflows such as lead management, approvals, notifications, invoicing, inventory updates, customer follow-ups, reporting, document routing, task assignment, reconciliation, and system-to-system data transfer. The right automation opportunities depend on your existing processes and technology environment.",
      },
      {
        q: "Can GateXPay integrate automation with our existing software?",
        a: "Yes. Where supported by the existing platforms, GateXPay can connect business applications through APIs, webhooks, databases, middleware, or other integration methods. This can include CRM systems, ERP platforms, payment systems, inventory applications, internal tools, and third-party services. Explore our [API Integration Services](/services/api-integration) for connected business systems.",
      },
      {
        q: "What is workflow automation?",
        a: "Workflow automation uses predefined rules and software to automatically trigger actions when specific business events occur. For example, submitting a form could automatically create a CRM record, notify a team member, update a database, generate a document, and trigger a follow-up task.",
      },
      {
        q: "Are business automation solutions suitable for small businesses?",
        a: "Yes. Automation can benefit startups and small businesses as well as larger enterprises. The key is to automate processes where repetitive manual work creates measurable delays, errors, or unnecessary operational effort. Automation should solve a real process problem rather than being implemented simply because the technology exists.",
      },
      {
        q: "Can automation systems be deployed in the cloud?",
        a: "Yes. Depending on technical and business requirements, automation workflows can use cloud infrastructure for application hosting, data synchronization, scheduled processing, monitoring, storage, and scalable backend services. For broader cloud implementation requirements, explore our [IT & Cloud Services](/services/it-cloud-services).",
      },
    ],
    finalCta: {
      titleLead: "Ready to Automate Your",
      titleAccent: "Business Operations?",
      description:
        "Replace repetitive manual processes with connected workflows, system integrations, and scalable automation designed around how your business actually operates.",
      ctaLabel: "Talk to an Automation Expert",
      secondaryAction: {
        text: "Explore Technology Services",
        href: "/services",
      },
      features: [
        {
          icon: "workflow",
          bold: "Custom Workflows",
          light: " — Built around your processes",
        },
        {
          icon: "network",
          bold: "System Integration",
          light: " — Connect existing applications",
        },
        {
          icon: "shield-check",
          bold: "Reliable Execution",
          light: " — Error handling and logging",
        },
      ],
    },
  },

  // 23. Digital & IT Services
  {
    slug: "digital-it-services",
    categoryId: "enterprise-tech",
    name: "Digital & IT Services",
    metaTitle: "Web, Digital Marketing & IT Services | GateXPay",
    metaDescription:
      "Grow your business with GateXPay’s web development, mobile app, SEO, digital marketing, design, automation and IT consulting services.",
    hero: {
      titleLead: "Digital & IT",
      titleAccent: "Services",
      description:
        "Build stronger digital experiences with web development, mobile apps, SEO, marketing, automation, design, and scalable IT solutions for business growth.",
      ctaLabel: "Talk to an Expert",
      ctaHref: "/contact-us",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services",
      },
      image: {
        src: "/assets/services-detail/digital-it-services/hero-digital-it-services-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of enterprise digital and IT services covering web development, mobile apps, marketing, automation, and cloud technology",
      },
    },
    highlights: [
      {
        icon: "layers",
        title: "End-to-End Digital Solutions",
        subtitle: "From Strategy to Execution",
        text: "Combine development, marketing, automation, cloud, design, and technical support within one coordinated digital service ecosystem.",
      },
      {
        icon: "target",
        title: "Built Around Your Business",
        subtitle: "Solutions That Fit Your Goals",
        text: "We align platforms, technologies, workflows, and digital strategies with your operational requirements and long-term business objectives.",
      },
      {
        icon: "trending-up",
        title: "Scalable Technology",
        subtitle: "Ready for Future Growth",
        text: "Build flexible digital systems designed to support growing users, transactions, integrations, content, and evolving business requirements.",
      },
    ],
    included: {
      heading: { line1: "What's Included in Our", accent: "Digital & IT Services" },
      items: [
        {
          icon: "code-xml",
          title: "Web Development",
          text: "Build responsive websites, business portals, e-commerce platforms, and custom web applications. Explore our [Web & App Development Services](/services/web-app-development).",
        },
        {
          icon: "smartphone",
          title: "Mobile App Development",
          text: "Develop intuitive Android, iOS, and cross-platform applications for customers and businesses. See our [Web & App Development Services](/services/web-app-development).",
        },
        {
          icon: "trending-up",
          title: "SEO & Organic Growth",
          text: "Improve search visibility through technical SEO, content optimization, and structured website improvements. Explore our [Digital Marketing Services](/services/digital-marketing-services).",
        },
        {
          icon: "megaphone",
          title: "Digital Marketing",
          text: "Reach relevant audiences through search, social media, content, and performance marketing strategies. Learn more in our [Digital Marketing Services](/services/digital-marketing-services).",
        },
        {
          icon: "layers",
          title: "UI/UX & Graphic Design",
          text: "Create user-focused interfaces, brand assets, visual identities, and engaging digital experiences across your customer touchpoints.",
        },
        {
          icon: "workflow",
          title: "Business Automation & IT",
          text: "Streamline repetitive processes with system integrations, automation, cloud solutions, and technical consulting. Explore our [Business Automation Services](/services/business-automation).",
        },
      ],
    },
    showcase: {
      heading: { line1: "Platforms & Tools", accent: "We Master" },
      description:
        "We use proven development, marketing, analytics, design, and cloud technologies to build measurable, maintainable, and scalable digital solutions.",
      checklist: [
        {
          label: "Development Platforms",
          detail:
            "React, Next.js, Node.js, PHP, Laravel, Python, Flutter, React Native, WordPress — Build modern websites, applications, APIs, portals, and cross-platform digital products using scalable development technologies.",
        },
        {
          label: "Marketing & Analytics",
          detail:
            "Google Ads, Google Analytics, Google Search Console, Meta Ads, LinkedIn Ads, YouTube, Semrush — Plan, measure, and optimize organic and paid marketing campaigns using performance data and search insights.",
        },
        {
          label: "Design & Experience",
          detail:
            "Figma, Adobe Photoshop, Adobe Illustrator, Canva — Create consistent brand identities, user interfaces, campaign assets, prototypes, and digital experiences.",
        },
        {
          label: "Cloud & Business Tools",
          detail:
            "AWS, Cloudflare, GitHub, REST APIs, Google Workspace — Support deployments, integrations, collaboration, security, development workflows, and scalable cloud-based business applications.",
        },
      ],
      callout: {
        icon: "cpu",
        title: "Integrated Technology & Growth",
        text: "We align proven software development, multi-channel marketing, UI/UX design, and cloud infrastructure into unified digital operations tailored around your measurable business milestones.",
      },
      image: {
        src: "/assets/services-detail/digital-it-services/digital-it-ecosystem-graphic.png",
        width: 1536,
        height: 1024,
        alt: "GateXPay Digital and IT Services technology ecosystem diagram covering web, mobile, SEO, digital marketing, UI UX design, cloud, and business automation",
      },
    },
    process: {
      heading: {
        line1: "From Idea to",
        accent: "Digital Growth",
      },
      steps: [
        {
          icon: "scan-search",
          title: "Understand & Define Goals",
          text: "We assess your business model, target audience, technology environment, challenges, priorities, and desired digital outcomes.",
        },
        {
          icon: "workflow",
          title: "Strategize & Build Roadmap",
          text: "Our team defines the right channels, technologies, architecture, design direction, integrations, and implementation priorities.",
        },
        {
          icon: "code-xml",
          title: "Execute, Design & Build",
          text: "We build the solution, launch campaigns, integrate systems, create content, and continuously test performance.",
        },
        {
          icon: "rocket",
          title: "Measure, Improve & Scale",
          text: "We monitor performance, identify opportunities, optimize outcomes, and evolve your digital ecosystem as the business grows.",
        },
      ],
    },
    faqs: [
      {
        q: "What are Digital & IT Services?",
        a: "Digital and IT services help businesses build, manage, market, secure, and improve their digital operations. They may include website development, mobile app development, SEO, digital marketing, UI/UX design, business automation, cloud solutions, and technical consulting.",
      },
      {
        q: "Does GateXPay provide website and web application development?",
        a: "Yes. GateXPay can develop responsive websites, business portals, e-commerce platforms, dashboards, and custom web applications based on specific functional and business requirements. Explore our [Web & App Development Services](/services/web-app-development) for more details.",
      },
      {
        q: "Does GateXPay provide SEO and digital marketing services?",
        a: "Yes. Services may include technical SEO, on-page optimization, content strategy, search marketing, social media marketing, paid advertising, analytics, and campaign optimization. Explore our [Digital Marketing Services](/services/digital-marketing-services) for dedicated marketing support.",
      },
      {
        q: "Can you develop mobile applications for Android and iOS?",
        a: "Yes. Depending on project requirements, we can build native or cross-platform mobile applications for Android and iOS using appropriate development frameworks and technologies.",
      },
      {
        q: "Can GateXPay automate existing business processes?",
        a: "Yes. Where technically feasible, we can connect applications, APIs, databases, and business workflows to reduce repetitive manual tasks and improve operational efficiency. Learn more about our [Business Automation Services](/services/business-automation).",
      },
      {
        q: "Are your Digital & IT Services suitable for startups and established businesses?",
        a: "Yes. Solutions can be adapted for startups, SMEs, e-commerce businesses, professional service providers, financial companies, and established enterprises. The technology stack and implementation scope are defined around the project's requirements rather than business size alone.",
      },
    ],
    finalCta: {
      titleLead: "Ready to Build What Your",
      titleAccent: "Business Needs Next?",
      description:
        "Turn your ideas into scalable websites, applications, marketing systems, automated workflows, and digital experiences built around measurable business goals.",
      ctaLabel: "Talk to an Expert",
      ctaHref: "/contact-us",
      secondaryCtaLabel: "Explore Digital Services",
      secondaryCtaHref: "/services",
      trustPoints: [
        {
          label: "Business-Focused",
          desc: "Technology aligned with outcomes",
        },
        {
          label: "Flexible Technology",
          desc: "Built around your requirements",
        },
        {
          label: "Growth Ready",
          desc: "Designed to evolve with you",
        },
      ],
    },
  },

  // 24. Value-Added Services
  {
    slug: "value-added-services",
    categoryId: "enterprise-tech",
    name: "Value-Added Services",
    metaTitle: "Value-Added Services Through CSP Network | GateXPay",
    metaDescription:
      "Access PAN, Aadhaar-related assistance, travel booking, insurance, digital payments and other value-added services through GateXPay’s CSP network.",
    hero: {
      titleLead: "Value-Added",
      titleAccent: "Services",
      description:
        "Access everyday financial, digital, travel, document, and assisted services through GateXPay’s Customer Service Point network with guided local support.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services",
      },
      image: {
        src: "/assets/services-detail/other-value-added/hero-other-value-added-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of value-added everyday digital, travel, and financial services at GateXPay CSP locations",
      },
    },
    highlights: [
      {
        icon: "layers",
        title: "Multiple Services, One Point",
        subtitle: "All Essential Services Locally",
        text: "Access selected financial, document, travel, payment, and digital services through participating GateXPay Customer Service Points.",
      },
      {
        icon: "headphones",
        title: "Guided Service Support",
        subtitle: "Assisted Submissions & Processing",
        text: "Get assistance with service selection, required information, document submission, payment, and request processing where applicable.",
      },
      {
        icon: "map-pin",
        title: "Accessible Local Network",
        subtitle: "Bringing Services to Communities",
        text: "Bring essential assisted digital services closer to individuals, families, entrepreneurs, and communities through convenient service points.",
      },
    ],
    included: {
      heading: {
        line1: "Value-Added Services",
        accent: "We Support",
      },
      items: [
        {
          icon: "ticket",
          title: "Travel & Ticketing\\nServices",
          text: "Access assisted booking support for eligible train, bus, and flight travel services through our connected network. Explore [Travel Booking Services](/services/travel-booking-services).",
        },
        {
          icon: "file-text",
          title: "PAN Card\\nServices",
          text: "Get assistance with eligible new PAN applications, corrections, updates, and reprint requests through authorized channels. Visit [PAN Card Services](/services/pan-card-services).",
        },
        {
          icon: "fingerprint",
          title: "Aadhaar-Related\\nAssistance",
          text: "Receive guided assistance for supported Aadhaar update requirements, document submissions, and PVC card requests via official UIDAI channels. Learn more at [Aadhaar Services](/services/aadhaar-services).",
        },
        {
          icon: "shield-check",
          title: "Insurance\\nAssistance",
          text: "Access assistance for supported insurance products, premium payments, and service-related requests through our [Loan & Insurance Services](/services/loan-insurance-services).",
        },
        {
          icon: "coins",
          title: "Financial Service\\nAssistance",
          text: "Get guided access to eligible financial products and service applications, including cash withdrawals via [Micro ATM Services](/services/micro-atm-services) and [Money Transfer Services](/services/money-transfer-services).",
        },
        {
          icon: "smartphone",
          title: "Digital & Utility\\nServices",
          text: "Access supported bill payments, digital payments, mobile recharge, and other everyday service facilities. Explore [Bill Payment & Recharge](/services/bill-payment-recharge).",
        },
      ],
    },
    showcase: {
      heading: {
        line1: "What You Need",
        accent: "to Bring",
      },
      description:
        "Requirements vary across services. Bringing your primary identification and relevant details ensures smooth processing at your local GateXPay Customer Service Point.",
      checklist: [
        {
          label: "Valid Government-Issued Identity Proof",
          detail: "Original physical or digital ID (Aadhaar, Voter ID, Passport, or Driving Licence) for identity confirmation.",
        },
        {
          label: "Aadhaar or PAN Card Where Applicable",
          detail: "Required for financial, taxation, scheme enrollment, or high-value transactions.",
        },
        {
          label: "Active Mobile Number for OTP & Communication",
          detail: "An accessible phone to complete OTP verification and receive digital receipts and service notifications.",
        },
        {
          label: "Service-Specific Supporting Documents",
          detail: "Utility bills, consumer numbers, passenger details, or scheme forms relevant to the selected service.",
        },
        {
          label: "Application or Reference Details If Available",
          detail: "Previous application reference numbers, PNRs, or policy numbers for status check and renewal services.",
        },
        {
          label: "Payment Method for Applicable Service Charges",
          detail: "Cash or supported digital payment methods for government fees, ticket fares, or nominal service charges.",
        },
      ],
      callout: {
        title: "Not Sure What Your Service Requires?",
        text: "Bring your primary identity documents and service details. Our representative can help you understand the information required for the selected service. Need PAN-related support? Explore our [PAN Card Services](/services/pan-card-services).",
        icon: "lightbulb",
      },
      note: "Requirements may vary by service type, partner provider, transaction limit, and applicable regulatory guidelines.",
      image: {
        src: "/assets/services-detail/other-value-added/value-added-details-graphic.png",
        width: 1536,
        height: 1024,
        alt: "Checklist graphic of required documents and details for value-added services at GateXPay CSP counter",
      },
    },
    process: {
      heading: {
        line1: "From Everyday Need to",
        accent: "Completed Assisted Service",
      },
      steps: [
        {
          icon: "map-pin",
          title: "Visit a Customer Service Point",
          text: "Visit a participating GateXPay service point and tell the representative which service you need.",
        },
        {
          icon: "file-text",
          title: "Share Required Details",
          text: "Provide the necessary identification, supporting documents, contact information, and service-specific details.",
        },
        {
          icon: "shield-check",
          title: "Submit Your Service Request",
          text: "The representative processes your request through the applicable service platform or authorized channel.",
        },
        {
          icon: "receipt",
          title: "Receive Confirmation",
          text: "Receive the available acknowledgement, receipt, booking details, reference number, or service-status information.",
        },
      ],
    },
    faqs: [
      {
        q: "What are Value-Added Services?",
        a: "Value-Added Services are supplementary financial, digital, travel, documentation, payment, and assisted services offered alongside core banking or payment services. Through participating GateXPay Customer Service Points, customers can access supported services from a convenient assisted-service location.",
      },
      {
        q: "What services are available through GateXPay’s CSP network?",
        a: "Depending on availability and the participating service point, supported services may include PAN-related assistance, Aadhaar-related guidance, ticket booking, insurance assistance, bill payments, recharge, digital payments, and selected financial services like [AEPS Services](/services/aeps-services) and [Money Transfer Services](/services/money-transfer-services). Service availability can vary by location and provider.",
      },
      {
        q: "What documents are required for Value-Added Services?",
        a: "Requirements depend on the service selected. Customers may need a valid government-issued ID, PAN or Aadhaar where applicable, an active mobile number, supporting documents, and relevant application or account details. It is best to confirm the exact requirements before submitting a service request.",
      },
      {
        q: "Can I access PAN and Aadhaar-related services through a Customer Service Point?",
        a: "Participating service points may assist with supported PAN and Aadhaar-related processes where applicable and permitted through the relevant authorized channels. For dedicated PAN assistance, visit our [PAN Card Services](/services/pan-card-services) page, or explore [Aadhaar Services](/services/aadhaar-services).",
      },
      {
        q: "Are Value-Added Services available for businesses as well as individuals?",
        a: "Selected services may be useful for individuals, small businesses, entrepreneurs, students, senior citizens, and other customers requiring assisted digital or financial services. The exact service scope depends on the product, provider, and eligibility requirements.",
      },
      {
        q: "Are payments and service requests secure?",
        a: "GateXPay aims to support service delivery through controlled digital workflows and applicable provider systems. Customers should verify transaction details, keep receipts or reference numbers, and never share sensitive credentials such as PINs or passwords. For utility and recharge options, explore our [Bill Payment & Recharge Services](/services/bill-payment-recharge).",
      },
    ],
    finalCta: {
      titleLead: "Need Multiple Services at",
      titleAccent: "One Convenient Touchpoint?",
      description:
        "Access supported financial, digital, document, travel, and payment services with assisted support through GateXPay’s Customer Service Point network. You can also [contact our support team](/contact) to learn about CSP partnership opportunities.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "Explore Customer Services",
        href: "/services",
      },
      features: [
        {
          icon: "headphones",
          bold: "Assisted Service",
          light: "Guidance through the process",
        },
        {
          icon: "layers",
          bold: "Multiple Services",
          light: "Everyday needs in one place",
        },
        {
          icon: "receipt",
          bold: "Transparent Processing",
          light: "Receive applicable receipts and references",
        },
      ],
    },
  },

  // 25. Aadhaar Services Assistance
  {
    slug: "aadhaar-services",
    categoryId: "citizen-identity",
    name: "Aadhaar Services Assistance",
    metaTitle: "Aadhaar Services Assistance & Update Support | GateXPay",
    metaDescription:
      "Get Aadhaar services assistance for enrolment, updates, corrections, document requirements, e-Aadhaar downloads and PVC card support with GateXPay.",
    hero: {
      titleLead: "Aadhaar Services",
      titleAccent: "Assistance",
      description:
        "Get reliable assistance for Aadhaar enrolment, updates, corrections, downloads, PVC card requests, and authorised UIDAI service processes.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: {
        text: "View Similar Services",
        href: "/services#citizen-identity",
      },
      image: {
        src: "/assets/services-detail/aadhaar/hero-aadhaar-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of Aadhaar citizen identity verification, enrolment assistance, and smart card services",
      },
    },
    highlights: [
      {
        icon: "handshake",
        title: "Guided Assistance",
        text: "Clear Support at Every Step — Get help understanding Aadhaar enrolment, update requirements, supporting documents, UIDAI processes, and application tracking.",
      },
      {
        icon: "shield-check",
        title: "Secure Document Handling",
        text: "Privacy-Focused Support — Receive careful assistance with identity documents while following secure handling practices and official Aadhaar procedures.",
      },
      {
        icon: "workflow",
        title: "Process Guidance",
        text: "Reduce Avoidable Errors — Understand required documents, update options, authorised service channels, and next steps before submitting your request.",
      },
    ],
    included: {
      heading: { line1: "What's Included in", accent: "Aadhaar Services" },
      items: [
        {
          icon: "user-check",
          title: "Aadhaar Enrolment\\nAssistance",
          text: "Get guidance on enrolment requirements, accepted documents, appointments, and authorised Aadhaar centres. Need other identity-related support? Explore our [PAN Card Services](/services/pan-card-services) for application, correction, and related assistance.",
        },
        {
          icon: "refresh-cw",
          title: "Aadhaar Update\\n& Correction",
          text: "Get assistance for eligible name, address, date-of-birth, mobile, and demographic updates through official UIDAI channels.",
        },
        {
          icon: "credit-card",
          title: "Aadhaar Download\\n& PVC Support",
          text: "Get guidance for e-Aadhaar download, Aadhaar status, and official PVC card ordering. GateXPay customers can also explore [AEPS Services](/services/aeps-services) and other [CSP Services](/services#citizen-identity) available through our customer-service network.",
        },
      ],
    },
    showcase: {
      heading: { line1: "Have Your Documents", accent: "Ready" },
      description:
        "Keeping the correct documents ready can make your Aadhaar enrolment or update process easier. Requirements vary depending on the service requested. UIDAI maintains the authoritative list of acceptable documents, and document eligibility depends on the requested service and applicant category.",
      checklist: [
        {
          label: "Proof of Identity (PoI)",
          detail: "Valid photo identity document accepted under current UIDAI guidelines.",
        },
        {
          label: "Proof of Address (PoA)",
          detail: "Valid document containing your current address.",
        },
        {
          label: "Proof of Date of Birth (DoB)",
          detail: "Required when enrolling or requesting an eligible date-of-birth update.",
        },
        {
          label: "Proof of Relationship (PoR)",
          detail: "May be required for Head-of-Family or child-related Aadhaar processes.",
        },
        {
          label: "Existing Aadhaar Number",
          detail: "Keep your Aadhaar number available for applicable update or download requests.",
        },
        {
          label: "Registered Mobile Number",
          detail: "May be required for OTP-based online Aadhaar services.",
        },
      ],
      callout: {
        title: "Updating Your Aadhaar?",
        text: "Bring documents that specifically support the information you want to update. [Check Official UIDAI Requirements](https://uidai.gov.in/en/enrolment-and-updates)",
        icon: "lightbulb",
      },
      image: {
        src: "/assets/services-detail/aadhaar/document-verification-graphic.png",
        width: 1536,
        height: 1024,
        alt: "Required documents checklist graphic for Aadhaar enrolment and update documentation",
      },
    },
    process: {
      heading: { line1: "From Document Verification to", accent: "Aadhaar Service Assistance" },
      steps: [
        {
          icon: "scan-search",
          title: "Choose the Aadhaar Service",
          text: "Tell us whether you need enrolment guidance, a demographic update, address correction, biometric update, download assistance, or PVC card support.",
        },
        {
          icon: "file-text",
          title: "Verify Requirements",
          text: "We help you identify the supporting documents and information generally required for your selected Aadhaar service.",
        },
        {
          icon: "workflow",
          title: "Use Appropriate UIDAI Channel",
          text: "Complete eligible online requests or visit an authorised Aadhaar centre when in-person verification or biometric capture is required.",
        },
        {
          icon: "rocket",
          title: "Check Aadhaar Status",
          text: "Use your acknowledgement, enrolment, update, or service reference details to monitor progress through official UIDAI services.",
        },
      ],
    },
    faqs: [
      {
        q: "What are Aadhaar services?",
        a: "Aadhaar services include enrolment, demographic updates, biometric updates, address changes, e-Aadhaar download, PVC Aadhaar ordering, status tracking, and other identity-management services provided through the UIDAI ecosystem. GateXPay can assist customers in understanding the applicable process and requirements.",
      },
      {
        q: "Can I update my Aadhaar card details?",
        a: "Yes. Eligible Aadhaar details can be updated through the methods currently permitted by UIDAI. These may include name, address, date of birth, gender, mobile number, email, photograph, fingerprints, or iris information, depending on the update type and authorised channel.",
      },
      {
        q: "What documents are required for an Aadhaar update?",
        a: "The documents depend on the information being updated. UIDAI may require valid Proof of Identity, Proof of Address, Proof of Date of Birth, or Proof of Relationship documents. Applicants should always check the latest UIDAI-approved document list before submitting a request. For other identity services, explore our [PAN Card Services](/services/pan-card-services).",
      },
      {
        q: "Can I update my Aadhaar address online?",
        a: "UIDAI provides online address-update facilities for eligible Aadhaar holders through its official digital services, subject to authentication and supporting-document requirements.",
      },
      {
        q: "Where can biometric Aadhaar updates be completed?",
        a: "Biometric changes such as fingerprints, iris data, and photograph updates are handled through authorised Aadhaar enrolment/update facilities and applicable UIDAI-authorised channels.",
      },
      {
        q: "Can I download my Aadhaar online?",
        a: "Yes. UIDAI provides an official e-Aadhaar download facility, including a masked Aadhaar option for users who prefer to display only the last four digits of their Aadhaar number.",
      },
      {
        q: "Can I order an Aadhaar PVC Card?",
        a: "Yes. Aadhaar holders can order an official Aadhaar PVC Card through UIDAI's authorised digital services. As of January 1, 2026, UIDAI revised the official PVC-card service charge to ₹75 including taxes. GateXPay customers can also explore [AEPS Services](/services/aeps-services), [Money Transfer Services](/services/money-transfer-services), and [Micro ATM Services](/services/micro-atm-services) across our CSP network.",
      },
    ],
    finalCta: {
      titleLead: "Need Help With an",
      titleAccent: "Aadhaar Service?",
      description:
        "Get clear guidance on Aadhaar enrolment, updates, supporting documents, downloads, PVC requests, and official UIDAI processes. You can [contact GateXPay](/contact) directly to discuss your requirements.",
      ctaLabel: "Get Aadhaar Assistance",
      secondaryAction: {
        text: "Find a Service Point",
        href: "/contact",
      },
      features: [
        { icon: "lightbulb", bold: "Clear Guidance", light: "Understand the right process" },
        { icon: "file-text", bold: "Document Support", light: "Know what to carry" },
        { icon: "shield-check", bold: "Official Process Focus", light: "Follow appropriate UIDAI channels" },
      ],
    },
  },

  // 26. Recharge Services
  {
    slug: "recharge-services",
    categoryId: "retail-commerce",
    name: "Recharge Services",
    metaTitle: "Mobile, DTH & FASTag Recharge Services | GateXPay",
    metaDescription:
      "Access mobile recharge, DTH recharge, FASTag recharge, postpaid bill payment and supported digital recharge services through GateXPay CSP points.",
    hero: {
      titleLead: "Recharge",
      titleAccent: "Services",
      description:
        "Recharge prepaid mobile, DTH, FASTag and supported digital services quickly through GateXPay's assisted CSP network with simple payment and confirmation.",
      ctaLabel: "Talk to an Expert",
      secondaryAction: { text: "View Similar Services", href: "/services#retail-commerce" },
      image: {
        src: "/assets/services-detail/recharge/hero-recharge-illustration.png",
        width: 1536,
        height: 1024,
        alt: "Illustration of prepaid mobile, DTH, FASTag and broadband digital recharge services at GateXPay CSP",
      },
    },
    highlights: [
      {
        icon: "zap",
        title: "Fast Recharge Processing",
        text: "Quick Confirmation — Recharge requests are processed through connected service-provider systems with transaction confirmation where supported.",
      },
      {
        icon: "handshake",
        title: "Assisted CSP Service",
        text: "Simple In-Person Support — Customers can visit a GateXPay Customer Service Point for assistance with recharge details, payment, and transaction processing.",
      },
      {
        icon: "layers",
        title: "Multiple Recharge Categories",
        text: "One Convenient Service Point — Access mobile, DTH, FASTag, broadband, and other supported recharge services from one assisted service network.",
      },
    ],
    included: {
      heading: { line1: "Recharges", accent: "We Support" },
      items: [
        {
          icon: "smartphone",
          title: "Mobile Recharge",
          text: "Recharge supported prepaid mobile numbers and select plans across participating telecom operators.",
        },
        {
          icon: "tv",
          title: "DTH Recharge",
          text: "Recharge supported DTH accounts and renew eligible television subscription plans conveniently.",
        },
        {
          icon: "car",
          title: "FASTag Recharge",
          text: "Top up supported FASTag accounts using the required vehicle or account details.",
        },
        {
          icon: "receipt",
          title: "Postpaid Bill Payment",
          text: "Pay supported mobile postpaid bills using your registered number and bill details. Need utility bill support? Explore our [Bill Payment Services](/services/bill-payment-services).",
        },
        {
          icon: "wifi",
          title: "Broadband & Data Services",
          text: "Recharge or pay supported broadband, data card, and connectivity service accounts.",
        },
        {
          icon: "layers",
          title: "Other Supported Recharges",
          text: "Access additional recharge and digital payment services available through GateXPay's service network, with cash withdrawal support via [Micro ATM Services](/services/micro-atm-services) and [AEPS Services](/services/aeps-services).",
        },
      ],
    },
    showcase: {
      heading: { line1: "What You Need", accent: "to Bring" },
      description:
        "Keep the required account, customer ID, or recharge details ready for a fast and hassle-free transaction at your nearest CSP point.",
      checklist: [
        {
          label: "Mobile Number, DTH ID, FASTag Account, or Customer ID",
          detail: "Required for identifying your registered account with the service provider.",
        },
        {
          label: "Operator or Service-Provider Name",
          detail: "Specify your telecom operator, DTH provider, or issuing FASTag entity.",
        },
        {
          label: "Recharge Amount or Preferred Plan",
          detail: "Select your desired talktime, data pack, validity extension, or wallet top-up value.",
        },
        {
          label: "Vehicle Number for FASTag Services",
          detail: "Vehicle registration plate or chassis number linked to the active FASTag wallet.",
        },
        {
          label: "Bill or Account Reference Where Required",
          detail: "Provide the latest bill copy or consumer reference number for postpaid connections.",
        },
        {
          label: "Payment Amount",
          detail: "Keep the exact cash or digital payment amount ready before authorizing the transaction.",
        },
      ],
      callout: {
        title: "Not Sure Which Details You Need?",
        text: "Bring your latest bill, recharge message, account information, or registered mobile number. Our service team can help identify the relevant details for supported services. Need help with utility payments? Explore our [Bill Payment Services](/services/bill-payment-services).",
        icon: "receipt",
      },
      image: {
        src: "/assets/services-detail/recharge/recharge-details-graphic.png",
        width: 1536,
        height: 1024,
        alt: "Checklist graphic of required account details, operator verification, plan selection, and instant receipt confirmation",
      },
    },
    process: {
      heading: { line1: "From Account Details to", accent: "Instant Recharge Confirmation" },
      steps: [
        {
          icon: "map-pin",
          title: "Visit a CSP Point",
          text: "Visit a participating GateXPay Customer Service Point and tell the representative which service you want to recharge.",
        },
        {
          icon: "file-text",
          title: "Share Recharge Details",
          text: "Provide your mobile number, DTH account, FASTag details, operator, and recharge amount or plan as applicable.",
        },
        {
          icon: "shield-check",
          title: "Confirm Before Payment",
          text: "Review the number, operator, account details, recharge value, and payable amount before authorizing the transaction.",
        },
        {
          icon: "rocket",
          title: "Receive Transaction Status",
          text: "Receive confirmation or a transaction reference after the recharge request is successfully processed through the connected service provider.",
        },
      ],
    },
    faqs: [
      {
        q: "What are Recharge Services?",
        a: "Recharge services allow customers to add balance, renew plans, or make payments for supported prepaid mobile, DTH, FASTag, broadband, and other digital services. GateXPay facilitates supported recharge transactions through its Customer Service Point network.",
      },
      {
        q: "Does GateXPay provide mobile recharge services?",
        a: "Yes. Customers can access supported prepaid mobile recharge services through participating GateXPay CSP locations. Available operators, plans, and recharge options may vary depending on service-provider connectivity.",
      },
      {
        q: "Can I recharge my DTH connection through GateXPay?",
        a: "Supported DTH recharge services can be processed using your DTH account or subscriber ID, operator details, and required recharge amount. Customers should verify the account details before confirming payment.",
      },
      {
        q: "Can I recharge FASTag through GateXPay?",
        a: "Where FASTag recharge is supported, customers can provide the relevant FASTag, vehicle, or linked account details and specify the recharge amount. For related travel and transport services, explore our [Travel Services](/services/travel-services).",
      },
      {
        q: "What details are required for a mobile recharge?",
        a: "Typically, you will need your mobile number, telecom operator, and selected recharge amount or plan. Additional information may be required depending on the service provider or type of transaction.",
      },
      {
        q: "Are recharge transactions secure?",
        a: "GateXPay processes supported recharge transactions through connected digital service systems and uses appropriate transaction controls within its service environment. Customers should always verify the mobile number, account ID, operator, and amount before approving a transaction. For cash and financial services, visit our [AEPS Services](/services/aeps-services) and [Money Transfer Services](/services/money-transfer-services).",
      },
    ],
    finalCta: {
      titleLead: "Need a Quick",
      titleAccent: "Recharge?",
      description:
        "Visit a GateXPay service point for assisted mobile, DTH, FASTag, broadband, and other supported recharge services. You can also [contact GateXPay](/contact) directly to discuss your requirements.",
      ctaLabel: "Find Recharge Support",
      secondaryAction: {
        text: "Explore Payment Services",
        href: "/services#retail-commerce",
      },
      features: [
        { icon: "handshake", bold: "Assisted Service", light: "Guidance at participating CSP points" },
        { icon: "layers", bold: "Multiple Categories", light: "Mobile, DTH, FASTag and more" },
        { icon: "shield-check", bold: "Simple Process", light: "Provide details, pay and confirm" },
      ],
    },
  },
];

export function getServiceDetail(slug) {
  const normalized = slug?.toLowerCase();
  if (normalized === "bill-payment-recharge") {
    return (
      SERVICE_DETAILS.find((s) => s.slug === "recharge-services") ||
      SERVICE_DETAILS.find((s) => s.slug === "bill-payment-services")
    );
  }
  if (
    normalized === "pension-government-services" ||
    normalized === "pension-governance-services" ||
    normalized === "pension-government-schemes"
  ) {
    return SERVICE_DETAILS.find((s) => s.slug === "pension-government-schemes");
  }
  if (
    normalized === "ecommerce-services" ||
    normalized === "e-commerce-services" ||
    normalized === "ecommerce-development" ||
    normalized === "e-commerce-development" ||
    normalized === "online-store-development"
  ) {
    return SERVICE_DETAILS.find((s) => s.slug === "e-commerce-services");
  }
  if (
    normalized === "ecommerce-solutions" ||
    normalized === "e-commerce-solutions"
  ) {
    return SERVICE_DETAILS.find((s) => s.slug === "e-commerce-solutions");
  }
  if (normalized === "cybersecurity" || normalized === "cybersecurity-services") {
    return (
      SERVICE_DETAILS.find((s) => s.slug === "digital-it-services") ||
      SERVICE_DETAILS.find((s) => s.slug === "it-cloud-services")
    );
  }
  if (normalized === "aadhaar-services-assistance") {
    return SERVICE_DETAILS.find((s) => s.slug === "aadhaar-services");
  }
  if (normalized === "egovernance-services" || normalized === "e-governance") {
    return SERVICE_DETAILS.find((s) => s.slug === "e-governance-services");
  }
  if (
    normalized === "aeps" ||
    normalized === "aeps-service" ||
    normalized === "aadhaar-enabled-payment-system"
  ) {
    return SERVICE_DETAILS.find((s) => s.slug === "aeps-services");
  }
  if (normalized === "micro-atm" || normalized === "microatm") {
    return SERVICE_DETAILS.find((s) => s.slug === "micro-atm-services");
  }
  if (
    normalized === "money-transfer" ||
    normalized === "dmt" ||
    normalized === "domestic-money-transfer"
  ) {
    return SERVICE_DETAILS.find((s) => s.slug === "money-transfer-services");
  }
  if (
    normalized === "travel-services" ||
    normalized === "travel" ||
    normalized === "travel-booking" ||
    normalized === "travel-booking-services"
  ) {
    return (
      SERVICE_DETAILS.find((s) => s.slug === "travel-booking-services") ||
      SERVICE_DETAILS.find((s) => s.slug === "travel-services")
    );
  }
  if (
    normalized === "value-added-services" ||
    normalized === "other-value-added-services" ||
    normalized === "value-added" ||
    normalized === "vas"
  ) {
    return (
      SERVICE_DETAILS.find((s) => s.slug === "value-added-services") ||
      SERVICE_DETAILS.find((s) => s.slug === "other-value-added-services")
    );
  }
  if (
    normalized === "loan-credit-services" ||
    normalized === "loan-credit-integration" ||
    normalized === "digital-lending-integration" ||
    normalized === "digital-lending" ||
    normalized === "loan-integration" ||
    normalized === "insurance-services" ||
    normalized === "insurance" ||
    normalized === "loan-services"
  ) {
    return SERVICE_DETAILS.find((s) => s.slug === "loan-insurance-services");
  }
  if (
    normalized === "web-development" ||
    normalized === "app-development" ||
    normalized === "api-integration"
  ) {
    return SERVICE_DETAILS.find((s) => s.slug === "web-app-development");
  }
  if (
    normalized === "business-process-automation" ||
    normalized === "workflow-automation" ||
    normalized === "process-automation"
  ) {
    return SERVICE_DETAILS.find((s) => s.slug === "business-automation");
  }
  if (
    normalized === "cloud-services" ||
    normalized === "managed-it-services" ||
    normalized === "devops-services" ||
    normalized === "it-services"
  ) {
    return SERVICE_DETAILS.find((s) => s.slug === "it-cloud-services");
  }
  if (
    normalized === "digital-services" ||
    normalized === "software-development-services" ||
    normalized === "it-consulting-services"
  ) {
    return SERVICE_DETAILS.find((s) => s.slug === "digital-it-services");
  }
  return SERVICE_DETAILS.find((s) => s.slug === normalized);
}
