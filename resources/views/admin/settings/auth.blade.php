@extends('layouts.admin')
@include('partials/admin.settings.nav', ['activeTab' => 'auth'])

@section('title')
    Paramètres
@endsection

@section('content-header')
    <h1>Configuration du panel<small>Avec iGamePanel c'est plus simple.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li><a href="{{ route('admin.settings') }}">Paramètres</a></li>
        <li class="active">authentication</li>
    </ol>
@endsection

@section('content')
    @yield('settings::nav')
    @php
        if(isset($test)) print_r($test);
    @endphp
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Paramètres du système d'authentication</h3>
                </div>
                <form action="{{ route('admin.settings.auth') }}" method="POST">
                    <div class="box-body">
                        <div class="row">
                            <div class="form-group col-md-4">
                                <label class="control-label">Require 2-Factor Authentication</label>
                                <div>
                                    <div class="btn-group" data-toggle="buttons">
                                        @php
                                            $level = old('pterodactyl:auth:2fa_required', config('pterodactyl.auth.2fa_required'));
                                        @endphp
                                        <label class="btn btn-primary @if ($level == 0) active @endif">
                                            <input type="radio" name="pterodactyl:auth:2fa_required" autocomplete="off" value="0" @if ($level == 0) checked @endif> Not Required
                                        </label>
                                        <label class="btn btn-primary @if ($level == 1) active @endif">
                                            <input type="radio" name="pterodactyl:auth:2fa_required" autocomplete="off" value="1" @if ($level == 1) checked @endif> Admin Only
                                        </label>
                                        <label class="btn btn-primary @if ($level == 2) active @endif">
                                            <input type="radio" name="pterodactyl:auth:2fa_required" autocomplete="off" value="2" @if ($level == 2) checked @endif> All Users
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">Inscription</label><br>
                                <div class="btn-group" data-toggle="buttons">
                                    @php
                                        $register = old('aiwun:auth:register', config('aiwun.auth.register'));
                                    @endphp
                                    <label class="btn btn-primary @if ($register == 1) active @endif">
                                        <input type="radio" name="aiwun:auth:register" autocomplete="off" value="1" @if ($level == 1) checked @endif> Activer
                                    </label>
                                    <label class="btn btn-primary @if ($register == 0) active @endif">
                                        <input type="radio" name="aiwun:auth:register" autocomplete="off" value="0" @if ($level == 0) checked @endif> Désactiver
                                    </label>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="box-footer">
                        {!! csrf_field() !!}
                        <button type="submit" name="_method" value="PATCH" class="btn btn-sm btn-primary pull-right">Valider les changements</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
