"use client";
import React, { useState, useEffect, useId } from "react";
import {
  X,
  BookOpen,
  Sparkles,
  Link as LinkIcon,
  Image as ImageIcon,
  Clock,
  User,
  Tag,
  Check,
  AlertCircle,
  FileText,
  Sliders,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

const PRESET_CATEGORIES = [
  { name: "CSP Services", color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
  { name: "Compliance & Regulation", color: "#B45309", bg: "#FEF3C7", border: "#FDE68A" },
  { name: "Engineering & Tech", color: "#0284C7", bg: "#EFF6FF", border: "#BAE6FD" },
  { name: "Business Growth", color: "#7E22CE", bg: "#FAF5FF", border: "#E9D5FF" },
  { name: "Company News", color: "#C2410C", bg: "#FFF7ED", border: "#FFEDD5" },
  { name: "FinTech & Payments", color: "#4338CA", bg: "#EEF2FF", border: "#C7D2FE" },
];

const PRESET_COVERS = [
  {
    label: "IT & Tech Software",
    url: "/assets/images/card-it-software.jpg",
  },
  {
    label: "RBI & Compliance",
    url: "/assets/images/card-rbi.png",
  },
  {
    label: "Banking & Settlement",
    url: "/assets/images/card-it-software.jpg",
  },
];

const PRESET_AUTHORS = [
  "GateXPay Editorial Team",
  "Vansh Chaudhary",
  "GateXPay Engineering",
  "Compliance Desk",
  "Admin",
];

const ARTICLE_SNIPPETS = [
  {
    label: "H2 Section",
    snippet: "## Understanding the Core Requirements\n\nExplain the regulatory background, platform mechanics, or architectural foundations here.",
  },
  {
    label: "H3 Subtitle",
    snippet: "### 1. Key Operational Standards\n\nDetail the exact workflow steps or infrastructure configuration.",
  },
  {
    label: "Callout Box",
    snippet: "> **Key Takeaway:** If your platform collects funds before merchant settlement, you sit inside the regulatory perimeter and require authorization.",
  },
  {
    label: "Bullet List",
    snippet: "- Real-time webhook notifications with idempotent retry logic\n- Automated settlement reconciliation across multiple banking rails\n- Zero-downtime card tokenization fallback pathways",
  },
  {
    label: "Checklist",
    snippet: "- [x] Complete CERT-In empanelled security audit\n- [x] Establish dedicated RBI-compliant Escrow account\n- [ ] Implement 2-Factor Authentication across all admin surfaces",
  },
  {
    label: "API Code",
    snippet: "```javascript\n// Initialize GateXPay SDK\nconst gatex = new GateXPay({\n  apiKey: process.env.GATEXPAY_API_KEY,\n  environment: \"production\",\n});\n```",
  },
];

const DEFAULT_ARTICLE_TEMPLATE = `## Overview & Industry Context
The online payments and agency banking landscape across India is undergoing unprecedented regulatory and technological evolution. This guide explores key frameworks and implementation architectures required for enterprise scalability.

> **Key Takeaway:** Verify licensing status and audit escrow settlement timelines directly with banking partners before scaling commercial volume.

## Architectural & Compliance Standards
Every growing platform must account for three non-negotiable operational requirements:
- Resilient payment gateway failover across primary and secondary banking rails
- Card tokenization lifecycle management adhering to RBI circular guidelines
- Daily automated reconciliation between transaction webhooks and bank nodal accounts

## Practical Implementation Checklist
Confirm each milestone prior to commercial production launch:
- [x] Integrate multi-rail API endpoints with idempotent retry mechanisms
- [x] Establish automated settlement dispute logging
- [ ] Complete annual third-party ISO 27001 and VAPT security audits

## Looking Ahead
Partnering with authorized infrastructure providers allows modern fintechs to innovate rapidly while maintaining 100% regulatory integrity.`;

function renderMarkdownPreview(markdown) {
  if (!markdown || !markdown.trim()) {
    return (
      <p style={{ color: "#94A3B8", fontStyle: "italic", margin: 0 }}>
        No content written yet. Click the quick insert buttons or insert the full article template to see your live preview.
      </p>
    );
  }

  const lines = markdown.split("\n");
  const elements = [];
  let currentList = [];
  let inCodeBlock = false;
  let codeBuffer = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`}>
          {currentList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${elements.length}`}>
            <code>{codeBuffer.join("\n")}</code>
          </pre>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={`h2-${index}`}>{trimmed.replace(/^##\s+/, "")}</h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${index}`}>{trimmed.replace(/^###\s+/, "")}</h3>
      );
    } else if (trimmed.startsWith("> ")) {
      flushList();
      const quoteText = trimmed.replace(/^>\s+/, "").replace(/\*\*(.*?)\*\*/g, "$1");
      elements.push(
        <blockquote key={`quote-${index}`}>{quoteText}</blockquote>
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentList.push(trimmed.replace(/^[-*]\s+/, ""));
    } else if (trimmed === "") {
      flushList();
    } else {
      flushList();
      elements.push(<p key={`p-${index}`}>{trimmed}</p>);
    }
  });

  flushList();
  if (inCodeBlock && codeBuffer.length > 0) {
    elements.push(
      <pre key={`code-${elements.length}`}>
        <code>{codeBuffer.join("\n")}</code>
      </pre>
    );
  }

  return elements;
}

