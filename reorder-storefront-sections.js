const fs = require('fs');
const path = require('path');

const protoPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(protoPath, 'utf8');

console.log('Original prototype size:', html.length);

// =========================================================================
// 1. HERO SECTION: REMOVE EXTRA SPACE & TIGHTEN PADDING
// =========================================================================
// Change py-12 sm:py-16 to py-6 sm:py-8, min-h-[560px] to min-h-[480px], and grid py-10 to py-4
html = html.replace(
  /<div id="hero-slider-container" class="full-width-section relative overflow-hidden py-12 sm:py-16 min-h-\[560px\] sm:min-h-\[620px\] flex items-center shadow-2xl"/,
  '<div id="hero-slider-container" class="full-width-section relative overflow-hidden py-6 sm:py-8 min-h-[480px] sm:min-h-[520px] flex items-center shadow-2xl"'
);

html = html.replace(
  /<div class="relative z-10 w-full px-6 sm:px-14 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">/,
  '<div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">'
);

// In renderHeroCard, tighten heights slightly:
html = html.replace(
  /min-h-\[460px\]\s+sm:min-h-\[540px\]\s+lg:min-h-\[580px\]/g,
  'min-h-[400px] sm:min-h-[460px] lg:min-h-[480px]'
);
html = html.replace(
  /h-\[420px\]\s+sm:h-\[500px\]\s+lg:h-\[540px\]/g,
  'h-[380px] sm:h-[440px] lg:h-[460px]'
);
html = html.replace(
  /min-height:\s*560px;/g,
  'min-height: 460px;'
);
console.log('✅ 1. Tightened hero section padding and removed excess vertical space');

// =========================================================================
// 2. EXTRACT EXISTING SECTIONS TO REORGANIZE CLEANLY
// =========================================================================
// Find sections:
const memStart = html.indexOf('<section id="membership-section"');
const winStart = html.indexOf('<section id="winners-section"');
const blueSecStart = html.indexOf('<!-- SECTION 4: CATEGORIES & DEALS');
const vipSecStart = html.indexOf('<!-- ==================== HOME PAGE VIP PRICING SECTION');
const sfEnd = html.indexOf('</section>\n\n    <!-- ==================== SCREEN 2: ALL DEALS CATALOG');

// A. Extract Winners section
const winEnd = html.indexOf('</section>', winStart) + 10;
const winnersSectionHtml = html.substring(winStart, winEnd);

// B. Extract Categories & Deals section internals
const catHeader = html.indexOf('<!-- Categories Section with Premium UI Cards -->');
const dealsHeader = html.indexOf('<!-- Today\'s Deals Grid -->');
const ldHeader = html.indexOf('<!-- Lucky Dip Spotlight');
const recentHeader = html.indexOf('<!-- Recent Consented Winners Wall');
const blueSecEnd = html.indexOf('</section>', blueSecStart) + 10;

// Categories HTML
const categoriesHtml = html.substring(catHeader, dealsHeader);
// Deals HTML
const dealsHtml = html.substring(dealsHeader, ldHeader);
// Lucky Dip HTML
const luckyDipHtml = html.substring(ldHeader, recentHeader);

// C. Extract VIP Pricing HTML
const vipSectionHtml = html.substring(vipSecStart, sfEnd);

// =========================================================================
// 3. REASSEMBLE STOREFRONT SECTIONS IN USER'S REQUIRED ORDER:
// Section 1: Hero Banner (Already at top)
// Section 2: Gadget Categories (#2664eb Full Width)
// Section 3: Today's Featured Deals & Lucky Dip Spotlight (Image 1, #2664eb Full Width, unboxed)
// Section 4: Real Winners Carousel (Full Width, #561320)
// Section 5: VIP Club Pricing Plans (Full Width, Milky White #F8F9FA)
// (Note: Removed 2nd image "Recent Verified Winners" box wall and old membership block per prompt)
// =========================================================================

