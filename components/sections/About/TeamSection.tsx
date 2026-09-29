import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  instagram: string;
  x: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Vansh Chaudhary",
    role: "Chief Executive Officer",
    bio: "Visionary leader driving innovation and strategic direction to shape the next era of fintech infrastructure.",
    image: "/assets/about_us/images/img_a233d47b2e.png",
    linkedin: "https://linkedin.com/company/gatexpay",
    instagram: "https://instagram.com/gatexpay",
    x: "https://x.com/gatexpay",
  },
  {
    name: "Govind Jain",
    role: "Chief Financial Officer",
    bio: "Financial strategist ensuring fiscal discipline, regulatory compliance, and sustainable growth across operations.",
    image: "/assets/about_us/images/img_eb0c79c77d.png",
    linkedin: "https://linkedin.com/company/gatexpay",
    instagram: "https://instagram.com/gatexpay",
    x: "https://x.com/gatexpay",
  },
];

// SVG for X icon
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

export default function TeamSection() {
  return (
    <section className="about-team-section" id="team" aria-label="Leadership Team">
      <div className="about-container">
        <div className="about-team-header">
          <h2 className="about-team-heading">The People Behind GateXPay</h2>
        </div>

        <div className="about-team-grid">
          {TEAM.map((member) => (
            <article key={member.name} className="about-team-card">
              <div className="about-team-card-img-wrap">
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  width={289}
                  height={244}
                  className="about-team-card-img"
                />
              </div>

              <div className="about-team-card-body">
                <div className="about-team-card-header">
                  <h3 className="about-team-card-name">{member.name}</h3>
                  <div className="about-team-card-role">{member.role}</div>
                </div>

                <p className="about-team-card-bio">{member.bio}</p>

                <div className="about-team-social-row">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-social-btn linkedin"
                    aria-label={`${member.name} LinkedIn Profile`}
                  >
                    <Linkedin size={16} aria-hidden="true" />
                  </a>
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-social-btn instagram"
                    aria-label={`${member.name} Instagram Profile`}
                  >
                    <Instagram size={16} aria-hidden="true" />
                  </a>
                  <a
                    href={member.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-social-btn x"
                    aria-label={`${member.name} X Profile`}
                  >
                    <XIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
