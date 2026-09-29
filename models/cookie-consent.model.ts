import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICookieConsentPreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

export interface ICookieConsent extends Document {
  consentId: string;
  decision: "all" | "essential_only" | "custom";
  preferences: ICookieConsentPreferences;
  ipAddress?: string;
  userAgent?: string;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CookieConsentSchema = new Schema<ICookieConsent>(
  {
    consentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    decision: {
      type: String,
      enum: ["all", "essential_only", "custom"],
      required: true,
    },
    preferences: {
      essential: {
        type: Boolean,
        default: true,
        required: true,
      },
      analytics: {
        type: Boolean,
        default: false,
      },
      functional: {
        type: Boolean,
        default: false,
      },
      marketing: {
        type: Boolean,
        default: false,
      },
    },
    ipAddress: {
      type: String,
      default: "anonymized",
    },
    userAgent: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "/",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent recompilation in Next.js development hot-reloading
export const CookieConsent: Model<ICookieConsent> =
  mongoose.models.CookieConsent ||
  mongoose.model<ICookieConsent>("CookieConsent", CookieConsentSchema);

export default CookieConsent;
