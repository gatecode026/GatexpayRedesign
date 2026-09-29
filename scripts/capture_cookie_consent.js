const puppeteer = require('puppeteer-core');

const outDir = 'C:\\Users\\busin\\.gemini\\antigravity-ide\\brain\\f3da04af-ed64-41af-a5a5-66f9047c3120';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Desktop Initial View
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1440, height: 900 });
  await page1.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200)); // wait for entrance animation
  await page1.screenshot({ path: `${outDir}\\cookie_modal_desktop.png` });
  console.log('Saved cookie_modal_desktop.png');

  // 2. Desktop Customized View
  await page1.click('.cookie-customize-toggle');
  await new Promise(r => setTimeout(r, 300));
  await page1.screenshot({ path: `${outDir}\\cookie_modal_customized.png` });
  console.log('Saved cookie_modal_customized.png');
  await page1.close();

  // 3. Mobile View
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 390, height: 844 });
  await page2.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page2.screenshot({ path: `${outDir}\\cookie_modal_mobile.png` });
  console.log('Saved cookie_modal_mobile.png');
  await page2.close();

  await browser.close();
  console.log('All cookie screenshots captured successfully!');
})();
