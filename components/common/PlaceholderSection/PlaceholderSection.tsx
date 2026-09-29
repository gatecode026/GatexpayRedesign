import Container from "@/components/common/Container/Container";
import "./PlaceholderSection.css";

type PlaceholderSectionProps = {
  title: string;
  description: string;
};

export default function PlaceholderSection({ title, description }: PlaceholderSectionProps) {
  return (
    <section className="placeholder-section section">
      <Container>
        <span className="section-eyebrow">Coming soon</span>
        <h1 className="section-heading">{title}</h1>
        <p className="section-subheading">{description}</p>
      </Container>
    </section>
  );
}
