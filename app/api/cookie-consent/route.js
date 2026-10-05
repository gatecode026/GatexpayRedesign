import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { CookieConsent } from "@/models/cookie-consent.model";
import { authenticateAdminRequest } from "@/lib/auth";
const ConsentSchema = z.object({
  consentId: z.string().min(1),
  decision: z.enum(["all", "essential_only", "custom"]),
  preferences: z.object({
    essential: z.boolean().default(true),
    analytics: z.boolean().default(false),
    functional: z.boolean().default(false),
    marketing: z.boolean().default(false),
  }),
  url: z.string().optional().default("/"),
});
function anonymizeIp(ip) {
  if (!ip) return "unknown";
  // Handle IPv4
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }
  }
  // Handle IPv6
  if (ip.includes(":")) {
    const parts = ip.split(":");
    return parts.slice(0, 3).join(":") + "::";
  }
  return "anonymized";
}
export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = ConsentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload",
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
    const anonymizedIp = anonymizeIp(rawIp);
    const userAgent = req.headers.get("user-agent") || "unknown";
    const consentRecord = await CookieConsent.findOneAndUpdate(
      { consentId: parsed.data.consentId },
      {
        $set: {
          decision: parsed.data.decision,
          preferences: parsed.data.preferences,
          ipAddress: anonymizedIp,
          userAgent: userAgent.slice(0, 255),
          url: parsed.data.url,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return NextResponse.json({
      success: true,
      message: "Cookie consent recorded successfully",
      consentId: consentRecord.consentId,
      timestamp: consentRecord.updatedAt,
    });
  } catch (error) {
    console.error("[Cookie Consent API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to record cookie consent",
        details:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  try {
    const auth = await authenticateAdminRequest(req, ["superadmin", "admin"]);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status }
      );
    }

    await connectDB();
    const count = await CookieConsent.countDocuments();
    const recent = await CookieConsent.find()
      .sort({ updatedAt: -1 })
      .limit(25)
      .select("-__v")
      .lean();
    return NextResponse.json({
      success: true,
      status: "active",
      totalConsentsLogged: count,
      recent,
    });
  } catch (error) {
    console.error("[Cookie Consent GET Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve consent records",
      },
      { status: 500 }
    );
  }
}
