const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');
const lines = p.split('\n');

console.log('=== Checking navigate function ===');
lines.forEach((l, idx) => {
  if (l.includes('function navigate(') || l.includes('function showScreen(') || l.includes('function selectCategoryAndOpenDeals(')) {
    console.log((idx+1) + ': ' + l.trim());
    console.log(lines.slice(idx, idx+25).join('\n'));
    console.log('--------------------------------------------------');
  }
});

console.log('=== Checking screens in HTML ===');
lines.forEach((l, idx) => {
  if (l.includes('id="screen-') || l.includes('id="storefront') || l.includes('id="catalog')) {
    console.log((idx+1) + ': ' + l.trim().slice(0, 100));
  }
});
