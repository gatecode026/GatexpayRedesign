"use client";
import { useState } from "react";
import "./NewsletterCTA.css";
export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Subscription failed. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="blog-section newsletter-section">
      <div className="blog-container">
        <div className="newsletter-card">
          <div className="newsletter-text">
            <h2 className="newsletter-heading">
              Stay Ahead of What&apos;s Changing in Fintech.
            </h2>
            <p className="newsletter-desc">
              Get practical fintech insights, technology updates, and regulatory
              developments delivered to your inbox once a month.
            </p>
          </div>
          <div className="newsletter-form-wrap">
            {submitted ? (
              <p className="newsletter-success" role="status">
                You&apos;re subscribed! Watch your inbox for our next issue.
              </p>
            ) : (
              <form
                className="newsletter-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="newsletter-input-group">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Work email
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    className="newsletter-input"
                    placeholder="Work email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    aria-invalid={!!error}
                    aria-describedby={error ? "newsletter-error" : undefined}
                  />
                  <button type="submit" className="newsletter-btn">
                    Subscribe <span aria-hidden="true">→</span>
                  </button>
                </div>
                {error && (
                  <p
                    id="newsletter-error"
                    className="newsletter-error"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
