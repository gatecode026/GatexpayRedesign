"use client";

import React, { useMemo } from "react";

export default function MorningCard() {
  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning!";
    if (hour < 17) return "Good Afternoon!";
    return "Good Evening!";
  }, []);

  return (
    <div className="greeting-date-card">
      <div className="greeting-content">
        <span className="greeting-date">{todayFormatted}</span>
        <h2 className="greeting-title">{greeting}</h2>
        <p className="greeting-sub">Let&apos;s grow together</p>
        <p className="greeting-desc">
          Track new opportunities, respond faster and build stronger partnerships.
        </p>
      </div>
      <div className="greeting-wave-decor">
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 35C40 15 80 50 120 30C160 10 180 40 200 25V60H0V35Z"
            fill="url(#waveGrad)"
          />
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="200" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#bae6fd" stopOpacity="0.4" />
              <stop offset="1" stopColor="#e0f2fe" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
