const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

const screens = [
  'screen-storefront',
  'screen-catalog',
  'screen-about',
  'screen-luckydip',
  'screen-contact',
  'screen-pricing',
  'screen-admin',
  'screen-superadmin'
];

screens.forEach(s => {
  console.log(`Checking #${s}:`, p.includes(`id="${s}"`));
});

// Check if Sign-in screen or modal exists
console.log('Checking #login-modal:', p.includes('id="login-modal"'));
console.log('Checking #screen-signin:', p.includes('id="screen-signin"'));
