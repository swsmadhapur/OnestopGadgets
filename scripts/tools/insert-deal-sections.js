const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Function to generate sample carousel deal card
function createCarouselDealCard(item) {
  return `
    <div class="shrink-0 w-44 sm:w-52 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
      <div class="relative bg-white/10 h-32 sm:h-36 flex items-center justify-center overflow-hidden">
        <span class="absolute top-2 left-2 ${item.badgeBg || 'bg-[#FF3C50]'} text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded z-10">
          ${item.discount}
        </span>
        <button class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-slate-400 hover:text-[#FF3C50] transition z-10 text-xs">
          &#9825;
        </button>
        <span class="text-4xl sm:text-5xl transform group-hover:scale-110 transition-transform duration-300">${item.icon}</span>
        <div class="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div class="w-full py-1 bg-[#FFC800] text-[#141428] text-[9px] font-extrabold text-center">
            ⚡ Grab now
          </div>
        </div>
      </div>
      <div class="p-3 flex flex-col flex-1 justify-between">
        <div>
          <div class="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 truncate">${item.brand}</div>
          <h4 class="text-xs font-bold text-[#141428] line-clamp-2 leading-snug group-hover:text-[#641428] transition">${item.title}</h4>
        </div>
        <div class="mt-2.5">
          <div class="flex items-baseline gap-1.5">
            <span class="text-xs sm:text-sm font-extrabold text-[#141428]">${item.price}</span>
            <span class="text-[9px] line-through text-slate-400">${item.original}</span>
            <span class="text-[9px] font-bold text-[#FF3C50] ml-auto">${item.discount}</span>
          </div>
          <div class="text-[8px] text-slate-400 mt-0.5 mb-2">Valid till 30 Nov</div>
          <button onclick="handleDealOutbound('${item.title}', false)" class="w-full py-1.5 rounded-xl border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#FF3C50] hover:border-[#FF3C50] hover:text-white shadow-xs transition-all duration-200 text-[10px] font-extrabold transition">
            View Deal
          </button>
        </div>
      </div>
    </div>
  `;
}

// Data sets
const trendingDeals = [
  { brand: 'PLUM', title: '2% Niacinamide & Rice Water Face Wash', price: '₹79', original: '₹149', discount: '60% OFF', icon: '🧴' },
  { brand: 'BOULT', title: '1M Type-C Fast Braided Cable', price: '₹49', original: '₹299', discount: '84% OFF', icon: '🔌' },
  { brand: 'BEARDO', title: 'Lip Balm (Bubblegum Formula)', price: '₹99', original: '₹300', discount: '67% OFF', icon: '💄' },
  { brand: 'DECONSTRUCT', title: 'Dark Spot Clearing Serum 5%', price: '₹224', original: '₹299', discount: '25% OFF', icon: '🧪' },
  { brand: 'LEVIS', title: 'Skinny Fit Mid Rise Tech Stretch Jeans', price: '₹715', original: '₹3,579', discount: '80% OFF', icon: '👖' },
  { brand: 'BOAT', title: 'Airdopes 141 ANC with 42H Playtime', price: '₹999', original: '₹4,490', discount: '78% OFF', icon: '🎧' }
];

const under49Deals = [
  { brand: 'BOULT', title: 'Braided Type-C OTG Sync Adapter', price: '₹49', original: '₹299', discount: '84% OFF', icon: '🔌' },
  { brand: 'PLUM', title: 'Refreshing Mini Face Wash 15ml', price: '₹49', original: '₹99', discount: '50% OFF', icon: '🧴' },
  { brand: 'AMRUTANJAN', title: 'Roll-on Instant Pain Relief 10ml', price: '₹39', original: '₹60', discount: '35% OFF', icon: '🌿' },
  { brand: 'PORTLAND', title: 'Silicone Cable Organizer 3-Pack', price: '₹45', original: '₹199', discount: '77% OFF', icon: '🧲' },
  { brand: 'ZEBRONICS', title: 'Dust Plug Protector Set for iPhone', price: '₹29', original: '₹99', discount: '70% OFF', icon: '📱' },
  { brand: 'EVERREADY', title: 'AAA Alkaline Long Life Batteries (4pcs)', price: '₹48', original: '₹80', discount: '40% OFF', icon: '🔋' }
];

