import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Enquiry } from "@/models/enquiry.model";
import { sendAdminLeadNotification } from "@/lib/email";
const EnquiryInputSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number is too long"),
  countryCode: z.string().optional().default("+91"),
  companyName: z.string().max(120).optional().default(""),
  serviceCategory: z
    .string()
    .trim()
    .min(1, "Please select a service category"),
  timeline: z.string().optional().default("Immediately"),
  message: z.string().max(2000).optional().default(""),
  source: z
    .enum(["contact_page", "contact_modal", "service_page", "chatbot", "other"])
    .default("other"),
  notes: z.string().max(2000).optional().default(""),
  honeypot: z.string().optional().default(""), // Anti-spam bot trap
});
function anonymizeIp(ip) {
  if (!ip) return "unknown";
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  }
  if (ip.includes(":")) {
    const parts = ip.split(":");
    return parts.slice(0, 3).join(":") + "::";
  }
  return "anonymized";
}
export async function POST(req) {
  try {
    const body = await req.json();
    // Honeypot check: spambots usually fill hidden fields
    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json({
        success: true,
        message: "Enquiry submitted successfully",
      });
    }
    const parsed = EnquiryInputSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues?.[0];
      const errorMessage = firstIssue ? firstIssue.message : "Validation failed";
      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          details: parsed.error.issues,
        },
        { status: 400 }
      );
    }
    await connectDB();
    const rawIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";
    const newEnquiry = await Enquiry.create({
      fullName: parsed.data.fullName,
      email: parsed.data.email || "",
      phone: parsed.data.phone,
      mobile: parsed.data.phone,
      countryCode: parsed.data.countryCode,
      companyName: parsed.data.companyName,
      serviceCategory: parsed.data.serviceCategory,
      serviceInterest: parsed.data.serviceCategory,
      timeline: parsed.data.timeline,
      message: parsed.data.message,
      source: parsed.data.source,
      notes: parsed.data.notes || "",
      status: "new",
      ipAddress: anonymizeIp(rawIp),
      userAgent: userAgent.slice(0, 255),
    });
    // Asynchronously dispatch admin email notification without blocking client response
    sendAdminLeadNotification({
      _id: newEnquiry._id,
      fullName: newEnquiry.fullName,
      companyName: newEnquiry.companyName,
      email: newEnquiry.email,
      phone: newEnquiry.phone,
      countryCode: newEnquiry.countryCode,
      serviceCategory: newEnquiry.serviceCategory,
      timeline: newEnquiry.timeline,
      message: newEnquiry.message,
      source: newEnquiry.source,
      createdAt: newEnquiry.createdAt,
    }).catch((emailErr) => {
      console.error(
        "[Email Notification Trigger Error - Non-fatal]:",
        emailErr
      );
    });
    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for reaching out. Our team will contact you shortly.",
        enquiryId: newEnquiry._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Enquiry API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to record enquiry",
        details: error instanceof Error ? error.message : "Internal error",
      },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const limit = Math.min(
      parseInt(searchParams.get("limit") || "50", 10),
      100
    );
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "";
    const source = searchParams.get("source")?.trim() || "";
    const query = {};
    if (status && status !== "all") {
      query.status = status;
    }
    if (source && source !== "all") {
      query.source = source;
    }
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { fullName: regex },
        { companyName: regex },
        { email: regex },
        { phone: regex },
        { serviceCategory: regex },
        { source: regex },
      ];
    }
    const totalMatching = await Enquiry.countDocuments(query);
    const skip = (page - 1) * limit;
    const recent = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-userAgent -ipAddress");
    // Compute global stats
    const total = await Enquiry.countDocuments();
    const newCount = await Enquiry.countDocuments({ status: "new" });
    const inProgressCount = await Enquiry.countDocuments({
      status: "in_progress",
    });
    const contactedCount = await Enquiry.countDocuments({
      status: "contacted",
    });
    const closedCount = await Enquiry.countDocuments({ status: "closed" });
    return NextResponse.json({
      success: true,
      total,
      totalMatching,
      page,
      limit,
      totalPages: Math.ceil(totalMatching / limit) || 1,
      stats: {
        total,
        newLeads: newCount,
        inProgress: inProgressCount,
        contacted: contactedCount,
        closed: closedCount,
      },
      recent,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Database query error",
        details: error instanceof Error ? error.message : "Internal error",
      },
      { status: 500 }
    );
  }
}
