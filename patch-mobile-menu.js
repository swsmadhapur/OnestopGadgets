const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

html = html.replace('href="#lucky-dip-section" onclick="toggleMobileMenu()"', 'onclick="toggleMobileMenu(); handleLuckyDipNavClick();"');
html = html.replace('href="#deals-section" onclick="toggleMobileMenu()"', 'onclick="toggleMobileMenu(); navigate(\'catalog\');"');

fs.writeFileSync(targetPath, html, 'utf8');
fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
console.log('Mobile menu updated');
