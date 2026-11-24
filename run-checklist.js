const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

const checklist = [
  { name: 'Navbar logo & DEALS • VIP • LUCKY DIP', pass: p.includes('DEALS') && p.includes('VIP') && p.includes('LUCKY DIP') },
  { name: 'Flash sale announcement bar', pass: p.includes('EXCLUSIVE TECH DEALS') && p.includes('Explore Offers') },
  { name: 'Hero Join VIP Now & Try Lucky Dip buttons', pass: p.includes('Join VIP Now') && p.includes('Try Lucky Dip') },
  { name: 'Featured Gadget Categories', pass: p.includes('Featured Gadget Categories') && p.includes('View All in Directory') },
  { name: 'Today\'s Featured Deals', pass: p.includes("Today's Featured Deals") && p.includes('Browse All Deals') },
  { name: 'Real Winners Section', pass: p.includes('67 winners across 25 giveaways') && p.includes('Rohan Sharma') && p.includes('SEE EVERY WINNER') },
  { name: 'VIP Pricing (Monthly, 6-Month, Annual)', pass: p.includes('Simple, Transparent VIP Pricing') && p.includes('₹299') && p.includes('₹1,199') && p.includes('₹1,799') },
  { name: 'Footer brand & Designed by Sun Web Solutions', pass: p.includes('Sun Web Solutions') && p.includes('Important Links') },
  { name: 'All Pages (Deals, About, Lucky Dip, Contact, Sign In)', pass: p.includes('id="screen-catalog"') && p.includes('id="screen-about"') && p.includes('id="screen-luckydip"') && p.includes('id="screen-contact"') && p.includes('id="screen-signin"') },
  { name: 'Policy Modals for footer', pass: p.includes('id="policy-modal"') && p.includes('showPolicy') },
  { name: 'Floating WhatsApp support button', pass: p.includes('WhatsApp Help') },
];

console.log('=== ONE STOP GADGETS FIDELITY VERIFICATION ===');
let allPassed = true;
checklist.forEach(c => {
  if (!c.pass) allPassed = false;
  console.log((c.pass ? '✅ ' : '❌ ') + c.name);
});
console.log('Overall Status:', allPassed ? 'ALL REQUIREMENTS MET' : 'SOME CHECKS FAILED');
