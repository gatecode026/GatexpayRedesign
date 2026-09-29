import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog-posts";
import BlogDetail from "@/components/sections/BlogDetail/BlogDetail";
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
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
      authors: ["Vansh Chaudhary"],
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
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `https://gatexpay.com${post.image}`,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: "Vansh Chaudhary",
      jobTitle: "Chief Compliance Officer",
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
