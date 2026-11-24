const fs = require('fs');
const path = require('path');

const protoPath = path.join(__dirname, 'design', 'prototype', 'index.html');
let html = fs.readFileSync(protoPath, 'utf8');

console.log('Original prototype size:', html.length);

// =========================================================================
// 1. EXTRACT THE LUCKY DIP SPOTLIGHT (IMAGE 2 SECTION)
// =========================================================================
const ldStart = html.indexOf('<!-- Lucky Dip Spotlight');
const ldEndPattern = '<!-- ========================================== -->\n      <!-- SECTION 4: REAL WINNERS CAROUSEL';
const ldEnd = html.indexOf(ldEndPattern);

console.log('ldStart:', ldStart, 'ldEnd:', ldEnd);

// Extract the entire Lucky Dip Spotlight HTML
const luckyDipSpotlightHtml = `
      <!-- ==================== WEEKLY GIVEAWAY: APPLE iPHONE 16 PRO (IMAGE 2 SECTION BEFORE FOOTER) ==================== -->
      <section id="weekly-giveaway-spotlight" class="full-width-section relative py-12 sm:py-16 shadow-2xl border-t-2 border-white/10" style="background: radial-gradient(circle at 50% 50%, #430a13 0%, #2a050c 100%);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl p-1 shadow-2xl border border-white/15 overflow-hidden">
            <div class="bg-[#561320] rounded-[22px] border border-rose-900/40 p-6 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
              
              <div class="space-y-3 max-w-2xl text-left">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="bg-[#FF3C50] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Round #42 Active</span>
                  <span id="ld-home-badge" class="bg-[#641428] text-white border border-white/20 text-[10px] font-bold px-3 py-1 rounded-full">
                    👑 VIP Members Only • Subscribe to Enter
                  </span>
                </div>
                <h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">Weekly Giveaway: Apple iPhone 16 Pro (128GB)</h2>
                <p id="ld-home-desc" class="text-sm text-slate-300 leading-relaxed font-medium">
                  🔒 Lucky Dip entry is exclusively for active VIP subscribers. View round info is free — subscribe to participate and win flagship tech prizes every week.
                </p>
              </div>

              <div class="bg-[#141428] border border-[#641428] rounded-2xl p-5 text-center space-y-3.5 w-full sm:w-80 shrink-0 shadow-xl">
                <div class="text-xs text-slate-300 uppercase font-bold tracking-wider">Draw Closes In</div>
                <div class="font-mono text-2xl font-black text-[#FF3C50] bg-[#000000] py-2 px-3 rounded-xl border border-[#641428]/40" id="ld-countdown">04d : 18h : 32m : 15s</div>
                <button id="ld-home-cta" onclick="handleLdHomeCta()"
                  class="w-full py-3 rounded-xl text-white font-extrabold text-xs shadow-md transition-all duration-200 bg-[#D42526] hover:bg-[#B91C1C] hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5">
                  <span>🔒 VIP Only — Buy Plan to Enter</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
`;

// Remove Lucky Dip Spotlight from Section 3
const oldDealsAndLdStart = html.indexOf('<!-- SECTION 3: TODAY\'S FEATURED DEALS');
const oldDealsAndLdEnd = html.indexOf('<!-- SECTION 4: REAL WINNERS CAROUSEL');

// Keep only Today's Featured Deals in Section 3
const dealsGridStart = html.indexOf('<!-- Today\'s Deals Grid -->');
const dealsGridEnd = html.indexOf('<!-- Lucky Dip Spotlight');
const dealsOnlyHtml = html.substring(dealsGridStart, dealsGridEnd);

const newDealsSection = `<!-- ========================================== -->
      <!-- SECTION 3: TODAY'S FEATURED DEALS (FULL WIDTH - #2664eb) -->
      <!-- ========================================== -->
      <section id="deals-showcase-section" class="full-width-section relative py-12 sm:py-16 shadow-xl border-b border-blue-400/20" style="background: #2664eb;">
        <div class="max-w-7xl mx-auto space-y-8">
          ${dealsOnlyHtml}
        </div>
      </section>

      `;

html = html.substring(0, oldDealsAndLdStart) + newDealsSection + html.substring(oldDealsAndLdEnd);
console.log('✅ Removed 2nd image (Weekly Giveaway Spotlight) from Section 3');

