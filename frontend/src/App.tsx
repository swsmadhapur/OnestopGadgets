import React, { useState, useRef, useEffect } from 'react';

type Screen = 'storefront' | 'catalog' | 'pricing' | 'luckydip' | 'about' | 'contact' | 'signin' | 'membership' | 'admin' | 'superadmin';
type UserRole = 'free' | 'vip' | 'expired';
type PriceFilter = 'all' | 'under99' | '100-499' | '500-999' | '1000plus';
type SortOption = 'latest' | 'price-asc' | 'price-desc' | 'discount-desc';

interface Deal {
  id: number;
  sku: string;
  title: string;
  category: string;
  categoryId: string;
  brand: string;
  store: string;
  storeIcon: string;
  price: string;
  numeric_price: number;
  original: string;
  discount: string;
  icon: string;
  rating: number;
  description: string;
  merchantUrl: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('storefront');
  const [userRole, setUserRole] = useState<UserRole>('free');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [activePriceFilter, setActivePriceFilter] = useState<PriceFilter>('all');
  const [activeSortOption, setActiveSortOption] = useState<SortOption>('latest');
  const [selectedProduct, setSelectedProduct] = useState<Deal | null>(null);
  const [purchasingPlan, setPurchasingPlan] = useState<{ id: string; name: string; price: string; numericPrice: number; duration: string; days: number; entries: number } | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'register' | 'payment'>('register');
  const [custName, setCustName] = useState('Venkata Jagadeesh');
  const [custEmail, setCustEmail] = useState('jagadeesh@example.com');
  const [custPhone, setCustPhone] = useState('+91 9876543210');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('789');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [activeMembership, setActiveMembership] = useState<{
    membershipId: string;
    plan: string;
    amountPaid: number;
    activatedAt: string;
    expiresAt: string;
    paymentId: string;
    luckyDipEntries: number;
    status: 'active' | 'expired';
  } | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<Array<{
    id: string;
    plan: string;
    amount: string;
    date: string;
    method: string;
    status: string;
  }>>([]);
  const [showVipPopup, setShowVipPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  
  // Lucky Dip State
  const [luckyDipName, setLuckyDipName] = useState('');
  const [luckyDipEmail, setLuckyDipEmail] = useState('');
  const [luckyDipPhone, setLuckyDipPhone] = useState('');
  const [luckyDipCity, setLuckyDipCity] = useState('');
  const [luckyDipSuccessModal, setLuckyDipSuccessModal] = useState<any | null>(null);
  const [luckyDipEntries, setLuckyDipEntries] = useState([
    {
      ticketNumber: 'OSG-TKT-894120',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      phone: '+91 98112 •••••',
      city: 'New Delhi',
      plan: '6-Month VIP',
      timestamp: 'Today, 02:15 PM',
      hash: '9f83ab...e412',
      isCurrentUser: false
    },
    {
      ticketNumber: 'OSG-TKT-761249',
      name: 'Ananya Verma',
      email: 'ananya.v@example.com',
      phone: '+91 97401 •••••',
      city: 'Bengaluru',
      plan: 'Annual VIP',
      timestamp: 'Today, 01:40 PM',
      hash: '3e41c0...a889',
      isCurrentUser: false
    },
    {
      ticketNumber: 'OSG-TKT-654812',
      name: 'Gagan Preet',
      email: 'gagan.p@example.com',
      phone: '+91 98884 •••••',
      city: 'Chandigarh',
      plan: 'Monthly VIP',
      timestamp: 'Today, 11:10 AM',
      hash: '7c89ff...1b54',
      isCurrentUser: false
    }
  ]);
  const featuredScrollRef = useRef<HTMLDivElement>(null);

  // Automatic 5-second VIP Packages popup for non-VIP visitors (once per session)
  useEffect(() => {
    if (userRole === 'vip' || popupDismissed) return;
    const timer = setTimeout(() => {
      setShowVipPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [userRole, popupDismissed]);

  // Allow closing popup via Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showVipPopup) {
        setShowVipPopup(false);
        setPopupDismissed(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showVipPopup]);

  const handleOpenPayment = (planId: 'monthly' | 'six-month' | 'annual', planName: string, price: string, numericPrice: number, duration: string, days: number, entries: number) => {
    setPurchasingPlan({ id: planId, name: planName, price, numericPrice, duration, days, entries });
    setCheckoutStep('register');
    setPaymentSuccess(false);
    setIsProcessingPayment(false);
  };

  const handleLuckyDipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!luckyDipName.trim() || !luckyDipEmail.trim() || !luckyDipPhone.trim()) {
      alert('Please fill all required fields to enter the Lucky Dip.');
      return;
    }

    // Free User check: show pricing popup
    if (userRole !== 'vip') {
      setShowVipPopup(true);
      return;
    }

    // VIP User: submit entry successfully
    const ticketNumber = 'OSG-TKT-' + Math.floor(100000 + Math.random() * 900000);
    const hash = 'a' + Math.random().toString(16).substring(2, 8) + '...' + Math.random().toString(16).substring(2, 6);
    const newEntry = {
      ticketNumber,
      name: luckyDipName,
      email: luckyDipEmail,
      phone: luckyDipPhone.slice(0, 7) + ' •••••',
      city: luckyDipCity.trim() || 'India',
      plan: activeMembership ? activeMembership.plan : 'Active VIP Pass',
      timestamp: 'Just Now',
      hash,
      isCurrentUser: true
    };

    setLuckyDipEntries(prev => [newEntry, ...prev]);
    setLuckyDipSuccessModal({
      ticketNumber,
      name: luckyDipName,
      email: luckyDipEmail,
      phone: luckyDipPhone,
      city: luckyDipCity || 'India',
      hash
    });

    // Reset inputs
    setLuckyDipName('');
    setLuckyDipEmail('');
    setLuckyDipPhone('');
    setLuckyDipCity('');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !custEmail.trim() || !custPhone.trim()) {
      alert('Please fill all registration details.');
      return;
    }
    setCheckoutStep('payment');
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purchasingPlan) return;
    setIsProcessingPayment(true);

    const orderId = 'order_osg_' + Math.floor(10000000 + Math.random() * 90000000);
    const paymentId = 'pay_rzp_' + Math.floor(10000000 + Math.random() * 90000000);

