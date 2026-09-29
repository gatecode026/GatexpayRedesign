import Image from "next/image";

interface FoundationCardData {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  hasOrangeGlow?: boolean;
}

const FOUNDATIONS: FoundationCardData[] = [
  {
    number: "01",
    title: "Security-First Architecture",
    description:
      "Security starts at the core, encompassing everything from APIs and integrations to data flows and the underlying platform infrastructure.",
    image: "/assets/about_us/images/img_82488527d7.png",
    alt: "Security-First Architecture 3D shield and encryption illustration",
  },
  {
    number: "02",
    title: "Compliance-Oriented",
    description:
      "We design our workflows with applicable regulatory requirements, partner policies, and Indian financial ecosystem practices in mind.",
    image: "/assets/about_us/images/img_7a007527d6.png",
    alt: "Compliance-Oriented RBI and NPCI regulatory badge illustration",
    hasOrangeGlow: true,
  },
  {
    number: "03",
    title: "Scalable White-Label Solutions",
    description:
      "Modular technology and infrastructure designed to adapt as transaction volumes, integrations, and business requirements evolve.",
    image: "/assets/about_us/images/img_dd166e132a.png",
    alt: "Scalable White-Label Solutions 3D growth bar chart illustration",
  },
  {
    number: "04",
    title: "Partner-Led Enablement",
    description:
      "We don't just hand you an API key. We provide dedicated integration assistance and operational support to ensure uninterrupted business continuity.",
    image: "/assets/about_us/images/img_d6df1e4356.png",
    alt: "Partner-Led Enablement 3D partnership handshake illustration",
    hasOrangeGlow: true,
  },
];

export default function FoundationsSection() {
  return (
    <section className="about-foundations-section" aria-label="Built on the Right Foundations">
      <div className="about-container">
        <div className="about-foundations-header">
          <h2 className="about-foundations-heading">Built on the Right Foundations</h2>
          <p className="about-foundations-subtitle">
            Reliable infrastructure depends on robust fundamentals. We build
            security-conscious engineering, responsive implementation scalability,
            and dependable partnerships.
          </p>
        </div>

        <div className="about-foundations-grid">
          {FOUNDATIONS.map((f) => (
            <article key={f.number} className="about-foundation-card">
              {/* Decorative Number Watermark */}
              <span className="about-foundation-watermark" aria-hidden="true">
                {f.number}
              </span>

              {/* Ambient blur glows */}
              <div className="about-foundation-glow" aria-hidden="true" />
              {f.hasOrangeGlow && (
                <div className="about-foundation-glow-orange" aria-hidden="true" />
              )}

              {/* Content text */}
              <div className="about-foundation-content">
                <h3 className="about-foundation-title">{f.title}</h3>
                <p className="about-foundation-desc">{f.description}</p>
              </div>

              {/* 3D Illustration */}
              <div className="about-foundation-art-wrap">
                <Image
                  src={f.image}
                  alt={f.alt}
                  width={340}
                  height={220}
                  className="about-foundation-art"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
