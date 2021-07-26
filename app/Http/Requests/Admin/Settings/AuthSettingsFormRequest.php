<?php

namespace Pterodactyl\Http\Requests\Admin\Settings;

use Illuminate\Validation\Rule;
use Pterodactyl\Http\Requests\Admin\AdminFormRequest;

class AuthSettingsFormRequest extends AdminFormRequest
{
    /**
     * @return array
     */
    public function rules()
    {
        return [
            'aiwun:auth:register' => 'required|integer|in:0,1',
            'pterodactyl:auth:2fa_required' => 'required|integer|in:0,1,2',
        ];
    }

    /**
     * @return array
     */
    public function attributes()
    {
        return [
            'aiwun:auth:register' => 'Inscription',
            'pterodactyl:auth:2fa_required' => 'Require 2-Factor Authentication',
        ];
    }
}
