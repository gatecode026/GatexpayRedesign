"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { useContactModal } from "@/components/common/ContactModal/ContactModalContext";
import HeroStats from "./HeroStats";
export default function AboutHero() {
  const { open: openContactModal } = useContactModal();
  return (
    <section className="about-hero-section" aria-label="Hero Section">
      {/* Ambient background glows */}
      <div className="about-hero-glow-1" aria-hidden="true" />
      <div className="about-hero-glow-2" aria-hidden="true" />

      <div className="about-container about-hero-inner">
        <div className="about-hero-top">
          <div className="about-hero-content">
            <h1 className="about-hero-title">
              Powering <span className="text-highlight">Next-Gen</span>
              <br />
              Fintech Ecosystem in <span className="text-highlight">India</span>
            </h1>

            <p className="about-hero-desc">
              We build the streaming, scalable, and compliant digital
              infrastructure that modern fintech companies, banks, and
              enterprises rely on to power seamless operations.
            </p>

            <div className="about-hero-actions">
              <button
                type="button"
                className="about-btn-primary"
                onClick={openContactModal}
                aria-label="Talk to an Expert"
              >
                <Phone size={16} aria-hidden="true" />
                <span>Talk to an Expert</span>
              </button>

              <Link
                href="/solutions"
                className="about-btn-secondary"
                aria-label="Explore Our Solutions"
              >
                <span>Explore Our Solutions</span>
                <ArrowRight className="arrow-icon" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Hero Artwork */}
          <div className="about-hero-artwork-wrapper">
            <Image
              src="/assets/about_us/images/img_006e26915c.png"
              alt="GateXPay Next-Gen Fintech Infrastructure"
              width={584}
              height={876}
              sizes="(max-width: 768px) 100vw, 584px"
              priority
              className="about-hero-artwork-img"
            />
          </div>
        </div>

        {/* Floating Stats Card overlapping bottom */}
        <HeroStats />
      </div>
    </section>
  );
}
