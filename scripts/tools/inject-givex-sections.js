const fs = require('fs');
const path = require('path');

const protoPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(protoPath, 'utf8');

console.log('Initial length:', html.length);

// 1. INCREASE HERO IMAGE & SHOWCASE SIZES
// In renderHeroCard:
html = html.replace(
  /min-h-\[360px\]\s+sm:min-h-\[420px\]/g,
  'min-h-[460px] sm:min-h-[540px] lg:min-h-[580px]'
);
html = html.replace(
  /h-\[340px\]\s+sm:h-\[400px\]/g,
  'h-[420px] sm:h-[500px] lg:h-[540px]'
);
html = html.replace(
  /min-height:\s*460px;/g,
  'min-height: 560px;'
);
html = html.replace(
  /min-h-\[500px\]\s+sm:min-h-\[540px\]/g,
  'min-h-[560px] sm:min-h-[620px]'
);
html = html.replace(
  /max-w-2xl\s+flex\s+flex-col/g,
  'max-w-3xl flex flex-col'
);
html = html.replace(
  /w-60\s+sm:w-80\s+h-10\s+rounded-full\s+bg-black\/60/g,
  'w-72 sm:w-96 h-12 rounded-full bg-black/70'
);

console.log('✅ Increased hero showcase & image dimensions');

// 2. BUILD SECTION 2 (MEMBERSHIP & BRANDS) AND SECTION 3 (REAL WINNERS)
const brandList = [
  'Myntra', 'H&M', 'Oppo', 'Asus', 'Nike',
  'Ajio', 'Acer', 'JBL', 'Plum', 'Samsung',
  'Nykaa', 'boAt', 'Lenovo', 'Crocs', 'Sony',
  'Puma', 'Realme', 'Noise', 'Dell', 'Apple'
];

const brandCardsHtml = brandList.map(b => `
  <div class="bg-white/95 text-slate-800 font-extrabold text-sm sm:text-base py-3 px-5 rounded-2xl shadow-md flex items-center justify-center tracking-tight border border-white/50 hover:scale-105 transition duration-300 select-none">
    ${b}
  </div>
`).join('');

const winnersData = [
  { name: 'Rohan Sharma', initial: 'R', prize: 'iPhone 16 Pro Max (256 GB)', date: 'November 2026', color: 'from-amber-500 to-amber-700' },
  { name: 'Gagan Preet', initial: 'G', prize: 'iPhone 16 Pro Max', date: 'September 2026', color: 'from-rose-500 to-rose-700' },
  { name: 'Ekambir Sandhu', initial: 'E', prize: '1st Prize: iPhone 16 / S25', date: 'July 2026', color: 'from-indigo-500 to-indigo-700' },
  { name: 'Sukhjinder Singh', initial: 'S', prize: '1st Prize: iPhone 16', date: 'June 2026', color: 'from-emerald-500 to-emerald-700' },
  { name: 'Abha Talwar', initial: 'A', prize: 'iPhone 16 Pro', date: 'May 2026', color: 'from-purple-500 to-purple-700' },
  { name: 'Jaydev Bhere', initial: 'J', prize: 'PlayStation 5 Slim', date: 'February 2026', color: 'from-blue-500 to-blue-700' }
];

const winnersCardsHtml = winnersData.map(w => `
  <div class="deal-card-premium shrink-0 w-44 sm:w-48 bg-[#420C15] rounded-3xl p-3 border border-white/15 flex flex-col items-center text-center shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
    <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
    
    <!-- Avatar / Initial Badge -->
    <div class="relative w-14 h-14 rounded-full bg-gradient-to-tr ${w.color} border-2 border-amber-300 flex items-center justify-center text-white font-black text-xl shadow-lg mt-2 mb-2 group-hover:scale-110 transition duration-300">
      ${w.initial}
      <span class="absolute -bottom-1 -right-1 bg-amber-400 text-[#420C15] rounded-full p-0.5 text-[10px]">👑</span>
    </div>

    <!-- Trophy / Winner pill -->
    <span class="inline-block px-2.5 py-0.5 rounded-full bg-amber-400 text-[#420C15] text-[9px] font-black uppercase tracking-wider mb-2">
      WINNER
    </span>

    <!-- Winner Name -->
    <h4 class="text-white font-black text-sm tracking-tight">${w.name}</h4>

    <!-- Prize Won -->
    <p class="text-amber-200/90 text-xs font-semibold mt-1 leading-snug">${w.prize}</p>

    <!-- Date -->
    <p class="text-white/40 text-[10px] font-medium mt-2">${w.date}</p>
  </div>
`).join('');

