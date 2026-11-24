const fs = require('fs');
const protoPath = 'design/prototype/index.html';
let content = fs.readFileSync(protoPath, 'utf8');

// 1. Recreate the Exact Hero Left Column matching the Reference Image:
// - Badge: [ 👑 ONE STOP GADGETS ]
// - Main headline: Exclusive Tech Deals,<br/>VIP Access, Cashback &<br/>Weekly <span class="text-[#E6192D]">Lucky Dip Prizes</span>
// - Description: Verified deals from top merchants, members-only VIP benefits, extra cashback, and a chance to win exciting gadgets every week.
// - Buttons:
//   - Button 1: [ 👑 Join VIP Now ] (Red button with crown icon)
//   - Button 2: [ 🎁 Try Lucky Dip ] (Outlined/dark pill button with gift icon)

const heroTargetSnippet = `<h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
              Exclusive Tech Deals, VIP Access, Cashback &amp; Weekly Lucky Dip Prizes</h1>

            <p class="text-white/80 text-sm sm:text-base leading-relaxed max-w-md">
              Win an <span class="font-bold text-white">iPhone 16 Pro Max</span> &amp; 4 More Exciting Tech Prizes.
            </p>

            <div class="flex flex-wrap items-center gap-3.5 pt-2">
              <button onclick="navigate('luckydip')" class="relative overflow-hidden px-8 py-3.5 rounded-full bg-white text-[#3B0A12] font-black text-xs uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group">
                <span>GET FREE ENTRY</span>
                <span class="transform group-hover:translate-x-1 transition">→</span>
                <span class="absolute inset-0 w-1/3 h-full bg-white/30 animate-shine pointer-events-none"></span>
              </button>
              <button onclick="navigate('catalog')" class="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-black text-xs uppercase tracking-wider transition hover:scale-105">
                EXPLORE PRIZES
              </button>
            </div>`;

const heroReplacement = `<!-- One Stop Gadgets Pill Tag -->
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-bold text-white tracking-wide uppercase shadow-sm">
              <span>👑</span>
              <span>ONE STOP GADGETS</span>
            </div>

            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight">
              Exclusive Tech Deals,<br/>
              VIP Access, Cashback &amp;<br/>
              Weekly <span class="text-[#E6192D] drop-shadow-sm">Lucky Dip Prizes</span>
            </h1>

            <p class="text-white/85 text-xs sm:text-sm leading-relaxed max-w-md font-medium">
              Verified deals from top merchants, members-only VIP benefits, extra cashback, and a chance to win exciting gadgets every week.
            </p>

            <div class="flex flex-wrap items-center gap-3.5 pt-2">
              <button onclick="openSubscribeModal()" class="px-6 py-3 rounded-full bg-[#E6192D] hover:bg-[#c51424] text-white font-extrabold text-xs shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
                <span>👑</span>
                <span>Join VIP Now</span>
              </button>
              <button onclick="handleLuckyDipNavClick()" class="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-extrabold text-xs transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
                <span>🎁</span>
                <span>Try Lucky Dip</span>
              </button>
            </div>`;

content = content.replace(heroTargetSnippet, heroReplacement);

// 2. Add Copyright and Designed by Sun Web Solutions to Footer
const footerBottomTarget = `Copyright © 2026 One Stop Gadgets`;
if (content.includes(footerBottomTarget)) {
  content = content.replace(
    /Copyright © 2026 One Stop Gadgets[\s\S]*?<\/div>/,
    `Copyright © 2026 <strong>One Stop Gadgets</strong> | Designed by <span class="text-[#E6192D] font-bold">Sun Web Solutions</span></div>`
  );
}

fs.writeFileSync(protoPath, content, 'utf8');
fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully aligned Hero Section & Footer with reference image!');