// =========================================================================
// 2. UPDATE SECTION 2 (FEATURED GADGET CATEGORIES) BACKGROUND TO MILKY WHITE (#F8F9FA)
// =========================================================================
const catSecOld = `<!-- ========================================== -->
      <!-- SECTION 2: FEATURED GADGET CATEGORIES (FULL WIDTH - #2664eb) -->
      <!-- ========================================== -->
      <section id="categories-section" class="full-width-section relative py-12 sm:py-16 shadow-xl border-y border-blue-400/20" style="background: #2664eb;">`;

const catSecNew = `<!-- ========================================== -->
      <!-- SECTION 2: FEATURED GADGET CATEGORIES (FULL WIDTH - MILKY WHITE) -->
      <!-- ========================================== -->
      <section id="categories-section" class="full-width-section relative py-12 sm:py-16 shadow-sm border-y border-slate-200" style="background: #F8F9FA;">`;

html = html.replace(catSecOld, catSecNew);

// Adjust category section text colors for milky white:
html = html.replace(
  /<h2 class="text-2xl font-black text-white flex items-center gap-2 drop-shadow-sm">/g,
  '<h2 class="text-2xl font-black text-slate-900 flex items-center gap-2">'
);
html = html.replace(
  /<p class="text-xs text-blue-100 font-medium">Click any category to open and filter verified tech deals<\/p>/g,
  '<p class="text-xs text-slate-600 font-medium">Click any category to open and filter verified tech deals</p>'
);
html = html.replace(
  /class="text-xs font-black text-amber-300 hover:text-white flex items-center gap-1 transition drop-shadow-sm">/g,
  'class="text-xs font-extrabold text-[#D42526] hover:text-[#991422] flex items-center gap-1 transition">'
);
console.log('✅ Section 2 (Categories) set to Milky White (#F8F9FA)');

// =========================================================================
// 3. INSERT THE LUCKY DIP SPOTLIGHT (IMAGE 2) BEFORE FOOTER
// =========================================================================
// Insert right before </section> that closes storefront, or right before </main>
// Placing it as the final section of storefront before </section>
const sfEndTag = html.indexOf('</section>\n\n    <!-- ==================== SCREEN 2: ALL DEALS CATALOG');
if (sfEndTag !== -1) {
  html = html.substring(0, sfEndTag) + '\n' + luckyDipSpotlightHtml + '\n' + html.substring(sfEndTag);
  console.log('✅ Injected Image 2 (Weekly Giveaway Spotlight) right before footer / end of storefront');
}

// =========================================================================
// 4. WIRE ALL SUBSCRIPTION BUTTONS & MODAL WITH PLAN DETAILS
// =========================================================================
// Update handleLdHomeCta to open subscription modal with plan details
const newHandleLdHomeCta = `function handleLdHomeCta() {
      if (isVipMember) {
        navigate('luckydip');
      } else {
        openSubscribeModal();
      }
    }`;

const oldHandleLdCtaRegex = /function handleLdHomeCta\(\)\s*\{[\s\S]*?navigate\('pricing'\);[\s\S]*?\}/;
if (oldHandleLdCtaRegex.test(html)) {
  html = html.replace(oldHandleLdCtaRegex, newHandleLdHomeCta);
  console.log('✅ Connected handleLdHomeCta to openSubscribeModal');
}

