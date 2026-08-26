<?php

declare(strict_types=1);

namespace Iconmind\Blade;

use BladeUI\Icons\Factory;
use Illuminate\Contracts\Container\Container;
use Illuminate\Support\ServiceProvider;

final class BladeIconmindServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->callAfterResolving(Factory::class, function (Factory $factory, Container $container) {
            $factory->add('iconmind', [
                'path' => __DIR__ . '/../resources/svg',
                'prefix' => 'im',
            ]);
        });
    }
}