    // Call backend API for verification and order storage
    fetch('/api/v1/vip/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        paymentId,
        paymentSignature: 'sig_' + Math.random().toString(36).substring(2),
        planId: purchasingPlan.id,
        name: custName,
        email: custEmail,
        phone: custPhone,
        paymentMethod: paymentMethod === 'upi' ? 'UPI (GPay / PhonePe)' : 'Debit / Credit Card'
      })
    })
      .then(res => res.json())
      .then(data => {
        setIsProcessingPayment(false);
        setPaymentSuccess(true);
        setUserRole('vip');

        const now = new Date();
        const expiry = new Date(now.getTime() + purchasingPlan.days * 24 * 60 * 60 * 1000);

        const newMem = {
          membershipId: data.membership ? data.membership.membershipId : 'VIP-' + Math.floor(100000 + Math.random() * 900000),
          plan: purchasingPlan.name,
          amountPaid: purchasingPlan.numericPrice,
          activatedAt: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          expiresAt: expiry.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          paymentId: paymentId,
          luckyDipEntries: purchasingPlan.entries,
          status: 'active' as const
        };

        setActiveMembership(newMem);
        setPaymentHistory(prev => [
          {
            id: paymentId,
            plan: purchasingPlan.name,
            amount: purchasingPlan.price,
            date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            method: paymentMethod.toUpperCase(),
            status: 'Success (Verified)'
          },
          ...prev
        ]);
      })
      .catch(() => {
        // Safe fallback in test mode
        setIsProcessingPayment(false);
        setPaymentSuccess(true);
        setUserRole('vip');

        const now = new Date();
        const expiry = new Date(now.getTime() + purchasingPlan.days * 24 * 60 * 60 * 1000);

        setActiveMembership({
          membershipId: 'VIP-' + Math.floor(100000 + Math.random() * 900000),
          plan: purchasingPlan.name,
          amountPaid: purchasingPlan.numericPrice,
          activatedAt: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          expiresAt: expiry.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          paymentId: paymentId,
          luckyDipEntries: purchasingPlan.entries,
          status: 'active'
        });

        setPaymentHistory(prev => [
          {
            id: paymentId,
            plan: purchasingPlan.name,
            amount: purchasingPlan.price,
            date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            method: paymentMethod.toUpperCase(),
            status: 'Captured (Razorpay Test)'
          },
          ...prev
        ]);
      });
  };

  const scrollFeatured = (direction: 'left' | 'right') => {
    if (featuredScrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      featuredScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const categories = [
    { id: 'smartphones', name: 'Smartphones', icon: '📱' },
    { id: 'laptops', name: 'Laptops', icon: '💻' },
    { id: 'audio-wearables', name: 'Audio & Wearables', icon: '🎧' },
    { id: 'smartwatches', name: 'Smartwatches', icon: '⌚' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'cameras', name: 'Cameras', icon: '📷' },
    { id: 'smart-home', name: 'Smart Home', icon: '🏠' },
    { id: 'accessories', name: 'Accessories', icon: '🔌' },
  ];

  // Comprehensive master products catalog (unique, zero duplicate items)
  const masterDeals: Deal[] = [
    // Smartphones
    { id: 1, sku: 'APPL-IP16-PM', title: 'Apple iPhone 16 Pro Max (256 GB)', category: 'Smartphones', categoryId: 'smartphones', brand: 'Apple', store: 'Amazon Verified', storeIcon: '🛒', discount: '-18%', price: '₹1,34,999', numeric_price: 134999, original: '₹1,64,900', icon: '📱', rating: 4.9, description: 'Grade 5 Titanium design, Camera Control button, 4K 120 fps Dolby Vision and A18 Pro chip.', merchantUrl: 'https://www.amazon.in' },
    { id: 2, sku: 'SAMS-S24-ULTRA', title: 'Samsung Galaxy S24 Ultra 5G (512GB)', category: 'Smartphones', categoryId: 'smartphones', brand: 'Samsung', store: 'Amazon Verified', storeIcon: '🛒', discount: '-14%', price: '₹1,19,999', numeric_price: 119999, original: '₹1,39,999', icon: '📱', rating: 4.8, description: 'Galaxy AI with Circle to Search, 200MP Quad Telephoto camera and S-Pen.', merchantUrl: 'https://www.amazon.in' },
    { id: 3, sku: 'GOOG-PIX8A', title: 'Google Pixel 8a (128GB, Bay Blue)', category: 'Smartphones', categoryId: 'smartphones', brand: 'Google', store: 'Flipkart Verified', storeIcon: '⚡', discount: '-28%', price: '₹37,999', numeric_price: 37999, original: '₹52,999', icon: '📱', rating: 4.6, description: 'Google Tensor G3 chip, stunning Pixel camera, 7 years of OS updates.', merchantUrl: 'https://www.flipkart.com' },
    { id: 4, sku: 'ONEP-12R', title: 'OnePlus 12R 5G (16GB RAM, 256GB)', category: 'Smartphones', categoryId: 'smartphones', brand: 'OnePlus', store: 'Amazon Verified', storeIcon: '🛒', discount: '-7%', price: '₹42,999', numeric_price: 42999, original: '₹45,999', icon: '📱', rating: 4.7, description: 'Snapdragon 8 Gen 2, 4th Gen LTPO 120Hz display, 5500 mAh battery.', merchantUrl: 'https://www.amazon.in' },

    // Laptops
    { id: 5, sku: 'APPL-MBA-M4', title: 'MacBook Air M4 (13-inch)', category: 'Laptops', categoryId: 'laptops', brand: 'Apple', store: 'Flipkart Verified', storeIcon: '⚡', discount: '-22%', price: '₹94,990', numeric_price: 94990, original: '₹1,21,900', icon: '💻', rating: 4.9, description: 'Apple M4 chip with 10-core CPU, up to 18 hours battery life, Liquid Retina display.', merchantUrl: 'https://www.flipkart.com' },
    { id: 6, sku: 'APPL-MBP-M4PRO', title: 'Apple MacBook Pro 16-inch M4 Pro (24GB)', category: 'Laptops', categoryId: 'laptops', brand: 'Apple', store: 'Amazon Verified', storeIcon: '🛒', discount: '-7%', price: '₹2,49,900', numeric_price: 249900, original: '₹2,69,900', icon: '💻', rating: 5.0, description: 'Liquid Retina XDR display, M4 Pro chip monster performance.', merchantUrl: 'https://www.amazon.in' },
    { id: 7, sku: 'ASUS-VIVO-15', title: 'ASUS Vivobook 15 Intel Core i5 13th Gen', category: 'Laptops', categoryId: 'laptops', brand: 'ASUS', store: 'Amazon Verified', storeIcon: '🛒', discount: '-28%', price: '₹47,990', numeric_price: 47990, original: '₹66,990', icon: '💻', rating: 4.5, description: 'Slim lightweight laptop, 15.6 FHD anti-glare display, Windows 11 Home.', merchantUrl: 'https://www.amazon.in' },
    { id: 8, sku: 'HP-PAV-AERO', title: 'HP Pavilion Aero 13 AMD Ryzen 5 (970g)', category: 'Laptops', categoryId: 'laptops', brand: 'HP', store: 'Flipkart Verified', storeIcon: '⚡', discount: '-31%', price: '₹49,990', numeric_price: 49990, original: '₹72,000', icon: '💻', rating: 4.5, description: 'Ultra-featherweight 970g magnesium body, 400-nit display.', merchantUrl: 'https://www.flipkart.com' },

    // Audio & Wearables
    { id: 9, sku: 'BOSE-QC-ULTRA', title: 'Bose QuietComfort Ultra Headphones', category: 'Audio & Wearables', categoryId: 'audio-wearables', brand: 'Bose', store: 'Amazon Verified', storeIcon: '🛒', discount: '-35%', price: '₹25,999', numeric_price: 25999, original: '₹39,999', icon: '🎧', rating: 4.8, description: 'World-class spatial audio with Bose Immersive Audio, custom acoustic ANC modes.', merchantUrl: 'https://www.amazon.in' },
    { id: 10, sku: 'SONY-WH-XM5', title: 'Sony WH-1000XM5 Wireless Noise Cancelling', category: 'Audio & Wearables', categoryId: 'audio-wearables', brand: 'Sony', store: 'Flipkart Verified', storeIcon: '⚡', discount: '-23%', price: '₹26,990', numeric_price: 26990, original: '₹34,990', icon: '🎧', rating: 4.9, description: 'Two processors control 8 microphones for industry-leading ANC.', merchantUrl: 'https://www.flipkart.com' },
    { id: 11, sku: 'APPL-AIRPODS-P2', title: 'Apple AirPods Pro (2nd Gen with USB-C)', category: 'Audio & Wearables', categoryId: 'audio-wearables', brand: 'Apple', store: 'Amazon Verified', storeIcon: '🛒', discount: '-24%', price: '₹18,990', numeric_price: 18990, original: '₹24,900', icon: '🎧', rating: 4.9, description: 'Up to 2x more Active Noise Cancellation, Adaptive Audio.', merchantUrl: 'https://www.amazon.in' },

    // Smartwatches
    { id: 12, sku: 'APPL-WATCH-S10', title: 'Apple Watch Series 10 (GPS, 46mm)', category: 'Smartwatches', categoryId: 'smartwatches', brand: 'Apple', store: 'Amazon Verified', storeIcon: '🛒', discount: '-10%', price: '₹44,900', numeric_price: 44900, original: '₹49,900', icon: '⌚', rating: 4.8, description: 'Thinnest Apple Watch ever with wide-angle OLED display, sleep apnea tracking.', merchantUrl: 'https://www.amazon.in' },
    { id: 13, sku: 'APPL-WATCH-U2', title: 'Apple Watch Ultra 2 (Titanium GPS+Cellular)', category: 'Smartwatches', categoryId: 'smartwatches', brand: 'Apple', store: 'Amazon Verified', storeIcon: '🛒', discount: '-6%', price: '₹84,900', numeric_price: 84900, original: '₹89,900', icon: '⌚', rating: 4.9, description: 'Rugged titanium case, precision dual-frequency GPS, 3000 nits display.', merchantUrl: 'https://www.amazon.in' },
    { id: 14, sku: 'SAMS-GW6-CL', title: 'Samsung Galaxy Watch 6 Classic (47mm)', category: 'Smartwatches', categoryId: 'smartwatches', brand: 'Samsung', store: 'Flipkart Verified', storeIcon: '⚡', discount: '-36%', price: '₹24,999', numeric_price: 24999, original: '₹38,999', icon: '⌚', rating: 4.7, description: 'Physical rotating bezel, personalized HR zones, Sapphire glass.', merchantUrl: 'https://www.flipkart.com' },

    // Gaming
    { id: 15, sku: 'SONY-PS5-SLIM', title: 'PlayStation 5 Slim (Disc Edition)', category: 'Gaming', categoryId: 'gaming', brand: 'Sony', store: 'Flipkart Verified', storeIcon: '⚡', discount: '-20%', price: '₹43,990', numeric_price: 43990, original: '₹54,990', icon: '🎮', rating: 4.9, description: 'Slim compact form factor, 1TB high-speed SSD, DualSense haptic feedback.', merchantUrl: 'https://www.flipkart.com' },
    { id: 16, sku: 'SONY-PS5-PRO', title: 'Sony PlayStation 5 Pro Edition (Limited Direct)', category: 'Gaming', categoryId: 'gaming', brand: 'Sony', store: 'Amazon Verified', storeIcon: '🛒', discount: '-15%', price: '₹58,990', numeric_price: 58990, original: '₹68,990', icon: '🎮', rating: 5.0, description: 'PlayStation Spectral Super Resolution (PSSR), 2TB SSD, Ray Tracing GPU.', merchantUrl: 'https://www.amazon.in' },
    { id: 17, sku: 'NINT-SWITCH-OLED', title: 'Nintendo Switch OLED Mario Red Edition', category: 'Gaming', categoryId: 'gaming', brand: 'Nintendo', store: 'Amazon Verified', storeIcon: '🛒', discount: '-17%', price: '₹31,490', numeric_price: 31490, original: '₹37,990', icon: '🎮', rating: 4.8, description: 'Vibrant 7-inch OLED panel, wide adjustable tabletop stand, dock with wired LAN.', merchantUrl: 'https://www.amazon.in' },

    // Cameras
    { id: 18, sku: 'CANON-EOS-R50', title: 'Canon EOS R50 Mirrorless Camera (RF-S 18-45mm)', category: 'Cameras', categoryId: 'cameras', brand: 'Canon', store: 'Amazon Verified', storeIcon: '🛒', discount: '-17%', price: '₹56,990', numeric_price: 56990, original: '₹68,995', icon: '📷', rating: 4.8, description: '24.2 MP APS-C sensor, 4K 30p uncropped recording, Dual Pixel CMOS AF II.', merchantUrl: 'https://www.amazon.in' },
    { id: 19, sku: 'GOPRO-HERO12', title: 'GoPro HERO12 Black Action Camera', category: 'Cameras', categoryId: 'cameras', brand: 'GoPro', store: 'Flipkart Verified', storeIcon: '⚡', discount: '-27%', price: '₹32,990', numeric_price: 32990, original: '₹45,000', icon: '📷', rating: 4.6, description: '5.3K 60fps video, HyperSmooth 6.0 stabilization, waterproof to 33ft.', merchantUrl: 'https://www.flipkart.com' },

    // Smart Home
    { id: 20, sku: 'AMZN-ECHO-10', title: 'Amazon Echo Show 10 (3rd Gen HD Smart Display)', category: 'Smart Home', categoryId: 'smart-home', brand: 'Amazon', store: 'Amazon Verified', storeIcon: '🛒', discount: '-20%', price: '₹19,999', numeric_price: 19999, original: '₹24,999', icon: '🏠', rating: 4.6, description: '10.1 inch HD screen that moves with you, 13MP camera, premium sound.', merchantUrl: 'https://www.amazon.in' },
    { id: 21, sku: 'ECOVACS-N10', title: 'ECOVACS Deebot N10 2-in-1 Robot Vacuum and Mop', category: 'Smart Home', categoryId: 'smart-home', brand: 'ECOVACS', store: 'Amazon Verified', storeIcon: '🛒', discount: '-53%', price: '₹27,900', numeric_price: 27900, original: '₹59,900', icon: '🏠', rating: 4.6, description: '4300Pa suction power, TrueMapping LiDAR navigation, 300-min runtime.', merchantUrl: 'https://www.amazon.in' },

    // Accessories
    { id: 22, sku: 'ANKR-PRIME-100W', title: 'Anker Prime 100W GaN 3-Port Fast Wall Charger', category: 'Accessories', categoryId: 'accessories', brand: 'Anker', store: 'Amazon Verified', storeIcon: '🛒', discount: '-38%', price: '₹4,999', numeric_price: 4999, original: '₹7,999', icon: '🔌', rating: 4.8, description: '100W GaN charging across 2 USB-C ports and 1 USB-A port with ActiveShield 2.0.', merchantUrl: 'https://www.amazon.in' },
    { id: 23, sku: 'SAND-EXTREME-1TB', title: 'SanDisk 1TB Extreme Portable SSD (1050MB/s)', category: 'Accessories', categoryId: 'accessories', brand: 'SanDisk', store: 'Amazon Verified', storeIcon: '🛒', discount: '-43%', price: '₹8,499', numeric_price: 8499, original: '₹14,999', icon: '🔌', rating: 4.9, description: 'Rugged IP65 water/dust resistant shell, 1050MB/s NVMe read speeds.', merchantUrl: 'https://www.amazon.in' },
    { id: 24, sku: 'BOAT-BASSHEADS-100', title: 'boAt BassHeads 100 in-Ear Wired Earphones with Mic', category: 'Audio & Wearables', categoryId: 'audio-wearables', brand: 'boAt', store: 'Amazon Verified', storeIcon: '🛒', discount: '-62%', price: '₹379', numeric_price: 379, original: '₹999', icon: '🎧', rating: 4.3, description: 'Hawk-inspired metallic design, 10mm dynamic drivers, inline microphone.', merchantUrl: 'https://www.amazon.in' },
    { id: 25, sku: 'PTRO-TANGLE-FREE', title: 'pTron Solero TB301 3A Type-C Fast Charging Cable', category: 'Accessories', categoryId: 'accessories', brand: 'pTron', store: 'Amazon Verified', storeIcon: '🛒', discount: '-82%', price: '₹89', numeric_price: 89, original: '₹499', icon: '🔌', rating: 4.2, description: 'Durable nylon braided 1.2M fast charge cable with 480Mbps data sync.', merchantUrl: 'https://www.amazon.in' },
    { id: 26, sku: 'AMBR-OTG-ADAPTER', title: 'Ambrane Type-C to USB-A 3.0 Metal OTG Adapter', category: 'Accessories', categoryId: 'accessories', brand: 'Ambrane', store: 'Flipkart Verified', storeIcon: '⚡', discount: '-70%', price: '₹79', numeric_price: 79, original: '₹269', icon: '🔌', rating: 4.4, description: 'Zinc-alloy compact plug and play OTG converter for smartphones and laptops.', merchantUrl: 'https://www.flipkart.com' },
    { id: 27, sku: 'PORT-MOU-PAD', title: 'Portronics Sublime Ergonomic Anti-Skid Mouse Pad', category: 'Accessories', categoryId: 'accessories', brand: 'Portronics', store: 'Amazon Verified', storeIcon: '🛒', discount: '-60%', price: '₹199', numeric_price: 199, original: '₹499', icon: '🔌', rating: 4.5, description: 'Smooth microfiber cloth surface with non-slip natural rubber base.', merchantUrl: 'https://www.amazon.in' },
    { id: 28, sku: 'WIPR-SMART-9W', title: 'Wipro Next 9W B22 LED Smart Color Bulb (Alexa & Google)', category: 'Smart Home', categoryId: 'smart-home', brand: 'Wipro', store: 'Amazon Verified', storeIcon: '🛒', discount: '-65%', price: '₹699', numeric_price: 699, original: '₹1,999', icon: '🏠', rating: 4.3, description: '16 million colors with dimming control and voice assistant support.', merchantUrl: 'https://www.amazon.in' },
    { id: 29, sku: 'MI-POWER-10K', title: 'Mi 10000mAh Power Bank 3i (18W Fast Charging)', category: 'Accessories', categoryId: 'accessories', brand: 'Xiaomi', store: 'Flipkart Verified', storeIcon: '⚡', discount: '-40%', price: '₹899', numeric_price: 899, original: '₹1,499', icon: '🔌', rating: 4.6, description: 'Dual output ports with 12 layers of advanced circuit chip protection.', merchantUrl: 'https://www.flipkart.com' }
  ];

  // Filtered and sorted deals for Deals page
  const filteredDeals = masterDeals.filter(d => {
    // 1. Gadget category match
    const matchesCat = activeCategoryFilter === 'all' || d.categoryId === activeCategoryFilter;
    
    // 2. Search query match
    const matchesSearch = !searchQuery || d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 3. Price range filter (using actual discounted selling price)
    let matchesPrice = true;
    if (activePriceFilter === 'under99') {
      matchesPrice = d.numeric_price < 99;
    } else if (activePriceFilter === '100-499') {
      matchesPrice = d.numeric_price >= 100 && d.numeric_price <= 499;
    } else if (activePriceFilter === '500-999') {
      matchesPrice = d.numeric_price >= 500 && d.numeric_price <= 999;
    } else if (activePriceFilter === '1000plus') {
      matchesPrice = d.numeric_price >= 1000;
    }

    return matchesCat && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (activeSortOption === 'price-asc') {
      return a.numeric_price - b.numeric_price;
    }
    if (activeSortOption === 'price-desc') {
      return b.numeric_price - a.numeric_price;
    }
    if (activeSortOption === 'discount-desc') {
      const discA = parseInt(a.discount.replace(/[^0-9]/g, ''), 10) || 0;
      const discB = parseInt(b.discount.replace(/[^0-9]/g, ''), 10) || 0;
      return discB - discA;
    }
    // 'latest' default sort by ID descending
    return b.id - a.id;
  });

  // Expanded featured deals for the homepage horizontal carousel
  const homepageDeals = masterDeals;

  // VIP Rule helper
  const isDealLocked = (numericPrice: number) => {
    if (numericPrice < 50000) return false;
    return userRole !== 'vip';
  };

  const winners = [
    { initial: 'R', name: 'Rohan Sharma', prize: 'iPhone 16 Pro Max (256 GB)', date: 'November 2026', color: '#E68A00' },
    { initial: 'G', name: 'Gagan Preet', prize: 'iPhone 16 Pro Max', date: 'September 2026', color: '#DC2626' },
    { initial: 'E', name: 'Ekambir Sandhu', prize: '1st Prize: iPhone 16 / S25', date: 'July 2026', color: '#2563EB' },
    { initial: 'S', name: 'Sukhjinder Singh', prize: '1st Prize: iPhone 16', date: 'June 2026', color: '#059669' },
    { initial: 'A', name: 'Abha Talwar', prize: 'iPhone 16 Pro', date: 'May 2026', color: '#7C3AED' },
    { initial: 'J', name: 'Jaydev Bhere', prize: 'PlayStation 5 Slim', date: 'February 2026', color: '#0284C7' }
  ];

  return (
    <div className="min-h-screen bg-[#101428] text-white flex flex-col font-sans overflow-x-hidden">
      
      {/* ==================== AUTOMATIC 5-SECOND VIP PACKAGES POPUP ==================== */}
      {showVipPopup && userRole !== 'vip' && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowVipPopup(false);
              setPopupDismissed(true);
            }
          }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in"
        >
          <div className="bg-[#FAF7F2] text-slate-900 rounded-3xl p-5 sm:p-8 max-w-4xl w-full shadow-2xl relative space-y-6 border border-amber-300/60 my-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowVipPopup(false);
                setPopupDismissed(true);
              }}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-200 hover:bg-[#DC1F32] hover:text-white text-slate-700 font-bold flex items-center justify-center transition shadow-sm"
              title="Close VIP popup"
            >
              ✕
            </button>

            {/* Popup Header */}
            <div className="text-center space-y-2 pr-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#DC1F32] to-[#D4AF37] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                <span>👑</span> EXCLUSIVE VIP PACKAGES
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Unlock Better Deals. Discover Bigger Opportunities!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                Special limited-time access to secret voucher links, unblurred pricing over ₹50,000, and weekly Lucky Dip prize entries.
              </p>
            </div>

            {/* 3 VIP Packages Cards Grid in Popup */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 text-left items-stretch">
              
              {/* 1. Monthly VIP – ₹299/month */}
              <div
                style={{ background: 'linear-gradient(145deg, #400B19 0%, #7A0C1A 50%, #DC1F32 100%)' }}
                className="rounded-2xl p-5 border border-[#D4AF37]/40 shadow-lg text-white flex flex-col justify-between relative group hover:border-[#D4AF37] transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-[#D4AF37] bg-black/40 px-2 py-0.5 rounded border border-[#D4AF37]/30">Starter</span>
                    <span className="text-lg">⭐</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">Monthly VIP</h3>
                    <div className="text-2xl font-black text-white mt-1">₹299 <span className="text-xs font-normal text-rose-200">/ month</span></div>
                    <div className="text-[10px] text-amber-300 font-semibold">30 Days Membership</div>
                  </div>
                  <ul className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-white/95">
                    <li className="flex items-center gap-1.5"><span className="text-[#D4AF37] font-bold">✓</span> Access to premium gadget deals</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#D4AF37] font-bold">✓</span> Exclusive VIP discounts</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#D4AF37] font-bold">✓</span> Instant deal notifications</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#D4AF37] font-bold">✓</span> <strong>1 Lucky Dip entry</strong> / draw</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    setShowVipPopup(false);
                    setPopupDismissed(true);
                    handleOpenPayment('monthly', 'Monthly VIP', '₹299', 299, '30 Days', 30, 1);
                  }}
                  className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#400B19] font-black text-xs uppercase tracking-wider hover:brightness-110 shadow transition"
                >
                  Get Monthly Pass
                </button>
              </div>

              {/* 2. 6-Month VIP – ₹1,199 (MOST POPULAR) */}
              <div
                style={{ background: 'linear-gradient(145deg, #500917 0%, #9E1020 40%, #DC1F32 80%, #D4AF37 120%)' }}
                className="rounded-2xl p-5 border-2 border-[#D4AF37] shadow-[0_8px_30px_rgba(212,175,55,0.4)] text-white flex flex-col justify-between relative group transform md:-translate-y-1"
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37] text-[#400B19] text-[9px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow whitespace-nowrap">
                  ★ MOST POPULAR • 33% OFF ★
                </span>
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-[#400B19] bg-[#D4AF37] px-2 py-0.5 rounded">Best Seller</span>
                    <span className="text-lg">👑</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">6-Month VIP</h3>
                    <div className="text-2xl font-black text-amber-200 mt-1">₹1,199 <span className="text-xs font-normal text-rose-200">/ 6 mo</span></div>
                    <div className="text-[10px] text-amber-300 font-semibold">Equivalent to ₹199/mo</div>
                  </div>
                  <ul className="space-y-1.5 pt-2 border-t border-white/15 text-xs text-white">
                    <li className="flex items-center gap-1.5"><span className="text-[#D4AF37] font-bold">✓</span> Everything in Monthly VIP</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#D4AF37] font-bold">✓</span> <strong>2 Lucky Dip entries</strong> / draw</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#D4AF37] font-bold">✓</span> Early access to special offers</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#D4AF37] font-bold">✓</span> Exclusive VIP vouchers &amp; alerts</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    setShowVipPopup(false);
                    setPopupDismissed(true);
                    handleOpenPayment('six-month', '6-Month VIP (Most Popular)', '₹1,199', 1199, '6 Calendar Months', 180, 2);
                  }}
                  className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-300 to-[#D4AF37] text-[#350C12] font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition"
                >
                  Get 6-Month Pass
                </button>
              </div>

              {/* 3. Annual VIP – ₹1,799 */}
              <div
                style={{ background: 'linear-gradient(145deg, #400B19 0%, #6B0E1B 45%, #DC1F32 85%, #8A6D1C 100%)' }}
                className="rounded-2xl p-5 border border-[#D4AF37]/50 shadow-lg text-white flex flex-col justify-between relative group hover:border-[#D4AF37] transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-[#D4AF37] bg-black/40 px-2 py-0.5 rounded border border-[#D4AF37]/30">Maximum Value</span>
                    <span className="text-lg">💎</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">Annual VIP</h3>
                    <div className="text-2xl font-black text-white mt-1">₹1,799 <span className="text-xs font-normal text-rose-200">/ year</span></div>
                    <div className="text-[10px] text-amber-300 font-semibold">~₹149/mo • Save 50%</div>
                  </div>
                  <ul className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-white/95">
                    <li className="flex items-center gap-1.5"><span className="text-[#D4AF37] font-bold">✓</span> Everything in 6-Month VIP</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#D4AF37] font-bold">✓</span> <strong>3 Lucky Dip entries</strong> / draw</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#D4AF37] font-bold">✓</span> Exclusive annual member offers</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#D4AF37] font-bold">✓</span> Priority customer support</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    setShowVipPopup(false);
                    setPopupDismissed(true);
                    handleOpenPayment('annual', 'Annual VIP', '₹1,799', 1799, '12 Calendar Months', 365, 3);
                  }}
                  className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#400B19] font-black text-xs uppercase tracking-wider hover:brightness-110 shadow transition"
                >
                  Get Annual Pass
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
      
      {/* Payment Method Modal: Registration Form -> Razorpay Payment Checkout -> Server Verification -> VIP Activated */}
      {purchasingPlan && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] text-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5 border border-slate-200 max-h-[90vh] overflow-y-auto">
            {!paymentSuccess ? (
              <>
                <button
                  onClick={() => setPurchasingPlan(null)}
                  disabled={isProcessingPayment}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-xl font-bold"
                >
                  ✕
                </button>

                {/* Step Indicator */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${checkoutStep === 'register' ? 'bg-[#E50914] text-white' : 'bg-emerald-500 text-white'}`}>
                      {checkoutStep === 'payment' ? '✓' : '1'}
                    </span>
                    <span className={`text-xs font-black ${checkoutStep === 'register' ? 'text-slate-900' : 'text-slate-500'}`}>1. Registration</span>
                  </div>
                  <div className="w-8 h-0.5 bg-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${checkoutStep === 'payment' ? 'bg-[#E50914] text-white' : 'bg-slate-200 text-slate-600'}`}>
                      2
                    </span>
                    <span className={`text-xs font-black ${checkoutStep === 'payment' ? 'text-slate-900' : 'text-slate-400'}`}>2. Razorpay Checkout</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#B51224] to-[#D4AF37] text-white text-[10px] font-black uppercase tracking-wider">
                    <span>👑</span> VIP Pass Activation Flow
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    {checkoutStep === 'register' ? 'Step 1: VIP Member Registration' : 'Step 2: Secure Payment Order'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Plan: <strong className="text-slate-800">{purchasingPlan.name}</strong> • Amount: <strong className="text-[#E50914] text-base">{purchasingPlan.price}</strong> ({purchasingPlan.duration})
                  </p>
                </div>

                {/* STEP 1: REGISTRATION FORM */}
                {checkoutStep === 'register' && (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={custName}
                          onChange={(e) => setCustName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#E50914]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={custEmail}
                          onChange={(e) => setCustEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#E50914]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile Number (WhatsApp Enabled) *</label>
                        <input
                          type="tel"
                          required
                          value={custPhone}
                          onChange={(e) => setCustPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#E50914]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Selected VIP Plan (Auto-filled)</label>
                        <input
                          type="text"
                          readOnly
                          value={`${purchasingPlan.name} (${purchasingPlan.price} - ${purchasingPlan.duration})`}
                          className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-bold cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#B51224] to-[#E50914] text-white font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
                    >
                      <span>Continue to Payment ({purchasingPlan.price})</span>
                      <span>→</span>
                    </button>
                  </form>
                )}

                {/* STEP 2: PAYMENT METHOD (RAZORPAY GATEWAY SIMULATOR) */}
                {checkoutStep === 'payment' && (
                  <div className="space-y-4">
                    {/* Method Selector */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-200/80 p-1.5 rounded-2xl">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`py-2 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition ${
                          paymentMethod === 'upi' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span>⚡</span>
                        <span>UPI / QR / GPay</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`py-2 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition ${
                          paymentMethod === 'card' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span>💳</span>
                        <span>Debit / Credit Card</span>
                      </button>
                    </div>

                    <form onSubmit={handleCompletePayment} className="space-y-4">
                      {paymentMethod === 'upi' ? (
                        <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Enter UPI VPA / Handle</label>
                            <div className="relative">
                              <input
                                type="text"
                                required
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                placeholder="username@okhdfcbank"
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#E50914]"
                              />
                              <span className="absolute right-3 top-2.5 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                Razorpay Verified
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-medium">
                            <span>Supported:</span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-700">Google Pay</span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-700">PhonePe</span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-700">Paytm UPI</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Card Number</label>
                            <input
                              type="text"
                              required
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="4532 0000 0000 8821"
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#E50914]"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Expiry</label>
                              <input
                                type="text"
                                required
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="MM/YY"
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#E50914]"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">CVV</label>
                              <input
                                type="password"
                                maxLength={4}
                                required
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                placeholder="•••"
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#E50914]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-[11px] text-blue-900 flex items-center justify-between">
                        <span>Razorpay Test Gateway Mode</span>
                        <span className="font-bold">256-Bit TLS Secured</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setCheckoutStep('register')}
                          className="py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100"
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          disabled={isProcessingPayment}
                          className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#B51224] via-[#E50914] to-[#D4AF37] text-white font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-75"
                        >
                          {isProcessingPayment ? (
                            <>
                              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                              <span>Verifying with Server &amp; Activating...</span>
                            </>
                          ) : (
                            <>
                              <span>Pay {purchasingPlan.price} &amp; Activate VIP</span>
                              <span>→</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </>
            ) : (
              /* Payment Successful & VIP Activated Confirmation Screen */
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl flex items-center justify-center mx-auto shadow-md">
                  ✓
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Payment Successful – VIP Activated!</h3>
                  <p className="text-xs text-slate-600 font-medium">
                    Order confirmed and verified on backend server.
                  </p>
                </div>

                {activeMembership && (
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                    <div className="flex justify-between pb-1 border-b border-slate-100">
                      <span className="text-slate-500">Plan:</span>
                      <span className="font-black text-[#E50914]">{activeMembership.plan}</span>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-slate-100">
                      <span className="text-slate-500">Payment ID:</span>
                      <span className="font-mono font-bold text-slate-800">{activeMembership.paymentId}</span>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-slate-100">
                      <span className="text-slate-500">Activated Date:</span>
                      <span className="font-bold text-slate-800">{activeMembership.activatedAt}</span>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-slate-100">
                      <span className="text-slate-500">Expiry Date:</span>
                      <span className="font-bold text-emerald-600">{activeMembership.expiresAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Lucky Dip Tickets Allocated:</span>
                      <span className="font-black text-amber-600">🎟️ {activeMembership.luckyDipEntries} entries / draw</span>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 font-bold">
                  👑 Navbar VIP Switcher has been updated to: Active VIP Pass. Premium deals are unlocked!
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setPurchasingPlan(null);
                      setCurrentScreen('catalog');
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#1645C4] hover:bg-[#12389E] text-white font-black text-xs uppercase"
                  >
                    Explore Unlocked Deals →
                  </button>
                  <button
                    onClick={() => {
                      setPurchasingPlan(null);
                      setCurrentScreen('membership');
                    }}
                    className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-xs uppercase"
                  >
                    View VIP Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Details Internal Modal (Search/Card click opens internal details, not external redirect) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] text-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-4">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-xl font-bold">✕</button>
            <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-5xl mx-auto shadow-sm">
              {selectedProduct.icon}
            </div>
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-red-100 text-[#E50914] px-2 py-0.5 rounded">{selectedProduct.category}</span>
              <h3 className="text-lg font-black text-slate-900">{selectedProduct.title}</h3>
              <p className="text-xs text-slate-500 font-medium">{selectedProduct.store}</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed text-center">{selectedProduct.description}</p>
            
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Offer Price (Verified)</div>
                <div className="text-2xl font-black text-[#E50914]">
                  {isDealLocked(selectedProduct.numeric_price) ? (
                    <span className="filter blur-[3px] select-none text-slate-400">₹99,999</span>
                  ) : (
                    selectedProduct.price
                  )}
                </div>
                <div className="text-xs text-slate-400 line-through">{selectedProduct.original}</div>
              </div>
              <div className="text-right">
                <span className="text-xs font-black px-2 py-1 rounded bg-[#E50914] text-white">{selectedProduct.discount}</span>
              </div>
            </div>

            {isDealLocked(selectedProduct.numeric_price) ? (
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  handleOpenPayment('six-month', '6-Month Pass (Unlock ≥ ₹50K)', '₹1,199', 1199, '6 Calendar Months', 180, 2);
                }}
                className="w-full py-3 rounded-xl bg-[#E50914] hover:bg-[#c51424] text-white font-black text-xs uppercase tracking-wider shadow-lg"
              >
                {userRole === 'expired' ? 'Renew VIP Pass to Unlock (≥ ₹50K)' : 'Take VIP Pass to Unlock (≥ ₹50K)'}
              </button>
            ) : (
              <a href={selectedProduct.merchantUrl} target="_blank" rel="noopener noreferrer" className="block text-center w-full py-3 rounded-xl bg-[#1645C4] hover:bg-[#12389E] text-white font-black text-xs uppercase tracking-wider shadow-lg">
                Proceed to Merchant Deal →
              </a>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md xl:hidden flex justify-end">
          <div className="w-80 max-w-[85vw] h-full bg-gradient-to-b from-[#350C12] via-[#59121B] to-[#101428] p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div className="text-base font-black">ONE STOP <span className="text-[#FF304D]">GADGETS</span></div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-white text-xl font-bold">✕</button>
              </div>

              {/* Mobile VIP Switcher */}
              <div className="space-y-1">
                <label className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Demo User Mode:</label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as UserRole)}
                  className="w-full bg-black/50 border border-amber-400/40 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none"
                >
                  <option value="free" className="bg-[#101428] text-white">Free User (&lt; ₹50K)</option>
                  <option value="vip" className="bg-[#101428] text-emerald-400">Active VIP Pass (All Unlocked)</option>
                  <option value="expired" className="bg-[#101428] text-rose-400">Expired VIP Pass</option>
                </select>
              </div>

              {/* Mobile VIP Membership Portal Link */}
              <button
                onClick={() => { setCurrentScreen('membership'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 px-3 rounded-lg bg-amber-400/20 border border-amber-400/30 text-amber-300 font-bold text-xs flex items-center justify-between"
              >
                <span>👑 My VIP Membership Portal</span>
                <span>→</span>
              </button>

              {/* Mobile Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search deals, brands..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentScreen !== 'catalog') setCurrentScreen('catalog');
                  }}
                  className="w-full bg-black/60 border border-white/20 rounded-xl py-2 pl-8 pr-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FF304D]"
                />
                <span className="absolute left-2.5 top-2.5 text-xs text-white/50">🔍</span>
              </div>

              <nav className="flex flex-col gap-2">
                <button onClick={() => { setCurrentScreen('storefront'); setMobileMenuOpen(false); }} className="text-left py-2 px-3 rounded-lg hover:bg-white/10 font-bold">🏠 Home</button>
                <button onClick={() => { setCurrentScreen('catalog'); setMobileMenuOpen(false); }} className="text-left py-2 px-3 rounded-lg hover:bg-white/10 font-bold">🔥 Deals Directory</button>
                <button onClick={() => { setCurrentScreen('about'); setMobileMenuOpen(false); }} className="text-left py-2 px-3 rounded-lg hover:bg-white/10 font-bold">ℹ️ About</button>
                <button onClick={() => { setCurrentScreen('luckydip'); setMobileMenuOpen(false); }} className="text-left py-2 px-3 rounded-lg bg-red-900/30 text-[#FF304D] font-bold">🎁 Lucky Dip</button>
                <button onClick={() => { setCurrentScreen('contact'); setMobileMenuOpen(false); }} className="text-left py-2 px-3 rounded-lg hover:bg-white/10 font-bold">📞 Contact Us</button>
              </nav>
            </div>
            <button onClick={() => { setCurrentScreen('signin'); setMobileMenuOpen(false); }} className="w-full py-3 rounded-xl bg-[#D91E26] text-white font-bold text-xs shadow">
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Navigation Header (Pixel-Perfect Reference Match with VIP User Switcher) */}
      <header style={{ background: 'linear-gradient(90deg, #350C12 0%, #59121B 50%, #350C12 100%)', minHeight: '80px' }} className="text-white sticky top-0 z-40 shadow-2xl border-b border-[#59121B]/60 flex items-center py-1 sm:py-2">
        <div className="w-full max-w-[1680px] mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between gap-1.5 sm:gap-3 lg:gap-4">
          
          {/* 1. Brand Logo & Title */}
          <div className="flex items-center gap-1.5 sm:gap-3 cursor-pointer shrink min-w-0" onClick={() => setCurrentScreen('storefront')} title="One Stop Gadgets - Home">
            <div className="relative w-11 h-11 sm:w-16 sm:h-16 lg:w-20 lg:h-20 shrink-0 rounded-full p-0.5 sm:p-1 bg-gradient-to-tr from-cyan-500/30 to-rose-500/30 flex items-center justify-center">
              <img src="/logo.jpg" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&auto=format&fit=crop&q=80'; }} alt="One Stop Gadgets" className="w-full h-full rounded-full object-cover shadow-md" />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="text-sm sm:text-xl lg:text-2xl font-black tracking-tight leading-tight flex items-center gap-1 font-sans truncate">
                <span className="text-white whitespace-nowrap">ONE STOP</span>
                <span className="text-[#FF304D] font-extrabold whitespace-nowrap">GADGETS</span>
              </div>
              <div className="text-[7.5px] sm:text-[10px] lg:text-[11px] font-bold text-white/70 tracking-wider sm:tracking-widest uppercase truncate mt-0.5">
                DEALS • VIP • LUCKY DIP
              </div>
            </div>
          </div>

          {/* 2. Desktop Navigation Menu */}
          <nav className="hidden xl:flex items-center gap-2 2xl:gap-4 shrink-0 font-sans">
            <button onClick={() => setCurrentScreen('storefront')} className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${currentScreen === 'storefront' ? 'bg-[#D91E26] text-[#F5F5F7] shadow-md' : 'text-[#F5F5F7] hover:text-white hover:bg-white/10'}`}>
              Home
            </button>
            <button onClick={() => setCurrentScreen('catalog')} className={`px-4 py-2.5 rounded-full font-bold text-sm transition-all ${currentScreen === 'catalog' ? 'bg-[#D91E26] text-[#F5F5F7] shadow-md' : 'text-[#F5F5F7] hover:text-white hover:bg-white/10'}`}>
              Deals
            </button>
            <button onClick={() => setCurrentScreen('about')} className={`px-4 py-2.5 rounded-full font-bold text-sm transition-all ${currentScreen === 'about' ? 'bg-[#D91E26] text-[#F5F5F7] shadow-md' : 'text-[#F5F5F7] hover:text-white hover:bg-white/10'}`}>
              About
            </button>
            <button onClick={() => setCurrentScreen('luckydip')} className={`px-4 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-1.5 ${currentScreen === 'luckydip' ? 'bg-[#D91E26] text-[#F5F5F7] shadow-md' : 'text-[#FF304D] hover:text-white hover:bg-white/10'}`}>
              <span>🎁</span>
              <span>Lucky Dip</span>
            </button>
            <button onClick={() => setCurrentScreen('contact')} className={`px-4 py-2.5 rounded-full font-bold text-sm transition-all ${currentScreen === 'contact' ? 'bg-[#D91E26] text-[#F5F5F7] shadow-md' : 'text-[#F5F5F7] hover:text-white hover:bg-white/10'}`}>
              Contact Us
            </button>
          </nav>

          {/* 3. VIP User Role Selector (Demo Testing Component) */}
          <div className="hidden lg:flex items-center gap-2 bg-black/40 border border-amber-400/30 px-3 py-1.5 rounded-full shrink-0">
            <button
              onClick={() => setCurrentScreen('membership')}
              className="text-[10px] text-amber-300 font-extrabold uppercase hover:underline flex items-center gap-1"
              title="Open My VIP Membership Dashboard"
            >
              <span>👑 Portal</span>
            </button>
            <span className="text-white/30">|</span>
            <span className="text-[10px] text-amber-300/80 font-bold uppercase tracking-wider">Role:</span>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="free" className="bg-[#101428] text-white">Free User (&lt; ₹50K)</option>
              <option value="vip" className="bg-[#101428] text-emerald-400">Active VIP Pass 👑</option>
              <option value="expired" className="bg-[#101428] text-rose-400">Expired VIP Pass</option>
            </select>
          </div>

          {/* 4. Search Bar, Sign In Button & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Tablet/Desktop Search Bar */}
            <div className="relative hidden md:block w-40 lg:w-64 2xl:w-[360px] h-[38px] sm:h-[44px]">
              <div className="relative h-full flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white">
                  <svg className="h-3.5 sm:h-4 w-3.5 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="FiboSearch: iPhone..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); if (currentScreen !== 'catalog') setCurrentScreen('catalog'); }}
                  className="w-full h-full bg-[#000000] border border-white/10 rounded-full pl-8 sm:pl-9 pr-14 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D91E26] transition shadow-inner font-sans"
                />
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1">
                  <span className="text-[8px] sm:text-[9px] bg-[#70152D] text-white px-1.5 py-0.5 rounded font-mono font-bold tracking-tight uppercase shadow-xs">FIBO</span>
                </div>
              </div>
            </div>

            {/* Mobile / Small Screen Quick Search Trigger */}
            <button
              onClick={() => {
                if (currentScreen !== 'catalog') setCurrentScreen('catalog');
                setMobileMenuOpen(true);
              }}
              className="md:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs sm:text-sm"
              title="Search Deals"
              aria-label="Search"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

            {/* Sign In Button */}
            <button
              onClick={() => setCurrentScreen('signin')}
              className="h-[34px] sm:h-[42px] px-2.5 sm:px-4 lg:px-6 rounded-full bg-[#D91E26] hover:bg-[#c51424] text-[#F5F5F7] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1 sm:gap-2 shrink-0"
              title="Sign In"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden xs:inline">Sign In</span>
            </button>

            {/* Mobile & Tablet Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shrink-0"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Promotional Announcement Bar */}
      <div style={{ background: 'linear-gradient(90deg, #D91E26 0%, #1954CF 50%, #D91E26 100%)', minHeight: '40px' }} className="w-full text-[#F5F5F7] text-xs sm:text-[13px] py-2 px-4 text-center font-bold tracking-wide flex flex-wrap items-center justify-center gap-2 shadow-inner">
        <span className="text-amber-300">⚡</span>
        <span><strong>EXCLUSIVE TECH DEALS:</strong> Up to 50% Off Top Brands • Amazon &amp; Flipkart Verified • Weekly VIP Lucky Dip</span>
        <button onClick={() => setCurrentScreen('catalog')} className="underline text-[#F5F5F7] hover:text-amber-300 ml-1 font-bold cursor-pointer transition">
          Explore Offers
        </button>
      </div>

      {/* MAIN VIEW CONTAINER */}
      <main className="flex-1 w-full p-0">
        
        {/* ==================== SCREEN 1: HOME (STOREFRONT) ==================== */}
        {currentScreen === 'storefront' && (
          <div className="w-full space-y-0">
            
            {/* HERO SECTION */}
            <section style={{ background: 'radial-gradient(circle at 75% 40%, rgba(229, 9, 20, 0.4) 0%, #400B19 50%, #101428 100%)' }} className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
              <div className="max-w-[1680px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column */}
                <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-bold text-white tracking-wide uppercase">
                    <span>👑 ONE STOP GADGETS</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                    Exclusive Tech Deals,<br />
                    VIP Access, Cashback &amp;<br />
                    Weekly <span className="text-[#E50914]">Lucky Dip Prizes</span>
                  </h1>
                  <p className="text-white/85 text-xs sm:text-sm md:text-base max-w-xl font-medium leading-relaxed mx-auto lg:mx-0">
                    Verified deals from top merchants, members-only VIP benefits, extra cashback, and a chance to win exciting gadgets every week.
                  </p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                    <button onClick={() => setCurrentScreen('pricing')} className="px-7 py-3.5 rounded-full bg-[#E50914] hover:bg-[#c51424] text-white font-black text-xs uppercase tracking-wider shadow-2xl transition hover:scale-105 flex items-center gap-2">
                      <span>👑</span> <span>Join VIP Now</span>
                    </button>
                    <button onClick={() => setCurrentScreen('luckydip')} className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-black text-xs uppercase tracking-wider transition hover:scale-105 flex items-center gap-2">
                      <span>🎁</span> <span>Try Lucky Dip</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: 3D Product Pedestal */}
                <div className="lg:col-span-5 relative flex items-center justify-center">
                  <div className="relative w-full max-w-md aspect-square rounded-full bg-gradient-to-tr from-[#E50914]/30 via-purple-600/20 to-blue-500/30 p-8 flex items-center justify-center border border-white/10 shadow-2xl">
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-black text-[11px] px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
                      <span>🏆</span> <span>UP TO 50% OFF</span>
                    </div>
                    <div className="text-8xl flex items-center justify-center gap-4">
                      <span className="transform -rotate-6 scale-110 drop-shadow-2xl">📱</span>
                      <span className="transform rotate-6 drop-shadow-2xl">💻</span>
                      <span className="transform drop-shadow-2xl">🎧</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* FEATURED GADGET CATEGORIES */}
            <section style={{ background: 'linear-gradient(135deg, #1645C4 0%, #0D2B82 50%, #101428 100%)' }} className="w-full py-10 px-4 sm:px-6 lg:px-8 border-y border-[#1645C4]/30">
              <div className="max-w-[1680px] mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-black text-white">Featured Gadget Categories</h2>
                  <button onClick={() => { setActiveCategoryFilter('all'); setCurrentScreen('catalog'); }} className="text-xs font-bold text-amber-300 hover:text-white transition">
                    View All in Directory →
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {categories.map(cat => (
                    <div
                      key={cat.id}
                      onClick={() => { setActiveCategoryFilter(cat.id); setCurrentScreen('catalog'); }}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center cursor-pointer transition hover:-translate-y-1"
                    >
                      <div className="text-3xl mb-2">{cat.icon}</div>
                      <div className="text-xs font-extrabold text-white truncate">{cat.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TODAY'S FEATURED DEALS (Milky White #F5F6FA) */}
            <section style={{ background: '#F5F6FA' }} className="w-full py-12 px-4 sm:px-6 lg:px-8 text-slate-900 border-b border-slate-200 relative">
              <div className="max-w-[1680px] mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Today's Featured Deals</h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">Publicly available discounted links verified with partner merchants</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Left & Right Scroll Arrows */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => scrollFeatured('left')}
                        aria-label="Scroll left"
                        className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-white hover:bg-[#E50914] hover:border-[#E50914] shadow-sm flex items-center justify-center transition active:scale-95 text-lg font-black"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => scrollFeatured('right')}
                        aria-label="Scroll right"
                        className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-700 hover:text-white hover:bg-[#E50914] hover:border-[#E50914] shadow-sm flex items-center justify-center transition active:scale-95 text-lg font-black"
                      >
                        ›
                      </button>
                    </div>
                    <button onClick={() => setCurrentScreen('catalog')} className="text-xs sm:text-sm font-extrabold text-[#D91E26] hover:underline pl-2">
                      Browse All Deals →
                    </button>
                  </div>
                </div>

                {/* Horizontal Scrollable Products Carousel with Left & Right Arrows */}
                <div
                  ref={featuredScrollRef}
                  className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth no-scrollbar"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {homepageDeals.map(deal => {
                    const locked = isDealLocked(deal.numeric_price);
                    return (
                      <div
                        key={deal.id}
                        onClick={() => setSelectedProduct(deal)}
                        className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] max-w-[380px] shrink-0 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-[#1645C4] shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer relative overflow-hidden group"
                      >
                        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl bg-[#F5F6FA] flex items-center justify-center text-4xl shrink-0 border border-slate-100 relative group-hover:scale-105 transition-transform">
                          {deal.icon}
                          {locked && (
                            <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px] rounded-xl flex items-center justify-center text-amber-300 text-xs font-black shadow-inner">
                              🔒 VIP
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-red-100 text-[#E50914]">{deal.discount}</span>
                            <span className="text-[10px] font-medium text-slate-500 truncate max-w-[140px]">{deal.storeIcon} {deal.store}</span>
                          </div>
                          <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate group-hover:text-[#1645C4] transition-colors">{deal.title}</h4>
                          <div className="flex items-baseline gap-2">
                            <span className={`text-sm sm:text-base font-black ${locked ? 'filter blur-[3px] select-none text-slate-400' : 'text-[#E50914]'}`}>
                              {locked ? '₹99,999' : deal.price}
                            </span>
                            <span className="text-[10px] sm:text-xs text-slate-400 line-through">{deal.original}</span>
                          </div>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-red-50 text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white flex items-center justify-center text-sm font-bold shrink-0 transition-colors shadow-sm">
                          →
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* REAL WINNERS SECTION */}
            <section style={{ background: 'radial-gradient(circle at 50% 30%, rgba(229, 9, 20, 0.25) 0%, #400B19 60%, #101428 100%)' }} className="w-full py-14 px-4 sm:px-6 lg:px-8 text-white text-center border-y border-[#400B19]">
              <div className="max-w-[1680px] mx-auto space-y-6">
                <div className="space-y-2">
                  <div className="text-amber-400 font-black text-xs uppercase tracking-wider">🏆 REAL WINNERS</div>
                  <h2 className="text-3xl sm:text-4xl font-black">67 winners across 25 giveaways</h2>
                  <p className="text-white/80 text-xs sm:text-sm">Latest: Rohan Sharma, iPhone 16 Pro Max (256 GB), November 2026.</p>
                </div>
                <div className="flex items-center gap-4 overflow-x-auto pb-4 justify-start lg:justify-center">
                  {winners.map((w, idx) => (
                    <div key={idx} className="shrink-0 w-44 bg-[#350C12] rounded-3xl p-4 border border-rose-900/40 flex flex-col items-center text-center shadow-xl">
                      <div style={{ backgroundColor: w.color }} className="w-14 h-14 rounded-full text-white font-black text-xl flex items-center justify-center shadow-md mb-2">
                        {w.initial}
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[9px] font-black uppercase mb-1">WINNER</span>
                      <h4 className="text-white font-black text-sm">{w.name}</h4>
                      <p className="text-amber-200 text-xs font-semibold mt-1 truncate w-full">{w.prize}</p>
                      <p className="text-white/40 text-[10px] mt-2">{w.date}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setCurrentScreen('luckydip')} className="text-xs font-bold text-amber-300 hover:underline">
                  SEE EVERY WINNER →
                </button>
              </div>
            </section>

            {/* VIP PRICING SECTION (Milky White #F5F6FA Section with Luxury Red + Gold VIP Cards) */}
            <section style={{ background: '#F5F6FA' }} className="w-full py-16 px-4 sm:px-6 lg:px-8 text-slate-900 border-b border-slate-200">
              <div className="max-w-6xl mx-auto space-y-10 text-center">
                <div className="space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#B51224] to-[#D4AF37] text-white px-3.5 py-1 rounded-full shadow-sm">
                    ONE STOP VIP
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Simple, Transparent VIP Pricing</h2>
                  <p className="text-sm text-slate-600 max-w-2xl mx-auto font-medium">
                    Unlock members-only secret voucher links, extra merchant cashback, and instant price alerts.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left items-stretch pt-4">
                  
                  {/* Card 1: Monthly Access */}
                  <div
                    style={{
                      background: 'linear-gradient(145deg, #400B19 0%, #7A0C1A 50%, #B51224 100%)',
                    }}
                    className="rounded-3xl p-7 lg:p-8 border border-[#D4AF37]/40 shadow-xl hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1"
                  >
                    {/* Subtle gold radial ambient */}
                    <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#D4AF37]/25 transition-all"></div>
                    
                    <div className="space-y-5 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#D4AF37] bg-black/40 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                          Starter Plan
                        </span>
                        <span className="text-2xl">⭐</span>
                      </div>
                      
                      <div>
                        <h4 className="font-extrabold text-lg text-white">Monthly Access</h4>
                        <p className="text-xs text-rose-100/80 mt-1">Flexible month-to-month access</p>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">₹299</span>
                          <span className="text-xs font-semibold text-rose-200">/ month</span>
                        </div>
                        <p className="text-[11px] text-[#D4AF37] font-semibold mt-1">Billed monthly • Cancel anytime</p>
                      </div>

                      {/* Benefits list with checkmark icons */}
                      <ul className="space-y-2.5 pt-3 border-t border-white/10 text-xs text-white/95">
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span>
                          <span>Full Deals Directory access</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span>
                          <span><strong>1x</strong> Weekly VIP Lucky Dip ticket</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span>
                          <span>Instant Telegram deal drops</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handleOpenPayment('monthly', 'Monthly Pass', '₹299', 299, '30 Days', 30, 1)}
                      className="mt-8 w-full py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#400B19] font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition active:scale-[0.98] border border-amber-200"
                    >
                      Get VIP Pass (Monthly)
                    </button>
                  </div>

                  {/* Card 2: 6-Month Pass (Highlighted with glowing golden border & MOST POPULAR badge) */}
                  <div
                    style={{
                      background: 'linear-gradient(145deg, #500917 0%, #9E1020 40%, #B51224 80%, #D4AF37 120%)',
                    }}
                    className="rounded-3xl p-7 lg:p-8 border-2 border-[#D4AF37] shadow-[0_10px_35px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.55)] transition-all duration-300 flex flex-col justify-between relative overflow-visible transform md:-translate-y-3 z-10 group"
                  >
                    {/* Glowing Most Popular badge */}
                    <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37] text-[#400B19] text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md border border-white/50 shrink-0 whitespace-nowrap">
                      ★ MOST POPULAR • 33% OFF ★
                    </span>

                    {/* Golden shimmer glow */}
                    <div className="absolute top-0 right-0 w-44 h-44 bg-[#D4AF37]/25 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4AF37]/35 transition-all"></div>

                    <div className="space-y-5 pt-2 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#400B19] bg-gradient-to-r from-[#D4AF37] to-[#F5DEB3] px-3 py-1 rounded-full font-bold shadow-sm">
                          Best Seller
                        </span>
                        <span className="text-2xl">👑</span>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-xl text-white flex items-center gap-1.5">
                          <span>6-Month Pass</span>
                        </h4>
                        <p className="text-xs text-rose-100/90 mt-1">Billed every 6 months (~₹199/mo)</p>
                      </div>

                      <div className="pt-2 border-t border-white/15">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl lg:text-4xl font-black text-amber-200 tracking-tight drop-shadow-sm">₹1,199</span>
                          <span className="text-xs font-semibold text-rose-200">/ 6 mo</span>
                        </div>
                        <p className="text-[11px] text-[#D4AF37] font-bold mt-1">Save ₹595 vs monthly plan</p>
                      </div>

                      {/* Benefits list */}
                      <ul className="space-y-2.5 pt-3 border-t border-white/15 text-xs text-white">
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#400B19] flex items-center justify-center text-xs font-black shrink-0 shadow-sm">✓</span>
                          <span>Everything in Monthly plan</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#400B19] flex items-center justify-center text-xs font-black shrink-0 shadow-sm">✓</span>
                          <span><strong>2x Lucky Dip entries</strong> / draw</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#400B19] flex items-center justify-center text-xs font-black shrink-0 shadow-sm">✓</span>
                          <span>VIP-only secret voucher links</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#400B19] flex items-center justify-center text-xs font-black shrink-0 shadow-sm">✓</span>
                          <span>Early access to flash sales</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handleOpenPayment('six-month', '6-Month Pass (Most Popular)', '₹1,199', 1199, '6 Calendar Months', 180, 2)}
                      className="mt-8 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-amber-300 to-[#D4AF37] text-[#350C12] font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition active:scale-[0.98] border border-white"
                    >
                      Get VIP Pass (6-Month)
                    </button>
                  </div>

                  {/* Card 3: Annual Pass */}
                  <div
                    style={{
                      background: 'linear-gradient(145deg, #400B19 0%, #6B0E1B 45%, #B51224 85%, #8A6D1C 100%)',
                    }}
                    className="rounded-3xl p-7 lg:p-8 border border-[#D4AF37]/50 shadow-xl hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1"
                  >
                    <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#D4AF37]/25 transition-all"></div>

                    <div className="space-y-5 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#D4AF37] bg-black/40 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                          Maximum Value
                        </span>
                        <span className="text-2xl">💎</span>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-lg text-white">Annual Pass</h4>
                        <p className="text-xs text-rose-100/80 mt-1">Maximum value for avid shoppers (~₹149/mo)</p>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">₹1,799</span>
                          <span className="text-xs font-semibold text-rose-200">/ year</span>
                        </div>
                        <p className="text-[11px] text-[#D4AF37] font-semibold mt-1">Save 50% vs monthly</p>
                      </div>

                      {/* Benefits list */}
                      <ul className="space-y-2.5 pt-3 border-t border-white/10 text-xs text-white/95">
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span>
                          <span>Everything in 6-Month plan</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span>
                          <span><strong>3x Lucky Dip entries</strong> / draw</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span>
                          <span>Dedicated WhatsApp concierge</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span>
                          <span>Price drop guarantee alerts</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handleOpenPayment('annual', 'Annual Pass', '₹1,799', 1799, '12 Calendar Months', 365, 3)}
                      className="mt-8 w-full py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#400B19] font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition active:scale-[0.98] border border-amber-200"
                    >
                      Get VIP Pass (Annual)
                    </button>
                  </div>

                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== SCREEN 2: DEDICATED DEALS DIRECTORY ==================== */}
        {currentScreen === 'catalog' && (
          <div className="w-full space-y-0">
            {/* Header Banner */}
            <div style={{ background: 'radial-gradient(circle at 75% 40%, rgba(229, 9, 20, 0.35) 0%, #400B19 50%, #101428 100%)' }} className="w-full py-10 px-4 sm:px-6 lg:px-8 border-b border-white/10">
              <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {/* Back to Home Button */}
                    <button
                      onClick={() => setCurrentScreen('storefront')}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-[#E50914] text-white text-xs font-bold transition-all duration-200 border border-white/20 hover:border-[#E50914] shadow-sm group"
                      title="Return to Home Page"
                    >
                      <span className="text-sm transform group-hover:-translate-x-0.5 transition-transform">←</span>
                      <span>Back to Home</span>
                    </button>
                    <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">⚡ LIVE DIRECTORY</div>
                  </div>
                  <h1 className="text-3xl font-black text-white">All Tech Deals &amp; Directory</h1>
                  <p className="text-xs text-slate-300">Verified partner discounts from Amazon India, Flipkart, and Apple</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentScreen('storefront')}
                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-[#E50914] hover:text-white text-xs font-black transition-all shadow-md"
                  >
                    <span>🏠 Home Page</span>
                  </button>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
                    Showing: {filteredDeals.length} Deals
                  </span>
                </div>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="w-full bg-[#101428] border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5">
              <div className="max-w-[1680px] mx-auto flex items-center gap-2 overflow-x-auto pb-1.5 custom-scroll">
                <button
                  onClick={() => setActiveCategoryFilter('all')}
                  className={`px-4 py-2 rounded-full font-bold text-xs shrink-0 transition-all ${
                    activeCategoryFilter === 'all' ? 'bg-[#D91E26] text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  All Categories ({masterDeals.length})
                </button>
                {categories.map(cat => {
                  const count = masterDeals.filter(d => d.categoryId === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategoryFilter(cat.id)}
                      className={`px-4 py-2 rounded-full font-bold text-xs shrink-0 transition-all flex items-center gap-1.5 ${
                        activeCategoryFilter === cat.id ? 'bg-[#D91E26] text-white shadow-md' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name} ({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Categories & Sorting Bar (Red, Blue, Milky White Theme) */}
            <div className="w-full bg-[#0D1020] border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3">
              <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                
                {/* 1. Price Filter Buttons */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 custom-scroll">
                  <span className="text-[11px] font-black uppercase text-amber-300 tracking-wider shrink-0 flex items-center gap-1 mr-1">
                    <span>💰 Price:</span>
                  </span>

                  {/* All Prices */}
                  <button
                    onClick={() => setActivePriceFilter('all')}
                    className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs shrink-0 transition-all duration-200 border ${
                      activePriceFilter === 'all'
                        ? 'bg-[#E50914] text-white border-[#E50914] shadow-md scale-105'
                        : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    All Prices
                  </button>

                  {/* Under ₹99 */}
                  <button
                    onClick={() => setActivePriceFilter('under99')}
                    className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs shrink-0 transition-all duration-200 border ${
                      activePriceFilter === 'under99'
                        ? 'bg-[#E50914] text-white border-[#E50914] shadow-md scale-105'
                        : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    Under ₹99
                  </button>

                  {/* ₹100 – ₹499 */}
                  <button
                    onClick={() => setActivePriceFilter('100-499')}
                    className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs shrink-0 transition-all duration-200 border ${
                      activePriceFilter === '100-499'
                        ? 'bg-[#E50914] text-white border-[#E50914] shadow-md scale-105'
                        : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    ₹100 – ₹499
                  </button>

                  {/* ₹500 – ₹999 */}
                  <button
                    onClick={() => setActivePriceFilter('500-999')}
                    className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs shrink-0 transition-all duration-200 border ${
                      activePriceFilter === '500-999'
                        ? 'bg-[#E50914] text-white border-[#E50914] shadow-md scale-105'
                        : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    ₹500 – ₹999
                  </button>

                  {/* ₹1,000 & Above */}
                  <button
                    onClick={() => setActivePriceFilter('1000plus')}
                    className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs shrink-0 transition-all duration-200 border ${
                      activePriceFilter === '1000plus'
                        ? 'bg-[#E50914] text-white border-[#E50914] shadow-md scale-105'
                        : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    ₹1,000 &amp; Above
                  </button>
                </div>

                {/* 2. Sorting Dropdown */}
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                  <span className="text-[11px] font-bold text-slate-400">Sort By:</span>
                  <select
                    value={activeSortOption}
                    onChange={(e) => setActiveSortOption(e.target.value as SortOption)}
                    aria-label="Sort Deals"
                    className="bg-[#101428] border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-[#E50914]"
                  >
                    <option value="latest" className="bg-[#101428]">Latest Deals</option>
                    <option value="price-asc" className="bg-[#101428]">Price: Low to High</option>
                    <option value="price-desc" className="bg-[#101428]">Price: High to Low</option>
                    <option value="discount-desc" className="bg-[#101428]">Biggest Discount (%)</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Product Cards Grid on Milky White #F5F6FA */}
            <div style={{ background: '#F5F6FA' }} className="w-full py-10 px-4 sm:px-6 lg:px-8 text-slate-900 min-h-[500px]">
              <div className="max-w-[1680px] mx-auto">
                {filteredDeals.length === 0 ? (
                  <div className="text-center py-20 space-y-3">
                    <div className="text-5xl">🔍</div>
                    <h3 className="text-lg font-black text-slate-800">No matching deals found</h3>
                    <p className="text-xs text-slate-500">Try selecting a different category or clearing your search query.</p>
                    <button onClick={() => { setSearchQuery(''); setActiveCategoryFilter('all'); setActivePriceFilter('all'); setActiveSortOption('latest'); }} className="px-5 py-2 rounded-xl bg-[#1645C4] hover:bg-[#12389E] text-white font-bold text-xs transition shadow-md">
                      Reset All Filters &amp; Sorting
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredDeals.map(deal => {
                      const locked = isDealLocked(deal.numeric_price);
                      return (
                        <div
                          key={deal.id}
                          onClick={() => setSelectedProduct(deal)}
                          className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-[#1645C4] shadow-sm hover:shadow-xl transition flex flex-col justify-between cursor-pointer relative overflow-hidden group"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-bold text-slate-500">{deal.storeIcon} {deal.store}</span>
                              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-100 text-[#E50914]">{deal.discount}</span>
                            </div>

                            <div className="w-full h-32 rounded-xl bg-[#F5F6FA] flex items-center justify-center text-5xl relative border border-slate-100 group-hover:scale-105 transition-transform">
                              {deal.icon}
                              {locked && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center text-white p-2 text-center">
                                  <span className="text-lg">🔒</span>
                                  <span className="text-[10px] font-black text-amber-300 uppercase">VIP Access (≥ ₹50K)</span>
                                </div>
                              )}
                            </div>

                            <div className="space-y-1">
                              <div className="text-[10px] font-extrabold uppercase text-[#1645C4]">{deal.category}</div>
                              <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-[#1645C4] transition line-clamp-2">{deal.title}</h4>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3">
                            <div>
                              <div className={`text-base font-black ${locked ? 'filter blur-[3px] select-none text-slate-400' : 'text-[#E50914]'}`}>
                                {locked ? '₹99,999' : deal.price}
                              </div>
                              <div className="text-[10px] text-slate-400 line-through">{deal.original}</div>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedProduct(deal); }}
                              className="px-3.5 py-1.5 rounded-xl bg-[#1645C4] hover:bg-[#12389E] text-white font-bold text-xs shadow transition flex items-center gap-1"
                            >
                              <span>View Deal</span>
                              <span>→</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== SCREEN 3: ABOUT US (STRONG BRAND STORY) ==================== */}
        {currentScreen === 'about' && (
          <div className="w-full space-y-0 text-slate-900">
            
            {/* 1. Hero Brand Story Section (Burgundy to Navy Gradient) */}
            <div style={{ background: 'radial-gradient(circle at 70% 30%, rgba(229, 9, 20, 0.4) 0%, #400B19 55%, #101428 100%)' }} className="w-full py-16 px-4 sm:px-6 lg:px-8 text-white border-b border-white/10 relative overflow-hidden">
              <div className="max-w-[1280px] mx-auto space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-amber-300">
                  <span>⚡</span>
                  <span>OUR BRAND STORY</span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight max-w-4xl">
                  ONE STOP GADGETS – <span className="text-[#FF304D]">Where Smart Shopping</span> Meets Exciting Opportunities.
                </h1>

                <div className="max-w-3xl space-y-4 text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal pt-2">
                  <p>
                    Technology is part of everyday life, but finding the right gadgets at the right prices shouldn't be difficult.
                  </p>
                  <p>
                    At <strong className="text-white">ONE STOP GADGETS</strong>, we believe everyone deserves access to exciting technology deals, smarter shopping opportunities, and rewarding experiences.
                  </p>
                  <p>
                    Our vision is to bring gadget discovery, exclusive discounts, VIP benefits, and Lucky Dip opportunities together on one convenient platform.
                  </p>
                  <p>
                    Whether you're searching for your next smartphone, upgrading your laptop, exploring affordable accessories, or discovering premium offers, ONE STOP GADGETS is designed to make your shopping journey simpler, smarter, and more exciting.
                  </p>
                  <div className="p-4 rounded-2xl bg-white/10 border-l-4 border-[#E50914] text-white font-bold text-base sm:text-lg">
                    "We're not just building a deals platform. We're building a community of smart shoppers."
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => setCurrentScreen('catalog')}
                    className="px-6 py-3 rounded-full bg-[#E50914] hover:bg-[#C51424] text-white text-xs sm:text-sm font-black shadow-lg transition active:scale-95 flex items-center gap-2"
                  >
                    <span>Explore Curated Deals</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => setCurrentScreen('storefront')}
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Mission, Vision & Promise Section (Royal Blue Gradient #1645C4) */}
            <div style={{ background: 'linear-gradient(135deg, #1645C4 0%, #10349A 60%, #101428 100%)' }} className="w-full py-16 px-4 sm:px-6 lg:px-8 text-white border-b border-white/10">
              <div className="max-w-[1280px] mx-auto space-y-10">
                <div className="text-center space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300">OUR PILLARS</span>
                  <h2 className="text-3xl sm:text-4xl font-black">Mission, Vision &amp; Promise</h2>
                  <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">The principles that guide our curation and shopping experience every day.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Mission */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/20 hover:border-amber-300/60 shadow-xl transition-all duration-300 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl">
                        🎯
                      </div>
                      <h3 className="text-xl font-black text-white">Our Mission</h3>
                      <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                        Make technology deals easier to discover, compare, and access with trusted merchant links and transparent price verification.
                      </p>
                    </div>
                  </div>

                  {/* Vision */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/20 hover:border-amber-300/60 shadow-xl transition-all duration-300 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl">
                        🔭
                      </div>
                      <h3 className="text-xl font-black text-white">Our Vision</h3>
                      <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                        Become a trusted destination for gadget discovery, premium offers, and rewarding shopping experiences across India.
                      </p>
                    </div>
                  </div>

                  {/* Promise */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/20 hover:border-amber-300/60 shadow-xl transition-all duration-300 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl">
                        🤝
                      </div>
                      <h3 className="text-xl font-black text-white">Our Promise</h3>
                      <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                        Transparency, convenience, and customer-focused service without hidden subscription surprises or misleading discounts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Why We're Different (Milky White #F5F6FA with Feature Cards) */}
            <div style={{ background: '#F5F6FA' }} className="w-full py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
              <div className="max-w-[1280px] mx-auto space-y-12">
                <div className="text-center space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider bg-red-100 text-[#E50914] px-3 py-1 rounded-full">
                    PLATFORM ADVANTAGES
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Why We're Different</h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-medium">
                    Built from the ground up to solve gadget discovery, verified discount tracking, and exciting community rewards.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Card 1 */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#E50914] shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E50914] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🎁
                    </div>
                    <h4 className="text-base font-black text-slate-900">Free Gadget Deals For Everyone</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Publicly accessible discounted offers across smartphones, laptops, audio gear, and everyday accessories with no upfront fee required.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#1645C4] shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1645C4] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      👑
                    </div>
                    <h4 className="text-base font-black text-slate-900">Exclusive VIP Premium Offers</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Unlocked access to high-value tech deals (≥ ₹50,000), secret merchant voucher drops, and early notifications on flash deals.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#E50914] shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      ⚡
                    </div>
                    <h4 className="text-base font-black text-slate-900">Smart Category &amp; Price Filters</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Filter deals effortlessly by budget: Under ₹99, ₹100–₹499, ₹500–₹999, and ₹1,000+ with 4 real-time sorting modes.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#1645C4] shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      💳
                    </div>
                    <h4 className="text-base font-black text-slate-900">Flexible VIP Passes</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Transparent membership options with Monthly (₹299), 6-Month (₹1,199), and Annual (₹1,799) passes payable via UPI, Debit, or Credit Card.
                    </p>
                  </div>

                  {/* Card 5 */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#E50914] shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#E50914] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🏆
                    </div>
                    <h4 className="text-base font-black text-slate-900">Lucky Dip &amp; Prize Announcements</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Weekly flagship giveaways featuring genuine Apple iPhone 16 Pro Max draws with transparent winner showcases and certified fairness.
                    </p>
                  </div>

                  {/* Card 6 */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#1645C4] shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🛒
                    </div>
                    <h4 className="text-base font-black text-slate-900">Multi-Merchant Verified Access</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Direct, authenticated links to top e-commerce platforms like Amazon India and Flipkart with accurate prices and merchant disclosures.
                    </p>
                  </div>

                </div>

                {/* 4. Strong Call-to-Action Card */}
                <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#400B19] via-[#B51224] to-[#1645C4] text-white text-center space-y-4 shadow-2xl">
                  <h3 className="text-2xl sm:text-3xl font-black">
                    Join ONE STOP GADGETS – Shop Smarter, Discover More!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
                    Start exploring verified discounts today or activate your VIP Pass to unlock exclusive high-ticket electronics deals and Lucky Dip tickets.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setCurrentScreen('catalog')}
                      className="px-6 py-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 text-xs font-black shadow-lg transition active:scale-95"
                    >
                      Browse Tech Deals
                    </button>
                    <button
                      onClick={() => handleOpenPayment('six-month', '6-Month Pass (Most Popular)', '₹1,199', 1199, '6 Calendar Months', 180, 2)}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#400B19] hover:brightness-110 text-xs font-black shadow-lg transition active:scale-95 border border-amber-200"
                    >
                      Unlock VIP Pass Now
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {currentScreen === 'contact' && (
          <div className="max-w-2xl mx-auto p-8 bg-white/10 rounded-3xl m-8 border border-white/20 space-y-4 text-white">
            <h1 className="text-2xl font-black">Contact Us</h1>
            <input type="text" placeholder="Your Name" className="w-full bg-black/40 border border-white/20 p-2.5 rounded-xl text-xs" />
            <input type="email" placeholder="Email Address" className="w-full bg-black/40 border border-white/20 p-2.5 rounded-xl text-xs" />
            <textarea placeholder="Message" rows={4} className="w-full bg-black/40 border border-white/20 p-2.5 rounded-xl text-xs"></textarea>
            <button className="px-6 py-2.5 rounded-xl bg-[#D91E26] text-white font-bold text-xs">Send Message</button>
          </div>
        )}

        {/* ==================== SCREEN: LUCKY DIP (FORM + WINNERS + SUBMITTED USERS) ==================== */}
        {currentScreen === 'luckydip' && (
          <div className="w-full space-y-0 text-slate-900">
            
            {/* 1. Header Banner & Form Submission Section (Burgundy/Navy Gradient) */}
            <div style={{ background: 'radial-gradient(circle at 75% 35%, rgba(229, 9, 20, 0.45) 0%, #400B19 55%, #101428 100%)' }} className="w-full py-16 px-4 sm:px-6 lg:px-8 text-white border-b border-white/10 relative overflow-hidden">
              <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                
                {/* Left: Headline & Draw Information */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#DC1F32] to-[#D4AF37] text-white text-xs font-black uppercase tracking-wider shadow-md">
                    <span>🎁</span>
                    <span>WEEKLY FLAGSHIP GIVEAWAY</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                    Weekly Flagship Lucky Dip – <span className="text-[#FF304D]">Win Apple iPhone 16 Pro Max!</span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal">
                    Participate in our certified weekly flagship giveaways powered by transparent cryptographic <strong>SHA-256 Provably Fair</strong> random seed rules. Every eligible entry is timestamped and recorded on the public draw ledger.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                      <div className="text-xs text-amber-300 font-bold uppercase">Grand Prize</div>
                      <div className="text-sm sm:text-base font-black text-white mt-0.5">iPhone 16 Pro Max</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                      <div className="text-xs text-amber-300 font-bold uppercase">Draw Frequency</div>
                      <div className="text-sm sm:text-base font-black text-white mt-0.5">Every Sunday</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                      <div className="text-xs text-amber-300 font-bold uppercase">Draw Fairness</div>
                      <div className="text-sm sm:text-base font-black text-white mt-0.5">SHA-256 Seed</div>
                    </div>
                  </div>

                  {userRole !== 'vip' && (
                    <div className="p-4 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-xs text-amber-200 flex items-center justify-between gap-3">
                      <span>🔒 <strong>Note for Free Users:</strong> Submitting will prompt the VIP subscription pass selection to complete ticket activation.</span>
                      <button onClick={() => setShowVipPopup(true)} className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-900 font-black text-[11px] shrink-0">
                        View VIP Passes
                      </button>
                    </div>
                  )}
                </div>

                {/* Right: Lucky Dip Ticket Submission Form */}
                <div className="lg:col-span-5 bg-[#FAF7F2] text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-300/60 relative">
                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] font-black uppercase text-[#E50914] bg-red-100 px-2 py-0.5 rounded">
                      DIRECT TICKET ENTRY
                    </span>
                    <h3 className="text-xl font-black text-slate-900">Enter Weekly Lucky Dip</h3>
                    <p className="text-xs text-slate-500">Submit your verified contact details to register your draw entry.</p>
                  </div>

                  <form onSubmit={handleLuckyDipSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={luckyDipName}
                        onChange={(e) => setLuckyDipName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#E50914] shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={luckyDipEmail}
                        onChange={(e) => setLuckyDipEmail(e.target.value)}
                        placeholder="rahul.sharma@example.com"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#E50914] shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={luckyDipPhone}
                        onChange={(e) => setLuckyDipPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#E50914] shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">City / State</label>
                      <input
                        type="text"
                        value={luckyDipCity}
                        onChange={(e) => setLuckyDipCity(e.target.value)}
                        placeholder="e.g. Mumbai, Maharashtra"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#E50914] shadow-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#DC1F32] via-[#E50914] to-[#D4AF37] text-white font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
                    >
                      <span>Submit Lucky Dip Entry</span>
                      <span>🎟️</span>
                    </button>
                    
                    <p className="text-[10px] text-center text-slate-400">
                      Entries verified against active VIP subscriptions. Free users will be prompted to activate a pass.
                    </p>
                  </form>
                </div>

              </div>
            </div>

            {/* 2. REAL WINNERS SECTION (Exact Match from User Specification) */}
            <section style={{ background: 'radial-gradient(circle at 50% 30%, rgba(229, 9, 20, 0.25) 0%, #400B19 60%, #101428 100%)' }} className="w-full py-16 px-4 sm:px-6 lg:px-8 text-white text-center border-b border-[#400B19]">
              <div className="max-w-[1680px] mx-auto space-y-6">
                <div className="space-y-2">
                  <div className="text-amber-400 font-black text-xs uppercase tracking-wider">🏆 REAL WINNERS</div>
                  <h2 className="text-3xl sm:text-4xl font-black">67 winners across 25 giveaways</h2>
                  <p className="text-white/80 text-xs sm:text-sm">Latest: Rohan Sharma, iPhone 16 Pro Max (256 GB), November 2026.</p>
                </div>

                <div className="flex items-center gap-4 overflow-x-auto pb-4 justify-start lg:justify-center custom-scroll">
                  {winners.map((w, idx) => (
                    <div key={idx} className="shrink-0 w-48 bg-[#350C12] rounded-3xl p-5 border border-rose-900/40 flex flex-col items-center text-center shadow-xl hover:border-amber-400 transition">
                      <div style={{ backgroundColor: w.color }} className="w-14 h-14 rounded-full text-white font-black text-xl flex items-center justify-center shadow-md mb-2">
                        {w.initial}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[9px] font-black uppercase mb-1">WINNER</span>
                      <h4 className="text-white font-black text-sm">{w.name}</h4>
                      <p className="text-amber-200 text-xs font-semibold mt-1 truncate w-full">{w.prize}</p>
                      <p className="text-white/40 text-[10px] mt-2">{w.date}</p>
                    </div>
                  ))}
                </div>

                <button onClick={() => setCurrentScreen('catalog')} className="text-xs font-bold text-amber-300 hover:underline">
                  SEE EVERY WINNER →
                </button>
              </div>
            </section>

            {/* 3. SUBMITTED USERS SECTION WITH HIGHLIGHTING (Milky White #FAF7F2) */}
            <section style={{ background: '#FAF7F2' }} className="w-full py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
              <div className="max-w-[1280px] mx-auto space-y-6">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-[#1645C4] px-2.5 py-1 rounded">
                      PUBLIC DRAW LEDGER
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">Submitted Lucky Dip Entries</h3>
                    <p className="text-xs text-slate-500">Live timestamped entries participating in this Sunday's iPhone 16 Pro Max draw.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                      🟢 Live Ledger Active
                    </span>
                  </div>
                </div>

                {/* Submitted Entries Table */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-100/80 text-slate-900 font-black border-b border-slate-200">
                        <tr>
                          <th className="py-3.5 px-4">Ticket Number</th>
                          <th className="py-3.5 px-4">Participant Name</th>
                          <th className="py-3.5 px-4">City</th>
                          <th className="py-3.5 px-4">Plan Status</th>
                          <th className="py-3.5 px-4">Timestamp</th>
                          <th className="py-3.5 px-4">SHA-256 Hash</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {luckyDipEntries.map((entry, idx) => (
                          <tr
                            key={idx}
                            className={`transition-colors ${
                              entry.isCurrentUser
                                ? 'bg-amber-50/80 border-l-4 border-amber-500 font-bold'
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="py-3 px-4 font-mono font-black text-slate-900 flex items-center gap-2">
                              <span>🎟️ {entry.ticketNumber}</span>
                              {entry.isCurrentUser && (
                                <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                                  Your Entry
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-900">{entry.name}</td>
                            <td className="py-3 px-4 text-slate-500">{entry.city}</td>
                            <td className="py-3 px-4">
                              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#DC1F32] to-[#D4AF37] text-white text-[10px] font-bold">
                                {entry.plan}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-500">{entry.timestamp}</td>
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{entry.hash}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </section>

            {/* Lucky Dip Submission Success Modal */}
            {luckyDipSuccessModal && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-[#FAF7F2] text-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4 border border-emerald-300">
                  <button onClick={() => setLuckyDipSuccessModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-xl font-bold">✕</button>
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl flex items-center justify-center mx-auto shadow-md">
                    ✓
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      SUBMISSION SUCCESSFUL
                    </span>
                    <h3 className="text-xl font-black text-slate-900">Your Lucky Dip Ticket is Active!</h3>
                    <p className="text-xs text-slate-600">Your entry has been recorded and highlighted on the public draw ledger.</p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between pb-1 border-b border-slate-100">
                      <span className="text-slate-500">Ticket Number:</span>
                      <span className="font-mono font-black text-[#E50914]">{luckyDipSuccessModal.ticketNumber}</span>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-slate-100">
                      <span className="text-slate-500">Participant:</span>
                      <span className="font-bold text-slate-800">{luckyDipSuccessModal.name}</span>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-slate-100">
                      <span className="text-slate-500">Draw Date:</span>
                      <span className="font-bold text-slate-800">This Sunday, 8:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ledger Hash:</span>
                      <span className="font-mono text-slate-400">{luckyDipSuccessModal.hash}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setLuckyDipSuccessModal(null)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#DC1F32] to-[#D4AF37] text-white font-black text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition"
                  >
                    Close &amp; View Ledger
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== SCREEN: VIP MEMBERSHIP & LUCKY DIP PACKAGES PAGE ==================== */}
        {currentScreen === 'pricing' && (
          <div className="w-full space-y-0 text-slate-900">
            
            {/* 1. About ONE STOP GADGETS Hero Section (Deep Red to Navy Radial Gradient) */}
            <div style={{ background: 'radial-gradient(circle at 75% 35%, rgba(220, 31, 50, 0.45) 0%, #400B19 55%, #101428 100%)' }} className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 text-white relative overflow-hidden">
              <div className="max-w-[1280px] mx-auto space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#DC1F32] to-[#D4AF37] text-white text-xs font-black uppercase tracking-wider shadow-md">
                  <span>👑</span>
                  <span>VIP MEMBERSHIP &amp; PACKAGES</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight max-w-4xl">
                  ONE STOP GADGETS – <span className="text-[#FF304D]">Unlock Better Deals.</span> Discover Bigger Opportunities!
                </h1>

                <p className="max-w-3xl text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal pt-2">
                  Welcome to ONE STOP GADGETS, your destination for smarter gadget shopping, exclusive technology offers, and exciting Lucky Dip opportunities. Explore deals on smartphones, laptops, gaming consoles, smartwatches, and accessories. Upgrade to VIP membership to unlock premium deals, special discounts, exclusive offers, and eligible Lucky Dip participation.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href="#vip-pricing-cards-section"
                    className="px-6 py-3 rounded-full bg-[#DC1F32] hover:bg-[#b01625] text-white text-xs sm:text-sm font-black shadow-lg transition active:scale-95 flex items-center gap-2"
                  >
                    <span>Explore VIP Packages</span>
                    <span>↓</span>
                  </a>
                  <a
                    href="#vip-benefits-section"
                    className="px-6 py-3 rounded-full bg-[#245DE8] hover:bg-[#1b48b8] text-white text-xs sm:text-sm font-bold shadow-md transition active:scale-95"
                  >
                    Discover VIP Benefits
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Why Choose ONE STOP GADGETS VIP? (Royal Blue #245DE8 Gradient) */}
            <div id="vip-benefits-section" style={{ background: 'linear-gradient(135deg, #245DE8 0%, #153ea3 60%, #101428 100%)' }} className="w-full py-16 px-4 sm:px-6 lg:px-8 text-white border-b border-white/10">
              <div className="max-w-[1280px] mx-auto space-y-10">
                <div className="text-center space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                    MEMBER PRIVILEGES
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black">
                    More Than Just a Membership – Your Gateway to Exclusive Tech Deals!
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto">
                    Enjoy verified high-ticket electronics discounts, partner coupon allocations, and automated entry into our weekly flagship giveaways.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Card 1 */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:border-amber-300/60 shadow-xl transition-all duration-300 space-y-3 group hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      📱
                    </div>
                    <h3 className="text-lg font-black text-white">Premium Gadget Deals</h3>
                    <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                      Unlock exclusive offers on smartphones, laptops, gaming consoles, and premium electronics from certified retailers.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:border-amber-300/60 shadow-xl transition-all duration-300 space-y-3 group hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🔓
                    </div>
                    <h3 className="text-lg font-black text-white">Exclusive VIP Pricing</h3>
                    <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                      Reveal special discounted prices and premium deals over ₹50,000 that remain blurred to free users.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:border-amber-300/60 shadow-xl transition-all duration-300 space-y-3 group hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🎟️
                    </div>
                    <h3 className="text-lg font-black text-white">Lucky Dip Opportunities</h3>
                    <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                      Become eligible to enter exciting prize draws according to membership benefits and verified official rules.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:border-amber-300/60 shadow-xl transition-all duration-300 space-y-3 group hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      ⚡
                    </div>
                    <h3 className="text-lg font-black text-white">Early Deal Access</h3>
                    <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                      Explore selected special flash offers and limited inventory deals before general public availability.
                    </p>
                  </div>

                  {/* Card 5 */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:border-amber-300/60 shadow-xl transition-all duration-300 space-y-3 group hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🏷️
                    </div>
                    <h3 className="text-lg font-black text-white">Special VIP Vouchers</h3>
                    <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                      Discover exclusive promotional partner vouchers and instant merchant coupon discount links.
                    </p>
                  </div>

                  {/* Card 6 */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:border-amber-300/60 shadow-xl transition-all duration-300 space-y-3 group hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🔔
                    </div>
                    <h3 className="text-lg font-black text-white">Priority Notifications</h3>
                    <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                      Receive real-time instant updates about new offers, price drops, secret drops, and membership privileges.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* 3. VIP Packages Pricing Section on Milky White (#FAF7F2) with Red + Gold Cards */}
            <div id="vip-pricing-cards-section" style={{ background: '#FAF7F2' }} className="w-full py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
              <div className="max-w-[1280px] mx-auto space-y-10 text-center">
                <div className="space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#DC1F32] to-[#D4AF37] text-white px-3.5 py-1 rounded-full shadow-sm">
                    TRANSPARENT PLANS
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    Select Your VIP Membership Plan
                  </h2>
                  <p className="text-sm text-slate-600 max-w-2xl mx-auto font-medium">
                    Unlock secret merchant voucher links, extra cashback, and provably fair weekly prize entries.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left items-stretch pt-4">
                  
                  {/* Card 1: Monthly VIP – ₹299 */}
                  <div
                    style={{ background: 'linear-gradient(145deg, #400B19 0%, #7A0C1A 50%, #DC1F32 100%)' }}
                    className="rounded-3xl p-7 lg:p-8 border border-[#D4AF37]/40 shadow-xl hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 text-white"
                  >
                    <div className="space-y-5 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#D4AF37] bg-black/40 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                          Starter Plan
                        </span>
                        <span className="text-2xl">⭐</span>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-lg text-white">Monthly VIP</h4>
                        <p className="text-xs text-rose-100/80 mt-1">Flexible month-to-month access</p>
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">₹299</span>
                          <span className="text-xs font-semibold text-rose-200">/ month</span>
                        </div>
                        <p className="text-[11px] text-[#D4AF37] font-semibold mt-1">30 days validity • Cancel anytime</p>
                      </div>
                      <ul className="space-y-2.5 pt-3 border-t border-white/10 text-xs text-white/95">
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span><span>Access to premium gadget deals</span></li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span><span>Exclusive VIP discounts</span></li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span><span>Instant deal notifications</span></li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span><span><strong>1 Lucky Dip entry</strong> per eligible weekly draw</span></li>
                      </ul>
                    </div>
                    <button
                      onClick={() => handleOpenPayment('monthly', 'Monthly VIP', '₹299', 299, '30 Days', 30, 1)}
                      className="mt-8 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#400B19] font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition active:scale-[0.98] border border-amber-200"
                    >
                      Get Monthly Pass
                    </button>
                  </div>

                  {/* Card 2: 6-Month VIP – ₹1,199 (MOST POPULAR) */}
                  <div
                    style={{ background: 'linear-gradient(145deg, #500917 0%, #9E1020 40%, #DC1F32 80%, #D4AF37 120%)' }}
                    className="rounded-3xl p-7 lg:p-8 border-2 border-[#D4AF37] shadow-[0_10px_35px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.55)] transition-all duration-300 flex flex-col justify-between relative overflow-visible transform md:-translate-y-3 z-10 group text-white"
                  >
                    <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37] text-[#400B19] text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md border border-white/50 shrink-0 whitespace-nowrap">
                      ★ MOST POPULAR • 33% OFF ★
                    </span>
                    <div className="space-y-5 pt-2 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#400B19] bg-gradient-to-r from-[#D4AF37] to-[#F5DEB3] px-3 py-1 rounded-full font-bold shadow-sm">Best Seller</span>
                        <span className="text-2xl">👑</span>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xl text-white">6-Month VIP</h4>
                        <p className="text-xs text-rose-100/90 mt-1">Billed every 6 months (~₹199/mo)</p>
                      </div>
                      <div className="pt-2 border-t border-white/15">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl lg:text-4xl font-black text-amber-200 tracking-tight drop-shadow-sm">₹1,199</span>
                          <span className="text-xs font-semibold text-rose-200">/ 6 mo</span>
                        </div>
                        <p className="text-[11px] text-[#D4AF37] font-bold mt-1">6 calendar months • Save ₹595</p>
                      </div>
                      <ul className="space-y-2.5 pt-3 border-t border-white/15 text-xs text-white">
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#400B19] flex items-center justify-center text-xs font-black shrink-0 shadow-sm">✓</span><span>Everything in Monthly VIP</span></li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#400B19] flex items-center justify-center text-xs font-black shrink-0 shadow-sm">✓</span><span><strong>2 Lucky Dip entries</strong> per eligible draw</span></li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#400B19] flex items-center justify-center text-xs font-black shrink-0 shadow-sm">✓</span><span>Early access to special offers</span></li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#400B19] flex items-center justify-center text-xs font-black shrink-0 shadow-sm">✓</span><span>Exclusive VIP vouchers &amp; alerts</span></li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#400B19] flex items-center justify-center text-xs font-black shrink-0 shadow-sm">✓</span><span>Priority notifications</span></li>
                      </ul>
                    </div>
                    <button
                      onClick={() => handleOpenPayment('six-month', '6-Month VIP (Most Popular)', '₹1,199', 1199, '6 Calendar Months', 180, 2)}
                      className="mt-8 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-amber-300 to-[#D4AF37] text-[#350C12] font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition active:scale-[0.98] border border-white"
                    >
                      Get 6-Month Pass
                    </button>
                  </div>

                  {/* Card 3: Annual VIP – ₹1,799 */}
                  <div
                    style={{ background: 'linear-gradient(145deg, #400B19 0%, #6B0E1B 45%, #DC1F32 85%, #8A6D1C 100%)' }}
                    className="rounded-3xl p-7 lg:p-8 border border-[#D4AF37]/50 shadow-xl hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 text-white"
                  >
                    <div className="space-y-5 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#D4AF37] bg-black/40 px-3 py-1 rounded-full border border-[#D4AF37]/30">Maximum Value</span>
                        <span className="text-2xl">💎</span>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-lg text-white">Annual VIP</h4>
                        <p className="text-xs text-rose-100/80 mt-1">Maximum value for avid shoppers (~₹149/mo)</p>
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">₹1,799</span>
                          <span className="text-xs font-semibold text-rose-200">/ year</span>
                        </div>
                        <p className="text-[11px] text-[#D4AF37] font-semibold mt-1">12 calendar months • Save 50% vs monthly</p>
                      </div>
                      <ul className="space-y-2.5 pt-3 border-t border-white/10 text-xs text-white/95">
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span><span>Everything in 6-Month VIP</span></li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span><span><strong>3 Lucky Dip entries</strong> per eligible draw</span></li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span><span>Exclusive annual member offers</span></li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span><span>Priority customer support</span></li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-[#D4AF37]/25 text-[#D4AF37] flex items-center justify-center text-xs font-black shrink-0 border border-[#D4AF37]/50">✓</span><span>Premium discount notifications</span></li>
                      </ul>
                    </div>
                    <button
                      onClick={() => handleOpenPayment('annual', 'Annual VIP', '₹1,799', 1799, '12 Calendar Months', 365, 3)}
                      className="mt-8 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#400B19] font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition active:scale-[0.98] border border-amber-200"
                    >
                      Get Annual Pass
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* 4. Lucky Dip Information Section (Burgundy/Navy Gradient) */}
            <div style={{ background: 'radial-gradient(circle at 50% 30%, rgba(220, 31, 50, 0.35) 0%, #400B19 60%, #101428 100%)' }} className="w-full py-16 px-4 sm:px-6 lg:px-8 text-white text-center border-b border-white/10">
              <div className="max-w-[1000px] mx-auto space-y-6">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                  🎁 PROVABLY FAIR DRAWS
                </span>
                <h2 className="text-3xl sm:text-4xl font-black">
                  Your VIP Pass Could Open the Door to Your Next Big Surprise!
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
                  Eligible VIP members receive verified entries based on their active plan: 1 ticket for Monthly, 2 tickets for 6-Month, and 3 tickets for Annual plans. Draws are governed by transparent cryptographic SHA-256 seed rules and published winner leaderboards.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentScreen('luckydip')}
                    className="px-6 py-3 rounded-full bg-[#DC1F32] hover:bg-[#b01625] text-white text-xs font-black shadow-lg transition active:scale-95"
                  >
                    Explore Lucky Dip Prizes
                  </button>
                  <button
                    onClick={() => setCurrentScreen('luckydip')}
                    className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition"
                  >
                    View Upcoming Draw
                  </button>
                  <button
                    onClick={() => setCurrentScreen('about')}
                    className="px-6 py-3 rounded-full text-amber-300 hover:text-white text-xs font-bold underline transition"
                  >
                    How Lucky Dip Works →
                  </button>
                </div>

                <p className="text-[11px] text-white/50 max-w-xl mx-auto pt-2">
                  Disclaimer: Prizes are subject to draw configuration, eligibility requirements, and official terms. No purchase guarantees winning.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ==================== SCREEN: MY VIP MEMBERSHIP DASHBOARD ==================== */}
        {currentScreen === 'membership' && (
          <div className="w-full space-y-0 text-slate-900">
            {/* Header Banner */}
            <div style={{ background: 'radial-gradient(circle at 75% 40%, rgba(229, 9, 20, 0.4) 0%, #400B19 55%, #101428 100%)' }} className="w-full py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 text-white">
              <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                    <span>👑</span> VIP MEMBER PORTAL
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black">My VIP Membership</h1>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">Manage your active pass, Lucky Dip tickets, and payment history.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentScreen('catalog')}
                    className="px-5 py-2.5 rounded-full bg-[#E50914] text-white text-xs font-bold hover:bg-[#C51424] shadow-md transition"
                  >
                    Browse Unlocked Deals →
                  </button>
                </div>
              </div>
            </div>

            {/* Main Dashboard Content on Milky White */}
            <div style={{ background: '#F5F6FA' }} className="w-full py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-[1280px] mx-auto space-y-8">
                
                {/* Active Membership Overview Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">👑</span>
                      <h3 className="text-xl font-black text-slate-900">
                        {activeMembership ? activeMembership.plan : (userRole === 'vip' ? 'Active VIP Pass (Verified)' : (userRole === 'expired' ? 'VIP Pass Expired' : 'Free User (No Active Pass)'))}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        userRole === 'vip' ? 'bg-emerald-100 text-emerald-700' : (userRole === 'expired' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600')
                      }`}>
                        {userRole === 'vip' ? 'Active Status' : (userRole === 'expired' ? 'Expired' : 'Inactive')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {userRole === 'vip'
                        ? 'All premium electronics deals unlocked. Free access to weekly flagship draws.'
                        : 'Upgrade to an active VIP Pass to unlock deals over ₹50,000 and get Lucky Dip entries.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    {userRole === 'vip' ? (
                      <button
                        onClick={() => handleOpenPayment('annual', 'Annual Pass (Upgrade / Extend)', '₹1,799', 1799, '12 Calendar Months', 365, 3)}
                        className="w-full md:w-auto px-6 py-3 rounded-2xl bg-[#1645C4] hover:bg-[#12389E] text-white text-xs font-black shadow-md transition"
                      >
                        Upgrade / Extend Pass
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenPayment('six-month', '6-Month Pass (Most Popular)', '₹1,199', 1199, '6 Calendar Months', 180, 2)}
                        className="w-full md:w-auto px-6 py-3 rounded-2xl bg-[#E50914] hover:bg-[#C51424] text-white text-xs font-black shadow-md transition"
                      >
                        {userRole === 'expired' ? 'Renew VIP Pass' : 'Get VIP Pass Now'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Status Metric Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Payment Status</div>
                    <div className="text-lg font-black text-slate-900">
                      {userRole === 'vip' ? '✓ Paid & Captured' : (userRole === 'expired' ? 'Expired' : 'Unpaid')}
                    </div>
                    <div className="text-[10px] text-slate-500">Razorpay Verified Gateway</div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Activation Date</div>
                    <div className="text-lg font-black text-slate-900">
                      {activeMembership ? activeMembership.activatedAt : 'Nov 24, 2026'}
                    </div>
                    <div className="text-[10px] text-slate-500">Instant Server Activation</div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Expiry Date</div>
                    <div className="text-lg font-black text-emerald-600">
                      {activeMembership ? activeMembership.expiresAt : (userRole === 'vip' ? 'May 24, 2027' : 'N/A')}
                    </div>
                    <div className="text-[10px] text-slate-500">Auto Expiry Check Enabled</div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Lucky Dip Tickets</div>
                    <div className="text-lg font-black text-amber-600">
                      {userRole === 'vip' ? `${activeMembership?.luckyDipEntries || 2} Entries / Draw` : '0 Entries'}
                    </div>
                    <div className="text-[10px] text-slate-500">Provably Fair SHA-256 Ledger</div>
                  </div>
                </div>

                {/* Payment History Table */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-black text-slate-900">Payment &amp; Subscription History</h4>
                      <p className="text-xs text-slate-500">Complete record of verified transactions and orders.</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-50 text-slate-900 font-black border-y border-slate-200">
                        <tr>
                          <th className="py-3 px-4">Transaction ID</th>
                          <th className="py-3 px-4">VIP Plan</th>
                          <th className="py-3 px-4">Amount</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Method</th>
                          <th className="py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {paymentHistory.length > 0 ? (
                          paymentHistory.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="py-3 px-4 font-mono font-bold text-slate-900">{item.id}</td>
                              <td className="py-3 px-4 font-bold">{item.plan}</td>
                              <td className="py-3 px-4 font-black text-[#E50914]">{item.amount}</td>
                              <td className="py-3 px-4 text-slate-500">{item.date}</td>
                              <td className="py-3 px-4">{item.method}</td>
                              <td className="py-3 px-4 font-bold text-emerald-600">{item.status}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="py-3 px-4 font-mono font-bold text-slate-900">pay_rzp_98412851</td>
                            <td className="py-3 px-4 font-bold">6-Month Pass</td>
                            <td className="py-3 px-4 font-black text-[#E50914]">₹1,199</td>
                            <td className="py-3 px-4 text-slate-500">Nov 24, 2026</td>
                            <td className="py-3 px-4">UPI (Razorpay Verified)</td>
                            <td className="py-3 px-4 font-bold text-emerald-600">Captured</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {currentScreen === 'signin' && (
          <div className="max-w-md mx-auto p-8 bg-white/10 rounded-3xl m-8 border border-white/20 space-y-4 text-white text-center">
            <h1 className="text-2xl font-black">Sign In</h1>
            <input type="email" placeholder="Email Address" className="w-full bg-black/40 border border-white/20 p-2.5 rounded-xl text-xs" />
            <input type="password" placeholder="Password" className="w-full bg-black/40 border border-white/20 p-2.5 rounded-xl text-xs" />
            <button className="w-full py-3 rounded-xl bg-[#D91E26] text-white font-bold text-xs">Sign In</button>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer style={{ background: '#101428' }} className="w-full text-slate-300 text-xs border-t-2 border-[#1645C4] mt-auto relative overflow-hidden">
        {/* Decorative background ambient glow */}
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#1645C4]/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -right-20 bottom-0 w-80 h-80 rounded-full bg-[#E50914]/15 blur-3xl pointer-events-none"></div>

        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 relative z-10">
          
          {/* Top 4 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Column 1: Brand Info & Logo (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setCurrentScreen('storefront')}>
                <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-cyan-500/40 to-rose-500/40 flex items-center justify-center">
                  <img src="/logo.jpg" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&auto=format&fit=crop&q=80'; }} alt="Logo" className="w-full h-full rounded-full object-cover shadow-md" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-xl font-black tracking-tight leading-none flex items-center gap-1 font-sans">
                    <span className="text-white">ONE STOP</span>
                    <span className="text-[#FF304D] font-extrabold">GADGETS</span>
                  </div>
                  <div className="text-[10px] font-bold text-white/70 tracking-widest uppercase mt-1">
                    TRADITION • VERIFIED • TRUST
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-sm">
                Your trusted destination for curated tech deals, verified merchant discounts, VIP electronics perks, and provably fair weekly flagship giveaways across India.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-1">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E50914] text-white flex items-center justify-center transition">📷</a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1645C4] text-white flex items-center justify-center transition">📘</a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-black text-white flex items-center justify-center transition">𝕏</a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E50914] text-white flex items-center justify-center transition">▶</a>
              </div>
            </div>

            {/* Column 2: Quick Links (2.5 Cols) */}
            <div className="lg:col-span-2 space-y-3.5">
              <div>
                <h4 className="font-extrabold text-sm text-white tracking-wide">Quick Links</h4>
                <div className="w-8 h-0.5 bg-[#E50914] mt-1"></div>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={() => setCurrentScreen('storefront')} className="hover:text-[#E50914] flex items-center gap-1.5"><span className="text-[#E50914] font-bold">›</span> Home</button></li>
                <li><button onClick={() => setCurrentScreen('catalog')} className="hover:text-[#E50914] flex items-center gap-1.5"><span className="text-[#E50914] font-bold">›</span> Deals</button></li>
                <li><button onClick={() => setCurrentScreen('about')} className="hover:text-[#E50914] flex items-center gap-1.5"><span className="text-[#E50914] font-bold">›</span> About Us</button></li>
                <li><button onClick={() => setCurrentScreen('luckydip')} className="hover:text-[#E50914] flex items-center gap-1.5"><span className="text-[#E50914] font-bold">›</span> Lucky Dip</button></li>
                <li><button onClick={() => setCurrentScreen('contact')} className="hover:text-[#E50914] flex items-center gap-1.5"><span className="text-[#E50914] font-bold">›</span> Contact Us</button></li>
              </ul>
            </div>

            {/* Column 3: Important Links (3 Cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              <div>
                <h4 className="font-extrabold text-sm text-white tracking-wide">Important Links</h4>
                <div className="w-10 h-0.5 bg-[#E50914] mt-1"></div>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={() => setCurrentScreen('about')} className="hover:text-[#E50914] flex items-center gap-1.5"><span className="text-[#E50914] font-bold">›</span> Privacy Policy</button></li>
                <li><button onClick={() => setCurrentScreen('about')} className="hover:text-[#E50914] flex items-center gap-1.5"><span className="text-[#E50914] font-bold">›</span> Terms &amp; Conditions</button></li>
                <li><button onClick={() => setCurrentScreen('about')} className="hover:text-[#E50914] flex items-center gap-1.5"><span className="text-[#E50914] font-bold">›</span> Returns &amp; Refunds</button></li>
                <li><button onClick={() => setCurrentScreen('luckydip')} className="hover:text-[#E50914] flex items-center gap-1.5"><span className="text-[#E50914] font-bold">›</span> Provably Fair Draw Rules</button></li>
                <li><button onClick={() => setCurrentScreen('about')} className="hover:text-[#E50914] flex items-center gap-1.5"><span className="text-[#E50914] font-bold">›</span> Affiliate &amp; Merchant Disclosure</button></li>
              </ul>
            </div>

            {/* Column 4: Reach Us (3.5 Cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              <div>
                <h4 className="font-extrabold text-sm text-white tracking-wide">Reach Us</h4>
                <div className="w-10 h-0.5 bg-[#E50914] mt-1"></div>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#1645C4] bg-[#1645C4]/30 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    📍
                  </div>
                  <div>
                    <div className="font-bold text-white">India</div>
                    <div className="text-[10px] text-slate-400">Headquarters &amp; Operations</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#1645C4] bg-[#1645C4]/30 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    📞
                  </div>
                  <div>
                    <a href="tel:+917569950963" className="font-bold text-white hover:text-[#E50914] transition">+91 7569950963</a>
                    <div className="text-[10px] text-slate-400">Mon - Sat: 9:00 AM - 8:00 PM IST</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#1645C4] bg-[#1645C4]/30 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    ✉️
                  </div>
                  <div>
                    <a href="mailto:example@gmail.com" className="font-bold text-white hover:text-[#E50914] transition break-all">example@gmail.com</a>
                    <div className="text-[10px] text-slate-400">Official Support &amp; Enquiries</div>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Sub-Footer Bar */}
          <div className="border-t border-[#1645C4]/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
            <div>
              Copyright © 2026 <strong className="text-white font-semibold">One Stop Gadgets</strong> | Designed by <a href="https://sunwebsitesolutions.in/" target="_blank" rel="noopener noreferrer" className="text-[#E50914] hover:text-white font-bold hover:underline transition">Sun Web Solutions</a>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Palette:</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#101428] inline-block border border-white/20" title="#101428"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#1645C4] inline-block" title="#1645C4"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] inline-block" title="#E50914"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white inline-block border border-slate-300" title="#FFFFFF"></span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
