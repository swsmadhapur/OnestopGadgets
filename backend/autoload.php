<?php
declare(strict_types=1);

/**
 * PSR-4 Compatible Autoloader for Backend
 */
spl_autoload_register(function ($class) {
    $prefixes = [
        'App\\' => __DIR__ . '/src/',
        'App\\Models\\' => __DIR__ . '/app/Models/',
        'App\\Services\\' => __DIR__ . '/app/Services/',
        'App\\Controllers\\' => __DIR__ . '/controllers/',
    ];

    foreach ($prefixes as $prefix => $baseDir) {
        $len = strlen($prefix);
        if (strncmp($prefix, $class, $len) !== 0) {
            continue;
        }

        $relativeClass = substr($class, $len);
        $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});