// Build an interactive VIP Subscription Modal that lets user view/select plans
const richSubscribeModal = `
<!-- VIP Subscription Modal with Interactive Plans -->
<div id="subscribe-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
  <div class="bg-gradient-to-b from-[#420C15] to-[#25050C] border-2 border-white/20 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl text-white relative max-h-[92vh] overflow-y-auto custom-scroll">
    <button onclick="closeSubscribeModal()" class="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-bold transition">✕</button>
    
    <div class="text-center space-y-4">
      <div class="w-16 h-16 rounded-full bg-amber-400 text-[#420C15] flex items-center justify-center mx-auto text-2xl font-black shadow-lg">👑</div>
      
      <div>
        <h3 class="text-2xl sm:text-3xl font-black">Choose Your VIP Membership</h3>
        <p class="text-white/80 text-xs sm:text-sm mt-1">Unlock unrestricted deals, secret vouchers, and guaranteed weekly Lucky Dip tickets.</p>
      </div>

      <!-- Plan Cards in Modal -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
        
        <!-- Monthly -->
        <div onclick="selectModalPlan('Monthly', 299, this)" class="modal-plan-card cursor-pointer bg-white/10 hover:bg-white/15 border-2 border-white/20 p-4 rounded-2xl flex flex-col justify-between transition group">
          <div>
            <div class="text-xs font-black text-amber-300 uppercase">Monthly</div>
            <div class="text-xl font-black text-white mt-1">₹299</div>
            <div class="text-[10px] text-white/60">Billed monthly</div>
          </div>
          <div class="mt-3 text-[10px] text-white/80 space-y-1">
            <div>✓ 1x Lucky Dip ticket</div>
            <div>✓ Instant deal drops</div>
          </div>
        </div>

        <!-- 6-Month Pass (Recommended) -->
        <div onclick="selectModalPlan('6-Month Pass', 1199, this)" class="modal-plan-card selected-plan cursor-pointer bg-white/15 border-2 border-amber-400 p-4 rounded-2xl flex flex-col justify-between transition group relative shadow-lg">
          <span class="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-400 text-[#420C15] text-[8px] font-black px-2 py-0.5 rounded-full uppercase">POPULAR</span>
          <div>
            <div class="text-xs font-black text-amber-300 uppercase">6-Month</div>
            <div class="text-xl font-black text-white mt-1">₹1,199</div>
            <div class="text-[10px] text-white/60">~₹199 / month</div>
          </div>
          <div class="mt-3 text-[10px] text-white/90 space-y-1 font-medium">
            <div>✓ <strong>2x Lucky Dip entries</strong></div>
            <div>✓ VIP secret vouchers</div>
          </div>
        </div>

        <!-- Annual Pass -->
        <div onclick="selectModalPlan('Annual Pass', 1799, this)" class="modal-plan-card cursor-pointer bg-white/10 hover:bg-white/15 border-2 border-white/20 p-4 rounded-2xl flex flex-col justify-between transition group">
          <div>
            <div class="text-xs font-black text-amber-300 uppercase">Annual</div>
            <div class="text-xl font-black text-white mt-1">₹1,799</div>
            <div class="text-[10px] text-white/60">~₹149 / month</div>
          </div>
          <div class="mt-3 text-[10px] text-white/80 space-y-1">
            <div>✓ <strong>3x Lucky Dip entries</strong></div>
            <div>✓ Dedicated concierge</div>
          </div>
        </div>

      </div>

      <!-- Action Button -->
      <div class="pt-2">
        <button id="modal-subscribe-btn" onclick="executeSubscribeModal()" class="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-[#420C15] font-black text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all">
          Activate 6-Month Pass for ₹1,199
        </button>
        <p class="text-[10px] text-white/50 mt-2">Instant activation. Cancel anytime in your account settings.</p>
      </div>

    </div>
  </div>
</div>

<script>
let selectedPlanName = '6-Month Pass';
let selectedPlanPrice = 1199;

function selectModalPlan(name, price, el) {
  selectedPlanName = name;
  selectedPlanPrice = price;
  document.querySelectorAll('.modal-plan-card').forEach(c => {
    c.classList.remove('border-amber-400', 'bg-white/15');
    c.classList.add('border-white/20', 'bg-white/10');
  });
  if (el) {
    el.classList.remove('border-white/20', 'bg-white/10');
    el.classList.add('border-amber-400', 'bg-white/15');
  }
  const btn = document.getElementById('modal-subscribe-btn');
  if (btn) {
    btn.innerText = 'Activate ' + name + ' for ₹' + price;
  }
}

function executeSubscribeModal() {
  handleSubscribe(selectedPlanName + ' - ₹' + selectedPlanPrice);
  closeSubscribeModal();
}

function handleSubscribe(planName) {
  isVipMember = true;
  updateLuckyDipUI();
  alert('🎉 Congratulations! You have successfully subscribed to ' + planName + '. Your VIP benefits and Lucky Dip entries are now active!');
}

function openSubscribeModal(e) {
  if (e) e.preventDefault();
  const m = document.getElementById('subscribe-modal');
  if (m) m.classList.remove('hidden');
}

function closeSubscribeModal() {
  const m = document.getElementById('subscribe-modal');
  if (m) m.classList.add('hidden');
}
</script>
`;

// Replace existing modal at bottom
const oldModalStart = html.indexOf('<!-- Subscription Modal -->');
const bodyEnd = html.lastIndexOf('</body>');
if (oldModalStart !== -1) {
  html = html.substring(0, oldModalStart) + richSubscribeModal + '\n' + html.substring(bodyEnd);
  console.log('✅ Replaced Subscription Modal with rich interactive plan chooser');
} else {
  html = html.substring(0, bodyEnd) + richSubscribeModal + '\n' + html.substring(bodyEnd);
  console.log('✅ Added rich interactive Subscription Modal');
}

// Save prototype
fs.writeFileSync(protoPath, html, 'utf8');
console.log('✅ Saved prototype successfully! New size:', html.length);
