<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Gender;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

final class HomeIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {

        $folder = config('filesystems.disks.spaces.folder');

        return inertia('home/index', [
            'books' => Book::with(['gender', 'reviews'])->get()->map(function ($book) use ($folder) {
                return [
                    'isbn' => $book->isbn,
                    'title' => Str::words($book->title, 3),
                    'description' => $book->description,
                    'images' => [
                        'original' => Storage::disk('spaces')->url("{$folder}/uploads/original/{$book->image}"),
                        'large' => Storage::disk('spaces')->url("{$folder}/uploads/large/{$book->image}"),
                        'medium' => Storage::disk('spaces')->url("{$folder}/uploads/medium/{$book->image}"),
                        'small' => Storage::disk('spaces')->url("{$folder}/uploads/small/{$book->image}"),
                        'thumbnail' => Storage::disk('spaces')->url("{$folder}/uploads/thumbnail/{$book->image}"),
                    ],
                    'isbn' => $book->isbn,
                    'gender' => $book->gender,
                    'rating' => [
                        'count' => $book->reviews->count(),
                        'average' => $book->getAverageRatingAttribute(),
                        'total' => $book->reviews->sum('rating'),
                        'stars' => round($book->getAverageRatingAttribute() * 5),
                        'reviews' => $book->reviews,
                    ],
                ];
            }),
            'booksCount' => Book::count(),
            'genders' => Gender::all(),
            'gendersCount' => Gender::count(),
        ]);
    }
}
