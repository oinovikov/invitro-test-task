<?php

namespace App\DataFixtures;

use App\Entity\Log;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class LogFixture extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $log = new Log();

        $manager->persist($log);
        $manager->flush();
    }
}
