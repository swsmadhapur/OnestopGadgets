<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LuckyDipDraw extends Model
{
    use HasFactory;

    protected $fillable = [
        'round_id',
        'algorithm_version',
        'eligible_set_hash',
        'seed_commitment',
        'seed_reveal_secure',
        'selected_entry_id',
        'initiated_by',
        'conducted_at',
        'state',
    ];

    protected function casts(): array
    {
        return [
            'conducted_at' => 'datetime',
        ];
    }

    public function round(): BelongsTo
    {
        return $this->belongsTo(LuckyDipRound::class, 'round_id');
    }

    public function selectedEntry(): BelongsTo
    {
        return $this->belongsTo(LuckyDipEntry::class, 'selected_entry_id');
    }

    public function initiatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'initiated_by');
    }
}
