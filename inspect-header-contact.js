const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');
const lines = p.split('\n');

console.log('=== Checking header lines 100-250 ===');
console.log(lines.slice(100, 250).join('\n'));

console.log('=== Checking contact form around lines 2595-2655 ===');
console.log(lines.slice(2594, 2655).join('\n'));
