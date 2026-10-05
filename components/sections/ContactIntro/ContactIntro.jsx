"use client";
import { useState } from "react";
import { Headset, Users } from "lucide-react";
import Container from "@/components/common/Container/Container";
import { SOLUTIONS } from "@/components/layout/Navbar/SolutionsMegaMenu";
import "./ContactIntro.css";
const SERVICE_CATEGORIES = [...SOLUTIONS.map((cat) => cat.title), "Other"];
const TIMELINES = [
  "Immediately",
  "Within 1 month",
  "1–3 months",
  "Just exploring",
];
const STATS = [
  { value: "500+", label: "Businesses Served" },
  { value: "5+", label: "Years of Expertise" },
  { value: "50+", label: "Fintech Integrations" },
];
export default function ContactIntro() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);
    const payload = {
      fullName: formData.get("fullName") || "",
      companyName: formData.get("companyName") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      serviceCategory: formData.get("serviceCategory") || "",
      timeline: formData.get("timeline") || "Immediately",
      message: formData.get("message") || "",
      source: "contact_page",
    };
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(
          data.error || "Failed to submit enquiry. Please try again."
        );
      }
      setSubmitted(true);
    } catch (err) {
      console.error("[ContactIntro Submit Error]:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="contact-intro">
      <Container>
        <div className="contact-intro-grid">
          {/* ── Left: heading, description, contact rows, stats ──────────── */}
          <div className="contact-intro-left">
            <h1 className="contact-intro-title">
              Let&rsquo;s Build Your
              <br />
              <span className="contact-intro-title-blue">
                Payment Infrastructure
              </span>
            </h1>

            <p className="contact-intro-desc">
              Have a fintech infrastructure requirement, partnership
              opportunity, or a question about our payment platform? We&rsquo;re
              here to help.
            </p>

            <div className="contact-intro-rows">
              <div className="contact-intro-row">
                <span className="contact-intro-icon" aria-hidden="true">
                  <Headset size={24} strokeWidth={1.8} />
                </span>
                <div className="contact-intro-row-text">
                  <span className="contact-intro-row-label">
                    Technical Support
                  </span>
                  <a href="mailto:info@gatexpay.in">info@gatexpay.in</a>
                </div>
              </div>

              <div className="contact-intro-row">
                <span className="contact-intro-icon" aria-hidden="true">
                  <Users size={24} strokeWidth={1.8} />
                </span>
                <div className="contact-intro-row-text">
                  <span className="contact-intro-row-label">
                    Sales &amp; Partnerships
                  </span>
                  <span className="contact-intro-row-multi">
                    <a href="mailto:vitin@gatexpay.in">vitin@gatexpay.in</a>
                    <span aria-hidden="true">|</span>
                    <a href="tel:+918502888838">+91-8502888838</a>
                  </span>
                </div>
              </div>
            </div>

            <div className="contact-intro-stats">
              {STATS.map((stat) => (
                <div key={stat.label} className="contact-intro-stat">
                  <span className="contact-intro-stat-value">{stat.value}</span>
                  <span className="contact-intro-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: "Discuss your Requirements" form card ─────────────── */}
          <div className="contact-intro-form-card">
            {submitted ? (
              <div className="contact-intro-success">
                <h2 className="contact-intro-form-title">
                  Thanks — you&rsquo;re all set
                </h2>
                <p className="contact-intro-form-subtitle">
                  We&rsquo;ve received your details and our team will reach out
                  within one business day.
                </p>
              </div>
            ) : (
              <>
                <h2 className="contact-intro-form-title">
                  Discuss your Requirements
                </h2>
                <p className="contact-intro-form-subtitle">
                  Share a few details and our team will reach out within one
                  business day.
                </p>

                <form
                  className="contact-intro-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="contact-intro-form-row">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      autoComplete="name"
                    />
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      autoComplete="organization"
                    />
                  </div>

                  <div className="contact-intro-form-row">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="contact-intro-select-wrap">
                    <select
                      name="serviceCategory"
                      defaultValue=""
                      aria-label="Service Category"
                    >
                      <option value="" disabled>
                        Service Category
                      </option>
                      {SERVICE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="contact-intro-select-wrap">
                    <select
                      name="timeline"
                      defaultValue=""
                      aria-label="Project Timeline"
                    >
                      <option value="" disabled>
                        Project Timeline
                      </option>
                      {TIMELINES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    name="message"
                    placeholder="Tell us about your requirements"
                    rows={4}
                  />

                  <input
                    type="text"
                    name="honeypot"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {errorMessage && (
                    <div
                      style={{
                        color: "#ef4444",
                        fontSize: "13.5px",
                        padding: "6px 0",
                        fontWeight: 500,
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="contact-intro-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                  </button>

                  <p className="contact-intro-legal">
                    By contacting us, you agree to our{" "}
                    <a href="/policy" target="_blank" rel="noopener noreferrer">
                      Terms &amp; Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/policy" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
