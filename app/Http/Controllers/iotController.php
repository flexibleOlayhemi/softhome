<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facade\DB;
use App\swiotmodel;

class iotController extends Controller
{
    public function index(){

        $status = swiotmodel::first(['fan','bulb','fridge']);
        return response()->json($status);
    }
   

    public function update(Request $request){
       
         swiotmodel::first()->update(['fan'=>$request['fan'],'bulb'=>$request['bulb'],'fridge'=>$request['fridge']]);
        return response()->json([
            'message' => 'Status Updated'
         ]);

    }
}
