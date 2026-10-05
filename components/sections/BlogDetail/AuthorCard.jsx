import Image from "next/image";
import { Linkedin } from "lucide-react";
export default function AuthorCard() {
  return (
    <div className="article-author-card">
      <div className="author-card-avatar-wrap">
        <Image
          src="/assets/images/author-vansh.png"
          alt="Vansh Chaudhary"
          width={56}
          height={56}
          className="author-card-avatar-img"
        />
      </div>
      <div className="author-card-content">
        <div className="author-card-header">
          <div className="author-card-identity">
            <h3 className="author-card-name">Vansh Chaudhary</h3>
            <span className="author-card-title">
              Chief Compliance Officer, GateXPay
            </span>
          </div>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="author-card-social-link"
            aria-label="Vansh Chaudhary on LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>
        <p className="author-card-bio">
          Vansh brings 14+ years of regulatory expertise across fintechs, NBFCs,
          and leading Indian unicorns. He specializes in payments compliance
          strategy, assisting merchants stay ahead of every framework change.
        </p>
      </div>
    </div>
  );
}
