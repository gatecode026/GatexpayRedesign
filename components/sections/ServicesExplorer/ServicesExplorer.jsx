"use client";
import { useState, useEffect, useRef, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wallet,
  Banknote,
  ShoppingBag,
  Landmark,
  BriefcaseBusiness,
  ArrowRight,
  Search,
} from "lucide-react";
import {
  SERVICE_CATEGORIES,
  POPULAR_TAGS,
  getServiceSuggestions,
  searchAllServices,
} from "@/data/services-data";
import { useContactModal } from "@/components/common/ContactModal/ContactModalContext";
import "./ServicesExplorer.css";
const CATEGORY_ICONS = {
  wallet: Wallet,
  banknote: Banknote,
  "shopping-bag": ShoppingBag,
  landmark: Landmark,
  "briefcase-business": BriefcaseBusiness,
};
const SUGGESTIONS_ID = "services-topbar-suggestions";
/** Bold the matched part of a suggestion (plain string search — no RegExp). */
function highlightMatch(text, query) {
  const at = text.toLowerCase().indexOf(query.trim().toLowerCase());
  if (!query.trim() || at < 0) return text;
  const end = at + query.trim().length;
  return (
    <>
      {text.slice(0, at)}
      <span className="services-suggestion-match">{text.slice(at, end)}</span>
      {text.slice(end)}
    </>
  );
}
export default function ServicesExplorer({
  externalQuery = "",
  onSearch,
  onClearSearch,
}) {
  // Search state model: `draft` is the bar's text, `submittedQuery` is applied
  const [draft, setDraft] = useState(externalQuery);
  const [submittedQuery, setSubmittedQuery] = useState(externalQuery);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isBarVisible, setIsBarVisible] = useState(false);
  const [prevExternalQuery, setPrevExternalQuery] = useState(externalQuery);
  if (externalQuery !== prevExternalQuery) {
    setPrevExternalQuery(externalQuery);
    setSubmittedQuery(externalQuery);
    setDraft(externalQuery);
  }
  // Active category for sidebar scrollspy
  const [activeCategory, setActiveCategory] = useState(
    SERVICE_CATEGORIES[0].id
  );
  const { open } = useContactModal();
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const searchContainerRef = useRef(null);
  const categoryRefs = useRef({});
  const isClickScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef(null);
  // Autocomplete suggestions (only while typing, and only while the bar shows)
  const suggestions =
    isBarVisible && showSuggestions && draft.trim()
      ? getServiceSuggestions(draft)
      : [];
  const isSuggestionsOpen = suggestions.length > 0;
  // Search Results
  const isSearchMode = submittedQuery.trim().length > 0;
  const appliedQuery = submittedQuery.trim().toLowerCase();
  const searchResults = isSearchMode ? searchAllServices(submittedQuery) : [];
  const isNoResults = isSearchMode && searchResults.length === 0;
  // Close the suggestions on any click outside the search box
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Show the bar once the hero has scrolled away (the explorer's top has
  // reached the bar's bottom edge) and until the explorer's end passes it.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const bar = stickyRef.current;
      if (!section || !bar) return;
      const barBottom =
        (parseFloat(getComputedStyle(bar).top) || 0) + bar.offsetHeight;
      const { top, bottom } = section.getBoundingClientRect();
      setIsBarVisible(top <= barBottom && bottom > barBottom);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  // Hiding the bar releases keyboard focus from it
  useEffect(() => {
    if (isBarVisible) return;
    const active = document.activeElement;
    if (active instanceof HTMLElement && stickyRef.current?.contains(active)) {
      active.blur();
    }
  }, [isBarVisible]);
  // Scrollspy: the active category is the last one whose heading has
  // reached the line just under the bar.
  useEffect(() => {
    if (isSearchMode) return;
    const handleScroll = () => {
      // If user clicked a category link, prevent scrollspy from jumping
      // through intermediate categories while smooth scrolling
      if (isClickScrollingRef.current) {
        if (scrollEndTimerRef.current) {
          clearTimeout(scrollEndTimerRef.current);
        }
        scrollEndTimerRef.current = setTimeout(() => {
          isClickScrollingRef.current = false;
        }, 150);
        return;
      }

      // If at bottom of page, highlight the last category
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveCategory(SERVICE_CATEGORIES[SERVICE_CATEGORIES.length - 1].id);
        return;
      }

      const bar = stickyRef.current;
      const barBottom = bar
        ? (parseFloat(getComputedStyle(bar).top) || 0) + bar.offsetHeight
        : 0;
      const line = barBottom + 48;
      let currentId = SERVICE_CATEGORIES[0].id;
      for (const cat of SERVICE_CATEGORIES) {
        const el = categoryRefs.current[cat.id];
        if (el && el.getBoundingClientRect().top <= line) {
          currentId = cat.id;
        }
      }
      setActiveCategory(currentId);
    };

    const handleUserInteraction = () => {
      if (isClickScrollingRef.current) {
        isClickScrollingRef.current = false;
        if (scrollEndTimerRef.current) {
          clearTimeout(scrollEndTimerRef.current);
        }
      }
    };

    const handleScrollEnd = () => {
      isClickScrollingRef.current = false;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd, { passive: true });
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, [isSearchMode]);
  // Bring the explorer's top (the bar) up under the navbar — the section's
  // scroll-margin-top handles the navbar offset.
  const scrollToExplorer = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  // Apply a query from the bar or a pill ("" = back to all categories)
  const executeSearch = (query) => {
    const q = query.trim();
    setDraft(q);
    setSubmittedQuery(q);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    if (!q) setActiveCategory(SERVICE_CATEGORIES[0].id);
    if (onSearch) onSearch(q);
    else if (q) scrollToExplorer();
  };
  const clearSearch = () => {
    setDraft("");
    setSubmittedQuery("");
    setActiveCategory(SERVICE_CATEGORIES[0].id);
    if (onClearSearch) onClearSearch();
    scrollToExplorer();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSuggestionsOpen && selectedSuggestionIndex >= 0) {
      executeSearch(suggestions[selectedSuggestionIndex]);
    } else {
      executeSearch(draft);
    }
  };
  const handleKeyDown = (e) => {
    if (!isSuggestionsOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((i) =>
        i <= 0 ? suggestions.length - 1 : i - 1
      );
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };
  // Clicking the active pill again clears it
  const handleTagClick = (tag) => {
    executeSearch(appliedQuery === tag.toLowerCase() ? "" : tag);
  };
  // Sidebar Category click -> smooth scroll
  const handleCategoryClick = (catId) => {
    // If in search mode, exit search mode first
    if (isSearchMode) {
      setDraft("");
      setSubmittedQuery("");
      if (onClearSearch) onClearSearch();
    }
    // Lock scrollspy immediately so intermediate links don't activate during smooth scroll
    isClickScrollingRef.current = true;
    setActiveCategory(catId);

    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
    }
    // Fallback safety timeout to release scroll lock
    scrollEndTimerRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 1200);

    // Wait a tick for DOM to restore normal categories if coming out of search;
    // the block's scroll-margin-top lands it just under the sticky bar.
    setTimeout(() => {
      categoryRefs.current[catId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };
  return (
    <section
      ref={sectionRef}
      className="services-explorer-section"
      id="explore-services"
      aria-label="Explore services"
    >
      {/* SEARCH + POPULAR TAGS BAR — fixed under the navbar, shown only
            after the hero has scrolled away */}
      <div
        ref={stickyRef}
        className={`services-topbar-sticky${isBarVisible ? " is-visible" : ""}`}
      >
        <div className="services-topbar">
          <div
            ref={searchContainerRef}
            className={`services-topbar-search-wrap${isSearchFocused ? " is-focused" : ""}`}
          >
            <form
              className="services-topbar-search-form"
              role="search"
              onSubmit={handleSubmit}
            >
              <div className="services-topbar-input-wrap">
                <input
                  id="services-topbar-search-input"
                  type="text"
                  className="services-topbar-input"
                  placeholder="What are you looking to build or integrate?"
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value);
                    setShowSuggestions(true);
                    setSelectedSuggestionIndex(-1);
                  }}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    if (draft !== submittedQuery) setShowSuggestions(true);
                  }}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyDown={handleKeyDown}
                  role="combobox"
                  aria-label="Search services"
                  aria-autocomplete="list"
                  aria-expanded={isSuggestionsOpen}
                  aria-controls={SUGGESTIONS_ID}
                  aria-activedescendant={
                    isSuggestionsOpen && selectedSuggestionIndex >= 0
                      ? `${SUGGESTIONS_ID}-${selectedSuggestionIndex}`
                      : undefined
                  }
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="services-topbar-search-btn">
                <Search size={20} strokeWidth={2} aria-hidden="true" />
                <span>Search</span>
              </button>
            </form>

            <ul
              id={SUGGESTIONS_ID}
              className="services-autocomplete-dropdown"
              role="listbox"
              aria-label="Suggestions"
              hidden={!isSuggestionsOpen}
            >
              {suggestions.map((s, i) => (
                <li
                  key={s}
                  id={`${SUGGESTIONS_ID}-${i}`}
                  role="option"
                  aria-selected={i === selectedSuggestionIndex}
                  className={`services-autocomplete-item${i === selectedSuggestionIndex ? " is-selected" : ""}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setSelectedSuggestionIndex(i)}
                  onClick={() => executeSearch(s)}
                >
                  {highlightMatch(s, draft)}
                </li>
              ))}
            </ul>
          </div>

          <div className="services-topbar-popular">
            <span
              id="services-topbar-popular-label"
              className="services-topbar-popular-label"
            >
              Popular:
            </span>
            <div
              className="services-topbar-tags"
              role="group"
              aria-labelledby="services-topbar-popular-label"
            >
              {POPULAR_TAGS.map((tag) => {
                const isActive = appliedQuery === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    type="button"
                    className={`services-topbar-tag${isActive ? " is-active" : ""}`}
                    aria-pressed={isActive}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="services-explorer-container">
        {/* MAIN LAYOUT: SIDEBAR + CONTENT */}
        <div className="services-layout">
          {/* LEFT SIDEBAR (Width 304px) */}
          <aside className="services-sidebar">
            <div className="services-sidebar-inner">
              <div className="services-sidebar-header">
                <span className="services-sidebar-title">
                  EXPLORE SOLUTIONS
                </span>
              </div>

              <nav
                className="services-sidebar-nav"
                aria-label="Solutions Categories"
              >
                {SERVICE_CATEGORIES.map((cat) => {
                  const IconComponent = CATEGORY_ICONS[cat.iconName] || Wallet;
                  const isActive = !isSearchMode && activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`services-sidebar-item ${isActive ? "is-active" : ""}`}
                      onClick={() => handleCategoryClick(cat.id)}
                    >
                      <IconComponent
                        size={24}
                        strokeWidth={1.8}
                        className="services-sidebar-icon"
                        aria-hidden="true"
                      />
                      <span className="services-sidebar-item-text">
                        {cat.sidebarTitle}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Need Help Card */}
              <div className="services-sidebar-help-card">
                <div className="services-help-text-wrap">
                  <h4 className="services-help-title">Need Help?</h4>
                  <p className="services-help-desc">
                    Contact our expert team for any Assistance
                  </p>
                </div>
                <button
                  type="button"
                  className="services-help-btn"
                  onClick={open}
                >
                  Talk to an Expert
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT AREA (Width 960px) */}
          <div className="services-main-content">
            {/* STATE 5: NO SOLUTION FOUND */}
            {isNoResults ? (
              <div className="services-empty-state">
                <div className="services-empty-visual" aria-hidden="true">
                  <Image
                    src="/assets/images/services-empty-state-illustration.png"
                    alt=""
                    width={440}
                    height={290}
                    className="services-empty-img"
                    priority
                  />
                </div>

                <h2 className="services-empty-title">No Solution Found</h2>

                <p className="services-empty-desc-primary">
                  We couldn&apos;t find any solutions matching{" "}
                  <strong>&ldquo;{submittedQuery}&rdquo;</strong>.
                </p>
                <p className="services-empty-desc-secondary">
                  Try using a different keyword or explore our available
                  services.
                </p>

                <div className="services-empty-actions">
                  <button
                    type="button"
                    className="services-clear-search-btn"
                    onClick={clearSearch}
                  >
                    Clear Search
                  </button>

                  <button
                    type="button"
                    className="services-explore-all-link"
                    onClick={clearSearch}
                  >
                    <span>Explore All Services</span>
                    <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : isSearchMode ? (
              /* STATE 4: SEARCH RESULTS STATE */
              <div className="services-search-results-section">
                <div className="services-search-results-header">
                  <h2 className="services-search-results-title">
                    Search Results for &ldquo;{submittedQuery}&rdquo;
                  </h2>
                </div>

                <div className="services-grid">
                  {searchResults.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            ) : (
              /* STATE 1: DEFAULT NORMAL CATEGORIES VIEW */
              SERVICE_CATEGORIES.map((category) => (
                <section
                  key={category.id}
                  id={category.id}
                  ref={(el) => {
                    categoryRefs.current[category.id] = el;
                  }}
                  className="services-category-block"
                >
                  <div className="services-category-header">
                    <h2 className="services-category-title">
                      {category.heading}
                    </h2>
                    <p className="services-category-desc">
                      {category.description}
                    </p>
                  </div>

                  <div className="services-grid">
                    {category.services.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
// Reusable ServiceCard component matching Frame 202 exact specifications
const ServiceCard = memo(function ServiceCard({ service }) {
  return (
    <Link
      href={service.href}
      className="services-card"
      data-service-id={service.id}
    >
      {/* Frame 199: Badge */}
      <div className="services-card-badge-wrap">
        <span
          className="services-card-badge"
          style={{ color: service.badgeColor || "#00C0FD" }}
        >
          {service.badge}
        </span>
      </div>

      {/* Frame 196: Text Container */}
      <div className="services-card-text">
        <h3 className="services-card-title">{service.title}</h3>
        <p className="services-card-desc">{service.description}</p>
      </div>

      {/* Buttons: CTA Link */}
      <div className="services-card-cta">
        <span className="services-card-cta-text">Explore Service</span>
        <ArrowRight
          size={14}
          strokeWidth={2}
          className="services-card-arrow"
          aria-hidden="true"
        />
      </div>

      {/* 316x211 Illustration placed at left: 151px, top: calc(50% - 211px/2 + 0.5px) */}
      <div className="services-card-visual" aria-hidden="true">
        <Image
          src={service.image}
          alt=""
          width={316}
          height={211}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 316px"
          loading="lazy"
          className="services-card-img"
        />
      </div>
    </Link>
  );
});
