<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('deal_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('deal_id')->unique()->constrained('deals')->onDelete('cascade');
            $table->text('destination_url_encrypted');
            $table->string('approved_host', 150);
            $table->string('tracking_code', 100)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('deal_links');
    }
};
