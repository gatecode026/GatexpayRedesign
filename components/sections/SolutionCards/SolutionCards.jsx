"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import "./SolutionCards.css";
const SOLUTIONS = [
  {
    id: "banking",
    title: "Agency Banking & CSP",
    points: [
      "Loan & Credit Integrations",
      "Domestic Money Transfers",
      "e-Governance Services",
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
      <div className="container">
        <h2 className="solutions-heading reveal">
          Solutions Built for your Business
        </h2>
        <div className="solutions-grid">
          {SOLUTIONS.map((sol, i) => (
            <div
              key={sol.id}
              className={`sol-card reveal reveal-delay-${i + 1}`}
            >
              <div className="sol-card-top">
                <h3 className="sol-card-title">{sol.title}</h3>
                <ul className="sol-card-points">
                  {sol.points.map((pt) => (
                    <li key={pt}>
                      <span className="sol-bullet" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sol-card-bottom">
                <div className="sol-card-img-wrap" aria-hidden="true">
                  <Image
                    src={sol.img}
                    alt=""
                    width={120}
                    height={100}
                    className="sol-card-img"
                  />
                </div>
                <a href={sol.href} className="sol-card-link">
                  {sol.linkLabel}{" "}
                  <span className="sol-link-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
