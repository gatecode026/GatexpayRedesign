const puppeteer = require('puppeteer-core');

const screens = [
  { name: 'cb_fixed_desktop_1440.png', w: 1440, h: 900 },
  { name: 'cb_fixed_laptop_720.png', w: 1280, h: 720 },
  { name: 'cb_fixed_mobile_390.png', w: 390, h: 844 },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const s of screens) {
    const page = await browser.newPage();
    await page.setViewport({ width: s.w, height: s.h });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    // Open chatbot
    await page.click('.cb-launcher-btn');
    await new Promise(r => setTimeout(r, 400));

    // Click starter question
    await page.click('.cb-chip-btn');
    await new Promise(r => setTimeout(r, 3500));

    await page.screenshot({
      path: `C:\\Users\\busin\\.gemini\\antigravity-ide\\brain\\f3da04af-ed64-41af-a5a5-66f9047c3120\\${s.name}`
    });
    console.log(`Saved ${s.name}`);
    await page.close();
  }

  await browser.close();
})();
