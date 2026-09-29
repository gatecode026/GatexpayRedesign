"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";

export interface TOCItem {
  id: string;
  label: string;
}

interface ArticleTOCProps {
  items: TOCItem[];
}

export default function ArticleTOC({ items }: ArticleTOCProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");
  const [progress, setProgress] = useState<number>(0);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const rafRef = useRef<number | null>(null);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the first intersecting entry from top to bottom
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by position on screen
        visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveId(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-90px 0px -60% 0px",
      threshold: [0, 0.2, 0.5],
    });

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  // Calculate reading progress based on article content container
  const updateProgress = useCallback(() => {
    const articleContainer = document.getElementById("article-content-body");
    if (!articleContainer) return;

    const rect = articleContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalHeight = rect.height - windowHeight;

    if (totalHeight <= 0) {
      setProgress(100);
      return;
    }

    const currentScroll = -rect.top;
    const percentage = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
    setProgress(Math.round(percentage));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = 100;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setActiveId(id);
    setIsMobileOpen(false);
  };

  return (
    <aside className="article-toc-sidebar" aria-label="Table of contents">
      {/* Mobile Collapsible Header */}
      <button
        type="button"
        className="mobile-toc-toggle"
        onClick={() => setIsMobileOpen((prev) => !prev)}
        aria-expanded={isMobileOpen}
        aria-controls="article-toc-nav"
      >
        <span className="mobile-toc-toggle-title">On this Article</span>
        <ChevronDown
          size={16}
          className={`mobile-toc-chevron ${isMobileOpen ? "is-open" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id="article-toc-nav"
        className={`article-toc-content ${isMobileOpen ? "is-open-mobile" : ""}`}
      >
        <h2 className="article-toc-heading">ON THIS ARTICLE</h2>
        <nav className="article-toc-list">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`article-toc-item ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "location" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Reading Progress */}
        <div className="reading-progress-block">
          <span className="reading-progress-label">Reading progress</span>
          <div
            className="reading-progress-track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Article reading progress"
          >
            <div className="reading-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </aside>
  );
}
