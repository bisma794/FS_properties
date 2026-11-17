<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OffPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'developer',
        'starting_price',
        'location',
        'completion_date',
        'payment_plan',
        'status',
        'image_url',
    ];
}
