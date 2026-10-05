"use client";
import Image from "next/image";
import { useState, useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";
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
export default function IndustrySection() {
  const [active, setActive] = useState("Real Estate");
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef(null);
  const sentinelRef = useRef(null);
  const tabsScrollRef = useRef(null);


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
  // ── Scroll-driven stacked card showcase (all 10 industries) ─────────────
  const stackWrapRef = useRef(null);
  const stackStickyRef = useRef(null);
  const stackCardRefs = useRef([]);
  const [stackActiveIndex, setStackActiveIndex] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [wrapHeightPx, setWrapHeightPx] = useState(null);
  useLayoutEffect(() => {
    if (reducedMotion) return;
    const measure = () => {
      const stickyH =
        stackStickyRef.current?.getBoundingClientRect().height ??
        window.innerHeight;
      setWrapHeightPx(STACK_KEYS.length * 620 + stickyH);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reducedMotion]);
  useEffect(() => {
    const wrap = stackWrapRef.current;
    const sentinel = sentinelRef.current;
    let rafId = null;
    let lastActiveIndex = -1;
    const update = () => {
      rafId = null;
      // Sticky state check: active when tabs sentinel reaches top threshold and section is still in view
      const sectionEl = ref.current;
      if (sentinel && sectionEl) {
        const sRect = sentinel.getBoundingClientRect();
        const secRect = sectionEl.getBoundingClientRect();
        setIsSticky(sRect.top <= 80 && secRect.bottom > 80);
      }
      if (reducedMotion || !wrap) return;
      const rect = wrap.getBoundingClientRect();
      const stickyHeight =
        stackStickyRef.current?.getBoundingClientRect().height ??
        window.innerHeight;
      const scrollable = rect.height - stickyHeight;
      const progress =
        scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
      const n = STACK_KEYS.length;
      // Map progress across n segments (transitions 0..n-1, plus final hold segment)
      const continuous = progress * n;
      // Active card index follows the card that is most dominant
      const activeIdx = Math.min(Math.round(continuous), n - 1);
      // When reaching the last card (index n-1), behind cards fade away completely
      // As Card 9 enters and settles (continuous 8.3 -> 9.0), lastCardFadeOut goes 0 -> 1
      const lastCardFadeOut =
        continuous >= n - 1.7
          ? Math.min(Math.max((continuous - (n - 1.7)) / 0.7, 0), 1)
          : 0;
      stackCardRefs.current.forEach((card, i) => {
        if (!card) return;
        // 1) Card hasn't entered yet
        if (i > continuous + 1) {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          card.style.transform = "translateY(100%)";
          card.style.clipPath = "none";
          return;
        }
        // 2) Card is currently entering (i-1 <= continuous < i)
        if (i > continuous) {
          const entrance = Math.min(Math.max(continuous - (i - 1), 0), 1);
          const y = (1 - entrance) * 100;
          card.style.opacity = "1";
          card.style.pointerEvents = "auto";
          card.style.zIndex = String(10 + i * 2);
          card.style.transform = `translateY(${y}%) scale(1)`;
          // Self-clip instead of relying on the stage's overflow/clip-path to
          // contain this transformed child — Chromium intermittently fails
          // to clip a translateY-animated absolutely-positioned descendant
          // against an ancestor's overflow:hidden/clip-path/overflow:clip
          // during continuous scroll-driven updates (verified: all three
          // failed to contain it during a real scroll simulation). Clipping
          // the card's OWN box (pre-transform coordinate space) doesn't
          // depend on that ancestor relationship at all, so it can't have
          // the same failure mode. The card is shifted DOWN by y% (of its
          // own height) via translateY, so the portion that ends up below
          // the stage's bottom edge is exactly the BOTTOM y% of the card's
          // own (pre-transform) box — clip that off, not the top.
          card.style.clipPath = `inset(0 0 ${y}% 0)`;
          return;
        }
        // 3) Card is currently the front card
        // Note: For the last card (i === n - 1), it stays the front card for continuous >= i all the way to the end
        if (
          i === n - 1 ? continuous >= i : i <= continuous && i + 1 > continuous
        ) {
          card.style.opacity = "1";
          card.style.pointerEvents = "auto";
          card.style.zIndex = String(10 + i * 2);
          card.style.transform = "translateY(0px) scale(1)";
          card.style.clipPath = "none";
          return;
        }
        // 4) Card i is BEHIND the front card (i < continuous)
        const stepsBehind = continuous - i;
        // Max 3 cards can peek from behind. If stepsBehind >= 3.5 or last card has settled, it disappears completely
        if (stepsBehind >= 3.5 || lastCardFadeOut >= 1) {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          card.style.transform = "translateY(-48px) scale(0.9)";
          card.style.clipPath = "none";
          return;
        }
        // Peeking slots 1, 2, 3 (stepped upwards at top, perfectly flat inside at bottom)
        const slot = Math.min(stepsBehind, 3);
        const peekY = -15 * slot;
        const peekScale = 1 - 0.025 * slot;
        // Smoothly fade out older cards that move past slot 3 (between 3.0 and 3.5)
        let baseOpacity =
          stepsBehind > 3 ? Math.max(1 - (stepsBehind - 3) * 2, 0) : 1;
        // When last card settles, fade out all cards behind it so it overlaps everything
        if (lastCardFadeOut > 0) {
          baseOpacity *= 1 - lastCardFadeOut;
        }
        card.style.opacity = String(baseOpacity);
        card.style.pointerEvents = "none";
        card.style.zIndex = String(10 + i * 2);
        card.style.transform = `translateY(${peekY}px) scale(${peekScale})`;
        card.style.clipPath = "none";
      });
      if (activeIdx !== lastActiveIndex) {
        lastActiveIndex = activeIdx;
        setStackActiveIndex(activeIdx);
        setActive(STACK_KEYS[activeIdx]);
      }
    };
    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);
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
    if (reducedMotion) return;
    const wrap = stackWrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const stickyHeight =
      stackStickyRef.current?.getBoundingClientRect().height ??
      window.innerHeight;
    const scrollable = rect.height - stickyHeight;
    if (scrollable > 0) {
      const n = STACK_KEYS.length;
      const targetProgress =
        idx === 0 ? 0.001 : Math.min((idx + 0.1) / n, 0.95);
      const targetScrollY =
        window.scrollY + rect.top + targetProgress * scrollable;
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }
  };
  return (
    <section className="industry-section section" id="industries" ref={ref}>
      <div className="container">
        {/* Heading */}
        <h2 className="industry-heading reveal">
          Infrastructure Built for Your Industry
        </h2>
      </div>

      {/* Sentinel to toggle sticky state when top hits navbar */}
      <div ref={sentinelRef} className="industry-sticky-sentinel" />

      {/* Sticky Tabs Navbar — sticks below main navbar, heading label hides when sticky */}
      <div
        className={`industry-tabs-sticky-wrap ${isSticky ? "is-sticky" : ""}`}
      >
        <div className="container">
          <div className="industry-tabs" role="tablist">
            <span className="industry-tabs-label">Industries We Offer:</span>
            <div className="industry-tabs-scroll" ref={tabsScrollRef}>
              {STACK_KEYS.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={active === tab}
                  className={`industry-tab ${active === tab ? "active" : ""}`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
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
                  : `${STACK_KEYS.length * 600}px`,
            }}
          >
            <div className="industry-stack-sticky" ref={stackStickyRef}>
              <div className="industry-stack-stage-outer">
                <div className="industry-stack-stage">
                  {STACK_KEYS.map((key, i) => (
                    <div
                      key={key}
                      ref={(el) => {
                        stackCardRefs.current[i] = el;
                      }}
                      className="industry-card industry-stack-card"
                      style={{
                        zIndex: 10 + i * 2,
                        transform:
                          i === 0
                            ? "translateY(0px) scale(1)"
                            : "translateY(100%)",
                        opacity: i === 0 ? 1 : 0,
                      }}
                      aria-hidden={key !== active}
                    >
                      <IndustryCardBody
                        data={INDUSTRY_DATA[key]}
                        sizes="(max-width: 767px) 100vw, 600px"
                      />
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
          </div>
        )}
      </div>
    </section>
  );
}