const under499Deals = [
  { brand: 'PLUM', title: '2% Niacinamide & Rice Water Face Wash', price: '₹79', original: '₹149', discount: '60% OFF', icon: '🧴' },
  { brand: 'BOULT', title: '1M Fast Charging Heavy Duty Cable', price: '₹49', original: '₹299', discount: '84% OFF', icon: '🔌' },
  { brand: 'BOMBAY SHAVING', title: 'Miami Pocket Perfume 20ml', price: '₹99', original: '₹399', discount: '75% OFF', icon: '✨' },
  { brand: 'BEARDO', title: 'Bubblegum Nourishing Lip Balm', price: '₹99', original: '₹300', discount: '67% OFF', icon: '💄' },
  { brand: 'BEARDO', title: 'Ultraglow Face Cream SPF-30', price: '₹99', original: '₹335', discount: '70% OFF', icon: '🧴' },
  { brand: 'VILLAIN', title: 'Hydra Eau De Parfum (20ml)', price: '₹149', original: '₹499', discount: '70% OFF', icon: '⚡' }
];

const under999Deals = [
  { brand: 'CAMPUS', title: 'MISS CR Pink Women Running Shoes', price: '₹934', original: '₹1,999', discount: '56% OFF', icon: '👟' },
  { brand: 'CAMPUS', title: 'MISS CR Black Running Lightweight Shoes', price: '₹944', original: '₹2,099', discount: '55% OFF', icon: '👟' },
  { brand: 'CAMPUS', title: 'MISS CR White Sport Cushioned Shoes', price: '₹944', original: '₹2,099', discount: '55% OFF', icon: '👟' },
  { brand: 'LEVIS', title: 'Skinny Fit Mid Rise Classic Jeans', price: '₹715', original: '₹3,579', discount: '80% OFF', icon: '👖' },
  { brand: 'GIVA', title: 'Silver Blossom Stud Earrings (Pure 925)', price: '₹699', original: '₹2,499', discount: '72% OFF', icon: '💎' },
  { brand: 'PEBBLE', title: 'Pebble Pod X1 Wireless Earbuds', price: '₹999', original: '₹2,999', discount: '66% OFF', icon: '🎧' }
];

const trendingCardsHtml = trendingDeals.map(createCarouselDealCard).join('');
const under49CardsHtml = under49Deals.map(createCarouselDealCard).join('');
const under499CardsHtml = under499Deals.map(createCarouselDealCard).join('');
const under999CardsHtml = under999Deals.map(createCarouselDealCard).join('');

