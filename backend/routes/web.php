<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/api/ping', function () {
    return response()->json(['status' => 'ok']);
});

$router->get('/api/obras', 'ObrasController@index');
$router->post('/api/obras', 'ObrasController@store');
$router->get('/api/obras/{id}', 'ObrasController@show');
$router->put('/api/obras/{id}', 'ObrasController@update');
$router->delete('/api/obras/{id}', 'ObrasController@destroy');

$router->post('/api/calculos/{tipo}', 'CalculosController@calcular');
