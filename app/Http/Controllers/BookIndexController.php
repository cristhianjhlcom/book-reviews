<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Gender;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

final class BookIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $folder = config('filesystems.disks.spaces.folder');
        return inertia('books/views/index', [
            'books' => Book::with(['gender', 'reviews'])->get()->map(function ($book) use ($folder) {
                return [
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
                    'reviews' => $book->reviews,
                ];
            }),
            'genders' => Gender::all(),
        ]);
    }
}
