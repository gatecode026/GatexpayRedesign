import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ServiceDetailIcon } from "./ServiceDetailParts";
import TalkToExpertButton from "./TalkToExpertButton";
export default function ServiceDetailHero({ detail }) {
  const { hero, highlights } = detail;
  return (
    <section className="sd-hero" aria-labelledby="sd-hero-title">
      <div className="container container--page sd-hero-inner">
        <nav className="sd-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
              <ChevronRight size={14} strokeWidth={2.5} aria-hidden="true" />
            </li>
            <li>
              <Link href="/services">Services</Link>
              <ChevronRight size={14} strokeWidth={2.5} aria-hidden="true" />
            </li>
            <li>
              <span aria-current="page">{detail.name}</span>
            </li>
          </ol>
        </nav>

        <div className="sd-hero-body">
          {/* Frame 43 — 767px text column, gap 32 */}
          <div className="sd-hero-content">
            <h1 id="sd-hero-title" className="sd-hero-title">
              {hero.titleLead}
              {hero.titleLine2 && (
                <>
                  <br />
                  <span>{hero.titleLine2}</span>
                </>
              )}
              {hero.titleAccent && (
                <>
                  <br />
                  <span className="sd-hero-accent">{hero.titleAccent}</span>
                </>
              )}
            </h1>
            <p className="sd-hero-desc">{hero.description}</p>
            <div className="sd-hero-actions">
              <TalkToExpertButton
                className="sd-btn-primary"
                label={hero.ctaLabel ?? "Talk to an Expert"}
              />
              <Link
                href={
                  hero.secondaryAction?.href ?? `/services#${detail.categoryId}`
                }
                className="sd-link-arrow"
              >
                {hero.secondaryAction?.text ?? "View Similar Services"}
                <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="sd-hero-art">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              width={hero.image.width}
              height={hero.image.height}
              sizes="(min-width: 1440px) 870px, (min-width: 1024px) 61vw, (min-width: 768px) 55vw, 130vw"
              preload
              className={`sd-hero-img${detail.slug !== "payment-gateway-integration" ? " sd-hero-img--fitted" : ""}`}
            />
          </div>
        </div>

        {/* Container — 1288×122 trust strip */}
        <ul className="sd-highlights">
          {highlights.map((h) => {
            const displaySub = h.subtitle || (h.text ? h.text.split(/ — | – /)[0] : "");
            return (
              <li key={h.title} className="sd-highlight">
                <span className="sd-icon-box sd-icon-box--sm">
                  <ServiceDetailIcon name={h.icon} size={28} strokeWidth={2} />
                </span>
                <span className="sd-highlight-text">
                  <strong className="sd-highlight-title">{h.title}</strong>
                  <span className="sd-highlight-sub" title={displaySub}>{displaySub}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
