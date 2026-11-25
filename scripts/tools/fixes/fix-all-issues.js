const fs = require('fs');
const path = require('path');

const protoPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(protoPath, 'utf8');

console.log('Original size:', html.length);

// ===== STEP 1: Remove old duplicate hero script from inside main <script> block =====
const heroMarker = html.indexOf('// ===== 3D AUTOMATIC HERO SHOWCASE');
const mainScriptClose = html.indexOf('</script>', heroMarker); // This is the closing tag of the MAIN script
if (heroMarker !== -1 && mainScriptClose !== -1) {
  // Remove from heroMarker up to (but not including) </script>
  // We also need to trim trailing whitespace/newlines before the </script>
  html = html.substring(0, heroMarker) + '\n' + html.substring(mainScriptClose);
  console.log('✅ Removed duplicate old hero script from main <script> block');
} else {
  console.log('⚠️ Could not find hero marker or close script');
}

// ===== STEP 2: Fix updateLuckyDipUI null reference =====
// Add null guard at the start of the function
const luckyDipFn = html.indexOf('function updateLuckyDipUI()');
if (luckyDipFn !== -1) {
  const fnBody = html.indexOf('{', luckyDipFn);
  const nullGuard = `\n    const _vipBtn = document.getElementById('vip-toggle-btn'); if (!_vipBtn) return; // dev bar removed`;
  html = html.substring(0, fnBody + 1) + nullGuard + html.substring(fnBody + 1);
  console.log('✅ Added null guard to updateLuckyDipUI');
} else {
  console.log('⚠️ Could not find updateLuckyDipUI');
}

