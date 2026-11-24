const fs = require('fs');
const protoPath = 'design/prototype/index.html';
let content = fs.readFileSync(protoPath, 'utf8');

// Ensure policy links (Privacy Policy, Terms & Conditions, Returns & Refunds, Provably Fair Draw Rules, Affiliate & Merchant Disclosure) trigger informative modals or clean views
const policyModalSnippet = `
<!-- Policy Details Modal for Footer Links -->
<div id="policy-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
  <div class="bg-[#FAF8F5] border-2 border-[#2563EB] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl text-slate-800 relative max-h-[85vh] overflow-y-auto custom-scroll space-y-4">
    <div class="flex items-center justify-between border-b border-slate-200 pb-3">
      <h3 id="policy-title" class="text-xl font-extrabold text-[#2563EB]">Policy Information</h3>
      <button onclick="closePolicyModal()" class="text-slate-400 hover:text-slate-700 text-2xl font-bold transition">✕</button>
    </div>
    <div id="policy-body" class="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
      <!-- Injected dynamic content -->
    </div>
    <div class="pt-4 border-t border-slate-200 flex justify-end">
      <button onclick="closePolicyModal()" class="px-5 py-2 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow hover:bg-[#1D4ED8] transition">
        Understood &amp; Close
      </button>
    </div>
  </div>
</div>
`;

if (!content.includes('id="policy-modal"')) {
  content = content.replace('</body>', policyModalSnippet + '\n</body>');
}

// Add Policy display JS logic
const policyJs = `
    const POLICIES_CONTENT = {
      privacy: {
        title: 'Privacy Policy (DPDP Act 2023 Compliant)',
        body: '<p>One Stop Gadgets is committed to protecting your personal data in accordance with the Digital Personal Data Protection Act 2023. We collect minimal personal identifiers strictly necessary for VIP subscription access, deal notifications, and provably fair lucky dip entry verification.</p><p>We never sell, rent, or share personal contact data with third-party telemarketers. All stored tokens utilize 256-bit encryption.</p>'
      },
      terms: {
        title: 'Terms & Conditions',
        body: '<p>Welcome to One Stop Gadgets. By accessing this platform and participating in our curated deals directory or provably fair giveaways, you agree to comply with our platform terms. Deal prices and merchant allocations are managed in real-time and subject to partner merchant availability (Amazon India, Flipkart, etc.).</p>'
      },
      returns: {
        title: 'Returns & Refunds Policy',
        body: '<p><strong>VIP Memberships:</strong> We offer a 7-day satisfaction guarantee on 6-Month and Annual VIP Passes if no secret vouchers or gift entries have been redeemed.</p><p><strong>Physical Products:</strong> Physical gadgets purchased via partner merchant affiliate links (Amazon, Flipkart) follow the respective merchants official return and replacement policies.</p>'
      },
      provablyFair: {
        title: 'Provably Fair Draw Rules & Cryptographic Auditing',
        body: '<p>Our weekly tech giveaways operate on open cryptographic principles using SHA-256 hash generation. Prior to each round, a secure server seed hash is published. Winning ticket selection combines the client seed and block header timestamp, guaranteeing zero administrative manipulation.</p>'
      },
      affiliate: {
        title: 'Affiliate & Merchant Disclosure',
        body: '<p>One Stop Gadgets is a participant in verified affiliate associate programs including Amazon Services LLC Associates Program and Flipkart Affiliate Network. When you purchase deals through verified partner links on our website, we may earn an affiliate commission at no extra cost to you.</p>'
      }
    };

    function showPolicy(type) {
      const modal = document.getElementById('policy-modal');
      const titleEl = document.getElementById('policy-title');
      const bodyEl = document.getElementById('policy-body');
      if (!modal || !titleEl || !bodyEl) return;

      const data = POLICIES_CONTENT[type] || POLICIES_CONTENT.terms;
      titleEl.innerHTML = data.title;
      bodyEl.innerHTML = data.body;
      modal.classList.remove('hidden');
    }

    function closePolicyModal() {
      const modal = document.getElementById('policy-modal');
      if (modal) modal.classList.add('hidden');
    }
`;

if (!content.includes('function showPolicy')) {
  content = content.replace('// ===== DEALS PAGE: Tab switcher =====', policyJs + '\n\n    // ===== DEALS PAGE: Tab switcher =====');
}

// Wire footer policy links to showPolicy
content = content.replace(/onclick="navigate\('privacy'\)"/g, `onclick="showPolicy('privacy')"` );
content = content.replace(/onclick="navigate\('terms'\)"/g, `onclick="showPolicy('terms')"` );
content = content.replace(/onclick="navigate\('returns'\)"/g, `onclick="showPolicy('returns')"` );
content = content.replace(/onclick="navigate\('provably-fair'\)"/g, `onclick="showPolicy('provablyFair')"` );
content = content.replace(/onclick="navigate\('affiliate'\)"/g, `onclick="showPolicy('affiliate')"` );

fs.writeFileSync(protoPath, content, 'utf8');
fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully wired policy modal and footer links!');
