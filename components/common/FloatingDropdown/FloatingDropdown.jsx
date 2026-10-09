"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
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
  openAbove = false,
  singleItemScroll = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);
  const menuRef = useRef(null);
  const lastWheelTimeRef = useRef(0);
  const isWheelingRef = useRef(false);
  const wheelTimerRef = useRef(null);

  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const isCountryCode =
    name === "countryCode" ||
    id?.includes("code") ||
    id?.includes("country");
  const shouldOpenAbove = openAbove || isCountryCode;
  const isSingleScroll = singleItemScroll || isCountryCode;

  // Prevent wheel/touch events from scrolling the parent form or modal,
  // and step exactly one code per scroll tick when isSingleScroll is active.
  useEffect(() => {
    const menuEl = menuRef.current;
    if (!isOpen || !menuEl) return;

    const handleWheel = (e) => {
      // Always prevent default and stop propagation so form/modal NEVER scrolls
      e.stopPropagation();
      e.preventDefault();

      if (isSingleScroll) {
        const now = Date.now();
        // 160ms throttle: 1 scroll notch/tick = exactly 1 code item stepped
        if (now - lastWheelTimeRef.current < 160) {
          return;
        }
        lastWheelTimeRef.current = now;

        const delta = e.deltaY;
        if (Math.abs(delta) < 4) return;

        isWheelingRef.current = true;
        if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
        wheelTimerRef.current = setTimeout(() => {
          isWheelingRef.current = false;
        }, 150);

        if (delta > 0) {
          // Scroll down -> step exactly 1 code down
          setHighlightedIndex((prev) => {
            const next = Math.min(normalizedOptions.length - 1, prev + 1);
            if (normalizedOptions[next]) {
              onChange(name, normalizedOptions[next].value);
            }
            return next;
          });
        } else {
          // Scroll up -> step exactly 1 code up
          setHighlightedIndex((prev) => {
            const prevIdx = Math.max(0, prev - 1);
            if (normalizedOptions[prevIdx]) {
              onChange(name, normalizedOptions[prevIdx].value);
            }
            return prevIdx;
          });
        }
      } else {
        const { deltaY } = e;
        const atTop = menuEl.scrollTop <= 0;
        const atBottom =
          menuEl.scrollTop + menuEl.clientHeight >= menuEl.scrollHeight - 1;

        if ((deltaY < 0 && atTop) || (deltaY > 0 && atBottom)) {
          return;
        }

        if (menuEl.scrollHeight > menuEl.clientHeight) {
          menuEl.scrollTop += deltaY;
        }
      }
    };

    let touchStartY = 0;
    let touchMoved = false;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
      e.stopPropagation();
    };

    const handleTouchMove = (e) => {
      e.stopPropagation();
      if (touchMoved) return;
      const currentY = e.touches[0].clientY;
      const diffY = touchStartY - currentY;

      if (Math.abs(diffY) > 18) {
        touchMoved = true;
        if (isSingleScroll) {
          if (diffY > 0) {
            setHighlightedIndex((prev) => {
              const next = Math.min(normalizedOptions.length - 1, prev + 1);
              if (normalizedOptions[next]) {
                onChange(name, normalizedOptions[next].value);
              }
              return next;
            });
          } else {
            setHighlightedIndex((prev) => {
              const prevIdx = Math.max(0, prev - 1);
              if (normalizedOptions[prevIdx]) {
                onChange(name, normalizedOptions[prevIdx].value);
              }
              return prevIdx;
            });
          }
        }
        if (e.cancelable) e.preventDefault();
      }
    };

    menuEl.addEventListener("wheel", handleWheel, { passive: false });
    menuEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    menuEl.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      menuEl.removeEventListener("wheel", handleWheel);
      menuEl.removeEventListener("touchstart", handleTouchStart);
      menuEl.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isOpen, isSingleScroll, name, normalizedOptions, onChange]);

  // Keep highlighted option scrolled into view inside the dropdown menu
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const menu = menuRef.current;
    const activeItem = menu.querySelector(".floating-dropdown-item.is-active");
    if (activeItem) {
      const itemTop = activeItem.offsetTop;
      const itemBottom = itemTop + activeItem.offsetHeight;
      const menuScrollTop = menu.scrollTop;
      const menuHeight = menu.clientHeight;

      if (itemTop < menuScrollTop) {
        menu.scrollTop = itemTop;
      } else if (itemBottom > menuScrollTop + menuHeight) {
        menu.scrollTop = itemBottom - menuHeight;
      }
    }
  }, [isOpen, highlightedIndex]);

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

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    if (onBlur) onBlur(name, value);
  }, [name, onBlur, value]);

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
  }, [isOpen, closeDropdown]);

  // User requirement: "hover wala value hover ke according values change ho jaaye"
  const handleOptionMouseEnter = (index) => {
    if (isWheelingRef.current) return;
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
      className={`floating-dropdown ${isOpen ? "is-open" : ""} ${isFloating ? "has-value" : ""} ${shouldOpenAbove ? "open-above" : ""} ${className}`}
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
          ref={menuRef}
          id={`${id}-listbox`}
          role="listbox"
          className={`floating-dropdown-menu ${shouldOpenAbove ? "floating-dropdown-menu--above" : ""}`}
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
