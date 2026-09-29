import { Handshake, Hammer } from "lucide-react";
import Container from "@/components/common/Container/Container";
import "./ContactHeadquarter.css";
const ADDRESS = "412, Sumer Nagar, Mansarovar, Jaipur, Rajasthan, 302020";
const INFO_CARDS = [
  {
    icon: Handshake,
    title: "Sales & Partnerships",
    desc: "Need custom pricing, white-label solutions, or API integration? Contact our growth team.",
  },
  {
    icon: Hammer,
    title: "Technical Merchant Support",
    desc: "GateXPay merchant? For faster API, settlement, or dashboard queries, email your Merchant ID to support.",
  },
];
export default function ContactHeadquarter() {
  return (
    <section className="contact-hq section">
      <Container>
        <div className="contact-hq-grid">
          <div className="contact-hq-left">
            <h2 className="contact-hq-title">Visit Our Headquarter</h2>

            <div className="contact-hq-company">
              <h3>GateXPay Technologies Private Limited</h3>
              <p>{ADDRESS}</p>
            </div>

            <div className="contact-hq-cards">
              {INFO_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="contact-hq-card">
                    <span className="contact-hq-card-icon" aria-hidden="true">
                      <Icon size={24} strokeWidth={1.8} />
                    </span>
                    <h4>{card.title}</h4>
                    <p>{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="contact-hq-map">
            <iframe
              title="GateXPay Technologies Private Limited — office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
