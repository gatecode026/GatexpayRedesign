"use client";

import React from "react";
import Image from "next/image";

export default function WelcomeBanner() {
  return (
    <div className="welcome-banner-card">
      <div className="welcome-text-col">
        <span className="welcome-tag">Welcome Back, Super Admin</span>
        <h1 className="welcome-headline">Here&apos;s what&apos;s happening today</h1>
        <p className="welcome-subtext">
          Manage your merchant enquiries, track conversions, and grow your business with GateXPay.
        </p>
      </div>
      <div className="welcome-art-col">
        <Image
          src="/assets/images/gatexpay-platform-isometric-transparent.png"
          alt="GateXPay FinTech Platform"
          width={340}
          height={200}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </div>
  );
}
