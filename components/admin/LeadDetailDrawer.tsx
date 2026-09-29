"use client";

import React, { useState } from "react";
import { X, Send, StickyNote } from "lucide-react";
import { Lead } from "./types";

interface LeadDetailDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: string) => void;
  onSaveNote: (notes: string) => void;
}

export default function LeadDetailDrawer({
  lead,
  isOpen,
  onClose,
  onStatusChange,
  onSaveNote,
}: LeadDetailDrawerProps) {
  const [noteInput, setNoteInput] = useState(lead?.notes || "");

  if (!isOpen || !lead) return null;

  return (
    <div className="dash-modal-overlay">
      <div className="dash-modal-card lead-detail-card">
        <div className="dash-modal-header">
          <div>
            <h3 className="dash-modal-title">{lead.fullName}</h3>
            <span className="dash-modal-id">Lead ID: {lead._id}</span>
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

        <div className="dash-modal-body">
          <div className="dash-modal-grid">
            <div className="dash-modal-field">
              <span className="dash-field-label">Company Name</span>
              <span className="dash-field-val">{lead.companyName || "Not specified"}</span>
            </div>

            <div className="dash-modal-field">
              <span className="dash-field-label">Phone</span>
              <a
                href={`tel:${lead.countryCode || ""}${lead.phone}`}
                className="dash-field-val text-sky-600 underline"
              >
                {lead.countryCode || "+91"} {lead.phone}
              </a>
            </div>

            <div className="dash-modal-field">
              <span className="dash-field-label">Email</span>
              {lead.email ? (
                <a
                  href={`mailto:${lead.email}`}
                  className="dash-field-val text-sky-600 underline"
                >
                  {lead.email}
                </a>
              ) : (
                <span className="dash-field-val text-slate-400 italic">None</span>
              )}
            </div>

            <div className="dash-modal-field">
              <span className="dash-field-label">Service Requested</span>
              <span className="dash-service-pill">{lead.serviceCategory}</span>
            </div>

            <div className="dash-modal-field">
              <span className="dash-field-label">Lead Source</span>
              <span className="dash-source-tag">{lead.source?.replace("_", " ")}</span>
            </div>

            <div className="dash-modal-field">
              <span className="dash-field-label">Submitted On</span>
              <span className="dash-field-val">
                {new Date(lead.createdAt).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {lead.message && (
            <div className="dash-modal-message-box">
              <span className="dash-field-label">Enquiry Message</span>
              <p className="dash-message-text">{lead.message}</p>
            </div>
          )}

          <div className="dash-modal-field">
            <span className="dash-field-label">Internal Operations Notes</span>
            <textarea
              rows={3}
              className="modal-text-input"
              placeholder="Record follow-up details, call summaries, or onboarding notes..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
            />
            <button
              type="button"
              className="save-note-btn mt-2"
              onClick={() => onSaveNote(noteInput)}
            >
              <StickyNote size={14} /> Save Note
            </button>
          </div>

          <div className="dash-modal-actions">
            <div className="dash-modal-status-update">
              <span>Status:</span>
              <select
                className={`dash-status-select status-${lead.status}`}
                value={lead.status}
                onChange={(e) => onStatusChange(lead._id, e.target.value)}
              >
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              {lead.email && (
                <a href={`mailto:${lead.email}`} className="dash-modal-email-btn">
                  <Send size={14} /> Send Email
                </a>
              )}
              <button
                type="button"
                className="dash-modal-done-btn"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
