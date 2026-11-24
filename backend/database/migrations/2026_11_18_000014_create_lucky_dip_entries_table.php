<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lucky_dip_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('round_id')->constrained('lucky_dip_rounds')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->text('name_snapshot_encrypted');
            $table->text('email_snapshot_encrypted');
            $table->text('phone_snapshot_encrypted');
            $table->timestamp('rules_accepted_at');
            $table->boolean('marketing_opt_in')->default(false);
            $table->enum('eligibility_status', ['eligible', 'pending_verification', 'disqualified'])->default('eligible');
            $table->timestamp('created_at')->useCurrent();

            $table->unique(['round_id', 'user_id'], 'uk_round_user');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lucky_dip_entries');
    }
};
