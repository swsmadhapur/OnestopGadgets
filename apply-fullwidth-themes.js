const fs = require('fs');
const path = require('path');

const protoPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(protoPath, 'utf8');

console.log('Original size:', html.length);

// 1. ADD CSS FOR INFINITE HORIZONTAL MARQUEE & SECTION THEMES
const styleClose = html.indexOf('</style>');
if (styleClose !== -1) {
  const customCSS = `
/* Infinite Horizontal Marquee for Brands */
@keyframes marqueeLeft {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
@keyframes marqueeRight {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}

.animate-marquee-left {
  display: flex;
  width: max-content;
  animation: marqueeLeft 22s linear infinite;
}
.animate-marquee-left:hover {
  animation-play-state: paused;
}

.animate-marquee-right {
  display: flex;
  width: max-content;
  animation: marqueeRight 25s linear infinite;
}
.animate-marquee-right:hover {
  animation-play-state: paused;
}

/* Full Width Section Wrappers (No Box Container) */
.full-width-section {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding-left: clamp(1rem, 5vw, 4rem);
  padding-right: clamp(1rem, 5vw, 4rem);
}
`;
  html = html.substring(0, styleClose) + customCSS + '\n' + html.substring(styleClose);
  console.log('✅ Injected infinite marquee & full-width CSS');
}

// 2. UNBOX HERO SLIDER CONTAINER (FULL WIDTH, NO BOXED BORDER/ROUNDED CONTAINER)
// Replace:
// <div id="hero-slider-container" class="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 min-h-[560px] sm:min-h-[620px] flex items-center" style="background: radial-gradient(circle at 65% 50%, #681827 0%, #4D101C 45%, #350A13 100%);">
html = html.replace(
  /<div id="hero-slider-container" class="[^"]*" style="[^"]*">/g,
  `<div id="hero-slider-container" class="full-width-section relative overflow-hidden py-12 sm:py-16 min-h-[560px] sm:min-h-[620px] flex items-center shadow-2xl" style="background: radial-gradient(circle at 65% 50%, #681827 0%, #4D101C 45%, #350A13 100%);">`
);
console.log('✅ Unboxed hero section to full width with side spacing');

// 3. REBUILD MEMBERSHIP SECTION (FULL WIDTH, NO BOXED CONTAINER, DUAL-ROW INFINITE HORIZONTAL MARQUEE)
// Target from <section id="membership-section" ... to </section>
const memStart = html.indexOf('<section id="membership-section"');
const winStart = html.indexOf('<section id="winners-section"');

