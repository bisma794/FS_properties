<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('off_plans', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('developer');
            $table->string('starting_price');
            $table->string('location');
            $table->string('completion_date');
            $table->string('payment_plan')->nullable();
            $table->enum('status', ['selling', 'coming_soon', 'sold_out'])->default('selling');
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('off_plans');
    }
};
