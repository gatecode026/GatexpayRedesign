"use client";
import { useState } from "react";
import Image from "next/image";
import { SectionTitle } from "./ServiceDetailParts";
/* Figma "Frame 197" — slide text + technology badges | ecosystem artwork,
   progress bars below (one per slide) */
export default function ServiceTechnology({ detail }) {
  const [index, setIndex] = useState(0);
  if (!detail.technology) return null;
  const { heading, slides } = detail.technology;
  const slide = slides[index];
  const hasTabs = slides.length > 1;
  const onTabKey = (e) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + slides.length) % slides.length;
    setIndex(next);
    document.getElementById(`sd-tech-tab-${next}`)?.focus();
  };
  return (
    <section className="sd-section sd-tech" aria-labelledby="sd-tech-title">
      <div className="container container--page sd-stack">
        <SectionTitle heading={heading} id="sd-tech-title" className="reveal" />

        <div className="sd-tech-body">
          <div
            className="sd-tech-row reveal"
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
                <p className="sd-tech-desc">{slide.text}</p>
              </div>
              <div className="sd-tech-keys">
                <p className="sd-tech-label">Key Technologies</p>
                <ul className="sd-tech-badges">
                  {slide.technologies.map((t) => (
                    <li key={t.name} className="sd-tech-badge">
                      <Image
                        src={t.logo}
                        alt=""
                        width={32}
                        height={32}
                        className="sd-tech-logo"
                      />
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
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
