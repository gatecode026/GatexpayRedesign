import mongoose, { Schema } from "mongoose";
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
const BlogCategorySchema = new Schema(
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
export const BlogCategory =
  mongoose.models.BlogCategory ??
  mongoose.model("BlogCategory", BlogCategorySchema);
export default BlogCategory;
