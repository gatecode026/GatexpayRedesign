"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  Phone,
  ShieldCheck,
  Shield,
  Lightbulb,
  Handshake,
  Headphones,
  Layers,
  Network,
  Boxes,
  Workflow,
  FileText,
  Building2,
  Fingerprint,
} from "lucide-react";
import Container from "@/components/common/Container/Container";
import { useContactModal } from "@/components/common/ContactModal/ContactModalContext";
import { FormattedText } from "@/components/sections/ServiceDetail/ServiceDetailParts";
import "./CTASection.css";

const ICON_MAP = {
  shield: Shield,
  "shield-check": ShieldCheck,
  network: Network,
  boxes: Boxes,
  layers: Layers,
  headphones: Headphones,
  phone: Phone,
  lightbulb: Lightbulb,
  handshake: Handshake,
  workflow: Workflow,
  "file-text": FileText,
  "building-2": Building2,
  fingerprint: Fingerprint,
};

const DEFAULT_FEATURES = [
  { icon: ShieldCheck, bold: "Secure", light: "& Compliant" },
  { icon: Lightbulb, bold: "Innovative", light: "& Efficient" },
  { icon: Handshake, bold: "User-Friendly", light: "& Scalable" },
];

export default function CTASection({ alignToNavbar = false, customCta = null }) {
  const ref = useRef(null);
  const { open } = useContactModal();

  const titleLead = customCta?.titleLead ?? "Ready to scale your";
  const titleAccent = customCta?.titleAccent ?? "payment infrastructure?";
  const description =
    customCta?.description ??
    customCta?.subheading ??
    "Get tailored CSP and TSP solutions designed to meet the exact technical requirements of your industry.";
  const ctaLabel = customCta?.ctaLabel ?? "Talk to an Expert";

  const rawFeatures =
    customCta?.features ||
    customCta?.trustPoints?.map((tp) => ({
      icon: tp.icon || ShieldCheck,
      bold: tp.label,
      light: tp.desc,
    })) ||
    DEFAULT_FEATURES;

  const features = rawFeatures.map((f) => {
    let IconComponent = ShieldCheck;
    if (typeof f.icon === "string") {
      IconComponent = ICON_MAP[f.icon] || ShieldCheck;
    } else if (f.icon) {
      IconComponent = f.icon;
    }
    const cleanLight = f.light ? f.light.replace(/^[\s—–-]+/, "").trim() : "";
    return {
      ...f,
      light: cleanLight,
      icon: IconComponent,
    };
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("in-view", e.isIntersecting)
        ),
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
              {titleLead}
              <br />
              <span className="cta-heading-cyan">{titleAccent}</span>
            </h2>

            <p className="cta-desc">
              <FormattedText text={description} />
            </p>

            <div className="cta-actions-wrap">
              <button type="button" className="cta-btn" onClick={open}>
                <Phone size={20} strokeWidth={2} aria-hidden="true" />
                {ctaLabel}
              </button>
              {customCta?.secondaryAction && (
                <Link
                  href={customCta.secondaryAction.href}
                  className="cta-btn cta-btn--secondary"
                >
                  {customCta.secondaryAction.text}
                </Link>
              )}
            </div>

            <div className="cta-features">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={f.bold + f.light} className="cta-feature-group">
                    <div className="cta-feature">
                      <Icon
                        size={28}
                        strokeWidth={1.6}
                        color="#FFFFFF"
                        aria-hidden="true"
                      />
                      <div className="cta-feature-text">
                        <span className="cta-feature-bold">{f.bold}</span>
                        <span className="cta-feature-light">{f.light}</span>
                      </div>
                    </div>
                    {i < features.length - 1 && (
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
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
