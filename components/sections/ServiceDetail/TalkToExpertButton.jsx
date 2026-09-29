"use client";
import { useContactModal } from "@/components/common/ContactModal/ContactModalContext";
export default function TalkToExpertButton({
  className,
  label = "Talk to an Expert",
}) {
  const { open } = useContactModal();
  return (
    <button type="button" className={className} onClick={open}>
      {label}
    </button>
  );
}
