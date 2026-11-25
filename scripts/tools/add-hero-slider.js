const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Add Slider Keyframe Animations and Styles to <style>
const sliderStyles = `
    /* ===== Hero Carousel & Ken Burns Animation ===== */
    .hero-slide {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 8s ease-out;
      transform: scale(1.05);
      pointer-events: none;
    }
    .hero-slide.active {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }
    
    @keyframes pulseOrb {
      0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.25; }
      50% { transform: scale(1.15) translate(-15px, 15px); opacity: 0.45; }
    }
    .animate-pulse-orb {
      animation: pulseOrb 8s ease-in-out infinite;
    }

    @keyframes shineEffect {
      0% { transform: translateX(-150%) skewX(-25deg); }
      50%, 100% { transform: translateX(250%) skewX(-25deg); }
    }
    .animate-shine {
      animation: shineEffect 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
`;

html = html.replace('</style>', sliderStyles + '\n  </style>');

// 2. Replace the static Hero banner with an interactive, animated auto-sliding banner
// Gradient colors match user's theme: #D42526 -> #AD2F4A -> #8A3B6F
const oldHeroBannerRegex = /<!-- Hero Banner in Color Hunt Gradient -->[\s\S]*?<!-- Categories Section with Premium UI Cards -->|<!-- CATEGORIES SECTION: Elevated 3D Layer with Mesh Gradient -->/;

