const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace all occurrences of View Deal button classes:
// From:
// border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white
// or
// border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white
// To:
// border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#FF3C50] hover:border-[#FF3C50] hover:text-white shadow-xs transition-all duration-200

const target1 = 'border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white';
const replace1 = 'border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#FF3C50] hover:border-[#FF3C50] hover:text-white shadow-xs transition-all duration-200';

const target2 = 'border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white';
const replace2 = 'border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#FF3C50] hover:border-[#FF3C50] hover:text-white shadow-xs transition-all duration-200';

const count1 = (html.split(target1).length - 1);
const count2 = (html.split(target2).length - 1);

html = html.split(target1).join(replace1);
html = html.split(target2).join(replace2);

// Also update `insert-deal-sections.js` just in case it is re-run in the future
const insertScriptPath = path.join(__dirname, 'insert-deal-sections.js');
if (fs.existsSync(insertScriptPath)) {
  let insertScript = fs.readFileSync(insertScriptPath, 'utf8');
  insertScript = insertScript.replace(
    /border border-\[#FF3C50\] text-\[#FF3C50\] hover:bg-\[#FF3C50\] hover:text-white/g,
    'border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#FF3C50] hover:border-[#FF3C50] hover:text-white shadow-xs transition-all duration-200'
  );
  insertScript = insertScript.replace(
    /border border-\[#2563EB\] text-\[#2563EB\] hover:bg-\[#2563EB\] hover:text-white/g,
    'border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#FF3C50] hover:border-[#FF3C50] hover:text-white shadow-xs transition-all duration-200'
  );
  fs.writeFileSync(insertScriptPath, insertScript, 'utf8');
}

fs.writeFileSync(filePath, html, 'utf8');
console.log(`✅ Updated ${count1 + count2} 'View Deal' button(s) across all product cards to hover in red (#FF3C50)!`);
