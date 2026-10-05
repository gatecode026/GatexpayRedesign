"use client";
import { useState, useRef } from "react";
import { Headset, Users, AlertCircle } from "lucide-react";
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
  const [generalError, setGeneralError] = useState("");
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    serviceCategory: "",
    timeline: "Immediately",
    message: "",
    honeypot: "",
  });

  const validateField = (name, value) => {
    let error = "";
    if (name === "fullName") {
      if (!value.trim()) {
        error = "Full name is required";
      } else if (value.trim().length < 2) {
        error = "Full name must be at least 2 characters";
      }
    } else if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      if (!value.trim()) {
        error = "Phone number is required";
      } else if (digits.length < 7) {
        error = "Phone number must be at least 7 digits";
      }
    } else if (name === "email") {
      if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        error = "Please enter a valid email address";
      }
    } else if (name === "serviceCategory") {
      if (!value || value.trim() === "") {
        error = "Please select a service category";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (!error) {
          delete next[name];
        } else {
          next[name] = error;
        }
        return next;
      });
    }
    if (generalError) setGeneralError("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (["fullName", "phone", "email", "serviceCategory"].includes(name)) {
      const error = validateField(name, value);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    // Validate all required fields inline
    const newErrors = {};
    const nameErr = validateField("fullName", formData.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const phoneErr = validateField("phone", formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const emailErr = validateField("email", formData.email);
    if (emailErr) newErrors.email = emailErr;

    const catErr = validateField("serviceCategory", formData.serviceCategory);
    if (catErr) newErrors.serviceCategory = catErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus the first invalid field
      const firstInvalidKey = ["fullName", "email", "phone", "serviceCategory"].find(
        (k) => newErrors[k]
      );
      if (firstInvalidKey && formRef.current) {
        const el = formRef.current.elements.namedItem(firstInvalidKey);
        if (el && typeof el.focus === "function") {
          el.focus();
        }
      }
      return;
    }

    setIsSubmitting(true);
    const payload = {
      fullName: formData.fullName.trim(),
      companyName: formData.companyName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      serviceCategory: formData.serviceCategory,
      timeline: formData.timeline || "Immediately",
      message: formData.message.trim(),
      source: "contact_page",
      honeypot: formData.honeypot,
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Unable to connect to server. Please try again.");
      }

      if (!res.ok || !data.success) {
        // If server returns Zod validation issue details, map them to inline field errors
        if (data.details && Array.isArray(data.details)) {
          const serverFieldErrors = {};
          data.details.forEach((issue) => {
            const field = issue.path?.[0];
            if (field && !serverFieldErrors[field]) {
              serverFieldErrors[field] = issue.message;
            }
          });
          if (Object.keys(serverFieldErrors).length > 0) {
            setErrors(serverFieldErrors);
            const firstKey = Object.keys(serverFieldErrors)[0];
            const el = formRef.current?.elements.namedItem(firstKey);
            if (el && typeof el.focus === "function") el.focus();
            return;
          }
        }
        throw new Error(
          data.error || "Failed to submit enquiry. Please try again."
        );
      }
      setSubmitted(true);
    } catch (err) {
      console.error("[ContactIntro Submit Error]:", err);
      setGeneralError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
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
                  ref={formRef}
                  className="contact-intro-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="contact-intro-form-row">
                    <div className="contact-form-field">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="name"
                        className={errors.fullName ? "is-invalid" : ""}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? "error-fullName" : undefined}
                      />
                      {errors.fullName && (
                        <span id="error-fullName" className="contact-field-error" role="alert">
                          <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    <div className="contact-form-field">
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={handleChange}
                        autoComplete="organization"
                      />
                    </div>
                  </div>

                  <div className="contact-intro-form-row">
                    <div className="contact-form-field">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="email"
                        className={errors.email ? "is-invalid" : ""}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "error-email" : undefined}
                      />
                      {errors.email && (
                        <span id="error-email" className="contact-field-error" role="alert">
                          <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="contact-form-field">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="tel"
                        className={errors.phone ? "is-invalid" : ""}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "error-phone" : undefined}
                      />
                      {errors.phone && (
                        <span id="error-phone" className="contact-field-error" role="alert">
                          <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="contact-form-field">
                    <div className="contact-intro-select-wrap">
                      <select
                        name="serviceCategory"
                        value={formData.serviceCategory}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-label="Service Category"
                        className={errors.serviceCategory ? "is-invalid" : ""}
                        aria-invalid={Boolean(errors.serviceCategory)}
                        aria-describedby={errors.serviceCategory ? "error-serviceCategory" : undefined}
                      >
                        <option value="" disabled>
                          Service Category *
                        </option>
                        {SERVICE_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.serviceCategory && (
                      <span id="error-serviceCategory" className="contact-field-error" role="alert">
                        <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                        {errors.serviceCategory}
                      </span>
                    )}
                  </div>

                  <div className="contact-form-field">
                    <div className="contact-intro-select-wrap">
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
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
                  </div>

                  <div className="contact-form-field">
                    <textarea
                      name="message"
                      placeholder="Tell us about your requirements"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {generalError && (
                    <div className="contact-general-error" role="alert">
                      <AlertCircle size={16} strokeWidth={2} aria-hidden="true" />
                      <span>{generalError}</span>
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
