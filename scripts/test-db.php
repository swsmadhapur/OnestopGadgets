<?php
/**
 * Test MySQL connection script
 */

$host = '127.0.0.1';
$port = 3306;
$user = 'root';
$pass = '';

echo "Testing connection to MySQL at $host:$port...\n";

try {
    $pdo = new PDO("mysql:host=$host;port=$port", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    echo "✓ Success: Connected to MySQL server!\n";
    $version = $pdo->query("SELECT VERSION()")->fetchColumn();
    echo "✓ Database Engine Version: $version\n";
} catch (PDOException $e) {
    echo "❌ MySQL Connection Failed: " . $e->getMessage() . "\n";
    echo "👉 Tip: Please ensure MySQL / MariaDB service is started in your XAMPP Control Panel.\n";
}
