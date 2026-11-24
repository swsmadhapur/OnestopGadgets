<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\Deals\DealController;
use App\Http\Controllers\Api\V1\Membership\SubscriptionController;
use App\Http\Controllers\Api\V1\LuckyDip\LuckyDipController;
use App\Http\Controllers\Api\V1\Admin\AdminDealController;
use App\Http\Controllers\Api\V1\SuperAdmin\SuperAdminController;

Route::prefix('v1')->group(function () {

    // 1. Health & Ping
    Route::get('/health', function () {
        return response()->json([
            'status' => 'healthy',
            'platform' => 'One Stop Gadgets',
            'version' => '1.0.0',
            'timestamp' => now()->toIso8601String(),
        ]);
    });

    // 2. Public Deals & Catalog
    Route::get('/deals', [DealController::class, 'index']);
    Route::get('/deals/{slug}', [DealController::class, 'show']);
    Route::post('/deals/{id}/outbound', [DealController::class, 'outboundRedirect']);
    Route::get('/categories', [DealController::class, 'categories']);
    Route::get('/merchants', [DealController::class, 'merchants']);

    // 3. Subscription Plans (Public) & Webhook Callback (External Gateway)
    Route::get('/plans', [SubscriptionController::class, 'plans']);
    Route::post('/webhooks/payments/{provider}', [SubscriptionController::class, 'handleWebhook']);

    // 4. Public Lucky Dip Information & Consented Winners
    Route::get('/lucky-dip/current', [LuckyDipController::class, 'currentRound']);
    Route::get('/lucky-dip/winners', [LuckyDipController::class, 'winners']);

    // 5. Authentication
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // 6. Authenticated Customer Endpoints
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        // Orders & Memberships
        Route::post('/subscription-orders', [SubscriptionController::class, 'createOrder']);
        Route::get('/me/subscription', [SubscriptionController::class, 'mySubscription']);

        // Lucky Dip Entry (100% Free for verified users)
        Route::post('/lucky-dip/{roundId}/entries', [LuckyDipController::class, 'submitEntry']);
        Route::get('/me/lucky-dip/entries', [LuckyDipController::class, 'myEntries']);
    });

    // 7. Deal Admin Portal (Strictly Isolated to Deals & Links ONLY)
    Route::middleware(['auth:sanctum', 'role:admin,super_admin'])->prefix('admin')->group(function () {
        Route::get('/deals', [AdminDealController::class, 'index']);
        Route::post('/deals', [AdminDealController::class, 'store']);
        Route::get('/deals/{id}', [AdminDealController::class, 'show']);
        Route::patch('/deals/{id}', [AdminDealController::class, 'update']);
        Route::delete('/deals/{id}', [AdminDealController::class, 'destroy']);
        Route::patch('/deals/{id}/link', [AdminDealController::class, 'updateLink']);
    });

    // 8. Super Admin Portal (Full Governance, Financials, Audits & Draw Control)
    Route::middleware(['auth:sanctum', 'role:super_admin'])->prefix('super-admin')->group(function () {
        Route::get('/metrics', [SuperAdminController::class, 'metrics']);
        Route::get('/audit-logs', [SuperAdminController::class, 'auditLogs']);
        Route::get('/lucky-dip/rounds/{id}/entries', [SuperAdminController::class, 'roundEntries']);
        Route::get('/lucky-dip/rounds/{id}/entries/export', [SuperAdminController::class, 'exportEntries']);
        Route::post('/lucky-dip/rounds/{id}/draw', [SuperAdminController::class, 'executeDraw']);
        Route::post('/lucky-dip/rounds/{id}/winner/publish', [SuperAdminController::class, 'publishWinner']);
    });
});
