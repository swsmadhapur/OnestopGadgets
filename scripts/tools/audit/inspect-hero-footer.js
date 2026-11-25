const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

// Hero section lines
const heroIdx = p.indexOf('id="hero-section"');
console.log('=== HERO SECTION PREVIEW (first 1000 chars) ===');
console.log(p.substring(heroIdx, heroIdx + 2000));

// Footer lines
const footerIdx = p.indexOf('<footer');
console.log('=== FOOTER PREVIEW (first 1000 chars) ===');
console.log(p.substring(footerIdx, footerIdx + 1500));
