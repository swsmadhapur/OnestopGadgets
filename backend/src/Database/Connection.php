<?php
declare(strict_types=1);

namespace App\Database;

use PDO;
use PDOException;
use RuntimeException;

final class Connection
{
    private static ?PDO $instance = null;

    public static function getInstance(): PDO
    {
        if (self::$instance !== null) {
            return self::$instance;
        }

        // Load config
        $configPath = __DIR__ . '/../../config/database.php';
        $config = file_exists($configPath) ? require $configPath : [];

        $host = $config['host'] ?? getenv('DB_HOST') ?: '127.0.0.1';
        $port = $config['port'] ?? getenv('DB_PORT') ?: '3306';
        $dbName = $config['database'] ?? getenv('DB_NAME') ?: 'one_stop_gadgets';
        $user = $config['username'] ?? getenv('DB_USER') ?: 'root';
        $password = $config['password'] ?? getenv('DB_PASSWORD') ?: '';
        $charset = $config['charset'] ?? 'utf8mb4';

        // Connect first without db to create if not exists
        try {
            $initDsn = "mysql:host={$host};port={$port};charset={$charset}";
            $initPdo = new PDO($initDsn, $user, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            ]);
            $initPdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        } catch (PDOException $e) {
            // Ignore if database creation is restricted
        }

        $dsn = "mysql:host={$host};port={$port};dbname={$dbName};charset={$charset}";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        try {
            self::$instance = new PDO($dsn, $user, $password, $options);
            return self::$instance;
        } catch (PDOException $e) {
            throw new RuntimeException("Database connection failed: " . $e->getMessage(), (int)$e->getCode(), $e);
        }
    }
}
