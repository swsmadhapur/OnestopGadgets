const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(src, 'utf8');

// =============================================
// 1. Replace renderCatalogPills to show icon-column style (like reference image)
// =============================================
const OLD_PILLS_FN = `    // Quick Category Filter Pills in Catalog
    function renderCatalogPills(activeId = 'all') {
      const pillsContainer = document.getElementById('catalog-category-pills');
      if (!pillsContainer) return;

      const allOption = { id: 'all', name: 'All Deals', icon: '⚡' };
      const items = [allOption, ...CATEGORIES_DATA];

      pillsContainer.innerHTML = items.map(item => {
        const isActive = (item.id.toLowerCase() === activeId.toLowerCase());
        return \`
          <button 
            onclick="selectCategoryFilter('\${item.id}')"
            class="px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition flex items-center gap-1.5 shrink-0 \${
              isActive 
                ? 'bg-[#641428] text-white shadow-md' 
                : 'bg-white text-[#141428] border border-[#C8A0A0] hover:border-[#641428] hover:bg-slate-50'
            }"
          >
            <span>\${item.icon}</span>
            <span>\${item.name}</span>
          </button>
        \`;
      }).join('');
    }`;

const NEW_PILLS_FN = `    // Quick Category Filter Icon-Column Scroll Row in Catalog (reference image style)
    function renderCatalogPills(activeId = 'all') {
      const pillsContainer = document.getElementById('catalog-category-pills');
      if (!pillsContainer) return;

      const allOption = { id: 'all', name: 'All', icon: '⚡' };
      const items = [allOption, ...CATEGORIES_DATA];

      pillsContainer.innerHTML = items.map(item => {
        const isActive = (item.id.toLowerCase() === activeId.toLowerCase());
        return \`
          <button 
            onclick="selectCategoryFilter('\${item.id}')"
            class="shrink-0 flex flex-col items-center gap-1.5 cursor-pointer group"
            title="\${item.name}"
          >
            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center text-xl sm:text-2xl transition-all duration-200 shadow-sm
              \${isActive 
                ? 'border-[#FF3C50] bg-[#FFF0F0] scale-110 shadow-md' 
                : 'border-[#C8A0A0] bg-white group-hover:border-[#641428] group-hover:bg-[#FFF0F0]'
              }">
              \${item.icon}
            </div>
            <span class="text-[10px] font-bold leading-tight text-center whitespace-nowrap max-w-14 truncate transition
              \${isActive ? 'text-[#FF3C50]' : 'text-slate-600 group-hover:text-[#641428]'}">
              \${item.name}
            </span>
          </button>
        \`;
      }).join('');
    }`;

if (html.includes(OLD_PILLS_FN.substring(0, 60))) {
  html = html.replace(OLD_PILLS_FN, NEW_PILLS_FN);
  console.log('✅ renderCatalogPills updated');
} else {
  // try partial match on key signature
  const sig = "function renderCatalogPills(activeId = 'all') {";
  const idx = html.indexOf(sig);
  console.log('Signature found at index:', idx);
}

// =============================================
// 2. Replace makeDealCard with reference-image style card
// =============================================
const OLD_DEAL_CARD = `    // Helper to generate Deal Card HTML
    function makeDealCard(d) {
      return \`
        <div class="bg-white rounded-2xl border border-[#C8A0A0] p-4 shadow-sm hover:shadow-lg transition flex flex-col justify-between group">
          <div>
            <div class="bg-[#FFF0F0] rounded-xl h-36 flex items-center justify-center text-5xl mb-3 relative overflow-hidden">
              <span class="transform group-hover:scale-110 transition duration-300">\${d.icon}</span>
              <span class="absolute top-2 left-2 \${d.isVip ? 'bg-[#641428]' : 'bg-[#FF3C50]'} text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase shadow-xs">\${d.discount}</span>
              <span class="absolute top-2 right-2 bg-white text-slate-700 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm border border-slate-200">\${d.store}</span>
            </div>
            <div class="text-[10px] font-bold uppercase text-slate-400 tracking-wider">\${d.category}</div>
            <h3 class="font-bold text-xs text-[#141428] line-clamp-2 mt-0.5 group-hover:text-[#641428] transition">\${d.title}</h3>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-base font-extrabold text-[#141428]">\${d.price}</span>
              <span class="text-xs line-through text-slate-400">\${d.original}</span>
            </div>
          </div>
          <button onclick="handleDealOutbound('\${d.title}', \${d.isVip})" class="mt-4 w-full py-2.5 rounded-xl \${d.isVip ? 'bg-[#FF3C50] hover:bg-[#A0283C]' : 'bg-[#641428] hover:bg-[#141428]'} text-white text-xs font-bold transition shadow-sm hover:shadow-md">
            \${d.isVip ? 'Unlock with VIP →' : \`View Deal at \${d.store} →\`}
          </button>
        </div>
      \`;
    }`;

