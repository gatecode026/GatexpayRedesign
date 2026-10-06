import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { SectionTitle, ServiceDetailIcon, FormattedText } from "./ServiceDetailParts";
export default function ServiceShowcase({ showcase }) {
  const { heading, description, checklist, callout, image } = showcase;
  return (
    <section
      className="sd-section sd-showcase"
      aria-labelledby="sd-showcase-title"
    >
      <div className="container container--page sd-stack">
        <SectionTitle
          heading={heading}
          id="sd-showcase-title"
          className="reveal"
        />

        <div className="sd-showcase-body reveal">
          <div className="sd-showcase-content">
            {description && (
              <p className="sd-showcase-desc">
                <FormattedText text={description} />
              </p>
            )}

            <ul className="sd-showcase-list" aria-label="Key items checklist">
              {checklist.map((item, idx) => (
                <li key={idx} className="sd-showcase-item">
                  <span className="sd-check-icon" aria-hidden="true">
                    <CheckCircle2 size={22} strokeWidth={2.4} />
                  </span>
                  <div className="sd-showcase-item-text">
                    <strong className="sd-showcase-item-label">
                      {item.label}
                    </strong>
                  </div>
                </li>
              ))}
            </ul>

            {callout && (
              <div className="sd-showcase-callout">
                <span className="sd-callout-icon-box">
                  <ServiceDetailIcon
                    name={callout.icon || "lightbulb"}
                    size={22}
                    strokeWidth={2}
                  />
                </span>
                <div className="sd-callout-body">
                  <h4 className="sd-callout-title">{callout.title}</h4>
                  <p className="sd-callout-text">
                    <FormattedText text={callout.text} />
                  </p>
                </div>
              </div>
            )}

            {showcase.note && (
              <p className="sd-showcase-note">
                <FormattedText text={showcase.note} />
              </p>
            )}
          </div>

          <div className="sd-showcase-art">
            <div className="sd-showcase-img-wrap">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 580px, (min-width: 768px) 45vw, 90vw"
                className="sd-showcase-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
