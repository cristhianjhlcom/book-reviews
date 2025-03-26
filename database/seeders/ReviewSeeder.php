<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

final class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Review::factory()->count(50)->create();
    }
}
