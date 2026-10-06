"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import "./SolutionCards.css";

const SOLUTIONS = [
  {
    id: "banking",
    title: "Agency Banking & CSP",
    points: [
      "Loan & Credit Integrations",
      "Domestic Money Transfers",
      "Core Banking Services",
      "AEPS & Micro ATM Setup",
    ],
    linkLabel: "Explore Banking Solutions",
    img: "/assets/images/solution-banking.png",
    href: "/services",
  },
  {
    id: "payments",
    title: "Payments & Citizen Services",
    points: [
      "Travel & E-Commerce Booking",
      "Insurance & Pension Schemes",
      "Aadhaar & PAN Card Services",
      "Utility Bills & Recharges",
    ],
    linkLabel: "Explore Payment Solutions",
    img: "/assets/images/solution-payments.png",
    href: "/services",
  },
  {
    id: "tech",
    title: "IT & Fintech Infrastructure",
    points: [
      "Payment & Fintech Integration",
      "Web, App & Cloud Development",
      "Banking & Logistics Tie-Ups",
      "Business Automations",
    ],
    linkLabel: "Explore Tech Solutions",
    img: "/assets/images/solution-tech.png",
    href: "/services",
  },
];

export default function SolutionCards() {
  const ref = useRef(null);

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

  return (
    <section className="solutions section" id="solutions" ref={ref}>
      <div className="container container--page">
        <h2 className="solutions-heading reveal">
          Solutions Built for your Business
        </h2>
        <div className="solutions-grid">
          {SOLUTIONS.map((sol, i) => (
            <div
              key={sol.id}
              className={`sol-card reveal reveal-delay-${i + 1}`}
            >
              <div className="sol-card-content">
                <div className="sol-card-top">
                  <h3 className="sol-card-title">{sol.title}</h3>
                  <ul className="sol-card-points">
                    {sol.points.map((pt) => (
                      <li key={pt}>
                        <span className="sol-bullet" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sol-card-bottom">
                  <Link href={sol.href} className="sol-card-link">
                    <span>{sol.linkLabel}</span>
                    <span className="sol-link-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </div>

              <div
                className={`sol-card-img-wrap sol-card-img-${sol.id}`}
                aria-hidden="true"
              >
                <Image
                  src={sol.img}
                  alt=""
                  width={140}
                  height={140}
                  className="sol-card-img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

