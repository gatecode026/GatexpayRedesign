"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Phone, ShieldCheck, Lightbulb, Handshake } from "lucide-react";
import Container from "@/components/common/Container/Container";
import { useContactModal } from "@/components/common/ContactModal/ContactModalContext";
import "./CTASection.css";

const FEATURES = [
  { icon: ShieldCheck, bold: "Secure",       light: "& Compliant" },
  { icon: Lightbulb,   bold: "Innovative",   light: "& Efficient" },
  { icon: Handshake,   bold: "User-Friendly",light: "& Scalable"  },
];

interface CTASectionProps {
  /** Use the navbar's edges instead of the standard .container width. */
  alignToNavbar?: boolean;
}

export default function CTASection({ alignToNavbar = false }: CTASectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { open } = useContactModal();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("in-view", e.isIntersecting)),
      { threshold: 0.08 }
    );
    el.querySelectorAll(".reveal").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="cta-section" ref={ref}>
      <Container className={alignToNavbar ? "container--page" : undefined}>
        <div className="cta-card">

          {/* ── LEFT: text content ── */}
          <div className="cta-content reveal">
            <h2 className="cta-heading">
              Ready to scale your
              <br />
              <span className="cta-heading-cyan">payment infrastructure?</span>
            </h2>

            <p className="cta-desc">
              Get tailored CSP and TSP solutions designed to meet the exact
              technical requirements of your industry.
            </p>

            <button type="button" className="cta-btn" onClick={open}>
              <Phone size={20} strokeWidth={2} aria-hidden="true" />
              Talk to an Expert
            </button>

            <div className="cta-features">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={f.bold} className="cta-feature-group">
                    <div className="cta-feature">
                      <Icon size={28} strokeWidth={1.6} color="#FFFFFF" aria-hidden="true" />
                      <div className="cta-feature-text">
                        <span className="cta-feature-bold">{f.bold}</span>
                        <span className="cta-feature-light">{f.light}</span>
                      </div>
                    </div>
                    {i < FEATURES.length - 1 && (
                      <div className="cta-divider" aria-hidden="true" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: illustration — fills full card height, no crop ── */}
          <div className="cta-illustration-wrap" aria-hidden="true">
            <Image
              src="/assets/images/cta-chip-3d.png"
              alt="Payment infrastructure illustration"
              fill
              className="cta-illustration"
              sizes="(max-width: 767px) 100vw, (max-width: 1024px) 44vw, 600px"
              priority
            />
          </div>

        </div>
      </Container>
    </section>
  );
}
