import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/blog/post.model";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/auth";

const CreatePostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().optional().default(""),
  content: z.string().optional().default(""),
  coverImage: z.string().optional().default(""),
  category: z.string(),
  tags: z.array(z.string()).optional().default([]),
  readTime: z.number().optional().default(5),
  isFeatured: z.boolean().optional().default(false),
  status: z.enum(["draft", "published", "archived"]).default("published"),
});

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? await verifyAdminToken(token) : null;
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const posts = await BlogPost.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate("category", "name slug");

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? await verifyAdminToken(token) : null;
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = CreatePostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Validation error", details: parsed.error.issues }, { status: 400 });
    }

    await connectDB();
    const newPost = await BlogPost.create({
      ...parsed.data,
      author: session.name,
      publishedAt: parsed.data.status === "published" ? new Date() : undefined,
    });

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 });
  }
}
