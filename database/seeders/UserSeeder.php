<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

final class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'email' => 'superadmin@email.com',
            'password' => '12345678',
            'is_admin' => true,
        ]);

        User::factory()->count(20)->create();
    }
}
