const fs = require('fs');

let html = fs.readFileSync('c:/one stop Gadgets/index.html', 'utf8');

// Also update design/prototype/index.html if present
let protoHtml = null;
if (fs.existsSync('c:/one stop Gadgets/design/prototype/index.html')) {
  protoHtml = fs.readFileSync('c:/one stop Gadgets/design/prototype/index.html', 'utf8');
}

const initSnippet = `
<script>
  window.addEventListener('DOMContentLoaded', () => {
    if (typeof updateHeroProdDisplay === 'function') {
      updateHeroProdDisplay();
      startHeroProdTimer();
    }
  });
</script>
`;

if (!html.includes("if (typeof updateHeroProdDisplay === 'function')")) {
  html = html.replace('</body>', initSnippet + '\n</body>');
  fs.writeFileSync('c:/one stop Gadgets/index.html', html, 'utf8');
  console.log('Updated c:/one stop Gadgets/index.html with auto-start script');
}

// Ensure the prototype file is also synced
if (protoHtml) {
  // Check if protoHtml has the new hero
  if (!protoHtml.includes('hero-product-showcase')) {
    fs.copyFileSync('c:/one stop Gadgets/index.html', 'c:/one stop Gadgets/design/prototype/index.html');
    console.log('Synced index.html to design/prototype/index.html');
  }
}

console.log('Done!');
