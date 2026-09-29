import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/auth";
import { uploadToImageKit } from "@/lib/imagekit";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? await verifyAdminToken(token) : null;
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "blog";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");

    const uploaded = await uploadToImageKit(buffer, `${Date.now()}_${sanitizedFileName}`, folder);

    return NextResponse.json({
      success: true,
      url: uploaded.url,
      fileId: uploaded.fileId,
      name: uploaded.name,
    });
  } catch (error) {
    console.error("[Upload API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to upload image",
        details: error instanceof Error ? error.message : "Error",
      },
      { status: 500 }
    );
  }
}
