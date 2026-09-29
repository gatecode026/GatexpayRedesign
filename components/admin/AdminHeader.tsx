"use client";

import React, { useRef, useEffect } from "react";
import {
  Menu,
  Search,
  RefreshCw,
  Bell,
  ChevronDown,
  Settings as SettingsIcon,
  LogOut,
  X,
} from "lucide-react";
import { NotificationItem } from "./types";

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearchSubmit: (e?: React.FormEvent) => void;
  dbStatus: "online" | "connecting" | "offline";
  refreshing: boolean;
  onRefresh: () => void;
  notifications: NotificationItem[];
  unreadNotifCount: number;
  onMarkNotificationsRead: () => void;
  onSelectNotificationLead: () => void;
  notifDropdownOpen: boolean;
  setNotifDropdownOpen: (open: boolean) => void;
  profileDropdownOpen: boolean;
  setProfileDropdownOpen: (open: boolean) => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}

export default function AdminHeader({
  onOpenMobileSidebar,
  searchTerm,
  setSearchTerm,
  onSearchSubmit,
  dbStatus,
  refreshing,
  onRefresh,
  notifications,
  unreadNotifCount,
  onMarkNotificationsRead,
  onSelectNotificationLead,
  notifDropdownOpen,
  setNotifDropdownOpen,
  profileDropdownOpen,
  setProfileDropdownOpen,
  onOpenSettings,
  onLogout,
}: AdminHeaderProps) {
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (notifRef.current && !notifRef.current.contains(target as Node)) {
        setNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setNotifDropdownOpen, setProfileDropdownOpen]);

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="dash-topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="topbar-hamburger"
          onClick={onOpenMobileSidebar}
          aria-label="Open mobile navigation"
        >
          <Menu size={20} />
        </button>

        {/* Global Search Input */}
        <form onSubmit={onSearchSubmit} className="topbar-search-wrap">
          <Search size={16} className="topbar-search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search by merchant, company, email, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="cmd-k-badge">⌘K</span>
          <button
            type="submit"
            className="topbar-search-btn"
            title="Search"
          >
            <Search size={14} />
          </button>
        </form>
      </div>

      <div className="topbar-right">
        {/* Atlas MongoDB Indicator */}
        <div className={`db-health-pill ${dbStatus}`}>
          <span className="pulse-dot" />
          <span>
            Atlas MongoDB: {dbStatus === "online" ? "Online" : dbStatus === "connecting" ? "Connecting" : "Offline"}
          </span>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          className="topbar-icon-btn"
          onClick={onRefresh}
          title="Refresh Data from Server"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin text-sky-600" : ""} />
        </button>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            className="topbar-icon-btn notif"
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              setProfileDropdownOpen(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={17} />
            {unreadNotifCount > 0 && (
              <span className="notif-badge">{unreadNotifCount}</span>
            )}
          </button>

          {notifDropdownOpen && (
            <div className="notif-dropdown-menu">
              <div className="notif-header">
                <span className="notif-title">Notifications</span>
                {unreadNotifCount > 0 && (
                  <button
                    type="button"
                    className="notif-mark-read"
                    onClick={onMarkNotificationsRead}
                  >
                    Mark as read
                  </button>
                )}
              </div>
              <div className="notif-list">
                {notifications.length === 0 ? (
                  <div className="notif-empty">No notifications yet.</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`notif-item ${n.unread ? "unread" : ""}`}
                      onClick={onSelectNotificationLead}
                    >
                      <div className="notif-item-header">
                        <span className="notif-item-title">{n.title}</span>
                        <span className="notif-item-time">{n.timeAgo}</span>
                      </div>
                      <p className="notif-item-msg">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="notif-footer">
                <button
                  type="button"
                  className="notif-view-all"
                  onClick={onSelectNotificationLead}
                >
                  View all enquiries →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Pill */}
        <div className="relative" ref={profileRef}>
          <div
            className="topbar-profile-pill"
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setNotifDropdownOpen(false);
            }}
          >
            <div className="profile-avatar">SA</div>
            <div className="profile-info-text">
              <span className="profile-name">Super Admin</span>
              <span className="profile-email">admin@gatexpay.com</span>
            </div>
            <ChevronDown size={14} className="profile-chevron" />
          </div>

          {profileDropdownOpen && (
            <div className="profile-dropdown-menu">
              <div className="profile-menu-header">
                <strong>Super Admin</strong>
                <span>admin@gatexpay.com</span>
              </div>
              <button
                type="button"
                className="profile-menu-item"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onOpenSettings();
                }}
              >
                <SettingsIcon size={15} />
                <span>Settings &amp; Email Provider</span>
              </button>
              <button
                type="button"
                className="profile-menu-item logout"
                onClick={onLogout}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
