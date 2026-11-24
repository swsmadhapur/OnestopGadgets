const fs = require('fs');

const protoPath = 'design/prototype/index.html';
let content = fs.readFileSync(protoPath, 'utf8');

console.log('Original content length:', content.length);

// Extract the existing base64 logo
const logoMatch = content.match(/<img src="(data:image\/jpeg;base64,[^"]+)"/);
const logoSrc = logoMatch ? logoMatch[1] : 'logo.jpg';

// =========================================================================
// RECREATE NAVBAR & ANNOUNCEMENT BAR MATCHING REFERENCE SCREENSHOT
// Background dark burgundy: #350C12 to center #59121B
// Active button: solid red rounded pill #D91E26
// Brand: "ONE STOP" in bold white, "GADGETS" in bright red #FF304D
// Tagline: "DEALS • VIP • LUCKY DIP"
// Navigation: Home (Active Red), Deals, About, 🎁 Lucky Dip (Red text + Golden Gift), Contact Us
// Search Bar: Black (#000000) rounded, white search icon, placeholder "FiboSearch: iPhone, Sony...", FIBO badge (#70152D)
// Sign In: Solid premium red (#D91E26), white user icon, "Sign In"
// Announcement Bar: Horizontal gradient #D91E26 -> #1954CF -> #D91E26, height ~40px, golden lightning ⚡, "Explore Offers" underlined
// =========================================================================

