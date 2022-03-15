<?php

namespace App\Api\Log;

use App\Entity\Log;

class LogFactory
{
    public static function create(): Log
    {
        $log = new Log();

        return $log;
    }
}
