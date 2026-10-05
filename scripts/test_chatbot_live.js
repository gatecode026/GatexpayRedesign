const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Scroll down to reveal Jump to top
  await page.evaluate(() => window.scrollTo(0, 800));
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'C:\\Users\\busin\\.gemini\\antigravity-ide\\brain\\f3da04af-ed64-41af-a5a5-66f9047c3120\\widgets_scrolled.png'
  });
  console.log('Saved widgets_scrolled.png');

  // Click chatbot button
  await page.click('.cb-launcher-btn');
  await new Promise(r => setTimeout(r, 600));

  // Click first suggestion chip: "What services does GateXPay offer?"
  await page.click('.cb-chip-btn');
  // Wait 4 seconds for AI reply
  await new Promise(r => setTimeout(r, 4000));

  await page.screenshot({
    path: 'C:\\Users\\busin\\.gemini\\antigravity-ide\\brain\\f3da04af-ed64-41af-a5a5-66f9047c3120\\chatbot_active.png'
  });
  console.log('Saved chatbot_active.png');

  await browser.close();
})();
