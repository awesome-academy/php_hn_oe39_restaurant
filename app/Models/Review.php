<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'content',
        'display',
        'user_id',
        'book_id',
        'rate',
    ];

    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($review) {
            foreach ($review->comments()->get() as $comment) {
                $comment->delete();
            }
        });
    }
}
