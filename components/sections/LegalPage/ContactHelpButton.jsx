"use client";
import { useContactModal } from "@/components/common/ContactModal/ContactModalContext";

export default function ContactHelpButton() {
  const { open } = useContactModal();
  return (
    <button type="button" className="legal-help-btn" onClick={open}>
      Talk to an Expert
    </button>
  );
}

