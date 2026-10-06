"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import "./FloatingDropdown.css";

export default function FloatingDropdown({
  id,
  name,
  label,
  required = false,
  value = "",
  options = [],
  onChange,
  onBlur,
  error = "",
  hasSubmitted = false,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);

  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const currentIndex = normalizedOptions.findIndex((opt) => opt.value === value);

  const openDropdown = () => {
    const nextIndex = currentIndex >= 0 ? currentIndex : 0;
    setHighlightedIndex(nextIndex);
    // User requirement: "click krte hi top wala select rhe"
    if (!value && normalizedOptions[nextIndex]) {
      onChange(name, normalizedOptions[nextIndex].value);
    }
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    if (onBlur) onBlur(name, value);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (isOpen) closeDropdown();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // User requirement: "hover wala value hover ke according values change ho jaaye"
  const handleOptionMouseEnter = (index) => {
    setHighlightedIndex(index);
    if (normalizedOptions[index]) {
      onChange(name, normalizedOptions[index].value);
    }
  };

  const handleOptionClick = (optValue, e) => {
    e.stopPropagation();
    onChange(name, optValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (highlightedIndex + 1) % normalizedOptions.length;
      setHighlightedIndex(next);
      onChange(name, normalizedOptions[next].value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (highlightedIndex - 1 + normalizedOptions.length) % normalizedOptions.length;
      setHighlightedIndex(prev);
      onChange(name, normalizedOptions[prev].value);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (normalizedOptions[highlightedIndex]) {
        onChange(name, normalizedOptions[highlightedIndex].value);
      }
      setIsOpen(false);
    } else if (e.key === "Escape" || e.key === "Tab") {
      closeDropdown();
    }
  };

  const selectedOpt = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOpt ? selectedOpt.label : "";
  const isFloating = isOpen || Boolean(value);
  const showError = hasSubmitted && Boolean(error);

  return (
    <div
      ref={containerRef}
      className={`floating-dropdown ${isOpen ? "is-open" : ""} ${isFloating ? "has-value" : ""} ${className}`}
    >
      <div
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        tabIndex={0}
        className={`floating-dropdown-trigger ${showError ? "is-invalid" : ""}`}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
      >
        <span className="floating-dropdown-value">
          {displayLabel}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`floating-dropdown-chevron ${isOpen ? "is-rotated" : ""}`}
          aria-hidden="true"
        />
        <label htmlFor={id} className="floating-dropdown-label">
          {label} {required && <span className="floating-req">*</span>}
        </label>
      </div>

      {isOpen && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="floating-dropdown-menu"
        >
          {normalizedOptions.map((opt, idx) => {
            const isHighlighted = idx === highlightedIndex;
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`floating-dropdown-item ${isHighlighted ? "is-active" : ""}`}
                onMouseEnter={() => handleOptionMouseEnter(idx)}
                onClick={(e) => handleOptionClick(opt.value, e)}
              >
                <span className="floating-dropdown-item-label">{opt.label}</span>
                {isSelected && (
                  <Check
                    size={15}
                    strokeWidth={2.4}
                    className="floating-dropdown-check"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
