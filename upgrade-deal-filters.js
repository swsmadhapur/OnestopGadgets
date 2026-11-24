const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Expand DEALS_DATA with dealType, brand, price numeric, discount numeric, and new categories
const extendedDealsData = `
    const DEALS_DATA = [
      { id: 1, title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', category: 'Audio', brand: 'Sony', store: 'Amazon', price: '₹26,990', original: '₹34,990', discount: '23% OFF', dealType: 'product', icon: '🎧', isVip: false },
      { id: 2, title: 'Google Pixel 8 (128GB, Hazel Display Flagship)', category: 'Phones', brand: 'Google', store: 'Flipkart', price: '₹54,999', original: '₹75,999', discount: '28% OFF', dealType: 'product', icon: '📱', isVip: false },
      { id: 3, title: 'Samsung Galaxy Watch 6 Classic (47mm Bluetooth)', category: 'Wearables', brand: 'Samsung', store: 'Samsung', price: '₹24,999', original: '₹38,999', discount: '36% OFF', dealType: 'product', icon: '⌚', isVip: false },
      { id: 4, title: 'Apple MacBook Air M3 (16GB, 512GB Space Gray)', category: 'Laptops', brand: 'Apple', store: 'Amazon', price: '₹1,19,900', original: '₹1,34,900', discount: '11% OFF', dealType: 'product', icon: '💻', isVip: false },
      { id: 5, title: 'Apple iPhone 16 Pro Max 256GB (Instant Bank Voucher)', category: 'Phones', brand: 'Apple', store: 'Apple', price: '₹1,24,999', original: '₹1,44,999', discount: '14% OFF', dealType: 'coupon', icon: '📱', isVip: true },
      { id: 6, title: 'Sony PlayStation 5 Pro Edition (Limited Direct Allocation)', category: 'Gaming', brand: 'Sony', store: 'Sony', price: '₹58,990', original: '₹68,990', discount: '15% OFF', dealType: 'ending', icon: '🎮', isVip: true },
      { id: 7, title: 'iPad Air M2 (256GB, Wi-Fi Starlight)', category: 'Laptops', brand: 'Apple', store: 'Apple', price: '₹59,900', original: '₹69,900', discount: '14% OFF', dealType: 'product', icon: '💻', isVip: false },
      { id: 8, title: 'Bose QuietComfort Ultra Noise-Cancelling Earbuds', category: 'Audio', brand: 'Bose', store: 'Amazon', price: '₹21,900', original: '₹29,900', discount: '27% OFF', dealType: 'product', icon: '🎧', isVip: false },
      { id: 9, title: 'Samsung Galaxy S24 Ultra (512GB, Titanium Gray)', category: 'Phones', brand: 'Samsung', store: 'Samsung', price: '₹1,19,999', original: '₹1,39,999', discount: '14% OFF', dealType: 'coupon', icon: '📱', isVip: false },
      { id: 10, title: 'Apple Watch Series 10 (GPS, 46mm Jet Black)', category: 'Wearables', brand: 'Apple', store: 'Apple', price: '₹44,900', original: '₹49,900', discount: '10% OFF', dealType: 'ending', icon: '⌚', isVip: false },
      { id: 11, title: 'Nintendo Switch OLED Mario Red Edition', category: 'Gaming', brand: 'Nintendo', store: 'Amazon', price: '₹31,490', original: '₹37,990', discount: '17% OFF', dealType: 'product', icon: '🎮', isVip: false },
      { id: 12, title: 'Amazon Echo Show 10 (3rd Gen HD Smart Motion Display)', category: 'SmartHome', brand: 'Amazon', store: 'Amazon', price: '₹19,999', original: '₹24,999', discount: '20% OFF', dealType: 'product', icon: '🏠', isVip: false },
      { id: 13, title: 'Anker Prime 100W GaN 3-Port Fast Wall Charger', category: 'Accessories', brand: 'Anker', store: 'Amazon', price: '₹4,999', original: '₹7,999', discount: '38% OFF', dealType: 'ending', icon: '🔌', isVip: false },
      { id: 14, title: 'SanDisk 1TB Extreme Portable SSD (1050MB/s USB-C)', category: 'Accessories', brand: 'SanDisk', store: 'Flipkart', price: '₹8,499', original: '₹14,999', discount: '43% OFF', dealType: 'coupon', icon: '🔌', isVip: false },
      { id: 15, title: 'Plum 2% Niacinamide & Rice Water Face Wash | 100ml', category: 'Beauty', brand: 'Plum', store: 'Plum', price: '₹79', original: '₹149', discount: '60% OFF', dealType: 'product', icon: '🧴', isVip: false },
      { id: 16, title: 'Boult 1M Heavy-Duty Fast Type-C Braided Cable', category: 'Accessories', brand: 'Boult', store: 'Amazon', price: '₹49', original: '₹299', discount: '84% OFF', dealType: 'ending', icon: '🔌', isVip: false },
      { id: 17, title: 'Beardo Bubblegum Nourishing Vitamin Lip Balm', category: 'Beauty', brand: 'Beardo', store: 'Beardo', price: '₹99', original: '₹300', discount: '67% OFF', dealType: 'coupon', icon: '💄', isVip: false },
      { id: 18, title: 'Beardo Ultraglow Brightening Face Cream SPF-30', category: 'Beauty', brand: 'Beardo', store: 'Beardo', price: '₹99', original: '₹335', discount: '70% OFF', dealType: 'product', icon: '🧴', isVip: false },
      { id: 19, title: 'Campus MISS CR Pink Lightweight Women Running Shoes', category: 'Fashion', brand: 'Campus', store: 'Flipkart', price: '₹934', original: '₹1,999', discount: '56% OFF', dealType: 'product', icon: '👟', isVip: false },
      { id: 20, title: 'Campus MISS CR White Cushioned Sprint Shoes', category: 'Fashion', brand: 'Campus', store: 'Amazon', price: '₹944', original: '₹2,099', discount: '55% OFF', dealType: 'product', icon: '👟', isVip: false },
      { id: 21, title: 'Levis 711 Medium Indigo Skinny Fit Mid Rise Jeans', category: 'Fashion', brand: 'Levis', store: 'Myntra', price: '₹715', original: '₹3,579', discount: '80% OFF', dealType: 'coupon', icon: '👖', isVip: false },
      { id: 22, title: 'Bombay Shaving Company Miami Pocket Perfume 20ml', category: 'Beauty', brand: 'Bombay Shaving', store: 'Amazon', price: '₹99', original: '₹399', discount: '75% OFF', dealType: 'ending', icon: '✨', isVip: false },
      { id: 23, title: 'Villain Hydra Long-Lasting Eau De Parfum 20ml', category: 'Beauty', brand: 'Villain', store: 'Flipkart', price: '₹149', original: '₹499', discount: '70% OFF', dealType: 'product', icon: '⚡', isVip: false },
      { id: 24, title: 'Anker Soundcore Motion+ 30W Hi-Res Bluetooth Speaker', category: 'Audio', brand: 'Anker', store: 'Amazon', price: '₹6,999', original: '₹10,999', discount: '36% OFF', dealType: 'coupon', icon: '🔊', isVip: false },
      { id: 25, title: 'Sony WH-CH520 Wireless On-Ear Bluetooth Headphones 50H', category: 'Audio', brand: 'Sony', store: 'Amazon', price: '₹3,990', original: '₹5,990', discount: '33% OFF', dealType: 'product', icon: '🎧', isVip: false },
      { id: 26, title: 'Samsung 25W Type-C Super Fast Power Adapter', category: 'Accessories', brand: 'Samsung', store: 'Samsung', price: '₹999', original: '₹1,699', discount: '41% OFF', dealType: 'product', icon: '🔌', isVip: false },
      { id: 27, title: 'Apple 20W USB-C Original Fast Power Adapter', category: 'Accessories', brand: 'Apple', store: 'Apple', price: '₹1,699', original: '₹1,900', discount: '11% OFF', dealType: 'product', icon: '🔌', isVip: false },
      { id: 28, title: 'Bose SoundLink Flex Waterproof Bluetooth Outdoor Speaker', category: 'Audio', brand: 'Bose', store: 'Amazon', price: '₹13,900', original: '₹16,900', discount: '18% OFF', dealType: 'coupon', icon: '🔊', isVip: false }
    ];
`;

