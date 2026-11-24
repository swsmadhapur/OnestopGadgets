const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(src, 'utf8');

// Find start and end markers
const START_MARKER = '<!-- ==================== SCREEN 2: ALL DEALS CATALOG ==================== -->';
const END_MARKER = '<!-- ==================== SCREEN 3: ABOUT US ==================== -->';

const startIdx = html.indexOf(START_MARKER);
const endIdx = html.indexOf(END_MARKER);

if (startIdx === -1 || endIdx === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const before = html.substring(0, startIdx);
const after = html.substring(endIdx);

const newCatalogSection = `<!-- ==================== SCREEN 2: ALL DEALS CATALOG ==================== -->
    <section id="screen-catalog" class="screen-view hidden">

      <!-- Top Tab Bar -->
      <div class="flex items-center gap-1 overflow-x-auto custom-scroll pb-1 mb-4">
        <button onclick="selectDealTab('all')" id="tab-all" class="deal-tab shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#FF3C50] text-white shadow transition">
          &#9889; All Deals
        </button>
        <button onclick="selectDealTab('product')" id="tab-product" class="deal-tab shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white border border-[#C8A0A0] text-[#141428] hover:bg-[#FFF0F0] transition">
          &#127991;&#65039; Product Deals
        </button>
        <button onclick="selectDealTab('coupon')" id="tab-coupon" class="deal-tab shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white border border-[#C8A0A0] text-[#141428] hover:bg-[#FFF0F0] transition">
          &#127903;&#65039; Coupons &amp; Offers
        </button>
        <button onclick="selectDealTab('ending')" id="tab-ending" class="deal-tab shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white border border-[#C8A0A0] text-[#141428] hover:bg-[#FFF0F0] transition">
          &#9203; Ending Soon
        </button>
      </div>

      <!-- Category Icon Scroll Row -->
      <div class="flex items-start gap-4 overflow-x-auto custom-scroll pb-3 mb-4" id="catalog-category-pills">
        <!-- Rendered by renderCatalogPills() -->
      </div>

      <!-- Main Layout: Sidebar + Grid -->
      <div class="flex gap-5">

        <!-- LEFT SIDEBAR FILTERS -->
        <aside class="hidden lg:block w-52 shrink-0 space-y-4">

          <!-- Filters Header -->
          <div class="bg-white rounded-2xl border border-[#C8A0A0] p-4 shadow-sm space-y-4">
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-[#FF3C50]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.553.894l-4 2A1 1 0 016 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"/></svg>
              <span class="text-xs font-extrabold text-[#141428] uppercase tracking-wide">Filters</span>
            </div>

            <!-- Deal Type -->
            <div>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Deal type</p>
              <div class="space-y-1.5 text-xs">
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="deal-type" value="all" checked onchange="filterCatalog()" class="accent-[#FF3C50]" /><span class="text-[#141428] font-semibold">All Deals</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="deal-type" value="product" onchange="filterCatalog()" class="accent-[#FF3C50]" /><span class="text-slate-600">Product Deals</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="deal-type" value="coupon" onchange="filterCatalog()" class="accent-[#FF3C50]" /><span class="text-slate-600">Coupons &amp; Offers</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="deal-type" value="ending" onchange="filterCatalog()" class="accent-[#FF3C50]" /><span class="text-slate-600">Ending Soon</span></label>
              </div>
            </div>

            <!-- Category -->
            <div>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Category</p>
              <div class="space-y-1.5 text-xs">
                <label class="flex items-center justify-between cursor-pointer"><span class="flex items-center gap-2"><input type="radio" name="sidebar-cat" value="all" checked onchange="sidebarCatFilter('all')" class="accent-[#FF3C50]" /><span class="text-[#141428] font-semibold">All categories</span></span></label>
                <label class="flex items-center justify-between cursor-pointer"><span class="flex items-center gap-2"><input type="radio" name="sidebar-cat" value="Phones" onchange="sidebarCatFilter('Phones')" class="accent-[#FF3C50]" /><span class="text-slate-600">Smartphones</span></span><span class="text-[10px] text-slate-400">142</span></label>
                <label class="flex items-center justify-between cursor-pointer"><span class="flex items-center gap-2"><input type="radio" name="sidebar-cat" value="Audio" onchange="sidebarCatFilter('Audio')" class="accent-[#FF3C50]" /><span class="text-slate-600">Audio Gear</span></span><span class="text-[10px] text-slate-400">98</span></label>
                <label class="flex items-center justify-between cursor-pointer"><span class="flex items-center gap-2"><input type="radio" name="sidebar-cat" value="Laptops" onchange="sidebarCatFilter('Laptops')" class="accent-[#FF3C50]" /><span class="text-slate-600">Laptops &amp; PCs</span></span><span class="text-[10px] text-slate-400">75</span></label>
                <label class="flex items-center justify-between cursor-pointer"><span class="flex items-center gap-2"><input type="radio" name="sidebar-cat" value="Wearables" onchange="sidebarCatFilter('Wearables')" class="accent-[#FF3C50]" /><span class="text-slate-600">Smartwatches</span></span><span class="text-[10px] text-slate-400">64</span></label>
                <label class="flex items-center justify-between cursor-pointer"><span class="flex items-center gap-2"><input type="radio" name="sidebar-cat" value="Gaming" onchange="sidebarCatFilter('Gaming')" class="accent-[#FF3C50]" /><span class="text-slate-600">Gaming Gear</span></span><span class="text-[10px] text-slate-400">51</span></label>
                <label class="flex items-center justify-between cursor-pointer"><span class="flex items-center gap-2"><input type="radio" name="sidebar-cat" value="SmartHome" onchange="sidebarCatFilter('SmartHome')" class="accent-[#FF3C50]" /><span class="text-slate-600">Smart Home</span></span><span class="text-[10px] text-slate-400">39</span></label>
                <label class="flex items-center justify-between cursor-pointer"><span class="flex items-center gap-2"><input type="radio" name="sidebar-cat" value="Accessories" onchange="sidebarCatFilter('Accessories')" class="accent-[#FF3C50]" /><span class="text-slate-600">Accessories</span></span><span class="text-[10px] text-slate-400">110</span></label>
              </div>
            </div>

            <!-- Brand -->
            <div>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Brand</p>
              <input type="text" placeholder="Find a brand..." class="w-full text-xs border border-[#C8A0A0] rounded-lg px-2.5 py-1.5 mb-2 focus:outline-none focus:border-[#641428]" />
              <div class="space-y-1.5 text-xs">
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="brand" value="all" checked class="accent-[#FF3C50]" /><span class="text-[#141428] font-semibold">All brands</span></label>
                <label class="flex items-center justify-between cursor-pointer"><span class="flex items-center gap-2"><input type="radio" name="brand" class="accent-[#FF3C50]" /><span class="text-slate-600">Sony</span></span><span class="text-[10px] text-slate-400">37</span></label>
                <label class="flex items-center justify-between cursor-pointer"><span class="flex items-center gap-2"><input type="radio" name="brand" class="accent-[#FF3C50]" /><span class="text-slate-600">Samsung</span></span><span class="text-[10px] text-slate-400">36</span></label>
                <label class="flex items-center justify-between cursor-pointer"><span class="flex items-center gap-2"><input type="radio" name="brand" class="accent-[#FF3C50]" /><span class="text-slate-600">Apple</span></span><span class="text-[10px] text-slate-400">36</span></label>
                <label class="flex items-center justify-between cursor-pointer"><span class="flex items-center gap-2"><input type="radio" name="brand" class="accent-[#FF3C50]" /><span class="text-slate-600">Bose</span></span><span class="text-[10px] text-slate-400">25</span></label>
                <label class="flex items-center justify-between cursor-pointer"><span class="flex items-center gap-2"><input type="radio" name="brand" class="accent-[#FF3C50]" /><span class="text-slate-600">Anker</span></span><span class="text-[10px] text-slate-400">25</span></label>
              </div>
            </div>

            <!-- Discount -->
            <div>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Discount</p>
              <div class="space-y-1.5 text-xs">
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="discount" checked class="accent-[#FF3C50]" /><span class="text-[#141428] font-semibold">Any discount</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="discount" class="accent-[#FF3C50]" /><span class="text-slate-600">10% off or more</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="discount" class="accent-[#FF3C50]" /><span class="text-slate-600">25% off or more</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="discount" class="accent-[#FF3C50]" /><span class="text-slate-600">50% off or more</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="discount" class="accent-[#FF3C50]" /><span class="text-slate-600">70% off or more</span></label>
              </div>
            </div>

            <!-- Price -->
            <div>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Price</p>
              <div class="space-y-1.5 text-xs mb-3">
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="price" checked class="accent-[#FF3C50]" /><span class="text-slate-600">Under &#8377;499</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="price" class="accent-[#FF3C50]" /><span class="text-slate-600">&#8377;500 &#8211; &#8377;999</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="price" class="accent-[#FF3C50]" /><span class="text-slate-600">&#8377;1,000 &#8211; &#8377;2,499</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="price" class="accent-[#FF3C50]" /><span class="text-slate-600">&#8377;2,500 and above</span></label>
              </div>
              <div class="flex gap-1.5 items-center">
                <input type="number" placeholder="Min" class="w-full text-[10px] border border-[#C8A0A0] rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#641428]" />
                <input type="number" placeholder="Max" class="w-full text-[10px] border border-[#C8A0A0] rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#641428]" />
                <button class="shrink-0 bg-[#FF3C50] text-white text-[10px] font-bold px-2 py-1.5 rounded-lg hover:bg-[#A0283C] transition">Go</button>
              </div>
            </div>
          </div>
        </aside>

        <!-- RIGHT: Deal Count + Sort + Grid -->
        <div class="flex-1 min-w-0">

          <!-- Count + Sort Bar -->
          <div class="flex items-center justify-between mb-4">
            <span id="deal-count-label" class="text-sm font-extrabold text-[#141428]">1,547 deals</span>
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-500 font-medium hidden sm:block">Sort</span>
              <select class="text-xs border border-[#C8A0A0] rounded-xl px-3 py-1.5 font-bold text-[#141428] bg-white focus:outline-none focus:border-[#641428]" onchange="sortDeals(this.value)">
                <option value="best">Best value</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          <!-- Deals Grid — 2 col mobile, 3 col md, 4 col xl -->
          <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4" id="catalog-deals-grid">
            <!-- Rendered by JavaScript -->
          </div>
        </div>
      </div>
    </section>

    `;

html = before + newCatalogSection + after;
fs.writeFileSync(src, html, 'utf8');
console.log('Catalog section replaced successfully. Lines now:', html.split('\n').length);
