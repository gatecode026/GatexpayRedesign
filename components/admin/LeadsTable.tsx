"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Plus,
  X,
  Phone,
  Mail,
  Calendar,
  MoreVertical,
  Eye,
  Edit,
  CheckCircle2,
  StickyNote,
  Send,
  Trash2,
  Inbox,
  ChevronDown,
} from "lucide-react";
import { Lead, DashboardStats } from "./types";

interface LeadsTableProps {
  leads: Lead[];
  stats: DashboardStats;
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  timeFilter: string;
  setTimeFilter: (time: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize?: number;
  onOpenAddModal: () => void;
  onSelectLead: (lead: Lead) => void;
  onStatusChange: (id: string, newStatus: string) => void;
  onDeleteLead: (id: string) => void;
}

export default function LeadsTable({
  leads,
  stats,
  loading,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  timeFilter,
  setTimeFilter,
  currentPage,
  setCurrentPage,
  pageSize = 8,
  onOpenAddModal,
  onSelectLead,
  onStatusChange,
  onDeleteLead,
}: LeadsTableProps) {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  // Close action dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setActiveActionMenuId(null);
      }
    }
    if (activeActionMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeActionMenuId]);

  // Paginated leads
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedLeads = leads.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(leads.length / pageSize) || 1;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRowIds(paginatedLeads.map((l) => l._id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const formatSource = (source?: string) => {
    if (!source) return "Other";
    if (source === "contact_modal") return "Contact Modal";
    if (source === "contact_page") return "Contact Page";
    return source.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const renderDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const now = new Date();
      const isToday =
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear();

      if (isToday) {
        return (
          <div className="lead-date-cell">
            <span className="lead-date-primary">Today</span>
            <span className="lead-date-time">
              {d.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        );
      }

      const day = String(d.getDate()).padStart(2, "0");
      const mon = MONTHS[d.getMonth()];
      const yr = d.getFullYear();

      return (
        <div className="lead-date-cell">
          <span className="lead-date-text">{`${day} ${mon} ${yr}`}</span>
        </div>
      );
    } catch {
      return <span className="lead-date-text">{dateStr}</span>;
    }
  };

  return (
    <div className="dash-leads-card">
      {/* ── CARD HEADER & CONTROLS ── */}
      <div className="leads-card-header">
        <div className="leads-header-text">
          <h2 className="leads-card-title">Merchant Enquiries &amp; Leads</h2>
          <p className="leads-card-subtitle">
            Track and manage incoming merchant enquiries.
          </p>
        </div>

        <div className="leads-card-actions">
          <div className="leads-time-select-wrap">
            <Calendar size={14} className="leads-time-icon" />
            <select
              className="leads-time-select"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              aria-label="Filter enquiries by time range"
            >
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="All Time">All Time</option>
            </select>
          </div>

          <button
            type="button"
            className="add-lead-btn"
            onClick={onOpenAddModal}
          >
            <Plus size={16} />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* ── TOOLBAR: SEARCH FIELD & COMPACT FILTER TABS ── */}
      <div className="leads-toolbar">
        <div className="leads-search-input-wrap">
          <Search size={15} className="leads-search-icon" />
          <input
            type="text"
            placeholder="Search by merchant, company, email, or service..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          {searchTerm && (
            <button
              type="button"
              className="leads-clear-search"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search query"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="leads-filter-tabs">
          <button
            type="button"
            className={`filter-tab ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => {
              setStatusFilter("all");
              setCurrentPage(1);
            }}
          >
            All ({stats.totalLeads})
          </button>
          <button
            type="button"
            className={`filter-tab ${statusFilter === "new" ? "active" : ""}`}
            onClick={() => {
              setStatusFilter("new");
              setCurrentPage(1);
            }}
          >
            New ({stats.newLeads})
          </button>
          <button
            type="button"
            className={`filter-tab ${statusFilter === "in_progress" ? "active" : ""}`}
            onClick={() => {
              setStatusFilter("in_progress");
              setCurrentPage(1);
            }}
          >
            In Progress ({stats.inProgress})
          </button>
          <button
            type="button"
            className={`filter-tab ${statusFilter === "contacted" ? "active" : ""}`}
            onClick={() => {
              setStatusFilter("contacted");
              setCurrentPage(1);
            }}
          >
            Contacted ({stats.contacted})
          </button>
          <button
            type="button"
            className={`filter-tab ${statusFilter === "closed" ? "active" : ""}`}
            onClick={() => {
              setStatusFilter("closed");
              setCurrentPage(1);
            }}
          >
            Closed ({stats.closed})
          </button>
        </div>
      </div>

      {/* ── DESKTOP & TABLET DATA TABLE ── */}
      <div className="dash-table-container desktop-table-view">
        <table className="dash-table">
          <thead>
            <tr>
              <th className="th-checkbox">
                <input
                  type="checkbox"
                  className="lead-table-checkbox"
                  onChange={handleSelectAll}
                  checked={
                    paginatedLeads.length > 0 &&
                    selectedRowIds.length === paginatedLeads.length
                  }
                  aria-label="Select all leads"
                />
              </th>
              <th className="th-merchant">MERCHANT &amp; BUSINESS</th>
              <th className="th-contact">CONTACT</th>
              <th className="th-service">SERVICE</th>
              <th className="th-source">SOURCE</th>
              <th className="th-date">DATE</th>
              <th className="th-status">STATUS</th>
              <th className="th-action" aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="dash-table-empty">
                  <div className="dash-table-loading-spinner" />
                  <div>Loading merchant enquiries...</div>
                </td>
              </tr>
            ) : paginatedLeads.length === 0 ? (
              <tr>
                <td colSpan={8} className="dash-table-empty">
                  <Inbox size={32} className="table-empty-icon" />
                  <div className="table-empty-title">No merchant enquiries yet.</div>
                  <div className="table-empty-desc">
                    New enquiries submitted from the website will appear here.
                  </div>
                  <button
                    type="button"
                    className="add-lead-empty-btn"
                    onClick={onOpenAddModal}
                  >
                    <Plus size={14} /> Add Lead
                  </button>
                </td>
              </tr>
            ) : (
              paginatedLeads.map((lead) => {
                const isSelected = selectedRowIds.includes(lead._id);
                const initials = lead.fullName
                  ? lead.fullName
                      .trim()
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  : "NA";

                return (
                  <tr
                    key={lead._id}
                    className={`lead-row ${isSelected ? "selected" : ""}`}
                  >
                    {/* Checkbox */}
                    <td className="td-checkbox">
                      <input
                        type="checkbox"
                        className="lead-table-checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleRow(lead._id)}
                        aria-label={`Select ${lead.fullName}`}
                      />
                    </td>

                    {/* Merchant & Business */}
                    <td className="td-merchant">
                      <div className="lead-merchant-cell">
                        <div
                          className="merchant-avatar"
                          title={lead.fullName}
                          onClick={() => onSelectLead(lead)}
                        >
                          {initials}
                        </div>
                        <div className="merchant-info-stack">
                          <span
                            className="merchant-name-text"
                            onClick={() => onSelectLead(lead)}
                            title={lead.fullName}
                          >
                            {lead.fullName}
                          </span>
                          {lead.companyName && (
                            <span
                              className="merchant-company-text"
                              title={lead.companyName}
                            >
                              {lead.companyName}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="td-contact">
                      <div className="lead-contact-stack">
                        <a
                          href={`tel:${lead.countryCode || ""}${lead.phone}`}
                          className="lead-contact-line phone"
                        >
                          <Phone size={14} className="lead-contact-icon" />
                          <span className="lead-contact-val">
                            {lead.countryCode || "+91"} {lead.phone}
                          </span>
                        </a>
                        {lead.email ? (
                          <a
                            href={`mailto:${lead.email}`}
                            className="lead-contact-line email"
                            title={lead.email}
                          >
                            <Mail size={14} className="lead-contact-icon" />
                            <span className="lead-contact-val email-text">
                              {lead.email}
                            </span>
                          </a>
                        ) : (
                          <div className="lead-contact-line muted">
                            <Mail size={14} className="lead-contact-icon muted" />
                            <span className="lead-contact-val empty">No email</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Service */}
                    <td className="td-service">
                      <div
                        className="lead-service-badge"
                        title={lead.serviceCategory}
                      >
                        {lead.serviceCategory}
                      </div>
                    </td>

                    {/* Source */}
                    <td className="td-source">
                      <span className="lead-source-badge">
                        {formatSource(lead.source)}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="td-date">
                      {renderDate(lead.createdAt)}
                    </td>

                    {/* Status */}
                    <td className="td-status">
                      <div className="lead-status-wrapper">
                        <select
                          className={`lead-status-dropdown status-${lead.status}`}
                          value={lead.status}
                          onChange={(e) => onStatusChange(lead._id, e.target.value)}
                          aria-label={`Change status for ${lead.fullName}`}
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                        <ChevronDown size={12} className="lead-status-chevron" />
                      </div>
                    </td>

                    {/* Action */}
                    <td className="td-action">
                      <div
                        className="lead-action-cell"
                        ref={activeActionMenuId === lead._id ? actionMenuRef : null}
                      >
                        <button
                          type="button"
                          className={`lead-action-dots-btn ${
                            activeActionMenuId === lead._id ? "active" : ""
                          }`}
                          onClick={() =>
                            setActiveActionMenuId(
                              activeActionMenuId === lead._id ? null : lead._id
                            )
                          }
                          aria-label="Actions"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {activeActionMenuId === lead._id && (
                          <div className="lead-action-dropdown">
                            <button
                              type="button"
                              className="action-dropdown-item"
                              onClick={() => {
                                onSelectLead(lead);
                                setActiveActionMenuId(null);
                              }}
                            >
                              <Eye size={14} className="action-item-icon" />
                              <span>View Lead</span>
                            </button>
                            <button
                              type="button"
                              className="action-dropdown-item"
                              onClick={() => {
                                onSelectLead(lead);
                                setActiveActionMenuId(null);
                              }}
                            >
                              <Edit size={14} className="action-item-icon" />
                              <span>Edit Lead</span>
                            </button>
                            <button
                              type="button"
                              className="action-dropdown-item"
                              onClick={() => {
                                const nextStatus =
                                  lead.status === "new"
                                    ? "in_progress"
                                    : lead.status === "in_progress"
                                    ? "contacted"
                                    : lead.status === "contacted"
                                    ? "closed"
                                    : "new";
                                onStatusChange(lead._id, nextStatus);
                                setActiveActionMenuId(null);
                              }}
                            >
                              <CheckCircle2 size={14} className="action-item-icon" />
                              <span>Change Status</span>
                            </button>
                            <button
                              type="button"
                              className="action-dropdown-item"
                              onClick={() => {
                                onSelectLead(lead);
                                setActiveActionMenuId(null);
                              }}
                            >
                              <StickyNote size={14} className="action-item-icon" />
                              <span>Add Note</span>
                            </button>
                            {lead.email && (
                              <a
                                href={`mailto:${lead.email}`}
                                className="action-dropdown-item"
                                onClick={() => setActiveActionMenuId(null)}
                              >
                                <Send size={14} className="action-item-icon" />
                                <span>Send Email</span>
                              </a>
                            )}
                            <div className="action-dropdown-divider" />
                            <button
                              type="button"
                              className="action-dropdown-item danger"
                              onClick={() => {
                                onDeleteLead(lead._id);
                                setActiveActionMenuId(null);
                              }}
                            >
                              <Trash2 size={14} className="action-item-icon" />
                              <span>Delete Lead</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE LEADS CARDS VIEW (< 768px) ── */}
      <div className="mobile-lead-cards-view">
        {paginatedLeads.map((lead) => {
          const isSelected = selectedRowIds.includes(lead._id);
          const initials = lead.fullName
            ? lead.fullName
                .trim()
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()
            : "NA";

          return (
            <div
              key={lead._id}
              className={`mobile-lead-card ${isSelected ? "selected" : ""}`}
            >
              {/* Card Top: Checkbox, Avatar, Name & Business, Action */}
              <div className="mobile-card-top">
                <div className="mobile-merchant-header">
                  <input
                    type="checkbox"
                    className="lead-table-checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleRow(lead._id)}
                    aria-label={`Select ${lead.fullName}`}
                  />
                  <div
                    className="merchant-avatar"
                    onClick={() => onSelectLead(lead)}
                  >
                    {initials}
                  </div>
                  <div className="merchant-info-stack">
                    <span
                      className="merchant-name-text"
                      onClick={() => onSelectLead(lead)}
                    >
                      {lead.fullName}
                    </span>
                    {lead.companyName && (
                      <span className="merchant-company-text">
                        {lead.companyName}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="lead-action-dots-btn"
                  onClick={() => onSelectLead(lead)}
                  aria-label="View Lead Details"
                >
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Service Badge */}
              <div className="mobile-card-service">
                <span className="lead-service-badge">{lead.serviceCategory}</span>
              </div>

              {/* Contact Information */}
              <div className="mobile-card-contact">
                <a
                  href={`tel:${lead.phone}`}
                  className="lead-contact-line phone"
                >
                  <Phone size={14} className="lead-contact-icon" />
                  <span className="lead-contact-val">
                    {lead.countryCode || "+91"} {lead.phone}
                  </span>
                </a>
                {lead.email && (
                  <a
                    href={`mailto:${lead.email}`}
                    className="lead-contact-line email"
                  >
                    <Mail size={14} className="lead-contact-icon" />
                    <span className="lead-contact-val email-text">
                      {lead.email}
                    </span>
                  </a>
                )}
              </div>

              {/* Card Bottom: Source, Date, Status */}
              <div className="mobile-card-bottom">
                <div className="mobile-meta-tags">
                  <span className="lead-source-badge">
                    {formatSource(lead.source)}
                  </span>
                  <span className="lead-date-text">
                    {renderDate(lead.createdAt)}
                  </span>
                </div>

                <div className="lead-status-wrapper">
                  <select
                    className={`lead-status-dropdown status-${lead.status}`}
                    value={lead.status}
                    onChange={(e) => onStatusChange(lead._id, e.target.value)}
                    aria-label="Change status"
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <ChevronDown size={12} className="lead-status-chevron" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── PAGINATION FOOTER ── */}
      <div className="leads-pagination-footer">
        <span className="pagination-text">
          Showing {leads.length > 0 ? startIndex + 1 : 0} to{" "}
          {Math.min(startIndex + pageSize, leads.length)} of {leads.length} results
        </span>

        <div className="pagination-buttons">
          <button
            type="button"
            className="page-nav-btn"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            aria-label="Previous Page"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              className={`page-num-btn ${currentPage === num ? "active" : ""}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            className="page-nav-btn"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            aria-label="Next Page"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
