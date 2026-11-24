const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

console.log('Applying reference image alignment to ONE STOP GADGETS...');

// -------------------------------------------------------------
// 1. ADD CSS KEYFRAMES FOR SHIMMER, PULSE, BOUNCE, REDUCED-MOTION
// -------------------------------------------------------------
const customStyles = `
  /* Keyframes for Lucky Dip animated button & shimmer */
  @keyframes ldPulseGlow {
    0%, 100% {
      box-shadow: 0 0 15px rgba(255, 200, 0, 0.4), 0 0 25px rgba(220, 31, 50, 0.4);
    }
    50% {
      box-shadow: 0 0 25px rgba(255, 200, 0, 0.7), 0 0 35px rgba(220, 31, 50, 0.7);
    }
  }

  @keyframes ldShimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes giftBounce {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-3px) rotate(4deg); }
  }

  .lucky-dip-navbar-btn {
    background: linear-gradient(135deg, #FFC800 0%, #FF9900 35%, #DC1F32 100%);
    color: #141428 !important;
    font-weight: 800;
    position: relative;
    overflow: hidden;
    animation: ldPulseGlow 2.5s infinite ease-in-out;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
  }

  .lucky-dip-navbar-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(255, 200, 0, 0.8), 0 0 40px rgba(220, 31, 50, 0.8);
  }

  .lucky-dip-navbar-btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      60deg,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 80%
    );
    animation: ldShimmer 3s infinite linear;
    pointer-events-none;
  }

  .animated-gift-icon {
    display: inline-block;
    animation: giftBounce 1.8s infinite ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .lucky-dip-navbar-btn, .animated-gift-icon, .lucky-dip-navbar-btn::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;

if (!html.includes('lucky-dip-navbar-btn')) {
  html = html.replace('</style>', `${customStyles}\n</style>`);
  console.log('✓ Added Lucky Dip animation & shimmer CSS');
}

// -------------------------------------------------------------
// 2. NAVBAR: EXACT BUTTONS & HIGHLIGHTED LUCKY DIP + WIN BIG BADGE
// -------------------------------------------------------------
// Header layout:
// Logo (ONE STOP GADGETS)
// Nav: Home (Active bright red), Deals, About, Lucky Dip (Golden shimmer + WIN BIG badge), Contact Us
// FiboSearch input
// Sign In button (Bright red pill)

const oldDesktopNav = html.match(/<nav id="main-desktop-nav"[\s\S]*?<\/nav>/);
if (oldDesktopNav) {
  const newDesktopNav = `<nav id="main-desktop-nav" class="hidden md:flex items-center gap-1.5 lg:gap-2.5 text-xs font-bold text-slate-200">
        <button onclick="navigate('storefront')" id="nav-btn-storefront" class="nav-link px-4 py-2 rounded-full text-white bg-[#DC1F32] font-black shadow-md transition">Home</button>
        <button onclick="navigate('catalog')" id="nav-btn-catalog" class="nav-link px-3.5 py-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition">Deals</button>
        <button onclick="navigate('about')" id="nav-btn-about" class="nav-link px-3.5 py-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition">About</button>
        
        <!-- Lucky Dip Navbar Button (Highlighted with Golden-Yellow/Red gradient, glow, shimmer, animated gift, WIN BIG badge) -->
        <div class="relative inline-flex items-center">
          <button onclick="handleLuckyDipNavClick()" id="nav-btn-luckydip" class="lucky-dip-navbar-btn px-4 py-2 rounded-full text-xs font-black shadow-lg flex items-center gap-1.5 transition">
            <span class="animated-gift-icon text-sm">🎁</span>
            <span class="tracking-wide">Lucky Dip</span>
          </button>
          <span class="absolute -top-2 -right-2 bg-[#DC1F32] text-white text-[8px] font-black px-1.5 py-0.2 rounded-full tracking-tighter uppercase shadow-md pointer-events-none ring-1 ring-amber-300">
            WIN BIG
          </span>
        </div>

        <button onclick="navigate('contact')" id="nav-btn-contact" class="nav-link px-3.5 py-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition">Contact Us</button>
      </nav>`;
  html = html.replace(oldDesktopNav[0], newDesktopNav);
  console.log('✓ Updated desktop navigation with Lucky Dip highlighted button & WIN BIG badge');
}

// Update FiboSearch placeholder and Login button shape in header
html = html.replace(/placeholder="FiboSearch: iPhone, Sony\.\.\."/g, 'placeholder="Search gadgets, brands, deals..."');
html = html.replace(/px-3\.5 sm:px-4 py-2 rounded-xl bg-\[#D42526\]/g, 'px-4 sm:px-5 py-2 rounded-full bg-[#DC1F32]');

// -------------------------------------------------------------
// 3. ANNOUNCEMENT BAR (Red, Purple, and Blue gradient matching reference)
// -------------------------------------------------------------
const oldTicker = html.match(/<!-- Flash Sale Ticker[\s\S]*?<\/div>/);
if (oldTicker) {
  const newTicker = `<!-- Flash Sale Announcement Bar (Red, Purple & Blue Gradient) -->
  <div class="bg-gradient-to-r from-[#DC1F32] via-[#7B1FA2] to-[#245DE8] text-white text-xs py-2 px-4 text-center font-bold tracking-wide flex items-center justify-center gap-2 shadow-inner">
    <span>⚡ <strong>EXCLUSIVE TECH DEALS:</strong> Up to 50% Off Top Brands • Amazon &amp; Flipkart Verified • Weekly VIP Lucky Dip</span>
    <button onclick="navigate('catalog')" class="underline text-amber-300 hover:text-white ml-1 font-bold">Explore Offers →</button>
  </div>`;
  html = html.replace(oldTicker[0], newTicker);
  console.log('✓ Updated announcement bar gradient to Red/Purple/Blue');
}

// -------------------------------------------------------------
// 4. HERO SECTION: PEDESTAL SHOWCASE WITH 4 GADGETS & 50% OFF BADGE
// -------------------------------------------------------------
// Reference image shows:
// Left:
// Small Pill: [👑 ONE STOP GADGETS]
// Heading: Exclusive Tech Deals, VIP Access, Cashback & Weekly Lucky Dip Prizes (with "Lucky Dip Prizes" highlighted in reddish pink)
// Description: Verified deals from top merchants, members-only VIP benefits, extra cashback, and a chance to win exciting gadgets every week.
// Buttons: [Join VIP Now] (solid red with crown/icon), [Try Lucky Dip] (outlined/translucent with gift)
// Right:
// Up To 50% OFF gold laurel badge top right
// 3D oval red velvet/metallic pedestal holding:
// - Premium smartphone (iPhone 16 Pro)
// - Laptop (MacBook)
// - Wireless headphones (Bose QC)
// - Smartwatch (Apple Watch)

const newHeroSection = `
      <!-- ==================== HERO SECTION (REFERENCE IMAGE MATCH) ==================== -->
      <div id="hero-slider-container" class="full-width-section relative overflow-hidden py-10 sm:py-16 min-h-[500px] sm:min-h-[540px] flex items-center shadow-2xl" style="background: radial-gradient(circle at 65% 50%, #4A0E17 0%, #30070E 50%, #1A0408 100%);">
        
        <!-- Ambient Atmospheric Lighting -->
        <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-red-600/20 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-rose-700/20 blur-3xl pointer-events-none"></div>

        <!-- Hero 2-Column Grid -->
        <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <!-- LEFT COLUMN: Headline & CTAs (6 Cols) -->
          <div class="lg:col-span-6 space-y-6 text-left">
            <!-- Small brand pill -->
            <div class="inline-flex items-center gap-2 bg-[#641428]/80 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-amber-300 shadow-sm">
              <span>👑</span>
              <span class="tracking-wide uppercase text-[11px]">ONE STOP GADGETS</span>
            </div>

            <!-- Main Headline -->
            <h1 class="animate-fade-up text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] drop-shadow-lg">
              Exclusive Tech Deals,<br>
              VIP Access, Cashback &amp;<br>
              Weekly <span class="text-[#FF4D61]">Lucky Dip Prizes</span>
            </h1>

            <!-- Supporting Description -->
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
              Verified deals from top merchants, members-only VIP benefits, extra cashback, and a chance to win exciting gadgets every week.
            </p>

            <!-- Buttons matching reference image -->
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <button onclick="navigate('pricing')" class="px-7 py-3.5 rounded-full bg-[#DC1F32] hover:bg-[#b01625] text-white font-black text-xs uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
                <span>👑</span>
                <span>Join VIP Now</span>
              </button>
              <button onclick="handleLuckyDipNavClick()" class="px-7 py-3.5 rounded-full bg-transparent hover:bg-white/10 text-white font-black text-xs uppercase tracking-wider border-2 border-white/30 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
                <span>🎁</span>
                <span>Try Lucky Dip</span>
              </button>
            </div>
          </div>

          <!-- RIGHT COLUMN: 3D PEDESTAL MULTI-PRODUCT DISPLAY & 50% OFF BADGE (6 Cols) -->
          <div class="lg:col-span-6 flex justify-center items-center relative py-4">
            
            <!-- UP TO 50% OFF Golden Laurel Badge (Top Right) -->
            <div class="absolute -top-6 right-2 sm:right-6 z-20 flex flex-col items-center justify-center p-3 rounded-full text-center pointer-events-none select-none">
              <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-amber-300/80 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center shadow-xl">
                <span class="text-[9px] text-amber-300 font-extrabold uppercase tracking-wider">UP TO</span>
                <span class="text-xl sm:text-2xl font-black text-amber-400 leading-none">50%</span>
                <span class="text-[9px] text-amber-300 font-extrabold uppercase tracking-wider">OFF</span>
              </div>
            </div>

            <!-- Pedestal & Multi-Gadget Composite Stage -->
            <div class="relative w-full max-w-xl h-[360px] sm:h-[420px] flex items-end justify-center select-none cursor-pointer" onclick="navigate('luckydip')" title="Click to view Lucky Dip Prizes">
              
              <!-- 3D Cylindrical Pedestal / Platform (Gradient Maroon & Red with glowing metallic rim) -->
              <div class="absolute bottom-2 w-[85%] sm:w-[90%] h-20 rounded-full bg-gradient-to-r from-[#4A0E17] via-[#881326] to-[#4A0E17] border-t-2 border-rose-400/50 shadow-2xl blur-[1px]"></div>
              <div class="absolute bottom-0 w-[95%] h-12 rounded-full bg-black/80 blur-xl"></div>

              <!-- Product Arrangement across Pedestal -->
              <div class="relative z-10 w-full h-full flex items-center justify-center gap-2 sm:gap-3 px-2">
                
                <!-- 1. Premium Smartphone (iPhone 16 Pro) -->
                <div class="relative w-28 sm:w-36 h-56 sm:h-72 flex items-center justify-center -mr-4 z-20 transform hover:-translate-y-2 transition duration-300">
                  <img src="/assets/hero/iphone16.png" alt="iPhone 16 Pro" class="max-h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]" />
                </div>

                <!-- 2. Laptop (MacBook Air / Laptops) in background center -->
                <div class="relative w-44 sm:w-60 h-44 sm:h-60 flex items-center justify-center z-10 -mx-3 mb-4 transform hover:-translate-y-2 transition duration-300">
                  <img src="/assets/hero/ps5.png" alt="PlayStation 5" class="max-h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]" />
                </div>

                <!-- 3. Wireless Headphones (Bose / Sony) -->
                <div class="relative w-28 sm:w-36 h-48 sm:h-64 flex items-center justify-center -ml-4 z-20 transform hover:-translate-y-2 transition duration-300">
                  <img src="/assets/hero/dyson.png" alt="Dyson Airwrap" class="max-h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]" />
                </div>

                <!-- 4. Smartwatch (Apple Watch / Galaxy Watch) -->
                <div class="relative w-20 sm:w-28 h-36 sm:h-48 flex items-center justify-center -ml-6 z-30 mb-2 transform hover:-translate-y-2 transition duration-300">
                  <img src="/assets/hero/amazon_voucher.png" alt="Amazon Voucher" class="max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]" />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
