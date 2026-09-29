import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogSubcategory extends Document {
  _id: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
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

const BlogSubcategorySchema = new Schema<IBlogSubcategory>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
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

BlogSubcategorySchema.index({ category: 1, isDeleted: 1 });

export const BlogSubcategory: Model<IBlogSubcategory> =
  mongoose.models.BlogSubcategory ??
  mongoose.model<IBlogSubcategory>("BlogSubcategory", BlogSubcategorySchema);

export default BlogSubcategory;