const additionalSectionsHtml = `
      <!-- ========================================== -->
      <!-- SECTION 2: GIVEX MEMBERSHIP / LIVE MEMBER DEALS (Matching User Image 2) -->
      <!-- ========================================== -->
      <section id="membership-section" class="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-6 sm:p-10 lg:p-12 my-10" style="background: radial-gradient(circle at 75% 50%, #56121F 0%, #3D0913 50%, #20040A 100%);">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <!-- LEFT: Title, Description, CTA Subscription Button, Winner Badge -->
          <div class="lg:col-span-6 space-y-6 text-left">
            
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-amber-300 shadow-sm">
              <span>★ ONE STOP GADGETS MEMBERSHIP</span>
            </div>

            <h2 class="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              1,500+ live member deals<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-white">from 100+ brands.</span>
            </h2>

            <p class="text-white/80 text-sm sm:text-base leading-relaxed max-w-lg">
              Member-only deals and coupon codes from top tech brands you love, plus a free entry in every weekly VIP Giveaway while your subscription plan is active.
            </p>

            <!-- Promo badge -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white/90">
              <span class="text-amber-400">⚡</span>
              <span><strong>VIP Gadget Pass:</strong> Extra 10% off + free insured priority delivery for members</span>
            </div>

            <!-- CTAs with Subscription Link -->
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a href="#subscribe-modal" onclick="openSubscribeModal(event)" class="relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-[#D42526] via-[#B91C1C] to-[#881320] text-white font-black text-sm uppercase tracking-wider shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group border border-white/25">
                <span>Join VIP Membership</span>
                <span class="transform group-hover:translate-x-1 transition">→</span>
                <span class="absolute inset-0 w-1/3 h-full bg-white/25 animate-shine pointer-events-none"></span>
              </a>

              <button onclick="navigate('catalog')" class="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-black text-sm uppercase tracking-wider transition hover:scale-105">
                See the deals
              </button>
            </div>

            <p class="text-xs text-white/50">No purchase needed to browse. Cancel subscription anytime.</p>

            <!-- Published Winners Summary Badge (Matching Screenshot) -->
            <div class="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 max-w-md flex items-center gap-3 shadow-lg">
              <div class="flex -space-x-2 overflow-hidden shrink-0">
                <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white font-black text-xs ring-2 ring-[#420C15]">R</span>
                <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-black text-xs ring-2 ring-[#420C15]">G</span>
                <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 text-white font-black text-xs ring-2 ring-[#420C15]">S</span>
                <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white font-black text-xs ring-2 ring-[#420C15]">A</span>
              </div>
              <div class="text-xs">
                <p class="font-black text-white">67 published winners across 25 giveaways</p>
                <p class="text-white/60 text-[11px]">Latest iPhone winner: Rohan S., iPhone 16 Pro Max</p>
              </div>
            </div>

          </div>

          <!-- RIGHT: Brands Card Showcase & Stats (Matching Image 2 Card) -->
          <div class="lg:col-span-6 flex justify-center lg:justify-end">
            <div class="w-full max-w-lg bg-[#30070E]/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group hover:border-amber-400/40 transition duration-500">
              
              <div class="flex items-center justify-between pb-5 border-b border-white/15">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <span class="text-xs font-black tracking-widest text-white/90 uppercase">ONE STOP GADGETS</span>
                </div>
                <span class="text-[11px] font-bold text-amber-300 uppercase tracking-wider">MEMBER PERKS</span>
              </div>

              <!-- Animated Brands Grid -->
              <div class="py-6 grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                ${brandCardsHtml}
              </div>

              <!-- Live Stats Counter (Matching Image 2) -->
              <div class="pt-6 border-t border-white/15 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div class="text-2xl sm:text-3xl font-black text-white">1,547</div>
                  <div class="text-[11px] font-semibold text-white/60">live deals</div>
                </div>
                <div>
                  <div class="text-2xl sm:text-3xl font-black text-white">135</div>
                  <div class="text-[11px] font-semibold text-white/60">brands</div>
                </div>
                <div>
                  <div class="text-2xl sm:text-3xl font-black text-white">67</div>
                  <div class="text-[11px] font-semibold text-white/60">winners</div>
                </div>
              </div>

              <p class="text-[10px] text-white/40 text-center pt-4">Brand names and logos belong to their respective owners. Not affiliated.</p>
            </div>
          </div>

        </div>

      </section>

      <!-- ========================================== -->
      <!-- SECTION 3: REAL WINNERS CAROUSEL (Matching User Image 3) -->
      <!-- ========================================== -->
      <section id="winners-section" class="relative my-12 text-center space-y-6">
        
        <div class="flex flex-col items-center justify-center space-y-2">
          <div class="inline-flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
            <span>🏆 REAL WINNERS</span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            67 winners across 25 giveaways
          </h2>

          <p class="text-white/70 text-sm max-w-xl">
            Latest: <span class="text-white font-bold">Rohan Sharma</span>, iPhone 16 Pro Max (256 GB), November 2026.
          </p>
        </div>

        <!-- Horizontal Scrollable Winners Strip -->
        <div class="flex items-center gap-4 overflow-x-auto pb-6 pt-2 px-2 custom-scroll justify-start sm:justify-center">
          ${winnersCardsHtml}
        </div>

        <!-- View All Link & Indicators -->
        <div class="flex flex-col items-center justify-center gap-3 pt-2">
          <div class="flex items-center gap-1.5">
            <span class="w-6 h-1 rounded-full bg-amber-400"></span>
            <span class="w-2 h-1 rounded-full bg-white/30"></span>
            <span class="w-2 h-1 rounded-full bg-white/30"></span>
            <span class="w-2 h-1 rounded-full bg-white/30"></span>
            <span class="w-2 h-1 rounded-full bg-white/30"></span>
          </div>

          <button onclick="navigate('luckydip')" class="text-xs font-black text-amber-300 hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition">
            <span>See every winner</span>
            <span>→</span>
          </button>
        </div>

      </section>
`;