const SUGGESTED_TAGS = [
  "UPI",
  "PA-PG",
  "Escrow",
  "RBI Compliance",
  "API Integration",
  "Security",
  "CSP",
  "Payment Gateway",
];

function getInitialForm(postToEdit) {
  if (postToEdit) {
    const catName =
      postToEdit.category?.name || postToEdit.category || "CSP Services";
    const isKnownCat = PRESET_CATEGORIES.some(
      (c) => c.name.toLowerCase() === catName.toLowerCase()
    );
    const isKnownAuthor = PRESET_AUTHORS.includes(postToEdit.author);

    return {
      title: postToEdit.title || "",
      slug: postToEdit.slug || "",
      category: isKnownCat ? catName : "custom",
      customCategory: isKnownCat ? "" : catName,
      author: isKnownAuthor ? postToEdit.author : "custom",
      customAuthor: isKnownAuthor ? "" : postToEdit.author,
      readTime: postToEdit.readTime || 4,
      excerpt: postToEdit.excerpt || postToEdit.description || "",
      content: Array.isArray(postToEdit.content)
        ? postToEdit.content.join("\n\n")
        : postToEdit.content || "",
      coverImage:
        postToEdit.coverImage ||
        postToEdit.image ||
        "/assets/images/card-it-software.jpg",
      tags: postToEdit.tags || ["FinTech"],
      status: postToEdit.status || "published",
      isFeatured: Boolean(postToEdit.isFeatured || postToEdit.featured),
    };
  }
  return {
    title: "",
    slug: "",
    category: "CSP Services",
    customCategory: "",
    author: "Admin",
    customAuthor: "",
    readTime: 4,
    excerpt: "",
    content: "",
    coverImage: "/assets/images/card-it-software.jpg",
    tags: ["FinTech", "Payments"],
    status: "published",
    isFeatured: false,
  };
}

export default function AddBlogModal({
  isOpen,
  onClose,
  onSubmit,
  postToEdit = null,
  submitting = false,
}) {
  if (!isOpen) return null;

  return (
    <AddBlogModalContent
      key={postToEdit?._id || "new-blog-modal"}
      onClose={onClose}
      onSubmit={onSubmit}
      postToEdit={postToEdit}
      submitting={submitting}
    />
  );
}

