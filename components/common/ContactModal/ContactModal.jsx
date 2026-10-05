"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { X } from "lucide-react";
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
  const [errorMessage, setErrorMessage] = useState("");
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setIsSubmitting(false);
    setErrorMessage("");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);
    const payload = {
      fullName: formData.get("fullName") || "",
      serviceCategory: formData.get("serviceCategory") || "",
      companyName: formData.get("companyName") || "",
      countryCode: formData.get("countryCode") || "+91",
      phone: formData.get("mobileNumber") || "",
      source: "contact_modal",
      timeline: "Immediately",
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
      console.error("[ContactModal Submit Error]:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
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
              className="contact-modal-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <input
                ref={firstFieldRef}
                type="text"
                name="fullName"
                placeholder="Full Name"
                autoComplete="name"
              />

              <div className="contact-modal-select-wrap">
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

              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                autoComplete="organization"
              />

              <div className="contact-modal-phone-row">
                <div className="contact-modal-code-field">
                  <label htmlFor="contact-modal-code">Code</label>
                  <div className="contact-modal-select-wrap">
                    <select
                      id="contact-modal-code"
                      name="countryCode"
                      defaultValue="+91"
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
                  placeholder="Mobile Number"
                  autoComplete="tel-national"
                />
              </div>

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
                    fontSize: "13px",
                    padding: "6px 0",
                    textAlign: "center",
                  }}
                >
                  {errorMessage}
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
