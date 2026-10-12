"use client";
import { useEffect, useState, useRef } from "react";

export default function LegalTOC({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const isClickScrollingRef = useRef(false);
  const scrollTimerRef = useRef(null);

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el) => el !== null);
    if (elements.length === 0) return;

    // A section counts as "active" once it crosses just below the fixed
    // navbar, and stays active until the next one does the same.
    const observer = new IntersectionObserver(
      (entries) => {
        // If user clicked a tab, lock activeId and do not flicker through intermediate sections
        if (isClickScrollingRef.current) return;

        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    // Release lock early if user manually interacts (wheel, touch, scrollend)
    const unlockScroll = () => {
      isClickScrollingRef.current = false;
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };

    window.addEventListener("scrollend", unlockScroll, { passive: true });
    window.addEventListener("wheel", unlockScroll, { passive: true });
    window.addEventListener("touchmove", unlockScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scrollend", unlockScroll);
      window.removeEventListener("wheel", unlockScroll);
      window.removeEventListener("touchmove", unlockScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [items]);

  const scrollToTarget = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;

    // 1. Immediately lock activeId directly to the target link
    isClickScrollingRef.current = true;
    setActiveId(targetId);

    // 2. Clear previous unlock timer if any
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    // 3. Smoothly scroll directly to section with navbar clearance
    const navOffset = 96;
    const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementTop - navOffset,
      behavior: "smooth",
    });

    if (window.history?.replaceState) {
      window.history.replaceState(null, "", `#${targetId}`);
    }
  };

  if (items.length === 0) return null;

  return (
    <aside className="legal-toc">
      <div className="legal-toc-header">On this page</div>
      <nav className="legal-toc-nav" aria-label="On this page">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={item.id === activeId ? "is-active" : ""}
            onClick={(e) => scrollToTarget(e, item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
