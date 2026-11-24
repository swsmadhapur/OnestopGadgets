const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Update body CSS background in <style>
// Use the exact rich crimson-to-berry gradient sampled from the user's uploaded banner:
// linear-gradient(135deg, #D42526 0%, #AD2F4A 50%, #8A3B6F 100%)
html = html.replace(
  /body\s*\{\s*font-family:\s*'Manrope',\s*sans-serif;\s*background-color:\s*#FFF0F0;\s*color:\s*#141428;\s*\}/,
  `body { 
      font-family: 'Manrope', sans-serif; 
      background: linear-gradient(135deg, #D42526 0%, #AD2F4A 50%, #8A3B6F 100%) fixed; 
      color: #FFFFFF; 
    }`
);

// Update <body ...> tag
html = html.replace(
  '<body class="min-h-screen flex flex-col antialiased bg-[#FFF0F0] text-[#141428]">',
  '<body class="min-h-screen flex flex-col antialiased text-white" style="background: linear-gradient(135deg, #D42526 0%, #AD2F4A 50%, #8A3B6F 100%) fixed;">'
);

// 2. Replace all occurrences of cream/pink background classes
// #FFF0F0 -> rgba(255,255,255,0.08) or #FFFFFF for cards
html = html.split('bg-[#FFF0F0]').join('bg-white/10 backdrop-blur-md');
html = html.split('hover:bg-[#FFF0F0]').join('hover:bg-white/20');

// Replace cream carousel slider containers (#FFF9EE, #FFF4F6, #F0F5FF, #F0FAF4)
html = html.split('bg-[#FFF9EE] border border-[#F0C88C]')
           .join('bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-xl');
html = html.split('bg-[#FFF4F6] border border-[#C8A0A0]')
           .join('bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-xl');
html = html.split('bg-[#F0F5FF] border border-[#B4D0FE]')
           .join('bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-xl');
html = html.split('bg-[#F0FAF4] border border-[#A7E8BD]')
           .join('bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-xl');

// In those containers, make headings white
html = html.split('text-base sm:text-lg font-extrabold text-[#141428]')
           .join('text-base sm:text-lg font-extrabold text-white');

// In deals filter sidebar, replace cream backgrounds
html = html.split('bg-[#FFF0F0] border border-[#C8A0A0]').join('bg-white/10 border border-white/20 text-white');

// Update section mesh and glass to match the gradient background
html = html.replace(
  /\.bg-section-mesh\s*\{[^}]+\}/,
  `.bg-section-mesh {
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }`
);

html = html.replace(
  /\.bg-section-glass\s*\{[^}]+\}/,
  `.bg-section-glass {
      background: rgba(255, 255, 255, 0.14);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.25);
    }`
);

// Ensure text on Category titles and main headers is crisp white
html = html.split('text-xl font-extrabold text-[#141428]').join('text-xl font-extrabold text-white');
html = html.split('text-3xl sm:text-4xl font-extrabold text-[#141428]').join('text-3xl sm:text-4xl font-extrabold text-white');

// In insert-deal-sections.js, also update template if present
const insertScriptPath = path.join(__dirname, 'insert-deal-sections.js');
if (fs.existsSync(insertScriptPath)) {
  let sc = fs.readFileSync(insertScriptPath, 'utf8');
  sc = sc.replace(/bg-\[#FFF0F0\]/g, 'bg-white/10');
  sc = sc.replace(/bg-\[#FFF9EE\]/g, 'bg-white/15');
  sc = sc.replace(/bg-\[#FFF4F6\]/g, 'bg-white/15');
  sc = sc.replace(/bg-\[#F0F5FF\]/g, 'bg-white/15');
  sc = sc.replace(/bg-\[#F0FAF4\]/g, 'bg-white/15');
  fs.writeFileSync(insertScriptPath, sc, 'utf8');
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('✅ Applied user gradient (#D42526 -> #AD2F4A -> #8A3B6F) as whole website background and removed cream!');
