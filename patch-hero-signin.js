const fs = require('fs');
const protoPath = 'design/prototype/index.html';
let content = fs.readFileSync(protoPath, 'utf8');

// 1. Replace Hero buttons and subtitle
const oldHeroButtonsSnippet = `<button onclick="navigate('luckydip')" class="relative overflow-hidden px-8 py-3.5 rounded-full bg-white text-[#3B0A12] font-black text-xs uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group">
                <span>GET FREE ENTRY</span>
                <span class="transform group-hover:translate-x-1 transition">→</span>
                <span class="absolute inset-0 w-1/3 h-full bg-white/30 animate-shine pointer-events-none"></span>
              </button>
              <button onclick="navigate('catalog')" class="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-black text-xs uppercase tracking-wider transition hover:scale-105">
                EXPLORE PRIZES
              </button>`;

const newHeroButtons = `<button onclick="openSubscribeModal()" class="px-7 py-3.5 rounded-full bg-[#E6192D] hover:bg-[#c51424] text-white font-black text-xs shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
                <span>👑</span>
                <span>Join VIP Now</span>
              </button>
              <button onclick="handleLuckyDipNavClick()" class="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-black text-xs transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
                <span>🎁</span>
                <span>Try Lucky Dip</span>
              </button>`;

content = content.replace(oldHeroButtonsSnippet, newHeroButtons);

// 2. Also replace subtitle text right above it
content = content.replace(
  `Win an <span class="font-bold text-white">iPhone 16 Pro Max</span> &amp; 4 More Exciting Tech Prizes.`,
  `Verified deals from top merchants, members-only VIP benefits, extra cashback, and a chance to win exciting gadgets every week.`
);

// 3. Add screen-signin right before screen-contact if not already present
const signinScreen = `
    <!-- ==================== SCREEN: SIGN IN ==================== -->
    <section id="screen-signin" class="screen-view hidden max-w-xl mx-auto px-4 sm:px-6 py-12 w-full">
      <div class="bg-[#FAF8F5] rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
        <div class="text-center space-y-2">
          <div class="w-14 h-14 rounded-2xl bg-[#E6192D] text-white flex items-center justify-center mx-auto text-2xl shadow-lg">
            👤
          </div>
          <h1 class="text-2xl font-black text-slate-900">Sign in to One Stop Gadgets</h1>
          <p class="text-xs text-slate-500 font-medium">Access your VIP perks, saved secret deals, and Provably Fair tickets</p>
        </div>

        <form onsubmit="handleDedicatedSignIn(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <input type="email" id="signin-email" required placeholder="vip@onestopgadgets.com" class="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]" />
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-bold text-slate-700">Password</label>
              <a href="#" onclick="alert('Password reset link sent to your email address.'); return false;" class="text-[11px] font-bold text-[#2563EB] hover:underline">Forgot password?</a>
            </div>
            <div class="relative">
              <input type="password" id="signin-pass" required placeholder="••••••••" class="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]" />
              <button type="button" onclick="togglePasswordVisibility('signin-pass', this)" class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs">👁️</button>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked class="rounded border-slate-300 text-[#2563EB]" />
              <span>Remember me</span>
            </label>
            <span class="text-[11px] bg-blue-50 text-[#2563EB] font-bold px-2 py-0.5 rounded">VIP Auto-Detect</span>
          </div>

          <button type="submit" class="w-full py-3 rounded-xl bg-[#E6192D] hover:bg-[#c51424] text-white font-extrabold text-xs shadow-md transition-all hover:scale-[1.02]">
            Sign In &amp; Unlock VIP Deals
          </button>
        </form>

        <div class="pt-4 border-t border-slate-200 text-center space-y-3">
          <div class="text-xs text-slate-500">
            Don't have a VIP pass yet?
            <button onclick="navigate('pricing')" class="font-bold text-[#2563EB] hover:underline ml-1">Explore VIP Plans</button>
          </div>
        </div>
      </div>
    </section>
`;

if (!content.includes('id="screen-signin"')) {
  content = content.replace('<section id="screen-contact"', signinScreen + '\n    <section id="screen-contact"');
}

fs.writeFileSync(protoPath, content, 'utf8');
fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully patched hero buttons and screen-signin!');