`;

// Replace current hero section container with the new multi-product hero
const oldHeroContainer = html.match(/<!-- GiveXIndia Hero Banner[\s\S]*?<!-- ========================================== -->\s*<!-- SECTION 2: CATEGORIES/);
if (oldHeroContainer) {
  html = html.replace(oldHeroContainer[0], newHeroSection + '\n\n      <!-- ========================================== -->\n      <!-- SECTION 2: CATEGORIES');
  console.log('✓ Replaced hero slider with multi-gadget 3D pedestal showcase');
}

// -------------------------------------------------------------
// 5. TODAY'S FEATURED DEALS: EXACT 4 CARDS AS IN REFERENCE IMAGE
// -------------------------------------------------------------
// Reference image top 4 cards:
// 1. Apple iPhone 16 Pro Max (256 GB) | Amazon Verified | ₹1,34,999 (was ₹1,64,900) -18%
// 2. MacBook Air M4 (13-inch) | Flipkart Verified | ₹94,990 (was ₹1,21,900) -22%
// 3. Bose QuietComfort Ultra Headphones | Amazon Verified | ₹25,999 (was ₹39,999) -35%
// 4. PlayStation 5 Slim (Disc Edition) | Flipkart Verified | ₹43,990 (was ₹54,990) -20%

// Let's ensure DEALS_DATA items 1..4 have these exact details and stores:
html = html.replace(/title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones'[^}]*store: 'Amazon'[^}]*price: '₹26,990'/, "title: 'Apple iPhone 16 Pro Max (256 GB)', category: 'Smartphones', brand: 'Apple', store: 'Amazon Verified', price: '₹1,34,999', numeric_price: 134999, original: '₹1,64,900', discount: '-18%'");
html = html.replace(/title: 'Google Pixel 8 \(128GB, Hazel Display Flagship\)'[^}]*store: 'Flipkart'[^}]*price: '₹54,999'/, "title: 'MacBook Air M4 (13-inch)', category: 'Laptops', brand: 'Apple', store: 'Flipkart Verified', price: '₹94,990', numeric_price: 94990, original: '₹1,21,900', discount: '-22%'");
html = html.replace(/title: 'Samsung Galaxy Watch 6 Classic \(47mm Bluetooth\)'[^}]*store: 'Samsung'[^}]*price: '₹24,999'/, "title: 'Bose QuietComfort Ultra Headphones', category: 'Audio & Wearables', brand: 'Bose', store: 'Amazon Verified', price: '₹25,999', numeric_price: 25999, original: '₹39,999', discount: '-35%'");
html = html.replace(/title: 'Apple MacBook Air M4 \(16GB, 512GB Space Gray\)'[^}]*store: 'Amazon'[^}]*price: '₹1,19,900'/, "title: 'PlayStation 5 Slim (Disc Edition)', category: 'Gaming', brand: 'Sony', store: 'Flipkart Verified', price: '₹43,990', numeric_price: 43990, original: '₹54,990', discount: '-20%'");

// Update makeDealCard to render the clean white horizontal deal card style matching Image 1:
const referenceDealCardFn = `function makeDealCard(d) {
      const pNum = d.numeric_price || parseInt((d.price || '').replace(/[^0-9]/g,'')) || 0;
      const isRestricted = pNum >= 50000;
      const isLocked = isRestricted && currentUserRole !== 'vip';
      const isExpired = currentUserRole === 'expired';

      return \`
        <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer" onclick="openProductModal(\${d.id})">
          
          <div class="space-y-3">
            <!-- Top Row: Thumbnail + Title + Badge -->
            <div class="flex items-start justify-between gap-3">
              <div class="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center p-1 shrink-0 border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                <span class="text-3xl">\${d.icon}</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between gap-1">
                  <span class="text-[10px] font-bold text-slate-500 uppercase tracking-tight flex items-center gap-1">
                    <span>\${d.store.includes('Amazon') ? '📦' : '🛍️'}</span>
                    <span>\${d.store}</span>
                  </span>
                  <span class="bg-[#DC1F32] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm">
                    \${d.discount}
                  </span>
                </div>
                <h3 class="text-xs font-bold text-slate-900 line-clamp-2 mt-1 group-hover:text-[#DC1F32] transition">
                  \${d.title}
                </h3>
              </div>
            </div>

            <!-- Price and View Deal arrow -->
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div class="flex items-baseline gap-1.5 relative">
                <span class="text-base font-black text-[#DC1F32] \${isLocked ? 'blur-xs select-none' : ''}">\${d.price}</span>
                <span class="text-xs line-through text-slate-400 \${isLocked ? 'blur-xs select-none' : ''}">\${d.original}</span>
                \${isLocked ? \`<span class="absolute inset-0 flex items-center bg-white/70 text-[9px] font-black text-rose-700">VIP LOCKED 🔒</span>\` : ''}
              </div>

              <div class="w-7 h-7 rounded-full bg-rose-50 group-hover:bg-[#DC1F32] text-[#DC1F32] group-hover:text-white flex items-center justify-center text-xs font-black transition-colors duration-200">
                →
              </div>
            </div>
          </div>

        </div>
      \`;
    }`;

html = html.replace(/function makeDealCard\(d\) \{[\s\S]*?return `[\s\S]*?`;\s*\}/, referenceDealCardFn);
console.log('✓ Updated makeDealCard to render clean cards with red accents matching reference image');

// -------------------------------------------------------------
// 6. REAL WINNERS SECTION MATCHING IMAGE 1
// -------------------------------------------------------------
// Reference image shows:
// Header:
// Small pill: [🏆 REAL WINNERS]
// Title: 67 winners across 25 giveaways
// Subtitle: Latest: Rohan Sharma, iPhone 16 Pro Max (256 GB), November 2026.
// Cards:
// 1. [R] (Gold) | Rohan Sharma | iPhone 16 Pro Max (256 GB) | November 2026
// 2. [G] (Red) | Gagan Preet | iPhone 16 Pro Max | September 2026
// 3. [E] (Blue) | Ekambir Sandhu | 1st Prize: iPhone 16 / S25 | July 2026
// 4. [S] (Green) | Sukhjinder Singh | 1st Prize: iPhone 16 | June 2026
// 5. [A] (Purple) | Abha Talwar | iPhone 16 Pro | May 2026
// 6. [J] (Blue) | Jaydev Bhere | PlayStation 5 Slim | February 2026
// Dots indicator + [SEE EVERY WINNER →]

const newWinnersCards = `
        <!-- Horizontal Scrollable Winners Strip Matching Reference Image -->
        <div class="flex items-center gap-4 overflow-x-auto pb-6 pt-2 px-2 custom-scroll justify-start lg:justify-center">
          
          <!-- Winner 1 -->
          <div class="shrink-0 w-44 bg-[#3a0b14] rounded-3xl p-4 border border-rose-900/40 flex flex-col items-center text-center shadow-xl hover:-translate-y-1 transition duration-300">
            <div class="w-14 h-14 rounded-full bg-[#E68A00] text-white font-black text-xl flex items-center justify-center shadow-md mb-2">R</div>
            <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-[#420C15] text-[9px] font-black uppercase tracking-wider mb-1.5">WINNER</span>
            <h4 class="text-white font-black text-sm">Rohan Sharma</h4>
            <p class="text-amber-200 text-xs font-semibold mt-1">iPhone 16 Pro Max (256 GB)</p>
            <p class="text-white/40 text-[10px] mt-2">November 2026</p>
          </div>

          <!-- Winner 2 -->
          <div class="shrink-0 w-44 bg-[#3a0b14] rounded-3xl p-4 border border-rose-900/40 flex flex-col items-center text-center shadow-xl hover:-translate-y-1 transition duration-300">
            <div class="w-14 h-14 rounded-full bg-[#D42526] text-white font-black text-xl flex items-center justify-center shadow-md mb-2">G</div>
            <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-[#420C15] text-[9px] font-black uppercase tracking-wider mb-1.5">WINNER</span>
            <h4 class="text-white font-black text-sm">Gagan Preet</h4>
            <p class="text-amber-200 text-xs font-semibold mt-1">iPhone 16 Pro Max</p>
            <p class="text-white/40 text-[10px] mt-2">September 2026</p>
          </div>

          <!-- Winner 3 -->
          <div class="shrink-0 w-44 bg-[#3a0b14] rounded-3xl p-4 border border-rose-900/40 flex flex-col items-center text-center shadow-xl hover:-translate-y-1 transition duration-300">
            <div class="w-14 h-14 rounded-full bg-[#245DE8] text-white font-black text-xl flex items-center justify-center shadow-md mb-2">E</div>
            <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-[#420C15] text-[9px] font-black uppercase tracking-wider mb-1.5">WINNER</span>
            <h4 class="text-white font-black text-sm">Ekambir Sandhu</h4>
            <p class="text-amber-200 text-xs font-semibold mt-1">1st Prize: iPhone 16 / S25</p>
            <p class="text-white/40 text-[10px] mt-2">July 2026</p>
          </div>

          <!-- Winner 4 -->
          <div class="shrink-0 w-44 bg-[#3a0b14] rounded-3xl p-4 border border-rose-900/40 flex flex-col items-center text-center shadow-xl hover:-translate-y-1 transition duration-300">
            <div class="w-14 h-14 rounded-full bg-[#10B981] text-white font-black text-xl flex items-center justify-center shadow-md mb-2">S</div>
            <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-[#420C15] text-[9px] font-black uppercase tracking-wider mb-1.5">WINNER</span>
            <h4 class="text-white font-black text-sm">Sukhjinder Singh</h4>
            <p class="text-amber-200 text-xs font-semibold mt-1">1st Prize: iPhone 16</p>
            <p class="text-white/40 text-[10px] mt-2">June 2026</p>
          </div>

          <!-- Winner 5 -->
          <div class="shrink-0 w-44 bg-[#3a0b14] rounded-3xl p-4 border border-rose-900/40 flex flex-col items-center text-center shadow-xl hover:-translate-y-1 transition duration-300">
            <div class="w-14 h-14 rounded-full bg-[#8B5CF6] text-white font-black text-xl flex items-center justify-center shadow-md mb-2">A</div>
            <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-[#420C15] text-[9px] font-black uppercase tracking-wider mb-1.5">WINNER</span>
            <h4 class="text-white font-black text-sm">Abha Talwar</h4>
            <p class="text-amber-200 text-xs font-semibold mt-1">iPhone 16 Pro</p>
            <p class="text-white/40 text-[10px] mt-2">May 2026</p>
          </div>

          <!-- Winner 6 -->
          <div class="shrink-0 w-44 bg-[#3a0b14] rounded-3xl p-4 border border-rose-900/40 flex flex-col items-center text-center shadow-xl hover:-translate-y-1 transition duration-300">
            <div class="w-14 h-14 rounded-full bg-[#3B82F6] text-white font-black text-xl flex items-center justify-center shadow-md mb-2">J</div>
            <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-[#420C15] text-[9px] font-black uppercase tracking-wider mb-1.5">WINNER</span>
            <h4 class="text-white font-black text-sm">Jaydev Bhere</h4>
            <p class="text-amber-200 text-xs font-semibold mt-1">PlayStation 5 Slim</p>
            <p class="text-white/40 text-[10px] mt-2">February 2026</p>
          </div>

        </div>

        <!-- Carousel Indicators & See Every Winner link -->
        <div class="flex flex-col items-center justify-center gap-3 pt-2">
          <div class="flex items-center gap-1.5">
            <span class="w-6 h-1 rounded-full bg-amber-400"></span>
            <span class="w-2 h-1 rounded-full bg-white/20"></span>
            <span class="w-2 h-1 rounded-full bg-white/20"></span>
            <span class="w-2 h-1 rounded-full bg-white/20"></span>
          </div>
          <button onclick="navigate('luckydip')" class="text-xs font-black text-amber-300 hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition">
            <span>SEE EVERY WINNER</span>
            <span>→</span>
          </button>
        </div>
`;

// Replace current winners cards with exact 6 cards from reference image
const oldWinnersCarousel = html.match(/<!-- Horizontal Scrollable Winners Strip[\s\S]*?<\/section>/);
if (oldWinnersCarousel) {
  html = html.replace(oldWinnersCarousel[0], newWinnersCards + '\n      </section>');
  console.log('✓ Updated Real Winners section to match 6 reference winner cards');
}

// -------------------------------------------------------------
// 7. VIP SUBSCRIPTION PRICING SECTION (Clean White Background)
// -------------------------------------------------------------
// Heading: [ONE STOP VIP]
// Title: Simple, Transparent VIP Pricing
// Subtitle: Unlock members-only secret voucher links, extra merchant cashback, and instant price alerts.
// Card 1: Monthly Access | ₹299/month | Outline Red Button: Subscribe Monthly
// Card 2: 6-Month Pass | MOST POPULAR • 33% OFF | ₹1,199/6 mo (~₹199/mo) | Solid Red Button: Get 6-Month Pass
// Card 3: Annual Pass | ₹1,799/year (~₹149/mo) | Outline Red Button: Subscribe Annual Pass

// -------------------------------------------------------------
// 8. SUBSCRIPTION & LUCKY DIP FLOW LOGIC
// -------------------------------------------------------------
// When free user clicks Lucky Dip, display popup: "Purchase a VIP Pass to Participate in Lucky Dip"
const newNavHandlers = `
// Lucky Dip Navbar Click Handler
function handleLuckyDipNavClick() {
  if (currentUserRole !== 'vip') {
    // Show mandatory VIP Pass requirement modal
    openLuckyDipVipPromptModal();
  } else {
    // User is active VIP, proceed to Lucky Dip page
    navigate('luckydip');
  }
}

function openLuckyDipVipPromptModal() {
  const modal = document.getElementById('luckydip-prompt-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeLuckyDipVipPromptModal() {
  const modal = document.getElementById('luckydip-prompt-modal');
  if (modal) modal.classList.add('hidden');
}
`;

// Inject Lucky Dip VIP Prompt Modal HTML right before </body>
const luckyDipPromptModalHtml = `
<!-- Purchase VIP Pass to Participate in Lucky Dip Modal (Prompt Requirement) -->
<div id="luckydip-prompt-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
  <div class="bg-gradient-to-b from-[#2A060C] to-[#140205] border-2 border-[#DC1F32] rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl text-white relative max-h-[92vh] overflow-y-auto custom-scroll text-center space-y-5">
    <button onclick="closeLuckyDipVipPromptModal()" class="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-bold transition">✕</button>

    <div class="w-16 h-16 rounded-full bg-[#DC1F32] text-white flex items-center justify-center mx-auto text-3xl shadow-lg ring-4 ring-amber-400/40">
      🎁
    </div>

    <div class="space-y-2">
      <span class="bg-[#DC1F32] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">VIP MEMBERSHIP REQUIRED</span>
      <h3 class="text-2xl sm:text-3xl font-black text-white">Purchase a VIP Pass to Participate in Lucky Dip</h3>
      <p class="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
        Weekly Lucky Dip draws are exclusive to active VIP subscribers. Choose a pass below to unlock instant draw entries and secret deals!
      </p>
    </div>

    <!-- 3 Synchronized Plans with Subscribe Now button -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
      
      <!-- Monthly -->
      <div onclick="selectModalPlan('Monthly', 299, this)" class="modal-plan-card cursor-pointer bg-white/10 hover:bg-white/15 border-2 border-white/20 p-4 rounded-2xl flex flex-col justify-between transition">
        <div>
          <div class="text-xs font-black text-amber-300 uppercase">Monthly VIP</div>
          <div class="text-xl font-black text-white mt-1">₹299</div>
          <div class="text-[10px] text-white/60">Billed monthly</div>
        </div>
        <div class="mt-3 text-[10px] text-white/80 space-y-1">
          <div>✓ <strong>1x entry</strong> / draw</div>
          <div>✓ Deals directory</div>
        </div>
      </div>

      <!-- 6-Month Pass -->
      <div onclick="selectModalPlan('6-Month Pass', 1199, this)" class="modal-plan-card selected-plan cursor-pointer bg-white/15 border-2 border-[#DC1F32] p-4 rounded-2xl flex flex-col justify-between transition relative shadow-lg">
        <span class="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#DC1F32] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">POPULAR</span>
        <div>
          <div class="text-xs font-black text-amber-300 uppercase">6-Month VIP</div>
          <div class="text-xl font-black text-white mt-1">₹1,199</div>
          <div class="text-[10px] text-white/60">~₹199 / month</div>
        </div>
        <div class="mt-3 text-[10px] text-white/90 space-y-1 font-medium">
          <div>✓ <strong>2x entries</strong> / draw</div>
          <div>✓ Secret vouchers</div>
        </div>
      </div>

      <!-- Annual Pass -->
      <div onclick="selectModalPlan('Annual Pass', 1799, this)" class="modal-plan-card cursor-pointer bg-white/10 hover:bg-white/15 border-2 border-white/20 p-4 rounded-2xl flex flex-col justify-between transition">
        <div>
          <div class="text-xs font-black text-amber-300 uppercase">Annual VIP</div>
          <div class="text-xl font-black text-white mt-1">₹1,799</div>
          <div class="text-[10px] text-white/60">~₹149 / month</div>
        </div>
        <div class="mt-3 text-[10px] text-white/80 space-y-1">
          <div>✓ <strong>3x entries</strong> / draw</div>
          <div>✓ Price drop alerts</div>
        </div>
      </div>

    </div>

    <div class="pt-2">
      <button onclick="closeLuckyDipVipPromptModal(); openSubscribeModal();" class="w-full py-3.5 rounded-full bg-[#DC1F32] hover:bg-[#b01625] text-white font-black text-sm uppercase tracking-wider shadow-xl transition">
        Subscribe Now ➔
      </button>
    </div>

  </div>
</div>
`;

if (!html.includes('id="luckydip-prompt-modal"')) {
  html = html.replace('</body>', `${luckyDipPromptModalHtml}\n</body>`);
  console.log('✓ Added Lucky Dip VIP Prompt Modal');
}

if (!html.includes('handleLuckyDipNavClick')) {
  html = html.replace('</script>\n</body>', `${newNavHandlers}\n</script>\n</body>`);
  console.log('✓ Added handleLuckyDipNavClick logic');
}

fs.writeFileSync(targetPath, html, 'utf8');
fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
console.log('✅ Applied full alignment matching reference image!');
