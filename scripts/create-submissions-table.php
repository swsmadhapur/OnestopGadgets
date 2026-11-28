<?php
require_once __DIR__ . '/../backend/autoload.php';

use App\Database\Connection;

$pdo = Connection::getInstance();

$sql = "CREATE TABLE IF NOT EXISTS product_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_path VARCHAR(255) NOT NULL,
    affiliate_url VARCHAR(500) NOT NULL,
    target_product_id INT NULL,
    submitted_by INT NOT NULL,
    status ENUM('pending','approved','rejected','removed') DEFAULT 'pending',
    reviewed_by INT NULL,
    reviewed_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    removed_at DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";

$pdo->exec($sql);
echo "✓ Table product_submissions verified and ready!\n";

