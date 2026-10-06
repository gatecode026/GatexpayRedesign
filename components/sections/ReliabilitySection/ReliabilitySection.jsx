"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import "./ReliabilitySection.css";

const CARDS = [
  {
    id: "csp",
    title: "CSP & TSP Infrastructure",
    desc: "Scale transactions seamlessly with 99.99% uptime, without network bottlenecks.",
    video: "/assets/images/tsp.webm",
    href: "/services",
  },
  {
    id: "protection",
    title: "Bank-Grade Protection",
    desc: "Tokenization, encryption, fraud protection, and PCI-DSS compliant deployment.",
    video: "/assets/images/tsp.webm",
    href: "/services",
  },
  {
    id: "integration",
    title: "Unified Integration",
    desc: "Ecosystem integration, monitoring, settlements, and agent management.",
    video: "/assets/images/csp.webm",
    href: "/services",
  },
];

function AutoPlayVideo({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;

    const tryPlay = () => {
      el.muted = true;
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    tryPlay();

    // In case browser policy initially blocks before any user gesture
    const handleGesture = () => {
      if (el && el.paused) {
        tryPlay();
      }
    };
    window.addEventListener("pointerdown", handleGesture, { once: true });
    window.addEventListener("scroll", handleGesture, { once: true, passive: true });
    window.addEventListener("keydown", handleGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("scroll", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="rel-card-video"
      onLoadedData={(e) => {
        e.currentTarget.muted = true;
        e.currentTarget.play().catch(() => {});
      }}
      onCanPlay={(e) => {
        e.currentTarget.muted = true;
        e.currentTarget.play().catch(() => {});
      }}
    >
      <source src={src} type="video/webm" />
    </video>
  );
}

export default function ReliabilitySection() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("in-view", e.isIntersecting)
        ),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="reliability" id="reliability" ref={ref}>
      <div className="container container--page reliability-container">
        <h2 className="reliability-heading reveal">
          Engineered for Scale &amp; Reliability
        </h2>

        <div className="reliability-grid">
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              className={`rel-card reveal reveal-delay-${i + 1}`}
            >
              <div className="rel-card-media">
                <AutoPlayVideo src={card.video} />
              </div>
              <div className="rel-card-body">
                <div className="rel-card-text">
                  <h3 className="rel-card-title">{card.title}</h3>
                  <p className="rel-card-desc">{card.desc}</p>
                </div>
                <Link href={card.href} className="rel-card-link">
                  <span>Explore More</span>
                  <ArrowRight size={18} className="rel-link-arrow" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

