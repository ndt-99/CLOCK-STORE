<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class CartController extends Controller {
    function getAllCart(){
    try{
        $carts = Cache::get('carts');
        if($carts){
            $carts = array_values($carts);
        }else{
            $carts = [];
        }
        return response()->json($carts);
    }catch(\Exception $e){
        Log::error('message: ' . $e->getMessage() . 'line: ' . $e->getLine() . 'file: ' . $e->getFile());
    }
    }
    function addToCart($id){
        $product = Product::find($id);
        $carts = Cache::get('carts');
        if(isset($carts[$id])){
            $carts[$id]['quantity']++;
            $carts[$id]['price'] = $product->price;
        }else{
            $carts[$id] = [
                'id' => $id,
                'quantity' => 1,
                'name' => $product->name,
                'price' => $product->price,
                'image' => $product->image,
            ];
        }
        Cache::put('carts', $carts);
    }
    function removeToCart($id){
    try{
        $carts = Cache::get('carts');
        unset($carts[$id]);
        Cache::put('carts', $carts);
    }catch(\Exception $e){
        Log::error('message: ' . $e->getMessage() . 'line: ' . $e->getLine() . 'file: ' . $e->getFile());
    }
    }
    function removeAllCart(){
    try{
        Cache::forget('carts');
    }catch(\Exception $e){
        Log::error('message: ' . $e->getMessage() . 'line: ' . $e->getLine() . 'file: ' . $e->getFile());
    }
    }
    function updateCart($id, $quantity){
    try{
        $carts = Cache::get('carts');
        $carts[$id]['quantity'] = $quantity;
        Cache::put('carts', $carts);
    }catch(\Exception $e){
        Log::error('message: ' . $e->getMessage() . 'line: ' . $e->getLine() . 'file: ' . $e->getFile());
    }
    }
}