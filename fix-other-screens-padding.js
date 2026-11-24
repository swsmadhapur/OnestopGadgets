const fs = require('fs');
const path = require('path');

const protoPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(protoPath, 'utf8');

// For other screens (catalog, about, luckydip, contact, admin, superadmin), ensure they have max-w-7xl mx-auto px-4 py-8
const screens = ['catalog', 'about', 'luckydip', 'contact', 'admin', 'superadmin'];
screens.forEach(s => {
  const target = 'id="screen-' + s + '" class="screen-view hidden';
  if (html.includes(target)) {
    html = html.replace(target, target + ' max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full');
    console.log('✅ Added container padding to screen-' + s);
  }
});

fs.writeFileSync(protoPath, html, 'utf8');
console.log('Done!');
