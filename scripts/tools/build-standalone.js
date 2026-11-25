const fs = require('fs');
const path = require('path');

const logoBuffer = fs.readFileSync(path.join(__dirname, 'design', 'prototype', 'logo.jpg'));
const logoBase64 = `data:image/jpeg;base64,${logoBuffer.toString('base64')}`;

let html = fs.readFileSync(path.join(__dirname, 'design', 'prototype', 'index.html'), 'utf8');

// Replace all occurrences of src="logo.jpg" with the embedded base64 data URI
html = html.replace(/src="logo\.jpg"/g, `src="${logoBase64}"`);

const outputPath = path.join(__dirname, 'OneStopGadgets_Portable.html');
fs.writeFileSync(outputPath, html, 'utf8');

console.log('Portable standalone file created successfully!');
console.log('Path:', outputPath);
console.log('File size:', (fs.statSync(outputPath).size / 1024).toFixed(1) + ' KB');
