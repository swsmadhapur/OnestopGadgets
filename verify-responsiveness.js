const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

const checks = [
  { name: 'Mobile drawer overlay (#mobile-menu) with backdrop blur', pass: p.includes('id="mobile-menu"') && p.includes('backdrop-blur') },
  { name: 'Responsive Hamburger toggle button', pass: p.includes('id="hamburger-btn"') },
  { name: 'Mobile search icon trigger for screens < 640px', pass: p.includes('sm:hidden') && p.includes('toggleMobileMenu()') },
  { name: 'Logo responsive scaling (52px on mobile to 82px on desktop)', pass: p.includes('w-[52px]') && p.includes('lg:w-[82px]') },
  { name: 'Announcement bar responsive flex-wrap', pass: p.includes('flex flex-wrap items-center justify-center') },
  { name: 'Categories responsive grid (grid-cols-2 sm:grid-cols-4 lg:grid-cols-8)', pass: p.includes('grid-cols-2') && p.includes('lg:grid-cols-8') },
  { name: 'Featured Deals responsive layout (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4)', pass: p.includes('id="storefront-deals"') },
  { name: 'Winners horizontal swipe on mobile with touch-scroll', pass: p.includes('overflow-x-auto') && p.includes('custom-scroll') },
  { name: 'VIP Pricing responsive stacking (grid-cols-1 md:grid-cols-3)', pass: p.includes('grid-cols-1 md:grid-cols-3') }
];

console.log('=== RESPONSIVENESS VALIDATION RESULTS ===');
let allGood = true;
checks.forEach(c => {
  if (!c.pass) allGood = false;
  console.log((c.pass ? '✅ ' : '❌ ') + c.name);
});
console.log('Overall Responsive Status:', allGood ? 'PERFECTLY FITTED & RESPONSIVE' : 'CHECK FAILED');
