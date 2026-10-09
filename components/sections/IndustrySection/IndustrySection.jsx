"use client";
import Image from "next/image";
import { useState, useEffect, useRef, useSyncExternalStore, useCallback } from "react";
import "./IndustrySection.css";

function subscribeReducedMotion(callback) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}
const TABS = [
  "Real Estate",
  "Travel & Tourism",
  "Startups",
  "Insurance",
  "Fintech",
  "Banking",
  "Education",
  "IT & Software",
  "Health Care",
  "E-Commerce",
];
const INDUSTRY_DATA = {
  "Real Estate": {
    img: "/assets/images/card-real-estate.jpg",
    tag: "Real Estate",
    title: "Digitize property transactions and streamline rent collections.",
    useCases: [
      "Automate monthly rent and society maintenance collections via payment links.",
      "Provide instant access to home loan and credit services for prospective buyers.",
      "Manage property portfolios and tenant data through custom business automation.",
    ],
    pills: [
      "All Payment Services",
      "Loan & Credit Services",
      "Business Automation",
    ],
  },
  "Travel & Tourism": {
    img: "/assets/images/card-travel.jpg",
    tag: "Travel & Tourism",
    title: "Unified booking engines and secure global payment routing.",
    useCases: [
      "Power your travel portal with robust domestic and international booking APIs.",
      "Process high-value travel transactions securely with tokenization.",
      "Equip local travel agents with AEPS and fund transfer tools to serve walk-in clients.",
    ],
    pills: [
      "Travel Services",
      "E - Commerce Bookings",
      "Domestic Money Transfer",
    ],
  },
  Startups: {
    img: "/assets/images/card-startups.jpg",
    tag: "Startups",
    title: "Launch fast with infrastructure built for high-growth startups.",
    useCases: [
      "Access banking APIs, payment rails, and compliance tooling from day one.",
      "Build and scale modern financial products without a full banking license.",
      "Automate vendor payouts, investor disbursements, and employee payroll seamlessly.",
    ],
    pills: ["Banking APIs", "Payment Rails", "Compliance Tooling"],
  },
  Insurance: {
    img: "/assets/images/card-insurance.jpg",
    tag: "Insurance",
    title: "Automate policy premium collections and instant claim payouts.",
    useCases: [
      "Enable recurring auto-debit for insurance premiums across UPI and cards.",
      "Facilitate instant claim settlements directly into verified bank accounts.",
      "Streamline insurance agent commissions with real-time automated disbursements.",
    ],
    pills: ["Recurring Payments", "Instant Settlements", "Policy APIs"],
  },
  Fintech: {
    img: "/assets/images/card-fintech.jpg",
    tag: "Fintech",
    title:
      "Build compliant financial products with high-throughput banking rails.",
    useCases: [
      "Integrate virtual accounts, multi-party payout routing, and automated ledgering.",
      "Comply with regulatory standards using integrated KYC and AML infrastructure.",
      "Deploy custom neo-banking wallets and smart corporate prepaid cards.",
    ],
    pills: ["Virtual Accounts", "Smart Payouts", "KYC & Compliance"],
  },
  Banking: {
    img: "/assets/images/card-banking.jpg",
    tag: "Banking",
    title: "Modernize transaction processing with enterprise payment gateways.",
    useCases: [
      "Support sub-second interbank transfers with 99.999% system availability.",
      "Provide secure card issuance and omnichannel payment acceptance.",
      "Enable instant account reconciliation with automated clearing switch feeds.",
    ],
    pills: ["Core Banking Rails", "Card Issuance", "Omnichannel Switch"],
  },
  Education: {
    img: "/assets/images/card-education.jpg",
    tag: "Education",
    title: "Streamline campus fee collection and student payment experiences.",
    useCases: [
      "Collect tuition fees through flexible multi-option EMI and payment plans.",
      "Automate fee reconciliation across diverse campuses and academic departments.",
      "Issue smart campus cards for dining, library access, and retail facilities.",
    ],
    pills: ["Fee Management", "Campus Payments", "Auto-Reconcile"],
  },
  "IT & Software": {
    img: "/assets/images/card-it-software.jpg",
    tag: "IT & Software",
    title:
      "Scale SaaS & digital platforms with global subscription infrastructure.",
    useCases: [
      "Manage metered, tiered, and recurring billing models seamlessly.",
      "Accept global payments with intelligent routing and high success rates.",
      "Automate webhooks, telemetry reporting, and developer-first API flows.",
    ],
    pills: ["Subscription Billing", "Usage Metering", "Webhooks & APIs"],
  },
  "Health Care": {
    img: "/assets/images/card-healthcare.jpg",
    tag: "Healthcare",
    title: "Simplify healthcare billing and patient payment experiences.",
    useCases: [
      "Integrate EMI-based payment plans for high-ticket medical procedures.",
      "Enable pharmacy billing and instant cashless insurance claim settlements.",
      "Offer contactless bedside payment collections via QR codes and payment links.",
    ],
    pills: ["EMI Plans", "Insurance Claims", "Pharmacy Billing"],
  },
  "E-Commerce": {
    img: "/assets/images/card-ecommerce.jpg",
    tag: "E-Commerce",
    title: "Maximize conversions with end-to-end e-commerce payment flows.",
    useCases: [
      "Offer every payment method from UPI AutoPay to domestic and international cards.",
      "Reduce cart abandonment with smart retry logic and real-time settlement.",
      "Accelerate cash flow with same-day T+0 automated merchant settlements.",
    ],
    pills: ["Payment Gateway", "UPI & Cards", "Instant Settlement"],
  },
};
const STACK_KEYS = TABS;
const STACK_PEEK_PX = 8;
function IndustryCardBody({ data, sizes }) {
  return (
    <>
      <div className="industry-card-img-wrap">
        <Image
          src={data.img}
          alt={data.tag}
          fill
          loading="lazy"
          className="industry-card-img"
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes={sizes}
        />
      </div>
      <div className="industry-card-content">
        <div className="industry-card-head">
          <span className="industry-card-label">{data.tag}</span>
          <h3 className="industry-card-title">{data.title}</h3>
        </div>

        <div className="industry-card-block">
          <span className="industry-card-label">Use Cases</span>
          <div className="industry-card-usecases">
            {data.useCases.map((uc) => (
              <p key={uc}>{uc}</p>
            ))}
          </div>
        </div>

        <div className="industry-card-block">
          <span className="industry-card-label">Powered By</span>
          <div className="industry-card-pills">
            {data.pills.map((pill) => (
              <span key={pill} className="industry-pill">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
// Smoothstep easing: 0 velocity at endpoints for fluid, jitter-free motion
const ease = (v) => {
  const clamped = Math.min(Math.max(v, 0), 1);
  return clamped * clamped * (3 - 2 * clamped);
};

export default function IndustrySection() {
  const [active, setActive] = useState("Real Estate");
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef(null);
  const sentinelRef = useRef(null);
  const tabsScrollRef = useRef(null);
  const tabsWrapRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("in-view", e.isIntersecting)
        ),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  // Dynamically sync tabs wrap height to CSS variable --industry-tabs-h
  useEffect(() => {
    const updateTabsHeight = () => {
      const tabsEl = tabsWrapRef.current;
      const sectionEl = ref.current;
      if (!tabsEl || !sectionEl) return;
      const h = tabsEl.getBoundingClientRect().height;
      sectionEl.style.setProperty("--industry-tabs-h", `${Math.round(h)}px`);
    };
    updateTabsHeight();
    window.addEventListener("resize", updateTabsHeight);
    return () => window.removeEventListener("resize", updateTabsHeight);
  }, [isSticky]);

  // ── Strict 3-Card Stacked Showcase ──
  const stackWrapRef = useRef(null);
  const stackStickyRef = useRef(null);
  const stackCardRefs = useRef([]);
  const lastActiveIndexRef = useRef(0);
  const [stackActiveIndex, setStackActiveIndex] = useState(0);
  const [wrapHeightPx, setWrapHeightPx] = useState(null);
  const [stageHeight, setStageHeight] = useState(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Continuous physical stacking animation strictly controlled by scroll progress p
  const applyStackPositions = useCallback((p) => {
    const cards = stackCardRefs.current;
    const n = STACK_KEYS.length;
    if (!cards || cards.length === 0) return;

    const clampedP = Math.min(Math.max(p, 0), n - 1);

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isTablet =
      typeof window !== "undefined" &&
      window.innerWidth >= 768 &&
      window.innerWidth < 1024;

    const yStep = isMobile ? 10 : isTablet ? 13 : 16;
    const enterY = isMobile ? 40 : isTablet ? 48 : 56;
    const targetBehind2Y = 0;
    const targetBehind1Y = yStep;
    const targetActiveY = yStep * 2;

    const scaleSecond = isMobile ? 0.98 : isTablet ? 0.975 : 0.97;
    const scaleThird = isMobile ? 0.96 : isTablet ? 0.95 : 0.94;

    cards.forEach((card, idx) => {
      if (!card) return;

      // Stack progression strictly in [0, n - 1]
      const diff = clampedP - idx;

      if (diff < -1) {
        // 1. Future card: not yet entering
        card.style.opacity = "0";
        card.style.visibility = "hidden";
        card.style.zIndex = "0";
        card.style.pointerEvents = "none";
        card.style.transform = `translate3d(0, ${enterY}px, 0) scale(0.98)`;
      } else if (diff < 0) {
        // 2. Card entering into ACTIVE from below: diff in [-1, 0)
        const t = diff + 1;
        const e = ease(t);
        const y = enterY * (1 - e) + targetActiveY * e;
        const scale = 0.98 + 0.02 * e;
        const op = Math.min(1, e * 1.5);
        card.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
        card.style.opacity = op.toFixed(3);
        card.style.visibility = op > 0.01 ? "visible" : "hidden";
        card.style.zIndex = "40";
        card.style.pointerEvents = e >= 0.5 ? "auto" : "none";
      } else if (diff < 1) {
        // 3. Card is ACTIVE transitioning to FIRST BEHIND (peeking at top): diff in [0, 1)
        // t = 0 -> active at y = targetActiveY, scale = 1.0
        // t = 1 -> first behind at y = targetBehind1Y, scale = scaleSecond
        const t = diff;
        const e = ease(t);
        const y = targetActiveY * (1 - e) + targetBehind1Y * e;
        const scale = 1.0 - (1.0 - scaleSecond) * e;
        card.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
        card.style.opacity = "1";
        card.style.visibility = "visible";
        card.style.zIndex = "30";
        card.style.pointerEvents = e < 0.5 ? "auto" : "none";
      } else if (diff < 2) {
        // 4. Card is FIRST BEHIND transitioning to SECOND BEHIND (peeking higher at top): diff in [1, 2)
        // t = 0 -> y = targetBehind1Y, scale = scaleSecond
        // t = 1 -> y = targetBehind2Y, scale = scaleThird
        const t = diff - 1;
        const e = ease(t);
        const y = targetBehind1Y * (1 - e) + targetBehind2Y * e;
        const scale = scaleSecond - (scaleSecond - scaleThird) * e;
        card.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
        card.style.opacity = "1";
        card.style.visibility = "visible";
        card.style.zIndex = "20";
        card.style.pointerEvents = "none";
      } else if (diff < 3) {
        // 5. Card is SECOND BEHIND transitioning OUT of the stack: diff in [2, 3)
        const t = diff - 2;
        if (t < 0.75) {
          const eExit = ease(t / 0.75);
          const y = targetBehind2Y - 8 * eExit;
          const scale = scaleThird - 0.02 * eExit;
          const op = Math.max(0, 1 - eExit);
          card.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
          card.style.opacity = op.toFixed(3);
          card.style.visibility = op > 0.01 ? "visible" : "hidden";
          card.style.zIndex = "10";
          card.style.pointerEvents = "none";
        } else {
          card.style.opacity = "0";
          card.style.visibility = "hidden";
          card.style.zIndex = "0";
          card.style.pointerEvents = "none";
          card.style.transform = `translate3d(0, ${targetBehind2Y - 8}px, 0) scale(${(scaleThird - 0.02).toFixed(3)})`;
        }
      } else {
        // 6. Old card: completely out of the visible stack
        card.style.opacity = "0";
        card.style.visibility = "hidden";
        card.style.zIndex = "0";
        card.style.pointerEvents = "none";
      }
    });
  }, []);

  // Dynamically compute exact stage height and enforce uniform card minHeight
  useEffect(() => {
    const updateStageHeight = () => {
      const cards = stackCardRefs.current;
      if (!cards || cards.length === 0) return;
      // Reset any inline minHeight before measuring natural content
      cards.forEach((card) => {
        if (card) card.style.minHeight = "";
      });
      let maxH = 0;
      cards.forEach((card) => {
        if (card && card.offsetHeight > maxH) {
          maxH = card.offsetHeight;
        }
      });
      if (maxH > 0) {
        // Enforce identical minHeight on every card so behind cards never stick out at the bottom
        cards.forEach((card) => {
          if (card) card.style.minHeight = `${maxH}px`;
        });
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        const yStep = isMobile ? 10 : isTablet ? 13 : 16;
        const activeY = yStep * 2;
        // Exact height: tallest card + active Y offset + 4px breathing room
        setStageHeight(maxH + activeY + 4);
      }
    };

    updateStageHeight();
    window.addEventListener("resize", updateStageHeight);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(updateStageHeight);
    }
    return () => window.removeEventListener("resize", updateStageHeight);
  }, []);

  // Measure and set track scroll height: 1000px per card transition (half speed, slow & smooth)
  useEffect(() => {
    if (reducedMotion) return;
    const updateWrapHeight = () => {
      const stickyH =
        stackStickyRef.current?.getBoundingClientRect().height ?? 460;
      // 1000px per card transition (2x slower than original 500px)
      setWrapHeightPx((STACK_KEYS.length - 1) * 1000 + stickyH);
    };
    updateWrapHeight();
    window.addEventListener("resize", updateWrapHeight);
    return () => window.removeEventListener("resize", updateWrapHeight);
  }, [reducedMotion, stageHeight]);

  // Sticky tabs bar detection
  useEffect(() => {
    const sentinel = sentinelRef.current;
    const sectionEl = ref.current;
    if (!sentinel || !sectionEl) return;
    let rafId = null;
    const updateSticky = () => {
      rafId = null;
      const sRect = sentinel.getBoundingClientRect();
      const secRect = sectionEl.getBoundingClientRect();
      const inside = sRect.top <= 80 && secRect.bottom > 80;
      setIsSticky(inside);
      if (typeof document !== "undefined") {
        if (inside) {
          document.body.classList.add("in-industry-section");
        } else {
          document.body.classList.remove("in-industry-section");
          document.body.classList.remove("navbar--hidden");
        }
      }
    };
    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(updateSticky);
    };
    updateSticky();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (typeof document !== "undefined") {
        document.body.classList.remove("in-industry-section");
        document.body.classList.remove("navbar--hidden");
      }
    };
  }, []);

  // Scroll listener: links scroll progress to strictly 3 visible cards
  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;

    const wrap = stackWrapRef.current;
    const sticky = stackStickyRef.current;
    if (!wrap || !sticky) return;

    applyStackPositions(0);

    let rafId = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = wrap.getBoundingClientRect();
        const stickyH = sticky.getBoundingClientRect().height;
        const scrollDistance = wrap.offsetHeight - stickyH;
        if (scrollDistance <= 0) return;

        const isNavHidden =
          typeof document !== "undefined" &&
          document.body.classList.contains("navbar--hidden");
        const navH = isNavHidden ? 0 : 80;
        const tabsH = tabsWrapRef.current?.getBoundingClientRect().height ?? 128;
        const stickyTop = navH + tabsH + 24;

        const scrolled = stickyTop - rect.top;
        const normalized = Math.min(Math.max(scrolled / scrollDistance, 0), 1);
        const p = normalized * (STACK_KEYS.length - 1);

        applyStackPositions(p);

        const roundedIdx = Math.min(Math.round(p), STACK_KEYS.length - 1);
        if (roundedIdx !== lastActiveIndexRef.current) {
          lastActiveIndexRef.current = roundedIdx;
          setStackActiveIndex(roundedIdx);
          setActive(STACK_KEYS[roundedIdx]);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, applyStackPositions]);

  // Keep active tab centered in horizontal scroll
  useEffect(() => {
    const scrollEl = tabsScrollRef.current;
    if (!scrollEl) return;
    const activeTab = scrollEl.querySelector(".industry-tab.active");
    if (activeTab) {
      const scrollLeft =
        activeTab.offsetLeft -
        scrollEl.offsetWidth / 2 +
        activeTab.offsetWidth / 2;
      scrollEl.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [active]);

  const handleTabClick = (tab) => {
    setActive(tab);
    const idx = STACK_KEYS.indexOf(tab);
    if (idx === -1) return;
    setStackActiveIndex(idx);
    lastActiveIndexRef.current = idx;
    applyStackPositions(idx);

    const wrap = stackWrapRef.current;
    const sticky = stackStickyRef.current;
    if (!wrap || !sticky) return;
    const rect = wrap.getBoundingClientRect();
    const stickyH = sticky.getBoundingClientRect().height;
    const scrollDistance = wrap.offsetHeight - stickyH;
    const isNavHidden =
      typeof document !== "undefined" &&
      document.body.classList.contains("navbar--hidden");
    const navH = isNavHidden ? 0 : 80;
    const tabsH = tabsWrapRef.current?.getBoundingClientRect().height ?? 128;
    const stickyTop = navH + tabsH + 24;

    const targetNormalized = idx / (STACK_KEYS.length - 1);
    const targetScrollY =
      window.scrollY + rect.top - stickyTop + targetNormalized * scrollDistance;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <section className="industry-section section" id="industries" ref={ref}>
      {/* Sentinel to toggle sticky state when top hits navbar */}
      <div ref={sentinelRef} className="industry-sticky-sentinel" />

      {/* Sticky Header + Tabs Bar */}
      <div
        ref={tabsWrapRef}
        className={`industry-tabs-sticky-wrap ${isSticky ? "is-sticky" : ""}`}
      >
        <div className="container container--page">
          <h2 className="industry-heading reveal">
            Infrastructure Built for Your Industry
          </h2>
          <nav className="industry-tabs" aria-label="Industries We Offer">
            <span className="industry-tabs-label">Industries We Offer:</span>
            <div className="industry-tabs-scroll" ref={tabsScrollRef}>
              {STACK_KEYS.map((tab, idx) => (
                <div key={tab} className="industry-tab-item">
                  <button
                    type="button"
                    aria-current={active === tab ? "true" : undefined}
                    className={`industry-tab ${active === tab ? "active" : ""}`}
                    onClick={() => handleTabClick(tab)}
                  >
                    <span className="industry-tab-text">{tab}</span>
                  </button>
                  {idx < STACK_KEYS.length - 1 && (
                    <span className="industry-tab-divider" aria-hidden="true">
                      |
                    </span>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className="container container--page">
        {reducedMotion ? (
          <div className="industry-stack-static">
            {STACK_KEYS.map((key) => (
              <div key={key} className="industry-card">
                <IndustryCardBody data={INDUSTRY_DATA[key]} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="industry-stack-wrap"
            ref={stackWrapRef}
            style={{
              height:
                wrapHeightPx != null
                  ? `${wrapHeightPx}px`
                  : `${(STACK_KEYS.length - 1) * 1000 + 600}px`,
            }}
          >
            <div className="industry-stack-sticky" ref={stackStickyRef}>
              <div
                className="industry-stack-stage"
                style={stageHeight ? { height: `${stageHeight}px` } : undefined}
              >
                {STACK_KEYS.map((key, i) => (
                  <div
                    key={key}
                    ref={(el) => {
                      stackCardRefs.current[i] = el;
                    }}
                    className="industry-card industry-stack-card"
                    style={{
                      zIndex: i === 0 ? 30 : 0,
                      opacity: i === 0 ? 1 : 0,
                      visibility: i === 0 ? "visible" : "hidden",
                      transform:
                        i === 0
                          ? "translate3d(0, 32px, 0) scale(1)"
                          : "translate3d(0, 56px, 0) scale(0.98)",
                    }}
                    aria-hidden={key !== active}
                  >
                    <IndustryCardBody data={INDUSTRY_DATA[key]} />
                  </div>
                ))}
              </div>

              <div className="industry-stack-dots" aria-hidden="true">
                {STACK_KEYS.map((key, i) => (
                  <span
                    key={key}
                    className={`industry-stack-dot ${i === stackActiveIndex ? "active" : ""}`}
                    onClick={() => handleTabClick(key)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
