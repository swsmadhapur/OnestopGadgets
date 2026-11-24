const fs = require('fs');

const protoPath = 'design/prototype/index.html';
let content = fs.readFileSync(protoPath, 'utf8');

console.log('Original size:', content.length);

// 1. Color System Alignment:
// Premium Red: #E50914
// Deep Burgundy: #400B19
// Royal Blue: #1645C4
// Milky White: #F5F6FA
// Dark Navy: #101428

// Replace primary reds with #E50914
content = content.replace(/#E6192D/gi, '#E50914');
content = content.replace(/#DC1F32/gi, '#E50914');
content = content.replace(/#D42526/gi, '#E50914');

// Replace deep dark/burgundy backgrounds with #400B19
content = content.replace(/#2A060C/gi, '#400B19');
content = content.replace(/#360B14/gi, '#400B19');
content = content.replace(/#3B0A12/gi, '#400B19');
content = content.replace(/#5C121D/gi, '#400B19');
content = content.replace(/#641428/gi, '#400B19');

// Replace blues with #1645C4
content = content.replace(/#2563EB/gi, '#1645C4');
content = content.replace(/#1D4ED8/gi, '#12389E');
content = content.replace(/#1E3A8A/gi, '#1645C4');

// Replace milky white with #F5F6FA
content = content.replace(/#FAF8F5/gi, '#F5F6FA');
content = content.replace(/#F8F9FA/gi, '#F5F6FA');

// Replace dark navies with #101428
content = content.replace(/#0F172A/gi, '#101428');
content = content.replace(/#141428/gi, '#101428');
content = content.replace(/#0A0F24/gi, '#101428');

// 2. Ensure Hero Section Gradient strictly uses Deep Burgundy #400B19 to Dark Navy #101428 & Premium Red #E50914
content = content.replace(
  /\.hero-gradient\s*\{[\s\S]*?\}/,
  `.hero-gradient { background: radial-gradient(circle at 75% 40%, rgba(229, 9, 20, 0.35) 0%, rgba(64, 11, 25, 0.95) 45%, #101428 100%), linear-gradient(135deg, #400B19 0%, #101428 100%); }`
);

// 3. Ensure Featured Gadget Categories section has exact Royal Blue gradient
content = content.replace(
  /id="categories-section"[\s\S]*?class="([^"]*)"/i,
  `id="categories-section" class="full-width-section relative py-10 shadow-lg border-y border-[#1645C4]/30" style="background: linear-gradient(135deg, #1645C4 0%, #0D2B82 50%, #101428 100%);"`
);

// 4. Ensure Exactly 8 Categories in 1 Horizontal row on desktop as shown in screenshot:
// 1. Smartphones, 2. Laptops, 3. Audio & Wearables, 4. Smartwatches, 5. Gaming, 6. Cameras, 7. Smart Home, 8. Accessories
const exact8Categories = `const CATEGORIES_DATA = [
      { id: 'smartphones', name: 'Smartphones', count: '142 Deals', icon: '📱', badge: 'Hot' },
      { id: 'laptops', name: 'Laptops', count: '89 Deals', icon: '💻', badge: 'Save 30%' },
      { id: 'audio-wearables', name: 'Audio & Wearables', count: '98 Deals', icon: '🎧', badge: 'Top Rated' },
      { id: 'smartwatches', name: 'Smartwatches', count: '64 Deals', icon: '⌚', badge: 'Trending' },
      { id: 'gaming', name: 'Gaming', count: '52 Deals', icon: '🎮', badge: 'VIP Secret' },
      { id: 'cameras', name: 'Cameras', count: '38 Deals', icon: '📷', badge: 'New' },
      { id: 'smart-home', name: 'Smart Home', count: '40 Deals', badge: 'Popular' },
      { id: 'accessories', name: 'Accessories', count: '120 Deals', badge: 'Best Value' },
    ];`;

content = content.replace(/const\s+CATEGORIES_DATA\s*=\s*\[[\s\S]*?\];/, exact8Categories);

// Category grid classes: 8 columns on large screens
content = content.replace(/id="categories-grid"\s+class="[^"]*"/, `id="categories-grid" class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"`);
content = content.replace(/class="grid grid-cols-2 [^"]*"\s+id="categories-grid"/, `class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3" id="categories-grid"`);

// 5. Ensure 4 Featured Deals in 1 horizontal row matching the screenshot exactly:
// 1. Apple iPhone 16 Pro Max (256 GB) -18% Amazon Verified ₹1,34,999 ₹1,64,900
// 2. MacBook Air M4 (13-inch) -22% Flipkart Verified ₹94,990 ₹1,21,900
// 3. Bose QuietComfort Ultra Headphones -35% Amazon Verified ₹25,999 ₹39,999
// 4. PlayStation 5 Slim (Disc Edition) -20% Flipkart Verified ₹43,990 ₹54,990
const exact4Deals = `const FEATURED_DEALS_HOMEPAGE = [
      { id: 1, title: 'Apple iPhone 16 Pro Max (256 GB)', store: 'Amazon Verified', storeIcon: '🛒', discount: '-18%', price: '₹1,34,999', original: '₹1,64,900', numeric_price: 134999, icon: '📱', isVip: true },
      { id: 2, title: 'MacBook Air M4 (13-inch)', store: 'Flipkart Verified', storeIcon: '⚡', discount: '-22%', price: '₹94,990', original: '₹1,21,900', numeric_price: 94990, icon: '💻', isVip: true },
      { id: 3, title: 'Bose QuietComfort Ultra Headphones', store: 'Amazon Verified', storeIcon: '🛒', discount: '-35%', price: '₹25,999', original: '₹39,999', numeric_price: 25999, icon: '🎧', isVip: false },
      { id: 4, title: 'PlayStation 5 Slim (Disc Edition)', store: 'Flipkart Verified', storeIcon: '⚡', discount: '-20%', price: '₹43,990', original: '₹54,990', numeric_price: 43990, icon: '🎮', isVip: false }
    ];`;

if (!content.includes('FEATURED_DEALS_HOMEPAGE')) {
  content = content.replace('// High-Polish Storefront Deals Renderer', exact4Deals + '\n\n    // High-Polish Storefront Deals Renderer');
}

// 6. Updated renderDeals using the 4 exact screenshot products
const renderDealsScreenshotCode = `// Render 4 Exact Featured Deals Matching Screenshot
    function renderDeals() {
      const container = document.getElementById('storefront-deals');
      if (!container) return;

      const dealsToUse = (typeof FEATURED_DEALS_HOMEPAGE !== 'undefined') ? FEATURED_DEALS_HOMEPAGE : DEALS_DATA.slice(0, 4);

      container.innerHTML = dealsToUse.map(deal => {
        const isRestricted = deal.numeric_price >= 50000 && currentUserRole !== 'vip';
        const displayPrice = isRestricted ? 'VIP ONLY' : deal.price;
        const origPrice = isRestricted ? '₹??,???' : deal.original;

        return \`
          <div 
            onclick="openProductDetails(\${deal.id})"
            class="bg-white rounded-2xl p-4 border border-slate-200 hover:border-[#1645C4] shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group"
          >
            <!-- Product image / icon on the left -->
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#F5F6FA] flex items-center justify-center text-4xl shrink-0 group-hover:scale-105 transition border border-slate-100 relative">
              \${deal.icon}
              \${isRestricted ? \`
                <div class="absolute inset-0 bg-[#101428]/60 backdrop-blur-xs rounded-xl flex items-center justify-center text-amber-400 text-xs font-black">
                  🔒 VIP
                </div>
              \` : ''}
            </div>

            <!-- Details in the middle -->
            <div class="flex-1 min-w-0 space-y-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-[#E50914]">
                  \${deal.discount}
                </span>
                <span class="text-[10px] font-medium text-slate-500">
                  \${deal.storeIcon || '🛒'} \${deal.store}
                </span>
              </div>
              <h4 class="font-extrabold text-xs text-slate-900 group-hover:text-[#1645C4] transition truncate">
                \${deal.title}
              </h4>
              <div class="flex items-baseline gap-2 pt-0.5">
                <span class="text-sm font-black \${isRestricted ? 'filter blur-[2px] select-none text-slate-400' : 'text-[#E50914]'}">
                  \${displayPrice}
                </span>
                <span class="text-[10px] text-slate-400 line-through">
                  \${origPrice}
                </span>
              </div>
            </div>

            <!-- Circular Red Arrow Button on the right -->
            <button 
              onclick="event.stopPropagation(); openProductDetails(\${deal.id});" 
              class="w-7 h-7 rounded-full bg-red-50 text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white transition flex items-center justify-center text-xs font-bold shrink-0 shadow-xs"
              title="View Deal"
            >
              →
            </button>
          </div>
        \`;
      }).join('');
    }`;

content = content.replace(/function\s+renderDeals\(\)\s*\{[\s\S]*?container\.innerHTML\s*=\s*displayDeals[\s\S]*?join\(''\);\s*\}/, renderDealsScreenshotCode);

// 7. Ensure Real Winners section has exact Dark Burgundy (#400B19) gradient background
content = content.replace(
  /id="winners-section"[\s\S]*?class="([^"]*)"/i,
  `id="winners-section" class="full-width-section relative py-14 shadow-inner text-white border-y border-[#400B19]" style="background: radial-gradient(circle at 50% 30%, rgba(229, 9, 20, 0.25) 0%, #400B19 60%, #101428 100%);"`
);

// 8. Ensure Today's Featured Deals and VIP Pricing sections use Milky White (#F5F6FA)
content = content.replace(
  /id="deals-showcase-section"[\s\S]*?class="([^"]*)"/i,
  `id="deals-showcase-section" class="full-width-section relative py-12 shadow-sm border-b border-slate-200" style="background: #F5F6FA;"`
);

content = content.replace(
  /id="vip-pricing-section"[\s\S]*?class="([^"]*)"/i,
  `id="vip-pricing-section" class="full-width-section relative py-14 shadow-sm border-b border-slate-200" style="background: #F5F6FA;"`
);

// Save updated prototype
fs.writeFileSync(protoPath, content, 'utf8');
fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully applied strict reference color tokens and layouts! New size:', content.length);