const newHeaderAndAnnouncementHtml = `<!-- Primary Website Navigation Header (Pixel-Perfect Match to Screenshot) -->
  <header style="background: linear-gradient(90deg, #350C12 0%, #59121B 50%, #350C12 100%); min-height: 96px;" class="text-white sticky top-0 z-40 shadow-2xl border-b border-[#59121B]/60 flex items-center">
    <div class="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
      
      <!-- 1. Brand Logo (Logo -> Brand Name with Red GADGETS -> DEALS • VIP • LUCKY DIP) -->
      <div class="flex items-center gap-3.5 cursor-pointer shrink-0" onclick="navigate('storefront')" title="One Stop Gadgets - Home">
        <div class="relative w-[78px] h-[78px] shrink-0 rounded-full p-1 bg-gradient-to-tr from-cyan-500/30 to-rose-500/30 flex items-center justify-center">
          <img src="${logoSrc}" alt="One Stop Gadgets Logo" class="w-full h-full rounded-full object-cover shadow-md" />
        </div>
        <div class="flex flex-col justify-center">
          <div class="text-xl sm:text-2xl font-black tracking-tight leading-none flex items-center gap-1.5 font-sans">
            <span class="text-white">ONE STOP</span>
            <span class="text-[#FF304D] tracking-normal font-extrabold">GADGETS</span>
          </div>
          <div class="text-[10px] sm:text-[11px] font-bold text-white/70 tracking-widest uppercase mt-1">
            DEALS • VIP • LUCKY DIP
          </div>
        </div>
      </div>

      <!-- 2. Desktop Navigation Menu (Horizontal, Evenly Spaced) -->
      <nav class="hidden xl:flex items-center gap-2 2xl:gap-4 shrink-0">
        <!-- Home (Active State: Solid Red Rounded Pill) -->
        <button id="nav-btn-storefront" onclick="navigate('storefront')" class="nav-link px-6 py-2.5 rounded-full bg-[#D91E26] text-[#F5F5F7] font-bold text-sm shadow-md transition-all">
          Home
        </button>
        <!-- Deals -->
        <button id="nav-btn-catalog" onclick="navigate('catalog')" class="nav-link px-4 py-2.5 rounded-full text-[#F5F5F7] hover:text-white hover:bg-white/10 font-bold text-sm transition-all">
          Deals
        </button>
        <!-- About -->
        <button id="nav-btn-about" onclick="navigate('about')" class="nav-link px-4 py-2.5 rounded-full text-[#F5F5F7] hover:text-white hover:bg-white/10 font-bold text-sm transition-all">
          About
        </button>
        <!-- Lucky Dip (Golden Gift Icon + Bright Red Text) -->
        <button id="nav-btn-luckydip" onclick="handleLuckyDipNavClick()" class="nav-link px-4 py-2.5 rounded-full text-[#FF304D] hover:text-white hover:bg-white/10 font-bold text-sm transition-all flex items-center gap-1.5">
          <span>🎁</span>
          <span>Lucky Dip</span>
        </button>
        <!-- Contact Us -->
        <button id="nav-btn-contact" onclick="navigate('contact')" class="nav-link px-4 py-2.5 rounded-full text-[#F5F5F7] hover:text-white hover:bg-white/10 font-bold text-sm transition-all">
          Contact Us
        </button>
      </nav>

      <!-- 3. Right Side: Search Bar & Sign In Button -->
      <div class="flex items-center gap-3 shrink-0">
        
        <!-- Fibo Search Bar (Black rounded, width ~395px, height 44px, search icon, placeholder, FIBO badge) -->
        <div class="relative w-48 sm:w-64 md:w-80 lg:w-[395px] h-[44px]" id="fibo-search-container">
          <div class="relative h-full flex items-center">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              type="text"
              id="fibo-input"
              onfocus="showFiboDropdown(true)"
              oninput="handleFiboLiveSearch(this.value)"
              placeholder="FiboSearch: iPhone, Sony..."
              class="w-full h-full bg-[#000000] border border-white/10 rounded-full pl-10 pr-16 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D91E26] focus:ring-1 focus:ring-[#D91E26] transition shadow-inner font-sans"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
              <span class="text-[9px] bg-[#70152D] text-white px-2 py-0.5 rounded font-mono font-bold tracking-tight uppercase shadow-xs">FIBO</span>
              <button id="fibo-clear" onclick="clearFiboSearch()" class="hidden text-slate-400 hover:text-white text-xs">✕</button>
            </div>
          </div>

          <!-- FiboSearch Live Autocomplete Dropdown -->
          <div id="fibo-dropdown" class="fibo-dropdown hidden absolute right-0 sm:left-0 mt-2 w-72 sm:w-80 md:w-96 bg-white rounded-2xl border border-slate-200 text-[#101428] overflow-hidden z-50 transition shadow-2xl">
            <div class="p-2 border-b border-slate-100 flex items-center justify-between text-[11px] bg-slate-50">
              <span class="font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-[#D91E26]"></span> Instant Fibo Results
              </span>
              <span class="text-[10px] text-slate-400 font-mono">Press ESC to close</span>
            </div>
            <div id="fibo-results-list" class="max-h-72 overflow-y-auto divide-y divide-slate-100 custom-scroll">
              <!-- Live results populated by JS -->
            </div>
            <div class="p-2.5 bg-slate-50 text-center border-t border-slate-200">
              <button onclick="navigate('catalog'); showFiboDropdown(false);" class="text-xs font-bold text-[#D91E26] hover:text-[#59121B] transition">
                View All in Directory →
              </button>
            </div>
          </div>
        </div>

        <!-- Sign In Button (Solid Red #D91E26, Height 44px, Rounded Corners, User Icon) -->
        <button onclick="navigate('signin')" class="h-[44px] px-5 sm:px-6 rounded-full bg-[#D91E26] hover:bg-[#c51424] text-[#F5F5F7] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>Sign In</span>
        </button>

        <!-- Mobile Hamburger Toggle Button -->
        <div class="xl:hidden flex items-center">
          <button id="hamburger-btn" onclick="toggleMobileMenu()" aria-label="Open Menu" class="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

      </div>
    </div>
  </header>

  <!-- Promotional Announcement Bar (Red-to-Blue-to-Red Gradient, ~40px Height) -->
  <div style="background: linear-gradient(90deg, #D91E26 0%, #1954CF 50%, #D91E26 100%); min-height: 40px;" class="w-full text-[#F5F5F7] text-xs sm:text-[13px] py-2 px-4 text-center font-bold tracking-wide flex items-center justify-center gap-2 shadow-inner">
    <span class="text-amber-300">⚡</span>
    <span><strong>EXCLUSIVE TECH DEALS:</strong> Up to 50% Off Top Brands • Amazon &amp; Flipkart Verified • Weekly VIP Lucky Dip</span>
    <button onclick="navigate('catalog')" class="underline text-[#F5F5F7] hover:text-amber-300 ml-1 font-bold cursor-pointer transition">
      Explore Offers
    </button>
  </div>`;

// Replace the old header and announcement bar cleanly
const oldHeaderStart = content.indexOf('<header');
const oldMainStart = content.indexOf('<main');

if (oldHeaderStart !== -1 && oldMainStart !== -1) {
  content = content.substring(0, oldHeaderStart) + newHeaderAndAnnouncementHtml + '\n\n  ' + content.substring(oldMainStart);
  fs.writeFileSync(protoPath, content, 'utf8');
  fs.writeFileSync('index.html', content, 'utf8');
  console.log('Successfully replaced Navbar and Announcement Bar with exact pixel-perfect markup! Length:', content.length);
} else {
  console.error('Could not locate <header> or <main> tags');
}
