const fs = require('fs');

let doc = fs.readFileSync('c:/one stop Gadgets/line_264_doc.html', 'utf8');
const edits = JSON.parse(fs.readFileSync('c:/one stop Gadgets/all_edits.json', 'utf8'));

let applied = 0;
let failed = 0;

edits.forEach((e, idx) => {
  let target = e.target;
  let replacement = e.replacement;
  if (typeof target === 'string' && target.startsWith('"')) {
    try { target = JSON.parse(target); } catch(err) {}
  }
  if (typeof replacement === 'string' && replacement.startsWith('"')) {
    try { replacement = JSON.parse(replacement); } catch(err) {}
  }
  
  if (doc.includes(target)) {
    doc = doc.replaceAll(target, replacement);
    applied++;
  } else {
    failed++;
    console.log(`Edit #${idx} (line ${e.lineNum}) FAILED match. Target preview:`, JSON.stringify(target.substring(0, 60)));
  }
});

console.log(`Applied: ${applied}, Failed: ${failed}`);
fs.writeFileSync('c:/one stop Gadgets/reconstructed_index.html', doc, 'utf8');
console.log('Saved reconstructed_index.html, length:', doc.length);
