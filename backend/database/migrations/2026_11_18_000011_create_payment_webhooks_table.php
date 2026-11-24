<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_webhook_events', function (Blueprint $table) {
            $table->id();
            $table->string('provider', 50); // razorpay | cashfree
            $table->string('event_id', 150);
            $table->char('payload_hash', 64);
            $table->enum('processing_status', ['received', 'processed', 'ignored', 'failed'])->default('received');
            $table->timestamp('received_at')->useCurrent();

            $table->unique(['provider', 'event_id'], 'uk_provider_event');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_webhook_events');
    }
};
