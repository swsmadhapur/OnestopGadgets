<?php

namespace App\Services\AffiliateRedirect;

use App\Models\Deal;
use App\Models\DealClick;
use App\Models\Merchant;
use App\Models\User;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\ValidationException;

class RedirectService
{
    /**
     * Generate safe outbound redirect URL following allowlist and entitlement checks.
     */
    public function generateOutboundRedirect(Deal $deal, ?User $user, ?string $referrer, ?string $sessionHash, string $clientIp): array
    {
        // 1. Verify Deal is live
        if (!$deal->isLive()) {
            throw ValidationException::withMessages(['deal' => 'This deal is no longer active.']);
        }

        // 2. Check Entitlement if deal is premium
        if ($deal->isPremium()) {
            if (!$user || !$user->hasActiveSubscription()) {
                throw new \Illuminate\Auth\Access\AuthorizationException('Active VIP subscription required to access this deal.');
            }
        }

        // 3. Validate Destination Host against Merchant Allowlist
        $dealLink = $deal->link;
        if (!$dealLink || !$dealLink->is_active) {
            throw ValidationException::withMessages(['link' => 'Deal affiliate link is inactive or unavailable.']);
        }

        $merchant = $deal->merchant;
        $targetHost = parse_url($dealLink->destination_url_encrypted, PHP_URL_HOST);

        if (!$targetHost || !$this->isAllowedHost($targetHost, $merchant->domain)) {
            throw ValidationException::withMessages(['security' => 'Destination host is not authorized.']);
        }

        // 4. Log telemetry asynchronously (minimizing PII)
        DealClick::create([
            'deal_id' => $deal->id,
            'user_id_nullable' => $user?->id,
            'clicked_at' => now(),
            'referrer_tag' => substr($referrer ?? 'direct', 0, 100),
            'session_hash' => $sessionHash ? hash('sha256', $sessionHash) : null,
            'ip_masked' => $this->maskIp($clientIp),
        ]);

        return [
            'redirect_url' => $dealLink->destination_url_encrypted,
            'expires_in' => 60,
        ];
    }

    private function isAllowedHost(string $host, string $approvedDomain): bool
    {
        $host = strtolower($host);
        $approvedDomain = strtolower($approvedDomain);

        return $host === $approvedDomain || str_ends_with($host, '.' . $approvedDomain);
    }

    private function maskIp(string $ip): string
    {
        if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
            $parts = explode('.', $ip);
            return $parts[0] . '.' . $parts[1] . '.*.*';
        }
        return 'masked_ip';
    }
}
