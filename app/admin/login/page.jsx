"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from "lucide-react";
import "./login.css";
export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed");
      }
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Invalid credentials"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        {/* Brand Header */}
        <div className="admin-login-header">
          <div className="admin-logo-box">
            <Image
              src="/assets/images/logo.png"
              alt="GateXPay"
              width={160}
              height={38}
              priority
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="admin-badge">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Admin Portal</span>
          </div>
          <h1 className="admin-login-title">Sign in to Management Console</h1>
          <p className="admin-login-desc">
            Secure access to merchant enquiries, analytics, and platform
            configuration.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="admin-login-error">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form className="admin-login-form" onSubmit={handleLogin}>
          <div className="admin-input-group">
            <label htmlFor="admin-email">Administrator Email</label>
            <div className="admin-input-wrap">
              <Mail className="admin-input-icon" />
              <input
                id="admin-email"
                type="email"
                placeholder="admin@gatexpay.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label htmlFor="admin-password">Password</label>
            <div className="admin-input-wrap">
              <Lock className="admin-input-icon" />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-pw-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="admin-login-submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying
                Credentials...
              </>
            ) : (
              <>
                Sign In to Console <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Protected by Enterprise Grade AES-256 JWT Encryption</p>
        </div>
      </div>
    </div>
  );
}
