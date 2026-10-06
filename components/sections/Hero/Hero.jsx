"use client";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { useContactModal } from "@/components/common/ContactModal/ContactModalContext";
import "./Hero.css";
export default function Hero() {
  const { open } = useContactModal();
  return (
    <section className="hero" aria-label="Hero">
      <div className="hero-stage">
        {/* ── Left content ──────────────────────────── */}
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-blue">Grow Faster</span>
            <span className="hero-title-mobile-break">
              <br />
            </span>
            <span className="hero-title-desktop-break"> </span>
            with Secure &amp;
            <br />
            Scalable Payments
          </h1>

          <p className="hero-desc">
            GateXPay helps businesses secure, process, and scale digital
            payments with advanced tokenization and unified payment
            infrastructure.
          </p>

          <div className="hero-actions">
            <button type="button" className="hero-cta" onClick={open}>
              <Phone size={20} className="hero-cta-icon" aria-hidden="true" />
              <span>Talk to an Expert</span>
            </button>
            <Link href="/services" className="hero-more">
              <span>Know More</span>
              <span className="hero-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* ── Right visual (blue shape + devices) ──── */}
        <div className="hero-visual">
          {/* Ellipse 2 SVG Background */}
          <Image
            src="/assets/images/Ellipse%202.svg"
            alt=""
            aria-hidden="true"
            width={783}
            height={571}
            className="hero-glow-shape"
          />
          <div className="hero-device hero-device--ipad">
            <Image
              src="/assets/images/hero-ipad.png"
              alt="GateXPay payment dashboard on tablet"
              width={900}
              height={840}
              draggable={false}
              className="hero-device-img hero-device-img--ipad"
            />
          </div>
          <div className="hero-device hero-device--iphone">
            <Image
              src="/assets/images/hero-iphone.png"
              alt="GateXPay payment dashboard on mobile"
              width={700}
              height={1265}
              priority
              draggable={false}
              className="hero-device-img hero-device-img--iphone"
            />
          </div>
          <div className="hero-device hero-device--macbook">
            <Image
              src="/assets/images/hero-macbook.png"
              alt="GateXPay payment dashboard on laptop"
              width={1600}
              height={1199}
              priority
              draggable={false}
              className="hero-device-img hero-device-img--macbook"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
