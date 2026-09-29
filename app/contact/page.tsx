import type { Metadata } from "next";
import ContactIntro from "@/components/sections/ContactIntro/ContactIntro";
import ContactHeadquarter from "@/components/sections/ContactHeadquarter/ContactHeadquarter";
import ContactFAQ from "@/components/sections/ContactFAQ/ContactFAQ";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <ContactIntro />
      <ContactHeadquarter />
      <ContactFAQ />
    </>
  );
}
