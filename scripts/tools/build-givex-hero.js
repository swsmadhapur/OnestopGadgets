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

const targetPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

// =========================================================================
// 1. REVISE HERO BANNER HTML:
//    - Remove the right "LIVE PRIZE LIST" box
//    - Left side has static text & buttons
//    - Right / center has huge, prominent showcase matching Image 2
// =========================================================================
const heroBannerHtml = `
      <div id="hero-slider-container" class="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 min-h-[520px] sm:min-h-[560px] flex items-center" style="background: linear-gradient(135deg, #4A0E17 0%, #3B0A12 50%, #26050B 100%);">

        <!-- Ambient Glow Orbs -->
        <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-red-600/25 blur-3xl animate-pulse-orb pointer-events-none"></div>
        <div class="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-pink-700/20 blur-3xl animate-pulse-orb pointer-events-none" style="animation-delay:3s"></div>
        <div class="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-500/15 blur-3xl pointer-events-none"></div>

        <!-- 2-COLUMN HERO GRID (Clean, premium GiveXIndia style without right sidebar) -->
        <div class="relative z-10 w-full px-6 sm:px-14 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <!-- LEFT: Headline & Actions (5 Columns) -->
          <div class="lg:col-span-5 space-y-6 text-left">
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-sm">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>🎁 DECEMBER MEGA GIVEAWAY</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none drop-shadow-md">
              YOUR NEXT<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-white">BIG WIN</span><br>
              STARTS HERE.
            </h1>

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
            </div>

            <div class="flex flex-wrap items-center gap-4 text-xs text-white/60 pt-2">
              <span class="flex items-center gap-1.5"><span class="text-emerald-400">✓</span> Free entry available</span>
              <span>•</span>
              <span>No purchase needed</span>
              <span>•</span>
              <span class="text-white/40 underline cursor-pointer hover:text-white/70 transition">T&amp;Cs Apply</span>
            </div>
          </div>

          <!-- RIGHT / CENTER: OCCUPIED LARGE 3D SHOWCASE (7 Columns) -->
          <div class="lg:col-span-7 flex justify-center lg:justify-end items-center relative py-4" style="perspective: 1200px;">
            <div id="hero-product-showcase" class="w-full flex justify-center items-center" style="transform-style: preserve-3d; min-height: 480px;">
              <!-- 3D Card dynamically rendered -->
            </div>

            <!-- Mini Next Prize floating thumbnail preview (bottom right, like GiveX India) -->
            <div id="hero-next-preview" class="hidden sm:flex absolute bottom-2 right-4 flex-col items-center p-1.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 shadow-xl cursor-pointer hover:scale-105 transition duration-300" onclick="nextHeroProd()">
              <div class="w-14 h-16 rounded-xl overflow-hidden flex items-center justify-center p-1 bg-white/5">
                <img id="hero-next-thumb" src="${imgPs5}" alt="Next prize" class="max-h-full max-w-full object-contain filter drop-shadow" />
              </div>
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
  console.log('Updated hero HTML to occupied 2-column layout without prize list.');
} else {
  console.log('Error: markers not found');
}

// =========================================================================
// 2. JAVASCRIPT: NO PRICE MENTION, OCCUPIED LARGE IMAGE, 3-SEC TOP-TO-BOTTOM
// =========================================================================
const cleanHeroScript = `
  // ===== 3D AUTOMATIC HERO SHOWCASE (GIVEXINDIA STYLE - NO PRICE, LARGE OCCUPIED PHOTO, 3S TOP-TO-BOTTOM) =====
  const HERO_PRODUCTS = [
    {
      id: 'p1',
      title: 'iPhone 16 Pro Max',
      subtitle: 'PRIZE 01 / 05',
      badge: 'Prize 01',
      img: '${imgIphone}'
    },
    {
      id: 'p2',
      title: 'PS5',
      subtitle: 'PRIZE 02 / 05',
      badge: 'Prize 02',
      img: '${imgPs5}'
    },
    {
      id: 'p3',
      title: 'Dyson Airwrap',
      subtitle: 'PRIZE 03 / 05',
      badge: 'Prize 03',
      img: '${imgDyson}'
    },
    {
      id: 'p4',
      title: 'Amazon Gift Voucher',
      subtitle: 'PRIZE 04 / 05',
      badge: 'Prize 04',
      img: '${imgAmazon}'
    },
    {
      id: 'p5',
      title: 'Mystery Gift Box',
      subtitle: 'PRIZE 05 / 05',
      badge: 'Prize 05',
      img: '${imgMystery}'
    }
  ];

  let heroProdIdx = 0;
  let heroProdTimer = null;
  let heroPaused = false;

  function renderHeroCard(p) {
    const nextIdx = (heroProdIdx + 1) % HERO_PRODUCTS.length;
    const nextProd = HERO_PRODUCTS[nextIdx];
    
    // Update next thumb
    const nextThumb = document.getElementById('hero-next-thumb');
    if (nextThumb) nextThumb.src = nextProd.img;

    return \`
      <div class="relative w-full max-w-xl flex flex-col md:flex-row items-center justify-between gap-6 select-none">
        
        <!-- Large Occupied Photo Showcase (Transparent/Seamless floating in GiveX India maroon space) -->
        <div class="relative flex-1 flex justify-center items-center w-full min-h-[380px] sm:min-h-[460px]">
          
          <!-- Soft 3D Floor Shadow under the product -->
          <div class="absolute bottom-6 w-56 sm:w-72 h-10 rounded-full bg-black/60 blur-2xl pointer-events-none"></div>

          <!-- The Real Photo (Large, Occupied, High Polish 3D Floating) -->
          <div class="relative w-full h-[360px] sm:h-[440px] flex items-center justify-center p-2">
            <img src="\${p.img}" alt="\${p.title}" class="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] transition-all duration-700 pointer-events-none hover:scale-105" />
          </div>
        </div>

        <!-- Right Side Specs / GiveXIndia Style Info (PRIZE 02 / 05, PS5, Prize 02, dashes, PAUSE) -->
        <div class="flex flex-col items-center md:items-end text-center md:text-right space-y-3 pr-2 min-w-[170px]">
          
          <!-- PRIZE 02 / 05 -->
          <div class="text-[11px] font-black tracking-widest text-white/50 uppercase">
            \${p.subtitle}
          </div>

          <!-- Product Name (e.g. PS5, iPhone 16 Pro Max) - NO PRICE -->
          <div class="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
            \${p.title}
          </div>

          <!-- Prize 02 label -->
          <div class="text-xs font-semibold text-white/70">
            \${p.badge}
          </div>

          <!-- Golden Dash Progress Indicators (GiveXIndia Style) -->
          <div class="flex items-center gap-2 pt-2">
            \${HERO_PRODUCTS.map((_, i) => \`
              <span onclick="jumpHeroProd(\${i})" class="cursor-pointer transition-all duration-300 h-1 rounded-full \${i === heroProdIdx ? 'bg-amber-300 w-8 shadow-sm' : 'bg-white/30 hover:bg-white/60 w-5'}"></span>
            \`).join('')}
          </div>

          <!-- PAUSE / RESUME button (GiveXIndia exact style) -->
          <button onclick="heroPauseToggle()" class="pt-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white flex items-center gap-1.5 transition">
            <span id="hero-pause-icon">\${heroPaused ? '▶' : '⏸'}</span>
            <span id="hero-pause-label">\${heroPaused ? 'RESUME' : 'PAUSE'}</span>
          </button>

        </div>

      </div>
    \`;
  }

  // 3D TOP TO BOTTOM ANIMATION (Every 3 seconds)
  function updateHeroProdDisplay() {
    const p = HERO_PRODUCTS[heroProdIdx];
    const el = document.getElementById('hero-product-showcase');
    if (!el) return;

    // 1. TOP TO BOTTOM EXIT: slide down with 3D rotation and fade out
    el.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.45s ease';
    el.style.transform = 'translateY(50px) scale(0.93) rotateX(-8deg)';
    el.style.opacity = '0';

    setTimeout(() => {
      // 2. Set new content & prepare ABOVE (Top)
      el.innerHTML = renderHeroCard(p);
      el.style.transition = 'none';
      el.style.transform = 'translateY(-50px) scale(0.93) rotateX(8deg)';

      // 3. Force reflow, then animate smoothly DOWN to center
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.style.transition = 'transform 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.2), opacity 0.5s ease';
          el.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
          el.style.opacity = '1';
        }, 20);
      });
    }, 450);
  }

  function nextHeroProd() {
    heroProdIdx = (heroProdIdx + 1) % HERO_PRODUCTS.length;
    updateHeroProdDisplay();
    restartHeroProdTimer();
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

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      updateHeroProdDisplay();
      startHeroProdTimer();
    });
  } else {
    updateHeroProdDisplay();
    startHeroProdTimer();
  }
`;

// Remove older HERO_PRODUCTS script blocks from prototype
html = html.replace(/\/\/ ===== 3D AUTOMATIC HERO[\s\S]*?startHeroProdTimer\(\);\s*}\s*<\/script>/gi, '');

// Append clean script before last </script>
const lastScriptClose = html.lastIndexOf('</script>');
if (lastScriptClose > -1) {
  html = html.substring(0, lastScriptClose) + '\n' + cleanHeroScript + '\n</script>\n</body>\n</html>';
  console.log('Appended updated cleanHeroScript to prototype.');
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Saved prototype file successfully!');
