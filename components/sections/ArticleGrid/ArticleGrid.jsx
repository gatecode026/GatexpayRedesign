"use client";
import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORY_BADGE, formatBlogDate } from "@/data/blog-posts";
import "./ArticleGrid.css";
const ArticleCard = memo(function ArticleCard({ post }) {
  const badge = CATEGORY_BADGE[post.category];
  return (
    <Link href={`/blog/${post.slug}`} className="article-card">
      <div className="article-card-img-wrap">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className="article-card-img"
          loading="lazy"
        />
      </div>
      <div className="article-card-body">
        <div className="article-card-meta-row">
          <span
            className="blog-badge"
            style={{ background: badge.bg, color: badge.text }}
          >
            {post.category}
          </span>
          <span className="article-card-meta">
            {formatBlogDate(post.publishedAt)} · {post.readTime} min read
          </span>
        </div>
        <h3 className="article-card-title">{post.title}</h3>
        <p className="article-card-desc">{post.description}</p>
        <span className="article-card-link">
          Read More <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
});
export default function ArticleGrid({ posts, visibleCount, onLoadMore }) {
  if (posts.length === 0) {
    return (
      <div className="blog-container">
        <div className="article-empty-state">
          <p className="article-empty-title">No articles found</p>
          <p className="article-empty-desc">
            Try a different search term or category.
          </p>
        </div>
      </div>
    );
  }
  const visible = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;
  return (
    <div className="blog-container">
      <div className="article-grid">
        {visible.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
      {hasMore && (
        <div className="article-load-more-wrap">
          <button
            type="button"
            className="article-load-more-btn"
            onClick={onLoadMore}
          >
            Load more Articles
          </button>
        </div>
      )}
    </div>
  );
}
