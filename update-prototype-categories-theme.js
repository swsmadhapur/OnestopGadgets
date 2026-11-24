const fs = require('fs');
const path = 'design/prototype/index.html';
let content = fs.readFileSync(path, 'utf8');

console.log('Original size:', content.length);

// 1. Exact 10 Categories definition to inject in prototype
const newCategoriesData = `const CATEGORIES_DATA = [
      { id: 'smartphones', name: 'Smartphones', count: '142 Deals', icon: '📱', badge: 'Hot' },
      { id: 'laptops-computers', name: 'Laptops & Computers', count: '89 Deals', icon: '💻', badge: 'Save 30%' },
      { id: 'smartwatches', name: 'Smartwatches', count: '64 Deals', icon: '⌚', badge: 'Trending' },
      { id: 'headphones-earbuds', name: 'Headphones & Earbuds', count: '98 Deals', icon: '🎧', badge: 'Top Rated' },
      { id: 'gaming-consoles', name: 'Gaming & Consoles', count: '52 Deals', icon: '🎮', badge: 'VIP Secret' },
      { id: 'tablets', name: 'Tablets', count: '45 Deals', icon: '📱', badge: 'Popular' },
      { id: 'cameras-accessories', name: 'Cameras & Accessories', count: '38 Deals', icon: '📷', badge: 'New' },
      { id: 'smart-tvs', name: 'Smart TVs', count: '31 Deals', icon: '📺', badge: 'Bestseller' },
      { id: 'home-appliances', name: 'Home Appliances', count: '40 Deals', badge: 'Essential' },
      { id: 'gadget-accessories', name: 'Gadget Accessories', count: '120 Deals', badge: 'Best Value' },
    ];`;

// Replace CATEGORIES_DATA in index.html
content = content.replace(/const\s+CATEGORIES_DATA\s*=\s*\[[\s\S]*?\];/, newCategoriesData);

// 2. Update category grid styling to support 10 items neatly (e.g. 2 cols mobile, 5 cols desktop)
content = content.replace(/grid-cols-2\s+sm:grid-cols-4\s+lg:grid-cols-7/g, 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5');

// 3. Update Colors to strictly Red (#E6192D), Royal Blue (#2563EB), Milky White (#FAF8F5)
// Replace old maroon #641428, #4A0E17, #561320, #360B14, #2A060C, #1a0408 with Royal Blue #2563EB or Red #E6192D or White
content = content.replace(/#641428/gi, '#2563EB');
content = content.replace(/#4A0E17/gi, '#1D4ED8');
content = content.replace(/#561320/gi, '#1E40AF');
content = content.replace(/#360B14/gi, '#172554');
content = content.replace(/#2A060C/gi, '#0F172A');
content = content.replace(/#1a0408/gi, '#0B1120');

// Replace purple / yellow accents with Red (#E6192D) or Royal Blue (#2563EB)
content = content.replace(/#7B1FA2/gi, '#2563EB');
content = content.replace(/#FF3C50/gi, '#E6192D');
content = content.replace(/#DC1F32/gi, '#E6192D');
content = content.replace(/#D42526/gi, '#E6192D');
content = content.replace(/#B91C1C/gi, '#C51424');
content = content.replace(/#991422/gi, '#A1101D');

// Replace background tones with Milky White #FAF8F5
content = content.replace(/#F8F9FA/gi, '#FAF8F5');
content = content.replace(/#F1F5F9/gi, '#FAF8F5');

// 4. Update Category Render function to strictly use Red, Blue, Milky White
const updatedRenderCategories = `// Render Gadget Categories on Home Page (High-Polish UI with Red & Blue Theme)
    function renderCategories() {
      const container = document.getElementById('categories-grid');
      if (!container) return;

      container.innerHTML = CATEGORIES_DATA.map(cat => \`
        <div 
          onclick="selectCategoryAndOpenDeals('\${cat.id}')"
          class="group relative cursor-pointer bg-[#FAF8F5] hover:bg-white rounded-2xl p-4 border border-blue-100 hover:border-[#2563EB] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center justify-between overflow-hidden transform hover:-translate-y-1.5"
          title="Click to view all \${cat.name} deals"
        >
          <!-- Badge -->
          <span class="absolute top-2 right-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-white group-hover:bg-[#E6192D] group-hover:text-white text-slate-600 transition shadow-xs border border-slate-200 group-hover:border-transparent">
            \${cat.badge}
          </span>
          
          <!-- Icon Tile with Royal Blue Hover -->
          <div class="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-[#2563EB] flex items-center justify-center text-2xl my-2 shadow-inner group-hover:scale-110 transition-all duration-300">
            <span class="transform transition duration-300 group-hover:brightness-125">\${cat.icon}</span>
          </div>

          <!-- Titles & Deal Count -->
          <div class="space-y-1 w-full">
            <div class="font-extrabold text-xs text-slate-800 group-hover:text-[#2563EB] transition truncate">
              \${cat.name}
            </div>
            <div class="text-[10px] font-bold text-slate-500 group-hover:text-[#E6192D] transition flex items-center justify-center gap-1">
              <span>\${cat.count}</span>
              <span class="inline-block transform transition group-hover:translate-x-0.5">→</span>
            </div>
          </div>
        </div>
      \`).join('');
    }`;

content = content.replace(/function\s+renderCategories\(\)\s*\{[\s\S]*?container\.innerHTML\s*=\s*CATEGORIES_DATA[\s\S]*?join\(''\);\s*\}/, updatedRenderCategories);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated design/prototype/index.html! New size:', content.length);

// Also sync root index.html
fs.writeFileSync('index.html', content, 'utf8');
console.log('Synced root index.html');
