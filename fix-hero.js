const fs = require('fs');
let html = fs.readFileSync('c:/one stop Gadgets/index.html', 'utf8');

// ============================================================
// 1. REPLACE HERO CAROUSEL JS (inside the tailwind script tag)
// ============================================================
const oldHeroJS = `    // ===== HERO CAROUSEL CONTROLLER (AUTO-PLAYING + TOUCH & BUTTONS) =====
    let currentHeroSlideIndex = 0;
    let heroSliderTimer = null;
    const totalHeroSlides = 3;

    function showHeroSlide(index) {
      currentHeroSlideIndex = (index + totalHeroSlides) % totalHeroSlides;
      
      const slides = document.querySelectorAll('.hero-slide');
      slides.forEach((slide, idx) => {
        if (idx === currentHeroSlideIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      const dots = document.querySelectorAll('.hero-dot');
      dots.forEach((dot, idx) => {
        if (idx === currentHeroSlideIndex) {
          dot.classList.remove('bg-white/40', 'w-3');
          dot.classList.add('bg-white', 'w-7');
        } else {
          dot.classList.remove('bg-white', 'w-7');
          dot.classList.add('bg-white/40', 'w-3');
        }
      });
    }

    function nextHeroSlide() {
      showHeroSlide(currentHeroSlideIndex + 1);
      restartHeroSliderTimer();
    }

    function prevHeroSlide() {
      showHeroSlide(currentHeroSlideIndex - 1);
      restartHeroSliderTimer();
    }

    function goToHeroSlide(index) {
      showHeroSlide(index);
      restartHeroSliderTimer();
    }

    function startHeroSliderTimer() {
      heroSliderTimer = setInterval(() => {
        showHeroSlide(currentHeroSlideIndex + 1);
      }, 5000); // changes every 5 seconds smoothly
    }

    function restartHeroSliderTimer() {
      if (heroSliderTimer) clearInterval(heroSliderTimer);
      startHeroSliderTimer();
    }

    // Auto-start slider on load
    startHeroSliderTimer();
    showHeroSlide(0);`;

const newHeroJS = `    // ===== HERO PRODUCT SHOWCASE — Only right card cycles every 3s =====
    const HERO_PRODUCTS = [
      { title: 'Apple iPhone 16 Pro Max', subtitle: 'Prize 01 / 05', label: 'DECEMBER MEGA GIVEAWAY', price: '\\u20B91,44,999 worth', icon: '\\uD83D\\uDCF1', badge: 'Prize 01', color: '#EF4444' },
      { title: 'Sony WH-1000XM5', subtitle: 'Prize 02 / 05', label: 'WEEKLY VIP LUCKY DIP', price: '\\u20B934,990 worth', icon: '\\uD83C\\uDFA7', badge: 'Prize 02', color: '#10B981' },
      { title: 'Apple MacBook Air M3', subtitle: 'Prize 03 / 05', label: 'TOP DEAL THIS WEEK', price: '\\u20B91,19,900', icon: '\\uD83D\\uDCBB', badge: 'Prize 03', color: '#3B82F6' },
      { title: 'Amazon Gift Voucher', subtitle: 'Prize 04 / 05', label: 'INSTANT COUPON', price: '\\u20B910,000', icon: '\\uD83C\\uDF81', badge: 'Prize 04', color: '#F59E0B' },
      { title: 'Samsung Galaxy S24 Ultra', subtitle: 'Prize 05 / 05', label: 'VIP MEMBER EXCLUSIVE', price: '\\u20B91,19,999 worth', icon: '\\uD83D\\uDCF1', badge: 'Prize 05', color: '#8B5CF6' }
    ];
    let heroProdIdx = 0;
    let heroProdTimer = null;
    let heroPaused = false;

    function renderHeroCard(p) {
      return \`<div class="relative text-white w-full" style="max-width:340px">
        <div class="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">\${p.subtitle}</div>
        <div class="text-sm font-extrabold text-white mb-3" style="color:\${p.color}">\${p.badge}</div>
        <div class="flex justify-center my-4">
          <div class="card-3d-hover w-44 h-44 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl animate-float-3d" style="font-size:5rem">\${p.icon}</div>
        </div>
        <div class="text-lg font-black text-white text-center">\${p.title}</div>
        <div class="text-center text-sm font-bold mt-1" style="color:\${p.color}">\${p.price}</div>
        <div class="text-center text-[10px] text-white/50 uppercase tracking-widest mt-1">\${p.label}</div>
        <button onclick="heroPauseToggle()" class="mt-3 mx-auto flex items-center gap-1.5 text-[11px] text-white/60 hover:text-white/90 transition" id="hero-pause-btn">
          <span id="hero-pause-icon">⏸</span> <span id="hero-pause-label">PAUSE</span>
        </button>
        <div class="flex justify-center gap-1.5 mt-3" id="hero-prod-dots">
          \${HERO_PRODUCTS.map((_, i) => \`<span class="hero-pdot w-2 h-2 rounded-full transition-all duration-300 cursor-pointer \${i===heroProdIdx?'bg-white w-5':'bg-white/30'}" onclick="jumpHeroProd(\${i})"></span>\`).join('')}
        </div>
      </div>\`;
    }

    function updateHeroProdDisplay() {
      const p = HERO_PRODUCTS[heroProdIdx];
      const el = document.getElementById('hero-product-showcase');
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'scale(0.93) translateY(16px)';
      setTimeout(() => {
        el.innerHTML = renderHeroCard(p);
        el.style.opacity = '1';
        el.style.transform = 'scale(1) translateY(0)';
      }, 380);
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
      heroProdTimer = setInterval(() => {
        if (!heroPaused) {
          heroProdIdx = (heroProdIdx + 1) % HERO_PRODUCTS.length;
          updateHeroProdDisplay();
        }
      }, 3000);
    }

    function restartHeroProdTimer() {
      clearInterval(heroProdTimer);
      if (!heroPaused) startHeroProdTimer();
    }`;

