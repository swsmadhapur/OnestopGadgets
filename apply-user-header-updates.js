const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

// =========================================================================
// 1. REMOVE DEV / PROTOTYPE / CUSTOM PALETTE TOP BAR (Image 1)
// =========================================================================
const devBarStart = '<!-- Top Developer / Prototype Navigation Bar -->';
const devBarEnd = '<!-- Primary Website Navigation Header';

const dStart = html.indexOf(devBarStart);
const dEnd = html.indexOf(devBarEnd);

if (dStart > -1 && dEnd > -1) {
  html = html.substring(0, dStart) + html.substring(dEnd);
  console.log('Removed Top Developer / Custom Palette bar successfully!');
} else {
  console.log('devBar markers not found, checking alternative...');
}

// Ensure header sticks directly to the top (top-0 instead of top-7)
html = html.replace('sticky top-7 z-40', 'sticky top-0 z-40');

// =========================================================================
// 2. CHANGE HEADER BACKGROUND TO SUITABLE RED / BURGUNDY GRADIENT (Image 2)
//    Matching the deep red website palette (#4A0E17 / #3B0A12 / #D42526)
// =========================================================================
html = html.replace(
  '.nav-gradient { background: linear-gradient(90deg, #0F172A 0%, #1E3A8A 50%, #881337 100%); }',
  '.nav-gradient { background: linear-gradient(90deg, #2A060C 0%, #4A0E17 35%, #5C121D 70%, #30070E 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.15); backdrop-filter: blur(12px); }'
);

// If nav-gradient appears in style tag with other values, also replace generally
html = html.replace(
  /\.nav-gradient\s*\{[^}]*\}/g,
  '.nav-gradient { background: linear-gradient(90deg, #2A060C 0%, #4A0E17 35%, #5C121D 70%, #30070E 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.15); backdrop-filter: blur(12px); }'
);

// =========================================================================
// 3. REPLACE LOGO IN HEADER (Image 3)
// =========================================================================
const logoBuffer = fs.readFileSync(path.join(__dirname, 'design', 'prototype', 'logo.jpg'));
const logoBase64 = `data:image/jpeg;base64,${logoBuffer.toString('base64')}`;

// Replace any existing base64 img inside the Logo container in header
const logoSectionStart = html.indexOf('<!-- 1. Logo (One Stop Gadgets) -->');
if (logoSectionStart > -1) {
  const imgStart = html.indexOf('<img', logoSectionStart);
  const imgEnd = html.indexOf('>', imgStart) + 1;
  const newImgTag = `<img src="${logoBase64}" alt="One Stop Gadgets" class="w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-2 ring-[#FF3C50] object-cover shadow-xl hover:scale-105 transition duration-300" />`;
  html = html.substring(0, imgStart) + newImgTag + html.substring(imgEnd);
  console.log('Replaced header logo image with the new 3rd image circular tech logo!');
}

// Also update any other logo references in footer or watermark
html = html.replace(/src="logo\.jpg"/g, `src="${logoBase64}"`);

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Saved prototype file successfully!');
