import type { Metadata } from "next";
import AboutPage from "@/components/sections/About/AboutPage";

export const metadata: Metadata = {
  title: "About Us | GateXPay - Modern Fintech Infrastructure & Payment Technology",
  description:
    "GateXPay builds streaming, scalable, and compliant digital payment and banking infrastructure empowering startups, enterprises, and financial institutions across India.",
  keywords: [
    "About GateXPay",
    "GateXPay team",
    "Fintech infrastructure India",
    "Payment Gateway provider",
    "TSP India",
    "White label banking",
    "Mansarovar Jaipur fintech",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | GateXPay - Next-Gen Fintech Ecosystem",
    description:
      "Learn about GateXPay's mission, leadership team, technology foundation, and regulatory role in powering modern digital finance in India.",
    url: "https://gatexpay.com/about",
    siteName: "GateXPay",
    images: [
      {
        url: "/assets/about_us/images/img_006e26915c.png",
        width: 1200,
        height: 630,
        alt: "GateXPay Fintech Ecosystem",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | GateXPay - Next-Gen Fintech Ecosystem",
    description:
      "Learn about GateXPay's mission, leadership team, technology foundation, and regulatory role in powering modern digital finance in India.",
    images: ["/assets/about_us/images/img_006e26915c.png"],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GateXPay Technologies Private Limited",
    alternateName: "GateXPay",
    url: "https://gatexpay.com",
    logo: "https://gatexpay.com/assets/logo.png",
    description:
      "GateXPay provides high-performance fintech infrastructure, digital banking services, and secure payment routing for modern businesses in India.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "412, Sumer Nagar, Mansarovar",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302020",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8502888838",
      contactType: "customer service",
      email: "info@gatexpay.in",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://linkedin.com/company/gatexpay",
      "https://instagram.com/gatexpay",
      "https://x.com/gatexpay",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPage />
    </>
  );
}
