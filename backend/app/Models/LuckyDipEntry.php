<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class LuckyDipEntry extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'round_id',
        'user_id',
        'name_snapshot_encrypted',
        'email_snapshot_encrypted',
        'phone_snapshot_encrypted',
        'rules_accepted_at',
        'marketing_opt_in',
        'eligibility_status',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'name_snapshot_encrypted' => 'encrypted',
            'email_snapshot_encrypted' => 'encrypted',
            'phone_snapshot_encrypted' => 'encrypted',
            'rules_accepted_at' => 'datetime',
            'marketing_opt_in' => 'boolean',
            'created_at' => 'datetime',
        ];
    }

    public function round(): BelongsTo
    {
        return $this->belongsTo(LuckyDipRound::class, 'round_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function winner(): HasOne
    {
        return $this->hasOne(LuckyDipWinner::class, 'entry_id');
    }
}
