import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/blog/post.model";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/auth";
import mongoose from "mongoose";
import { BlogCategory } from "@/models/blog/category.model";

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

    const updateFields = { ...body };

    // Resolve Category ID if passed as string name
    if (updateFields.category && !mongoose.Types.ObjectId.isValid(updateFields.category)) {
      const catName = updateFields.category.trim();
      const catSlug =
        catName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || "general";

      let catDoc = await BlogCategory.findOne({
        $or: [{ name: catName }, { slug: catSlug }],
      });
      if (!catDoc) {
        catDoc = await BlogCategory.create({
          name: catName,
          slug: catSlug,
          description: `${catName} insights and updates`,
        });
      }
      updateFields.category = catDoc._id;
    }

    const updated = await BlogPost.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    )
      .populate("category", "name slug")
      .lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, post: updated });
  } catch (error) {
    console.error("Failed to update blog post:", error);
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
