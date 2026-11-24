const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

// Check mobile menu drawer markup
const mmIdx = p.indexOf('id="mobile-menu"');
console.log('Mobile menu index:', mmIdx);
if (mmIdx !== -1) {
  console.log('Mobile menu preview:');
  console.log(p.substring(mmIdx, mmIdx + 1200));
}

// Check hamburger button
console.log('Has hamburger button:', p.includes('id="hamburger-btn"'));
console.log('Has toggleMobileMenu:', p.includes('function toggleMobileMenu'));
