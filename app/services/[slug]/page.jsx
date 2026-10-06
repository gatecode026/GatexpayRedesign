import { notFound } from "next/navigation";
import { SERVICE_DETAILS, getServiceDetail } from "@/data/service-details";
import ServiceDetailPage from "@/components/sections/ServiceDetail/ServiceDetailPage";
// Only services with detail content get a page; other slugs 404.
export const dynamicParams = true;
export function generateStaticParams() {
  const params = SERVICE_DETAILS.map((s) => ({ slug: s.slug }));
  params.push({ slug: "aadhaar-services-assistance" });
  params.push({ slug: "pension-governance-services" });
  params.push({ slug: "pension-government-services" });
  params.push({ slug: "egovernance-services" });
  params.push({ slug: "bill-payment-recharge" });
  params.push({ slug: "aeps" });
  params.push({ slug: "micro-atm" });
  params.push({ slug: "money-transfer" });
  params.push({ slug: "travel-services" });
  params.push({ slug: "travel" });
  params.push({ slug: "other-value-added-services" });
  params.push({ slug: "value-added" });
  params.push({ slug: "loan-credit-services" });
  params.push({ slug: "loan-credit-integration" });
  params.push({ slug: "digital-lending-integration" });
  params.push({ slug: "insurance-services" });
  params.push({ slug: "web-development" });
  params.push({ slug: "app-development" });
  params.push({ slug: "api-integration" });
  params.push({ slug: "business-process-automation" });
  params.push({ slug: "workflow-automation" });
  params.push({ slug: "process-automation" });
  params.push({ slug: "cloud-services" });
  params.push({ slug: "managed-it-services" });
  params.push({ slug: "devops-services" });
  params.push({ slug: "it-services" });
  params.push({ slug: "ecommerce-development" });
  params.push({ slug: "ecommerce-services" });
  params.push({ slug: "e-commerce-development" });
  params.push({ slug: "online-store-development" });
  params.push({ slug: "ecommerce-solutions" });
  params.push({ slug: "cybersecurity" });
  params.push({ slug: "cybersecurity-services" });
  params.push({ slug: "digital-services" });
  params.push({ slug: "software-development-services" });
  return params;
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) return {};
  const url = `https://gatexpay.com/services/${detail.slug}`;
  return {
    title: {
      absolute: detail.metaTitle?.endsWith("GateXPay")
        ? detail.metaTitle
        : `${detail.metaTitle} | GateXPay`,
    },
    description: detail.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${detail.name} | GateXPay`,
      description: detail.metaDescription,
      url,
      siteName: "GateXPay",
      type: "website",
    },
  };
}
export default async function ServiceDetailRoute({ params }) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) notFound();
  return <ServiceDetailPage detail={detail} />;
}
