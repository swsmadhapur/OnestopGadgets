const fs = require('fs');

const protoPath = 'design/prototype/index.html';
let content = fs.readFileSync(protoPath, 'utf8');

// Ensure navigate function highlights active navbar button with #D91E26
const navUpdateSnippet = `// Update Desktop Nav active link (Reference screenshot style with solid red #D91E26 active)
      document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('bg-[#D91E26]', 'text-[#F5F5F7]', 'shadow-md');
        btn.classList.add('text-[#F5F5F7]', 'hover:text-white', 'hover:bg-white/10');
      });
      const activeLink = document.getElementById('nav-btn-' + screenId);
      if (activeLink) {
        activeLink.classList.remove('hover:bg-white/10');
        activeLink.classList.add('bg-[#D91E26]', 'text-[#F5F5F7]', 'shadow-md');
      }`;

content = content.replace(/\/\/ Update Desktop Nav active link[\s\S]*?activeLink\.classList\.add\([^\)]*\);\s*\}/, navUpdateSnippet + '\n    }');

fs.writeFileSync(protoPath, content, 'utf8');
fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully aligned active link highlighter in navigate()!');
