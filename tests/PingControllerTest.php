<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class PingControllerTest extends WebTestCase
{
    public function testCreatePost(): void
    {
        $client = static::createClient();
        $crawler = $client->request(
            'POST',
            '/api/ping',
        );
        $responseData = \json_decode(
            $client->getResponse()->getContent(),
            true
        );

        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseFormatSame('json');
        $this->assertSame('PONG', $responseData['message']);
        $this->assertSame(true, \is_int($responseData['entity']['id']));
        $this->assertSame(true, \is_int($responseData['entity']['created_at']));
    }
}
