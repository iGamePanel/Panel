<?php

use Pterodactyl\Http\Controllers\Auth\RegisterController;

Route::group(['middleware' => 'guest'], function () {
    Route::get('/login', 'LoginController@index')->name('auth.login');
    Route::get('/password', 'LoginController@index')->name('auth.forgot-password');
    Route::get('/password/reset/{token}', 'LoginController@index')->name('auth.reset');

    Route::get('/register', 'RegisterController@index')->name('auth.login');
    Route::post('/register', 'RegisterController@register')->middleware('recaptcha');

    Route::post('/login', 'LoginController@login')->middleware('recaptcha');
    Route::post('/login/checkpoint', 'LoginCheckpointController')->name('auth.login-checkpoint');

    Route::post('/password', 'ForgotPasswordController@sendResetLinkEmail')->middleware('recaptcha');

    Route::post('/password/reset', 'ResetPasswordController')->name('auth.reset-password');

    Route::fallback('LoginController@index');
});

Route::get('/logout', 'LoginController@logout')->name('auth.logout')->middleware('auth');
