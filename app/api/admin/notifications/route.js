import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Enquiry } from "@/models/enquiry.model";
import { CookieConsent } from "@/models/cookie-consent.model";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/auth";
export async function GET(req) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? await verifyAdminToken(token) : null;
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    await connectDB();
    // Query latest 10 enquiries as notifications
    const recentLeads = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("fullName serviceCategory status createdAt")
      .lean();
    const recentConsents = await CookieConsent.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("ipSnippet analytics marketing updatedAt")
      .lean();
    const notifications = [];
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
    recentLeads.forEach((lead) => {
      notifications.push({
        id: `notif_${lead._id}`,
        title: "New Merchant Enquiry",
        message: `${lead.fullName} requested ${lead.serviceCategory}`,
        timeAgo: timeAgo(lead.createdAt),
        unread: lead.status === "new",
        type: "lead",
        createdAt: lead.createdAt,
      });
    });
    recentConsents.forEach((c) => {
      notifications.push({
        id: `notif_cookie_${c._id}`,
        title: "Cookie Consent Logged",
        message: `Consent ID ${c.consentId} (${c.decision})`,
        timeAgo: timeAgo(c.updatedAt),
        unread: false,
        type: "cookie",
        createdAt: c.updatedAt,
      });
    });
    notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const unreadCount = notifications.filter((n) => n.unread).length;
    return NextResponse.json({
      success: true,
      unreadCount,
      notifications: notifications.slice(0, 10),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch notifications",
        details: error instanceof Error ? error.message : "Error",
      },
      { status: 500 }
    );
  }
}
export async function PATCH(req) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? await verifyAdminToken(token) : null;
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    await connectDB();
    const body = await req.json().catch(() => ({}));
    // If marking all as read, set all "new" leads to "in_progress" or mark notification
    if (body.all) {
      await Enquiry.updateMany(
        { status: "new" },
        { $set: { status: "in_progress" } }
      );
    } else if (body.id) {
      const cleanId = body.id.replace("notif_", "");
      await Enquiry.findByIdAndUpdate(cleanId, {
        $set: { status: "in_progress" },
      });
    }
    return NextResponse.json({
      success: true,
      message: "Notifications marked as read",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update notification state",
        details: error instanceof Error ? error.message : "Error",
      },
      { status: 500 }
    );
  }
}
