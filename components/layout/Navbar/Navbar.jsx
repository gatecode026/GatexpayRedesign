"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import SolutionsMegaMenu, { SOLUTIONS } from "./SolutionsMegaMenu";
import { useContactModal } from "@/components/common/ContactModal/ContactModalContext";
import "./Navbar.css";
const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Why GateXPay", href: "/about#why-gatexpay" },
  { label: "Leadership Team", href: "/about#team" },
  { label: "Contact Us", href: "/contact" },
];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState(null);
  const pathname = usePathname();
  const navRef = useRef(null);
  const { open: openContactModal } = useContactModal();
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(currentScrollY > 8);

          const inIndustry =
            typeof document !== "undefined" &&
            document.body.classList.contains("in-industry-section");

          // For all other sections (or near page top / menu open), navbar is ALWAYS sticky & visible
          if (!inIndustry || currentScrollY <= 20 || isMenuOpen) {
            setNavVisible(true);
            document.body.classList.remove("navbar--hidden");
          } else {
            const diff = currentScrollY - lastScrollY.current;
            // Inside Industry section: scrolling down -> hide navbar
            if (diff > 8) {
              setNavVisible(false);
              document.body.classList.add("navbar--hidden");
              setOpenDropdown(null);
            }
            // Inside Industry section: scrolling up -> reveal navbar
            else if (diff < -6) {
              setNavVisible(true);
              document.body.classList.remove("navbar--hidden");
            }
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("navbar--hidden");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  // Close any open dropdown on outside click or Escape.
  useEffect(() => {
    if (!openDropdown) return;
    const handlePointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDropdown]);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setMobileOpenCategory(null);
  };
  const toggleDropdown = (key) => {
    setOpenDropdown((current) => (current === key ? null : key));
  };
  return (
    <header
      className={`navbar ${scrolled ? "scrolled" : ""} ${!navVisible ? "navbar--hidden" : ""}`}
    >
      <div className="navbar-container">
        <Link
          href="/"
          className="navbar-logo"
          aria-label="GateXPay home"
          onClick={closeMenu}
        >
          <Image
            src="/assets/images/logo.png"
            alt="GateXPay Technologies"
            width={272}
            height={48}
            className="navbar-logo-img"
            priority
          />
        </Link>

        <nav className="navbar-links" aria-label="Primary" ref={navRef}>
          <div
            className={`navbar-dropdown navbar-dropdown--solutions ${openDropdown === "solutions" ? "open" : ""}`}
            onMouseEnter={() => setOpenDropdown("solutions")}
            onMouseLeave={() =>
              setOpenDropdown((c) => (c === "solutions" ? null : c))
            }
          >
            <Link
              href="/services"
              className={`navbar-link-trigger ${pathname?.startsWith("/services") ? "active" : ""}`}
              onClick={closeMenu}
              aria-expanded={openDropdown === "solutions"}
              aria-haspopup="true"
              aria-controls="solutions-mega-menu"
            >
              Solutions <ChevronDown size={14} />
            </Link>
            <div className="navbar-mega-panel">
              <SolutionsMegaMenu id="solutions-mega-menu" />
            </div>
          </div>

          <div
            className={`navbar-dropdown ${openDropdown === "company" ? "open" : ""}`}
            onMouseEnter={() => setOpenDropdown("company")}
            onMouseLeave={() =>
              setOpenDropdown((c) => (c === "company" ? null : c))
            }
          >
            <button
              className="navbar-link-trigger"
              onClick={() => toggleDropdown("company")}
              aria-expanded={openDropdown === "company"}
            >
              Company <ChevronDown size={14} />
            </button>
            <div className="navbar-dropdown-panel">
              {COMPANY_LINKS.map((link) => (
                <Link key={link.label} href={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/blog" className={pathname === "/blog" ? "active" : ""}>
            Resources
          </Link>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-cta desktop-only"
            onClick={() => {
              closeMenu();
              openContactModal();
            }}
          >
            <Phone size={15} />
            <span>Talk to an Expert</span>
          </button>
          <button
            className="menu-toggle"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-panel ${isMenuOpen ? "open" : ""}`}>
        <nav className="mobile-links" aria-label="Mobile">
          <Link
            href="/services"
            onClick={closeMenu}
            className={pathname?.startsWith("/services") ? "active" : ""}
          >
            Solutions
          </Link>
          <span className="mobile-group-label">Browse Categories</span>
          <div className="mobile-accordion">
            {SOLUTIONS.map((cat) => {
              const isOpen = mobileOpenCategory === cat.id;
              return (
                <div key={cat.id} className="mobile-accordion__item">
                  <button
                    type="button"
                    className="mobile-accordion__trigger"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setMobileOpenCategory((c) =>
                        c === cat.id ? null : cat.id
                      )
                    }
                  >
                    <span>{cat.title}</span>
                    <ChevronDown
                      size={16}
                      className={`mobile-accordion__chevron ${isOpen ? "is-open" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mobile-accordion__panel">
                      {cat.services.map((service) => (
                        <Link
                          key={service.title}
                          href={service.href || "/services"}
                          onClick={closeMenu}
                          className="mobile-accordion__service"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <span className="mobile-group-label">Company</span>
          {COMPANY_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="mobile-sublink"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/blog" onClick={closeMenu}>
            Resources
          </Link>
          <button
            type="button"
            className="navbar-cta mobile-cta"
            onClick={() => {
              closeMenu();
              openContactModal();
            }}
          >
            <Phone size={15} />
            <span>Talk to an Expert</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
