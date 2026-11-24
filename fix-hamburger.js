const fs = require('fs');
const path = require('path');

const protoPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(protoPath, 'utf8');

console.log('File size:', html.length);

// ===== FIX 1: Replace old mobile sub-bar with hamburger button =====
const mobileSubBarStart = html.indexOf('<!-- Secondary Mobile Navigation Sub-bar');
if (mobileSubBarStart !== -1) {
  // Find the closing </div> of the sub-bar div
  // The sub-bar is: <div class="md:hidden bg-[#000000]..."> ... </div>
  let depth = 0;
  let i = html.indexOf('<div', mobileSubBarStart + 10);
  let end = i;
  while (i < html.length) {
    if (html[i] === '<') {
      if (html.substring(i, i+4) === '<div') {
        depth++;
        i += 4;
      } else if (html.substring(i, i+6) === '</div>') {
        depth--;
        if (depth === 0) {
          end = i + 6;
          break;
        }
        i += 6;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }
  console.log('Mobile sub-bar ends at:', end);
  
  // Replace the mobile sub-bar with a hamburger button that's placed inside the main header flex row
  // We'll keep the mobile sub-bar location but replace content with hamburger + clean mobile nav
  const newMobileNav = `<!-- Mobile Hamburger Button (shown on mobile only) -->
    <div class="md:hidden bg-[#1a0408] border-t border-[#641428]/40 px-4 py-2 flex items-center justify-between">
      <span class="text-[#FF3C50] text-xs font-bold tracking-wide">MENU</span>
      <button id="hamburger-btn" onclick="toggleMobileMenu()" aria-label="Open Menu" class="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors">
        <span class="block w-6 h-0.5 bg-white rounded-full transition-all duration-300" id="hb-line-1"></span>
        <span class="block w-5 h-0.5 bg-white/70 rounded-full transition-all duration-300" id="hb-line-2"></span>
        <span class="block w-6 h-0.5 bg-white rounded-full transition-all duration-300" id="hb-line-3"></span>
      </button>
    </div>`;
  
  html = html.substring(0, mobileSubBarStart) + newMobileNav + html.substring(end);
  console.log('✅ Replaced mobile sub-bar with hamburger button');
} else {
  console.log('⚠️ Mobile sub-bar not found');
}

// ===== FIX 2: Fix the nav-link-mobile active state (blue -> red) in the new hamburger =====
html = html.replace(/bg-\[#2563EB\](\s+font-extrabold)/g, 'bg-[#D42526]$1');

// ===== FIX 3: Ensure Sign In btn uses red not blue =====
// (Already done by previous script, but double check)
html = html.replace(/bg-\[#2563EB\]\s+hover:bg-\[#1D4ED8\]/g, 'bg-[#D42526] hover:bg-[#B91C1C]');

// ===== FIX 4: Fix FiboSearch badge =====
html = html.replace(/class="([^"]*text-\[0\.6rem\][^"]*bg-\[#)3B82F6(\][^"]*)"/g, (m, a, b) => `class="${a}D42526${b}"`);

// ===== FIX 5: Fix desktop nav active Home button =====
// Desktop nav buttons with blue active state
html = html.replace(
  /id="nav-btn-storefront" class="([^"]*bg-\[#2563EB\][^"]*)"/g,
  (m, cls) => `id="nav-btn-storefront" class="${cls.replace('bg-[#2563EB]', 'bg-[#D42526]')}"`
);

// Save
fs.writeFileSync(protoPath, html, 'utf8');
console.log('✅ Saved. Final size:', html.length);
