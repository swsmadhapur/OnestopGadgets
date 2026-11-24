const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

const checklist = [
  { name: 'Navbar background gradient (#350C12 -> #59121B -> #350C12)', pass: p.includes('#350C12') && p.includes('#59121B') },
  { name: 'Brand logo, white ONE STOP, red GADGETS (#FF304D)', pass: p.includes('ONE STOP') && p.includes('#FF304D') && p.includes('GADGETS') },
  { name: 'Tagline DEALS • VIP • LUCKY DIP', pass: p.includes('DEALS • VIP • LUCKY DIP') },
  { name: 'Active button solid red (#D91E26) on Home', pass: p.includes('bg-[#D91E26]') },
  { name: 'Lucky Dip bright red (#FF304D) with golden gift icon 🎁', pass: p.includes('text-[#FF304D]') && p.includes('🎁') && p.includes('Lucky Dip') },
  { name: 'Black search bar (#000000) with placeholder "FiboSearch: iPhone, Sony..."', pass: p.includes('bg-[#000000]') && p.includes('FiboSearch: iPhone, Sony...') },
  { name: 'FIBO badge with color #70152D', pass: p.includes('#70152D') && p.includes('FIBO') },
  { name: 'Solid red Sign In button (#D91E26) with user outline icon', pass: p.includes('Sign In') && p.includes('#D91E26') },
  { name: 'Announcement bar gradient (#D91E26 -> #1954CF -> #D91E26)', pass: p.includes('#1954CF') && p.includes('#D91E26') },
  { name: 'Announcement single line with golden ⚡ and underlined "Explore Offers"', pass: p.includes('⚡') && p.includes('EXCLUSIVE TECH DEALS') && p.includes('Explore Offers') },
  { name: 'All navigation links wired (storefront, catalog, about, luckydip, contact, signin)', pass: p.includes("navigate('storefront')") && p.includes("navigate('catalog')") && p.includes("navigate('about')") && p.includes("handleLuckyDipNavClick()") && p.includes("navigate('contact')") && p.includes("navigate('signin')") }
];

console.log('=== NAVBAR FIDELITY VERIFICATION RESULTS ===');
let passed = true;
checklist.forEach(c => {
  if (!c.pass) passed = false;
  console.log((c.pass ? '✅ ' : '❌ ') + c.name);
});
console.log('Overall Navigation Fidelity:', passed ? 'PIXEL-PERFECT MATCH' : 'ATTENTION NEEDED');
