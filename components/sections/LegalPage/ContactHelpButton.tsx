"use client";

import { Phone } from "lucide-react";
import { useContactModal } from "@/components/common/ContactModal/ContactModalContext";

export default function ContactHelpButton() {
  const { open } = useContactModal();
  return (
    <button type="button" className="legal-help-btn" onClick={open}>
      <Phone size={14} strokeWidth={2} aria-hidden="true" />
      Talk to an Expert
    </button>
  );
}
