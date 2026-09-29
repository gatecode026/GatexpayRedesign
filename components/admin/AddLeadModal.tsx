"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leadData: any) => Promise<void>;
  submitting: boolean;
}

export default function AddLeadModal({
  isOpen,
  onClose,
  onSubmit,
  submitting,
}: AddLeadModalProps) {
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    serviceCategory: "Payment Gateway Integration",
    timeline: "Immediately",
    message: "",
    notes: "",
    source: "contact_modal" as const,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <div className="dash-modal-overlay">
      <div className="dash-modal-card">
        <div className="dash-modal-header">
          <div>
            <h3 className="dash-modal-title">Add New Merchant Lead</h3>
            <span className="dash-modal-id">Create manual enquiry in MongoDB</span>
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

        <form onSubmit={handleSubmit} className="dash-modal-body">
          <div className="dash-modal-grid">
            <div className="dash-modal-field">
              <label className="dash-field-label">Merchant Name *</label>
              <input
                type="text"
                required
                className="modal-text-input"
                placeholder="e.g. Aditya Sharma"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </div>

            <div className="dash-modal-field">
              <label className="dash-field-label">Company Name</label>
              <input
                type="text"
                className="modal-text-input"
                placeholder="e.g. Sharma Retailers Pvt Ltd"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              />
            </div>

            <div className="dash-modal-field">
              <label className="dash-field-label">Phone Number *</label>
              <input
                type="tel"
                required
                className="modal-text-input"
                placeholder="e.g. 9822334455"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className="dash-modal-field">
              <label className="dash-field-label">Email Address</label>
              <input
                type="email"
                className="modal-text-input"
                placeholder="e.g. adit@sharmaretail.in"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="dash-modal-field">
              <label className="dash-field-label">Service Requested *</label>
              <select
                className="modal-text-input"
                value={form.serviceCategory}
                onChange={(e) => setForm({ ...form, serviceCategory: e.target.value })}
              >
                <option value="Payment Gateway Integration">Payment Gateway Integration</option>
                <option value="Payments & Banking">Payments &amp; Banking</option>
                <option value="Micro ATM Services">Micro ATM Services</option>
                <option value="AEPS Services">AEPS Services</option>
                <option value="PAN Card Services">PAN Card Services</option>
                <option value="Bill Payment Services">Bill Payment Services</option>
                <option value="Digital Marketing Services">Digital Marketing Services</option>
              </select>
            </div>

            <div className="dash-modal-field">
              <label className="dash-field-label">Timeline</label>
              <select
                className="modal-text-input"
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              >
                <option value="Immediately">Immediately</option>
                <option value="Within 1 month">Within 1 month</option>
                <option value="1-3 months">1-3 months</option>
                <option value="Exploring">Exploring</option>
              </select>
            </div>
          </div>

          <div className="dash-modal-field">
            <label className="dash-field-label">Customer Message / Requirements</label>
            <textarea
              rows={3}
              className="modal-text-input"
              placeholder="Additional enquiry requirements or context..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <div className="dash-modal-actions">
            <button
              type="button"
              className="dash-modal-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="dash-modal-done-btn"
            >
              {submitting ? "Saving..." : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
