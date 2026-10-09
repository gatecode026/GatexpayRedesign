"use client";
import { useState, useRef, useEffect } from "react";
import { Headset, Users, AlertCircle } from "lucide-react";
import Container from "@/components/common/Container/Container";
import { SOLUTIONS } from "@/components/layout/Navbar/SolutionsMegaMenu";
import FloatingDropdown from "@/components/common/FloatingDropdown/FloatingDropdown";
import "./ContactIntro.css";

const SERVICE_CATEGORIES = [...SOLUTIONS.map((cat) => cat.title), "Other"];
const COUNTRY_CODES = [
  { value: "+91", label: "IND +91" },
  { value: "+1", label: "USA +1" },
  { value: "+44", label: "UK +44" },
  { value: "+971", label: "UAE +971" },
  { value: "+65", label: "SGP +65" },
];
const TIMELINES = [
  "Immediately",
  "Within 1 month",
  "1–3 months",
  "Just exploring",
];

const STATS = [
  { target: 500, suffix: "+", label: "Businesses Served" },
  { target: 5, suffix: "+", label: "Years of Expertise" },
  { target: 50, suffix: "+", label: "Fintech Integrations" },
];

export default function ContactIntro() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  // ── Interactive Counter Animation (Runs only once on first interaction) ──
  const [statValues, setStatValues] = useState(() => STATS.map((s) => s.target));
  const statsRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const animationFrameIdRef = useRef(null);

  const runCountAnimation = () => {
    if (hasAnimatedRef.current || isAnimatingRef.current) return;
    hasAnimatedRef.current = true;
    isAnimatingRef.current = true;
    const duration = 1200; // ms
    const startTimestamp = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setStatValues(STATS.map((s) => s.target * easeOut));
      if (progress < 1) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        setStatValues(STATS.map((s) => s.target));
        isAnimatingRef.current = false;
      }
    };
    setStatValues([0, 0, 0]);
    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          observer.disconnect();
          runCountAnimation();
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    countryCode: "+91",
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
    if (hasSubmitted) {
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
    if (!hasSubmitted) return;
    const { name, value } = e.target;
    if (["fullName", "phone", "email", "serviceCategory"].includes(name)) {
      const error = validateField(name, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (error) next[name] = error;
        else delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
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
      countryCode: formData.countryCode || "+91",
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

            <div
              ref={statsRef}
              className="contact-intro-stats"
              onMouseEnter={runCountAnimation}
              onClick={runCountAnimation}
              onTouchStart={runCountAnimation}
              role="region"
              aria-label="GateXPay Key Metrics"
            >
              {STATS.map((stat, idx) => (
                <div key={stat.label} className="contact-intro-stat">
                  <span className="contact-intro-stat-value">
                    {Math.floor(statValues[idx])}{stat.suffix}
                  </span>
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
                      <div className={`floating-field ${formData.fullName ? "has-value" : ""}`}>
                        <input
                          id="intro-fullName"
                          type="text"
                          name="fullName"
                          placeholder=" "
                          value={formData.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="name"
                          className={hasSubmitted && errors.fullName ? "is-invalid" : ""}
                          aria-invalid={Boolean(hasSubmitted && errors.fullName)}
                          aria-describedby={hasSubmitted && errors.fullName ? "error-fullName" : undefined}
                        />
                        <label htmlFor="intro-fullName">
                          Full Name <span className="floating-req">*</span>
                        </label>
                      </div>
                      {hasSubmitted && errors.fullName && (
                        <span id="error-fullName" className="contact-field-error" role="alert">
                          <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    <div className="contact-form-field">
                      <div className={`floating-field ${formData.companyName ? "has-value" : ""}`}>
                        <input
                          id="intro-companyName"
                          type="text"
                          name="companyName"
                          placeholder=" "
                          value={formData.companyName}
                          onChange={handleChange}
                          autoComplete="organization"
                        />
                        <label htmlFor="intro-companyName">Company Name</label>
                      </div>
                    </div>
                  </div>

                  <div className="contact-intro-form-row">
                    <div className="contact-form-field">
                      <div className={`floating-field ${formData.email ? "has-value" : ""}`}>
                        <input
                          id="intro-email"
                          type="email"
                          name="email"
                          placeholder=" "
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="email"
                          className={hasSubmitted && errors.email ? "is-invalid" : ""}
                          aria-invalid={Boolean(hasSubmitted && errors.email)}
                          aria-describedby={hasSubmitted && errors.email ? "error-email" : undefined}
                        />
                        <label htmlFor="intro-email">Email Address</label>
                      </div>
                      {hasSubmitted && errors.email && (
                        <span id="error-email" className="contact-field-error" role="alert">
                          <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="contact-form-field">
                      <FloatingDropdown
                        id="intro-timeline"
                        name="timeline"
                        label="Project Timeline"
                        value={formData.timeline}
                        options={TIMELINES}
                        onChange={(name, val) => {
                          setFormData((prev) => ({ ...prev, [name]: val }));
                        }}
                        hasSubmitted={hasSubmitted}
                      />
                    </div>
                  </div>

                  <div className="contact-form-field">
                    <div className="contact-phone-row">
                      <div className="contact-phone-code">
                        <FloatingDropdown
                          id="intro-countryCode"
                          name="countryCode"
                          label="Code"
                          value={formData.countryCode}
                          options={COUNTRY_CODES}
                          openAbove={true}
                          singleItemScroll={true}
                          onChange={(name, val) => {
                            setFormData((prev) => ({ ...prev, [name]: val }));
                          }}
                          hasSubmitted={hasSubmitted}
                        />
                      </div>
                      <div className={`floating-field ${formData.phone ? "has-value" : ""}`} style={{ flex: 1 }}>
                        <input
                          id="intro-phone"
                          type="tel"
                          name="phone"
                          placeholder=" "
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="tel-national"
                          className={hasSubmitted && errors.phone ? "is-invalid" : ""}
                          aria-invalid={Boolean(hasSubmitted && errors.phone)}
                          aria-describedby={hasSubmitted && errors.phone ? "error-phone" : undefined}
                        />
                        <label htmlFor="intro-phone">
                          Mobile Number <span className="floating-req">*</span>
                        </label>
                      </div>
                    </div>
                    {hasSubmitted && errors.phone && (
                      <span id="error-phone" className="contact-field-error" role="alert">
                        <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="contact-form-field">
                    <FloatingDropdown
                      id="intro-serviceCategory"
                      name="serviceCategory"
                      label="Service Category"
                      required
                      value={formData.serviceCategory}
                      options={SERVICE_CATEGORIES}
                      onChange={(name, val) => {
                        setFormData((prev) => ({ ...prev, [name]: val }));
                        if (hasSubmitted) {
                          const err = validateField(name, val);
                          setErrors((prev) => {
                            const next = { ...prev };
                            if (!err) delete next[name];
                            else next[name] = err;
                            return next;
                          });
                        }
                      }}
                      onBlur={(name, val) => {
                        if (hasSubmitted) {
                          const err = validateField(name, val);
                          if (err) setErrors((prev) => ({ ...prev, [name]: err }));
                        }
                      }}
                      error={errors.serviceCategory}
                      hasSubmitted={hasSubmitted}
                    />
                    {hasSubmitted && errors.serviceCategory && (
                      <span id="error-serviceCategory" className="contact-field-error" role="alert">
                        <AlertCircle size={13} strokeWidth={2} aria-hidden="true" />
                        {errors.serviceCategory}
                      </span>
                    )}
                  </div>

                  <div className="contact-form-field">
                    <div className={`floating-field ${formData.message ? "has-value" : ""}`}>
                      <textarea
                        id="intro-message"
                        name="message"
                        placeholder=" "
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                      />
                      <label htmlFor="intro-message">Tell us about your requirements</label>
                    </div>
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