const newHomeSections = `
      <!-- ========================================== -->
      <!-- SECTION 2: FEATURED GADGET CATEGORIES (FULL WIDTH - #2664eb) -->
      <!-- ========================================== -->
      <section id="categories-section" class="full-width-section relative py-12 sm:py-16 shadow-xl border-y border-blue-400/20" style="background: #2664eb;">
        <div class="max-w-7xl mx-auto space-y-6">
          ${categoriesHtml}
        </div>
      </section>

      <!-- ========================================== -->
      <!-- SECTION 3: TODAY'S FEATURED DEALS & WEEKLY GIVEAWAY (IMAGE 1 STYLE, FULL WIDTH - #2664eb) -->
      <!-- ========================================== -->
      <section id="deals-showcase-section" class="full-width-section relative py-12 sm:py-16 shadow-xl border-b border-blue-400/20" style="background: #2664eb;">
        <div class="max-w-7xl mx-auto space-y-10">
          ${dealsHtml}
          ${luckyDipHtml}
        </div>
      </section>

      <!-- ========================================== -->
      <!-- SECTION 4: REAL WINNERS CAROUSEL (FULL WIDTH - #561320) -->
      <!-- ========================================== -->
      ${winnersSectionHtml}

      <!-- ========================================== -->
      <!-- SECTION 5: VIP PRICING PLANS (FULL WIDTH - MILKY WHITE #F8F9FA) -->
      <!-- ========================================== -->
      <div id="vip-pricing-section" class="full-width-section relative py-16 sm:py-20 shadow-xl border-t border-slate-200" style="background: #F8F9FA;">
        <div class="max-w-7xl mx-auto space-y-8">
          <div class="text-center max-w-xl mx-auto space-y-2">
            <span class="bg-[#D42526] text-white text-[10px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">ONE STOP VIP</span>
            <h2 class="text-3xl sm:text-4xl font-black text-slate-900">Simple, Transparent VIP Pricing</h2>
            <p class="text-sm text-slate-600 font-medium leading-relaxed">Unlock members-only secret voucher links, extra merchant cashback, and instant price alerts.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch pt-2">
            <!-- Monthly Access Card -->
            <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-md hover:shadow-xl transition flex flex-col justify-between">
              <div>
                <h3 class="font-extrabold text-base text-slate-900">Monthly Access</h3>
                <div class="text-xs text-slate-500 mt-0.5">Flexible month-to-month access</div>
                <div class="my-5 flex items-baseline gap-1">
                  <span class="text-3xl font-extrabold text-[#D42526]">₹299</span>
                  <span class="text-xs text-slate-500 font-medium">/ month</span>
                </div>
                <ul class="text-xs space-y-2.5 text-slate-700">
                  <li class="flex items-center gap-2"><span class="text-emerald-500 font-bold">✓</span> Full Deals Directory access</li>
                  <li class="flex items-center gap-2"><span class="text-emerald-500 font-bold">✓</span> 1x Weekly VIP Lucky Dip ticket</li>
                  <li class="flex items-center gap-2"><span class="text-emerald-500 font-bold">✓</span> Instant Telegram deal drops</li>
                </ul>
              </div>
              <button onclick="handleSubscribe('Monthly Plan - ₹299')" class="w-full mt-6 py-2.5 rounded-xl border-2 border-[#D42526] text-[#D42526] hover:bg-[#D42526] hover:text-white font-extrabold text-xs shadow-xs transition-all duration-200">
                Subscribe Monthly
              </button>
            </div>

            <!-- 6-Month Pass (Featured) -->
            <div class="bg-white rounded-3xl border-2 border-[#D42526] p-6 sm:p-7 shadow-xl hover:shadow-2xl transition flex flex-col justify-between relative transform lg:-translate-y-2">
              <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D42526] text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                MOST POPULAR • 33% OFF
              </span>
              <div>
                <h3 class="font-extrabold text-base text-slate-900">6-Month Pass</h3>
                <div class="text-xs text-slate-500 mt-0.5">Billed every 6 months</div>
                <div class="my-5 flex items-baseline gap-1">
                  <span class="text-3xl font-extrabold text-[#D42526]">₹1,199</span>
                  <span class="text-xs text-slate-500 font-medium">/ 6 mo (~₹199/mo)</span>
                </div>
                <ul class="text-xs space-y-2.5 text-slate-700">
                  <li class="flex items-center gap-2"><span class="text-emerald-500 font-bold">✓</span> Everything in Monthly</li>
                  <li class="flex items-center gap-2"><span class="text-emerald-500 font-bold">✓</span> <strong>2x Lucky Dip entries</strong> / draw</li>
                  <li class="flex items-center gap-2"><span class="text-emerald-500 font-bold">✓</span> VIP-only secret voucher links</li>
                  <li class="flex items-center gap-2"><span class="text-emerald-500 font-bold">✓</span> Early access to flash sales</li>
                </ul>
              </div>
              <button onclick="handleSubscribe('6-Month Plan - ₹1,199')" class="w-full mt-6 py-3 rounded-xl bg-[#D42526] hover:bg-[#B91C1C] text-white font-extrabold text-xs shadow-md transition-all duration-200">
                Get 6-Month Pass
              </button>
            </div>

            <!-- Annual Pass Card -->
            <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-md hover:shadow-xl transition flex flex-col justify-between">
              <div>
                <h3 class="font-extrabold text-base text-slate-900">Annual Pass</h3>
                <div class="text-xs text-slate-500 mt-0.5">Maximum value for avid shoppers</div>
                <div class="my-5 flex items-baseline gap-1">
                  <span class="text-3xl font-extrabold text-[#D42526]">₹1,799</span>
                  <span class="text-xs text-slate-500 font-medium">/ year (~₹149/mo)</span>
                </div>
                <ul class="text-xs space-y-2.5 text-slate-700">
                  <li class="flex items-center gap-2"><span class="text-emerald-500 font-bold">✓</span> Everything in 6-Month</li>
                  <li class="flex items-center gap-2"><span class="text-emerald-500 font-bold">✓</span> <strong>3x Lucky Dip entries</strong> / draw</li>
                  <li class="flex items-center gap-2"><span class="text-emerald-500 font-bold">✓</span> Dedicated WhatsApp concierge</li>
                  <li class="flex items-center gap-2"><span class="text-emerald-500 font-bold">✓</span> Price drop guarantee alerts</li>
                </ul>
              </div>
              <button onclick="handleSubscribe('Annual Plan - ₹1,799')" class="w-full mt-6 py-2.5 rounded-xl border-2 border-[#D42526] text-[#D42526] hover:bg-[#D42526] hover:text-white font-extrabold text-xs shadow-xs transition-all duration-200">
                Subscribe Annual Pass
              </button>
            </div>
          </div>
        </div>
      </div>
`;

// Replace from memStart up to sfEnd with newHomeSections
html = html.substring(0, memStart) + newHomeSections + '\n' + html.substring(sfEnd);
console.log('✅ Reordered all storefront sections into clean 5-section sequence');

// Save prototype
fs.writeFileSync(protoPath, html, 'utf8');
console.log('✅ Saved updated prototype! New length:', html.length);
