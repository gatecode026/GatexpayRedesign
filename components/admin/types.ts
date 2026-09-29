export interface Lead {
  _id: string;
  fullName: string;
  email?: string;
  phone: string;
  countryCode?: string;
  companyName?: string;
  serviceCategory: string;
  timeline?: string;
  message?: string;
  notes?: string;
  source: string;
  status: "new" | "in_progress" | "contacted" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostItem {
  _id: string;
  title: string;
  slug: string;
  author: string;
  category?: { name: string; slug: string };
  views: number;
  status: string;
  readTime?: number;
  publishedAt?: string;
  excerpt?: string;
  createdAt: string;
}

export interface CookieLogItem {
  _id: string;
  consentId: string;
  decision: string;
  preferences: {
    essential: boolean;
    analytics: boolean;
    functional: boolean;
    marketing: boolean;
  };
  ipAddress: string;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  unread: boolean;
  type: "lead" | "cookie";
}

export interface TopServiceItem {
  name: string;
  count: number;
  progress: number;
  trend: string;
}

export interface ActivityItem {
  id: string;
  text: string;
  timeAgo: string;
  color: string;
}

export interface ChartBar {
  label: string;
  count: number;
}

export type NavSection =
  | "overview"
  | "all_enquiries"
  | "contact_leads"
  | "service_leads"
  | "payment_solutions"
  | "banking_financial"
  | "retail_commerce"
  | "citizen_identity"
  | "enterprise_tech"
  | "blog_posts"
  | "cookie_logs"
  | "settings";

export interface KpiTrend {
  text: string;
  direction: "up" | "down" | "neutral";
  subtext: string;
}

export interface KpiTrendsData {
  totalLeads: KpiTrend;
  newLeads: KpiTrend;
  inProgress: KpiTrend;
  consents: KpiTrend;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  inProgress: number;
  contacted: number;
  closed: number;
  contactLeads: number;
  serviceLeads: number;
  totalConsents: number;
  totalArticles: number;
  totalBlogViews: number;
  trends?: KpiTrendsData;
}
