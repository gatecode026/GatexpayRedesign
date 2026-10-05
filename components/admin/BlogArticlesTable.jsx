"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ExternalLink,
  BookOpen,
  Eye,
  Calendar,
  Clock,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
export default function BlogArticlesTable({ posts, loading = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState(null);
  const pageSize = 8;
  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      const name = p.category?.name || "FinTech";
      set.add(name);
    });
    return Array.from(set);
  }, [posts]);
  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCat =
        selectedCategory === "all" ||
        (post.category?.name || "FinTech").toLowerCase() ===
          selectedCategory.toLowerCase();
      if (!matchCat) return false;
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      const matchTitle = post.title?.toLowerCase().includes(term);
      const matchSlug = post.slug?.toLowerCase().includes(term);
      const matchAuthor = post.author?.toLowerCase().includes(term);
      const matchCatName = post.category?.name?.toLowerCase().includes(term);
      return matchTitle || matchSlug || matchAuthor || matchCatName;
    });
  }, [posts, selectedCategory, searchTerm]);
  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + pageSize);
  const handleCopyLink = (slug, id) => {
    const url = `${window.location.origin}/blog/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };
  const getCategoryTheme = (catName) => {
    const name = catName?.toLowerCase() || "";
    if (name.includes("growth") || name.includes("business")) {
      return { bg: "#FAF5FF", text: "#7E22CE", border: "#E9D5FF" };
    }
    if (name.includes("engineer") || name.includes("tech")) {
      return { bg: "#EFF6FF", text: "#0284C7", border: "#BAE6FD" };
    }
    if (name.includes("compliance") || name.includes("regulation")) {
      return { bg: "#FEF3C7", text: "#B45309", border: "#FDE68A" };
    }
    if (name.includes("csp") || name.includes("service")) {
      return { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" };
    }
    return { bg: "#F1F5F9", text: "#475569", border: "#CBD5E1" };
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return "Recently";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };
  const getInitials = (author) => {
    if (!author) return "GP";
    const parts = author.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return author.slice(0, 2).toUpperCase();
  };
  return (
    <div className="dash-leads-card">
      {/* ── TOOLBAR: SEARCH & CATEGORY PILLS ── */}
      <div className="leads-toolbar" style={{ paddingTop: "16px" }}>
        <div className="leads-search-input-wrap">
          <Search size={15} className="leads-search-icon" />
          <input
            type="text"
            placeholder="Search articles by title, author, slug..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          {searchTerm && (
            <button
              type="button"
              className="leads-clear-search"
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="leads-filter-tabs">
          <button
            type="button"
            className={`filter-tab ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory("all");
              setCurrentPage(1);
            }}
          >
            All ({posts.length})
          </button>
          {categories.map((cat) => {
            const count = posts.filter(
              (p) => (p.category?.name || "FinTech") === cat
            ).length;
            return (
              <button
                key={cat}
                type="button"
                className={`filter-tab ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── DESKTOP & TABLET DATA TABLE ── */}
      <div className="dash-table-container desktop-table-view">
        <table className="dash-table blog-articles-table">
          <thead>
            <tr>
              <th className="th-blog-article">ARTICLE &amp; SLUG</th>
              <th className="th-blog-category">CATEGORY</th>
              <th className="th-blog-author">AUTHOR &amp; DATE</th>
              <th className="th-blog-views">VIEWS</th>
              <th className="th-blog-status">STATUS</th>
              <th className="th-blog-action" style={{ textAlign: "right" }}>
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="dash-table-empty">
                  <div className="dash-table-loading-spinner" />
                  <div>Loading published articles...</div>
                </td>
              </tr>
            ) : paginatedPosts.length === 0 ? (
              <tr>
                <td colSpan={6} className="dash-table-empty">
                  <FileText size={32} className="table-empty-icon" />
                  <div className="table-empty-title">No articles found</div>
                  <div className="table-empty-desc">
                    Try adjusting your search terms or category filter to find
                    what you need.
                  </div>
                  {(searchTerm || selectedCategory !== "all") && (
                    <button
                      type="button"
                      className="add-lead-empty-btn"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("all");
                        setCurrentPage(1);
                      }}
                    >
                      Reset Filters
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              paginatedPosts.map((post) => {
                const theme = getCategoryTheme(post.category?.name);
                const categoryName = post.category?.name || "FinTech";
                const isCopied = copiedId === post._id;
                return (
                  <tr key={post._id} className="blog-table-row">
                    {/* Article Title & Slug */}
                    <td className="td-blog-article">
                      <div className="blog-article-cell">
                        <div className="blog-article-icon-box">
                          <BookOpen size={16} />
                        </div>
                        <div className="blog-article-info">
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="blog-article-title"
                            title={post.title}
                          >
                            {post.title}
                          </Link>
                          <div className="blog-article-meta-row">
                            <span className="blog-slug-pill">
                              <span className="blog-slug-prefix">/blog/</span>
                              <span className="blog-slug-name">
                                {post.slug}
                              </span>
                            </span>
                            <button
                              type="button"
                              className={`blog-copy-slug-btn ${isCopied ? "copied" : ""}`}
                              onClick={() =>
                                handleCopyLink(post.slug, post._id)
                              }
                              title={
                                isCopied
                                  ? "Copied to clipboard"
                                  : "Copy full article link"
                              }
                            >
                              {isCopied ? (
                                <>
                                  <Check size={11} />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={11} />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                            <span className="blog-read-time">
                              <Clock size={11} />
                              <span>{post.readTime || 4} min read</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="td-blog-category">
                      <span
                        className="blog-category-badge"
                        style={{
                          backgroundColor: theme.bg,
                          color: theme.text,
                          borderColor: theme.border,
                        }}
                      >
                        {categoryName}
                      </span>
                    </td>

                    {/* Author & Date */}
                    <td className="td-blog-author">
                      <div className="blog-author-cell">
                        <div className="blog-author-avatar">
                          {getInitials(post.author)}
                        </div>
                        <div className="blog-author-details">
                          <span className="blog-author-name">
                            {post.author}
                          </span>
                          <span className="blog-publish-date">
                            <Calendar size={11} />
                            <span>
                              {formatDate(post.publishedAt || post.createdAt)}
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Views */}
                    <td className="td-blog-views">
                      <div className="blog-views-cell">
                        <Eye size={13} className="blog-views-icon" />
                        <span className="blog-views-num">
                          {post.views.toLocaleString()}
                        </span>
                        <span className="blog-views-label">views</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="td-blog-status">
                      <div className="blog-status-pill published">
                        <span className="blog-status-dot" />
                        <span className="blog-status-text">
                          {post.status
                            ? post.status.charAt(0).toUpperCase() +
                              post.status.slice(1)
                            : "Published"}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td
                      className="td-blog-action"
                      style={{ textAlign: "right" }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="blog-view-live-btn"
                        title="Open live article"
                      >
                        <span>View Live</span>
                        <ExternalLink size={12} />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE CARD VIEW (<= 768px) ── */}
      <div className="mobile-lead-cards-view">
        {loading ? (
          <div className="mobile-empty-state">
            <div className="dash-table-loading-spinner" />
            <div>Loading published articles...</div>
          </div>
        ) : paginatedPosts.length === 0 ? (
          <div className="mobile-empty-state">
            <FileText size={28} />
            <div className="mobile-empty-title">No articles found</div>
          </div>
        ) : (
          paginatedPosts.map((post) => {
            const theme = getCategoryTheme(post.category?.name);
            const isCopied = copiedId === post._id;
            return (
              <div key={post._id} className="mobile-lead-card blog-mobile-card">
                <div className="mobile-card-top">
                  <span
                    className="blog-category-badge"
                    style={{
                      backgroundColor: theme.bg,
                      color: theme.text,
                      borderColor: theme.border,
                    }}
                  >
                    {post.category?.name || "FinTech"}
                  </span>
                  <div className="blog-status-pill published">
                    <span className="blog-status-dot" />
                    <span>Published</span>
                  </div>
                </div>

                <div className="mobile-card-main">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="mobile-blog-title"
                  >
                    {post.title}
                  </Link>

                  <div className="mobile-blog-slug-row">
                    <span className="blog-slug-pill">
                      <span className="blog-slug-prefix">/</span>
                      {post.slug}
                    </span>
                    <button
                      type="button"
                      className="blog-copy-slug-btn"
                      onClick={() => handleCopyLink(post.slug, post._id)}
                    >
                      {isCopied ? <Check size={11} /> : <Copy size={11} />}
                    </button>
                  </div>
                </div>

                <div className="mobile-blog-meta-grid">
                  <div className="mobile-meta-item">
                    <span className="mobile-meta-lbl">Author</span>
                    <span className="mobile-meta-val">{post.author}</span>
                  </div>
                  <div className="mobile-meta-item">
                    <span className="mobile-meta-lbl">Views</span>
                    <span className="mobile-meta-val font-semibold">
                      {post.views}
                    </span>
                  </div>
                  <div className="mobile-meta-item">
                    <span className="mobile-meta-lbl">Date</span>
                    <span className="mobile-meta-val">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                  </div>
                  <div className="mobile-meta-item">
                    <span className="mobile-meta-lbl">Read Time</span>
                    <span className="mobile-meta-val">
                      {post.readTime || 4} min
                    </span>
                  </div>
                </div>

                <div className="mobile-card-bottom">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="mobile-lead-btn-primary"
                    style={{ textDecoration: "none" }}
                  >
                    <ExternalLink size={13} />
                    <span>View Live Article</span>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── FOOTER & PAGINATION ── */}
      <div className="leads-table-footer">
        <div className="footer-count">
          Showing{" "}
          <span className="font-semibold text-slate-800">
            {filteredPosts.length > 0 ? startIndex + 1 : 0}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-slate-800">
            {Math.min(startIndex + pageSize, filteredPosts.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-800">
            {filteredPosts.length}
          </span>{" "}
          articles
        </div>

        {totalPages > 1 && (
          <div className="footer-pagination">
            <button
              type="button"
              className="page-btn nav-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              aria-label="Previous page"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`page-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="page-btn nav-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              aria-label="Next page"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
