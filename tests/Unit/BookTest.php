<?php

declare(strict_types=1);

use App\Models\User;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

describe('books', function () {
    it('should redirect guests users to the login page', function () {
        $this->get(route('books.index'))->assertRedirect('/login');
    });

    it('should allow authenticated users visit the books section', function () {
        $this->actingAs($user = User::factory()->create(['is_admin' => 1]));

        $this->get(route('books.index'))->assertOk();
    });
});
