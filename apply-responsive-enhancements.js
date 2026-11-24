const fs = require('fs');

const protoPath = 'design/prototype/index.html';
let content = fs.readFileSync(protoPath, 'utf8');

console.log('Original content length:', content.length);

// Extract base64 logo
const logoMatch = content.match(/<img src="(data:image\/jpeg;base64,[^"]+)"/);
const logoSrc = logoMatch ? logoMatch[1] : 'logo.jpg';

// =========================================================================
// 1. RECREATE MOBILE MENU DRAWER TO BE HIGHLY POLISHED & FULLY RESPONSIVE
// =========================================================================
const oldMobileMenuRegex = /<!-- Mobile Menu Drawer -->[\s\S]*?<\/div>\s*<\/div>/;

const newMobileMenuHtml = `<!-- Mobile Navigation Drawer (Overlay with Backdrop Blur) -->
  <div id="mobile-menu" class="hidden fixed inset-0 z-50 bg-[#101428]/80 backdrop-blur-md transition-all duration-300 xl:hidden">
    <div class="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-gradient-to-b from-[#350C12] via-[#59121B] to-[#101428] text-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
      
      <!-- Top: Header with Logo & Close Button -->
      <div class="space-y-6">
        <div class="flex items-center justify-between pb-4 border-b border-white/15">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-cyan-500/40 to-rose-500/40 flex items-center justify-center">
              <img src="${logoSrc}" alt="Logo" class="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <div class="text-sm font-black text-white">ONE STOP <span class="text-[#FF304D]">GADGETS</span></div>
              <div class="text-[9px] text-white/60 font-bold uppercase tracking-widest">DEALS • VIP • LUCKY DIP</div>
            </div>
          </div>
          <button onclick="toggleMobileMenu()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg font-bold transition">
            ✕
          </button>
        </div>

        <!-- Mobile Search Field -->
        <div class="relative">
          <input
            type="text"
            oninput="handleFiboLiveSearch(this.value)"
            placeholder="Search gadgets, deals..."
            class="w-full bg-[#000000] border border-white/15 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D91E26]"
          />
          <span class="absolute left-3 top-3 text-slate-400 text-xs">🔍</span>
        </div>

        <!-- Navigation Links List -->
        <nav class="flex flex-col gap-1.5 font-sans">
          <button onclick="toggleMobileMenu(); navigate('storefront');" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 font-bold text-sm text-left transition text-white">
            <span class="text-base">🏠</span> <span>Home</span>
          </button>
          <button onclick="toggleMobileMenu(); navigate('catalog');" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 font-bold text-sm text-left transition text-[#F5F5F7]">
            <span class="text-base">⚡</span> <span>Deals Directory</span>
          </button>
          <button onclick="toggleMobileMenu(); navigate('about');" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 font-bold text-sm text-left transition text-[#F5F5F7]">
            <span class="text-base">ℹ️</span> <span>About Us</span>
          </button>
          <button onclick="toggleMobileMenu(); handleLuckyDipNavClick();" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#D91E26]/20 border border-[#D91E26]/40 font-extrabold text-sm text-left transition text-[#FF304D]">
            <span class="text-base">🎁</span> <span>Lucky Dip (WIN BIG)</span>
          </button>
          <button onclick="toggleMobileMenu(); navigate('contact');" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 font-bold text-sm text-left transition text-[#F5F5F7]">
            <span class="text-base">📞</span> <span>Contact Support</span>
          </button>
          <button onclick="toggleMobileMenu(); navigate('pricing');" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 font-bold text-sm text-left transition text-amber-300">
            <span class="text-base">👑</span> <span>VIP Membership</span>
          </button>
        </nav>
      </div>

      <!-- Bottom: Sign In & Trust Badges -->
      <div class="pt-6 border-t border-white/15 space-y-3">
        <button onclick="toggleMobileMenu(); navigate('signin');" class="w-full py-3 rounded-xl bg-[#D91E26] hover:bg-[#c51424] text-white font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-2">
          <span>👤</span>
          <span>Sign In / Register</span>
        </button>
        <div class="text-[10px] text-white/50 text-center flex items-center justify-center gap-2">
          <span>🔒 256-Bit SSL</span>
          <span>•</span>
          <span>Provably Fair</span>
        </div>
      </div>

    </div>
  </div>`;

content = content.replace(oldMobileMenuRegex, newMobileMenuHtml);

