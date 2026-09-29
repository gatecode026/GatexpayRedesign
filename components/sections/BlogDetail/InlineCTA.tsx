"use client";

import { useContactModal } from "@/components/common/ContactModal/ContactModalContext";

export default function InlineCTA() {
  const { open } = useContactModal();

  return (
    <div className="article-inline-cta">
      <div className="inline-cta-content">
        <h3 className="inline-cta-heading">
          Need help structuring your PA-PG compliance roadmap?
        </h3>
        <p className="inline-cta-desc">
          Our regulatory specialists have guided 200+ merchants through PA licensing. Let&apos;s map
          your exact gaps.
        </p>
      </div>
      <button
        type="button"
        className="inline-cta-button"
        onClick={() => open()}
        id="book-consultation-btn"
      >
        Book a Consultation
      </button>
    </div>
  );
}
