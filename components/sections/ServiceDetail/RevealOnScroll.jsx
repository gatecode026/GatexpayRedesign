"use client";
import { useEffect, useRef } from "react";
/** Adds the sitewide `.reveal` → `.in-view` fade-up to every `.reveal` inside, once. */
export default function RevealOnScroll({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      root
        .querySelectorAll(".reveal")
        .forEach((n) => n.classList.add("in-view"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.02, rootMargin: "100px 0px 100px 0px" }
    );
    root.querySelectorAll(".reveal").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);
  return <div ref={ref}>{children}</div>;
}
