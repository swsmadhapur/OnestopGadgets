const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

console.log('Join VIP Now index:', p.indexOf('Join VIP Now'));
console.log('Try Lucky Dip index:', p.indexOf('Try Lucky Dip'));
console.log('screen-signin index:', p.indexOf('screen-signin'));
console.log('screen-catalog index:', p.indexOf('screen-catalog'));
console.log('screen-about index:', p.indexOf('screen-about'));
console.log('screen-luckydip index:', p.indexOf('screen-luckydip'));
console.log('screen-contact index:', p.indexOf('screen-contact'));
