"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Cookie,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Check,
  X,
} from "lucide-react";
import "./CookieConsent.css";
const STORAGE_KEY = "gatexpay_cookie_consent_v1";
export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: true,
    functional: true,
    marketing: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    // Check if consent has already been given
    let timer;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
      }
    } catch {
      // LocalStorage access failure fallback - trigger asynchronously
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);
  const getOrCreateConsentId = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.consentId) return parsed.consentId;
      }
    } catch {
      // ignore
    }
    return `gxp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  };
  const saveConsent = async (decision, finalPrefs) => {
    setIsSaving(true);
    const consentId = getOrCreateConsentId();
    const payload = {
      consentId,
      decision,
      preferences: finalPrefs,
      url: typeof window !== "undefined" ? window.location.pathname : "/",
    };
    // Store in browser
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...payload,
          timestamp: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
    // Persist to MongoDB backend via API
    try {
      await fetch("/api/cookie-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Failed to sync consent to server:", error);
    } finally {
      setIsSaving(false);
      setIsVisible(false);
    }
  };
  const handleAcceptAll = () => {
    const allOn = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    setPreferences(allOn);
    saveConsent("all", allOn);
  };
  const handleEssentialOnly = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    saveConsent("essential_only", essentialOnly);
  };
  const handleSaveCustom = () => {
    saveConsent("custom", preferences);
  };
  if (!isVisible) return null;
  return (
    <aside
      className="cookie-consent-overlay"
      aria-label="Cookie consent banner"
      role="dialog"
      aria-modal="false"
    >
      <div className="cookie-consent-card animate-slide-up">
        {/* Header */}
        <div className="cookie-consent-header">
          <div className="cookie-consent-title-wrap">
            <div className="cookie-icon-box">
              <Cookie className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="cookie-title">Cookie & Privacy Settings</h3>
                <span className="cookie-badge">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  DPDP Act 2023
                </span>
              </div>
              <p className="cookie-subtitle">
                We respect your personal data and privacy rights.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="cookie-close-btn"
            onClick={handleEssentialOnly}
            aria-label="Dismiss with essential cookies only"
            title="Use essential cookies only"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Text */}
        <div className="cookie-consent-body">
          <p>
            GateXPay uses cookies and secure browser storage to deliver reliable
            payment infrastructure, verify active merchant sessions, and analyze
            site performance. You can customize your preferences anytime. View
            our{" "}
            <Link href="/policy/cookie-policy" className="cookie-link">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/policy/privacy-policy" className="cookie-link">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Customization Drawer */}
        {showCustomize && (
          <div className="cookie-preferences-drawer">
            {/* Essential */}
            <div className="cookie-pref-row">
              <div className="cookie-pref-info">
                <span className="cookie-pref-name">Essential & Security</span>
                <span className="cookie-pref-desc">
                  Required for CSRF protection, secure transaction routing, and
                  login sessions.
                </span>
              </div>
              <span className="cookie-always-active">Always Active</span>
            </div>

            {/* Analytics */}
            <div className="cookie-pref-row">
              <div className="cookie-pref-info">
                <span className="cookie-pref-name">
                  Performance & Analytics
                </span>
                <span className="cookie-pref-desc">
                  Helps us measure API latency, aggregate user flow, and improve
                  uptime.
                </span>
              </div>
              <label className="cookie-switch">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      analytics: e.target.checked,
                    })
                  }
                />
                <span className="cookie-slider"></span>
              </label>
            </div>

            {/* Functional */}
            <div className="cookie-pref-row">
              <div className="cookie-pref-info">
                <span className="cookie-pref-name">
                  Functional & Experience
                </span>
                <span className="cookie-pref-desc">
                  Remembers your currency choice, language, and chatbot chat
                  state.
                </span>
              </div>
              <label className="cookie-switch">
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      functional: e.target.checked,
                    })
                  }
                />
                <span className="cookie-slider"></span>
              </label>
            </div>

            {/* Marketing */}
            <div className="cookie-pref-row">
              <div className="cookie-pref-info">
                <span className="cookie-pref-name">
                  Marketing & Personalization
                </span>
                <span className="cookie-pref-desc">
                  Allows relevant partner updates, fintech insights, and product
                  announcements.
                </span>
              </div>
              <label className="cookie-switch">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      marketing: e.target.checked,
                    })
                  }
                />
                <span className="cookie-slider"></span>
              </label>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="cookie-consent-actions">
          <button
            type="button"
            className="cookie-customize-toggle"
            onClick={() => setShowCustomize(!showCustomize)}
          >
            {showCustomize ? (
              <>
                Less Options <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Customize Options <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="cookie-main-buttons">
            {showCustomize ? (
              <button
                type="button"
                className="cookie-btn cookie-btn-primary"
                onClick={handleSaveCustom}
                disabled={isSaving}
              >
                <Check className="w-4 h-4" /> Save Preferences
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="cookie-btn cookie-btn-secondary"
                  onClick={handleEssentialOnly}
                  disabled={isSaving}
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  className="cookie-btn cookie-btn-primary"
                  onClick={handleAcceptAll}
                  disabled={isSaving}
                >
                  Accept All Cookies
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
