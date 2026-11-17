<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Property;
use App\Models\OffPlan;
use App\Models\Project;

class RealEstateSeeder extends Seeder
{
    public function run(): void
    {
        // Seed Ready Properties
        Property::updateOrCreate(
            ['slug' => 'farm-gardens-2-villa-4bed'],
            [
                'title' => '4 Bedroom Luxury Villa - Farm Gardens 2',
                'type' => 'Ready Villa',
                'price' => 'AED 7,200,000',
                'location' => 'The Valley by Emaar, Dubai',
                'bedrooms' => 4,
                'bathrooms' => 5,
                'area_sqft' => 4950,
                'status' => 'available',
            ]
        );

        Property::updateOrCreate(
            ['slug' => 'marina-gate-penthouse-3bed'],
            [
                'title' => '3 Bedroom Sky Penthouse - Marina Gate',
                'type' => 'Resale Luxury',
                'price' => 'AED 12,500,000',
                'location' => 'Dubai Marina',
                'bedrooms' => 3,
                'bathrooms' => 4,
                'area_sqft' => 3800,
                'status' => 'available',
            ]
        );

        // Seed Off-Plan Developments
        OffPlan::updateOrCreate(
            ['slug' => 'sobha-hartland-2-sky-villas'],
            [
                'title' => 'Sobha Hartland II - Waterfront Sky Villas',
                'developer' => 'Sobha Realty',
                'starting_price' => 'AED 3,800,000',
                'location' => 'Mohammed Bin Rashid City, Dubai',
                'completion_date' => 'Q4 2027',
                'payment_plan' => '60/40 Payment Plan',
                'status' => 'selling',
            ]
        );

        OffPlan::updateOrCreate(
            ['slug' => 'emaar-oasis-mansions'],
            [
                'title' => 'The Oasis by Emaar - Ultra Luxury Mansions',
                'developer' => 'Emaar Properties',
                'starting_price' => 'AED 15,000,000',
                'location' => 'The Oasis, Dubai',
                'completion_date' => 'Q2 2028',
                'payment_plan' => '80/20 On Completion',
                'status' => 'selling',
            ]
        );

        // Seed Master Projects
        Project::updateOrCreate(
            ['slug' => 'the-valley-emaar-master'],
            [
                'title' => 'The Valley Master Community',
                'developer' => 'Emaar Properties',
                'category' => 'Master Villa Community',
                'total_units' => 4500,
                'location' => 'Dubai - Al Ain Road',
                'status' => 'featured',
            ]
        );

        Project::updateOrCreate(
            ['slug' => 'dubai-hills-estate-master'],
            [
                'title' => 'Dubai Hills Estate',
                'developer' => 'Emaar Properties',
                'category' => 'Golf & Park Community',
                'total_units' => 10000,
                'location' => 'Mohammed Bin Rashid City',
                'status' => 'active',
            ]
        );
    }
}
