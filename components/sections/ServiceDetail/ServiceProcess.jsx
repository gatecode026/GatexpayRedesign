import { Fragment } from "react";
import { SectionTitle } from "./ServiceDetailParts";

export default function ServiceProcess({ detail }) {
  const { heading, steps } = detail.process;
  return (
    <section
      className="sd-section sd-process"
      aria-labelledby="sd-process-title"
    >
      <div className="container container--page sd-process-frame">
        <SectionTitle
          heading={heading}
          id="sd-process-title"
          className="sd-heading--center sd-process-heading reveal"
        />

        {/* Frame 244 */}
        <div className="sd-process-body reveal reveal-delay-1">
          {/* Frame 235: Desktop Timeline Row */}
          <div className="sd-process-timeline" aria-hidden="true">
            {steps.map((step, i) => (
              <Fragment key={i}>
                <div className="sd-step-node-box">
                  <span className="sd-step-node">{i + 1}</span>
                  <span className="sd-step-ellipse" />
                </div>
                {i < steps.length - 1 && <div className="sd-step-connector" />}
              </Fragment>
            ))}
          </div>

          {/* Frame 240: Cards Row */}
          <div className="sd-process-cards">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`sd-step-card reveal reveal-delay-${i + 1}`}
              >
                <div className="sd-step-mobile-badge" aria-hidden="true">
                  <span>{i + 1}</span>
                </div>
                <div className="sd-step-head">
                  <h3 className="sd-step-title">
                    <span className="sd-sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                </div>
                <p className="sd-step-desc">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
