const fs = require('fs');

const toBase64 = (file) => {
  const buf = fs.readFileSync('c:/one stop Gadgets/assets/hero/' + file);
  return 'data:image/jpeg;base64,' + buf.toString('base64');
};

const imgIphone = toBase64('iphone16.jpg');
const imgPs5 = toBase64('ps5.jpg');
const imgDyson = toBase64('dyson.jpg');
const imgMystery = toBase64('mystery_box.jpg');
const imgAmazon = toBase64('amazon_voucher.jpg');

let html = fs.readFileSync('c:/one stop Gadgets/design/prototype/index.html', 'utf8');

// 1. Clean Tailwind script tag so it is pure CDN load without embedded scripts
html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com">[\s\S]*?<\/script>/, '<script src="https://cdn.tailwindcss.com"></script>');

// 2. Insert clean 3D Hero Script right before </body>
const scriptContent = `
<script>
  // ===== 3D AUTOMATIC HERO CAROUSEL WITH REAL PHOTOS (3 SECONDS - TOP TO BOTTOM) =====
  const HERO_PRODUCTS = [
    {
      id: 'p1',
      title: 'Apple iPhone 16 Pro Max',
      subtitle: 'PRIZE 01 / 05',
      label: 'DECEMBER MEGA GIVEAWAY',
      price: '₹1,44,999 worth',
      badge: 'GRAND MEGA PRIZE',
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
        
        <!-- Top Badges in Center -->
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
            
            <!-- Real User Uploaded Photo with 3D Float Shadow -->
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

  // 3D TOP TO BOTTOM ANIMATION (Every 3 seconds in Center)
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
</script>
`;

html = html.replace('</body>', scriptContent + '\n</body>');

fs.writeFileSync('c:/one stop Gadgets/design/prototype/index.html', html, 'utf8');
console.log('Successfully written clean prototype index.html');
