const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Update <style> gradients and CSS rules
const oldStyleBlock = `<style>
    body { font-family: 'Manrope', sans-serif; background-color: #FFF0F0; color: #141428; }
    .hero-gradient { background: linear-gradient(135deg, #141428 0%, #641428 60%, #FF3C50 140%); }
    .nav-gradient { background: #141428; }
    .jackpot-gradient { background: linear-gradient(90deg, #FF3C50 0%, #641428 100%); }
    .fibo-dropdown { box-shadow: 0 10px 30px -5px rgba(4, 21, 98, 0.25); }
    .custom-scroll::-webkit-scrollbar { width: 6px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #641428; border-radius: 999px; }
  </style>`;

const newStyleBlock = `<style>
    body { font-family: 'Manrope', sans-serif; background-color: #0A0F24; color: #F1F5F9; }
    .hero-gradient { background: linear-gradient(135deg, #1E3A8A 0%, #0F172A 45%, #B91C1C 100%); }
    .nav-gradient { background: linear-gradient(90deg, #0F172A 0%, #1E3A8A 50%, #881337 100%); }
    .jackpot-gradient { background: linear-gradient(90deg, #EF4444 0%, #2563EB 100%); }
    .red-blue-gradient { background: linear-gradient(135deg, #EF4444 0%, #3B82F6 100%); }
    .blue-red-gradient { background: linear-gradient(135deg, #1E40AF 0%, #DC2626 100%); }
    .card-gradient { background: linear-gradient(145deg, rgba(30, 58, 138, 0.15) 0%, rgba(185, 28, 28, 0.12) 100%); }
    .fibo-dropdown { box-shadow: 0 10px 30px -5px rgba(37, 99, 235, 0.35); }
    .custom-scroll::-webkit-scrollbar { width: 6px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #2563EB; border-radius: 999px; }
  </style>`;

if (html.includes(oldStyleBlock)) {
  html = html.replace(oldStyleBlock, newStyleBlock);
  console.log('✅ Updated <style> block with rich red-and-blue gradients!');
} else {
  console.log('⚠️ oldStyleBlock not found exact match, doing regex replacement');
  html = html.replace(/\.hero-gradient\s*\{[^}]+\}/, '.hero-gradient { background: linear-gradient(135deg, #1E3A8A 0%, #0F172A 45%, #B91C1C 100%); }');
  html = html.replace(/\.nav-gradient\s*\{[^}]+\}/, '.nav-gradient { background: linear-gradient(90deg, #0F172A 0%, #1E3A8A 50%, #881337 100%); }');
  html = html.replace(/\.jackpot-gradient\s*\{[^}]+\}/, '.jackpot-gradient { background: linear-gradient(90deg, #EF4444 0%, #2563EB 100%); }');
}

// 2. Update Tailwind config
html = html.replace(
  /colors:\s*\{\s*palette:\s*\{[^}]+\}\s*\}/s,
  `colors: {
            palette: {
              navy: '#0F172A',
              royalBlue: '#2563EB',
              red: '#EF4444',
              softGray: '#0A0F24',
              card: '#1E293B',
              border: '#334155',
              dark: '#020617',
            }
          }`
);

// 3. Make all buttons use blue color:
// Replace bg-[#FF3C50] on buttons and action CTAs with Royal Blue bg-[#2563EB] hover:bg-[#1D4ED8]
html = html.split('bg-[#FF3C50] hover:bg-[#A0283C]').join('bg-[#2563EB] hover:bg-[#1D4ED8]');
html = html.split('bg-[#FF3C50] hover:bg-[#B50E0E]').join('bg-[#2563EB] hover:bg-[#1D4ED8]');
html = html.split('bg-[#641428] hover:bg-[#141428]').join('bg-[#2563EB] hover:bg-[#1D4ED8]');
html = html.split('bg-[#641428] hover:bg-[#041562]').join('bg-[#2563EB] hover:bg-[#1D4ED8]');
html = html.split('border-2 border-[#FF3C50] text-[#FF3C50] hover:bg-[#FF3C50] hover:text-white')
           .join('border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white');
html = html.split('border border-[#FF3C50] text-[#FF3C50] hover:bg-[#FF3C50] hover:text-white')
           .join('border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white');

// Sign in button in header
html = html.split('bg-[#FF3C50] text-white font-bold text-xs shadow-md').join('bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-md');

// Active nav tabs
html = html.split('bg-[#641428] font-extrabold shadow-sm').join('bg-[#2563EB] font-extrabold shadow-sm');
html = html.split('bg-[#641428] font-extrabold').join('bg-[#2563EB] font-extrabold');

// Subscribe buttons in pricing
html = html.split('Subscribe Quarterly (₹699)</button>')
           .join('Subscribe Quarterly (₹699)</button>'); // already uses class

// In VIP banner from image 2, change yellow button to blue with red-blue gradient hover:
html = html.split('bg-[#FFC800] hover:bg-[#e0b000] text-[#141428] font-extrabold text-xs shadow-lg')
           .join('bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs shadow-lg');

// In Giveaways card button
html = html.split('id="ld-home-cta" class="w-full py-2.5 rounded-xl bg-[#2563EB]')
           .join('id="ld-home-cta" class="w-full py-2.5 rounded-xl bg-[#2563EB]');

// Background gradients for hero and banner sections
html = html.split('from-[#501020] via-[#641428] to-[#781830]')
           .join('from-[#1E3A8A] via-[#0F172A] to-[#991B1B]');

// Top developer banner gradient
html = html.split('bg-[#141428] border-b border-[#641428]/60')
           .join('bg-gradient-to-r from-[#1E3A8A] via-[#0F172A] to-[#DC2626] border-b border-white/20');

// Top marquee deal banner:
html = html.split('bg-[#FF3C50] text-white text-xs py-1.5 px-4 text-center')
           .join('bg-gradient-to-r from-[#DC2626] via-[#2563EB] to-[#DC2626] text-white text-xs py-1.5 px-4 text-center');

// Top deals tab button active
html = html.split("tab-all' class='deal-tab shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#FF3C50]")
           .join("tab-all' class='deal-tab shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#2563EB]");

// Save the file
fs.writeFileSync(filePath, html, 'utf8');
console.log('✅ Red & Blue gradients applied to website and buttons updated to Blue!');