const newSectionsHtml = `
      <!-- ==================== IMAGE 1 SECTIONS: CURATED HORIZONTAL DEAL SLIDERS ==================== -->
      <div class="mt-10 space-y-8">
        
        <!-- 1. Trending Deals (Warm Amber Tint) -->
        <div class="bg-white/15 border border-[#F0C88C] rounded-3xl p-5 sm:p-6 shadow-xs">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-xl bg-[#F0C88C]/40 text-[#8C5000] flex items-center justify-center text-sm font-bold shadow-2xs">🔥</span>
              <div>
                <h3 class="text-base sm:text-lg font-extrabold text-[#141428]">Trending Deals</h3>
                <p class="text-[11px] text-slate-500 font-medium">Trending now across live deals</p>
              </div>
            </div>
            <button onclick="sortDeals('best')" class="text-xs font-extrabold text-[#8C5000] hover:text-[#641428] flex items-center gap-1 transition">
              See best value ➔
            </button>
          </div>
          <!-- Horizontal Scroll Row -->
          <div class="flex items-stretch gap-3.5 overflow-x-auto pb-2 custom-scroll">
            ${trendingCardsHtml}
          </div>
        </div>

        <!-- 2. Big Value Under ₹49 (Flash Steals) -->
        <div class="bg-white/15 border border-[#C8A0A0] rounded-3xl p-5 sm:p-6 shadow-xs">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-xl bg-[#FF3C50]/15 text-[#FF3C50] flex items-center justify-center text-sm font-bold shadow-2xs">⚡</span>
              <div>
                <h3 class="text-base sm:text-lg font-extrabold text-[#141428]">Super Steals under ₹49</h3>
                <p class="text-[11px] text-slate-500 font-medium">Pocket-friendly essentials & accessories under ₹50</p>
              </div>
            </div>
            <button class="text-xs font-extrabold text-[#FF3C50] hover:text-[#641428] flex items-center gap-1 transition">
              See all under ₹49 ➔
            </button>
          </div>
          <!-- Horizontal Scroll Row -->
          <div class="flex items-stretch gap-3.5 overflow-x-auto pb-2 custom-scroll">
            ${under49CardsHtml}
          </div>
        </div>

        <!-- 3. Big Value Under ₹499 (Soft Blue/Purple Tint) -->
        <div class="bg-white/15 border border-[#B4D0FE] rounded-3xl p-5 sm:p-6 shadow-xs">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-xl bg-[#2850DC]/15 text-[#2850DC] flex items-center justify-center text-sm font-bold shadow-2xs">🏷️</span>
              <div>
                <h3 class="text-base sm:text-lg font-extrabold text-[#141428]">Big value under ₹499</h3>
                <p class="text-[11px] text-slate-500 font-medium">Top deals that cost less than ₹500</p>
              </div>
            </div>
            <button class="text-xs font-extrabold text-[#2850DC] hover:text-[#641428] flex items-center gap-1 transition">
              See all under ₹499 ➔
            </button>
          </div>
          <!-- Horizontal Scroll Row -->
          <div class="flex items-stretch gap-3.5 overflow-x-auto pb-2 custom-scroll">
            ${under499CardsHtml}
          </div>
        </div>

        <!-- 4. Big Value Under ₹999 (Soft Mint/Teal Tint) -->
        <div class="bg-white/15 border border-[#A7E8BD] rounded-3xl p-5 sm:p-6 shadow-xs">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-xl bg-[#50C850]/20 text-[#148030] flex items-center justify-center text-sm font-bold shadow-2xs">₹</span>
              <div>
                <h3 class="text-base sm:text-lg font-extrabold text-[#141428]">Big value under ₹999</h3>
                <p class="text-[11px] text-slate-500 font-medium">More great buys below ₹1,000</p>
              </div>
            </div>
            <button class="text-xs font-extrabold text-[#148030] hover:text-[#641428] flex items-center gap-1 transition">
              See all under ₹999 ➔
            </button>
          </div>
          <!-- Horizontal Scroll Row -->
          <div class="flex items-stretch gap-3.5 overflow-x-auto pb-2 custom-scroll">
            ${under999CardsHtml}
          </div>
        </div>

        <!-- ==================== IMAGE 2 SECTION: GIVE X INDIA / VIP MEMBERSHIP BANNER ==================== -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#501020] via-[#641428] to-[#781830] text-white p-6 sm:p-8 shadow-xl border border-[#FF3C50]/30">
          <div class="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <!-- Left Info -->
            <div class="space-y-3 max-w-sm text-center lg:text-left">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FFC800] text-[10px] font-extrabold tracking-wider uppercase border border-white/10">
                👑 MEMBERSHIP
              </span>
              <h3 class="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white">
                Get more with <span class="text-[#FFC800]">One Stop VIP</span> membership
              </h3>
              <p class="text-xs text-white/80 leading-relaxed">
                Plans from ₹199 a month. Cancel auto-renewal any time.
              </p>
            </div>

            <!-- Middle Feature Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
              <!-- Feature 1 -->
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 flex items-start gap-3 border border-white/10 min-w-44">
                <div class="w-8 h-8 rounded-full bg-[#FFC800] text-[#141428] flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  🏷️
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white leading-tight">Member deals</h4>
                  <p class="text-[10px] text-white/75 mt-1 leading-normal">
                    Live deals and coupon codes from brands you know.
                  </p>
                </div>
              </div>

              <!-- Feature 2 -->
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 flex items-start gap-3 border border-white/10 min-w-44">
                <div class="w-8 h-8 rounded-full bg-[#FFC800] text-[#141428] flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  🎁
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white leading-tight">Free giveaway entry</h4>
                  <p class="text-[10px] text-white/75 mt-1 leading-normal">
                    A free bonus entry in every Weekly giveaway.
                  </p>
                </div>
              </div>

              <!-- Feature 3 -->
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 flex items-start gap-3 border border-white/10 min-w-44">
                <div class="w-8 h-8 rounded-full bg-[#FFC800] text-[#141428] flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  👑
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white leading-tight">Member perks</h4>
                  <p class="text-[10px] text-white/75 mt-1 leading-normal">
                    Selected extras for members, in the app and online.
                  </p>
                </div>
              </div>
            </div>

            <!-- Right CTA Button -->
            <div class="shrink-0 w-full sm:w-auto text-center">
              <button onclick="navigate('pricing')" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#FFC800] hover:bg-[#e0b000] text-[#141428] font-extrabold text-xs shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 group">
                <span>Become a member</span>
                <span class="transform group-hover:translate-x-1 transition">➔</span>
              </button>
            </div>
          </div>
        </div>

      </div>
`;

// Target location: right before `</section>` of `id="screen-catalog"`
const catalogSectionEnd = `          <!-- Deals Grid — 2 col mobile, 3 col md, 4 col xl -->
          <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4" id="catalog-deals-grid">
            <!-- Rendered by JavaScript -->
          </div>
        </div>
      </div>
    </section>`;

if (html.includes(catalogSectionEnd)) {
  const replacement = `          <!-- Deals Grid — 2 col mobile, 3 col md, 4 col xl -->
          <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4" id="catalog-deals-grid">
            <!-- Rendered by JavaScript -->
          </div>
        </div>
      </div>
${newSectionsHtml}
    </section>`;
  html = html.replace(catalogSectionEnd, replacement);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✅ Successfully added both sections before footer in Deals page!');
} else {
  console.error('Target catalogSectionEnd not found');
}
