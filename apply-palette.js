const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(src, 'utf8');

// ============================================================
// NEW PALETTE MAPPING
// --color-1:  #000000  Black
// --color-2:  #3C3C3C  Dark Gray
// --color-3:  #641428  Dark Maroon
// --color-4:  #A0283C  Medium Red
// --color-5:  #FF3C50  Bright Red
// --color-6:  #C8A0A0  Light Pink/Rose
// --color-7:  #FFF0F0  Very Light Pink (background)
// --color-8:  #8C5000  Dark Brown
// --color-9:  #A0783C  Medium Brown/Tan
// --color-10: #F0C88C  Light Peach/Gold
// --color-11: #B4A064  Olive/Muted Gold
// --color-12: #DCB43C  Gold
// --color-13: #FFC800  Bright Gold/Yellow
// --color-18: #141428  Very Dark Navy (replaces deep navy #041562)
// --color-17: #2850DC  Blue accent (replaces royal blue #11468F)
// --color-20: #8C8C8C  Light Gray (borders, subtle)
// ============================================================

// ORDERED replacements (most specific first to avoid double-replacement)
const replacements = [
  // === Tailwind config token names (keep in comments but update hex values) ===
  ["'#041562'",       "'#141428'"],
  ["'#11468F'",       "'#641428'"],
  ["'#DA1212'",       "'#FF3C50'"],
  ["'#EEEEEE'",       "'#FFF0F0'"],
  ["'#030E40'",       "'#000000'"],
  ["'#D8DCE5'",       "'#C8A0A0'"],
  ["'#FFFFFF'",       "'#FFFFFF'"],  // keep white as-is

  // === CSS variables in <style> block ===
  ["background-color: #EEEEEE",   "background-color: #FFF0F0"],
  ["color: #041562",              "color: #141428"],
  ["background: linear-gradient(135deg, #041562 0%, #11468F 60%, #DA1212 140%)",
   "background: linear-gradient(135deg, #141428 0%, #641428 60%, #FF3C50 140%)"],
  ["background: #041562",         "background: #141428"],
  ["background: linear-gradient(90deg, #DA1212 0%, #11468F 100%)",
   "background: linear-gradient(90deg, #FF3C50 0%, #641428 100%)"],
  ["background: #11468F",         "background: #641428"],

  // === Tailwind inline classes - bg ===
  ["bg-[#041562]",     "bg-[#141428]"],
  ["bg-[#11468F]",     "bg-[#641428]"],
  ["bg-[#DA1212]",     "bg-[#FF3C50]"],
  ["bg-[#EEEEEE]",     "bg-[#FFF0F0]"],
  ["bg-[#030E40]",     "bg-[#000000]"],
  ["bg-[#B50E0E]",     "bg-[#A0283C]"],

  // === Tailwind inline classes - text ===
  ["text-[#041562]",   "text-[#141428]"],
  ["text-[#11468F]",   "text-[#641428]"],
  ["text-[#DA1212]",   "text-[#FF3C50]"],
  ["text-[#EEEEEE]",   "text-[#FFF0F0]"],

  // === Tailwind inline classes - border ===
  ["border-[#041562]", "border-[#141428]"],
  ["border-[#11468F]", "border-[#641428]"],
  ["border-[#DA1212]", "border-[#FF3C50]"],
  ["border-[#D8DCE5]", "border-[#C8A0A0]"],

  // === ring ===
  ["ring-[#DA1212]",   "ring-[#FF3C50]"],
  ["ring-[#11468F]",   "ring-[#641428]"],

  // === opacity variants ===
  ["[#041562]/80",     "[#141428]/80"],
  ["[#11468F]/60",     "[#641428]/60"],
  ["[#11468F]/50",     "[#641428]/50"],
  ["[#11468F]/40",     "[#641428]/40"],
  ["[#DA1212]/30",     "[#FF3C50]/30"],

  // === hover variants ===
  ["hover:bg-[#B50E0E]",    "hover:bg-[#A0283C]"],
  ["hover:bg-[#11468F]",    "hover:bg-[#641428]"],
  ["hover:bg-[#041562]",    "hover:bg-[#141428]"],
  ["hover:border-[#DA1212]","hover:border-[#FF3C50]"],
  ["hover:text-[#DA1212]",  "hover:text-[#FF3C50]"],
  ["hover:text-[#11468F]",  "hover:text-[#641428]"],

  // === shadow variants ===
  ["shadow-[#DA1212]",      "shadow-[#FF3C50]"],

  // === focus variants ===
  ["focus:border-[#DA1212]","focus:border-[#FF3C50]"],
  ["focus:ring-[#DA1212]",  "focus:ring-[#FF3C50]"],

  // === Dev bar: update palette label text ===
  ["Color Hunt Palette (#041562, #11468F, #DA1212, #EEEEEE):",
   "Custom Palette (#141428, #641428, #FF3C50, #FFF0F0):"],
  ["// Deep Navy Blue (Color Hunt 041562)",   "// Very Dark Navy (Custom)"],
  ["// Royal Blue (Color Hunt 11468f)",        "// Dark Maroon (Custom)"],
  ["// Vibrant Red (Color Hunt da1212)",        "// Bright Red (Custom)"],
  ["// Clean Surface Gray (Color Hunt eeeeee)","// Light Pink Surface (Custom)"],

  // === Tailwind scrollbar ===
  ["background: #11468F; border-radius", "background: #641428; border-radius"],

  // === VIP Pricing Section - keep readable, update any stray refs ===
  // already covered by above generic replacements
];

let count = 0;
for (const [from, to] of replacements) {
  const before = html;
  html = html.split(from).join(to);
  const changed = (html.split(to).length - 1) - (before.split(to).length - 1);
  if (changed !== 0) {
    console.log(`  ✅ Replaced "${from.substring(0,50)}" → ${changed} occurrences`);
    count++;
  }
}

fs.writeFileSync(src, html, 'utf8');
console.log(`\n✅ Done! Applied new palette to ${count} distinct pattern(s).`);
console.log(`   File: ${src}`);
