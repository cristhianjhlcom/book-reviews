<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

final class BookCreateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        Book::create($request->validate([
            'isbn' => ['required', 'max:20'],
            'title' => ['required'],
            'description' => ['required', 'max:300'],
            'gender_id' => ['required', 'exists:genders,id'],
        ]));

        return to_route('books.index');
    }
}
