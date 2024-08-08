<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::group([
        'prefix' => 'test',
        'as' => 'test.',
    ], function () {
        Route::get('/', [TestController::class, 'index'])->name('index');
        Route::get('/create', [TestController::class, 'create'])->name('create'); //not yet implemented
        Route::patch('/store', [TestController::class, 'store'])->name('store'); //not yet implemented
    });

    Route::group([
        'prefix' => 'announcement',
        'as' => 'announcement.',
    ], function () {
        Route::get('/', [AnnouncementController::class, 'index'])->name('index');
        Route::get('/create', [AnnouncementController::class, 'create'])->name('create');
        Route::patch('/store', [AnnouncementController::class, 'get'])->name('store');
    });
});

require __DIR__.'/auth.php';
