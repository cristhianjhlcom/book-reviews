<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Book;
use App\Models\Gender;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'books' => Book::all(),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'books' => Book::with('gender')->get(),
            'genders' => Gender::all(),
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
