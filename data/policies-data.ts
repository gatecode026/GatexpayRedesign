// GateXPay Legal & Compliance Policies Data
// Grounded in official GateXpay Technologies Private Limited policies

export type LegalSlug =
  | "privacy" | "terms" | "refund" | "cookies" | "disclaimer" | "security"
  | "grievance" | "vendor" | "prohibited" | "merchant" | "data" | "aml-kyc";

export interface PolicyHighlight {
  title: string;
  desc: string;
}

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; bold?: boolean };

export interface Section {
  id: string;
  heading: string;
  tocLabel: string;
  blocks: ContentBlock[];
}

export interface LegalContent {
  slug: LegalSlug;
  liveSlug: string;
  title: string;
  description: string;
  pill: string;
  lastUpdated: string;
  effectiveDate: string;
  heroImage: string;
  highlights: PolicyHighlight[];
  sections: Section[];
}

export const LEGAL_POLICIES: Record<LegalSlug, LegalContent> = {
  "privacy": {
    slug: "privacy",
    liveSlug: "privacy-policy",
    title: "Privacy Policy",
    description: "At GateXpay, operated by GateXpay Technologies Private Limited, we are committed to protecting user privacy and maintaining the confidentiality of customer information.",
    pill: "Data Privacy & DPDP Act 2023",
    lastUpdated: "15 May 2026",
    effectiveDate: "15 May 2026",
    heroImage: "/assets/images/solution-tech.png",
    highlights: [
      {
            "title": "Zero Data Selling",
            "desc": "We never sell, rent, or trade your personal information to third parties."
      },
      {
            "title": "Encrypted In Transit & Rest",
            "desc": "Bank-grade SSL/TLS transmission and AES-256 stored data protection."
      },
      {
            "title": "User Access Rights",
            "desc": "Direct statutory rights for review, correction, and controlled deletion."
      }
],
    sections: [
      {
            "id": "introduction",
            "heading": "1. Introduction",
            "tocLabel": "Introduction",
            "blocks": [
                  {
                        "type": "p",
                        "text": "This Privacy Policy describes how GateXpay Technologies Private Limited (“GateXpay”, “we”, “us”, or “our”) collects, uses, and shares information about you when you access or use our website, products, and services."
                  }
            ]
      },
      {
            "id": "information-we-collect",
            "heading": "2. Information We Collect",
            "tocLabel": "Information We Collect",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We collect information that you provide directly to us and information that is collected automatically."
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "**Personal Information:** Name, email address, phone number, etc.",
                              "**Account Information:** Login credentials, transaction details, etc.",
                              "**Device & Usage Information:** IP address, browser type, device identifiers, pages visited, etc.",
                              "PAN, Aadhaar, GST, and KYC-related documents",
                              "Bank account details"
                        ]
                  }
            ]
      },
      {
            "id": "how-we-use-information",
            "heading": "3. How We Use Information",
            "tocLabel": "How We Use Information",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We use the information we collect for the following purposes:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "To provide, operate, and maintain our services.",
                              "To process transactions and send related information.",
                              "To improve, personalize, and secure our services.",
                              "To communicate with you about updates or support.",
                              "KYC and merchant onboarding",
                              "Fraud prevention and risk management",
                              "API integrations and technical support",
                              "Regulatory compliance"
                        ]
                  }
            ]
      },
      {
            "id": "information-sharing",
            "heading": "4. Information Sharing",
            "tocLabel": "Information Sharing",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We do not sell your personal information. We may share your information with:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "**Service Providers** who assist in our operations.",
                              "**Legal Authorities** if required by law.",
                              "**Business Partners** with your consent or for service delivery.",
                              "Banking partners and payment aggregators",
                              "Licensed financial institutions",
                              "KYC and verification providers"
                        ]
                  }
            ]
      },
      {
            "id": "cookies-tracking",
            "heading": "5. Cookies & Tracking",
            "tocLabel": "Cookies & Tracking",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Our website may use cookies and analytics technologies to improve user experience and platform performance."
                  }
            ]
      },
      {
            "id": "data-retention",
            "heading": "6. Data Retention",
            "tocLabel": "Data Retention",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Data may be retained as required under applicable Indian laws, compliance obligations, and contractual requirements."
                  }
            ]
      },
      {
            "id": "user-rights",
            "heading": "7. User Rights",
            "tocLabel": "User Rights",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Users may request:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Data correction",
                              "Account updates",
                              "Limited deletion requests subject to legal obligations"
                        ]
                  }
            ]
      },
      {
            "id": "limitation",
            "heading": "8. Limitation",
            "tocLabel": "Limitation",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay acts as a technology service provider and CSP platform facilitating access to third-party financial and fintech services."
                  },
                  {
                        "type": "p",
                        "text": "#### Your Rights"
                  },
                  {
                        "type": "p",
                        "text": "You have the right to access, correct, or delete your personal data. You can contact us anytime to exercise these rights."
                  }
            ]
      }
],
  },
  "terms": {
    slug: "terms",
    liveSlug: "terms-conditions",
    title: "Terms & Conditions",
    description: "These Terms & Conditions govern the access and use of the services, infrastructure, and facilitation platforms provided by GateXpay Technologies Private Limited.",
    pill: "Platform Terms & Jurisdiction",
    lastUpdated: "12 May 2026",
    effectiveDate: "12 May 2026",
    heroImage: "/assets/images/solution-banking.png",
    highlights: [
      {
            "title": "Technology Service Provider",
            "desc": "Operates as a technology enablement platform & CSP facilitator, not a bank."
      },
      {
            "title": "Regulated Partner Ecosystem",
            "desc": "Payment flows routed through licensed banks, NPCI rails, and aggregators."
      },
      {
            "title": "Jaipur Jurisdiction",
            "desc": "Governed by the laws of India with exclusive jurisdiction in Jaipur, Rajasthan."
      }
],
    sections: [
      {
            "id": "acceptance-of-terms",
            "heading": "1. Acceptance of Terms",
            "tocLabel": "Acceptance of Terms",
            "blocks": [
                  {
                        "type": "p",
                        "text": "By accessing or using the services provided through GateXpay, you acknowledge that you have read, understood, and agreed to be bound by these Terms & Conditions."
                  }
            ]
      },
      {
            "id": "nature-of-services",
            "heading": "2. Nature of Services",
            "tocLabel": "Nature of Services",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay Technologies Private Limited provides technology enablement and facilitation services including but not limited to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Fintech infrastructure assistance",
                              "Payment gateway tie-up facilitation",
                              "UPI collection solution assistance",
                              "Payout API integration support",
                              "KYC infrastructure solutions",
                              "Website and mobile application development",
                              "White-label fintech technology solutions",
                              "Merchant onboarding assistance",
                              "Compliance workflow support infrastructure"
                        ]
                  }
            ]
      },
      {
            "id": "technology-service-provider-status",
            "heading": "3. Technology Service Provider Status",
            "tocLabel": "Technology Service Provider Status",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay Technologies Private Limited operates solely as:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "A CSP Provider",
                              "A Technology Service Provider",
                              "A White-label fintech facilitation platform"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "GateXpay does not function as:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "A Bank",
                              "A regulated payment aggregator",
                              "An NBFC",
                              "A deposit-taking financial institution",
                              "A licensed financial regulator"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "unless explicitly stated through authorized partnerships or written agreements. GateXpay itself does not directly hold customer funds, process regulated financial deposits, or independently perform regulated banking activities."
                  }
            ]
      },
      {
            "id": "regulatory-compliance-position",
            "heading": "4. Regulatory & Compliance Position",
            "tocLabel": "Regulatory & Compliance Position",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay endeavors to operate in alignment with applicable:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "RBI guidelines",
                              "NPCI framework standards",
                              "Partner banking requirements",
                              "Applicable Indian laws and regulatory practices"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "through its regulated partner ecosystem."
                  },
                  {
                        "type": "p",
                        "text": "However, final regulatory compliance obligations, merchant approvals, onboarding decisions, transaction monitoring, settlement controls, and financial risk assessments remain solely under the authority of the respective:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Banking institutions",
                              "Payment aggregators",
                              "NBFCs",
                              "Financial service providers",
                              "Licensed regulatory entities"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "GateXpay may assist clients with compliance-related workflows, documentation support, onboarding coordination, and technology infrastructure, but GateXpay itself does not independently certify, approve, or guarantee regulatory compliance status unless expressly authorized."
                  }
            ]
      },
      {
            "id": "user-responsibilities",
            "heading": "5. User Responsibilities",
            "tocLabel": "User Responsibilities",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Users agree:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "To provide accurate and lawful information",
                              "Not to misuse the platform or services",
                              "Not to engage in fraudulent, suspicious, prohibited, or unlawful activities",
                              "To comply with applicable RBI guidelines, banking requirements, and Indian laws",
                              "To cooperate with KYC, AML, and verification requirements wherever applicable"
                        ]
                  }
            ]
      },
      {
            "id": "third-party-services",
            "heading": "6. Third-Party Services",
            "tocLabel": "Third-Party Services",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Certain services available through GateXpay are provided, processed, approved, or operated by third-party entities including:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Banks",
                              "Payment gateways",
                              "Payment aggregators",
                              "NBFCs",
                              "KYC verification providers",
                              "Financial institutions",
                              "Technology vendors"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "GateXpay shall not be held responsible for:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Third-party downtime",
                              "Banking delays",
                              "Settlement failures",
                              "Regulatory restrictions",
                              "Service interruptions",
                              "Approval/rejection decisions",
                              "Transaction holds or reversals"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "caused by such external entities."
                  }
            ]
      },
      {
            "id": "user-responsibilities",
            "heading": "7. User Responsibilities",
            "tocLabel": "User Responsibilities",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay reserves the right to suspend, restrict, or terminate access to services in cases involving:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Fraudulent activity",
                              "Suspicious transactions",
                              "Chargeback abuse",
                              "Regulatory concerns",
                              "Misrepresentation",
                              "Violation of applicable laws or partner policies"
                        ]
                  }
            ]
      },
      {
            "id": "intellectual-property",
            "heading": "8. Intellectual Property",
            "tocLabel": "Intellectual Property",
            "blocks": [
                  {
                        "type": "p",
                        "text": "All platform content, software systems, APIs, branding elements, infrastructure, website materials, and proprietary technology remain the intellectual property of GateXpay Technologies Private Limited unless otherwise specified."
                  },
                  {
                        "type": "p",
                        "text": "Unauthorized reproduction, copying, distribution, or misuse is prohibited."
                  }
            ]
      },
      {
            "id": "limitation-of-liability",
            "heading": "9. Limitation of Liability",
            "tocLabel": "Limitation of Liability",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay Technologies Private Limited shall not be liable for:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Indirect or consequential losses",
                              "Banking or settlement delays",
                              "Partner-side failures",
                              "Transaction disputes",
                              "Compliance actions by regulators or financial institutions",
                              "Technical interruptions caused by third-party providers"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Users acknowledge that financial processing and regulated activities are subject to the policies and operational controls of respective partner institutions."
                  }
            ]
      },
      {
            "id": "indemnification",
            "heading": "10. Indemnification",
            "tocLabel": "Indemnification",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Users agree to indemnify and hold harmless GateXpay Technologies Private Limited from any claims, liabilities, damages, losses, or legal expenses arising from:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Misuse of services",
                              "Fraudulent activities",
                              "Regulatory violations",
                              "Breach of these Terms & Conditions"
                        ]
                  }
            ]
      },
      {
            "id": "jurisdiction",
            "heading": "11. Jurisdiction",
            "tocLabel": "Jurisdiction",
            "blocks": [
                  {
                        "type": "p",
                        "text": "These Terms & Conditions shall be governed by the laws of India."
                  },
                  {
                        "type": "p",
                        "text": "Any disputes arising shall be subject to the exclusive jurisdiction of courts located in Jaipur, Rajasthan."
                  }
            ]
      }
],
  },
  "refund": {
    slug: "refund",
    liveSlug: "refund-policy",
    title: "Refund Policy",
    description: "This Refund & Cancellation Policy governs the use of services provided by GateXpay Technologies Private Limited.",
    pill: "Refunds & Dispute Timelines",
    lastUpdated: "11 May 2026",
    effectiveDate: "11 May 2026",
    heroImage: "/assets/images/solution-payments.png",
    highlights: [
      {
            "title": "3-Day Initiation Window",
            "desc": "Eligible transaction disputes and reversals initiated within 3 business days."
      },
      {
            "title": "12-15 Day Bank Credit",
            "desc": "Final credit timeline governed by partner banking settlement & NPCI cycles."
      },
      {
            "title": "Clear Service Terms",
            "desc": "Transparent distinction between transaction refunds and non-refundable setup fees."
      }
],
    sections: [
      {
            "id": "nature-of-services",
            "heading": "1. Nature of Services",
            "tocLabel": "Nature of Services",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay Technologies Private Limited operates as:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "A technology service provider",
                              "CSP provider",
                              "White-label fintech facilitation platform"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "GateXpay acts solely as an intermediary/mediator between merchants, service providers, banking institutions, payment aggregators, fintech partners, and verification vendors."
                  },
                  {
                        "type": "p",
                        "text": "GateXpay does not directly operate as a payment gateway, banking institution, or regulated financial entity unless explicitly stated."
                  }
            ]
      },
      {
            "id": "refund-processing",
            "heading": "2. Refund Processing",
            "tocLabel": "Refund Processing",
            "blocks": [
                  {
                        "type": "p",
                        "text": "All refunds, reversals, settlements, or transaction adjustments are processed through the respective:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Banking partner",
                              "Payment gateway provider",
                              "Financial institution",
                              "Fintech partner",
                              "Service provider"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Refund approvals and timelines are subject to the policies, systems, and procedures of the respective third-party provider involved in the transaction."
                  }
            ]
      },
      {
            "id": "refund-timeline",
            "heading": "3. Refund Timeline",
            "tocLabel": "Refund Timeline",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Eligible refunds are generally initiated within 3 business days."
                  },
                  {
                        "type": "p",
                        "text": "However, depending on:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Banking settlement cycles",
                              "NPCI/payment network processing",
                              "Partner bank procedures",
                              "Third-party provider timelines"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The final refund credit may take approximately 12-15 business days."
                  }
            ]
      },
      {
            "id": "eligible-refund-cases",
            "heading": "4. Eligible Refund Cases",
            "tocLabel": "Eligible Refund Cases",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Refunds may be considered in cases such as:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Failed transactions",
                              "Duplicate debits",
                              "Technical processing failures",
                              "Eligible disputes approved by the respective service provider",
                              "Unsuccessful payment processing confirmed by the partner institution"
                        ]
                  }
            ]
      },
      {
            "id": "non-refundable-services",
            "heading": "5. Non-Refundable Services",
            "tocLabel": "Non-Refundable Services",
            "blocks": [
                  {
                        "type": "p",
                        "text": "The following services may be non-refundable:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "API integration/setup fees",
                              "Software development charges",
                              "KYC verification charges",
                              "Compliance onboarding fees",
                              "White-label platform setup fees",
                              "Consultation or technical service fees"
                        ]
                  }
            ]
      },
      {
            "id": "third-party-responsibility",
            "heading": "6. Third-Party Responsibility",
            "tocLabel": "Third-Party Responsibility",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay Technologies Private Limited shall not be held responsible for:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Delays caused by banks or payment partners",
                              "Settlement holds",
                              "Chargeback decisions",
                              "Partner-side technical failures",
                              "Regulatory restrictions imposed by third-party institutions"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "As a mediator and technology facilitation platform, GateXpay's role is limited to coordination and technical assistance wherever applicable."
                  }
            ]
      },
      {
            "id": "dispute-resolution",
            "heading": "7. Dispute Resolution",
            "tocLabel": "Dispute Resolution",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Users are advised to contact the concerned merchant, bank, or service provider first for transaction-related disputes."
                  },
                  {
                        "type": "p",
                        "text": "GateXpay may assist in coordination wherever reasonably possible but does not guarantee refund approval."
                  }
            ]
      },
      {
            "id": "compliance",
            "heading": "8. Compliance",
            "tocLabel": "Compliance",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay endeavors to operate in alignment with applicable RBI guidelines, partner banking requirements, NPCI framework standards, and relevant Indian laws through its regulated partner ecosystem."
                  },
                  {
                        "type": "p",
                        "text": "For refund or billing-related concerns:"
                  }
            ]
      }
],
  },
  "cookies": {
    slug: "cookies",
    liveSlug: "cookie-policy",
    title: "Cookies Policy",
    description: "This Cookies Policy explains how GateXpay Technologies Private Limited uses cookies and similar technologies on GateXpay.",
    pill: "Cookies & Browser Security",
    lastUpdated: "10 May 2026",
    effectiveDate: "10 May 2026",
    heroImage: "/assets/images/solution-tech.png",
    highlights: [
      {
            "title": "Essential & Session Tokens",
            "desc": "Strictly utilized for authentication security and active session integrity."
      },
      {
            "title": "No Invasive Tracking",
            "desc": "Zero third-party advertising cookies or cross-site tracking profiles."
      },
      {
            "title": "Full Browser Control",
            "desc": "Easily configurable or blockable through standard browser privacy settings."
      }
],
    sections: [
      {
            "id": "what-are-cookies",
            "heading": "1. What Are Cookies",
            "tocLabel": "What Are Cookies",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Cookies are small text files stored on your device that help websites function efficiently, improve user experience, and analyze website performance."
                  }
            ]
      },
      {
            "id": "types-of-cookies-we-use",
            "heading": "2. Types of Cookies We Use",
            "tocLabel": "Types of Cookies We Use",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We may use:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Essential cookies for website functionality",
                              "Authentication and session cookies",
                              "Security-related cookies",
                              "Performance and analytics cookies",
                              "Preference cookies for user settings"
                        ]
                  }
            ]
      },
      {
            "id": "purpose-of-cookies",
            "heading": "3. Purpose of Cookies",
            "tocLabel": "Purpose of Cookies",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Cookies may be used to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Maintain secure login sessions",
                              "Improve website performance",
                              "Analyze traffic and usage behavior",
                              "Enhance security and fraud monitoring",
                              "Remember user preferences",
                              "Support operational functionality"
                        ]
                  }
            ]
      },
      {
            "id": "third-party-services",
            "heading": "4. Third-Party Services",
            "tocLabel": "Third-Party Services",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay may use trusted third-party tools and services including:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Analytics providers",
                              "Security monitoring systems",
                              "Performance optimization tools"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Such providers may place cookies in accordance with their own policies."
                  }
            ]
      },
      {
            "id": "user-control",
            "heading": "5. User Control",
            "tocLabel": "User Control",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Users may control or disable cookies through browser settings. However, disabling certain cookies may affect website functionality and user experience."
                  }
            ]
      },
      {
            "id": "data-privacy",
            "heading": "6. Data & Privacy",
            "tocLabel": "Data & Privacy",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Cookie-related information is handled in accordance with our Privacy Policy and applicable Indian data protection practices."
                  }
            ]
      },
      {
            "id": "updates",
            "heading": "7. Updates",
            "tocLabel": "Updates",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay reserves the right to modify this Cookies Policy at any time without prior notice."
                  }
            ]
      }
],
  },
  "disclaimer": {
    slug: "disclaimer",
    liveSlug: "disclaimer-policy",
    title: "Disclaimer Policy",
    description: "The information, services, and infrastructure provided by GateXpay Technologies Private Limited are offered on an 'as available' and 'as provided' basis.",
    pill: "Statutory Platform Disclaimers",
    lastUpdated: "08 May 2026",
    effectiveDate: "08 May 2026",
    heroImage: "/assets/images/solution-banking.png",
    highlights: [
      {
            "title": "TSP / CSP Intermediary Status",
            "desc": "GateXPay facilitates technology access; final fund handling belongs to banks."
      },
      {
            "title": "Third-Party Dependency",
            "desc": "No direct liability for banking outages, network downtime, or partner holds."
      },
      {
            "title": "No Financial Advisory",
            "desc": "Content provided is informational; users are advised to seek professional counsel."
      }
],
    sections: [
      {
            "id": "technology-service-provider-disclaimer",
            "heading": "1. Technology Service Provider Disclaimer",
            "tocLabel": "Technology Service Provider Disclaimer",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay operates solely as:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "A technology service provider",
                              "CSP provider",
                              "White-label fintech facilitation platform"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "GateXpay is not a bank, NBFC, licensed payment aggregator, or financial regulatory authority unless explicitly stated through authorized partnerships"
                  }
            ]
      },
      {
            "id": "third-party-dependency-disclaimer",
            "heading": "2. Third-Party Dependency Disclaimer",
            "tocLabel": "Third-Party Dependency Disclaimer",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Several services available through GateXpay depend on third-party entities including:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Banks",
                              "Payment gateways",
                              "Payment aggregators",
                              "KYC verification providers",
                              "Financial institutions",
                              "Technology vendors"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "GateXpay shall not be held responsible for:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Banking downtime",
                              "Settlement delays",
                              "API interruptions",
                              "Service outages",
                              "Partner-side failures",
                              "Regulatory restrictions",
                              "Transaction reversals or holds"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "caused by such third-party entities."
                  }
            ]
      },
      {
            "id": "no-financial-or-legal-advice",
            "heading": "3. No Financial or Legal Advice",
            "tocLabel": "No Financial or Legal Advice",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Information provided through the platform shall not be considered:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Financial advice",
                              "Legal advice",
                              "Regulatory certification",
                              "Investment recommendation"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Users are advised to seek independent professional consultation wherever necessary."
                  }
            ]
      },
      {
            "id": "compliance-disclaimer",
            "heading": "4. Compliance Disclaimer",
            "tocLabel": "Compliance Disclaimer",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay endeavors to align operational practices with applicable RBI guidelines, partner banking requirements, NPCI framework standards, and relevant Indian laws through its regulated partner ecosystem."
                  },
                  {
                        "type": "p",
                        "text": "However, final compliance approvals, onboarding decisions, transaction monitoring, and regulatory responsibilities remain solely under the control of the respective regulated financial institution or authorized entity"
                  }
            ]
      },
      {
            "id": "limitation-of-reliance",
            "heading": "5. Limitation of Reliance",
            "tocLabel": "Limitation of Reliance",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Users acknowledge that reliance on any information, integration, or service is at their own discretion and risk."
                  }
            ]
      },
      {
            "id": "intellectual-property",
            "heading": "6. Intellectual Property",
            "tocLabel": "Intellectual Property",
            "blocks": [
                  {
                        "type": "p",
                        "text": "All trademarks, branding, software, website content, APIs, and proprietary infrastructure remain the property of GateXpay Technologies Private Limited unless otherwise stated."
                  }
            ]
      }
],
  },
  "security": {
    slug: "security",
    liveSlug: "security-policy",
    title: "Security Policy",
    description: "This Security Policy explains the security commitment, infrastructure, and compliance practices of GateXpay Technologies Private Limited.",
    pill: "ISO & PCI-DSS Aligned Security",
    lastUpdated: "07 May 2026",
    effectiveDate: "07 May 2026",
    heroImage: "/assets/images/solution-tech.png",
    highlights: [
      {
            "title": "Bank-Grade Infrastructure",
            "desc": "Multi-layer firewall defenses, SSL/TLS encryption, and intrusion monitoring."
      },
      {
            "title": "Encrypted KYC Workflows",
            "desc": "Sensitive merchant onboarding documents processed via isolated encrypted channels."
      },
      {
            "title": "Active Incident Response",
            "desc": "Real-time threat investigation and immediate containment protocols."
      }
],
    sections: [
      {
            "id": "security-commitment",
            "heading": "1. Security Commitment",
            "tocLabel": "Security Commitment",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay Technologies Private Limited is committed to maintaining commercially reasonable security practices to protect platform infrastructure, business information, and user-related data."
                  }
            ]
      },
      {
            "id": "security-infrastructure",
            "heading": "2. Security Infrastructure",
            "tocLabel": "Security Infrastructure",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay may implement security measures including:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "SSL/TLS encryption",
                              "Secure hosting infrastructure",
                              "Access control mechanisms",
                              "Authentication protocols",
                              "Activity monitoring systems",
                              "Firewall and server-level protections",
                              "Fraud monitoring mechanisms"
                        ]
                  }
            ]
      },
      {
            "id": "kyc-verification-security",
            "heading": "3. KYC & Verification Security",
            "tocLabel": "KYC & Verification Security",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Sensitive onboarding and KYC-related information may be processed using encrypted channels and secure verification workflows through trusted partner providers."
                  }
            ]
      },
      {
            "id": "third-party-infrastructure",
            "heading": "4. Third-Party Infrastructure",
            "tocLabel": "Third-Party Infrastructure",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Certain services may rely on third-party banking, fintech, cloud, or verification providers."
                  },
                  {
                        "type": "p",
                        "text": "While GateXpay works with trusted partners, GateXpay shall not be held liable for security incidents, breaches, or failures occurring within third-party systems outside its operational control."
                  }
            ]
      },
      {
            "id": "user-responsibilities",
            "heading": "5. User Responsibilities",
            "tocLabel": "User Responsibilities",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Users are responsible for:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Maintaining confidentiality of login credentials",
                              "Securing access to their devices",
                              "Preventing unauthorized account usage",
                              "Reporting suspicious activity immediately"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Users shall be solely responsible for activities conducted through their accounts where negligence or credential compromise is involved."
                  }
            ]
      },
      {
            "id": "incident-response",
            "heading": "6. Incident Response",
            "tocLabel": "Incident Response",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay may investigate suspected security incidents and take reasonable measures including:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Temporary suspension of access",
                              "Risk mitigation actions",
                              "Security reviews",
                              "Coordination with relevant partners where applicable"
                        ]
                  }
            ]
      },
      {
            "id": "compliance-risk-practices",
            "heading": "7. Compliance & Risk Practices",
            "tocLabel": "Compliance & Risk Practices",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay endeavors to maintain operational practices aligned with:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Security protocols and standard data security measures",
                              "Partner banking requirements",
                              "Industry-standard security practices",
                              "Risk-based monitoring procedures"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "through its regulated partner ecosystem."
                  }
            ]
      },
      {
            "id": "limitation-of-liability",
            "heading": "8. Limitation of Liability",
            "tocLabel": "Limitation of Liability",
            "blocks": [
                  {
                        "type": "p",
                        "text": "No digital platform or internet-based transmission can be guaranteed as completely secure."
                  },
                  {
                        "type": "p",
                        "text": "GateXpay shall not be liable for:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Unauthorized access caused by external attacks",
                              "Internet/network failures",
                              "Third-party system vulnerabilities",
                              "User negligence",
                              "Events beyond reasonable operational control"
                        ]
                  }
            ]
      },
      {
            "id": "policy-updates",
            "heading": "9. Policy Updates",
            "tocLabel": "Policy Updates",
            "blocks": [
                  {
                        "type": "p",
                        "text": "GateXpay reserves the right to update or modify this Security Policy at any time without prior notice."
                  }
            ]
      }
],
  },
  "grievance": {
    slug: "grievance",
    liveSlug: "grievance-redressal",
    title: "Grievance Redressal",
    description: "At GateXpay, we are committed to providing ethical, transparent, and customer-focused services. This Grievance Redressal Policy outlines the process for submitting, reviewing, escalating, and resolving customer complaints.",
    pill: "Transparent Dispute Resolution",
    lastUpdated: "06 May 2026",
    effectiveDate: "06 May 2026",
    heroImage: "/assets/images/solution-banking.png",
    highlights: [
      {
            "title": "24–48h Acknowledgement",
            "desc": "Immediate complaint ticket logging and formal acknowledgement."
      },
      {
            "title": "4-Tier Escalation Matrix",
            "desc": "Direct pathway from Customer Support up to the Chief Grievance Officer."
      },
      {
            "title": "Dedicated Nodal Desk",
            "desc": "Reach our compliance team directly at support@gatexpay.com."
      }
],
    sections: [
      {
            "id": "purpose-of-the-policy",
            "heading": "1. Purpose of the Policy",
            "tocLabel": "Purpose of the Policy",
            "blocks": [
                  {
                        "type": "p",
                        "text": "The purpose of this policy is to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Provide a structured grievance handling mechanism.",
                              "Ensure fair and timely complaint resolution.",
                              "Improve customer satisfaction and service quality.",
                              "Maintain transparency in support and escalation processes.",
                              "Strengthen trust and accountability."
                        ]
                  }
            ]
      },
      {
            "id": "scope-of-complaints",
            "heading": "2. Scope of Complaints",
            "tocLabel": "Scope of Complaints",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Customers, merchants, partners, and users may raise complaints or concerns related to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Transaction issues",
                              "Payout delays or failures",
                              "Account-related concerns",
                              "Merchant disputes",
                              "Unauthorized activities",
                              "Technical support issues",
                              "Service quality concerns",
                              "Verification or onboarding delays",
                              "Compliance-related matters"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The company may request supporting information or documentation for proper investigation and resolution."
                  }
            ]
      },
      {
            "id": "grievance-handling-process",
            "heading": "3. Grievance Handling Process",
            "tocLabel": "Grievance Handling Process",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We follow a structured process for handling grievances and customer complaints."
                  },
                  {
                        "type": "p",
                        "text": "The overall handling process steps include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Complaint registration through official support channels.",
                              "Acknowledgement of complaint receipt.",
                              "Review and investigation of the issue.",
                              "Internal coordination with relevant departments.",
                              "Resolution or response provided to the complainant.",
                              "Closure of the complaint upon resolution."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Customers are encouraged to provide accurate details, transaction references, screenshots, and supporting documents where applicable."
                  }
            ]
      },
      {
            "id": "support-escalation-matrix",
            "heading": "4. Support Escalation Matrix",
            "tocLabel": "Support Escalation Matrix",
            "blocks": [
                  {
                        "type": "p",
                        "text": "If a customer is not satisfied with the initial response and resolution, the matter may be escalated to higher levels for further review."
                  },
                  {
                        "type": "p",
                        "text": "Escalation pathways include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Customer Support Team",
                              "Senior Support Team",
                              "Compliance or Operations Team",
                              "Grievance Redressal Officer"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The company will make reasonable efforts to review and resolve escalations fairly and transparently."
                  }
            ]
      },
      {
            "id": "response-timelines",
            "heading": "5. Response Timelines",
            "tocLabel": "Response Timelines",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We aim to address complaints and support queries within reasonable timeframes."
                  },
                  {
                        "type": "p",
                        "text": "Indicative timelines may include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Initial acknowledgement: Within 24-48 business hours.",
                              "Primary resolution: Within 3-7 business days.",
                              "Resolution timeframe: Depending on the complexity of the issue."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Certain cases involving third-party institutions, banks, regulatory reviews, or technical investigations may require additional time for resolution."
                  }
            ]
      },
      {
            "id": "grievance-officer-details",
            "heading": "6. Grievance Officer Details",
            "tocLabel": "Grievance Officer Details",
            "blocks": [
                  {
                        "type": "p",
                        "text": "For unresolved complaints or escalated matters, customers may contact the designated Grievance or nodal Officer through official communication channels provided by the company."
                  },
                  {
                        "type": "p",
                        "text": "Grievance Officer:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Department: Grievance Redressal & Compliance",
                              "Email: support@gatexpay.com",
                              "Website: GateXpay Official Website"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The Grievance Officer will review escalated complaints and coordinate with relevant departments for appropriate resolution."
                  }
            ]
      },
      {
            "id": "customer-responsibility",
            "heading": "7. Customer Responsibility",
            "tocLabel": "Customer Responsibility",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Customers and merchants are expected to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Provide accurate complaint details.",
                              "Share relevant supporting documents.",
                              "Cooperate during investigations.",
                              "Avoid submitting false or misleading claims.",
                              "Maintain respectful communication with support representatives."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "False, abusive, fraudulent, or malicious complaints may be subject to action under applicable laws or company policies."
                  }
            ]
      },
      {
            "id": "record-maintenance",
            "heading": "8. Record Maintenance",
            "tocLabel": "Record Maintenance",
            "blocks": [
                  {
                        "type": "p",
                        "text": "The company may maintain records of complaints, investigations, communications, and resolutions for operational, legal, compliance, and quality improvement purposes."
                  },
                  {
                        "type": "p",
                        "text": "Complaint records are handled securely and in accordance with applicable privacy and data protection standards."
                  }
            ]
      },
      {
            "id": "limitation-of-resolution",
            "heading": "9. Limitation of Resolution",
            "tocLabel": "Limitation of Resolution",
            "blocks": [
                  {
                        "type": "p",
                        "text": "While the company will make every effort to resolve complaints promptly, matters involving external institutions, payment gateways, banking partners, or regulatory bodies may be subject to additional processes and timelines outside the company's direct control."
                  }
            ]
      },
      {
            "id": "policy-updates",
            "heading": "10. Policy Updates",
            "tocLabel": "Policy Updates",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We reserve the right to modify, revise, or update this Grievance Redressal Policy at any time without prior notice. Updated versions will be published on our website with the latest effective date."
                  }
            ]
      }
],
  },
  "vendor": {
    slug: "vendor",
    liveSlug: "vendor-disclaimer",
    title: "Vendor & Third-Party Disclaimer",
    description: "This Vendor & Third-Party Risk Disclaimer explains the limitations of liability and responsibility relating to third-party service providers, banking partners, payment gateways, KYC vendors, technology vendors, and external systems.",
    pill: "Third-Party Risk & Boundaries",
    lastUpdated: "05 May 2026",
    effectiveDate: "05 May 2026",
    heroImage: "/assets/images/solution-tech.png",
    highlights: [
      {
            "title": "Banking Autonomy",
            "desc": "Bank account freezes, regulatory audits, and settlement holds operate independently."
      },
      {
            "title": "Gateway Dependency",
            "desc": "Transaction processing and API availability subject to gateway uptime."
      },
      {
            "title": "Transparent Collaboration",
            "desc": "Continuous coordination with partner banks to resolve external exceptions."
      }
],
    sections: [
      {
            "id": "purpose-of-the-policy",
            "heading": "1. Purpose of the Policy",
            "tocLabel": "Purpose of the Policy",
            "blocks": [
                  {
                        "type": "p",
                        "text": "The purpose of this disclaimer is to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Clarify the role of third-party service providers.",
                              "Define operational boundaries.",
                              "Explain external service limitations.",
                              "Provide clear understandings regarding third-party failures or delays.",
                              "Promote transparency in platform expectations."
                        ]
                  }
            ]
      },
      {
            "id": "service-responsibility-disclaimer",
            "heading": "2. Service Responsibility Disclaimer",
            "tocLabel": "Service Responsibility Disclaimer",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Banking operations are subject to policies, procedures, compliance standards, and operational availability of the respective banking partner."
                  },
                  {
                        "type": "p",
                        "text": "The company shall not be held directly responsible for:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Banking downtime or outages.",
                              "Delayed fund transfers.",
                              "Banking server failures.",
                              "Account freezes initiated by banks.",
                              "Regulatory restrictions imposed by banking regulations.",
                              "Settlement delays or failures caused by banks.",
                              "Errors in direct transfers by users."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Customers and merchants acknowledge that banking operations are subject to the policies, procedures, compliance standards, and operational availability of the respective banking partners."
                  }
            ]
      },
      {
            "id": "payment-gateway-responsibility-disclaimer",
            "heading": "3. Payment Gateway Responsibility Disclaimer",
            "tocLabel": "Payment Gateway Responsibility Disclaimer",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Payment gateway, routing, and processing services may be facilitated through third-party payment gateways, processors, aggregators, or financial infrastructure providers."
                  },
                  {
                        "type": "p",
                        "text": "The company shall not be liable for losses arising from:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Payment gateway downtime.",
                              "Transaction failures caused by gateway providers.",
                              "Delayed confirmation of payments.",
                              "Third-party API failures.",
                              "Gateway-side disconnects or transaction errors.",
                              "Integration delays or updates to payment gateway systems.",
                              "External payment network outages."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Transaction processing times may vary depending on the operational status of the respective payment partners."
                  }
            ]
      },
      {
            "id": "kyc-vendor-responsibility-disclaimer",
            "heading": "4. KYC Vendor Responsibility Disclaimer",
            "tocLabel": "KYC Vendor Responsibility Disclaimer",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Customer and merchant verification services may involve third-party KYC, KYB, identity verification, or compliance vendors."
                  },
                  {
                        "type": "p",
                        "text": "The company relies on information and verification results provided by such external providers and shall not be directly responsible for:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Delayed verification approvals.",
                              "Incorrect verification results generated by vendors.",
                              "Third-party database outages.",
                              "Government database connectivity issues.",
                              "Incomplete or inaccurate verification data.",
                              "Technical exceptions affecting the verification processes."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Customers and merchants are responsible for providing accurate and valid information during the verification process."
                  }
            ]
      },
      {
            "id": "settlement-dependency-disclaimer",
            "heading": "5. Settlement Dependency Disclaimer",
            "tocLabel": "Settlement Dependency Disclaimer",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Movement of settlements, fund transfers, and financial reconciliations may depend on multiple third-party systems and institutions, including:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Banking partners.",
                              "Payment gateways.",
                              "Nodal or escrow accounts.",
                              "Financial intermediaries.",
                              "Regulatory systems.",
                              "External processing infrastructure."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Settlement timelines may be affected by:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Banking holidays.",
                              "Compliance reviews.",
                              "Technical maintenance.",
                              "Risk monitoring procedures.",
                              "Transaction disputes.",
                              "External processing delays.",
                              "Regulatory or governmental instructions."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The company does not guarantee uninterrupted or instant settlement timelines under all circumstances."
                  }
            ]
      },
      {
            "id": "third-party-service-availability",
            "heading": "6. Third-Party Service Availability",
            "tocLabel": "Third-Party Service Availability",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We make reasonable efforts to integrate with reliable vendors and service providers. However, the company does not guarantee:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Continuous availability of third-party systems.",
                              "Error-free API links or data transfer.",
                              "Interrupted connectivity between systems.",
                              "Permanent compatibility with external APIs or schemas.",
                              "Immediate recovery from vendor-side incidents."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Third-party systems may change, suspend, or discontinue services or APIs from time to time."
                  }
            ]
      },
      {
            "id": "limitation-of-liability",
            "heading": "7. Limitation of Liability",
            "tocLabel": "Limitation of Liability",
            "blocks": [
                  {
                        "type": "p",
                        "text": "To the maximum extent permitted by applicable law, the company shall not be liable for indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses resulting from:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Actions or inactions of third-party vendors.",
                              "External infrastructure failures.",
                              "Banking or gateway outages.",
                              "Disruption of business caused by external providers.",
                              "Delays, errors, or delays in vendor transactions.",
                              "Third-party cybersecurity incidents."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Users acknowledge and agree that operational risks are an inherent part of the financial ecosystem, making multiple vendor dependencies necessary."
                  }
            ]
      },
      {
            "id": "compliance-cooperation",
            "heading": "8. Compliance & Cooperation",
            "tocLabel": "Compliance & Cooperation",
            "blocks": [
                  {
                        "type": "p",
                        "text": "The company may cooperate with banks, gateways, compliance authorities, regulators, and law enforcement agencies when legally required or operational safety warrants."
                  },
                  {
                        "type": "p",
                        "text": "Users and merchants may be required to provide necessary documentation, verification, or clarification during investigations, reviews, or dispute resolution processes."
                  }
            ]
      },
      {
            "id": "policy-updates",
            "heading": "9. Policy Updates",
            "tocLabel": "Policy Updates",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We reserve the right to modify, revise, or update this Vendor & Third-Party Risk Disclaimer at any time without prior notice. Updated versions will be published on our website with the latest effective date."
                  }
            ]
      }
],
  },
  "prohibited": {
    slug: "prohibited",
    liveSlug: "prohibited-activities",
    title: "Prohibited Activities",
    description: "This Prohibited Activities Policy defines the categories of activities, transactions, and behaviors that are prohibited or restricted on the platform managed by GateXpay Technologies Private Limited.",
    pill: "Risk Mitigation & Compliance",
    lastUpdated: "04 May 2026",
    effectiveDate: "04 May 2026",
    heroImage: "/assets/images/solution-payments.png",
    highlights: [
      {
            "title": "Zero Tolerance For Fraud",
            "desc": "Immediate freeze on suspicious velocity patterns and unauthorized payouts."
      },
      {
            "title": "Banned Business Sectors",
            "desc": "Strict prohibition on online betting, unlicensed crypto/forex, and pirated goods."
      },
      {
            "title": "Statutory Reporting",
            "desc": "Active compliance coordination with regulatory and law enforcement bodies."
      }
],
    sections: [
      {
            "id": "purpose-of-the-policy",
            "heading": "1. Purpose of the Policy",
            "tocLabel": "Purpose of the Policy",
            "blocks": [
                  {
                        "type": "p",
                        "text": "The purpose of this policy is to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Prevent illegal and unauthorized activities",
                              "Protect the platform, merchants, and users",
                              "Ensure compliance with applicable laws and regulations",
                              "Maintain a secure, ethical business environment",
                              "Minimize financial and operational risks"
                        ]
                  }
            ]
      },
      {
            "id": "general-restriction",
            "heading": "2. General Restriction",
            "tocLabel": "General Restriction",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Users, merchants, and partner network are strictly prohibited from using our services for any unlawful, fraudulent, deceptive, harmful, or unauthorized purpose."
                  },
                  {
                        "type": "p",
                        "text": "The company reserves the right to investigate, restrict, suspend, or terminate services immediately in case of policy violations."
                  }
            ]
      },
      {
            "id": "restricted-activities",
            "heading": "3. Restricted Activities",
            "tocLabel": "Restricted Activities",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Restricted activities generally include activities requiring special regulatory approvals, licenses, or specific compliance measures."
                  },
                  {
                        "type": "p",
                        "text": "Restricted activities include but are not limited to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Online betting platforms",
                              "Gaming websites",
                              "Digital currencies",
                              "Systemic risks",
                              "Gaming activities requiring regulatory tracking",
                              "Virtual asset trading portals"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Merchants operating in restricted sectors must be registered and comply with industry and regulatory approvals."
                  }
            ]
      },
      {
            "id": "compliance-violations-without-approvals",
            "heading": "4. Compliance Violations Without Approvals",
            "tocLabel": "Compliance Violations Without Approvals",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Certain business categories and activities that are unlicensed or unregulated are prohibited or strictly limited. These activities include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Unlicensed crypto exchanges",
                              "Unlicensed carbon credits",
                              "Unapproved financial entities",
                              "Unlicensed forex trading",
                              "Unregulated digital asset trading",
                              "Virtual asset trading without authorization"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The company reserves the right to request regulatory documentation and documentation from relevant authorities where applicable."
                  }
            ]
      },
      {
            "id": "asset-tracking-digital-services",
            "heading": "5. Asset Tracking & Digital Services",
            "tocLabel": "Asset Tracking & Digital Services",
            "blocks": [
                  {
                        "type": "p",
                        "text": "The platform reserves the right to restrict products or services involving tracking, security, or assets related activities. Restricted activities include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Asset tracking services",
                              "Special digital services",
                              "Asset tracking platforms",
                              "Payment collection systems for tracking",
                              "Unapproved asset tracking software"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Any product or service solely relying on tracking activities shall be reviewed for risk assessment."
                  }
            ]
      },
      {
            "id": "illegal-transactions-products-or-services",
            "heading": "6. Illegal Transactions, Products, or Services",
            "tocLabel": "Illegal Transactions, Products, or Services",
            "blocks": [
                  {
                        "type": "p",
                        "text": "The sale, distribution, promotion, or facilitation of illegal items and services is strictly prohibited."
                  },
                  {
                        "type": "p",
                        "text": "These include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Unapproved pharmaceuticals",
                              "Controlled substances",
                              "Illegal drugs",
                              "Pyrotechnics and hazardous substances",
                              "Counterfeit items and software",
                              "Unapproved medical devices"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Merchants dealing in regulated products must possess standard license keys and documents for compliance verification."
                  }
            ]
      },
      {
            "id": "fraudulent-activities",
            "heading": "7. Fraudulent Activities",
            "tocLabel": "Fraudulent Activities",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Fraudulent, deceptive, or misleading actions are strictly prohibited."
                  },
                  {
                        "type": "p",
                        "text": "Examples include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Identity theft",
                              "Payment fraud",
                              "Unapproved payout",
                              "Money laundering/facilitation services",
                              "Pirated software, media",
                              "Unauthorized financial collection",
                              "Third-party payment collection"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The company acts as a technology service provider and complies with relevant laws for preventing financial crimes."
                  }
            ]
      },
      {
            "id": "social-engineering-harassment-activities",
            "heading": "8. Social Engineering & Harassment Activities",
            "tocLabel": "Social Engineering & Harassment Activities",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Activities that exploit user trust, harass, or cause harm are prohibited. Restricted activities include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Phishing activities",
                              "Spam activities",
                              "Social engineering scams",
                              "Abusive communication",
                              "Unauthorized collection of information",
                              "Misleading marketing practices"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Our services are designed to protect users and maintain standard regulatory practices."
                  }
            ]
      },
      {
            "id": "data-processing-security-management",
            "heading": "9. Data Processing & Security Management",
            "tocLabel": "Data Processing & Security Management",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Users and merchants must adhere to standard security measures and data protection practices."
                  },
                  {
                        "type": "p",
                        "text": "Prohibited activities include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Data safety compromise",
                              "Unauthorized data processing",
                              "Unapproved data sharing",
                              "Misuse of customer information",
                              "Systemic security leaks",
                              "Bypassing security protocols"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Failure to adhere to standard security guidelines may lead to service suspension and legal action."
                  }
            ]
      },
      {
            "id": "regulatory-compliance-and-restrictive-list",
            "heading": "10. Regulatory Compliance and Restrictive List",
            "tocLabel": "Regulatory Compliance and Restrictive List",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We do not service entities or individuals operating in high-risk or prohibited jurisdictions or listed in regulatory restriction lists. Excluded list includes:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Sanctioned countries list",
                              "Unregulated financial centers",
                              "Banned organizations list",
                              "Dark web related activities",
                              "Illegal digital markets",
                              "Unapproved international entities",
                              "Activities violating international laws"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The company reserves the right to block transactions or terminate accounts to ensure compliance."
                  }
            ]
      },
      {
            "id": "monitoring-enforcement",
            "heading": "11. Monitoring & Enforcement",
            "tocLabel": "Monitoring & Enforcement",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We actively monitor transactions and client activities to detect and prevent prohibited behavior."
                  },
                  {
                        "type": "p",
                        "text": "The company reserves the right to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Request additional verification documents",
                              "Suspend transaction processing",
                              "Block platform access",
                              "Report violations to law enforcement authorities"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Failure to comply with monitoring requests may result in immediate account termination."
                  }
            ]
      },
      {
            "id": "compliance-responsibilities",
            "heading": "12. Compliance Responsibilities",
            "tocLabel": "Compliance Responsibilities",
            "blocks": [
                  {
                        "type": "p",
                        "text": "All users, merchants, and partners are responsible for ensuring that their activities comply with:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Applicable laws and regulations",
                              "Industry compliance standards",
                              "Standard policies and operating guidelines",
                              "Our system requirements",
                              "Our business practices"
                        ]
                  }
            ]
      },
      {
            "id": "policy-updates",
            "heading": "13. Policy Updates",
            "tocLabel": "Policy Updates",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We reserve the right to update, modify, or change this Prohibited Activities Policy at any time without prior notice. Latest version will be published on our website."
                  }
            ]
      }
],
  },
  "merchant": {
    slug: "merchant",
    liveSlug: "merchant-onboarding",
    title: "Merchant Onboarding",
    description: "This Merchant Onboarding Policy outlines the requirements, verification standards, compliance processes, and operational guidelines for onboarding merchants onto the payment facilitation ecosystem.",
    pill: "Merchant Due Diligence & Vetting",
    lastUpdated: "03 May 2026",
    effectiveDate: "03 May 2026",
    heroImage: "/assets/images/solution-banking.png",
    highlights: [
      {
            "title": "KYC & Legal Vetting",
            "desc": "Mandatory verification of Business PAN, GST, bank accounts, and authorized signatories."
      },
      {
            "title": "UBO & PEP Screening",
            "desc": "Screening against domestic and international sanction and risk databases."
      },
      {
            "title": "Continuous Monitoring",
            "desc": "Ongoing velocity audits and chargeback management post-onboarding."
      }
],
    sections: [
      {
            "id": "purpose-of-the-policy",
            "heading": "1. Purpose of the Policy",
            "tocLabel": "Purpose of the Policy",
            "blocks": [
                  {
                        "type": "p",
                        "text": "The purpose of this Merchant Onboarding Policy is to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Establish clear onboarding criteria",
                              "Verify merchant identity and credibility",
                              "Ensure compliance with regulatory requirements",
                              "Assess merchant risk levels and business legitimacy",
                              "Maintain network security and operational integrity",
                              "Protect consumers and transaction security"
                        ]
                  }
            ]
      },
      {
            "id": "merchant-eligibility",
            "heading": "2. Merchant Eligibility",
            "tocLabel": "Merchant Eligibility",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Businesses, individuals, and partners seeking onboarding must provide complete, accurate, and verifiable information during the onboarding process."
                  },
                  {
                        "type": "p",
                        "text": "Merchant onboarding is subject to the verification of:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Nature of business",
                              "Business registration status",
                              "Operational legitimacy",
                              "Compliance history",
                              "Risk profile",
                              "Industry regulations",
                              "Geographic location"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The company reserves the right to accept, reject, or terminate merchant onboarding applications."
                  }
            ]
      },
      {
            "id": "kyc-verification-requirements",
            "heading": "3. KYC & Verification Requirements",
            "tocLabel": "KYC & Verification Requirements",
            "blocks": [
                  {
                        "type": "p",
                        "text": "All merchants are required to submit standard documentation for verification and KYC compliance."
                  },
                  {
                        "type": "p",
                        "text": "Verification documentation includes:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Business registration certificate",
                              "PAN Card of the business",
                              "GST Certificate",
                              "Address proof of the business",
                              "Bank account verification",
                              "Authorized representative identity and address proof",
                              "Website/Mobile application link (for online activity review)",
                              "Supporting documents for financial evaluation (if applicable)"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Merchants must ensure that all submitted information remains accurate and up-to-date."
                  }
            ]
      },
      {
            "id": "kyc-verification",
            "heading": "4. KYC Verification",
            "tocLabel": "KYC Verification",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Verification aligns with standard KYC norms and compliance frameworks."
                  },
                  {
                        "type": "p",
                        "text": "Verification steps include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Verification of legal and business name",
                              "Identification of beneficial owners",
                              "Screening against PEP and sanction lists",
                              "Business activity verification",
                              "Review of business ownership structure",
                              "Source of business and operational activity assessment",
                              "Compliance monitoring and risk assessment"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Failure to provide required documentation or clarification may result in onboarding delays, suspension, or rejection."
                  }
            ]
      },
      {
            "id": "prohibited-business-categories",
            "heading": "5. Prohibited Business Categories",
            "tocLabel": "Prohibited Business Categories",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We restrict onboarding of merchants operating in certain business categories to maintain security. Prohibited categories include but are not limited to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "High-risk financial services",
                              "Unlicensed crypto/virtual asset trading",
                              "Digital content piracy",
                              "Systemic financial risks",
                              "Unlicensed/unapproved medical services",
                              "Activities involving tracking, security, or assets related activities without authorization",
                              "Any activity violating domestic or international laws"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Merchant onboarding list is subject to periodic updates and compliance reviews."
                  }
            ]
      },
      {
            "id": "transacting-restriction",
            "heading": "6. Transacting Restriction",
            "tocLabel": "Transacting Restriction",
            "blocks": [
                  {
                        "type": "p",
                        "text": "The following activities, products, or services must be restricted from using our platform:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Illegal or unauthorized activities",
                              "Prohibited substances or weapons distribution",
                              "Money laundering or terrorist financing activities",
                              "Advertising or selling unapproved services",
                              "Sale of counterfeit goods",
                              "Unlicensed software distribution",
                              "Adult content and related services",
                              "Activities violating third-party intellectual property rights",
                              "Unapproved physical or digital products",
                              "Any activity violating public decency, local laws, or regulations"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The company reserves the right to restrict transaction processing or terminate onboarding at any time without prior notice."
                  }
            ]
      },
      {
            "id": "merchant-approval-rights",
            "heading": "7. Merchant Approval Rights",
            "tocLabel": "Merchant Approval Rights",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Onboarding applications are subject to risk assessment and final approval."
                  },
                  {
                        "type": "p",
                        "text": "The company reserves the right to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Request additional information or documentation",
                              "Conduct periodic audits to verify compliance",
                              "Reject onboarding applications without disclosing reasons",
                              "Suspend or terminate existing merchant accounts",
                              "Impose operational limitations or transaction limits",
                              "Periodically review merchant activities for compliance validation"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Onboarded merchants must adhere to our terms, policies, and operational guidelines."
                  }
            ]
      },
      {
            "id": "transaction-monitoring",
            "heading": "8. Transaction Monitoring",
            "tocLabel": "Transaction Monitoring",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We actively monitor merchant transactions and activities to identify suspicious, fraudulent, or unauthorized behavior."
                  },
                  {
                        "type": "p",
                        "text": "Monitoring activities include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Analysis of transaction patterns",
                              "Detecting unusual activity",
                              "Chargeback monitoring",
                              "Review of transaction velocity limit",
                              "Periodic audit and reporting",
                              "Compliance monitoring",
                              "Risk-based transaction review"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The company reserves the right to suspend accounts, withhold funds, or terminate onboarding if suspicious activity is identified."
                  }
            ]
      },
      {
            "id": "ongoing-compliance-obligations",
            "heading": "9. Ongoing Compliance Obligations",
            "tocLabel": "Ongoing Compliance Obligations",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Approved merchants are required to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Maintain valid and accurate business information",
                              "Comply with applicable laws and regulations",
                              "Cooperate with compliance reviews and audits",
                              "Report security incidents immediately",
                              "Ensure prohibited activities are prevented",
                              "Adhere to security standards and industry guidelines"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Failure to comply with these obligations may result in account suspension or termination."
                  }
            ]
      },
      {
            "id": "process-security",
            "heading": "10. Process Security",
            "tocLabel": "Process Security",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Merchant onboarding data is stored securely in accordance with our data protection policies and internal compliance standards."
                  },
                  {
                        "type": "p",
                        "text": "We implement standard security measures to protect onboarded merchant data."
                  }
            ]
      },
      {
            "id": "policy-updates",
            "heading": "11. Policy Updates",
            "tocLabel": "Policy Updates",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We reserve the right to modify, change, or update this Merchant Onboarding Policy at any time. Updated versions will be published on our website and become effective immediately."
                  }
            ]
      }
],
  },
  "data": {
    slug: "data",
    liveSlug: "data-protection",
    title: "Data Protection Policy",
    description: "We are committed to ensuring the confidentiality, integrity, and availability of customer, merchant, partner, and company information. This Data Protection & Information Security Policy outlines our security practices.",
    pill: "AES-256 Data Safeguards",
    lastUpdated: "02 May 2026",
    effectiveDate: "02 May 2026",
    heroImage: "/assets/images/solution-tech.png",
    highlights: [
      {
            "title": "Cryptographic Protection",
            "desc": "AES-256 for data at rest and TLS 1.3 for all live payment and API transmissions."
      },
      {
            "title": "Role-Based Access (RBAC)",
            "desc": "Multi-factor authentication (MFA) and least-privilege system access."
      },
      {
            "title": "Secure API Infrastructure",
            "desc": "Automated rate limiting, anomaly detection, and vulnerability patching."
      }
],
    sections: [
      {
            "id": "purpose-of-the-policy",
            "heading": "1. Purpose of the Policy",
            "tocLabel": "Purpose of the Policy",
            "blocks": [
                  {
                        "type": "p",
                        "text": "The purpose of this policy is to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Protect customer and business information",
                              "Ensure compliance with data protection regulations",
                              "Prevent unauthorized access and data breaches",
                              "Maintain operational security and business continuity",
                              "Promote data security awareness and practices",
                              "Define roles and responsibilities for data protection"
                        ]
                  }
            ]
      },
      {
            "id": "information-security-commitment",
            "heading": "2. Information Security Commitment",
            "tocLabel": "Information Security Commitment",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We implement reasonable administrative, technical, and physical measures to secure data processed through our platform."
                  },
                  {
                        "type": "p",
                        "text": "Our security commitment includes:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Data encryption in transit and at rest",
                              "Regular security assessments",
                              "Vulnerability management",
                              "Secure development lifecycle",
                              "Incident response planning",
                              "Employee training on security awareness"
                        ]
                  }
            ]
      },
      {
            "id": "encryption-standards",
            "heading": "3. Encryption Standards",
            "tocLabel": "Encryption Standards",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We use industry-standard encryption methods to protect sensitive information during storage and transmission."
                  },
                  {
                        "type": "p",
                        "text": "Security measures may include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "AES-256 encryption for data at rest",
                              "SSL/TLS protocols for secure data transmission",
                              "Secure key management practices",
                              "Encryption of confidential business information",
                              "Secure transmission protocols for partner integrations"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "We regularly review and update encryption practices to align with industry standards."
                  }
            ]
      },
      {
            "id": "access-management",
            "heading": "4. Access Management",
            "tocLabel": "Access Management",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Access to systems, platforms, databases, and customer information is restricted to authorized personnel only."
                  },
                  {
                        "type": "p",
                        "text": "Access management practices include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Role-based access control (RBAC)",
                              "Multi-factor authentication (MFA)",
                              "Restricting access to sensitive data",
                              "Monitoring user access logs",
                              "Regular review of access privileges",
                              "Terminating access immediately upon termination of employment"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Employees and authorized personnel must follow security guidelines when accessing company systems."
                  }
            ]
      },
      {
            "id": "internal-access-controls",
            "heading": "5. Internal Access Controls",
            "tocLabel": "Internal Access Controls",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We maintain access controls to ensure that only authorized personnel can access sensitive systems and data."
                  },
                  {
                        "type": "p",
                        "text": "Controls include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Department-wise access restrictions",
                              "Limited administrative privileges",
                              "Activity monitoring and logging",
                              "Confidentiality agreements for employees and contractors",
                              "Segregation of duties for critical operations",
                              "Controlled access to system logs and database backups"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Unauthorized access attempts are monitored and may lead to disciplinary and legal action."
                  }
            ]
      },
      {
            "id": "data-retention",
            "heading": "6. Data Retention",
            "tocLabel": "Data Retention",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Personal and transaction data is retained only for as long as necessary to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Deliver services",
                              "Fulfill legal and regulatory obligations",
                              "Resolve disputes",
                              "Secure business records",
                              "Prevent fraud and abuse"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Once the retention period expires, data may be securely deleted, archived, anonymized, or destroyed in accordance with applicable laws and company standards."
                  }
            ]
      },
      {
            "id": "vendor-security",
            "heading": "7. Vendor Security",
            "tocLabel": "Vendor Security",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We work with third-party vendors, service providers, and partners who implement security measures to support our operations."
                  },
                  {
                        "type": "p",
                        "text": "Vendors must meet our security standards, including:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Adequate security certifications",
                              "Data confidentiality compliance",
                              "Compliance with local data protection laws",
                              "Secure integration practices",
                              "Incident reporting and communication protocols"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "We review vendor security practices periodically to ensure alignment with security standards."
                  }
            ]
      },
      {
            "id": "secure-api-handling",
            "heading": "8. Secure API Handling",
            "tocLabel": "Secure API Handling",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We implement security controls for APIs, integrations, and digital communication used in our platform and services."
                  },
                  {
                        "type": "p",
                        "text": "API security practices include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Secure authentication and authorization",
                              "Data encryption in transit",
                              "Rate limiting and request filtering",
                              "Regular security testing",
                              "Vulnerability patching",
                              "Monitoring API traffic"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Unauthorized API usage, abuse, or malicious activity may lead to immediate access restriction or legal action."
                  }
            ]
      },
      {
            "id": "incident-reporting-security-response",
            "heading": "9. Incident Reporting & Security Response",
            "tocLabel": "Incident Reporting & Security Response",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We maintain incident response procedures to identify, investigate, manage, and report potential security incidents."
                  },
                  {
                        "type": "p",
                        "text": "Security response plans include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Detection and analysis of security threats",
                              "Immediate containment measures",
                              "Investigation of affected systems",
                              "Reporting and notification procedures",
                              "Post-incident analysis and improvements",
                              "Coordination with regulatory authorities when required"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "We continuously improve our security response processes to minimize risks and operational disruptions."
                  }
            ]
      },
      {
            "id": "employee-compliance-responsibility",
            "heading": "10. Employee Compliance & Responsibility",
            "tocLabel": "Employee Compliance & Responsibility",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Employees, contractors, and authorized personnel are expected to follow company security policies and confidentiality obligations."
                  },
                  {
                        "type": "p",
                        "text": "Security compliance requirements include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Adhering to security guidelines",
                              "Reporting suspicious activities",
                              "Maintaining strong credentials",
                              "Secure data handling practices",
                              "Cooperating with security audits"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Failure to comply with company security standards may result in disciplinary action, termination of access, and legal consequences."
                  }
            ]
      },
      {
            "id": "compliance-legal-requirements",
            "heading": "11. Compliance & Legal Requirements",
            "tocLabel": "Compliance & Legal Requirements",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We strive to comply with applicable data protection, cybersecurity, and technology requirement standards set by regulatory authorities."
                  },
                  {
                        "type": "p",
                        "text": "The company may cooperate with law enforcement agencies, regulators, and authorized bodies where legally required."
                  }
            ]
      },
      {
            "id": "policy-updates",
            "heading": "12. Policy Updates",
            "tocLabel": "Policy Updates",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We reserve the right to update, modify, or change this Data Protection & Information Security Policy at any time. Latest versions will be published on our website with the updated effective date."
                  }
            ]
      }
],
  },
  "aml-kyc": {
    slug: "aml-kyc",
    liveSlug: "aml-kyc",
    title: "AML/KYC Policy",
    description: "We are committed to maintaining the highest standards of integrity, transparency, and security in all our financial and digital service operations.",
    pill: "Anti-Money Laundering Framework",
    lastUpdated: "01 May 2026",
    effectiveDate: "01 May 2026",
    heroImage: "/assets/images/solution-payments.png",
    highlights: [
      {
            "title": "Customer Due Diligence (CDD)",
            "desc": "Rigorous identity verification of Aadhaar, PAN, voter credentials, and business registrations."
      },
      {
            "title": "Enhanced Due Diligence (EDD)",
            "desc": "Specialized deep audits for high-risk transaction volumes and jurisdictions."
      },
      {
            "title": "Audit Trail Retention",
            "desc": "Tamper-proof storage of transaction records as mandated by Indian financial statutes."
      }
],
    sections: [
      {
            "id": "purpose-of-the-policy",
            "heading": "1. Purpose of the Policy",
            "tocLabel": "Purpose of the Policy",
            "blocks": [
                  {
                        "type": "p",
                        "text": "The purpose of this AML/KYC Policy is to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Prevent the use of financial services for illegal activities.",
                              "Verify the identity and authenticity of customers and merchants.",
                              "Detect and report suspicious transactions.",
                              "Maintain regulatory compliance.",
                              "Protect the company, its network, and its users from fraud and financial crimes."
                        ]
                  }
            ]
      },
      {
            "id": "customer-due-diligence-cdd",
            "heading": "2. Customer Due Diligence (CDD)",
            "tocLabel": "Customer Due Diligence (CDD)",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We perform Customer Due Diligence (CDD) before onboarding any customer, merchant, or business partner."
                  },
                  {
                        "type": "p",
                        "text": "CDD processes may include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Verification of identity documents.",
                              "Collection of basic business information.",
                              "Address verification.",
                              "Mobile number and email verification.",
                              "Business model and operation checks.",
                              "Validation of bank accounts and regulatory registrations."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Customers may be required to provide documents such as:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Aadhaar Card",
                              "PAN Card",
                              "Passport",
                              "Driving License",
                              "Voter ID",
                              "Business Registration Documents"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The company reserves the right to request additional identification details, records, or updates when required."
                  }
            ]
      },
      {
            "id": "enhanced-due-diligence-edd",
            "heading": "3. Enhanced Due Diligence (EDD)",
            "tocLabel": "Enhanced Due Diligence (EDD)",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Enhanced Due Diligence (EDD) is applied to high-risk customers, transactions, merchants, or jurisdictions."
                  },
                  {
                        "type": "p",
                        "text": "EDD measures may include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Additional identity verification.",
                              "Source of funds evaluation.",
                              "Real owner/beneficiary identification.",
                              "Close monitoring of transactions.",
                              "Additional document requests.",
                              "Senior management approval for onboarding."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "High-risk profiles are subject to periodic reviews to ensure compliance status is maintained."
                  }
            ]
      },
      {
            "id": "suspicious-transaction-monitoring",
            "heading": "4. Suspicious Transaction Monitoring",
            "tocLabel": "Suspicious Transaction Monitoring",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We utilize automated systems and human review processes to analyze platform activities and detect suspicious behavior."
                  },
                  {
                        "type": "p",
                        "text": "Examples of suspicious activities include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Large or unusually structured transactions.",
                              "Multiple related transactions.",
                              "Use of mismatched names or documents.",
                              "Transactions inconsistent with business profile.",
                              "Attempts to bypass verification limitations.",
                              "Activities links to suspicious/blacklisted entities."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The company reserves the right to:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Suspend or restrict account services.",
                              "Temporarily suspend transactions for investigation.",
                              "Report suspicious activities to relevant authorities when required by law."
                        ]
                  }
            ]
      },
      {
            "id": "risk-categorization",
            "heading": "5. Risk Categorization",
            "tocLabel": "Risk Categorization",
            "blocks": [
                  {
                        "type": "p",
                        "text": "Users and merchants are categorized into risk levels based on various risk parameters."
                  },
                  {
                        "type": "p",
                        "text": "Risk categories include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Low Risk",
                              "Medium Risk",
                              "High Risk"
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Risk factors include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Nature of business.",
                              "Transaction volume.",
                              "Geographic location.",
                              "Type of services.",
                              "Historical behavior patterns.",
                              "Regulatory concerns."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "High-risk profiles may be subject to additional verification and stricter monitoring protocols."
                  }
            ]
      },
      {
            "id": "merchant-verification",
            "heading": "6. Merchant Verification",
            "tocLabel": "Merchant Verification",
            "blocks": [
                  {
                        "type": "p",
                        "text": "All merchants utilizing our services are required to undergo comprehensive verification procedures before active usage."
                  },
                  {
                        "type": "p",
                        "text": "Merchant verification may include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Business registration certificate.",
                              "GST registration.",
                              "PAN verification.",
                              "Bank account verification.",
                              "Address verification.",
                              "Director/promoter identity verification.",
                              "Website or business model review."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "The company may suspend services if verification details are found to be false, misleading, or incomplete during checks."
                  }
            ]
      },
      {
            "id": "compliance-screening",
            "heading": "7. Compliance Screening",
            "tocLabel": "Compliance Screening",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We perform compliance screening as part of our compliance process."
                  },
                  {
                        "type": "p",
                        "text": "This includes checking against:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Government sanction lists.",
                              "Regulatory warning lists.",
                              "Politically Exposed Persons (PEPs) database.",
                              "Restricted or prohibited entities."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "Accounts associated with sanctioned entities or blacklisted list matches may be blocked, suspended, or reported to local compliance authorities."
                  }
            ]
      },
      {
            "id": "record-retention",
            "heading": "8. Record Retention",
            "tocLabel": "Record Retention",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We maintain records of customer verification, transactions, compliance checks, and system activities for a regulatory defined period."
                  },
                  {
                        "type": "p",
                        "text": "Records retained may include:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "KYC documents & records.",
                              "Transaction history.",
                              "Merchant verification details.",
                              "Correspondence records.",
                              "Compliance audit logs."
                        ]
                  },
                  {
                        "type": "p",
                        "text": "These records are securely stored and preserved in accordance with applicable data protection laws."
                  }
            ]
      },
      {
            "id": "compliance-reporting",
            "heading": "9. Compliance & Reporting",
            "tocLabel": "Compliance & Reporting",
            "blocks": [
                  {
                        "type": "p",
                        "text": "The company designates compliance officers and team members to supervise AML/KYC procedures, reporting, training, and reviews."
                  },
                  {
                        "type": "p",
                        "text": "Failure to comply with AML/KYC requirements may result in:"
                  },
                  {
                        "type": "list",
                        "bold": true,
                        "items": [
                              "Account suspension.",
                              "Transaction blocks.",
                              "Service termination.",
                              "Reporting to regulatory authorities."
                        ]
                  }
            ]
      },
      {
            "id": "security-confidentiality",
            "heading": "10. Security & Confidentiality",
            "tocLabel": "Security & Confidentiality",
            "blocks": [
                  {
                        "type": "p",
                        "text": "All customer data and compliance records collected under this policy are handled with high confidentiality and security."
                  },
                  {
                        "type": "p",
                        "text": "We implement modern security safeguards to prevent unauthorized access, use, disclosure, modification, or destruction."
                  }
            ]
      },
      {
            "id": "policy-updates",
            "heading": "11. Policy Updates",
            "tocLabel": "Policy Updates",
            "blocks": [
                  {
                        "type": "p",
                        "text": "We reserve the right to review, modify, or update this AML/KYC Policy at any time without prior notice. Updated versions of the policy will be published on our website with the latest effective date."
                  }
            ]
      }
],
  },
};

// Map live URLs (/policy/privacy-policy) to short keys (privacy)
export const SLUG_ALIAS_MAP: Record<string, LegalSlug> = {
  "privacy": "privacy",
  "privacy-policy": "privacy",
  "terms": "terms",
  "terms-conditions": "terms",
  "refund": "refund",
  "refund-policy": "refund",
  "cookies": "cookies",
  "cookie-policy": "cookies",
  "disclaimer": "disclaimer",
  "disclaimer-policy": "disclaimer",
  "security": "security",
  "security-policy": "security",
  "grievance": "grievance",
  "grievance-redressal": "grievance",
  "vendor": "vendor",
  "vendor-disclaimer": "vendor",
  "prohibited": "prohibited",
  "prohibited-activities": "prohibited",
  "merchant": "merchant",
  "merchant-onboarding": "merchant",
  "data": "data",
  "data-protection": "data",
  "aml-kyc": "aml-kyc",
};

export function resolvePolicySlug(rawSlug: string): LegalSlug | undefined {
  return SLUG_ALIAS_MAP[rawSlug.toLowerCase()];
}

export const ALL_POLICY_SLUGS: string[] = Object.keys(SLUG_ALIAS_MAP);
