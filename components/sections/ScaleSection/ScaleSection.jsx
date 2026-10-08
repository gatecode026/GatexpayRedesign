"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import "./ScaleSection.css";

const TOP_CARDS = [
  {
    id: "gateway",
    title: (
      <>
        Beyond Just a<br className="scale-title-br" />
        <span className="scale-title-nowrap">Payment Gateway</span>
      </>
    ),
    desc: "GateXPay bridges digital processing with physical services. We combine tokenization with a suite of CSP services—from Micro-ATMs to lending. It's your financial operations stack in one ecosystem.",
    img: "/assets/images/bento-pos.png",
    alt: "Beyond Just a Payment Gateway - Micro-ATMs and financial operations",
    imgClass: "bento-img-pos",
    width: 332,
    height: 332,
  },
  {
    id: "connect",
    title: (
      <>
        We Build,<br className="scale-title-br" />
        <span className="scale-title-nowrap">Not Just Connect</span>
      </>
    ),
    desc: "Payment giants hand you API keys and leave you to figure it out. We act as your dedicated technology partner. From custom web and app development to cloud infrastructure and business automation, we build and scale your platform so your internal engineering team doesn't have to.",
    img: "/assets/images/bento-cloud.png",
    alt: "We Build, Not Just Connect - Web, mobile and cloud infrastructure",
    imgClass: "bento-img-cloud",
    width: 304,
    height: 304,
  },
];

const BOTTOM_CARDS = [
  {
    id: "hub",
    title: "Pre-Integrated Financial Hub",
    desc: "Avoid vendor negotiations. GateXPay integrates with banking, lending, insurance, and investment platforms. Launch financial products instantly without separate tie-ups.",
    img: "/assets/images/bento-hub.png",
    alt: "Pre-Integrated Financial Hub - Banking, lending, insurance and investment platforms",
    imgClass: "bento-img-hub",
    width: 429,
    height: 429,
  },
  {
    id: "tokenization",
    title: "Bank-Grade Tokenization",
    desc: "We secure every transaction at the root. By automatically replacing sensitive card data with secure tokens, our PCI-DSS compliant architecture drastically reduces fraud and compliance overhead for your business. Rely on 99.99% uptime and low-latency routing, even during massive peak traffic surges.",
    img: "/assets/images/bento-tokenization.png",
    alt: "Bank-Grade Tokenization - PCI-DSS compliant tokenization vault",
    imgClass: "bento-img-tokenization",
    width: 344,
    height: 344,
  },
  {
    id: "market",
    title: "Capture Every Market Tier",
    desc: "Expand beyond tier-1 digital natives. GateXPay's tools help you reach tier-2, tier-3, and rural markets with financial services and seamless transfers.",
    img: "/assets/images/bento-market.png",
    alt: "Capture Every Market Tier - Tier 1, 2, 3 and rural markets",
    imgClass: "bento-img-market",
    width: 352,
    height: 352,
  },
];

export default function ScaleSection() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("in-view", e.isIntersecting)
        ),
      { threshold: 0.08 }
    );
    el.querySelectorAll(".reveal").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="scale-section section" id="scale" ref={ref}>
      <div className="container container--page scale-container">
        <h2 className="scale-heading reveal">
          Everything Your Business Needs to Scale
        </h2>

        {/* Top 2 Cards */}
        <div className="scale-top-grid">
          {TOP_CARDS.map((card, i) => (
            <div
              key={card.id}
              className={`scale-card scale-card--top scale-card--${card.id} reveal reveal-delay-${i + 1}`}
            >
              <div className="scale-card-content">
                <h3 className="scale-card-title">{card.title}</h3>
                <p className="scale-card-desc">{card.desc}</p>
              </div>
              <div className={`scale-img-wrap ${card.imgClass}`} aria-hidden="true">
                <Image
                  src={card.img}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  className="scale-card-img"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom 3 Cards */}
        <div className="scale-bottom-grid">
          {BOTTOM_CARDS.map((card, i) => (
            <div
              key={card.id}
              className={`scale-card scale-card--bottom scale-card--${card.id} reveal reveal-delay-${i + 1}`}
            >
              <div className="scale-card-content">
                <h3 className="scale-card-title">{card.title}</h3>
                <p className="scale-card-desc">{card.desc}</p>
              </div>
              <div className={`scale-img-wrap ${card.imgClass}`} aria-hidden="true">
                <Image
                  src={card.img}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  className="scale-card-img"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
