const fs = require('fs');

// Check frontend/src/App.tsx
if (fs.existsSync('frontend/src/App.tsx')) {
  const app = fs.readFileSync('frontend/src/App.tsx', 'utf8');
  console.log('frontend/src/App.tsx size:', app.length);
  const hIdx = app.indexOf('<header');
  const hEnd = app.indexOf('</header>');
  if (hIdx !== -1 && hEnd !== -1) {
    console.log('App.tsx header found:', app.substring(hIdx, hIdx + 300));
  } else {
    console.log('No <header> directly in App.tsx');
  }
} else {
  console.log('No frontend/src/App.tsx');
}

// Check design/prototype/index.html
const proto = fs.readFileSync('design/prototype/index.html', 'utf8');
console.log('design/prototype/index.html size:', proto.length);
const pStart = proto.indexOf('<header');
const pEnd = proto.indexOf('</header>');
console.log('Prototype header length:', pEnd - pStart);
