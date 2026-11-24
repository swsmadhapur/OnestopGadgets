const fs = require('fs');
const path = require('path');

const protoPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(protoPath, 'utf8');

console.log('Original prototype size:', html.length);

// =========================================================================
// 1. UPDATE HOME PAGE FEATURED GADGET CATEGORIES & DEALS SECTION BG TO #2664eb
// =========================================================================
// In Section 4:
// Replace the section wrapper background from #F8F9FA to #2664eb
const catSecOld = `<!-- SECTION 4: CATEGORIES & DEALS (FULL WIDTH - MILKY WHITE) -->
      <!-- ========================================== -->
      <section class="full-width-section relative py-16 sm:py-20 shadow-sm border-y border-slate-200" style="background: #F8F9FA;">`;

const catSecNew = `<!-- SECTION 4: CATEGORIES & DEALS (FULL WIDTH - #2664eb) -->
      <!-- ========================================== -->
      <section class="full-width-section relative py-16 sm:py-20 shadow-xl border-y border-blue-400/20" style="background: #2664eb;">`;

if (html.includes(catSecOld)) {
  html = html.replace(catSecOld, catSecNew);
  console.log('✅ Section 4 background updated to #2664eb');
} else {
  // Regex match
  html = html.replace(
    /style="background:\s*#F8F9FA;" class="full-width-section relative py-16 sm:py-20 shadow-sm border-y border-slate-200"/g,
    'style="background: #2664eb;" class="full-width-section relative py-16 sm:py-20 shadow-xl border-y border-blue-400/20"'
  );
  html = html.replace(
    /class="full-width-section relative py-16 sm:py-20 shadow-sm border-y border-slate-200" style="background: #F8F9FA;"/g,
    'class="full-width-section relative py-16 sm:py-20 shadow-xl border-y border-blue-400/20" style="background: #2664eb;"'
  );
  console.log('✅ Section 4 background replaced via regex');
}

// Adjust text colors in Section 4 so they look stunning and highly visible on #2664eb blue:
html = html.replace(
  /<h2 class="text-xl font-extrabold text-slate-900 flex items-center gap-2">/g,
  '<h2 class="text-2xl font-black text-white flex items-center gap-2 drop-shadow-sm">'
);
html = html.replace(
  /<p class="text-xs text-slate-600 font-medium">Click any category to open and filter verified tech deals<\/p>/g,
  '<p class="text-xs text-blue-100 font-medium">Click any category to open and filter verified tech deals</p>'
);

html = html.replace(
  /<h2 class="text-xl font-extrabold text-slate-900">Today's Featured Deals<\/h2>/g,
  '<h2 class="text-2xl font-black text-white drop-shadow-sm">Today\'s Featured Deals</h2>'
);
html = html.replace(
  /<p class="text-xs text-slate-600 font-medium">Publicly available discounted links verified with partner merchants<\/p>/g,
  '<p class="text-xs text-blue-100 font-medium">Publicly available discounted links verified with partner merchants</p>'
);

// Links in Section 4 header (View All, Browse All)
html = html.replace(
  /class="text-xs font-extrabold text-\[#D42526\] hover:text-\[#991422\]"/g,
  'class="text-xs font-black text-amber-300 hover:text-white transition drop-shadow-sm"'
);
html = html.replace(
  /class="text-xs font-bold text-\[#641428\] hover:text-\[#FF3C50\] flex items-center gap-1 transition"/g,
  'class="text-xs font-black text-amber-300 hover:text-white flex items-center gap-1 transition drop-shadow-sm"'
);

