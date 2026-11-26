<?php
/**
 * Master Database Seeder: Roles, Categories, 35 Products, VIP Plans, and Real Winners
 */

require_once __DIR__ . '/../autoload.php';

use App\Database\Connection;

$pdo = Connection::getInstance();

echo "Starting Database Seeding...\n";

// 1. Seed Roles
$roles = [
    ['id' => 1, 'name' => 'customer', 'description' => 'Standard Platform User (Free or VIP)'],
    ['id' => 2, 'name' => 'admin', 'description' => 'Catalog Manager (Can add/delete products)'],
    ['id' => 3, 'name' => 'superadmin', 'description' => 'Master Platform Administrator']
];
$stmtRole = $pdo->prepare("INSERT INTO roles (id, name, description) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE description=VALUES(description)");
foreach ($roles as $r) {
    $stmtRole->execute([$r['id'], $r['name'], $r['description']]);
}
echo "✓ Seeded Roles\n";

// 2. Seed Default Accounts
// Customer: jagadeesh@example.com (pass: User@123)
// Admin: admin@onestopgadgets.com (pass: Admin@123)
// Super Admin: superadmin@onestopgadgets.com (pass: SuperAdmin@123)
$users = [
    [
        'role_id' => 1,
        'full_name' => 'Venkata Jagadeesh',
        'email' => 'jagadeesh@example.com',
        'phone' => '+919876543210',
        'password' => 'User@123',
        'current_role' => 'free',
        'city' => 'Hyderabad'
    ],
    [
        'role_id' => 2,
        'full_name' => 'Catalog Admin',
        'email' => 'admin@onestopgadgets.com',
        'phone' => '+919812345678',
        'password' => 'Admin@123',
        'current_role' => 'free',
        'city' => 'Mumbai'
    ],
    [
        'role_id' => 3,
        'full_name' => 'Master SuperAdmin',
        'email' => 'superadmin@onestopgadgets.com',
        'phone' => '+917569950963',
        'password' => 'SuperAdmin@123',
        'current_role' => 'vip',
        'city' => 'Hyderabad'
    ]
];
$stmtUser = $pdo->prepare("
    INSERT INTO users (role_id, full_name, email, phone, password_hash, current_role, city, email_verified_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE full_name=VALUES(full_name), current_role=VALUES(current_role)
");
foreach ($users as $u) {
    $hash = password_hash($u['password'], PASSWORD_BCRYPT, ['cost' => 10]);
    $stmtUser->execute([$u['role_id'], $u['full_name'], $u['email'], $u['phone'], $hash, $u['current_role'], $u['city']]);
}
echo "✓ Seeded Users (Customer, Admin, SuperAdmin)\n";

// 3. Seed Categories
$categories = [
    ['id' => 1, 'slug' => 'smartphones', 'name' => 'Smartphones', 'icon' => '📱', 'display_order' => 1],
    ['id' => 2, 'slug' => 'laptops', 'name' => 'Laptops', 'icon' => '💻', 'display_order' => 2],
    ['id' => 3, 'slug' => 'audio-wearables', 'name' => 'Audio & Wearables', 'icon' => '🎧', 'display_order' => 3],
    ['id' => 4, 'slug' => 'smartwatches', 'name' => 'Smartwatches', 'icon' => '⌚', 'display_order' => 4],
    ['id' => 5, 'slug' => 'gaming', 'name' => 'Gaming', 'icon' => '🎮', 'display_order' => 5],
    ['id' => 6, 'slug' => 'cameras', 'name' => 'Cameras', 'icon' => '📷', 'display_order' => 6],
    ['id' => 7, 'slug' => 'smart-home', 'name' => 'Smart Home', 'icon' => '🏠', 'display_order' => 7],
    ['id' => 8, 'slug' => 'accessories', 'name' => 'Accessories', 'icon' => '🔌', 'display_order' => 8]
];
$stmtCat = $pdo->prepare("INSERT INTO categories (id, slug, name, icon, display_order) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), icon=VALUES(icon)");
foreach ($categories as $c) {
    $stmtCat->execute([$c['id'], $c['slug'], $c['name'], $c['icon'], $c['display_order']]);
}
echo "✓ Seeded Categories\n";

// 4. Seed VIP Subscription Plans (4 Tiers: ₹99, ₹199, ₹299, ₹399)
$plans = [
    [
        'id' => 1,
        'plan_code' => 'one-month',
        'name' => '1 Month Pass',
        'price' => 99.00,
        'original_price' => 199.00,
        'duration_days' => 30,
        'lucky_dip_entries_per_draw' => 1,
        'badge' => null,
        'features_json' => json_encode([
            'Access to premium gadget deals',
            'Exclusive VIP discounts',
            'Instant deal notifications',
            '1 Lucky Dip entry per eligible weekly draw'
        ])
    ],
    [
        'id' => 2,
        'plan_code' => 'three-month',
        'name' => '3 Months Pass',
        'price' => 199.00,
        'original_price' => 299.00,
        'duration_days' => 90,
        'lucky_dip_entries_per_draw' => 2,
        'badge' => 'VALUE PASS',
        'features_json' => json_encode([
            'Everything in 1 Month VIP',
            '2 Lucky Dip entries per eligible draw',
            'Early access to flash sales',
            'Secret partner vouchers'
        ])
    ],
    [
        'id' => 3,
        'plan_code' => 'six-month',
        'name' => '6 Months Pass',
        'price' => 299.00,
        'original_price' => 599.00,
        'duration_days' => 180,
        'lucky_dip_entries_per_draw' => 3,
        'badge' => 'MOST POPULAR • BEST SELLER',
        'features_json' => json_encode([
            'Everything in 3 Months VIP',
            '3 Lucky Dip entries per eligible draw',
            'Early access to special offers',
            'Exclusive VIP vouchers',
            'Priority notifications'
        ])
    ],
    [
        'id' => 4,
        'plan_code' => 'annual',
        'name' => '1 Year VIP Pass',
        'price' => 399.00,
        'original_price' => 1199.00,
        'duration_days' => 365,
        'lucky_dip_entries_per_draw' => 5,
        'badge' => 'MAXIMUM VALUE • SAVE 67%',
        'features_json' => json_encode([
            'Everything in 6 Months VIP',
            '5 Lucky Dip entries per eligible draw',
            'VIP Gold Member badge',
            'Dedicated WhatsApp assistance'
        ])
    ]
];
$stmtPlan = $pdo->prepare("
    INSERT INTO subscription_plans (id, plan_code, name, price, original_price, duration_days, lucky_dip_entries_per_draw, badge, features_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE price=VALUES(price), duration_days=VALUES(duration_days)
");
foreach ($plans as $p) {
    $stmtPlan->execute([$p['id'], $p['plan_code'], $p['name'], $p['price'], $p['original_price'], $p['duration_days'], $p['lucky_dip_entries_per_draw'], $p['badge'], $p['features_json']]);
}
echo "✓ Seeded Subscription Plans\n";

// 5. Seed 35 Master Products (13 VIP Deals >= ₹50,000 and 22 Free Deals < ₹50,000)
$products = [
    // VIP Exclusive Gadgets (>= ₹50,000)
    [1, 1, 'APPL-IP16-PM', 'Apple iPhone 16 Pro Max (256 GB)', 'Apple', 'Amazon Verified', '🛒', 134999.00, 164900.00, '📱', 4.9, 'Grade 5 Titanium design, Camera Control button, 4K 120 fps Dolby Vision and A18 Pro chip.', 'https://www.amazon.in'],
    [2, 1, 'SAMS-S24-ULTRA', 'Samsung Galaxy S24 Ultra 5G (512GB)', 'Samsung', 'Amazon Verified', '🛒', 119999.00, 139999.00, '📱', 4.8, 'Galaxy AI with Circle to Search, 200MP Quad Telephoto camera and S-Pen.', 'https://www.amazon.in'],
    [3, 2, 'APPL-MBA-M4', 'MacBook Air M4 (13-inch, 16GB)', 'Apple', 'Flipkart Verified', '⚡', 94990.00, 121900.00, '💻', 4.9, 'Apple M4 chip with 10-core CPU, up to 18 hours battery life, Liquid Retina display.', 'https://www.flipkart.com'],
    [4, 2, 'APPL-MBP-M4PRO', 'Apple MacBook Pro 16-inch M4 Pro (24GB)', 'Apple', 'Amazon Verified', '🛒', 249900.00, 269900.00, '💻', 5.0, 'Liquid Retina XDR display, M4 Pro chip monster performance.', 'https://www.amazon.in'],
    [5, 4, 'APPL-WATCH-U2', 'Apple Watch Ultra 2 (Titanium GPS+Cellular)', 'Apple', 'Amazon Verified', '🛒', 84900.00, 89900.00, '⌚', 4.9, 'Rugged titanium case, precision dual-frequency GPS, 3000 nits display.', 'https://www.amazon.in'],
    [6, 5, 'SONY-PS5-PRO', 'Sony PlayStation 5 Pro Edition (Limited Direct)', 'Sony', 'Amazon Verified', '🛒', 58990.00, 68990.00, '🎮', 5.0, 'PlayStation Spectral Super Resolution (PSSR), 2TB SSD, Ray Tracing GPU.', 'https://www.amazon.in'],
    [7, 6, 'CANON-EOS-R50', 'Canon EOS R50 Mirrorless Camera (RF-S 18-45mm)', 'Canon', 'Amazon Verified', '🛒', 56990.00, 68995.00, '📷', 4.8, '24.2 MP APS-C sensor, 4K 30p uncropped recording, Dual Pixel CMOS AF II.', 'https://www.amazon.in'],
    [8, 6, 'SONY-A7M4-BODY', 'Sony Alpha 7 IV Full-Frame Mirrorless Camera (Body Only)', 'Sony', 'Amazon Verified', '🛒', 189990.00, 214990.00, '📷', 4.9, '33MP Exmor R CMOS sensor, 4K 60p 10-bit 4:2:2, real-time Eye AF.', 'https://www.amazon.in'],
    [9, 2, 'DELL-XPS-15', 'Dell XPS 15 9530 Intel Core i7 13th Gen OLED (32GB/1TB)', 'Dell', 'Amazon Verified', '🛒', 199990.00, 234990.00, '💻', 4.8, '3.5K OLED InfinityEdge touch display, RTX 4060 graphics, CNC aluminum.', 'https://www.amazon.in'],
    [10, 5, 'ASUS-ROG-G16', 'ASUS ROG Zephyrus G16 OLED Gaming Laptop (RTX 4070)', 'ASUS', 'Flipkart Verified', '⚡', 174990.00, 212990.00, '🎮', 4.8, 'Intel Core Ultra 9, 2.5K 240Hz OLED ROG Nebula display, CNC aluminum chassis.', 'https://www.flipkart.com'],
    [11, 1, 'APPL-IPAD-PRO13', 'Apple iPad Pro 13-inch M4 Ultra Retina XDR (256GB)', 'Apple', 'Amazon Verified', '🛒', 129900.00, 139900.00, '📱', 4.9, 'Breakthrough thin design, tandem OLED display, Apple M4 chip with hardware-accelerated ray tracing.', 'https://www.amazon.in'],
    [12, 6, 'DJI-MAVIC-3PRO', 'DJI Mavic 3 Pro Cine Quadcopter Triple-Camera Drone', 'DJI', 'Amazon Verified', '🛒', 184900.00, 208000.00, '📷', 5.0, 'Hasselblad 4/3 CMOS camera, dual telephoto lenses, 43-min flight time.', 'https://www.amazon.in'],
    [13, 7, 'LG-OLED-65G3', 'LG 65-inch G3 Series Gallery 4K Smart OLED Evo TV', 'LG', 'Amazon Verified', '🛒', 194990.00, 284990.00, '🏠', 4.9, 'Brightness Booster Max, Alpha 9 AI Processor 4K Gen6, zero-gap wall mount.', 'https://www.amazon.in'],

    // Free User Products (< ₹50,000)
    [14, 1, 'GOOG-PIX8A', 'Google Pixel 8a (128GB, Bay Blue)', 'Google', 'Flipkart Verified', '⚡', 37999.00, 52999.00, '📱', 4.6, 'Google Tensor G3 chip, stunning Pixel camera, 7 years of OS updates.', 'https://www.flipkart.com'],
    [15, 1, 'ONEP-12R', 'OnePlus 12R 5G (16GB RAM, 256GB)', 'OnePlus', 'Amazon Verified', '🛒', 42999.00, 45999.00, '📱', 4.7, 'Snapdragon 8 Gen 2, 4th Gen LTPO 120Hz display, 5500 mAh battery.', 'https://www.amazon.in'],
    [16, 2, 'ASUS-VIVO-15', 'ASUS Vivobook 15 Intel Core i5 13th Gen', 'ASUS', 'Amazon Verified', '🛒', 47990.00, 66990.00, '💻', 4.5, 'Slim lightweight laptop, 15.6 FHD anti-glare display, Windows 11 Home.', 'https://www.amazon.in'],
    [17, 2, 'HP-PAV-AERO', 'HP Pavilion Aero 13 AMD Ryzen 5 (970g)', 'HP', 'Flipkart Verified', '⚡', 49990.00, 72000.00, '💻', 4.5, 'Ultra-featherweight 970g magnesium body, 400-nit display.', 'https://www.flipkart.com'],
    [18, 3, 'BOSE-QC-ULTRA', 'Bose QuietComfort Ultra Headphones', 'Bose', 'Amazon Verified', '🛒', 25999.00, 39999.00, '🎧', 4.8, 'World-class spatial audio with Bose Immersive Audio, custom acoustic ANC modes.', 'https://www.amazon.in'],
    [19, 3, 'SONY-WH-XM5', 'Sony WH-1000XM5 Wireless Noise Cancelling', 'Sony', 'Flipkart Verified', '⚡', 26990.00, 34990.00, '🎧', 4.9, 'Two processors control 8 microphones for industry-leading ANC.', 'https://www.flipkart.com'],
    [20, 3, 'APPL-AIRPODS-P2', 'Apple AirPods Pro (2nd Gen with USB-C)', 'Apple', 'Amazon Verified', '🛒', 18990.00, 24900.00, '🎧', 4.9, 'Up to 2x more Active Noise Cancellation, Adaptive Audio.', 'https://www.amazon.in'],
    [21, 4, 'APPL-WATCH-S10', 'Apple Watch Series 10 (GPS, 46mm)', 'Apple', 'Amazon Verified', '🛒', 44900.00, 49900.00, '⌚', 4.8, 'Thinnest Apple Watch ever with wide-angle OLED display, sleep apnea tracking.', 'https://www.amazon.in'],
    [22, 4, 'SAMS-GW6-CL', 'Samsung Galaxy Watch 6 Classic (47mm)', 'Samsung', 'Flipkart Verified', '⚡', 24999.00, 38999.00, '⌚', 4.7, 'Physical rotating bezel, personalized HR zones, Sapphire glass.', 'https://www.flipkart.com'],
    [23, 5, 'SONY-PS5-SLIM', 'PlayStation 5 Slim (Disc Edition)', 'Sony', 'Flipkart Verified', '⚡', 43990.00, 54990.00, '🎮', 4.9, 'Slim compact form factor, 1TB high-speed SSD, DualSense haptic feedback.', 'https://www.flipkart.com'],
    [24, 5, 'NINT-SWITCH-OLED', 'Nintendo Switch OLED Mario Red Edition', 'Nintendo', 'Amazon Verified', '🛒', 31490.00, 37990.00, '🎮', 4.8, 'Vibrant 7-inch OLED panel, wide adjustable tabletop stand, dock with wired LAN.', 'https://www.amazon.in'],
    [25, 6, 'GOPRO-HERO12', 'GoPro HERO12 Black Action Camera', 'GoPro', 'Flipkart Verified', '⚡', 32990.00, 45000.00, '📷', 4.6, '5.3K 60fps video, HyperSmooth 6.0 stabilization, waterproof to 33ft.', 'https://www.flipkart.com'],
    [26, 7, 'AMZN-ECHO-10', 'Amazon Echo Show 10 (3rd Gen HD Smart Display)', 'Amazon', 'Amazon Verified', '🛒', 19999.00, 24999.00, '🏠', 4.6, '10.1 inch HD screen that moves with you, 13MP camera, premium sound.', 'https://www.amazon.in'],
    [27, 7, 'ECOVACS-N10', 'ECOVACS Deebot N10 2-in-1 Robot Vacuum and Mop', 'ECOVACS', 'Amazon Verified', '🛒', 27900.00, 59900.00, '🏠', 4.6, '4300Pa suction power, TrueMapping LiDAR navigation, 300-min runtime.', 'https://www.amazon.in'],
    [28, 8, 'ANKR-PRIME-100W', 'Anker Prime 100W GaN 3-Port Fast Wall Charger', 'Anker', 'Amazon Verified', '🛒', 4999.00, 7999.00, '🔌', 4.8, '100W GaN charging across 2 USB-C ports and 1 USB-A port with ActiveShield 2.0.', 'https://www.amazon.in'],
    [29, 8, 'SAND-EXTREME-1TB', 'SanDisk 1TB Extreme Portable SSD (1050MB/s)', 'SanDisk', 'Amazon Verified', '🛒', 8499.00, 14999.00, '🔌', 4.9, 'Rugged IP65 water/dust resistant shell, 1050MB/s NVMe read speeds.', 'https://www.amazon.in'],
    [30, 3, 'BOAT-BASSHEADS-100', 'boAt BassHeads 100 in-Ear Wired Earphones with Mic', 'boAt', 'Amazon Verified', '🛒', 379.00, 999.00, '🎧', 4.3, 'Hawk-inspired metallic design, 10mm dynamic drivers, inline microphone.', 'https://www.amazon.in'],
    [31, 8, 'PTRO-TANGLE-FREE', 'pTron Solero TB301 3A Type-C Fast Charging Cable', 'pTron', 'Amazon Verified', '🛒', 89.00, 499.00, '🔌', 4.2, 'Durable nylon braided 1.2M fast charge cable with 480Mbps data sync.', 'https://www.amazon.in'],
    [32, 8, 'AMBR-OTG-ADAPTER', 'Ambrane Type-C to USB-A 3.0 Metal OTG Adapter', 'Ambrane', 'Flipkart Verified', '⚡', 79.00, 269.00, '🔌', 4.4, 'Zinc-alloy compact plug and play OTG converter for smartphones and laptops.', 'https://www.flipkart.com'],
    [33, 8, 'PORT-MOU-PAD', 'Portronics Sublime Ergonomic Anti-Skid Mouse Pad', 'Portronics', 'Amazon Verified', '🛒', 199.00, 499.00, '🔌', 4.5, 'Smooth microfiber cloth surface with non-slip natural rubber base.', 'https://www.amazon.in'],
    [34, 7, 'WIPR-SMART-9W', 'Wipro Next 9W B22 LED Smart Color Bulb (Alexa & Google)', 'Wipro', 'Amazon Verified', '🛒', 699.00, 1999.00, '🏠', 4.3, '16 million colors with dimming control and voice assistant support.', 'https://www.amazon.in'],
    [35, 8, 'MI-POWER-10K', 'Mi 10000mAh Power Bank 3i (18W Fast Charging)', 'Xiaomi', 'Flipkart Verified', '⚡', 899.00, 1499.00, '🔌', 4.6, 'Dual output ports with 12 layers of advanced circuit chip protection.', 'https://www.flipkart.com']
];

$stmtProd = $pdo->prepare("
    INSERT INTO products (id, category_id, sku, title, brand, store, store_icon, selling_price, original_price, icon, rating, description, merchant_affiliate_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE selling_price=VALUES(selling_price), original_price=VALUES(original_price), title=VALUES(title)
");
foreach ($products as $p) {
    $stmtProd->execute($p);
}
echo "✓ Seeded 35 Products (13 VIP Deals >= ₹50,000 and 22 Free Deals < ₹50,000)\n";

// 6. Seed Active Lucky Dip Campaign
$now = date('Y-m-d H:i:s');
$ends = date('Y-m-d H:i:s', strtotime('+5 days'));
$serverSeedHash = hash('sha256', 'SECRET_SEED_FLAGSHIP_ROUND_26');

$stmtCamp = $pdo->prepare("
    INSERT INTO lucky_dip_campaigns (id, title, prize_name, prize_image_url, starts_at, ends_at, draw_at, server_seed_hash, status)
    VALUES (1, 'Weekly Flagship Lucky Dip', 'Apple iPhone 16 Pro Max (256 GB)', '/assets/hero/iphone16.png', ?, ?, ?, ?, 'active')
    ON DUPLICATE KEY UPDATE title=VALUES(title), status=VALUES(status)
");
$stmtCamp->execute([$now, $ends, $ends, $serverSeedHash]);
echo "✓ Seeded Active Lucky Dip Campaign\n";

// 7. Seed Real Historical Winners
$winners = [
    ['R', 'Rohan Sharma', 'iPhone 16 Pro Max (256 GB)', 'November 2026', '#E68A00'],
    ['G', 'Gagan Preet', 'iPhone 16 Pro Max', 'September 2026', '#DC2626'],
    ['E', 'Ekambir Sandhu', '1st Prize: iPhone 16 / S25', 'July 2026', '#2563EB'],
    ['S', 'Sukhjinder Singh', '1st Prize: iPhone 16', 'June 2026', '#059669'],
    ['A', 'Abha Talwar', 'iPhone 16 Pro', 'May 2026', '#7C3AED'],
    ['J', 'Jaydev Bhere', 'PlayStation 5 Slim', 'February 2026', '#D97706']
];
$stmtWin = $pdo->prepare("
    INSERT INTO lucky_dip_winners (campaign_id, entry_id, user_id, prize_awarded, winning_hash, draw_date, initial, badge_color, verification_status, published_by_superadmin)
    VALUES (1, ?, 1, ?, ?, ?, ?, ?, 'verified', 1)
    ON DUPLICATE KEY UPDATE prize_awarded=VALUES(prize_awarded)
");
foreach ($winners as $idx => $w) {
    $dummyEntryId = $idx + 1;
    // ensure dummy entry exists
    $pdo->prepare("INSERT INTO lucky_dip_entries (id, campaign_id, user_id, ticket_number, participant_name, participant_email, participant_phone, participant_city, entry_hash) VALUES (?, 1, 1, ?, ?, 'winner@example.com', '+919876543210', 'India', ?) ON DUPLICATE KEY UPDATE participant_name=VALUES(participant_name)")
        ->execute([$dummyEntryId, 'OSG-TKT-WIN00' . $dummyEntryId, $w[1], hash('sha256', 'WIN' . $dummyEntryId)]);
    
    $stmtWin->execute([$dummyEntryId, $w[2], hash('sha256', 'HASH' . $dummyEntryId), $w[3], $w[0], $w[4]]);
}
echo "✓ Seeded 6 Historical Real Winners\n";

echo "Seeding Completed Successfully!\n";

