<?php
namespace Pterodactyl\Services\Logs;

use Pterodactyl\Contracts\Repository\LocationRepositoryInterface;

class Discord
{
    static function handle($message, $username)
    {
        if(!config('aiwun.logs.discord.enabled')) return;
        $url = config('aiwun.logs.discord.url');
        $headers = [ 'Content-Type: application/json; charset=utf-8' ];
        $POST = ['username' => $username, 'content' => $message];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($POST));
        $response   = curl_exec($ch);
    }
}
