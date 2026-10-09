import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/blog/post.model";
import "@/models/blog/category.model";
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("q");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 50);
    const query = {
      status: "published",
      isDeleted: false,
    };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }
    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .populate("category", "name slug")
      .lean();
    return NextResponse.json({
      success: true,
      total: posts.length,
      posts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blog posts",
        details: error instanceof Error ? error.message : "Error",
      },
      { status: 500 }
    );
  }
}
