import type { ServiceDetail } from "@/data/service-details";
import ServicesFAQ from "@/components/sections/ServicesFAQ/ServicesFAQ";
import CTASection from "@/components/sections/CTASection/CTASection";
import ServiceDetailHero from "./ServiceDetailHero";
import ServiceIncluded from "./ServiceIncluded";
import ServiceShowcase from "./ServiceShowcase";
import ServiceTechnology from "./ServiceTechnology";
import ServiceProcess from "./ServiceProcess";
import RevealOnScroll from "./RevealOnScroll";
import "./ServiceDetail.css";

export default function ServiceDetailPage({ detail }: { detail: ServiceDetail }) {
  return (
    <div className="sd-page">
      <ServiceDetailHero detail={detail} />
      <RevealOnScroll>
        <ServiceIncluded detail={detail} />
        {detail.showcase && <ServiceShowcase showcase={detail.showcase} />}
        {detail.technology && <ServiceTechnology detail={detail} />}
        <ServiceProcess detail={detail} />
      </RevealOnScroll>
      <ServicesFAQ items={detail.faqs} idPrefix="sd-faq" size="lg" />
      <CTASection alignToNavbar />
    </div>
  );
}
