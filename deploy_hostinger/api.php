<?php
/**
 * One Stop Gadgets - Unified Hostinger API Router & Database Auto-Installer
 * Automatically connects to MySQL, creates required tables, seeds deals/plans/roles,
 * and handles all endpoints for Customer Website, Admin, and SuperAdmin.
 */

declare(strict_types=1);

// Prevent PHP error leakage to client
error_reporting(E_ALL);
ini_set('display_errors', '0');

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-CSRF-Token");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database Credentials provided by user
$dbConfig = [
    'host' => '127.0.0.1',
    'port' => 3306,
    'dbname' => 'u410667769_onestop',
    'user' => 'u410667769_onestop',
    'pass' => 'Adr@123@'
];

/**
 * Get or initialize PDO connection with Auto-Migration & Seeding
 */
function getDbConnection(): ?PDO {
    static $pdo = null;
    global $dbConfig;

    if ($pdo !== null) {
        return $pdo;
    }

    try {
        $dsn = "mysql:host={$dbConfig['host']};port={$dbConfig['port']};dbname={$dbConfig['dbname']};charset=utf8mb4";
        $pdo = new PDO($dsn, $dbConfig['user'], $dbConfig['pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
        ]);

        // Auto Create Tables if not exist
        initializeDatabase($pdo);
        return $pdo;
    } catch (\Throwable $e) {
        error_log("DB Connection failed: " . $e->getMessage());
        return null;
    }
}

/**
 * Ensure all necessary tables exist in Hostinger MySQL
 */
