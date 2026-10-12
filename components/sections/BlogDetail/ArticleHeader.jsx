import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
export default function ArticleHeader({
  category,
  title,
  publishedAt,
  readTime,
  author = "GateXPay Editorial Team",
}) {
  const authorName = author || "GateXPay Editorial Team";
  const authorRole =
    authorName === "Vansh Chaudhary"
      ? "Chief Compliance Officer"
      : authorName.toLowerCase().includes("engineering")
      ? "Engineering & Tech Desk"
      : "FinTech Compliance & Tech Desk";

  return (
    <header className="article-header">
      <div className="article-header-container">
        <div className="article-badge-wrap">
          <span className="article-category-badge">{category}</span>
        </div>
        <h1 className="article-main-title">{title}</h1>
        <div className="article-meta-row">
          <div className="author-block">
            <div className="author-avatar-wrap">
              <Image
                src="/assets/images/author-vansh.png"
                alt={authorName}
                width={34}
                height={34}
                className="author-avatar-img"
              />
            </div>
            <div className="author-info">
              <span className="author-name">{authorName}</span>
              <span className="author-role">{authorRole}</span>
            </div>
          </div>

          <span className="meta-divider" aria-hidden="true" />

          <div className="meta-item">
            <Calendar size={14} className="meta-icon" aria-hidden="true" />
            <span>{publishedAt}</span>
          </div>

          <div className="meta-item">
            <Clock size={14} className="meta-icon" aria-hidden="true" />
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>
    </header>
  );
}
