import { ShieldCheck } from "lucide-react";

export default function RegulatoryRoleSection() {
  return (
    <section className="about-regulatory-section" aria-label="Regulatory Role">
      <div className="about-container">
        <div className="about-regulatory-card">
          <div className="about-regulatory-header-row">
            <div className="about-regulatory-badge" aria-hidden="true">
              <ShieldCheck size={24} strokeWidth={2} />
            </div>
            <h2 className="about-regulatory-heading">
              A Note on Our Regulatory Role
            </h2>
          </div>

          <div className="about-regulatory-body">
            <p>
              GateXPay Technologies Private Limited operates as a technology and fintech facilitation platform. It does not independently function as a bank, licensed payment aggregator, NBFC, or regulated deposit-taking institution unless expressly stated through an authorized arrangement.
            </p>
            <p>
              Certain financial and payment-related services made available through GateXPay may be delivered through regulated banks, financial institutions, licensed payment providers, or other authorized partners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
