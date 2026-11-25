const fs = require('fs');
const path = require('path');

const protoPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(protoPath, 'utf8');

console.log('Original size:', html.length);

// 1. ADD NEW DEALS SPECIFICALLY FOR UNDER 49 AND BUDGET TIERS
const extraDeals = `,
      // Specially added budget deals for Under 49 / 99 / 499 filters
      { id: 29, title: 'Zebronics USB-A to Type-C Metal OTG Adapter', category: 'smartphones', brand: 'Zebronics', store: 'Amazon', price: '₹29', original: '₹149', discount: '81% OFF', dealType: 'product', icon: '🔌', isVip: false },
      { id: 30, title: 'Portronics Fast 18W Micro USB Braided Cable (1m)', category: 'smartphones', brand: 'Portronics', store: 'Flipkart', price: '₹39', original: '₹199', discount: '80% OFF', dealType: 'product', icon: '⚡', isVip: false },
      { id: 31, title: 'Ambrane Silicon Webcam Privacy Sliding Cover (3-Pack)', category: 'laptops', brand: 'Ambrane', store: 'Amazon', price: '₹45', original: '₹249', discount: '82% OFF', dealType: 'product', icon: '💻', isVip: false },
      { id: 32, title: 'Gizga Essentials Microfibre Screen Cleaner Cloth', category: 'laptops', brand: 'Gizga', store: 'Amazon', price: '₹49', original: '₹199', discount: '75% OFF', dealType: 'product', icon: '📱', isVip: false },
      { id: 33, title: 'Noise 3.5mm In-Ear Wired Earphones with HD Mic', category: 'audio', brand: 'Noise', store: 'Flipkart', price: '₹89', original: '₹499', discount: '82% OFF', dealType: 'product', icon: '🎧', isVip: false },
      { id: 34, title: 'Ptron Bullet 3.1A Fast Car Charger Dual Port', category: 'smartphones', brand: 'Ptron', store: 'Amazon', price: '₹199', original: '₹599', discount: '67% OFF', dealType: 'product', icon: '🚗', isVip: false },
      { id: 35, title: 'boAt Bassheads 100 In-Ear Wired Earphones', category: 'audio', brand: 'boAt', store: 'Amazon', price: '₹299', original: '₹999', discount: '70% OFF', dealType: 'product', icon: '🎵', isVip: false },
      { id: 36, title: 'Syska 10000mAh Compact Slim Power Bank', category: 'smartphones', brand: 'Syska', store: 'Flipkart', price: '₹499', original: '₹1,599', discount: '69% OFF', dealType: 'product', icon: '🔋', isVip: false }
`;

// Insert into DEALS_DATA before closing ];
const dealsEndMarker = 'dealType: \'coupon\', icon: \'🔊\', isVip: false }';
if (html.includes(dealsEndMarker)) {
  html = html.replace(dealsEndMarker, dealsEndMarker + extraDeals);
  console.log('✅ Added curated budget products (including Under ₹49 deals)');
} else {
  console.log('⚠️ Could not find dealsEndMarker');
}

// 2. REPLACE DEAL TAB BUTTONS WITH UNDER 49, UNDER 99, UNDER 499, UNDER 999, AND ALL DEALS
const oldTopTabBar = `<!-- Top Tab Bar -->
      <div class="flex items-center gap-1 overflow-x-auto custom-scroll pb-1 mb-4">
        <button onclick="selectDealTab('all')" id="tab-all" class="deal-tab shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#FF3C50] text-white shadow transition">
          &#9889; All Deals
        </button>
        <button onclick="selectDealTab('product')" id="tab-product" class="deal-tab shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white border border-[#C8A0A0] text-[#141428] hover:bg-white/10 backdrop-blur-md transition">
          &#127991;&#65039; Product Deals
        </button>
        <button onclick="selectDealTab('coupon')" id="tab-coupon" class="deal-tab shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white border border-[#C8A0A0] text-[#141428] hover:bg-white/10 backdrop-blur-md transition">
          &#127903;&#65039; Coupons &amp; Offers
        </button>
        <button onclick="selectDealTab('ending')" id="tab-ending" class="deal-tab shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white border border-[#C8A0A0] text-[#141428] hover:bg-white/10 backdrop-blur-md transition">
          &#9203; Ending Soon
        </button>
      </div>`;

const newTopTabBar = `<!-- Price Filter Tab Bar (Under 49, Under 99, Under 499, Under 999, All Deals) -->
      <div class="flex items-center gap-2.5 overflow-x-auto custom-scroll pb-2 mb-4 select-none">
        <button onclick="selectDealTab('all')" id="tab-all" class="deal-tab shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-black bg-[#D42526] text-white shadow-md hover:scale-105 active:scale-95 transition-all">
          <span>⚡ All Deals</span>
        </button>
        <button onclick="selectDealTab('under49')" id="tab-under49" class="deal-tab shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-300 hover:border-[#D42526] hover:text-[#D42526] shadow-sm hover:scale-105 active:scale-95 transition-all">
          <span>🔥 Under 49</span>
        </button>
        <button onclick="selectDealTab('under99')" id="tab-under99" class="deal-tab shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-300 hover:border-[#D42526] hover:text-[#D42526] shadow-sm hover:scale-105 active:scale-95 transition-all">
          <span>🏷️ Under 99</span>
        </button>
        <button onclick="selectDealTab('under499')" id="tab-under499" class="deal-tab shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-300 hover:border-[#D42526] hover:text-[#D42526] shadow-sm hover:scale-105 active:scale-95 transition-all">
          <span>💎 Under 499</span>
        </button>
        <button onclick="selectDealTab('under999')" id="tab-under999" class="deal-tab shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-300 hover:border-[#D42526] hover:text-[#D42526] shadow-sm hover:scale-105 active:scale-95 transition-all">
          <span>👑 Under 999</span>
        </button>
      </div>`;

