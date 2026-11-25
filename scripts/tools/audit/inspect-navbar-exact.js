const fs = require('fs');
const p = fs.readFileSync('design/prototype/index.html', 'utf8');

const headerStart = p.indexOf('<header');
const headerEnd = p.indexOf('</header>');
console.log('Header length:', headerEnd - headerStart);
console.log('=== HEADER CODE PREVIEW ===');
console.log(p.substring(headerStart, headerEnd + 9));

// Announcement bar preview
const mainIdx = p.indexOf('<main');
console.log('=== ANNOUNCEMENT BAR PREVIEW ===');
console.log(p.substring(headerEnd, mainIdx));
