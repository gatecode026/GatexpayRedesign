import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog-posts";
import BlogDetail from "@/components/sections/BlogDetail/BlogDetail";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/blog/post.model";
import "@/models/blog/category.model";

export const dynamicParams = true;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

async function getPostBySlug(slug) {
  // 1. Check in static curated posts first
  const staticPost = BLOG_POSTS.find((p) => p.slug === slug);
  if (staticPost) return staticPost;

  // 2. Fallback to MongoDB
  try {
    await connectDB();
    const dbPost = await BlogPost.findOne({ slug, isDeleted: false })
      .populate("category", "name slug")
      .lean();

    if (dbPost) {
      let contentArr = [];
      if (Array.isArray(dbPost.content)) {
        contentArr = dbPost.content;
      } else if (typeof dbPost.content === "string") {
        contentArr = dbPost.content
          .split("\n\n")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      if (contentArr.length === 0) {
        contentArr = [dbPost.excerpt || dbPost.title];
      }

      return {
        id: dbPost._id.toString(),
        slug: dbPost.slug,
        title: dbPost.title,
        description: dbPost.excerpt || dbPost.title,
        content: contentArr,
        image: dbPost.coverImage || "/assets/images/card-it-software.jpg",
        category: dbPost.category?.name || "CSP Services",
        publishedAt: dbPost.publishedAt
          ? new Date(dbPost.publishedAt).toISOString().split("T")[0]
          : "2026-09-12",
        readTime: dbPost.readTime || 4,
        featured: Boolean(dbPost.isFeatured),
      };
    }
  } catch (err) {
    console.error("DB blog lookup error:", err);
  }

  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const url = `https://gatexpay.com/blog/${post.slug}`;
  return {
    title: `${post.title} | GateXPay Insights`,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "GateXPay",
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["GateXPay Editorial Team"],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image.startsWith("http")
      ? post.image
      : `https://gatexpay.com${post.image}`,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: "GateXPay Editorial Team",
      jobTitle: "FinTech Compliance & Tech Desk",
      worksFor: {
        "@type": "Organization",
        name: "GateXPay",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "GateXPay",
      logo: {
        "@type": "ImageObject",
        url: "https://gatexpay.com/assets/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gatexpay.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetail post={post} />
    </>
  );
}
