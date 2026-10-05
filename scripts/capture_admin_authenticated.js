const puppeteer = require('puppeteer-core');

const outDir = 'C:\\Users\\busin\\.gemini\\antigravity-ide\\brain\\f3da04af-ed64-41af-a5a5-66f9047c3120';

(async () => {
  // 1. Get session token via direct API login
  const loginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@gatexpay.com', password: 'Admin@123456' })
  });

  const cookieHeader = loginRes.headers.get('set-cookie');
  console.log('Set-Cookie:', cookieHeader);

  // Extract token value
  const match = cookieHeader ? cookieHeader.match(/gatexpay_admin_session=([^;]+)/) : null;
  const token = match ? match[1] : null;

  if (!token) {
    console.error('Failed to get token');
    return;
  }

  // 2. Launch browser with cookie
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Set auth cookie
  await page.setCookie({
    name: 'gatexpay_admin_session',
    value: token,
    domain: 'localhost',
    path: '/',
    httpOnly: true,
  });

  console.log('Navigating directly to /admin/dashboard...');
  await page.goto('http://localhost:3000/admin/dashboard', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({ path: `${outDir}\\admin_dashboard_screen.png` });
  console.log('Saved admin_dashboard_screen.png');

  // Open Lead Detail Modal
  const viewBtns = await page.$$('.dash-view-btn');
  if (viewBtns.length > 0) {
    await viewBtns[0].click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: `${outDir}\\admin_lead_detail_screen.png` });
    console.log('Saved admin_lead_detail_screen.png');
  }

  await browser.close();
  console.log('Admin dashboard screens captured successfully!');
})();
