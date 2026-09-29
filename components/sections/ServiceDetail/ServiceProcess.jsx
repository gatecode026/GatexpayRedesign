import { SectionTitle, ServiceDetailIcon } from "./ServiceDetailParts";
/* Figma "Frame 230" — numbered nodes joined by arrows, a card under each */
export default function ServiceProcess({ detail }) {
  const { heading, steps } = detail.process;
  return (
    <section
      className="sd-section sd-process"
      aria-labelledby="sd-process-title"
    >
      <div className="container container--page sd-stack">
        <SectionTitle
          heading={heading}
          id="sd-process-title"
          className="sd-heading--center reveal"
        />
        <ol className="sd-steps">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className={`sd-step reveal reveal-delay-${i + 1}`}
            >
              <span className="sd-step-node" aria-hidden="true">
                {i + 1}
              </span>
              {i < steps.length - 1 && (
                <span className="sd-step-line" aria-hidden="true" />
              )}
              <div className="sd-step-card">
                <div className="sd-step-head">
                  <h3 className="sd-step-title">
                    <span className="sd-sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <ServiceDetailIcon
                    name={step.icon}
                    size={24}
                    strokeWidth={1.5}
                  />
                </div>
                <p className="sd-step-desc">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
