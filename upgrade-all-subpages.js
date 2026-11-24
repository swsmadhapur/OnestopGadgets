const fs = require('fs');

const protoPath = 'design/prototype/index.html';
let content = fs.readFileSync(protoPath, 'utf8');

console.log('Original content length:', content.length);

// =========================================================================
// 1. RE-DESIGN ABOUT US PAGE (#screen-about) TO MATCH REFERENCE THEME
// =========================================================================
const aboutOldRegex = /<section id="screen-about"[\s\S]*?<\/section>/;
const newAboutPage = `<section id="screen-about" class="screen-view hidden w-full full-width-section p-0 space-y-0">
      <!-- About Hero Banner (Deep Burgundy #400B19 & Red #E50914 Gradient) -->
      <div class="w-full py-14 sm:py-20 text-white relative shadow-xl px-4 sm:px-8 text-center" style="background: radial-gradient(circle at 75% 40%, rgba(229, 9, 20, 0.4) 0%, #400B19 50%, #101428 100%);">
        <div class="max-w-4xl mx-auto space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-bold text-white tracking-wide uppercase">
            <span>👑 ONE STOP GADGETS</span>
            <span>•</span>
            <span class="text-amber-400">ABOUT THE PLATFORM</span>
          </div>
          <h1 class="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            Curated Tech Deals, Verified Merchants &amp; <span class="text-[#E50914]">Provably Fair Giveaways</span>
          </h1>
          <p class="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            One Stop Gadgets is India's premier tech shopping discovery engine and VIP privileges club. We bridge shoppers with certified discounts on Amazon, Flipkart, and leading tech brands.
          </p>
        </div>
      </div>

      <!-- Core Pillars (Royal Blue #1645C4 Gradient Banner) -->
      <div class="w-full py-10 px-4 sm:px-8 shadow-inner border-y border-[#1645C4]/30" style="background: linear-gradient(135deg, #1645C4 0%, #0D2B82 50%, #101428 100%);">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-white text-center">
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-2">
            <div class="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-2xl mx-auto">🛡️</div>
            <h3 class="text-base font-extrabold text-white">100% Verified Deals</h3>
            <p class="text-xs text-white/70 leading-relaxed">Direct partner links with Amazon India, Flipkart, and authorized retailers ensuring genuine warranty and certified discounts.</p>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-2">
            <div class="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-2xl mx-auto">👑</div>
            <h3 class="text-base font-extrabold text-white">Exclusive VIP Access</h3>
            <p class="text-xs text-white/70 leading-relaxed">Members unlock secret price drops on high-value gadgets, unlisted merchant vouchers, and instant price drop alerts.</p>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-2">
            <div class="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-2xl mx-auto">🎁</div>
            <h3 class="text-base font-extrabold text-white">Provably Fair Lucky Dip</h3>
            <p class="text-xs text-white/70 leading-relaxed">Weekly flagship smartphone and laptop draws backed by transparent SHA-256 cryptographic hashing ledger.</p>
          </div>
        </div>
      </div>

      <!-- Platform Story & Details (Milky White #F5F6FA Background) -->
      <div class="w-full py-14 px-4 sm:px-8 border-b border-slate-200" style="background: #F5F6FA;">
        <div class="max-w-5xl mx-auto space-y-10 text-slate-800">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="space-y-4">
              <span class="text-[10px] font-black uppercase tracking-wider text-[#E50914] bg-red-100 px-2.5 py-1 rounded-md">How It Works</span>
              <h2 class="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                Helping You Save Big on Every Tech Upgrade
              </h2>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Finding actual, verified tech discounts is frustrating due to fake sales and artificial price hikes. Our intelligent algorithms monitor real-time prices across major online merchants in India to surface only genuine drops.
              </p>
              <div class="space-y-2 pt-2 text-xs font-semibold text-slate-700">
                <div class="flex items-center gap-2"><span>✅</span> <span>Automated price-drop tracking across 10,000+ gadgets</span></div>
                <div class="flex items-center gap-2"><span>✅</span> <span>Zero hidden charges — pure savings passed directly to you</span></div>
                <div class="flex items-center gap-2"><span>✅</span> <span>Dedicated VIP Concierge support via WhatsApp &amp; Telegram</span></div>
              </div>
            </div>
            
            <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4 text-center">
              <div class="w-16 h-16 rounded-2xl bg-[#E50914] text-white flex items-center justify-center text-3xl mx-auto shadow-lg">
                🚀
              </div>
              <h3 class="text-lg font-black text-slate-900">Start Exploring Today</h3>
              <p class="text-xs text-slate-500">Browse verified discounts or join our VIP club for flagship giveaways.</p>
              <div class="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button onclick="navigate('catalog')" class="px-5 py-2.5 rounded-full bg-[#1645C4] hover:bg-[#12389E] text-white font-extrabold text-xs shadow transition">
                  Browse Deals →
                </button>
                <button onclick="navigate('pricing')" class="px-5 py-2.5 rounded-full bg-[#E50914] hover:bg-[#c51424] text-white font-extrabold text-xs shadow transition">
                  Join VIP Now 👑
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;

content = content.replace(aboutOldRegex, newAboutPage);

// =========================================================================
// 2. RE-DESIGN CONTACT US PAGE (#screen-contact) TO MATCH REFERENCE THEME
// =========================================================================
const contactOldRegex = /<section id="screen-contact"[\s\S]*?<\/section>/;
const newContactPage = `<section id="screen-contact" class="screen-view hidden w-full full-width-section p-0 space-y-0">
      <!-- Contact Hero Banner (Deep Burgundy #400B19 & Red #E50914) -->
      <div class="w-full py-12 sm:py-16 text-white relative shadow-xl px-4 sm:px-8 text-center" style="background: radial-gradient(circle at 50% 30%, rgba(229, 9, 20, 0.35) 0%, #400B19 60%, #101428 100%);">
        <div class="max-w-3xl mx-auto space-y-3">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-bold text-white tracking-wide uppercase">
            <span>📞 24/7 DEDICATED SUPPORT</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Contact One Stop Gadgets Support
          </h1>
          <p class="text-white/80 text-xs sm:text-sm max-w-lg mx-auto font-medium">
            Have questions about a verified deal, VIP subscription billing, or lucky dip draw verification? We are here to assist you.
          </p>
        </div>
      </div>

      <!-- Contact Body Grid (Milky White #F5F6FA) -->
      <div class="w-full py-12 px-4 sm:px-8 border-b border-slate-200" style="background: #F5F6FA;">
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- Contact Form (7 Cols) -->
          <div class="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-5">
            <div>
              <h2 class="text-lg font-black text-slate-900">Send an Official Message</h2>
              <p class="text-xs text-slate-500 font-medium">Fill out the details below. Our team responds within 24 business hours.</p>
            </div>

            <form onsubmit="handleContactSubmit(event)" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input type="text" required placeholder="John Doe" class="w-full bg-[#F5F6FA] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#1645C4] focus:ring-1 focus:ring-[#1645C4]" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input type="email" required placeholder="john@example.com" class="w-full bg-[#F5F6FA] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#1645C4] focus:ring-1 focus:ring-[#1645C4]" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Inquiry Subject *</label>
                <select class="w-full bg-[#F5F6FA] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#1645C4]">
                  <option>VIP Subscription Billing &amp; Pass Activation</option>
                  <option>Lucky Dip Draw Rules &amp; Ticket Status</option>
                  <option>Report Broken Deal / Price Discrepancy</option>
                  <option>Partner Merchant Collaboration</option>
                  <option>General Support &amp; Feedback</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                <textarea rows="4" required placeholder="Describe your question or issue in detail..." class="w-full bg-[#F5F6FA] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#1645C4]"></textarea>
              </div>

              <button type="submit" class="px-7 py-3 rounded-xl bg-[#E50914] hover:bg-[#c51424] text-white font-extrabold text-xs shadow-md transition-all hover:scale-[1.02] flex items-center gap-2">
                <span>Send Message</span>
                <span>→</span>
              </button>
            </form>
          </div>

          <!-- Direct Support Details (5 Cols) -->
          <div class="lg:col-span-5 space-y-4">
            <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <h3 class="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span>📍</span>
                <span>Official Operations &amp; Grievance</span>
              </h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                In compliance with the Information Technology Act 2000 and the Consumer Protection (E-Commerce) Rules 2020:
              </p>
              <div class="space-y-3 text-xs font-medium text-slate-700">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-red-50 text-[#E50914] flex items-center justify-center font-bold">✉️</div>
                  <div>
                    <div class="text-[10px] text-slate-400 uppercase font-bold">Support Email</div>
                    <a href="mailto:example@gmail.com" class="font-bold text-[#1645C4] hover:underline">example@gmail.com</a>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 text-[#1645C4] flex items-center justify-center font-bold">📞</div>
                  <div>
                    <div class="text-[10px] text-slate-400 uppercase font-bold">Helpline (Mon - Sat)</div>
                    <a href="tel:+917569950663" class="font-bold text-slate-800 hover:underline">+91 7569950663</a>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-emerald-50 text-[#25D366] flex items-center justify-center font-bold">💬</div>
                  <div>
                    <div class="text-[10px] text-slate-400 uppercase font-bold">WhatsApp Concierge</div>
                    <a href="https://wa.me/917989410963" target="_blank" rel="noopener" class="font-bold text-[#25D366] hover:underline">+91 7989410963</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Trust Badge Box -->
            <div class="bg-gradient-to-br from-[#101428] to-[#400B19] rounded-3xl p-6 text-white space-y-2 border border-[#400B19] shadow-md">
              <div class="text-xs font-extrabold text-amber-400 flex items-center gap-1.5">
                <span>🛡️</span>
                <span>Safe &amp; Verified Shopping</span>
              </div>
              <p class="text-xs text-white/80 leading-relaxed font-medium">
                All merchant checkouts happen directly on official partner domains (Amazon.in, Flipkart.com). We never ask for banking passwords, OTPs, or payment card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>`;

content = content.replace(contactOldRegex, newContactPage);

// =========================================================================
// 3. RE-DESIGN LUCKY DIP PAGE (#screen-luckydip) TO MIRROR SCREENSHOT STYLE
// =========================================================================
const luckyDipOldRegex = /<section id="screen-luckydip"[\s\S]*?<\/section>/;
const newLuckyDipPage = `<section id="screen-luckydip" class="screen-view hidden w-full full-width-section p-0 space-y-0">
      <!-- Section 1: Hero Banner (Deep Burgundy #400B19 & Red #E50914) -->
      <div class="w-full py-12 sm:py-16 text-white relative shadow-xl px-4 sm:px-8 text-center" style="background: radial-gradient(circle at 75% 40%, rgba(229, 9, 20, 0.4) 0%, #400B19 50%, #101428 100%);">
        <div class="max-w-4xl mx-auto space-y-3">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-bold text-white tracking-wide uppercase">
            <span>🎁 WEEKLY TECH GIVEAWAY</span>
            <span>•</span>
            <span class="text-amber-400">PROVABLY FAIR</span>
          </div>
          <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Weekly Flagship <span class="text-[#E50914]">Lucky Dip Draw</span>
          </h1>
          <p class="text-white/85 text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Exclusive to One Stop Gadgets VIP Members. Stand a chance to win the Apple iPhone 16 Pro Max, MacBook Air M4, and flagship audio prizes every week.
          </p>
          
          <!-- Live Countdown Box -->
          <div class="pt-4 flex justify-center">
            <div class="inline-flex items-center gap-3 bg-black/40 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/20 shadow-lg text-xs font-mono font-bold text-amber-300">
              <span>⏳ Next Draw in:</span>
              <span id="ld-page-countdown" class="text-white">04d : 18h : 32m : 15s</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 2: Current Grand Prize Showcase (Royal Blue #1645C4 Gradient) -->
      <div class="w-full py-10 px-4 sm:px-8 border-y border-[#1645C4]/30" style="background: linear-gradient(135deg, #1645C4 0%, #0D2B82 50%, #101428 100%);">
        <div class="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 flex flex-col md:flex-row items-center gap-8 text-white">
          <div class="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-white/15 flex items-center justify-center text-7xl shadow-inner shrink-0">
            📱
          </div>
          <div class="space-y-3 flex-1 text-center md:text-left">
            <span class="text-[10px] font-black uppercase tracking-wider bg-[#E50914] px-2.5 py-1 rounded text-white shadow-xs">
              This Week's Grand Prize
            </span>
            <h2 class="text-2xl sm:text-3xl font-black text-white">
              Apple iPhone 16 Pro Max (256 GB, Desert Titanium)
            </h2>
            <p class="text-xs text-white/80 leading-relaxed font-medium">
              Grade 5 Titanium finish, A18 Pro silicon, 48MP Fusion Camera Control, and 4K 120fps Dolby Vision video recording. Total retail value: <strong>₹1,44,990</strong>.
            </p>
            <div class="flex items-center gap-4 text-xs font-mono text-amber-300 pt-1">
              <span>🏆 1 Grand Winner</span>
              <span>•</span>
              <span>🎟️ 489 Active Tickets</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 3: Registration Form (Milky White #F5F6FA) -->
      <div class="w-full py-14 px-4 sm:px-8 border-b border-slate-200" style="background: #F5F6FA;">
        <div class="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div class="text-center space-y-1">
            <h3 class="text-xl font-black text-slate-900">Enter This Week's Lucky Dip</h3>
            <p class="text-xs text-slate-500 font-medium">Active VIP Subscribers receive guaranteed complimentary tickets every round</p>
          </div>

          <form id="ld-reg-form" onsubmit="handleLuckyDipParticipation(event)" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
              <input type="text" id="ld-input-name" required placeholder="Your full name" class="w-full bg-[#F5F6FA] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#1645C4]" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                <input type="tel" id="ld-input-phone" required placeholder="10-digit mobile" class="w-full bg-[#F5F6FA] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#1645C4]" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input type="email" id="ld-input-email" required placeholder="vip@email.com" class="w-full bg-[#F5F6FA] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#1645C4]" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Preferred Prize *</label>
              <select id="ld-input-prize" class="w-full bg-[#F5F6FA] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#1645C4]">
                <option>Apple iPhone 16 Pro Max (256 GB) — Grand Prize</option>
                <option>MacBook Air M4 (13-inch, 16GB)</option>
                <option>Bose QuietComfort Ultra Headphones</option>
                <option>PlayStation 5 Slim (Disc Edition)</option>
              </select>
            </div>

            <button type="submit" class="w-full py-3.5 rounded-xl bg-[#E50914] hover:bg-[#c51424] text-white font-extrabold text-xs shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
              <span>Confirm Lucky Dip Participation</span>
              <span>🎁</span>
            </button>
          </form>

          <!-- Confirmation Box -->
          <div id="ld-confirmation-box" class="hidden p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2 text-center">
            <div class="font-extrabold text-sm text-emerald-900">🎉 Entry Successfully Registered!</div>
            <p>Your entry ticket has been hashed and submitted to the Provably Fair Ledger.</p>
            <div id="ld-ticket-details" class="font-mono text-[11px] font-bold text-emerald-700"></div>
          </div>
        </div>
      </div>
    </section>`;

content = content.replace(luckyDipOldRegex, newLuckyDipPage);

// =========================================================================
// 4. POLISH DEALS CATALOG PAGE (#screen-catalog) HEADER & BANNER
// =========================================================================
content = content.replace(
  `<!-- ==================== IMAGE 1 STYLE: PREMIUM SEARCH & LIVE BRAND PILL ==================== -->`,
  `<!-- Deals Page Header Banner (Deep Burgundy #400B19 & Red #E50914) -->
      <div class="full-width-section py-8 px-4 sm:px-8 text-white mb-6" style="background: radial-gradient(circle at 75% 40%, rgba(229, 9, 20, 0.35) 0%, #400B19 50%, #101428 100%);">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="space-y-1 text-center md:text-left">
            <div class="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <span>⚡ VERIFIED GADGET DIRECTORY</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-black text-white">All Tech Deals &amp; Discounts</h1>
            <p class="text-xs text-white/75 font-medium">Verified discounted links from Amazon India, Flipkart, and partner merchants</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 font-bold">
              🔒 ₹50K+ VIP Rule Active
            </span>
          </div>
        </div>
      </div>
      <!-- ==================== IMAGE 1 STYLE: PREMIUM SEARCH & LIVE BRAND PILL ==================== -->`
);

fs.writeFileSync(protoPath, content, 'utf8');
fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully updated Deals, About, Contact, and Lucky Dip pages! New size:', content.length);
