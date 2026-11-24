const fs = require('fs');
const app = fs.readFileSync('frontend/src/App.tsx', 'utf8');

const lines = app.split('\n');
console.log('Top 40 lines of App.tsx:');
console.log(lines.slice(0, 45).join('\n'));
