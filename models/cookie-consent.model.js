import mongoose, { Schema } from "mongoose";
const CookieConsentSchema = new Schema(
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

CookieConsentSchema.index({ createdAt: -1 });

// Prevent recompilation in Next.js development hot-reloading
export const CookieConsent =
  mongoose.models.CookieConsent ||
  mongoose.model("CookieConsent", CookieConsentSchema);
export default CookieConsent;
