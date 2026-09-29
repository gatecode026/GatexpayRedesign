import Image from "next/image";
import { Shield } from "lucide-react";

export default function RegulatoryRoleSection() {
  return (
    <section className="about-regulatory-section" aria-label="Regulatory Role">
      <div className="about-container">
        <div className="about-regulatory-card">
          <div className="about-regulatory-header-row">
            <div className="about-regulatory-badge" aria-hidden="true">
              <Shield size={36} strokeWidth={2} />
            </div>
            <h2 className="about-regulatory-heading">A Note on Our Regulatory Role</h2>
          </div>

          <div className="about-regulatory-body">
            <p>
              GateXpay Technologies Private Limited operates as a dedicated technology
              service provider (TSP) and corporate business correspondent. We
              facilitate technical integrations, digital switch connectivity, and
              operational tooling.
            </p>
            <p>
              All financial transactions, payment collections, and settlement
              activities are routed through and executed by licensed, RBI-regulated
              banking partners and authorized Payment Aggregators.
            </p>
          </div>

          <div className="about-regulatory-art-wrap">
            <Image
              src="/assets/about_us/images/img_bce7c2868c.png"
              alt="Compliance shield with regulated institutions and compliant partnerships illustration"
              width={510}
              height={340}
              className="about-regulatory-art"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
