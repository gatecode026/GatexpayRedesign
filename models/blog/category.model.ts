import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogCategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  bannerImage?: string;
  status: "active" | "inactive";
  seo?: {
    title: string;
    description: string;
    keywords: string;
    ogImage?: string;
    canonical?: string;
  };
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SEOSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    keywords: { type: String, default: "" },
    ogImage: { type: String },
    canonical: { type: String },
  },
  { _id: false }
);

const BlogCategorySchema = new Schema<IBlogCategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: "" },
    bannerImage: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    seo: { type: SEOSchema, default: {} },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BlogCategorySchema.index({ status: 1, isDeleted: 1 });

export const BlogCategory: Model<IBlogCategory> =
  mongoose.models.BlogCategory ??
  mongoose.model<IBlogCategory>("BlogCategory", BlogCategorySchema);

export default BlogCategory;
