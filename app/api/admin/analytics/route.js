import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Enquiry } from "@/models/enquiry.model";
import { CookieConsent } from "@/models/cookie-consent.model";
export async function GET() {
  try {
    await connectDB();
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    // 1. Fetch real counts & weekly delta comparisons
    const [
      totalLeads,
      newLeads,
      inProgress,
      contacted,
      closed,
      totalConsents,
      leadsThisWeek,
      leadsLastWeek,
      newThisWeek,
      newLastWeek,
      progressThisWeek,
      progressLastWeek,
      consentsThisWeek,
      consentsLastWeek,
      enquiries,
      consents,
    ] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "new" }),
      Enquiry.countDocuments({ status: "in_progress" }),
      Enquiry.countDocuments({ status: "contacted" }),
      Enquiry.countDocuments({ status: "closed" }),
      CookieConsent.countDocuments(),
      Enquiry.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Enquiry.countDocuments({
        createdAt: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo },
      }),
      Enquiry.countDocuments({
        status: "new",
        createdAt: { $gte: sevenDaysAgo },
      }),
      Enquiry.countDocuments({
        status: "new",
        createdAt: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo },
      }),
      Enquiry.countDocuments({
        status: { $in: ["in_progress", "contacted"] },
        updatedAt: { $gte: sevenDaysAgo },
      }),
      Enquiry.countDocuments({
        status: { $in: ["in_progress", "contacted"] },
        updatedAt: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo },
      }),
      CookieConsent.countDocuments({ updatedAt: { $gte: sevenDaysAgo } }),
      CookieConsent.countDocuments({
        updatedAt: { $gte: fourteenDaysAgo, $lt: sevenDaysAgo },
      }),
      Enquiry.find().sort({ createdAt: -1 }).limit(100),
      CookieConsent.find().sort({ updatedAt: -1 }).limit(20),
    ]);
    // Helper to calculate real percentage trend
    function calculateTrend(current, prior) {
      if (prior === 0) {
        if (current > 0) {
          return { text: `+${current}`, direction: "up", subtext: "this week" };
        }
        return { text: "0%", direction: "neutral", subtext: "vs last week" };
      }
      const pct = Math.round(((current - prior) / prior) * 100);
      if (pct > 0) {
        return { text: `${pct}%`, direction: "up", subtext: "vs last week" };
      } else if (pct < 0) {
        return {
          text: `${Math.abs(pct)}%`,
          direction: "down",
          subtext: "vs last week",
        };
      }
      return { text: "0%", direction: "neutral", subtext: "vs last week" };
    }
    const trends = {
      totalLeads: calculateTrend(leadsThisWeek, leadsLastWeek),
      newLeads: calculateTrend(newThisWeek, newLastWeek),
      inProgress: calculateTrend(progressThisWeek, progressLastWeek),
      consents: calculateTrend(consentsThisWeek, consentsLastWeek),
    };
    // 2. Real Service frequency breakdown (No mock / dummy services)
    const serviceCounts = {};
    enquiries.forEach((e) => {
      if (e.serviceCategory) {
        serviceCounts[e.serviceCategory] =
          (serviceCounts[e.serviceCategory] || 0) + 1;
      }
    });
    const activeServicesList = Object.entries(serviceCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / Math.max(totalLeads, 1)) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    const maxCount = Math.max(...activeServicesList.map((s) => s.count), 1);
    const topServices = activeServicesList.map((s) => ({
      name: s.name,
      count: s.count,
      progress: Math.min(Math.round((s.count / maxCount) * 100), 100),
      trend: `${s.percentage}% of leads`,
    }));
    // 3. Dynamic 30-Day Activity Chart Breakdown (grouped into 6 chronological buckets)
    const bucketIntervalDays = 5;
    const chartData = [];
    for (let i = 5; i >= 0; i--) {
      const bucketEnd = new Date(
        now.getTime() - i * bucketIntervalDays * 24 * 60 * 60 * 1000
      );
      const bucketStart = new Date(
        bucketEnd.getTime() - bucketIntervalDays * 24 * 60 * 60 * 1000
      );
      const label = bucketEnd.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });
      chartData.push({
        label,
        count: 0,
        dateRange: { start: bucketStart, end: bucketEnd },
      });
    }
    // Populate chart counts with real enquiries
    enquiries.forEach((lead) => {
      const leadTime = new Date(lead.createdAt).getTime();
      for (const bucket of chartData) {
        if (
          leadTime >= bucket.dateRange.start.getTime() &&
          leadTime <= bucket.dateRange.end.getTime()
        ) {
          bucket.count++;
          break;
        }
      }
    });
    // 4. Real Recent Activity Feed
    const activities = [];
    function timeAgo(date) {
      const seconds = Math.floor(
        (Date.now() - new Date(date).getTime()) / 1000
      );
      if (seconds < 60) return "Just now";
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes}m ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    }
    enquiries.slice(0, 5).forEach((lead) => {
      activities.push({
        id: `lead_${lead._id}`,
        text: `New lead from ${lead.fullName}`,
        timeAgo: timeAgo(lead.createdAt),
        color: "#0284c7", // blue
        timestamp: lead.createdAt,
      });
      if (lead.status !== "new") {
        activities.push({
          id: `status_${lead._id}`,
          text: `Lead status updated to ${lead.status.replace("_", " ")}`,
          timeAgo: timeAgo(lead.updatedAt),
          color: "#eab308", // amber
          timestamp: lead.updatedAt,
        });
      }
    });
    consents.slice(0, 3).forEach((c) => {
      activities.push({
        id: `cookie_${c._id}`,
        text: `Cookie consent recorded (${c.decision.replace("_", " ")})`,
        timeAgo: timeAgo(c.updatedAt),
        color: "#10b981", // green
        timestamp: c.updatedAt,
      });
    });
    // Sort strictly by timestamp descending
    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    return NextResponse.json({
      success: true,
      stats: {
        totalLeads,
        newLeads,
        inProgress,
        contacted,
        closed,
        totalConsents,
      },
      trends,
      chartData: chartData.map((b) => ({ label: b.label, count: b.count })),
      topServices,
      recentActivity: activities.slice(0, 6).map((a) => ({
        id: a.id,
        text: a.text,
        timeAgo: a.timeAgo,
        color: a.color,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate analytics",
        details: error instanceof Error ? error.message : "Error",
      },
      { status: 500 }
    );
  }
}
