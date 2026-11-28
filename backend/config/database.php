<?php
/**
 * Centralized MySQL Database Configuration (PDO)
 * Configured for Hostinger MySQL Database
 */
return [
    'driver' => 'mysql',
    'host' => '127.0.0.1', // Hostinger runs MySQL on localhost / 127.0.0.1 for local PHP scripts
    'port' => 3306,
    'database' => 'u410667769_onestop',
    'username' => 'u410667769_onestop',
    'password' => 'Adr@123@',
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ]
];


