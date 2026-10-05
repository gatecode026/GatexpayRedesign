import Hero from "@/components/sections/Hero/Hero";
import TrustRibbon from "@/components/sections/TrustRibbon/TrustRibbon";
import SolutionCards from "@/components/sections/SolutionCards/SolutionCards";
import ReliabilitySection from "@/components/sections/ReliabilitySection/ReliabilitySection";
import IndustrySection from "@/components/sections/IndustrySection/IndustrySection";
import ScaleSection from "@/components/sections/ScaleSection/ScaleSection";
import PaymentJourney from "@/components/sections/PaymentJourney/PaymentJourney";
import CTASection from "@/components/sections/CTASection/CTASection";
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustRibbon />
      <SolutionCards />
      <ReliabilitySection />
      <IndustrySection />
      <ScaleSection />
      <PaymentJourney />
      <CTASection />
    </>
  );
}
