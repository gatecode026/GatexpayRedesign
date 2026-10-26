"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * BlankLinkHandler
 *
 * Intercepts clicks on empty, blank, or placeholder links (e.g. href="#", href="",
 * href="javascript:void(0)", or missing href) across the website and redirects the
 * user cleanly to the /404 page, while preserving valid section hash anchors
 * (e.g. href="#team" or href="/about#why-gatexpay").
 */
export default function BlankLinkHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Find the clicked link if any
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      
      // Check if href is blank or placeholder
      const isBlank =
        rawHref === null ||
        rawHref === "" ||
        rawHref === "#" ||
        rawHref === "/#" ||
        rawHref.trim() === "" ||
        rawHref.startsWith("javascript:void(0)") ||
        rawHref.startsWith("javascript:;");

      if (isBlank) {
        e.preventDefault();
        e.stopPropagation();
        router.push("/404");
      }
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [router]);

  return null;
}
