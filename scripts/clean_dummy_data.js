const fs = require('fs');
const mongoose = require('mongoose');

const env = fs.readFileSync('.env.local', 'utf8');
const uri = env.split('\n').find(l => l.startsWith('MONGODB_URI=')).split('=')[1].trim();

async function clean() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  console.log('--- Cleaning Dummy Data as requested by user ---');

  // 1. Clear test enquiries
  const delEnquiries = await db.collection('enquiries').deleteMany({});
  console.log('✓ Cleared test enquiries:', delEnquiries.deletedCount);

  // 2. Clear contact_enquiries if any
  const delContactEnquiries = await db.collection('contact_enquiries').deleteMany({});
  console.log('✓ Cleared test contact_enquiries:', delContactEnquiries.deletedCount);

  // 3. Clear test cookie consents
  const delCookies = await db.collection('cookieconsents').deleteMany({});
  console.log('✓ Cleared test cookie consents:', delCookies.deletedCount);

  // 4. Delete the 2 gibberish blog posts
  const delPosts = await db.collection('blogposts').deleteMany({
    slug: { $in: ['duis-aspernatur-qui', 'sdfhgjkl'] }
  });
  console.log('✓ Deleted gibberish blog posts:', delPosts.deletedCount);

  // 5. Check remaining data
  console.log('\n--- Current Database Summary ---');
  console.log('Merchant Enquiries remaining:', await db.collection('enquiries').countDocuments());
  console.log('Cookie Consents remaining:', await db.collection('cookieconsents').countDocuments());
  
  const remainingPosts = await db.collection('blogposts').find({}).toArray();
  console.log('Blog Posts remaining (' + remainingPosts.length + '):');
  remainingPosts.forEach(p => console.log('  • ' + p.title + ' (slug: ' + p.slug + ')'));

  process.exit(0);
}

clean().catch(err => {
  console.error('Error during cleanup:', err);
  process.exit(1);
});