// Replace DEALS_DATA array
html = html.replace(/const DEALS_DATA = \[[\s\S]*?\];/m, extendedDealsData.trim());

// 2. Insert Image 1 Top Search Bar right after <section id="screen-catalog" class="screen-view hidden">
const catalogSearchPillHtml = `
      <!-- ==================== IMAGE 1 STYLE: PREMIUM SEARCH & LIVE BRAND PILL ==================== -->
      <div class="mb-5 bg-white/95 backdrop-blur-md rounded-full border border-slate-200/80 p-2 sm:p-2.5 shadow-md flex items-center justify-between gap-3 text-slate-800">
        <div class="flex items-center gap-3 pl-3 sm:pl-4 flex-1 min-w-0">
          <svg class="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input 
            type="text" 
            id="deal-live-search" 
            oninput="handleDealSearchInput(this.value)"
            placeholder="Search Plum, Sony, Apple, deals, vouchers..." 
            class="w-full text-xs sm:text-sm font-semibold bg-transparent focus:outline-none text-[#141428] placeholder-slate-400"
          />
        </div>
        
        <div class="hidden md:flex items-center gap-2 text-xs font-semibold shrink-0">
          <span class="font-extrabold text-[#EF4444]" id="deal-search-count">1,547</span>
          <span class="text-slate-500">deals from</span>
          <!-- Brand Logo Avatars -->
          <div class="flex items-center -space-x-2">
            <span class="w-6 h-6 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white"></span>
            <span class="w-6 h-6 rounded-full bg-blue-700 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">S</span>
            <span class="w-6 h-6 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">L</span>
            <span class="w-6 h-6 rounded-full bg-purple-700 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">P</span>
          </div>
        </div>

        <button 
          onclick="filterCatalog()"
          class="shrink-0 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] hover:from-[#B91C1C] hover:to-[#991B1B] text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
        >
          Search
        </button>
      </div>
`;

