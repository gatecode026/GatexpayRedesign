"use client";
import React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import ScrollToTop from "@/components/common/ScrollToTop/ScrollToTop";
import CookieConsent from "@/components/common/CookieConsent/CookieConsent";

const Chatbot = dynamic(() => import("@/components/common/Chatbot/Chatbot"), {
  ssr: false,
});
export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) {
    return <main>{children}</main>;
  }
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <Chatbot />
      <CookieConsent />
    </>
  );
}
