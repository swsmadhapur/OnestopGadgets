<?php

namespace App\Services\Billing;

use App\Models\AuditLog;
use App\Models\Payment;
use App\Models\PaymentWebhookEvent;
use App\Models\Subscription;
use App\Models\SubscriptionOrder;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class WebhookService
{
    /**
     * Idempotently processes payment webhook events from Razorpay / Cashfree.
     */
    public function processWebhook(string $provider, string $eventId, array $payload, string $rawBody, string $signature): array
    {
        $payloadHash = hash('sha256', $rawBody);

        // 1. Verify Signature (Razorpay / Cashfree HMAC)
        $this->verifySignature($provider, $rawBody, $signature);

        // 2. Check Idempotency Ledger
        $existingEvent = PaymentWebhookEvent::where('provider', $provider)
            ->where('event_id', $eventId)
            ->first();

        if ($existingEvent) {
            return ['status' => 'ignored', 'reason' => 'Duplicate webhook event already handled.'];
        }

        return DB::transaction(function () use ($provider, $eventId, $payload, $payloadHash) {
            // Record Event
            $eventRecord = PaymentWebhookEvent::create([
                'provider' => $provider,
                'event_id' => $eventId,
                'payload_hash' => $payloadHash,
                'processing_status' => 'received',
                'received_at' => now(),
            ]);

            // Handle payment.captured / payment.success
            $eventType = $payload['event'] ?? 'payment.captured';
            if ($eventType === 'payment.captured' || $eventType === 'order.paid') {
                $orderIdGateway = $payload['payload']['payment']['entity']['order_id'] ?? $payload['order_id'] ?? null;
                $paymentIdGateway = $payload['payload']['payment']['entity']['id'] ?? $payload['payment_id'] ?? null;
                $amountMinor = $payload['payload']['payment']['entity']['amount'] ?? $payload['amount'] ?? 0;

                $order = SubscriptionOrder::where('gateway_order_id', $orderIdGateway)->lockForUpdate()->first();
                if ($order && $order->status !== 'paid') {
                    $order->update(['status' => 'paid']);

                    Payment::create([
                        'order_id' => $order->id,
                        'gateway_payment_id' => $paymentIdGateway,
                        'amount_minor' => $amountMinor,
                        'currency' => 'INR',
                        'status' => 'captured',
                        'paid_at' => now(),
                    ]);

                    // Provision Subscription
                    $plan = $order->plan;
                    $startsAt = now();
                    $endsAt = now()->addDays($plan->duration_days);

                    Subscription::create([
                        'user_id' => $order->user_id,
                        'plan_id' => $plan->id,
                        'order_id' => $order->id,
                        'status' => 'active',
                        'starts_at' => $startsAt,
                        'ends_at' => $endsAt,
                    ]);

                    $eventRecord->update(['processing_status' => 'processed']);
                }
            }

            return ['status' => 'processed'];
        });
    }

    private function verifySignature(string $provider, string $rawBody, string $signature): void
    {
        $secret = config("services.{$provider}.webhook_secret", 'test_secret_key');
        $expected = hash_hmac('sha256', $rawBody, $secret);

        if (!hash_equals($expected, $signature)) {
            throw ValidationException::withMessages(['signature' => 'Invalid webhook signature.']);
        }
    }
}