const NEW_DEAL_CARD = `    // Helper to generate Deal Card HTML (reference image style)
    function makeDealCard(d) {
      // compute numeric discount % for badge
      const pNum = parseInt((d.price || '').replace(/[^0-9]/g,''));
      const oNum = parseInt((d.original || '').replace(/[^0-9]/g,''));
      let discPct = '';
      if (pNum && oNum && oNum > pNum) {
        discPct = Math.round((1 - pNum/oNum)*100) + '% OFF';
      } else {
        discPct = d.discount;
      }

      // wishlist state
      const favId = 'fav-' + d.id;
      return \`
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
          
          <!-- Product Image Area -->
          <div class="relative bg-[#FFF0F0] h-40 sm:h-44 flex items-center justify-center overflow-hidden">
            <!-- Discount Badge -->
            <span class="absolute top-2 left-2 \${d.isVip ? 'bg-[#641428]' : 'bg-[#FF3C50]'} text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded z-10">
              \${discPct}
            </span>
            <!-- Wishlist Heart -->
            <button onclick="toggleWishlist('\${favId}', this)" id="\${favId}" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-slate-400 hover:text-[#FF3C50] transition z-10 text-sm">
              &#9825;
            </button>
            <!-- Product Icon -->
            <span class="text-5xl sm:text-6xl transform group-hover:scale-110 transition-transform duration-300">\${d.icon}</span>
            <!-- Grab Now Overlay -->
            <div class="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button onclick="handleDealOutbound('\${d.title}', \${d.isVip})"
                class="w-full py-1.5 bg-[#FFC800] hover:bg-[#DCB43C] text-[#141428] text-[10px] font-extrabold flex items-center justify-center gap-1 transition">
                &#127381; Grab now
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-3 flex flex-col flex-1">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">\${d.store}</div>
            <h3 class="text-xs font-bold text-[#141428] line-clamp-2 leading-snug mb-2 group-hover:text-[#641428] transition">\${d.title}</h3>
            
            <!-- Price Row -->
            <div class="flex items-baseline gap-1.5 mb-3">
              <span class="text-sm font-extrabold text-[#141428]">\${d.price}</span>
              <span class="text-[10px] line-through text-slate-400">\${d.original}</span>
              <span class="text-[10px] font-bold text-[#FF3C50] ml-auto">\${discPct}</span>
            </div>

            <!-- Valid line -->
            <div class="text-[9px] text-slate-400 mb-3">Valid till 30 Nov</div>

            <!-- View Deal Button -->
            <button onclick="handleDealOutbound('\${d.title}', \${d.isVip})"
              class="mt-auto w-full py-2 rounded-xl border-2 border-[#FF3C50] text-[#FF3C50] hover:bg-[#FF3C50] hover:text-white text-[10px] font-extrabold transition">
              View Deal
            </button>
          </div>
        </div>
      \`;
    }

    function toggleWishlist(id, btn) {
      const isLiked = btn.innerHTML.includes('&#10084;') || btn.innerHTML === '&#9829;' || btn.textContent.trim() === '♥';
      btn.innerHTML = isLiked ? '&#9825;' : '&#10084;';
      btn.classList.toggle('text-[#FF3C50]', !isLiked);
      btn.classList.toggle('text-slate-400', isLiked);
    }`;

if (html.includes('function makeDealCard(d) {')) {
  html = html.replace(OLD_DEAL_CARD, NEW_DEAL_CARD);
  if (html.includes('function toggleWishlist')) {
    console.log('✅ makeDealCard + toggleWishlist updated');
  } else {
    // Try inserting after makeDealCard if replacement didn't add it
    console.log('⚠️  Did partial replacement check');
  }
}

// =============================================
// 3. Add new helper functions (selectDealTab, sidebarCatFilter, sortDeals) 
//    just before the closing </script>
// =============================================
const NEW_HELPERS = `
    // ===== DEALS PAGE: Tab switcher =====
    function selectDealTab(tab) {
      document.querySelectorAll('.deal-tab').forEach(btn => {
        btn.classList.remove('bg-[#FF3C50]', 'text-white', 'shadow');
        btn.classList.add('bg-white', 'border', 'border-[#C8A0A0]', 'text-[#141428]');
      });
      const active = document.getElementById('tab-' + tab);
      if (active) {
        active.classList.remove('bg-white', 'border', 'border-[#C8A0A0]', 'text-[#141428]');
        active.classList.add('bg-[#FF3C50]', 'text-white', 'shadow');
      }
    }

    // ===== DEALS PAGE: Sidebar category radio =====
    function sidebarCatFilter(catId) {
      const catDropdown = document.getElementById('cat-filter');
      if (catDropdown) catDropdown.value = catId;
      renderCatalogPills(catId);
      filterCatalog();
    }

    // ===== DEALS PAGE: Sort =====
    function sortDeals(sortVal) {
      const container = document.getElementById('catalog-deals-grid');
      if (!container) return;
      let data = [...DEALS_DATA];
      if (sortVal === 'discount') {
        data.sort((a, b) => {
          const pct = d => {
            const p = parseInt((d.price||'').replace(/[^0-9]/g,''));
            const o = parseInt((d.original||'').replace(/[^0-9]/g,''));
            return o > 0 ? (1 - p/o) : 0;
          };
          return pct(b) - pct(a);
        });
      } else if (sortVal === 'priceLow') {
        data.sort((a, b) => parseInt((a.price||'').replace(/[^0-9]/g,'')) - parseInt((b.price||'').replace(/[^0-9]/g,'')));
      } else if (sortVal === 'priceHigh') {
        data.sort((a, b) => parseInt((b.price||'').replace(/[^0-9]/g,'')) - parseInt((a.price||'').replace(/[^0-9]/g,'')));
      }
      container.innerHTML = data.map(makeDealCard).join('');
    }
`;

// Insert before last </script>
const lastScriptClose = html.lastIndexOf('</script>');
if (lastScriptClose !== -1) {
  html = html.substring(0, lastScriptClose) + NEW_HELPERS + '\n  </script>';
  console.log('✅ New helper functions inserted');
}

fs.writeFileSync(src, html, 'utf8');
console.log('Done. Total lines:', html.split('\n').length);
