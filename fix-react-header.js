const fs = require('fs');

let appTsx = fs.readFileSync('frontend/src/App.tsx', 'utf8');

// Replace Screen type to include 'about', 'contact', 'signin'
appTsx = appTsx.replace(
  `type Screen = 'storefront' | 'catalog' | 'pricing' | 'luckydip' | 'admin' | 'superadmin';`,
  `type Screen = 'storefront' | 'catalog' | 'pricing' | 'luckydip' | 'about' | 'contact' | 'signin' | 'admin' | 'superadmin';`
);

const hStart = appTsx.indexOf('<header');
const hEnd = appTsx.indexOf('</header>');

const newAppHeader = `<header style={{ background: 'linear-gradient(90deg, #350C12 0%, #59121B 50%, #350C12 100%)', minHeight: '98px' }} className="text-white sticky top-0 z-40 shadow-2xl border-b border-[#59121B]/60 flex items-center">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
          
          {/* 1. Brand Logo */}
          <div className="flex items-center gap-3.5 cursor-pointer shrink-0" onClick={() => setCurrentScreen('storefront')} title="One Stop Gadgets - Home">
            <div className="relative w-[82px] h-[82px] shrink-0 rounded-full p-1 bg-gradient-to-tr from-cyan-500/30 to-rose-500/30 flex items-center justify-center">
              <img src="/logo.jpg" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&auto=format&fit=crop&q=80'; }} alt="One Stop Gadgets" className="w-full h-full rounded-full object-cover shadow-md" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xl sm:text-2xl font-black tracking-tight leading-none flex items-center gap-1.5 font-sans">
                <span className="text-white">ONE STOP</span>
                <span className="text-[#FF304D] tracking-normal font-extrabold">GADGETS</span>
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-white/70 tracking-widest uppercase mt-1">
                DEALS • VIP • LUCKY DIP
              </div>
            </div>
          </div>

          {/* 2. Desktop Navigation Menu */}
          <nav className="hidden xl:flex items-center gap-3 2xl:gap-5 shrink-0 font-sans">
            <button onClick={() => setCurrentScreen('storefront')} className={\`px-6 py-2.5 rounded-full font-bold text-sm transition-all \${currentScreen === 'storefront' ? 'bg-[#D91E26] text-[#F5F5F7] shadow-md' : 'text-[#F5F5F7] hover:text-white hover:bg-white/10'}\`}>
              Home
            </button>
            <button onClick={() => setCurrentScreen('catalog')} className={\`px-4 py-2.5 rounded-full font-bold text-sm transition-all \${currentScreen === 'catalog' ? 'bg-[#D91E26] text-[#F5F5F7] shadow-md' : 'text-[#F5F5F7] hover:text-white hover:bg-white/10'}\`}>
              Deals
            </button>
            <button onClick={() => setCurrentScreen('about')} className={\`px-4 py-2.5 rounded-full font-bold text-sm transition-all \${currentScreen === 'about' ? 'bg-[#D91E26] text-[#F5F5F7] shadow-md' : 'text-[#F5F5F7] hover:text-white hover:bg-white/10'}\`}>
              About
            </button>
            <button onClick={() => setCurrentScreen('luckydip')} className={\`px-4 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-1.5 \${currentScreen === 'luckydip' ? 'bg-[#D91E26] text-[#F5F5F7] shadow-md' : 'text-[#FF304D] hover:text-white hover:bg-white/10'}\`}>
              <span>🎁</span>
              <span>Lucky Dip</span>
            </button>
            <button onClick={() => setCurrentScreen('contact')} className={\`px-4 py-2.5 rounded-full font-bold text-sm transition-all \${currentScreen === 'contact' ? 'bg-[#D91E26] text-[#F5F5F7] shadow-md' : 'text-[#F5F5F7] hover:text-white hover:bg-white/10'}\`}>
              Contact Us
            </button>
          </nav>

          {/* 3. Search Bar & Sign In Button */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div className="relative w-48 sm:w-64 md:w-80 lg:w-[395px] h-[44px]">
              <div className="relative h-full flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="FiboSearch: iPhone, Sony..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full bg-[#000000] border border-white/10 rounded-full pl-10 pr-16 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D91E26] focus:ring-1 focus:ring-[#D91E26] transition shadow-inner font-sans"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
                  <span className="text-[9px] bg-[#70152D] text-white px-2 py-0.5 rounded font-mono font-bold tracking-tight uppercase shadow-xs">FIBO</span>
                </div>
              </div>
            </div>

            <button onClick={() => setCurrentScreen('signin')} className="h-[44px] px-5 sm:px-6 rounded-full bg-[#D91E26] hover:bg-[#c51424] text-[#F5F5F7] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Sign In</span>
            </button>
          </div>

        </div>
      </header>`;

if (hStart !== -1 && hEnd !== -1) {
  appTsx = appTsx.substring(0, hStart) + newAppHeader + appTsx.substring(hEnd + 9);
  fs.writeFileSync('frontend/src/App.tsx', appTsx, 'utf8');
  console.log('Successfully aligned React frontend header!');
}
