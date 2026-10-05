import Image from "next/image";
export default function WhoWeAreSection() {
  return (
    <section className="about-who-section" aria-label="Who We Are">
      <div className="about-container about-who-grid">
        <div className="about-who-text">
          <h2 className="about-who-heading">
            Who We Are &amp; Why
            <br />
            We Built <span className="text-highlight">GateXPay</span>
          </h2>

          <div className="about-who-paragraphs">
            <p>
              GateXpay bridges the gap between businesses and the complex world
              of modern fintech. We empower startups, enterprises, and local
              entrepreneurs to process payments and deliver essential digital
              services seamlessly.
            </p>
            <p>
              Founded in Jaipur, GateXpay was born from a simple belief:
              financial infrastructure should be robust, compliant, and
              accessible to every growing business in India. We combine deep
              technical expertise with relentless execution to build solutions
              that scale with you.
            </p>
          </div>
        </div>

        <div className="about-who-image-wrap">
          <Image
            src="/assets/about_us/images/img_f9bf3c1a4f.png"
            alt="The GateXPay team collaborating on digital payments infrastructure"
            width={640}
            height={427}
            className="about-who-image"
          />
        </div>
      </div>
    </section>
  );
}
