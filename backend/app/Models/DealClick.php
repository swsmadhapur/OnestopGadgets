<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DealClick extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'deal_id',
        'user_id_nullable',
        'clicked_at',
        'referrer_tag',
        'session_hash',
        'ip_masked',
    ];

    protected function casts(): array
    {
        return [
            'clicked_at' => 'datetime',
        ];
    }

    public function deal(): BelongsTo
    {
        return $this->belongsTo(Deal::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id_nullable');
    }
}
