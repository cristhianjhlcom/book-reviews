<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

final class HomeShowController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $folder = config('filesystems.disks.spaces.folder');
        $book = Book::where('isbn', $request->id)->with(['gender', 'reviews'])->firstOrFail();

        return inertia('home/show', [
            'book' => [
                'isbn' => $book->isbn,
                'title' => $book->title,
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
            ],
        ]);
    }
}
