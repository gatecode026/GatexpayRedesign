import Link from "next/link";
import { ChevronRight } from "lucide-react";
export default function ArticleHero({ image, title }) {
  return (
    <div
      className="article-hero"
      style={{
        backgroundImage: `linear-gradient(0deg, #0F172A -0.01%, rgba(15, 23, 42, 0.2) 99.99%), url(${image})`,
      }}
    >
      <div className="article-hero-container">
        <nav aria-label="Breadcrumb" className="article-breadcrumbs">
          <Link href="/" className="breadcrumb-link">
            Home
          </Link>
          <ChevronRight
            size={14}
            className="breadcrumb-sep"
            aria-hidden="true"
          />
          <Link href="/blog" className="breadcrumb-link">
            Blog
          </Link>
          <ChevronRight
            size={14}
            className="breadcrumb-sep"
            aria-hidden="true"
          />
          <span
            className="breadcrumb-current"
            aria-current="page"
            title={title}
          >
            {title}
          </span>
        </nav>
      </div>
    </div>
  );
}
