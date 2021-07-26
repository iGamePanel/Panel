<?php

namespace Pterodactyl\Http\Controllers\Auth;

use Carbon\CarbonImmutable;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Contracts\View\View;
use Illuminate\Contracts\Config\Repository;
use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\Contracts\Cache\Repository as CacheRepository;
use Pterodactyl\Contracts\Repository\UserRepositoryInterface;
use Pterodactyl\Exceptions\Repository\RecordNotFoundException;
use Pterodactyl\Services\Users\UserCreationService;

class RegisterController extends AbstractLoginController
{
    /**
     * @var \Pterodactyl\Services\Users\UserCreationService
     */
    protected $creationService;

    /**
     * @var \Illuminate\Contracts\View\Factory
     */
    private $view;

    /**
     * @var \Illuminate\Contracts\Cache\Repository
     */
    private $cache;

    /**
     * @var \Pterodactyl\Contracts\Repository\UserRepositoryInterface
     */
    private $repository;

    /**
     * RegisterController constructor.
     */
    public function __construct(
        AuthManager $auth,
        Repository $config,
        CacheRepository $cache,
        UserRepositoryInterface $repository,
        ViewFactory $view,
        UserCreationService $creationService,
    ) {
        parent::__construct($auth, $config);

        $this->view = $view;
        $this->cache = $cache;
        $this->repository = $repository;
        $this->creationService = $creationService;
    }

    public function index(): View
    {
        return $this->view->make('templates/auth.core');
    }

    /**
     * Handle a Register request to the application.
     *
     * @return \Illuminate\Http\JsonResponse|void
     *
     * @throws \Pterodactyl\Exceptions\DisplayException
     * @throws \Illuminate\Validation\ValidationException
     */
    public function register(Request $request): JsonResponse
    {
        $username = $request->input('username');
        $nom = $request->input('nom');
        $prenom = $request->input('prenom');
        $email = $request->input('email');
        $password = $request->input('password');

        try {
            if(config('aiwun.auth.register') == 1){
                $user = $this->creationService->handle(array(
                    "email" => $email,
                    "username" => $username,
                    "name_first" => $prenom,
                    "name_last" => $nom,
                    "password" => $password,
                    "root_admin" => false
                ));
            } else {
                return JsonResponse::create([
                    'data' => [
                        'complete' => false,
                        'reason' => 'disabled',
                    ],
                ]);
            }
        } catch (RecordNotFoundException $exception) {
            return $this->sendFailedLoginResponse($request);
        }

        return JsonResponse::create([
            'data' => [
                'complete' => true,
            ],
        ]);
    }
}
