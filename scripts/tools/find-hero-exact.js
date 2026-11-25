const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

const heroIdx = p.indexOf('id="hero-section"');
console.log('heroIdx:', heroIdx);
if (heroIdx !== -1) {
  console.log(p.substring(heroIdx, heroIdx + 1500));
} else {
  const m = p.match(/GET FREE ENTRY/);
  console.log('GET FREE ENTRY index:', m ? m.index : -1);
  if (m) {
    console.log(p.substring(m.index - 500, m.index + 500));
  }
}
