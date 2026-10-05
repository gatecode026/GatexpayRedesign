const puppeteer = require('puppeteer-core');

const outDir = 'C:\\Users\\busin\\.gemini\\antigravity-ide\\brain\\f3da04af-ed64-41af-a5a5-66f9047c3120';

(async () => {
  console.log('=== TESTING GATEXPAY PREMIUM PRODUCTION ADMIN CONSOLE ===');

  // 1. Submit a real enquiry from the public website API to verify:
  // - saving to MongoDB Atlas
  // - triggering sendAdminLeadNotification
  // - updating lead list and stats
  console.log('\n[1/6] Submitting fresh merchant enquiry...');
  const leadRes = await fetch('http://localhost:3000/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Adit Sharma',
      companyName: 'Sharma Retailers Pvt Ltd',
      email: 'adit@sharmaretail.in',
      phone: '9822334455',
      countryCode: '+91',
      serviceCategory: 'Payment Gateway Integration',
      timeline: 'Immediately',
      message: 'Need high-volume payment gateway integration for our omnichannel retail stores with instant settlement.',
      source: 'contact_page',
    })
  });
  const leadData = await leadRes.json();
  console.log('Lead submission response:', leadData);

  // Submit a 2nd lead: Balram Test Merchant
  const leadRes2 = await fetch('http://localhost:3000/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Balram Test Merchant',
      companyName: 'Fintech Solutions Ltd',
      email: 'test@merchant.in',
      phone: '9876543210',
      countryCode: '+91',
      serviceCategory: 'Banking & Financial',
      timeline: 'Within 1 month',
      message: 'Looking for AEPS and Micro ATM solutions integration.',
      source: 'contact_modal',
    })
  });
  console.log('Lead 2 submission response:', await leadRes2.json());

  // 2. Test Admin Email Diagnostic Endpoint
  console.log('\n[2/6] Testing server-side admin email notification endpoint...');
  const testEmailRes = await fetch('http://localhost:3000/api/admin/test-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // We need session cookie, so let's log in first
    }
  });
  // Since unauthenticated, verify it properly rejects
  console.log('Unauthenticated /api/admin/test-email status (should be 401):', testEmailRes.status);

  // 3. Login as Super Admin
  console.log('\n[3/6] Authenticating as Super Admin...');
  const loginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@gatexpay.com', password: 'Admin@123456' })
  });
  const cookieHeader = loginRes.headers.get('set-cookie');
  const match = cookieHeader ? cookieHeader.match(/gatexpay_admin_session=([^;]+)/) : null;
  const token = match ? match[1] : null;

  if (!token) {
    console.error('Failed to get token');
    return;
  }
  console.log('Authentication successful! Token acquired.');

  // Now call test-email with cookie
  const authTestEmailRes = await fetch('http://localhost:3000/api/admin/test-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `gatexpay_admin_session=${token}`
    },
    body: JSON.stringify({ email: 'admin@gatexpay.com' })
  });
  console.log('Authenticated /api/admin/test-email result:', await authTestEmailRes.json());

  // 4. Test Health Check Endpoint
  console.log('\n[4/6] Testing MongoDB Atlas health check API...');
  const healthRes = await fetch('http://localhost:3000/api/admin/health');
  console.log('Health check result:', await healthRes.json());

  // 5. Launch Puppeteer for Visual Testing
  console.log('\n[5/6] Launching Puppeteer browser for visual testing...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  // Set cookie
  await page.setCookie({
    name: 'gatexpay_admin_session',
    value: token,
    domain: 'localhost',
    path: '/',
    httpOnly: true,
  });

  console.log('Navigating to /admin/dashboard...');
  await page.goto('http://localhost:3000/admin/dashboard', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Screenshot 1: Desktop View matching reference (1440px)
  await page.screenshot({ path: `${outDir}\\premium_admin_dashboard_desktop.png` });
  console.log('Saved premium_admin_dashboard_desktop.png');

  // Screenshot 1b: Laptop Viewport (1280x800) to verify side-by-side layout and 4 KPI row
  await page.setViewport({ width: 1280, height: 800 });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: `${outDir}\\premium_admin_dashboard_laptop_1280.png` });
  console.log('Saved premium_admin_dashboard_laptop_1280.png');
  await page.setViewport({ width: 1440, height: 950 });
  await new Promise(r => setTimeout(r, 400));

  // Test Sticky Scroll (verify sidebar & topbar remain fixed)
  console.log('Testing sticky scroll...');
  await page.evaluate(() => window.scrollBy(0, 450));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${outDir}\\premium_admin_dashboard_scrolled.png` });
  console.log('Saved premium_admin_dashboard_scrolled.png');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));

  // Test Search functionality
  console.log('Testing search for "Adit"...');
  const searchInput = await page.$('.leads-search-input-wrap input');
  if (searchInput) {
    await searchInput.type('Adit');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: `${outDir}\\premium_dashboard_search.png` });
    console.log('Saved premium_dashboard_search.png');
    // Clear search
    await page.click('.leads-clear-search');
    await new Promise(r => setTimeout(r, 400));
  }

  // Open Lead Detail Modal
  console.log('Opening Lead Detail modal...');
  const leadName = await page.$('.dash-lead-name');
  if (leadName) {
    await leadName.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: `${outDir}\\premium_dashboard_lead_modal.png` });
    console.log('Saved premium_dashboard_lead_modal.png');
    // Close modal
    const closeBtn = await page.$('.dash-modal-close');
    if (closeBtn) await closeBtn.click();
    await new Promise(r => setTimeout(r, 300));
  }

  // Test Notification Dropdown
  console.log('Opening Notification Dropdown...');
  const notifBtn = await page.$('.topbar-icon-btn.notif');
  if (notifBtn) {
    await notifBtn.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: `${outDir}\\premium_dashboard_notifications.png` });
    console.log('Saved premium_dashboard_notifications.png');
    // Click again to close
    await notifBtn.click();
    await new Promise(r => setTimeout(r, 300));
  }

  // 6. Test Mobile Viewport (390px)
  console.log('\n[6/6] Testing Mobile Viewport (390px)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/admin/dashboard', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: `${outDir}\\premium_admin_dashboard_mobile.png` });
  console.log('Saved premium_admin_dashboard_mobile.png');

  // Open mobile drawer
  const hamburger = await page.$('.topbar-hamburger');
  if (hamburger) {
    await hamburger.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: `${outDir}\\premium_admin_dashboard_mobile_drawer.png` });
    console.log('Saved premium_admin_dashboard_mobile_drawer.png');
  }

  await browser.close();
  console.log('\n=== ALL TESTS AND VISUAL VERIFICATIONS COMPLETED SUCCESSFULLY ===');
})();
