"use client";
import React, { useState } from "react";
export default function LeadsAnalyticsCard({ chartBars, stats }) {
  const [filterPeriod, setFilterPeriod] = useState("Last 30 Days");
  const maxVal = Math.max(...chartBars.map((b) => b.count), 1);
  const hasData = chartBars.length > 0 && chartBars.some((b) => b.count > 0);
  return (
    <div className="side-panel-card">
      <div className="side-panel-header">
        <h3 className="side-panel-title">Leads Analytics</h3>
        <select
          className="side-panel-select"
          value={filterPeriod}
          onChange={(e) => setFilterPeriod(e.target.value)}
          aria-label="Filter analytics period"
        >
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="This Year">This Year</option>
        </select>
      </div>

      {!hasData ? (
        <div className="analytics-empty-state">
          Not enough data to display analytics.
        </div>
      ) : (
        <div className="analytics-chart-box">
          <div className="chart-y-axis">
            <span>{maxVal}</span>
            <span>{Math.round(maxVal * 0.75)}</span>
            <span>{Math.round(maxVal * 0.5)}</span>
            <span>{Math.round(maxVal * 0.25)}</span>
            <span>0</span>
          </div>

          <div className="chart-bars-wrap">
            {chartBars.map((bar, idx) => {
              const heightPct =
                bar.count > 0
                  ? Math.min(Math.max((bar.count / maxVal) * 100, 12), 100)
                  : 4;
              return (
                <div key={idx} className="chart-bar-col">
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ height: `${heightPct}%` }}
                      title={`${bar.label}: ${bar.count} leads`}
                    />
                  </div>
                  <span className="bar-label">{bar.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="analytics-summary-legend">
        <div className="legend-item">
          <span className="legend-dot bg-blue" />
          <span className="legend-val">{stats.totalLeads}</span>
          <span className="legend-name">Total Leads</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot bg-amber" />
          <span className="legend-val">{stats.newLeads}</span>
          <span className="legend-name">New / Pending</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot bg-emerald" />
          <span className="legend-val">
            {stats.inProgress + stats.contacted}
          </span>
          <span className="legend-name">Contacted</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot bg-purple" />
          <span className="legend-val">{stats.totalConsents}</span>
          <span className="legend-name">Cookie Consents</span>
        </div>
      </div>
    </div>
  );
}
