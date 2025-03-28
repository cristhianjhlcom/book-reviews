<?php

declare(strict_types=1);

use App\Http\Controllers\BookCreateController;
use App\Http\Controllers\BookIndexController;
use App\Models\Book;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'books' => Book::all(),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware(['is-admin'])->group(function () {
        Route::get('/books', BookIndexController::class)->name('books.index');
        Route::post('/books', BookCreateController::class)->name('books.create');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
