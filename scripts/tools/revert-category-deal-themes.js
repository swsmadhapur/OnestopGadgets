const fs = require('fs');
const path = require('path');

const protoPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(protoPath, 'utf8');

console.log('Original prototype size:', html.length);

// 1. REVERT SECTION 2 (FEATURED GADGET CATEGORIES) BACKGROUND TO #2664eb
const catSecOld = `<!-- ========================================== -->
      <!-- SECTION 2: FEATURED GADGET CATEGORIES (FULL WIDTH - MILKY WHITE) -->
      <!-- ========================================== -->
      <section id="categories-section" class="full-width-section relative py-12 sm:py-16 shadow-sm border-y border-slate-200" style="background: #F8F9FA;">`;

const catSecReverted = `<!-- ========================================== -->
      <!-- SECTION 2: FEATURED GADGET CATEGORIES (FULL WIDTH - #2664eb) -->
      <!-- ========================================== -->
      <section id="categories-section" class="full-width-section relative py-12 sm:py-16 shadow-xl border-y border-blue-400/20" style="background: #2664eb;">`;

if (html.includes(catSecOld)) {
  html = html.replace(catSecOld, catSecReverted);
  console.log('✅ Section 2 (Categories) background reverted to #2664eb');
} else {
  html = html.replace(
    /style="background:\s*#F8F9FA;" class="full-width-section relative py-12 sm:py-16 shadow-sm border-y border-slate-200"/g,
    'style="background: #2664eb;" class="full-width-section relative py-12 sm:py-16 shadow-xl border-y border-blue-400/20"'
  );
  html = html.replace(
    /class="full-width-section relative py-12 sm:py-16 shadow-sm border-y border-slate-200" style="background: #F8F9FA;"/g,
    'class="full-width-section relative py-12 sm:py-16 shadow-xl border-y border-blue-400/20" style="background: #2664eb;"'
  );
  console.log('✅ Section 2 (Categories) replaced via regex');
}

// Revert text styling inside Section 2 to white/gold for #2664eb
html = html.replace(
  /<h2 class="text-2xl font-black text-slate-900 flex items-center gap-2">/g,
  '<h2 class="text-2xl font-black text-white flex items-center gap-2 drop-shadow-sm">'
);
html = html.replace(
  /<p class="text-xs text-slate-600 font-medium">Click any category to open and filter verified tech deals<\/p>/g,
  '<p class="text-xs text-blue-100 font-medium">Click any category to open and filter verified tech deals</p>'
);
html = html.replace(
  /class="text-xs font-extrabold text-\[#D42526\] hover:text-\[#991422\] flex items-center gap-1 transition">/g,
  'class="text-xs font-black text-amber-300 hover:text-white flex items-center gap-1 transition drop-shadow-sm">'
);

// 2. REVERT SECTION 3 (TODAY'S FEATURED DEALS) BACKGROUND TO MILKY WHITE (#F8F9FA)
const dealsSecOld = `<!-- ========================================== -->
      <!-- SECTION 3: TODAY'S FEATURED DEALS (FULL WIDTH - #2664eb) -->
      <!-- ========================================== -->
      <section id="deals-showcase-section" class="full-width-section relative py-12 sm:py-16 shadow-xl border-b border-blue-400/20" style="background: #2664eb;">`;

const dealsSecReverted = `<!-- ========================================== -->
      <!-- SECTION 3: TODAY'S FEATURED DEALS (FULL WIDTH - MILKY WHITE) -->
      <!-- ========================================== -->
      <section id="deals-showcase-section" class="full-width-section relative py-12 sm:py-16 shadow-sm border-b border-slate-200" style="background: #F8F9FA;">`;

if (html.includes(dealsSecOld)) {
  html = html.replace(dealsSecOld, dealsSecReverted);
  console.log('✅ Section 3 (Deals) background reverted to Milky White (#F8F9FA)');
} else {
  html = html.replace(
    /style="background:\s*#2664eb;" class="full-width-section relative py-12 sm:py-16 shadow-xl border-b border-blue-400\/20"/g,
    'style="background: #F8F9FA;" class="full-width-section relative py-12 sm:py-16 shadow-sm border-b border-slate-200"'
  );
  html = html.replace(
    /class="full-width-section relative py-12 sm:py-16 shadow-xl border-b border-blue-400\/20" style="background: #2664eb;"/g,
    'class="full-width-section relative py-12 sm:py-16 shadow-sm border-b border-slate-200" style="background: #F8F9FA;"'
  );
  console.log('✅ Section 3 (Deals) replaced via regex');
}

// Revert text styling inside Section 3 to dark slate / crimson for milky white
html = html.replace(
  /<h2 class="text-2xl font-black text-white drop-shadow-sm">Today's Featured Deals<\/h2>/g,
  '<h2 class="text-2xl font-black text-slate-900">Today\'s Featured Deals</h2>'
);
html = html.replace(
  /<p class="text-xs text-blue-100 font-medium">Publicly available discounted links verified with partner merchants<\/p>/g,
  '<p class="text-xs text-slate-600 font-medium">Publicly available discounted links verified with partner merchants</p>'
);
html = html.replace(
  /class="text-xs font-black text-amber-300 hover:text-white transition drop-shadow-sm">/g,
  'class="text-xs font-extrabold text-[#D42526] hover:text-[#991422] transition">'
);

// Save prototype
fs.writeFileSync(protoPath, html, 'utf8');
console.log('✅ Reversion completed. New size:', html.length);
