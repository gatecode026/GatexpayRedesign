import ContactIntro from "@/components/sections/ContactIntro/ContactIntro";
import ContactHeadquarter from "@/components/sections/ContactHeadquarter/ContactHeadquarter";
import ContactFAQ from "@/components/sections/ContactFAQ/ContactFAQ";
export const metadata = { title: "Contact Us" };
export default function ContactPage() {
  return (
    <>
      <ContactIntro />
      <ContactHeadquarter />
      <ContactFAQ />
    </>
  );
}
