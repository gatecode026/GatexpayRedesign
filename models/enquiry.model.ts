import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEnquiry extends Document {
  fullName: string;
  email?: string;
  phone: string;
  mobile?: string;
  countryCode?: string;
  companyName?: string;
  serviceCategory: string;
  serviceInterest?: string;
  timeline?: string;
  message?: string;
  source: "contact_page" | "contact_modal" | "service_page" | "chatbot" | "other";
  status: "new" | "in_progress" | "contacted" | "closed";
  notes?: string;
  emailNotificationSentAt?: Date;
  notificationSentAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    mobile: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    countryCode: {
      type: String,
      default: "+91",
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    serviceCategory: {
      type: String,
      trim: true,
    },
    serviceInterest: {
      type: String,
      trim: true,
    },
    timeline: {
      type: String,
      default: "Immediately",
    },
    message: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    source: {
      type: String,
      enum: ["contact_page", "contact_modal", "service_page", "chatbot", "other"],
      default: "other",
    },
    status: {
      type: String,
      enum: ["new", "in_progress", "contacted", "closed"],
      default: "new",
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    emailNotificationSentAt: {
      type: Date,
      default: null,
    },
    notificationSentAt: {
      type: Date,
      default: null,
    },
    ipAddress: {
      type: String,
      default: "anonymized",
    },
    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);

export default Enquiry;
