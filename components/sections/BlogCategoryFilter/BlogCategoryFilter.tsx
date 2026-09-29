"use client";

import { BlogCategory } from "@/data/blog-posts";
import "./BlogCategoryFilter.css";

export type FilterCategory = BlogCategory | "All Articles";

type BlogCategoryFilterProps = {
  categories: BlogCategory[];
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
};

export default function BlogCategoryFilter({ categories, active, onChange }: BlogCategoryFilterProps) {
  const filters: FilterCategory[] = ["All Articles", ...categories];

  return (
    <div className="blog-container">
      <div className="blog-filter-row" role="tablist" aria-label="Filter articles by category">
        {filters.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            className={`blog-filter-pill${active === cat ? " active" : ""}`}
            onClick={() => onChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
