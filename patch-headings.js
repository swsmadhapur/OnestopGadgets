const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Replace Hero h1
html = html.replace(/<h1 class="animate-fade-up[^"]*">[\s\S]*?<\/h1>/i, '<h1 class="animate-fade-up text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">Exclusive Tech Deals, VIP Access, Cashback &amp; Weekly Lucky Dip Prizes</h1>');

// Sync VIP popup title and subtitle
html = html.replace(/<h3 class="text-2xl sm:text-3xl font-black">[^<]*<\/h3>/i, '<h3 class="text-2xl sm:text-3xl font-black">Unlock Exclusive Tech Deals &amp; Your Chance to Win Amazing Gadgets!</h3>');
html = html.replace(/<p class="text-white\/80 text-xs sm:text-sm mt-1">[^<]*<\/p>/i, '<p class="text-white/80 text-xs sm:text-sm mt-1">Your VIP Pass opens the door to premium gadget offers, exclusive discounts, and exciting weekly Lucky Dip draws. Discover more deals, unlock more benefits, and enjoy a smarter way to shop!</p>');

fs.writeFileSync(targetPath, html, 'utf8');
fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
console.log('✅ Updated hero heading and popup copy successfully');
