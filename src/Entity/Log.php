<?php

namespace App\Entity;

use DateTime, DateTimeInterface;
use App\Repository\LogRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LogRepository::class)]
class Log
{
    /**
     * Item ID.
     *
     * @var null|int
     */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id;

    /**
     * Item creation timestamp.
     *
     * @var null|DateTimeInterface
     */
    #[ORM\Column(name: 'created_at', type: 'datetime')]
    private ?DateTimeInterface $createdAt;


    public function __construct()
    {
        $this->createdAt = new DateTime();
    }

    /**
     * Returns item ID.
     *
     * @return null|int
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Returns item creation timestamp.
     *
     * @return null|DateTimeInterface
     */
    public function getCreatedAt(): ?DateTimeInterface
    {
        return $this->createdAt;
    }
}
