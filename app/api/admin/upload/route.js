import { NextResponse } from "next/server";
import { authenticateAdminRequest } from "@/lib/auth";
import { uploadToImageKit } from "@/lib/imagekit";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB max
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);
const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif"]);

export async function POST(req) {
  try {
    const auth = await authenticateAdminRequest(req, ["superadmin", "admin", "editor"]);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const rawFolder = formData.get("folder");
    const folder = typeof rawFolder === "string" && /^[a-zA-Z0-9_-]{1,30}$/.test(rawFolder)
      ? rawFolder
      : "blog";

    if (!file || typeof file === "string" || !file.name) {
      return NextResponse.json(
        { success: false, error: "A valid image file is required." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File exceeds maximum permitted size of 5 MB." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Only JPEG, PNG, WebP, GIF, and AVIF are allowed.",
        },
        { status: 400 }
      );
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension || !ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json(
        { success: false, error: "Invalid file extension." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const sanitizedFileName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .slice(0, 80);

    const uploaded = await uploadToImageKit(
      buffer,
      `${Date.now()}_${sanitizedFileName}`,
      folder
    );

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
        error: "Failed to upload image. Please try again.",
      },
      { status: 500 }
    );
  }
}
