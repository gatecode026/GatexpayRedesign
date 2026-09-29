import { AlertTriangle } from "lucide-react";

interface WarningCardItem {
  title: string;
  description: string;
}

const WARNING_ITEMS: WarningCardItem[] = [
  {
    title: "Immediate cessation order",
    description:
      "RBI can direct you to stop onboarding new merchants and processing new transactions.",
  },
  {
    title: "Financial penalty",
    description:
      "Up to ₹1-₹5 crore per violation under the Payment and Settlement Systems Act, 2007.",
  },
  {
    title: "Reputational consequences",
    description:
      "Enforcement actions are published on the RBI website and picked up by industry media.",
  },
];

export default function WarningCards() {
  return (
    <div className="warning-cards-list">
      {WARNING_ITEMS.map((item, idx) => (
        <div key={idx} className="warning-card">
          <div className="warning-card-icon-wrap" aria-hidden="true">
            <AlertTriangle size={18} className="warning-card-icon" />
          </div>
          <div className="warning-card-content">
            <h4 className="warning-card-title">{item.title}</h4>
            <p className="warning-card-desc">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