function initializeDatabase(PDO $pdo): void {
    // 1. Deals table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `deals` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `sku` VARCHAR(100) NULL,
            `title` VARCHAR(255) NOT NULL,
            `category` VARCHAR(100) NOT NULL,
            `categoryId` VARCHAR(100) NOT NULL,
            `brand` VARCHAR(100) NULL,
            `store` VARCHAR(100) NULL,
            `price` VARCHAR(50) NOT NULL,
            `numeric_price` DECIMAL(10,2) NOT NULL,
            `original` VARCHAR(50) NULL,
            `discount` VARCHAR(50) NULL,
            `dealType` VARCHAR(50) DEFAULT 'product',
            `icon` VARCHAR(50) DEFAULT '📱',
            `rating` DECIMAL(3,1) DEFAULT 4.8,
            `reviews` INT DEFAULT 100,
            `merchantUrl` TEXT NULL,
            `imageUrl` TEXT NULL,
            `description` TEXT NULL,
            `is_active` TINYINT(1) DEFAULT 1,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 2. Admin Submissions table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `submissions` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `title` VARCHAR(255) NOT NULL,
            `category` VARCHAR(100) NOT NULL,
            `categoryId` VARCHAR(100) NOT NULL,
            `price` VARCHAR(50) NOT NULL,
            `numeric_price` DECIMAL(10,2) NOT NULL,
            `image_path` TEXT NOT NULL,
            `affiliate_url` TEXT NOT NULL,
            `status` ENUM('pending', 'approved', 'rejected', 'removed') DEFAULT 'pending',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `reviewed_at` TIMESTAMP NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 3. VIP Memberships table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `memberships` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `membershipId` VARCHAR(50) NOT NULL UNIQUE,
            `name` VARCHAR(150) NOT NULL,
            `email` VARCHAR(150) NOT NULL,
            `phone` VARCHAR(50) NOT NULL,
            `plan` VARCHAR(100) NOT NULL,
            `planId` VARCHAR(50) NOT NULL,
            `amountPaid` DECIMAL(10,2) NOT NULL,
            `paymentMethod` VARCHAR(100) DEFAULT 'UPI / Card',
            `status` VARCHAR(50) DEFAULT 'active',
            `activatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `expiresAt` TIMESTAMP NULL,
            `luckyDipTicketsAllocated` INT DEFAULT 1
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 4. Giveaway / Lucky Dip Entries table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `giveaway_entries` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `ticketNumber` VARCHAR(50) NOT NULL UNIQUE,
            `name` VARCHAR(150) NOT NULL,
            `email` VARCHAR(150) NOT NULL,
            `phone` VARCHAR(50) NOT NULL,
            `city` VARCHAR(100) DEFAULT 'India',
            `selectedProduct` VARCHAR(150) DEFAULT 'iPhone 16 Pro Max',
            `productId` VARCHAR(50) DEFAULT 'p1',
            `attemptNumber` INT DEFAULT 1,
            `status` VARCHAR(50) DEFAULT 'Verified VIP',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // 5. Categories table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `custom_categories` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(100) NOT NULL UNIQUE,
            `slug` VARCHAR(100) NOT NULL UNIQUE,
            `icon` VARCHAR(50) DEFAULT '🔌',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Seed default categories if empty
    $checkCat = $pdo->query("SELECT COUNT(*) as cnt FROM `custom_categories`")->fetch();
    if ((int)($checkCat['cnt'] ?? 0) === 0) {
        $defaultCats = [
            ['Smartphones', 'smartphones', '📱'],
            ['Laptops & Computers', 'laptops-computers', '💻'],
            ['Smartwatches', 'smartwatches', '⌚'],
            ['Headphones & Earbuds', 'headphones-earbuds', '🎧'],
            ['Gaming & Consoles', 'gaming-consoles', '🎮'],
            ['Tablets', 'tablets', '📱'],
            ['Cameras & Accessories', 'cameras-accessories', '📷'],
            ['Smart TVs', 'smart-tvs', '📺'],
            ['Home Appliances', 'home-appliances', '🏠'],
            ['Gadget Accessories', 'gadget-accessories', '🔌']
        ];
        $catStmt = $pdo->prepare("INSERT IGNORE INTO `custom_categories` (`name`, `slug`, `icon`) VALUES (?, ?, ?)");
        foreach ($defaultCats as $dc) {
            $catStmt->execute($dc);
        }
    }

    $check = $pdo->query("SELECT COUNT(*) as cnt FROM `deals`")->fetch();
    if ((int)($check['cnt'] ?? 0) === 0) {
        seedInitialDeals($pdo);
    }

    // Check if memberships table is seeded; if not, seed from memberships.json
    $checkMem = $pdo->query("SELECT COUNT(*) as cnt FROM `memberships`")->fetch();
    if ((int)($checkMem['cnt'] ?? 0) === 0) {
        seedInitialMemberships($pdo);
    }

    // Check if clean parameter is requested to clear dummy data once
    if (isset($_GET['clean_dummy_data']) && $_GET['clean_dummy_data'] === 'true') {
        $pdo->exec("TRUNCATE TABLE `deals`");
        $pdo->exec("TRUNCATE TABLE `submissions`");
        $pdo->exec("TRUNCATE TABLE `memberships`");
        $pdo->exec("TRUNCATE TABLE `giveaway_entries`");
    }
}


function seedInitialDeals(PDO $pdo): void {
    // Left empty so catalog contains only real products added via Admin and approved by SuperAdmin
}

function seedInitialMemberships(PDO $pdo): void {
    // Left empty so VIP subscriptions contain only real customer checkouts
}

function seedInitialGiveaway(PDO $pdo): void {
    // Left empty so giveaway table contains only real contest participants
}


// ================= ROUTER DISPATCHER =================
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

// Clean URL: /api/v1/...
if (strpos($requestUri, '/api/v1/') === false && strpos($requestUri, 'api.php') !== false) {
    // If called directly via /api.php/v1/...
    $requestUri = preg_replace('#^/api\.php#', '/api', $requestUri);
}

// 1. HEALTH CHECK: /api/v1/health
if ($requestUri === '/api/v1/health') {
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'healthy',
        'database' => $pdo ? 'connected (MySQL Hostinger)' : 'fallback (file storage)',
        'timestamp' => date('c')
    ]);
    exit;
}

// 2. PRODUCT CATALOG: /api/v1/products
if ($requestUri === '/api/v1/products' && $method === 'GET') {
    header('Content-Type: application/json');
    $isVip = isset($_GET['vip']) && $_GET['vip'] === '1';

    $deals = [];
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM `deals` WHERE `is_active` = 1 ORDER BY `id` DESC");
            $deals = $stmt->fetchAll();
        } catch (\Throwable $e) {}
    }

    $sanitized = array_map(function ($p) use ($isVip) {
        $price = (float)($p['numeric_price'] ?? 0);
        if (!$isVip && $price >= 50000) {
            $p['price'] = '🔒 VIP Exclusive Deal';
            $p['merchantUrl'] = '#vip-pass-required';
            $p['isVipLocked'] = true;
        } else {
            $p['isVipLocked'] = false;
        }
        return $p;
    }, $deals);

    echo json_encode([
        'success' => true,
        'data' => $sanitized
    ]);
    exit;
}

// 2.1 CATEGORIES API: GET /api/v1/categories and POST /api/v1/categories (Add new category)
if ($requestUri === '/api/v1/categories') {
    header('Content-Type: application/json');

    if ($method === 'GET') {
        $cats = [];
        if ($pdo) {
            $cats = $pdo->query("SELECT * FROM `custom_categories` ORDER BY `id` ASC")->fetchAll();
        }
        echo json_encode(['success' => true, 'data' => $cats]);
        exit;
    }

    if ($method === 'POST') {
        $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;
        $name = trim($body['name'] ?? '');
        $icon = trim($body['icon'] ?? '⚡');

        if (empty($name)) {
            echo json_encode(['success' => false, 'message' => 'Category name is required.']);
            exit;
        }

        $slug = strtolower(preg_replace('/[^a-z0-9]/i', '-', $name));
        $slug = trim(preg_replace('/-+/', '-', $slug), '-');

        if ($pdo) {
            $stmt = $pdo->prepare("INSERT INTO `custom_categories` (`name`, `slug`, `icon`) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE `icon`=VALUES(`icon`)");
            $stmt->execute([$name, $slug, $icon]);
            $newId = (int)$pdo->lastInsertId();
            echo json_encode([
                'success' => true,
                'message' => "Category '{$name}' added successfully!",
                'data' => ['id' => $newId, 'name' => $name, 'slug' => $slug, 'icon' => $icon]
            ]);
            exit;
        }

        echo json_encode(['success' => false, 'message' => 'Database unavailable.']);
        exit;
    }
}



// 3. ADMIN SUBMISSIONS: GET / POST / DELETE /api/v1/admin/submissions
if (strpos($requestUri, '/api/v1/admin/submissions') === 0) {
    header('Content-Type: application/json');

    if ($method === 'GET') {
        if ($pdo) {
            $stmt = $pdo->query("SELECT * FROM `submissions` WHERE `status` != 'removed' ORDER BY `id` DESC");
            $list = $stmt->fetchAll();
            echo json_encode(['success' => true, 'data' => $list]);
            exit;
        } else {
            $file = __DIR__ . '/submissions.json';
            $list = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
            echo json_encode(['success' => true, 'data' => is_array($list) ? $list : []]);
            exit;
        }
    }

    if ($method === 'POST') {
        $title = trim($_POST['title'] ?? 'Curated Gadget Deal');
        $category = trim($_POST['category'] ?? 'Gadget Accessories');
        $categoryId = strtolower(preg_replace('/[^a-z0-9]/i', '-', $category));
        $priceNum = (float)($_POST['price'] ?? 99);
        $price = '₹' . number_format($priceNum, 0, '.', ',');
        $affiliateUrl = trim($_POST['affiliate_url'] ?? '');
        $imagePath = '';

        // Handle Image Upload
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = __DIR__ . '/uploads/products/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION) ?: 'jpg';
            $filename = 'asset_' . time() . '_' . substr(md5(uniqid()), 0, 6) . '.' . $ext;
            $dest = $uploadDir . $filename;
            if (move_uploaded_file($_FILES['image']['tmp_name'], $dest)) {
                $imagePath = '/uploads/products/' . $filename;
            }
        }

        if (empty($affiliateUrl) || empty($imagePath)) {
            echo json_encode(['success' => false, 'message' => 'Please provide both an image and an affiliate URL.']);
            exit;
        }

        $newItem = [
            'title' => $title,
            'category' => $category,
            'categoryId' => $categoryId,
            'price' => $price,
            'numeric_price' => $priceNum,
            'image_path' => $imagePath,
            'affiliate_url' => $affiliateUrl,
            'status' => 'pending'
        ];

        if ($pdo) {
            $stmt = $pdo->prepare("
                INSERT INTO `submissions` (`title`, `category`, `categoryId`, `price`, `numeric_price`, `image_path`, `affiliate_url`, `status`)
                VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
            ");
            $stmt->execute([$title, $category, $categoryId, $price, $priceNum, $imagePath, $affiliateUrl]);
            $newItem['id'] = (int)$pdo->lastInsertId();
        }

        // Also sync to local JSON
        $file = __DIR__ . '/submissions.json';
        $subs = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
        if (!is_array($subs)) $subs = [];
        array_unshift($subs, $newItem);
        file_put_contents($file, json_encode($subs, JSON_PRETTY_PRINT));

        echo json_encode(['success' => true, 'message' => 'Product image and affiliate link saved successfully!', 'data' => $newItem]);
        exit;
    }

    if ($method === 'DELETE') {
        $parts = explode('/', trim($requestUri, '/'));
        $id = (int)end($parts);
        if ($pdo) {
            $pdo->prepare("UPDATE `submissions` SET `status` = 'removed' WHERE `id` = ?")->execute([$id]);
        }
        $file = __DIR__ . '/submissions.json';
        if (file_exists($file)) {
            $subs = json_decode(file_get_contents($file), true) ?: [];
            foreach ($subs as &$s) {
                if (($s['id'] ?? 0) === $id) $s['status'] = 'removed';
            }
            file_put_contents($file, json_encode($subs, JSON_PRETTY_PRINT));
        }
        echo json_encode(['success' => true, 'message' => 'Submission removed successfully.']);
        exit;
    }
}

// 4. SUPER ADMIN SUBMISSION APPROVAL: POST /api/v1/super-admin/submissions/{id}/approve
if (strpos($requestUri, '/api/v1/super-admin/submissions/') === 0 && $method === 'POST') {
    header('Content-Type: application/json');
    $parts = explode('/', trim($requestUri, '/'));
    $action = end($parts); // approve or reject
    $id = (int)$parts[count($parts) - 2];

    if ($pdo) {
        $stmt = $pdo->prepare("SELECT * FROM `submissions` WHERE `id` = ?");
        $stmt->execute([$id]);
        $sub = $stmt->fetch();

        if (!$sub) {
            echo json_encode(['success' => false, 'message' => 'Submission not found']);
            exit;
        }

        if ($action === 'approve') {
            $pdo->prepare("UPDATE `submissions` SET `status` = 'approved', `reviewed_at` = NOW() WHERE `id` = ?")->execute([$id]);

            // Add into `deals` table so it is instantly LIVE
            $stmtDeal = $pdo->prepare("
                INSERT INTO `deals` 
                (`sku`, `title`, `category`, `categoryId`, `brand`, `store`, `price`, `numeric_price`, `original`, `discount`, `dealType`, `icon`, `rating`, `reviews`, `merchantUrl`, `imageUrl`, `description`)
                VALUES (?, ?, ?, ?, 'Verified Partner', 'Affiliate Partner', ?, ?, '₹499', '80% OFF', 'product', ?, 5.0, 1, ?, ?, 'Approved by SuperAdmin')
            ");
            $icon = ($sub['category'] === 'Smartphones') ? '📱' : '🎁';
            $stmtDeal->execute([
                'OSG-SUB-' . $id,
                $sub['title'],
                $sub['category'],
                $sub['categoryId'],
                $sub['price'],
                (float)$sub['numeric_price'],
                $icon,
                $sub['affiliate_url'],
                $sub['image_path']
            ]);

            echo json_encode(['success' => true, 'message' => 'Submission approved! Product is now LIVE on website.']);
            exit;
        } elseif ($action === 'reject') {
            $pdo->prepare("UPDATE `submissions` SET `status` = 'rejected', `reviewed_at` = NOW() WHERE `id` = ?")->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'Submission rejected.']);
            exit;
        }
    }

    echo json_encode(['success' => false, 'message' => 'Action failed.']);
    exit;
}

// 5. SUPER ADMIN SUBSCRIPTIONS: GET /api/v1/super-admin/subscriptions
if ($requestUri === '/api/v1/super-admin/subscriptions' && $method === 'GET') {
    header('Content-Type: application/json');
    $planFilter = $_GET['plan'] ?? 'all';

    $list = [];
    if ($pdo) {
        try {
            $sql = "SELECT * FROM `memberships`";
            if ($planFilter !== 'all') {
                $sql .= " WHERE `planId` = " . $pdo->quote($planFilter);
            }
            $sql .= " ORDER BY `id` DESC";
            $raw = $pdo->query($sql)->fetchAll();
            $list = array_map(function($r) {
                return [
                    'membershipId' => $r['membershipId'],
                    'user' => [
                        'name' => $r['name'],
                        'email' => $r['email'],
                        'phone' => $r['phone']
                    ],
                    'plan' => $r['plan'],
                    'planId' => $r['planId'],
                    'amountPaid' => (float)$r['amountPaid'],
                    'paymentMethod' => $r['paymentMethod'],
                    'status' => $r['status'],
                    'activatedAt' => $r['activatedAt'],
                    'expiresAt' => $r['expiresAt']
                ];
            }, $raw);
        } catch (\Throwable $e) {}
    }

    echo json_encode([
        'success' => true,
        'total' => count($list),
        'filteredTotal' => count($list),
        'data' => $list
    ]);
    exit;
}

// 6. SUPER ADMIN GIVEAWAY PARTICIPANTS: GET /api/v1/super-admin/giveaway-participants
if ($requestUri === '/api/v1/super-admin/giveaway-participants' && $method === 'GET') {
    header('Content-Type: application/json');
    $prodFilter = $_GET['product'] ?? 'all';

    $list = [];
    if ($pdo) {
        try {
            $sql = "SELECT * FROM `giveaway_entries`";
            if ($prodFilter !== 'all') {
                $sql .= " WHERE `productId` = " . $pdo->quote($prodFilter);
            }
            $sql .= " ORDER BY `id` DESC";
            $list = $pdo->query($sql)->fetchAll();
        } catch (\Throwable $e) {}
    }

    echo json_encode([
        'success' => true,
        'total' => count($list),
        'filteredTotal' => count($list),
        'data' => $list
    ]);
    exit;
}

// 7. VIP CREATE ORDER & VERIFY PAYMENT (Customer VIP Purchase)
if ($requestUri === '/api/v1/vip/verify-payment' && $method === 'POST') {
    header('Content-Type: application/json');
    $body = json_decode(file_get_contents('php://input'), true) ?: $_POST;

    $orderId = $body['orderId'] ?? ('ord_' . time());
    $paymentId = $body['paymentId'] ?? ('pay_' . time());
    $planId = $body['planId'] ?? 'six-month';
    $name = $body['name'] ?? 'VIP Customer';
    $email = $body['email'] ?? 'vip@example.com';
    $phone = $body['phone'] ?? '+919876543210';

    $planMap = [
        'one-month' => ['name' => '1 Month Pass', 'price' => 99, 'days' => 30, 'entries' => 1],
        'three-month' => ['name' => '3 Months Pass', 'price' => 199, 'days' => 90, 'entries' => 2],
        'six-month' => ['name' => '6 Months Pass', 'price' => 299, 'days' => 180, 'entries' => 3],
        'annual' => ['name' => '1 Year Pass', 'price' => 399, 'days' => 365, 'entries' => 5],
    ];
    $plan = $planMap[$planId] ?? $planMap['six-month'];

    $membershipId = 'VIP-' . strtoupper(substr(md5(uniqid()), 0, 8));
    $activatedAt = date('Y-m-d H:i:s');
    $expiresAt = date('Y-m-d H:i:s', strtotime("+{$plan['days']} days"));

    if ($pdo) {
        $stmt = $pdo->prepare("
            INSERT INTO `memberships`
            (`membershipId`, `name`, `email`, `phone`, `plan`, `planId`, `amountPaid`, `paymentMethod`, `activatedAt`, `expiresAt`, `luckyDipTicketsAllocated`)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'UPI / Card', ?, ?, ?)
        ");
        $stmt->execute([
            $membershipId,
            $name,
            $email,
            $phone,
            $plan['name'],
            $planId,
            $plan['price'],
            $activatedAt,
            $expiresAt,
            $plan['entries']
        ]);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Payment successfully verified. VIP membership activated!',
        'membership' => [
            'membershipId' => $membershipId,
            'plan' => $plan['name'],
            'amountPaid' => $plan['price'],
            'status' => 'active',
            'expiresAt' => $expiresAt
        ]
    ]);
    exit;
}

// Fallback 404
http_response_code(404);
header('Content-Type: application/json');
echo json_encode(['success' => false, 'message' => 'Endpoint not found: ' . $requestUri]);
