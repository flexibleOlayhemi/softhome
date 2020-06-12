<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/',function(){
    return view('switches');
});
Route::get('/test',function(){
    return (<h1> Test page </h1>);
});

//response route on call
Route::get('/status','iotController@index');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
