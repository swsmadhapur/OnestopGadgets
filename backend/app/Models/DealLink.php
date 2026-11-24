<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DealLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'deal_id',
        'destination_url_encrypted',
        'approved_host',
        'tracking_code',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'destination_url_encrypted' => 'encrypted',
            'is_active' => 'boolean',
        ];
    }

    public function deal(): BelongsTo
    {
        return $this->belongsTo(Deal::class);
    }
}
