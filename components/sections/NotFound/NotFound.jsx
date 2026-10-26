"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="nf-section">
      <div className="nf-container">

        {/* Breadcrumb */}
        <nav className="nf-breadcrumb" aria-label="Breadcrumb">
          <Link href="/" className="nf-bc-link">Home</Link>
          <ChevronRight size={16} className="nf-bc-sep" aria-hidden="true" />
          <span className="nf-bc-current">404</span>
        </nav>

        {/* Two-column layout */}
        <div className="nf-grid">

          {/* LEFT — text content */}
          <div className="nf-content">
            {/* Giant 404 */}
            <span className="nf-code" aria-hidden="true">404</span>

            {/* Heading */}
            <h1 className="nf-title">Page Not Found</h1>

            {/* Description */}
            <p className="nf-desc">
              The page you&apos;re looking for may have been moved, deleted, or
              is no longer available. Let&apos;s get you back on track.
            </p>

            {/* CTA row */}
            <div className="nf-actions">
              <Link href="/" className="nf-btn-primary">
                Back to Home
              </Link>
              <Link href="/services" className="nf-link-text">
                Explore All Services
                <ArrowRight size={18} aria-hidden="true" className="nf-arrow" />
              </Link>
            </div>

            {/* Support line */}
            <div className="nf-support">
              <span className="nf-support-label">Still need help?</span>
              <Link href="/contact" className="nf-link-contact">
                Contact Us
                <ArrowRight size={14} aria-hidden="true" className="nf-arrow-sm" />
              </Link>
            </div>
          </div>

          {/* RIGHT — illustration image */}
          <div className="nf-visual">
            <Image
              src="/assets/images/404-illustration.jpg"
              alt="404 page not found illustration showing a person searching"
              width={560}
              height={420}
              priority
              className="nf-illustration-img"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
