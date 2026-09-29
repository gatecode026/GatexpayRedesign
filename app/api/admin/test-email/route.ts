import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/auth";
import { testAdminEmailService } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? await verifyAdminToken(token) : null;
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const targetEmail = body.email || process.env.ADMIN_EMAIL || "admin@gatexpay.com";

    const result = await testAdminEmailService(targetEmail);

    return NextResponse.json({
      success: true,
      result,
      targetEmail,
      configuredProvider: process.env.RESEND_API_KEY ? "Resend API" : "Console Dry-Run Log",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to dispatch test email",
        details: error instanceof Error ? error.message : "Error",
      },
      { status: 500 }
    );
  }
}
