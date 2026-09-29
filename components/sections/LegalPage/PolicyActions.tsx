"use client";

import { useState } from "react";
import { Printer, Copy, Check, Mail, ExternalLink } from "lucide-react";

export default function PolicyActions({
  policyTitle,
  canonicalSlug,
}: {
  policyTitle: string;
  canonicalSlug: string;
}) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopy = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback if clipboard API is restricted
      }
    }
  };

  return (
    <div className="policy-actions-bar">
      <div className="policy-actions-group">
        <button
          type="button"
          onClick={handlePrint}
          className="policy-action-btn"
          title="Print or Save PDF"
          aria-label="Print policy"
        >
          <Printer size={15} />
          <span>Print / PDF</span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="policy-action-btn"
          title="Copy official policy URL"
          aria-label="Copy link"
        >
          {copied ? (
            <>
              <Check size={15} className="text-success" />
              <span className="text-success">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={15} />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>

      <div className="policy-actions-support">
        <a
          href="mailto:info@gatexpay.in?subject=Policy%20Inquiry%3A%20"
          className="policy-action-support-link"
        >
          <Mail size={14} />
          <span>info@gatexpay.in</span>
        </a>
      </div>
    </div>
  );
}
