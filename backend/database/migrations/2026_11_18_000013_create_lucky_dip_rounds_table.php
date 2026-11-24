<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lucky_dip_rounds', function (Blueprint $table) {
            $table->id();
            $table->string('title', 150);
            $table->string('prize_name', 150);
            $table->string('prize_image_path', 255)->nullable();
            $table->timestamp('starts_at');
            $table->timestamp('ends_at');
            $table->timestamp('selection_at')->nullable();
            $table->enum('status', ['draft', 'active', 'closed', 'drawn', 'completed'])->default('draft');
            $table->string('rules_version', 20)->default('1.0');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->index(['status', 'ends_at'], 'idx_rounds_status_ends');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lucky_dip_rounds');
    }
};