function AddBlogModalContent({
  onClose,
  onSubmit,
  postToEdit = null,
  submitting = false,
}) {
  const isEdit = Boolean(postToEdit);

  const [form, setForm] = useState(() => getInitialForm(postToEdit));
  const [slugLocked, setSlugLocked] = useState(!postToEdit);
  const [activeTab, setActiveTab] = useState("general"); // general | content | presentation
  const [contentView, setContentView] = useState("edit"); // edit | preview
  const [newTagInput, setNewTagInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const customCatInputId = useId();
  const customAuthorInputId = useId();

  // Clean slug generator
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    setForm((prev) => {
      const next = { ...prev, title: titleVal };
      if (slugLocked) {
        next.slug = slugify(titleVal);
      }
      return next;
    });
  };

  const handleSlugChange = (e) => {
    setSlugLocked(false);
    setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }));
  };

  const handleContentChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const autoReadTime = Math.max(1, Math.ceil(words / 180));
    setForm((prev) => ({
      ...prev,
      content: text,
      readTime: words > 40 ? autoReadTime : prev.readTime,
    }));
  };

  const insertSnippet = (snippetText) => {
    setForm((prev) => {
      const nextContent = prev.content
        ? `${prev.content.trim()}\n\n${snippetText}`
        : snippetText;
      const words = nextContent.trim().split(/\s+/).filter(Boolean).length;
      const autoReadTime = Math.max(1, Math.ceil(words / 180));
      return {
        ...prev,
        content: nextContent,
        readTime: words > 40 ? autoReadTime : prev.readTime,
      };
    });
  };

  const handleLoadTemplate = () => {
    if (
      form.content &&
      form.content.trim().length > 0 &&
      !window.confirm(
        "Replace current content with the GateXPay Blog Article template structure?"
      )
    ) {
      return;
    }
    insertSnippet(DEFAULT_ARTICLE_TEMPLATE);
  };

  const handleAddTag = (tagToAdd) => {
    const clean = tagToAdd.trim().replace(/^#/, "");
    if (!clean) return;
    if (!form.tags.includes(clean)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, clean] }));
    }
    setNewTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const currentCategoryName =
    form.category === "custom"
      ? form.customCategory.trim() || "Custom Category"
      : form.category;

  const currentCategoryTheme =
    PRESET_CATEGORIES.find(
      (c) => c.name.toLowerCase() === currentCategoryName.toLowerCase()
    ) || {
      color: "#0284C7",
      bg: "#EFF6FF",
      border: "#BAE6FD",
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const title = form.title.trim();
    if (!title || title.length < 3) {
      setErrorMsg("Please enter a valid article title (at least 3 characters).");
      setActiveTab("general");
      return;
    }

    const slug = form.slug.trim() || slugify(title);
    if (!slug || slug.length < 3) {
      setErrorMsg("Please provide a valid URL slug (at least 3 characters).");
      setActiveTab("general");
      return;
    }

    const finalCategory =
      form.category === "custom" ? form.customCategory.trim() : form.category;
    if (!finalCategory) {
      setErrorMsg("Please select or enter an article category.");
      setActiveTab("general");
      return;
    }

    const finalAuthor =
      form.author === "custom"
        ? form.customAuthor.trim() || "GateXPay Editorial Team"
        : form.author;

    const payload = {
      title,
      slug,
      category: finalCategory,
      author: finalAuthor,
      excerpt:
        form.excerpt.trim() ||
        (form.content ? form.content.slice(0, 160) + "..." : title),
      content: form.content.trim(),
      coverImage: form.coverImage.trim() || "/assets/images/card-it-software.jpg",
      readTime: Number(form.readTime) || 4,
      tags: form.tags,
      status: form.status,
      isFeatured: form.isFeatured,
    };

    const res = await onSubmit(payload, postToEdit?._id);
    if (res && !res.success) {
      setErrorMsg(res.error || "Failed to save blog post. Please check fields.");
    }
  };

  return (
    <div className="dash-modal-overlay">
      <div className="dash-modal-card blog-modal-card" style={{ maxWidth: "780px" }}>
        {/* Header */}
        <div className="dash-modal-header">
          <div className="blog-modal-header-left">
            <div className="blog-modal-icon-badge">
              <BookOpen size={18} />
            </div>
            <div>
              <h3 className="dash-modal-title">
                {isEdit ? "Edit Blog Article" : "Create New Blog Article"}
              </h3>
              <span className="dash-modal-id">
                {isEdit
                  ? "Update content & SEO across website"
                  : "Author and publish insights directly to GateXPay Blog"}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="dash-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="blog-modal-tabs">
          <button
            type="button"
            className={`blog-modal-tab-btn ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            <FileText size={14} />
            <span>Identity &amp; Metadata</span>
          </button>
          <button
            type="button"
            className={`blog-modal-tab-btn ${activeTab === "content" ? "active" : ""}`}
            onClick={() => setActiveTab("content")}
          >
            <Sparkles size={14} />
            <span>Content &amp; Body</span>
          </button>
          <button
            type="button"
            className={`blog-modal-tab-btn ${activeTab === "presentation" ? "active" : ""}`}
            onClick={() => setActiveTab("presentation")}
          >
            <Sliders size={14} />
            <span>Card, Media &amp; SEO</span>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="dash-modal-body" noValidate>
          {errorMsg && (
            <div className="blog-modal-error-banner">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ── TAB 1: IDENTITY & METADATA ── */}
          {activeTab === "general" && (
            <div className="blog-form-step-stack">
              {/* Title */}
              <div className="dash-modal-field">
                <div className="dash-field-label-row">
                  <label className="dash-field-label">
                    Article Title <span className="text-rose-500">*</span>
                  </label>
                  <span className="blog-field-counter">
                    {form.title.length} characters
                  </span>
                </div>
                <input
                  type="text"
                  className="modal-text-input"
                  placeholder="e.g. Understanding RBI's Payment Aggregator Licensing in 2026"
                  value={form.title}
                  onChange={handleTitleChange}
                  autoFocus
                />
              </div>

              {/* Slug with Live URL Preview */}
              <div className="dash-modal-field">
                <div className="dash-field-label-row">
                  <label className="dash-field-label">
                    URL Slug <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    className="blog-slug-lock-btn"
                    onClick={() => setSlugLocked(!slugLocked)}
                    title={slugLocked ? "Unlock to edit slug" : "Locked to title"}
                  >
                    {slugLocked ? "Auto from title (Locked)" : "Manual mode"}
                  </button>
                </div>
                <div className="blog-slug-input-wrapper">
                  <span className="blog-slug-prefix-tag">/blog/</span>
                  <input
                    type="text"
                    className="modal-text-input blog-slug-input"
                    placeholder="understanding-rbi-payment-aggregator-licensing"
                    value={form.slug}
                    onChange={handleSlugChange}
                  />
                </div>
                <div className="blog-url-preview-chip">
                  <LinkIcon size={12} />
                  <span>Preview:</span>
                  <code>
                    https://gatexpay.com/blog/{form.slug || "your-article-slug"}
                  </code>
                </div>
              </div>

              {/* Category & Author (Balanced 2-Column Grid) */}
              <div className="blog-grid-2col">
                <div className="dash-modal-field">
                  <label className="dash-field-label">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <div className="modal-select-wrapper">
                    <select
                      className="modal-text-input"
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                    >
                      {PRESET_CATEGORIES.map((cat) => (
                        <option key={cat.name} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                      <option value="custom">+ Custom Category...</option>
                    </select>
                    <ChevronDown size={14} className="modal-select-chevron" />
                  </div>

                  {form.category === "custom" && (
                    <input
                      id={customCatInputId}
                      type="text"
                      className="modal-text-input"
                      style={{ marginTop: "8px" }}
                      placeholder="Enter custom category name..."
                      value={form.customCategory}
                      onChange={(e) =>
                        setForm({ ...form, customCategory: e.target.value })
                      }
                    />
                  )}
                </div>

                <div className="dash-modal-field">
                  <label className="dash-field-label">
                    Author <span className="text-rose-500">*</span>
                  </label>
                  <div className="modal-select-wrapper">
                    <select
                      className="modal-text-input"
                      value={form.author}
                      onChange={(e) =>
                        setForm({ ...form, author: e.target.value })
                      }
                    >
                      {PRESET_AUTHORS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                      <option value="custom">+ Custom Author Name...</option>
                    </select>
                    <ChevronDown size={14} className="modal-select-chevron" />
                  </div>

                  {form.author === "custom" && (
                    <input
                      id={customAuthorInputId}
                      type="text"
                      className="modal-text-input"
                      style={{ marginTop: "8px" }}
                      placeholder="e.g. Vansh Chaudhary"
                      value={form.customAuthor}
                      onChange={(e) =>
                        setForm({ ...form, customAuthor: e.target.value })
                      }
                    />
                  )}
                </div>
              </div>

              {/* Estimated Read Time & Publication Status (Balanced 2-Column Grid) */}
              <div className="blog-grid-2col">
                <div className="dash-modal-field">
                  <div className="dash-field-label-row">
                    <label className="dash-field-label">Estimated Read Time</label>
                    <span className="blog-field-counter">
                      <Clock size={11} /> Auto-calculated
                    </span>
                  </div>
                  <div className="blog-read-time-input-wrap">
                    <input
                      type="number"
                      min={1}
                      max={60}
                      className="modal-text-input"
                      value={form.readTime}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          readTime: Math.max(1, parseInt(e.target.value, 10) || 1),
                        })
                      }
                    />
                    <span className="blog-unit-label">minutes</span>
                  </div>
                </div>

                <div className="dash-modal-field">
                  <label className="dash-field-label">Publication Status</label>
                  <div className="modal-select-wrapper">
                    <select
                      className="modal-text-input"
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                    >
                      <option value="published">Published (Live on Website)</option>
                      <option value="draft">Draft (Saved Privately)</option>
                    </select>
                    <ChevronDown size={14} className="modal-select-chevron" />
                  </div>
                </div>
              </div>

              {/* Card Excerpt / Article Lede */}
              <div className="dash-modal-field">
                <div className="dash-field-label-row">
                  <label className="dash-field-label">
                    Card Excerpt / Article Lede Summary
                  </label>
                  <span className="blog-field-counter">
                    {form.excerpt.length} chars (ideal: 120-180)
                  </span>
                </div>
                <textarea
                  rows={2}
                  className="modal-text-input"
                  placeholder="A concise 1-2 sentence preview for blog card grids and opening article introduction..."
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* ── TAB 2: CONTENT & BODY ── */}
          {activeTab === "content" && (
            <div className="blog-form-step-stack">
              {/* Header Bar with View Toggle */}
              <div className="blog-content-header-bar">
                <div className="dash-field-label-row" style={{ margin: 0 }}>
                  <label className="dash-field-label" style={{ margin: 0 }}>
                    Article Content &amp; Structured Body
                  </label>
                </div>
                <div className="blog-content-view-toggle">
                  <button
                    type="button"
                    className={`blog-view-tab ${contentView === "edit" ? "active" : ""}`}
                    onClick={() => setContentView("edit")}
                  >
                    <FileText size={13} />
                    <span>Write Markdown</span>
                  </button>
                  <button
                    type="button"
                    className={`blog-view-tab ${contentView === "preview" ? "active" : ""}`}
                    onClick={() => setContentView("preview")}
                  >
                    <Sparkles size={13} />
                    <span>Live Blog Preview</span>
                  </button>
                </div>
              </div>

              {contentView === "edit" ? (
                <>
                  {/* Quick Action Snippets Toolbar */}
                  <div className="blog-content-toolbar-row">
                    <span className="blog-content-toolbar-title">Add Elements:</span>
                    {ARTICLE_SNIPPETS.map((snip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="blog-snippet-btn"
                        onClick={() => insertSnippet(snip.snippet)}
                      >
                        +{snip.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="blog-template-btn"
                      onClick={handleLoadTemplate}
                      title="Load a complete GateXPay article structure with sections, takeaways, and checklist"
                    >
                      <Sparkles size={12} />
                      <span>Insert Article Template</span>
                    </button>
                  </div>

                  <div className="dash-modal-field">
                    <textarea
                      rows={14}
                      className="modal-text-input blog-editor-textarea"
                      placeholder={`Write your article body here in Markdown format...\n\nUse '## Section Title' to create sections that automatically appear in the Table of Contents on the live blog article.\n\nUse '> **Key Takeaway:** ...' for callout quote cards.\nUse '- item' for bullet lists.\nUse '- [x] item' for compliance checklists.\nUse '\`\`\`code\`\`\`' for API code blocks.`}
                      value={form.content}
                      onChange={handleContentChange}
                    />
                  </div>

                  <div className="blog-content-stats-bar">
                    <span>
                      Words:{" "}
                      <strong>
                        {
                          form.content
                            .trim()
                            .split(/\s+/)
                            .filter(Boolean).length
                        }
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      Sections:{" "}
                      <strong>
                        {
                          (form.content.match(/^##\s+/gm) || []).length
                        }
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      Estimated Read: <strong>{form.readTime} min read</strong>
                    </span>
                  </div>
                </>
              ) : (
                /* Live In-Modal Preview matching the website's Blog UI */
                <div className="blog-live-preview-box">
                  <div className="blog-preview-badge-row">
                    <span className="blog-preview-badge">
                      {form.category === "custom"
                        ? form.customCategory || "Category"
                        : form.category}
                    </span>
                    <span className="blog-preview-readtime">
                      <Clock size={12} />
                      <span>{form.readTime} min read</span>
                    </span>
                    <span style={{ fontSize: "12px", color: "#94A3B8" }}>
                      • By {form.author === "custom" ? form.customAuthor || "Author" : form.author}
                    </span>
                  </div>

                  <h1 className="blog-preview-title">
                    {form.title || "Untitled Blog Article"}
                  </h1>

                  {form.excerpt && (
                    <p className="blog-preview-lede">
                      {form.excerpt}
                    </p>
                  )}

                  <div className="blog-preview-body">
                    {renderMarkdownPreview(form.content)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── TAB 3: PRESENTATION, MEDIA & SEO ── */}
          {activeTab === "presentation" && (
            <div className="blog-form-step-stack">
              {/* Cover Image Preset Picker & Custom URL */}
              <div className="dash-modal-field">
                <label className="dash-field-label">Featured Cover Image</label>
                <div className="blog-cover-presets-grid">
                  {PRESET_COVERS.map((preset, idx) => {
                    const isSelected = form.coverImage === preset.url;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`blog-cover-preset-card ${
                          isSelected ? "active" : ""
                        }`}
                        onClick={() =>
                          setForm({ ...form, coverImage: preset.url })
                        }
                      >
                        <div
                          className="blog-cover-preset-thumb"
                          style={{ backgroundImage: `url(${preset.url})` }}
                        />
                        <span className="blog-cover-preset-name">
                          {preset.label}
                        </span>
                        {isSelected && (
                          <div className="blog-cover-check-badge">
                            <Check size={11} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: "12px" }}>
                  <label
                    className="dash-field-label"
                    style={{ fontSize: "11px", color: "#64748B" }}
                  >
                    Or Custom Image URL:
                  </label>
                  <input
                    type="url"
                    className="modal-text-input"
                    placeholder="https://... or /assets/images/custom-cover.jpg"
                    value={form.coverImage}
                    onChange={(e) =>
                      setForm({ ...form, coverImage: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Tags Input */}
              <div className="dash-modal-field">
                <label className="dash-field-label">Tags &amp; Keywords</label>
                <div className="blog-tags-pill-container">
                  {form.tags.map((tag) => (
                    <span key={tag} className="blog-active-tag-pill">
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        aria-label={`Remove tag ${tag}`}
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="blog-new-tag-input"
                    placeholder="Type tag & press Enter..."
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        handleAddTag(newTagInput);
                      }
                    }}
                  />
                </div>

                {/* Suggested Tag Pills */}
                <div className="blog-suggested-tags-row">
                  <span className="blog-suggested-lbl">Quick Add:</span>
                  {SUGGESTED_TAGS.filter((t) => !form.tags.includes(t)).map(
                    (tag) => (
                      <button
                        key={tag}
                        type="button"
                        className="blog-suggested-tag-btn"
                        onClick={() => handleAddTag(tag)}
                      >
                        +{tag}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Publication Status & Featured Toggle */}
              <div className="blog-grid-2col" style={{ marginTop: "4px" }}>
                <div className="dash-modal-field">
                  <label className="dash-field-label">Publication Status</label>
                  <div className="blog-status-radio-group">
                    <label
                      className={`blog-status-radio-card ${
                        form.status === "published" ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value="published"
                        checked={form.status === "published"}
                        onChange={() =>
                          setForm({ ...form, status: "published" })
                        }
                      />
                      <div className="blog-status-radio-text">
                        <strong>Published (Live)</strong>
                        <span>Visible to users on public /blog</span>
                      </div>
                    </label>

                    <label
                      className={`blog-status-radio-card ${
                        form.status === "draft" ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value="draft"
                        checked={form.status === "draft"}
                        onChange={() => setForm({ ...form, status: "draft" })}
                      />
                      <div className="blog-status-radio-text">
                        <strong>Draft</strong>
                        <span>Saved privately in admin console</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="dash-modal-field">
                  <label className="dash-field-label">Featured Insight</label>
                  <label className="blog-feature-toggle-card">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) =>
                        setForm({ ...form, isFeatured: e.target.checked })
                      }
                    />
                    <div>
                      <strong>Pin to Featured Hero</strong>
                      <span>Highlights this post in the main hero card</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="dash-modal-actions blog-modal-footer">
            <div className="blog-modal-footer-nav">
              {activeTab !== "general" && (
                <button
                  type="button"
                  className="dash-modal-cancel-btn"
                  onClick={() =>
                    setActiveTab(activeTab === "presentation" ? "content" : "general")
                  }
                >
                  Back
                </button>
              )}
              {activeTab !== "presentation" && (
                <button
                  type="button"
                  className="dash-modal-cancel-btn"
                  onClick={() =>
                    setActiveTab(activeTab === "general" ? "content" : "presentation")
                  }
                >
                  Next Step &rarr;
                </button>
              )}
            </div>

            <div className="blog-modal-footer-submit">
              <button
                type="button"
                className="dash-modal-cancel-btn"
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="dash-modal-submit-btn"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <div className="btn-inline-spinner" />
                    <span>{isEdit ? "Updating..." : "Publishing..."}</span>
                  </>
                ) : (
                  <>
                    <BookOpen size={14} />
                    <span>{isEdit ? "Update Article" : "Publish Article"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
