<?php
declare(strict_types=1);

/**
 * Front Controller for One Stop Gadgets
 */

require_once __DIR__ . '/../backend/autoload.php';

use App\Database\Connection;

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-CSRF-Token");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Handle /api/v1/health
if ($uri === '/api/v1/health') {
    header('Content-Type: application/json');
    try {
        $pdo = Connection::getInstance();
        $dbStatus = 'connected';
    } catch (\Throwable $e) {
        $dbStatus = 'disconnected: ' . $e->getMessage();
    }
    echo json_encode([
        'status' => 'healthy',
        'database' => $dbStatus,
        'timestamp' => date('c')
    ]);
    exit;
}

// Handle /api/v1/plans
if ($uri === '/api/v1/plans' && $method === 'GET') {
    header('Content-Type: application/json');
    $pdo = Connection::getInstance();
    $stmt = $pdo->query("SELECT * FROM subscription_plans WHERE is_active = 1 ORDER BY display_order ASC");
    $plans = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'data' => $plans]);
    exit;
}

// Handle /api/v1/products
if ($uri === '/api/v1/products' && $method === 'GET') {
    header('Content-Type: application/json');
    $pdo = Connection::getInstance();
    $isVip = isset($_GET['vip']) && $_GET['vip'] === '1';

    $stmt = $pdo->query("SELECT * FROM deals WHERE is_active = 1 ORDER BY id DESC");
    $deals = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // If not VIP, mask VIP products (>= ₹50,000)
    $sanitized = array_map(function ($item) use ($isVip) {
        if (!$isVip && (float)$item['deal_price'] >= 50000) {
            $item['deal_price'] = null;
            $item['affiliate_url'] = null;
            $item['is_locked'] = true;
        } else {
            $item['is_locked'] = false;
        }
        return $item;
    }, $deals);

    echo json_encode(['success' => true, 'data' => $sanitized]);
    exit;
}

// Handle Normal Admin Routes: /api/v1/admin/submissions
if (strpos($uri, '/api/v1/admin/submissions') === 0) {
    $controller = new \App\Controllers\AdminAssetController();
    if ($method === 'GET') {
        $controller->listSubmissions();
    } elseif ($method === 'POST') {
        $controller->addAsset();
    } elseif ($method === 'DELETE') {
        $parts = explode('/', trim($uri, '/'));
        $id = (int)end($parts);
        $controller->removeAsset($id);
    }
    exit;
}

// Static HTML views for Admin and Super Admin
if ($uri === '/admin' || $uri === '/admin/') {
    require_once __DIR__ . '/../public/admin.html';
    exit;
}

if ($uri === '/superadmin' || $uri === '/superadmin/') {
    require_once __DIR__ . '/../public/superadmin.html';
    exit;
}

// Fallback 404
http_response_code(404);
header('Content-Type: application/json');
echo json_encode(['success' => false, 'message' => 'API endpoint not found: ' . $uri]);
