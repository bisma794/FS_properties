<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Page;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        Page::updateOrCreate(
            ['slug' => 'home'],
            [
                'title' => 'Home Page',
                'meta_title' => 'FS Real Estate Advisory - Premium Dubai Properties',
                'meta_description' => 'Discover luxury properties and real estate opportunities in Dubai.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'titleLine1' => 'DISCOVER THE',
                        'titleLine2' => 'RIGHT PROPERTY',
                        'titleLine3' => 'OPPORTUNITY.',
                        'subheading' => 'Curated opportunities. Intelligent insights. Aligned with your goals.',
                        'primaryCtaText' => 'Start AI Assessment',
                        'primaryCtaLink' => '/ai-assessment',
                        'secondaryCtaText' => 'Browse Opportunities',
                        'secondaryCtaLink' => '/the-valley',
                        'backgroundImage' => '/buy_hero.png',
                    ],
                    'featureBar' => [
                        [
                            'id' => 'ai-advisory',
                            'icon' => '/ai.png',
                            'title' => 'AI Advisory Engine',
                            'description' => 'Personalized recommendations based on your goals.',
                        ],
                        [
                            'id' => 'fs-scores',
                            'icon' => '/fs score.png',
                            'title' => 'FS Advisory Scores',
                            'description' => 'Proprietary rating across 10+ key factors.',
                        ],
                        [
                            'id' => 'curated-oppo',
                            'icon' => '/curated oppo.png',
                            'title' => 'Curated Opportunities',
                            'description' => 'Only opportunities that meet our advisory standards.',
                        ],
                        [
                            'id' => 'expert-guidance',
                            'icon' => '/exp guidance.png',
                            'title' => 'Expert Guidance',
                            'description' => 'Human expertise at every step of your journey.',
                        ],
                    ]
                ]
            ]
        );

        $otherPages = [
            [
                'slug' => 'about-us',
                'title' => 'About Us',
                'meta_title' => 'About Us | FS Real Estate Advisory',
                'meta_description' => 'We don\'t sell properties. We build strategies. Discover FS Real Estate Advisory.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'titleLine1' => 'REDEFINING REAL ESTATE',
                        'titleLine2' => 'ADVISORY IN DUBAI',
                        'titleLine3' => 'EXCELLENCE.',
                        'subheading' => 'Over a decade of excellence in property consulting and investment strategy.',
                        'primaryCtaText' => 'Contact Our Advisory Team',
                        'primaryCtaLink' => '/about-us',
                        'secondaryCtaText' => 'Explore Portfolio',
                        'secondaryCtaLink' => '/the-valley',
                        'backgroundImage' => '/about_hero.png',
                    ]
                ]
            ],
            [
                'slug' => 'the-valley',
                'title' => 'The Valley Community',
                'meta_title' => 'The Valley by Emaar - Luxury Villas',
                'meta_description' => 'Explore townhouses and villas in The Valley by Emaar.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'titleLine1' => 'THE VALLEY BY EMAAR',
                        'titleLine2' => 'LUXURY VILLAS & TOWNHOUSES',
                        'titleLine3' => 'DISCOVER MORE.',
                        'subheading' => 'A quaint town where life finds its inspiration amidst vast open spaces.',
                        'primaryCtaText' => 'View Available Units',
                        'primaryCtaLink' => '/the-valley',
                        'secondaryCtaText' => 'Download Floorplans',
                        'secondaryCtaLink' => '#',
                        'backgroundImage' => '/valley_hero.png',
                    ]
                ]
            ],
            [
                'slug' => 'compare-communities',
                'title' => 'Compare Communities',
                'meta_title' => 'Compare Communities | FS Real Estate Advisory',
                'meta_description' => 'Select communities to compare side by side with real-time insights.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'titleLine1' => 'COMPARE DUBAI',
                        'titleLine2' => 'COMMUNITIES SIDE BY SIDE',
                        'titleLine3' => 'INSIGHTS.',
                        'subheading' => 'Evaluate capital appreciation, rental yield, and lifestyle amenities across top master developments.',
                        'primaryCtaText' => 'Start Comparison',
                        'primaryCtaLink' => '/compare-communities',
                        'secondaryCtaText' => 'View Analytics',
                        'secondaryCtaLink' => '#',
                        'backgroundImage' => '/compare_hero.png',
                    ]
                ]
            ],
            [
                'slug' => 'advisory-report',
                'title' => 'Your Advisory Report',
                'meta_title' => 'Your Advisory Report | FS Real Estate Advisory',
                'meta_description' => 'Customized real estate advisory report tailored specifically based on your goals and preferences.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'titleLine1' => 'CUSTOM INVESTMENT',
                        'titleLine2' => 'ADVISORY REPORT',
                        'titleLine3' => 'TAILORED STRATEGY.',
                        'subheading' => 'Tailored property analysis matching your financial timeline and portfolio target.',
                        'primaryCtaText' => 'Download Full PDF',
                        'primaryCtaLink' => '#',
                        'secondaryCtaText' => 'Book Consultation',
                        'secondaryCtaLink' => '#',
                        'backgroundImage' => '/report_hero.png',
                    ]
                ]
            ],
            [
                'slug' => 'ai-assessment',
                'title' => 'AI Advisory Engine',
                'meta_title' => 'AI Advisory Engine | Real Estate Advisory',
                'meta_description' => 'Intelligent AI engine analysis for luxury real estate and property opportunities in Dubai.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'titleLine1' => 'AI ADVISORY',
                        'titleLine2' => 'ENGINE',
                        'titleLine3' => '',
                        'subheading' => 'What is your primary goal? This helps us tailor recommendations to what matters most to you.',
                        'primaryCtaText' => 'Start Assessment',
                        'primaryCtaLink' => '/ai-assessment',
                        'secondaryCtaText' => 'Learn More',
                        'secondaryCtaLink' => '#',
                        'backgroundImage' => '/ai_engine_hero.jpg',
                        'detailHtml' => '<h2>AI ADVISORY <span style="color:#BFA16A">ENGINE</span></h2><p>Intelligent algorithm matching your portfolio requirements with Dubai off-plan developments.</p>',
                    ],
                    'assessment' => [
                        'heading' => 'What is your primary goal?',
                        'subheading' => 'This helps us tailor recommendations to what matters most to you.',
                        'goals' => [
                            ['id' => 'family-home', 'title' => 'Family Home', 'subtitle' => 'Find The Perfect Place To Put Down Roots'],
                            ['id' => 'investment', 'title' => 'Investment', 'subtitle' => 'Build Wealth Through Real Estate'],
                            ['id' => 'global-clients', 'title' => 'Global Clients', 'subtitle' => 'Cross-Border Advisory With Local Expertise You Can Trust.'],
                            ['id' => 'passive-income', 'title' => 'Passive Income', 'subtitle' => 'Finding The Right Home In The Right Community.'],
                            ['id' => 'capital-growth', 'title' => 'Capital Growth', 'subtitle' => 'Building Wealth Through Strategic Real Estate Investments.'],
                            ['id' => 'luxury-lifestyle', 'title' => 'Luxury Lifestyle', 'subtitle' => 'Cross-Border Advisory With Local Expertise You Can Trust.'],
                        ]
                    ]
                ]
            ],
            [
                'slug' => 'buy',
                'title' => 'Buy Properties',
                'meta_title' => 'Buy Property in Dubai | Dubai Creek Harbour & R. Hills | FS Advisory',
                'meta_description' => 'Buy in Dubai with clarity. A measured search process for buyers who want context and comparison.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'titleLine1' => 'BUY PROPERTY',
                        'titleLine2' => 'IN DUBAI',
                        'titleLine3' => 'WITH CLARITY.',
                        'subheading' => 'Curated opportunities across Dubai Creek Harbour, R. Hills, and master developments.',
                        'primaryCtaText' => 'Browse Listings',
                        'primaryCtaLink' => '/buy',
                        'secondaryCtaText' => 'Filter Properties',
                        'secondaryCtaLink' => '#',
                        'backgroundImage' => '/buy_hero.png',
                    ]
                ]
            ],
            [
                'slug' => 'communities',
                'title' => 'Explore Communities',
                'meta_title' => 'Communities in Dubai | Dubai Creek Harbour & Top Areas | FS Advisory',
                'meta_description' => 'From waterfront energy to green family neighbourhoods, explore top Dubai master communities.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'titleLine1' => 'COMMUNITIES',
                        'titleLine2' => 'IN DUBAI',
                        'titleLine3' => 'EXPLORE.',
                        'subheading' => 'Explore 12 distinct ways to live and invest across Dubai top master neighborhoods.',
                        'primaryCtaText' => 'View Communities',
                        'primaryCtaLink' => '/communities',
                        'secondaryCtaText' => 'Compare Communities',
                        'secondaryCtaLink' => '/compare-communities',
                        'backgroundImage' => '/dubai hills.png',
                    ]
                ]
            ],
            [
                'slug' => 'community-detail',
                'title' => 'Community Detail (Dubai Creek Harbour)',
                'meta_title' => 'Dubai Creek Harbour | Community Detail | FS Real Estate Advisory',
                'meta_description' => 'A modern waterfront district with open skyline views, connected promenades and a growing collection of homes.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'titleLine1' => 'DUBAI CREEK',
                        'titleLine2' => 'HARBOUR',
                        'titleLine3' => 'WATERFRONT LIVING.',
                        'subheading' => 'A modern waterfront district with open skyline views, connected promenades and a growing collection of homes.',
                        'primaryCtaText' => 'View Opportunities',
                        'primaryCtaLink' => '/community-detail',
                        'secondaryCtaText' => 'Download Master Plan',
                        'secondaryCtaLink' => '#',
                        'backgroundImage' => '/buy_hero.png',
                    ]
                ]
            ],
            [
                'slug' => 'developers',
                'title' => 'Developers Directory',
                'meta_title' => 'All Developers in Dubai | FS Real Estate Advisory',
                'meta_description' => 'Explore leading master developers in Dubai with delivery track record and launch pipeline.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'titleLine1' => 'ALL DEVELOPERS',
                        'titleLine2' => 'IN DUBAI',
                        'titleLine3' => 'TRACK RECORD.',
                        'subheading' => 'Explore master-planned developers with global acclaim and dependable delivery timelines.',
                        'primaryCtaText' => 'Explore Developers',
                        'primaryCtaLink' => '/developers',
                        'secondaryCtaText' => 'Consult Advisor',
                        'secondaryCtaLink' => '#',
                        'backgroundImage' => '/dubai hills.png',
                    ]
                ]
            ],
            [
                'slug' => 'developer-detail',
                'title' => 'Developer Detail (Emaar Properties)',
                'meta_title' => 'Emaar Properties | Developer Details | FS Real Estate Advisory',
                'meta_description' => 'Pioneering master-planned communities with global acclaim, world-class amenities and a reliable delivery track record in Dubai.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'breadcrumb' => 'Developer / Emaar Properties',
                        'titleLine1' => 'EMAAR',
                        'titleLine2' => 'PROPERTIES',
                        'titleLine3' => '',
                        'subheading' => 'Pioneering master-planned communities with global acclaim, world-class amenities and a reliable delivery track record in Dubai.',
                        'primaryCtaText' => 'View Projects',
                        'primaryCtaLink' => '/developer-detail',
                        'secondaryCtaText' => 'Inquire Details',
                        'secondaryCtaLink' => '#',
                        'backgroundImage' => '/developer-hero.png',
                    ]
                ]
            ],
            [
                'slug' => 'project-main-page',
                'title' => 'Off-Plan Projects Hub',
                'meta_title' => 'Off-Plan Property For Sale In Dubai | FS Real Estate Advisory',
                'meta_description' => 'Discover Dubai most promising off-plan communities, homes & investment opportunities.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'titleLine1' => 'OFF-PLAN PROJECTS',
                        'titleLine2' => 'IN DUBAI',
                        'titleLine3' => 'NEW LAUNCHES.',
                        'subheading' => 'Curated off-plan launches with builder incentives and flexible milestone payments.',
                        'primaryCtaText' => 'Explore Projects',
                        'primaryCtaLink' => '/project-main-page',
                        'secondaryCtaText' => 'Compare Plans',
                        'secondaryCtaLink' => '#',
                        'backgroundImage' => '/grandpolo_club.png',
                    ]
                ]
            ],
            [
                'slug' => 'project-detail',
                'title' => 'Project Detail (Tessera Residences)',
                'meta_title' => 'Tessera Residences by Al Ghurair | Project Details | FS Real Estate Advisory',
                'meta_description' => 'Tessera is the first UAE project by Aires Mateus, offering 80 2-3BR residences with private foyers.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'titleLine1' => 'TESSERA RESIDENCES',
                        'titleLine2' => 'BY AL GHURAIR',
                        'titleLine3' => 'AIRES MATEUS.',
                        'subheading' => 'First UAE project by Aires Mateus offering luxury 2-3 bedroom residences with open-air terraces.',
                        'primaryCtaText' => 'Download Floorplans',
                        'primaryCtaLink' => '/project-detail',
                        'secondaryCtaText' => 'Book Tour',
                        'secondaryCtaLink' => '#',
                        'backgroundImage' => '/thevalley.png',
                    ]
                ]
            ],
            [
                'slug' => 'property-detail',
                'title' => 'Property Detail (Farm Gardens 2)',
                'meta_title' => '4 Bedroom Villa Farm Gardens 2 | The Valley by Emaar',
                'meta_description' => 'Explore 4 Bedroom Villa at Farm Gardens 2 in The Valley by Emaar with FS Real Estate Advisory insights.',
                'status' => 'published',
                'content' => [
                    'hero' => [
                        'titleLine1' => '4 BEDROOM LUXURY VILLA',
                        'titleLine2' => 'FARM GARDENS 2',
                        'titleLine3' => 'EMAAR DEVELOPMENTS.',
                        'subheading' => 'Luxurious contemporary farming estate living by Emaar with private garden spaces.',
                        'primaryCtaText' => 'Book Private Tour',
                        'primaryCtaLink' => '#',
                        'secondaryCtaText' => 'Download Brochure',
                        'secondaryCtaLink' => '#',
                        'backgroundImage' => '/farm_gardens.png',
                    ]
                ]
            ],
        ];

        foreach ($otherPages as $p) {
            Page::updateOrCreate(['slug' => $p['slug']], $p);
        }
    }
}
