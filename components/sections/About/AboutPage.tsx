import AboutHero from "./AboutHero";
import WhoWeAreSection from "./WhoWeAreSection";
import FintechRoleSection from "./FintechRoleSection";
import FoundationsSection from "./FoundationsSection";
import TeamSection from "./TeamSection";
import RegulatoryRoleSection from "./RegulatoryRoleSection";
import ContactSection from "./ContactSection";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-page-wrapper">
      <AboutHero />
      <WhoWeAreSection />
      <FintechRoleSection />
      <FoundationsSection />
      <TeamSection />
      <RegulatoryRoleSection />
      <ContactSection />
    </div>
  );
}
