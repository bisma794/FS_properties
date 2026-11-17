<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Property;

use App\Models\OffPlan;

class PropertySeeder extends Seeder
{
    public function run(): void
    {
        $properties = [
            [
                'title' => 'Creekside Residences',
                'slug' => 'creekside-residences',
                'developer' => 'Emaar Properties',
                'starting_price' => 'AED 1,650,000',
                'location' => 'Dubai Creek Harbour',
                'completion_date' => 'Q4 2027',
                'payment_plan' => '60/40 On Handover',
                'status' => 'selling',
                'image_url' => '/dubai_hills.png',
            ],
            [
                'title' => 'Parkside Villas',
                'slug' => 'parkside-villas',
                'developer' => 'Emaar Properties',
                'starting_price' => 'AED 5,200,000',
                'location' => 'Dubai Hills Estate',
                'completion_date' => 'Q3 2027',
                'payment_plan' => '70/30 On Handover',
                'status' => 'selling',
                'image_url' => '/dubai hills.png',
            ],
            [
                'title' => 'Canal House',
                'slug' => 'canal-house',
                'developer' => 'Omniyat',
                'starting_price' => 'AED 2,100,000',
                'location' => 'Business Bay',
                'completion_date' => 'Q2 2028',
                'payment_plan' => '50/50 Handover',
                'status' => 'selling',
                'image_url' => '/valley_center.png',
            ],
            [
                'title' => 'Opera District Suites',
                'slug' => 'opera-district-suites',
                'developer' => 'Emaar Properties',
                'starting_price' => 'AED 3,400,000',
                'location' => 'Downtown Dubai',
                'completion_date' => 'Q1 2028',
                'payment_plan' => '60/40 Handover',
                'status' => 'selling',
                'image_url' => '/golden_beach.png',
            ],
            [
                'title' => 'Seafront Mansions',
                'slug' => 'seafront-mansions',
                'developer' => 'Nakheel',
                'starting_price' => 'AED 18,500,000',
                'location' => 'Palm Jumeirah',
                'completion_date' => 'Q4 2028',
                'payment_plan' => '80/20 Handover',
                'status' => 'selling',
                'image_url' => '/buy_hero.png',
            ],
            [
                'title' => 'Farm Gardens II',
                'slug' => 'farm-gardens-ii',
                'developer' => 'Emaar Properties',
                'starting_price' => 'AED 4,100,000',
                'location' => 'The Valley by Emaar',
                'completion_date' => 'Q2 2027',
                'payment_plan' => '60/40 Handover',
                'status' => 'selling',
                'image_url' => '/thevalley.png',
            ],
            [
                'title' => 'Greenville Towns',
                'slug' => 'greenville-towns',
                'developer' => 'Emaar South',
                'starting_price' => 'AED 2,800,000',
                'location' => 'Emaar South',
                'completion_date' => 'Q3 2027',
                'payment_plan' => '70/30 Handover',
                'status' => 'selling',
                'image_url' => '/sports_village.png',
            ],
            [
                'title' => 'Harmony Residences',
                'slug' => 'harmony-residences',
                'developer' => 'Majid Al Futtaim',
                'starting_price' => 'AED 4,600,000',
                'location' => 'Tilal Al Ghaf',
                'completion_date' => 'Q1 2028',
                'payment_plan' => '60/40 Handover',
                'status' => 'selling',
                'image_url' => '/valleyicon.png',
            ],
            [
                'title' => 'Harbour Gate Towers',
                'slug' => 'harbour-gate-towers',
                'developer' => 'Emaar Properties',
                'starting_price' => 'AED 2,900,000',
                'location' => 'Dubai Marina',
                'completion_date' => 'Q4 2027',
                'payment_plan' => '60/40 Handover',
                'status' => 'selling',
                'image_url' => '/dubai_hills.png',
            ],
            [
                'title' => 'Mediterranean Villas',
                'slug' => 'mediterranean-villas',
                'developer' => 'DAMAC Properties',
                'starting_price' => 'AED 3,200,000',
                'location' => 'DAMAC Lagoons',
                'completion_date' => 'Q3 2027',
                'payment_plan' => '70/30 Handover',
                'status' => 'selling',
                'image_url' => '/valley_center.png',
            ],
            [
                'title' => 'Palmera Estates',
                'slug' => 'palmera-estates',
                'developer' => 'Emaar Properties',
                'starting_price' => 'AED 8,900,000',
                'location' => 'The Oasis',
                'completion_date' => 'Q4 2028',
                'payment_plan' => '80/20 Handover',
                'status' => 'selling',
                'image_url' => '/golden_beach.png',
            ],
            // Projects featured on Developer Detail Page
            [
                'title' => 'DAMAC Island 2',
                'slug' => 'damac-island-2',
                'developer' => 'DAMAC Properties',
                'starting_price' => 'AED 3,550,000',
                'location' => 'Dubai, Dubai',
                'completion_date' => 'Q1 2030',
                'payment_plan' => '30/70',
                'status' => 'selling',
                'image_url' => '/developers/damac-island-2.png',
            ],
            [
                'title' => 'DAMAC Islands - Hawaii',
                'slug' => 'damac-islands-hawaii',
                'developer' => 'DAMAC Properties',
                'starting_price' => 'AED 2,490,000',
                'location' => 'Dubai, Dubai',
                'completion_date' => 'Q2 2029',
                'payment_plan' => '70/30',
                'status' => 'selling',
                'image_url' => '/developers/damac-hawaii.png',
            ],
            [
                'title' => 'DAMAC District New Launch',
                'slug' => 'damac-district-new-launch',
                'developer' => 'DAMAC Properties',
                'starting_price' => 'AED 780,000',
                'location' => 'Dubai, Dubai',
                'completion_date' => 'Update soon',
                'payment_plan' => '40/60',
                'status' => 'selling',
                'image_url' => '/developers/damac-district.png',
            ],
            [
                'title' => 'Emaar Creek Crescent',
                'slug' => 'emaar-creek-crescent',
                'developer' => 'Emaar Properties',
                'starting_price' => 'AED 1,750,000',
                'location' => 'Dubai Creek Harbour, Dubai',
                'completion_date' => 'Q2 2027',
                'payment_plan' => 'Flexible',
                'status' => 'selling',
                'image_url' => '/developers/emaar-creek-crescent.png',
            ],
            [
                'title' => 'Emaar Raya',
                'slug' => 'emaar-raya',
                'developer' => 'Emaar Properties',
                'starting_price' => 'AED 2,670,000',
                'location' => 'Arabian Ranches III, Dubai',
                'completion_date' => 'On request',
                'payment_plan' => 'Flexible',
                'status' => 'selling',
                'image_url' => '/developers/emaar-raya.png',
            ],
        ];

        // Empty property listings table
        Property::truncate();

        // Seed Off-Plan Projects
        foreach ($properties as $prop) {
            OffPlan::updateOrCreate(
                ['slug' => $prop['slug']],
                $prop
            );
        }
    }
}
