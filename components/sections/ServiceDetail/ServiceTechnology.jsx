"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Activity,
  Boxes,
  Building2,
  Cloud,
  CodeXml,
  Cpu,
  CreditCard,
  Database,
  GitBranch,
  HardDrive,
  KeyRound,
  Layers,
  Lock,
  Network,
  Package,
  Radio,
  RefreshCw,
  Scale,
  Server,
  Settings,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Truck,
  UserCheck,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { FormattedText, SectionTitle } from "./ServiceDetailParts";

function TechIcon({ tech }) {
  const [imgError, setImgError] = useState(false);

  if (tech.logo && !imgError) {
    return (
      <Image
        src={tech.logo}
        alt=""
        width={32}
        height={32}
        className="sd-tech-logo"
        onError={() => setImgError(true)}
      />
    );
  }

  const name = (tech.name || "").toLowerCase();

  let Icon = Cpu;
  let colorClass = "sd-icon-sky";

  if (name.includes("auth") || name.includes("identity")) {
    Icon = ShieldCheck;
    colorClass = "sd-icon-blue";
  } else if (
    name.includes("protect") ||
    name.includes("encrypt") ||
    name.includes("security")
  ) {
    Icon = Lock;
    colorClass = "sd-icon-emerald";
  } else if (name.includes("access")) {
    Icon = UserCheck;
    colorClass = "sd-icon-indigo";
  } else if (
    name.includes("monitor") ||
    name.includes("transaction") ||
    name.includes("tracking")
  ) {
    Icon = Activity;
    colorClass = "sd-icon-amber";
  } else if (name.includes("nosql")) {
    Icon = Layers;
    colorClass = "sd-icon-cyan";
  } else if (name.includes("sql") || name.includes("database")) {
    Icon = Database;
    colorClass = "sd-icon-blue";
  } else if (name.includes("cloud") || name.includes("virtual")) {
    Icon = Cloud;
    colorClass = "sd-icon-sky";
  } else if (name.includes("load") || name.includes("balance")) {
    Icon = Scale;
    colorClass = "sd-icon-blue";
  } else if (name.includes("backup") || name.includes("storage")) {
    Icon = HardDrive;
    colorClass = "sd-icon-purple";
  } else if (
    name.includes("availability") ||
    name.includes("performance") ||
    name.includes("speed")
  ) {
    Icon = Zap;
    colorClass = "sd-icon-amber";
  } else if (name.includes("gateway")) {
    Icon = Network;
    colorClass = "sd-icon-teal";
  } else if (name.includes("api") || name.includes("rest")) {
    Icon = CodeXml;
    colorClass = "sd-icon-sky";
  } else if (name.includes("webhook")) {
    Icon = Radio;
    colorClass = "sd-icon-pink";
  } else if (
    name.includes("workflow") ||
    name.includes("integration") ||
    name.includes("framework")
  ) {
    Icon = Workflow;
    colorClass = "sd-icon-purple";
  } else if (name.includes("ci/cd") || name.includes("pipeline")) {
    Icon = GitBranch;
    colorClass = "sd-icon-orange";
  } else if (name.includes("container")) {
    Icon = Boxes;
    colorClass = "sd-icon-blue";
  } else if (name.includes("automation")) {
    Icon = Settings;
    colorClass = "sd-icon-emerald";
  } else if (name.includes("sync") || name.includes("exchange")) {
    Icon = RefreshCw;
    colorClass = "sd-icon-sky";
  } else if (name.includes("crm") || name.includes("customer")) {
    Icon = Users;
    colorClass = "sd-icon-indigo";
  } else if (name.includes("erp") || name.includes("enterprise")) {
    Icon = Building2;
    colorClass = "sd-icon-slate";
  } else if (name.includes("inventory")) {
    Icon = Package;
    colorClass = "sd-icon-amber";
  } else if (
    name.includes("shipping") ||
    name.includes("delivery") ||
    name.includes("logistics")
  ) {
    Icon = Truck;
    colorClass = "sd-icon-emerald";
  } else if (name.includes("payment")) {
    Icon = CreditCard;
    colorClass = "sd-icon-blue";
  } else if (
    name.includes("mobile") ||
    name.includes("android") ||
    name.includes("ios") ||
    name.includes("app")
  ) {
    Icon = Smartphone;
    colorClass = "sd-icon-sky";
  } else if (name.includes("server")) {
    Icon = Server;
    colorClass = "sd-icon-slate";
  } else if (
    name.includes("scale") ||
    name.includes("scaling") ||
    name.includes("growth")
  ) {
    Icon = TrendingUp;
    colorClass = "sd-icon-emerald";
  }

  return (
    <span className={`sd-tech-icon-box ${colorClass}`}>
      <Icon size={18} strokeWidth={2} />
    </span>
  );
}

