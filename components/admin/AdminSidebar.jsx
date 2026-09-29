"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Inbox,
  Users,
  Mail,
  Briefcase,
  FileText,
  Settings as SettingsIcon,
  LogOut,
  X,
} from "lucide-react";
export default function AdminSidebar({
  activeNav,
  setActiveNav,
  sidebarOpen,
  setSidebarOpen,
  stats,
  onOpenHelpModal,
  onLogout,
}) {
  const handleNavClick = (section) => {
    setActiveNav(section);
    setSidebarOpen(false);
  };
  return (
    <>
      <aside className={`dash-sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <Link
            href="/admin/dashboard"
            className="sidebar-brand"
            onClick={() => handleNavClick("overview")}
          >
            <Image
              src="/assets/images/logo-dark.png"
              alt="GateXPay Technologies"
              width={132}
              height={32}
              style={{ objectFit: "contain" }}
              priority
            />
          </Link>
          <div className="sidebar-header-right">
            <span className="sidebar-pill">v2.0</span>
            <button
              type="button"
              className="sidebar-close-mobile"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Sidebar Scrollable Navigation */}
        <nav className="sidebar-nav">
          {/* OVERVIEW */}
          <div className="nav-group-label">OVERVIEW</div>
          <button
            type="button"
            className={`nav-item ${activeNav === "overview" ? "active" : ""}`}
            onClick={() => handleNavClick("overview")}
          >
            <Inbox size={17} />
            <span>Dashboard Overview</span>
            <span className="nav-badge live">Live</span>
          </button>

          {/* LEADS & ENQUIRIES */}
          <div className="nav-group-label">LEADS &amp; ENQUIRIES</div>
          <button
            type="button"
            className={`nav-item ${activeNav === "all_enquiries" ? "active" : ""}`}
            onClick={() => handleNavClick("all_enquiries")}
          >
            <Users size={17} />
            <span>All Merchant Leads</span>
            <span className="nav-badge count">{stats.totalLeads}</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeNav === "contact_leads" ? "active" : ""}`}
            onClick={() => handleNavClick("contact_leads")}
          >
            <Mail size={17} />
            <span>Contact Page Leads</span>
            <span className="nav-badge count">{stats.contactLeads}</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeNav === "service_leads" ? "active" : ""}`}
            onClick={() => handleNavClick("service_leads")}
          >
            <Briefcase size={17} />
            <span>Service &amp; Modal Leads</span>
            <span className="nav-badge count">{stats.serviceLeads}</span>
          </button>

          {/* CONTENT & CMS */}
          <div className="nav-group-label">CONTENT &amp; CMS</div>
          <button
            type="button"
            className={`nav-item ${activeNav === "blog_posts" ? "active" : ""}`}
            onClick={() => handleNavClick("blog_posts")}
          >
            <FileText size={17} />
            <span>Blog Articles</span>
            <span className="nav-badge count">{stats.totalArticles}</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          {/* Need Help Card */}
          <div className="sidebar-help-card">
            <h4 className="help-card-title">Need Help?</h4>
            <p className="help-card-text">
              Contact our expert team for any assistance.
            </p>
            <button
              type="button"
              className="help-card-btn"
              onClick={onOpenHelpModal}
            >
              Talk to an Expert
            </button>
          </div>

          <div className="sidebar-bottom-actions">
            <button
              type="button"
              className={`sidebar-action-btn ${activeNav === "settings" ? "active" : ""}`}
              onClick={() => handleNavClick("settings")}
            >
              <SettingsIcon size={16} />
              <span>Settings</span>
            </button>

            <button
              type="button"
              className="sidebar-action-btn logout"
              onClick={onLogout}
              title="Sign Out"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
