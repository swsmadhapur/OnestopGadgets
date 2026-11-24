const fs = require('fs');
const protoPath = 'design/prototype/index.html';
let content = fs.readFileSync(protoPath, 'utf8');

// Fix double style attribute in winners-section
content = content.replace(
  `id="winners-section" class="full-width-section relative py-14 shadow-inner text-white border-y border-[#400B19]" style="background: radial-gradient(circle at 50% 30%, rgba(229, 9, 20, 0.25) 0%, #400B19 60%, #101428 100%);" style="background: #1E40AF;"`,
  `id="winners-section" class="full-width-section relative py-14 shadow-inner text-white border-y border-[#400B19]" style="background: radial-gradient(circle at 50% 30%, rgba(229, 9, 20, 0.25) 0%, #400B19 60%, #101428 100%);"`
);

// Verify all required individual pages exist as screen-views:
const screens = [
  'screen-storefront',   // Home
  'screen-catalog',      // Deals & All Categories
  'screen-about',        // About Us
  'screen-luckydip',     // Lucky Dip
  'screen-contact',      // Contact Us
  'screen-signin',       // Sign In
  'screen-pricing',      // VIP Subscription
  'screen-admin',        // Admin Panel
  'screen-superadmin'    // Super Admin
];

let allExist = true;
screens.forEach(s => {
  if (!content.includes(`id="${s}"`)) {
    console.log('Missing screen:', s);
    allExist = false;
  }
});

console.log('All individual pages exist in prototype:', allExist);

fs.writeFileSync(protoPath, content, 'utf8');
fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully cleaned markup and verified all screens!');
