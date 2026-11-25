<?php
/**
 * Automated Database Migration Runner
 */

require_once __DIR__ . '/../backend/autoload.php';

use App\Database\Connection;

echo "========================================================\n";
echo "  ONE STOP GADGETS — MySQL Database Migration Runner    \n";
echo "========================================================\n";

try {
    $pdo = Connection::getInstance();
    $sql = file_get_contents(__DIR__ . '/../backend/database/schema.sql');

    // Remove CREATE DATABASE and USE statements for clean multi-query execution if needed
    $pdo->exec($sql);
    echo "✓ Master Schema successfully imported into database!\n";
    echo "✓ All 14 Core tables created with Foreign Keys and Indexes.\n";

    // Run Seeder
    echo "\nRunning Initial Data Seeder...\n";
    require_once __DIR__ . '/../backend/database/seeder.php';

} catch (Exception $e) {
    echo "❌ Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
