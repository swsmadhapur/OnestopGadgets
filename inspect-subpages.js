const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

const pages = ['screen-storefront', 'screen-catalog', 'screen-about', 'screen-contact', 'screen-luckydip'];
pages.forEach(id => {
  const idx = p.indexOf(`id="${id}"`);
  console.log(`Page #${id} found at index:`, idx);
  if (idx !== -1) {
    console.log(`Preview of #${id} (first 250 chars):\n`, p.substring(idx, idx + 250).replace(/\s+/g, ' '));
  }
});