if (html.includes(oldHeroJS)) {
  html = html.replace(oldHeroJS, newHeroJS);
  console.log('✅ Hero JS replaced successfully');
} else {
  // Try partial match
  const partialMatch = html.indexOf('HERO CAROUSEL CONTROLLER');
  if (partialMatch > -1) {
    console.log('Found partial match at:', partialMatch, '— trying targeted replacement...');
    // Find the script tag content between first <script> and </script>
    const tailwindScriptStart = html.indexOf('<script src="https://cdn.tailwindcss.com">');
    const tailwindScriptEnd = html.indexOf('</script>', tailwindScriptStart);
    const oldContent = html.substring(tailwindScriptStart, tailwindScriptEnd + 9);
    // Replace everything inside the script from the JS comment onward
    const jsStart = oldContent.indexOf('// ===== HERO CAROUSEL CONTROLLER');
    if (jsStart > -1) {
      const before = oldContent.substring(0, jsStart);
      const after = `${newHeroJS}\n  `;
      const newContent = before + after + '</script>';
      html = html.substring(0, tailwindScriptStart) + newContent + html.substring(tailwindScriptEnd + 9);
      console.log('✅ Hero JS replaced via targeted method');
    } else {
      console.log('❌ Could not find JS comment anchor');
    }
  } else {
    console.log('❌ Old hero JS not found — checking for entities...');
    console.log('Snippet around idx 891:', html.substring(880, 1000));
  }
}

// ============================================================
// 2. REPLACE THE ENTIRE HERO SLIDER HTML
//    (from hero-slider-container to end of closing </div> before CATEGORIES SECTION)
// ============================================================
const heroHtmlStart = html.indexOf('hero-slider-container');
const heroHtmlStartFull = html.lastIndexOf('<div', heroHtmlStart); // find opening <div before the id
const categoriesMarker = '<!-- CATEGORIES SECTION: Elevated 3D Layer with Mesh Gradient -->';
const heroHtmlEnd = html.indexOf(categoriesMarker);

if (heroHtmlStart > -1 && heroHtmlEnd > -1) {
  const oldHeroHtml = html.substring(heroHtmlStartFull, heroHtmlEnd);
  
  const newHeroHtml = `<div id="hero-slider-container" class="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 min-h-[400px] sm:min-h-[480px] flex items-center" style="background: linear-gradient(135deg, #D42526 0%, #AD2F4A 50%, #8A3B6F 100%);">

        <!-- Ambient Glow Orbs -->
        <div class="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-red-400/25 blur-3xl animate-pulse-orb pointer-events-none"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-500/25 blur-3xl animate-pulse-orb pointer-events-none" style="animation-delay:3s"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-pink-600/15 blur-3xl pointer-events-none"></div>

        <!-- STATIC CONTENT GRID -->
        <div class="relative z-10 w-full px-8 sm:px-14 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <!-- LEFT: Static text (never changes) -->
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

          <!-- RIGHT: Dynamic product card — only this part changes every 3s -->
          <div class="lg:col-span-5 flex justify-end">
            <div id="hero-product-showcase"
              style="transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.34,1.56,0.64,1); opacity:1; transform:scale(1) translateY(0);">
              <!-- Populated by updateHeroProdDisplay() on DOMContentLoaded -->
            </div>
          </div>
        </div>

      </div>

      `;

  html = html.substring(0, heroHtmlStartFull) + newHeroHtml + html.substring(heroHtmlEnd);
  console.log('✅ Hero HTML replaced successfully');
  console.log('Old hero HTML length:', oldHeroHtml.length, 'chars');
} else {
  console.log('❌ Could not find hero HTML boundaries');
  console.log('heroHtmlStart:', heroHtmlStart, 'heroHtmlEnd:', heroHtmlEnd);
}

// ============================================================
// 3. ADD DOMContentLoaded INIT for hero product showcase
//    (inject before closing </body>)
// ============================================================
const initScript = `
  <script>
    // Initialize hero product showcase on page load
    document.addEventListener('DOMContentLoaded', function() {
      updateHeroProdDisplay();
      startHeroProdTimer();
    });
  </script>
`;

if (html.includes('updateHeroProdDisplay') && !html.includes('DOMContentLoaded')) {
  html = html.replace('</body>', initScript + '\n</body>');
  console.log('✅ DOMContentLoaded init added');
} else if (html.includes('DOMContentLoaded')) {
  // Update existing DOMContentLoaded
  if (!html.includes('updateHeroProdDisplay()')) {
    html = html.replace(
      'document.addEventListener(\'DOMContentLoaded\'',
      `// Hero product init injected
    document.addEventListener('DOMContentLoaded', function(){updateHeroProdDisplay();startHeroProdTimer();});
    document.addEventListener('DOMContentLoaded'`
    );
    console.log('✅ Hero init prepended to existing DOMContentLoaded');
  } else {
    console.log('ℹ️  updateHeroProdDisplay already in DOMContentLoaded — skipping');
  }
}

// ============================================================
// 4. SAVE FILE
// ============================================================
fs.writeFileSync('c:/one stop Gadgets/index.html', html, 'utf8');
console.log('✅ index.html saved!');
console.log('File size:', html.length, 'chars');