// =========================================================================
// 2. REVISE HEADER FOR FLAWLESS RESPONSIVENESS AT 320px - 1920px
// =========================================================================
const oldHeaderStart = content.indexOf('<header');
const oldHeaderEnd = content.indexOf('</header>');

const responsiveHeaderHtml = `<header style="background: linear-gradient(90deg, #350C12 0%, #59121B 50%, #350C12 100%); min-height: 80px;" class="text-white sticky top-0 z-40 shadow-2xl border-b border-[#59121B]/60 flex items-center py-2 sm:py-0">
    <div class="w-full max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
      
      <!-- 1. Brand Logo (Scaling for mobile: 56px on mobile, 82px on desktop) -->
      <div class="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer shrink-0" onclick="navigate('storefront')" title="One Stop Gadgets - Home">
        <div class="relative w-[52px] h-[52px] sm:w-[72px] sm:h-[72px] lg:w-[82px] lg:h-[82px] shrink-0 rounded-full p-0.5 sm:p-1 bg-gradient-to-tr from-cyan-500/30 to-rose-500/30 flex items-center justify-center">
          <img src="${logoSrc}" alt="One Stop Gadgets Logo" class="w-full h-full rounded-full object-cover shadow-md" />
        </div>
        <div class="flex flex-col justify-center">
          <div class="text-base sm:text-xl lg:text-2xl font-black tracking-tight leading-none flex items-center gap-1 font-sans">
            <span class="text-white">ONE STOP</span>
            <span class="text-[#FF304D] font-extrabold">GADGETS</span>
          </div>
          <div class="text-[8px] sm:text-[10px] lg:text-[11px] font-bold text-white/70 tracking-widest uppercase mt-0.5 sm:mt-1">
            DEALS • VIP • LUCKY DIP
          </div>
        </div>
      </div>

      <!-- 2. Desktop Navigation Menu (Visible on xl screens >= 1280px) -->
      <nav class="hidden xl:flex items-center gap-3 2xl:gap-5 shrink-0 font-sans">
        <button id="nav-btn-storefront" onclick="navigate('storefront')" class="nav-link px-5 py-2.5 rounded-full bg-[#D91E26] text-[#F5F5F7] font-bold text-sm shadow-md transition-all">
          Home
        </button>
        <button id="nav-btn-catalog" onclick="navigate('catalog')" class="nav-link px-4 py-2.5 rounded-full text-[#F5F5F7] hover:text-white hover:bg-white/10 font-bold text-sm transition-all">
          Deals
        </button>
        <button id="nav-btn-about" onclick="navigate('about')" class="nav-link px-4 py-2.5 rounded-full text-[#F5F5F7] hover:text-white hover:bg-white/10 font-bold text-sm transition-all">
          About
        </button>
        <button id="nav-btn-luckydip" onclick="handleLuckyDipNavClick()" class="nav-link px-4 py-2.5 rounded-full text-[#FF304D] hover:text-white hover:bg-white/10 font-bold text-sm transition-all flex items-center gap-1.5">
          <span>🎁</span>
          <span>Lucky Dip</span>
        </button>
        <button id="nav-btn-contact" onclick="navigate('contact')" class="nav-link px-4 py-2.5 rounded-full text-[#F5F5F7] hover:text-white hover:bg-white/10 font-bold text-sm transition-all">
          Contact Us
        </button>
      </nav>

      <!-- 3. Right Side: Search & Sign In (Adapts smoothly from desktop to mobile) -->
      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        
        <!-- Search Field (Collapses to Icon button on screens < 640px, full bar on tablet/desktop) -->
        <div class="relative hidden sm:block w-44 md:w-60 lg:w-[320px] 2xl:w-[395px] h-[40px] sm:h-[44px]" id="fibo-search-container">
          <div class="relative h-full flex items-center">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white">
              <svg class="h-3.5 sm:h-4 w-3.5 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              type="text"
              id="fibo-input"
              onfocus="showFiboDropdown(true)"
              oninput="handleFiboLiveSearch(this.value)"
              placeholder="FiboSearch: iPhone, Sony..."
              class="w-full h-full bg-[#000000] border border-white/10 rounded-full pl-9 sm:pl-10 pr-14 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D91E26] focus:ring-1 focus:ring-[#D91E26] transition shadow-inner font-sans"
            />
            <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1">
              <span class="text-[8px] sm:text-[9px] bg-[#70152D] text-white px-1.5 sm:px-2 py-0.5 rounded font-mono font-bold tracking-tight uppercase shadow-xs">FIBO</span>
              <button id="fibo-clear" onclick="clearFiboSearch()" class="hidden text-slate-400 hover:text-white text-xs">✕</button>
            </div>
          </div>

          <!-- Dropdown -->
          <div id="fibo-dropdown" class="fibo-dropdown hidden absolute right-0 sm:left-0 mt-2 w-72 sm:w-80 md:w-96 bg-white rounded-2xl border border-slate-200 text-[#101428] overflow-hidden z-50 transition shadow-2xl">
            <div class="p-2 border-b border-slate-100 flex items-center justify-between text-[11px] bg-slate-50">
              <span class="font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-[#D91E26]"></span> Instant Fibo Results
              </span>
              <span class="text-[10px] text-slate-400 font-mono">ESC to close</span>
            </div>
            <div id="fibo-results-list" class="max-h-72 overflow-y-auto divide-y divide-slate-100 custom-scroll">
            </div>
            <div class="p-2.5 bg-slate-50 text-center border-t border-slate-200">
              <button onclick="navigate('catalog'); showFiboDropdown(false);" class="text-xs font-bold text-[#D91E26] hover:text-[#59121B] transition">
                View All in Directory →
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile-Only Search Trigger Icon Button -->
        <button onclick="toggleMobileMenu()" class="sm:hidden w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white text-sm" aria-label="Search">
          🔍
        </button>

        <!-- Sign In Button (Compact on mobile: user icon only or compact text) -->
        <button onclick="navigate('signin')" class="h-[36px] sm:h-[44px] px-3.5 sm:px-5 lg:px-6 rounded-full bg-[#D91E26] hover:bg-[#c51424] text-[#F5F5F7] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 sm:gap-2 shrink-0">
          <svg class="w-3.5 sm:w-4 h-3.5 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span class="hidden xs:inline">Sign In</span>
        </button>

        <!-- Mobile Hamburger Button -->
        <div class="xl:hidden flex items-center">
          <button id="hamburger-btn" onclick="toggleMobileMenu()" aria-label="Toggle Navigation Menu" class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/20 flex flex-col items-center justify-center gap-1 text-white transition">
            <span class="w-5 h-0.5 bg-white rounded-full"></span>
            <span class="w-5 h-0.5 bg-white rounded-full"></span>
            <span class="w-5 h-0.5 bg-white rounded-full"></span>
          </button>
        </div>

      </div>
    </div>
  </header>`;