/* Figma "Frame 197" — slide text + technology badges | ecosystem artwork,
   progress bars below (one per slide) with 3s auto-rotation */
export default function ServiceTechnology({ detail }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const technology = detail?.technology;
  const slides = technology?.slides || [];
  const hasTabs = slides.length > 1;

  useEffect(() => {
    if (!hasTabs || isPaused) return;

    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasTabs, isPaused, slides.length, index]);

  if (!technology || slides.length === 0) return null;

  const { heading } = technology;
  const slide = slides[index] || slides[0];

  const onTabKey = (e) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + slides.length) % slides.length;
    setIndex(next);
    document.getElementById(`sd-tech-tab-${next}`)?.focus();
  };

  // Filter TypeScript if any
  const activeTechs = (slide.technologies || []).filter(
    (t) => t.name !== "TypeScript"
  );

  return (
    <section
      className="sd-section sd-tech"
      aria-labelledby="sd-tech-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container container--page sd-stack">
        <SectionTitle heading={heading} id="sd-tech-title" className="reveal" />
        {technology.description && (
          <p className="sd-tech-lead reveal">
            <FormattedText text={technology.description} />
          </p>
        )}

        <div className="sd-tech-body">
          <div
            key={index}
            className="sd-tech-row sd-tech-fade-in"
            id="sd-tech-panel"
            {...(hasTabs
              ? { role: "tabpanel", "aria-labelledby": `sd-tech-tab-${index}` }
              : {})}
          >
            <div className="sd-tech-text">
              <div className="sd-tech-intro">
                <h3 className="sd-tech-title">
                  <span>{slide.number}</span>
                  <span>{slide.title}</span>
                </h3>
                <p className="sd-tech-desc">
                  <FormattedText text={slide.text} />
                </p>
              </div>
              <div className="sd-tech-keys">
                <p className="sd-tech-label">Key Technologies</p>
                <ul className="sd-tech-badges">
                  {activeTechs.map((t) => (
                    <li key={t.name} className="sd-tech-badge">
                      <TechIcon tech={t} />
                      {t.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="sd-tech-art">
              <Image
                key={slide.image.src}
                src={slide.image.src}
                alt={slide.image.alt}
                width={slide.image.width}
                height={slide.image.height}
                sizes="(min-width: 1024px) 606px, (min-width: 768px) 45vw, 420px"
                className="sd-tech-img"
              />
            </div>
          </div>

          {hasTabs && (
            <div
              className="sd-tech-tabs"
              role="tablist"
              aria-label="Technology areas"
            >
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  id={`sd-tech-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-controls="sd-tech-panel"
                  aria-label={`${s.number} ${s.title}`}
                  tabIndex={i === index ? 0 : -1}
                  className={`sd-tech-tab${i === index ? " is-active" : ""}`}
                  onClick={() => setIndex(i)}
                  onKeyDown={onTabKey}
                >
                  <span
                    className={`sd-tech-progress${i === index && !isPaused ? " is-animating" : ""}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
