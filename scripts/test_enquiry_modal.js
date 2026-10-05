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

  // Load homepage and close cookie modal first so it doesn't obstruct clicks
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Accept cookies to dismiss cookie modal
  try {
    const acceptBtn = await page.$('.cookie-btn-primary');
    if (acceptBtn) {
      await acceptBtn.click();
      await new Promise(r => setTimeout(r, 400));
    }
  } catch (e) {
    console.log('Cookie modal dismiss skipped', e.message);
  }

  // Click "Talk to an Expert" to open ContactModal
  const talkBtn = await page.$('button.navbar-cta');
  if (talkBtn) {
    await talkBtn.click();
    await new Promise(r => setTimeout(r, 400));
    console.log('Opened ContactModal');

    // Fill form
    await page.type('input[name="fullName"]', 'Aditi Sharma');
    await page.select('select[name="serviceCategory"]', 'Payment Gateway');
    await page.type('input[name="companyName"]', 'Sharma Retails Pvt Ltd');
    await page.type('input[name="mobileNumber"]', '9822334455');

    // Take screenshot of filled form
    await page.screenshot({ path: `${outDir}\\enquiry_modal_filled.png` });
    console.log('Saved enquiry_modal_filled.png');

    // Submit form
    await page.click('button.contact-modal-submit');
    await new Promise(r => setTimeout(r, 1500)); // wait for API response

    // Take screenshot of success screen
    await page.screenshot({ path: `${outDir}\\enquiry_modal_success.png` });
    console.log('Saved enquiry_modal_success.png');
  } else {
    console.error('Could not find navbar-cta button');
  }

  await browser.close();
})();
