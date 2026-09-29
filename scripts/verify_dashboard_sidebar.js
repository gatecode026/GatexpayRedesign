const puppeteer = require('puppeteer-core');
const fs = require('fs');

const outDir = 'C:\\Users\\busin\\.gemini\\antigravity-ide\\brain\\f3da04af-ed64-41af-a5a5-66f9047c3120';

(async () => {
  console.log('Testing /dashboard redirect and Admin UI with sidebar...');

  // 1. Launch browser
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Test 1: Hit http://localhost:3000/dashboard without session -> should redirect to /admin/login
  console.log('Visiting /dashboard without session...');
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle2' });
  console.log('Current URL after hitting /dashboard:', page.url());
  await page.screenshot({ path: `${outDir}\\redirect_dashboard_to_login.png` });

  // Test 2: Authenticate
  console.log('Logging in...');
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
    await browser.close();
    return;
  }

  await page.setCookie({
    name: 'gatexpay_admin_session',
    value: token,
    domain: 'localhost',
    path: '/',
    httpOnly: true,
  });

  // Test 3: Hit http://localhost:3000/dashboard WITH session -> should redirect to /admin/dashboard
  console.log('Visiting /dashboard with session...');
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle2' });
  console.log('Current URL after hitting /dashboard with session:', page.url());
  await new Promise(r => setTimeout(r, 1200));

  // Screenshot 1: Desktop Dashboard with full Left Sidebar
  await page.screenshot({ path: `${outDir}\\admin_dashboard_with_sidebar.png` });
  console.log('Saved admin_dashboard_with_sidebar.png');

  // Test 4: Switch to Blog CMS view
  console.log('Switching to Blog CMS view...');
  const navBtns = await page.$$('.nav-item');
  for (const btn of navBtns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Blog Articles')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${outDir}\\admin_dashboard_blog_view.png` });
  console.log('Saved admin_dashboard_blog_view.png');

  // Test 5: Switch to DPDP Cookie Consents view
  console.log('Switching to Cookie Consents view...');
  const navBtns2 = await page.$$('.nav-item');
  for (const btn of navBtns2) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('DPDP Cookie Consents')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: `${outDir}\\admin_dashboard_cookie_view.png` });
  console.log('Saved admin_dashboard_cookie_view.png');

  // Test 6: Mobile viewport test
  console.log('Testing mobile viewport (390px)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/admin/dashboard', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: `${outDir}\\admin_dashboard_mobile.png` });
  console.log('Saved admin_dashboard_mobile.png');

  // Open mobile drawer
  const hamburger = await page.$('.topbar-hamburger');
  if (hamburger) {
    await hamburger.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: `${outDir}\\admin_dashboard_mobile_drawer.png` });
    console.log('Saved admin_dashboard_mobile_drawer.png');
  }

  await browser.close();
  console.log('All tests and captures completed successfully!');
})();
