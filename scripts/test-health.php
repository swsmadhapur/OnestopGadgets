<?php
$_SERVER['REQUEST_METHOD'] = 'GET';
$_SERVER['REQUEST_URI'] = '/api/v1/health';
require dirname(__DIR__) . '/public/index.php';
echo PHP_EOL;
