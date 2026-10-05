const fs = require('fs');
const path = require('path');

function getImports(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const imports = new Set();
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      for (const i of getImports(full)) imports.add(i);
    } else if (f.name.endsWith('.ts') || f.name.endsWith('.tsx')) {
      const c = fs.readFileSync(full, 'utf8');
      const lines = c.split('\n');
      for (const line of lines) {
        const m = line.match(/from\s+['"]([^'"]+)['"]/);
        if (m && !m[1].startsWith('.') && !m[1].startsWith('@/')) {
          imports.add(m[1]);
        }
      }
    }
  }
  return imports;
}

console.log('External packages used in lib/chatbot:');
for (const p of getImports('lib/chatbot')) {
  console.log(' - ' + p);
}
