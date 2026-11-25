const fs = require('fs');

// Inspect current prototype index.html
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

console.log('Prototype length:', p.length);

// Check hero section elements in prototype
console.log('Has Exclusive Tech Deals heading:', p.includes('Exclusive Tech Deals,'));
console.log('Has Join VIP Now button:', p.includes('Join VIP Now'));
console.log('Has Try Lucky Dip button:', p.includes('Try Lucky Dip'));

// Check 8 categories from reference image:
// 1. Smartphones, 2. Laptops, 3. Audio & Wearables, 4. Smartwatches, 5. Gaming, 6. Cameras, 7. Smart Home, 8. Accessories
const has8Cats = [
  'Smartphones', 'Laptops', 'Audio & Wearables', 'Smartwatches',
  'Gaming', 'Cameras', 'Smart Home', 'Accessories'
].every(c => p.includes(c));
console.log('Has all 8 exact categories from reference image:', has8Cats);

// Check 4 featured deals from reference image:
// 1. Apple iPhone 16 Pro Max (-18%) Amazon Verified ₹1,34,999 ₹1,64,900
// 2. MacBook Air M4 (13-inch) (-22%) Flipkart Verified ₹94,990 ₹1,21,900
// 3. Bose QuietComfort Ultra Headphones (-35%) Amazon Verified ₹25,999 ₹39,999
// 4. PlayStation 5 Slim (Disc Edition) (-20%) Flipkart Verified ₹43,990 ₹54,990
console.log('Has iPhone 16 Pro Max deal:', p.includes('Apple iPhone 16 Pro Max'));
console.log('Has MacBook Air M4 deal:', p.includes('MacBook Air M4'));
console.log('Has Bose QuietComfort deal:', p.includes('Bose QuietComfort'));
console.log('Has PlayStation 5 Slim deal:', p.includes('PlayStation 5 Slim'));

// Check Winners section:
// 67 winners across 25 giveaways
// Latest: Rohan Sharma, iPhone 16 Pro Max (256 GB), November 2026.
// Winners: Rohan Sharma (R), Gagan Preet (G), Ekambir Sandhu (E), Sukhjinder Singh (S), Abha Talwar (A), Jaydev Bhere (J)
console.log('Has 67 winners across 25 giveaways:', p.includes('67 winners across 25 giveaways'));
console.log('Has Rohan Sharma:', p.includes('Rohan Sharma'));
console.log('Has SEE EVERY WINNER:', p.includes('SEE EVERY WINNER'));

// Check VIP Pricing:
// Simple, Transparent VIP Pricing
// Monthly Access ₹299 / month
// 6-Month Pass ₹1,199 / 6 mo (~₹199/mo) - MOST POPULAR • 33% OFF
// Annual Pass ₹1,799 / year (~₹149/mo)
console.log('Has Simple, Transparent VIP Pricing:', p.includes('Simple, Transparent VIP Pricing'));
console.log('Has Monthly Access ₹299:', p.includes('₹299'));
console.log('Has 6-Month Pass ₹1,199:', p.includes('₹1,199'));
console.log('Has Annual Pass ₹1,799:', p.includes('₹1,799'));

// Check Footer:
console.log('Has Designed by Sun Web Solutions:', p.includes('Designed by Sun Web Solutions'));
console.log('Has Palette dots in footer:', p.includes('Palette:'));
