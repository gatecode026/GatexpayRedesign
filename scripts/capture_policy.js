const { execSync } = require('child_process');

const urls = [
  { url: 'http://localhost:3000/policy/privacy-policy', name: 'policy_privacy_1440.png', w: 1440, h: 1200 },
  { url: 'http://localhost:3000/policy/refund-policy', name: 'policy_refund_1440.png', w: 1440, h: 1200 },
  { url: 'http://localhost:3000/policy/security-policy', name: 'policy_security_1440.png', w: 1440, h: 1200 },
  { url: 'http://localhost:3000/policy/grievance-redressal', name: 'policy_grievance_1440.png', w: 1440, h: 1200 },
  { url: 'http://localhost:3000/policy/privacy-policy', name: 'policy_privacy_mobile.png', w: 390, h: 844 },
];

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\busin\\.gemini\\antigravity-ide\\brain\\f3da04af-ed64-41af-a5a5-66f9047c3120';

for (const item of urls) {
  const out = `${outDir}\\${item.name}`;
  const cmd = `"${chromePath}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=2000 --window-size=${item.w},${item.h} --screenshot="${out}" "${item.url}"`;
  try {
    execSync(cmd, { stdio: 'ignore' });
    console.log(`Captured: ${item.name}`);
  } catch (err) {
    console.error(`Failed ${item.name}:`, err.message);
  }
}
