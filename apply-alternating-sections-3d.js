const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Add 3D keyframe animations and 3D perspective classes in <style>
const css3D = `
    /* ===== 3D Animation & Perspective Effects ===== */
    .perspective-1000 { perspective: 1000px; }
    .transform-style-3d { transform-style: preserve-3d; }
    
    @keyframes float3D {
      0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
      50% { transform: translateY(-8px) rotateX(3deg) rotateY(-2deg); }
    }
    
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 10px 30px -10px rgba(37, 99, 235, 0.3), 0 0 15px rgba(239, 68, 68, 0.2); }
      50% { box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.5), 0 0 25px rgba(239, 68, 68, 0.4); }
    }

    .animate-float-3d {
      animation: float3D 6s ease-in-out infinite;
    }

    .card-3d-hover {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0);
    }
    .card-3d-hover:hover {
      transform: perspective(1000px) rotateX(4deg) rotateY(-3deg) translateY(-8px) translateZ(15px);
      box-shadow: 0 25px 35px -10px rgba(37, 99, 235, 0.35), 0 15px 20px -10px rgba(239, 68, 68, 0.25);
    }

    /* Alternating Section Background Themes */
    .bg-section-mesh {
      background: radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.08) 0%, transparent 40%),
                  radial-gradient(circle at 90% 80%, rgba(239, 68, 68, 0.08) 0%, transparent 40%),
                  #FFFFFF;
    }
    .bg-section-glass {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 240, 240, 0.85));
      backdrop-filter: blur(12px);
    }
    .bg-section-dark-elevated {
      background: linear-gradient(145deg, #0F172A 0%, #1E293B 50%, #1E1B4B 100%);
      color: #F8FAFC;
    }
`;

// Insert the 3D CSS right before </style>
html = html.replace('</style>', css3D + '\n  </style>');

// 2. Enhance Section 1: Categories Section (Light mesh background with 3D cards & floating elements)
const oldCategoriesSectionHeader = `<div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-extrabold text-[#141428] flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#FF3C50] shadow-sm"></span> Featured Gadget Categories
            </h2>
            <p class="text-xs text-slate-500">Click any category to open and filter verified tech deals</p>
          </div>
          <button onclick="navigate('catalog')" class="text-xs font-bold text-[#641428] hover:text-[#FF3C50] flex items-center gap-1 transition">
            <span>View All in Directory</span>
            <span>→</span>
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5" id="categories-grid">
          <!-- Dynamically populated by renderCategories() -->
        </div>
      </div>`;

const newCategoriesSectionHeader = `<!-- CATEGORIES SECTION: Elevated 3D Layer with Mesh Gradient -->
      <div class="bg-section-mesh p-6 sm:p-8 rounded-3xl border border-blue-200/60 shadow-lg space-y-5 relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -left-12 w-40 h-40 bg-red-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div class="flex items-center justify-between relative z-10">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-1">
              <span>✨ 3D Curated Showcase</span>
            </div>
            <h2 class="text-xl font-extrabold text-[#141428] flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#EF4444] shadow-sm animate-ping"></span> Featured Gadget Categories
            </h2>
            <p class="text-xs text-slate-500">Interactive 3D responsive category grid — click to browse verified deals</p>
          </div>
          <button onclick="navigate('catalog')" class="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-extrabold shadow hover:shadow-blue-500/25 transition flex items-center gap-1.5">
            <span>View All in Directory</span>
            <span>→</span>
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5 relative z-10" id="categories-grid">
          <!-- Dynamically populated by renderCategories() -->
        </div>
      </div>`;

html = html.replace(oldCategoriesSectionHeader, newCategoriesSectionHeader);

// 3. Enhance Section 2: Recent Verified Winners (Dark Elevated Theme with 3D animation)
const oldWinnersSection = `<!-- Recent Consented Winners Wall -->
      <div class="space-y-3">
        <h3 class="text-base font-extrabold text-[#141428] flex items-center gap-2">
          <span>🏆</span> Recent Verified Winners (Consented Display)
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white rounded-2xl border border-[#C8A0A0] p-4 flex items-center gap-3 shadow-sm">
            <div class="w-11 h-11 rounded-full bg-[#141428] text-white font-extrabold flex items-center justify-center text-sm">RK</div>
            <div>
              <div class="font-bold text-xs text-[#141428]">Rahul K. (Bengaluru)</div>
              <div class="text-xs text-[#FF3C50] font-semibold">Won Sony WH-1000XM5</div>
              <div class="text-[10px] text-slate-400">Round #41 • Drawn Nov 17, 2026</div>
            </div>
          </div>
          <div class="bg-white rounded-2xl border border-[#C8A0A0] p-4 flex items-center gap-3 shadow-sm">
            <div class="w-11 h-11 rounded-full bg-[#641428] text-white font-extrabold flex items-center justify-center text-sm">PS</div>
            <div>
              <div class="font-bold text-xs text-[#141428]">Priya S. (Mumbai)</div>
              <div class="text-xs text-[#FF3C50] font-semibold">Won Apple Watch Series 10</div>
              <div class="text-[10px] text-slate-400">Round #40 • Drawn Nov 10, 2026</div>
            </div>
          </div>
          <div class="bg-white rounded-2xl border border-[#C8A0A0] p-4 flex items-center gap-3 shadow-sm">
            <div class="w-11 h-11 rounded-full bg-[#FF3C50] text-white font-extrabold flex items-center justify-center text-sm">AV</div>
            <div>
              <div class="font-bold text-xs text-[#141428]">Amit V. (Delhi NCR)</div>
              <div class="text-xs text-[#FF3C50] font-semibold">Won iPad Air M2</div>
              <div class="text-[10px] text-slate-400">Round #39 • Drawn Nov 03, 2026</div>
            </div>
          </div>
        </div>
      </div>`;

