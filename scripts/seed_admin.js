const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
  console.error('Error: MONGODB_URI not found in .env.local');
  process.exit(1);
}

const email = process.env.SEED_ADMIN_EMAIL || 'admin@gatexpay.com';
const rawPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@123456';
const name = process.env.SEED_ADMIN_NAME || 'Super Admin';

async function seed() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(mongoUri, { bufferCommands: false });
  console.log('Connected to MongoDB.');

  const db = mongoose.connection.db;
  const adminsCollection = db.collection('admins');

  const existing = await adminsCollection.findOne({ email: email.toLowerCase() });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(rawPassword, salt);

  if (existing) {
    console.log(`Admin account already exists for ${email}. Updating credentials...`);
    await adminsCollection.updateOne(
      { email: email.toLowerCase() },
      {
        $set: {
          name,
          password: hashedPassword,
          role: 'superadmin',
          isActive: true,
          updatedAt: new Date()
        }
      }
    );
    console.log('Admin account credentials updated successfully.');
  } else {
    console.log(`Creating new superadmin account for ${email}...`);
    await adminsCollection.insertOne({
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
      role: 'superadmin',
      isActive: true,
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Superadmin account created successfully.');
  }

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
