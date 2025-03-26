<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Gender;
use Illuminate\Database\Seeder;

final class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genders = [
            ['name' => 'Ciencia Ficción', 'slug' => 'ciencia-ficcion'],
            ['name' => 'Fantasía', 'slug' => 'fantasia'],
            ['name' => 'Terror', 'slug' => 'terror'],
            ['name' => 'Novela Histórica', 'slug' => 'novela-historica'],
            ['name' => 'Romance', 'slug' => 'romance'],
            ['name' => 'Misterio', 'slug' => 'misterio'],
            ['name' => 'Aventura', 'slug' => 'aventura'],
            ['name' => 'Poesía', 'slug' => 'poesia'],
            ['name' => 'Drama', 'slug' => 'drama'],
            ['name' => 'Thriller', 'slug' => 'thriller'],
        ];

        foreach ($genders as $gender) {
            Gender::create($gender);
        }
    }
}
