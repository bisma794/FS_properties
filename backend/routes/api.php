<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\OffPlanController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\UploadController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/health', function () {
    return response()->json([
        'status' => 'online',
        'service' => 'FS Properties Laravel Backend API',
        'timestamp' => now()->toIso8601String(),
    ]);
});

Route::post('/upload', [UploadController::class, 'upload']);
Route::apiResource('pages', PageController::class);
Route::apiResource('properties', PropertyController::class);
Route::apiResource('off-plans', OffPlanController::class);
Route::apiResource('projects', ProjectController::class);

