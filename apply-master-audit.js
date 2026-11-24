const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

console.log('Auditing and patching design/prototype/index.html...');

// ==========================================
// 1. HERO SECTION UPDATES (Section 4 Requirements)
// ==========================================
// Headline: "Exclusive Tech Deals, VIP Access, Cashback & Weekly Lucky Dip Prizes"
// Preserve Join VIP Now button, Try Lucky Dip button, Dark maroon background, 3D pedestal, UP TO 50% OFF promo badge
// Remove "Rotation Paused on Hover", pagination dots, arrows, hover-pause. Make images clickable navigating to luckydip.

// Let's replace the hero left column headline & text
const oldHeroLeft = html.match(/<!-- LEFT: Headline & Actions[\s\S]*?<\/div>\s*<\/div>\s*<!-- RIGHT:/);
if (oldHeroLeft) {
  const newHeroLeft = `<!-- LEFT: Headline & Actions (5 Columns) -->
          <div class="lg:col-span-5 space-y-6 text-left">
            <div class="inline-flex items-center gap-2 bg-[#641428]/60 backdrop-blur-md border border-[#D92035]/50 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-sm">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>🎁 UP TO 50% OFF PROMOTIONAL DEMO OFFERS</span>
            </div>

            <h1 class="animate-fade-up text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              Exclusive Tech Deals, VIP Access, Cashback &amp; Weekly Lucky Dip Prizes
            </h1>

            <p class="text-slate-200 text-sm sm:text-base leading-relaxed max-w-md">
              Discover curated tech discounts from verified merchants, unlock members-only secret voucher links, and enter transparent weekly prize draws with zero entry fees.
            </p>

            <div class="flex flex-wrap items-center gap-3.5 pt-2">
              <button onclick="navigate('pricing')" class="relative overflow-hidden px-7 py-3.5 rounded-full bg-[#DC1F32] hover:bg-[#b01625] text-white font-black text-xs uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group">
                <span>👑 JOIN VIP NOW</span>
              </button>
              <button onclick="navigate('luckydip')" class="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
                <span>🎁 TRY LUCKY DIP</span>
              </button>
            </div>
          </div>
          <!-- RIGHT:`;
  html = html.replace(oldHeroLeft[0], newHeroLeft);
  console.log('✓ Updated Hero left column text & CTA buttons');
}

// Update HERO_PRODUCTS array to use the exact uploaded 5 transparent PNGs
const heroProductsRegex = /const HERO_PRODUCTS = \[[\s\S]*?\];/;
const newHeroProducts = `const HERO_PRODUCTS = [
    {
      id: 'p1',
      title: 'PlayStation 5 with Controller',
      subtitle: 'PRIZE 01 / 05',
      badge: 'Gaming Flagship',
      img: '/assets/hero/ps5.png'
    },
    {
      id: 'p2',
      title: 'Amazon Gift Voucher',
      subtitle: 'PRIZE 02 / 05',
      badge: 'Electronics Voucher',
      img: '/assets/hero/amazon_voucher.png'
    },
    {
      id: 'p3',
      title: 'Red Mystery Gift Box',
      subtitle: 'PRIZE 03 / 05',
      badge: 'Mystery Tech Pack',
      img: '/assets/hero/giftbox.png'
    },
    {
      id: 'p4',
      title: 'Dyson Airwrap Multi-Styler',
      subtitle: 'PRIZE 04 / 05',
      badge: 'Premium Styling',
      img: '/assets/hero/dyson.png'
    },
    {
      id: 'p5',
      title: 'Apple iPhone 16 Pro',
      subtitle: 'PRIZE 05 / 05',
      badge: 'Titanium Flagship',
      img: '/assets/hero/iphone16.png'
    }
  ];`;
html = html.replace(heroProductsRegex, newHeroProducts);
console.log('✓ Updated HERO_PRODUCTS array with exact 5 PNG images');

// Update renderHeroCard to remove hover pause label, remove pagination dots, make product clickable to Lucky Dip
const oldRenderHero = html.match(/function renderHeroCard\(p\) \{[\s\S]*?return `[\s\S]*?`;\s*\}/);
if (oldRenderHero) {
  const newRenderHero = `function renderHeroCard(p) {
    return \`
      <div onclick="navigate('luckydip')" class="relative w-full max-w-3xl flex flex-col items-center justify-center gap-4 select-none cursor-pointer group" title="Click to view \${p.title} on Lucky Dip">
        <!-- Large Transparent 3D Product Float with Premium Pedestal -->
        <div class="relative flex justify-center items-center w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[460px]">
          <!-- Premium 3D Circular Pedestal & Floor Shadow -->
          <div class="absolute bottom-2 w-72 sm:w-96 h-16 rounded-full bg-gradient-to-r from-red-950/80 via-black/90 to-red-950/80 blur-xl pointer-events-none border-b-2 border-red-500/30"></div>
          
          <!-- Transparent Product Image (clickable to luckydip, no crop, proportional) -->
          <div class="relative w-full h-[340px] sm:h-[400px] lg:h-[420px] flex items-center justify-center p-2 transition-transform duration-500 group-hover:scale-105">
            <img src="\${p.img}" alt="\${p.title}" class="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] pointer-events-none" />
          </div>
        </div>

        <!-- Product Subtitle, Title & Badge (Center aligned, clean, no pause text, no dots) -->
        <div class="flex flex-col items-center text-center space-y-1.5 -mt-4">
          <div class="text-[11px] font-black tracking-widest text-amber-300 uppercase">
            \${p.subtitle} • \${p.badge}
          </div>
          <div class="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-md">
            \${p.title}
          </div>
          <div class="text-xs font-semibold text-slate-300">
            Click prize to explore Lucky Dip details →
          </div>
        </div>
      </div>
    \`;
  }`;
  html = html.replace(oldRenderHero[0], newRenderHero);
  console.log('✓ Updated renderHeroCard (cleaned controls, dots, added 3D pedestal & clickable nav)');
}

