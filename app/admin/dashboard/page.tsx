"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Users,
  Clock,
  CheckCircle2,
  Cookie,
  Mail,
  Briefcase,
  FileText,
  ShieldCheck,
  Server,
  UserCheck,
  CreditCard,
  Landmark,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Download,
  Plus,
  RefreshCw,
  Search,
  X,
  Send,
} from "lucide-react";

import {
  Lead,
  BlogPostItem,
  CookieLogItem,
  NotificationItem,
  TopServiceItem,
  ActivityItem,
  ChartBar,
  NavSection,
  DashboardStats,
} from "@/components/admin/types";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import WelcomeBanner from "@/components/admin/WelcomeBanner";
import MorningCard from "@/components/admin/MorningCard";
import MetricCard from "@/components/admin/MetricCard";
import LeadsTable from "@/components/admin/LeadsTable";
import LeadsAnalyticsCard from "@/components/admin/LeadsAnalyticsCard";
import TopServicesCard from "@/components/admin/TopServicesCard";
import RecentActivityCard from "@/components/admin/RecentActivityCard";
import AddLeadModal from "@/components/admin/AddLeadModal";
import LeadDetailDrawer from "@/components/admin/LeadDetailDrawer";
import HelpModal from "@/components/admin/HelpModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import BlogArticlesTable from "@/components/admin/BlogArticlesTable";
import CookieConsentsTable from "@/components/admin/CookieConsentsTable";

