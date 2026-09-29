"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import "./ScrollToTop.css";

export default function ScrollToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0;
      setScrollProgress(scrolled);
      setIsVisible(scrollPx > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      type="button"
      className={`scroll-to-top-btn ${isVisible ? "is-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <svg className="stt-progress-ring" viewBox="0 0 48 48" width="48" height="48">
        <circle
          className="stt-progress-track"
          stroke="#E0F2FE"
          strokeWidth="2.5"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
        <circle
          className="stt-progress-bar"
          stroke="#0284C7"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: isNaN(strokeDashoffset) ? circumference : strokeDashoffset,
          }}
        />
      </svg>
      <ArrowUp size={18} className="stt-arrow-icon" />
    </button>
  );
}
