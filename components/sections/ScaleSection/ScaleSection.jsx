"use client";
import { useEffect, useRef } from "react";
import "./ScaleSection.css";
const TOP_CARDS = [
  {
    id: "gateway",
    title: "Beyond Just a Payment Gateway",
    desc: "GateXPay bridges digital processing with physical delivery. We combine tokenization with a suite of CSP services—from Micro-ATM to lending, it's your financial operations stack in one ecosystem.",
  },
  {
    id: "connect",
    title: "We Build, Not Just Connect",
    desc: "Payment giants have you API keys to figure it out. We act as your dedicated technology partner. From custom web and app development to cloud infrastructure and business automation, we build and scale exactly what your internal engineering team doesn't have to.",
  },
];
const BOTTOM_CARDS = [
  {
    id: "hub",
    title: "Pre-Integrated Financial Hub",
    desc: "Avoid vendor negotiations. GateXPay integrates with banking, lending, insurance, and investment platforms. Launch financial products instantly without separate tie-ups.",
  },
  {
    id: "tokenization",
    title: "Bank-Grade Tokenization",
    desc: "We secure every transaction at the root. By automatically replacing sensitive card numbers with tokens, our PCI-DSS-compliant architecture drastically reduces fraud and compliance risk. Built for your systems: 99.99% uptime and low-latency routing, even during massive peak traffic surges.",
  },
  {
    id: "market",
    title: "Capture Every Market Tier",
    desc: "Expand beyond tier-1 digital natives. GateXPay's tools help you reach tier-2 and tier-3 and rural markets with financial services and seamless transfers.",
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
      <div className="container">
        <h2 className="scale-heading reveal">
          Everything Your Business Needs to Scale
        </h2>

        {/* Top 2 cards */}
        <div className="scale-top-grid">
          {TOP_CARDS.map((card, i) => (
            <div
              key={card.id}
              className={`scale-card scale-card--top reveal reveal-delay-${i + 1}`}
            >
              <h3 className="scale-card-title">{card.title}</h3>
              <p className="scale-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom 3 cards */}
        <div className="scale-bottom-grid">
          {BOTTOM_CARDS.map((card, i) => (
            <div
              key={card.id}
              className={`scale-card scale-card--bottom reveal reveal-delay-${i + 1}`}
            >
              <h3 className="scale-card-title scale-card-title--sm">
                {card.title}
              </h3>
              <p className="scale-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
