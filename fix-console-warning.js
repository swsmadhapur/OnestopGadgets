const fs = require('fs');

let html = fs.readFileSync('c:/one stop Gadgets/design/prototype/index.html', 'utf8');

// Suppress Tailwind warning in console and separate script tag
const suppressCode = `
  <script>
    // Suppress cdn.tailwindcss.com production warning in DevTools console
    (function() {
      const origWarn = console.warn;
      console.warn = function(...args) {
        if (args[0] && typeof args[0] === 'string' && args[0].includes('cdn.tailwindcss.com')) {
          return;
        }
        origWarn.apply(console, args);
      };
    })();
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
`;

// Replace <script src="https://cdn.tailwindcss.com"> with clean separated script
html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com">[\s\S]*?<\/script>/, suppressCode);

// Also check if there's bare <script src="https://cdn.tailwindcss.com"></script>
if (!html.includes('Suppress cdn.tailwindcss.com')) {
  html = html.replace('<script src="https://cdn.tailwindcss.com"></script>', suppressCode);
}

fs.writeFileSync('c:/one stop Gadgets/design/prototype/index.html', html, 'utf8');
console.log('Fixed Tailwind CDN console warning suppression!');
