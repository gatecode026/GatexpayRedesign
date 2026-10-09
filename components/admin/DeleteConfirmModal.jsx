"use client";
import React, { useState } from "react";
import { X, Trash2 } from "lucide-react";
export default function DeleteConfirmModal({
  id,
  onClose,
  onConfirm,
  title,
  message,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!id || (Array.isArray(id) && id.length === 0)) return null;
  const isMultiple = Array.isArray(id) && id.length > 1;
  const count = Array.isArray(id) ? id.length : 1;

  const handleConfirm = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await onConfirm(id);
    } catch {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (isDeleting) return;
    onClose();
  };

  return (
    <div className="dash-modal-overlay">
      <div className="dash-modal-card" style={{ maxWidth: "420px" }}>
        <div className="dash-modal-header">
          <h3 className="dash-modal-title text-rose-600">
            {title || (isMultiple ? `Delete ${count} Enquiries` : "Delete Enquiry")}
          </h3>
          <button
            type="button"
            className="dash-modal-close"
            onClick={handleClose}
            disabled={isDeleting}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <div className="dash-modal-body">
          <p className="text-sm text-slate-600">
            {message ||
              (isMultiple
                ? `Are you sure you want to permanently delete these ${count} merchant enquiries? This action cannot be undone.`
                : "Are you sure you want to permanently delete this item? This action cannot be undone.")}
          </p>
          <div className="dash-modal-actions">
            <button
              type="button"
              className="dash-modal-cancel-btn"
              onClick={handleClose}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="dash-modal-delete-btn"
              onClick={handleConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="btn-inline-spinner" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 size={14} />
                  <span>
                    {isMultiple ? `Yes, Delete All (${count})` : "Yes, Delete"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
