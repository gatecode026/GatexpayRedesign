import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  RotateCcw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Server,
  KeyRound,
  FileCheck2,
  UserCheck2,
} from "lucide-react";
export default function PolicyInfographics({ slug }) {
  if (slug === "security" || slug === "data") {
    return (
      <div className="policy-infographic-card">
        <div className="policy-infographic-header">
          <div className="policy-infographic-badge">
            <ShieldCheck size={16} />
            <span>Enterprise-Grade Security Architecture</span>
          </div>
          <h3>Bank-Grade Encryption &amp; Regulatory Certifications</h3>
          <p>
            GateXPay deploys multi-layered defense protocols aligned with
            PCI-DSS, ISO/IEC 27001, and the Digital Personal Data Protection
            (DPDP) Act 2023.
          </p>
        </div>

        <div className="security-badges-grid">
          <div className="security-badge-item">
            <div className="security-badge-icon-wrap">
              <Image
                src="/assets/images/badge-pci-1.svg"
                alt="PCI DSS Compliant"
                width={80}
                height={40}
                className="security-badge-img"
              />
            </div>
            <div className="security-badge-info">
              <strong>PCI-DSS Level 1</strong>
              <span>Highest global payment card industry standard</span>
            </div>
          </div>

          <div className="security-badge-item">
            <div className="security-badge-icon-wrap">
              <Image
                src="/assets/images/badge-iso.svg"
                alt="ISO 27001 Certified"
                width={80}
                height={40}
                className="security-badge-img"
              />
            </div>
            <div className="security-badge-info">
              <strong>ISO/IEC 27001</strong>
              <span>Certified Information Security Management System</span>
            </div>
          </div>

          <div className="security-badge-item">
            <div className="security-badge-icon-wrap">
              <Lock size={28} className="text-primary" />
            </div>
            <div className="security-badge-info">
              <strong>AES-256 &amp; TLS 1.3</strong>
              <span>Zero-knowledge data encryption in transit and at rest</span>
            </div>
          </div>

          <div className="security-badge-item">
            <div className="security-badge-icon-wrap">
              <ShieldCheck size={28} className="text-success" />
            </div>
            <div className="security-badge-info">
              <strong>RBI Compliant Rails</strong>
              <span>Local Indian data residency &amp; statutory adherence</span>
            </div>
          </div>
        </div>

        <div className="security-layers-grid">
          <div className="security-layer-step">
            <div className="security-layer-num">01</div>
            <h4>Edge Defense</h4>
            <p>
              Cloudflare enterprise WAF, DDoS mitigation, and smart bot traffic
              filtering.
            </p>
          </div>
          <div className="security-layer-step">
            <div className="security-layer-num">02</div>
            <h4>API Tokenization</h4>
            <p>
              HMAC-SHA256 signature verification, IP whitelisting, and strict
              rate limits.
            </p>
          </div>
          <div className="security-layer-step">
            <div className="security-layer-num">03</div>
            <h4>Vault Storage</h4>
            <p>
              Hardware security module (HSM) isolation for card tokens and
              credentials.
            </p>
          </div>
          <div className="security-layer-step">
            <div className="security-layer-num">04</div>
            <h4>24x7 SIEM SOC</h4>
            <p>
              Continuous automated anomaly detection and proactive threat
              containment.
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (slug === "refund") {
    return (
      <div className="policy-infographic-card">
        <div className="policy-infographic-header">
          <div className="policy-infographic-badge">
            <RotateCcw size={16} />
            <span>Transparent Settlement Lifecycle</span>
          </div>
          <h3>GateXPay 3-Step Automated Refund Process</h3>
          <p>
            All refund inquiries are routed via verified banking rails back to
            the original source account without manual friction.
          </p>
        </div>

        <div className="process-timeline-grid">
          <div className="process-timeline-card">
            <div className="process-timeline-top">
              <span className="process-step-pill">Stage 1</span>
              <span className="process-time-pill">&lt; 24 Hours</span>
            </div>
            <h4>Refund Initiation</h4>
            <p>
              Initiated by merchant via dashboard or automated API webhook for
              failed/canceled orders.
            </p>
            <div className="process-status-tag">
              <CheckCircle2 size={14} /> Request Logged
            </div>
          </div>

          <div className="process-arrow-divider">
            <ArrowRight size={20} />
          </div>

          <div className="process-timeline-card">
            <div className="process-timeline-top">
              <span className="process-step-pill">Stage 2</span>
              <span className="process-time-pill">Immediate</span>
            </div>
            <h4>Banking Reconciliation</h4>
            <p>
              GateXPay verifies transaction status with the issuing bank, card
              network, or NPCI UPI switch.
            </p>
            <div className="process-status-tag">
              <Clock size={14} /> Gateway Verified
            </div>
          </div>

          <div className="process-arrow-divider">
            <ArrowRight size={20} />
          </div>

          <div className="process-timeline-card is-success">
            <div className="process-timeline-top">
              <span className="process-step-pill">Stage 3</span>
              <span className="process-time-pill">5-7 Working Days</span>
            </div>
            <h4>Source Account Credit</h4>
            <p>
              Funds are credited directly to the customer&apos;s source bank
              account, card, or wallet.
            </p>
            <div className="process-status-tag is-credited">
              <CheckCircle2 size={14} /> Credit Confirmed
            </div>
          </div>
        </div>

        <div className="policy-note-banner">
          <div className="policy-note-icon">
            <Clock size={18} />
          </div>
          <div className="policy-note-text">
            <strong>Standard Bank Turnaround Time:</strong> Depending on the
            customer&apos;s bank, refunds may reflect within 2 to 7 business
            days from the date of approval. In case of delay, customers can
            quote their Transaction ID (UTR/RRN).
          </div>
        </div>
      </div>
    );
  }
  if (slug === "grievance") {
    return (
      <div className="policy-infographic-card">
        <div className="policy-infographic-header">
          <div className="policy-infographic-badge">
            <AlertTriangle size={16} />
            <span>Statutory Redressal Hierarchy</span>
          </div>
          <h3>4-Tier Grievance Escalation Matrix</h3>
          <p>
            Under the Information Technology Act, 2000 and RBI guidelines, we
            maintain a transparent escalation structure.
          </p>
        </div>

        <div className="escalation-matrix-grid">
          <div className="escalation-matrix-card">
            <div className="escalation-tier-badge">Tier 1 · Helpdesk</div>
            <h4>Customer Support Care</h4>
            <div className="escalation-detail-item">
              <span className="escalation-label">Channel:</span>
              <a href="mailto:info@gatexpay.in" className="escalation-val">
                info@gatexpay.in
              </a>
            </div>
            <div className="escalation-detail-item">
              <span className="escalation-label">Expected TAT:</span>
              <span className="escalation-val font-semibold">
                24 to 48 Hours
              </span>
            </div>
            <p className="escalation-desc">
              First-line resolution for transaction queries, technical support,
              and account inquiries.
            </p>
          </div>

          <div className="escalation-matrix-card">
            <div className="escalation-tier-badge">
              Tier 2 · Grievance Officer
            </div>
            <h4>Grievance Redressal Officer</h4>
            <div className="escalation-detail-item">
              <span className="escalation-label">Office:</span>
              <span className="escalation-val">
                Mansarovar, Jaipur, Rajasthan
              </span>
            </div>
            <div className="escalation-detail-item">
              <span className="escalation-label">Expected TAT:</span>
              <span className="escalation-val font-semibold">
                7 Working Days
              </span>
            </div>
            <p className="escalation-desc">
              For grievances unresolved at Tier 1 or requiring formal
              legal/compliance review.
            </p>
          </div>

          <div className="escalation-matrix-card">
            <div className="escalation-tier-badge">Tier 3 · Nodal Officer</div>
            <h4>Principal Nodal Officer</h4>
            <div className="escalation-detail-item">
              <span className="escalation-label">Role:</span>
              <span className="escalation-val">
                Head of Regulatory Compliance
              </span>
            </div>
            <div className="escalation-detail-item">
              <span className="escalation-label">Expected TAT:</span>
              <span className="escalation-val font-semibold">
                15 Working Days
              </span>
            </div>
            <p className="escalation-desc">
              Senior management review for dispute adjudication and merchant
              escalations.
            </p>
          </div>

          <div className="escalation-matrix-card is-rbi">
            <div className="escalation-tier-badge is-rbi-badge">
              Tier 4 · RBI Redressal
            </div>
            <h4>RBI Banking Ombudsman</h4>
            <div className="escalation-detail-item">
              <span className="escalation-label">Portal:</span>
              <span className="escalation-val">cms.rbi.org.in</span>
            </div>
            <div className="escalation-detail-item">
              <span className="escalation-label">Eligibility:</span>
              <span className="escalation-val font-semibold">
                Post 30 Days Unresolved
              </span>
            </div>
            <p className="escalation-desc">
              Statutory recourse with the Reserve Bank of India Integrated
              Ombudsman Scheme.
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (slug === "merchant" || slug === "aml-kyc") {
    return (
      <div className="policy-infographic-card">
        <div className="policy-infographic-header">
          <div className="policy-infographic-badge">
            <UserCheck2 size={16} />
            <span>Compliance Verification Pipeline</span>
          </div>
          <h3>Digital Merchant Onboarding &amp; Risk Due Diligence</h3>
          <p>
            In compliance with the Prevention of Money Laundering Act (PMLA)
            2002 and RBI Master Directions.
          </p>
        </div>

        <div className="pipeline-steps-grid">
          {/* Card 1 */}
          <div className="pipeline-step-item">
            <div className="pipeline-step-top">
              <div className="pipeline-step-icon">
                <FileCheck2 size={24} />
              </div>
              <span className="pipeline-step-tag-pill">Step 01</span>
            </div>
            <div className="pipeline-step-content">
              <h4>Entity Details</h4>
              <p>
                Digital submission and automated validation of Certificate of
                Incorporation, GSTIN, PAN, and Bank proofs.
              </p>
              <div className="pipeline-step-badges">
                <span className="pipeline-micro-badge">CIN / GSTIN</span>
                <span className="pipeline-micro-badge">PAN Verification</span>
                <span className="pipeline-micro-badge">Bank Proofs</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="pipeline-step-item">
            <div className="pipeline-step-top">
              <div className="pipeline-step-icon">
                <KeyRound size={24} />
              </div>
              <span className="pipeline-step-tag-pill">Step 02</span>
            </div>
            <div className="pipeline-step-content">
              <h4>Automated C-KYC</h4>
              <p>
                Real-time Aadhaar OTP validation, MCA corporate registry
                verification, and director identity corroboration.
              </p>
              <div className="pipeline-step-badges">
                <span className="pipeline-micro-badge">Instant Aadhaar</span>
                <span className="pipeline-micro-badge">MCA Corporate Sync</span>
                <span className="pipeline-micro-badge">Director KYC</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="pipeline-step-item">
            <div className="pipeline-step-top">
              <div className="pipeline-step-icon">
                <ShieldAlert size={24} />
              </div>
              <span className="pipeline-step-tag-pill">Step 03</span>
            </div>
            <div className="pipeline-step-content">
              <h4>AML &amp; Risk Screening</h4>
              <p>
                Watchlist checks against UN/OFAC lists, PEP screening, sanctions
                databases, and merchant category risk rating.
              </p>
              <div className="pipeline-step-badges">
                <span className="pipeline-micro-badge">
                  UN / OFAC Sanctions
                </span>
                <span className="pipeline-micro-badge">PEP Screening</span>
                <span className="pipeline-micro-badge">Risk Rating</span>
              </div>
            </div>
          </div>

          {/* Card 4 - Highlighted / Activated */}
          <div className="pipeline-step-item is-active-step">
            <div className="pipeline-step-top">
              <div className="pipeline-step-icon is-live">
                <CheckCircle2 size={24} />
              </div>
              <span className="pipeline-step-tag-pill is-live-pill">
                Step 04 · Ready to Transact
              </span>
            </div>
            <div className="pipeline-step-content">
              <h4>Production Activation</h4>
              <p>
                Merchant agreement execution, sandbox API keys validation, and
                live payment gateway activation for settlements.
              </p>
              <div className="pipeline-step-badges">
                <span className="pipeline-micro-badge is-live-badge">
                  Live API Keys
                </span>
                <span className="pipeline-micro-badge is-live-badge">
                  Sandbox Verified
                </span>
                <span className="pipeline-micro-badge is-live-badge">
                  Active Gateway
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (slug === "prohibited" || slug === "vendor") {
    return (
      <div className="policy-infographic-card is-warning-style">
        <div className="policy-infographic-header">
          <div className="policy-infographic-badge is-warning-badge">
            <ShieldAlert size={16} />
            <span>Strict Zero-Tolerance Advisory</span>
          </div>
          <h3>Non-Negotiable Prohibited Activities &amp; Third-Party Notice</h3>
          <p>
            Any entity engaged in unauthorized or illegal operations is subject
            to immediate account termination, settlement freezing, and statutory
            reporting to law enforcement authorities.
          </p>
        </div>

        <div className="prohibited-grid">
          <div className="prohibited-category-box">
            <h4>Illegal Gaming &amp; Betting</h4>
            <p>
              Online gambling, unlicensed lottery, sports wagering, or prize
              schemes.
            </p>
          </div>

          <div className="prohibited-category-box">
            <h4>Counterfeit &amp; IP Infringement</h4>
            <p>
              Fake luxury goods, pirated intellectual property, unauthorized
              digital keys.
            </p>
          </div>

          <div className="prohibited-category-box">
            <h4>Unregistered Financial Schemes</h4>
            <p>
              Ponzi schemes, multi-level marketing (MLM), unlicensed FOREX or
              binary options.
            </p>
          </div>

          <div className="prohibited-category-box">
            <h4>Restricted Physical Goods</h4>
            <p>
              Narcotics, prescription drugs without license, weapons,
              ammunition, fireworks.
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (slug === "cookies") {
    return (
      <div className="policy-infographic-card">
        <div className="policy-infographic-header">
          <div className="policy-infographic-badge">
            <Server size={16} />
            <span>Browser Storage Transparency</span>
          </div>
          <h3>Cookie Classifications &amp; Usage Overview</h3>
          <p>
            We use minimal cookies required to secure sessions, improve API
            performance, and deliver personalized user experience.
          </p>
        </div>

        <div className="cookies-grid">
          <div className="cookie-type-card">
            <span className="cookie-status-badge is-required">
              Strictly Necessary
            </span>
            <h4>Essential &amp; Security Cookies</h4>
            <p>
              Mandatory for user authentication, CSRF security tokens, and
              merchant session management.
            </p>
            <span className="cookie-duration">Duration: Session / 30 Days</span>
          </div>

          <div className="cookie-type-card">
            <span className="cookie-status-badge">Performance</span>
            <h4>Analytics &amp; Telemetry</h4>
            <p>
              Aggregated telemetry to evaluate API latency, page responsiveness,
              and system stability.
            </p>
            <span className="cookie-duration">Duration: Up to 1 Year</span>
          </div>

          <div className="cookie-type-card">
            <span className="cookie-status-badge">Preference</span>
            <h4>Functional Cookies</h4>
            <p>
              Remembers user language settings, theme choices, and dashboard
              display configurations.
            </p>
            <span className="cookie-duration">Duration: Persistent</span>
          </div>
        </div>
      </div>
    );
  }
  // Default fallback banner
  return (
    <div className="policy-infographic-card is-default-style">
      <div className="policy-infographic-header">
        <div className="policy-infographic-badge">
          <ShieldCheck size={16} />
          <span>Statutory Compliance Directive</span>
        </div>
        <h3>GateXPay Trust &amp; Corporate Governance Framework</h3>
        <p>
          Operated by GateXpay Technologies Private Limited under the Companies
          Act, 2013 and applicable financial guidelines in Rajasthan, India.
        </p>
      </div>
    </div>
  );
}
