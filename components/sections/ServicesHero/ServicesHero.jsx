"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { POPULAR_TAGS } from "@/data/services-data";
import "./ServicesHero.css";
export default function ServicesHero({ query = "", onSearch, onTagClick }) {
  const [searchQuery, setSearchQuery] = useState(query);
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setSearchQuery(query);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery.trim());
  };
  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    if (onTagClick) onTagClick(tag);
    else if (onSearch) onSearch(tag);
  };
  // Phone dropdown shows the applied search when it is one of the tags
  const selectedTag =
    POPULAR_TAGS.find(
      (tag) => tag.toLowerCase() === query.trim().toLowerCase()
    ) ?? "";
  return (
    <section className="services-hero" aria-labelledby="services-hero-title">
      <div className="services-hero-inner">
        {/* Frame 43 — text column, gap 48px */}
        <div className="services-hero-content">
          <h1 id="services-hero-title" className="services-hero-title">
            Payment Solutions{" "}
            <span className="services-hero-title-plain">
              for
              <br className="services-hero-title-break" /> Every Business
            </span>
          </h1>

          <p className="services-hero-desc">
            GateXPay offers payment gateways, banking APIs, and digital
            services. Explore our 27+ solutions to enhance your platform.
          </p>

          {/* Frame 191 — search + popular tags, gap 24px */}
          <div className="services-hero-actions">
            {/* Frame 172 — 539×44 search bar */}
            <form
              className="services-hero-search"
              onSubmit={handleSubmit}
              role="search"
            >
              <div className="services-hero-field">
                <input
                  id="services-hero-search-input"
                  type="text"
                  className="services-hero-input"
                  placeholder="What are you looking to build or integrate?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search services"
                />
              </div>
              <button type="submit" className="services-hero-submit">
                <Search size={20} strokeWidth={2} aria-hidden="true" />
                <span>Search</span>
              </button>
            </form>

            {/* Frame 180 — "Popular:" + tag pills */}
            <div className="services-hero-popular">
              <span className="services-hero-popular-label">Popular:</span>
              <div className="services-hero-tags">
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="services-hero-pill"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Phones (≤767): the same tags as a native dropdown */}
            <div className="services-hero-popular-mobile">
              <label
                htmlFor="services-hero-popular-select"
                className="services-hero-popular-label"
              >
                Popular:
              </label>
              <div className="services-hero-select-wrap">
                <select
                  id="services-hero-popular-select"
                  className={`services-hero-select${selectedTag ? "" : " is-placeholder"}`}
                  value={selectedTag}
                  onChange={(e) => {
                    if (e.target.value) handleTagClick(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {POPULAR_TAGS.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  className="services-hero-select-icon"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

        {/* image 30 — 950×633 illustration (decorative: the copy says the same) */}
        <div className="services-hero-art" aria-hidden="true">
          <Image
            src="/assets/images/services-hero-figma.png"
            alt=""
            width={950}
            height={633}
            sizes="(min-width: 1440px) 950px, (min-width: 1024px) 66vw, (min-width: 768px) 766px, 128vw"
            fetchPriority="high"
            className="services-hero-illustration"
          />
        </div>
      </div>
    </section>
  );
}
