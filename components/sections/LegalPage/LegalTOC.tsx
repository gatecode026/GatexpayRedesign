"use client";

import { useEffect, useRef, useState } from "react";

type TOCItem = { id: string; label: string };

export default function LegalTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    // A section counts as "active" once it crosses just below the fixed
    // navbar, and stays active until the next one does the same.
    const observer = new IntersectionObserver(
      (entries) => {
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
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="legal-toc">
      <div className="legal-toc-header">On this Page</div>
      <nav className="legal-toc-nav" aria-label="On this page">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={item.id === activeId ? "is-active" : ""}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
