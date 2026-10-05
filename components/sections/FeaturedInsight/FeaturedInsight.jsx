import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORY_BADGE, formatBlogDate } from "@/data/blog-posts";
import "./FeaturedInsight.css";
export default function FeaturedInsight({ post }) {
  const badge = CATEGORY_BADGE[post.category];
  return (
    <section className="blog-section featured-insight">
      <div className="blog-container">
        <p className="featured-label">Featured Insight</p>
        <article className="featured-card">
          <div className="featured-img-wrap">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 767px) 100vw, 595px"
              className="featured-img"
              priority
            />
          </div>
          <div className="featured-content">
            <div className="featured-meta-row">
              <span
                className="blog-badge"
                style={{ background: badge.bg, color: badge.text }}
              >
                {post.category}
              </span>
              <span className="featured-meta">
                {formatBlogDate(post.publishedAt)} · {post.readTime} min read
              </span>
            </div>
            <h2 className="featured-title">
              {post.id === "rbi-pa-pg-licensing-guide-2026" ? (
                <>
                  <span className="featured-title-line">
                    Understanding RBI&apos;s Payment Aggregator
                  </span>{" "}
                  <span className="featured-title-line">
                    Licensing: A Complete Compliance Guide for
                  </span>{" "}
                  <span className="featured-title-line">
                    Indian Fintechs in 2026
                  </span>
                </>
              ) : (
                post.title
              )}
            </h2>
            <p className="featured-desc">{post.description}</p>
            <Link href={`/blog/${post.slug}`} className="featured-link">
              Read Insight <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