// Insert Section 2 & 3 right before Categories Section
const catMarker = '<!-- Categories Section with Premium UI Cards -->';
if (html.includes(catMarker)) {
  html = html.replace(catMarker, additionalSectionsHtml + '\n\n      ' + catMarker);
  console.log('✅ Injected Section 2 (Membership & Brands) & Section 3 (Real Winners)');
} else {
  console.error('❌ Could not find Categories Section marker');
}

// 3. ADD MODAL / LINK HANDLER FOR SUBSCRIPTION
const modalJs = `
<!-- Subscription Modal -->
<div id="subscribe-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
  <div class="bg-gradient-to-b from-[#420C15] to-[#25050C] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-white relative">
    <button onclick="closeSubscribeModal()" class="absolute top-4 right-4 text-white/60 hover:text-white text-xl">✕</button>
    <div class="text-center space-y-4">
      <div class="w-16 h-16 rounded-full bg-amber-400 text-[#420C15] flex items-center justify-center mx-auto text-2xl font-black shadow-lg">👑</div>
      <h3 class="text-2xl font-black">VIP Club Membership</h3>
      <p class="text-white/80 text-xs sm:text-sm">Get unrestricted access to 1,500+ verified deals and automatic entries into all weekly iPhone and tech giveaways.</p>
      <div class="bg-white/10 p-4 rounded-2xl text-left space-y-2 border border-white/15 text-xs">
        <div class="flex items-center gap-2"><span>✓</span> <strong>Free weekly Lucky Dip ticket</strong></div>
        <div class="flex items-center gap-2"><span>✓</span> <strong>Exclusive coupon codes from 100+ brands</strong></div>
        <div class="flex items-center gap-2"><span>✓</span> <strong>Priority shipping & concierge support</strong></div>
      </div>
      <button onclick="alert('Welcome! Your VIP membership link has been activated.'); closeSubscribeModal();" class="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#420C15] font-black text-sm uppercase tracking-wider shadow-xl hover:scale-105 transition">
        Subscribe for ₹199 / month
      </button>
      <p class="text-[10px] text-white/50">Cancel anytime with 1-click in account settings.</p>
    </div>
  </div>
</div>

<script>
function openSubscribeModal(e) {
  if (e) e.preventDefault();
  const m = document.getElementById('subscribe-modal');
  if (m) m.classList.remove('hidden');
}
function closeSubscribeModal() {
  const m = document.getElementById('subscribe-modal');
  if (m) m.classList.add('hidden');
}
</script>
`;

const bodyEnd = html.lastIndexOf('</body>');
if (bodyEnd !== -1) {
  html = html.substring(0, bodyEnd) + modalJs + '\n' + html.substring(bodyEnd);
  console.log('✅ Added VIP Subscription modal & handler');
}

fs.writeFileSync(protoPath, html, 'utf8');
console.log('✅ Finished! New length:', html.length);