// Insert after `<section id="screen-catalog" class="screen-view hidden">`
if (!html.includes('id="deal-live-search"')) {
  html = html.replace(
    '<section id="screen-catalog" class="screen-view hidden">',
    '<section id="screen-catalog" class="screen-view hidden">\n' + catalogSearchPillHtml
  );
  console.log('✅ Inserted Image 1 top search pill after header in deals page!');
}

// 3. Update the left sidebar filter to match Image 2 exactly
const oldSidebarRegex = /<!-- LEFT SIDEBAR FILTERS -->[\s\S]*?<!-- RIGHT: Deal Count \+ Sort \+ Grid -->/;

const newSidebarHtml = `<!-- LEFT SIDEBAR FILTERS (IMAGE 2 EXACT SPECIFICATION) -->
        <aside class="w-56 shrink-0 space-y-4">
          <div class="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xl space-y-5 text-slate-700">
            
            <!-- Filters Header with Reset -->
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#EF4444]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.553.894l-4 2A1 1 0 016 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"/>
                </svg>
                <span class="text-xs font-black tracking-wider text-[#141428] uppercase">FILTERS</span>
                <span id="active-filter-badge" class="w-4 h-4 rounded-full bg-[#EF4444] text-white text-[9px] font-bold flex items-center justify-center">0</span>
              </div>
              <button onclick="resetAllFilters()" class="text-[11px] font-bold text-slate-400 hover:text-[#EF4444] transition flex items-center gap-1">
                ↻ Reset all
              </button>
            </div>

            <!-- 1. DEAL TYPE -->
            <div>
              <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">DEAL TYPE</p>
              <div class="space-y-2 text-xs">
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="deal-type" value="all" checked onchange="handleFilterChange('dealType', 'all')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-800 font-bold group-hover:text-[#EF4444] transition">All Deals</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="deal-type" value="product" onchange="handleFilterChange('dealType', 'product')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-600 group-hover:text-[#EF4444] transition">Product Deals</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="deal-type" value="coupon" onchange="handleFilterChange('dealType', 'coupon')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-600 group-hover:text-[#EF4444] transition">Coupons & Offers</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="deal-type" value="ending" onchange="handleFilterChange('dealType', 'ending')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-600 group-hover:text-[#EF4444] transition">Ending Soon</span>
                </label>
              </div>
            </div>

            <!-- 2. CATEGORY -->
            <div>
              <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">CATEGORY</p>
              <div class="space-y-2 text-xs">
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="sidebar-cat" value="all" checked onchange="handleFilterChange('category', 'all')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-800 font-bold group-hover:text-[#EF4444] transition">All categories</span>
                  </span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="sidebar-cat" value="Phones" onchange="handleFilterChange('category', 'Phones')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Smartphones</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-semibold font-mono">142</span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="sidebar-cat" value="Audio" onchange="handleFilterChange('category', 'Audio')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Audio Gear</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-semibold font-mono">98</span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="sidebar-cat" value="Laptops" onchange="handleFilterChange('category', 'Laptops')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Laptops & PCs</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-semibold font-mono">75</span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="sidebar-cat" value="Wearables" onchange="handleFilterChange('category', 'Wearables')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Smartwatches</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-semibold font-mono">64</span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="sidebar-cat" value="Gaming" onchange="handleFilterChange('category', 'Gaming')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Gaming Gear</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-semibold font-mono">51</span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="sidebar-cat" value="SmartHome" onchange="handleFilterChange('category', 'SmartHome')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Smart Home</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-semibold font-mono">39</span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="sidebar-cat" value="Accessories" onchange="handleFilterChange('category', 'Accessories')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Accessories</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-semibold font-mono">110</span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="sidebar-cat" value="Beauty" onchange="handleFilterChange('category', 'Beauty')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Beauty & Care</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-semibold font-mono">48</span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="sidebar-cat" value="Fashion" onchange="handleFilterChange('category', 'Fashion')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Fashion</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-semibold font-mono">55</span>
                </label>
              </div>
            </div>

            <!-- 3. BRAND -->
            <div>
              <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">BRAND</p>
              <div class="relative mb-2.5">
                <input 
                  type="text" 
                  id="brand-search-box"
                  placeholder="Find a brand..." 
                  oninput="handleBrandSearchInput(this.value)"
                  class="w-full text-xs rounded-xl border border-slate-200 pl-3 pr-3 py-1.5 focus:outline-none focus:border-[#EF4444] text-[#141428] placeholder-slate-400 shadow-inner" 
                />
              </div>
              <div class="space-y-2 text-xs" id="brand-radios-list">
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="brand" value="all" checked onchange="handleFilterChange('brand', 'all')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-800 font-bold group-hover:text-[#EF4444] transition">All brands</span>
                  </span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="brand" value="Sony" onchange="handleFilterChange('brand', 'Sony')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Sony</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-mono">37</span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="brand" value="Samsung" onchange="handleFilterChange('brand', 'Samsung')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Samsung</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-mono">36</span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="brand" value="Apple" onchange="handleFilterChange('brand', 'Apple')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Apple</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-mono">36</span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="brand" value="Bose" onchange="handleFilterChange('brand', 'Bose')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Bose</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-mono">25</span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="brand" value="Anker" onchange="handleFilterChange('brand', 'Anker')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Anker</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-mono">25</span>
                </label>
                <label class="flex items-center justify-between cursor-pointer group">
                  <span class="flex items-center gap-2.5">
                    <input type="radio" name="brand" value="Plum" onchange="handleFilterChange('brand', 'Plum')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                    <span class="text-slate-600 group-hover:text-[#EF4444] transition">Plum</span>
                  </span>
                  <span class="text-[10px] text-blue-500 font-mono">18</span>
                </label>
              </div>
            </div>

            <!-- 4. DISCOUNT -->
            <div>
              <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">DISCOUNT</p>
              <div class="space-y-2 text-xs">
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="discount" value="all" checked onchange="handleFilterChange('discount', 'all')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-800 font-bold group-hover:text-[#EF4444] transition">Any discount</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="discount" value="10" onchange="handleFilterChange('discount', 10)" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-600 group-hover:text-[#EF4444] transition">10% off or more</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="discount" value="25" onchange="handleFilterChange('discount', 25)" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-600 group-hover:text-[#EF4444] transition">25% off or more</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="discount" value="50" onchange="handleFilterChange('discount', 50)" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-600 group-hover:text-[#EF4444] transition">50% off or more</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="discount" value="70" onchange="handleFilterChange('discount', 70)" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-600 group-hover:text-[#EF4444] transition">70% off or more</span>
                </label>
              </div>
            </div>

            <!-- 5. PRICE -->
            <div>
              <p class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">PRICE</p>
              <div class="space-y-2 text-xs mb-3">
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="price" value="all" checked onchange="handleFilterChange('price', 'all')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-800 font-bold group-hover:text-[#EF4444] transition">All Prices</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="price" value="under499" onchange="handleFilterChange('price', 'under499')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-600 group-hover:text-[#EF4444] transition">Under ₹499</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="price" value="500-999" onchange="handleFilterChange('price', '500-999')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-600 group-hover:text-[#EF4444] transition">₹500 – ₹999</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="price" value="1000-2499" onchange="handleFilterChange('price', '1000-2499')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-600 group-hover:text-[#EF4444] transition">₹1,000 – ₹2,499</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name="price" value="above2500" onchange="handleFilterChange('price', 'above2500')" class="w-4 h-4 text-[#EF4444] accent-[#EF4444] cursor-pointer" />
                  <span class="text-slate-600 group-hover:text-[#EF4444] transition">₹2,500 and above</span>
                </label>
              </div>

              <!-- Min / Max Custom Inputs + Go Button -->
              <div class="flex gap-1.5 items-center pt-1">
                <input type="number" id="price-min-input" placeholder="Min" class="w-full text-[11px] font-semibold border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#EF4444] text-[#141428]" />
                <input type="number" id="price-max-input" placeholder="Max" class="w-full text-[11px] font-semibold border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#EF4444] text-[#141428]" />
                <button onclick="handleCustomPriceGo()" class="shrink-0 bg-[#EF4444] hover:bg-[#DC2626] text-white text-[11px] font-black px-3 py-1.5 rounded-lg transition active:scale-95 shadow-sm">
                  Go
                </button>
              </div>
            </div>

          </div>
        </aside>

        <!-- RIGHT: Deal Count + Active Chips + Sort + Grid -->
`;

