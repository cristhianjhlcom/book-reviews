<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Gender;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
final class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(3);
        $slug = Str::slug($title);
        $gender = Gender::inRandomOrder()->first();

        return [
            'isbn' => $this->faker->isbn13(),
            'title' => $title,
            'slug' => $slug,
            'description' => $this->faker->paragraph(3),
            'gender_id' => $gender->id,
        ];
    }
}
