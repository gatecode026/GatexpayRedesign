import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_DETAILS, getServiceDetail } from "@/data/service-details";
import ServiceDetailPage from "@/components/sections/ServiceDetail/ServiceDetailPage";

// Only services with detail content get a page; other slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_DETAILS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) return {};

  const url = `https://gatexpay.com/services/${detail.slug}`;
  return {
    title: detail.metaTitle,
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

export default async function ServiceDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) notFound();

  return <ServiceDetailPage detail={detail} />;
}
