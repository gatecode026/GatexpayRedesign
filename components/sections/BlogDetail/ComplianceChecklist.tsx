import { CheckCircle2 } from "lucide-react";

const CHECKLIST_ITEMS = [
  "Net worth certificate from a CA confirming ₹15 crore",
  "Escrow agreement signed with a scheduled commercial bank",
  "PCI-DSS compliance report (Self-Assessment Questionnaire or QSA report)",
  "ISO 27001 certificate or a gap analysis roadmap with target date",
  "AML/CFT policy document reviewed by legal counsel",
  "Merchant Agreement template reviewed for SLA & clause alignment",
  "Internal customer grievance mechanism & nodal officer appointment",
  "CERT-In audit schedule confirmed (12 months)",
];

export default function ComplianceChecklist() {
  return (
    <div className="compliance-checklist-list">
      {CHECKLIST_ITEMS.map((item, idx) => (
        <div key={idx} className="checklist-item-card">
          <CheckCircle2 size={16} className="checklist-icon" aria-hidden="true" />
          <span className="checklist-text">{item}</span>
        </div>
      ))}
    </div>
  );
}
