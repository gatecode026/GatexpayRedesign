"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  target: number;
  suffix: string;
  decimals?: number;
  label: string;
}

const STATS: StatItem[] = [
  { target: 500, suffix: "+", label: "Businesses Served" },
  { target: 99.9, suffix: "%", decimals: 1, label: "Uptime Guaranteed" },
  { target: 50, suffix: "+", label: "Fintech Integrations" },
  { target: 5, suffix: "+", label: "Years of Expertise" },
];

export default function HeroStats() {
  const [values, setValues] = useState<number[]>(() => STATS.map((s) => s.target));
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If user prefers reduced motion, leave target values as-is
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          observer.disconnect();
          const duration = 1200; // ms
          const startTimestamp = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);

            setValues(STATS.map((stat) => stat.target * easeOutProgress));

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            } else {
              setValues(STATS.map((stat) => stat.target));
            }
          };

          // Reset to 0 and start count-up
          setValues([0, 0, 0, 0]);
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="about-stats-card" ref={cardRef} role="region" aria-label="Key GateXPay Statistics">
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
