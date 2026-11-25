const fs = require('fs');
const path = require('path');

const toBase64 = (file) => {
  const buf = fs.readFileSync('c:/one stop Gadgets/assets/hero/' + file);
  return 'data:image/jpeg;base64,' + buf.toString('base64');
};

const imgIphone = toBase64('iphone16.jpg');
const imgPs5 = toBase64('ps5.jpg');
const imgDyson = toBase64('dyson.jpg');
const imgMystery = toBase64('mystery_box.jpg');
const imgAmazon = toBase64('amazon_voucher.jpg');

// Target design/prototype/index.html
const targetPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

// ========================================================
// 1. BANNER HTML WITH 3D ANIMATION IN CENTER
// ========================================================
const heroBannerHtml = `
      <div id="hero-slider-container" class="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 min-h-[500px] flex items-center justify-center" style="background: linear-gradient(135deg, #D42526 0%, #AD2F4A 50%, #8A3B6F 100%);">

        <!-- Ambient Glow Orbs -->
        <div class="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-red-400/30 blur-3xl animate-pulse-orb pointer-events-none"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-500/30 blur-3xl animate-pulse-orb pointer-events-none" style="animation-delay:3s"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl pointer-events-none"></div>

        <!-- 3-COLUMN CENTER-FOCUSED BANNER LAYOUT -->
        <div class="relative z-10 w-full px-6 sm:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          <!-- LEFT COLUMN: Headline & Details (4 Cols) -->
          <div class="lg:col-span-4 space-y-4 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-sm">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>🎁 DECEMBER MEGA GIVEAWAY</span>
            </div>

            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              YOUR NEXT<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-white">BIG WIN</span><br>
              STARTS HERE.
            </h1>

            <p class="text-white/85 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
              Win an <span class="font-extrabold text-amber-300">iPhone 16 Pro Max</span> &amp; 4 More Exciting Tech Prizes.
            </p>

            <div class="flex flex-col sm:flex-row items-center gap-3 pt-1 justify-center lg:justify-start">
              <button onclick="navigate('luckydip')" class="w-full sm:w-auto relative overflow-hidden px-6 py-3 rounded-2xl bg-white text-[#D42526] font-extrabold text-xs shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group">
                <span>GET FREE ENTRY</span>
                <span class="transform group-hover:translate-x-1 transition">→</span>
                <span class="absolute inset-0 w-1/3 h-full bg-white/30 animate-shine pointer-events-none"></span>
              </button>
              <button onclick="navigate('catalog')" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/35 text-white font-extrabold text-xs transition hover:scale-105">
                EXPLORE PRIZES
              </button>
            </div>
          </div>

          <!-- CENTER COLUMN: 3D HERO PHOTO AUTOMATIC ANIMATION (4 Cols - CENTER) -->
          <div class="lg:col-span-4 flex justify-center items-center py-2" style="perspective: 1200px;">
            <div id="hero-product-showcase" class="w-full flex justify-center items-center" style="transform-style: preserve-3d; min-height: 400px;">
              <!-- 3D Photo card injected and rotated automatically every 3 seconds from Top to Bottom -->
            </div>
          </div>

          <!-- RIGHT COLUMN: Interactive Prize Selector & Winner Perks (4 Cols) -->
          <div class="lg:col-span-4 space-y-3.5 bg-black/25 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-white shadow-2xl">
            <div class="flex items-center justify-between border-b border-white/15 pb-2.5">
              <span class="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <span>⚡</span> LIVE PRIZE LIST
              </span>
              <span class="text-[10px] bg-emerald-500/80 px-2 py-0.5 rounded-full font-bold">Auto 3s Top↓Bottom</span>
            </div>

            <!-- Clickable Prize Mini List -->
            <div class="space-y-2 text-xs" id="hero-prizes-mini-list">
              <div onclick="jumpHeroProd(0)" id="p-tab-0" class="p-tab flex items-center justify-between p-2 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer border border-white/10 transition">
                <span class="font-bold">01. iPhone 16 Pro Max</span>
                <span class="text-amber-300 font-extrabold">₹1,44,999</span>
              </div>
              <div onclick="jumpHeroProd(1)" id="p-tab-1" class="p-tab flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/20 cursor-pointer border border-white/10 transition">
                <span class="font-bold">02. PlayStation 5 Slim</span>
                <span class="text-sky-300 font-extrabold">₹54,990</span>
              </div>
              <div onclick="jumpHeroProd(2)" id="p-tab-2" class="p-tab flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/20 cursor-pointer border border-white/10 transition">
                <span class="font-bold">03. Dyson Airwrap Styler</span>
                <span class="text-pink-300 font-extrabold">₹49,900</span>
              </div>
              <div onclick="jumpHeroProd(3)" id="p-tab-3" class="p-tab flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/20 cursor-pointer border border-white/10 transition">
                <span class="font-bold">04. Amazon ₹10k Voucher</span>
                <span class="text-amber-400 font-extrabold">₹10,000</span>
              </div>
              <div onclick="jumpHeroProd(4)" id="p-tab-4" class="p-tab flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/20 cursor-pointer border border-white/10 transition">
                <span class="font-bold">05. Mystery Tech Box</span>
                <span class="text-purple-300 font-extrabold">₹25,000+</span>
              </div>
            </div>

            <div class="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-white/70">
              <span>✅ No purchase needed</span>
              <span>⭐ 67 verified winners</span>
            </div>
          </div>

        </div>

      </div>
`;

