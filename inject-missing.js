const fs = require('fs');
const protoPath = 'design/prototype/index.html';
let content = fs.readFileSync(protoPath, 'utf8');

// Check renderCategories definition
const renderCategoriesFn = `
    // Render Gadget Categories on Home Page (High-Polish UI with Red & Blue Theme)
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
    }
`;

if (!content.includes('function renderCategories()')) {
  // Insert before renderDeals
  content = content.replace('function renderDeals()', renderCategoriesFn + '\n\n    function renderDeals()');
}

// Add Floating WhatsApp button before </body>
const floatingWhatsAppBtn = `
<!-- Floating WhatsApp Support Button -->
<a 
  href="https://wa.me/917989410963?text=Hi%20One%20Stop%20Gadgets%2C%20I%20have%20an%20inquiry%20regarding%20deals%20and%20VIP%20membership" 
  target="_blank" 
  rel="noopener"
  class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 group font-bold text-xs"
  title="Chat with One Stop Gadgets on WhatsApp"
>
  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
  <span>WhatsApp Help</span>
</a>
`;

if (!content.includes('WhatsApp Help')) {
  content = content.replace('</body>', floatingWhatsAppBtn + '\n</body>');
}

fs.writeFileSync(protoPath, content, 'utf8');
fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully injected renderCategories & WhatsApp button!');
