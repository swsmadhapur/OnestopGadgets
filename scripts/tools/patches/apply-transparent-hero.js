const fs = require('fs');
const path = require('path');

const protoPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(protoPath, 'utf8');

console.log('Original size:', html.length);

// 1. Read the transparent PNG files
const amazonB64 = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'assets', 'hero', 'amazon_voucher.png')).toString('base64');
const iphoneB64 = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'assets', 'hero', 'iphone16.png')).toString('base64');
const ps5B64 = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'assets', 'hero', 'ps5.png')).toString('base64');
const dysonB64 = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'assets', 'hero', 'dyson.png')).toString('base64');
const giftboxB64 = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'assets', 'hero', 'giftbox.png')).toString('base64');

// 2. Build the updated HERO_PRODUCTS definition
const newHeroProductsStr = `const HERO_PRODUCTS = [
    {
      id: 'p1',
      title: 'iPhone 16 Pro Max',
      subtitle: 'PRIZE 01 / 05',
      badge: 'Prize 01',
      img: '${iphoneB64}'
    },
    {
      id: 'p2',
      title: 'PlayStation 5 Slim',
      subtitle: 'PRIZE 02 / 05',
      badge: 'Prize 02',
      img: '${ps5B64}'
    },
    {
      id: 'p3',
      title: 'Dyson Airwrap Styler',
      subtitle: 'PRIZE 03 / 05',
      badge: 'Prize 03',
      img: '${dysonB64}'
    },
    {
      id: 'p4',
      title: 'Amazon Gift Voucher',
      subtitle: 'PRIZE 04 / 05',
      badge: 'Prize 04',
      img: '${amazonB64}'
    },
    {
      id: 'p5',
      title: 'Mystery Tech Gift Box',
      subtitle: 'PRIZE 05 / 05',
      badge: 'Prize 05',
      img: '${giftboxB64}'
    }
  ];`;

// Replace existing HERO_PRODUCTS
const heroProdRegex = /const HERO_PRODUCTS\s*=\s*\[[\s\S]*?\];/;
if (heroProdRegex.test(html)) {
  html = html.replace(heroProdRegex, newHeroProductsStr);
  console.log('✅ Updated HERO_PRODUCTS with transparent PNGs');
} else {
  console.error('❌ Could not find HERO_PRODUCTS');
}

// 3. Update hero background to match GiveX India exactly (#4A101D / #541423 deep wine/maroon)
html = html.replace(
  /style="background:\s*linear-gradient\(135deg,\s*#420C15\s*0%,\s*#350810\s*50%,\s*#20040A\s*100%\);"/g,
  'style="background: radial-gradient(circle at 65% 50%, #681827 0%, #4D101C 45%, #350A13 100%);"'
);

// 4. Update renderHeroCard to match GiveX India layout (screenshot 2):
// - Central/occupied floating transparent product with soft floor drop shadow
// - Right side aligned text (PRIZE 05 / 05, Amazon Gift Voucher, Prize 05, golden dashes, PAUSE)
// - Floating giftbox thumbnail on bottom right
const newRenderHeroCard = `function renderHeroCard(p) {
    const nextIdx = (heroProdIdx + 1) % HERO_PRODUCTS.length;
    const nextProd = HERO_PRODUCTS[nextIdx];
    
    const nextThumb = document.getElementById('hero-next-thumb');
    if (nextThumb) nextThumb.src = nextProd.img;

    return \`
      <div class="relative w-full max-w-2xl flex flex-col md:flex-row items-center justify-between gap-4 select-none">
        
        <!-- Large Transparent 3D Product Float (Zero Background Box, Completely Seamless) -->
        <div class="relative flex-1 flex justify-center items-center w-full min-h-[360px] sm:min-h-[420px]">
          
          <!-- Soft 3D Floor Shadow -->
          <div class="absolute bottom-4 w-60 sm:w-80 h-10 rounded-full bg-black/60 blur-2xl pointer-events-none"></div>

          <!-- The Real Transparent Product Image -->
          <div class="relative w-full h-[340px] sm:h-[400px] flex items-center justify-center p-2">
            <img src="\${p.img}" alt="\${p.title}" class="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] transition-all duration-700 pointer-events-none hover:scale-105" />
          </div>
        </div>

        <!-- Right Side Specs (GiveX India style) -->
        <div class="flex flex-col items-center md:items-end text-center md:text-right space-y-2 pr-2 min-w-[180px]">
          
          <!-- PRIZE 0X / 05 -->
          <div class="text-[11px] font-black tracking-widest text-white/50 uppercase">
            \${p.subtitle}
          </div>

          <!-- Product Name -->
          <div class="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-md">
            \${p.title}
          </div>

          <!-- Prize badge -->
          <div class="text-xs font-semibold text-white/70">
            \${p.badge}
          </div>

          <!-- Golden Progress Dashes -->
          <div class="flex items-center gap-2 pt-2">
            \${HERO_PRODUCTS.map((_, i) => \`
              <span onclick="jumpHeroProd(\${i})" class="cursor-pointer transition-all duration-300 h-1 rounded-full \${i === heroProdIdx ? 'bg-amber-300 w-8 shadow-sm' : 'bg-white/30 hover:bg-white/60 w-5'}"></span>
            \`).join('')}
          </div>

          <!-- PAUSE / RESUME -->
          <button onclick="heroPauseToggle()" class="pt-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white flex items-center gap-1.5 transition">
            <span id="hero-pause-icon">\${heroPaused ? '▶' : '⏸'}</span>
            <span id="hero-pause-label">\${heroPaused ? 'RESUME' : 'PAUSE'}</span>
          </button>

        </div>

      </div>
    \`;
  }`;

const renderFnRegex = /function renderHeroCard\([\s\S]*?return `[\s\S]*?`;\s*}/;
if (renderFnRegex.test(html)) {
  html = html.replace(renderFnRegex, newRenderHeroCard);
  console.log('✅ Updated renderHeroCard');
} else {
  console.log('⚠️ Could not match renderHeroCard via regex, searching by index');
  const startIdx = html.indexOf('function renderHeroCard(p) {');
  if (startIdx !== -1) {
    const endPattern = 'return `';
    const returnIdx = html.indexOf(endPattern, startIdx);
    const closeTemplate = html.indexOf('`;', returnIdx);
    const closeFn = html.indexOf('}', closeTemplate);
    html = html.substring(0, startIdx) + newRenderHeroCard + html.substring(closeFn + 1);
    console.log('✅ Updated renderHeroCard by index');
  }
}

// 5. Save updated prototype
fs.writeFileSync(protoPath, html, 'utf8');
console.log('✅ Saved prototype. New length:', html.length);
