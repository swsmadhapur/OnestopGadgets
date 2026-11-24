const fs = require('fs');
const protoPath = 'design/prototype/index.html';
let content = fs.readFileSync(protoPath, 'utf8');

// 1. Add Dedicated Sign-in Screen View (#screen-signin) matching the red/blue/milky-white theme
const signinScreenHtml = `
    <!-- ==================== SCREEN: DEDICATED SIGN IN ==================== -->
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
              <a href="#" onclick="alert('Password reset instructions sent to your email address.'); return false;" class="text-[11px] font-bold text-[#2563EB] hover:underline">Forgot password?</a>
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
          <div class="text-[11px] text-slate-400 flex items-center justify-center gap-4">
            <span>🔒 256-Bit SSL Encrypted</span>
            <span>•</span>
            <span>Provably Fair Verified</span>
          </div>
        </div>
      </div>
    </section>
`;

if (!content.includes('id="screen-signin"')) {
  content = content.replace('<!-- ==================== SCREEN: CONTACT US ==================== -->', signinScreenHtml + '\n    <!-- ==================== SCREEN: CONTACT US ==================== -->');
}

// 2. Add JavaScript helper functions for Sign In and Hash Routing
const navScriptHelpers = `
    // Dedicated Sign In Form handler
    function handleDedicatedSignIn(e) {
      e.preventDefault();
      const email = document.getElementById('signin-email').value;
      const isVipEmail = email.toLowerCase().includes('vip') || email.toLowerCase().includes('admin');
      
      currentUserRole = isVipEmail ? 'vip' : 'free';
      alert('Welcome back! Successfully signed in as ' + (isVipEmail ? 'VIP Member 👑' : 'Explorer Member'));
      
      // Update UI
      if (typeof updateRoleBadge === 'function') updateRoleBadge();
      if (typeof renderDeals === 'function') renderDeals();
      navigate('storefront');
    }

    function togglePasswordVisibility(inputId, btn) {
      const input = document.getElementById(inputId);
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerText = '🙈';
      } else {
        input.type = 'password';
        btn.innerText = '👁️';
      }
    }

    // Support URL Hash Routing for direct access (/deals -> #deals, etc.)
    window.addEventListener('hashchange', () => {
      const route = window.location.hash.replace('#', '');
      if (route) {
        if (route === 'deals') navigate('catalog');
        else if (route === 'about') navigate('about');
        else if (route === 'lucky-dip') navigate('luckydip');
        else if (route === 'contact') navigate('contact');
        else if (route === 'sign-in') navigate('signin');
        else if (route === 'pricing') navigate('pricing');
        else navigate(route);
      }
    });
`;

if (!content.includes('function handleDedicatedSignIn')) {
  content = content.replace('// ===== DEALS PAGE: Tab switcher =====', navScriptHelpers + '\n\n    // ===== DEALS PAGE: Tab switcher =====');
}

// 3. Update the Navbar Sign In button so it routes cleanly or opens modal
content = content.replace(
  `onclick="openLoginModal()" class="px-4 sm:px-5 py-2 rounded-full bg-[#E6192D]`,
  `onclick="navigate('signin')" class="px-4 sm:px-5 py-2 rounded-full bg-[#E6192D]`
);

fs.writeFileSync(protoPath, content, 'utf8');
fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully injected Dedicated Sign In Screen & Route Handler!');
