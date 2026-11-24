<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class LuckyDipRound extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'prize_name',
        'prize_image_path',
        'starts_at',
        'ends_at',
        'selection_at',
        'status',
        'rules_version',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'selection_at' => 'datetime',
            'published_at' => 'datetime',
        ];
    }

    public function entries(): HasMany
    {
        return $this->hasMany(LuckyDipEntry::class, 'round_id');
    }

    public function draws(): HasMany
    {
        return $this->hasMany(LuckyDipDraw::class, 'round_id');
    }

    public function winners(): HasMany
    {
        return $this->hasMany(LuckyDipWinner::class, 'round_id');
    }

    public function isCurrent(): bool
    {
        return $this->status === 'active'
            && $this->starts_at <= now()
            && $this->ends_at >= now();
    }
}
