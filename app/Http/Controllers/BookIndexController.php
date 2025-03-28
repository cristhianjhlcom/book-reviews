<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Gender;
use Illuminate\Http\Request;

final class BookIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return inertia('books/views/index', [
            'books' => Book::with(['gender', 'reviews'])->get(),
            'genders' => Gender::all(),
        ]);
    }
}
