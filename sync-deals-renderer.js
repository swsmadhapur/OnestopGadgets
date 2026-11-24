const fs = require('fs');
const serverContent = fs.readFileSync('server.js', 'utf8');

// Extract ALL_DEALS from server.js
const dealsMatch = serverContent.match(/let ALL_DEALS = (\[[\s\S]*?\]);\r?\n\r?\n\/\/ In-Memory/);
if (!dealsMatch) {
  console.error('Could not extract ALL_DEALS from server.js');
  process.exit(1);
}

const allDealsStr = dealsMatch[1];
const protoPath = 'design/prototype/index.html';
let proto = fs.readFileSync(protoPath, 'utf8');

// Replace DEALS_DATA in prototype
proto = proto.replace(/const\s+DEALS_DATA\s*=\s*\[[\s\S]*?\];\r?\n\r?\n\s*\/\/ High-Polish/m, `const DEALS_DATA = ${allDealsStr};\n\n    // High-Polish`);

// Ensure renderDeals formats correctly and respects ₹50k rule and colors
const renderDealsCode = `// High-Polish Storefront Deals Renderer (3-Color Red/Blue/Milky White & ₹50,000 Rule)
    function renderDeals() {
      const container = document.getElementById('storefront-deals');
      if (!container) return;

      const displayDeals = DEALS_DATA.slice(0, 8); // Top 8 featured deals

      container.innerHTML = displayDeals.map(deal => {
        const isVipRestricted = deal.numeric_price >= 50000 && currentUserRole !== 'vip';
        const displayPrice = isVipRestricted ? 'VIP ONLY' : deal.price;
        const originalPrice = isVipRestricted ? '₹??,???' : deal.original;
        const discountTag = isVipRestricted ? 'VIP PASS' : deal.discount;
        const storeBadgeClass = deal.store.toLowerCase().includes('amazon') 
          ? 'bg-amber-50 text-amber-900 border-amber-200' 
          : 'bg-blue-50 text-blue-900 border-blue-200';

        return \`
          <div 
            onclick="openProductDetails(\${deal.id})"
            class="group relative bg-[#FAF8F5] hover:bg-white rounded-3xl p-5 border border-slate-200 hover:border-[#2563EB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1.5"
          >
            <!-- Badge & Store Header -->
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border \${storeBadgeClass}">
                \${deal.store.includes('Amazon') ? '🛒 Amazon' : '⚡ Flipkart'} Verified
              </span>
              <span class="text-[11px] font-black px-2 py-0.5 rounded-md bg-[#E6192D] text-white shadow-xs">
                \${discountTag}
              </span>
            </div>

            <!-- Product Icon / Image Mockup -->
            <div class="w-full h-36 rounded-2xl bg-white flex items-center justify-center text-5xl mb-4 border border-slate-100 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
              \${deal.icon}
              \${isVipRestricted ? \`
                <div class="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-xs flex flex-col items-center justify-center text-white p-2 text-center">
                  <span class="text-xl">🔒</span>
                  <span class="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">VIP Deal (≥ ₹50K)</span>
                </div>
              \` : ''}
            </div>

            <!-- Title & Category -->
            <div class="space-y-1 mb-4">
              <div class="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">\${deal.category}</div>
              <h3 class="font-extrabold text-sm text-slate-900 group-hover:text-[#2563EB] transition line-clamp-2 leading-snug">
                \${deal.title}
              </h3>
            </div>

            <!-- Price & Action -->
            <div class="pt-3 border-t border-slate-200 flex items-center justify-between mt-auto">
              <div>
                <div class="text-base font-black text-slate-900 flex items-center gap-1.5">
                  <span class="\${isVipRestricted ? 'filter blur-[3px] select-none text-slate-400' : 'text-[#E6192D]'}">\${displayPrice}</span>
                </div>
                <div class="text-[11px] text-slate-400 line-through font-medium">\${originalPrice}</div>
              </div>
              <button 
                onclick="event.stopPropagation(); openProductDetails(\${deal.id});" 
                class="px-3 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow hover:shadow-blue-500/20 transition flex items-center gap-1"
              >
                <span>View</span>
                <span>→</span>
              </button>
            </div>
          </div>
        \`;
      }).join('');
    }`;

proto = proto.replace(/function\s+renderDeals\(\)\s*\{[\s\S]*?container\.innerHTML\s*=\s*displayDeals[\s\S]*?join\(''\);\s*\}/, renderDealsCode);

fs.writeFileSync(protoPath, proto, 'utf8');
fs.writeFileSync('index.html', proto, 'utf8');
console.log('Successfully updated DEALS_DATA and renderDeals in prototype! Length:', proto.length);
