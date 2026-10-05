"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { X, AlertCircle } from "lucide-react";
import { SOLUTIONS } from "@/components/layout/Navbar/SolutionsMegaMenu";
import "./ContactModal.css";

const SERVICE_CATEGORIES = [...SOLUTIONS.map((cat) => cat.title), "Other"];
const COUNTRY_CODES = [
  { value: "+91", label: "IND +91" },
  { value: "+1", label: "USA +1" },
  { value: "+44", label: "UK +44" },
  { value: "+971", label: "UAE +971" },
  { value: "+65", label: "SGP +65" },
];

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [errors, setErrors] = useState({});
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    serviceCategory: "",
    companyName: "",
    countryCode: "+91",
    mobileNumber: "",
    honeypot: "",
  });

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setIsSubmitting(false);
    setGeneralError("");
    setErrors({});
    setFormData({
      fullName: "",
      serviceCategory: "",
      companyName: "",
      countryCode: "+91",
      mobileNumber: "",
      honeypot: "",
    });
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "fullName") {
      if (!value.trim()) {
        error = "Full name is required";
      } else if (value.trim().length < 2) {
        error = "Full name must be at least 2 characters";
      }
    } else if (name === "serviceCategory") {
      if (!value || value.trim() === "") {
        error = "Please select a service category";
      }
    } else if (name === "mobileNumber") {
      const digits = value.replace(/\D/g, "");
      if (!value.trim()) {
        error = "Mobile number is required";
      } else if (digits.length < 7) {
        error = "Mobile number must be at least 7 digits";
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
        if (!error) delete next[name];
        else next[name] = error;
        return next;
      });
    }
    if (generalError) setGeneralError("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (["fullName", "serviceCategory", "mobileNumber"].includes(name)) {
      const error = validateField(name, value);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    const newErrors = {};
    const nameErr = validateField("fullName", formData.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const catErr = validateField("serviceCategory", formData.serviceCategory);
    if (catErr) newErrors.serviceCategory = catErr;

    const phoneErr = validateField("mobileNumber", formData.mobileNumber);
    if (phoneErr) newErrors.mobileNumber = phoneErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstInvalidKey = ["fullName", "serviceCategory", "mobileNumber"].find(
        (k) => newErrors[k]
      );
      if (firstInvalidKey && formRef.current) {
        const el = formRef.current.elements.namedItem(firstInvalidKey);
        if (el && typeof el.focus === "function") el.focus();
      }
      return;
    }

    setIsSubmitting(true);
    const payload = {
      fullName: formData.fullName.trim(),
      serviceCategory: formData.serviceCategory,
      companyName: formData.companyName.trim(),
      countryCode: formData.countryCode || "+91",
      phone: formData.mobileNumber.trim(),
      source: "contact_modal",
      timeline: "Immediately",
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
        if (data.details && Array.isArray(data.details)) {
          const serverFieldErrors = {};
          data.details.forEach((issue) => {
            let field = issue.path?.[0];
            if (field === "phone") field = "mobileNumber";
            if (field && !serverFieldErrors[field]) {
              serverFieldErrors[field] = issue.message;
            }
          });
          if (Object.keys(serverFieldErrors).length > 0) {
            setErrors(serverFieldErrors);
            return;
          }
        }
        throw new Error(
          data.error || "Failed to submit enquiry. Please try again."
        );
      }
      setSubmitted(true);
    } catch (err) {
      console.error("[ContactModal Submit Error]:", err);
      setGeneralError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="contact-modal-overlay" onMouseDown={handleOverlayClick}>
      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        ref={dialogRef}
      >
        <button
          type="button"
          className="contact-modal-close"
          aria-label="Close"
          onClick={handleClose}
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="contact-modal-success">
            <h2 id="contact-modal-title" className="contact-modal-title">
              Thanks — you&rsquo;re all set
            </h2>
            <p className="contact-modal-subtitle">
              We&rsquo;ve received your details and our team will reach out
              within one business day.
            </p>
            <button
              type="button"
              className="contact-modal-submit"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="contact-modal-title" className="contact-modal-title">
              Let&rsquo;s scale your payments
            </h2>
            <p className="contact-modal-subtitle">
              Share a few details and our team will reach out within one
              business day.
            </p>

            <form
              ref={formRef}
              className="contact-modal-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="contact-modal-field">
                <input
                  ref={firstFieldRef}
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                  className={errors.fullName ? "is-invalid" : ""}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "modal-err-fullName" : undefined}
                />
                {errors.fullName && (
                  <span id="modal-err-fullName" className="contact-modal-field-error" role="alert">
                    <AlertCircle size={12} strokeWidth={2} aria-hidden="true" />
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="contact-modal-field">
                <div className="contact-modal-select-wrap">
                  <select
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-label="Service Category"
                    className={errors.serviceCategory ? "is-invalid" : ""}
                    aria-invalid={Boolean(errors.serviceCategory)}
                    aria-describedby={errors.serviceCategory ? "modal-err-serviceCategory" : undefined}
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
                  <span id="modal-err-serviceCategory" className="contact-modal-field-error" role="alert">
                    <AlertCircle size={12} strokeWidth={2} aria-hidden="true" />
                    {errors.serviceCategory}
                  </span>
                )}
              </div>

              <div className="contact-modal-field">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  autoComplete="organization"
                />
              </div>

              <div className="contact-modal-field">
                <div className="contact-modal-phone-row">
                  <div className="contact-modal-code-field">
                    <label htmlFor="contact-modal-code">Code</label>
                    <div className="contact-modal-select-wrap">
                      <select
                        id="contact-modal-code"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Mobile Number *"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="tel-national"
                    className={errors.mobileNumber ? "is-invalid" : ""}
                    aria-invalid={Boolean(errors.mobileNumber)}
                    aria-describedby={errors.mobileNumber ? "modal-err-phone" : undefined}
                  />
                </div>
                {errors.mobileNumber && (
                  <span id="modal-err-phone" className="contact-modal-field-error" role="alert">
                    <AlertCircle size={12} strokeWidth={2} aria-hidden="true" />
                    {errors.mobileNumber}
                  </span>
                )}
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
                <div className="contact-modal-general-error" role="alert">
                  <AlertCircle size={14} strokeWidth={2} aria-hidden="true" />
                  <span>{generalError}</span>
                </div>
              )}

              <button
                type="submit"
                className="contact-modal-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              <p className="contact-modal-legal">
                By contacting us, you agree to our{" "}
                <Link href="/policy" target="_blank" rel="noopener noreferrer">
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link href="/policy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
