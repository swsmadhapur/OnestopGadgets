const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

const m = p.match(/Exclusive Tech Deals,[\s\S]{1,1200}/);
if (m) {
  console.log('Found hero heading match:\n', m[0]);
} else {
  console.log('Heading not found');
}
