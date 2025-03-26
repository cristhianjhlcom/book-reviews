<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
final class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first();
        $book = Book::inRandomOrder()->first();

        return [
            'user_id' => $user->id,
            'book_isbn' => $book->isbn,
            'comment' => $this->faker->paragraph(2),
            'rating' => $this->faker->numberBetween(1, 5),
        ];
    }
}
