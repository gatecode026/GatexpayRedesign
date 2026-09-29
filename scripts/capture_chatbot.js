const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\busin\\.gemini\\antigravity-ide\\brain\\f3da04af-ed64-41af-a5a5-66f9047c3120';

// 1. Scrolled screenshot showing Jump to Top and Chatbot launcher
const cmd1 = `"${chromePath}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${outDir}\\test_scroll_launcher.png" "http://localhost:3000/#features"`;
try {
  execSync(cmd1, { stdio: 'ignore' });
  console.log('Captured test_scroll_launcher.png');
} catch (e) {
  console.error(e.message);
}
