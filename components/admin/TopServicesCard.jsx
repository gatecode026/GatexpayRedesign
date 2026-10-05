"use client";
import React from "react";
import Link from "next/link";
import {
  CreditCard,
  Server,
  ShieldCheck,
  Landmark,
  ArrowUpRight,
} from "lucide-react";
export default function TopServicesCard({ topServices }) {
  return (
    <div className="side-panel-card">
      <div className="side-panel-header">
        <h3 className="side-panel-title">Top Requested Services</h3>
        <Link href="/services" target="_blank" className="side-panel-link">
          See All
        </Link>
      </div>

      {topServices.length === 0 ? (
        <div className="side-panel-empty">
          No service requests recorded yet.
        </div>
      ) : (
        <div className="services-ranked-list">
          {topServices.map((srv, idx) => (
            <div key={idx} className="ranked-service-item">
              <div className="service-icon-box">
                {idx === 0 ? (
                  <CreditCard size={15} />
                ) : idx === 1 ? (
                  <Server size={15} />
                ) : idx === 2 ? (
                  <ShieldCheck size={15} />
                ) : (
                  <Landmark size={15} />
                )}
              </div>
              <div className="service-meta-box">
                <span className="service-meta-name">{srv.name}</span>
                <div className="service-progress-track">
                  <div
                    className="service-progress-fill"
                    style={{ width: `${srv.progress}%` }}
                  />
                </div>
              </div>
              <div className="service-stat-col">
                <span className="service-count">{srv.count}</span>
                <span className="service-trend">
                  <ArrowUpRight size={11} /> {srv.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
