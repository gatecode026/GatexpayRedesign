"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import "./ReliabilitySection.css";

const CARDS = [
  {
    id: "csp",
    title: "CSP & TSP Infrastructure",
    desc: "Scale transactions seamlessly with 99.99% uptime, without network bottlenecks.",
    img: "/assets/images/new-icon-1e264d.svg",
  },
  {
    id: "protection",
    title: "Bank-Grade Protection",
    desc: "Tokenization, encryption, fraud protection, and PCI-DSS compliant deployment.",
    img: "/assets/images/new-icon-1f3e9a.svg",
  },
  {
    id: "integration",
    title: "Unified Integration",
    desc: "Ecosystem integration, monitoring, settlements, and agent management.",
    img: "/assets/images/new-icon-5630ea.svg",
  },
];

export default function ReliabilitySection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("in-view", e.isIntersecting)),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="reliability" ref={ref}>
      <div className="container">
        <h2 className="reliability-heading reveal">
          Engineered for Scale &amp; Reliability
        </h2>

        <div className="reliability-grid">
          {CARDS.map((card, i) => (
            <div key={card.id} className={`rel-card reveal reveal-delay-${i + 1}`}>
              <div className="rel-card-img-wrap">
                <Image
                  src={card.img}
                  alt={card.title}
                  width={180}
                  height={120}
                  className="rel-card-img"
                />
              </div>
              <div className="rel-card-body">
                <h3 className="rel-card-title">{card.title}</h3>
                <p className="rel-card-desc">{card.desc}</p>
                <a href="/services" className="rel-card-link">
                  Explore More <span>›</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
