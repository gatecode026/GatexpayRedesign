"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import "./TopLoader.css";

export default function TopLoader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const finishTimeoutRef = useRef(null);
  const safetyTimeoutRef = useRef(null);
  const activeNavRef = useRef(false);

  const finishProgress = () => {
    if (!activeNavRef.current && progress === 0) return;
    activeNavRef.current = false;

    // Jump to 100% completion
    setProgress(100);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }

    // Hold at 100% briefly, then fade out
    finishTimeoutRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setProgress(0);
      }, 250);
    }, 180);
  };

  const startProgress = () => {
    if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);

    activeNavRef.current = true;
    setVisible(true);
    setProgress(20);

    // Trickle progress smoothly
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        if (prev < 45) return prev + 16;
        if (prev < 70) return prev + 9;
        if (prev < 85) return prev + 4;
        return prev + 1;
      });
    }, 180);

    // Failsafe timeout in case route transition is cancelled or errors
    safetyTimeoutRef.current = setTimeout(() => {
      finishProgress();
    }, 8000);
  };

  // Complete progress whenever the pathname changes
  useEffect(() => {
    finishProgress();
  }, [pathname]);

  // Global click interception on internal links
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Ignore modified clicks (cmd, ctrl, shift, alt, right/middle click)
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        e.shiftKey
      ) {
        return;
      }

      // Find closest anchor tag
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore targets that open in new window/tab
      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return;

      // Ignore download links
      if (anchor.hasAttribute("download")) return;

      // Ignore hash anchor links (#, #introduction, etc.)
      if (
        href.startsWith("#") ||
        href === "" ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      try {
        const destUrl = new URL(anchor.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Ignore external domains
        if (destUrl.origin !== currentUrl.origin) return;

        const normalize = (p) => (p || "").replace(/\/+$/, "") || "/";

        // Ignore same page navigation (hash changes, same pathname & search)
        if (
          normalize(destUrl.pathname) === normalize(currentUrl.pathname) &&
          destUrl.search === currentUrl.search
        ) {
          return;
        }

        // Start top loader immediately for real page changes
        startProgress();
      } catch {
        // invalid URL format, ignore
      }
    };

    const handlePopState = () => {
      const currentNorm = (window.location.pathname || "").replace(/\/+$/, "") || "/";
      if (currentNorm !== (pathname || "").replace(/\/+$/, "")) {
        startProgress();
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      if (timerRef.current) clearInterval(timerRef.current);
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="top-loader-container"
      role="progressbar"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="top-loader-bar"
        style={{
          width: `${progress}%`,
        }}
      >
        <div className="top-loader-glow" />
      </div>
    </div>
  );
}
