<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('deals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('merchant_id')->constrained('merchants')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->string('title', 255);
            $table->string('slug', 191)->unique();
            $table->text('description')->nullable();
            $table->string('image_path', 255)->nullable();
            $table->decimal('price_display', 10, 2)->nullable();
            $table->decimal('original_price', 10, 2)->nullable();
            $table->unsignedInteger('discount_percentage')->nullable();
            $table->enum('visibility', ['public', 'premium'])->default('public');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['visibility', 'status', 'starts_at', 'ends_at'], 'idx_deals_query');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('deals');
    }
};