// =========================================================================
// 2. ADD THE EXACT UNDER 49 AND UNDER 99 PRODUCTS INTO DEALS_DATA
// =========================================================================
const exactStealDeals = `,
      // Featured Steal Deals under ₹49 (matching screenshot 2)
      { id: 37, title: 'Boult Braided Type-C OTG Sync Adapter', category: 'accessories', brand: 'Boult', store: 'Flipkart', price: '₹49', original: '₹299', discount: '84% OFF', dealType: 'product', icon: '🔌', isVip: false },
      { id: 38, title: 'Plum Refreshing Mini Face Wash 15ml', category: 'accessories', brand: 'Plum', store: 'Amazon', price: '₹49', original: '₹99', discount: '50% OFF', dealType: 'product', icon: '🧴', isVip: false },
      { id: 39, title: 'Amrutanjan Roll-on Instant Pain Relief 10ml', category: 'accessories', brand: 'Amrutanjan', store: 'Flipkart', price: '₹39', original: '₹60', discount: '35% OFF', dealType: 'product', icon: '🌿', isVip: false },
      { id: 40, title: 'Portland Silicone Cable Organizer 3-Pack', category: 'accessories', brand: 'Portland', store: 'Amazon', price: '₹45', original: '₹199', discount: '77% OFF', dealType: 'product', icon: '🧲', isVip: false },
      { id: 41, title: 'Zebronics Dust Plug Protector Set for iPhone', category: 'smartphones', brand: 'Zebronics', store: 'Amazon', price: '₹29', original: '₹99', discount: '70% OFF', dealType: 'product', icon: '📱', isVip: false },
      { id: 42, title: 'Eveready AAA Alkaline Batteries 4-Pack', category: 'accessories', brand: 'Eveready', store: 'Flipkart', price: '₹48', original: '₹80', discount: '40% OFF', dealType: 'product', icon: '🔋', isVip: false },

      // Curated Steal Deals under ₹99
      { id: 43, title: 'boAt Micro USB 2.4A Fast Charging Cable 1.5M', category: 'accessories', brand: 'boAt', store: 'Amazon', price: '₹79', original: '₹399', discount: '80% OFF', dealType: 'product', icon: '⚡', isVip: false },
      { id: 44, title: 'Portronics Clean Guard Screen & Lens Spray (50ml)', category: 'accessories', brand: 'Portronics', store: 'Flipkart', price: '₹89', original: '₹299', discount: '70% OFF', dealType: 'product', icon: '✨', isVip: false },
      { id: 45, title: 'Noise Universal Silicon Anti-Slip Earphone Hooks (2-Pairs)', category: 'audio', brand: 'Noise', store: 'Amazon', price: '₹69', original: '₹249', discount: '72% OFF', dealType: 'product', icon: '🎧', isVip: false },
      { id: 46, title: 'Ambrane 3-in-1 Compact Keychain USB Cable', category: 'accessories', brand: 'Ambrane', store: 'Amazon', price: '₹95', original: '₹399', discount: '76% OFF', dealType: 'product', icon: '🔑', isVip: false },
      { id: 47, title: 'Syska High-Speed Micro SD Card Reader Adapter', category: 'laptops', brand: 'Syska', store: 'Flipkart', price: '₹89', original: '₹299', discount: '70% OFF', dealType: 'product', icon: '💾', isVip: false }
`;

const dealsArrayEnd = 'dealType: \'coupon\', icon: \'🔊\', isVip: false }';
if (html.includes(dealsArrayEnd)) {
  html = html.replace(dealsArrayEnd, dealsArrayEnd + exactStealDeals);
  console.log('✅ Injected all screenshot under 49 and under 99 products into DEALS_DATA');
}

// =========================================================================
// 3. WIRE "See all under ₹49 ➔" TO TRIGGER selectDealTab('under49')
// =========================================================================
html = html.replace(
  /<button class="text-xs font-extrabold text-\[#FF3C50\] hover:text-\[#641428\] flex items-center gap-1 transition">\s*See all under [^<]*\s*<\/button>/g,
  '<button onclick="selectDealTab(\'under49\')" class="text-xs font-black text-[#D42526] hover:text-[#991422] flex items-center gap-1 transition cursor-pointer">See all under ₹49 ➔</button>'
);
console.log('✅ Connected slider See all under 49 button');

// =========================================================================
// 4. ENSURE selectDealTab AUTOMATICALLY CLEARS SEARCH & RESETS OTHER FILTERS
// =========================================================================
const updatedSelectDealTab = `function selectDealTab(tab) {
      document.querySelectorAll('.deal-tab').forEach(btn => {
        btn.classList.remove('bg-[#D42526]', 'text-white', 'shadow-md', 'font-black');
        btn.classList.add('bg-white', 'text-slate-800', 'border', 'border-slate-300', 'font-bold');
      });
      const active = document.getElementById('tab-' + tab);
      if (active) {
        active.classList.remove('bg-white', 'text-slate-800', 'border-slate-300', 'font-bold');
        active.classList.add('bg-[#D42526]', 'text-white', 'shadow-md', 'font-black');
      }

      // If price-based tab clicked
      if (['under49', 'under99', 'under499', 'under999', 'all'].includes(tab)) {
        catalogFilterState.price = tab;
        catalogFilterState.search = ''; // Reset any stale search text
        const searchInput = document.getElementById('deal-search-input');
        if (searchInput) searchInput.value = '';

        // Sync sidebar radio if exists
        const priceRadio = document.querySelector(\`input[name="sidebar-price"][value="\${tab}"]\`);
        if (priceRadio) priceRadio.checked = true;
      } else {
        catalogFilterState.dealType = tab;
      }

      filterCatalog();

      // Smooth scroll to catalog deals grid so user immediately sees results
      const grid = document.getElementById('catalog-deals-grid');
      if (grid && window.innerWidth < 1024) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }`;

const oldSelectDealTabRegex = /function selectDealTab\(tab\)\s*\{[\s\S]*?filterCatalog\(\);\s*\}/;
if (oldSelectDealTabRegex.test(html)) {
  html = html.replace(oldSelectDealTabRegex, updatedSelectDealTab);
  console.log('✅ Updated selectDealTab function with search reset and smooth view');
}

// Save prototype
fs.writeFileSync(protoPath, html, 'utf8');
console.log('✅ Saved updated prototype. New size:', html.length);
