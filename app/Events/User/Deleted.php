<?php
namespace Pterodactyl\Events\User;

use Pterodactyl\Models\User;
use Illuminate\Queue\SerializesModels;

class Deleted
{
    use SerializesModels;

    /**
     * The Eloquent model of the server.
     *
     * @var \Pterodactyl\Models\User
     */
    public $user;

    /**
     * Create a new event instance.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