if (html.includes(oldTopTabBar)) {
  html = html.replace(oldTopTabBar, newTopTabBar);
  console.log('✅ Replaced top tab bar with Under 49 / 99 / 499 / 999 / All Deals buttons');
} else {
  console.log('⚠️ Could not match exact oldTopTabBar, searching with flexible regex');
  const tabRegex = /<!-- Top Tab Bar -->[\s\S]*?<\/div>/;
  if (tabRegex.test(html)) {
    html = html.replace(tabRegex, newTopTabBar);
    console.log('✅ Replaced top tab bar using regex');
  }
}

// 3. UPDATE selectDealTab JAVASCRIPT FUNCTION
const oldSelectDealTabFn = `function selectDealTab(tab) {
      document.querySelectorAll('.deal-tab').forEach(btn => {
        btn.classList.remove('bg-[#EF4444]', 'text-white', 'shadow-md');
        btn.classList.add('bg-white', 'border', 'border-slate-200', 'text-[#141428]');
      });
      const active = document.getElementById('tab-' + tab);
      if (active) {
        active.classList.remove('bg-white', 'border', 'border-slate-200', 'text-[#141428]');
        active.classList.add('bg-[#EF4444]', 'text-white', 'shadow-md');
      }

      // Sync with radio button
      const radio = document.querySelector(\`input[name="deal-type"][value="\${tab}"]\`);
      if (radio) radio.checked = true;

      catalogFilterState.dealType = tab;
      filterCatalog();
    }`;

const newSelectDealTabFn = `function selectDealTab(tab) {
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
        // Sync sidebar radio if exists
        const priceRadio = document.querySelector(\`input[name="sidebar-price"][value="\${tab}"]\`);
        if (priceRadio) priceRadio.checked = true;
      } else {
        catalogFilterState.dealType = tab;
      }

      filterCatalog();
    }`;

if (html.includes(oldSelectDealTabFn)) {
  html = html.replace(oldSelectDealTabFn, newSelectDealTabFn);
  console.log('✅ Updated selectDealTab function');
} else {
  console.log('⚠️ Could not match oldSelectDealTabFn exactly, trying regex');
  const fnRegex = /function selectDealTab\(tab\)\s*\{[\s\S]*?filterCatalog\(\);\s*\}/;
  if (fnRegex.test(html)) {
    html = html.replace(fnRegex, newSelectDealTabFn);
    console.log('✅ Updated selectDealTab function via regex');
  }
}

// 4. UPDATE filterCatalog PRICE LOGIC TO HANDLE under49, under99, under499, under999
const oldPriceFilterLogic = `// 5. Price Filter
        const pNum = parseInt((d.price || '').replace(/[^0-9]/g, '')) || 0;
        if (catalogFilterState.price === 'under499' && pNum >= 500) return false;
        if (catalogFilterState.price === '500-999' && (pNum < 500 || pNum > 999)) return false;
        if (catalogFilterState.price === '1000-2499' && (pNum < 1000 || pNum > 2499)) return false;
        if (catalogFilterState.price === 'above2500' && pNum < 2500) return false;`;

const newPriceFilterLogic = `// 5. Price Filter
        const pNum = parseInt((d.price || '').replace(/[^0-9]/g, '')) || 0;
        if (catalogFilterState.price === 'under49' && pNum > 49) return false;
        if (catalogFilterState.price === 'under99' && pNum > 99) return false;
        if (catalogFilterState.price === 'under499' && pNum > 499) return false;
        if (catalogFilterState.price === 'under999' && pNum > 999) return false;
        if (catalogFilterState.price === '500-999' && (pNum < 500 || pNum > 999)) return false;
        if (catalogFilterState.price === '1000-2499' && (pNum < 1000 || pNum > 2499)) return false;
        if (catalogFilterState.price === 'above2500' && pNum < 2500) return false;`;

if (html.includes(oldPriceFilterLogic)) {
  html = html.replace(oldPriceFilterLogic, newPriceFilterLogic);
  console.log('✅ Updated filterCatalog price filter conditions');
} else {
  console.log('⚠️ Could not match oldPriceFilterLogic exactly, trying regex');
  const priceRegex = /\/\/ 5\. Price Filter[\s\S]*?if \(catalogFilterState\.price === 'above2500' && pNum < 2500\) return false;/;
  if (priceRegex.test(html)) {
    html = html.replace(priceRegex, newPriceFilterLogic);
    console.log('✅ Updated price logic via regex');
  }
}

// 5. Save prototype
fs.writeFileSync(protoPath, html, 'utf8');
console.log('✅ Saved updated prototype! New size:', html.length);
