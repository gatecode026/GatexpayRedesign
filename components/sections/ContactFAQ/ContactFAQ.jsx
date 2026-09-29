"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import Container from "@/components/common/Container/Container";
import "./ContactFAQ.css";
const FAQS = [
  {
    q: "How long does it take to integrate GateXPay's payment gateway?",
    a: "Most merchants go live within 3–5 business days using our REST APIs and pre-built SDKs. Our technical team provides hands-on integration support throughout the process.",
  },
  {
    q: "Is GateXPay PCI-DSS compliant and secure?",
    a: "Yes. GateXPay is PCI-DSS compliant and uses end-to-end tokenization, encryption, and real-time fraud monitoring to keep every transaction secure.",
  },
  {
    q: "Can GateXPay integrate with my existing banking or ERP systems?",
    a: "Absolutely. We integrate seamlessly with your existing core banking, ERP, and CRM systems through open APIs, so you don't need to rebuild your stack.",
  },
  {
    q: "What support is available after I go live?",
    a: "Every merchant gets a dedicated account manager plus 24/7 technical support for settlements, disputes, and API issues.",
  },
];
export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="contact-faq section">
      <Container>
        <h2 className="contact-faq-title">Frequently Asked Questions</h2>

        <div className="contact-faq-list">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `contact-faq-panel-${i}`;
            return (
              <div
                key={item.q}
                className={`contact-faq-item ${isOpen ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="contact-faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="contact-faq-icon" aria-hidden="true">
                    <Plus size={14} strokeWidth={2} />
                  </span>
                </button>
                <div id={panelId} className="contact-faq-panel">
                  <div className="contact-faq-panel-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
