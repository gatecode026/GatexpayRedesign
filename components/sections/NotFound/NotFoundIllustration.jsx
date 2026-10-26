"use client";

import React from "react";

/**
 * NotFoundIllustration
 *
 * Pixel-matched to the reference image:
 * - Light blue circular background wash
 * - Person at desk working on laptop (right side of scene)
 * - Large central browser window with magnifying glass + "?" 
 * - Dashed curved connection lines
 * - 4 floating mini-cards: User profile, Globe, Bank/pillars, Shopping cart
 * - Paper airplane (top right)
 * - Potted plant (bottom left)
 * - Desk surface line
 * ViewBox: 0 0 580 420
 */
export default function NotFoundIllustration({ className = "" }) {
  return (
    <div className={`not-found-illustration-wrapper ${className}`}>
      <svg
        viewBox="0 0 580 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="not-found-illustration-svg"
        aria-hidden="true"
      >
        <defs>
          {/* Blue gradient for elements */}
          <linearGradient id="nf-blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Lens fill */}
          <linearGradient id="nf-lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.6" />
          </linearGradient>

          {/* Background circle gradient */}
          <radialGradient id="nf-bgCircle" cx="60%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#F0F9FF" />
          </radialGradient>

          {/* Card shadow */}
          <filter id="nf-cardShadow" x="-12%" y="-12%" width="135%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.08" />
          </filter>
          <filter id="nf-floatShadow" x="-15%" y="-15%" width="145%" height="150%">
            <feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="#0284C7" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* ── Background soft circle ── */}
        <ellipse cx="340" cy="210" rx="230" ry="210" fill="url(#nf-bgCircle)" />

        {/* ── Dashed connection lines (from browser outward) ── */}
        <g stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="5 5" strokeLinecap="round">
          {/* to user card (top-left of browser) */}
          <path d="M 285 140 C 270 100, 265 75, 260 60" />
          {/* to plane (top-right) */}
          <path d="M 360 125 C 380 90, 420 65, 450 50" />
          {/* to globe card (right) */}
          <path d="M 410 160 C 435 150, 450 155, 465 158" />
          {/* to bank card (right-mid) */}
          <path d="M 410 200 C 435 200, 450 202, 465 202" />
          {/* to cart card (right-bottom) */}
          <path d="M 405 238 C 430 245, 450 250, 465 252" />
        </g>

        {/* ── Desk surface ── */}
        <line x1="100" y1="340" x2="530" y2="340" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

        {/* ══════════════════════════════════════════════════════════
            CENTRAL BROWSER WINDOW
        ══════════════════════════════════════════════════════════ */}
        <g filter="url(#nf-cardShadow)">
          {/* Main browser card */}
          <rect x="240" y="120" width="175" height="180" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

          {/* Top bar */}
          <rect x="240" y="120" width="175" height="34" rx="14" fill="#F8FAFC" />
          <rect x="240" y="140" width="175" height="14" fill="#F8FAFC" />

          {/* Window controls */}
          <circle cx="257" cy="137" r="4" fill="#EF4444" opacity="0.8" />
          <circle cx="269" cy="137" r="4" fill="#F59E0B" opacity="0.8" />
          <circle cx="281" cy="137" r="4" fill="#10B981" opacity="0.8" />

          {/* Separator line */}
          <line x1="240" y1="154" x2="415" y2="154" stroke="#E2E8F0" strokeWidth="1.5" />

          {/* Faint content lines */}
          <rect x="255" y="165" width="60" height="4" rx="2" fill="#E2E8F0" />
          <rect x="255" y="175" width="42" height="4" rx="2" fill="#F1F5F9" />
          <rect x="255" y="265" width="140" height="4" rx="2" fill="#E2E8F0" />
          <rect x="255" y="275" width="100" height="4" rx="2" fill="#F1F5F9" />
          <rect x="255" y="285" width="120" height="4" rx="2" fill="#E8F0FE" />

          {/* ── Magnifying Glass ── */}
          {/* Lens */}
          <circle cx="327" cy="210" r="36" fill="url(#nf-lensGrad)" stroke="#1E293B" strokeWidth="2.5" />
          {/* Inner glow ring */}
          <circle cx="327" cy="210" r="29" fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity="0.4" />
          {/* "?" text */}
          <text
            x="327"
            y="222"
            textAnchor="middle"
            fontFamily="'Poppins', sans-serif"
            fontSize="30"
            fontWeight="700"
            fill="#0284C7"
          >?</text>
          {/* Handle outer (blue) */}
          <path d="M 354 233 L 378 257" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" />
          {/* Handle inner (dark) */}
          <path d="M 354 233 L 378 257" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* ══════════════════════════════════════════════════════════
            PERSON AT DESK (right side)
        ══════════════════════════════════════════════════════════ */}
        <g>
          {/* Chair back */}
          <path
            d="M 480 338 L 480 295 Q 480 278 490 278"
            stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none"
          />

          {/* Torso / shirt (blue) */}
          <path
            d="M 492 340 L 492 288 C 492 265, 518 258, 532 268 L 548 340 Z"
            fill="#2563EB" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round"
          />

          {/* Shirt collar detail */}
          <path d="M 520 263 L 528 275 L 536 264" fill="#1D4ED8" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />

          {/* Arm typing */}
          <path d="M 506 290 C 522 304, 548 316, 564 319" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Forearm/hand */}
          <path
            d="M 554 318 L 572 324 Q 576 324 574 328 L 562 330"
            fill="#F1E8D8" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round"
          />

          {/* Neck */}
          <rect x="521" y="250" width="14" height="16" rx="3" fill="#F1E8D8" stroke="#1E293B" strokeWidth="1.5" />

          {/* Head */}
          <ellipse cx="527" cy="238" rx="16" ry="18" fill="#F1E8D8" stroke="#1E293B" strokeWidth="1.5" />

          {/* Hair */}
          <path
            d="M 511 235 C 511 220, 520 212, 532 212 C 542 212, 547 217, 545 225 C 540 221, 534 220, 527 224 C 521 229, 514 234, 511 235 Z"
            fill="#1E293B"
          />

          {/* Eye */}
          <circle cx="537" cy="233" r="1.5" fill="#1E293B" />

          {/* Laptop base */}
          <polygon points="555,330 598,330 590,340 547,340" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />

          {/* Laptop screen */}
          <polygon points="561,288 598,288 592,330 555,330" fill="#EFF6FF" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />

          {/* Screen glow dot */}
          <circle cx="577" cy="310" r="4" fill="#38BDF8" opacity="0.6" />

          {/* Legs */}
          <path d="M 510 340 L 512 380 L 528 380 L 526 340" fill="#1E293B" stroke="#1E293B" strokeWidth="0.5" />
          <path d="M 534 340 L 536 380 L 552 380 L 548 340" fill="#1E293B" stroke="#1E293B" strokeWidth="0.5" />

          {/* Shoes */}
          <ellipse cx="520" cy="381" rx="12" ry="5" fill="#0F172A" />
          <ellipse cx="543" cy="381" rx="12" ry="5" fill="#0F172A" />
        </g>

        {/* ── Speech bubble ── */}
        <g className="not-found-float--bubble">
          <path
            d="M 495 252 C 495 244, 502 238, 511 238 C 520 238, 527 244, 527 252 C 527 260, 520 266, 511 266 C 508 266, 505 265, 503 263 L 498 268 L 499 261 C 496 259, 495 256, 495 252 Z"
            fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round"
          />
          <circle cx="506" cy="252" r="1.8" fill="#0284C7" />
          <circle cx="511" cy="252" r="1.8" fill="#0284C7" />
          <circle cx="516" cy="252" r="1.8" fill="#0284C7" />
        </g>

        {/* ══════════════════════════════════════════════════════════
            POTTED PLANT (bottom left)
        ══════════════════════════════════════════════════════════ */}
        <g transform="translate(108, 266)">
          {/* Leaves */}
          <path d="M 22 44 C 18 25, 6 14, -4 20 C 1 30, 14 40, 20 46 Z" fill="#38BDF8" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M 25 40 C 25 18, 34 5, 46 2 C 48 16, 38 30, 27 42 Z" fill="#0284C7" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M 20 48 C 10 38, 10 23, 2 27 C 5 37, 14 46, 18 50 Z" fill="#BAE6FD" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M 26 46 C 36 33, 48 27, 56 33 C 49 43, 37 48, 28 51 Z" fill="#00C0FD" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Stem */}
          <line x1="25" y1="50" x2="25" y2="58" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          {/* Pot */}
          <polygon points="10,58 40,58 36,78 14,78" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
          <line x1="8" y1="58" x2="42" y2="58" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* ══════════════════════════════════════════════════════════
            FLOATING CARDS
        ══════════════════════════════════════════════════════════ */}

        {/* Card 1: User Profile (top-left area) */}
        <g className="not-found-float--1" transform="translate(216, 42)" filter="url(#nf-floatShadow)">
          <rect x="0" y="0" width="52" height="44" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* User head */}
          <circle cx="26" cy="16" r="7" stroke="#1E293B" strokeWidth="1.5" fill="#FFFFFF" />
          {/* User body arc */}
          <path d="M 14 38 C 14 30, 19 28, 26 28 C 33 28, 38 30, 38 38" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Blue badge */}
          <circle cx="43" cy="8" r="7" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M 43 5 L 43 11 M 40 8 L 46 8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Paper Airplane (top-right floating) */}
        <g className="not-found-float--airplane" transform="translate(448, 34)">
          <path d="M 0 16 L 36 0 L 22 30 L 16 18 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M 36 0 L 16 18" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 16 18 L 20 27 L 24 21" fill="#DBEAFE" stroke="#1E293B" strokeWidth="1.2" strokeLinejoin="round" />
        </g>

        {/* Card 3: Globe (right side, top) */}
        <g className="not-found-float--2" transform="translate(460, 114)" filter="url(#nf-floatShadow)">
          <rect x="0" y="0" width="50" height="42" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="25" cy="21" r="11" stroke="#1E293B" strokeWidth="1.5" fill="#EFF6FF" />
          <line x1="14" y1="21" x2="36" y2="21" stroke="#38BDF8" strokeWidth="1.5" />
          <ellipse cx="25" cy="21" rx="5.5" ry="11" stroke="#1E293B" strokeWidth="1.3" fill="none" />
          <path d="M 14 15 Q 25 17 36 15" stroke="#94A3B8" strokeWidth="1" fill="none" />
          <path d="M 14 27 Q 25 25 36 27" stroke="#94A3B8" strokeWidth="1" fill="none" />
        </g>

        {/* Card 4: Bank / Pillars (right side, mid) */}
        <g className="not-found-float--3" transform="translate(460, 175)" filter="url(#nf-floatShadow)">
          <rect x="0" y="0" width="50" height="42" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Pediment */}
          <polygon points="14,18 25,10 36,18" fill="#DBEAFE" stroke="#1E293B" strokeWidth="1.3" strokeLinejoin="round" />
          {/* Architrave */}
          <line x1="12" y1="19" x2="38" y2="19" stroke="#1E293B" strokeWidth="1.5" />
          {/* 3 pillars */}
          <line x1="17" y1="21" x2="17" y2="31" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="25" y1="21" x2="25" y2="31" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="33" y1="21" x2="33" y2="31" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
          {/* Base */}
          <line x1="12" y1="33" x2="38" y2="33" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Card 5: Shopping Cart (right side, bottom) */}
        <g className="not-found-float--4" transform="translate(460, 236)" filter="url(#nf-floatShadow)">
          <rect x="0" y="0" width="50" height="42" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Cart */}
          <path
            d="M 12 13 L 16 13 L 20 25 L 34 25 L 38 17 L 19 17"
            stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
          />
          {/* Wheels */}
          <circle cx="22" cy="30" r="2.5" fill="#38BDF8" stroke="#1E293B" strokeWidth="1.2" />
          <circle cx="31" cy="30" r="2.5" fill="#38BDF8" stroke="#1E293B" strokeWidth="1.2" />
        </g>

      </svg>
    </div>
  );
}
