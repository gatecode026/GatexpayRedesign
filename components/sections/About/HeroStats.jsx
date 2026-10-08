"use client";
import { useEffect, useRef, useState } from "react";
const STATS = [
  { target: 500, suffix: "+", label: "Businesses Served" },
  { target: 99.9, suffix: "%", decimals: 1, label: "Uptime Guaranteed" },
  { target: 50, suffix: "+", label: "Fintech Integrations" },
  { target: 5, suffix: "+", label: "Years of Expertise" },
];
export default function HeroStats() {
  const [values, setValues] = useState(() => STATS.map((s) => s.target));
  const cardRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const animationFrameIdRef = useRef(null);

  const runCountAnimation = () => {
    if (hasAnimatedRef.current || isAnimatingRef.current) return;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    hasAnimatedRef.current = true;
    isAnimatingRef.current = true;
    const duration = 1200; // ms
    const startTimestamp = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setValues(STATS.map((stat) => stat.target * easeOutProgress));
      if (progress < 1) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        setValues(STATS.map((stat) => stat.target));
        isAnimatingRef.current = false;
      }
    };
    // Reset to 0 and start count-up
    setValues([0, 0, 0, 0]);
    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div
      className="about-stats-card"
      ref={cardRef}
      onMouseEnter={runCountAnimation}
      onClick={runCountAnimation}
      onTouchStart={runCountAnimation}
      role="region"
      aria-label="Key GateXPay Statistics"
    >
      {STATS.map((stat, idx) => {
        const formatted =
          stat.decimals !== undefined
            ? values[idx].toFixed(stat.decimals)
            : Math.floor(values[idx]).toString();
        return (
          <div key={stat.label} className="about-stat-item">
            <div className="about-stat-value">
              {formatted}
              {stat.suffix}
            </div>
            <div className="about-stat-label">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
