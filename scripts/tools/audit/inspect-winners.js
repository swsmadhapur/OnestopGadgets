const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

const wIdx = p.indexOf('id="winners-section"');
console.log('Winners section lines:');
console.log(p.substring(wIdx, wIdx + 2000));
