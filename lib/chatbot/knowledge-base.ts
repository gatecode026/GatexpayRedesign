import { KnowledgeItem } from './types';

export const gatexpayKnowledgeBase: KnowledgeItem[] = [
  {
    id: 'about_company_overview',
    category: 'about_company',
    title: 'GateXPay Overview and Legal Entity Details',
    keywords: ['gatexpay', 'about', 'who we are', 'what is gatexpay', 'company overview'],
    questions: [
      'What is GateXPay?',
      'Tell me about GateXPay.',
      'Who is GateXPay?'
    ],
    answer: 'Gatexpay Technologies Private Limited is a Jaipur-based fintech infrastructure and technology solutions company focused on enabling businesses with secure, scalable, and partner-driven digital financial solutions. We operate as a Technology Service Provider (TSP) and Customer Service Point (CSP) facilitation platform to bridge the gap between businesses and the fintech ecosystem.',
    sourcePath: 'app/about/page.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'medium'
  },
  {
    id: 'about_company_clarification',
    category: 'compliance',
    title: 'Important Financial Licensing Clarification',
    keywords: ['bank', 'nbfc', 'license', 'aggregator', 'regulated', 'rbi'],
    questions: [
      'Are you a bank?',
      'Are you RBI approved?',
      'Do you have a payment aggregator license?',
      'Is GateXPay an NBFC?'
    ],
    answer: 'Gatexpay Technologies Private Limited operates solely as a technology and facilitation platform. We do not independently function as a bank, a licensed payment aggregator, an NBFC, or a regulated deposit-taking institution. Certain services available through GateXPay are delivered through regulated banks, financial institutions, payment providers, or authorized third-party partners.',
    sourcePath: 'app/about/page.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'high'
  },
  {
    id: 'contact_phone',
    category: 'contact',
    title: 'Support Phone Number',
    keywords: ['phone', 'number', 'contact number', 'mobile', 'call', 'telephone'],
    questions: [
      'What is your contact number?',
      'What is your phone number?',
      'contact number',
      'phone number',
      'how to call you'
    ],
    answer: 'You can reach GateXPay support by phone at +91 8502888838.',
    sourcePath: 'components/frontend/Footer/Footer.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'high'
  },
  {
    id: 'contact_email',
    category: 'contact',
    title: 'Support Email Address',
    keywords: ['email', 'mail', 'support email', 'write to us', 'email address'],
    questions: [
      'What is the email address?',
      'What is your email?',
      'email address',
      'how to email you'
    ],
    answer: 'You can email GateXPay support at info@gatexpay.in.',
    sourcePath: 'components/frontend/Footer/Footer.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'high'
  },
  {
    id: 'contact_address',
    category: 'contact',
    title: 'Official Office Address',
    keywords: ['address', 'location', 'office', 'headquarters', 'located', 'where'],
    questions: [
      'Where is your office located?',
      'What is the company address?',
      'office location',
      'address'
    ],
    answer: 'Our office is located at: 412, Sumer Nagar, Mansarovar, Jaipur, Rajasthan - 302020.',
    sourcePath: 'components/frontend/Footer/Footer.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'high'
  },
  {
    id: 'contact_general',
    category: 'contact',
    title: 'How to Contact GateXPay',
    keywords: ['contact', 'support', 'help', 'reach', 'get in touch'],
    questions: [
      'How do I reach support?',
      'how to contact support',
      'how to get in touch'
    ],
    answer: 'You can contact GateXPay support by phone at +91 8502888838, via email at info@gatexpay.in, or visit our office at 412, Sumer Nagar, Mansarovar, Jaipur, Rajasthan - 302020.',
    sourcePath: 'components/frontend/Footer/Footer.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'high'
  },
  {
    id: 'leadership_details',
    category: 'about_company',
    title: 'Company Founders and Leadership',
    keywords: ['founder', 'founders', 'ceo', 'cfo', 'vansh', 'govind', 'owner', 'leadership'],
    questions: [
      'Who founded GateXPay?',
      'Who is the CEO?',
      'Who is Vansh Chaudhary?',
      'Who is Govind Jain?'
    ],
    answer: 'GateXPay Technologies Private Limited was founded by our leadership team: Vansh Chaudhary, who serves as the Chief Executive Officer (CEO), and Govind Jain, who serves as the Chief Financial Officer (CFO).',
    sourcePath: 'components/frontend/About/AboutComponents.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'high'
  },
  {
    id: 'services_csp_overview',
    category: 'csp_services',
    title: 'Customer Service Point (CSP) Services Facilitated',
    keywords: ['csp', 'retail', 'agent', 'banking point', 'csp services', 'onboarding', 'register'],
    questions: [
      'What are your CSP services?',
      'What do you offer for retail agents?',
      'How does CSP onboarding work?',
      'CSP onboarding?'
    ],
    answer: 'GateXPay facilitates a comprehensive suite of Customer Service Point (CSP) solutions designed to empower retail agents and banking networks. These include Aadhaar-enabled payment systems (AEPS), Micro ATMs, domestic money transfers, BBPS bill payments, biometric eKYC verification, and instant e-PAN card applications.',
    sourcePath: 'components/frontend/About/AboutComponents.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'medium'
  },
  {
    id: 'services_tsp_overview',
    category: 'tsp_services',
    title: 'Technology Service Provider (TSP) Services Offered',
    keywords: ['tsp', 'technology', 'api', 'custom software', 'integration', 'tsp services', 'custom', 'development'],
    questions: [
      'What are your TSP services?',
      'What enterprise solutions do you offer?',
      'Do you do web development?',
      'Custom API development?'
    ],
    answer: 'Our Technology Service Provider (TSP) services deliver the core engineering for digital finance. We offer secure payment gateway integrations, unified banking APIs, custom web and mobile application development, IT cloud hosting, shipping and logistics integrations, and connected banking systems.',
    sourcePath: 'components/frontend/About/AboutComponents.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'medium'
  },
  {
    id: 'payment_gateway_details',
    category: 'payment_gateway',
    title: 'Payment Gateway Integration and Payment Methods',
    keywords: ['payment gateway', 'gateway', 'pg', 'upi', 'cards', 'netbanking', 'wallet', 'integrate'],
    questions: [
      'Do you support UPI?',
      'Can I accept cards on my website?',
      'Tell me about your payment gateway.',
      'How do I integrate the payment gateway?',
      'Payment gateway integration?'
    ],
    answer: 'GateXPay assists businesses with secure payment gateway tie-up and integration. The solution supports payment methods like UPI, credit and debit cards, net banking, and digital wallets. We provide robust developer APIs and plugins for standard web and mobile platforms.',
    sourcePath: 'components/frontend/About/AboutComponents.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'medium'
  },
  {
    id: 'services_aeps_details',
    category: 'aeps',
    title: 'Aadhaar Enabled Payment System (AEPS)',
    keywords: ['aeps', 'aadhaar', 'cash withdrawal', 'fingerprint withdrawal', 'biometric withdrawal'],
    questions: [
      'What is AEPS?',
      'How does Aadhaar cash withdrawal work?',
      'Do you offer AEPS services?'
    ],
    answer: 'Aadhaar-enabled payment system (AEPS) services enable retail stores and CSP agents to provide standard cash withdrawals, balance inquiries, and mini statements using biometric fingerprint or iris authentication connected with Aadhaar numbers.',
    sourcePath: 'components/frontend/About/AboutComponents.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'low'
  },
  {
    id: 'services_micro_atm_details',
    category: 'micro_atm',
    title: 'Micro ATM Device and Card Withdrawal',
    keywords: ['micro atm', 'matm', 'swipe machine', 'pos machine', 'card withdrawal'],
    questions: [
      'What is a Micro ATM?',
      'Do you provide Micro ATMs?',
      'Can customers withdraw cash using cards?'
    ],
    answer: 'GateXPay facilitates Micro ATM services where agents use compact card-swiping terminal hardware to let walk-in customers withdraw cash from their bank accounts using standard debit cards with real-time settlement routing.',
    sourcePath: 'components/frontend/About/AboutComponents.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'low'
  },
  {
    id: 'pricing_general',
    category: 'pricing',
    title: 'Pricing, Setup Fees, and Quotation Process',
    keywords: ['pricing', 'cost', 'fee', 'charges', 'mdr', 'rates'],
    questions: [
      'What are your pricing charges?',
      'How much does the payment gateway cost?',
      'What is the commission rate?'
    ],
    answer: 'GateXPay pricing plans are custom-tailored to suit the transaction volumes and scale of each business. The website does not specify fixed public commercial rates or commission figures. The official team must confirm quotes after reviewing your business registration and transactional volumes.',
    sourcePath: 'lib/chatbot/knowledge-base.ts',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'high'
  },
  {
    id: 'security_compliance_details',
    category: 'security',
    title: 'Security Compliance and Platform Uptime Stats',
    keywords: ['pci', 'security', 'compliance', 'uptime', 'encryption', 'pci-dss', 'safe'],
    questions: [
      'Is the platform PCI-DSS compliant?',
      'What is your system uptime?',
      'How secure is the transaction platform?'
    ],
    answer: 'GateXPay focuses on secure fintech infrastructure. The actual website showcases a 99.9% uptime design. Security, compliance, and technical encryption protocols are aligned with guidelines based on individual bank integrations and service configurations.',
    sourcePath: 'components/frontend/About/AboutComponents.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'high'
  },
  {
    id: 'company_statistics',
    category: 'about_company',
    title: 'Company Track Record and Integration Count',
    keywords: ['statistics', 'track record', 'integrations count', 'experience', 'expertise', 'history'],
    questions: [
      'How many businesses do you serve?',
      'How many fintech integrations do you have?',
      'How many years of experience do you have?'
    ],
    answer: 'GateXPay has enabled 500+ businesses, supports 50+ fintech integrations, and operates with 5+ years of industry expertise to deliver digital banking and payment technology services.',
    sourcePath: 'components/frontend/About/AboutComponents.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'high'
  },
  {
    id: 'onboarding_documents',
    category: 'onboarding',
    title: 'Required Merchant Onboarding Documents',
    keywords: ['documents', 'required', 'kyc', 'needed', 'registration documents', 'onboarding documents'],
    questions: [
      'What documents are required?',
      'What documents do I need for onboarding?',
      'What registration documents do I need?',
      'What KYC documents are required?'
    ],
    answer: 'For merchant onboarding and KYC compliance, you need to submit:\n1. Business registration certificate\n2. PAN Card of the business\n3. GST Certificate\n4. Business address proof\n5. Verified bank account details\n6. Identity and address proof of the authorized representative\n7. Website or mobile application link.',
    sourcePath: 'app/policy/merchant-onboarding/page.tsx',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'high'
  },
  {
    id: 'general_greeting',
    category: 'greeting',
    title: 'General Greeting and Welcome',
    keywords: ['hi', 'hello', 'hey', 'hyy', 'hy', 'hii', 'hiii', 'greetings', 'hola', 'morning', 'afternoon', 'gmorning', 'gevening'],
    questions: ['hi', 'hello', 'hey', 'hyy', 'hy', 'hii', 'hiii'],
    answer: 'Hello! Welcome to GateXPay. How can I assist you with our payment solutions, CSP services, or custom API development today?',
    sourcePath: 'lib/chatbot/knowledge-base.ts',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'low'
  },
  {
    id: 'general_gratitude',
    category: 'gratitude',
    title: 'General Gratitude and Support',
    keywords: ['thanks', 'thank you', 'appreciate', 'thankyou', 'great', 'awesome', 'nice'],
    questions: ['thanks', 'thank you', 'thankyou'],
    answer: 'You are welcome! Please let us know if you need any further assistance with GateXPay services.',
    sourcePath: 'lib/chatbot/knowledge-base.ts',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'low'
  },
  {
    id: 'general_services',
    category: 'services',
    title: 'GateXPay Services Overview',
    keywords: ['services', 'offer', 'solutions', 'do you do', 'products', 'what do you offer', 'what services'],
    questions: [
      'What services does GateXPay offer?',
      'What services do you offer?',
      'What solutions do you provide?',
      'Tell me about your services'
    ],
    answer: 'GateXPay offers a comprehensive suite of digital finance and technology solutions, including:\n1. Payment Gateway integrations (supporting UPI, Cards, NetBanking, and Wallets)\n2. Customer Service Point (CSP) services (facilitating AEPS, Micro ATMs, money transfers, and BBPS)\n3. Technology Service Provider (TSP) custom development (API integrations, unified banking systems, and custom web/mobile app development).',
    sourcePath: 'lib/chatbot/knowledge-base.ts',
    verified: true,
    lastVerifiedAt: '2026-08-03',
    approvedBy: 'Compliance',
    riskLevel: 'high'
  }
];
