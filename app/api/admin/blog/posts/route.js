import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/blog/post.model";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/auth";
import mongoose from "mongoose";
import { BlogCategory } from "@/models/blog/category.model";

const CreatePostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().optional().default(""),
  content: z.string().optional().default(""),
  coverImage: z.string().optional().default(""),
  category: z.string(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  readTime: z.number().optional().default(5),
  isFeatured: z.boolean().optional().default(false),
  status: z.enum(["draft", "published", "archived"]).default("published"),
});

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
    const posts = await BlogPost.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate("category", "name slug")
      .lean();
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? await verifyAdminToken(token) : null;
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const body = await req.json();
    const parsed = CreatePostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: parsed.error.issues,
        },
        { status: 400 }
      );
    }
    await connectDB();

    // Resolve Category ID
    let categoryId = parsed.data.category;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      const catName = parsed.data.category.trim();
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
      categoryId = catDoc._id;
    }

    const newPost = await BlogPost.create({
      ...parsed.data,
      category: categoryId,
      author: parsed.data.author || session.name || "GateXPay Editorial Team",
      publishedAt: parsed.data.status === "published" ? new Date() : undefined,
    });

    const populated = await BlogPost.findById(newPost._id)
      .populate("category", "name slug")
      .lean();

    return NextResponse.json({ success: true, post: populated }, { status: 201 });
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create post",
      },
      { status: 500 }
    );
  }
}
