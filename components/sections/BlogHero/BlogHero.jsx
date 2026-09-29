"use client";
import { Search } from "lucide-react";
import "./BlogHero.css";
export default function BlogHero({ searchQuery, onSearchChange }) {
  return (
    <section className="blog-hero">
      <div className="blog-container blog-hero-inner">
        <h1 className="blog-hero-heading">
          Gate X Pay <span className="blog-hero-heading-accent">Insights</span>
        </h1>
        <p className="blog-hero-desc">
          Practical insights on fintech, payments, technology, compliance, and
          digital growth for modern businesses.
        </p>
        <form
          className="blog-search"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="blog-search-input" className="sr-only">
            Search insights
          </label>
          <input
            id="blog-search-input"
            type="text"
            className="blog-search-input"
            placeholder="Search insights, guides, APIs, payments, compliance..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button type="submit" className="blog-search-btn">
            <Search size={16} aria-hidden="true" />
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
