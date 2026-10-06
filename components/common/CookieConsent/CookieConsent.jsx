"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ChevronDown, ChevronUp, Check } from "lucide-react";
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
    let timer;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
      }
    } catch {
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
      className="cookie-consent-bar"
      aria-label="Cookie consent banner"
      role="region"
    >
      <div className="cookie-bar-container">
        {/* Customization Drawer */}
        {showCustomize && (
          <div className="cookie-preferences-drawer">
            <div className="cookie-drawer-header">
              <h4 className="cookie-drawer-title">Manage Cookie Preferences</h4>
              <p className="cookie-drawer-subtitle">
                Customize which cookies you wish to allow. Essential cookies are required for platform security and basic operations.
              </p>
            </div>
            <div className="cookie-pref-grid">
              {/* Essential */}
              <div className="cookie-pref-row">
                <div className="cookie-pref-info">
                  <span className="cookie-pref-name">Essential & Security</span>
                  <span className="cookie-pref-desc">
                    Required for CSRF protection, secure transaction routing, and active merchant sessions.
                  </span>
                </div>
                <span className="cookie-always-active">Always Active</span>
              </div>

              {/* Analytics */}
              <div className="cookie-pref-row">
                <div className="cookie-pref-info">
                  <span className="cookie-pref-name">Performance & Analytics</span>
                  <span className="cookie-pref-desc">
                    Helps us measure API latency, aggregate user flow, and improve uptime.
                  </span>
                </div>
                <label className="cookie-switch" aria-label="Toggle Performance & Analytics cookies">
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
                  <span className="cookie-pref-name">Functional & Preferences</span>
                  <span className="cookie-pref-desc">
                    Remembers regional preferences, currency choice, and chatbot state.
                  </span>
                </div>
                <label className="cookie-switch" aria-label="Toggle Functional & Preferences cookies">
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
                  <span className="cookie-pref-name">Marketing & Insights</span>
                  <span className="cookie-pref-desc">
                    Allows relevant product updates, fintech announcements, and partner offers.
                  </span>
                </div>
                <label className="cookie-switch" aria-label="Toggle Marketing & Insights cookies">
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
          </div>
        )}

        {/* Main Horizontal Bottom Bar */}
        <div className="cookie-bar-main">
          {/* Content (Left / Middle) */}
          <div className="cookie-bar-content">
            <div className="cookie-icon-box" aria-hidden="true">
              <Cookie className="w-5 h-5 text-sky-600" />
            </div>
            <div className="cookie-bar-text">
              <h3 className="cookie-bar-title">Cookie & Privacy Settings</h3>
              <p className="cookie-bar-desc">
                GateXPay uses cookies and secure browser storage to deliver reliable payment infrastructure, verify active merchant sessions, and analyze site performance. You can customize your preferences anytime. View our{" "}
                <Link href="/policy/cookie-policy" className="cookie-link">
                  Cookie Policy
                </Link>{" "}
                and{" "}
                <Link href="/policy/privacy-policy" className="cookie-link">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>

          {/* Action Buttons (Right / Last) */}
          <div className="cookie-bar-actions">
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