html = html.replace(oldSidebarRegex, newSidebarHtml);

// 4. Update the Active Filter Chips Bar & Sort in the main column
const oldSortBarRegex = /<!-- Count \+ Sort Bar -->[\s\S]*?<div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4" id="catalog-deals-grid">/;

const newSortBarHtml = `<!-- Count + Active Chips + Sort Bar (Image 1 Style) -->
          <div class="space-y-3 mb-4">
            <div class="flex items-center justify-between gap-3 flex-wrap">
              <div class="flex items-center gap-2">
                <span id="deal-count-label" class="text-base sm:text-lg font-black text-white tracking-tight">1,547 deals</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-white/80 font-bold hidden sm:block">Sort</span>
                <select class="text-xs border border-slate-300 rounded-xl px-3 py-1.5 font-bold text-[#141428] bg-white shadow-sm focus:outline-none focus:border-[#EF4444]" onchange="sortDeals(this.value)">
                  <option value="best">Best value</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            <!-- Active Filter Chips (Removable tags like Image 1) -->
            <div id="active-filter-chips" class="flex items-center gap-2 flex-wrap">
              <!-- Dynamically populated -->
            </div>
          </div>

          <!-- Deals Grid — 2 col mobile, 3 col md, 4 col xl -->
          <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4" id="catalog-deals-grid">`;

