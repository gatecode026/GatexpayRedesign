"use client";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import Container from "@/components/common/Container/Container";
import "./PaymentJourney.css";
const STEPS = [
  {
    id: "discovery",
    num: "01",
    title: "Discovery & Architecture",
    desc: "We don't just hand you an API key and leave you to it. Our solution architects work directly with your team to map your exact payment flows and business logic.",
    img: "/assets/images/step-01-discovery.png",
  },
  {
    id: "sandbox",
    num: "02",
    title: "Sandbox & Solution Design",
    desc: "Full sandbox environment with test data. Design, prototype, and validate your integration before a single line of production code is written.",
    img: "/assets/images/step-02-sandbox.png",
  },
  {
    id: "integration",
    num: "03",
    title: "Zero-Disruption Integration",
    desc: "Go live without downtime. Our integration playbooks, SDKs, and dedicated support ensure a smooth rollout with zero disruption to your operations.",
    img: "/assets/images/step-03-integration.png",
  },
  {
    id: "launch",
    num: "04",
    title: "Launch, Scale, & Support",
    desc: "Post-launch is not post-relationship. Ongoing monitoring, 24/7 ops support, and a growth team to help you scale to the next tier.",
    img: "/assets/images/step-04-launch.png",
  },
];
export default function PaymentJourney() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? STEPS.length - 1 : c - 1)),
    []
  );
  const next = useCallback(
    () => setCurrent((c) => (c === STEPS.length - 1 ? 0 : c + 1)),
    []
  );
  // Keep the active card scrolled into view within the track on mobile —
  // otherwise advancing (dots/arrows/auto) could leave a differently-styled
  // inactive card on screen while the active one sits off-screen. Uses the
  // track's own scrollTo (not scrollIntoView) so this only ever moves the
  // track's horizontal scroll — never the page's vertical scroll.
  useEffect(() => {
    const track = trackRef.current;
    const activeCard = track?.children[current];
    if (!track || !activeCard) return;
    track.scrollTo({ left: activeCard.offsetLeft, behavior: "smooth" });
  }, [current]);
  // Scroll reveal
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
  // Auto-advance every 3s; resets on manual interaction, pauses on hover/focus
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [current, isPaused, next]);
  return (
    <section className="journey" ref={ref}>
      <Container className="container--page">
        <div className="journey-inner">
          {/* Header row */}
          <div className="journey-header">
            <h2 className="journey-heading">The Path to Seamless Payments</h2>

            {/* Controls
            prev: outline when at first card, filled when can go back
            next: filled when can go forward, outline when at last card */}
            <div className="journey-controls">
              <button
                className={`journey-btn ${current === 0 ? "journey-btn--outline" : "journey-btn--filled"}`}
                onClick={prev}
                aria-label="Previous step"
              >
                {/* Chevron Left SVG — 28px */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className={`journey-btn ${current === STEPS.length - 1 ? "journey-btn--outline" : "journey-btn--filled"}`}
                onClick={next}
                aria-label="Next step"
              >
                {/* Chevron Right SVG — 28px */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cards + dots wrapper */}
          <div className="journey-cards-outer">
            {/* Cards track */}
            <div
              className="journey-track"
              ref={trackRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                const dx = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(dx) > 40) dx > 0 ? next() : prev();
              }}
            >
              {STEPS.map((step, i) => (
                <div
                  key={step.id}
                  className={`journey-card${i === current ? " active" : ""}`}
                  onClick={() => setCurrent(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setCurrent(i)}
                  aria-label={`Step ${step.num}: ${step.title}`}
                >
                  {/* Image area */}
                  <div className="journey-card-img-wrap">
                    <Image
                      src={step.img}
                      alt={step.title}
                      fill
                      className="journey-card-img"
                      sizes="(max-width: 640px) 88vw, (max-width: 900px) 75vw, 430px"
                      priority={i === 0}
                    />
                    {/* Step number — large typographic overlay */}
                    <span className="journey-step-num" aria-hidden="true">
                      {step.num}
                    </span>
                  </div>

                  {/* Text body */}
                  <div className="journey-card-body">
                    <h3 className="journey-card-title">{step.title}</h3>
                    <p className="journey-card-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="journey-dots" role="group" aria-label="Step pagination">
              {STEPS.map((step, i) => (
                <button
                  key={i}
                  type="button"
                  className={`journey-dot${i === current ? " active" : ""}`}
                  onClick={() => setCurrent(i)}
                  aria-current={i === current ? "step" : undefined}
                  aria-label={`Go to step ${i + 1}: ${step.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
