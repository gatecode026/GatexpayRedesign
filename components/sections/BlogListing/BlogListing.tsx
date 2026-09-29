"use client";

import { useMemo, useState } from "react";
import { BLOG_CATEGORIES, BlogCategory, FEATURED_POST, GRID_POSTS } from "@/data/blog-posts";
import BlogHero from "@/components/sections/BlogHero/BlogHero";
import FeaturedInsight from "@/components/sections/FeaturedInsight/FeaturedInsight";
import BlogCategoryFilter from "@/components/sections/BlogCategoryFilter/BlogCategoryFilter";
import ArticleGrid from "@/components/sections/ArticleGrid/ArticleGrid";
import NewsletterCTA from "@/components/sections/NewsletterCTA/NewsletterCTA";
import "./BlogListing.css";

export type FilterCategory = BlogCategory | "All Articles";

const PAGE_SIZE = 9;
const LOAD_MORE_STEP = 6;

export default function BlogListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All Articles");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return GRID_POSTS.filter((post) => {
      const matchesCategory = activeCategory === "All Articles" || post.category === activeCategory;
      const matchesQuery =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, activeCategory]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleCategoryChange = (cat: FilterCategory) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const handleLoadMore = () => setVisibleCount((count) => count + LOAD_MORE_STEP);

  return (
    <div className="blog-page">
      <BlogHero searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <FeaturedInsight post={FEATURED_POST} />
      <section className="blog-section blog-filter-section">
        <BlogCategoryFilter
          categories={BLOG_CATEGORIES}
          active={activeCategory}
          onChange={handleCategoryChange}
        />
      </section>
      <section className="blog-grid-section">
        <ArticleGrid posts={filteredPosts} visibleCount={visibleCount} onLoadMore={handleLoadMore} />
      </section>
      <NewsletterCTA />
    </div>
  );
}
