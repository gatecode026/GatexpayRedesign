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

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  console.log('Navigating to /admin/login...');
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: `${outDir}\\admin_login_screen.png` });
  console.log('Saved admin_login_screen.png');

  // Fill in form with delay
  await page.click('#admin-email');
  await page.keyboard.type('admin@gatexpay.com', { delay: 20 });

  await page.click('#admin-password');
  await page.keyboard.type('Admin@123456', { delay: 20 });

  console.log('Submitting login form...');
  await page.click('.admin-login-submit');

  // Wait for redirect to /admin/dashboard
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 2000)); // wait for API leads to populate

  console.log('Current URL:', page.url());
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
  console.log('All admin screenshots saved successfully!');
})();
