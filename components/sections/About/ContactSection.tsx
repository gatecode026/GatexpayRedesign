import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="about-contact-section" id="contact" aria-label="Contact Information">
      <div className="about-container about-contact-grid">
        <div className="about-contact-info">
          <div className="about-contact-text-block">
            <h2 className="about-contact-heading">Let&apos;s Build What&apos;s Next.</h2>
            <p className="about-contact-subtitle">
              GateXpay assists startups, merchants, fintech companies, and
              enterprises by delivering reliable, high-performance financial
              technology. Reach out to our team or visit us at our headquarters.
            </p>
          </div>

          <div className="about-contact-details">
            {/* Address */}
            <div className="about-contact-item">
              <MapPin className="about-contact-icon" aria-hidden="true" />
              <span>412, Sumer Nagar, Mansarovar, Jaipur, 302020</span>
            </div>

            {/* Email */}
            <div className="about-contact-item">
              <Mail className="about-contact-icon" aria-hidden="true" />
              <a href="mailto:info@gatexpay.in" className="about-contact-item">
                info@gatexpay.in
              </a>
              <span className="about-contact-separator">|</span>
              <a href="mailto:vitin@gatexpay.in" className="about-contact-item">
                vitin@gatexpay.in
              </a>
            </div>

            {/* Phone */}
            <div className="about-contact-item">
              <Phone className="about-contact-icon" aria-hidden="true" />
              <a href="tel:+918502888838" className="about-contact-item">
                +91-8502888838
              </a>
            </div>
          </div>
        </div>

        {/* Map Card */}
        <div className="about-map-card">
          <Image
            src="/assets/about_us/images/img_a4aba51f90.png"
            alt="GateXPay headquarters map location in Mansarovar, Jaipur, Rajasthan, India"
            width={629}
            height={336}
            className="about-map-img"
          />

          <div className="about-map-floating-pin" aria-hidden="true">
            <div className="about-map-pin-title">GateXPay Technologies</div>
            <div className="about-map-pin-subtitle">Mansarovar, Jaipur, Rajasthan</div>
          </div>
        </div>
      </div>
    </section>
  );
}
