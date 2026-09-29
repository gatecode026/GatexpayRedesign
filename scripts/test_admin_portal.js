const puppeteer = require('puppeteer-core');

const outDir = 'C:\\Users\\busin\\.gemini\\antigravity-ide\\brain\\f3da04af-ed64-41af-a5a5-66f9047c3120';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Visit /admin/login
  console.log('Navigating to /admin/login...');
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: `${outDir}\\admin_login_screen.png` });
  console.log('Saved admin_login_screen.png');

  // 2. Perform Login
  await page.type('#admin-email', 'admin@gatexpay.com');
  await page.type('#admin-password', 'Admin@123456');

  // Click submit
  await page.click('.admin-login-submit');
  console.log('Submitted login credentials...');

  // Wait for redirect to /admin/dashboard
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 8000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: `${outDir}\\admin_dashboard_overview.png` });
  console.log('Saved admin_dashboard_overview.png');

  // 3. Click "View" on the first lead row to open details modal
  const viewBtn = await page.$('.dash-view-btn');
  if (viewBtn) {
    await viewBtn.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: `${outDir}\\admin_lead_detail_modal.png` });
    console.log('Saved admin_lead_detail_modal.png');
  }

  await browser.close();
  console.log('Admin portal testing completed successfully!');
})();
