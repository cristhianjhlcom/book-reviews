<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Review extends Model
{
    /** @use HasFactory<\Database\Factories\ReviewFactory> */
    use HasFactory;

    protected $fillable = [
        'book_isbn',
        'user_id',
        'comment',
        'rating',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'book_isbn', 'isbn');
    }
}
