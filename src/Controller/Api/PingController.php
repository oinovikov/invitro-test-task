<?php

namespace App\Controller\Api;

use Psr\Container\NotFoundExceptionInterface;
use Psr\Container\ContainerExceptionInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\LogRepository;
use App\Api\Log\LogFactory;

class PingController extends AbstractController
{
    public function __construct(private LogRepository $log)
    {
    }

    /**
     * Creates new record by API.
     *
     * @throws NotFoundExceptionInterface
     *
     * @throws ContainerExceptionInterface
     *
     * @return Response
     */
    #[Route('/api/ping', name: 'app_api_ping_create', methods: ['POST'])]
    public function create(): Response
    {
        $entity = LogFactory::create();

        $this->log->add($entity);

        return $this->json([
            'entity' => [
                'id' => $entity->getId(),
                'created_at' => ($entity->getCreatedAt())->getTimestamp(),
            ],
            'message' => 'PONG',
        ], 201);
    }
}