if (memStart !== -1 && winStart !== -1) {
  // Brand items for dual rows
  const row1Brands = ['Apple', 'Sony', 'PlayStation', 'Dyson', 'Samsung', 'Nike', 'Myntra', 'Asus', 'JBL', 'Lenovo'];
  const row2Brands = ['Amazon', 'H&M', 'Oppo', 'Ajio', 'boAt', 'Puma', 'Realme', 'Noise', 'Dell', 'Crocs'];

  const makeMarqueeRow = (brands, animClass) => {
    // Duplicate 2x for seamless continuous loop
    const doubleBrands = [...brands, ...brands];
    const pills = doubleBrands.map(b => `
      <div class="inline-flex items-center justify-center bg-white/95 hover:bg-white text-slate-900 font-extrabold text-sm sm:text-base py-3 px-6 rounded-2xl shadow-md border border-white/40 tracking-tight shrink-0 select-none hover:scale-105 transition-all duration-200">
        ${b}
      </div>
    `).join('');

    return `
      <div class="overflow-hidden w-full relative py-1.5">
        <div class="${animClass} gap-3">
          ${pills}
        </div>
      </div>
    `;
  };

  const newMembershipHtml = `
      <!-- ========================================== -->
      <!-- SECTION 2: MEMBERSHIP & LIVE DEALS (FULL WIDTH - NO BOX CONTAINER) -->
      <!-- ========================================== -->
      <section id="membership-section" class="full-width-section relative py-16 sm:py-20 shadow-2xl" style="background: #400a14;">
        
        <!-- Subtle Ambient Glow -->
        <div class="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-red-600/15 blur-3xl pointer-events-none"></div>
        <div class="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <!-- LEFT: Headline, Description, Subscription CTAs & Winners Info -->
          <div class="lg:col-span-6 space-y-6 text-left">
            
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-amber-300 shadow-sm">
              <span>★ ONE STOP GADGETS MEMBERSHIP</span>
            </div>

            <h2 class="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
              1,500+ live member deals<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-white">from 100+ brands.</span>
            </h2>

            <p class="text-white/85 text-base sm:text-lg leading-relaxed max-w-xl">
              Member-only deals and coupon codes from top tech brands you love, plus a free entry in every weekly VIP Giveaway while your subscription plan is active.
            </p>

            <!-- VIP Gadget Pass Promo badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white font-medium shadow-sm">
              <span class="text-amber-400 text-base">⚡</span>
              <span><strong>VIP Gadget Pass:</strong> Extra 10% off + free insured priority delivery for members</span>
            </div>

            <!-- CTAs with Subscription Link -->
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a href="#subscribe-modal" onclick="openSubscribeModal(event)" class="relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-[#D42526] via-[#B91C1C] to-[#991422] text-white font-black text-sm uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group border border-white/30">
                <span class="text-white font-extrabold">Join VIP Membership</span>
                <span class="text-white font-bold transform group-hover:translate-x-1 transition">→</span>
                <span class="absolute inset-0 w-1/3 h-full bg-white/25 animate-shine pointer-events-none"></span>
              </a>

              <button onclick="navigate('catalog')" class="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-extrabold text-sm uppercase tracking-wider transition hover:scale-105">
                See the deals
              </button>
            </div>

            <p class="text-xs text-white/60">No purchase needed to browse. Cancel subscription anytime.</p>

            <!-- Published Winners Summary Badge -->
            <div class="bg-black/30 backdrop-blur-md border border-white/15 rounded-2xl p-4 max-w-md flex items-center gap-3.5 shadow-xl">
              <div class="flex -space-x-2 overflow-hidden shrink-0">
                <span class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-amber-500 text-white font-black text-xs ring-2 ring-[#400a14] shadow-sm">R</span>
                <span class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-500 text-white font-black text-xs ring-2 ring-[#400a14] shadow-sm">G</span>
                <span class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-rose-500 text-white font-black text-xs ring-2 ring-[#400a14] shadow-sm">S</span>
                <span class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500 text-white font-black text-xs ring-2 ring-[#400a14] shadow-sm">A</span>
              </div>
              <div class="text-xs">
                <p class="font-black text-white text-sm">67 published winners across 25 giveaways</p>
                <p class="text-white/70 text-xs">Latest iPhone winner: Rohan S., iPhone 16 Pro Max</p>
              </div>
            </div>

          </div>

          <!-- RIGHT: Brands Card with Infinite Horizontal Scroll View Animation (Fixed Container) -->
          <div class="lg:col-span-6 flex justify-center lg:justify-end">
            <div class="w-full max-w-lg bg-[#27050b]/90 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              
              <div class="flex items-center justify-between pb-5 border-b border-white/15">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <span class="text-xs font-black tracking-widest text-white/95 uppercase">ONE STOP GADGETS</span>
                </div>
                <span class="text-[11px] font-extrabold text-amber-300 uppercase tracking-wider">MEMBER PERKS</span>
              </div>

              <!-- INFINITE HORIZONTAL SCROLLING BRANDS (Row 1 Left, Row 2 Right) -->
              <div class="py-6 space-y-3 relative overflow-hidden">
                <!-- Fade Gradients at Edges of Brands Container -->
                <div class="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#27050b] to-transparent z-10 pointer-events-none"></div>
                <div class="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#27050b] to-transparent z-10 pointer-events-none"></div>

                ${makeMarqueeRow(row1Brands, 'animate-marquee-left')}
                ${makeMarqueeRow(row2Brands, 'animate-marquee-right')}
              </div>

              <!-- Live Stats Counter -->
              <div class="pt-6 border-t border-white/15 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div class="text-2xl sm:text-3xl font-black text-white">1,547</div>
                  <div class="text-xs font-bold text-white/70">live deals</div>
                </div>
                <div>
                  <div class="text-2xl sm:text-3xl font-black text-white">135</div>
                  <div class="text-xs font-bold text-white/70">brands</div>
                </div>
                <div>
                  <div class="text-2xl sm:text-3xl font-black text-white">67</div>
                  <div class="text-xs font-bold text-white/70">winners</div>
                </div>
              </div>

              <p class="text-[11px] text-white/50 text-center pt-4">Brand names and logos belong to their respective owners. Not affiliated.</p>
            </div>
          </div>

        </div>

      </section>
`;

  html = html.substring(0, memStart) + newMembershipHtml + '\n' + html.substring(winStart);
  console.log('✅ Replaced membership section with full-width & marquee animation');
}

// 4. STYLE WINNERS SECTION (MILKY WHITE FULL-WIDTH THEME WITH CLEAR CONTRAST)
// Find <section id="winners-section" ... to </section>
const winStart2 = html.indexOf('<section id="winners-section"');
const catStart2 = html.indexOf('<!-- Categories Section with Premium UI Cards -->');