import "./dashboard.css";

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>([]);
  const [cookieLogs, setCookieLogs] = useState<CookieLogItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  const [topServices, setTopServices] = useState<TopServiceItem[]>([]);
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([]);
  const [chartBars, setChartBars] = useState<ChartBar[]>([]);

  // System Stats
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    newLeads: 0,
    inProgress: 0,
    contacted: 0,
    closed: 0,
    contactLeads: 0,
    serviceLeads: 0,
    totalConsents: 0,
    totalArticles: 0,
    totalBlogViews: 0,
  });

  // DB Health Status
  const [dbStatus, setDbStatus] = useState<"online" | "connecting" | "offline">("online");
  const [dbLatency, setDbLatency] = useState<number | null>(null);

  // UI Navigation & Filters
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeNav, setActiveNav] = useState<NavSection>("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState("Last 30 Days");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>("all");
  const [blogSearchTerm, setBlogSearchTerm] = useState("");
  const [cookieDecisionFilter, setCookieDecisionFilter] = useState<string>("all");
  const [cookieSearchTerm, setCookieSearchTerm] = useState("");
  const [overviewTableView, setOverviewTableView] = useState<"leads" | "cookies">("leads");

  // Dropdowns & Modals
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadDetailModalOpen, setLeadDetailModalOpen] = useState(false);
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const prevLeadsCountRef = useRef<number | null>(null);

  // ── FETCH DATABASE STATUS ──────────────────────────────────────────
  const checkDbHealth = async () => {
    try {
      const res = await fetch("/api/admin/health");
      const data = await res.json();
      if (data.status === "online") {
        setDbStatus("online");
        setDbLatency(data.latencyMs || 25);
      } else {
        setDbStatus("offline");
      }
    } catch {
      setDbStatus("offline");
    }
  };

  // ── FETCH ALL DASHBOARD DATA ───────────────────────────────────────
  const fetchData = async () => {
    setRefreshing(true);
    try {
      await checkDbHealth();

      const [leadsRes, analyticsRes, notifRes, cookieRes, blogRes] = await Promise.allSettled([
        fetch("/api/enquiries?limit=100").then((r) => r.json()),
        fetch("/api/admin/analytics").then((r) => r.json()),
        fetch("/api/admin/notifications").then((r) => r.json()),
        fetch("/api/cookie-consent").then((r) => r.json()),
        fetch("/api/blog/posts?limit=50").then((r) => r.json()),
      ]);

      const leadsData = leadsRes.status === "fulfilled" ? leadsRes.value : null;
      const analyticsData = analyticsRes.status === "fulfilled" ? analyticsRes.value : null;
      const notifData = notifRes.status === "fulfilled" ? notifRes.value : null;
      const cookieData = cookieRes.status === "fulfilled" ? cookieRes.value : null;
      const blogData = blogRes.status === "fulfilled" ? blogRes.value : null;

      if (leadsData && leadsData.success && Array.isArray(leadsData.recent)) {
        const fetchedLeads: Lead[] = leadsData.recent;

        // Toast on new incoming lead
        if (
          prevLeadsCountRef.current !== null &&
          fetchedLeads.length > prevLeadsCountRef.current
        ) {
          const newest = fetchedLeads[0];
          setToastMessage(`New Merchant Enquiry: ${newest.fullName} (${newest.serviceCategory})`);
          setTimeout(() => setToastMessage(null), 5000);
        }
        prevLeadsCountRef.current = fetchedLeads.length;

        setLeads(fetchedLeads);

        const newCount = fetchedLeads.filter((l) => l.status === "new").length;
        const progressCount = fetchedLeads.filter((l) => l.status === "in_progress").length;
        const contactedCount = fetchedLeads.filter((l) => l.status === "contacted").length;
        const closedCount = fetchedLeads.filter((l) => l.status === "closed").length;
        const contactCount = fetchedLeads.filter((l) => l.source === "contact_page").length;
        const serviceCount = fetchedLeads.filter(
          (l) => l.source === "contact_modal" || l.source === "service_page"
        ).length;

        const posts: BlogPostItem[] = blogData?.success ? blogData.posts || [] : [];
        setBlogPosts(posts);

        const consents: CookieLogItem[] = cookieData?.success ? cookieData.recent || [] : [];
        setCookieLogs(consents);

        const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);

        setStats({
          totalLeads: leadsData.total ?? fetchedLeads.length,
          newLeads: newCount,
          inProgress: progressCount,
          contacted: contactedCount,
          closed: closedCount,
          contactLeads: contactCount,
          serviceLeads: serviceCount,
          totalConsents: cookieData?.totalConsentsLogged ?? consents.length,
          totalArticles: posts.length,
          totalBlogViews: totalViews,
          trends: analyticsData?.trends,
        });
      }

      if (analyticsData?.success) {
        setTopServices(analyticsData.topServices || []);
        setRecentActivities(analyticsData.recentActivity || []);
        setChartBars(analyticsData.chartData || []);
      }

      if (notifData?.success) {
        setNotifications(notifData.notifications || []);
        setUnreadNotifCount(notifData.unreadCount || 0);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 25000);
    return () => clearInterval(interval);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setNotifDropdownOpen(false);
        setProfileDropdownOpen(false);
        setLeadDetailModalOpen(false);
        setAddLeadModalOpen(false);
        setDeleteConfirmId(null);
        setHelpModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ── ACTIONS ────────────────────────────────────────────────────────
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l._id === id ? { ...l, status: newStatus as any } : l))
        );
        if (selectedLead && selectedLead._id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
        setToastMessage(`Lead status updated to ${newStatus.replace("_", " ")}`);
        setTimeout(() => setToastMessage(null), 3000);
        fetchData();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleSaveNote = async (notes: string) => {
    if (!selectedLead) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${selectedLead._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedLead((prev) => (prev ? { ...prev, notes } : null));
        setLeads((prev) =>
          prev.map((l) => (l._id === selectedLead._id ? { ...l, notes } : l))
        );
        setToastMessage("Note saved successfully");
        setTimeout(() => setToastMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
        setDeleteConfirmId(null);
        if (selectedLead?._id === id) {
          setLeadDetailModalOpen(false);
          setSelectedLead(null);
        }
        setToastMessage("Lead deleted successfully");
        setTimeout(() => setToastMessage(null), 3000);
        fetchData();
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  const handleCreateLead = async (newLeadForm: any) => {
    setSubmittingLead(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeadForm),
      });
      const data = await res.json();
      if (data.success) {
        setAddLeadModalOpen(false);
        setToastMessage("Lead created and admin notification dispatched.");
        setTimeout(() => setToastMessage(null), 4000);
        fetchData();
      }
    } catch (err) {
      console.error("Failed to create lead:", err);
    } finally {
      setSubmittingLead(false);
    }
  };

  const handleMarkAllNotificationsRead = async () => {
    try {
      await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
      setUnreadNotifCount(0);
    } catch (err) {
      console.error("Failed to mark notifications read:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch {
      window.location.href = "/admin/login";
    }
  };

  // CSV Export for Leads
  const exportLeadsToCSV = (leadsToExport: Lead[], filename = "gatexpay_leads.csv") => {
    if (!leadsToExport || leadsToExport.length === 0) {
      setToastMessage("No records found to export");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    const headers = [
      "ID",
      "Full Name",
      "Company",
      "Phone",
      "Email",
      "Service Requested",
      "Lead Source",
      "Status",
      "Date Created",
    ];
    const rows = leadsToExport.map((l) => [
      `"${l._id}"`,
      `"${(l.fullName || "").replace(/"/g, '""')}"`,
      `"${(l.companyName || "").replace(/"/g, '""')}"`,
      `"${l.countryCode || ""}${l.phone || ""}"`,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${(l.serviceCategory || "").replace(/"/g, '""')}"`,
      `"${l.source || ""}"`,
      `"${l.status || ""}"`,
      `"${new Date(l.createdAt).toLocaleDateString("en-IN")}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMessage(`Exported ${leadsToExport.length} records to ${filename}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // CSV Export for Cookie Consents
  const exportCookieLogsToCSV = () => {
    if (!cookieLogs || cookieLogs.length === 0) return;
    const headers = [
      "Consent ID",
      "Decision",
      "Essential",
      "Analytics",
      "Functional",
      "Marketing",
      "IP Address",
      "Logged At",
    ];
    const rows = cookieLogs.map((c) => [
      `"${c.consentId}"`,
      `"${c.decision}"`,
      c.preferences?.essential ? "Allowed" : "Blocked",
      c.preferences?.analytics ? "Allowed" : "Blocked",
      c.preferences?.functional ? "Allowed" : "Blocked",
      c.preferences?.marketing ? "Allowed" : "Blocked",
      `"${c.ipAddress}"`,
      `"${new Date(c.updatedAt).toISOString()}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dpdp_cookie_consents.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMessage("DPDP Cookie Consents exported successfully");
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ── FILTERED DATA SETS ─────────────────────────────────────────────
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    if (activeNav === "contact_leads") {
      result = result.filter((l) => l.source === "contact_page");
    } else if (activeNav === "service_leads") {
      result = result.filter(
        (l) => l.source === "contact_modal" || l.source === "service_page"
      );
    } else if (activeNav === "payment_solutions") {
      result = result.filter(
        (l) =>
          l.serviceCategory?.toLowerCase().includes("payment") ||
          l.serviceCategory?.toLowerCase().includes("gateway")
      );
    } else if (activeNav === "banking_financial") {
      result = result.filter(
        (l) =>
          l.serviceCategory?.toLowerCase().includes("bank") ||
          l.serviceCategory?.toLowerCase().includes("money transfer") ||
          l.serviceCategory?.toLowerCase().includes("micro atm")
      );
    } else if (activeNav === "retail_commerce") {
      result = result.filter(
        (l) =>
          l.serviceCategory?.toLowerCase().includes("bill") ||
          l.serviceCategory?.toLowerCase().includes("retail") ||
          l.serviceCategory?.toLowerCase().includes("marketing")
      );
    } else if (activeNav === "citizen_identity") {
      result = result.filter(
        (l) =>
          l.serviceCategory?.toLowerCase().includes("aeps") ||
          l.serviceCategory?.toLowerCase().includes("pan") ||
          l.serviceCategory?.toLowerCase().includes("identity")
      );
    } else if (activeNav === "enterprise_tech") {
      result = result.filter(
        (l) =>
          l.serviceCategory?.toLowerCase().includes("enterprise") ||
          l.serviceCategory?.toLowerCase().includes("tech")
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((l) => l.status === statusFilter);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (l) =>
          l.fullName?.toLowerCase().includes(q) ||
          l.companyName?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.phone?.includes(q) ||
          l.serviceCategory?.toLowerCase().includes(q) ||
          l.source?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [leads, activeNav, statusFilter, searchTerm]);

  const filteredBlogPosts = useMemo(() => {
    let result = [...blogPosts];
    if (blogCategoryFilter !== "all") {
      result = result.filter((p) => p.category?.name === blogCategoryFilter);
    }
    if (blogSearchTerm.trim()) {
      const q = blogSearchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.slug?.toLowerCase().includes(q) ||
          p.author?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [blogPosts, blogCategoryFilter, blogSearchTerm]);

  const filteredCookieLogs = useMemo(() => {
    let result = [...cookieLogs];
    if (cookieDecisionFilter !== "all") {
      result = result.filter((c) => c.decision === cookieDecisionFilter);
    }
    if (cookieSearchTerm.trim()) {
      const q = cookieSearchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.consentId?.toLowerCase().includes(q) ||
          c.ipAddress?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [cookieLogs, cookieDecisionFilter, cookieSearchTerm]);

  const handleGlobalSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      if (
        activeNav !== "all_enquiries" &&
        activeNav !== "contact_leads" &&
        activeNav !== "service_leads"
      ) {
        setActiveNav("all_enquiries");
      }
      setCurrentPage(1);
    }
  };

  return (
    <div className="dash-layout">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="dash-toast">
          <span>{toastMessage}</span>
          <button
            type="button"
            className="dash-toast-close"
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss toast"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Fixed Left Sidebar */}
      <AdminSidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        stats={stats}
        onOpenHelpModal={() => setHelpModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Right Main Workspace */}
      <div className="dash-workspace">
        {/* Top Header */}
        <AdminHeader
          onOpenMobileSidebar={() => setSidebarOpen(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearchSubmit={handleGlobalSearchSubmit}
          dbStatus={dbStatus}
          refreshing={refreshing}
          onRefresh={fetchData}
          notifications={notifications}
          unreadNotifCount={unreadNotifCount}
          onMarkNotificationsRead={handleMarkAllNotificationsRead}
          onSelectNotificationLead={() => {
            setActiveNav("all_enquiries");
            setNotifDropdownOpen(false);
          }}
          notifDropdownOpen={notifDropdownOpen}
          setNotifDropdownOpen={setNotifDropdownOpen}
          profileDropdownOpen={profileDropdownOpen}
          setProfileDropdownOpen={setProfileDropdownOpen}
          onOpenSettings={() => setActiveNav("settings")}
          onLogout={handleLogout}
        />

        {/* Workspace Body */}
        <main className="dash-content-body">
          {/* ========================================================= */}
          {/* 1. DASHBOARD OVERVIEW — EXACT MATCH TO REFERENCE SCREEN   */}
          {/* ========================================================= */}
          {activeNav === "overview" && (
            <div className="flex flex-col gap-4">
              {/* Row 1: Morning Date Card + Welcome Banner */}
              <section className="dash-welcome-grid">
                <MorningCard />
                <WelcomeBanner />
              </section>

              {/* Row 2: 4 KPI Cards with Real Dynamic Trends */}
              <section className="dash-kpi-grid">
                <MetricCard
                  icon={<Users size={20} className="text-sky-600" />}
                  iconBgClass="bg-blue"
                  label="Total Merchant Leads"
                  value={stats.totalLeads}
                  trendText={stats.trends?.totalLeads.text || "0%"}
                  trendDirection={stats.trends?.totalLeads.direction || "neutral"}
                  subtrendText={stats.trends?.totalLeads.subtext || "vs last week"}
                  sparklineColor="#0284c7"
                  sparklinePoints={
                    stats.trends?.totalLeads.direction === "up"
                      ? "M2 15L14 11L26 14L38 6L50 8L58 3"
                      : "M2 8L14 10L26 12L38 14L50 15L58 16"
                  }
                  onClick={() => {
                    setActiveNav("all_enquiries");
                    setStatusFilter("all");
                  }}
                />

                <MetricCard
                  icon={<Clock size={20} className="text-amber-600" />}
                  iconBgClass="bg-amber"
                  label="New / Pending"
                  value={stats.newLeads}
                  trendText={stats.trends?.newLeads.text || "0%"}
                  trendDirection={stats.trends?.newLeads.direction || "neutral"}
                  subtrendText={stats.trends?.newLeads.subtext || "vs last week"}
                  sparklineColor="#f59e0b"
                  sparklinePoints={
                    stats.trends?.newLeads.direction === "up"
                      ? "M2 16L14 12L26 8L38 12L50 5L58 4"
                      : "M2 8L14 11L26 9L38 13L50 14L58 16"
                  }
                  onClick={() => {
                    setActiveNav("all_enquiries");
                    setStatusFilter("new");
                  }}
                />

                <MetricCard
                  icon={<CheckCircle2 size={20} className="text-emerald-600" />}
                  iconBgClass="bg-emerald"
                  label="Contacted / Progress"
                  value={stats.inProgress + stats.contacted}
                  trendText={stats.trends?.inProgress.text || "0%"}
                  trendDirection={stats.trends?.inProgress.direction || "neutral"}
                  subtrendText={stats.trends?.inProgress.subtext || "vs last week"}
                  sparklineColor="#10b981"
                  sparklinePoints={
                    stats.trends?.inProgress.direction === "up"
                      ? "M2 15L14 12L26 10L38 7L50 5L58 3"
                      : "M2 6L14 10L26 8L38 14L50 11L58 16"
                  }
                  onClick={() => {
                    setActiveNav("all_enquiries");
                    setStatusFilter("in_progress");
                  }}
                />

                <MetricCard
                  icon={<Cookie size={20} className="text-purple-600" />}
                  iconBgClass="bg-purple"
                  label="Cookie Consents (DPDP)"
                  value={stats.totalConsents}
                  trendText={stats.trends?.consents.text || "0%"}
                  trendDirection={stats.trends?.consents.direction || "neutral"}
                  subtrendText={stats.trends?.consents.subtext || "vs last week"}
                  sparklineColor="#8b5cf6"
                  sparklinePoints={
                    stats.trends?.consents.direction === "up"
                      ? "M2 14L14 11L26 13L38 8L50 5L58 2"
                      : "M2 8L14 9L26 10L38 12L50 14L58 15"
                  }
                  onClick={() => {
                    setActiveNav("overview");
                    setOverviewTableView("cookies");
                  }}
                />
              </section>

              {/* Row 3: Split Grid (~70% Leads Table : ~30% Analytics) */}
              <section className="dash-split-grid">
                <div className="dash-main-col">
                  {/* Table View Switcher */}
                  <div className="table-view-switcher">
                    <button
                      type="button"
                      className={`switcher-tab ${overviewTableView === "leads" ? "active" : ""}`}
                      onClick={() => setOverviewTableView("leads")}
                    >
                      <Users size={14} />
                      <span>Merchant Enquiries &amp; Leads</span>
                      <span className="switcher-count">{stats.totalLeads}</span>
                    </button>
                    <button
                      type="button"
                      className={`switcher-tab ${overviewTableView === "cookies" ? "active" : ""}`}
                      onClick={() => setOverviewTableView("cookies")}
                    >
                      <ShieldCheck size={14} />
                      <span>DPDP Cookie Consents</span>
                      <span className="switcher-count">{stats.totalConsents}</span>
                    </button>
                  </div>

                  {overviewTableView === "leads" ? (
                    <LeadsTable
                      leads={filteredLeads}
                      stats={stats}
                      loading={loading}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      statusFilter={statusFilter}
                      setStatusFilter={setStatusFilter}
                      timeFilter={timeFilter}
                      setTimeFilter={setTimeFilter}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      pageSize={8}
                      onOpenAddModal={() => setAddLeadModalOpen(true)}
                      onSelectLead={(lead) => {
                        setSelectedLead(lead);
                        setLeadDetailModalOpen(true);
                      }}
                      onStatusChange={handleStatusChange}
                      onDeleteLead={(id) => setDeleteConfirmId(id)}
                    />
                  ) : (
                    <CookieConsentsTable
                      logs={cookieLogs}
                      loading={loading}
                      onRefresh={fetchData}
                      onExportCSV={exportCookieLogsToCSV}
                    />
                  )}
                </div>

                <div className="dash-side-col">
                  <LeadsAnalyticsCard chartBars={chartBars} stats={stats} />
                  <TopServicesCard topServices={topServices} />
                  <RecentActivityCard
                    recentActivities={recentActivities}
                    onRefresh={fetchData}
                  />
                </div>
              </section>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. ALL ENQUIRIES / LEADS PANEL                            */}
          {/* ========================================================= */}
          {(activeNav === "all_enquiries" ||
            activeNav === "contact_leads" ||
            activeNav === "service_leads" ||
            activeNav === "payment_solutions" ||
            activeNav === "banking_financial" ||
            activeNav === "retail_commerce" ||
            activeNav === "citizen_identity" ||
            activeNav === "enterprise_tech") && (
            <div className="flex flex-col gap-4">
              <div className="panel-page-header">
                <div className="panel-header-left">
                  <div className="panel-breadcrumbs">
                    <span>Console</span>
                    <ChevronRight size={12} />
                    <span className="active">
                      {activeNav === "contact_leads"
                        ? "Contact Page Leads"
                        : activeNav === "service_leads"
                        ? "Service & Modal Leads"
                        : activeNav === "payment_solutions"
                        ? "Payment Solutions"
                        : activeNav === "banking_financial"
                        ? "Banking & Financial"
                        : activeNav === "retail_commerce"
                        ? "Retail & Commerce"
                        : activeNav === "citizen_identity"
                        ? "Citizen & Identity"
                        : activeNav === "enterprise_tech"
                        ? "Enterprise Tech"
                        : "All Merchant Leads"}
                    </span>
                  </div>
                  <h1 className="panel-main-title">
                    {activeNav === "contact_leads"
                      ? "Contact Page Leads"
                      : activeNav === "service_leads"
                      ? "Service & Modal Leads"
                      : activeNav === "payment_solutions"
                      ? "Payment Solutions Enquiries"
                      : activeNav === "banking_financial"
                      ? "Banking & Financial Enquiries"
                      : activeNav === "retail_commerce"
                      ? "Retail & Commerce Enquiries"
                      : activeNav === "citizen_identity"
                      ? "Citizen & Identity Enquiries"
                      : activeNav === "enterprise_tech"
                      ? "Enterprise Tech Enquiries"
                      : "Merchant Enquiries & Leads"}
                  </h1>
                  <p className="panel-main-subtext">
                    Track and manage incoming merchant enquiries and service requests.
                  </p>
                </div>

                <div className="panel-header-actions">
                  <button
                    type="button"
                    className="panel-action-btn"
                    onClick={() => exportLeadsToCSV(filteredLeads, `${activeNav}_leads.csv`)}
                  >
                    <Download size={14} />
                    <span>Export CSV</span>
                  </button>
                  <button
                    type="button"
                    className="panel-action-btn primary"
                    onClick={() => setAddLeadModalOpen(true)}
                  >
                    <Plus size={15} />
                    <span>Add Lead</span>
                  </button>
                </div>
              </div>

              {/* Submetrics Strip */}
              <div className="panel-submetrics-grid">
                <div className="submetric-box">
                  <div className="submetric-icon-wrap bg-blue">
                    <Users size={18} />
                  </div>
                  <div className="submetric-info">
                    <span className="submetric-val">{filteredLeads.length}</span>
                    <span className="submetric-lbl">Total in View</span>
                  </div>
                </div>

                <div className="submetric-box">
                  <div className="submetric-icon-wrap bg-amber">
                    <Clock size={18} />
                  </div>
                  <div className="submetric-info">
                    <span className="submetric-val">
                      {filteredLeads.filter((l) => l.status === "new").length}
                    </span>
                    <span className="submetric-lbl">New / Pending</span>
                  </div>
                </div>

                <div className="submetric-box">
                  <div className="submetric-icon-wrap bg-emerald">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="submetric-info">
                    <span className="submetric-val">
                      {
                        filteredLeads.filter(
                          (l) => l.status === "in_progress" || l.status === "contacted"
                        ).length
                      }
                    </span>
                    <span className="submetric-lbl">In Progress / Contacted</span>
                  </div>
                </div>
              </div>

              {/* Table Component */}
              <LeadsTable
                leads={filteredLeads}
                stats={stats}
                loading={loading}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                timeFilter={timeFilter}
                setTimeFilter={setTimeFilter}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={10}
                onOpenAddModal={() => setAddLeadModalOpen(true)}
                onSelectLead={(lead) => {
                  setSelectedLead(lead);
                  setLeadDetailModalOpen(true);
                }}
                onStatusChange={handleStatusChange}
                onDeleteLead={(id) => setDeleteConfirmId(id)}
              />
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. BLOG ARTICLES & CMS PANEL                              */}
          {/* ========================================================= */}
          {activeNav === "blog_posts" && (
            <div className="flex flex-col gap-4">
              <div className="panel-page-header">
                <div className="panel-header-left">
                  <div className="panel-breadcrumbs">
                    <span>Console</span>
                    <ChevronRight size={12} />
                    <span className="active">Content &amp; CMS</span>
                  </div>
                  <h1 className="panel-main-title">Published Blog Articles</h1>
                  <p className="panel-main-subtext">
                    Live articles indexed in MongoDB Atlas and rendered across the website.
                  </p>
                </div>

                <div className="panel-header-actions">
                  <Link href="/blog" target="_blank" className="panel-action-btn primary">
                    <ExternalLink size={14} />
                    <span>View Public Blog ↗</span>
                  </Link>
                </div>
              </div>

              <BlogArticlesTable posts={blogPosts} loading={loading} />
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. DPDP COOKIE CONSENTS AUDIT PANEL                       */}
          {/* ========================================================= */}
          {activeNav === "cookie_logs" && (
            <div className="flex flex-col gap-4">
              <div className="panel-page-header">
                <div className="panel-header-left">
                  <div className="panel-breadcrumbs">
                    <span>Console</span>
                    <ChevronRight size={12} />
                    <span className="active">Compliance &amp; Audit</span>
                  </div>
                  <h1 className="panel-main-title">DPDP Act 2023 Cookie Consent Logs</h1>
                  <p className="panel-main-subtext">
                    Audited user privacy consent records stored in MongoDB Atlas with anonymized IP tracking.
                  </p>
                </div>
              </div>

              <CookieConsentsTable
                logs={cookieLogs}
                loading={loading}
                onRefresh={fetchData}
                onExportCSV={exportCookieLogsToCSV}
              />
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. SETTINGS PANEL                                         */}
          {/* ========================================================= */}
          {activeNav === "settings" && (
            <div className="flex flex-col gap-4">
              <div className="panel-page-header">
                <div className="panel-header-left">
                  <div className="panel-breadcrumbs">
                    <span>Console</span>
                    <ChevronRight size={12} />
                    <span className="active">Settings</span>
                  </div>
                  <h1 className="panel-main-title">Console Settings &amp; Integrations</h1>
                  <p className="panel-main-subtext">
                    Manage email dispatchers, database connection, notification preferences, and admin credentials.
                  </p>
                </div>

                <div className="panel-header-actions">
                  <button
                    type="button"
                    className="panel-action-btn primary"
                    onClick={checkDbHealth}
                  >
                    <RefreshCw size={14} />
                    <span>Test Connections</span>
                  </button>
                </div>
              </div>

              <div className="settings-panel-grid">
                {/* Email Service */}
                <div className="settings-card">
                  <div className="settings-card-header">
                    <div className="settings-card-icon bg-blue-50 text-sky-600">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h3 className="settings-card-title">Transactional Email Provider</h3>
                      <p className="settings-card-subtitle">
                        Automated notifications dispatched to admin upon merchant enquiry.
                      </p>
                    </div>
                  </div>
                  <div className="settings-card-body">
                    <div className="settings-field-group">
                      <label className="settings-field-label">Admin Notification Recipient</label>
                      <input
                        type="text"
                        readOnly
                        className="modal-text-input bg-slate-50"
                        value="admin@gatexpay.com"
                      />
                      <span className="settings-meta-text">Configured via .env.local ADMIN_EMAIL</span>
                    </div>

                    <div className="settings-field-group">
                      <label className="settings-field-label">Email Dispatch Engine</label>
                      <div className="flex items-center gap-2">
                        <span className="provider-tag active">Resend API (Transactional)</span>
                        <span className="provider-tag">Console Fallback Logger</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        className="test-email-btn"
                        onClick={async () => {
                          try {
                            const res = await fetch("/api/admin/test-email", { method: "POST" });
                            const d = await res.json();
                            if (d.success) {
                              setToastMessage(`Test email sent to ${d.targetEmail} (${d.configuredProvider})`);
                              setTimeout(() => setToastMessage(null), 4000);
                            }
                          } catch {
                            setToastMessage("Failed to trigger test email");
                            setTimeout(() => setToastMessage(null), 3000);
                          }
                        }}
                      >
                        <Send size={14} /> Send Test Admin Lead Email
                      </button>
                    </div>
                  </div>
                </div>

                {/* MongoDB Atlas Health */}
                <div className="settings-card">
                  <div className="settings-card-header">
                    <div className="settings-card-icon bg-emerald-50 text-emerald-600">
                      <Server size={18} />
                    </div>
                    <div>
                      <h3 className="settings-card-title">MongoDB Atlas Cluster</h3>
                      <p className="settings-card-subtitle">
                        Primary production document database for leads, CMS, and privacy logs.
                      </p>
                    </div>
                  </div>
                  <div className="settings-card-body">
                    <div className="settings-status-box">
                      <div className="settings-status-left">
                        <span className={`settings-pulse-dot ${dbStatus === "offline" ? "offline" : ""}`} />
                        <span>MongoDB Atlas: {dbStatus.toUpperCase()}</span>
                      </div>
                      <span className="settings-latency-badge">{dbLatency || 25} ms latency</span>
                    </div>

                    <div className="settings-field-group">
                      <label className="settings-field-label">Managed Collections</label>
                      <div className="flex flex-wrap gap-2">
                        <span className="dash-source-tag">enquiries ({stats.totalLeads})</span>
                        <span className="dash-source-tag">blogposts ({stats.totalArticles})</span>
                        <span className="dash-source-tag">cookieconsents ({stats.totalConsents})</span>
                        <span className="dash-source-tag">users (Admin)</span>
                      </div>
                    </div>

                    <div className="settings-field-group">
                      <label className="settings-field-label">Encryption &amp; Security</label>
                      <span className="settings-meta-text">
                        TLS/SSL In-Transit Encryption &amp; AES-256 At-Rest Storage.
                      </span>
                    </div>
                  </div>
                </div>

                {/* DPDP Privacy Policy */}
                <div className="settings-card">
                  <div className="settings-card-header">
                    <div className="settings-card-icon bg-purple-50 text-purple-600">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h3 className="settings-card-title">DPDP Act 2023 Privacy Engine</h3>
                      <p className="settings-card-subtitle">
                        Indian statutory data compliance policies and audit retention.
                      </p>
                    </div>
                  </div>
                  <div className="settings-card-body">
                    <div className="settings-field-group">
                      <label className="settings-field-label">Consent Log Retention</label>
                      <span className="settings-field-value font-semibold">365 Days (Statutory)</span>
                      <span className="settings-meta-text">Immutable audit trail with anonymized IP tracking.</span>
                    </div>

                    <div className="settings-field-group">
                      <label className="settings-field-label">IP Address Anonymization</label>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        <span className="settings-field-value font-mono text-xs">
                          SHA-256 Client-Subnet Masking Enabled
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Super Admin Session */}
                <div className="settings-card">
                  <div className="settings-card-header">
                    <div className="settings-card-icon bg-amber-50 text-amber-600">
                      <UserCheck size={18} />
                    </div>
                    <div>
                      <h3 className="settings-card-title">Super Admin Session &amp; Security</h3>
                      <p className="settings-card-subtitle">
                        Active authentication token and security parameters.
                      </p>
                    </div>
                  </div>
                  <div className="settings-card-body">
                    <div className="settings-field-group">
                      <label className="settings-field-label">Signed in as</label>
                      <span className="settings-field-value font-semibold">Super Admin (admin@gatexpay.com)</span>
                    </div>

                    <div className="settings-field-group">
                      <label className="settings-field-label">Session Token Type</label>
                      <span className="settings-meta-text">
                        HTTP-Only JWT Cookie (SameSite=Strict, Secure). Valid for 7 days.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <AddLeadModal
        isOpen={addLeadModalOpen}
        onClose={() => setAddLeadModalOpen(false)}
        onSubmit={handleCreateLead}
        submitting={submittingLead}
      />

      <LeadDetailDrawer
        lead={selectedLead}
        isOpen={leadDetailModalOpen}
        onClose={() => setLeadDetailModalOpen(false)}
        onStatusChange={handleStatusChange}
        onSaveNote={handleSaveNote}
      />

      <DeleteConfirmModal
        id={deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDeleteLead}
      />

      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />
    </div>
  );
}
