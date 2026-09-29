import type { Metadata } from "next";
import BlogListing from "@/components/sections/BlogListing/BlogListing";

export const metadata: Metadata = {
  title: "Gate X Pay Insights",
  description:
    "Practical insights on fintech, payments, technology, compliance, and digital growth for modern businesses.",
};

export default function BlogPage() {
  return <BlogListing />;
}
