"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  X,
  ShieldCheck,
  Shield,
  Download,
  RefreshCw,
  Globe,
  Clock,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
export default function CookieConsentsTable({
  logs,
  loading = false,
  onRefresh,
  onExportCSV,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [decisionFilter, setDecisionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState(null);
  const pageSize = 8;
  // Filtered logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchDecision =
        decisionFilter === "all" || log.decision === decisionFilter;
      if (!matchDecision) return false;
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      const matchId = log.consentId?.toLowerCase().includes(q);
      const matchIp = log.ipAddress?.toLowerCase().includes(q);
      const matchDec = log.decision?.toLowerCase().includes(q);
      return matchId || matchIp || matchDec;
    });
  }, [logs, decisionFilter, searchTerm]);
  // Counts
  const acceptedCount = useMemo(
    () => logs.filter((l) => l.decision === "all_accepted").length,
    [logs]
  );
  const essentialCount = useMemo(
    () => logs.filter((l) => l.decision === "essential_only").length,
    [logs]
  );
  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + pageSize);
  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return "Recently";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };
  return (
    <div className="dash-leads-card">
      {/* ── CARD HEADER ── */}
      <div className="leads-card-header">
        <div className="leads-header-text">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
              <ShieldCheck size={16} />
            </span>
            <h2 className="leads-card-title">
              DPDP Act 2023 Consent Audit Logs
            </h2>
          </div>
          <p className="leads-card-subtitle">
            Audited user privacy consent records stored in MongoDB Atlas with
            anonymized IP tracking.
          </p>
        </div>

        <div className="leads-card-actions">
          {onExportCSV && (
            <button
              type="button"
              className="panel-action-btn"
              onClick={onExportCSV}
              title="Export records to CSV"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          )}
          {onRefresh && (
            <button
              type="button"
              className="panel-action-btn primary"
              onClick={onRefresh}
              title="Sync with database"
            >
              <RefreshCw size={14} />
              <span>Audit Sync</span>
            </button>
          )}
        </div>
      </div>

      {/* ── TOOLBAR: SEARCH & DECISION TABS ── */}
      <div className="leads-toolbar">
        <div className="leads-search-input-wrap">
          <Search size={15} className="leads-search-icon" />
          <input
            type="text"
            placeholder="Search by Consent ID or Anonymized IP..."
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
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="leads-filter-tabs">
          <button
            type="button"
            className={`filter-tab ${decisionFilter === "all" ? "active" : ""}`}
            onClick={() => {
              setDecisionFilter("all");
              setCurrentPage(1);
            }}
          >
            All Logs ({logs.length})
          </button>
          <button
            type="button"
            className={`filter-tab ${decisionFilter === "all_accepted" ? "active" : ""}`}
            onClick={() => {
              setDecisionFilter("all_accepted");
              setCurrentPage(1);
            }}
          >
            All Accepted ({acceptedCount})
          </button>
          <button
            type="button"
            className={`filter-tab ${decisionFilter === "essential_only" ? "active" : ""}`}
            onClick={() => {
              setDecisionFilter("essential_only");
              setCurrentPage(1);
            }}
          >
            Essential Only ({essentialCount})
          </button>
        </div>
      </div>

      {/* ── DESKTOP & TABLET DATA TABLE ── */}
      <div className="dash-table-container desktop-table-view">
        <table className="dash-table cookie-consents-table">
          <thead>
            <tr>
              <th className="th-consent-id">CONSENT ID</th>
              <th className="th-consent-decision">DECISION</th>
              <th className="th-consent-prefs">ALLOWED PREFERENCES</th>
              <th className="th-consent-ip">ANONYMIZED IP</th>
              <th className="th-consent-date" style={{ textAlign: "right" }}>
                LOGGED AT
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="dash-table-empty">
                  <div className="dash-table-loading-spinner" />
                  <div>Loading consent audit logs...</div>
                </td>
              </tr>
            ) : paginatedLogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="dash-table-empty">
                  <Shield size={32} className="table-empty-icon" />
                  <div className="table-empty-title">No consent logs found</div>
                  <div className="table-empty-desc">
                    When visitors configure cookie preferences on the website,
                    audited records will appear here.
                  </div>
                  {(searchTerm || decisionFilter !== "all") && (
                    <button
                      type="button"
                      className="add-lead-empty-btn"
                      onClick={() => {
                        setSearchTerm("");
                        setDecisionFilter("all");
                        setCurrentPage(1);
                      }}
                    >
                      Reset Filters
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              paginatedLogs.map((log) => {
                const isCopied = copiedId === log._id;
                const isAllAccepted = log.decision === "all_accepted";
                return (
                  <tr key={log._id} className="cookie-table-row">
                    {/* Consent ID */}
                    <td className="td-consent-id">
                      <div className="cookie-id-cell">
                        <div className="cookie-icon-box">
                          <ShieldCheck size={15} />
                        </div>
                        <div className="cookie-id-info">
                          <span
                            className="cookie-id-text"
                            title={log.consentId}
                          >
                            {log.consentId}
                          </span>
                          <button
                            type="button"
                            className={`cookie-copy-btn ${isCopied ? "copied" : ""}`}
                            onClick={() => handleCopyId(log.consentId)}
                            title={isCopied ? "Copied" : "Copy Consent ID"}
                          >
                            {isCopied ? (
                              <>
                                <Check size={11} />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={11} />
                                <span>Copy ID</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Decision */}
                    <td className="td-consent-decision">
                      <span
                        className={`cookie-decision-badge ${isAllAccepted ? "all-accepted" : "essential-only"}`}
                      >
                        <span className="decision-dot" />
                        <span>
                          {isAllAccepted ? "All Accepted" : "Essential Only"}
                        </span>
                      </span>
                    </td>

                    {/* Preferences Allowed */}
                    <td className="td-consent-prefs">
                      <div className="cookie-prefs-wrap">
                        <span className="cookie-pref-pill essential">
                          Essential
                        </span>
                        {log.preferences?.analytics && (
                          <span className="cookie-pref-pill optional">
                            Analytics
                          </span>
                        )}
                        {log.preferences?.functional && (
                          <span className="cookie-pref-pill optional">
                            Functional
                          </span>
                        )}
                        {log.preferences?.marketing && (
                          <span className="cookie-pref-pill optional">
                            Marketing
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Anonymized IP */}
                    <td className="td-consent-ip">
                      <div className="cookie-ip-cell">
                        <Globe size={13} className="cookie-ip-icon" />
                        <span className="cookie-ip-text">{log.ipAddress}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td
                      className="td-consent-date"
                      style={{ textAlign: "right" }}
                    >
                      <div className="cookie-date-cell">
                        <Clock size={12} className="cookie-date-icon" />
                        <span>{formatDate(log.updatedAt)}</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE CARD VIEW (<= 768px) ── */}
      <div className="mobile-lead-cards-view">
        {loading ? (
          <div className="mobile-empty-state">
            <div className="dash-table-loading-spinner" />
            <div>Loading consent audit logs...</div>
          </div>
        ) : paginatedLogs.length === 0 ? (
          <div className="mobile-empty-state">
            <Shield size={28} />
            <div className="mobile-empty-title">No consent logs found</div>
          </div>
        ) : (
          paginatedLogs.map((log) => {
            const isAllAccepted = log.decision === "all_accepted";
            const isCopied = copiedId === log._id;
            return (
              <div
                key={log._id}
                className="mobile-lead-card cookie-mobile-card"
              >
                <div className="mobile-card-top">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-slate-100 text-slate-600">
                      <ShieldCheck size={14} />
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-800">
                      {log.consentId}
                    </span>
                    <button
                      type="button"
                      className="cookie-copy-btn"
                      onClick={() => handleCopyId(log.consentId)}
                    >
                      {isCopied ? <Check size={11} /> : <Copy size={11} />}
                    </button>
                  </div>

                  <span
                    className={`cookie-decision-badge ${isAllAccepted ? "all-accepted" : "essential-only"}`}
                  >
                    <span className="decision-dot" />
                    <span>
                      {isAllAccepted ? "All Accepted" : "Essential Only"}
                    </span>
                  </span>
                </div>

                <div className="mobile-cookie-prefs">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Allowed Preferences
                  </span>
                  <div className="cookie-prefs-wrap">
                    <span className="cookie-pref-pill essential">
                      Essential
                    </span>
                    {log.preferences?.analytics && (
                      <span className="cookie-pref-pill optional">
                        Analytics
                      </span>
                    )}
                    {log.preferences?.functional && (
                      <span className="cookie-pref-pill optional">
                        Functional
                      </span>
                    )}
                    {log.preferences?.marketing && (
                      <span className="cookie-pref-pill optional">
                        Marketing
                      </span>
                    )}
                  </div>
                </div>

                <div className="mobile-blog-meta-grid">
                  <div className="mobile-meta-item">
                    <span className="mobile-meta-lbl">Anonymized IP</span>
                    <span className="mobile-meta-val font-mono">
                      {log.ipAddress}
                    </span>
                  </div>
                  <div className="mobile-meta-item">
                    <span className="mobile-meta-lbl">Logged At</span>
                    <span className="mobile-meta-val">
                      {formatDate(log.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── FOOTER & PAGINATION ── */}
      <div className="leads-table-footer">
        <div className="footer-count">
          Showing{" "}
          <span className="font-semibold text-slate-800">
            {filteredLogs.length > 0 ? startIndex + 1 : 0}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-slate-800">
            {Math.min(startIndex + pageSize, filteredLogs.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-800">
            {filteredLogs.length}
          </span>{" "}
          audit logs
        </div>

        {totalPages > 1 && (
          <div className="footer-pagination">
            <button
              type="button"
              className="page-btn nav-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              aria-label="Previous page"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`page-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="page-btn nav-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              aria-label="Next page"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
