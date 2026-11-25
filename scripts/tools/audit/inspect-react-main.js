const fs = require('fs');
const app = fs.readFileSync('frontend/src/App.tsx', 'utf8');

const mIdx = app.indexOf('<main');
console.log('Main content preview:');
console.log(app.substring(mIdx, mIdx + 2000));
