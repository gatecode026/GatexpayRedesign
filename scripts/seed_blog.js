const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  });
}

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('Error: MONGODB_URI not found');
  process.exit(1);
}

const CATEGORIES = [
  { name: 'Compliance & Regulation', slug: 'compliance-regulation', description: 'Regulatory frameworks, DPDP Act, and RBI guidelines' },
  { name: 'Engineering & Tech', slug: 'engineering-tech', description: 'APIs, webhooks, SDKs, and payment architecture' },
  { name: 'Business Growth', slug: 'business-growth', description: 'Scaling GMV, retention, and merchant monetization' },
  { name: 'Company News', slug: 'company-news', description: 'Product releases and GateXPay announcements' }
];

const INITIAL_POSTS = [
  {
    title: "Understanding RBI's Payment Aggregator Licensing: A Complete Compliance Guide for Indian Fintechs in 2026",
    slug: "rbi-payment-aggregator-licensing-guide-2026",
    excerpt: "The RBI's PA-PG framework has fundamentally reshaped how businesses collect payments online.",
    categorySlug: "compliance-regulation",
    author: "Balram Suman (CTO, GateXPay)",
    readTime: 8,
    isFeatured: true,
    tags: ["RBI", "PA-PG", "Compliance", "Escrow"],
    coverImage: "/assets/images/card-rbi.png",
    content: "Payment aggregation in India now sits squarely inside the RBI's regulatory perimeter, and that changes how every business — from a marketplace to a single merchant — needs to think about who they route transactions through."
  },
  {
    title: "How to Integrate GateXPay Tokenization API in Under 60 Minutes",
    slug: "tokenization-api-integration-60-minutes",
    excerpt: "A practical developer walk-through for integrating RBI-compliant card tokenization.",
    categorySlug: "engineering-tech",
    author: "GateXPay Engineering",
    readTime: 6,
    isFeatured: false,
    tags: ["API", "Tokenization", "Integration"],
    coverImage: "/assets/images/card-api.png",
    content: "With RBI's card-on-file tokenization guidelines fully enforced, storing raw card credentials is prohibited. This developer guide walks through embedding the GateXPay Vault SDK in under an hour."
  },
  {
    title: "Case Study: How a Tier-2 D2C Brand Scaled from ₹10 Cr to ₹100 Cr GMV with GateXPay",
    slug: "fintech-scaled-10cr-to-100cr-gmv",
    excerpt: "Smart routing, instant refunds, and multi-gateway fallbacks reduced cart drop-offs by 24%.",
    categorySlug: "business-growth",
    author: "Growth & Partnerships Team",
    readTime: 7,
    isFeatured: false,
    tags: ["D2C", "Scale", "Smart Routing", "GMV"],
    coverImage: "/assets/images/card-scale.png",
    content: "When order volumes surged during festive peak sales, payment failures previously cost this fast-growing lifestyle retailer millions in lost GMV. By switching to GateXPay dynamic routing, checkout success rates climbed from 81% to 94.6%."
  }
];

async function seedBlog() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(mongoUri, { bufferCommands: false });
  console.log('Connected.');

  const db = mongoose.connection.db;
  const catCol = db.collection('blogcategories');
  const postCol = db.collection('blogposts');

  const catMap = {};

  // Seed Categories
  for (const cat of CATEGORIES) {
    const existing = await catCol.findOne({ slug: cat.slug });
    if (!existing) {
      const res = await catCol.insertOne({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        status: 'active',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      catMap[cat.slug] = res.insertedId;
      console.log(`Created category: ${cat.name}`);
    } else {
      catMap[cat.slug] = existing._id;
      console.log(`Category exists: ${cat.name}`);
    }
  }

  // Seed Posts
  for (const post of INITIAL_POSTS) {
    const existing = await postCol.findOne({ slug: post.slug });
    if (!existing) {
      await postCol.insertOne({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        category: catMap[post.categorySlug],
        author: post.author,
        status: 'published',
        tags: post.tags,
        readTime: post.readTime,
        isFeatured: post.isFeatured,
        views: 124,
        publishedAt: new Date(),
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`Created post: ${post.title}`);
    } else {
      console.log(`Post exists: ${post.title}`);
    }
  }

  await mongoose.disconnect();
  console.log('Blog seeding completed successfully!');
}

seedBlog().catch(e => {
  console.error('Seed error:', e);
  process.exit(1);
});
