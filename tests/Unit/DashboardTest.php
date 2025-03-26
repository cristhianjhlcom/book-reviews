<?php

declare(strict_types=1);

use App\Models\User;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

describe('dashboard', function () {
    it('should redirect guests users to the login page', function () {
        $this->get('/dashboard')->assertRedirect('/login');
    });

    it('should allow authenticated users visit the dashboard', function () {
        $this->actingAs($user = User::factory()->create());

        $this->get('/dashboard')->assertOk();
    });
});
