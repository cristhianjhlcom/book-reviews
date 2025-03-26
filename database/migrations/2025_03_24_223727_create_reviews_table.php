<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->string('book_isbn', 20);
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->text('comment')->nullable();
            $table->integer('rating')->default(0);
            $table->timestamps();
            $table->foreign('book_isbn')->references('isbn')->on('books')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
