<?php
namespace Pterodactyl\Events\User;

use AG\DiscordMsg;
use Pterodactyl\Models\User;
use Illuminate\Queue\SerializesModels;

class Created
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
        (new \AG\DiscordMsg(
            "```diff\n+ ".$this->user->username." vient de s'inscrire !```",
            'https://discordapp.com/api/webhooks/868793642314256405/cZdEgECxspBseGab8jIn21ofJm2GlLB1B2_BxSqSXZpU_QRnR2ZUPyHxdBaZgzE_4qwt',
            config('app.name').' - Logs authentification',
            ''
        ))->send();
    }
    
}
