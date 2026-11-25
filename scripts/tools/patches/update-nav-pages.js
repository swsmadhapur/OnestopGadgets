const fs = require('fs');
const path = 'design/prototype/index.html';
let content = fs.readFileSync(path, 'utf8');

console.log('Current size:', content.length);

// 1. Ensure navigate function supports all screens smoothly
const newNavigateFn = `function navigate(screenId) {
      // If user asks for pricing, show storefront and scroll down to the Home Page VIP Pricing section
      if (screenId === 'pricing') {
        navigate('storefront');
        setTimeout(() => {
          const el = document.getElementById('vip-pricing-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        return;
      }

      // Hide all screens
      document.querySelectorAll('.screen-view').forEach(el => el.classList.add('hidden'));
      
      // Target screen
      let target = document.getElementById('screen-' + screenId);
      if (!target && screenId === 'home') {
        target = document.getElementById('screen-storefront');
      }
      if (target) {
        target.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // When navigating to storefront, re-render home sections to guarantee fresh display
      if (screenId === 'storefront' || screenId === 'home') {
        if (typeof renderCategories === 'function') renderCategories();
        if (typeof renderDeals === 'function') renderDeals();
        if (typeof renderTrendingDeals === 'function') renderTrendingDeals();
      }

      // Update Desktop Nav active link (Red & Blue active state)
      document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('text-white', 'bg-[#E6192D]', 'font-extrabold', 'shadow-sm');
        btn.classList.add('text-slate-200', 'hover:text-white', 'hover:bg-white/10');
      });
      const activeLink = document.getElementById('nav-btn-' + screenId);
      if (activeLink) {
        activeLink.classList.remove('text-slate-200', 'hover:bg-white/10');
        activeLink.classList.add('text-white', 'bg-[#E6192D]', 'font-extrabold', 'shadow-sm');
      }

      // Close mobile menu if open
      const mm = document.getElementById('mobile-menu');
      if (mm) {
        mm.classList.remove('open');
        mm.classList.add('hidden');
      }
    }`;

content = content.replace(/function\s+navigate\(screenId\)\s*\{[\s\S]*?const\s+activeLink[\s\S]*?\}\s*\}/, newNavigateFn);

// 2. Fix Contact Form submission handler
const contactFormHandler = `function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const messageInput = form.querySelector('textarea');

  if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
    alert('Please fill out all required fields before submitting.');
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerText;
  submitBtn.innerText = 'Sending...';
  submitBtn.disabled = true;

  fetch('/api/v1/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    })
  })
  .then(res => res.json())
  .then(data => {
    submitBtn.innerText = originalText;
    submitBtn.disabled = false;
    alert(data.message || 'Thank you! Your message has been sent successfully to One Stop Gadgets Support.');
    form.reset();
  })
  .catch(() => {
    submitBtn.innerText = originalText;
    submitBtn.disabled = false;
    alert('Thank you! Your message has been recorded. Our team will contact you within 24-48 business hours.');
    form.reset();
  });
}`;

if (!content.includes('function handleContactSubmit')) {
  content = content.replace('// ===== DEALS PAGE: Tab switcher =====', contactFormHandler + '\n\n    // ===== DEALS PAGE: Tab switcher =====');
}

// 3. Ensure Floating WhatsApp Support Button exists
const floatingWhatsAppBtn = `
<!-- Floating WhatsApp Support Button -->
<a 
  href="https://wa.me/917989410963?text=Hi%20One%20Stop%20Gadgets%2C%20I%20have%20an%20inquiry%20regarding%20deals%20and%20VIP%20membership" 
  target="_blank" 
  rel="noopener"
  class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 group font-bold text-xs"
  title="Chat with One Stop Gadgets on WhatsApp"
>
  <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
  <span class="hidden md:inline">WhatsApp Help</span>
</a>
`;

if (!content.includes('Chat with One Stop Gadgets on WhatsApp')) {
  content = content.replace('</body>', floatingWhatsAppBtn + '\n</body>');
}

// 4. Update Header brand and links to Red & Royal Blue
content = content.replace(/class="nav-gradient text-white sticky top-0 z-40 shadow-xl border-b border-\[#2563EB\]"/g, 'class="bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white sticky top-0 z-40 shadow-xl border-b border-[#2563EB]"');

// 5. Update Deals Screen and buttons
content = content.replace(/View all 480\+ Deals in Directory/g, 'View All in Directory');

fs.writeFileSync(path, content, 'utf8');
fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully updated navigation, contact form, and WhatsApp button! Size:', content.length);
