import type { Metadata } from "next";
import ServicesContent from "@/components/sections/ServicesContent/ServicesContent";
import ServicesFAQ from "@/components/sections/ServicesFAQ/ServicesFAQ";
import CTASection from "@/components/sections/CTASection/CTASection";

export const metadata: Metadata = {
  title: "Services | Payment Solutions & Banking Infrastructure | GateXPay",
  description:
    "GateXPay offers payment gateways, banking APIs, and digital services. Explore our 27+ solutions including Payment Gateway Integration, AEPS, Connected Banking, and Enterprise Tech.",
  keywords: [
    "GateXPay services",
    "payment gateway integration",
    "AEPS services",
    "connected banking",
    "banking APIs",
    "bill payment BBPS",
    "micro ATM",
    "fintech infrastructure",
  ],
  openGraph: {
    title: "Services | Payment Solutions for Every Business | GateXPay",
    description:
      "Explore 27+ fintech solutions built for scalability, compliance, and developer agility.",
    url: "https://gatexpay.com/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="services-page-wrapper">
      <ServicesContent />
      <ServicesFAQ />
      <CTASection alignToNavbar />
    </div>
  );
}