html = html.replace(oldSortBarRegex, newSortBarHtml);

// 5. Update Javascript filtering engine to dynamically react to all buttons
const newFilterEngineJs = `
    // ===== MASTER STATE FOR CATALOG FILTERS =====
    let catalogFilterState = {
      dealType: 'all',
      category: 'all',
      brand: 'all',
      discount: 'all',
      price: 'all',
      customMin: null,
      customMax: null,
      search: '',
      sort: 'best'
    };

    // Tab Bar click
    function selectDealTab(tab) {
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
    }

    // Generic filter handler
    function handleFilterChange(filterKey, value) {
      catalogFilterState[filterKey] = value;
      
      // If category changed, sync top icon bar and dropdown if exists
      if (filterKey === 'category') {
        renderCatalogPills(value);
        const radio = document.querySelector(\`input[name="sidebar-cat"][value="\${value}"]\`);
        if (radio) radio.checked = true;
      }
      // If dealType changed, sync top tabs
      if (filterKey === 'dealType') {
        document.querySelectorAll('.deal-tab').forEach(btn => {
          btn.classList.remove('bg-[#EF4444]', 'text-white', 'shadow-md');
          btn.classList.add('bg-white', 'border', 'border-slate-200', 'text-[#141428]');
        });
        const active = document.getElementById('tab-' + value);
        if (active) {
          active.classList.remove('bg-white', 'border', 'border-slate-200', 'text-[#141428]');
          active.classList.add('bg-[#EF4444]', 'text-white', 'shadow-md');
        }
      }

      filterCatalog();
    }

    // Quick Pill selection on Deals page (circular subcategory icons)
    function selectCategoryFilter(catId) {
      handleFilterChange('category', catId);
    }

    function sidebarCatFilter(catId) {
      handleFilterChange('category', catId);
    }

    // Top search bar input
    function handleDealSearchInput(val) {
      catalogFilterState.search = val.trim().toLowerCase();
      filterCatalog();
    }

    // Brand quick search box inside sidebar
    function handleBrandSearchInput(query) {
      const q = query.trim().toLowerCase();
      document.querySelectorAll('#brand-radios-list label').forEach(lbl => {
        const text = lbl.textContent.toLowerCase();
        if (lbl.querySelector('input[value="all"]')) return;
        lbl.style.display = text.includes(q) ? 'flex' : 'none';
      });
    }

    // Custom Min/Max price Go button
    function handleCustomPriceGo() {
      const minVal = parseFloat(document.getElementById('price-min-input')?.value);
      const maxVal = parseFloat(document.getElementById('price-max-input')?.value);
      catalogFilterState.customMin = isNaN(minVal) ? null : minVal;
      catalogFilterState.customMax = isNaN(maxVal) ? null : maxVal;
      catalogFilterState.price = 'custom';
      filterCatalog();
    }

    // Reset All Filters
    function resetAllFilters() {
      catalogFilterState = {
        dealType: 'all',
        category: 'all',
        brand: 'all',
        discount: 'all',
        price: 'all',
        customMin: null,
        customMax: null,
        search: '',
        sort: 'best'
      };

      // Uncheck / Reset all inputs
      const dtAll = document.querySelector('input[name="deal-type"][value="all"]');
      if (dtAll) dtAll.checked = true;
      const catAll = document.querySelector('input[name="sidebar-cat"][value="all"]');
      if (catAll) catAll.checked = true;
      const bAll = document.querySelector('input[name="brand"][value="all"]');
      if (bAll) bAll.checked = true;
      const discAll = document.querySelector('input[name="discount"][value="all"]');
      if (discAll) discAll.checked = true;
      const pAll = document.querySelector('input[name="price"][value="all"]');
      if (pAll) pAll.checked = true;

      const minInput = document.getElementById('price-min-input');
      const maxInput = document.getElementById('price-max-input');
      if (minInput) minInput.value = '';
      if (maxInput) maxInput.value = '';
      const searchBox = document.getElementById('deal-live-search');
      if (searchBox) searchBox.value = '';

      selectDealTab('all');
      renderCatalogPills('all');
      filterCatalog();
    }

    function resetFilters() {
      resetAllFilters();
    }

    // Render active chips bar (e.g., "Beauty and Self Care ✕", "50% off or more ✕", "Clear all")
    function renderActiveFilterChips(activeCount) {
      const container = document.getElementById('active-filter-chips');
      const badge = document.getElementById('active-filter-badge');
      if (badge) badge.innerText = activeCount;
      if (!container) return;

      if (activeCount === 0) {
        container.innerHTML = '';
        return;
      }

      let chips = [];

      if (catalogFilterState.category !== 'all') {
        chips.push(\`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#991B1B] text-xs font-bold shadow-xs border border-red-200">
          \${catalogFilterState.category}
          <button onclick="handleFilterChange('category', 'all')" class="hover:text-red-700 font-extrabold ml-1">✕</button>
        </span>\`);
      }
      if (catalogFilterState.brand !== 'all') {
        chips.push(\`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#991B1B] text-xs font-bold shadow-xs border border-red-200">
          Brand: \${catalogFilterState.brand}
          <button onclick="handleFilterChange('brand', 'all')" class="hover:text-red-700 font-extrabold ml-1">✕</button>
        </span>\`);
      }
      if (catalogFilterState.dealType !== 'all') {
        chips.push(\`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#991B1B] text-xs font-bold shadow-xs border border-red-200">
          \${catalogFilterState.dealType.toUpperCase()} Deals
          <button onclick="handleFilterChange('dealType', 'all')" class="hover:text-red-700 font-extrabold ml-1">✕</button>
        </span>\`);
      }
      if (catalogFilterState.discount !== 'all') {
        chips.push(\`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#991B1B] text-xs font-bold shadow-xs border border-red-200">
          \${catalogFilterState.discount}% off or more
          <button onclick="handleFilterChange('discount', 'all')" class="hover:text-red-700 font-extrabold ml-1">✕</button>
        </span>\`);
      }
      if (catalogFilterState.price !== 'all') {
        let pLabel = catalogFilterState.price;
        if (pLabel === 'under499') pLabel = 'Under ₹499';
        else if (pLabel === '500-999') pLabel = '₹500 – ₹999';
        else if (pLabel === '1000-2499') pLabel = '₹1,000 – ₹2,499';
        else if (pLabel === 'above2500') pLabel = '₹2,500+';
        else if (pLabel === 'custom') pLabel = \`₹\${catalogFilterState.customMin||0} - ₹\${catalogFilterState.customMax||'Max'}\`;

        chips.push(\`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#991B1B] text-xs font-bold shadow-xs border border-red-200">
          \${pLabel}
          <button onclick="handleFilterChange('price', 'all')" class="hover:text-red-700 font-extrabold ml-1">✕</button>
        </span>\`);
      }

      chips.push(\`<button onclick="resetAllFilters()" class="text-xs font-bold text-white/90 hover:text-white underline ml-2 transition">
        Clear all
      </button>\`);

      container.innerHTML = chips.join('');
    }

    // MASTER FILTER FUNCTION: Evaluates all conditions and updates UI
    function filterCatalog() {
      const catalogContainer = document.getElementById('catalog-deals-grid');
      if (!catalogContainer) return;

      let countActive = 0;
      if (catalogFilterState.dealType !== 'all') countActive++;
      if (catalogFilterState.category !== 'all') countActive++;
      if (catalogFilterState.brand !== 'all') countActive++;
      if (catalogFilterState.discount !== 'all') countActive++;
      if (catalogFilterState.price !== 'all') countActive++;

      renderActiveFilterChips(countActive);

      const filtered = DEALS_DATA.filter(d => {
        // 1. Deal Type Filter
        if (catalogFilterState.dealType !== 'all') {
          if (d.dealType && d.dealType !== catalogFilterState.dealType) return false;
        }

        // 2. Category Filter
        if (catalogFilterState.category !== 'all') {
          if (d.category.toLowerCase() !== catalogFilterState.category.toLowerCase()) return false;
        }

        // 3. Brand Filter
        if (catalogFilterState.brand !== 'all') {
          if (!d.brand || d.brand.toLowerCase() !== catalogFilterState.brand.toLowerCase()) return false;
        }

        // 4. Discount Filter
        if (catalogFilterState.discount !== 'all') {
          const reqDisc = parseInt(catalogFilterState.discount);
          const pNum = parseInt((d.price || '').replace(/[^0-9]/g, ''));
          const oNum = parseInt((d.original || '').replace(/[^0-9]/g, ''));
          let discVal = 0;
          if (pNum && oNum && oNum > pNum) {
            discVal = Math.round((1 - pNum / oNum) * 100);
          } else {
            discVal = parseInt((d.discount || '').replace(/[^0-9]/g, '')) || 0;
          }
          if (discVal < reqDisc) return false;
        }

        // 5. Price Filter
        const pNum = parseInt((d.price || '').replace(/[^0-9]/g, '')) || 0;
        if (catalogFilterState.price === 'under499' && pNum >= 500) return false;
        if (catalogFilterState.price === '500-999' && (pNum < 500 || pNum > 999)) return false;
        if (catalogFilterState.price === '1000-2499' && (pNum < 1000 || pNum > 2499)) return false;
        if (catalogFilterState.price === 'above2500' && pNum < 2500) return false;
        if (catalogFilterState.price === 'custom') {
          if (catalogFilterState.customMin !== null && pNum < catalogFilterState.customMin) return false;
          if (catalogFilterState.customMax !== null && pNum > catalogFilterState.customMax) return false;
        }

        // 6. Search Filter
        if (catalogFilterState.search) {
          const s = catalogFilterState.search;
          const matchTitle = d.title.toLowerCase().includes(s);
          const matchBrand = (d.brand || '').toLowerCase().includes(s);
          const matchCat = d.category.toLowerCase().includes(s);
          const matchStore = d.store.toLowerCase().includes(s);
          if (!matchTitle && !matchBrand && !matchCat && !matchStore) return false;
        }

        return true;
      });

      // Update deal count labels
      const countLabel = document.getElementById('deal-count-label');
      if (countLabel) countLabel.innerText = \`\${filtered.length} deals\`;
      const searchCount = document.getElementById('deal-search-count');
      if (searchCount) searchCount.innerText = filtered.length;

      // Handle empty state
      if (filtered.length === 0) {
        catalogContainer.innerHTML = \`
          <div class="col-span-full py-16 text-center bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 space-y-4">
            <div class="text-5xl">🔍</div>
            <div class="font-extrabold text-lg text-white">No Deals Found for this Filter</div>
            <p class="text-xs text-white/80 max-w-md mx-auto">
              We couldn't find active verified offers matching this exact combination. Try clearing your filters or selecting a different category.
            </p>
            <button onclick="resetAllFilters()" class="px-6 py-2.5 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-black shadow-lg transition">
              Reset All Filters
            </button>
          </div>
        \`;
        return;
      }

      catalogContainer.innerHTML = filtered.map(makeDealCard).join('');
    }
`;

// Replace old filterCatalog function and associated functions in html
const oldFilterFuncRegex = /\/\/ Filter Deals in Catalog[\s\S]*?catalogContainer\.innerHTML = filtered\.map\(makeDealCard\)\.join\(''\);\s*\}/;

html = html.replace(oldFilterFuncRegex, newFilterEngineJs);

// Save updated prototype
fs.writeFileSync(filePath, html, 'utf8');
console.log('✅ Integrated full responsive multi-filter engine and image 1 & 2 styles!');
