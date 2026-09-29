const fs = require('fs');

let code = fs.readFileSync('data/policies-data.ts', 'utf8');

const dateMap = {
  privacy: '15 May 2026',
  terms: '12 May 2026',
  refund: '11 May 2026',
  cookies: '10 May 2026',
  disclaimer: '08 May 2026',
  security: '07 May 2026',
  grievance: '06 May 2026',
  vendor: '05 May 2026',
  prohibited: '04 May 2026',
  merchant: '03 May 2026',
  data: '02 May 2026',
  'aml-kyc': '01 May 2026',
};

for (const [key, date] of Object.entries(dateMap)) {
  const pattern = new RegExp(`("${key}":\\s*{[\\s\\S]*?lastUpdated:\\s*")[^"]*(")`);
  code = code.replace(pattern, `$1${date}$2`);
}

fs.writeFileSync('data/policies-data.ts', code);
console.log('Fixed dates successfully!');
