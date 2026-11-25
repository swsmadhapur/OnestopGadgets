const fs = require('fs');
const path = require('path');

const protoPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(protoPath, 'utf8');

console.log('Original size:', html.length);

// =========================================================================
// 1. SECTION 1 (HERO): #561320
// =========================================================================
// Replace the hero background with #561320 rich wine tone
html = html.replace(
  /<div id="hero-slider-container" class="([^"]*)" style="[^"]*">/,
  '<div id="hero-slider-container" class="$1" style="background: radial-gradient(circle at 65% 50%, #681726 0%, #561320 50%, #430d18 100%);">'
);
console.log('✅ Section 1 (Hero) set to #561320');

// =========================================================================
// 2. SECTION 2 (MEMBERSHIP & 1500+ DEALS): MILKY WHITE (#F8F9FA)
// =========================================================================
const memStart = html.indexOf('<section id="membership-section"');
const winStart = html.indexOf('<section id="winners-section"');

if (memStart !== -1 && winStart !== -1) {
  let memSection = html.substring(memStart, winStart);

  // Background: #F8F9FA
  memSection = memSection.replace(
    /style="background:\s*#400a14;"/,
    'style="background: #F8F9FA;" class="full-width-section relative py-16 sm:py-20 shadow-sm border-y border-slate-200"'
  );

  // Pill badge: ONE STOP GADGETS MEMBERSHIP
  memSection = memSection.replace(
    /bg-white\/10 backdrop-blur-md border border-white\/20 px-3\.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-amber-300 shadow-sm/g,
    'bg-[#561320]/10 border border-[#561320]/25 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-[#561320] shadow-sm'
  );

  // Title: 1,500+ live member deals from 100+ brands
  memSection = memSection.replace(
    /text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-sm/g,
    'text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight'
  );
  memSection = memSection.replace(
    /<span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-white">from 100\+ brands\.<\/span>/g,
    '<span class="text-[#D42526]">from 100+ brands.</span>'
  );

  // Paragraph text
  memSection = memSection.replace(
    /text-white\/85 text-base sm:text-lg leading-relaxed max-w-xl/g,
    'text-slate-600 font-medium text-base sm:text-lg leading-relaxed max-w-xl'
  );

  // VIP Gadget Pass promo badge
  memSection = memSection.replace(
    /bg-white\/10 border border-white\/20 text-xs sm:text-sm text-white font-medium shadow-sm/g,
    'bg-white border border-slate-300/80 text-xs sm:text-sm text-slate-800 font-medium shadow-sm'
  );

  // "See the deals" button
  memSection = memSection.replace(
    /bg-white\/10 hover:bg-white\/20 backdrop-blur-md border border-white\/30 text-white font-extrabold/g,
    'bg-slate-900 hover:bg-slate-800 text-white font-extrabold shadow-md'
  );

  // "No purchase needed to browse"
  memSection = memSection.replace(
    /text-xs text-white\/60/g,
    'text-xs text-slate-500'
  );

  // Published Winners Summary Badge
  memSection = memSection.replace(
    /bg-black\/30 backdrop-blur-md border border-white\/15 rounded-2xl p-4 max-w-md flex items-center gap-3\.5 shadow-xl/g,
    'bg-white border border-slate-200 rounded-2xl p-4 max-w-md flex items-center gap-3.5 shadow-md'
  );
  memSection = memSection.replace(
    /ring-2 ring-\[#400a14\]/g,
    'ring-2 ring-white'
  );
  memSection = memSection.replace(
    /<p class="font-black text-white text-sm">67 published winners across 25 giveaways<\/p>/g,
    '<p class="font-black text-slate-900 text-sm">67 published winners across 25 giveaways</p>'
  );
  memSection = memSection.replace(
    /<p class="text-white\/70 text-xs">Latest iPhone winner: Rohan S\., iPhone 16 Pro Max<\/p>/g,
    '<p class="text-slate-500 text-xs">Latest iPhone winner: Rohan S., iPhone 16 Pro Max</p>'
  );

  // Right Side Brands Container: Deep #561320 rich card that stands out elegantly on milky white
  memSection = memSection.replace(
    /bg-\[#27050b\]\/90 backdrop-blur-xl border border-white\/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden/g,
    'bg-[#561320] border border-rose-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white'
  );
  memSection = memSection.replace(
    /from-\[#27050b\] to-transparent/g,
    'from-[#561320] to-transparent'
  );

  html = html.substring(0, memStart) + memSection + html.substring(winStart);
  console.log('✅ Section 2 (Membership) set to Milky White (#F8F9FA)');
}

// =========================================================================
// 3. SECTION 3 (WINNERS): #561320
// =========================================================================
const winStart3 = html.indexOf('<section id="winners-section"');
const catStart3 = html.indexOf('<!-- Categories Section with Premium UI Cards -->');

if (winStart3 !== -1 && catStart3 !== -1) {
  let winSection = html.substring(winStart3, catStart3);

  // Background: #561320
  winSection = winSection.replace(
    /style="background:\s*#F8F9FA;"/,
    'style="background: #561320;"'
  );
  winSection = winSection.replace(
    /border-y border-slate-200/g,
    'border-y border-white/10'
  );

  // Header & subtext back to bright white & gold
  winSection = winSection.replace(
    /text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight/g,
    'text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight'
  );
  winSection = winSection.replace(
    /text-slate-600 font-medium text-sm sm:text-base max-w-xl/g,
    'text-white/80 font-medium text-sm sm:text-base max-w-xl'
  );
  winSection = winSection.replace(
    /<span class="text-slate-900 font-extrabold">Rohan Sharma<\/span>/g,
    '<span class="text-white font-bold">Rohan Sharma</span>'
  );
  winSection = winSection.replace(
    /text-\[#D42526\] font-black text-xs tracking-wider uppercase/g,
    'text-amber-400 font-black text-xs tracking-wider uppercase'
  );
  winSection = winSection.replace(
    /text-\[#D42526\] hover:text-\[#991422\] font-black uppercase/g,
    'text-amber-300 hover:text-white font-black uppercase'
  );

  // Cards inside winners: elevate them with dark wine cards and crisp gold/white details
  winSection = winSection.replace(
    /bg-\[#400a14\]/g,
    'bg-[#3a0b14]'
  );

  html = html.substring(0, winStart3) + winSection + html.substring(catStart3);
  console.log('✅ Section 3 (Winners) set to #561320');
}

// =========================================================================
// 4. SECTION 4 (CATEGORIES & DEALS): MILKY WHITE (#F8F9FA)
// =========================================================================
// In Section 4 wrapper:
html = html.replace(
  /<!-- SECTION 4: CATEGORIES & DEALS \(FULL WIDTH - #400a14\) -->[\s\S]*?<section class="full-width-section relative py-16 sm:py-20 shadow-2xl" style="background: #400a14;">/,
  `<!-- SECTION 4: CATEGORIES & DEALS (FULL WIDTH - MILKY WHITE) -->
      <!-- ========================================== -->
      <section class="full-width-section relative py-16 sm:py-20 shadow-sm border-y border-slate-200" style="background: #F8F9FA;">`
);

// Update section headers inside Categories & Deals to be readable on milky white:
// Category heading
html = html.replace(
  /<h2 class="text-xl font-extrabold text-white flex items-center gap-2">/g,
  '<h2 class="text-xl font-extrabold text-slate-900 flex items-center gap-2">'
);
html = html.replace(
  /<p class="text-xs text-slate-500">Click any category to open and filter verified tech deals<\/p>/g,
  '<p class="text-xs text-slate-600 font-medium">Click any category to open and filter verified tech deals</p>'
);

// Deals heading
html = html.replace(
  /<h2 class="text-xl font-extrabold text-white">Today's Featured Deals<\/h2>/g,
  '<h2 class="text-xl font-extrabold text-slate-900">Today\'s Featured Deals</h2>'
);
html = html.replace(
  /<p class="text-xs text-slate-500">Publicly available discounted links verified with partner merchants<\/p>/g,
  '<p class="text-xs text-slate-600 font-medium">Publicly available discounted links verified with partner merchants</p>'
);

// Browse all deals link
html = html.replace(
  /class="text-xs font-bold text-\[#641428\] hover:text-\[#FF3C50\]">/g,
  'class="text-xs font-extrabold text-[#D42526] hover:text-[#991422]">'
);

// Lucky Dip card inside deals: give it an impactful dark wine container that pops on milky white
html = html.replace(
  /jackpot-gradient rounded-3xl p-1 shadow-xl/g,
  'rounded-3xl p-1 shadow-2xl'
);
html = html.replace(
  /<div class="bg-\[#141428\] rounded-\[22px\]/g,
  '<div class="bg-[#561320] rounded-[22px] border border-rose-900/40'
);

console.log('✅ Section 4 (Categories & Deals) set to Milky White (#F8F9FA)');

// =========================================================================
// 5. SECTION 5 (VIP PRICING): #561320
// =========================================================================
const vipStart5 = html.indexOf('id="vip-pricing-section"');
if (vipStart5 !== -1) {
  // Find opening tag
  const tagStart = html.lastIndexOf('<div', vipStart5);
  const tagEnd = html.indexOf('>', vipStart5);
  const oldTag = html.substring(tagStart, tagEnd + 1);

  const newTag = `<div id="vip-pricing-section" class="full-width-section relative py-16 sm:py-20 shadow-2xl border-t border-white/10" style="background: #561320;">`;
  html = html.substring(0, tagStart) + newTag + html.substring(tagEnd + 1);

  // Update headings inside VIP pricing to white
  html = html.replace(
    /text-3xl sm:text-4xl font-black text-slate-900/g,
    'text-3xl sm:text-4xl font-black text-white'
  );
  html = html.replace(
    /text-sm text-slate-600 font-medium leading-relaxed/g,
    'text-sm text-white/80 font-medium leading-relaxed'
  );

  console.log('✅ Section 5 (VIP Pricing) set to #561320');
}

// Save prototype
fs.writeFileSync(protoPath, html, 'utf8');
console.log('✅ All alternative sections saved to prototype! New length:', html.length);
