const fs = require('fs');
const app = fs.readFileSync('frontend/src/App.tsx', 'utf8');

const sIdx = app.indexOf('currentScreen === \'storefront\'');
console.log('Storefront section in App.tsx:');
console.log(app.substring(sIdx, sIdx + 1500));
