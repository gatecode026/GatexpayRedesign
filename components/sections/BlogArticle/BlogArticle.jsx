import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CATEGORY_BADGE, formatBlogDate, GRID_POSTS } from "@/data/blog-posts";
import "./BlogArticle.css";
export default function BlogArticle({ post }) {
  const badge = CATEGORY_BADGE[post.category];
  const related = GRID_POSTS.filter(
    (p) => p.category === post.category && p.id !== post.id
  ).slice(0, 3);
  return (
    <article className="blog-article">
      <div className="blog-article-hero">
        <div className="blog-container">
          <Link href="/blog" className="blog-article-back">
            <ArrowLeft size={16} aria-hidden="true" /> Back to Insights
          </Link>
          <span
            className="blog-badge"
            style={{ background: badge.bg, color: badge.text }}
          >
            {post.category}
          </span>
          <h1 className="blog-article-title">{post.title}</h1>
          <p className="blog-article-meta">
            {formatBlogDate(post.publishedAt)} · {post.readTime} min read
          </p>
        </div>
      </div>

      <div className="blog-container blog-article-body-wrap">
        <div className="blog-article-img-wrap">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            className="blog-article-img"
            priority
          />
        </div>
        <div className="blog-article-content">
          <p className="blog-article-lede">{post.description}</p>
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {related.length > 0 && (
          <div className="blog-article-related">
            <h2 className="blog-article-related-heading">
              More in {post.category}
            </h2>
            <div className="blog-article-related-grid">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="blog-article-related-card"
                >
                  <div className="blog-article-related-img-wrap">
                    <Image src={r.image} alt={r.title} fill sizes="300px" />
                  </div>
                  <p className="blog-article-related-title">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
