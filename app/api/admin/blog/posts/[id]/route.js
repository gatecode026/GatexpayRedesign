import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/blog/post.model";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/auth";
export async function PATCH(req, { params }) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? await verifyAdminToken(token) : null;
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const { id } = await params;
    const body = await req.json();
    await connectDB();
    const updated = await BlogPost.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, post: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Update failed" },
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? await verifyAdminToken(token) : null;
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const { id } = await params;
    await connectDB();
    await BlogPost.findByIdAndUpdate(id, { $set: { isDeleted: true } });
    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Delete failed" },
      { status: 500 }
    );
  }
}
