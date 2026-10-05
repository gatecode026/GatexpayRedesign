import { Layers, Gauge, Lock, HeadphonesIcon } from "lucide-react";
import Container from "@/components/common/Container/Container";
import "./Capabilities.css";
const CAPABILITIES = [
  {
    icon: Layers,
    title: "Unified Payment APIs",
    description: "One integration for cards, UPI, AEPS, and bank transfers.",
  },
  {
    icon: Gauge,
    title: "Real-Time Settlement",
    description:
      "Track and reconcile settlements as they happen, not next-day.",
  },
  {
    icon: Lock,
    title: "Compliance-First",
    description: "Built to PCI-DSS and RBI-aligned standards from day one.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Monitoring",
    description: "Dedicated infrastructure monitoring and merchant support.",
  },
];
export default function Capabilities() {
  return (
    <section className="capabilities section">
      <Container>
        <div className="section-header center">
          <span className="section-eyebrow">Capabilities</span>
          <h2 className="section-heading">
            Everything you need to run payments at scale
          </h2>
        </div>

        <div className="capabilities-grid">
          {CAPABILITIES.map(({ icon: Icon, title, description }) => (
            <div className="capability-item" key={title}>
              <div className="capability-icon">
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
