<?php

describe('welcome', function () {
    it('returns a 200 status code on visit', function() {
        $response = $this->get('/');

        $response->assertStatus(200);
    });
});
