<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('deal_clicks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('deal_id')->constrained('deals')->onDelete('cascade');
            $table->foreignId('user_id_nullable')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('clicked_at')->useCurrent();
            $table->string('referrer_tag', 100)->nullable();
            $table->char('session_hash', 64)->nullable();
            $table->string('ip_masked', 45)->nullable();

            $table->index(['deal_id', 'clicked_at'], 'idx_deal_clicks_analytics');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('deal_clicks');
    }
};