// Locate hero section
const startMarker = 'id="hero-slider-container"';
const categoriesMarker = '<!-- CATEGORIES SECTION: Elevated 3D Layer with Mesh Gradient -->';

const heroStart = html.lastIndexOf('<div', html.indexOf(startMarker));
const heroEnd = html.indexOf(categoriesMarker);

if (heroStart > -1 && heroEnd > -1) {
  html = html.substring(0, heroStart) + heroBannerHtml + '\n\n      ' + html.substring(heroEnd);
  console.log('Replaced hero banner layout with 3D animation centered layout!');
} else {
  console.log('Could not find hero markers in prototype html');
}

// ========================================================
// 2. 3D AUTOMATIC 3-SECOND TOP-TO-BOTTOM ANIMATION SCRIPT
// ========================================================
const heroScript = `
<script>
  // ===== 3D AUTOMATIC ANIMATION (3 SECONDS, TOP TO BOTTOM IN CENTER) =====
  const HERO_PRODUCTS = [
    {
      id: 'p1',
      title: 'Apple iPhone 16 Pro Max',
      subtitle: 'PRIZE 01 / 05',
      label: 'DECEMBER MEGA GIVEAWAY',
      price: '₹1,44,999 worth',
      badge: 'TOP GRAND PRIZE',
      color: '#FFD700',
      img: '${imgIphone}'
    },
    {
      id: 'p2',
      title: 'Sony PlayStation 5 Slim Edition',
      subtitle: 'PRIZE 02 / 05',
      label: 'WEEKLY VIP LUCKY DIP',
      price: '₹54,990 worth',
      badge: 'NEXT-GEN GAMING',
      color: '#60A5FA',
      img: '${imgPs5}'
    },
    {
      id: 'p3',
      title: 'Dyson Airwrap Multi-Styler',
      subtitle: 'PRIZE 03 / 05',
      label: 'EXCLUSIVE PREMIUM DEAL',
      price: '₹49,900 worth',
      badge: 'LUXURY STYLING',
      color: '#F472B6',
      img: '${imgDyson}'
    },
    {
      id: 'p4',
      title: 'Amazon ₹10,000 Gift Voucher',
      subtitle: 'PRIZE 04 / 05',
      label: 'INSTANT DIGITAL COUPON',
      price: '₹10,000 Cash Value',
      badge: 'INSTANT REDEEM',
      color: '#FBBF24',
      img: '${imgAmazon}'
    },
    {
      id: 'p5',
      title: 'Exclusive Mystery Tech Box',
      subtitle: 'PRIZE 05 / 05',
      label: 'VIP MEMBER SURPRISE',
      price: '₹25,000+ Assorted Gear',
      badge: 'MEGA MYSTERY WIN',
      color: '#C084FC',
      img: '${imgMystery}'
    }
  ];

  let heroProdIdx = 0;
  let heroProdTimer = null;
  let heroPaused = false;

  function renderHeroCard(p) {
    return \`
      <div class="relative text-white w-full max-w-[340px] flex flex-col items-center select-none">
        
        <!-- Top Badge in Center -->
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-black/60 border border-white/20 text-white shadow-md">
            \${p.subtitle}
          </span>
          <span class="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/15 border border-white/25" style="color: \${p.color}">
            \${p.badge}
          </span>
        </div>

        <!-- 3D CENTER FLOATING SHOWCASE PHOTO -->
        <div class="relative group my-1 w-full flex justify-center">
          <div class="absolute -inset-2 bg-gradient-to-r from-red-500/50 via-amber-400/40 to-purple-600/50 rounded-3xl blur-2xl opacity-80 group-hover:opacity-100 transition duration-700"></div>

          <div class="relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl bg-gradient-to-b from-[#25040f]/90 via-[#1c030c]/95 to-[#120108]/98 border-2 border-white/30 p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center overflow-hidden card-3d-hover">
            
            <!-- Real User Uploaded Photo -->
            <div class="w-full h-full flex items-center justify-center p-2 relative">
              <img src="\${p.img}" alt="\${p.title}" class="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-500 pointer-events-none" />
            </div>

            <!-- Value Banner in Card -->
            <div class="absolute bottom-2.5 inset-x-3 bg-black/75 backdrop-blur-md border border-white/20 rounded-xl py-1.5 px-3 flex items-center justify-between">
              <span class="text-[10px] uppercase font-bold text-white/70">Win Value</span>
              <span class="text-xs font-black text-amber-300 drop-shadow">\${p.price}</span>
            </div>
          </div>
        </div>

        <!-- Title & Subtitle Below in Center -->
        <div class="text-center mt-2.5 space-y-0.5 w-full">
          <h3 class="text-base sm:text-lg font-black text-white tracking-tight drop-shadow">
            \${p.title}
          </h3>
          <p class="text-[10px] font-bold uppercase tracking-widest text-amber-300/80">
            \${p.label}
          </p>
        </div>

        <!-- Center Controls & Dots -->
        <div class="flex items-center justify-center gap-2 mt-3">
          <button onclick="heroPauseToggle()" class="px-2.5 py-0.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-[10px] font-extrabold text-white flex items-center gap-1 transition">
            <span id="hero-pause-icon">\${heroPaused ? '▶' : '⏸'}</span>
            <span id="hero-pause-label">\${heroPaused ? 'RESUME' : 'PAUSE'}</span>
          </button>
          <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-white/15">
            \${HERO_PRODUCTS.map((_, i) => \`
              <span onclick="jumpHeroProd(\${i})" class="cursor-pointer transition-all duration-300 rounded-full \${i === heroProdIdx ? 'bg-amber-300 w-5 h-2 shadow-sm' : 'bg-white/40 hover:bg-white/80 w-2 h-2'}"></span>
            \`).join('')}
          </div>
        </div>

      </div>
    \`;
  }

  // 3D TOP TO BOTTOM ANIMATION (Every 3 seconds)
  function updateHeroProdDisplay() {
    const p = HERO_PRODUCTS[heroProdIdx];
    const el = document.getElementById('hero-product-showcase');
    if (!el) return;

    // Update active tab in right sidebar
    document.querySelectorAll('.p-tab').forEach((tab, i) => {
      if (i === heroProdIdx) {
        tab.classList.remove('bg-white/5');
        tab.classList.add('bg-white/20', 'border-amber-400/50');
      } else {
        tab.classList.remove('bg-white/20', 'border-amber-400/50');
        tab.classList.add('bg-white/5');
      }
    });

    // 1. TOP TO BOTTOM EXIT: slide down with 3D tilt and fade out
    el.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.45s ease';
    el.style.transform = 'translateY(60px) scale(0.9) rotateX(-12deg)';
    el.style.opacity = '0';

    setTimeout(() => {
      // 2. Set new content & enter from TOP
      el.innerHTML = renderHeroCard(p);
      el.style.transition = 'none';
      el.style.transform = 'translateY(-60px) scale(0.9) rotateX(12deg)';

      // 3. Force reflow, then animate smoothly DOWN to center
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.style.transition = 'transform 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.25), opacity 0.5s ease';
          el.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
          el.style.opacity = '1';
        }, 20);
      });
    }, 450);
  }

  function jumpHeroProd(i) {
    heroProdIdx = i;
    updateHeroProdDisplay();
    restartHeroProdTimer();
  }

  function heroPauseToggle() {
    heroPaused = !heroPaused;
    const icon = document.getElementById('hero-pause-icon');
    const label = document.getElementById('hero-pause-label');
    if (heroPaused) {
      clearInterval(heroProdTimer);
      if (icon) icon.textContent = '▶';
      if (label) label.textContent = 'RESUME';
    } else {
      startHeroProdTimer();
      if (icon) icon.textContent = '⏸';
      if (label) label.textContent = 'PAUSE';
    }
  }

  function startHeroProdTimer() {
    if (heroProdTimer) clearInterval(heroProdTimer);
    heroProdTimer = setInterval(() => {
      if (!heroPaused) {
        heroProdIdx = (heroProdIdx + 1) % HERO_PRODUCTS.length;
        updateHeroProdDisplay();
      }
    }, 3000); // 3 seconds automatic cycle
  }

  function restartHeroProdTimer() {
    clearInterval(heroProdTimer);
    if (!heroPaused) startHeroProdTimer();
  }

  // Auto start on page ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      updateHeroProdDisplay();
      startHeroProdTimer();
    });
  } else {
    updateHeroProdDisplay();
    startHeroProdTimer();
  }
</script>
`;

// Remove any prior HERO_PRODUCTS script blocks from prototype
html = html.replace(/<script>[\s\S]*?HERO_PRODUCTS[\s\S]*?<\/script>/gi, '');

// Append heroScript before </body>
html = html.replace('</body>', heroScript + '\n</body>');

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully saved design/prototype/index.html with 3D animation in center!');