const newWinnersSection = `<!-- Recent Consented Winners Wall: Dark Luxury 3D Floating Section -->
      <div class="bg-section-dark-elevated rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-2xl relative overflow-hidden space-y-4">
        <!-- Floating background particles -->
        <div class="absolute top-0 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute bottom-0 left-1/3 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div class="flex items-center justify-between relative z-10 flex-wrap gap-2">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-lg shadow-lg">
              🏆
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-extrabold text-white">Recent Verified Winners</h3>
              <p class="text-[11px] text-slate-400">100% Provably fair on-chain draws with consented display</p>
            </div>
          </div>
          <span class="text-[10px] font-mono px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Provably Fair CSPRNG Live
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
          <div class="card-3d-hover bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-4 flex items-center gap-3.5 shadow-lg">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white font-extrabold flex items-center justify-center text-sm shadow-md ring-2 ring-blue-400/30">RK</div>
            <div>
              <div class="font-bold text-xs text-white">Rahul K. (Bengaluru)</div>
              <div class="text-xs text-[#EF4444] font-bold">Won Sony WH-1000XM5</div>
              <div class="text-[10px] text-slate-400">Round #41 • Drawn Nov 17, 2026</div>
            </div>
          </div>
          <div class="card-3d-hover bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-4 flex items-center gap-3.5 shadow-lg">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 to-red-800 text-white font-extrabold flex items-center justify-center text-sm shadow-md ring-2 ring-red-400/30">PS</div>
            <div>
              <div class="font-bold text-xs text-white">Priya S. (Mumbai)</div>
              <div class="text-xs text-[#EF4444] font-bold">Won Apple Watch Series 10</div>
              <div class="text-[10px] text-slate-400">Round #40 • Drawn Nov 10, 2026</div>
            </div>
          </div>
          <div class="card-3d-hover bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-4 flex items-center gap-3.5 shadow-lg">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md ring-2 ring-amber-400/30">AV</div>
            <div>
              <div class="font-bold text-xs text-white">Amit V. (Delhi NCR)</div>
              <div class="text-xs text-[#EF4444] font-bold">Won iPad Air M2</div>
              <div class="text-[10px] text-slate-400">Round #39 • Drawn Nov 03, 2026</div>
            </div>
          </div>
        </div>
      </div>`;

html = html.replace(oldWinnersSection, newWinnersSection);

// 4. Update renderCategories in JS to add 3D class to category cards
html = html.replace(
  'class="group relative cursor-pointer bg-white rounded-2xl p-4 border border-[#C8A0A0] hover:border-[#641428] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center justify-between overflow-hidden"',
  'class="card-3d-hover group relative cursor-pointer bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-500 shadow-sm flex flex-col items-center text-center justify-between overflow-hidden"'
);

// 5. Enhance Section 3: VIP Pricing section (White Card Luxury Glass with 3D Floating Middle Card)
html = html.replace(
  '<div id="vip-pricing-section" class="pt-6 border-t border-[#C8A0A0]/60 space-y-8">',
  '<div id="vip-pricing-section" class="bg-section-glass p-6 sm:p-10 rounded-3xl border border-red-200/60 shadow-xl space-y-8 relative overflow-hidden">'
);

// Wrap middle pricing card in 3D floating and glowing effect
html = html.replace(
  '<div class="relative bg-[#141428] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 border-[#FF3C50] space-y-6 flex flex-col justify-between transform lg:-translate-y-2">',
  '<div class="card-3d-hover relative bg-gradient-to-b from-[#0F172A] to-[#1E1B4B] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 border-[#EF4444] space-y-6 flex flex-col justify-between transform lg:-translate-y-3 animate-float-3d">'
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('✅ Applied alternating section backgrounds with 3D depth, perspective, and hover animation!');