if (oldHeaderStart !== -1 && oldHeaderEnd !== -1) {
  content = content.substring(0, oldHeaderStart) + responsiveHeaderHtml + content.substring(oldHeaderEnd + 9);
}

// =========================================================================
// 3. RESPONSIVE ANNOUNCEMENT BAR (Wrap text nicely on mobile)
// =========================================================================
const oldAnnounceRegex = /<div style="background: linear-gradient\(90deg, #D91E26[\s\S]*?<\/div>/;
const newAnnounceHtml = `<div style="background: linear-gradient(90deg, #D91E26 0%, #1954CF 50%, #D91E26 100%);" class="w-full text-[#F5F5F7] text-[11px] sm:text-xs py-2 px-3 text-center font-bold tracking-wide flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 shadow-inner">
    <span class="text-amber-300">⚡</span>
    <span><strong>EXCLUSIVE TECH DEALS:</strong> Up to 50% Off Top Brands • Amazon &amp; Flipkart Verified • Weekly VIP Lucky Dip</span>
    <button onclick="navigate('catalog')" class="underline text-[#F5F5F7] hover:text-amber-300 ml-1 font-bold cursor-pointer transition">
      Explore Offers
    </button>
  </div>`;

content = content.replace(oldAnnounceRegex, newAnnounceHtml);

// =========================================================================
// 4. IMPROVE toggleMobileMenu() JS FUNCTION
// =========================================================================
const updatedToggleMobileMenuJs = `function toggleMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      if (!menu) return;
      if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      } else {
        menu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }`;

content = content.replace(/function\s+toggleMobileMenu\(\)\s*\{[\s\S]*?\}/, updatedToggleMobileMenuJs);

fs.writeFileSync(protoPath, content, 'utf8');
fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully applied responsive header, drawer, and announcement bar!');
