"use client";
import React from "react";
export default function RecentActivityCard({ recentActivities, onRefresh }) {
  return (
    <div className="side-panel-card">
      <div className="side-panel-header">
        <h3 className="side-panel-title">Recent Activity</h3>
        <button type="button" className="side-panel-link" onClick={onRefresh}>
          See All
        </button>
      </div>

      {recentActivities.length === 0 ? (
        <div className="side-panel-empty">No recent activity.</div>
      ) : (
        <div className="recent-activity-list">
          {recentActivities.map((act) => (
            <div key={act.id} className="activity-item">
              <span
                className="activity-dot"
                style={{ backgroundColor: act.color }}
              />
              <span className="activity-text">{act.text}</span>
              <span className="activity-time">{act.timeAgo}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
