import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORY_BADGE, formatBlogDate } from "@/data/blog-posts";
export default function RelatedInsights({ posts }) {
  if (!posts || posts.length === 0) return null;
  return (
    <section className="related-insights-section" aria-label="Related Insights">
      <div className="related-insights-container">
        <div className="related-insights-header">
          <h2 className="related-insights-title">Related Insights</h2>
          <Link href="/blog" className="related-insights-all-link">
            View all Articles <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="related-insights-grid">
          {posts.map((post) => {
            const badge = CATEGORY_BADGE[post.category];
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="related-card"
              >
                <div className="related-card-img-wrap">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                    className="related-card-img"
                    loading="lazy"
                  />
                </div>
                <div className="related-card-body">
                  <div className="related-card-meta-row">
                    <span
                      className="blog-badge"
                      style={{ background: badge.bg, color: badge.text }}
                    >
                      {post.category}
                    </span>
                    <span className="related-card-meta">
                      {formatBlogDate(post.publishedAt)} · {post.readTime} min
                      read
                    </span>
                  </div>
                  <h3 className="related-card-title">{post.title}</h3>
                  <p className="related-card-desc">{post.description}</p>
                  <span className="related-card-link">
                    Read More <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
