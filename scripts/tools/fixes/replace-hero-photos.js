const fs = require('fs');
const path = require('path');

const toBase64Png = (file) => {
  const buf = fs.readFileSync('c:/one stop Gadgets/assets/hero/' + file);
  return 'data:image/png;base64,' + buf.toString('base64');
};

const imgIphone = toBase64Png('iphone16.png');
const imgPs5 = toBase64Png('ps5.png');
const imgDyson = toBase64Png('dyson.png');
const imgAmazon = toBase64Png('amazon_voucher.png');
const imgGiftbox = toBase64Png('giftbox.png');

const targetPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Replace HERO_PRODUCTS array in prototype
const newHeroArray = `  const HERO_PRODUCTS = [
    {
      id: 'p1',
      title: 'iPhone 16 Pro Max',
      subtitle: 'PRIZE 01 / 05',
      badge: 'Prize 01',
      img: '${imgIphone}'
    },
    {
      id: 'p2',
      title: 'PS5',
      subtitle: 'PRIZE 02 / 05',
      badge: 'Prize 02',
      img: '${imgPs5}'
    },
    {
      id: 'p3',
      title: 'Dyson Airwrap',
      subtitle: 'PRIZE 03 / 05',
      badge: 'Prize 03',
      img: '${imgDyson}'
    },
    {
      id: 'p4',
      title: 'Amazon Gift Voucher',
      subtitle: 'PRIZE 04 / 05',
      badge: 'Prize 04',
      img: '${imgAmazon}'
    },
    {
      id: 'p5',
      title: 'Exclusive Mystery Gift Box',
      subtitle: 'PRIZE 05 / 05',
      badge: 'Prize 05',
      img: '${imgGiftbox}'
    }
  ];`;

// Replace HERO_PRODUCTS in HTML
const start = html.indexOf('const HERO_PRODUCTS = [');
if (start > -1) {
  const end = html.indexOf('];', start) + 2;
  html = html.substring(0, start) + newHeroArray + html.substring(end);
  console.log('Replaced HERO_PRODUCTS with new transparent PNG images!');
} else {
  console.log('Could not find HERO_PRODUCTS');
}

// Update the preview thumbnail default image if present
html = html.replace(/src="data:image\/jpeg;base64,[^"]*"/g, (match) => {
  // if it was the old ps5 or others
  return match;
});

// Specifically update hero-next-thumb default src
const thumbIdx = html.indexOf('id="hero-next-thumb"');
if (thumbIdx > -1) {
  const srcStart = html.lastIndexOf('src="', thumbIdx);
  const srcEnd = html.indexOf('"', srcStart + 5);
  html = html.substring(0, srcStart + 5) + imgPs5 + html.substring(srcEnd);
  console.log('Updated hero-next-thumb preview!');
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Saved prototype file successfully!');
