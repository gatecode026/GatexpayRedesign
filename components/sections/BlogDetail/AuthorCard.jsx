import Image from "next/image";
import { Linkedin } from "lucide-react";

export default function AuthorCard() {
  return (
    <div className="article-author-card">
      <div className="author-card-avatar-wrap">
        <Image
          src="/assets/images/author-vansh.png"
          alt="Vansh Chaudhary"
          width={80}
          height={80}
          className="author-card-avatar-img"
        />
      </div>
      <div className="author-card-content">
        <div className="author-card-identity">
          <h3 className="author-card-name">Vansh Chaudhary</h3>
          <span className="author-card-title">
            Chief Compliance Officer, GateXPay
          </span>
        </div>
        <p className="author-card-bio">
          Vansh brings 14 years of regulatory expertise across the RBI, NPCI,
          and leading Indian fintechs. He leads GateXPay&apos;s compliance
          strategy, ensuring merchants stay ahead of every framework change.
        </p>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="author-card-social-link"
          aria-label="Vansh Chaudhary on LinkedIn"
        >
          <Linkedin size={24} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

