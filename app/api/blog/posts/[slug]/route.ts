import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/blog/post.model";
import "@/models/blog/category.model";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();

    const post = await BlogPost.findOneAndUpdate(
      { slug: slug.toLowerCase(), status: "published", isDeleted: false },
      { $inc: { views: 1 } },
      { new: true }
    ).populate("category", "name slug");

    if (!post) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
