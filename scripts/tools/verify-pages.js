const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

const checks = [
  { name: 'Home Page (#screen-storefront)', found: p.includes('id="screen-storefront"') },
  { name: 'Deals Page (#screen-catalog)', found: p.includes('id="screen-catalog"') },
  { name: 'About Page (#screen-about)', found: p.includes('id="screen-about"') },
  { name: 'Contact Page (#screen-contact)', found: p.includes('id="screen-contact"') },
  { name: 'Lucky Dip Page (#screen-luckydip)', found: p.includes('id="screen-luckydip"') },
  { name: 'Navbar navigation triggers present', found: p.includes("navigate('storefront')") && p.includes("navigate('catalog')") && p.includes("navigate('about')") && p.includes("navigate('luckydip')") && p.includes("navigate('contact')") },
  { name: 'Exact color tokens active (#E50914, #400B19, #1645C4, #F5F6FA, #101428)', found: p.includes('#E50914') && p.includes('#400B19') && p.includes('#1645C4') && p.includes('#F5F6FA') && p.includes('#101428') }
];

console.log('=== PAGE VERIFICATION RESULTS ===');
checks.forEach(c => console.log((c.found ? '✅ ' : '❌ ') + c.name));
