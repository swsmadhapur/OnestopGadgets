<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lucky_dip_winners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('round_id')->constrained('lucky_dip_rounds')->onDelete('cascade');
            $table->foreignId('draw_id')->constrained('lucky_dip_draws')->onDelete('cascade');
            $table->foreignId('entry_id')->constrained('lucky_dip_entries')->onDelete('cascade');
            $table->unsignedInteger('prize_slot')->default(1);
            $table->enum('verification_status', ['verified', 'claimed', 'forfeited'])->default('verified');
            $table->string('display_name_consent', 100); // e.g. "Rahul K."
            $table->timestamp('announced_at')->nullable();
            $table->foreignId('published_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();

            $table->unique(['round_id', 'prize_slot'], 'uk_round_slot');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lucky_dip_winners');
    }
};
