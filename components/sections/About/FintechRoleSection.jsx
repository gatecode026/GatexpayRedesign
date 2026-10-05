import Image from "next/image";
const ROLE_CARDS = [
  {
    title: "The Tech Engine",
    description:
      "Delivering the core APIs, transaction routing, and resilient backend architecture that keep modern digital commerce running smoothly 24/7.",
    image: "/assets/about_us/images/img_61bebd4938.png",
    alt: "The Tech Engine 3D server and cloud APIs illustration",
  },
  {
    title: "The Last-Mile Connect",
    description:
      "Enabling CSPs, retailers, and rural networks with reliable financial touchpoints, Aadhaar services, and digital distribution.",
    image: "/assets/about_us/images/img_53e8487288.png",
    alt: "The Last-Mile Connect 3D storefront and verification illustration",
  },
  {
    title: "The Silent Partner",
    description:
      "Providing white-label solutions and backend integrations that allow brands to deliver seamless banking experiences under their own name.",
    image: "/assets/about_us/images/img_f138562215.png",
    alt: "The Silent Partner 3D white-label brand switch and code illustration",
  },
];
export default function FintechRoleSection() {
  return (
    <section
      className="about-role-section"
      aria-label="Our Role in the Fintech Ecosystem"
    >
      <div className="about-container">
        <div className="about-role-header">
          <h2 className="about-role-heading">
            Our Role in the Fintech Ecosystem
          </h2>
          <p className="about-role-subtitle">
            GateXpay assists startups, merchants, fintech companies, and banks
            by providing the secure and robust infrastructure they need to build
            and scale.
          </p>
        </div>

        <div className="about-role-grid">
          {ROLE_CARDS.map((card) => (
            <article key={card.title} className="about-role-card">
              <div className="about-role-card-img-wrap">
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={400}
                  height={267}
                  className="about-role-card-img"
                />
              </div>
              <div className="about-role-card-body">
                <h3 className="about-role-card-title">{card.title}</h3>
                <p className="about-role-card-desc">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