// ===== STEP 3: Fix navbar colors - remove blue, use red theme =====
// Fix active Home button (blue -> red)
html = html.replace(/bg-\[#2563EB\](\s+text-white\s+rounded)/g, 'bg-[#D42526]$1');
// Fix Sign In button blue
html = html.replace(/bg-\[#2563EB\]\s+hover:bg-\[#1D4ED8\]/g, 'bg-[#D42526] hover:bg-[#B91C1C]');
// Fix FiboSearch badge - was using bright blue 
html = html.replace(/bg-\[#3B82F6\]/g, 'bg-[#D42526]');
// Fix any remaining blue nav elements
html = html.replace(/text-\[#3B82F6\]/g, 'text-[#FF3C50]');
// Fix search input styling
html = html.replace(/bg-\[#000000\]\s+border\s+border-\[#641428\]\s+rounded-lg\s+px-3\s+py-1\.5\s+text-white\s+text-sm\s+focus:outline-none\s+focus:ring-1\s+focus:ring-\[#641428\]/g, 
  'bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#D42526] placeholder-white/50');
console.log('✅ Fixed navbar colors to red theme');

// ===== STEP 4: Add CSS animations and premium styling =====
const styleClose = html.indexOf('</style>');
if (styleClose !== -1) {
  const premiumCSS = `
/* ===== PREMIUM ANIMATIONS ===== */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes floatUp {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(212,37,38,0.3); }
  50% { box-shadow: 0 0 40px rgba(212,37,38,0.6); }
}
.animate-fade-up { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
.animate-fade-up-d1 { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s forwards; opacity: 0; }
.animate-fade-up-d2 { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s forwards; opacity: 0; }
.animate-fade-up-d3 { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s forwards; opacity: 0; }
.animate-fade-in { animation: fadeIn 0.8s ease forwards; }
.animate-fade-in-d1 { animation: fadeIn 0.8s ease 0.2s forwards; opacity: 0; }
.animate-slide-in { animation: fadeSlideIn 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
.animate-float { animation: floatUp 3s ease-in-out infinite; }
.pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }

/* Premium deal card hover */
.deal-card-premium {
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
  cursor: pointer;
}
.deal-card-premium:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,37,38,0.3);
}

/* Category card hover */
.cat-card-premium {
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, background 0.3s;
}
.cat-card-premium:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 16px 32px rgba(0,0,0,0.3);
}

/* Mobile hamburger */
#mobile-menu {
  transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
}
#mobile-menu.hidden {
  transform: translateY(-10px);
  opacity: 0;
  pointer-events: none;
}
#mobile-menu.open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: all;
}

/* Premium navbar search */
.nav-search-input {
  background: rgba(255,255,255,0.08) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.15) !important;
  color: white !important;
  transition: border-color 0.2s, background 0.2s;
}
.nav-search-input:focus {
  background: rgba(255,255,255,0.12) !important;
  border-color: rgba(212,37,38,0.6) !important;
  outline: none;
}
.nav-search-input::placeholder { color: rgba(255,255,255,0.4); }

/* Full width sections */
.section-full { width: 100%; max-width: 100%; }

/* Mobile responsive utilities */
@media (max-width: 768px) {
  .hero-left-col { text-align: center; }
  .hero-left-col h1 { font-size: 2.2rem !important; }
  .hero-left-col h2 { font-size: 1.5rem !important; }
}

/* Scrollbar premium */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #1a0508; }
::-webkit-scrollbar-thumb { background: #641428; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #D42526; }
`;
  html = html.substring(0, styleClose) + premiumCSS + '\n' + html.substring(styleClose);
  console.log('✅ Added premium CSS animations');
}

// ===== STEP 5: Add hamburger menu button to header =====
// Find the mobile nav area and add hamburger
const hamburgerBtn = `
  <!-- Mobile Hamburger -->
  <button id="hamburger-btn" class="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors" onclick="toggleMobileMenu()" aria-label="Menu">
    <span class="hamburger-line block w-6 h-0.5 bg-white transition-all duration-300"></span>
    <span class="hamburger-line block w-6 h-0.5 bg-white transition-all duration-300"></span>
    <span class="hamburger-line block w-6 h-0.5 bg-white transition-all duration-300"></span>
  </button>`;

// Find the header nav area - look for the flex container that holds Sign In button on mobile
const mobileHide = html.indexOf('md:hidden flex items-center gap-2');
if (mobileHide !== -1) {
  // Find the </div> that closes this mobile bar
  const mobileBarClose = html.indexOf('</div>', mobileHide);
  // Insert hamburger before this close
  html = html.substring(0, mobileBarClose) + hamburgerBtn + '\n  ' + html.substring(mobileBarClose);
  console.log('✅ Added hamburger button');
} else {
  console.log('⚠️ Could not find mobile nav bar location');
}

// ===== STEP 6: Add mobile menu drawer =====
const mobileMenuDrawer = `
<!-- Mobile Menu Drawer -->
<div id="mobile-menu" class="hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#2A060C] to-[#1a0408] shadow-2xl pt-20 pb-6 px-4 md:hidden" style="backdrop-filter:blur(20px);">
  <div class="flex flex-col gap-1">
    <a href="#" onclick="toggleMobileMenu()" class="text-white py-3 px-4 rounded-xl hover:bg-white/10 font-semibold flex items-center gap-3 transition-colors">🏠 Home</a>
    <a href="#deals-section" onclick="toggleMobileMenu()" class="text-white py-3 px-4 rounded-xl hover:bg-white/10 font-semibold flex items-center gap-3 transition-colors">🔥 Deals</a>
    <a href="#" onclick="toggleMobileMenu()" class="text-white py-3 px-4 rounded-xl hover:bg-white/10 font-semibold flex items-center gap-3 transition-colors">ℹ️ About</a>
    <a href="#lucky-dip-section" onclick="toggleMobileMenu()" class="text-[#FF3C50] py-3 px-4 rounded-xl hover:bg-white/10 font-bold flex items-center gap-3 transition-colors">🎰 Lucky Dip</a>
    <a href="#" onclick="toggleMobileMenu()" class="text-white py-3 px-4 rounded-xl hover:bg-white/10 font-semibold flex items-center gap-3 transition-colors">📞 Contact Us</a>
    <div class="mt-4 pt-4 border-t border-white/10">
      <button class="w-full bg-[#D42526] hover:bg-[#B91C1C] text-white font-bold py-3 px-6 rounded-xl transition-colors">Sign In</button>
    </div>
  </div>
</div>`;

// Insert after <body> or after the main header closing tag
const bodyTag = html.indexOf('<body');
const bodyClose = html.indexOf('>', bodyTag);
html = html.substring(0, bodyClose + 1) + mobileMenuDrawer + html.substring(bodyClose + 1);
console.log('✅ Added mobile menu drawer');

// ===== STEP 7: Add hero section animations =====
// Add animate classes to hero headline elements
// Find hero h1 / main headline
html = html.replace(
  /(<h1[^>]*class="[^"]*text-5xl[^"]*"[^>]*>)/g,
  (m) => m.replace('class="', 'class="animate-fade-up ')
);
html = html.replace(
  /(<h2[^>]*class="[^"]*text-6xl[^"]*"[^>]*>)/g,
  (m) => m.replace('class="', 'class="animate-fade-up-d1 ')
);
console.log('✅ Added hero animations');

// ===== STEP 8: Add JS for hamburger + product card animations =====
const extraJS = `
<script>
// ===== MOBILE HAMBURGER =====
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger-btn');
  if (!menu) return;
  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    menu.classList.remove('open');
    menu.classList.add('hidden');
    if (btn) btn.classList.remove('menu-open');
  } else {
    menu.classList.remove('hidden');
    requestAnimationFrame(() => { menu.classList.add('open'); });
    if (btn) btn.classList.add('menu-open');
  }
}
// Close on outside click
document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger-btn');
  if (menu && menu.classList.contains('open')) {
    if (!menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
      menu.classList.remove('open');
      menu.classList.add('hidden');
      if (btn) btn.classList.remove('menu-open');
    }
  }
});

// ===== SCROLL FADE-IN ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Observe category cards, deal cards, section headers
  document.querySelectorAll('.deal-card, [class*="rounded-2xl"], .cat-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transitionDelay = (i * 0.05) + 's';
    observer.observe(el);
  });
}

// ===== PRODUCT CARD HOVER ANIMATIONS =====
function addCardAnimations() {
  document.querySelectorAll('.deal-card').forEach(card => {
    card.classList.add('deal-card-premium');
  });
  document.querySelectorAll('.cat-card, [class*="category"]').forEach(card => {
    card.classList.add('cat-card-premium');
  });
}

// Init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initScrollAnimations, 500);
    setTimeout(addCardAnimations, 600);
  });
} else {
  setTimeout(initScrollAnimations, 500);
  setTimeout(addCardAnimations, 600);
}
</script>
`;

// Insert before </body>
const bodyEndTag = html.lastIndexOf('</body>');
if (bodyEndTag !== -1) {
  html = html.substring(0, bodyEndTag) + extraJS + '\n' + html.substring(bodyEndTag);
  console.log('✅ Added JS for hamburger + scroll animations + card animations');
}

// ===== STEP 9: Fix the search input class =====
html = html.replace(
  /class="([^"]*bg-\[#000000\][^"]*border-\[#641428\][^"]*text-sm[^"]*)"/g,
  (m, cls) => {
    const fixed = cls
      .replace('bg-[#000000]', 'bg-white/10')
      .replace('border border-[#641428]', 'border border-white/20')
      .replace('focus:ring-[#641428]', 'focus:ring-[#D42526]');
    return `class="${fixed} nav-search-input"`;
  }
);

// ===== STEP 10: Ensure the new hero script has correct init =====
// The second script block (new hero) should already have init code
const secondHeroIdx = html.indexOf('// ===== 3D AUTOMATIC HERO SHOWCASE');
if (secondHeroIdx !== -1) {
  console.log('✅ New hero script block found at:', secondHeroIdx);
} else {
  console.log('⚠️ New hero script not found!');
}

// Save
fs.writeFileSync(protoPath, html, 'utf8');
console.log('\n✅ All fixes applied. New size:', html.length);
