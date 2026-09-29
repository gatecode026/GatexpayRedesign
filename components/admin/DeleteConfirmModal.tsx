"use client";

import React from "react";
import { X } from "lucide-react";

interface DeleteConfirmModalProps {
  id: string | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export default function DeleteConfirmModal({
  id,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!id) return null;

  return (
    <div className="dash-modal-overlay">
      <div className="dash-modal-card" style={{ maxWidth: "420px" }}>
        <div className="dash-modal-header">
          <h3 className="dash-modal-title text-rose-600">Delete Enquiry</h3>
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
            Are you sure you want to permanently delete this merchant enquiry? This action cannot be undone.
          </p>
          <div className="dash-modal-actions">
            <button
              type="button"
              className="dash-modal-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="dash-modal-delete-btn"
              onClick={() => onConfirm(id)}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
