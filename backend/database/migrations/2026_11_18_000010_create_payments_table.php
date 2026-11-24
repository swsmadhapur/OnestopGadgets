<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('subscription_orders')->onDelete('cascade');
            $table->string('gateway_payment_id', 100)->unique();
            $table->unsignedInteger('amount_minor');
            $table->char('currency', 3)->default('INR');
            $table->enum('status', ['captured', 'refunded', 'disputed'])->default('captured');
            $table->timestamp('paid_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
