"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SERVICES_FAQS } from "@/data/services-data";
import "./ServicesFAQ.css";

interface ServicesFAQProps {
  /** Questions to show; defaults to the Services page FAQ. */
  items?: { q: string; a: string }[];
  /** Unique prefix for ids, so two FAQs never share ids. */
  idPrefix?: string;
  /** "lg" = the service detail page's larger Figma type (24px questions). */
  size?: "md" | "lg";
}

export default function ServicesFAQ({
  items = SERVICES_FAQS,
  idPrefix = "services-faq",
  size = "md",
}: ServicesFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`services-faq-section${size === "lg" ? " services-faq-section--lg" : ""}`}
      aria-labelledby={`${idPrefix}-heading`}
    >
      <div className="services-faq-container">
        <h2 id={`${idPrefix}-heading`} className="services-faq-heading">
          Frequently Asked Questions
        </h2>

        <div className="services-faq-list">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `${idPrefix}-panel-${i}`;
            const buttonId = `${idPrefix}-button-${i}`;

            return (
              <div
                key={item.q}
                className={`services-faq-item ${isOpen ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  id={buttonId}
                  className="services-faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                >
                  <span className="services-faq-question">{item.q}</span>
                  <span className="services-faq-icon-wrap" aria-hidden="true">
                    <Plus
                      size={14}
                      strokeWidth={2}
                      className="services-faq-icon"
                    />
                  </span>
                </button>

                {/* Grid 0fr → 1fr animates the height; closed panels are
                    visibility:hidden, so they are out of the a11y tree */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="services-faq-panel"
                >
                  <div className="services-faq-panel-inner">
                    <p className="services-faq-answer">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
