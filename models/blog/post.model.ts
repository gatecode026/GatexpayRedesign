import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogPost extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  category: mongoose.Types.ObjectId;
  subcategory?: mongoose.Types.ObjectId;
  author: string;
  status: "draft" | "published" | "archived";
  content?: string;
  blocks?: mongoose.Types.Array<Record<string, unknown>>;
  tags: string[];
  readTime: number;
  isFeatured: boolean;
  views: number;
  seo?: {
    title: string;
    description: string;
    keywords: string;
    ogImage?: string;
    canonical?: string;
  };
  publishedAt?: Date;
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

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    excerpt: { type: String, default: "" },
    coverImage: { type: String },
    category: {
      type: Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "BlogSubcategory",
    },
    author: { type: String, required: true, default: "GateXPay Editorial Team" },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
      index: true,
    },
    content: { type: String, default: "" },
    blocks: { type: [Schema.Types.Mixed], default: [] },
    tags: { type: [String], default: [] },
    readTime: { type: Number, default: 5 },
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    seo: { type: SEOSchema, default: {} },
    publishedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BlogPostSchema.index({ category: 1, status: 1, isDeleted: 1 });
BlogPostSchema.index({ status: 1, publishedAt: -1 });

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ??
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
