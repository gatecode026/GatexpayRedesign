"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
export default function ArticleTOC({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id || "");
  const [progress, setProgress] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const rafRef = useRef(null);
  const isClickScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef(null);

  // Synchronously compute reading progress and active section deterministically without observer jitter
  const updateScrollSpyAndProgress = useCallback(() => {
    // 1. Reading progress calculation based on article container
    const articleContainer = document.getElementById("article-content-body");
    if (articleContainer) {
      const rect = articleContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height - windowHeight;
      if (totalHeight <= 0) {
        setProgress(100);
      } else {
        const currentScroll = -rect.top;
        const percentage = Math.min(
          100,
          Math.max(0, (currentScroll / totalHeight) * 100)
        );
        setProgress(Math.round(percentage));
      }
    }

    // 2. Active section detection
    if (isClickScrollingRef.current) return;
    if (!items || items.length === 0) return;

    // If near the bottom of document, activate the last section
    const scrollBottom = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollBottom >= documentHeight - 60) {
      const lastId = items[items.length - 1].id;
      setActiveId((prev) => (prev === lastId ? prev : lastId));
      return;
    }

    // Fixed navbar is 80px; sections become active when they cross 120px from top
    const ACTIVATION_OFFSET = 120;
    let currentActive = items[0].id;

    for (let i = 0; i < items.length; i++) {
      const el = document.getElementById(items[i].id);
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (top <= ACTIVATION_OFFSET) {
          currentActive = items[i].id;
        } else {
          // Sections are in document order, subsequent sections are further down
          break;
        }
      }
    }

    setActiveId((prev) => (prev === currentActive ? prev : currentActive));
  }, [items]);

  useEffect(() => {
    const onScroll = () => {
      if (isClickScrollingRef.current) {
        if (scrollEndTimerRef.current) {
          clearTimeout(scrollEndTimerRef.current);
        }
        scrollEndTimerRef.current = setTimeout(() => {
          isClickScrollingRef.current = false;
        }, 150);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateScrollSpyAndProgress);
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

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd, { passive: true });
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });

    // Initial check on mount
    rafRef.current = requestAnimationFrame(updateScrollSpyAndProgress);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    };
  }, [updateScrollSpyAndProgress]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    // Lock scrollspy immediately to the clicked section to prevent jumping intermediate sections
    isClickScrollingRef.current = true;
    setActiveId(id);
    setIsMobileOpen(false);

    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
    }
    scrollEndTimerRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 1000);

    const headerOffset = 100;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
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
        <h2 className="article-toc-heading">On this Article</h2>
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
            <div
              className="reading-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
