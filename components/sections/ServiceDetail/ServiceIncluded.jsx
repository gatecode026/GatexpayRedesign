import {
  BrokenLines,
  FormattedText,
  SectionTitle,
  ServiceDetailIcon,
} from "./ServiceDetailParts";
/* Figma "Frame 196" — #F8FAFC, 6 cards in 3 × 2 */
export default function ServiceIncluded({ detail }) {
  const { heading, items } = detail.included;
  return (
    <section
      className="sd-section sd-included"
      aria-labelledby="sd-included-title"
    >
      <div className="container container--page sd-stack">
        <SectionTitle
          heading={heading}
          id="sd-included-title"
          className="sd-heading--center reveal"
        />
        <ul className="sd-included-grid">
          {items.map((item, i) => (
            <li
              key={item.title}
              className={`sd-feature reveal reveal-delay-${(i % 3) + 1}`}
            >
              <span className="sd-feature-icon-box">
                <ServiceDetailIcon
                  name={item.icon}
                  size={24}
                  strokeWidth={1.8}
                />
              </span>
              <div className="sd-feature-text">
                <h3 className="sd-feature-title">
                  <BrokenLines text={item.title} />
                </h3>
                <p className="sd-feature-desc">
                  <FormattedText text={item.text} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
