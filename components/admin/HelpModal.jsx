"use client";
import React from "react";
import { X, Mail, Phone } from "lucide-react";
export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="dash-modal-overlay">
      <div className="dash-modal-card" style={{ maxWidth: "460px" }}>
        <div className="dash-modal-header">
          <h3 className="dash-modal-title">GateXPay Expert Support</h3>
          <button
            type="button"
            className="dash-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <div className="dash-modal-body">
          <p className="text-sm text-slate-600">
            Need technical or operational assistance with merchant onboarding,
            RBI compliance, or payment gateway APIs?
          </p>
          <div className="expert-contact-box">
            <div className="expert-item">
              <Mail size={16} className="text-sky-600" />
              <span>support@gatexpay.com</span>
            </div>
            <div className="expert-item">
              <Phone size={16} className="text-emerald-600" />
              <span>+91 98765 43210 (Toll-Free Priority Desk)</span>
            </div>
          </div>
          <div className="dash-modal-actions">
            <button
              type="button"
              className="dash-modal-done-btn w-full"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
