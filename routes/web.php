<?php

declare(strict_types=1);

use App\Http\Controllers\BookCreateController;
use App\Http\Controllers\BookIndexController;
use App\Http\Controllers\HomeIndexController;
use App\Http\Controllers\HomeShowController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeIndexController::class)->name('home.index');
Route::get('/books/{id}', HomeShowController::class)->name('home.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware(['is-admin'])->group(function () {
        Route::get('/books', BookIndexController::class)->name('books.index');
        Route::post('/books', BookCreateController::class)->name('books.create');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
