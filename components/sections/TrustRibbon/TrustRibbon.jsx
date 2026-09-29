"use client";
import Image from "next/image";
import "./TrustRibbon.css";
// Real brand logo assets (not CSS/text recreations).
const BRANDS = [
  {
    name: "Paytm",
    src: "/assets/images/Paytm_Logo_(standalone)%20logo.svg",
    width: 204,
    height: 64,
  },
  {
    name: "Google",
    src: "/assets/images/Google%20logo.svg",
    width: 175,
    height: 64,
  },
  {
    name: "Netflix",
    src: "/assets/images/new-icon-f58794.svg",
    width: 234,
    height: 64,
  },
  {
    name: "Figma",
    src: "/assets/images/new-icon-0c9cf7.svg",
    width: 128,
    height: 64,
  },
  {
    name: "Amazon",
    src: "/assets/images/new-icon-1e264d.svg",
    width: 212,
    height: 64,
  },
  {
    name: "Microsoft",
    src: "/assets/images/new-icon-1f3e9a.svg",
    width: 217.841,
    height: 46.626,
  },
];
export default function TrustRibbon() {
  return (
    <div className="trust-ribbon" aria-label="Trusted by leading brands">
      <div className="trust-track" aria-hidden="true">
        {/* Duplicated once for a seamless infinite loop */}
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <Image
            key={`${brand.name}-${i}`}
            src={brand.src}
            alt={brand.name}
            width={brand.width}
            height={brand.height}
            className="trust-logo"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
