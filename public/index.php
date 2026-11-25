<?php
declare(strict_types=1);

/**
 * ONE STOP GADGETS — Core PHP 8.x Front Controller & REST API Gateway
 */

define('ROOT_PATH', dirname(__DIR__));
define('BACKEND_PATH', ROOT_PATH . '/backend');
define('STORAGE_PATH', BACKEND_PATH . '/storage');

// Auto-create storage directory for sessions if not present
if (!is_dir(STORAGE_PATH . '/sessions')) {
    mkdir(STORAGE_PATH . '/sessions', 0777, true);
}

// Session configuration
ini_set('session.save_path', STORAGE_PATH . '/sessions');
ini_set('session.cookie_httponly', '1');
ini_set('session.use_only_cookies', '1');
ini_set('session.cookie_samesite', 'Lax');

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// CORS & JSON Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Global Exception Handler
set_exception_handler(function (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error: ' . $e->getMessage(),
        'file' => basename($e->getFile()),
        'line' => $e->getLine()
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
});

// Require DB configuration
$dbConfig = require BACKEND_PATH . '/config/database.php';

// Simple PDO Factory
function getDBConnection(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $config = require BACKEND_PATH . '/config/database.php';
        $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['database']};charset={$config['charset']}";
        $pdo = new PDO($dsn, $config['username'], $config['password'], $config['options']);
    }
    return $pdo;
}

// Parse Request Path
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Strip public subpath if accessed directly
$uri = preg_replace('#^/public#', '', $uri);

// Route Handler
if ($uri === '/' || $uri === '/api/v1/health' || $uri === '/api/health') {
    echo json_encode([
        'success' => true,
        'message' => 'API is running normally',
        'data' => [
            'status' => 'operational',
            'php_version' => PHP_VERSION,
            'app' => 'ONE STOP GADGETS Backend API'
        ]
    ], JSON_PRETTY_PRINT);
    exit;
}

http_response_code(404);
echo json_encode([
    'success' => false,
    'message' => "Route {$method} {$uri} not found"
], JSON_PRETTY_PRINT);
