<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Deal extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'merchant_id',
        'category_id',
        'title',
        'slug',
        'description',
        'image_path',
        'price_display',
        'original_price',
        'discount_percentage',
        'visibility',
        'status',
        'starts_at',
        'ends_at',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'price_display' => 'decimal:2',
            'original_price' => 'decimal:2',
            'discount_percentage' => 'integer',
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
        ];
    }

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function link(): HasOne
    {
        return $this->hasOne(DealLink::class);
    }

    public function clicks(): HasMany
    {
        return $this->hasMany(DealClick::class);
    }

    public function isPremium(): bool
    {
        return $this->visibility === 'premium';
    }

    public function isLive(): bool
    {
        return $this->status === 'published'
            && ($this->starts_at === null || $this->starts_at <= now())
            && ($this->ends_at === null || $this->ends_at >= now());
    }
}
