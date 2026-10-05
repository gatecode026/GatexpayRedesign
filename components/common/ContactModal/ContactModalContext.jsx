"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import ContactModal from "./ContactModal";
const ContactModalContext = createContext(null);
export function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close }), [open, close]);
  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal isOpen={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  );
}
export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error(
      "useContactModal must be used within a ContactModalProvider"
    );
  }
  return ctx;
}