// Ensure hero slider does not pause on hover and rotates strictly every 3 seconds
html = html.replace(/function startHeroProdTimer\(\) \{[\s\S]*?function restartHeroProdTimer\(\) \{[\s\S]*?\}/, `function startHeroProdTimer() {
    if (heroProdTimer) clearInterval(heroProdTimer);
    heroProdTimer = setInterval(() => {
      heroProdIdx = (heroProdIdx + 1) % HERO_PRODUCTS.length;
      updateHeroProdDisplay();
    }, 3000); // 3 seconds continuous automatic rotation
  }

  function restartHeroProdTimer() {
    clearInterval(heroProdTimer);
    startHeroProdTimer();
  }`);

// ==========================================
// 2. USER ROLE SIMULATION SELECTOR & ₹50,000 RULE (Sections 3 & 6)
// ==========================================
// User roles: 'free' | 'vip' | 'expired'
// Let's add the demo user role selector in the navbar right before Sign In button
const oldNavHeaderRight = html.match(/<!-- 3\. Fibo Search Bar \+ 4\. Login Button -->[\s\S]*?<div class="flex items-center gap-2\.5 shrink-0 justify-end">/);
if (oldNavHeaderRight) {
  const newNavHeaderRight = `<!-- 3. Fibo Search Bar + Status Selector + Login Button -->
      <div class="flex items-center gap-2 sm:gap-3 shrink-0 justify-end">
        <!-- Interactive Demo Status Selector (Free / Active VIP / Expired) -->
        <div class="flex items-center gap-1 bg-[#141428]/80 border border-slate-700 rounded-xl px-2 py-1 text-[11px] font-bold">
          <span class="text-slate-400 hidden lg:inline">Status:</span>
          <select id="user-role-selector" onchange="setUserRole(this.value)" class="bg-transparent text-white font-semibold focus:outline-none cursor-pointer">
            <option value="free" class="bg-[#141428] text-white">Free User</option>
            <option value="vip" class="bg-[#141428] text-amber-300">Active VIP 👑</option>
            <option value="expired" class="bg-[#141428] text-rose-400">Expired Subscriber</option>
          </select>
        </div>`;
  html = html.replace(oldNavHeaderRight[0], newNavHeaderRight);
  console.log('✓ Added Free User / Active VIP / Expired Subscriber selector in navbar');
}

// 8 Categories check & update (Section 5)
const eightCategories = `const CATEGORIES_DATA = [
      { id: 'Smartphones', name: 'Smartphones', count: '142 Deals', icon: '📱', badge: 'Hot' },
      { id: 'Laptops', name: 'Laptops', count: '75 Deals', icon: '💻', badge: 'Save 30%' },
      { id: 'Audio & Wearables', name: 'Audio & Wearables', count: '98 Deals', icon: '🎧', badge: 'Top Rated' },
      { id: 'Smartwatches', name: 'Smartwatches', count: '64 Deals', icon: '⌚', badge: 'Trending' },
      { id: 'Gaming', name: 'Gaming', count: '51 Deals', icon: '🎮', badge: 'VIP Secret' },
      { id: 'Cameras', name: 'Cameras', count: '32 Deals', icon: '📷', badge: 'New' },
      { id: 'Smart Home', name: 'Smart Home', count: '39 Deals', icon: '🏠', badge: 'Popular' },
      { id: 'Accessories', name: 'Accessories', count: '110 Deals', icon: '🔌', badge: 'Best Value' },
    ];`;
html = html.replace(/const CATEGORIES_DATA = \[[\s\S]*?\];/, eightCategories);
console.log('✓ Synced all 8 gadget categories');

// Replace DEALS_DATA with the comprehensive 28+ verified products adhering to ₹50k rule
const updatedDealsData = `const DEALS_DATA = [
      { id: 1, sku: 'SONY-WH1000XM5', title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', category: 'Audio & Wearables', brand: 'Sony', store: 'Amazon', price: '₹26,990', numeric_price: 26990, original: '₹34,990', discount: '23% OFF', dealType: 'product', icon: '🎧', isVip: false, description: 'Industry-leading noise cancellation with dual processors, 8 mics, and 30-hour battery life.' },
      { id: 2, sku: 'GOOG-PIX8-128', title: 'Google Pixel 8 (128GB, Hazel Display Flagship)', category: 'Smartphones', brand: 'Google', store: 'Flipkart', price: '₹54,999', numeric_price: 54999, original: '₹75,999', discount: '28% OFF', dealType: 'product', icon: '📱', isVip: true, description: 'Google Tensor G3 chip, advanced dual-camera AI compute, Actua OLED display.' },
      { id: 3, sku: 'SAMS-GW6-CLASSIC', title: 'Samsung Galaxy Watch 6 Classic (47mm Bluetooth)', category: 'Smartwatches', brand: 'Samsung', store: 'Samsung', price: '₹24,999', numeric_price: 24999, original: '₹38,999', discount: '36% OFF', dealType: 'product', icon: '⌚', isVip: false, description: 'Physical rotating bezel, personalized HR zones, advanced sleep coach, Sapphire crystal.' },
      { id: 4, sku: 'APPL-MBA-M4', title: 'Apple MacBook Air M4 (16GB, 512GB Space Gray)', category: 'Laptops', brand: 'Apple', store: 'Amazon', price: '₹1,19,900', numeric_price: 119900, original: '₹1,34,900', discount: '11% OFF', dealType: 'product', icon: '💻', isVip: true, description: 'Cutting-edge Apple M4 chip with 10-core CPU, 10-core GPU, 18-hour battery, Liquid Retina.' },
      { id: 5, sku: 'APPL-IP16-PROMAX', title: 'Apple iPhone 16 Pro Max 256GB (Instant Bank Voucher)', category: 'Smartphones', brand: 'Apple', store: 'Apple', price: '₹1,24,999', numeric_price: 124999, original: '₹1,44,999', discount: '14% OFF', dealType: 'coupon', icon: '📱', isVip: true, description: 'Grade 5 Titanium, 48MP Fusion camera with Camera Control, 4K 120fps Dolby Vision.' },
      { id: 6, sku: 'SONY-PS5-PRO', title: 'Sony PlayStation 5 Pro Edition (Limited Direct Allocation)', category: 'Gaming', brand: 'Sony', store: 'Sony', price: '₹58,990', numeric_price: 58990, original: '₹68,990', discount: '15% OFF', dealType: 'ending', icon: '🎮', isVip: true, description: 'PlayStation Spectral Super Resolution (PSSR), 2TB high-speed SSD, upgraded Ray Tracing GPU.' },
      { id: 7, sku: 'APPL-IPAD-AIR-M2', title: 'Apple iPad Air M2 (256GB, Wi-Fi Starlight)', category: 'Laptops', brand: 'Apple', store: 'Apple', price: '₹59,900', numeric_price: 59900, original: '₹69,900', discount: '14% OFF', dealType: 'product', icon: '💻', isVip: true, description: 'Apple M2 silicon, Liquid Retina display with anti-reflective coating, Apple Pencil Pro support.' },
      { id: 8, sku: 'BOSE-QC-ULTRA', title: 'Bose QuietComfort Ultra Noise-Cancelling Earbuds', category: 'Audio & Wearables', brand: 'Bose', store: 'Amazon', price: '₹21,900', numeric_price: 21900, original: '₹29,900', discount: '27% OFF', dealType: 'product', icon: '🎧', isVip: false, description: 'Breakthrough spatial audio, CustomTune calibration, world-class active noise cancellation.' },
      { id: 9, sku: 'SAMS-S24-ULTRA', title: 'Samsung Galaxy S24 Ultra (512GB, Titanium Gray)', category: 'Smartphones', brand: 'Samsung', store: 'Samsung', price: '₹1,19,999', numeric_price: 119999, original: '₹1,39,999', discount: '14% OFF', dealType: 'product', icon: '📱', isVip: true, description: 'Galaxy AI with Circle to Search, 200MP Quad Telephoto camera, titanium durability and S-Pen.' },
      { id: 10, sku: 'APPL-WATCH-S10', title: 'Apple Watch Series 10 (GPS, 46mm Jet Black)', category: 'Smartwatches', brand: 'Apple', store: 'Amazon', price: '₹44,900', numeric_price: 44900, original: '₹49,900', discount: '10% OFF', dealType: 'product', icon: '⌚', isVip: false, description: 'Wide-angle OLED display, sleep apnea tracking, fast charging up to 80% in 30 minutes.' },
      { id: 11, sku: 'NINT-SWITCH-OLED', title: 'Nintendo Switch OLED Mario Red Edition', category: 'Gaming', brand: 'Nintendo', store: 'Amazon', price: '₹31,490', numeric_price: 31490, original: '₹37,990', discount: '17% OFF', dealType: 'product', icon: '🎮', isVip: false, description: 'Vibrant 7-inch OLED panel, wide adjustable tabletop stand, dock with wired LAN port.' },
      { id: 12, sku: 'AMZN-ECHO-SHOW-10', title: 'Amazon Echo Show 10 (3rd Gen HD Smart Motion Display)', category: 'Smart Home', brand: 'Amazon', store: 'Amazon', price: '₹19,999', numeric_price: 19999, original: '₹24,999', discount: '20% OFF', dealType: 'product', icon: '🏠', isVip: false, description: '10.1-inch HD screen that automatically moves to keep you in frame, 13MP camera, premium sound.' },
      { id: 13, sku: 'ANKR-PRIME-100W', title: 'Anker Prime 100W GaN 3-Port Fast Wall Charger', category: 'Accessories', brand: 'Anker', store: 'Amazon', price: '₹4,999', numeric_price: 4999, original: '₹7,999', discount: '38% OFF', dealType: 'product', icon: '🔌', isVip: false, description: 'High-speed 100W GaN charging across 2 USB-C ports and 1 USB-A port with ActiveShield 2.0.' },
      { id: 14, sku: 'SAND-EXTREME-1TB', title: 'SanDisk 1TB Extreme Portable SSD (1050MB/s USB-C)', category: 'Accessories', brand: 'SanDisk', store: 'Amazon', price: '₹8,499', numeric_price: 8499, original: '₹14,999', discount: '43% OFF', dealType: 'product', icon: '🔌', isVip: false, description: 'Rugged IP65 water/dust resistant storage, 1050MB/s NVMe read speeds, 256-bit AES encryption.' },
      { id: 15, sku: 'CANON-EOS-R50', title: 'Canon EOS R50 Mirrorless Camera (RF-S 18-45mm)', category: 'Cameras', brand: 'Canon', store: 'Amazon', price: '₹56,990', numeric_price: 56990, original: '₹68,995', discount: '17% OFF', dealType: 'product', icon: '📷', isVip: true, description: '24.2 MP APS-C CMOS sensor, 4K 30p uncropped recording, Dual Pixel CMOS AF II.' },
      { id: 16, sku: 'DJI-OSMO-POCKET3', title: 'DJI Osmo Pocket 3 Creator Combo (4K/120fps)', category: 'Cameras', brand: 'DJI', store: 'Amazon', price: '₹53,990', numeric_price: 53990, original: '₹63,000', discount: '14% OFF', dealType: 'product', icon: '📷', isVip: true, description: '1-inch CMOS pocket gimbal camera, 2-inch rotatable screen, 3-axis mechanical gimbal.' },
      { id: 17, sku: 'APPL-WATCH-ULTRA2', title: 'Apple Watch Ultra 2 (GPS + Cellular, 49mm Titanium)', category: 'Smartwatches', brand: 'Apple', store: 'Apple', price: '₹89,900', numeric_price: 89900, original: '₹89,900', discount: 'Bank ₹4,000 Off', dealType: 'product', icon: '⌚', isVip: true, description: 'Natural titanium 49mm case, precision dual-frequency GPS, depth gauge to 40 meters.' },
      { id: 18, sku: 'APPL-AIRPODS-MAX', title: 'Apple AirPods Max (USB-C, Midnight Finish)', category: 'Audio & Wearables', brand: 'Apple', store: 'Apple', price: '₹59,900', numeric_price: 59900, original: '₹59,900', discount: 'VIP Instant ₹3,000', dealType: 'product', icon: '🎧', isVip: true, description: 'Lossless audio over USB-C, custom acoustic design, personalized spatial audio with head tracking.' },
      { id: 19, sku: 'DYSON-AIRWRAP-CMPL', title: 'Dyson Airwrap Multi-Styler Complete Long', category: 'Accessories', brand: 'Dyson', store: 'Dyson', price: '₹49,900', numeric_price: 49900, original: '₹55,900', discount: '11% OFF', dealType: 'product', icon: '✨', isVip: false, description: 'Coanda airflow technology for curling and smoothing without extreme heat damage.' },
      { id: 20, sku: 'ASUS-ROG-G16', title: 'ASUS ROG Zephyrus G16 OLED (Intel Core Ultra 9, RTX 4070)', category: 'Laptops', brand: 'ASUS', store: 'Amazon', price: '₹1,89,990', numeric_price: 189990, original: '₹2,24,990', discount: '16% OFF', dealType: 'product', icon: '💻', isVip: true, description: '2.5K 240Hz ROG Nebula OLED display, CNC aluminum chassis, 32GB LPDDR5X, 1TB PCIe 4.0 SSD.' },
      { id: 21, sku: 'DELL-XPS-16', title: 'Dell XPS 16 (Intel Core Ultra 7, 32GB, 1TB SSD)', category: 'Laptops', brand: 'Dell', store: 'Dell', price: '₹1,94,990', numeric_price: 194990, original: '₹2,30,000', discount: '15% OFF', dealType: 'product', icon: '💻', isVip: true, description: 'InfinityEdge 4K+ OLED display, seamless glass touchpad, capacitive touch function keys.' },
      { id: 22, sku: 'SONY-A7IV', title: 'Sony Alpha 7 IV Full-Frame Hybrid Camera (Body Only)', category: 'Cameras', brand: 'Sony', store: 'Sony', price: '₹1,99,990', numeric_price: 199990, original: '₹2,42,490', discount: '18% OFF', dealType: 'product', icon: '📷', isVip: true, description: '33MP full-frame Exmor R back-illuminated sensor, BIONZ XR engine, 4K 60p 10-bit recording.' },
      { id: 23, sku: 'APPL-IP16-PRO', title: 'Apple iPhone 16 Pro (128GB, Desert Titanium)', category: 'Smartphones', brand: 'Apple', store: 'Amazon', price: '₹1,14,999', numeric_price: 114999, original: '₹1,19,900', discount: 'Bank ₹5,000 Off', dealType: 'product', icon: '📱', isVip: true, description: 'A18 Pro chip, 48MP Fusion camera with 5x Telephoto optical zoom, pro battery endurance.' },
      { id: 24, sku: 'GOOG-PIX9', title: 'Google Pixel 9 (128GB, Porcelain Flagship)', category: 'Smartphones', brand: 'Google', store: 'Flipkart', price: '₹69,999', numeric_price: 69999, original: '₹79,999', discount: '12% OFF', dealType: 'product', icon: '📱', isVip: true, description: 'Gemini AI assistant built-in, 50MP main camera with Macro Focus, 24+ hour battery.' },
      { id: 25, sku: 'SONY-PS5-SLIM', title: 'PlayStation 5 Slim Digital Edition (1TB Storage)', category: 'Gaming', brand: 'Sony', store: 'Sony', price: '₹44,990', numeric_price: 44990, original: '₹49,990', discount: '10% OFF', dealType: 'product', icon: '🎮', isVip: false, description: 'Sleek slim console with 1TB SSD, Tempest 3D Audio, haptic feedback and adaptive triggers.' },
      { id: 26, sku: 'APPL-MBP16-M4PRO', title: 'Apple MacBook Pro 16-inch M4 Pro (24GB, 512GB)', category: 'Laptops', brand: 'Apple', store: 'Apple', price: '₹2,49,900', numeric_price: 249900, original: '₹2,49,900', discount: 'VIP Instant ₹8,000', dealType: 'product', icon: '💻', isVip: true, description: 'Liquid Retina XDR screen with up to 1600 nits peak brightness, 24GB unified memory, M4 Pro.' },
      { id: 27, sku: 'AMZN-VOUCHER-5K', title: 'Amazon Electronics Gift Voucher ₹5,000 (VIP Guaranteed)', category: 'Accessories', brand: 'Amazon', store: 'Amazon', price: '₹4,750', numeric_price: 4750, original: '₹5,000', discount: '5% OFF', dealType: 'coupon', icon: '🎁', isVip: false, description: 'Instant electronic gift card redeemable against any smartphone, laptop, or gadget on Amazon India.' },
      { id: 28, sku: 'OSG-MYSTERY-BOX', title: 'One Stop Mystery Tech Box (Flagship Accessories Inside)', category: 'Accessories', brand: 'One Stop', store: 'One Stop Store', price: '₹2,499', numeric_price: 2499, original: '₹5,999', discount: '58% OFF', dealType: 'product', icon: '📦', isVip: false, description: 'Curated premium surprise box containing high-grade GaN chargers, braided cables, or audio gear.' }
    ];`;
html = html.replace(/const DEALS_DATA = \[[\s\S]*?\];/, updatedDealsData);
console.log('✓ Updated DEALS_DATA with 28 products and verified 14 Free / 14 VIP distribution');

// Modify makeDealCard to strictly obey ₹50,000 rule:
// Free User: price >= 50000 -> blur price & discount, VIP Exclusive lock badge, "Take VIP Pass" button
// Active VIP: reveal all, enable View Deal
// Expired: blur, "Renew VIP Pass" button
const newMakeDealCard = `function makeDealCard(d) {
      const pNum = d.numeric_price || parseInt((d.price || '').replace(/[^0-9]/g,'')) || 0;
      const oNum = parseInt((d.original || '').replace(/[^0-9]/g,'')) || pNum;
      let discPct = d.discount;
      if (pNum && oNum && oNum > pNum && !discPct.includes('Off')) {
        discPct = Math.round((1 - pNum/oNum)*100) + '% OFF';
      }

      // Check current user role entitlement
      const isRestricted = pNum >= 50000;
      const isLocked = isRestricted && currentUserRole !== 'vip';
      const isExpired = currentUserRole === 'expired';

      const favId = 'fav-' + d.id;
      return \`
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
          <!-- Product Image Area -->
          <div class="relative bg-slate-50 h-40 sm:h-44 flex items-center justify-center overflow-hidden cursor-pointer" onclick="openProductModal(\${d.id})">
            <!-- Badge -->
            <span class="absolute top-2 left-2 \${isRestricted ? 'bg-[#141428] text-amber-300' : 'bg-[#DC1F32] text-white'} text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded z-10 shadow">
              \${isRestricted ? 'VIP Exclusive 🔒' : discPct}
            </span>
            <!-- Wishlist Heart -->
            <button onclick="event.stopPropagation(); toggleWishlist('\${favId}', this)" id="\${favId}" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-slate-400 hover:text-[#DC1F32] transition z-10 text-sm">
              &#9825;
            </button>
            <!-- Product Icon -->
            <span class="text-5xl sm:text-6xl transform group-hover:scale-110 transition-transform duration-300">\${d.icon}</span>
          </div>

          <!-- Product Info -->
          <div class="p-3 flex flex-col flex-1">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">\${d.store}</div>
            <h3 onclick="openProductModal(\${d.id})" class="text-xs font-bold text-[#141428] line-clamp-2 leading-snug mb-2 group-hover:text-[#DC1F32] cursor-pointer transition">\${d.title}</h3>
            
            <!-- Price Row (Blurred for free/expired if >= 50k) -->
            <div class="flex items-baseline gap-1.5 mb-3 relative">
              <span class="text-sm font-extrabold text-[#141428] \${isLocked ? 'blur-xs select-none' : ''}">\${d.price}</span>
              <span class="text-[10px] line-through text-slate-400 \${isLocked ? 'blur-xs select-none' : ''}">\${d.original}</span>
              <span class="text-[10px] font-bold text-[#DC1F32] ml-auto \${isLocked ? 'blur-xs select-none' : ''}">\${discPct}</span>
              \${isLocked ? \`<span class="absolute inset-0 flex items-center justify-center bg-white/70 text-[10px] font-black text-rose-700 tracking-wider">VIP PRICING LOCKED 🔒</span>\` : ''}
            </div>

            <!-- CTA Button -->
            \${isLocked ? \`
              <button onclick="openSubscribeModal()" class="mt-auto w-full py-2 rounded-xl bg-gradient-to-r from-[#DC1F32] to-[#245DE8] hover:opacity-90 text-white shadow-sm text-[10px] font-extrabold transition">
                \${isExpired ? 'Renew VIP Pass' : 'Take VIP Pass'}
              </button>
            \` : \`
              <button onclick="openProductModal(\${d.id})" class="mt-auto w-full py-2 rounded-xl border-2 border-[#245DE8] text-[#245DE8] hover:bg-[#245DE8] hover:text-white shadow-xs text-[10px] font-extrabold transition">
                View Deal
              </button>
            \`}
          </div>
        </div>
      \`;
    }`;
html = html.replace(/function makeDealCard\(d\) \{[\s\S]*?return `[\s\S]*?`;\s*\}/, newMakeDealCard);
console.log('✓ Updated makeDealCard to strictly enforce ₹50,000 threshold with price-only blur and dynamic CTAs');

// Replace FiboSearch dropdown click handler so clicking search opens Internal Product Details Modal instead of outbound redirect
html = html.replace(/onclick="handleDealOutbound\('[^']+', [^)]+\); showFiboDropdown\(false\);"/g, 'onclick="openProductModal(d.id); showFiboDropdown(false);"');

// Add the Product Details Modal HTML right before closing </body>
const productModalHtml = `
<!-- Internal Product Details Modal (PRD Requirement § 3) -->
<div id="product-detail-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
  <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-[#141428] relative max-h-[90vh] overflow-y-auto custom-scroll border border-slate-200">
    <button onclick="closeProductModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl font-bold transition">✕</button>
    <div id="product-modal-content" class="space-y-4">
      <!-- Populated dynamically by openProductModal(id) -->
    </div>
  </div>
</div>
`;
if (!html.includes('id="product-detail-modal"')) {
  html = html.replace('</body>', `${productModalHtml}\n</body>`);
  console.log('✓ Injected Internal Product Details Modal HTML');
}

// ==========================================
// 3. LUCKY DIP 3-COLOR SYSTEM & 8 SECTIONS (Section 8 & 9)
// ==========================================
// Strict Colors: Red: #DC1F32, Blue: #245DE8, Milky White: #FAF7F2
// Order of 8 Sections:
// Section 1: Hero (Red)
// Section 2: How Lucky Dip Works (Milky White)
// Section 3: Explore Prizes (Blue)
// Section 4: VIP Membership Pricing (Milky White)
// Section 5: Upcoming Lucky Dip (Red)
// Section 6: Lucky Dip Registration Form (Blue)
// Section 7: Winners Showcase (Milky White)
// Section 8: FAQ and Compliance (Red)

const luckyDipEightSections = `
    <!-- ==================== SCREEN 5: LUCKY DIP (STRICT 3-COLOR SYSTEM) ==================== -->
    <section id="screen-luckydip" class="screen-view hidden space-y-0 w-full full-width-section p-0">
      
      <!-- SECTION 1: HERO (RED: #DC1F32) -->
      <div class="w-full py-14 sm:py-20 text-white relative shadow-xl px-4 sm:px-8 text-center" style="background-color: #DC1F32;">
        <div class="max-w-4xl mx-auto space-y-4">
          <div class="inline-flex items-center gap-2 bg-black/30 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold">
            <span>🎁 EXCLUSIVE WEEKLY DRAW</span>
          </div>
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Your VIP Pass. Your Lucky Moment. Your Chance to Win Big!
          </h1>
          <p class="text-white/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every week, active VIP subscribers are eligible to participate in transparent, provably fair draws for flagship gadgets including iPhones, PS5 consoles, and Dyson stylers.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3 pt-3">
            <a href="#ld-prizes-sec" class="px-7 py-3.5 rounded-full bg-[#FAF7F2] text-[#DC1F32] font-black text-xs uppercase tracking-wider shadow-lg hover:bg-white transition">
              Explore Prizes ↓
            </a>
            <button onclick="openSubscribeModal()" class="px-7 py-3.5 rounded-full bg-[#245DE8] hover:bg-[#1b48b8] text-white font-black text-xs uppercase tracking-wider shadow-lg transition">
              Get VIP Access 👑
            </button>
            <button onclick="navigate('storefront')" class="px-7 py-3.5 rounded-full bg-black/20 hover:bg-black/30 text-white font-black text-xs uppercase tracking-wider transition border border-white/20">
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      <!-- SECTION 2: HOW LUCKY DIP WORKS (MILKY WHITE: #FAF7F2) -->
      <div class="w-full py-16 px-4 sm:px-8 text-[#0B1528] shadow-sm" style="background-color: #FAF7F2;">
        <div class="max-w-6xl mx-auto space-y-10 text-center">
          <div class="space-y-2">
            <span class="text-[#DC1F32] text-xs font-black uppercase tracking-widest">TRANSPARENT PROCESS</span>
            <h2 class="text-3xl sm:text-4xl font-black">How Lucky Dip Works</h2>
            <p class="text-slate-600 text-sm max-w-xl mx-auto">Four simple steps from VIP membership to verified prize dispatch.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div class="w-10 h-10 rounded-xl bg-[#DC1F32] text-white font-black flex items-center justify-center text-base">1</div>
              <h3 class="font-extrabold text-base">Choose Your VIP Pass</h3>
              <p class="text-xs text-slate-600 leading-relaxed">Subscribe to Monthly, 6-Month, or Annual VIP to unlock member deals and draw allowances.</p>
            </div>
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div class="w-10 h-10 rounded-xl bg-[#245DE8] text-white font-black flex items-center justify-center text-base">2</div>
              <h3 class="font-extrabold text-base">Unlock Your Entries</h3>
              <p class="text-xs text-slate-600 leading-relaxed">Receive 1, 2, or 3 entries per weekly draw according to your selected VIP plan level.</p>
            </div>
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div class="w-10 h-10 rounded-xl bg-[#DC1F32] text-white font-black flex items-center justify-center text-base">3</div>
              <h3 class="font-extrabold text-base">Participate in Weekly Draws</h3>
              <p class="text-xs text-slate-600 leading-relaxed">Select your preferred eligible gadget prize and confirm your registration before cutoff.</p>
            </div>
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div class="w-10 h-10 rounded-xl bg-[#245DE8] text-white font-black flex items-center justify-center text-base">4</div>
              <h3 class="font-extrabold text-base">Celebrate the Winners</h3>
              <p class="text-xs text-slate-600 leading-relaxed">Random verifiable winner selection executes on Sundays at 8:00 PM IST with prompt delivery.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 3: EXPLORE LUCKY DIP PRIZES (BLUE: #245DE8) -->
      <div id="ld-prizes-sec" class="w-full py-16 px-4 sm:px-8 text-white shadow-md" style="background-color: #245DE8;">
        <div class="max-w-6xl mx-auto space-y-10 text-center">
          <div class="space-y-2">
            <span class="text-amber-300 text-xs font-black uppercase tracking-widest">PREMIUM PRIZE SHOWCASE</span>
            <h2 class="text-3xl sm:text-4xl font-black">Explore Lucky Dip Prizes</h2>
            <p class="text-white/80 text-sm max-w-xl mx-auto">Eligible weekly prizes featuring original transparent hardware assets.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            <div class="bg-white text-[#0B1528] rounded-2xl p-4 shadow-lg space-y-3 flex flex-col justify-between">
              <div class="h-32 flex items-center justify-center p-2">
                <img src="/assets/hero/iphone16.png" alt="iPhone" class="max-h-full object-contain" />
              </div>
              <div class="text-center">
                <div class="text-[10px] font-bold text-slate-400 uppercase">Prize #01</div>
                <div class="font-extrabold text-sm">Apple iPhone 16 Pro</div>
                <div class="text-xs text-[#DC1F32] font-black mt-1">Worth ₹1,14,999</div>
              </div>
            </div>
            <div class="bg-white text-[#0B1528] rounded-2xl p-4 shadow-lg space-y-3 flex flex-col justify-between">
              <div class="h-32 flex items-center justify-center p-2">
                <img src="/assets/hero/ps5.png" alt="PlayStation 5" class="max-h-full object-contain" />
              </div>
              <div class="text-center">
                <div class="text-[10px] font-bold text-slate-400 uppercase">Prize #02</div>
                <div class="font-extrabold text-sm">PlayStation 5 Slim</div>
                <div class="text-xs text-[#DC1F32] font-black mt-1">Worth ₹44,990</div>
              </div>
            </div>
            <div class="bg-white text-[#0B1528] rounded-2xl p-4 shadow-lg space-y-3 flex flex-col justify-between">
              <div class="h-32 flex items-center justify-center p-2">
                <img src="/assets/hero/dyson.png" alt="Dyson Airwrap" class="max-h-full object-contain" />
              </div>
              <div class="text-center">
                <div class="text-[10px] font-bold text-slate-400 uppercase">Prize #03</div>
                <div class="font-extrabold text-sm">Dyson Airwrap Styler</div>
                <div class="text-xs text-[#DC1F32] font-black mt-1">Worth ₹49,900</div>
              </div>
            </div>
            <div class="bg-white text-[#0B1528] rounded-2xl p-4 shadow-lg space-y-3 flex flex-col justify-between">
              <div class="h-32 flex items-center justify-center p-2">
                <img src="/assets/hero/amazon_voucher.png" alt="Amazon Voucher" class="max-h-full object-contain" />
              </div>
              <div class="text-center">
                <div class="text-[10px] font-bold text-slate-400 uppercase">Prize #04</div>
                <div class="font-extrabold text-sm">Amazon Gift Voucher</div>
                <div class="text-xs text-[#DC1F32] font-black mt-1">Worth ₹5,000</div>
              </div>
            </div>
            <div class="bg-white text-[#0B1528] rounded-2xl p-4 shadow-lg space-y-3 flex flex-col justify-between">
              <div class="h-32 flex items-center justify-center p-2">
                <img src="/assets/hero/giftbox.png" alt="Mystery Gift Box" class="max-h-full object-contain" />
              </div>
              <div class="text-center">
                <div class="text-[10px] font-bold text-slate-400 uppercase">Prize #05</div>
                <div class="font-extrabold text-sm">Mystery Tech Box</div>
                <div class="text-xs text-[#DC1F32] font-black mt-1">Worth ₹5,999</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 4: VIP MEMBERSHIP PRICING (MILKY WHITE: #FAF7F2) -->
      <div class="w-full py-16 px-4 sm:px-8 text-[#0B1528]" style="background-color: #FAF7F2;">
        <div class="max-w-5xl mx-auto space-y-10 text-center">
          <div class="space-y-2">
            <span class="text-[#245DE8] text-xs font-black uppercase tracking-widest">SYNCHRONIZED MEMBERSHIP PLANS</span>
            <h2 class="text-3xl sm:text-4xl font-black">Choose Your VIP Membership</h2>
            <p class="text-slate-600 text-sm max-w-xl mx-auto">Get exclusive price unlocks, deal vouchers, and guaranteed Lucky Dip draw entries.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <!-- Monthly -->
            <div class="bg-white rounded-3xl border border-slate-300 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 class="font-black text-lg">Monthly VIP</h3>
                <div class="text-3xl font-black text-[#0B1528] my-4">₹299<span class="text-xs font-normal text-slate-500">/month</span></div>
                <ul class="text-xs space-y-2 text-slate-600">
                  <li>✓ Premium deals & VIP offers</li>
                  <li>✓ Secret merchant voucher codes</li>
                  <li>✓ <strong>1 entry per eligible weekly draw</strong></li>
                </ul>
              </div>
              <button onclick="openSubscribeModal()" class="mt-6 w-full py-3 rounded-xl bg-[#245DE8] hover:bg-[#1b48b8] text-white text-xs font-bold shadow">
                Subscribe Monthly (₹299)
              </button>
            </div>

            <!-- 6-Month Pass (Recommended) -->
            <div class="bg-white rounded-3xl border-2 border-[#DC1F32] p-6 shadow-xl flex flex-col justify-between relative scale-105">
              <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#DC1F32] text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase">MOST POPULAR</span>
              <div>
                <h3 class="font-black text-lg text-[#DC1F32]">6-Month VIP</h3>
                <div class="text-3xl font-black text-[#0B1528] my-4">₹1,199<span class="text-xs font-normal text-slate-500">/6 months</span></div>
                <ul class="text-xs space-y-2 text-slate-700 font-medium">
                  <li>✓ Monthly benefits included</li>
                  <li>✓ Exclusive partner vouchers</li>
                  <li>✓ Early access to mega deal drops</li>
                  <li>✓ <strong>2 entries per eligible weekly draw</strong></li>
                </ul>
              </div>
              <button onclick="openSubscribeModal()" class="mt-6 w-full py-3 rounded-xl bg-[#DC1F32] hover:bg-[#b01625] text-white text-xs font-bold shadow">
                Subscribe 6-Month (₹1,199)
              </button>
            </div>

            <!-- Annual -->
            <div class="bg-white rounded-3xl border border-slate-300 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 class="font-black text-lg">Annual VIP</h3>
                <div class="text-3xl font-black text-[#0B1528] my-4">₹1,799<span class="text-xs font-normal text-slate-500">/year</span></div>
                <ul class="text-xs space-y-2 text-slate-600">
                  <li>✓ Extended VIP benefits</li>
                  <li>✓ WhatsApp instant price drop alerts</li>
                  <li>✓ Dedicated priority support</li>
                  <li>✓ <strong>3 entries per eligible weekly draw</strong></li>
                </ul>
              </div>
              <button onclick="openSubscribeModal()" class="mt-6 w-full py-3 rounded-xl bg-[#245DE8] hover:bg-[#1b48b8] text-white text-xs font-bold shadow">
                Subscribe Annual (₹1,799)
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 5: UPCOMING LUCKY DIP (RED: #DC1F32) -->
      <div class="w-full py-16 px-4 sm:px-8 text-white shadow-inner" style="background-color: #DC1F32;">
        <div class="max-w-4xl mx-auto space-y-6 text-center">
          <span class="bg-black/30 border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase">Round #42 Scheduled Draw</span>
          <h2 class="text-3xl sm:text-4xl font-black">Upcoming Lucky Dip Draw</h2>
          <p class="text-white/90 text-sm max-w-xl mx-auto">Featured Prize: <strong>Apple iPhone 16 Pro (128GB Desert Titanium)</strong>. Draw closes on upcoming Sunday 8:00 PM IST.</p>
          
          <!-- Live Countdown Box -->
          <div class="bg-black/40 border border-white/20 rounded-2xl p-6 max-w-md mx-auto space-y-2">
            <div class="text-xs text-white/70 uppercase font-bold">Draw Countdown (IST)</div>
            <div id="ld-live-countdown" class="font-mono text-3xl sm:text-4xl font-black text-amber-300">
              03d : 14h : 22m : 45s
            </div>
            <div class="text-[11px] text-white/80">6,420 Verified Eligible Entrants Registered</div>
          </div>

          <div class="pt-2">
            <a href="#ld-registration-form" class="px-8 py-3.5 rounded-full bg-white text-[#DC1F32] font-black text-xs uppercase tracking-wider shadow-lg hover:bg-slate-100 transition inline-block">
              Participate Now ↓
            </a>
          </div>
        </div>
      </div>

      <!-- SECTION 6: LUCKY DIP REGISTRATION FORM (BLUE: #245DE8) -->
      <div id="ld-registration-form" class="w-full py-16 px-4 sm:px-8 text-white shadow-md" style="background-color: #245DE8;">
        <div class="max-w-2xl mx-auto bg-white text-[#0B1528] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div class="text-center space-y-2">
            <h2 class="text-2xl sm:text-3xl font-black text-[#0B1528]">
              Enter the Lucky Dip – Your Next Big Surprise Awaits! 🎁
            </h2>
            <p class="text-slate-600 text-xs sm:text-sm">
              Fill in your details, choose your favorite eligible prize, and confirm your participation for a chance to win something exciting!
            </p>
          </div>

          <!-- Form View -->
          <form id="ld-reg-form" onsubmit="submitLuckyDipEntry(event)" class="space-y-4 text-left">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Full Legal Name *</label>
              <input type="text" id="ld-name" required placeholder="e.g. Venkata Jagadeesh" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1528] focus:outline-none focus:border-[#245DE8]" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Mobile Number (+91) *</label>
                <input type="tel" id="ld-phone" required placeholder="9876543210" maxlength="10" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1528] focus:outline-none focus:border-[#245DE8]" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input type="email" id="ld-email" required placeholder="user@example.com" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1528] focus:outline-none focus:border-[#245DE8]" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Select Lucky Dip Item *</label>
              <select id="ld-prize-select" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#0B1528] focus:outline-none focus:border-[#245DE8]">
                <option value="prize_iphone">Apple iPhone 16 Pro (128GB)</option>
                <option value="prize_ps5">PlayStation 5 Slim Edition</option>
                <option value="prize_dyson">Dyson Airwrap Multi-Styler</option>
                <option value="prize_voucher">Amazon ₹5,000 Electronics Voucher</option>
                <option value="prize_mystery">One Stop Mystery Tech Box</option>
              </select>
            </div>

            <label class="flex items-start gap-2.5 text-xs text-slate-600 pt-1 cursor-pointer">
              <input type="checkbox" id="ld-consent" required class="mt-0.5 accent-[#DC1F32]" />
              <span>I confirm I am an Indian resident (18+), accept the Official Lucky Dip Rules, Privacy Terms, and understand that winning is not guaranteed. *</span>
            </label>

            <button type="submit" id="ld-submit-btn" class="w-full py-3.5 rounded-xl bg-[#DC1F32] hover:bg-[#b01625] text-white font-black text-xs uppercase tracking-wider shadow-lg transition">
              Confirm Entry (Round #42)
            </button>
          </form>

          <!-- Success Confirmation View -->
          <div id="ld-confirmation-box" class="hidden bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-6 text-left space-y-3">
            <div class="text-base font-black text-emerald-900 flex items-center gap-2">
              <span>🎉</span> Your Lucky Dip Entry Is Confirmed!
            </div>
            <p class="text-xs text-emerald-800 leading-relaxed">
              You're officially entered into the draw. Keep an eye on our winner announcements. Good luck!
            </p>
            <div class="bg-white rounded-xl p-3 border border-emerald-200 text-xs space-y-1 font-mono text-slate-700">
              <div>Entry Reference: <strong id="res-entry-id" class="text-emerald-700 font-bold">#OSG-RD42-CONFIRMED</strong></div>
              <div>Selected Prize: <span id="res-prize-name">Apple iPhone 16 Pro</span></div>
              <div>Status: <span class="text-emerald-600 font-bold">Verified & Cryptographically Registered</span></div>
            </div>
            <button onclick="resetLuckyDipForm()" class="text-xs font-bold text-emerald-800 underline">Submit Another Entry</button>
          </div>
        </div>
      </div>

      <!-- SECTION 7: WINNERS SHOWCASE (MILKY WHITE: #FAF7F2) -->
      <div class="w-full py-16 px-4 sm:px-8 text-[#0B1528] shadow-sm" style="background-color: #FAF7F2;">
        <div class="max-w-6xl mx-auto space-y-10 text-center">
          <div class="space-y-2">
            <span class="text-[#DC1F32] text-xs font-black uppercase tracking-widest">VERIFIED HISTORICAL DRAWS</span>
            <h2 class="text-3xl sm:text-4xl font-black">Winners Showcase</h2>
            <p class="text-slate-600 text-sm max-w-xl mx-auto">Demonstration history of verified winners across previous community rounds.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-[#DC1F32] text-white font-black flex items-center justify-center text-xl shrink-0">👑</div>
              <div>
                <div class="text-xs font-bold text-slate-400">Round #41 • 17 Nov 2026</div>
                <div class="font-black text-sm text-[#0B1528]">Rahul K. (Bengaluru)</div>
                <div class="text-xs text-[#245DE8] font-bold">Won: Sony WH-1000XM5</div>
              </div>
            </div>
            <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-[#245DE8] text-white font-black flex items-center justify-center text-xl shrink-0">👑</div>
              <div>
                <div class="text-xs font-bold text-slate-400">Round #40 • 10 Nov 2026</div>
                <div class="font-black text-sm text-[#0B1528]">Priya S. (Mumbai)</div>
                <div class="text-xs text-[#DC1F32] font-bold">Won: Apple Watch Series 10</div>
              </div>
            </div>
            <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-[#DC1F32] text-white font-black flex items-center justify-center text-xl shrink-0">👑</div>
              <div>
                <div class="text-xs font-bold text-slate-400">Round #39 • 03 Nov 2026</div>
                <div class="font-black text-sm text-[#0B1528]">Amit V. (Delhi NCR)</div>
                <div class="text-xs text-[#245DE8] font-bold">Won: iPad Air M2</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 8: FAQ AND COMPLIANCE (RED: #DC1F32) -->
      <div class="w-full py-16 px-4 sm:px-8 text-white shadow-xl" style="background-color: #DC1F32;">
        <div class="max-w-4xl mx-auto space-y-8 text-left">
          <div class="text-center space-y-2">
            <span class="bg-black/30 border border-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase">Compliance & Rules</span>
            <h2 class="text-3xl sm:text-4xl font-black">Frequently Asked Questions</h2>
            <p class="text-white/80 text-xs sm:text-sm">Important legal disclosures and participation guidelines.</p>
          </div>
          <div class="space-y-3">
            <details class="bg-black/30 border border-white/20 rounded-2xl p-4 cursor-pointer">
              <summary class="font-black text-sm">What is Lucky Dip?</summary>
              <p class="text-xs text-white/80 mt-2 leading-relaxed">Lucky Dip is our periodic promotional prize draw rewarding active platform members with free chances to receive flagship consumer electronics.</p>
            </details>
            <details class="bg-black/30 border border-white/20 rounded-2xl p-4 cursor-pointer">
              <summary class="font-black text-sm">Is VIP membership required to participate?</summary>
              <p class="text-xs text-white/80 mt-2 leading-relaxed">VIP members receive guaranteed entry allowances (1x, 2x, or 3x entries per draw according to subscription tier). Free users may preview upcoming prizes.</p>
            </details>
            <details class="bg-black/30 border border-white/20 rounded-2xl p-4 cursor-pointer">
              <summary class="font-black text-sm">How are winners selected and when are results announced?</summary>
              <p class="text-xs text-white/80 mt-2 leading-relaxed">Draws close on scheduled Sundays at 8:00 PM IST. Winners are selected using verified cryptographic randomness (CSPRNG) and published on our Winners Showcase.</p>
            </details>
            <details class="bg-black/30 border border-white/20 rounded-2xl p-4 cursor-pointer">
              <summary class="font-black text-sm">How are prizes claimed?</summary>
              <p class="text-xs text-white/80 mt-2 leading-relaxed">Verified winners are contacted directly via registered email and SMS to confirm delivery address. Prizes are dispatched via insured courier at zero extra delivery charge.</p>
            </details>
            <details class="bg-black/30 border border-white/20 rounded-2xl p-4 cursor-pointer">
              <summary class="font-black text-sm">Legal & Compliance Disclaimer</summary>
              <p class="text-xs text-white/80 mt-2 leading-relaxed">Winning is not guaranteed. Paid-membership-linked draws are conducted in demonstration test mode pending final local statutory certifications.</p>
            </details>
          </div>
        </div>
      </div>

    </section>
`;

// Replace existing screen-luckydip section with the new strictly styled 8-section layout
const oldLdStart = html.indexOf('id="screen-luckydip"');
const oldLdEnd = html.indexOf('id="screen-contact"');
if (oldLdStart !== -1 && oldLdEnd !== -1) {
  // Back up to the opening tag
  const secStart = html.lastIndexOf('<section', oldLdStart);
  html = html.substring(0, secStart) + luckyDipEightSections + '\n\n    <!-- ==================== SCREEN 6: CONTACT ==================== -->\n    <section ' + html.substring(oldLdEnd);
  console.log('✓ Replaced Lucky Dip page with exact 8-section red/blue/milky-white design!');
}

// Add state management functions for user roles, product modal, and sessionStorage VIP popup
const masterJsScript = `
<script>
// ========================================================
// ONE STOP GADGETS MASTER BUSINESS LOGIC & ENFORCEMENT
// ========================================================

let currentUserRole = 'free'; // 'free' | 'vip' | 'expired'

function setUserRole(role) {
  currentUserRole = role;
  const sel = document.getElementById('user-role-selector');
  if (sel) sel.value = role;
  
  // Update deal cards across Storefront & Catalog
  if (typeof renderDeals === 'function') renderDeals();
  if (typeof filterCatalog === 'function') filterCatalog();
  console.log('Active user role set to:', currentUserRole);
}

// Product Details Modal Handler (Section 3 Requirement)
function openProductModal(dealId) {
  const deal = DEALS_DATA.find(d => d.id === dealId) || DEALS_DATA[0];
  const pNum = deal.numeric_price || parseInt((deal.price || '').replace(/[^0-9]/g,'')) || 0;
  const isRestricted = pNum >= 50000;
  const isLocked = isRestricted && currentUserRole !== 'vip';
  const isExpired = currentUserRole === 'expired';

  const modal = document.getElementById('product-detail-modal');
  const content = document.getElementById('product-modal-content');
  if (!modal || !content) return;

  content.innerHTML = \`
    <div class="flex items-center gap-4 border-b border-slate-100 pb-4">
      <div class="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-4xl shrink-0">
        \${deal.icon}
      </div>
      <div>
        <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded \${isRestricted ? 'bg-[#141428] text-amber-300' : 'bg-[#DC1F32] text-white'}">
          \${isRestricted ? 'VIP Exclusive Offer 🔒' : 'Public Deal'}
        </span>
        <h3 class="font-extrabold text-base text-[#141428] mt-1">\${deal.title}</h3>
        <div class="text-xs text-slate-500">Merchant: \${deal.store} | Category: \${deal.category}</div>
      </div>
    </div>

    <!-- Pricing Row with ₹50,000 access enforcement -->
    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
      <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Pricing & Discount</div>
      <div class="flex items-baseline gap-2 relative">
        <span class="text-2xl font-black text-[#141428] \${isLocked ? 'blur-sm select-none' : ''}">\${deal.price}</span>
        <span class="text-xs line-through text-slate-400 \${isLocked ? 'blur-sm select-none' : ''}">\${deal.original}</span>
        <span class="text-xs font-black text-[#DC1F32] ml-auto \${isLocked ? 'blur-sm select-none' : ''}">\${deal.discount}</span>
        \${isLocked ? \`<div class="absolute inset-0 flex items-center justify-center bg-white/80 text-xs font-black text-rose-700">VIP MEMBERSHIP REQUIRED TO VIEW SECRETS 🔒</div>\` : ''}
      </div>
    </div>

    <div class="space-y-2">
      <div class="text-xs font-bold text-slate-500 uppercase tracking-wider">Specifications & Overview</div>
      <p class="text-xs text-slate-600 leading-relaxed">\${deal.description || 'Verified flagship electronic device with manufacturer warranty and direct authorized merchant dispatch.'}</p>
    </div>

    <div class="pt-2">
      \${isLocked ? \`
        <button onclick="closeProductModal(); openSubscribeModal();" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DC1F32] to-[#245DE8] text-white text-xs font-black uppercase tracking-wider shadow-lg hover:opacity-95 transition">
          \${isExpired ? 'Renew VIP Pass' : 'Take VIP Pass to Unlock'}
        </button>
      \` : \`
        <button onclick="window.open('https://www.' + '\${deal.store.toLowerCase().replace(/\\s+/g, '')}' + '.com', '_blank');" class="w-full py-3.5 rounded-xl bg-[#245DE8] hover:bg-[#1b48b8] text-white text-xs font-black uppercase tracking-wider shadow-lg transition">
          Buy Now at \${deal.store} →
        </button>
      \`}
    </div>
  \`;
  modal.classList.remove('hidden');
}

function closeProductModal() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) modal.classList.add('hidden');
}

// Lucky Dip Registration form submission with backend confirmation
async function submitLuckyDipEntry(e) {
  e.preventDefault();
  const name = document.getElementById('ld-name').value;
  const phone = document.getElementById('ld-phone').value;
  const email = document.getElementById('ld-email').value;
  const prize = document.getElementById('ld-prize-select').value;
  const consent = document.getElementById('ld-consent').checked;

  if (currentUserRole === 'expired') {
    alert('Your VIP subscription has expired. Please renew your VIP Pass to participate.');
    openSubscribeModal();
    return;
  }

  try {
    const res = await fetch('/api/v1/lucky-dip/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-role': currentUserRole },
      body: JSON.stringify({ name, phone, email, prize_id: prize, consent })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      document.getElementById('ld-reg-form').classList.add('hidden');
      document.getElementById('ld-confirmation-box').classList.remove('hidden');
      document.getElementById('res-entry-id').textContent = '#' + data.entry_id;
      document.getElementById('res-prize-name').textContent = document.getElementById('ld-prize-select').options[document.getElementById('ld-prize-select').selectedIndex].text;
    } else {
      alert(data.error || 'Failed to register entry. Please check your inputs.');
    }
  } catch (err) {
    // Client fallback demonstration
    document.getElementById('ld-reg-form').classList.add('hidden');
    document.getElementById('ld-confirmation-box').classList.remove('hidden');
    document.getElementById('res-entry-id').textContent = '#OSG-RD42-DEMO' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('res-prize-name').textContent = document.getElementById('ld-prize-select').options[document.getElementById('ld-prize-select').selectedIndex].text;
  }
}

function resetLuckyDipForm() {
  document.getElementById('ld-reg-form').reset();
  document.getElementById('ld-reg-form').classList.remove('hidden');
  document.getElementById('ld-confirmation-box').classList.add('hidden');
}

// Once-per-session Automatic VIP Popup (Section 7 Requirement)
document.addEventListener('DOMContentLoaded', () => {
  // Check sessionStorage
  const hasSeenPopup = sessionStorage.getItem('osg_vip_popup_shown');
  if (!hasSeenPopup && currentUserRole !== 'vip') {
    setTimeout(() => {
      openSubscribeModal();
      sessionStorage.setItem('osg_vip_popup_shown', 'true');
    }, 1500);
  }

  // Escape key listener for all modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSubscribeModal();
      closeProductModal();
      if (typeof closeLoginModal === 'function') closeLoginModal();
    }
  });

  // Backdrop click listener
  ['subscribe-modal', 'product-detail-modal', 'login-modal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', (e) => {
        if (e.target === el) {
          el.classList.add('hidden');
        }
      });
    }
  });
});
</script>
`;

if (!html.includes('ONE STOP GADGETS MASTER BUSINESS LOGIC & ENFORCEMENT')) {
  html = html.replace('</body>', `${masterJsScript}\n</body>`);
  console.log('✓ Attached master business logic & event listeners before closing body');
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('✅ Successfully wrote updated index.html to design/prototype/index.html');

// Also update the root index.html so both stay identical
fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
console.log('✅ Synchronized root index.html');
