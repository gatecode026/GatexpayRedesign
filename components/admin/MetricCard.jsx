"use client";
import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
export default function MetricCard({
  icon,
  iconBgClass,
  label,
  value,
  trendText,
  trendDirection,
  subtrendText,
  sparklineColor,
  sparklinePoints,
  onClick,
}) {
  return (
    <div
      className="kpi-card"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="kpi-header">
        <div className={`kpi-icon-wrap ${iconBgClass}`}>{icon}</div>
        <div className="kpi-label-wrap">
          <span className="kpi-label">{label}</span>
          <span className="kpi-value">{value}</span>
        </div>
      </div>
      <div className="kpi-footer">
        <span
          className={`kpi-trend ${trendDirection === "up" ? "positive" : trendDirection === "down" ? "negative" : ""}`}
        >
          {trendDirection === "up" && <ArrowUpRight size={13} />}
          {trendDirection === "down" && <ArrowDownRight size={13} />}
          {trendText}
        </span>
        <span className="kpi-subtrend">{subtrendText}</span>
        <div className="kpi-sparkline">
          <svg viewBox="0 0 60 20" fill="none">
            <path
              d={sparklinePoints}
              stroke={sparklineColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
