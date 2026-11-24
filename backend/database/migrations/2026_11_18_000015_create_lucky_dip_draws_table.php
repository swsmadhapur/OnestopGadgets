<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lucky_dip_draws', function (Blueprint $table) {
            $table->id();
            $table->foreignId('round_id')->constrained('lucky_dip_rounds')->onDelete('cascade');
            $table->string('algorithm_version', 50)->default('CSPRNG_SHA256_V1');
            $table->char('eligible_set_hash', 64);
            $table->char('seed_commitment', 64);
            $table->string('seed_reveal_secure', 255);
            $table->foreignId('selected_entry_id')->constrained('lucky_dip_entries');
            $table->foreignId('initiated_by')->constrained('users');
            $table->timestamp('conducted_at')->useCurrent();
            $table->enum('state', ['pending_verification', 'verified', 'rejected'])->default('pending_verification');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lucky_dip_draws');
    }
};
