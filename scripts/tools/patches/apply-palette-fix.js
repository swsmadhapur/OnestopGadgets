const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(src, 'utf8');

// Fix remaining stray old-palette occurrences
const fixes = [
  // gradient backgrounds using old colors
  ["from-[#041562] via-[#11468F] to-[#041562]", "from-[#141428] via-[#641428] to-[#141428]"],
  ["from-[#041562] to-[#11468F]",               "from-[#141428] to-[#641428]"],
  ["from-[#11468F] to-[#EEEEEE]",               "from-[#641428] to-[#FFF0F0]"],
  ["from-[#11468F]/10 to-[#EEEEEE]",            "from-[#641428]/10 to-[#FFF0F0]"],
  ["group-hover:from-[#041562] group-hover:to-[#11468F]",
   "group-hover:from-[#141428] group-hover:to-[#641428]"],
  ["from-[#DA1212] to-[#11468F]",               "from-[#FF3C50] to-[#641428]"],

  // decoration
  ["decoration-[#DA1212]",                       "decoration-[#FF3C50]"],

  // accent
  ["accent-[#DA1212]",                           "accent-[#FF3C50]"],
  ["accent-[#11468F]",                           "accent-[#641428]"],

  // ring with old color
  ["ring-[#041562]",                             "ring-[#141428]"],

  // hover:from, hover:to
  ["hover:from-[#041562]",                       "hover:from-[#141428]"],
  ["hover:to-[#11468F]",                         "hover:to-[#641428]"],
];

let count = 0;
for (const [from, to] of fixes) {
  const occurrences = (html.split(from).length - 1);
  if (occurrences > 0) {
    html = html.split(from).join(to);
    console.log(`  ✅ Fixed "${from.substring(0, 60)}" → ${occurrences} occurrence(s)`);
    count++;
  }
}

fs.writeFileSync(src, html, 'utf8');

// Final check
const remaining = ['#041562', '#11468F', '#DA1212', '#EEEEEE', '#030E40', '#B50E0E'];
let leftovers = 0;
for (const c of remaining) {
  // ignore the dev-bar display labels (which are just showing the hex text, not CSS)
  const inlineMentions = (html.split(c).length - 1);
  if (inlineMentions > 0) {
    console.log(`  ⚠️  ${c} still appears ${inlineMentions} time(s) (may be display label text)`);
    leftovers++;
  }
}

if (leftovers === 0) console.log('\n✅ Palette is 100% clean — no old colors remaining!');
else console.log('\n⚠️  Some old color hex strings remain (likely inside visible label text, not CSS).');
console.log(`Done. ${count} additional fix(es) applied.`);
