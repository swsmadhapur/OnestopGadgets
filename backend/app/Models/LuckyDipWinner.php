<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LuckyDipWinner extends Model
{
    use HasFactory;

    protected $fillable = [
        'round_id',
        'draw_id',
        'entry_id',
        'prize_slot',
        'verification_status',
        'display_name_consent',
        'announced_at',
        'published_by',
    ];

    protected function casts(): array
    {
        return [
            'announced_at' => 'datetime',
            'prize_slot' => 'integer',
        ];
    }

    public function round(): BelongsTo
    {
        return $this->belongsTo(LuckyDipRound::class, 'round_id');
    }

    public function draw(): BelongsTo
    {
        return $this->belongsTo(LuckyDipDraw::class, 'draw_id');
    }

    public function entry(): BelongsTo
    {
        return $this->belongsTo(LuckyDipEntry::class, 'entry_id');
    }

    public function publishedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'published_by');
    }
}
