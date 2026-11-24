const fs = require('fs');
const app = fs.readFileSync('frontend/src/App.tsx', 'utf8');

console.log('App.tsx size:', app.length);
const lines = app.split('\n');
console.log('Lines 40 to 120 of App.tsx:');
console.log(lines.slice(40, 120).join('\n'));
