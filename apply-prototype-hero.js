const fs = require('fs');
const path = require('path');

const toBase64 = (file) => {
  const buf = fs.readFileSync('c:/one stop Gadgets/assets/hero/' + file);
  return 'data:image/jpeg;base64,' + buf.toString('base64');
};

const imgIphone = toBase64('iphone16.jpg');
const imgPs5 = toBase64('ps5.jpg');
const imgDyson = toBase64('dyson.jpg');
const imgAmazon = toBase64('amazon_voucher.jpg');
const imgMystery = toBase64('mystery_box.jpg');

// Target file is design/prototype/index.html
const targetPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

const newScript = `
    // ===== 3D AUTO ROTATING HERO PRODUCTS WITH UPLOADED PHOTOS (3s Top-to-Bottom) =====
    const HERO_PRODUCTS = [
      {
        id: 'p1',
        title: 'Apple iPhone 16 Pro Max',
        subtitle: 'PRIZE 01 / 05',
        label: 'DECEMBER MEGA GIVEAWAY',
        price: '₹1,44,999 worth',
        badge: 'Top Flagship Prize',
        color: '#FFD700',
        img: '${imgIphone}'
      },
      {
        id: 'p2',
        title: 'Sony PlayStation 5 Slim Edition',
        subtitle: 'PRIZE 02 / 05',
        label: 'WEEKLY VIP LUCKY DIP',
        price: '₹54,990 worth',
        badge: 'Gaming Console',
        color: '#60A5FA',
        img: '${imgPs5}'
      },
      {
        id: 'p3',
        title: 'Dyson Airwrap Multi-Styler Complete',
        subtitle: 'PRIZE 03 / 05',
        label: 'EXCLUSIVE PREMIUM DEAL',
        price: '₹49,900 worth',
        badge: 'Luxury Styling',
        color: '#F472B6',
        img: '${imgDyson}'
      },
      {
        id: 'p4',
        title: 'Amazon ₹10,000 Gift Voucher',
        subtitle: 'PRIZE 04 / 05',
        label: 'INSTANT DIGITAL COUPON',
        price: '₹10,000 Cash Value',
        badge: 'Instant Redeem',
        color: '#FBBF24',
        img: '${imgAmazon}'
      },
      {
        id: 'p5',
        title: 'Exclusive Mystery Tech Box',
        subtitle: 'PRIZE 05 / 05',
        label: 'VIP MEMBER SURPRISE',
        price: '₹25,000+ Assorted Gear',
        badge: 'Mega Mystery Win',
        color: '#C084FC',
        img: '${imgMystery}'
      }
    ];

    let heroProdIdx = 0;
    let heroProdTimer = null;
    let heroPaused = false;

    function renderHeroCard(p) {
      return \`
        <div class="relative text-white w-full max-w-[360px] mx-auto flex flex-col items-center select-none">
          <!-- Top Tag & Counter -->
          <div class="flex items-center justify-between w-full px-2 mb-2">
            <span class="text-[11px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-black/40 border border-white/20 text-white/90">
              \${p.subtitle}
            </span>
            <span class="text-xs font-black tracking-wide" style="color: \${p.color}">
              \${p.badge}
            </span>
          </div>

          <!-- 3D Center Floating Showcase Frame with Real Photo -->
          <div class="relative group my-2 w-full flex justify-center">
            <div class="absolute -inset-1.5 bg-gradient-to-r from-red-500/40 via-amber-400/30 to-purple-500/40 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            
            <div class="relative w-64 h-72 sm:w-72 sm:h-80 rounded-2xl bg-gradient-to-b from-[#2a0813]/90 to-[#18040a]/95 border-2 border-white/25 p-3.5 shadow-2xl flex flex-col items-center justify-center overflow-hidden card-3d-hover">
              
              <!-- Subtle badge inside image box -->
              <div class="absolute top-3 left-3 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white border border-white/20 uppercase tracking-wider">
                Live Prize
              </div>

              <!-- Product Photo Container with Floating Shadow -->
              <div class="w-full h-full flex items-center justify-center p-2 relative">
                <img src="\${p.img}" alt="\${p.title}" class="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-500 pointer-events-none" />
              </div>

              <!-- Floating bottom bar -->
              <div class="absolute bottom-2.5 inset-x-3 bg-black/60 backdrop-blur-md border border-white/15 rounded-xl py-1 px-2.5 flex items-center justify-between">
                <span class="text-[11px] font-bold text-white/80">Value</span>
                <span class="text-xs font-extrabold text-amber-300">\${p.price}</span>
              </div>
            </div>
          </div>

          <!-- Title & Label Below Image -->
          <div class="text-center mt-3 space-y-1 w-full">
            <h3 class="text-lg sm:text-xl font-black text-white tracking-tight drop-shadow-md">
              \${p.title}
            </h3>
            <p class="text-[11px] font-bold uppercase tracking-widest text-white/60">
              \${p.label}
            </p>
          </div>

          <!-- Progress indicators & Controls -->
          <div class="flex items-center justify-center gap-2 mt-3.5">
            <button onclick="heroPauseToggle()" class="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[10px] font-extrabold text-white flex items-center gap-1.5 transition">
              <span id="hero-pause-icon">\${heroPaused ? '▶' : '⏸'}</span>
              <span id="hero-pause-label">\${heroPaused ? 'RESUME' : 'PAUSE'}</span>
            </button>
            <div class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 border border-white/15">
              \${HERO_PRODUCTS.map((_, i) => \`
                <span onclick="jumpHeroProd(\${i})" class="cursor-pointer transition-all duration-300 rounded-full \${i === heroProdIdx ? 'bg-amber-300 w-5 h-2' : 'bg-white/35 hover:bg-white/70 w-2 h-2'}"></span>
              \`).join('')}
            </div>
          </div>
        </div>
      \`;
    }

    // Top to Bottom 3D Slide Transition (3 Seconds)
    function updateHeroProdDisplay() {
      const p = HERO_PRODUCTS[heroProdIdx];
      const el = document.getElementById('hero-product-showcase');
      if (!el) return;

      // 1. Exit animation: animate downwards with fade out
      el.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.45s ease';
      el.style.transform = 'translateY(40px) scale(0.92) rotateX(-8deg)';
      el.style.opacity = '0';

      setTimeout(() => {
        // 2. Set new content & prepare above (Top)
        el.innerHTML = renderHeroCard(p);
        el.style.transition = 'none';
        el.style.transform = 'translateY(-40px) scale(0.92) rotateX(8deg)';

        // 3. Force reflow then animate down into center
        requestAnimationFrame(() => {
          setTimeout(() => {
            el.style.transition = 'transform 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease';
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

    // Auto-initialize when DOM is ready
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

// Also update the hero banner section in design/prototype/index.html to ensure showcase is present
if (!html.includes('id="hero-product-showcase"')) {
  // Replace old slider container if present
  const heroHtmlStart = html.indexOf('hero-slider-container');
  if (heroHtmlStart > -1) {
    const heroHtmlStartFull = html.lastIndexOf('<div', heroHtmlStart);
    const categoriesMarker = '<!-- CATEGORIES SECTION: Elevated 3D Layer with Mesh Gradient -->';
    const heroHtmlEnd = html.indexOf(categoriesMarker);
    if (heroHtmlEnd > -1) {
      const newHeroHtml = `<div id="hero-slider-container" class="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 min-h-[400px] sm:min-h-[480px] flex items-center" style="background: linear-gradient(135deg, #D42526 0%, #AD2F4A 50%, #8A3B6F 100%);">
        <!-- Ambient Glow Orbs -->
        <div class="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-red-400/25 blur-3xl animate-pulse-orb pointer-events-none"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-500/25 blur-3xl animate-pulse-orb pointer-events-none" style="animation-delay:3s"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-pink-600/15 blur-3xl pointer-events-none"></div>

        <!-- STATIC CONTENT GRID -->
        <div class="relative z-10 w-full px-8 sm:px-14 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- LEFT: Static text -->
          <div class="lg:col-span-7 space-y-5">
            <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-sm">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>🎁 DECEMBER MEGA GIVEAWAY</span>
              <span class="text-white/50">•</span>
              <span class="text-amber-300 font-extrabold uppercase text-[10px]">Free Entry Available</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              YOUR NEXT<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-white">BIG WIN</span><br>
              STARTS HERE.
            </h1>

            <p class="text-white/85 text-sm sm:text-base leading-relaxed max-w-lg">
              Win an <span class="font-extrabold text-amber-300">iPhone 16 Pro Max</span> &amp; 4 More Exciting Prizes.<br>
              <span class="text-white/60 text-xs">Free entry available &bull; No purchase needed &bull; Limited-time entry</span>
            </p>

            <div class="flex flex-wrap items-center gap-3.5 pt-1">
              <button onclick="navigate('luckydip')" class="relative overflow-hidden px-7 py-3.5 rounded-2xl bg-white text-[#D42526] font-extrabold text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group">
                <span>GET FREE ENTRY</span>
                <span class="transform group-hover:translate-x-1 transition">→</span>
                <span class="absolute inset-0 w-1/3 h-full bg-white/30 animate-shine pointer-events-none"></span>
              </button>
              <button onclick="navigate('catalog')" class="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/35 text-white font-extrabold text-sm transition hover:scale-105">
                EXPLORE PRIZES
              </button>
            </div>

            <div class="flex flex-wrap items-center gap-4 text-xs text-white/70 pt-1">
              <span class="flex items-center gap-1.5"><span class="text-green-400">✅</span> Free entry available</span>
              <span class="flex items-center gap-1.5"><span>⏰</span> Limited-time entry</span>
              <span class="flex items-center gap-1.5"><span class="text-amber-400">★</span> 67 verified winners</span>
              <span class="text-white/40 underline cursor-pointer hover:text-white/70 transition">T&amp;Cs Apply.</span>
            </div>
          </div>

          <!-- RIGHT / CENTER: 3D Animated Product Showcase -->
          <div class="lg:col-span-5 flex justify-center items-center">
            <div id="hero-product-showcase" class="w-full flex justify-center items-center" style="perspective: 1000px; transform-style: preserve-3d; min-height: 380px;">
              <!-- Populated dynamically by updateHeroProdDisplay() -->
            </div>
          </div>
        </div>
      </div>\n\n      `;
      html = html.substring(0, heroHtmlStartFull) + newHeroHtml + html.substring(heroHtmlEnd);
      console.log('Updated hero HTML layout in prototype.');
    }
  }
}

// Inject new script into <head>
html = html.replace('</head>', '<script>' + newScript + '</script>\n</head>');
fs.writeFileSync(targetPath, html, 'utf8');
console.log('Saved updated design/prototype/index.html');
