<?php

namespace Tests\Feature;

use Tests\TestCase;

class PingTest extends TestCase
{
    public function test_ping_returns_ok_json(): void
    {
        $this->get('/api/ping');

        $this->assertEquals(200, $this->response->getStatusCode());
        $this->assertSame('{"status":"ok"}', $this->response->getContent());
    }
}
