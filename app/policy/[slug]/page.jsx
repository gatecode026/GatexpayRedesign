import { notFound } from "next/navigation";
import LegalPage from "@/components/sections/LegalPage/LegalPage";
import CTASection from "@/components/sections/CTASection/CTASection";
import {
  ALL_POLICY_SLUGS,
  LEGAL_POLICIES,
  resolvePolicySlug,
} from "@/data/policies-data";
export function generateStaticParams() {
  return ALL_POLICY_SLUGS.map((slug) => ({ slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const resolved = resolvePolicySlug(slug);
  if (!resolved) return {};
  const policy = LEGAL_POLICIES[resolved];
  return {
    title: `${policy.title} | GateXPay Legal & Compliance`,
    description: policy.description,
    openGraph: {
      title: `${policy.title} | GateXPay`,
      description: policy.description,
      type: "website",
    },
  };
}
export default async function LegalSlugPage({ params }) {
  const { slug } = await params;
  const resolved = resolvePolicySlug(slug);
  if (!resolved) notFound();
  return (
    <>
      <LegalPage slug={resolved} rawSlug={slug} />
      <CTASection />
    </>
  );
}