if (winStart2 !== -1 && catStart2 !== -1) {
  const winContent = html.substring(winStart2, catStart2);
  
  // Replace the wrapper to be full-width milky white
  let updatedWinContent = winContent.replace(
    /<section id="winners-section" class="[^"]*">/,
    `<section id="winners-section" class="full-width-section relative py-16 sm:py-20 text-center shadow-xl border-y border-slate-200" style="background: #F8F9FA;">`
  );

  // Update text colors for dark on milky white
  updatedWinContent = updatedWinContent.replace(
    /text-3xl sm:text-4xl lg:text-5xl font-black text-white/g,
    'text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900'
  );
  updatedWinContent = updatedWinContent.replace(
    /text-white\/70 text-sm max-w-xl/g,
    'text-slate-600 font-medium text-sm sm:text-base max-w-xl'
  );
  updatedWinContent = updatedWinContent.replace(
    /<span class="text-white font-bold">Rohan Sharma<\/span>/g,
    '<span class="text-slate-900 font-extrabold">Rohan Sharma</span>'
  );
  updatedWinContent = updatedWinContent.replace(
    /text-amber-400 font-extrabold text-xs/g,
    'text-[#D42526] font-black text-xs'
  );
  updatedWinContent = updatedWinContent.replace(
    /text-amber-300 hover:text-white uppercase/g,
    'text-[#D42526] hover:text-[#991422] font-black uppercase'
  );

  // Update winner cards for milky white background: rich crimson cards with crisp white text
  updatedWinContent = updatedWinContent.replace(
    /bg-\[#420C15\]\s+rounded-3xl/g,
    'bg-[#400a14] rounded-3xl border border-rose-900/30 shadow-2xl'
  );

  html = html.substring(0, winStart2) + updatedWinContent + html.substring(catStart2);
  console.log('✅ Updated winners section to milky white background with clear text');
}

// 5. STYLE CATEGORIES & DEALS SECTION (#400a14 FULL WIDTH THEME)
const catStart3 = html.indexOf('<!-- Categories Section with Premium UI Cards -->');
const vipStart3 = html.indexOf('<!-- ==================== HOME PAGE VIP PRICING SECTION');

if (catStart3 !== -1 && vipStart3 !== -1) {
  const catAndDeals = html.substring(catStart3, vipStart3);

  // Wrap Categories, Deals, Lucky Dip and Consented Winners in a full-width #400a14 section
  const wrappedCatDeals = `
      <!-- ========================================== -->
      <!-- SECTION 4: CATEGORIES & DEALS (FULL WIDTH - #400a14) -->
      <!-- ========================================== -->
      <section class="full-width-section relative py-16 sm:py-20 shadow-2xl" style="background: #400a14;">
        <div class="max-w-7xl mx-auto space-y-12">
          ${catAndDeals}
        </div>
      </section>
  `;

  html = html.substring(0, catStart3) + wrappedCatDeals + html.substring(vipStart3);
  console.log('✅ Wrapped Categories & Deals in full-width #400a14 theme');
}

// 6. STYLE VIP PRICING SECTION (MILKY WHITE FULL-WIDTH THEME)
const vipStart4 = html.indexOf('<!-- ==================== HOME PAGE VIP PRICING SECTION');
const sfEnd4 = html.indexOf('</section>\n\n    <!-- ==================== SCREEN 2: ALL DEALS CATALOG');

if (vipStart4 !== -1 && sfEnd4 !== -1) {
  const vipContent = html.substring(vipStart4, sfEnd4);

  // Replace wrapper & colors to be full-width milky white
  let updatedVip = vipContent.replace(
    /<div id="vip-pricing-section" class="[^"]*">/,
    `<div id="vip-pricing-section" class="full-width-section relative py-16 sm:py-20 shadow-xl border-t border-slate-200" style="background: #F8F9FA;">
        <div class="max-w-7xl mx-auto space-y-8">`
  );

  // Add closing div for max-w-7xl before end of vip section
  updatedVip = updatedVip.replace(
    /<\/div>\s*<\/div>\s*$/,
    '</div></div></div>'
  );

  // Change heading text to dark for visibility
  updatedVip = updatedVip.replace(
    /text-3xl sm:text-4xl font-extrabold text-white/g,
    'text-3xl sm:text-4xl font-black text-slate-900'
  );
  updatedVip = updatedVip.replace(
    /text-xs text-slate-600 leading-relaxed/g,
    'text-sm text-slate-600 font-medium leading-relaxed'
  );

  html = html.substring(0, vipStart4) + updatedVip + html.substring(sfEnd4);
  console.log('✅ Updated VIP Pricing section to milky white theme');
}

// 7. ENSURE MAIN CONTAINER HAS OVERFLOW HIDDEN SO FULL-WIDTH SECTIONS DON'T CREATE HORIZONTAL SCROLLBAR
html = html.replace(
  /<body class="min-h-screen flex flex-col antialiased">/,
  '<body class="min-h-screen flex flex-col antialiased overflow-x-hidden">'
);
html = html.replace(
  /<main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">/,
  '<main class="flex-1 w-full py-0 space-y-0 overflow-x-hidden">'
);
html = html.replace(
  /id="screen-storefront" class="screen-view space-y-10">/,
  'id="screen-storefront" class="screen-view space-y-0">'
);

// Save updated prototype
fs.writeFileSync(protoPath, html, 'utf8');
console.log('✅ Saved updated prototype. New size:', html.length);