const newHeroBanner = `<!-- ==================== ANIMATED HERO SLIDER WITH AUTO-CHANGING SLIDES & IMAGES ==================== -->
      <div id="hero-slider-container" class="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 min-h-[380px] sm:min-h-[460px] flex items-center" style="background: linear-gradient(135deg, #D42526 0%, #AD2F4A 50%, #8A3B6F 100%);">
        
        <!-- Ambient Animated Glow Lights -->
        <div class="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-red-400/30 blur-3xl animate-pulse-orb pointer-events-none"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-500/30 blur-3xl animate-pulse-orb pointer-events-none" style="animation-delay: 3s;"></div>

        <!-- SLIDE 1: Flagship Tech Deals -->
        <div class="hero-slide active p-8 sm:p-14 w-full h-full flex flex-col justify-center" data-slide="0">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div class="lg:col-span-7 space-y-4">
              <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-sm">
                <span class="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                <span>🔥 Mega Tech Festive Discounts Live</span>
                <span class="text-white/60">•</span>
                <span class="text-amber-300 font-extrabold uppercase text-[10px]">Save up to 80%</span>
              </div>
              <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                Smarter Deals on <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-white">Flagship Gadgets</span>
              </h1>
              <p class="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl">
                Discover hourly verified price-drops from Amazon, Apple, Flipkart, and authorized stores with direct instant purchase links.
              </p>
              <div class="flex flex-wrap items-center gap-3.5 pt-3">
                <button onclick="navigate('catalog')" class="relative overflow-hidden px-7 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group flex items-center gap-2">
                  <span>Explore Verified Deals</span>
                  <span class="transform group-hover:translate-x-1 transition">➔</span>
                  <span class="absolute inset-0 w-1/2 h-full bg-white/20 animate-shine pointer-events-none"></span>
                </button>
                <button onclick="navigate('pricing')" class="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-extrabold text-xs transition">
                  VIP Club Benefits
                </button>
              </div>
            </div>

            <!-- Visual Showcase Card with 3D Float -->
            <div class="lg:col-span-5 flex justify-center">
              <div class="card-3d-hover bg-white/15 backdrop-blur-xl rounded-3xl border border-white/30 p-6 shadow-2xl text-center space-y-3 relative max-w-sm animate-float-3d">
                <span class="absolute -top-3 right-4 px-3 py-1 rounded-full bg-[#EF4444] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  HOTTEST DROP
                </span>
                <div class="w-36 h-36 mx-auto rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-7xl shadow-inner my-2">
                  📱
                </div>
                <h3 class="text-lg font-black text-white">Apple iPhone 16 Pro (128GB)</h3>
                <div class="flex items-center justify-center gap-2">
                  <span class="text-2xl font-black text-amber-300">₹1,19,999</span>
                  <span class="text-xs line-through text-white/60">₹1,34,900</span>
                  <span class="text-xs font-bold bg-[#EF4444] text-white px-2 py-0.5 rounded-full">Save ₹15,000</span>
                </div>
                <p class="text-[11px] text-white/80">Available now via authorized dealer allocation</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SLIDE 2: Provably Fair Weekly Lucky Dip -->
        <div class="hero-slide p-8 sm:p-14 w-full h-full flex flex-col justify-center" data-slide="1">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div class="lg:col-span-7 space-y-4">
              <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-sm">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>🎁 Round #42 Live Drawing Active</span>
                <span class="text-white/60">•</span>
                <span class="text-emerald-300 font-extrabold uppercase text-[10px]">Provably Fair CSPRNG</span>
              </div>
              <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                Win Weekly <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-white">Flagship Tech</span> Free
              </h1>
              <p class="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl">
                VIP Subscribers automatically receive 1 free ticket in every round. Transparent on-chain SHA-256 draw every Sunday.
              </p>
              <div class="flex flex-wrap items-center gap-3.5 pt-3">
                <button onclick="navigate('luckydip')" class="relative overflow-hidden px-7 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group flex items-center gap-2">
                  <span>Enter Lucky Dip Now</span>
                  <span class="transform group-hover:translate-x-1 transition">➔</span>
                  <span class="absolute inset-0 w-1/2 h-full bg-white/20 animate-shine pointer-events-none"></span>
                </button>
                <button onclick="navigate('pricing')" class="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-extrabold text-xs transition">
                  Upgrade to VIP (₹299/mo)
                </button>
              </div>
            </div>

            <!-- Visual Showcase Card for Lucky Dip -->
            <div class="lg:col-span-5 flex justify-center">
              <div class="card-3d-hover bg-white/15 backdrop-blur-xl rounded-3xl border border-white/30 p-6 shadow-2xl text-center space-y-3 relative max-w-sm animate-float-3d">
                <span class="absolute -top-3 right-4 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  ROUND #42 PRIZE
                </span>
                <div class="w-36 h-36 mx-auto rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-7xl shadow-inner my-2">
                  🎧
                </div>
                <h3 class="text-lg font-black text-white">Sony WH-1000XM5 Wireless</h3>
                <div class="flex items-center justify-center gap-2">
                  <span class="text-xl font-black text-emerald-300">Prize Worth ₹34,990</span>
                </div>
                <div class="font-mono text-sm font-extrabold text-amber-300 bg-black/40 py-1 px-3 rounded-xl border border-white/20">
                  Draw Closes: 04d : 18h : 32m
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SLIDE 3: Premium Audio & Laptops -->
        <div class="hero-slide p-8 sm:p-14 w-full h-full flex flex-col justify-center" data-slide="2">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div class="lg:col-span-7 space-y-4">
              <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-sm">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>💻 High-Performance Laptop & Audio Hub</span>
                <span class="text-white/60">•</span>
                <span class="text-cyan-300 font-extrabold uppercase text-[10px]">M3 Chip & ANC</span>
              </div>
              <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                Unbeatable Deals on <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white">MacBooks & PCs</span>
              </h1>
              <p class="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl">
                Compare direct price graphs, authorized dealer warranties, and instant cashback multipliers before making your purchase.
              </p>
              <div class="flex flex-wrap items-center gap-3.5 pt-3">
                <button onclick="navigate('catalog')" class="relative overflow-hidden px-7 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group flex items-center gap-2">
                  <span>Browse Laptops & Audio</span>
                  <span class="transform group-hover:translate-x-1 transition">➔</span>
                  <span class="absolute inset-0 w-1/2 h-full bg-white/20 animate-shine pointer-events-none"></span>
                </button>
                <button onclick="navigate('pricing')" class="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-extrabold text-xs transition">
                  VIP Price Alerts
                </button>
              </div>
            </div>

            <!-- Visual Showcase Card for Laptops -->
            <div class="lg:col-span-5 flex justify-center">
              <div class="card-3d-hover bg-white/15 backdrop-blur-xl rounded-3xl border border-white/30 p-6 shadow-2xl text-center space-y-3 relative max-w-sm animate-float-3d">
                <span class="absolute -top-3 right-4 px-3 py-1 rounded-full bg-sky-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  HOT PROMO
                </span>
                <div class="w-36 h-36 mx-auto rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-7xl shadow-inner my-2">
                  💻
                </div>
                <h3 class="text-lg font-black text-white">Apple MacBook Air M3 (16GB)</h3>
                <div class="flex items-center justify-center gap-2">
                  <span class="text-2xl font-black text-cyan-300">₹1,19,900</span>
                  <span class="text-xs line-through text-white/60">₹1,34,900</span>
                  <span class="text-xs font-bold bg-sky-500 text-white px-2 py-0.5 rounded-full">Save ₹15,000</span>
                </div>
                <p class="text-[11px] text-white/80">Includes 1-Year Official AppleCare Warranty</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Slider Controls: Prev & Next Arrow Buttons -->
        <button onclick="prevHeroSlide()" aria-label="Previous Slide" class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white border border-white/30 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-20 shadow-xl">
          ❮
        </button>
        <button onclick="nextHeroSlide()" aria-label="Next Slide" class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white border border-white/30 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-20 shadow-xl">
          ❯
        </button>

        <!-- Slider Dots / Indicators -->
        <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20 bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
          <button onclick="goToHeroSlide(0)" class="hero-dot w-3 h-3 rounded-full bg-white transition-all duration-300" data-dot="0"></button>
          <button onclick="goToHeroSlide(1)" class="hero-dot w-3 h-3 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300" data-dot="1"></button>
          <button onclick="goToHeroSlide(2)" class="hero-dot w-3 h-3 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300" data-dot="2"></button>
        </div>

      </div>

      <!-- CATEGORIES SECTION: Elevated 3D Layer with Mesh Gradient -->`;

html = html.replace(oldHeroBannerRegex, newHeroBanner);

// 3. Add Javascript controller for the carousel slider right before </script>
const heroSliderJs = `
    // ===== HERO CAROUSEL CONTROLLER (AUTO-PLAYING + TOUCH & BUTTONS) =====
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
    showHeroSlide(0);
`;

html = html.replace('</script>', heroSliderJs + '\n  </script>');

// Save updated prototype
fs.writeFileSync(filePath, html, 'utf8');
console.log('✅ Integrated auto-playing hero animated carousel with changing slides and matching gradient!');
