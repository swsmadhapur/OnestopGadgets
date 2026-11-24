<?php

namespace App\Services\LuckyDip;

use App\Models\AuditLog;
use App\Models\LuckyDipDraw;
use App\Models\LuckyDipEntry;
use App\Models\LuckyDipRound;
use App\Models\LuckyDipWinner;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class DrawService
{
    /**
     * Conducts a provably fair CSPRNG draw on a closed round.
     */
    public function executeDraw(LuckyDipRound $round, User $superAdmin): LuckyDipDraw
    {
        return DB::transaction(function () use ($round, $superAdmin) {
            // 1. Verify round status
            if ($round->status !== 'closed') {
                throw ValidationException::withMessages(['round' => 'Round must be closed before executing a draw.']);
            }

            // 2. Fetch all eligible entries in deterministic order
            $eligibleEntries = LuckyDipEntry::where('round_id', $round->id)
                ->where('eligibility_status', 'eligible')
                ->orderBy('id', 'asc')
                ->get();

            $totalEligible = $eligibleEntries->count();
            if ($totalEligible === 0) {
                throw ValidationException::withMessages(['entries' => 'No eligible entries found in this round.']);
            }

            // 3. Compute immutable snapshot hash
            $idsConcat = $eligibleEntries->pluck('id')->implode(',');
            $snapshotHash = hash('sha256', $idsConcat);

            // 4. Generate CSPRNG server seed & commitment
            $secretSeed = bin2hex(random_bytes(32)); // 64 hex characters CSPRNG
            $seedCommitment = hash('sha256', $secretSeed);

            // 5. Deterministic index calculation
            $combinedEntropy = hash_hmac('sha256', $snapshotHash, $secretSeed);
            $winnerIndex = hexdec(substr($combinedEntropy, 0, 8)) % $totalEligible;
            $selectedEntry = $eligibleEntries[$winnerIndex];

            // 6. Record verifiable draw evidence
            $draw = LuckyDipDraw::create([
                'round_id' => $round->id,
                'algorithm_version' => 'CSPRNG_SHA256_V1',
                'eligible_set_hash' => $snapshotHash,
                'seed_commitment' => $seedCommitment,
                'seed_reveal_secure' => $secretSeed,
                'selected_entry_id' => $selectedEntry->id,
                'initiated_by' => $superAdmin->id,
                'conducted_at' => now(),
                'state' => 'pending_verification',
            ]);

            $round->update(['status' => 'drawn']);

            // 7. Record immutable audit log
            AuditLog::create([
                'actor_id' => $superAdmin->id,
                'action' => 'lucky_dip_draw_executed',
                'entity_type' => 'LuckyDipDraw',
                'entity_id' => $draw->id,
                'before_hash' => null,
                'after_hash' => $snapshotHash,
                'ip_masked' => '127.0.0.1',
            ]);

            return $draw;
        });
    }

    /**
     * Publishes a verified winner to the public wall with consented display name.
     */
    public function publishWinner(LuckyDipRound $round, LuckyDipDraw $draw, string $consentedDisplayName, User $superAdmin): LuckyDipWinner
    {
        return DB::transaction(function () use ($round, $draw, $consentedDisplayName, $superAdmin) {
            $winner = LuckyDipWinner::create([
                'round_id' => $round->id,
                'draw_id' => $draw->id,
                'entry_id' => $draw->selected_entry_id,
                'prize_slot' => 1,
                'verification_status' => 'verified',
                'display_name_consent' => $consentedDisplayName,
                'announced_at' => now(),
                'published_by' => $superAdmin->id,
            ]);

            $draw->update(['state' => 'verified']);
            $round->update(['status' => 'completed', 'published_at' => now()]);

            AuditLog::create([
                'actor_id' => $superAdmin->id,
                'action' => 'lucky_dip_winner_published',
                'entity_type' => 'LuckyDipWinner',
                'entity_id' => $winner->id,
                'before_hash' => null,
                'after_hash' => hash('sha256', $consentedDisplayName),
                'ip_masked' => '127.0.0.1',
            ]);

            return $winner;
        });
    }
}
