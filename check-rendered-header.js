const http = require('http');

http.get('http://localhost:8080', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('Has header tag:', html.includes('<header'));
    const hIdx = html.indexOf('<header');
    const hEnd = html.indexOf('</header>');
    console.log('Rendered Header in HTTP output:');
    console.log(html.substring(hIdx, hEnd + 9));
  });
}).on('error', (err) => {
  console.error('Server error:', err);
});
