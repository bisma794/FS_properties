'use client';

import { useState, useEffect } from 'react';
import RichTextSummernote from '@/components/RichTextSummernote';
import DynamicPageBuilder from '@/components/DynamicPageBuilder';
import { DynamicSectionInstance } from '@/components/dynamicPageTypes';
import CoverImagePicker from '@/components/CoverImagePicker';
import IconDropdownSelect from '@/components/IconDropdownSelect';

// Interfaces
interface PageItem {
  id: number;
  title: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  content?: any;
  status: 'draft' | 'published';
  created_at?: string;
  updated_at?: string;
}

interface PropertyItem {
  id: number;
  title: string;
  slug: string;
  type: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  status: 'available' | 'reserved' | 'sold';
  image_url?: string;
  content?: any;
}

interface OffPlanItem {
  id: number;
  title: string;
  slug: string;
  developer: string;
  starting_price: string;
  location: string;
  completion_date: string;
  payment_plan?: string;
  status: 'selling' | 'coming_soon' | 'sold_out';
  type?: string;
  imageUrl?: string;
  content?: any;
}

const DEFAULT_PAGES: PageItem[] = [
  {
    id: 1,
    title: 'Home Page',
    slug: 'home',
    meta_title: 'FS Real Estate Advisory - Premium Dubai Properties',
    meta_description: 'Discover luxury properties and real estate opportunities in Dubai.',
    status: 'published',
  },
  {
    id: 2,
    title: 'About Us',
    slug: 'about-us',
    meta_title: 'About Us | FS Real Estate Advisory',
    meta_description: "We don't sell properties. We build strategies. Discover FS Real Estate Advisory.",
    status: 'published',
  },
  {
    id: 3,
    title: 'AI Advisory Engine',
    slug: 'ai-assessment',
    meta_title: 'AI Advisory Engine | Real Estate Advisory',
    meta_description: 'Intelligent AI engine analysis for luxury real estate and property opportunities in Dubai.',
    status: 'published',
  },
  {
    id: 4,
    title: 'Buy Properties',
    slug: 'buy',
    meta_title: 'Buy Property in Dubai | Dubai Creek Harbour & R. Hills | FS Advisory',
    meta_description: 'Buy in Dubai with clarity. A measured search process for buyers who want context and comparison.',
    status: 'published',
  },
  {
    id: 5,
    title: 'Buy Detail',
    slug: 'buy-detail',
    meta_title: 'Lake View | Rare to Market | Garden Hall | Buy Details | FS Advisory',
    meta_description: 'Exclusive Lake View Garden Hall Villa in Jumeirah Islands. Explore detailed floor plans, views, payment plans and advisory insights with FS Advisory.',
    status: 'published',
  },
  {
    id: 6,
    title: 'Explore Communities',
    slug: 'communities',
    meta_title: 'Communities in Dubai | Dubai Creek Harbour & Top Areas | FS Advisory',
    meta_description: 'From waterfront energy to green family neighbourhoods, explore top Dubai master communities.',
    status: 'published',
  },
  {
    id: 7,
    title: 'Community Detail (Dubai Creek Harbour)',
    slug: 'community-detail',
    meta_title: 'Dubai Creek Harbour | Community Detail | FS Real Estate Advisory',
    meta_description: 'A modern waterfront district with open skyline views, connected promenades and a growing collection of homes.',
    status: 'published',
  },
  {
    id: 8,
    title: 'Compare Communities',
    slug: 'compare-communities',
    meta_title: 'Compare Communities | FS Real Estate Advisory',
    meta_description: 'Select communities to compare side by side with real-time insights.',
    status: 'published',
  },
  {
    id: 9,
    title: 'Opportunities (Recommendation Result)',
    slug: 'opportunities',
    meta_title: 'Opportunities | FS Real Estate Advisory',
    meta_description: 'Personalized property recommendation results and opportunities tailored to your investment and lifestyle goals.',
    status: 'published',
  },
  {
    id: 17,
    title: 'Your Advisory Report',
    slug: 'advisory-report',
    meta_title: 'Your Advisory Report | FS Real Estate Advisory',
    meta_description: 'Customized real estate advisory report tailored specifically based on your goals and preferences.',
    status: 'published',
  },
  {
    id: 10,
    title: 'Developers Directory',
    slug: 'developers',
    meta_title: 'All Developers in Dubai | FS Real Estate Advisory',
    meta_description: 'Explore leading master developers in Dubai with delivery track record and launch pipeline.',
    status: 'published',
  },
  {
    id: 11,
    title: 'Developer Detail (Emaar Properties)',
    slug: 'developer-detail',
    meta_title: 'Emaar Properties | Developer Details | FS Real Estate Advisory',
    meta_description: 'Pioneering master-planned communities with global acclaim, world-class amenities and a reliable delivery track record in Dubai.',
    status: 'published',
  },
  {
    id: 12,
    title: 'Off-Plan Projects Hub',
    slug: 'project-main-page',
    meta_title: 'Off-Plan Property For Sale In Dubai | FS Real Estate Advisory',
    meta_description: 'Discover Dubai most promising off-plan communities, homes & investment opportunities.',
    status: 'published',
  },
  {
    id: 13,
    title: 'Project Detail',
    slug: 'project-detail',
    meta_title: 'Boulevard Heights Executive Residences BLVD | Project Details | FS Advisory',
    meta_description: 'Boulevard Heights Executive Residences BLVD in Downtown Dubai. Starting price AED 2,850,000.',
    status: 'published',
  },
  {
    id: 14,
    title: 'Property Detail',
    slug: 'property-detail',
    meta_title: 'Farm Gardens 2 Luxury Villa | Property Details | FS Advisory',
    meta_description: 'Experience refined architectural luxury in Farm Gardens 2 with FS Real Estate Advisory.',
    status: 'published',
  },
  {
    id: 15,
    title: 'Real Estate Blogs',
    slug: 'blog',
    meta_title: 'Real Estate News & Insights | FS Real Estate Advisory',
    meta_description: "Expert insights, market analysis, and the latest updates on Dubai's thriving real estate market.",
    status: 'published',
  },
  {
    id: 16,
    title: 'Blog Details',
    slug: 'blog-details',
    meta_title: 'Hillside Park By Emaar | Blog Details | FS Real Estate Advisory',
    meta_description: 'Hillside Park by Emaar at Dubai Hills Estate detailed breakdown, pricing, layouts and numbers.',
    status: 'published',
  },
];

interface BlogCMSItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  tag?: string;
  author?: string;
  introParagraph: string;
  secondParagraph: string;
  bodyParagraphs?: string[];
  imageSrc: string;
  secondImageSrc?: string;
  status: 'published' | 'draft';
  keyFigures?: {
    developer?: string;
    community?: string;
    unitTypes?: string;
    unitSizes?: string;
    startingPrice?: string;
    downPayment?: string;
    paymentPlan?: string;
    expectedHandover?: string;
  };
  content?: any;
}

const DEFAULT_BLOGS_CMS: BlogCMSItem[] = [
  {
    id: 1,
    title: 'Hillside Park By Emaar At Dubai Hills Estate',
    slug: 'hillside-park-dubai-hills',
    category: 'Real Estate',
    date: 'August 28, 2026',
    tag: 'Featured Guide',
    author: 'FS Editorial Advisory',
    introParagraph:
      "If You've Spent Any Time Scrolling Through Dubai's Off-Plan Market Lately, You've Probably Come Across Hillside Park By Emaar. It's One Of Those Projects That Keeps Popping Up In Every “Top Picks” List For Dubai Hills Estate, And Honestly, Once You Look At The Numbers, It's Easy To See Why.",
    secondParagraph:
      "This Isn't A Project With Flashy Skyline Views Or Beachfront Drama. What Hillside Park Dubai Hills Estate Offers Instead Is Something Quieter. It Has Rolling Green Surroundings, A Walkable Community Feel, And A Location That Puts You Close To Almost Everything Without The Price Tag Of Downtown Or The Marina.",
    bodyParagraphs: [
      "Hillside Park Emaar Is A Residential Development Of 1, 2, And 3-Bedroom Apartments Tucked Into Dubai Hills Estate, One Of The City's Most Established Master-Planned Communities. Emaar Describes The Design As Blending Contemporary Architecture With The Natural Topography Of The Area.",
      "Unit Sizes Run From Around 675 Sq. Ft For The Smaller Layouts Up To 1,777 Sq. Ft For The Larger Three-Bedroom Options. That's A Fairly Wide Range, Which Means Hillside Park Apartments Can Work For A Single Professional Just As Easily As A Small Family Looking To Upgrade From A Rental.",
      "Let's Talk Numbers, Since That's Usually The First Question Anyone Asks. The Hillside Park Price Starts From Around AED 1.2–1.8 Million, Based On Launch Pricing Shared By Emaar Sales Channels.",
    ],
    imageSrc: '/Rectangle 34625593.png',
    secondImageSrc: '/image 299.png',
    status: 'published',
    keyFigures: {
      developer: 'EMAAR PROPERTIES',
      community: 'DUBAI HILLS ESTATE',
      unitTypes: '1, 2 & 3-BEDROOM APARTMENTS',
      unitSizes: '675 SQ. FT – 1,777 SQ. FT',
      startingPrice: 'AED 1.2 – 1.8 MILLION',
      downPayment: '10%',
      paymentPlan: '80/20',
      expectedHandover: '2029',
    },
  },
  {
    id: 2,
    title: 'Where every life finds a home – Dubai Property Journal',
    slug: 'where-every-life-finds-a-home',
    category: 'News',
    date: 'September 01, 2026',
    tag: 'Dubai property journal',
    author: 'Market Insights Team',
    introParagraph:
      'Dubai continues to establish itself as a premier destination for global property seekers, offering unprecedented lifestyle choices and residency benefits across iconic master developments.',
    secondParagraph:
      'From waterfront sanctuaries along the Arabian Gulf to family-centric golf estates, every neighborhood brings a distinctive character and investment trajectory.',
    bodyParagraphs: [
      'Comprehensive market updates, buyer guides, and neighborhood stories help investors make confident property acquisitions in Dubai.',
    ],
    imageSrc: '/dubaiproperty-journal.png',
    secondImageSrc: '/dubai hills.png',
    status: 'published',
    keyFigures: {
      developer: 'MASTER DEVELOPERS',
      community: 'DUBAI METROPOLITAN',
      unitTypes: 'VILLAS, TOWNHOUSES & APARTMENTS',
      unitSizes: '800 SQ. FT – 8,500 SQ. FT',
      startingPrice: 'AED 1,500,000',
      downPayment: '10% – 20%',
      paymentPlan: 'FLEXIBLE 70/30',
      expectedHandover: '2027 – 2030',
    },
  },
  {
    id: 3,
    title: 'Rent to Own Properties in Dubai in 2026 – Affordable Payment Plans',
    slug: 'rent-to-own-properties-dubai-affordable-payment-plans',
    category: 'Real Estate',
    date: 'September 01, 2026',
    tag: 'Affordable Living',
    author: 'Financial Advisory Desk',
    introParagraph:
      'Rent to own schemes in Dubai are gaining massive popularity in 2026, offering aspiring homeowners a realistic pathway to property ownership without massive upfront capital.',
    secondParagraph:
      'Under these structured contracts, a predetermined portion of your monthly rental payments is credited directly towards your purchase equity.',
    bodyParagraphs: [
      'Learn about eligible communities, key developer contracts, and financial metrics that make rent-to-own an attractive option in Dubai.',
    ],
    imageSrc: '/affordable-plans.png',
    secondImageSrc: '/thevalley.png',
    status: 'published',
    keyFigures: {
      developer: 'VARIOUS REGISTERED DEVELOPERS',
      community: 'JVC, DUBAI SOUTH, ARJAN',
      unitTypes: 'STUDIOS, 1 & 2-BEDROOM APARTMENTS',
      unitSizes: '450 SQ. FT – 1,200 SQ. FT',
      startingPrice: 'AED 650,000',
      downPayment: '5%',
      paymentPlan: 'RENT-TO-OWN (5-YEAR TERM)',
      expectedHandover: 'READY / 2026',
    },
  },
  {
    id: 4,
    title: 'Rent to Own Properties in Dubai in 2026 – Best Investment Options',
    slug: 'rent-to-own-properties-dubai-best-investment-options',
    category: 'Real Estate',
    date: 'September 01, 2026',
    tag: 'Investor Guide',
    author: 'Investment Strategy Group',
    introParagraph:
      'Evaluating the highest-yielding rent-to-own investment opportunities across emerging corridors in Dubai with solid capital appreciation forecasts.',
    secondParagraph:
      'Understanding legal clauses, exit options, and landlord-tenant protections mandated under Dubai Land Department rules.',
    bodyParagraphs: [
      'Comparative returns between standard off-plan mortgages versus structured rent-to-own programs for modern investors.',
    ],
    imageSrc: '/best-investment.png',
    secondImageSrc: '/thevalley-phase2.png',
    status: 'published',
    keyFigures: {
      developer: 'TIER-1 PRIVATE DEVELOPERS',
      community: 'BUSINESS BAY & MEYDAN',
      unitTypes: 'APARTMENTS & DUPLEXES',
      unitSizes: '750 SQ. FT – 1,650 SQ. FT',
      startingPrice: 'AED 1,100,000',
      downPayment: '10%',
      paymentPlan: 'CUSTOMIZED INVESTOR PLAN',
      expectedHandover: '2026 – 2027',
    },
  },
  {
    id: 5,
    title: 'Buying Land in Dubai | Residential & Commercial Guide 2026',
    slug: 'buying-land-in-dubai-residential-commercial-guide-2026',
    category: 'Real Estate',
    date: 'September 01, 2026',
    tag: 'Land Acquisition',
    author: 'Commercial Real Estate Desk',
    introParagraph:
      'A thorough walkthrough on acquiring freehold plots in Dubai for bespoke residential villa construction or commercial mixed-use developments.',
    secondParagraph:
      'Zoning guidelines, Floor Area Ratios (FAR), construction timelines, and regulatory approvals with the Dubai Municipality.',
    bodyParagraphs: [
      'Prime locations including Pearl Jumeirah, Jumeirah Bay, and Dubai Hills Estate where land plots offer remarkable long-term value.',
    ],
    imageSrc: '/buying-landin-dubai.png',
    secondImageSrc: '/dubai-expocity.png',
    status: 'published',
    keyFigures: {
      developer: 'DUBAI HOLDING / MERAAS',
      community: 'PEARL JUMEIRAH & JUMEIRAH ISLANDS',
      unitTypes: 'RESIDENTIAL & COMMERCIAL PLOTS',
      unitSizes: '5,000 SQ. FT – 25,000 SQ. FT',
      startingPrice: 'AED 4,500,000',
      downPayment: '20%',
      paymentPlan: 'MILESTONE BASED',
      expectedHandover: 'IMMEDIATE / READY TO BUILD',
    },
  },
  {
    id: 6,
    title: 'Pros and Cons of Living in Palm Jebel Ali',
    slug: 'pros-and-cons-of-living-in-palm-jebel-ali',
    category: 'Coming Soon',
    date: 'August 28, 2024',
    tag: 'Coming-soon',
    author: 'Luxury Lifestyle Specialist',
    introParagraph:
      'Palm Jebel Ali is a breathtaking megaproject that redefines luxurious waterfront living. The exceptional architecture and double-scale expanse make it Dubai’s most anticipated coastal destination.',
    secondParagraph:
      'With pristine private beaches, yacht marinas, and ultra-luxury beach villas, here are the core advantages and considerations for buyers.',
    bodyParagraphs: [
      'Comparing Palm Jebel Ali with Palm Jumeirah in terms of pricing, villa footprints, privacy, and handover horizons.',
    ],
    imageSrc: '/pros-n-cons.png',
    secondImageSrc: '/grandpolo.png',
    status: 'published',
    keyFigures: {
      developer: 'NAKHEEL PROPERTIES',
      community: 'PALM JEBEL ALI',
      unitTypes: 'BEACH VILLAS & CORAL MANSIONS',
      unitSizes: '7,300 SQ. FT – 19,000 SQ. FT',
      startingPrice: 'AED 18,500,000',
      downPayment: '20%',
      paymentPlan: '80/20',
      expectedHandover: '2028 – 2029',
    },
  },
  {
    id: 7,
    title: 'Luxury Apartments on Al Marjan Island',
    slug: 'luxury-apartments-on-al-marjan-island',
    category: 'Coming Soon',
    date: 'August 28, 2024',
    tag: 'Coming-soon',
    author: 'Regional Market Analyst',
    introParagraph:
      'Al Marjan Island is rapidly transforming into the premier resort lifestyle hub in the Northern Emirates, anchored by luxury beachfront branded residences and world-class leisure attractions.',
    secondParagraph:
      'Investors are securing waterfront residences with high short-term rental yields and remarkable capital appreciation trajectories.',
    bodyParagraphs: [
      'Detailed review of shoreline complexes, payment structures, and tourism-driven growth projections.',
    ],
    imageSrc: '/al-marjan.png',
    secondImageSrc: '/thevalley.png',
    status: 'published',
    keyFigures: {
      developer: 'DAMAC & MARJAN',
      community: 'AL MARJAN ISLAND, RAK',
      unitTypes: '1, 2 & 3-BEDROOM SEAFRONT SUITES',
      unitSizes: '850 SQ. FT – 2,400 SQ. FT',
      startingPrice: 'AED 1,600,000',
      downPayment: '10%',
      paymentPlan: '60/40',
      expectedHandover: 'Q4 2027',
    },
  },
  {
    id: 8,
    title: 'Experience Modern Living Elegant Apartments Surrounded by Nshama',
    slug: 'experience-modern-living-elegant-apartments-nshama',
    category: 'Coming Soon',
    date: 'July 7, 2024',
    tag: 'Coming-soon',
    author: 'Community Reviewer',
    introParagraph:
      'Introducing a wide range of stylish 1, 2, and 3-bedroom residences in Town Square Dubai, surrounded by lush parks, retail boulevards, and active family amenities.',
    secondParagraph:
      'Nshama has established a benchmark for urban master community living with accessible entry price points and top-tier maintenance.',
    bodyParagraphs: [
      'Comprehensive walkthrough of unit floorplans, lifestyle facilities, and rental yields in Town Square.',
    ],
    imageSrc: '/modern-living.png',
    secondImageSrc: '/dubai hills.png',
    status: 'published',
    keyFigures: {
      developer: 'NSHAMA',
      community: 'TOWN SQUARE DUBAI',
      unitTypes: '1, 2 & 3-BEDROOM APARTMENTS',
      unitSizes: '620 SQ. FT – 1,450 SQ. FT',
      startingPrice: 'AED 790,000',
      downPayment: '10%',
      paymentPlan: '50/50',
      expectedHandover: 'Q3 2026',
    },
  },
  {
    id: 9,
    title: 'Marina Views at Rashid Yachts and Marina Redefining luxury living',
    slug: 'marina-views-at-rashid-yachts-and-marina',
    category: 'Coming Soon',
    date: 'July 4, 2024',
    tag: 'Coming-soon',
    author: 'Maritime Living Desk',
    introParagraph:
      'Welcome to Marina Views, a distinguished Emaar Properties development situated in the energetic Mina Rashid coastal district overlooking world-class superyachts.',
    secondParagraph:
      'Combining heritage maritime charm with cutting-edge contemporary glass architecture and tranquil waterfront promenades.',
    bodyParagraphs: [
      'Exploring unit types, infinity pool decks, and convenient access to Downtown Dubai and Dubai International Airport.',
    ],
    imageSrc: '/marina-view.png',
    secondImageSrc: '/Rectangle 34625593.png',
    status: 'published',
    keyFigures: {
      developer: 'EMAAR PROPERTIES',
      community: 'RASHID YACHTS & MARINA',
      unitTypes: '1 TO 4-BEDROOM APARTMENTS',
      unitSizes: '780 SQ. FT – 3,100 SQ. FT',
      startingPrice: 'AED 1,950,000',
      downPayment: '10%',
      paymentPlan: '90/10',
      expectedHandover: 'Q4 2028',
    },
  },
  {
    id: 10,
    title: 'Latest Pros And Cons Of Living In The Valley Phase 2 Community',
    slug: 'pros-and-cons-of-living-in-the-valley-phase-2',
    category: 'Coming Soon',
    date: 'August 28, 2024',
    tag: 'Coming-soon',
    author: 'Suburban Living Specialist',
    introParagraph:
      'The News provides a thorough look into moving to The Valley Phase 2 by Emaar Properties, featuring expansive rolling hills, adventure parks, and nature trails.',
    secondParagraph:
      'Ideal for families seeking a wholesome lifestyle away from the high-density city center while maintaining highway connectivity.',
    bodyParagraphs: [
      'Analysis of townhouse layouts, retail centers, and projected handover milestones.',
    ],
    imageSrc: '/thevalley-phase2.png',
    secondImageSrc: '/thevalley.png',
    status: 'published',
    keyFigures: {
      developer: 'EMAAR PROPERTIES',
      community: 'THE VALLEY, DUBAI',
      unitTypes: '3 & 4-BEDROOM TOWNHOUSE VILLAS',
      unitSizes: '2,450 SQ. FT – 3,200 SQ. FT',
      startingPrice: 'AED 2,850,000',
      downPayment: '10%',
      paymentPlan: '80/20',
      expectedHandover: 'Q1 2029',
    },
  },
  {
    id: 11,
    title: 'Dubai Expo City launches limited edition villas starting at Dh6.1 million',
    slug: 'dubai-expo-city-launches-limited-edition-villas',
    category: 'Coming Soon',
    date: 'July 7, 2024',
    tag: 'Coming-soon',
    author: 'Eco-Living Desk',
    introParagraph:
      'If you want to become the owner of luxurious limited edition sustainable villas at Expo City Dubai, this latest release presents unmatched architectural sophistication.',
    secondParagraph:
      'Designed to the highest LEED green building standards with private garden courtyards and direct access to Expo Valley parks.',
    bodyParagraphs: [
      'Overview of 4 and 5-bedroom luxury villas, subterranean parking, and wellness amenities.',
    ],
    imageSrc: '/dubai-expocity.png',
    secondImageSrc: '/grandpolo.png',
    status: 'published',
    keyFigures: {
      developer: 'EXPO CITY DUBAI',
      community: 'EXPO VALLEY, DUBAI',
      unitTypes: '4 & 5-BEDROOM STANDALONE VILLAS',
      unitSizes: '4,500 SQ. FT – 6,800 SQ. FT',
      startingPrice: 'AED 6,100,000',
      downPayment: '20%',
      paymentPlan: '70/30',
      expectedHandover: 'Q2 2027',
    },
  },
];

const DEFAULT_PROPERTIES: PropertyItem[] = [
  {
    id: 1,
    title: 'Lake View | Rare to Market | Garden Hall',
    slug: 'lake-view-garden-hall-jumeirah-islands',
    type: 'Villa',
    price: 'AED 24,750,000',
    location: 'Cluster 50, Mediterranean Clusters, Jumeirah Islands, Dubai',
    bedrooms: 4,
    bathrooms: 5,
    area_sqft: 10643,
    status: 'available',
    image_url: '/bannerimg.png',
  },
];

const DEFAULT_OFFPLAN_PROJECTS: OffPlanItem[] = [
  // 1. Projects from project-main-page (ProjectGridSection)
  {
    id: 1,
    title: 'DAMAC Island 2',
    slug: 'damac-island-2',
    developer: 'DAMAC Properties',
    starting_price: 'AED 3,550,000',
    location: 'Dubai Island, Dubai',
    completion_date: 'Q1 2030',
    payment_plan: '30/70',
    status: 'selling',
    type: 'Villas & Mansions',
    imageUrl: '/developers/damac-island-2.png',
  },
  {
    id: 2,
    title: 'DAMAC Islands - Hawaii',
    slug: 'damac-islands-hawaii',
    developer: 'DAMAC Properties',
    starting_price: 'AED 2,490,000',
    location: 'Dubai Islands, Dubai',
    completion_date: 'Q2 2029',
    payment_plan: '70/30',
    status: 'selling',
    type: 'Townhouses',
    imageUrl: '/developers/damac-hawaii.png',
  },
  {
    id: 3,
    title: 'DAMAC District',
    slug: 'damac-district',
    developer: 'DAMAC Properties',
    starting_price: 'AED 780,000',
    location: 'Business Bay, Dubai',
    completion_date: 'Q4 2028',
    payment_plan: '40/60',
    status: 'selling',
    type: 'Apartments',
    imageUrl: '/developers/damac-district.png',
  },
  {
    id: 4,
    title: 'DAMAC Riverside',
    slug: 'damac-riverside',
    developer: 'DAMAC Properties',
    starting_price: 'AED 1,990,000',
    location: 'Dubai South, Dubai',
    completion_date: 'Q4 2028',
    payment_plan: '70/30',
    status: 'selling',
    type: 'Townhouses & Villas',
    imageUrl: '/developers/damac-island-lagoon.png',
  },
  {
    id: 5,
    title: 'The Valley - Phase 2',
    slug: 'the-valley-phase-2',
    developer: 'Emaar Properties',
    starting_price: 'AED 2,850,000',
    location: 'Dubailand, Dubai',
    completion_date: 'Q1 2029',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Townhouses',
    imageUrl: '/thevalley-phase2.png',
  },
  {
    id: 6,
    title: 'Dubai Hills Estate - Parkside',
    slug: 'dubai-hills-estate-parkside',
    developer: 'Emaar Properties',
    starting_price: 'AED 1,750,000',
    location: 'Dubai Hills, Dubai',
    completion_date: 'Q3 2028',
    payment_plan: '50/50',
    status: 'selling',
    type: 'Apartments & Townhouses',
    imageUrl: '/dubai hills.png',
  },
  {
    id: 7,
    title: 'Sobha Hartland II - Riverside',
    slug: 'sobha-hartland-2-riverside',
    developer: 'Sobha Realty',
    starting_price: 'AED 1,480,000',
    location: 'MBR City, Dubai',
    completion_date: 'Q4 2027',
    payment_plan: '60/40',
    status: 'selling',
    type: 'Apartments',
    imageUrl: '/developers/emaar-creek-crescent.png',
  },
  {
    id: 8,
    title: 'Palm Jebel Ali - Beach Collection',
    slug: 'palm-jebel-ali-beach-collection',
    developer: 'Nakheel',
    starting_price: 'AED 18,500,000',
    location: 'Palm Jebel Ali, Dubai',
    completion_date: 'Q4 2029',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Luxury Mansions & Villas',
    imageUrl: '/dubai_hills.png',
  },
  {
    id: 9,
    title: 'Central Park at City Walk',
    slug: 'central-park-city-walk',
    developer: 'Meraas',
    starting_price: 'AED 2,900,000',
    location: 'City Walk, Dubai',
    completion_date: 'Q1 2028',
    payment_plan: '50/50',
    status: 'selling',
    type: 'Apartments',
    imageUrl: '/thevalley.png',
  },
  {
    id: 10,
    title: 'Haven by Aldar',
    slug: 'haven-by-aldar',
    developer: 'Aldar Properties',
    starting_price: 'AED 2,550,000',
    location: 'Dubailand, Dubai',
    completion_date: 'Q3 2027',
    payment_plan: '70/30',
    status: 'selling',
    type: 'Luxury Villas',
    imageUrl: '/thevalley-img.png',
  },
  {
    id: 11,
    title: 'Creek Waters 2',
    slug: 'creek-waters-2',
    developer: 'Emaar Properties',
    starting_price: 'AED 2,200,000',
    location: 'Dubai Creek Harbour, Dubai',
    completion_date: 'Q4 2027',
    payment_plan: '90/10',
    status: 'selling',
    type: 'Waterfront Apartments',
    imageUrl: '/developers/emaar-creek-crescent.png',
  },
  {
    id: 12,
    title: 'Marina Shores',
    slug: 'marina-shores',
    developer: 'Emaar Properties',
    starting_price: 'AED 3,100,000',
    location: 'Dubai Marina, Dubai',
    completion_date: 'Q4 2026',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Waterfront Apartments',
    imageUrl: '/thevalley.png',
  },

  // 2. Projects from developer-detail (DeveloperProjectsSection)
  {
    id: 13,
    title: 'EMAAR Creek Crescent',
    slug: 'emaar-creek-crescent',
    developer: 'Emaar Properties',
    starting_price: 'AED 1,750,000',
    location: 'Dubai Creek Harbour, Dubai',
    completion_date: 'Q2 2027',
    payment_plan: 'Flexible',
    status: 'selling',
    type: 'Apartments',
    imageUrl: '/developers/emaar-creek-crescent.png',
  },
  {
    id: 14,
    title: 'EMAAR Raya',
    slug: 'emaar-raya',
    developer: 'Emaar Properties',
    starting_price: 'AED 2,670,000',
    location: 'Arabian Ranches III, Dubai',
    completion_date: 'Q4 2027',
    payment_plan: 'Flexible',
    status: 'selling',
    type: 'Townhouses',
    imageUrl: '/developers/emaar-raya.png',
  },
  {
    id: 15,
    title: 'DAMAC Island Lagoon',
    slug: 'damac-island-lagoon',
    developer: 'DAMAC Properties',
    starting_price: 'AED 2,700,000',
    location: 'Dubai Island, Dubai',
    completion_date: 'Q4 2029',
    payment_plan: '70/30',
    status: 'selling',
    type: 'Luxury Villas',
    imageUrl: '/developers/damac-island-lagoon.png',
  },

  // 3. Projects from community-details (SelectedOpportunitiesSection)
  {
    id: 16,
    title: 'Creekside Residences',
    slug: 'creekside-residences',
    developer: 'Emaar Properties',
    starting_price: 'AED 1,650,000',
    location: 'Dubai Creek Harbour, Dubai',
    completion_date: 'Q4 2027',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Apartments',
    imageUrl: '/developers/emaar-creek-crescent.png',
  },
  {
    id: 17,
    title: 'Canal House',
    slug: 'canal-house',
    developer: 'Meraas',
    starting_price: 'AED 2,100,000',
    location: 'Business Bay, Dubai',
    completion_date: 'Q3 2027',
    payment_plan: '70/30',
    status: 'selling',
    type: 'Apartments',
    imageUrl: '/thevalley-img.png',
  },
  {
    id: 18,
    title: 'Seafront Mansions',
    slug: 'seafront-mansions',
    developer: 'Nakheel',
    starting_price: 'AED 18,500,000',
    location: 'Palm Jumeirah, Dubai',
    completion_date: 'Q4 2028',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Seafront Mansions',
    imageUrl: '/dubai_hills.png',
  },
  {
    id: 19,
    title: 'Greenville Towns',
    slug: 'greenville-towns',
    developer: 'Emaar Properties',
    starting_price: 'AED 2,800,000',
    location: 'Emaar South, Dubai',
    completion_date: 'Q1 2028',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Townhouses',
    imageUrl: '/thevalley-phase2.png',
  },
  {
    id: 20,
    title: 'Harmony Residences',
    slug: 'harmony-residences',
    developer: 'Majid Al Futtaim',
    starting_price: 'AED 4,600,000',
    location: 'Tilal Al Ghaf, Dubai',
    completion_date: 'Q2 2027',
    payment_plan: '60/40',
    status: 'selling',
    type: 'Residences & Villas',
    imageUrl: '/thevalley.png',
  },
  {
    id: 21,
    title: 'Mediterranean Villas',
    slug: 'mediterranean-villas',
    developer: 'DAMAC Properties',
    starting_price: 'AED 3,200,000',
    location: 'DAMAC Lagoons, Dubai',
    completion_date: 'Q3 2027',
    payment_plan: '70/30',
    status: 'selling',
    type: 'Villas',
    imageUrl: '/developers/damac-island-lagoon.png',
  },
  {
    id: 22,
    title: 'Palmera Estates',
    slug: 'palmera-estates',
    developer: 'Emaar Properties',
    starting_price: 'AED 8,900,000',
    location: 'The Oasis, Dubai',
    completion_date: 'Q2 2028',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Estates & Mansions',
    imageUrl: '/thevalley.png',
  },
  {
    id: 23,
    title: 'Opera District Suites',
    slug: 'opera-district-suites',
    developer: 'Emaar Properties',
    starting_price: 'AED 3,400,000',
    location: 'Downtown Dubai, Dubai',
    completion_date: 'Q4 2026',
    payment_plan: '70/30',
    status: 'selling',
    type: 'Luxury Suites',
    imageUrl: '/dubai hills.png',
  },

  // 4. Projects from Similar Projects / Project Detail (SimilarProjectsSection)
  {
    id: 24,
    title: 'Golf Fields by Emaar',
    slug: 'golf-fields-by-emaar',
    developer: 'Emaar Properties',
    starting_price: 'AED 100,000',
    location: 'Emaar South, Dubai',
    completion_date: 'Q4 2027',
    payment_plan: '70/30',
    status: 'selling',
    type: 'Golf Apartments & Villas',
    imageUrl: '/Rectangle 34624629.png',
  },
  {
    id: 25,
    title: 'Terra Heights by Emaar',
    slug: 'terra-heights-by-emaar',
    developer: 'Emaar Properties',
    starting_price: 'AED 1,550,000',
    location: 'Emaar South, Dubai',
    completion_date: 'Q1 2028',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Apartments',
    imageUrl: '/Rectangle 34624721-4.png',
  },
  {
    id: 26,
    title: 'Greenville 2 at Emaar South',
    slug: 'greenville-2-emaar-south',
    developer: 'Emaar Properties',
    starting_price: 'AED 2,800,000',
    location: 'Emaar South, Dubai',
    completion_date: 'Q2 2028',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Townhouses',
    imageUrl: '/Rectangle 34625264.png',
  },
  {
    id: 27,
    title: 'Golf Edge at Emaar South',
    slug: 'golf-edge-emaar-south',
    developer: 'Emaar Properties',
    starting_price: 'AED 1,450,000',
    location: 'Emaar South, Dubai',
    completion_date: 'Q3 2028',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Apartments',
    imageUrl: '/Rectangle 34625528-1.png',
  },

  // 5. Projects from Home Page (RecommendedOpportunities)
  {
    id: 28,
    title: 'The Valley',
    slug: 'the-valley-dubailand',
    developer: 'Emaar Properties',
    starting_price: 'AED 1,600,000',
    location: 'Dubailand, Dubai',
    completion_date: 'Q1 2028',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Townhouses & Villas',
    imageUrl: '/thevalley.png',
  },
  {
    id: 29,
    title: 'Grand Polo Club & Resort',
    slug: 'grand-polo-club-resort',
    developer: 'Emaar Properties',
    starting_price: 'AED 4,200,000',
    location: 'Dubai Hills, Dubai',
    completion_date: 'Q2 2028',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Luxury Resort Villas',
    imageUrl: '/grandpolo_club.png',
  },
  {
    id: 30,
    title: 'Dubai Hills Estate',
    slug: 'dubai-hills-estate',
    developer: 'Emaar Properties',
    starting_price: 'AED 1,800,000',
    location: 'Dubai Hills, Dubai',
    completion_date: 'Q3 2027',
    payment_plan: '70/30',
    status: 'selling',
    type: 'Luxury Apartments',
    imageUrl: '/dubai hills.png',
  },

  // 6. Predefined Classic Off-Plan Launches
  {
    id: 31,
    title: 'Boulevard Heights Executive Residences BLVD',
    slug: 'boulevard-heights-executive',
    developer: 'Emaar Properties',
    starting_price: 'AED 2,850,000',
    location: 'Downtown Dubai, Dubai',
    completion_date: 'Q4 2026',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Apartments',
    imageUrl: '/developers/emaar-creek-crescent.png',
  },
  {
    id: 32,
    title: 'Expo Golf Villa III',
    slug: 'expo-golf-villa-3',
    developer: 'Emaar Properties',
    starting_price: 'AED 1,650,000',
    location: 'Emaar South, Dubai',
    completion_date: 'Q2 2027',
    payment_plan: '70/30',
    status: 'selling',
    type: 'Villas',
    imageUrl: '/thevalley.png',
  },
  {
    id: 33,
    title: 'Grand Bleu Tower',
    slug: 'grand-bleu-tower-apartments',
    developer: 'Emaar Properties',
    starting_price: 'AED 3,200,000',
    location: 'Emaar Beachfront, Dubai',
    completion_date: 'Q3 2026',
    payment_plan: '60/40',
    status: 'selling',
    type: 'Apartments',
    imageUrl: '/developers/emaar-raya.png',
  },
  {
    id: 34,
    title: 'Spring Townhouses',
    slug: 'spring-townhouses',
    developer: 'Emaar Properties',
    starting_price: 'AED 2,350,000',
    location: 'Arabian Ranches III, Dubai',
    completion_date: 'Q4 2026',
    payment_plan: '70/30',
    status: 'selling',
    type: 'Townhouses',
    imageUrl: '/thevalley-img.png',
  },
  {
    id: 35,
    title: 'May Townhouses',
    slug: 'may-townhouses',
    developer: 'Emaar Properties',
    starting_price: 'AED 2,450,000',
    location: 'Arabian Ranches III, Dubai',
    completion_date: 'Q1 2027',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Townhouses',
    imageUrl: '/thevalley-phase2.png',
  },
  {
    id: 36,
    title: 'Caya Villas',
    slug: 'caya-villas',
    developer: 'Emaar Properties',
    starting_price: 'AED 4,800,000',
    location: 'Arabian Ranches III, Dubai',
    completion_date: 'Q2 2027',
    payment_plan: '70/30',
    status: 'selling',
    type: 'Villas',
    imageUrl: '/dubai hills.png',
  },
  {
    id: 37,
    title: 'The Oasis by Emaar - Ultra Luxury Mansions',
    slug: 'emaar-oasis-mansions',
    developer: 'Emaar Properties',
    starting_price: 'AED 15,000,000',
    location: 'The Oasis, Dubai',
    completion_date: 'Q2 2028',
    payment_plan: '80/20',
    status: 'selling',
    type: 'Ultra Luxury Mansions',
    imageUrl: '/thevalley.png',
  },
  {
    id: 38,
    title: 'Sobha Hartland II - Waterfront Sky Villas',
    slug: 'sobha-hartland-2-sky-villas',
    developer: 'Sobha Realty',
    starting_price: 'AED 3,800,000',
    location: 'MBR City, Dubai',
    completion_date: 'Q4 2027',
    payment_plan: '60/40',
    status: 'selling',
    type: 'Waterfront Sky Villas',
    imageUrl: '/developers/emaar-creek-crescent.png',
  },
];

interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  developer: string;
  category: string;
  total_units: number;
  location: string;
  status: 'active' | 'featured' | 'archived';
}

interface CommunityItem {
  id?: string | number;
  name: string;
  tag?: string;
  slug?: string;
  icon: string;
  image?: string;
  location?: string;
  href?: string;
  status?: string;
  description?: string;
  longContent?: string;
}

const DEFAULT_GLOBAL_FAQS_ITEMS = [
  {
    id: 'faq-1',
    question: 'Can foreigners buy property in Dubai?',
    answer: 'Yes! Foreign investors can buy off plan properties in Dubai or ready homes in designated freehold areas, making it one of the most open real estate markets globally.',
  },
  {
    id: 'faq-2',
    question: "What's the difference between freehold and leasehold property?",
    answer: "Freehold means you own the property and the land it's built on. Leasehold, on the other hand, gives ownership for a set period for usually 99 years.",
  },
  {
    id: 'faq-3',
    question: 'How do I start investing in Dubai real estate?',
    answer: 'The best way to invest in Dubai real estate is by connecting with a trusted real estate agency in Dubai that guides you through legalities, developers, and project selection.',
  },
  {
    id: 'faq-4',
    question: 'What documents do I need to buy property in Dubai?',
    answer: 'All you need is a valid passport, proof of funds, and a signed sales agreement. And if you are financing, your bank will provide additional requirements.',
  },
  {
    id: 'faq-5',
    question: 'Are there additional costs when buying a property?',
    answer: 'Yes, buyers should account for DLD fees (4%), agent commission, and trustee fees depending on whether the property is off-plan or ready.',
  },
  {
    id: 'faq-6',
    question: 'What Does "Off-Plan" Actually Mean?',
    answer: 'Off-plan property is real estate purchased before it is fully constructed. Buyers invest directly from developers at launch pricing with structured milestone-based installment plans.',
  },
];

const DEFAULT_COMMUNITY_CARDS: CommunityItem[] = [
  {
    id: '1',
    name: 'Dubai Creek Harbour',
    tag: 'Waterfront living',
    slug: 'dubai-creek-harbour',
    description: 'Promenades, skyline views and a calm waterfront character.',
    icon: '/creekicon.png',
    image: '/buy_hero.png',
    location: 'Ras Al Khor, Dubai',
    href: '/communities/dubai-creek-harbour',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Palm Jumeirah',
    tag: 'Waterfront living',
    slug: 'palm-jumeirah',
    description: 'World-famous iconic island offering waterfront mansions, private beaches and penthouses.',
    icon: '/palmjumeriah icon.png',
    image: '/grandpolo_club.png',
    location: 'Arabian Gulf Coast, Dubai',
    href: '/communities/palm-jumeirah',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Business Bay',
    tag: 'Urban waterfront',
    slug: 'business-bay',
    description: 'City energy, canal walks and quick access to Downtown.',
    icon: '/creekicon.png',
    image: '/dubai hills.png',
    location: 'Business Bay Canal, Dubai',
    href: '/communities/business-bay',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Dubai Hills Estate',
    tag: 'Golf & park community',
    slug: 'dubai-hills-estate',
    description: 'Vast central park, golf course fairways and family neighbourhood ease.',
    icon: '/dubai_hills.png',
    image: '/dubai hills.png',
    location: 'Mohammed Bin Rashid City, Dubai',
    href: '/communities/dubai-hills-estate',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Downtown Dubai',
    tag: 'Iconic city living',
    slug: 'downtown-dubai',
    description: 'World-class cultural landmarks, boulevard dining and skyline energy.',
    icon: '/dubai_hills.png',
    image: '/buy_hero.png',
    location: 'Financial Center Road, Dubai',
    href: '/communities/downtown-dubai',
    status: 'Active',
  },
  {
    id: '6',
    name: 'The Valley',
    tag: 'Suburban family living',
    slug: 'the-valley',
    description: 'Tranquil suburban rhythm, golden beaches and expansive green parks.',
    icon: '/valleyicon.png',
    image: '/thevalley.png',
    location: 'Al Ain Road, Dubai',
    href: '/the-valley',
    status: 'Active',
  },
  {
    id: '7',
    name: 'Arabian Ranches III',
    tag: 'Gated community',
    slug: 'arabian-ranches-iii',
    description: 'Clubhouses, splash pads, sports courts and pedestrian-friendly pathways.',
    icon: '/arabian 3 icon.png',
    image: '/thevalley.png',
    location: 'Wadi Al Safa, Dubai',
    href: '/communities/arabian-ranches-iii',
    status: 'Active',
  },
  {
    id: '8',
    name: 'DAMAC Lagoons',
    tag: 'Resort lagoon living',
    slug: 'damac-lagoons',
    description: 'Crystal lagoons, Mediterranean vibes and vibrant recreation islands.',
    icon: '/oasisicon.png',
    image: '/grandpolo_club.png',
    location: 'Hessa Street, Dubai',
    href: '/communities/damac-lagoons',
    status: 'Active',
  },
  {
    id: '9',
    name: 'Tilal Al Ghaf',
    tag: 'Wellness & nature',
    slug: 'tilal-al-ghaf',
    description: 'Swimmable crystal lagoon, sandy beaches and sustainable modern design.',
    icon: '/valleyicon.png',
    image: '/thevalley.png',
    location: 'Hessa Street, Dubai',
    href: '/communities/tilal-al-ghaf',
    status: 'Active',
  },
  {
    id: '10',
    name: 'Dubai Marina',
    tag: 'Coastal high-rise',
    slug: 'dubai-marina',
    description: 'Yacht club promenades, beach access and lively waterside dining.',
    icon: '/creekicon.png',
    image: '/buy_hero.png',
    location: 'Dubai Marina Promenade, Dubai',
    href: '/communities/dubai-marina',
    status: 'Active',
  },
  {
    id: '11',
    name: 'Emaar South',
    tag: 'Master planned suburban',
    slug: 'emaar-south',
    description: 'Championship golf course living near Al Maktoum International Airport.',
    icon: '/dubai_hills.png',
    image: '/dubai hills.png',
    location: 'Dubai South, Dubai',
    href: '/communities/emaar-south',
    status: 'Active',
  },
  {
    id: '12',
    name: 'The Oasis',
    tag: 'Ultra-luxury living',
    slug: 'the-oasis',
    description: 'Secluded luxury mansions surrounded by flowing waterways and calm greenery.',
    icon: '/oasisicon.png',
    image: '/grandpolo_club.png',
    location: 'Dubailand, Dubai',
    href: '/communities/the-oasis',
    status: 'Upcoming',
  },
];

interface DeveloperCardItem {
  id?: string | number;
  name: string;
  tag?: string;
  slug?: string;
  logo: string;
  image?: string;
  location?: string;
  href?: string;
  status?: string;
  description?: string;
}

const DEFAULT_DEVELOPER_CARDS: DeveloperCardItem[] = [
  {
    id: '1',
    name: 'Binghatti',
    tag: 'Architectural Landmarks',
    slug: 'binghatti',
    logo: '/developers/binghatti.png',
    image: '/dubai_hills.png',
    location: 'Business Bay & Downtown, Dubai',
    href: '/developers/binghatti',
    status: 'Active',
    description: 'Hyper-tower developer collaborating with world icons including Bugatti, Mercedes-Benz, and Jacob & Co.',
  },
  {
    id: '2',
    name: 'Sobha Realty',
    tag: 'Precision Craftsmanship',
    slug: 'sobha',
    logo: '/developers/sobha.png',
    image: '/developers/emaar-creek-crescent.png',
    location: 'MBR City, Dubai',
    href: '/developers/sobha',
    status: 'Active',
    description: 'Self-sufficient backward-integrated developer famous for luxury waterfront sky villas and signature forest communities.',
  },
  {
    id: '3',
    name: 'Meraas',
    tag: 'Urban Lifestyle',
    slug: 'meraas',
    logo: '/developers/meraas.png',
    image: '/golden_beach.png',
    location: 'City Walk & Bluewaters, Dubai',
    href: '/developers/meraas',
    status: 'Active',
    description: 'Master developers behind premier urban lifestyle districts including Bluewaters Island, City Walk, and Port De La Mer.',
  },
  {
    id: '4',
    name: 'DAMAC',
    tag: 'Luxury Living',
    slug: 'damac',
    logo: '/developers/damac.png',
    image: '/developers/damac-island-2.png',
    location: 'Business Bay, Dubai',
    href: '/developers/damac',
    status: 'Active',
    description: 'Renowned for ultra-luxury residential towers, branded fashion residences, and resort-inspired lagoon master communities.',
  },
  {
    id: '5',
    name: 'Emaar',
    tag: 'Master Developer',
    slug: 'emaar',
    logo: '/developers/emaar.png',
    image: '/thevalley.png',
    location: 'Downtown Dubai, UAE',
    href: '/developers/emaar',
    status: 'Active',
    description: 'Pioneering master-planned communities with global acclaim, world-class amenities and a reliable delivery track record in Dubai.',
  },
  {
    id: '6',
    name: 'Azizi Developments',
    tag: 'Urban Communities',
    slug: 'azizi',
    logo: '/developers/azizi.png',
    image: '/sports_village.png',
    location: 'Meydan & Dubai Healthcare City, Dubai',
    href: '/developers/azizi',
    status: 'Active',
    description: 'Leading developer delivering major residential projects across prime locations including Riviera at Meydan.',
  },
  {
    id: '7',
    name: 'Nakheel',
    tag: 'Waterfront Master Planner',
    slug: 'nakheel',
    logo: '/developers/nakheel.png',
    image: '/buy_hero.png',
    location: 'Palm Jumeirah & Islands, Dubai',
    href: '/developers/nakheel',
    status: 'Active',
    description: 'The master visionary behind the world-famous Palm Jumeirah, Palm Jebel Ali, and Dubai Islands.',
  },
  {
    id: '8',
    name: 'Omniyat',
    tag: 'Ultra-Luxury Art',
    slug: 'omniyat',
    logo: '/developers/omniyat.png',
    image: '/valley_center.png',
    location: 'Business Bay & Palm Jumeirah, Dubai',
    href: '/developers/omniyat',
    status: 'Active',
    description: 'Bespoke architectural collector pieces curated in collaboration with Dorchester Collection and Zaha Hadid.',
  },
  {
    id: '9',
    name: 'Danube Properties',
    tag: '1% Monthly Payment',
    slug: 'danube',
    logo: '/developers/danube.png',
    image: '/thevalley.png',
    location: 'Al Furjan & JLT, Dubai',
    href: '/developers/danube',
    status: 'Active',
    description: 'Pioneers of affordable luxury in Dubai with innovative 1% monthly payment plans and resort facilities.',
  },
  {
    id: '10',
    name: 'Ellington Properties',
    tag: 'Design-Led Boutique',
    slug: 'ellington',
    logo: '/developers/ellington.png',
    image: '/dubai hills.png',
    location: 'Palm Jumeirah & JVC, Dubai',
    href: '/developers/ellington',
    status: 'Active',
    description: 'Design-centric boutique developer known for handcrafted resort-style residences and hotel-grade lobbies.',
  },
  {
    id: '11',
    name: 'Select Group',
    tag: 'Waterfront Excellence',
    slug: 'select-group',
    logo: '/developers/select-group.png',
    image: '/dubai_hills.png',
    location: 'Dubai Marina & Downtown, Dubai',
    href: '/developers/select-group',
    status: 'Active',
    description: 'Specialists in prime waterfront living with extensive developments throughout Dubai Marina and Business Bay.',
  },
  {
    id: '12',
    name: 'Samana Developers',
    tag: 'Private Pool Residences',
    slug: 'samana',
    logo: '/developers/samana.png',
    image: '/valleyicon.png',
    location: 'Arjan & Dubai Hills, Dubai',
    href: '/developers/samana',
    status: 'Active',
    description: 'Fastest-growing developer renowned for incorporating private plunge pools into apartment balconies.',
  },
];

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') return `http://${window.location.hostname}:8000/api`;
  return 'http://:8000/api';
};
const getSyncBaseUrl = () => {
  if (typeof window !== 'undefined') return '/api/cms-sync';
  return 'http://127.0.0.1:3002/api/cms-sync';
};
const API_BASE_URL = typeof window !== 'undefined' ? `http://${window.location.hostname}:8000/api` : 'http://127.0.0.1:8000/api';

interface AmenityManagementItem {
  id: string;
  name: string;
  category: string;
  iconSvg?: string;
  iconName?: string;
  isPopular?: boolean;
}

interface IconAssetItem {
  id: string;
  name: string;
  category: 'Amenity' | 'Community' | 'Feature' | 'General';
  type: 'svg' | 'image';
  preview: string; // SVG string or image URL
  codeOrUrl: string;
}

const DEFAULT_AMENITIES: AmenityManagementItem[] = [
  { id: 'prop-1', name: 'Unfurnished', category: 'Property Feature', iconName: 'unfurnished', iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M3 14h18M5 10v8m14-8v8M4 18h16" />', isPopular: true },
  { id: 'prop-2', name: 'Central A/C', category: 'Climate & Comfort', iconName: 'central-ac', iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m9-9H3m15.364-6.364l-12.728 12.728m0-12.728l12.728 12.728" />', isPopular: true },
  { id: 'prop-3', name: 'Built in Wardrobes', category: 'Interior & Storage', iconName: 'wardrobes', iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 4h16v16H4V4zm8 0v16M8 12h.01M16 12h.01" />', isPopular: true },
  { id: 'prop-4', name: 'Kitchen Appliances', category: 'Interior & Kitchen', iconName: 'kitchen', iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m-4-16v6a2 2 0 002 2h0a2 2 0 002-2V4m6 0v16m0-10a3 3 0 00-3-3" />', isPopular: true },
  { id: 'prop-5', name: 'Security', category: 'Security & Safety', iconName: 'security-shield', iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />', isPopular: true },
  { id: 'prop-6', name: 'Barbecue Area', category: 'Outdoors & Leisure', iconName: 'bbq', iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 11a8 8 0 0016 0H4zm2 4l-2 5m14-5l2 5M12 15v5m-4-9V7m8 4V7" />', isPopular: true },
  { id: 'prop-7', name: 'Private Pool', category: 'Water & Wellness', iconName: 'private-pool', iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M2 17c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M2 12c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M7 5a2 2 0 100-4 2 2 0 000 4zm0 0v5" />', isPopular: true },
  { id: 'prop-8', name: 'Walk-in Closet', category: 'Interior & Storage', iconName: 'walkin-closet', iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 4h7v16H4V4zm9 0h7v16h-7V4zm2 8h1m-10 0h1" />', isPopular: true },
  { id: 'prop-9', name: 'Private Garden', category: 'Outdoors & Nature', iconName: 'private-garden', iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21V9m0 0a5 5 0 015-5c0 4-3 6-5 6zm0 0a5 5 0 00-5-5c0 4 3 6 5 6zm-7 12h14" />', isPopular: true },
  { id: '1', name: 'Children Play Area', category: 'Family & Recreation', iconName: 'child', iconSvg: '<circle cx="12" cy="4" r="1.5"/><path d="M8 11.5v3.5m0 0l-2 3m2-3l2 3M5.5 11l2.5 1.5 2-2"/>', isPopular: true },
  { id: '2', name: 'Schools', category: 'Education', iconName: 'school', iconSvg: '<path d="M12 3L4 7v14h16V7l-8-4z"/><path d="M9 21v-7a3 3 0 016 0v7"/>', isPopular: true },
  { id: '3', name: 'Restaurants & Dining', category: 'Retail & Dining', iconName: 'utensils', iconSvg: '<circle cx="12" cy="12" r="5"/><path d="M5 6v5a2 2 0 002 2v5M7 6v7M20 6v12M17 6v6a2 2 0 002 2"/>', isPopular: true },
  { id: '4', name: 'Shopping Mall', category: 'Retail & Dining', iconName: 'shopping-bag', iconSvg: '<path d="M3 9l2-5h14l2 5v1a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 01-3 3 3 3 0 01-3-3V9z"/>', isPopular: true },
  { id: '5', name: 'Walking Trails', category: 'Outdoors & Nature', iconName: 'footprints', iconSvg: '<path d="M6 21c4-5 6-8 10-8s5-2 6-6"/><circle cx="10" cy="13" r="1"/><circle cx="14" cy="9" r="1"/>', isPopular: true },
  { id: '6', name: 'Sports Facilities', category: 'Health & Fitness', iconName: 'activity', iconSvg: '<circle cx="15" cy="5" r="2"/><path d="M4 11h4M3 15h4M10 11l3-2 3 2 3-1"/>', isPopular: true },
  { id: '7', name: 'Gym & Fitness Club', category: 'Health & Fitness', iconName: 'dumbbell', iconSvg: '<path d="M6.5 6.5l11 11M5 9l2-2M15 19l2-2M3.5 10.5l3-3M13.5 20.5l3-3M6.5 5l-2 2M19.5 18l-2 2"/>', isPopular: true },
  { id: '8', name: 'Parking Area', category: 'Facilities', iconName: 'car', iconSvg: '<path d="M5 13l1.8-4.5a2 2 0 011.8-1.5h6.8a2 2 0 011.8 1.5L19 13v5a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H7v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-5z"/>', isPopular: true },
  { id: '9', name: '24X7 Security', category: 'Security & Safety', iconName: 'shield', iconSvg: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/><circle cx="12" cy="16" r="1"/>', isPopular: true },
  { id: '10', name: 'Golf Course', category: 'Leisure & Sports', iconName: 'flag', iconSvg: '<path d="M4 17c3-2 7-3 10-1s6 2 6 0-3-3-6-3-7 1-10 4z"/><path d="M12 15V4l6 3-6 3"/><circle cx="12" cy="15" r="1.5" fill="#C2A468"/>', isPopular: true },
  { id: '11', name: 'Infinity Pool', category: 'Leisure & Sports', iconName: 'waves', iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" d="M2 17c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M2 12c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0" />', isPopular: true },
  { id: '12', name: 'Private Beach Access', category: 'Waterfront', iconName: 'sun', iconSvg: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>', isPopular: true },
];

const DEFAULT_ICONS: IconAssetItem[] = [
  // Property Detail (Buy-Detail) Amenity Icons
  { id: 'ic-prop-1', name: 'Unfurnished', category: 'Amenity', type: 'svg', preview: 'unfurnished', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M3 14h18M5 10v8m14-8v8M4 18h16" />' },
  { id: 'ic-prop-2', name: 'Central A/C', category: 'Amenity', type: 'svg', preview: 'central-ac', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m9-9H3m15.364-6.364l-12.728 12.728m0-12.728l12.728 12.728" />' },
  { id: 'ic-prop-3', name: 'Built in Wardrobes', category: 'Amenity', type: 'svg', preview: 'wardrobes', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 4h16v16H4V4zm8 0v16M8 12h.01M16 12h.01" />' },
  { id: 'ic-prop-4', name: 'Kitchen Appliances', category: 'Amenity', type: 'svg', preview: 'kitchen', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m-4-16v6a2 2 0 002 2h0a2 2 0 002-2V4m6 0v16m0-10a3 3 0 00-3-3" />' },
  { id: 'ic-prop-5', name: 'Security', category: 'Amenity', type: 'svg', preview: 'security-shield', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />' },
  { id: 'ic-prop-6', name: 'Barbecue Area', category: 'Amenity', type: 'svg', preview: 'bbq', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 11a8 8 0 0016 0H4zm2 4l-2 5m14-5l2 5M12 15v5m-4-9V7m8 4V7" />' },
  { id: 'ic-prop-7', name: 'Private Pool', category: 'Amenity', type: 'svg', preview: 'private-pool', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M2 17c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M2 12c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M7 5a2 2 0 100-4 2 2 0 000 4zm0 0v5" />' },
  { id: 'ic-prop-8', name: 'Walk-in Closet', category: 'Amenity', type: 'svg', preview: 'walkin-closet', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 4h7v16H4V4zm9 0h7v16h-7V4zm2 8h1m-10 0h1" />' },
  { id: 'ic-prop-9', name: 'Private Garden', category: 'Amenity', type: 'svg', preview: 'private-garden', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21V9m0 0a5 5 0 015-5c0 4-3 6-5 6zm0 0a5 5 0 00-5-5c0 4 3 6 5 6zm-7 12h14" />' },
  // Community & Project Amenity Icons
  { id: 'ic-1', name: 'Children Play Area', category: 'Amenity', type: 'svg', preview: 'play', codeOrUrl: '<circle cx="12" cy="4" r="1.5"/><path d="M8 11.5v3.5m0 0l-2 3m2-3l2 3M5.5 11l2.5 1.5 2-2"/>' },
  { id: 'ic-2', name: 'School & Education', category: 'Amenity', type: 'svg', preview: 'school', codeOrUrl: '<path d="M12 3L4 7v14h16V7l-8-4z"/><path d="M9 21v-7a3 3 0 016 0v7"/>' },
  { id: 'ic-3', name: 'Dining & Cafes', category: 'Amenity', type: 'svg', preview: 'restaurant', codeOrUrl: '<circle cx="12" cy="12" r="5"/><path d="M5 6v5a2 2 0 002 2v5M7 6v7M20 6v12M17 6v6a2 2 0 002 2"/>' },
  { id: 'ic-4', name: 'Shopping Mall', category: 'Amenity', type: 'svg', preview: 'mall', codeOrUrl: '<path d="M3 9l2-5h14l2 5v1a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 01-3 3 3 3 0 01-3-3V9z"/>' },
  { id: 'ic-5', name: 'Walking Trails', category: 'Amenity', type: 'svg', preview: 'trails', codeOrUrl: '<path d="M6 21c4-5 6-8 10-8s5-2 6-6"/><circle cx="10" cy="13" r="1"/><circle cx="14" cy="9" r="1"/>' },
  { id: 'ic-6', name: 'Sports Facilities', category: 'Amenity', type: 'svg', preview: 'sports', codeOrUrl: '<circle cx="15" cy="5" r="2"/><path d="M4 11h4M3 15h4M10 11l3-2 3 2 3-1"/>' },
  { id: 'ic-7', name: 'Gym / Fitness Club', category: 'Amenity', type: 'svg', preview: 'gym', codeOrUrl: '<path d="M6.5 6.5l11 11M5 9l2-2M15 19l2-2M3.5 10.5l3-3M13.5 20.5l3-3M6.5 5l-2 2M19.5 18l-2 2"/>' },
  { id: 'ic-8', name: 'Parking Area', category: 'Amenity', type: 'svg', preview: 'parking', codeOrUrl: '<path d="M5 13l1.8-4.5a2 2 0 011.8-1.5h6.8a2 2 0 011.8 1.5L19 13v5a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H7v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-5z"/>' },
  { id: 'ic-9', name: '24X7 Security', category: 'Amenity', type: 'svg', preview: 'security', codeOrUrl: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/><circle cx="12" cy="16" r="1"/>' },
  { id: 'ic-10', name: 'Golf Course', category: 'Amenity', type: 'svg', preview: 'golf', codeOrUrl: '<path d="M4 17c3-2 7-3 10-1s6 2 6 0-3-3-6-3-7 1-10 4z"/><path d="M12 15V4l6 3-6 3"/><circle cx="12" cy="15" r="1.5" fill="#C2A468"/>' },
  { id: 'ic-11', name: 'Dubai Hills Community Icon', category: 'Community', type: 'image', preview: '/dubai_hills.png', codeOrUrl: '/dubai_hills.png' },
  { id: 'ic-12', name: 'The Valley Community Icon', category: 'Community', type: 'image', preview: '/valleyicon.png', codeOrUrl: '/valleyicon.png' },
  { id: 'ic-13', name: 'Dubai Creek Harbour Icon', category: 'Community', type: 'image', preview: '/creekicon.png', codeOrUrl: '/creekicon.png' },
  { id: 'ic-14', name: 'The Oasis Community Icon', category: 'Community', type: 'image', preview: '/oasisicon.png', codeOrUrl: '/oasisicon.png' },
  { id: 'ic-15', name: 'Palm Jumeirah Icon', category: 'Community', type: 'image', preview: '/palmjumeriah icon.png', codeOrUrl: '/palmjumeriah icon.png' },
  { id: 'ic-16', name: 'Arabian Ranches III Icon', category: 'Community', type: 'image', preview: '/arabian 3 icon.png', codeOrUrl: '/arabian 3 icon.png' },
  { id: 'ic-17', name: 'AI Advisory Engine Icon', category: 'Feature', type: 'image', preview: '/ai.png', codeOrUrl: '/ai.png' },
  { id: 'ic-18', name: 'FS Advisory Scores Icon', category: 'Feature', type: 'image', preview: '/fs score.png', codeOrUrl: '/fs score.png' },
  { id: 'ic-19', name: 'Curated Opportunities Icon', category: 'Feature', type: 'image', preview: '/curated oppo.png', codeOrUrl: '/curated oppo.png' },
  { id: 'ic-20', name: 'Expert Guidance Icon', category: 'Feature', type: 'image', preview: '/exp guidance.png', codeOrUrl: '/exp guidance.png' },
  // Goal Selection Step Icons
  { id: 'ic-21', name: 'Family Home (Message Chat)', category: 'Feature', type: 'svg', preview: 'chat', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.016-.941l.9-2.316A7.95 7.95 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>' },
  { id: 'ic-22', name: 'Investment (Trending Arrow Up)', category: 'Feature', type: 'svg', preview: 'trend', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a.5.5 0 00.71 0l7.234-7.234M21 8.25V12m0-3.75h-3.75"/>' },
  { id: 'ic-23', name: 'Global Clients (Globe)', category: 'Feature', type: 'svg', preview: 'globe', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path stroke-linecap="round" stroke-linejoin="round" d="M3.6 9h16.8M3.6 15h16.8"/><path stroke-linecap="round" stroke-linejoin="round" d="M11.5 3a17.5 17.5 0 000 18M12.5 3a17.5 17.5 0 010 18"/>' },
  { id: 'ic-24', name: 'Passive Income (Currency/Growth)', category: 'Feature', type: 'svg', preview: 'income', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-9h4.5a2.25 2.25 0 010 4.5H9.75a2.25 2.25 0 000 4.5H15"/>' },
  { id: 'ic-25', name: 'Capital Growth (Bar Chart)', category: 'Feature', type: 'svg', preview: 'chart', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.25V21h4.5v-7.75H3zm6.75-4.5V21h4.5V8.75h-4.5zm6.75-5.75V21H21V3h-4.5z"/>' },
  { id: 'ic-26', name: 'Luxury Lifestyle (Envelope Mail)', category: 'Feature', type: 'svg', preview: 'mail', codeOrUrl: '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>' },
  // Recommendation Highlights Icons
  { id: 'ic-27', name: 'Great for Families (Family)', category: 'Feature', type: 'image', preview: '/families.png', codeOrUrl: '/families.png' },
  { id: 'ic-28', name: 'Strong Growth (Percentage Chart Arrow)', category: 'Feature', type: 'image', preview: '/fs score.png', codeOrUrl: '/fs score.png' },
  { id: 'ic-29', name: 'Trusted Developer (Compass/Seal)', category: 'Feature', type: 'image', preview: '/exp guidance.png', codeOrUrl: '/exp guidance.png' },
];

const DEFAULT_OFFPLAN_GUIDE_HTML = `<h2>Off-Plan Properties in Dubai</h2>
<p>Off-plan property in Dubai refers to the purchase of a new home directly from the developer before construction is complete, typically at a launch price and with a flexible, staged payment plan. It has become the most widely used route into the Dubai real estate market, accounting for roughly three-quarters of all transactions in the emirate, largely because it combines the lowest entry price, instalment-based payments during construction, and strong potential for capital appreciation by the time the project is handed over.</p>
<p>Offplans.com lists more than 2,000 live off-plan projects from Dubai's leading developers, complete with verified pricing, detailed payment plans, and floor plans, giving investors a single, reliable source to research and compare opportunities across the city.</p>
<p>If you are new to off-plan investing, we recommend starting with our complete Off-Plan Dubai Guide, browsing our curated list of off-plan projects in Dubai and off-plan apartments in Dubai, comparing payment plans across developers, or exploring the full catalogue of live off-plan projects currently on the market.</p>

<h2>Why Buy Off-Plan Property in Dubai?</h2>
<p>Off-plan is the preferred entry point for most investors because it brings together several distinct advantages in a single transaction:</p>
<ul>
<li><strong>Lower entry price.</strong> Off-plan units are typically priced below comparable ready properties, since developers offer launch-stage pricing to attract early buyers.</li>
<li><strong>Staged payments.</strong> Rather than paying the full purchase price upfront, buyers pay in instalments spread across the construction period, keeping capital available for other investments.</li>
<li><strong>Favourable tax environment.</strong> Dubai imposes no annual property tax, no tax on rental income, and no capital gains tax, allowing investors to retain a greater share of their returns.</li>
<li><strong>Golden Visa eligibility.</strong> A property purchase of AED 2 million or more can qualify the buyer for a 10-year UAE Golden Visa, offering long-term residency benefits.</li>
<li><strong>Escrow-protected payments.</strong> Every off-plan payment is held in a government-regulated escrow account and released to the developer only once construction milestones have been independently certified, ensuring that funds are tied directly to verified progress on site.</li>
</ul>
<p>Together these factors make off-plan property one of the most accessible and structurally protected ways to enter the Dubai real estate market, whether for personal use or investment purposes.</p>

<h2>How to Buy an Off-Plan Property in Dubai</h2>
<p>The purchasing process is transparent and well-regulated, and it is open to international buyers with no residency requirement. It generally follows five key stages:</p>
<ol>
<li><strong>Shortlist and compare.</strong> Identify suitable projects based on community, developer reputation, budget, and expected handover date, and compare the available payment plans.</li>
<li><strong>Reserve the unit.</strong> Pay a booking fee and sign the developer's reservation form to secure your chosen unit.</li>
<li><strong>Sign the Sales &amp; Purchase Agreement (SPA).</strong> Formalise the purchase and pay the initial down payment, usually between 10% and 20% of the property value.</li>
<li><strong>Register with the Dubai Land Department.</strong> Pay the applicable registration fee and receive your Oqood, the interim title document confirming your ownership during the off-plan period.</li>
<li><strong>Complete the payment plan and take handover.</strong> Continue instalment payments through the construction period, then receive the finished unit along with the full title deed upon completion.</li>
</ol>

<h2>Off-Plan vs. Ready Property in Dubai</h2>
<p>Both off-plan and ready properties have a place in a well-balanced investment strategy, and the right choice depends largely on an investor's goals and timeline.</p>
<p>A ready property generates rental income immediately and allows buyers to inspect the exact unit before purchase, but it typically requires a larger upfront payment and comes at a higher overall price point. An off-plan property, by contrast, trades that immediate income for a lower entry cost, a longer and more manageable payment schedule, and the opportunity for the property's value to appreciate before the buyer even takes possession.</p>
<p>Many experienced investors in Dubai use both strategies in tandem — allocating capital to off-plan projects to build a growing portfolio over time, while relying on ready units to maintain steady rental cash flow. We encourage you to browse our full range of off-plan projects to compare current prices, developers, and payment structures side by side.</p>

<h2>Popular Off-Plan Areas in Dubai</h2>
<ul>
<li>Dubai Marina</li>
<li>Business Bay</li>
<li>Downtown Dubai</li>
<li>Dubai Creek Harbour</li>
<li>Dubai Hills Estate</li>
<li>Jumeirah Village Circle (JVC)</li>
<li>Dubai South</li>
<li>Palm Jumeirah</li>
</ul>

<h2>Leading Off-Plan Developers in Dubai</h2>
<ul>
<li>Emaar</li>
<li>DAMAC</li>
<li>Sobha</li>
<li>Binghatti</li>
<li>Nakheel</li>
<li>Danube</li>
</ul>`;

const DEFAULT_PROJECT_MAIN_GUIDE_HTML = `<h2>Types of off-plan property in Dubai</h2>
<p>Off-plan stock spans the whole market. Studios and 1–bedroom apartments are the most liquid and carry the lowest entry price, which is why they dominate investor demand. 2– and 3–bedroom apartments serve end users and families and clear the AED 2m threshold that can qualify a buyer for the Golden Visa. Townhouses and villas sit at the top of the ticket range and are bought more for lifestyle and long-term hold than for yield. Filter the listing above by unit type to compare like with like.</p>

<h2>How buying off-plan works</h2>
<p>You reserve a unit with a booking deposit, then pay the balance in instalments tied to construction milestones, with the remainder due on handover. Funds are held in a RERA-regulated escrow account released to the developer against verified progress. The 4% Dubai Land Department fee sits on top of the price. Every listing above shows the launch price and, where the developer publishes it, the full payment schedule — so you can see the real day-one cash requirement before you enquire.</p>

<h2>Choosing a community and developer</h2>
<p>Location and developer track record matter more off-plan than in any ready market, because you are buying against a drawing and a delivery promise. Established communities price in their amenities; emerging districts offer lower entry prices in exchange for build-out risk. Browse by community or by developer to compare, or explore every launch on the interactive map.</p>`;

export default function CMSDashboard() {
  
  // Active Main Tab
  const [activeTab, setActiveTab] = useState<'pages' | 'dynamic-pages' | 'properties' | 'offplans' | 'communities' | 'projects' | 'developers' | 'blogs' | 'faqs' | 'reviews' | 'amenities' | 'icons'>('pages');

  // Amenities and Icons State
  const [amenitiesList, setAmenitiesList] = useState<AmenityManagementItem[]>(DEFAULT_AMENITIES);
  const [iconsList, setIconsList] = useState<IconAssetItem[]>(DEFAULT_ICONS);

  // New Amenity / Icon Form States
  const [newAmenityName, setNewAmenityName] = useState('');
  const [newAmenityCategory, setNewAmenityCategory] = useState('Family & Recreation');
  const [newAmenityIcon, setNewAmenityIcon] = useState('child');
  const [newIconName, setNewIconName] = useState('');
  const [newIconCategory, setNewIconCategory] = useState<'Amenity' | 'Community' | 'Feature' | 'General'>('Amenity');
  const [newIconType, setNewIconType] = useState<'svg' | 'image'>('image');
  const [newIconUrl, setNewIconUrl] = useState('');
  const [newIconSvg, setNewIconSvg] = useState('');

  // Backend state
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Collections
  const [pages, setPages] = useState<PageItem[]>(DEFAULT_PAGES);
  const [properties, setProperties] = useState<PropertyItem[]>(DEFAULT_PROPERTIES);
  const [offplans, setOffplans] = useState<OffPlanItem[]>(DEFAULT_OFFPLAN_PROJECTS);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [communities, setCommunities] = useState<CommunityItem[]>(DEFAULT_COMMUNITY_CARDS);
  const [developerCards, setDeveloperCards] = useState<DeveloperCardItem[]>(DEFAULT_DEVELOPER_CARDS);
  const [blogsList, setBlogsList] = useState<BlogCMSItem[]>(DEFAULT_BLOGS_CMS);

  // FULL PAGE EDITOR STATE
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [editingType, setEditingType] = useState<string>('');
  const [editorReturnTab, setEditorReturnTab] = useState<'pages' | 'dynamic-pages' | 'properties' | 'offplans' | 'communities' | 'developers' | 'blogs'>('pages');
  const [submitting, setSubmitting] = useState(false);

  // PAGE SECTION BUILDER TABS STATE
  const [activeSectionTab, setActiveSectionTab] = useState<string>('basic');

  // Form Fields - Page Meta / Basic Detail
  const [pageTitle, setPageTitle] = useState('');
  const [pageSlug, setPageSlug] = useState('');
  const [pageMetaTitle, setPageMetaTitle] = useState('');
  const [pageMetaKeywords, setPageMetaKeywords] = useState('');
  const [pageMetaDesc, setPageMetaDesc] = useState('');
  const [pageOgImage, setPageOgImage] = useState('/buy_hero.png');
  const [dynamicSections, setDynamicSections] = useState<DynamicSectionInstance[]>([]);
  const [pageStatus, setPageStatus] = useState<'draft' | 'published'>('draft');

  // Form Fields - Section 1: Hero Banner Controls
  const [heroTitle1, setHeroTitle1] = useState('DISCOVER THE');
  const [heroTitle2, setHeroTitle2] = useState('RIGHT PROPERTY');
  const [heroTitle3, setHeroTitle3] = useState('OPPORTUNITY.');
  const [heroSubheading, setHeroSubheading] = useState('Curated opportunities. Intelligent insights. Aligned with your goals.');
  const [heroPrimaryCtaText, setHeroPrimaryCtaText] = useState('Start AI Assessment');
  const [heroPrimaryCtaLink, setHeroPrimaryCtaLink] = useState('/ai-assessment');
  const [heroSecondaryCtaText, setHeroSecondaryCtaText] = useState('Browse Opportunities');
  const [heroSecondaryCtaLink, setHeroSecondaryCtaLink] = useState('/the-valley');
  const [heroBgImage, setHeroBgImage] = useState('/buy_hero.png');

  // Form Fields - Section 2: Feature Bar (4 Icon Items)
  const [f1Title, setF1Title] = useState('AI Advisory Engine');
  const [f1Desc, setF1Desc] = useState('Personalized recommendations based on your goals.');
  const [f1Icon, setF1Icon] = useState('/ai.png');

  const [f2Title, setF2Title] = useState('FS Advisory Scores');
  const [f2Desc, setF2Desc] = useState('Proprietary rating across 10+ key factors.');
  const [f2Icon, setF2Icon] = useState('/fs score.png');

  const [f3Title, setF3Title] = useState('Curated Opportunities');
  const [f3Desc, setF3Desc] = useState('Only opportunities that meet our advisory standards.');
  const [f3Icon, setF3Icon] = useState('/curated oppo.png');

  const [f4Title, setF4Title] = useState('Expert Guidance');
  const [f4Desc, setF4Desc] = useState('Human expertise at every step of your journey.');
  const [f4Icon, setF4Icon] = useState('/exp guidance.png');

  // Form Fields - Section 3: Recommended Opportunities
  const [oppTitleLine1, setOppTitleLine1] = useState('Opportunities We');
  const [oppTitleLine2, setOppTitleLine2] = useState('Currently Recommend');
  const [oppViewAllLink, setOppViewAllLink] = useState('/project-main-page');
  const [oppCards, setOppCards] = useState([
    { id: '1', title: 'The Valley', developer: 'By Emaar', score: 92, tag: 'FAMILY LIVING', bestFor: 'Growing Families', price: 'AED 1.6M', image: '/thevalley.png' },
    { id: '2', title: 'Grand Polo Club & Resort', developer: 'By Emaar', score: 89, tag: 'LUXURY LIVING', bestFor: 'Luxury Lifestyle', price: 'AED 4.2M', image: '/grandpolo_club.png' },
    { id: '3', title: 'Dubai Hills Estate', developer: 'By Emaar', score: 87, tag: 'FAMILY LIVING', bestFor: 'End Users & Investors', price: 'AED 1.8M', image: '/dubai hills.png' },
  ]);

  // Form Fields - Section 4: Explore Community
  const [commHeading, setCommHeading] = useState('Explore by Community');
  const [commList, setCommList] = useState([
    { name: 'Dubai Hills Estate', icon: '/dubai_hills.png', href: '#' },
    { name: 'The Valley', icon: '/valleyicon.png', href: '/the-valley' },
    { name: 'Dubai Creek Harbour', icon: '/creekicon.png', href: '#' },
    { name: 'The Oasis', icon: '/oasisicon.png', href: '#' },
    { name: 'Palm Jumeirah', icon: '/palmjumeriah icon.png', href: '#' },
    { name: 'Arabian Ranches III', icon: '/arabian 3 icon.png', href: '#' },
  ]);

  // Form Fields - Section 5: Client Reviews
  const [reviewsHeading, setReviewsHeading] = useState('What Our Clients Say');
  const [reviewsList, setReviewsList] = useState([
    { id: '1', name: 'Omer Khan', role: 'Verified Client', content: 'I was looking at the real estate market of Dubai and got in contact with Ms. Hana Taghdis of FS Advisory. She showed me multiple projects and finally I was able to select a unit of my choice.', rating: 5 },
    { id: '2', name: 'Nathalie Syvak', role: 'Verified Client', content: 'Our real estate agent is Yulia Kravchenko, we are very pleased with her work and I would like to note her approach to the client.', rating: 5 },
    { id: '3', name: 'Mike Mike', role: 'Verified Client', content: 'Ultimate admiration! I wanted to know more about the real estate business in Dubai. God sent me a unique intelligent young lady Yulia Kravchenko.', rating: 5 },
  ]);

  // Form Fields - Section 6: FAQs (Fallback / Local Editor State)
  const [faqsHeading, setFaqsHeading] = useState('Frequently Asked Questions');
  const [faqsList, setFaqsList] = useState(DEFAULT_GLOBAL_FAQS_ITEMS);

  // Section Details & Headings (Normal input for heading, input for tagline, textarea for content)
  const [heroHeading, setHeroHeading] = useState('DISCOVER THE RIGHT PROPERTY OPPORTUNITY.');
  const [heroTagline, setHeroTagline] = useState('Curated opportunities. Intelligent insights. Aligned with your goals.');
  const [heroDetail, setHeroDetail] = useState('');

  const [featuresDetail, setFeaturesDetail] = useState('');
  const [featuresBgImage, setFeaturesBgImage] = useState('/dubai hills.png');

  const [oppTitle, setOppTitle] = useState('Opportunities We Currently Recommend');
  const [oppTagline, setOppTagline] = useState('FEATURED INVESTMENTS');
  const [oppContentText, setOppContentText] = useState('Hand-picked, high-yield developments across prime UAE communities.');
  const [oppDetail, setOppDetail] = useState('');
  const [oppBgImage, setOppBgImage] = useState('/grandpolo_club.png');
  const [isAddOppDropdownOpen, setIsAddOppDropdownOpen] = useState(false);
  const [oppSearchFilter, setOppSearchFilter] = useState('');

  const [commTagline, setCommTagline] = useState('FEATURED DISTRICTS');
  const [commContentText, setCommContentText] = useState('Discover master-planned developments and luxury waterfront neighborhoods.');
  const [commDetail, setCommDetail] = useState('');
  const [commBgImage, setCommBgImage] = useState('/dubai_hills.png');

  // Long Content Articles & Guides (Retains rich text summernote editor)
  const [longContentDetail, setLongContentDetail] = useState(DEFAULT_OFFPLAN_GUIDE_HTML);
  const [longContentBgImage, setLongContentBgImage] = useState('');

  // Reviews Inputs
  const [reviewsTagline, setReviewsTagline] = useState('FROM CLIENT TESTIMONIALS');
  const [reviewsIntroText, setReviewsIntroText] = useState('Verified experiences from global investors and residents who achieved their real estate goals with FS Advisory.');
  const [reviewsDetail, setReviewsDetail] = useState('');
  const [reviewsBgImage, setReviewsBgImage] = useState('/thevalley.png');

  // FAQs Inputs (Matching Screenshot: Badge/Tagline, Title/Heading, Content Textarea)
  const [faqsTagline, setFaqsTagline] = useState('UAE off-plan property · Buyer guide');
  const [faqsMainHeading, setFaqsMainHeading] = useState('Everything you need to know about UAE off-plan property');
  const [faqsContentText, setFaqsContentText] = useState('Answers To The Questions We Hear Most From People Exploring An Off-Plan Purchase In The UAE — From How The Process Works To Ownership, Payment Plans, And What To Check Before You Commit.');
  const [faqsDetail, setFaqsDetail] = useState('');
  const [faqsBgImage, setFaqsBgImage] = useState('/buy_hero.png');

  // AI Assessment Customization State
  const [assessmentHeading, setAssessmentHeading] = useState('What is your primary goal?');
  const [assessmentTagline, setAssessmentTagline] = useState('AI ENGINE ASSESSMENT');
  const [assessmentSubheading, setAssessmentSubheading] = useState('This helps us tailor recommendations to what matters most to you.');
  const [assessmentDetail, setAssessmentDetail] = useState('');
  const [assessmentBgImage, setAssessmentBgImage] = useState('/ai_engine_hero.jpg');
  const [assessmentGoals, setAssessmentGoals] = useState([
    { id: 'family-home', title: 'Family Home', subtitle: 'Find The Perfect Place To Put Down Roots', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.016-.941l.9-2.316A7.95 7.95 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>' },
    { id: 'investment', title: 'Investment', subtitle: 'Build Wealth Through Real Estate', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a.5.5 0 00.71 0l7.234-7.234M21 8.25V12m0-3.75h-3.75"/>' },
    { id: 'global-clients', title: 'Global Clients', subtitle: 'Cross-Border Advisory With Local Expertise You Can Trust.', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path stroke-linecap="round" stroke-linejoin="round" d="M3.6 9h16.8M3.6 15h16.8"/><path stroke-linecap="round" stroke-linejoin="round" d="M11.5 3a17.5 17.5 0 000 18M12.5 3a17.5 17.5 0 010 18"/>' },
    { id: 'passive-income', title: 'Passive Income', subtitle: 'Finding The Right Home In The Right Community.', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-9h4.5a2.25 2.25 0 010 4.5H9.75a2.25 2.25 0 000 4.5H15"/>' },
    { id: 'capital-growth', title: 'Capital Growth', subtitle: 'Building Wealth Through Strategic Real Estate Investments.', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.25V21h4.5v-7.75H3zm6.75-4.5V21h4.5V8.75h-4.5zm6.75-5.75V21H21V3h-4.5z"/>' },
    { id: 'luxury-lifestyle', title: 'Luxury Lifestyle', subtitle: 'Cross-Border Advisory With Local Expertise You Can Trust.', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>' },
  ]);

  // Page-specific Custom Sections Store (Detail HTML, Title, Tagline, Content Text, Cover Image, Items array for any section across all pages)
  const [customSectionsData, setCustomSectionsData] = useState<
    Record<
      string,
      {
        detailHtml: string;
        bgImage: string;
        title?: string;
        tagline?: string;
        contentText?: string;
        items?: any[];
        keyNumbersTagline?: string;
        keyNumbersText?: string;
        keyNumbersSource?: string;
        tableTitle?: string;
        tableImage?: string;
        tableMetrics?: Record<string, string>;
        [key: string]: any;
      }
    >
  >({});

  // Helper to get or initialize section detail and background image
  const getSectionDetail = (secId: string, defaultHtml: string = '') => {
    const current = customSectionsData[secId]?.detailHtml;
    if (!current || !current.trim()) return defaultHtml;

    // If this is a guide section and current content is just the trivial stub/placeholder, upgrade it
    if ((secId === 'dev-guide' || secId.endsWith('-guide')) && defaultHtml) {
      const isStub =
        current.includes('Strategic buyer roadmap') ||
        current.includes('Understanding builder delivery') ||
        current.includes('Educational framework') ||
        current.includes('Strategic investment roadmap') ||
        (current.length < 150 && current.includes('Guide') && !current.includes('Why Buy Off-Plan') && !current.includes('Types of off-plan property'));
      if (isStub) {
        return defaultHtml;
      }
    }

    return current;
  };
  const setSectionDetail = (secId: string, val: string) => {
    setCustomSectionsData((prev) => ({
      ...prev,
      [secId]: {
        ...(prev[secId] || { bgImage: '', title: '', tagline: '', contentText: '' }),
        detailHtml: val,
      },
    }));
  };
  const getSectionTitle = (secId: string, defaultTitle: string = '') => {
    return customSectionsData[secId]?.title || defaultTitle;
  };
  const setSectionTitle = (secId: string, val: string) => {
    setCustomSectionsData((prev) => ({
      ...prev,
      [secId]: {
        ...(prev[secId] || { detailHtml: '', bgImage: '', tagline: '', contentText: '' }),
        title: val,
      },
    }));
  };
  const getSectionTagline = (secId: string, defaultTagline: string = '') => {
    return customSectionsData[secId]?.tagline || defaultTagline;
  };
  const setSectionTagline = (secId: string, val: string) => {
    setCustomSectionsData((prev) => ({
      ...prev,
      [secId]: {
        ...(prev[secId] || { detailHtml: '', bgImage: '', title: '', contentText: '' }),
        tagline: val,
      },
    }));
  };
  const getSectionContentText = (secId: string, defaultContent: string = '') => {
    return customSectionsData[secId]?.contentText || defaultContent;
  };
  const setSectionContentText = (secId: string, val: string) => {
    setCustomSectionsData((prev) => ({
      ...prev,
      [secId]: {
        ...(prev[secId] || { detailHtml: '', bgImage: '', title: '', tagline: '' }),
        contentText: val,
      },
    }));
  };
  const getSectionBg = (secId: string, defaultBg: string = '') => {
    return customSectionsData[secId]?.bgImage || defaultBg;
  };
  const setSectionBg = (secId: string, url: string) => {
    setCustomSectionsData((prev) => ({
      ...prev,
      [secId]: {
        ...(prev[secId] || { detailHtml: '', title: '', tagline: '', contentText: '' }),
        bgImage: url,
      },
    }));
  };
  const getSectionItems = (secId: string, defaultItems: any[] = []) => {
    return customSectionsData[secId]?.items || defaultItems;
  };
  const setSectionItems = (secId: string, items: any[]) => {
    setCustomSectionsData((prev) => ({
      ...prev,
      [secId]: {
        ...(prev[secId] || { detailHtml: '', title: '', tagline: '', contentText: '' }),
        items,
      },
    }));
  };

  // Section manifest per website page (FAQs is managed independently on every page)
  const getPageSections = (slug: string) => {
    switch (slug) {
      case 'home':
        return [
          { id: 'hero', label: 'Hero Section', desc: 'Main headline, sub-headline and action buttons' },
          { id: 'features', label: 'Advisory / Feature Bar', desc: 'AI advisory, FS scores, curated & guidance features' },
          { id: 'opportunities', label: 'Recommended Opportunities', desc: 'Featured investment opportunities and scoring' },
          { id: 'community', label: 'Trending Community', desc: 'Curated master development icons and links' },
          { id: 'long-content', label: 'Off-Plan Long Content', desc: 'Detailed comprehensive guide & educational content' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions, off-plan guide and advisor contact' },
        ];

      case 'ai-assessment':
        return [
          { id: 'hero', label: 'AI Advisory Hero', desc: 'Hero heading and interactive assessment slider' },
          { id: 'assessment', label: 'Goal Selection Step', desc: '6 Primary goal cards, helper text and questionnaire flow' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions and assessment guide' },
        ];
      case 'about-us':
        return [
          { id: 'about-hero', label: 'About Us Hero', desc: 'Redefining real estate advisory in Dubai banner' },
          { id: 'about-section', label: 'Advisory Strategy & Philosophy', desc: 'Core mission, advisory pillars and company values' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & advisory answers' },
        ];
      case 'opportunities':
      case 'the-valley':
      case 'recommendation-result':
        return [
          { id: 'valley-hero', label: 'Recommendation Hero', desc: 'Recommendation result and developer banner' },
          { id: 'valley-overview', label: 'Overview & FS Score', desc: 'Comprehensive score analysis and community stats' },
          { id: 'valley-why-recommends', label: 'Why FS Recommends', desc: 'Investment rationale, capital growth and family lifestyle' },
          { id: 'valley-highlights', label: 'Key Highlights', desc: 'Golden beach, sports village, town center & amenities' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & investment guide' },
        ];
      case 'community-detail':
      case 'dubai-creek-harbour':
      case 'palm-jumeirah':
      case 'business-bay':
      case 'dubai-hills-estate':
      case 'downtown-dubai':
      case 'arabian-ranches-iii':
      case 'damac-lagoons':
      case 'tilal-al-ghaf':
      case 'dubai-marina':
      case 'emaar-south':
      case 'the-oasis':
        return [
          { id: 'comm-detail-hero', label: 'Community Detail Hero', desc: 'Breadcrumb, community headline and overview subheadline' },
          { id: 'comm-overview', label: 'Community Overview', desc: 'Open skyline views, master planning and district description' },
          { id: 'comm-opportunities', label: 'Selected Opportunities', desc: 'Curated residential launches and unit selections' },
          { id: 'comm-amenities', label: 'Amenities & Location', desc: 'Connected promenades, road networks and lifestyle amenities' },
          { id: 'comm-guide', label: 'Off-Plan Investment Guide', desc: 'Strategic investment roadmap and timeline insights' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & district buyer guide' },
        ];
      case 'communities':
        return [
          { id: 'comm-hero', label: 'Communities Hero', desc: '12 distinct ways to live in Dubai intro banner' },
          { id: 'comm-grid', label: '12 Communities Grid', desc: 'District directory with photos, badges and pricing' },
          { id: 'comm-guide', label: 'Off-Plan Investment Guide', desc: 'Educational framework for Dubai real estate' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & community guide' },
        ];
      case 'compare-communities':
        return [
          { id: 'compare-hero', label: 'Compare Communities Hero', desc: 'Side by side evaluation headline and subtitle' },
          { id: 'compare-table', label: 'Comparison Matrix', desc: 'Community comparison metrics, scores and capital yields' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & comparison guide' },
        ];
      case 'developers':
        return [
          { id: 'dev-hero', label: 'Developers Hero', desc: 'All master developers in Dubai directory hero' },
          { id: 'dev-intro', label: 'Developers Intro Section', desc: 'Track record, financial stability and build quality overview' },
          { id: 'dev-grid', label: 'Directory Grid', desc: 'Drag and drop developers from the Developers tab for the directory grid' },
          { id: 'dev-guide', label: 'Off-Plan Investment Guide', desc: 'Understanding builder delivery and escrow accounts' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & builder delivery guide' },
        ];
      case 'developer-detail':
      case 'developers-detail':
      case 'emaar':
      case 'emaar-properties':
      case 'damac':
      case 'damac-properties':
      case 'nakheel':
      case 'meraas':
      case 'sobha':
      case 'sobha-realty':
      case 'aldar':
      case 'aldar-properties':
      case 'omniyat':
      case 'danube':
      case 'danube-properties':
      case 'binghatti':
      case 'binghatti-developers':
      case 'azizi':
      case 'azizi-developments':
      case 'ellington':
      case 'ellington-properties':
      case 'samana':
      case 'samana-developers':
      case 'mag-property-development':
      case 'select-group':
        return [
          { id: 'dev-detail-hero', label: 'Developer Hero', desc: 'Developer header and track record introduction' },
          { id: 'dev-brief', label: 'Developer Brief & Overview', desc: 'History, scale of operations and master developments' },
          { id: 'dev-projects', label: 'Developer Projects Grid', desc: 'Active launches and completed master projects' },
          { id: 'dev-ask-banner', label: 'Ask About Emaar Banner', desc: 'Begin quietly - personal consultation CTA banner' },
          { id: 'dev-guide', label: 'Off-Plan Investment Guide', desc: 'Strategic buyer roadmap' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & developer advisory' },
        ];
      case 'buy':
        return [
          { id: 'buy-hero', label: 'Buy Property Hero', desc: 'Buy in Dubai with clarity headline & background image' },
          { id: 'buy-search', label: 'Search & Filters Bar', desc: 'Price, bedrooms, property types and community filters' },
          { id: 'buy-listings', label: 'Property Listings Grid', desc: 'Ready & off-plan properties catalog with sidebar' },
          { id: 'buy-about', label: 'About R. Hills & Properties Explore', desc: 'Community editorial story, amenities, and properties to explore' },
          { id: 'buy-guide', label: 'Off-Plan Long Content Guide', desc: 'Long educational guide on purchasing off-plan property' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & buyer guide' },
        ];

      case 'blog':
        return [
          { id: 'blog-hero', label: 'Blog Hero Section', desc: 'Hero headline, subtitle, and cover image' },
          { id: 'blog-where-to-live', label: 'Where to Live City Guides', desc: 'UAE city guides, area counts, and community destination cards' },
        ];

      case 'buy-detail':
      case 'property-detail':
        return [
          { id: 'buy-detail-hero', label: 'Hero & Photo Gallery', desc: 'Breadcrumb navigation, main featured photo, 2 side gallery photos, Verified & SuperAgent badges' },
          { id: 'buy-detail-overview', label: 'Property Details & Pricing', desc: 'Headline, price, monthly mortgage estimate, property type, furnishing, bedrooms, area & bathrooms' },
          { id: 'buy-detail-description', label: 'Description & Key Features', desc: 'Location eyebrow, headline, available from date, description paragraphs and bullet points' },
          { id: 'buy-detail-amenities', label: 'Property Amenities', desc: 'Multi-select property amenities and interior/exterior facilities' },
          { id: 'buy-detail-trends', label: 'Transactions & Price Trends', desc: 'Sold For & Rented For transaction tables, Price vs Average, Size vs Average & Promotional Banner' },
          { id: 'buy-detail-location', label: 'Location & Map', desc: 'Cluster & community address title, subtitle and Google Maps link' },
          { id: 'buy-detail-building', label: 'Building & Community Insights', desc: 'About Building & Community tabs, summary, properties listed, price range and 5.0 rating breakdown' },
          { id: 'buy-detail-recommended', label: 'Recommended Properties', desc: 'Curated "Recommended for you" property cards at the bottom of the page' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & buyer guide' },
        ];

      case 'project-main-page':
        return [
          { id: 'proj-main-hero', label: 'Project Main Hero', desc: 'Off-Plan Property For Sale In Dubai header' },
          { id: 'proj-main-content', label: 'Projects Catalog & Filters', desc: 'Master developments and launch catalog' },
          { id: 'proj-main-guide', label: 'Off-Plan Long Content Guide', desc: 'Comprehensive educational guide to off-plan property in Dubai' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & buyer guide' },
        ];
      case 'project-detail':
      case 'project-details':
        return [
          { id: 'proj-hero', label: 'Project Detail Hero', desc: 'Eyebrow, title lines, subtitle and check availability CTA' },
          { id: 'proj-overview', label: 'Overview & Key Metrics', desc: 'Starting price, unit types, size range, handover, narrative and highlights' },
          { id: 'proj-floorplans', label: 'Floor Plans & Layouts', desc: '1, 2 & 3 Bedroom configurations, areas, bathrooms and floorplan asset' },
          { id: 'proj-amenities', label: 'Amenities & Facilities', desc: '10 lifestyle amenities selection and facility badges' },
          { id: 'proj-video', label: 'Video Showcase', desc: 'Video tour title, narrative, video URL and poster cover' },
          { id: 'proj-gallery', label: 'Photo Gallery', desc: 'Curated interior, exterior and architectural photography' },
          { id: 'proj-location', label: 'Location & Surroundings', desc: 'District neighborhood narrative, map asset and Google Maps link' },
          { id: 'proj-guide', label: 'Off-Plan Investment Guide', desc: 'Strategic buyer roadmap and educational framework' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions, freehold status and handover FAQs' },
          { id: 'proj-similar', label: 'Similar Projects Grid', desc: 'Curated alternative off-plan developments' },
        ];
      case 'advisory-report':
        return [
          { id: 'report-hero', label: 'Advisory Report Hero', desc: 'Personalized real estate report headline' },
          { id: 'report-score', label: 'Overall Match Score', desc: 'Algorithm score breakdown across lifestyle and returns' },
          { id: 'report-comm', label: 'Recommended Communities', desc: 'Top 3 matched communities tailored to portfolio' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & report explanation' },
        ];
      default:
        // Check if slug indicates a property listing / buy-detail page
        const isPropertyDetail =
          slug === 'buy-detail' ||
          slug === 'property-detail' ||
          slug.startsWith('property-') ||
          editorReturnTab === 'properties' ||
          properties.some((prop) => {
            const s = (prop.slug || prop.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
            return s === slug || `property-${s}` === slug;
          }) ||
          DEFAULT_PROPERTIES.some((prop) => {
            const s = (prop.slug || prop.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
            return s === slug || `property-${s}` === slug;
          });

        if (isPropertyDetail) {
          return [
            { id: 'buy-detail-hero', label: 'Hero & Photo Gallery', desc: 'Breadcrumb navigation, main featured photo, 2 side gallery photos, Verified & SuperAgent badges' },
            { id: 'buy-detail-overview', label: 'Property Details & Pricing', desc: 'Headline, price, monthly mortgage estimate, property type, furnishing, bedrooms, area & bathrooms' },
            { id: 'buy-detail-description', label: 'Description & Key Features', desc: 'Location eyebrow, headline, available from date, description paragraphs and bullet points' },
            { id: 'buy-detail-amenities', label: 'Property Amenities', desc: 'Multi-select property amenities and interior/exterior facilities' },
            { id: 'buy-detail-trends', label: 'Transactions & Price Trends', desc: 'Sold For & Rented For transaction tables, Price vs Average, Size vs Average & Promotional Banner' },
            { id: 'buy-detail-location', label: 'Location & Map', desc: 'Cluster & community address title, subtitle and Google Maps link' },
            { id: 'buy-detail-building', label: 'Building & Community Insights', desc: 'About Building & Community tabs, summary, properties listed, price range and 5.0 rating breakdown' },
            { id: 'buy-detail-recommended', label: 'Recommended Properties', desc: 'Curated "Recommended for you" property cards at the bottom of the page' },
            { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & buyer guide' },
          ];
        }

        // Check if slug indicates an offplan or project page
        const isProjectDetail =
          slug === 'project-detail' ||
          slug === 'project-details' ||
          slug.startsWith('project-') ||
          slug.includes('project') ||
          editorReturnTab === 'offplans' ||
          offplans.some((o) => {
            const s = (o.slug || o.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
            return s === slug || `project-${s}` === slug;
          }) ||
          DEFAULT_OFFPLAN_PROJECTS.some((o) => {
            const s = (o.slug || o.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
            return s === slug || `project-${s}` === slug;
          });

        if (isProjectDetail) {
          return [
            { id: 'proj-hero', label: 'Project Detail Hero', desc: 'Eyebrow, title lines, subtitle and check availability CTA' },
            { id: 'proj-overview', label: 'Overview & Key Metrics', desc: 'Starting price, unit types, size range, handover, narrative and highlights' },
            { id: 'proj-floorplans', label: 'Floor Plans & Layouts', desc: '1, 2 & 3 Bedroom configurations, areas, bathrooms and floorplan asset' },
            { id: 'proj-amenities', label: 'Amenities & Facilities', desc: '10 lifestyle amenities selection and facility badges' },
            { id: 'proj-video', label: 'Video Showcase', desc: 'Video tour title, narrative, video URL and poster cover' },
            { id: 'proj-gallery', label: 'Photo Gallery', desc: 'Curated interior, exterior and architectural photography' },
            { id: 'proj-location', label: 'Location & Surroundings', desc: 'District neighborhood narrative, map asset and Google Maps link' },
            { id: 'proj-guide', label: 'Off-Plan Investment Guide', desc: 'Strategic buyer roadmap and educational framework' },
            { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions, freehold status and handover FAQs' },
            { id: 'proj-similar', label: 'Similar Projects Grid', desc: 'Curated alternative off-plan developments' },
          ];
        }

        // Check if slug indicates a developer page
        if (
          slug.includes('developer') ||
          developerCards.some((d) => (d.slug || d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')) === slug)
        ) {
          return [
            { id: 'dev-detail-hero', label: 'Developer Hero', desc: 'Developer header and track record introduction' },
            { id: 'dev-brief', label: 'Developer Brief & Overview', desc: 'History, scale of operations and master developments' },
            { id: 'dev-projects', label: 'Developer Projects Grid', desc: 'Active launches and completed master projects' },
            { id: 'dev-ask-banner', label: 'Ask About Emaar Banner', desc: 'Begin quietly - personal consultation CTA banner' },
            { id: 'dev-guide', label: 'Off-Plan Investment Guide', desc: 'Strategic buyer roadmap' },
            { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & developer advisory' },
          ];
        }

        // Check if slug indicates a blog page
        const isBlog =
          slug === 'blog-details' ||
          slug.startsWith('blog-') ||
          editorReturnTab === 'blogs' ||
          blogsList.some((b) => {
            const s = (b.slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
            return s === slug || `blog-${s}` === slug;
          }) ||
          DEFAULT_BLOGS_CMS.some((b) => {
            const s = (b.slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
            return s === slug || `blog-${s}` === slug;
          });

        if (isBlog) {
          return [
            { id: 'blog-hero', label: 'Blog Hero Section', desc: 'Hero headline, subtitle, search placeholder and background image' },
            { id: 'blog-content', label: 'Article Details & Table of Contents', desc: 'Article metadata and full Summernote rich-text content for text, images, and tables' },
            { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & article FAQ' },
          ];
        }

        // If this page is any community page or community slug, provide the full community detail sections
        return [
          { id: 'comm-detail-hero', label: 'Community Detail Hero', desc: 'Breadcrumb, community headline and overview subheadline' },
          { id: 'comm-overview', label: 'Community Overview', desc: 'Open skyline views, master planning and district description' },
          { id: 'comm-opportunities', label: 'Selected Opportunities', desc: 'Curated residential launches and unit selections' },
          { id: 'comm-amenities', label: 'Amenities & Location', desc: 'Connected promenades, road networks and lifestyle amenities' },
          { id: 'comm-guide', label: 'Off-Plan Investment Guide', desc: 'Strategic investment roadmap and timeline insights' },
          { id: 'faqs', label: 'Buyer Guide & FAQs', desc: 'Frequently asked questions & district buyer guide' },
        ];
    }
  };

  // Available Preset Icons for Quick Selection
  const presetIcons = [
    '/ai.png',
    '/fs score.png',
    '/curated oppo.png',
    '/exp guidance.png',
    '/valleyicon.png',
    '/palmjumeriah icon.png',
    '/creekicon.png',
    '/oasisicon.png',
    '/families.png',
  ];

  // Icon File Upload Handler
  const handleFileUpload = async (file: File, setIconFn?: (url: string) => void): Promise<string> => {
    return new Promise<string>(async (resolve) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.url) {
            if (setIconFn) {
              setIconFn(json.url);
              alert('New icon uploaded and synced successfully!');
            }
            resolve(json.url);
            return;
          }
        }
        // Data URL fallback
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = (e.target?.result as string) || '';
          if (setIconFn && result) setIconFn(result);
          resolve(result);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = (e.target?.result as string) || '';
          if (setIconFn && result) setIconFn(result);
          resolve(result);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // Form Fields - Property
  const [propTitle, setPropTitle] = useState('');
  const [propType, setPropType] = useState('Ready Villa');
  const [propPrice, setPropPrice] = useState('AED 5,000,000');
  const [propLocation, setPropLocation] = useState('Dubai');
  const [propBeds, setPropBeds] = useState(3);
  const [propBaths, setPropBaths] = useState(3);
  const [propArea, setPropArea] = useState<number | string>(2450);
  const [propStatus, setPropStatus] = useState<'available' | 'reserved' | 'sold'>('available');
  const [propImage, setPropImage] = useState('/thevalley.png');
  const [propSlug, setPropSlug] = useState('');

  // Form Fields - OffPlan
  const [offTitle, setOffTitle] = useState('');
  const [offDeveloper, setOffDeveloper] = useState('Emaar Properties');
  const [offPrice, setOffPrice] = useState('AED 2,500,000');
  const [offLocation, setOffLocation] = useState('Dubai');
  const [offCompletion, setOffCompletion] = useState('Q4 2027');

  // Form Fields - Project
  const [projTitle, setProjTitle] = useState('');
  const [projDeveloper, setProjDeveloper] = useState('Emaar Properties');
  const [projCategory, setProjCategory] = useState('Master Community');
  const [projLocation, setProjLocation] = useState('Dubai');

  // Form Fields - Community
  const [commName, setCommName] = useState('');
  const [commTag, setCommTag] = useState('');
  const [commSlug, setCommSlug] = useState('');
  const [commIcon, setCommIcon] = useState('/dubai_hills.png');
  const [commImage, setCommImage] = useState('/dubai hills.png');
  const [commLocation, setCommLocation] = useState('Dubai, UAE');
  const [commHref, setCommHref] = useState('#');
  const [commStatus, setCommStatus] = useState('Active');
  const [commDesc, setCommDesc] = useState('');
  const [commLongContent, setCommLongContent] = useState('');

  // Form Fields - Developer
  const [devName, setDevName] = useState('');
  const [devTag, setDevTag] = useState('');
  const [devSlug, setDevSlug] = useState('');
  const [devLogo, setDevLogo] = useState('/developers/emaar.png');
  const [devImage, setDevImage] = useState('/thevalley.png');
  const [devLocation, setDevLocation] = useState('Dubai, UAE');
  const [devHref, setDevHref] = useState('#');
  const [devStatus, setDevStatus] = useState('Active');
  const [devDesc, setDevDesc] = useState('');

  // Core static page slugs (predefined system pages)
  // Strictly the fixed core pages (Details pages are non-fixed / dynamic)
  const coreStaticSlugs = [
    'home',
    'ai-assessment',
    'advisory-report',
    'opportunities',
    'the-valley',
    'compare-communities',
    'project-main-page',
    'buy',
    'communities',
    'developers',
    'blog',
    'about-us'
  ];

  // Helper to check if a page belongs to a Property Listing (excluding the core 'buy-detail' template page)
  const isPropertyPage = (p: PageItem) => {
    if (p.slug === 'buy-detail' || p.slug === 'buy') return false;
    const slug = (p.slug || '').toLowerCase();
    return (
      Boolean(p.content?.propertyMeta) ||
      Boolean(p.content?.customSections?.['buy-detail-hero']) ||
      Boolean(p.content?.customSections?.['buy-detail-overview']) ||
      slug.startsWith('property-') ||
      properties.some((prop) => {
        const s = (prop.slug || prop.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).toLowerCase();
        return s === slug || `property-${s}` === slug;
      }) ||
      DEFAULT_PROPERTIES.some((prop) => {
        const s = (prop.slug || prop.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).toLowerCase();
        return s === slug || `property-${s}` === slug;
      })
    );
  };

  // Persistent Deletion Tombstones Helpers
  const getDeletedSet = (key: string): Set<string> => {
    if (typeof window === 'undefined') return new Set();
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr.map((x: any) => String(x).toLowerCase().trim()) : []);
    } catch {
      return new Set();
    }
  };

  const recordDeletedItem = (key: string, ...identifiers: (string | number | undefined | null)[]) => {
    if (typeof window === 'undefined') return;
    try {
      const current = getDeletedSet(key);
      identifiers.forEach((id) => {
        if (id !== undefined && id !== null && String(id).trim() !== '') {
          current.add(String(id).toLowerCase().trim());
        }
      });
      localStorage.setItem(key, JSON.stringify(Array.from(current)));
    } catch (e) {
      console.error('Failed recording deleted item', e);
    }
  };

  // Helper to check if a page belongs to a Community
  const isCommunityPage = (p: PageItem) => {
    // Fixed core pages that must not be classified as community items
    if (p.slug === 'opportunities' || p.slug === 'the-valley' || p.slug === 'communities' || p.slug === 'compare-communities') return false;
    const slug = (p.slug || '').toLowerCase();
    const title = (p.title || '').toLowerCase();
    return (
      communities.some((c) => (c.slug || '').toLowerCase() === slug || (c.href || '').toLowerCase().includes(slug)) ||
      DEFAULT_COMMUNITY_CARDS.some((c) => (c.slug || '').toLowerCase() === slug || (c.href || '').toLowerCase().includes(slug)) ||
      Boolean(p.content?.customSections?.['comm-detail-hero'] || p.content?.isCommunity) ||
      title.includes('community detail') ||
      slug.startsWith('comm-') ||
      slug === 'community-detail'
    );
  };

  // Helper to check if a page belongs to a Developer
  const isDeveloperPage = (p: PageItem) => {
    // Fixed core page that must not be classified as a single developer item
    if (p.slug === 'developers') return false;
    const slug = (p.slug || '').toLowerCase();
    const title = (p.title || '').toLowerCase();
    return (
      developerCards.some((d) => (d.slug || '').toLowerCase() === slug || (d.href || '').toLowerCase().includes(slug)) ||
      DEFAULT_DEVELOPER_CARDS.some((d) => (d.slug || '').toLowerCase() === slug || (d.href || '').toLowerCase().includes(slug)) ||
      Boolean(p.content?.customSections?.['dev-hero'] || p.content?.isDeveloper) ||
      title.includes('developer detail') ||
      slug.startsWith('dev-') ||
      slug === 'developer-detail'
    );
  };

  // Helper to check if a page belongs to an Off-Plan Project
  const isOffPlanPage = (p: PageItem) => {
    // Recommendation Result page uses the slug 'opportunities' / 'the-valley' but is a fixed core page, not an off-plan project
    if (p.slug === 'opportunities' || p.slug === 'the-valley') return false;
    const slug = (p.slug || '').toLowerCase();
    const title = (p.title || '').toLowerCase();
    return (
      Boolean(p.content?.projectMeta) ||
      Boolean(p.content?.isOffPlan) ||
      Boolean(p.content?.customSections?.['proj-hero']) ||
      Boolean(p.content?.customSections?.['proj-overview']) ||
      title.includes('project detail') ||
      slug.startsWith('proj-') ||
      slug === 'project-detail' ||
      slug === 'project-details' ||
      offplans.some((o) => {
        const s = (o.slug || o.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).toLowerCase();
        return s === slug || slug.includes(s) || s.includes(slug);
      }) ||
      DEFAULT_OFFPLAN_PROJECTS.some((o) => {
        const s = (o.slug || o.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).toLowerCase();
        return s === slug || slug.includes(s) || s.includes(slug);
      })
    );
  };

  // Helper to check if a page belongs to a Blog
  const isBlogPage = (p: PageItem) => {
    const slug = (p.slug || '').toLowerCase();
    if (slug === 'blog') return false;
    const title = (p.title || '').toLowerCase();
    return (
      Boolean(p.content?.blogMeta) ||
      blogsList.some((b) => (b.slug || '').toLowerCase() === slug) ||
      DEFAULT_BLOGS_CMS.some((b) => (b.slug || '').toLowerCase() === slug) ||
      title.includes('blog details') ||
      slug.startsWith('blog-') ||
      slug === 'blog-details'
    );
  };

  // Helper to determine if a page is a TRUE custom dynamic page (for Dynamic Pages tab)
  const isDynamicPage = (p: PageItem) => {
    // Community, Developer, Off-Plan, Property, Blog and Core Static pages MUST NOT appear in Dynamic Pages!
    if (
      isCommunityPage(p) ||
      isDeveloperPage(p) ||
      isOffPlanPage(p) ||
      isPropertyPage(p) ||
      isBlogPage(p) ||
      coreStaticSlugs.includes(p.slug)
    ) {
      return false;
    }
    // Only user-created custom dynamic pages
    return Boolean(p.content?.isDynamic);
  };

  // Add Item Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch collections
  const checkBackendAndFetch = async () => {
    setLoading(true);
    try {
      const deletedPages = getDeletedSet('fs_deleted_pages');
      const deletedProps = getDeletedSet('fs_deleted_properties');
      const deletedOff = getDeletedSet('fs_deleted_offplans');
      const deletedComm = getDeletedSet('fs_deleted_communities');
      const deletedDevs = getDeletedSet('fs_deleted_developers');
      const deletedBlogs = getDeletedSet('fs_deleted_blogs');

      // 1. ALWAYS load saved data from the shared persistent store (.cms-sync.json)
      const syncRes = await fetch(getSyncBaseUrl(), { cache: 'no-store' }).catch(() => null);
      const syncJson = syncRes?.ok ? await syncRes.json().catch(() => null) : null;
      const sharedData = syncJson?.data || {};

      // A. Sync Pages & Content
      let currentPages = [...DEFAULT_PAGES];
      if (sharedData.pages && typeof sharedData.pages === 'object') {
        const savedPagesMap = sharedData.pages;

        // Overlay changes onto existing default pages
        currentPages = currentPages.map((dp) => {
          if (savedPagesMap[dp.slug]) {
            return {
              ...dp,
              ...savedPagesMap[dp.slug],
              content: {
                ...(dp.content || {}),
                ...(savedPagesMap[dp.slug].content || {}),
              },
            };
          }
          return dp;
        });

        // Add user-created dynamic custom pages
        Object.keys(savedPagesMap).forEach((slug) => {
          const isExisting = currentPages.some((p) => p.slug === slug);
          if (!isExisting) {
            currentPages.push(savedPagesMap[slug]);
          }
        });
      }

      // Check localStorage for any additional page overrides
      if (typeof window !== 'undefined') {
        currentPages = currentPages.map((p) => {
          try {
            const raw = localStorage.getItem(`fs_page_${p.slug}`);
            if (raw) {
              const parsed = JSON.parse(raw);
              return {
                ...p,
                ...parsed,
                content: { ...(p.content || {}), ...(parsed.content || {}) },
              };
            }
          } catch (_) {}
          return p;
        });
      }

      // Filter out deleted pages
      currentPages = currentPages.filter(
        (p) => !deletedPages.has(String(p.id).toLowerCase()) && !deletedPages.has((p.slug || '').toLowerCase())
      );
      setPages(currentPages);

      // Load Global Reviews
      const homeP = currentPages.find((p) => p.slug === 'home');
      const globalRev = sharedData.globalReviews || homeP?.content?.reviews;
      if (globalRev) {
        if (globalRev.heading) setReviewsHeading(globalRev.heading);
        if (globalRev.tagline) setReviewsTagline(globalRev.tagline);
        if (globalRev.introText) setReviewsIntroText(globalRev.introText);
        if (Array.isArray(globalRev.items) && globalRev.items.length > 0) setReviewsList(globalRev.items);
        if (globalRev.detailHtml) setReviewsDetail(globalRev.detailHtml);
        if (globalRev.backgroundImage) setReviewsBgImage(globalRev.backgroundImage);
      }

      // Load Global FAQs
      const globalFq = sharedData.globalFaqs || homeP?.content?.faqs;
      if (globalFq) {
        if (globalFq.heading) setFaqsHeading(globalFq.heading);
        if (globalFq.tagline) setFaqsTagline(globalFq.tagline);
        if (globalFq.mainHeading) setFaqsMainHeading(globalFq.mainHeading);
        if (globalFq.contentText) setFaqsContentText(globalFq.contentText);
        if (Array.isArray(globalFq.items) && globalFq.items.length > 0) setFaqsList(globalFq.items);
        if (globalFq.detailHtml) setFaqsDetail(globalFq.detailHtml);
        if (globalFq.backgroundImage) setFaqsBgImage(globalFq.backgroundImage);
      }

      // B. Sync Properties
      let candidateProps: PropertyItem[] = DEFAULT_PROPERTIES;
      if (Array.isArray(sharedData.properties) && sharedData.properties.length > 0) {
        candidateProps = sharedData.properties;
      } else if (typeof window !== 'undefined') {
        const savedProps = localStorage.getItem('fs_properties_list');
        if (savedProps) {
          try {
            const parsed = JSON.parse(savedProps);
            if (Array.isArray(parsed) && parsed.length > 0) candidateProps = parsed;
          } catch (_) {}
        }
      }
      setProperties(
        candidateProps.filter(
          (p) =>
            !deletedProps.has(String(p.id).toLowerCase()) &&
            !deletedProps.has((p.slug || '').toLowerCase()) &&
            !deletedProps.has((p.title || '').trim().toLowerCase())
        )
      );

      // C. Sync Off-Plan Projects
      let candidateOff: OffPlanItem[] = DEFAULT_OFFPLAN_PROJECTS;
      if (Array.isArray(sharedData.offplans) && sharedData.offplans.length > 0) {
        candidateOff = sharedData.offplans;
      } else if (typeof window !== 'undefined') {
        const savedOff = localStorage.getItem('fs_offplans_list');
        if (savedOff) {
          try {
            const parsed = JSON.parse(savedOff);
            if (Array.isArray(parsed) && parsed.length > 0) candidateOff = parsed;
          } catch (_) {}
        }
      }
      setOffplans(
        candidateOff.filter(
          (o) =>
            !deletedOff.has(String(o.id).toLowerCase()) &&
            !deletedOff.has((o.title || '').trim().toLowerCase()) &&
            !deletedOff.has((o.slug || '').toLowerCase())
        )
      );

      // D. Sync Communities
      let candidateComm: CommunityItem[] = DEFAULT_COMMUNITY_CARDS;
      if (Array.isArray(sharedData.communities) && sharedData.communities.length > 0) {
        candidateComm = sharedData.communities;
      } else if (typeof window !== 'undefined') {
        const savedComm = localStorage.getItem('fs_communities_list');
        if (savedComm) {
          try {
            const parsed = JSON.parse(savedComm);
            if (Array.isArray(parsed) && parsed.length > 0) candidateComm = parsed;
          } catch (_) {}
        }
      }
      setCommunities(
        candidateComm.filter(
          (c) =>
            !deletedComm.has(String(c.id).toLowerCase()) &&
            !deletedComm.has((c.name || '').toLowerCase()) &&
            !deletedComm.has((c.slug || '').toLowerCase())
        )
      );

      // E. Sync Developers
      let candidateDevs: DeveloperCardItem[] = DEFAULT_DEVELOPER_CARDS;
      if (Array.isArray(sharedData.developerCards) && sharedData.developerCards.length > 0) {
        candidateDevs = sharedData.developerCards;
      } else if (typeof window !== 'undefined') {
        const savedDevs = localStorage.getItem('fs_developers_list');
        if (savedDevs) {
          try {
            const parsed = JSON.parse(savedDevs);
            if (Array.isArray(parsed) && parsed.length > 0) candidateDevs = parsed;
          } catch (_) {}
        }
      }
      setDeveloperCards(
        candidateDevs.filter(
          (d) =>
            !deletedDevs.has(String(d.id).toLowerCase()) &&
            !deletedDevs.has((d.name || '').toLowerCase()) &&
            !deletedDevs.has((d.slug || '').toLowerCase())
        )
      );

      // F. Sync Blogs
      let candidateBlogs: BlogCMSItem[] = DEFAULT_BLOGS_CMS;
      if (Array.isArray(sharedData.blogs) && sharedData.blogs.length > 0) {
        candidateBlogs = sharedData.blogs;
      } else if (typeof window !== 'undefined') {
        const savedBlogs = localStorage.getItem('fs_blogs_list');
        if (savedBlogs) {
          try {
            const parsed = JSON.parse(savedBlogs);
            if (Array.isArray(parsed) && parsed.length > 0) candidateBlogs = parsed;
          } catch (_) {}
        }
      }
      setBlogsList(
        candidateBlogs.filter(
          (b) =>
            !deletedBlogs.has(String(b.id).toLowerCase()) &&
            !deletedBlogs.has((b.title || '').toLowerCase()) &&
            !deletedBlogs.has((b.slug || '').toLowerCase())
        )
      );

      // 2. Check optional backend server (if available, merge extra backend records)
      const healthRes = await fetch(`${API_BASE_URL}/health`).catch(() => null);
      if (healthRes && healthRes.ok) {
        setApiConnected(true);
      } else {
        setApiConnected(false);
      }
    } catch (err) {
      console.warn('Error synchronizing CMS data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBackendAndFetch();
  }, []);

  // Open Full-Page Editor for Page
  // Create and immediately open new dynamic page editor
  const handleCreateNewDynamicPage = () => {
    const timestamp = Date.now().toString().slice(-4);
    const newPageItem: PageItem = {
      id: Date.now(),
      title: 'New Dynamic Page ' + timestamp,
      slug: 'new-page-' + timestamp,
      meta_title: 'New Dynamic Page | FS Real Estate Advisory',
      meta_description: 'Custom dynamic real estate page tailored with selected components.',
      status: 'draft',
      content: {
        isDynamic: true,
        ogImage: '/buy_hero.png',
        dynamicSections: [
          {
            id: 'hero-3-' + timestamp,
            type: 'hero-3',
            name: 'Hero Section 3',
            title: 'Explore Prime Real Estate In Dubai',
            description: 'Curated luxury properties, off-plan projects and master developments across top communities.',
            detailHtml: '<h2>Explore Prime Real Estate In Dubai</h2><p>Curated luxury properties, off-plan projects and master developments across top communities.</p>',
            bgImage: '/1793598348_buy-hero.png',
          },
          {
            id: 'amenity-1-' + timestamp,
            type: 'amenity-1',
            name: 'Amenity Section 1',
            title: 'Key Features & Amenities',
            description: 'Explore the handpicked luxury amenities and lifestyle facilities curated for this address.',
            buttonText: 'See All Listing',
            buttonColor: '#BFA16A',
            selectedAmenities: ['Private Pool', 'Gym & Fitness', 'Concierge Service'],
          },
          {
            id: 'trending-projects-' + timestamp,
            type: 'trending-projects',
            name: 'Trending Projects',
            title: 'Trending Projects',
            description: 'Top off-plan projects and newly launched luxury developments in Dubai.',
            selectedProjects: [],
          },
        ],
      },
    };

    setEditorReturnTab('dynamic-pages');
    openPageEditor(newPageItem);
    setActiveSectionTab('basic');
  };

  const openPageEditor = (page: PageItem) => {
    setEditingPage(page);
    setEditingType('pages');
    setActiveSectionTab('basic');

    setPageTitle(page.title || '');
    setPageSlug(page.slug || '');
    setPageMetaTitle(page.meta_title || page.title || '');
    setPageMetaKeywords((page.content?.metaKeywords as string) || '');
    setPageMetaDesc(page.meta_description || '');
    setPageOgImage((page.content?.ogImage as string) || '/buy_hero.png');
    setPageStatus(page.status || 'published');

    // Load custom dynamic page sections if present
    const existingDyn = Array.isArray(page.content?.dynamicSections)
      ? page.content.dynamicSections
      : [];
    if (existingDyn.length > 0) {
      setDynamicSections(existingDyn);
    } else if (Boolean(page.content?.isDynamic)) {
      setDynamicSections([
        {
          id: 'hero-3-' + Date.now().toString().slice(-4),
          type: 'hero-3',
          name: 'Hero Section 3',
          title: page.title || 'Explore Prime Real Estate',
          description: page.meta_description || 'Curated luxury properties and master developments.',
          detailHtml: '<h2>' + (page.title || 'Explore Real Estate') + '</h2><p>' + (page.meta_description || '') + '</p>',
          bgImage: '/1793598348_buy-hero.png',
        },
        {
          id: 'amenity-1-' + Date.now().toString().slice(-4),
          type: 'amenity-1',
          name: 'Amenity Section 1',
          title: 'Key Features & Amenities',
          description: 'Explore the handpicked luxury amenities and lifestyle facilities.',
          buttonText: 'See All Listing',
          buttonColor: '#BFA16A',
          selectedAmenities: [],
        },
        {
          id: 'trending-projects-' + Date.now().toString().slice(-4),
          type: 'trending-projects',
          name: 'Trending Projects',
          title: 'Trending Projects',
          description: 'Top off-plan projects and newly launched luxury developments in Dubai.',
          selectedProjects: [],
        },
      ]);
    } else {
      setDynamicSections([]);
    }

    // Section 1: Hero
    const hero = page.content?.hero || {};
    const hHeading = hero.mainHeading || hero.heading || hero.title || '';
    let h1 = hero.titleLine1;
    let h2 = hero.titleLine2;
    let h3 = hero.titleLine3;

    if (!h1 && !h2 && !h3 && hHeading) {
      const words = hHeading.trim().split(/\s+/).filter(Boolean);
      if (words.length <= 1) {
        h1 = hHeading;
        h2 = '';
        h3 = '';
      } else if (words.length === 2) {
        h1 = words[0];
        h2 = words[1];
        h3 = '';
      } else if (words.length <= 4) {
        h1 = words[0];
        h2 = words.slice(1, -1).join(' ');
        h3 = words[words.length - 1];
      } else {
        h1 = words.slice(0, 2).join(' ');
        h2 = words.slice(2, 4).join(' ');
        h3 = words.slice(4).join(' ');
      }
    }

    h1 = h1 || 'DISCOVER THE';
    h2 = h2 || 'RIGHT PROPERTY';
    h3 = h3 || 'OPPORTUNITY.';

    setHeroHeading(hHeading || [h1, h2, h3].filter(Boolean).join(' '));
    setHeroTagline(hero.tagline || hero.badge || hero.subheading || 'Curated opportunities. Intelligent insights. Aligned with your goals.');
    setHeroTitle1(h1);
    setHeroTitle2(h2);
    setHeroTitle3(h3);
    setHeroSubheading(hero.subheading || hero.tagline || 'Curated opportunities. Intelligent insights. Aligned with your goals.');
    setHeroPrimaryCtaText(hero.primaryCtaText || hero.ctaText || 'Start AI Assessment');
    setHeroPrimaryCtaLink(hero.primaryCtaLink || hero.ctaLink || '/ai-assessment');
    setHeroSecondaryCtaText(hero.secondaryCtaText || 'Browse Opportunities');
    setHeroSecondaryCtaLink(hero.secondaryCtaLink || '/the-valley');
    setHeroBgImage(hero.backgroundImage || hero.coverImage || hero.bgImage || '/buy_hero.png');
    setHeroDetail(hero.detailHtml || `<h2>${h1} <span style="color:#BFA16A">${h2}</span> ${h3}</h2><p>${hero.subheading || hero.tagline || 'Curated opportunities. Intelligent insights. Aligned with your goals.'}</p>`);

    // Section 2: Feature Bar
    const fb = page.content?.featureBar || [];
    if (fb[0]) {
      setF1Title(fb[0].title || 'AI Advisory Engine');
      setF1Desc(fb[0].description || 'Personalized recommendations based on your goals.');
      setF1Icon(fb[0].icon || '/ai.png');
    }
    if (fb[1]) {
      setF2Title(fb[1].title || 'FS Advisory Scores');
      setF2Desc(fb[1].description || 'Proprietary rating across 10+ key factors.');
      setF2Icon(fb[1].icon || '/fs score.png');
    }
    if (fb[2]) {
      setF3Title(fb[2].title || 'Curated Opportunities');
      setF3Desc(fb[2].description || 'Only opportunities that meet our advisory standards.');
      setF3Icon(fb[2].icon || '/curated oppo.png');
    }
    if (fb[3]) {
      setF4Title(fb[3].title || 'Expert Guidance');
      setF4Desc(fb[3].description || 'Human expertise at every step of your journey.');
      setF4Icon(fb[3].icon || '/exp guidance.png');
    }
    setFeaturesDetail(page.content?.featureBarDetail || '<h3>Advisory &amp; Feature Bar</h3><p>Proprietary algorithms and seasoned real estate advisors deliver tailored opportunities.</p>');
    setFeaturesBgImage(page.content?.featureBarBgImage || '/dubai hills.png');

    // Section 3: Recommended Opportunities
    const opp = page.content?.opportunities || {};
    const oTitle1 = opp.titleLine1 || 'Opportunities We';
    const oTitle2 = opp.titleLine2 || 'Currently Recommend';
    setOppTitleLine1(oTitle1);
    setOppTitleLine2(oTitle2);
    setOppTitle(opp.title || opp.heading || `${oTitle1} ${oTitle2}`.trim());
    setOppTagline(opp.tagline || opp.badge || 'FEATURED INVESTMENTS');
    setOppContentText(opp.description || opp.contentText || 'Hand-picked, high-yield developments across prime UAE communities.');
    setOppViewAllLink(opp.viewAllLink || '/project-main-page');
    if (Array.isArray(opp.cards) && opp.cards.length > 0) {
      setOppCards(opp.cards);
    }
    setOppBgImage(opp.backgroundImage || '/grandpolo_club.png');

    // Section 4: Explore Community
    const comm = page.content?.community || {};
    setCommHeading(comm.heading || 'Explore by Community');
    setCommTagline(comm.tagline || comm.badge || 'FEATURED DISTRICTS');
    setCommContentText(comm.description || comm.contentText || 'Discover master-planned developments and luxury waterfront neighborhoods.');
    if (Array.isArray(comm.items) && comm.items.length > 0) {
      setCommList(comm.items);
    }
    setCommBgImage(comm.backgroundImage || '/dubai_hills.png');

    // Section: Long Content Guide
    const lc = page.content?.longContent || page.content?.offPlanGuide || {};
    if (lc.detailHtml) setLongContentDetail(lc.detailHtml);
    if (lc.backgroundImage) setLongContentBgImage(lc.backgroundImage);

    // Section 5: Reviews
    const rev = page.content?.reviews || {};
    setReviewsHeading(rev.heading || 'What Our Clients Say');
    setReviewsTagline(rev.tagline || 'FROM CLIENT TESTIMONIALS');
    setReviewsIntroText(rev.introText || 'Verified experiences from global investors and residents who achieved their real estate goals with FS Advisory.');
    if (Array.isArray(rev.items) && rev.items.length > 0) {
      setReviewsList(rev.items);
    }
    setReviewsDetail(rev.detailHtml || `<h2>What Our <span style="color:#BFA16A">Clients Say</span></h2><p>Verified experiences from global investors and residents.</p>`);
    setReviewsBgImage(rev.backgroundImage || '/thevalley.png');

    // Section 6: FAQs
    const fq = page.content?.faqs || {};
    setFaqsHeading(fq.heading || 'Frequently Asked Questions');
    setFaqsTagline(fq.tagline || 'UAE off-plan property · Buyer guide');
    setFaqsMainHeading(fq.mainHeading || 'Everything you need to know about UAE off-plan property');
    setFaqsContentText(fq.contentText || 'Answers To The Questions We Hear Most From People Exploring An Off-Plan Purchase In The UAE — From How The Process Works To Ownership, Payment Plans, And What To Check Before You Commit.');
    if (Array.isArray(fq.items) && fq.items.length > 0) {
      setFaqsList(fq.items);
    }
    setFaqsDetail(fq.detailHtml || '');
    setFaqsBgImage(fq.backgroundImage || '/buy_hero.png');

    // Section 7: Assessment (For AI Assessment page)
    const assess = page.content?.assessment || {};
    setAssessmentHeading(assess.heading || 'What is your primary goal?');
    setAssessmentTagline(assess.tagline || 'AI ENGINE ASSESSMENT');
    setAssessmentSubheading(assess.subheading || 'This helps us tailor recommendations to what matters most to you.');
    setAssessmentDetail(assess.detailHtml || `<h2>What is your <span style="color:#BFA16A">primary goal?</span></h2><p>This helps us tailor recommendations to what matters most to you.</p>`);
    setAssessmentBgImage(assess.backgroundImage || '/ai_engine_hero.jpg');
    if (Array.isArray(assess.goals) && assess.goals.length > 0) {
      setAssessmentGoals(assess.goals);
    }

    // Load any custom section entries saved on this page
    const customSecs: any =
      page.content?.customSections && typeof page.content.customSections === 'object'
        ? { ...page.content.customSections }
        : {};

    // Auto-initialize guide sections (dev-guide, comm-guide, proj-main-guide, etc.) if empty or placeholder
    const pageSecs = getPageSections(page.slug);
    pageSecs.forEach((s) => {
      if (s.id === 'proj-main-guide') {
        const existing = customSecs[s.id]?.detailHtml;
        if (!existing || !existing.trim()) {
          customSecs[s.id] = {
            ...(customSecs[s.id] || {}),
            detailHtml: DEFAULT_PROJECT_MAIN_GUIDE_HTML,
          };
        }
      } else if (s.id === 'dev-guide' || s.id.endsWith('-guide')) {
        const existing = customSecs[s.id]?.detailHtml;
        const isStub =
          !existing ||
          !existing.trim() ||
          existing.includes('Strategic buyer roadmap') ||
          existing.includes('Understanding builder delivery') ||
          existing.includes('Educational framework') ||
          existing.includes('Strategic investment roadmap') ||
          (existing.length < 150 && existing.includes('Guide') && !existing.includes('Why Buy Off-Plan') && !existing.includes('Types of off-plan property'));
        if (isStub) {
          customSecs[s.id] = {
            ...(customSecs[s.id] || {}),
            detailHtml: DEFAULT_OFFPLAN_GUIDE_HTML,
          };
        }
      }
    });

    // Auto-populate default buy-detail section values if opening 'buy-detail' or 'property-detail' directly
    if (page.slug === 'buy-detail' || page.slug === 'property-detail') {
      const defProp = DEFAULT_PROPERTIES[0];
      if (!customSecs['buy-detail-hero']) {
        customSecs['buy-detail-hero'] = {
          breadcrumbPath: 'Villas > Jumeirah Islands > Mediterranean Clusters > Cluster 5 > Lake View | Rare to Market | Garden Hall',
          mainImage: defProp.image_url || '/bannerimg.png',
          sideImage1: '/property-card.png',
          sideImage2: '/banner_img.png',
          images: [
            defProp.image_url || '/bannerimg.png',
            '/property-card.png',
            '/banner_img.png',
          ],
          photoCount: '20',
          verifiedBadge: true,
          superAgentBadge: true,
        };
      }
      if (!customSecs['buy-detail-overview']) {
        customSecs['buy-detail-overview'] = {
          title: defProp.title,
          price: defProp.price,
          monthlyEstimate: 'Own from AED 89,073 / month',
          upfrontCostsLabel: 'Upfront costs',
          propertyType: defProp.type,
          furnishing: 'Unfurnished',
          bedrooms: String(defProp.bedrooms),
          bathrooms: String(defProp.bathrooms),
          areaSqft: '10,643 sq ft',
          status: defProp.status,
          mapJumpText: 'Map',
        };
      }
      if (!customSecs['buy-detail-description']) {
        customSecs['buy-detail-description'] = {
          eyebrow: 'Villa for sale in Cluster 50, Mediterranean Clusters',
          heading: defProp.title,
          availableFrom: 'Available from 28 Sep 2026',
          paragraphs: [
            'FS Real Estate is excited to bring to market this stunning Mediterranean Garden Hall. The villa benefits from being a short walk away from the Pavilion and Clubhouse in Jumeirah Islands, as well as having nice scenic views across the lake.',
            'The property has a plot of 10,643 sqft and BUA of 5,285 sqft, offering the buyer a lot of potential for an extension and renovation. Internally, the villa sits with all 4 bedrooms upstairs and spacious living areas downstairs.',
          ],
          bullets: [
            'Garden Hall',
            'Mediterranean',
            '4 Bedrooms + Maids',
            'BUA 5,285 sqft',
            'Plot 10,643 sqft',
            '2 Garage spaces',
            'Elevated Plot',
            'Rented until Sept 2026 (no notice served)',
            'Please call Agent today for more information or to arrange a viewing.',
          ],
        };
      }
      if (!customSecs['buy-detail-amenities']) {
        customSecs['buy-detail-amenities'] = {
          title: 'Amenities',
          items: [
            'Unfurnished',
            'Central A/C',
            'Built in Wardrobes',
            'Kitchen Appliances',
            'Security',
            'Barbecue Area',
            'Private Pool',
            'Walk-in Closet',
            'Private Garden',
          ],
        };
      }
      if (!customSecs['buy-detail-trends']) {
        customSecs['buy-detail-trends'] = {
          similarSubtitle: '4 Beds Villa in Cluster 50',
          soldTransactions: [
            { date: '17 Sep 2026', price: '26,650,000', area: '10,699' },
            { date: '10 Mar 2026', price: '13,200,000', area: '9,631' },
            { date: '6 Jun 2022', price: '11,250,000', area: '11,069' },
          ],
          rentedTransactions: [
            { date: '19 Dec 2026', price: '1,300,000', area: '10,646' },
            { date: '9 May 2026', price: '700,000', area: '8,353' },
            { date: '29 Dec 2023', price: '630,000', area: '10,829' },
          ],
          priceVsAverageBadge: '6% Lower',
          priceThisProperty: 'AED 24,750,000',
          priceAverageProperty: 'AED 26,236,304',
          sizeVsAverageBadge: '33% Larger',
          sizeThisProperty: '10,643 sq ft',
          sizeAverageProperty: '8,026 sq ft',
          adBannerImage: '/banner_img.png',
          adBannerTitle: "Invest in Dubai's next landmark by Binghatti",
          adBannerSubtitle: 'Studios to 5 BR apartments | From AED 1.1M',
          adBannerCtaText: 'Enquire now',
        };
      }
      if (!customSecs['buy-detail-location']) {
        customSecs['buy-detail-location'] = {
          title: 'Location',
          addressTitle: 'Cluster 50, Mediterranean Clusters,',
          addressSubtitle: 'Jumeirah Islands, Dubai',
          latitude: '25.31528411624274',
          longitude: '55.322673566004696',
          mapUrl: 'https://www.google.com/maps/search/?api=1&query=25.31528411624274,55.322673566004696',
        };
      }
      if (!customSecs['buy-detail-building']) {
        customSecs['buy-detail-building'] = {
          buildingTitle: 'About Cluster 50',
          communityTitle: 'About Mediterranean Clusters',
          summary: 'Summary: Cluster 50 is a residential sub-community in Mediterranean Clusters, Jumeirah Islands, offering luxury family living, landscaped parks, and seamless connectivity across Dubai.',
          propertiesListed: '4',
          priceRange: 'AED 21.9M - 43.9M',
          overallRating: '5.0',
          scores: [
            { label: 'Connectivity & Traffic', score: '5.0', pct: 100 },
            { label: 'Peace & Quiet', score: '5.0', pct: 100 },
            { label: 'Family Friendly', score: '5.0', pct: 100 },
            { label: 'Maintenance', score: '5.0', pct: 100 },
            { label: 'Parking Area', score: '5.0', pct: 100 },
            { label: 'Amenities', score: '5.0', pct: 100 },
          ],
        };
      }
      if (!customSecs['buy-detail-sidebar']) {
        customSecs['buy-detail-sidebar'] = {
          contactHeading: 'Register Your Interest For R. Hills',
          contactWhatsappText: 'Register Your Interest Now',
          brochureTitle: 'R. Hills Brochure',
          brochureSubtitle: 'Know More About This Project',
          brochureImage: '/r.hill-brochure.png',
          brochureButtonText: 'Download Brochure',
          agentsHeading: 'Explore Top Agents In R. Hills',
          agentsSubheading: 'Connect With An Experienced Agent',
          projectCardTitle: 'R. Hills',
          projectCardLocation: 'Dubai',
          projectCardDeveloper: 'Reportage Properties',
          projectCardStatus: 'Under Construction',
          projectCardHandover: 'Q4 2028',
          projectCardLaunchPrice: 'AED 2.59M',
        };
      }
      if (!customSecs['buy-detail-mortgage']) {
        customSecs['buy-detail-mortgage'] = {
          heading: 'Mortgage Calculator',
          defaultPrice: 24750000,
          defaultDownPaymentPct: 20,
          defaultLoanPeriodYears: 25,
          defaultInterestRate: 3.75,
          formHeading: 'Need a Mortgage? Get Pre-Approved Easily',
          formSubheading: 'Fill In Your Details, And Our Mortgage Specialists Will Help You Secure The Best Financing Options.',
        };
      }
      if (
        !customSecs['buy-detail-recommended'] ||
        customSecs['buy-detail-recommended']?.items?.[0]?.title?.includes('Renovated Entertainment Foyer')
      ) {
        customSecs['buy-detail-recommended'] = {
          heading: 'Recommended for you',
          items: [
            {
              id: 'golf-fields',
              badge: 'OFF-PLAN',
              type: 'Off-Plan Project',
              location: 'EMAAR SOUTH, DUBAI',
              tagline: 'EMAAR SOUTH, DUBAI',
              title: 'Golf Fields by Emaar',
              price: 'AED 100,000',
              imageUrl: '/similar-golf-fields.png',
              href: '/project-detail',
            },
            {
              id: 'terra-heights',
              badge: 'OFF-PLAN',
              type: 'Off-Plan Project',
              location: 'EMAAR SOUTH, DUBAI',
              tagline: 'EMAAR SOUTH, DUBAI',
              title: 'Terra Heights by Emaar at Emaar South',
              price: 'On Request',
              imageUrl: '/similar-terra-heights.png',
              href: '/project-detail',
            },
            {
              id: 'greenville-2',
              badge: 'OFF-PLAN',
              type: 'Off-Plan Project',
              location: 'EMAAR SOUTH, DUBAI',
              tagline: 'EMAAR SOUTH, DUBAI',
              title: 'Greenville 2 at Emaar South, Dubai',
              price: 'On Request',
              imageUrl: '/similar-greenville.png',
              href: '/project-detail',
            },
            {
              id: 'golf-edge',
              badge: 'NEW LAUNCH',
              type: 'Off-Plan Project',
              location: 'EMAAR SOUTH, DUBAI',
              tagline: 'EMAAR SOUTH, DUBAI',
              title: 'Golf Edge at Emaar South, Dubai',
              price: 'On Request',
              imageUrl: '/similar-golf-edge.png',
              href: '/project-detail',
            },
          ],
        };
      }
    }

    // Auto-populate default developers main page sections if opening 'developers'
    if (page.slug === 'developers') {
      if (!customSecs['dev-hero'] || (!customSecs['dev-hero'].contentText && !customSecs['dev-hero'].bgImage)) {
        customSecs['dev-hero'] = {
          title: customSecs['dev-hero']?.title || 'ALL DEVELOPERS',
          tagline: customSecs['dev-hero']?.tagline || 'Developer / Dubai creek harbour',
          contentText:
            customSecs['dev-hero']?.contentText ||
            'A modern waterfront district with open skyline views, connected promenades and a growing collection of homes.',
          bgImage: customSecs['dev-hero']?.bgImage || '/developer-hero.png',
        };
      }
      if (!customSecs['dev-intro'] || !customSecs['dev-intro'].contentText) {
        customSecs['dev-intro'] = {
          title: customSecs['dev-intro']?.title || 'ALL DEVELOPERS',
          tagline: customSecs['dev-intro']?.tagline || '566 Developers',
          contentText:
            customSecs['dev-intro']?.contentText ||
            'Dubai Creek Harbour combines a relaxed waterfront lifestyle with a contemporary residential skyline, creating a setting that feels both modern and connected. Its walkable promenades, open waterfront views, landscaped spaces, and proximity to Downtown Dubai make the community appealing to both end users and investors. As the area continues to develop, the experience of living or investing can vary significantly from one building to another. Factors such as building position, view corridor, orientation, surrounding amenities, accessibility, and expected handover timing should therefore be carefully considered. Understanding the wider development plans and upcoming infrastructure is equally important, as these can influence both day-to-day convenience and long-term value. Comparing projects within the community helps identify not just the most attractive home, but the location and investment opportunity that best match your priorities.',
        };
      }
      const defaultGridText =
        '245 developers with live off-plan inventory, photographed by their own launches and measured from the VILA database.\n\nDeciding between two names? Compare developers side by side: Emaar vs Sobha Realty, Emaar vs Damac, Sobha Realty vs Binghatti and more, with live project counts, entry prices, down payments and handover years from the register.';
      if (!customSecs['dev-grid'] || !Array.isArray(customSecs['dev-grid'].items) || customSecs['dev-grid'].items.length === 0) {
        customSecs['dev-grid'] = {
          title: 'Directory Grid',
          items: developerCards,
          contentText: customSecs['dev-grid']?.contentText || defaultGridText,
        };
      } else if (!customSecs['dev-grid'].contentText) {
        customSecs['dev-grid'] = {
          ...customSecs['dev-grid'],
          contentText: defaultGridText,
        };
      }
    }

    // Auto-populate default blog main page sections if opening 'blog'
    if (page.slug === 'blog') {
      if (!customSecs['blog-hero'] || (!customSecs['blog-hero'].description && !customSecs['blog-hero'].bgImage)) {
        customSecs['blog-hero'] = {
          titleLine1: customSecs['blog-hero']?.titleLine1 || 'REAL ESTATE',
          titleLine2: customSecs['blog-hero']?.titleLine2 || 'NEWS & INSIGHTS',
          breadcrumbHome: customSecs['blog-hero']?.breadcrumbHome || 'Home',
          breadcrumbCurrent: customSecs['blog-hero']?.breadcrumbCurrent || 'Blogs',
          description:
            customSecs['blog-hero']?.description ||
            customSecs['blog-hero']?.contentText ||
            "Expert insights, market analysis, and the latest updates on Dubai's thriving real estate market",
          searchPlaceholder:
            customSecs['blog-hero']?.searchPlaceholder ||
            'Looking for Something Specific?',
          bgImage: customSecs['blog-hero']?.bgImage || '/blog-hero.png',
        };
      }

      if (!customSecs['blog-where-to-live'] || !Array.isArray(customSecs['blog-where-to-live'].cities)) {
        customSecs['blog-where-to-live'] = {
          tagline: customSecs['blog-where-to-live']?.tagline || 'City guides',
          title: customSecs['blog-where-to-live']?.title || 'Where to Live',
          description: customSecs['blog-where-to-live']?.description || 'Explore the best areas to live across the UAE, with in-depth guides to help you find your perfect home.',
          cities: [
            { id: '1', cityName: 'Sharjah', areasCount: '27 areas', imageSrc: '/sharjah.png' },
            { id: '2', cityName: 'Abu Dhabi', areasCount: '18 areas', imageSrc: '/abudabi.png' },
            { id: '3', cityName: 'Furjairah', areasCount: '22 areas', imageSrc: '/furjairah.png' },
            { id: '4', cityName: 'Dubai', areasCount: '27 areas', imageSrc: '/dubai.png' },
          ]
        };
      }
    }

    setCustomSectionsData(customSecs);
  };

  // Open Full-Page Editor for Off-Plan Project Launch (with all 10 project-detail sections)
  const openProjectEditor = (item: OffPlanItem) => {
    const pSlug =
      item.slug ||
      item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const existingPage =
      pages.find((p) => p.slug === pSlug || p.slug === `project-${pSlug}`) || null;

    const defaultHero = {
      eyebrow: 'LIMITED AVAILABILITY',
      titleLine1: item.title.toUpperCase(),
      titleLine2: `BY ${(item.developer || 'DEVELOPER').toUpperCase()}`,
      subheading: `${item.title} is a premier off-plan development by ${item.developer || 'renowned developers'}, offering refined residences in ${item.location || 'Dubai'}.`,
      ctaText: 'CHECK AVAILABILITY',
      backgroundImage: item.imageUrl || '/project-detail-hero.png',
    };

    const defaultOverview = {
      title: 'Project Overview & Key Metrics',
      tagline: 'OVERVIEW',
      startingPrice: item.starting_price || 'AED 1,250,000',
      developer: item.developer || 'Emaar',
      unitTypes: item.type || '1-3 BR',
      sizeRange: '1,283 – 2,799 sqft',
      handover: item.completion_date || 'Q4-2030',
      paymentPlan: item.payment_plan || 'On Request',
      contentText: `${item.title} presents a curated collection of contemporary residences, harmonizing visionary architecture with exceptional community living in ${item.location || 'Dubai'}.`,
      tableMetrics: {
        developer: item.developer || 'Emaar',
        status: item.status === 'selling' ? 'Off Plan (Selling)' : 'Coming Soon',
        type: item.type || 'Apartments, Townhouses',
        titleType: 'Freehold',
        units: 'Launch Q4 2030',
        completion: item.completion_date || 'Q4 2030',
        progress: '0%',
        paymentPlan: item.payment_plan || 'On Request',
      },
    };

    const defaultFloorplans = {
      title: `${item.title} Floor Plan`,
      tagline: 'RESIDENTIAL CONFIGURATIONS',
      description: `${item.title} is a modern residential development featuring thoughtfully designed residences with high-end finishes, private balconies and spacious layouts.`,
      contentText: `${item.title} is a modern residential development featuring thoughtfully designed residences with high-end finishes, private balconies and spacious layouts.`,
      items: [
        {
          id: '1',
          bedrooms: '1',
          bed: '1',
          title: '1 Bedroom Apartment',
          totalArea: '785 sq.ft',
          bathrooms: '1.5',
          propertyType: item.type?.includes('Villa') ? 'Villa' : item.type?.includes('Townhouse') ? 'Townhouse' : 'Apartment',
          startingPrice: item.starting_price || 'AED 1,250,000',
          minSize: '785',
          maxSize: '950',
          description: `Experience the 1 Bedroom residence at ${item.title}, designed with modern finishes and open layouts.`,
          image: '',
        },
        {
          id: '2',
          bedrooms: '2',
          bed: '2',
          title: '2 Bedroom Luxury Suite',
          totalArea: '1,320 sq.ft',
          bathrooms: '2.5',
          propertyType: item.type?.includes('Villa') ? 'Villa' : item.type?.includes('Townhouse') ? 'Townhouse' : 'Apartment',
          startingPrice: 'AED 2,150,000',
          minSize: '1,320',
          maxSize: '1,550',
          description: `Experience the 2 Bedroom residence at ${item.title}, featuring panoramic views and expansive terraces.`,
          image: '',
        },
        {
          id: '3',
          bedrooms: '3',
          bed: '3',
          title: '3 Bedroom Signature Residence',
          totalArea: '1,850 sq.ft',
          bathrooms: '3.5',
          propertyType: item.type?.includes('Villa') ? 'Villa' : item.type?.includes('Townhouse') ? 'Townhouse' : 'Apartment',
          startingPrice: 'AED 2,980,000',
          minSize: '1,850',
          maxSize: '2,400',
          description: `Experience the 3 Bedroom residence at ${item.title}, designed with expansive family spaces and en-suite bedrooms.`,
          image: '',
        },
      ],
    };

    const defaultAmenities = [
      'Children Play Area',
      'Schools',
      'Restaurants',
      'Shopping Mall',
      'Walking Trails',
      'Sports Facilities',
      'Gym',
      'Parking Area',
      '24X7 Security',
      'Golf Course',
    ];

    const defaultVideo = {
      title: 'Experience Project in Motion',
      tagline: 'VIDEO SHOWCASE',
      contentText: `Explore the architectural elegance, expansive green fairways, and resort-grade amenities of ${item.title} through an exclusive video showcase.`,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      bgImage: item.imageUrl || '/project-detail-hero.png',
      hideSection: false,
    };

    const defaultGallery = {
      title: 'View Project Gallery',
      tagline: 'PHOTO SHOWCASE',
      description: `Explore the project gallery of ${item.title} by ${item.developer || 'Master Developers'}, showcasing luxury homes, elegant interiors, and world-class amenities that reflect modern design, comfort, and an upscale lifestyle.`,
      contentText: `Explore the project gallery of ${item.title} by ${item.developer || 'Master Developers'}, showcasing luxury homes, elegant interiors, and world-class amenities that reflect modern design, comfort, and an upscale lifestyle.`,
      items: [
        item.imageUrl || '/project-detail-hero.png',
        '/gallery-bedroom.png',
        '/image-277.png',
        '/gallery1.png',
        '/gallery2.png',
        '/gallery-exterior.png',
        '/emaar_lagoon_community.jpg',
        '/property_detail_main.jpg',
      ],
      images: [
        item.imageUrl || '/project-detail-hero.png',
        '/gallery-bedroom.png',
        '/image-277.png',
        '/gallery1.png',
        '/gallery2.png',
        '/gallery-exterior.png',
        '/emaar_lagoon_community.jpg',
        '/property_detail_main.jpg',
      ],
      interiorImages: [
        '/gallery-bedroom.png',
        '/image-277.png',
        '/gallery1.png',
        '/gallery2.png',
      ],
      exteriorImages: [
        '/gallery-exterior.png',
        '/emaar_lagoon_community.jpg',
        '/property_detail_main.jpg',
      ],
      lifestyleImages: [
        item.imageUrl || '/project-detail-hero.png',
      ],
    };

    const defaultLocation = {
      title: 'Location & Surroundings',
      tagline: 'ON THE MAP',
      contentText: `Prime positioning in ${item.location || 'Dubai'} with effortless connectivity to international transit corridors and business hubs.`,
      latitude: '25.31528411624274',
      longitude: '55.322673566004696',
      bgImage: '/map.png',
      locationUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((item.location || 'Dubai') + ' UAE')}`,
    };

    const defaultFaqs = [
      {
        q: `Is ${item.title} a freehold property for international buyers?`,
        a: `Yes, ${item.title} is 100% freehold. Both UAE nationals and international foreign investors can own properties here with complete ownership rights and title deeds issued directly by the Dubai Land Department (DLD).`,
      },
      {
        q: 'What is the scheduled handover date and current progress?',
        a: `Handover is scheduled for ${item.completion_date || 'Q4 2030'}. Construction milestones and escrow account funds are rigorously audited and monitored under Dubai Land Department regulations (RERA).`,
      },
      {
        q: 'What are the available payment plan options?',
        a: `Developer offers convenient construction-linked payment plans (${item.payment_plan || 'On Request'}), as well as investor-specific post-handover options.`,
      },
      {
        q: 'Are properties eligible for the UAE Golden Visa?',
        a: 'Yes! Properties with an acquisition value of AED 2,000,000 or above qualify buyers and their immediate family members for the 10-Year Renewable UAE Golden Visa.',
      },
    ];

    const customSecs = {
      'proj-hero': defaultHero,
      'proj-overview': defaultOverview,
      'proj-floorplans': defaultFloorplans,
      'proj-amenities': {
        title: 'Amenities & Facilities',
        tagline: 'LIFESTYLE',
        items: defaultAmenities,
      },
      'proj-video': defaultVideo,
      'proj-gallery': defaultGallery,
      'proj-location': defaultLocation,
      'proj-guide': {
        title: 'Off-Plan Investment Guide',
        tagline: 'Strategic buyer roadmap',
        detailHtml: DEFAULT_OFFPLAN_GUIDE_HTML,
      },
      'proj-faqs': {
        title: 'Frequently Asked Questions',
        tagline: 'PROJECT FAQ',
        items: defaultFaqs,
      },
      'proj-similar': {
        title: 'Similar Projects You May Like',
        tagline: 'RECOMMENDED ALTERNATIVES',
        items: [],
      },
      ...(existingPage?.content?.customSections || item.content?.customSections || {}),
    };

    const projectPageItem: PageItem = {
      id: existingPage?.id || item.id,
      title: item.title,
      slug: pSlug,
      meta_title:
        existingPage?.meta_title ||
        `${item.title} by ${item.developer} | Project Details | FS Advisory`,
      meta_description:
        existingPage?.meta_description ||
        `${item.title} in ${item.location || 'Dubai'}. Starting price ${item.starting_price}. Explore payment plans, layouts and amenities.`,
      status: item.status === 'selling' ? 'published' : 'draft',
      content: {
        hero: existingPage?.content?.hero || item.content?.hero || defaultHero,
        customSections: customSecs,
        projectMeta: {
          offplanId: item.id,
          developer: item.developer,
          starting_price: item.starting_price,
          location: item.location,
          completion_date: item.completion_date,
          payment_plan: item.payment_plan,
          status: item.status,
          type: item.type,
          imageUrl: item.imageUrl,
        },
      },
    };

    setEditorReturnTab('offplans');
    openPageEditor(projectPageItem);
    setActiveSectionTab('proj-hero');
  };

  // Open Full-Page Editor for Property Listing (with all 10 buy-detail sections)
  const openPropertyEditor = (item: PropertyItem) => {
    const pSlug =
      item.slug ||
      item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const existingPage =
      pages.find((p) => p.slug === pSlug || p.slug === `property-${pSlug}`) || null;

    const numericPrice = Number((item.price || '24750000').replace(/[^0-9.]/g, '')) || 24750000;
    const monthlyEstimate = `AED ${Math.round((numericPrice * 0.8 * 0.045) / 12).toLocaleString('en-US')} / month`;
    const locationParts = (item.location || 'Cluster 50, Mediterranean Clusters, Jumeirah Islands, Dubai').split(',').map((s) => s.trim());
    const clusterName = locationParts[0] || 'Cluster 50';
    const communityName = locationParts[1] || locationParts[0] || 'Mediterranean Clusters';

    const defaultHero = {
      breadcrumbPath: `Villas > ${locationParts.slice(0, 3).join(' > ')} > ${item.title}`,
      mainImage: (!item.image_url || item.image_url === '/buy-details-hero1.png') ? '/bannerimg.png' : item.image_url,
      sideImage1: '/property-card.png',
      sideImage2: '/banner_img.png',
      images: [
        (!item.image_url || item.image_url === '/buy-details-hero1.png') ? '/bannerimg.png' : item.image_url,
        '/property-card.png',
        '/banner_img.png',
      ],
      photoCount: '20',
      verifiedBadge: true,
      superAgentBadge: true,
    };

    const defaultOverview = {
      title: item.title,
      price: item.price || 'AED 24,750,000',
      monthlyEstimate: `Own from ${monthlyEstimate}`,
      upfrontCostsLabel: 'Upfront costs',
      propertyType: item.type || 'Villa',
      furnishing: 'Unfurnished',
      bedrooms: String(item.bedrooms ?? 4),
      bathrooms: String(item.bathrooms ?? 5),
      areaSqft: `${Number(item.area_sqft || 10643).toLocaleString('en-US')} sq ft`,
      status: item.status || 'available',
      mapJumpText: 'Map',
    };

    const defaultDescription = {
      eyebrow: `${item.type || 'Villa'} for sale in ${item.location || 'Cluster 50, Mediterranean Clusters'}`,
      heading: item.title,
      availableFrom: 'Available from 28 Sep 2026',
      paragraphs: [
        `FS Real Estate is excited to bring to market this stunning ${item.title}. The property benefits from prime positioning in ${item.location || 'Jumeirah Islands, Dubai'}, offering scenic views and refined living.`,
        `The residence spans ${Number(item.area_sqft || 10643).toLocaleString('en-US')} sqft with ${item.bedrooms ?? 4} bedrooms and ${item.bathrooms ?? 5} bathrooms, offering exceptional family living and strong investment potential.`,
      ],
      bullets: [
        'Garden Hall',
        'Mediterranean',
        `${item.bedrooms ?? 4} Bedrooms + Maids`,
        `BUA 5,285 sqft`,
        `Plot ${Number(item.area_sqft || 10643).toLocaleString('en-US')} sqft`,
        '2 Garage spaces',
        'Elevated Plot',
        'Rented until Sept 2026 (no notice served)',
        'Please call Agent today for more information or to arrange a viewing.',
      ],
    };

    const defaultAmenities = {
      title: 'Amenities',
      items: [
        'Unfurnished',
        'Central A/C',
        'Built in Wardrobes',
        'Kitchen Appliances',
        'Security',
        'Barbecue Area',
        'Private Pool',
        'Walk-in Closet',
        'Private Garden',
      ],
    };

    const defaultTrends = {
      similarSubtitle: `${item.bedrooms ?? 4} Beds ${item.type || 'Villa'} in ${clusterName}`,
      soldTransactions: [
        { date: '17 Sep 2026', price: '26,650,000', area: '10,699' },
        { date: '10 Mar 2026', price: '13,200,000', area: '9,631' },
        { date: '6 Jun 2022', price: '11,250,000', area: '11,069' },
      ],
      rentedTransactions: [
        { date: '19 Dec 2026', price: '1,300,000', area: '10,646' },
        { date: '9 May 2026', price: '700,000', area: '8,353' },
        { date: '29 Dec 2023', price: '630,000', area: '10,829' },
      ],
      priceVsAverageBadge: '6% Lower',
      priceThisProperty: item.price || 'AED 24,750,000',
      priceAverageProperty: 'AED 26,236,304',
      sizeVsAverageBadge: '33% Larger',
      sizeThisProperty: `${Number(item.area_sqft || 10643).toLocaleString('en-US')} sq ft`,
      sizeAverageProperty: '8,026 sq ft',
      adBannerImage: '/banner_img.png',
      adBannerTitle: "Invest in Dubai's next landmark by Binghatti",
      adBannerSubtitle: 'Studios to 5 BR apartments | From AED 1.1M',
      adBannerCtaText: 'Enquire now',
    };

    const defaultLocation = {
      title: 'Location',
      addressTitle: `${clusterName}, ${communityName},`,
      addressSubtitle: locationParts.slice(2).join(', ') || 'Jumeirah Islands, Dubai',
      latitude: '25.31528411624274',
      longitude: '55.322673566004696',
      mapUrl: `https://www.google.com/maps/search/?api=1&query=25.31528411624274,55.322673566004696`,
    };

    const defaultBuilding = {
      buildingTitle: `About ${clusterName}`,
      communityTitle: `About ${communityName}`,
      summary: `Summary: ${clusterName} is a residential sub-community in ${communityName}, offering luxury family living, landscaped parks, and seamless connectivity across Dubai.`,
      propertiesListed: '4',
      priceRange: 'AED 21.9M - 43.9M',
      overallRating: '5.0',
      scores: [
        { label: 'Connectivity & Traffic', score: '5.0', pct: 100 },
        { label: 'Peace & Quiet', score: '5.0', pct: 100 },
        { label: 'Family Friendly', score: '5.0', pct: 100 },
        { label: 'Maintenance', score: '5.0', pct: 100 },
        { label: 'Parking Area', score: '5.0', pct: 100 },
        { label: 'Amenities', score: '5.0', pct: 100 },
      ],
    };

    const defaultSidebar = {
      contactHeading: 'Register Your Interest For R. Hills',
      contactWhatsappText: 'Register Your Interest Now',
      brochureTitle: 'R. Hills Brochure',
      brochureSubtitle: 'Know More About This Project',
      brochureImage: '/r.hill-brochure.png',
      brochureButtonText: 'Download Brochure',
      agentsHeading: 'Explore Top Agents In R. Hills',
      agentsSubheading: 'Connect With An Experienced Agent',
      projectCardTitle: 'R. Hills',
      projectCardLocation: 'Dubai',
      projectCardDeveloper: 'Reportage Properties',
      projectCardStatus: 'Under Construction',
      projectCardHandover: 'Q4 2028',
      projectCardLaunchPrice: 'AED 2.59M',
    };

    const defaultMortgage = {
      heading: 'Mortgage Calculator',
      defaultPrice: numericPrice,
      defaultDownPaymentPct: 20,
      defaultLoanPeriodYears: 25,
      defaultInterestRate: 3.75,
      formHeading: 'Need a Mortgage? Get Pre-Approved Easily',
      formSubheading: 'Fill In Your Details, And Our Mortgage Specialists Will Help You Secure The Best Financing Options.',
    };

    const defaultRecommended = {
      heading: 'Recommended for you',
      items: [
        {
          id: 'golf-fields',
          badge: 'OFF-PLAN',
          type: 'Off-Plan Project',
          location: 'EMAAR SOUTH, DUBAI',
          tagline: 'EMAAR SOUTH, DUBAI',
          title: 'Golf Fields by Emaar',
          price: 'AED 100,000',
          imageUrl: '/similar-golf-fields.png',
          href: '/project-detail',
        },
        {
          id: 'terra-heights',
          badge: 'OFF-PLAN',
          type: 'Off-Plan Project',
          location: 'EMAAR SOUTH, DUBAI',
          tagline: 'EMAAR SOUTH, DUBAI',
          title: 'Terra Heights by Emaar at Emaar South',
          price: 'On Request',
          imageUrl: '/similar-terra-heights.png',
          href: '/project-detail',
        },
        {
          id: 'greenville-2',
          badge: 'OFF-PLAN',
          type: 'Off-Plan Project',
          location: 'EMAAR SOUTH, DUBAI',
          tagline: 'EMAAR SOUTH, DUBAI',
          title: 'Greenville 2 at Emaar South, Dubai',
          price: 'On Request',
          imageUrl: '/similar-greenville.png',
          href: '/project-detail',
        },
        {
          id: 'golf-edge',
          badge: 'NEW LAUNCH',
          type: 'Off-Plan Project',
          location: 'EMAAR SOUTH, DUBAI',
          tagline: 'EMAAR SOUTH, DUBAI',
          title: 'Golf Edge at Emaar South, Dubai',
          price: 'On Request',
          imageUrl: '/similar-golf-edge.png',
          href: '/project-detail',
        },
      ],
    };

    const rawSavedSecs = existingPage?.content?.customSections || item.content?.customSections || {};
    if (rawSavedSecs['buy-detail-recommended']?.items?.[0]?.title?.includes('Renovated Entertainment Foyer')) {
      rawSavedSecs['buy-detail-recommended'] = defaultRecommended;
    }

    const customSecs = {
      'buy-detail-hero': defaultHero,
      'buy-detail-overview': defaultOverview,
      'buy-detail-description': defaultDescription,
      'buy-detail-amenities': defaultAmenities,
      'buy-detail-trends': defaultTrends,
      'buy-detail-location': defaultLocation,
      'buy-detail-building': defaultBuilding,
      'buy-detail-sidebar': defaultSidebar,
      'buy-detail-mortgage': defaultMortgage,
      'buy-detail-recommended': defaultRecommended,
      ...rawSavedSecs,
    };

    const propertyPageItem: PageItem = {
      id: existingPage?.id || item.id,
      title: item.title,
      slug: pSlug,
      meta_title:
        existingPage?.meta_title ||
        `${item.title} | Buy Details | FS Real Estate Advisory`,
      meta_description:
        existingPage?.meta_description ||
        `${item.title} in ${item.location || 'Dubai'}. Price ${item.price}. ${item.bedrooms} Bedrooms, ${item.bathrooms} Bathrooms, ${item.area_sqft} sq ft.`,
      status: item.status === 'available' ? 'published' : 'draft',
      content: {
        hero: existingPage?.content?.hero || item.content?.hero || defaultHero,
        customSections: customSecs,
        propertyMeta: {
          propertyId: item.id,
          title: item.title,
          slug: pSlug,
          type: item.type,
          price: item.price,
          location: item.location,
          bedrooms: item.bedrooms,
          bathrooms: item.bathrooms,
          area_sqft: item.area_sqft,
          status: item.status,
          image_url: item.image_url,
        },
      },
    };

    setEditorReturnTab('properties');
    openPageEditor(propertyPageItem);
    setActiveSectionTab('buy-detail-hero');
  };

  // Open Full-Page Editor for Blog Article (with all blog-details sections)
  const openBlogEditor = (item: BlogCMSItem) => {
    const bSlug =
      item.slug ||
      item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const existingPage =
      pages.find((p) => p.slug === bSlug || p.slug === `blog-${bSlug}`) || null;

    const defaultHero = {
      breadcrumbHome: 'Home',
      breadcrumbCurrent: 'Blogs',
      titleLine1: 'REAL ESTATE',
      titleLine2: 'NEWS & INSIGHTS',
      subheading: "Expert insights, market analysis, and the latest updates on Dubai's thriving real estate market",
      searchPlaceholder: 'Looking for Something Specific?',
      bgImage: '/blog-hero.png',
    };

    const defaultContent = {
      title: item.title,
      category: item.category || 'Real Estate',
      date: item.date || 'August 28, 2026',
      tag: item.tag || 'Featured Guide',
      author: item.author || 'FS Editorial Advisory',
      introParagraph: item.introParagraph,
      secondParagraph: item.secondParagraph,
      bodyParagraphs: item.bodyParagraphs || [],
    };

    const defaultImages = {
      primaryImage: item.imageSrc || '/Rectangle 34625593.png',
      secondaryImage: item.secondImageSrc || '/image 299.png',
    };

    const defaultKeyFigures = {
      developer: item.keyFigures?.developer || 'EMAAR PROPERTIES',
      community: item.keyFigures?.community || 'DUBAI HILLS ESTATE',
      unitTypes: item.keyFigures?.unitTypes || '1, 2 & 3-BEDROOM APARTMENTS',
      unitSizes: item.keyFigures?.unitSizes || '675 SQ. FT – 1,777 SQ. FT',
      startingPrice: item.keyFigures?.startingPrice || 'AED 1.2 – 1.8 MILLION',
      downPayment: item.keyFigures?.downPayment || '10%',
      paymentPlan: item.keyFigures?.paymentPlan || '80/20',
      expectedHandover: item.keyFigures?.expectedHandover || '2029',
    };

    const customSecs = {
      'blog-hero': defaultHero,
      'blog-content': defaultContent,
      'blog-images': defaultImages,
      'blog-keyfigures': defaultKeyFigures,
      'blog-sidebar': {
        categories: [
          { label: 'Coming Soon', count: 6 },
          { label: 'News', count: 61 },
          { label: 'Real Estate', count: 51 },
        ],
      },
      'blog-html': {
        detailHtml: `<p>${item.introParagraph}</p><p>${item.secondParagraph}</p>`,
      },
      ...(existingPage?.content?.customSections || item.content?.customSections || {}),
    };

    const blogPageItem: PageItem = {
      id: existingPage?.id || item.id,
      title: item.title,
      slug: bSlug,
      meta_title: existingPage?.meta_title || `${item.title} | Blog Details | FS Real Estate Advisory`,
      meta_description: existingPage?.meta_description || item.introParagraph,
      status: item.status || 'published',
      content: {
        hero: existingPage?.content?.hero || defaultHero,
        customSections: customSecs,
        blogMeta: {
          blogId: item.id,
          category: item.category,
          date: item.date,
          author: item.author,
          imageSrc: item.imageSrc,
        },
      },
    };

    setEditorReturnTab('blogs');
    openPageEditor(blogPageItem);
    setActiveSectionTab('blog-hero');
  };

  // Open Full-Page Editor for Property/Offplan/Project
  const openItemEditor = (type: string, item: any) => {
    setEditingItem(item);
    setEditingType(type);

    if (type === 'properties') {
      setPropTitle(item.title || '');
      setPropType(item.type || 'Ready Villa');
      setPropPrice(item.price || '');
      setPropLocation(item.location || '');
      setPropBeds(item.bedrooms || 3);
      setPropBaths(item.bathrooms || 3);
      setPropArea(item.area_sqft || 2450);
      setPropStatus(item.status || 'available');
      setPropImage(item.image_url || '/thevalley.png');
      setPropSlug(item.slug || '');
    } else if (type === 'offplans') {
      setOffTitle(item.title);
      setOffDeveloper(item.developer || '');
      setOffPrice(item.starting_price || '');
      setOffLocation(item.location || '');
      setOffCompletion(item.completion_date || '');
    } else if (type === 'projects') {
      setProjTitle(item.title);
      setProjDeveloper(item.developer || '');
      setProjCategory(item.category || '');
      setProjLocation(item.location || '');
    } else if (type === 'communities') {
      setCommName(item.name || '');
      setCommTag(item.tag || 'Waterfront living');
      setCommSlug(item.slug || '');
      setCommIcon(item.icon || '/dubai_hills.png');
      setCommImage(item.image || '/dubai hills.png');
      setCommLocation(item.location || 'Dubai, UAE');
      setCommHref(item.href || '#');
      setCommStatus(item.status || 'Active');
      setCommDesc(item.description || '');
      setCommLongContent(item.longContent || '');
    }
  };

  // Save Page Edits
  const handleSavePageEdits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;

    setSubmitting(true);
    try {
      // Ensure any guide section for this page has proper guide HTML content
      const pageSecs = getPageSections(editingPage.slug);
      const finalizedCustomSections = { ...customSectionsData };
      pageSecs.forEach((s) => {
        if (s.id === 'proj-main-guide') {
          const curr = finalizedCustomSections[s.id]?.detailHtml;
          if (!curr || !curr.trim()) {
            finalizedCustomSections[s.id] = {
              ...(finalizedCustomSections[s.id] || {}),
              detailHtml: DEFAULT_PROJECT_MAIN_GUIDE_HTML,
            };
          }
        } else if (s.id === 'dev-guide' || s.id.endsWith('-guide')) {
          const curr = finalizedCustomSections[s.id]?.detailHtml;
          const isStub =
            !curr ||
            !curr.trim() ||
            curr.includes('Strategic buyer roadmap') ||
            curr.includes('Understanding builder delivery') ||
            curr.includes('Educational framework') ||
            curr.includes('Strategic investment roadmap') ||
            (curr.length < 150 && curr.includes('Guide') && !curr.includes('Why Buy Off-Plan') && !curr.includes('Types of off-plan property'));
          if (isStub) {
            finalizedCustomSections[s.id] = {
              ...(finalizedCustomSections[s.id] || {}),
              detailHtml: DEFAULT_OFFPLAN_GUIDE_HTML,
            };
          }
        }
      });

      const payload = {
        title: pageTitle,
        slug: pageSlug,
        meta_title: pageMetaTitle,
        meta_description: pageMetaDesc,
        status: pageStatus,
        content: {
          ...(editingPage.content || {}),
          metaKeywords: pageMetaKeywords,
          ogImage: pageOgImage,
          hero: {
            heading: heroHeading,
            mainHeading: heroHeading,
            title: heroHeading,
            tagline: heroTagline,
            badge: heroTagline,
            titleLine1: heroTitle1,
            titleLine2: heroTitle2,
            titleLine3: heroTitle3,
            subheading: heroSubheading || heroTagline,
            primaryCtaText: heroPrimaryCtaText,
            primaryCtaLink: heroPrimaryCtaLink,
            secondaryCtaText: heroSecondaryCtaText,
            secondaryCtaLink: heroSecondaryCtaLink,
            backgroundImage: heroBgImage,
            coverImage: heroBgImage,
            bgImage: heroBgImage,
            detailHtml: heroDetail,
          },
          featureBar: [
            { id: 'ai-advisory', title: f1Title, description: f1Desc, icon: f1Icon },
            { id: 'fs-scores', title: f2Title, description: f2Desc, icon: f2Icon },
            { id: 'curated-oppo', title: f3Title, description: f3Desc, icon: f3Icon },
            { id: 'expert-guidance', title: f4Title, description: f4Desc, icon: f4Icon },
          ],
          featureBarDetail: featuresDetail,
          featureBarBgImage: featuresBgImage,
          opportunities: {
            title: oppTitle,
            heading: oppTitle,
            titleLine1: oppTitleLine1,
            titleLine2: oppTitleLine2,
            tagline: oppTagline,
            badge: oppTagline,
            description: oppContentText,
            contentText: oppContentText,
            viewAllLink: oppViewAllLink,
            cards: oppCards,
          },
          community: {
            heading: commHeading,
            tagline: commTagline,
            badge: commTagline,
            description: commContentText,
            contentText: commContentText,
            items: commList,
          },
          longContent: {
            detailHtml: longContentDetail,
            backgroundImage: longContentBgImage,
          },
          offPlanGuide: {
            detailHtml: longContentDetail,
            backgroundImage: longContentBgImage,
          },
          reviews: {
            heading: reviewsHeading,
            tagline: reviewsTagline,
            introText: reviewsIntroText,
            items: reviewsList,
            detailHtml: reviewsDetail,
            backgroundImage: reviewsBgImage,
          },
          faqs: {
            heading: faqsHeading,
            tagline: faqsTagline,
            mainHeading: faqsMainHeading,
            contentText: faqsContentText,
            items: faqsList,
            detailHtml: faqsDetail,
            backgroundImage: faqsBgImage,
          },
          assessment: {
            heading: assessmentHeading,
            tagline: assessmentTagline,
            subheading: assessmentSubheading,
            detailHtml: assessmentDetail,
            backgroundImage: assessmentBgImage,
            goals: assessmentGoals,
          },
          customSections: finalizedCustomSections,
          dynamicSections: dynamicSections,
          ...(Boolean(editingPage.content?.isDynamic || (editingPage as any).isDynamic) ? { isDynamic: true } : {}),
          ...(pageSlug === 'developers' && Array.isArray(finalizedCustomSections['dev-grid']?.items)
            ? { developerCards: finalizedCustomSections['dev-grid'].items }
            : {}),
        },
      };

      // Immediately cache in localStorage for real-time frontend hydration across tabs
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(`fs_page_${payload.slug}`, JSON.stringify(payload));
          if (payload.slug === 'home' || payload.slug === 'homepage') {
            localStorage.setItem('fs_page_home', JSON.stringify(payload));
            localStorage.setItem('fs_hero_home', JSON.stringify(payload.content.hero));
          }
          if (payload.slug === 'developers' && Array.isArray(finalizedCustomSections['dev-grid']?.items)) {
            localStorage.setItem('fs_developers_list', JSON.stringify(finalizedCustomSections['dev-grid'].items));
          }
        }
      } catch (_) {}

      // Also sync saved page to frontend port 3000 store
      fetch(getSyncBaseUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pages: { [payload.slug]: payload },
          ...(payload.slug === 'developers' && Array.isArray(finalizedCustomSections['dev-grid']?.items)
            ? { developerCards: finalizedCustomSections['dev-grid'].items }
            : {}),
        }),
      }).catch(() => null);

      // Update in-memory pages state immediately
      setPages((prev) =>
        prev.map((p) =>
          p.slug === payload.slug || (editingPage.id && p.id === editingPage.id)
            ? { ...p, ...payload, content: { ...p.content, ...payload.content } }
            : p
        )
      );

      let res: any = null;
      let backendUpdated = false;

      // Try saving to Laravel backend if reachable (swallow network errors if backend is not running)
      try {
        const backendPage = pages.find((p) => (editingPage.id && p.id === editingPage.id) || p.slug === payload.slug);

        if (backendPage && backendPage.id < 90000) {
          res = await fetch(`${API_BASE_URL}/pages/${backendPage.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload),
          }).catch(() => null);
        } else {
          const slugCheckRes = await fetch(`${API_BASE_URL}/pages/${payload.slug}`, {
            headers: { 'Accept': 'application/json' },
          }).catch(() => null);
          const slugCheckData = slugCheckRes?.ok ? await slugCheckRes.json().catch(() => null) : null;

          if (slugCheckData?.success && slugCheckData.data?.id) {
            res = await fetch(`${API_BASE_URL}/pages/${slugCheckData.data.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify(payload),
            }).catch(() => null);
          } else {
            res = await fetch(`${API_BASE_URL}/pages`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify(payload),
            }).catch(() => null);
          }
        }
        if (res && res.ok) {
          backendUpdated = true;
        }
      } catch (_) {
        // Backend offline or unreachable from remote client
      }

      // Also sync community card in communities state so community card matches
      setCommunities((prev) =>
        prev.map((c) => {
          const cSlug = c.slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          if (cSlug === pageSlug || c.name.toLowerCase() === pageTitle.toLowerCase()) {
            return {
              ...c,
              description: pageMetaDesc || c.description,
            };
          }
          return c;
        })
      );

      // Also sync developer card title / description in developerCards state
      setDeveloperCards((prev) =>
        prev.map((d) => {
          const slug = d.slug || d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          if (slug === pageSlug || d.name.toLowerCase() === pageTitle.toLowerCase()) {
            return {
              ...d,
              name: pageTitle || d.name,
              description: pageMetaDesc || d.description,
            };
          }
          return d;
        })
      );

      // Also sync off-plan project record in off_plans state and backend table
      if (editorReturnTab === 'offplans' || isOffPlanPage(editingPage)) {
        const projOverview = finalizedCustomSections['proj-overview'] || {};
        const projHero = finalizedCustomSections['proj-hero'] || {};
        const pSlug = pageSlug || editingPage.slug;

        const updatedItem: OffPlanItem = {
          id: editingPage.id || Date.now(),
          title: pageTitle || editingPage.title,
          slug: pSlug,
          developer: projOverview.developer || 'DAMAC Properties',
          starting_price: projOverview.startingPrice || 'AED 2,490,000',
          location: projOverview.location || 'Dubai',
          completion_date: projOverview.handover || 'Q4 2029',
          payment_plan: projOverview.paymentPlan || '70/30',
          status: 'selling',
          type: projOverview.unitTypes || 'Townhouses & Villas',
          imageUrl: projHero.backgroundImage || projHero.bgImage || '/developers/damac-hawaii.png',
        };

        setOffplans((prev) => {
          const exists = prev.some(
            (o) =>
              (o.slug || o.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) === pSlug ||
              o.title.toLowerCase() === pageTitle.toLowerCase()
          );
          if (exists) {
            return prev.map((o) =>
              (o.slug || o.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) === pSlug ||
              o.title.toLowerCase() === pageTitle.toLowerCase()
                ? { ...o, ...updatedItem }
                : o
            );
          }
          return [updatedItem, ...prev];
        });

        try {
          if (typeof window !== 'undefined') {
            const cached = localStorage.getItem('fs_offplans_list');
            const arr = cached ? JSON.parse(cached) : [];
            const updated = [updatedItem, ...arr.filter((x: any) => x.id !== updatedItem.id && x.title !== updatedItem.title)];
            localStorage.setItem('fs_offplans_list', JSON.stringify(updated));
          }
        } catch (_) {}

        const matchedOffplan = offplans.find(
          (o) =>
            (o.slug || o.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) === pageSlug ||
            o.title.toLowerCase() === pageTitle.toLowerCase()
        );

        if (matchedOffplan && matchedOffplan.id && matchedOffplan.id < 90000) {
          await fetch(`${API_BASE_URL}/off-plans/${matchedOffplan.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              title: pageTitle || matchedOffplan.title,
              developer: projOverview.developer || matchedOffplan.developer,
              starting_price: projOverview.startingPrice || matchedOffplan.starting_price,
              completion_date: projOverview.handover || matchedOffplan.completion_date,
              payment_plan: projOverview.paymentPlan || matchedOffplan.payment_plan,
              image_url: projHero.backgroundImage || projHero.bgImage || matchedOffplan.imageUrl,
            }),
          }).catch(() => null);
        }
      }

      // Also sync property listing record in properties state and backend table
      if (editorReturnTab === 'properties' || isPropertyPage(editingPage)) {
        const propOverview = finalizedCustomSections['buy-detail-overview'] || {};
        const propHero = finalizedCustomSections['buy-detail-hero'] || {};
        const propLoc = finalizedCustomSections['buy-detail-location'] || {};
        const pSlug = pageSlug || editingPage.slug;
        const parsedArea = Number(String(propOverview.areaSqft || '2450').replace(/[^0-9.]/g, '')) || 2450;

        const joinedUspsTitle =
          Array.isArray(propOverview.usps) && propOverview.usps.filter((u: string) => String(u || '').trim() !== '').length > 0
            ? propOverview.usps.filter((u: string) => String(u || '').trim() !== '').join(' | ')
            : '';

        const updatedProp: PropertyItem = {
          id: editingPage.id || Date.now(),
          title: joinedUspsTitle || propOverview.title || pageTitle || editingPage.title,
          slug: pSlug,
          type: propOverview.propertyType || 'Villa',
          price: propOverview.price || 'AED 24,750,000',
          location:
            [propLoc.addressTitle?.replace(/,$/, ''), propLoc.addressSubtitle]
              .filter(Boolean)
              .join(', ') || 'Jumeirah Islands, Dubai',
          bedrooms: Number(propOverview.bedrooms) || 4,
          bathrooms: Number(propOverview.bathrooms) || 5,
          area_sqft: parsedArea,
          status: (propOverview.status as any) || 'available',
          image_url: propHero.images?.[0] || propHero.mainImage || '/bannerimg.png',
          content: {
            customSections: finalizedCustomSections,
          },
        };

        // If this is the default featured Lake View property, also sync to the 'buy-detail' page so /buy-detail reflects edits immediately
        if (pSlug === 'lake-view-garden-hall-jumeirah-islands' || pSlug === 'buy-detail') {
          try {
            if (typeof window !== 'undefined') {
              localStorage.setItem('fs_page_buy-detail', JSON.stringify(payload));
            }
          } catch (_) {}
          const bdBackend = pages.find((p) => p.slug === 'buy-detail');
          if (bdBackend && bdBackend.id && bdBackend.id < 90000 && payload.slug !== 'buy-detail') {
            fetch(`${API_BASE_URL}/pages/${bdBackend.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify({ ...payload, slug: 'buy-detail', title: 'Buy Detail Page' }),
            }).catch(() => null);
          }
        }

        setProperties((prev) => {
          const exists = prev.some(
            (pr) =>
              (pr.slug || pr.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) === pSlug ||
              pr.title.toLowerCase() === pageTitle.toLowerCase()
          );
          if (exists) {
            return prev.map((pr) =>
              (pr.slug || pr.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) === pSlug ||
              pr.title.toLowerCase() === pageTitle.toLowerCase()
                ? { ...pr, ...updatedProp }
                : pr
            );
          }
          return [updatedProp, ...prev];
        });

        try {
          if (typeof window !== 'undefined') {
            const cached = localStorage.getItem('fs_properties_list');
            const arr = cached ? JSON.parse(cached) : [];
            const updated = [updatedProp, ...arr.filter((x: any) => x.id !== updatedProp.id && x.slug !== updatedProp.slug && x.title !== updatedProp.title)];
            localStorage.setItem('fs_properties_list', JSON.stringify(updated));
          }
          fetch(getSyncBaseUrl(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              properties: [updatedProp, ...properties.filter((p) => p.id !== updatedProp.id && p.slug !== updatedProp.slug && p.title !== updatedProp.title)],
              deletedProperties: Array.from(getDeletedSet('fs_deleted_properties')),
            }),
          }).catch(() => null);
        } catch (_) {}

        const matchedProp = properties.find(
          (pr) =>
            (pr.slug || pr.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) === pSlug ||
            pr.title.toLowerCase() === pageTitle.toLowerCase()
        );

        if (matchedProp && matchedProp.id && matchedProp.id < 90000) {
          await fetch(`${API_BASE_URL}/properties/${matchedProp.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              title: updatedProp.title,
              slug: updatedProp.slug,
              type: updatedProp.type,
              price: updatedProp.price,
              location: updatedProp.location,
              bedrooms: updatedProp.bedrooms,
              bathrooms: updatedProp.bathrooms,
              area_sqft: updatedProp.area_sqft,
              status: updatedProp.status,
              image_url: updatedProp.image_url,
            }),
          }).catch(() => null);
        }
      }

      // Also sync blog post record in blogsList state
      if (editorReturnTab === 'blogs' || isBlogPage(editingPage)) {
        const blogContent = finalizedCustomSections['blog-content'] || {};
        const blogImages = finalizedCustomSections['blog-images'] || {};
        const blogKeyFigures = finalizedCustomSections['blog-keyfigures'] || {};
        const bSlug = pageSlug || editingPage.slug;

        const exists = blogsList.some(
          (b) =>
            (b.slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) === bSlug ||
            b.title.toLowerCase() === pageTitle.toLowerCase()
        );
        const updatedBlog: BlogCMSItem = {
          id: editingPage.id || Date.now(),
          title: pageTitle || editingPage.title,
          slug: bSlug,
          category: blogContent.category || 'Real Estate',
          date: blogContent.date || new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
          tag: blogContent.tag || 'Featured Guide',
          author: blogContent.author || 'FS Editorial Advisory',
          introParagraph: blogContent.introParagraph || '',
          secondParagraph: blogContent.secondParagraph || '',
          bodyParagraphs: blogContent.bodyParagraphs || [],
          imageSrc: blogImages.primaryImage || '/Rectangle 34625593.png',
          secondImageSrc: blogImages.secondaryImage || '/image 299.png',
          status: 'published',
          keyFigures: blogKeyFigures.metrics || blogKeyFigures || {},
        };

        const nextBlogsList: BlogCMSItem[] = exists
          ? blogsList.map((b) =>
              (b.slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) === bSlug ||
              b.title.toLowerCase() === pageTitle.toLowerCase()
                ? { ...b, ...updatedBlog }
                : b
            )
          : [updatedBlog, ...blogsList];

        setBlogsList(nextBlogsList);

        // Sync to localStorage and cms-sync store
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('fs_blogs_list', JSON.stringify(nextBlogsList));
          }
          fetch(getSyncBaseUrl(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              blogs: nextBlogsList,
              deletedBlogs: Array.from(getDeletedSet('fs_deleted_blogs')),
            }),
          }).catch(() => null);
        } catch (_) {}
      }

      // Update customSections and confirm success
      setCustomSectionsData(finalizedCustomSections);
      if (backendUpdated) {
        await checkBackendAndFetch();
      }
      alert('Page updated and published successfully!');
    } catch (err: any) {
      alert(`Error saving page edits: ${err?.message || 'Network error'}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Save Blogs List to LocalStorage, Frontend store, and state
  const handleSaveBlogsList = async () => {
    setSubmitting(true);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('fs_blogs_list', JSON.stringify(blogsList));
      }
      const deletedBlogsArr = Array.from(getDeletedSet('fs_deleted_blogs'));
      // Sync to frontend port 3000 store
      await fetch(getSyncBaseUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogs: blogsList, deletedBlogs: deletedBlogsArr }),
      }).catch(() => null);

      alert('Blogs directory saved and synced successfully!');
    } catch (err: any) {
      alert('Error saving blogs: ' + (err?.message || 'Unknown error'));
    } finally {
      setSubmitting(false);
    }
  };

  // Save Properties List to LocalStorage, Frontend store, and state
  const handleSavePropertiesList = async () => {
    setSubmitting(true);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('fs_properties_list', JSON.stringify(properties));
      }
      const deletedPropsArr = Array.from(getDeletedSet('fs_deleted_properties'));
      await fetch(getSyncBaseUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties: properties, deletedProperties: deletedPropsArr }),
      }).catch(() => null);

      // Also sync each property to Laravel backend if available
      for (const p of properties) {
        if (typeof p.id === 'number' && p.id < 90000) {
          fetch(`${API_BASE_URL}/properties/${p.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(p),
          }).catch(() => null);
        } else {
          fetch(`${API_BASE_URL}/properties`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(p),
          }).catch(() => null);
        }
      }

      alert('Property listings saved and synced successfully!');
    } catch (err: any) {
      alert('Error saving properties: ' + (err?.message || 'Unknown error'));
    } finally {
      setSubmitting(false);
    }
  };

  // Save Module Item Edits
  const handleSaveItemEdits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSubmitting(true);
    try {
      if (editingType === 'communities') {
        const updatedList = communities.map((c) =>
          c.id === editingItem.id
            ? {
                ...c,
                name: commName,
                tag: commTag || 'Waterfront living',
                slug: commSlug || commName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                icon: commIcon,
                image: commImage,
                location: commLocation,
                href: commHref,
                status: commStatus,
                description: commDesc,
                longContent: commLongContent,
              }
            : c
        );
        setCommunities(updatedList);
        setCommList(
          updatedList.map((c) => ({
            name: c.name,
            icon: c.icon,
            href: c.href || '#',
          }))
        );

        // 1. Sync to communities page
        const commPage = pages.find((p) => p.slug === 'communities');
        if (commPage) {
          await fetch(`${API_BASE_URL}/pages/${commPage.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...commPage,
              content: {
                ...(commPage.content || {}),
                communityCards: updatedList,
              },
            }),
          }).catch(() => null);
        }

        // 2. Also sync to home page if exists
        const homePage = pages.find((p) => p.slug === 'home');
        if (homePage) {
          await fetch(`${API_BASE_URL}/pages/${homePage.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...homePage,
              content: {
                ...(homePage.content || {}),
                community: {
                  ...(homePage.content?.community || {}),
                  items: updatedList.map((c) => ({
                    name: c.name,
                    icon: c.icon,
                    href: c.href || '#',
                  })),
                },
              },
            }),
          }).catch(() => null);
        }

        setEditingItem(null);
        alert('Community card updated and synced to Communities page successfully!');
        setSubmitting(false);
        return;
      }

      let endpoint = '';
      let payload: any = {};

      if (editingType === 'properties') {
        endpoint = `/properties/${editingItem.id}`;
        payload = {
          title: propTitle,
          type: propType,
          price: propPrice,
          location: propLocation,
          bedrooms: propBeds,
          bathrooms: propBaths,
          area_sqft: Number(propArea) || 2450,
          status: propStatus,
          image_url: propImage,
          ...(propSlug ? { slug: propSlug } : {}),
        };
      } else if (editingType === 'offplans') {
        endpoint = `/off-plans/${editingItem.id}`;
        payload = { title: offTitle, developer: offDeveloper, starting_price: offPrice, location: offLocation, completion_date: offCompletion };
      } else if (editingType === 'projects') {
        endpoint = `/projects/${editingItem.id}`;
        payload = { title: projTitle, developer: projDeveloper, category: projCategory, location: projLocation };
      }

      await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (editingType === 'properties') {
        const nextProps = properties.map((pr) => (pr.id === editingItem.id ? { ...pr, ...payload } : pr));
        setProperties(nextProps);
        try {
          if (typeof window !== 'undefined') localStorage.setItem('fs_properties_list', JSON.stringify(nextProps));
          fetch(getSyncBaseUrl(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ properties: nextProps }),
          }).catch(() => null);
        } catch (_) {}
      } else if (editingType === 'offplans') {
        const nextOff = offplans.map((o) => (o.id === editingItem.id ? { ...o, ...payload } : o));
        setOffplans(nextOff);
        try {
          if (typeof window !== 'undefined') localStorage.setItem('fs_offplans_list', JSON.stringify(nextOff));
          fetch(getSyncBaseUrl(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ offplans: nextOff }),
          }).catch(() => null);
        } catch (_) {}
      }

      setEditingItem(null);
      alert('Updated successfully!');
    } catch (err) {
      alert('Error updating item');
    } finally {
      setSubmitting(false);
    }
  };

  // Global FAQs Sync across all pages
  const handleSaveGlobalFaqs = async () => {
    setSubmitting(true);
    try {
      const fqPayload = {
        heading: faqsHeading,
        tagline: faqsTagline,
        mainHeading: faqsMainHeading,
        contentText: faqsContentText,
        items: faqsList,
        detailHtml: faqsDetail,
        backgroundImage: faqsBgImage,
      };

      // Update frontend sync store directly so FAQs reflect everywhere
      try {
        await fetch(getSyncBaseUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ globalFaqs: fqPayload }),
        }).catch(() => null);
      } catch (_) {}

      // 1. Update Home Page (Global Primary Source)
      const homePage = pages.find((p) => p.slug === 'home');
      if (homePage && homePage.id < 90000) {
        await fetch(`${API_BASE_URL}/pages/${homePage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...homePage,
            content: {
              ...(homePage.content || {}),
              faqs: fqPayload,
            },
          }),
        }).catch(() => null);
      }

      // 2. Also update any other pages that have faqs or customSections in content
      const otherPagesWithFaqs = pages.filter(
        (p) => p.slug !== 'home' && (p.content?.faqs || p.content?.customSections?.['buy-faqs'])
      );
      for (const p of otherPagesWithFaqs) {
        await fetch(`${API_BASE_URL}/pages/${p.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...p,
            content: {
              ...(p.content || {}),
              faqs: fqPayload,
              ...(p.content?.customSections?.['buy-faqs']
                ? {
                    customSections: {
                      ...p.content.customSections,
                      'buy-faqs': {
                        ...p.content.customSections['buy-faqs'],
                        detailHtml: faqsDetail,
                        bgImage: faqsBgImage,
                        title: faqsHeading,
                      },
                    },
                  }
                : {}),
            },
          }),
        }).catch(() => null);
      }

      await checkBackendAndFetch();
      alert('Global FAQs updated and synced across all pages successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving FAQs globally.');
    } finally {
      setSubmitting(false);
    }
  };

  // Global Client Reviews Sync across all pages
  const handleSaveGlobalReviews = async () => {
    setSubmitting(true);
    try {
      const revPayload = {
        heading: reviewsHeading,
        tagline: reviewsTagline,
        introText: reviewsIntroText,
        items: reviewsList,
        detailHtml: reviewsDetail,
        backgroundImage: reviewsBgImage,
      };

      // Update frontend sync store directly so reviews reflect everywhere
      try {
        await fetch(getSyncBaseUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ globalReviews: revPayload }),
        }).catch(() => null);
      } catch (_) {}

      // 1. Update Home Page (Global Primary Source)
      const homePage = pages.find((p) => p.slug === 'home');
      if (homePage && homePage.id < 90000) {
        await fetch(`${API_BASE_URL}/pages/${homePage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...homePage,
            content: {
              ...(homePage.content || {}),
              reviews: revPayload,
            },
          }),
        }).catch(() => null);
      }

      // 2. Also update any other pages that have reviews in content
      const otherPagesWithReviews = pages.filter((p) => p.slug !== 'home' && p.content?.reviews);
      for (const p of otherPagesWithReviews) {
        await fetch(`${API_BASE_URL}/pages/${p.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...p,
            content: {
              ...(p.content || {}),
              reviews: revPayload,
            },
          }),
        }).catch(() => null);
      }

      await checkBackendAndFetch();
      alert('Client Reviews updated and synced across all pages successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving Client Reviews globally.');
    } finally {
      setSubmitting(false);
    }
  };

  // Add Item Handler
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (activeTab === 'communities') {
        const newComm: CommunityItem = {
          id: String(Date.now()),
          name: commName,
          tag: commTag || 'Waterfront living',
          slug: commSlug || commName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          icon: commIcon || '/dubai_hills.png',
          image: commImage || '/dubai hills.png',
          location: commLocation || 'Dubai, UAE',
          href: commHref || '#',
          status: commStatus || 'Active',
          description: commDesc || '',
          longContent: commLongContent || '',
        };
        const updatedList = [newComm, ...communities];
        setCommunities(updatedList);
        setCommList(
          updatedList.map((c) => ({
            name: c.name,
            icon: c.icon,
            href: c.href || '#',
          }))
        );

        // Sync to communities page
        const commPage = pages.find((p) => p.slug === 'communities');
        if (commPage) {
          await fetch(`${API_BASE_URL}/pages/${commPage.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...commPage,
              content: {
                ...(commPage.content || {}),
                communityCards: updatedList,
              },
            }),
          }).catch(() => null);
        }

        // Sync to home page
        const homePage = pages.find((p) => p.slug === 'home');
        if (homePage) {
          await fetch(`${API_BASE_URL}/pages/${homePage.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...homePage,
              content: {
                ...(homePage.content || {}),
                community: {
                  ...(homePage.content?.community || {}),
                  items: updatedList.map((c) => ({
                    name: c.name,
                    icon: c.icon,
                    href: c.href || '#',
                  })),
                },
              },
            }),
          }).catch(() => null);
        }
        setIsAddModalOpen(false);
        alert(`Community "${commName}" added successfully!`);
        setSubmitting(false);
        return;
      }

      if (activeTab === 'amenities') {
        const newAmenity: AmenityManagementItem = {
          id: String(Date.now()),
          name: newAmenityName,
          category: newAmenityCategory,
          iconName: newAmenityIcon,
          iconSvg: newAmenityIcon,
          isPopular: true,
        };
        setAmenitiesList([newAmenity, ...amenitiesList]);
        setIsAddModalOpen(false);
        alert(`Amenity "${newAmenityName}" created successfully!`);
        setSubmitting(false);
        return;
      }

      if (activeTab === 'icons') {
        const newIcon: IconAssetItem = {
          id: `ic-${Date.now()}`,
          name: newIconName,
          category: newIconCategory,
          type: newIconType,
          preview: newIconType === 'image' ? (newIconUrl || '/dubai_hills.png') : 'svg',
          codeOrUrl: newIconType === 'image' ? (newIconUrl || '/dubai_hills.png') : (newIconSvg || '<circle cx="12" cy="12" r="10"/>'),
        };
        setIconsList([newIcon, ...iconsList]);
        setIsAddModalOpen(false);
        alert(`Icon "${newIconName}" added successfully to Asset Library!`);
        setSubmitting(false);
        return;
      }

      let endpoint = '';
      let payload: any = {};

      if (activeTab === 'pages' || activeTab === 'dynamic-pages') {
        endpoint = '/pages';
        payload = {
          title: pageTitle,
          slug: pageSlug || undefined,
          meta_title: pageMetaTitle || pageTitle,
          meta_description: pageMetaDesc,
          status: pageStatus || 'draft',
          content: {
            isDynamic: true,
            hero: {
              titleLine1: pageTitle.toUpperCase(),
              titleLine2: 'COMMUNITY & RESIDENCES',
              titleLine3: 'OPPORTUNITY',
              subheading: pageMetaDesc || 'Explore tailored property insights and curated real estate opportunities.',
              primaryCtaText: 'Inquire Now',
              primaryCtaLink: '#',
              secondaryCtaText: 'Explore Guide',
              secondaryCtaLink: '#',
              backgroundImage: '/buy_hero.png',
              detailHtml: `<h2>${pageTitle.toUpperCase()} <span style="color:#BFA16A">OPPORTUNITIES</span></h2><p>${pageMetaDesc || 'Discover curated luxury real estate and exclusive investment options.'}</p>`,
            },
          },
        };
      } else if (activeTab === 'properties') {
        endpoint = '/properties';
        payload = {
          title: propTitle,
          slug: (propSlug || propTitle || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
          type: propType || 'Villa',
          price: propPrice || 'AED 5,000,000',
          location: propLocation || 'Dubai',
          bedrooms: Number(propBeds) || 4,
          bathrooms: Number(propBaths) || 5,
          area_sqft: Number(propArea) || 2450,
          status: 'available',
          image_url: propImage || '/buy-details-hero1.png',
        };
      } else if (activeTab === 'offplans') {
        endpoint = '/off-plans';
        payload = { title: offTitle, developer: offDeveloper, starting_price: offPrice, location: offLocation, completion_date: offCompletion, status: 'selling' };
      } else if (activeTab === 'projects' || activeTab === 'developers') {
        const cleanSlug = (devSlug || devName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const newDev: DeveloperCardItem = {
          id: String(Date.now()),
          name: devName,
          tag: devTag || 'Master Developer',
          slug: cleanSlug,
          logo: devLogo || '/developers/emaar.png',
          image: devImage || '/developer-hero.png',
          location: devLocation || 'Dubai, UAE',
          href: `/developers/${cleanSlug}`,
          status: devStatus || 'Active',
          description: devDesc || '',
        };
        const updatedList = [newDev, ...developerCards];
        setDeveloperCards(updatedList);
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('fs_developers_list', JSON.stringify(updatedList));
          }
        } catch (_) {}
        // Sync to frontend port 3000 store immediately
        await fetch(getSyncBaseUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ developerCards: updatedList }),
        }).catch(() => null);

        // Also upsert on Laravel backend if running
        try {
          const devPage = pages.find((p) => p.slug === 'developers') || {
            title: 'All Developers',
            slug: 'developers',
            status: 'published',
            content: {},
          };
          const updatedPayload = {
            ...devPage,
            title: devPage.title || 'All Developers',
            slug: 'developers',
            status: 'published',
            content: {
              ...(devPage.content || {}),
              developerCards: updatedList,
            },
          };
          const slugCheckRes = await fetch(`${API_BASE_URL}/pages/developers`, {
            headers: { Accept: 'application/json' },
          }).catch(() => null);
          const slugCheckData = slugCheckRes?.ok ? await slugCheckRes.json().catch(() => null) : null;
          if (slugCheckData?.success && slugCheckData.data?.id) {
            await fetch(`${API_BASE_URL}/pages/${slugCheckData.data.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify(updatedPayload),
            }).catch(() => null);
          } else {
            await fetch(`${API_BASE_URL}/pages`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify(updatedPayload),
            }).catch(() => null);
          }
        } catch (_) {}
        setIsAddModalOpen(false);
        setSubmitting(false);
        return;
      }

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null);

      const j = res?.ok ? await res.json().catch(() => null) : null;
      setIsAddModalOpen(false);

      if (activeTab === 'properties') {
        const newPropItem: PropertyItem = {
          id: j?.data?.id || Date.now(),
          title: propTitle,
          slug: (propSlug || propTitle || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
          type: propType || 'Villa',
          price: propPrice || 'AED 5,000,000',
          location: propLocation || 'Dubai',
          bedrooms: Number(propBeds) || 4,
          bathrooms: Number(propBaths) || 5,
          area_sqft: Number(propArea) || 2450,
          status: 'available',
          image_url: propImage || '/buy-details-hero1.png',
        };

        setProperties((prev) => [newPropItem, ...prev]);

        try {
          if (typeof window !== 'undefined') {
            const cached = localStorage.getItem('fs_properties_list');
            const arr = cached ? JSON.parse(cached) : [];
            const updated = [newPropItem, ...arr.filter((x: any) => x.id !== newPropItem.id && x.title !== newPropItem.title)];
            localStorage.setItem('fs_properties_list', JSON.stringify(updated));
          }
          fetch(getSyncBaseUrl(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              properties: [newPropItem, ...properties.filter((p) => p.id !== newPropItem.id && p.title !== newPropItem.title)],
              deletedProperties: Array.from(getDeletedSet('fs_deleted_properties')),
            }),
          }).catch(() => null);

          // Also create in Laravel backend if available
          fetch(`${API_BASE_URL}/properties`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(newPropItem),
          }).catch(() => null);
        } catch (_) {}

        setSubmitting(false);
        alert('Property listing added successfully!');
        openPropertyEditor(newPropItem);
        return;
      }

      if (activeTab === 'offplans') {
        const newOffItem: OffPlanItem = {
          id: j?.data?.id || Date.now(),
          title: offTitle,
          developer: offDeveloper || 'DAMAC Properties',
          starting_price: offPrice || 'AED 2,490,000',
          location: offLocation || 'Dubai',
          completion_date: offCompletion || 'Q4 2029',
          status: 'selling',
          slug: (offTitle || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        };

        setOffplans((prev) => [newOffItem, ...prev]);

        try {
          if (typeof window !== 'undefined') {
            const cached = localStorage.getItem('fs_offplans_list');
            const arr = cached ? JSON.parse(cached) : [];
            const updated = [newOffItem, ...arr.filter((x: any) => x.id !== newOffItem.id && x.title !== newOffItem.title)];
            localStorage.setItem('fs_offplans_list', JSON.stringify(updated));
          }
          fetch(getSyncBaseUrl(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              offplans: [newOffItem, ...offplans.filter((o) => o.id !== newOffItem.id && o.title !== newOffItem.title)],
            }),
          }).catch(() => null);
        } catch (_) {}

        setSubmitting(false);
        alert('Off-Plan project added successfully!');
        return;
      }

      if (activeTab === 'pages' || activeTab === 'dynamic-pages') {
        const newPageItem: PageItem = {
          id: j?.data?.id || Date.now(),
          title: pageTitle,
          slug: pageSlug || pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
          meta_title: pageMetaTitle || pageTitle,
          meta_description: pageMetaDesc,
          status: (pageStatus as any) || 'draft',
          content: payload.content || {},
        };

        setPages((prev) => [newPageItem, ...prev]);

        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem(`fs_page_${newPageItem.slug}`, JSON.stringify(newPageItem));
          }
          fetch(getSyncBaseUrl(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              pages: { [newPageItem.slug]: newPageItem },
            }),
          }).catch(() => null);
        } catch (_) {}

        setSubmitting(false);
        alert(`Page "${pageTitle}" created successfully!`);
        openPageEditor(newPageItem);
        return;
      }

      setSubmitting(false);
      alert('Entry added successfully!');
    } catch (err) {
      alert('Error creating entry');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Item Handler with Persistent Tombstone Recording
  const handleDeleteItem = async (type: string, id: number | string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      if (type === 'communities') {
        const target = communities.find((c) => c.id === id || c.name === name);
        recordDeletedItem('fs_deleted_communities', id, name, target?.slug);
        const updatedList = communities.filter((c) => c.id !== id && c.name !== name);
        setCommunities(updatedList);
        setCommList(
          updatedList.map((c) => ({
            name: c.name,
            icon: c.icon,
            href: c.href || '#',
          }))
        );
        if (typeof window !== 'undefined') {
          localStorage.setItem('fs_communities_list', JSON.stringify(updatedList));
        }
        try {
          const commPage = pages.find((p) => p.slug === 'communities');
          if (commPage) {
            const updatedContent = {
              ...(commPage.content || {}),
              communityCards: updatedList,
              customSections: {
                ...(commPage.content?.customSections || {}),
                'comm-grid': {
                  ...(commPage.content?.customSections?.['comm-grid'] || {}),
                  cards: updatedList,
                },
              },
            };
            if (commPage.id < 90000) {
              await fetch(`${API_BASE_URL}/pages/${commPage.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...commPage, content: updatedContent }),
              }).catch(() => null);
            }
          }
        } catch (_) {}
        if (editingItem?.id === id) setEditingItem(null);
        return;
      }

      if (type === 'developers' || type === 'projects') {
        const target = developerCards.find((d) => d.id === id || d.name === name);
        recordDeletedItem('fs_deleted_developers', id, name, target?.slug);
        const updatedList = developerCards.filter((d) => d.id !== id && d.name !== name);
        setDeveloperCards(updatedList);
        if (typeof window !== 'undefined') {
          localStorage.setItem('fs_developers_list', JSON.stringify(updatedList));
        }
        const deletedDevs = Array.from(getDeletedSet('fs_deleted_developers'));
        await fetch(getSyncBaseUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            developerCards: updatedList,
            deletedDevelopers: deletedDevs,
          }),
        }).catch(() => null);
        try {
          const devPage = pages.find((p) => p.slug === 'developers' || p.slug === 'developer');
          const updatedContent = {
            ...(devPage?.content || {}),
            developerCards: updatedList,
          };
          const slugCheckRes = await fetch(`${API_BASE_URL}/pages/developers`, {
            headers: { Accept: 'application/json' },
          }).catch(() => null);
          const slugCheckData = slugCheckRes?.ok ? await slugCheckRes.json().catch(() => null) : null;
          if (slugCheckData?.success && slugCheckData.data?.id) {
            await fetch(`${API_BASE_URL}/pages/${slugCheckData.data.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify({ ...(devPage || {}), title: 'All Developers', slug: 'developers', status: 'published', content: updatedContent }),
            }).catch(() => null);
          }
        } catch (_) {}
        if (editingItem?.id === id) setEditingItem(null);
        return;
      }

      if (type === 'blogs') {
        const target = blogsList.find((b) => b.id === id || b.title === name);
        recordDeletedItem('fs_deleted_blogs', id, name, target?.slug);
        const updatedList = blogsList.filter((b) => b.id !== id && b.title !== name);
        setBlogsList(updatedList);
        if (typeof window !== 'undefined') {
          localStorage.setItem('fs_blogs_list', JSON.stringify(updatedList));
        }
        // Sync delete to frontend store immediately
        fetch(getSyncBaseUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            blogs: updatedList,
            deletedBlogs: Array.from(getDeletedSet('fs_deleted_blogs')),
          }),
        }).catch(() => null);
        if (editingItem?.id === id) setEditingItem(null);
        return;
      }

      if (type === 'pages' || type === 'dynamic-pages') {
        const targetPage = pages.find((p) => p.id === id || p.title === name || p.slug === String(id));
        const slug = targetPage?.slug || String(id);
        recordDeletedItem('fs_deleted_pages', id, name, slug);
        if (typeof window !== 'undefined') {
          localStorage.removeItem(`fs_page_${slug}`);
        }
        setPages((prev) => prev.filter((p) => p.id !== id && p.slug !== slug && p.title !== name));
        fetch(getSyncBaseUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deletedPages: [slug] }),
        }).catch(() => null);
        if (targetPage && targetPage.id < 90000) {
          await fetch(`${API_BASE_URL}/pages/${targetPage.id}`, { method: 'DELETE' }).catch(() => null);
        }
        if (editingPage?.id === id || editingPage?.slug === slug) setEditingPage(null);
        if (editingItem?.id === id) setEditingItem(null);
        return;
      }

      if (type === 'properties') {
        const targetProp = properties.find((p) => p.id === id || p.title === name);
        recordDeletedItem('fs_deleted_properties', id, name, targetProp?.slug);
        const updatedProps = properties.filter((p) => p.id !== id && p.title !== name);
        setProperties(updatedProps);
        if (typeof window !== 'undefined') {
          localStorage.setItem('fs_properties_list', JSON.stringify(updatedProps));
        }
        fetch(getSyncBaseUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            properties: updatedProps,
            deletedProperties: Array.from(getDeletedSet('fs_deleted_properties')),
          }),
        }).catch(() => null);
        if (typeof id === 'number' && id < 90000) {
          await fetch(`${API_BASE_URL}/properties/${id}`, { method: 'DELETE' }).catch(() => null);
        }
        if (editingItem?.id === id) setEditingItem(null);
        return;
      }

      if (type === 'offplans') {
        const targetOff = offplans.find((o) => o.id === id || o.title === name);
        recordDeletedItem('fs_deleted_offplans', id, name, targetOff?.slug);
        const updatedOff = offplans.filter((o) => o.id !== id && o.title !== name);
        setOffplans(updatedOff);
        if (typeof window !== 'undefined') {
          localStorage.setItem('fs_offplans_list', JSON.stringify(updatedOff));
        }
        if (typeof id === 'number' && id < 90000) {
          await fetch(`${API_BASE_URL}/off-plans/${id}`, { method: 'DELETE' }).catch(() => null);
        }
        if (editingItem?.id === id) setEditingItem(null);
        return;
      }
    } catch (err) {
      console.error('Failed deleting item', err);
      alert('Failed deleting item');
    }
  };

  

  return (
    <div className="flex min-h-screen bg-[#FAF9F6] text-[#171717] font-sans antialiased">
      {/* Side Panel Sidebar */}
      <aside className="w-72 bg-white border-r border-[#E5E0D8] flex flex-col justify-between p-6 shadow-xs z-10">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3.5 mb-8 pb-6 border-b border-[#E5E0D8]">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#BFA16A] to-[#D4B982] flex items-center justify-center text-white font-serif italic text-xl font-bold shadow-md shadow-[#BFA16A]/20">
              FS
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-[#171717]">REAL ESTATE</h1>
              <span className="text-[10px] font-semibold tracking-widest text-[#BFA16A] uppercase">
                CMS CONTROL PANEL
              </span>
            </div>
          </div>

          {/* Nav Categories */}
          <div className="space-y-6">
            {/* Category 1: Pages */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#737373] mb-2 px-3">
                Content & Layouts
              </p>
              <nav className="space-y-1">
                <button
                  onClick={() => {
                    setEditingPage(null);
                    setEditingItem(null);
                    setActiveTab('pages');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition ${
                    activeTab === 'pages' && !editingPage
                      ? 'bg-[#BFA16A]/10 text-[#BFA16A] border border-[#BFA16A]/30 shadow-xs'
                      : 'text-[#525252] hover:bg-[#FAF9F6] hover:text-[#171717]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">📄 Pages</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FAF9F6] border border-[#E5E0D8]">
                    {pages.filter((p) => coreStaticSlugs.includes(p.slug)).length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setEditingPage(null);
                    setEditingItem(null);
                    setActiveTab('dynamic-pages');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition ${
                    activeTab === 'dynamic-pages' && !editingPage
                      ? 'bg-[#BFA16A]/10 text-[#BFA16A] border border-[#BFA16A]/30 shadow-xs'
                      : 'text-[#525252] hover:bg-[#FAF9F6] hover:text-[#171717]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">✨ Dynamic Pages</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FAF9F6] border border-[#E5E0D8]">
                    {pages.filter(isDynamicPage).length}
                  </span>
                </button>
              </nav>
            </div>

            {/* Category 2: Real Estate Modules */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#737373] mb-2 px-3">
                Real Estate Modules
              </p>
              <nav className="space-y-1">
                <button
                  onClick={() => {
                    setEditingPage(null);
                    setEditingItem(null);
                    setActiveTab('properties');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition ${
                    activeTab === 'properties' && !editingItem
                      ? 'bg-[#BFA16A]/10 text-[#BFA16A] border border-[#BFA16A]/30 shadow-xs'
                      : 'text-[#525252] hover:bg-[#FAF9F6] hover:text-[#171717]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">🏠 Property Listings</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FAF9F6] border border-[#E5E0D8]">
                    {properties.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setEditingPage(null);
                    setEditingItem(null);
                    setActiveTab('offplans');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition ${
                    activeTab === 'offplans' && !editingItem
                      ? 'bg-[#BFA16A]/10 text-[#BFA16A] border border-[#BFA16A]/30 shadow-xs'
                      : 'text-[#525252] hover:bg-[#FAF9F6] hover:text-[#171717]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">🏙️ Off-Plan Projects</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FAF9F6] border border-[#E5E0D8]">
                    {offplans.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setEditingPage(null);
                    setEditingItem(null);
                    setActiveTab('communities');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition ${
                    activeTab === 'communities' && !editingPage && !editingItem
                      ? 'bg-[#BFA16A]/10 text-[#BFA16A] border border-[#BFA16A]/30 shadow-xs'
                      : 'text-[#525252] hover:bg-[#FAF9F6] hover:text-[#171717]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">🌴 Communities</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FAF9F6] border border-[#E5E0D8]">
                    {communities.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setEditingPage(null);
                    setEditingItem(null);
                    setActiveTab('projects');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition ${
                    activeTab === 'projects' && !editingItem
                      ? 'bg-[#BFA16A]/10 text-[#BFA16A] border border-[#BFA16A]/30 shadow-xs'
                      : 'text-[#525252] hover:bg-[#FAF9F6] hover:text-[#171717]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">🏗️ Developers</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FAF9F6] border border-[#E5E0D8]">
                    {developerCards.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setEditingPage(null);
                    setEditingItem(null);
                    setActiveTab('blogs');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition ${
                    activeTab === 'blogs' && !editingPage && !editingItem
                      ? 'bg-[#BFA16A]/10 text-[#BFA16A] border border-[#BFA16A]/30 shadow-xs'
                      : 'text-[#525252] hover:bg-[#FAF9F6] hover:text-[#171717]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">📰 Blogs</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FAF9F6] border border-[#E5E0D8]">
                    {blogsList.length}
                  </span>
                </button>
              </nav>
            </div>

            {/* Category 3: Global Sections */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#737373] mb-2 px-3">
                Global Content Sections
              </p>
              <nav className="space-y-1">
                <button
                  onClick={() => {
                    setEditingPage(null);
                    setEditingItem(null);
                    setActiveTab('reviews');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition ${
                    activeTab === 'reviews' && !editingPage && !editingItem
                      ? 'bg-[#BFA16A]/10 text-[#BFA16A] border border-[#BFA16A]/30 shadow-xs'
                      : 'text-[#525252] hover:bg-[#FAF9F6] hover:text-[#171717]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">💬 Client Reviews</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FAF9F6] border border-[#E5E0D8]">
                    {reviewsList.length}
                  </span>
                </button>
              </nav>
            </div>

            {/* Category 4: Settings & Assets (Matching Screenshot) */}
            <div>
              <div className="flex items-center justify-between px-3 mb-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#737373] flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#737373]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  Settings
                </p>
                <span className="text-[10px] text-[#A3A3A3]">▼</span>
              </div>
              <nav className="space-y-1">
                {/* Amenities Tab Button (Matching Screenshot) */}
                <button
                  onClick={() => {
                    setEditingPage(null);
                    setEditingItem(null);
                    setActiveTab('amenities');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition ${
                    activeTab === 'amenities' && !editingPage && !editingItem
                      ? 'bg-[#BFA16A]/10 text-[#BFA16A] border border-[#BFA16A]/30 shadow-xs'
                      : 'text-[#525252] hover:bg-[#FAF9F6] hover:text-[#171717]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {/* Sparkle Icon */}
                    <svg className="w-4 h-4 text-[#BFA16A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
                    </svg>
                    Amenities
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FAF9F6] border border-[#E5E0D8]">
                    {amenitiesList.length}
                  </span>
                </button>

                {/* Icons Tab Button (Matching Screenshot) */}
                <button
                  onClick={() => {
                    setEditingPage(null);
                    setEditingItem(null);
                    setActiveTab('icons');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition ${
                    activeTab === 'icons' && !editingPage && !editingItem
                      ? 'bg-[#BFA16A]/10 text-[#BFA16A] border border-[#BFA16A]/30 shadow-xs'
                      : 'text-[#525252] hover:bg-[#FAF9F6] hover:text-[#171717]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {/* Picture / Icon outline */}
                    <svg className="w-4 h-4 text-[#BFA16A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    Icons
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FAF9F6] border border-[#E5E0D8]">
                    {iconsList.length}
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Backend Status Widget */}
        <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E5E0D8] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#525252]">Laravel Backend</span>
            {apiConnected ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Online
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> Offline
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#737373] font-mono truncate" suppressHydrationWarning>{API_BASE_URL}</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#FAF9F6]">
        {/* ========================================================================= */}
        {/* 1. FULL PAGE EDITOR VIEW FOR PAGES (Renders when editingPage is active)   */}
        {/* ========================================================================= */}
        {editingPage ? (
          <div className="flex-1 flex flex-col min-h-0 bg-[#F4F5F7]">
            {/* Top Bar for Editor matching reference */}
            <header className="bg-white border-b border-[#E5E0D8] px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xs sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setEditingPage(null);
                    if (editorReturnTab === 'properties') setActiveTab('properties');
                    else if (editorReturnTab === 'offplans') setActiveTab('offplans');
                    else if (editorReturnTab === 'communities') setActiveTab('communities');
                    else if (editorReturnTab === 'developers') setActiveTab('projects');
                    else if (editorReturnTab === 'blogs') setActiveTab('blogs');
                    else if (editorReturnTab === 'dynamic-pages') setActiveTab('dynamic-pages');
                    else setActiveTab('pages');
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-[#525252] bg-[#FAF9F6] border border-[#E5E0D8] hover:border-[#BFA16A] hover:text-[#BFA16A] rounded-xl transition flex items-center gap-2 shadow-xs"
                >
                  <span>←</span>{' '}
                  {editorReturnTab === 'properties'
                    ? 'Back to Property Listings'
                    : editorReturnTab === 'offplans'
                    ? 'Back to Off-Plan Launches'
                    : editorReturnTab === 'communities'
                    ? 'Back to Communities'
                    : editorReturnTab === 'developers'
                    ? 'Back to Developers'
                    : editorReturnTab === 'blogs'
                    ? 'Back to Blogs'
                    : editorReturnTab === 'dynamic-pages'
                    ? 'Back to Dynamic Pages'
                    : 'Back to Pages'}
                </button>
                <div>
                  <h2 className="text-xl font-bold text-[#171717] tracking-tight">
                    {editorReturnTab === 'properties'
                      ? `Update Property: ${editingPage.title?.replace(/^Update\s+/i, '')}`
                      : editorReturnTab === 'offplans'
                      ? `Update Project: ${editingPage.title?.replace(/^Update\s+/i, '')}`
                      : editorReturnTab === 'communities'
                      ? `Update Community: ${editingPage.title?.replace(/^Update\s+/i, '')}`
                      : editorReturnTab === 'developers'
                      ? `Update Developer: ${editingPage.title?.replace(/^Update\s+/i, '')}`
                      : editorReturnTab === 'blogs'
                      ? `Update Blog: ${editingPage.title?.replace(/^Update\s+/i, '')}`
                      : `Update: ${editingPage.title?.replace(/^Update\s+/i, '')}`}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                {(() => {
                  const isCommSlug = editingPage.slug !== 'recommendation-result' && communities.some(
                    (c) => c.slug === editingPage.slug || c.href?.includes(editingPage.slug)
                  );
                  const isDevSlug = developerCards.some((d) => d.slug === editingPage.slug);
                  const isBlog = editorReturnTab === 'blogs' || isBlogPage(editingPage) || editingPage.slug === 'blog-details';
                  const isProp = editorReturnTab === 'properties' || isPropertyPage(editingPage) || editingPage.slug === 'buy-detail';
                  const targetLiveUrl =
                    editingPage.slug === 'recommendation-result' || pageSlug === 'recommendation-result'
                      ? `http://:3000/${pageSlug || 'recommendation-result'}`
                      : isProp
                      ? `http://:3000/buy-detail${(pageSlug || editingPage.slug) === 'buy-detail' ? '' : `?slug=${pageSlug || editingPage.slug}`}`
                      : editorReturnTab === 'offplans' || editingPage.slug === 'project-detail'
                      ? `http://:3000/project-detail?slug=${pageSlug || editingPage.slug}`
                      : isBlog
                      ? `http://:3000/blog-details?slug=${pageSlug || editingPage.slug}`
                      : isCommSlug
                      ? `http://:3000/communities/${pageSlug || editingPage.slug}`
                      : isDevSlug
                      ? `http://:3000/developers/${pageSlug || editingPage.slug}`
                      : `http://:3000/${(pageSlug || editingPage.slug) === 'home' ? '' : (pageSlug || editingPage.slug)}`;

                  return (
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="text-xs text-[#525252]">
                        <span className="text-[#888888] font-medium mr-1.5">Page URL:</span>
                        <a
                          href={targetLiveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-[#5B6BF0] hover:underline"
                        >
                          {targetLiveUrl}
                        </a>
                      </div>
                      <a
                        href={targetLiveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold text-[#171717] bg-[#FAF9F6] border border-[#E5E0D8] hover:border-[#BFA16A] hover:text-[#BFA16A] rounded-xl transition flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>↗</span> View on Website
                      </a>
                    </div>
                  );
                })()}

                <button
                  onClick={handleSavePageEdits}
                  disabled={submitting}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-md shadow-[#BFA16A]/20 disabled:opacity-50 ml-2"
                >
                  {submitting
                    ? 'Saving Changes...'
                    : editorReturnTab === 'properties'
                    ? 'Save & Update Property'
                    : editorReturnTab === 'offplans'
                    ? 'Save & Update Project'
                    : editorReturnTab === 'communities'
                    ? 'Save & Update Community'
                    : editorReturnTab === 'developers'
                    ? 'Save & Update Developer'
                    : editorReturnTab === 'blogs'
                    ? 'Save & Update Blog'
                    : 'Save & Update Page'}
                </button>
              </div>
            </header>

            {/* Editor Workspace: Left Tab Bar + Right Content Area */}
            <div className="flex-1 p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
              {(editorReturnTab === 'dynamic-pages' || Boolean(editingPage.content?.isDynamic) || isDynamicPage(editingPage)) ? (
                <DynamicPageBuilder
                  pageTitle={pageTitle}
                  setPageTitle={setPageTitle}
                  pageSlug={pageSlug}
                  setPageSlug={setPageSlug}
                  pageMetaTitle={pageMetaTitle}
                  setPageMetaTitle={setPageMetaTitle}
                  pageMetaKeywords={pageMetaKeywords}
                  setPageMetaKeywords={setPageMetaKeywords}
                  pageMetaDesc={pageMetaDesc}
                  setPageMetaDesc={setPageMetaDesc}
                  pageOgImage={pageOgImage}
                  setPageOgImage={setPageOgImage}
                  handleFileUpload={handleFileUpload}
                  dynamicSections={dynamicSections}
                  setDynamicSections={setDynamicSections}
                  activeSectionTab={activeSectionTab}
                  setActiveSectionTab={setActiveSectionTab}
                  amenitiesList={amenitiesList}
                  offplansList={offplans}
                  communitiesList={communities}
                  developerCards={developerCards}
                />
              ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Vertical Section Navigation Bar */}
                <aside className="lg:col-span-3 bg-white rounded-2xl border border-[#E5E0D8] p-3 shadow-xs space-y-1.5 sticky top-28">
                  {/* Basic Detail Tab always available */}
                  <button
                    type="button"
                    onClick={() => setActiveSectionTab('basic')}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all border ${
                      activeSectionTab === 'basic'
                        ? 'bg-[#EFE5D3] text-[#171717] font-bold border-[#D4C3A6] shadow-xs'
                        : 'bg-white text-[#525252] border-transparent hover:bg-[#FAF9F6] hover:text-[#171717]'
                    }`}
                  >
                    Basic Detail
                  </button>

                  <div className="pt-2 pb-1 px-3">
                    <p className="text-[10px] font-bold text-[#888888] uppercase tracking-wider">
                      Page Sections
                    </p>
                  </div>

                  {/* Dynamically mapped sections matching the website page components */}
                  {getPageSections(editingPage.slug).map((sec, idx) => {
                    const isActive = activeSectionTab === sec.id;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => setActiveSectionTab(sec.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all border flex items-center justify-between group ${
                          isActive
                            ? 'bg-[#EFE5D3] text-[#171717] font-bold border-[#D4C3A6] shadow-xs'
                            : 'bg-white text-[#525252] border-transparent hover:bg-[#FAF9F6] hover:text-[#171717]'
                        }`}
                      >
                        <span className="truncate">{sec.label}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {sec.id === 'proj-video' && customSectionsData['proj-video']?.hideSection && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 rounded-md border border-rose-200">
                              Hidden
                            </span>
                          )}
                          <span className="text-[10px] text-[#A39982] opacity-70 group-hover:opacity-100 font-mono">
                            #{idx + 1}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </aside>

                {/* Right Form Workspace */}
                <main className="lg:col-span-9 bg-white rounded-2xl border border-[#E5E0D8] p-6 lg:p-8 shadow-xs">
                  {/* TAB 1: BASIC DETAIL */}
                  {activeSectionTab === 'basic' && (
                    <div className="space-y-6">
                      <div className="border-b border-[#E5E0D8] pb-4">
                        <h3 className="text-xl font-bold text-[#171717]">Basic Detail</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1.5">Page Name</label>
                          <input
                            type="text"
                            required
                            value={pageTitle}
                            onChange={(e) => setPageTitle(e.target.value)}
                            placeholder="Home Page"
                            className="w-full bg-white border border-[#D5D0C7] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1.5">Slug</label>
                          <input
                            type="text"
                            required
                            value={pageSlug}
                            onChange={(e) => setPageSlug(e.target.value)}
                            placeholder="home"
                            className="w-full bg-white border border-[#D5D0C7] rounded-xl px-4 py-2.5 text-sm font-mono text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1.5">Meta Title</label>
                          <input
                            type="text"
                            value={pageMetaTitle}
                            onChange={(e) => setPageMetaTitle(e.target.value)}
                            placeholder="FS Real Estate Advisory - Premium Dubai Properties"
                            className="w-full bg-white border border-[#D5D0C7] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1.5">Meta Keyword</label>
                          <input
                            type="text"
                            value={pageMetaKeywords}
                            onChange={(e) => setPageMetaKeywords(e.target.value)}
                            placeholder="Dubai Properties, Real Estate Advisory, Luxury Villas"
                            className="w-full bg-white border border-[#D5D0C7] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#525252] mb-1.5">Meta Description</label>
                        <textarea
                          rows={4}
                          value={pageMetaDesc}
                          onChange={(e) => setPageMetaDesc(e.target.value)}
                          placeholder="Invest in luxury real estate, beachfront apartments and exclusive master-planned communities offering high capital appreciation and rental yield."
                          className="w-full bg-white border border-[#D5D0C7] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#525252] mb-1.5">OG Image / Social Share Banner</label>
                        <div className="relative w-72 h-44 rounded-2xl border-2 border-dashed border-[#D5D0C7] overflow-hidden group bg-[#FAF9F6] flex items-center justify-center">
                          <img
                            src={pageOgImage}
                            alt="OG Banner"
                            className="w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.src = '/buy_hero.png')}
                          />
                          <label className="absolute bottom-3 right-3 bg-white p-2 rounded-xl shadow-md border border-[#E5E0D8] cursor-pointer hover:bg-[#FAF9F6] transition">
                            <span className="text-sm">✏️</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], setPageOgImage)}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: HERO SECTION */}
                  {activeSectionTab === 'hero' && (
                    <div className="space-y-6">
                      <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-[#171717]">Hero Section</h3>
                        </div>
                        <span className="text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 px-3 py-1 rounded-full border border-[#BFA16A]/30">
                          Section 1
                        </span>
                      </div>

                      {/* Heading Input Box */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">
                            Main Heading
                          </label>
                          <input
                            type="text"
                            value={heroHeading}
                            onChange={(e) => {
                              const val = e.target.value;
                              setHeroHeading(val);
                              const words = val.trim().split(/\s+/).filter(Boolean);
                              if (words.length <= 1) {
                                setHeroTitle1(val);
                                setHeroTitle2('');
                                setHeroTitle3('');
                              } else if (words.length === 2) {
                                setHeroTitle1(words[0]);
                                setHeroTitle2(words[1]);
                                setHeroTitle3('');
                              } else if (words.length <= 4) {
                                setHeroTitle1(words[0]);
                                setHeroTitle2(words.slice(1, -1).join(' '));
                                setHeroTitle3(words[words.length - 1]);
                              } else {
                                setHeroTitle1(words.slice(0, 2).join(' '));
                                setHeroTitle2(words.slice(2, 4).join(' '));
                                setHeroTitle3(words.slice(4).join(' '));
                              }
                            }}
                            placeholder="e.g. DISCOVER THE RIGHT PROPERTY OPPORTUNITY."
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-semibold focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">
                            Tagline / Badge
                          </label>
                          <input
                            type="text"
                            value={heroTagline}
                            onChange={(e) => {
                              const val = e.target.value;
                              setHeroTagline(val);
                              if (!heroSubheading || heroSubheading === heroTagline) {
                                setHeroSubheading(val);
                              }
                            }}
                            placeholder="e.g. LUXURY REAL ESTATE IN DUBAI"
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>
                      </div>

                      {/* Section Cover Image with Live Edit Badge */}
                      <CoverImagePicker
                        label="Cover Image"
                        imageUrl={heroBgImage}
                        onChange={(url) => setHeroBgImage(url)}
                        onFileUpload={handleFileUpload}
                      />

                      {/* Detailed Title & Button Customizers */}
                      <div className="pt-4 border-t border-[#E5E0D8] space-y-4">
                        <span className="text-xs font-bold text-[#737373] uppercase tracking-wider block">
                          Optional Field Breakdown
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-[#525252] mb-1">
                              Title Line 1 (Dark Text)
                            </label>
                            <input
                              type="text"
                              value={heroTitle1}
                              onChange={(e) => {
                                const val = e.target.value;
                                setHeroTitle1(val);
                                setHeroHeading([val, heroTitle2, heroTitle3].filter(Boolean).join(' '));
                              }}
                              placeholder="e.g. DISCOVER THE"
                              className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-serif uppercase tracking-wider focus:outline-none focus:border-[#BFA16A]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[#BFA16A] mb-1">
                              Title Line 2 (Highlighted Gold) ✨
                            </label>
                            <input
                              type="text"
                              value={heroTitle2}
                              onChange={(e) => {
                                const val = e.target.value;
                                setHeroTitle2(val);
                                setHeroHeading([heroTitle1, val, heroTitle3].filter(Boolean).join(' '));
                              }}
                              placeholder="e.g. RIGHT PROPERTY"
                              className="w-full bg-[#FAF9F6] border border-[#BFA16A]/50 rounded-xl px-4 py-2.5 text-sm text-[#BFA16A] font-serif uppercase tracking-wider font-bold focus:outline-none focus:border-[#BFA16A]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[#525252] mb-1">
                              Title Line 3 (Dark Text)
                            </label>
                            <input
                              type="text"
                              value={heroTitle3}
                              onChange={(e) => {
                                const val = e.target.value;
                                setHeroTitle3(val);
                                setHeroHeading([heroTitle1, heroTitle2, val].filter(Boolean).join(' '));
                              }}
                              placeholder="e.g. OPPORTUNITY."
                              className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-serif uppercase tracking-wider focus:outline-none focus:border-[#BFA16A]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">
                            Hero Subheading Paragraph
                          </label>
                          <textarea
                            value={heroSubheading}
                            onChange={(e) => setHeroSubheading(e.target.value)}
                            rows={2}
                            placeholder="Curated opportunities. Intelligent insights. Aligned with your goals."
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>

                        {/* Buttons configuration (Only displayed for pages that use hero CTA buttons, e.g. Home) */}
                        {editingPage?.slug !== 'ai-assessment' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-[#BFA16A]">
                                Primary Action Button (Gold Filled)
                              </span>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[11px] text-[#525252]">Text</label>
                                  <input
                                    type="text"
                                    value={heroPrimaryCtaText}
                                    onChange={(e) => setHeroPrimaryCtaText(e.target.value)}
                                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] text-[#525252]">Link</label>
                                  <input
                                    type="text"
                                    value={heroPrimaryCtaLink}
                                    onChange={(e) => setHeroPrimaryCtaLink(e.target.value)}
                                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs font-mono text-[#171717]"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                                Secondary Action Button (White Outline)
                              </span>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[11px] text-[#525252]">Text</label>
                                  <input
                                    type="text"
                                    value={heroSecondaryCtaText}
                                    onChange={(e) => setHeroSecondaryCtaText(e.target.value)}
                                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] text-[#525252]">Link</label>
                                  <input
                                    type="text"
                                    value={heroSecondaryCtaLink}
                                    onChange={(e) => setHeroSecondaryCtaLink(e.target.value)}
                                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs font-mono text-[#171717]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: FEATURE BAR */}
                  {activeSectionTab === 'features' && (
                    <div className="space-y-6">
                      <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-[#171717]">Advisory & Feature Bar</h3>
                        </div>
                        <span className="text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 px-3 py-1 rounded-full border border-[#BFA16A]/30">
                          Section 2
                        </span>
                      </div>

                      <div className="pt-2">
                        <span className="text-xs font-bold text-[#737373] uppercase tracking-wider block mb-3">
                          Advisory Cards Breakdown
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Item 1 */}
                        <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#E5E0D8] space-y-3">
                          <div className="border-b border-[#E5E0D8] pb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#BFA16A]">Feature Item 1</span>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#525252] mb-1">Title</label>
                            <input
                              type="text"
                              value={f1Title}
                              onChange={(e) => setF1Title(e.target.value)}
                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-4 py-2 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#525252] mb-1">Description</label>
                            <textarea
                              value={f1Desc}
                              onChange={(e) => setF1Desc(e.target.value)}
                              rows={2}
                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-4 py-2 text-xs text-[#171717]"
                            />
                          </div>
                          <div>
                            <IconDropdownSelect
                              label="Icon (From Global Icons Library)"
                              value={f1Icon}
                              onChange={(val) => setF1Icon(val)}
                              icons={iconsList}
                              placeholder="Select icon..."
                            />
                          </div>
                        </div>

                        {/* Item 2 */}
                        <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#E5E0D8] space-y-3">
                          <div className="border-b border-[#E5E0D8] pb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#BFA16A]">Feature Item 2</span>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#525252] mb-1">Title</label>
                            <input
                              type="text"
                              value={f2Title}
                              onChange={(e) => setF2Title(e.target.value)}
                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-4 py-2 text-sm text-[#171717]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#525252] mb-1">Description</label>
                            <textarea
                              value={f2Desc}
                              onChange={(e) => setF2Desc(e.target.value)}
                              rows={2}
                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-4 py-2 text-xs text-[#171717]"
                            />
                          </div>
                          <div>
                            <IconDropdownSelect
                              label="Icon (From Global Icons Library)"
                              value={f2Icon}
                              onChange={(val) => setF2Icon(val)}
                              icons={iconsList}
                              placeholder="Select icon..."
                            />
                          </div>
                        </div>

                        {/* Item 3 */}
                        <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#E5E0D8] space-y-3">
                          <div className="border-b border-[#E5E0D8] pb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#BFA16A]">Feature Item 3</span>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#525252] mb-1">Title</label>
                            <input
                              type="text"
                              value={f3Title}
                              onChange={(e) => setF3Title(e.target.value)}
                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-4 py-2 text-sm text-[#171717]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#525252] mb-1">Description</label>
                            <textarea
                              value={f3Desc}
                              onChange={(e) => setF3Desc(e.target.value)}
                              rows={2}
                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-4 py-2 text-xs text-[#171717]"
                            />
                          </div>
                          <div>
                            <IconDropdownSelect
                              label="Icon (From Global Icons Library)"
                              value={f3Icon}
                              onChange={(val) => setF3Icon(val)}
                              icons={iconsList}
                              placeholder="Select icon..."
                            />
                          </div>
                        </div>

                        {/* Item 4 */}
                        <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#E5E0D8] space-y-3">
                          <div className="border-b border-[#E5E0D8] pb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#BFA16A]">Feature Item 4</span>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#525252] mb-1">Title</label>
                            <input
                              type="text"
                              value={f4Title}
                              onChange={(e) => setF4Title(e.target.value)}
                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-4 py-2 text-sm text-[#171717]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#525252] mb-1">Description</label>
                            <textarea
                              value={f4Desc}
                              onChange={(e) => setF4Desc(e.target.value)}
                              rows={2}
                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-4 py-2 text-xs text-[#171717]"
                            />
                          </div>
                          <div>
                            <IconDropdownSelect
                              label="Icon (From Global Icons Library)"
                              value={f4Icon}
                              onChange={(val) => setF4Icon(val)}
                              icons={iconsList}
                              placeholder="Select icon..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: RECOMMENDED OPPORTUNITIES */}
                  {activeSectionTab === 'opportunities' && (
                    <div className="space-y-6">
                      <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-[#171717]">Recommended Opportunities</h3>
                        </div>
                        <span className="text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 px-3 py-1 rounded-full border border-[#BFA16A]/30">
                          Section 3
                        </span>
                      </div>

                      {/* Heading & Tagline Inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">Section Heading</label>
                          <input
                            type="text"
                            value={oppTitle}
                            onChange={(e) => {
                              const val = e.target.value;
                              setOppTitle(val);
                              const words = val.trim().split(/\s+/).filter(Boolean);
                              if (words.length <= 1) {
                                setOppTitleLine1(val);
                                setOppTitleLine2('');
                              } else if (words.length <= 3) {
                                setOppTitleLine1(words[0]);
                                setOppTitleLine2(words.slice(1).join(' '));
                              } else {
                                setOppTitleLine1(words.slice(0, 2).join(' '));
                                setOppTitleLine2(words.slice(2).join(' '));
                              }
                            }}
                            placeholder="Opportunities We Currently Recommend"
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-semibold focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">Tagline / Badge</label>
                          <input
                            type="text"
                            value={oppTagline}
                            onChange={(e) => setOppTagline(e.target.value)}
                            placeholder="e.g. FEATURED INVESTMENTS"
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>
                      </div>

                      {/* Content Textarea */}
                      <div>
                        <label className="block text-xs font-semibold text-[#525252] mb-1">Content / Description</label>
                        <textarea
                          rows={3}
                          value={oppContentText}
                          onChange={(e) => setOppContentText(e.target.value)}
                          placeholder="Hand-picked, high-yield developments across prime UAE communities..."
                          className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                        />
                      </div>

                      <div className="pt-2">
                        <span className="text-xs font-bold text-[#737373] uppercase tracking-wider block mb-2">
                          Optional Heading Breakdown & Link
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">Heading Line 1</label>
                          <input
                            type="text"
                            value={oppTitleLine1}
                            onChange={(e) => {
                              const val = e.target.value;
                              setOppTitleLine1(val);
                              setOppTitle([val, oppTitleLine2].filter(Boolean).join(' '));
                            }}
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2 text-sm text-[#171717]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">Heading Line 2 (Gold)</label>
                          <input
                            type="text"
                            value={oppTitleLine2}
                            onChange={(e) => {
                              const val = e.target.value;
                              setOppTitleLine2(val);
                              setOppTitle([oppTitleLine1, val].filter(Boolean).join(' '));
                            }}
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2 text-sm text-[#BFA16A] font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">View All Link URL</label>
                          <input
                            type="text"
                            value={oppViewAllLink}
                            onChange={(e) => setOppViewAllLink(e.target.value)}
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2 text-sm font-mono text-[#171717]"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between relative">
                          <h4 className="text-sm font-bold text-[#171717]">Opportunity Cards ({oppCards.length})</h4>
                          
                          {/* Add Opportunity Card Dropdown */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setIsAddOppDropdownOpen(!isAddOppDropdownOpen)}
                              className="px-4 py-2 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>+</span> Add Opportunity Card
                              <span className="text-[10px]">▼</span>
                            </button>

                            {isAddOppDropdownOpen && (
                              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#E5E0D8] rounded-2xl shadow-2xl z-50 p-3 space-y-3">
                                <div className="border-b border-[#E5E0D8] pb-2">
                                  <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider block mb-1.5">
                                    Select from Communities or Projects
                                  </span>
                                  <input
                                    type="text"
                                    value={oppSearchFilter}
                                    onChange={(e) => setOppSearchFilter(e.target.value)}
                                    placeholder="Search project or community..."
                                    className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                    autoFocus
                                  />
                                </div>

                                <div className="max-h-72 overflow-y-auto space-y-3 pr-1 text-xs">
                                  {/* Section: Off-Plan Projects */}
                                  <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#BFA16A] px-2 py-0.5 bg-[#BFA16A]/10 rounded block mb-1">
                                      🏢 Off-Plan Projects
                                    </span>
                                    <div className="space-y-0.5">
                                      {offplans
                                        .filter((p) =>
                                          !oppSearchFilter ||
                                          p.title.toLowerCase().includes(oppSearchFilter.toLowerCase()) ||
                                          p.developer.toLowerCase().includes(oppSearchFilter.toLowerCase())
                                        )
                                        .slice(0, 15)
                                        .map((p) => (
                                          <button
                                            key={`sel-proj-${p.id}-${p.slug}`}
                                            type="button"
                                            onClick={() => {
                                              setOppCards([
                                                ...oppCards,
                                                {
                                                  id: String(Date.now()),
                                                  title: p.title,
                                                  developer: p.developer ? `By ${p.developer.replace(/^By\s+/i, '')}` : 'By Developer',
                                                  score: 90,
                                                  tag: (p.type || 'LUXURY LIVING').toUpperCase(),
                                                  bestFor: 'End Users & Investors',
                                                  price: p.starting_price || 'AED 2.0M',
                                                  image: p.imageUrl || '/thevalley.png',
                                                },
                                              ]);
                                              setIsAddOppDropdownOpen(false);
                                              setOppSearchFilter('');
                                            }}
                                            className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#FAF9F6] text-left transition group cursor-pointer"
                                          >
                                            <img
                                              src={p.imageUrl || '/thevalley.png'}
                                              alt={p.title}
                                              className="w-8 h-8 rounded-lg object-cover border border-[#E5E0D8] shrink-0"
                                              onError={(e) => (e.currentTarget.src = '/thevalley.png')}
                                            />
                                            <div className="truncate flex-1">
                                              <span className="font-semibold text-[#171717] block truncate">{p.title}</span>
                                              <span className="text-[10px] text-[#737373] block truncate">
                                                {p.developer} · {p.starting_price}
                                              </span>
                                            </div>
                                            <span className="text-[11px] text-[#BFA16A] font-bold opacity-0 group-hover:opacity-100 transition">+</span>
                                          </button>
                                        ))}
                                    </div>
                                  </div>

                                  {/* Section: Master Communities */}
                                  <div className="border-t border-[#E5E0D8] pt-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#171717] px-2 py-0.5 bg-[#FAF9F6] rounded block mb-1">
                                      🌴 Master Communities
                                    </span>
                                    <div className="space-y-0.5">
                                      {communities
                                        .filter((c) =>
                                          !oppSearchFilter ||
                                          c.name.toLowerCase().includes(oppSearchFilter.toLowerCase()) ||
                                          (c.tag && c.tag.toLowerCase().includes(oppSearchFilter.toLowerCase()))
                                        )
                                        .slice(0, 15)
                                        .map((c) => (
                                          <button
                                            key={`sel-comm-${c.id}-${c.slug}`}
                                            type="button"
                                            onClick={() => {
                                              setOppCards([
                                                ...oppCards,
                                                {
                                                  id: String(Date.now()),
                                                  title: c.name,
                                                  developer: 'By Emaar',
                                                  score: 92,
                                                  tag: (c.tag || 'FAMILY LIVING').toUpperCase(),
                                                  bestFor: 'Growing Families',
                                                  price: 'AED 1.8M',
                                                  image: c.image || '/dubai hills.png',
                                                },
                                              ]);
                                              setIsAddOppDropdownOpen(false);
                                              setOppSearchFilter('');
                                            }}
                                            className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#FAF9F6] text-left transition group cursor-pointer"
                                          >
                                            <img
                                              src={c.image || '/dubai hills.png'}
                                              alt={c.name}
                                              className="w-8 h-8 rounded-lg object-cover border border-[#E5E0D8] shrink-0"
                                              onError={(e) => (e.currentTarget.src = '/dubai hills.png')}
                                            />
                                            <div className="truncate flex-1">
                                              <span className="font-semibold text-[#171717] block truncate">{c.name}</span>
                                              <span className="text-[10px] text-[#737373] block truncate">
                                                {c.tag || 'Master Community'}
                                              </span>
                                            </div>
                                            <span className="text-[11px] text-[#BFA16A] font-bold opacity-0 group-hover:opacity-100 transition">+</span>
                                          </button>
                                        ))}
                                    </div>
                                  </div>

                                  {/* Custom Blank Card */}
                                  <div className="border-t border-[#E5E0D8] pt-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setOppCards([
                                          ...oppCards,
                                          {
                                            id: String(Date.now()),
                                            title: 'New Development',
                                            developer: 'By Emaar',
                                            score: 90,
                                            tag: 'LUXURY LIVING',
                                            bestFor: 'Investors & Families',
                                            price: 'AED 2.0M',
                                            image: '/thevalley.png',
                                          },
                                        ]);
                                        setIsAddOppDropdownOpen(false);
                                      }}
                                      className="w-full py-2 px-3 text-center text-xs font-semibold text-[#525252] hover:text-[#BFA16A] bg-[#FAF9F6] hover:bg-neutral-100 rounded-xl transition cursor-pointer"
                                    >
                                      + Add Blank Custom Card
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {oppCards.map((card, idx) => (
                            <div key={card.id || idx} className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-3 relative">
                              <button
                                type="button"
                                onClick={() => setOppCards(oppCards.filter((_, i) => i !== idx))}
                                className="absolute top-3 right-3 text-rose-500 hover:text-rose-700 text-xs font-bold"
                              >
                                ✕
                              </button>
                              <div>
                                <label className="block text-[11px] font-semibold text-[#525252] mb-0.5">Project Name</label>
                                <input
                                  type="text"
                                  value={card.title}
                                  onChange={(e) => {
                                    const next = [...oppCards];
                                    next[idx].title = e.target.value;
                                    setOppCards(next);
                                  }}
                                  className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717]"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[11px] font-semibold text-[#525252] mb-0.5">Developer</label>
                                  <input
                                    type="text"
                                    value={card.developer}
                                    onChange={(e) => {
                                      const next = [...oppCards];
                                      next[idx].developer = e.target.value;
                                      setOppCards(next);
                                    }}
                                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-[#525252] mb-0.5">FS Score</label>
                                  <input
                                    type="number"
                                    value={card.score}
                                    onChange={(e) => {
                                      const next = [...oppCards];
                                      next[idx].score = Number(e.target.value);
                                      setOppCards(next);
                                    }}
                                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717]"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[11px] font-semibold text-[#525252] mb-0.5">Tag</label>
                                  <input
                                    type="text"
                                    value={card.tag}
                                    onChange={(e) => {
                                      const next = [...oppCards];
                                      next[idx].tag = e.target.value;
                                      setOppCards(next);
                                    }}
                                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-[#525252] mb-0.5">Best For</label>
                                  <input
                                    type="text"
                                    value={card.bestFor || 'Growing Families'}
                                    onChange={(e) => {
                                      const next = [...oppCards];
                                      next[idx].bestFor = e.target.value;
                                      setOppCards(next);
                                    }}
                                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717]"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[11px] font-semibold text-[#525252] mb-0.5">Price</label>
                                  <input
                                    type="text"
                                    value={card.price}
                                    onChange={(e) => {
                                      const next = [...oppCards];
                                      next[idx].price = e.target.value;
                                      setOppCards(next);
                                    }}
                                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-[#525252] mb-0.5">Image URL</label>
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={card.image || '/thevalley.png'}
                                      alt="Thumbnail"
                                      className="w-8 h-8 rounded-lg object-cover border border-[#E5E0D8] shrink-0"
                                      onError={(e) => (e.currentTarget.src = '/thevalley.png')}
                                    />
                                    <input
                                      type="text"
                                      value={card.image}
                                      onChange={(e) => {
                                        const next = [...oppCards];
                                        next[idx].image = e.target.value;
                                        setOppCards(next);
                                      }}
                                      className="w-full bg-white border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs font-mono text-[#171717]"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: TRENDING / EXPLORE COMMUNITY */}
                  {activeSectionTab === 'community' && (
                    <div className="space-y-6">
                      <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-[#171717]">Trending & Explore Community</h3>
                        </div>
                        <span className="text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 px-3 py-1 rounded-full border border-[#BFA16A]/30">
                          Section 4
                        </span>
                      </div>

                      {/* Heading & Tagline Inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">Section Heading</label>
                          <input
                            type="text"
                            value={commHeading}
                            onChange={(e) => setCommHeading(e.target.value)}
                            placeholder="Explore by Community"
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-semibold focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">Tagline / Badge</label>
                          <input
                            type="text"
                            value={commTagline}
                            onChange={(e) => setCommTagline(e.target.value)}
                            placeholder="e.g. FEATURED DISTRICTS"
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>
                      </div>

                      {/* Content Textarea */}
                      <div>
                        <label className="block text-xs font-semibold text-[#525252] mb-1">Content / Description</label>
                        <textarea
                          rows={3}
                          value={commContentText}
                          onChange={(e) => setCommContentText(e.target.value)}
                          placeholder="Discover master-planned developments and luxury waterfront neighborhoods..."
                          className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                        />
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#171717]">Communities ({commList.length})</h4>
                          <button
                            type="button"
                            onClick={() => {
                              setCommList([
                                ...commList,
                                { name: 'New Community', icon: '/valleyicon.png', href: '#' },
                              ]);
                            }}
                            className="px-3 py-1.5 text-xs font-bold text-[#BFA16A] bg-[#BFA16A]/10 hover:bg-[#BFA16A]/20 rounded-lg transition cursor-pointer"
                          >
                            + Add Community
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {commList.map((c, idx) => (
                            <div key={idx} className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-3 relative">
                              <button
                                type="button"
                                onClick={() => setCommList(commList.filter((_, i) => i !== idx))}
                                className="absolute top-2 right-2 text-rose-500 hover:text-rose-700 text-xs font-bold cursor-pointer"
                              >
                                ✕
                              </button>
                              <div>
                                <label className="block text-xs font-semibold text-[#525252] mb-1">Community Name</label>
                                <input
                                  type="text"
                                  value={c.name}
                                  onChange={(e) => {
                                    const next = [...commList];
                                    next[idx].name = e.target.value;
                                    setCommList(next);
                                  }}
                                  className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                />
                              </div>
                              <div>
                                <IconDropdownSelect
                                  label="Community Icon (From Global Icons Library)"
                                  value={c.icon}
                                  onChange={(val) => {
                                    const next = [...commList];
                                    next[idx].icon = val;
                                    setCommList(next);
                                  }}
                                  icons={iconsList}
                                  placeholder="Select community icon..."
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: OFF-PLAN LONG CONTENT GUIDE */}
                  {activeSectionTab === 'long-content' && (
                    <div className="space-y-6">
                      <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-[#171717]">Off-Plan Long Content Guide</h3>
                        </div>
                        <span className="text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 px-3 py-1 rounded-full border border-[#BFA16A]/30">
                          Section 5
                        </span>
                      </div>

                      {/* Summernote / Jodit WYSIWYG Editor for Long Content */}
                      <RichTextSummernote
                        label="Article / Guide Content (Rich-Text)"
                        value={longContentDetail}
                        onChange={(val) => setLongContentDetail(val)}
                        placeholder="Write or format comprehensive off-plan real estate guide content with headings, lists, and images..."
                        minHeight="380px"
                      />

                      {/* Section Cover Image */}
                      <CoverImagePicker
                        label="Section Background / Cover Image (Optional)"
                        imageUrl={longContentBgImage}
                        onChange={(url) => setLongContentBgImage(url)}
                        onFileUpload={handleFileUpload}
                      />
                    </div>
                  )}

                  {/* TAB 6: CLIENT REVIEWS */}
                  {activeSectionTab === 'reviews' && (

                    <div className="space-y-6">
                      <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-[#171717]">Client Reviews</h3>
                        </div>
                        <span className="text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 px-3 py-1 rounded-full border border-[#BFA16A]/30">
                          Section 5
                        </span>
                      </div>

                      {/* Heading & Tagline Inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">Section Heading</label>
                          <input
                            type="text"
                            value={reviewsHeading}
                            onChange={(e) => setReviewsHeading(e.target.value)}
                            placeholder="What Our Clients Say"
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-semibold focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">Tagline / Badge</label>
                          <input
                            type="text"
                            value={reviewsTagline}
                            onChange={(e) => setReviewsTagline(e.target.value)}
                            placeholder="e.g. FROM CLIENT TESTIMONIALS"
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>
                      </div>

                      {/* Content Textarea */}
                      <div>
                        <label className="block text-xs font-semibold text-[#525252] mb-1">Content / Description</label>
                        <textarea
                          rows={3}
                          value={reviewsIntroText}
                          onChange={(e) => setReviewsIntroText(e.target.value)}
                          placeholder="Verified experiences from global investors and residents who achieved their real estate goals with FS Advisory..."
                          className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#171717]">Reviews List ({reviewsList.length})</h4>
                          <button
                            type="button"
                            onClick={() => {
                              setReviewsList([
                                ...reviewsList,
                                {
                                  id: String(Date.now()),
                                  name: 'Client Name',
                                  role: 'Verified Client',
                                  content: 'Exceptional service and advisory assistance in securing our dream home.',
                                  rating: 5,
                                },
                              ]);
                            }}
                            className="px-3 py-1.5 text-xs font-bold text-[#BFA16A] bg-[#BFA16A]/10 hover:bg-[#BFA16A]/20 rounded-lg transition"
                          >
                            + Add Review
                          </button>
                        </div>

                        <div className="space-y-3">
                          {reviewsList.map((rev, idx) => (
                            <div key={rev.id || idx} className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-2 relative">
                              <button
                                type="button"
                                onClick={() => setReviewsList(reviewsList.filter((_, i) => i !== idx))}
                                className="absolute top-3 right-3 text-rose-500 hover:text-rose-700 text-xs font-bold"
                              >
                                ✕
                              </button>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-[11px] font-semibold text-[#525252] mb-0.5">Author Name</label>
                                  <input
                                    type="text"
                                    value={rev.name}
                                    onChange={(e) => {
                                      const next = [...reviewsList];
                                      next[idx].name = e.target.value;
                                      setReviewsList(next);
                                    }}
                                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-[#525252] mb-0.5">Role / Badge</label>
                                  <input
                                    type="text"
                                    value={rev.role}
                                    onChange={(e) => {
                                      const next = [...reviewsList];
                                      next[idx].role = e.target.value;
                                      setReviewsList(next);
                                    }}
                                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-[#525252] mb-0.5">Rating (1-5)</label>
                                  <input
                                    type="number"
                                    min={1}
                                    max={5}
                                    value={rev.rating}
                                    onChange={(e) => {
                                      const next = [...reviewsList];
                                      next[idx].rating = Number(e.target.value);
                                      setReviewsList(next);
                                    }}
                                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717]"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-[#525252] mb-0.5">Review Message</label>
                                <textarea
                                  rows={2}
                                  value={rev.content}
                                  onChange={(e) => {
                                    const next = [...reviewsList];
                                    next[idx].content = e.target.value;
                                    setReviewsList(next);
                                  }}
                                  className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717]"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 7: BUYER GUIDE & FAQS */}
                  {activeSectionTab === 'faqs' && (
                    <div className="space-y-6">
                      <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-[#171717]">Buyer Guide & FAQs</h3>
                        </div>
                        <span className="text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 px-3 py-1 rounded-full border border-[#BFA16A]/30">
                          Section 6
                        </span>
                      </div>

                      {/* Heading & Tagline Inputs matching website screenshot */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">
                            Main Heading
                          </label>
                          <input
                            type="text"
                            value={faqsMainHeading}
                            onChange={(e) => setFaqsMainHeading(e.target.value)}
                            placeholder="Everything you need to know about UAE off-plan property"
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-semibold focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">
                            Tagline / Badge
                          </label>
                          <input
                            type="text"
                            value={faqsTagline}
                            onChange={(e) => setFaqsTagline(e.target.value)}
                            placeholder="e.g. UAE off-plan property · Buyer guide"
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>
                      </div>

                      {/* Content Textarea */}
                      <div>
                        <label className="block text-xs font-semibold text-[#525252] mb-1">
                          Content / Introductory Text
                        </label>
                        <textarea
                          rows={3}
                          value={faqsContentText}
                          onChange={(e) => setFaqsContentText(e.target.value)}
                          placeholder="Answers To The Questions We Hear Most From People Exploring An Off-Plan Purchase In The UAE — From How The Process Works To Ownership, Payment Plans, And What To Check Before You Commit."
                          className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                        />
                      </div>

                      {/* Section Cover Image */}
                      <CoverImagePicker
                        label="Cover Image"
                        imageUrl={faqsBgImage}
                        onChange={(url) => setFaqsBgImage(url)}
                        onFileUpload={handleFileUpload}
                      />

                      {/* FAQs items matching reference layout */}
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE1]">
                          <h4 className="text-sm font-bold text-[#4B3B60] uppercase tracking-wide">FAQS ({faqsList.length})</h4>
                          <button
                            type="button"
                            onClick={() => {
                              setFaqsList([
                                ...faqsList,
                                {
                                  id: String(Date.now()),
                                  question: 'New Question?',
                                  answer: 'Detailed explanation for prospective real estate buyers.',
                                },
                              ]);
                            }}
                            className="px-3.5 py-1.5 text-xs font-bold text-[#BFA16A] bg-[#BFA16A]/10 hover:bg-[#BFA16A]/20 rounded-xl transition border border-[#BFA16A]/30"
                          >
                            + Add FAQ Item
                          </button>
                        </div>

                        <div className="space-y-3">
                          {faqsList.map((faq, idx) => (
                            <div
                              key={faq.id || idx}
                              className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 p-2 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8]"
                            >
                              <div className="lg:w-2/5">
                                <input
                                  type="text"
                                  value={faq.question}
                                  onChange={(e) => {
                                    const next = [...faqsList];
                                    next[idx].question = e.target.value;
                                    setFaqsList(next);
                                  }}
                                  placeholder="Enter Question..."
                                  className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                />
                              </div>
                              <div className="flex-1">
                                <textarea
                                  rows={2}
                                  value={faq.answer}
                                  onChange={(e) => {
                                    const next = [...faqsList];
                                    next[idx].answer = e.target.value;
                                    setFaqsList(next);
                                  }}
                                  placeholder="Enter Answer..."
                                  className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#525252] focus:outline-none focus:border-[#BFA16A]"
                                />
                              </div>
                              <div className="flex items-center justify-end">
                                <button
                                  type="button"
                                  onClick={() => setFaqsList(faqsList.filter((_, i) => i !== idx))}
                                  title="Delete Question"
                                  className="w-9 h-9 rounded-xl bg-[#EB5757] hover:bg-[#D94545] text-white flex items-center justify-center font-bold text-xs shadow-xs transition shrink-0"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 8: ASSESSMENT & GOALS (For AI Assessment page) */}
                  {activeSectionTab === 'assessment' && (
                    <div className="space-y-6">
                      <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-[#171717]">AI Assessment &amp; Primary Goals</h3>
                        </div>
                        <span className="text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 px-3 py-1 rounded-full border border-[#BFA16A]/30">
                          AI Engine
                        </span>
                      </div>

                      {/* Question Heading & Tagline Inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">Question Heading</label>
                          <input
                            type="text"
                            value={assessmentHeading}
                            onChange={(e) => setAssessmentHeading(e.target.value)}
                            placeholder="What is your primary goal?"
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-semibold focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#525252] mb-1">Tagline / Badge</label>
                          <input
                            type="text"
                            value={assessmentTagline}
                            onChange={(e) => setAssessmentTagline(e.target.value)}
                            placeholder="e.g. AI ENGINE ASSESSMENT"
                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                          />
                        </div>
                      </div>

                      {/* Subheading / Helper Textarea */}
                      <div>
                        <label className="block text-xs font-semibold text-[#525252] mb-1">Subheading / Helper Text</label>
                        <textarea
                          rows={2}
                          value={assessmentSubheading}
                          onChange={(e) => setAssessmentSubheading(e.target.value)}
                          placeholder="This helps us tailor recommendations to what matters most to you..."
                          className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                        />
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#171717]">Goal Cards ({assessmentGoals.length})</h4>
                          <button
                            type="button"
                            onClick={() => {
                              setAssessmentGoals([
                                ...assessmentGoals,
                                {
                                  id: `goal-${Date.now()}`,
                                  title: 'New Goal',
                                  subtitle: 'Tailored recommendations for your objective.',
                                  icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.016-.941l.9-2.316A7.95 7.95 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>',
                                },
                              ]);
                            }}
                            className="px-3 py-1.5 text-xs font-bold text-[#BFA16A] bg-[#BFA16A]/10 hover:bg-[#BFA16A]/20 rounded-lg transition"
                          >
                            + Add Goal Card
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {assessmentGoals.map((g: any, idx) => (
                            <div key={g.id || idx} className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-3 relative">
                              <button
                                type="button"
                                onClick={() => setAssessmentGoals(assessmentGoals.filter((_, i) => i !== idx))}
                                className="absolute top-2.5 right-2.5 text-rose-500 hover:text-rose-700 text-xs font-bold"
                              >
                                ✕
                              </button>
                              <div>
                                <label className="block text-[11px] font-semibold text-[#525252] mb-0.5">Goal Title</label>
                                <input
                                  type="text"
                                  value={g.title}
                                  onChange={(e) => {
                                    const next = [...assessmentGoals];
                                    next[idx].title = e.target.value;
                                    setAssessmentGoals(next);
                                  }}
                                  className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#171717]"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-[#525252] mb-0.5">Subtitle / Description</label>
                                <textarea
                                  rows={2}
                                  value={g.subtitle}
                                  onChange={(e) => {
                                    const next = [...assessmentGoals];
                                    next[idx].subtitle = e.target.value;
                                    setAssessmentGoals(next);
                                  }}
                                  className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717]"
                                />
                              </div>
                              <div>
                                <IconDropdownSelect
                                  label="Goal Icon (From Global Icons Library)"
                                  value={g.icon || ''}
                                  onChange={(val) => {
                                    const next = [...assessmentGoals];
                                    next[idx].icon = val;
                                    setAssessmentGoals(next);
                                  }}
                                  icons={iconsList}
                                  placeholder="Select goal icon..."
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DYNAMIC UNIVERSAL SECTION EDITOR FOR ALL WEBSITE PAGES */}
                  {!['basic', 'hero', 'features', 'opportunities', 'community', 'reviews', 'faqs', 'assessment'].includes(activeSectionTab) && (
                    <div className="space-y-6">
                      {(() => {
                        const curSec = getPageSections(editingPage.slug).find((s) => s.id === activeSectionTab);
                        const secLabel = curSec?.label || 'Page Section';
                        const secDesc = curSec?.desc || 'Configure section copy, typography and background asset.';
                        const getDefaultSectionHtml = (secId: string, label: string, desc: string) => {
                          if (secId === 'buy-hero') {
                            return `<h1><span style="color:#1B2538">BUY IN DUBAI</span> <span style="color:#C2A468">WITH CLARITY</span></h1><p>A measured search process for buyers who want context, comparison and practical guidance.</p>`;
                          }
                          if (secId === 'buy-about') {
                            return `<h3>About R. Hills</h3>
<p>Reportage Hills is a premium townhouse community in Dubailand, situated close to Sheikh Zayed Bin Hamdan Al Nahyan Street (D54). The development will feature meticulously designed 3 to 5-bedroom townhouses with high-end finishes and thoughtful layouts. Each residence will boast double-glazed windows, private balconies and built-in wardrobes.</p>
<p>The family-friendly community will be equipped with exceptional amenities including a swimming pool, gym, kids' play areas and landscaped community spaces. Strategically located, Reportage Hills ensures easy access to key destinations such as Dubai Sports City, Global Village and Al Maktoum International Airport. Its unparalleled connectivity and lifestyle-focused offerings make it an excellent choice for families.</p>`;
                          }
                          if (secId === 'proj-main-guide') {
                            return DEFAULT_PROJECT_MAIN_GUIDE_HTML;
                          }
                          if (secId === 'buy-guide' || secId === 'dev-guide' || secId === 'comm-guide' || secId.endsWith('-guide')) {
                            return DEFAULT_OFFPLAN_GUIDE_HTML;
                          }
                          return `<h2>${label}</h2><p>${desc}</p>`;
                        };

                        const getDefaultSectionBg = (secId: string) => {
                          if (secId === 'buy-hero') return '/buy_hero.png';
                          if (secId === 'report-hero') return '/report_hero.png';
                          return editingPage.content?.hero?.backgroundImage || '/buy_hero.png';
                        };

                        const detailVal = getSectionDetail(
                          activeSectionTab,
                          getDefaultSectionHtml(activeSectionTab, secLabel, secDesc)
                        );
                        const bgVal = getSectionBg(
                          activeSectionTab,
                          getDefaultSectionBg(activeSectionTab)
                        );


                        const isLongContentSection = activeSectionTab.endsWith('-guide') || activeSectionTab.includes('editorial') || activeSectionTab === 'buy-about';
                        const isCommOverview = activeSectionTab === 'comm-overview';
                        const isCommAmenities = activeSectionTab === 'comm-amenities';
                        const isDevBrief = activeSectionTab === 'dev-brief';
                        const defaultSecTitle = isCommOverview
                          ? 'WATERFRONT CALM,\nCITY CONNECTION'
                          : isCommAmenities
                          ? 'EVERYDAY LIFE,\nCLOSE AT HAND'
                          : isDevBrief
                          ? 'EMAAR'
                          : activeSectionTab === 'report-hero'
                          ? 'YOUR ADVISORY REPORT'
                          : activeSectionTab === 'proj-main-hero'
                          ? 'OFF-PLAN PROPERTY\nFOR SALE IN DUBAI'
                          : secLabel;
                        const defaultSecTagline = isCommOverview
                          ? 'Community overview'
                          : isCommAmenities
                          ? 'COMMUNITY AMENITIES'
                          : isDevBrief
                          ? 'Developer Brief'
                          : activeSectionTab === 'report-hero'
                          ? 'ADVISORY REPORT'
                          : '';
                        const defaultSecContent = isCommOverview
                          ? 'Dubai Creek Harbour combines a relaxed waterfront lifestyle with a contemporary residential skyline, creating a setting that feels both modern and connected. Its walkable promenades, open waterfront views, landscaped spaces, and proximity to Downtown Dubai make the community appealing to both end users and investors. As the area continues to develop, the experience of living or investing can vary significantly from one building to another. Factors such as building position, view corridor, orientation, surrounding amenities, accessibility, and expected handover timing should therefore be carefully considered. Understanding the wider development plans and upcoming infrastructure is equally important, as these can influence both day-to-day convenience and long-term value. Comparing projects within the community helps identify not just the most attractive home, but the location and investment opportunity that best match your priorities.'
                          : isCommAmenities
                          ? 'Connected promenades, road networks and lifestyle amenities'
                          : isDevBrief
                          ? '74 off-plan projects on the live register, from 1.1m. every entry reads straight from the vila database: prices, payment plans, handover dates and photography.'
                          : activeSectionTab === 'report-hero'
                          ? 'Based on your goals and preferences'
                          : activeSectionTab === 'proj-main-hero'
                          ? "Discover Dubai's Most Promising Off-Plan\nCommunities, Homes & Investment Opportunities"
                          : '';

                        const titleVal = getSectionTitle(activeSectionTab, defaultSecTitle);
                        const taglineVal = getSectionTagline(activeSectionTab, defaultSecTagline);
                        const contentTextVal = getSectionContentText(activeSectionTab, defaultSecContent);

                        return (
                          <>
                            <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
                              <div>
                                <h3 className="text-xl font-bold text-[#171717]">{secLabel}</h3>
                              </div>
                              {(() => {
                                const allSections = getPageSections(editingPage.slug);
                                const sectionIndex = allSections.findIndex((s) => s.id === activeSectionTab);
                                return (
                                  <span className="text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 px-3 py-1 rounded-full border border-[#BFA16A]/30">
                                    {editingPage.slug} • Section #{sectionIndex >= 0 ? sectionIndex + 1 : 1}
                                  </span>
                                );
                              })()}
                            </div>

                            {activeSectionTab === 'proj-video' && (
                              <div
                                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                                  customSectionsData['proj-video']?.hideSection
                                    ? 'bg-rose-50/70 border-rose-200'
                                    : 'bg-[#FAF9F6] border-[#E5E0D8]'
                                }`}
                              >
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                                      Video Section Visibility
                                    </span>
                                    <span
                                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full border ${
                                        customSectionsData['proj-video']?.hideSection
                                          ? 'bg-rose-100 text-rose-700 border-rose-200'
                                          : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                      }`}
                                    >
                                      {customSectionsData['proj-video']?.hideSection ? 'Hidden on Website' : 'Visible on Website'}
                                    </span>
                                  </div>
                                  <p className="text-xs text-[#737373]">
                                    Toggle this option to completely hide or show the Video Showcase section on the project detail page.
                                  </p>
                                </div>

                                <label className="inline-flex items-center gap-3 cursor-pointer select-none shrink-0">
                                  <input
                                    type="checkbox"
                                    checked={Boolean(customSectionsData['proj-video']?.hideSection)}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      setCustomSectionsData((prev) => ({
                                        ...prev,
                                        'proj-video': {
                                          ...(prev['proj-video'] || {}),
                                          hideSection: checked,
                                        },
                                      }));
                                    }}
                                    className="sr-only peer"
                                  />
                                  <div className="relative w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600" />
                                  <span className="text-xs font-semibold text-[#171717]">
                                    {customSectionsData['proj-video']?.hideSection ? 'Section Hidden' : 'Hide Video Section'}
                                  </span>
                                </label>
                              </div>
                            )}

                            {/* Long content guides retain RichTextSummernote, while normal sections use Heading input, Tagline input, and Content textarea */}
                            {isLongContentSection ? (
                              <RichTextSummernote
                                label="Long Content Guide / Article Content (Rich-Text)"
                                value={detailVal}
                                onChange={(val) => setSectionDetail(activeSectionTab, val)}
                                placeholder={`Write formatted comprehensive content for ${secLabel}...`}
                                minHeight="340px"
                              />
                            ) : activeSectionTab === 'proj-main-content' ? (
                              /* PROJECTS CATALOG INTRO PARAGRAPH EDITOR */
                              <div className="space-y-2">
                                <label className="block text-xs font-semibold text-[#525252] mb-1">
                                  Content / Description
                                </label>
                                <textarea
                                  rows={8}
                                  value={
                                    customSectionsData['proj-main-content']?.description ??
                                    "Explore Dubai’s complete range of off-plan properties in one place, including apartments, villas, townhouses, and penthouses from some of the city’s leading developers. Compare projects by launch price, payment plan, expected handover, location, developer, and property type to find an opportunity that matches your lifestyle or investment goals. Off-plan properties can offer access to new communities and modern developments at attractive launch prices, with flexible payment structures that allow buyers to spread payments throughout the construction period. Whether you are looking for a future home, a high-growth investment, or a property with strong rental potential, comparing projects carefully can help you make a more informed decision."
                                  }
                                  onChange={(e) =>
                                    setCustomSectionsData((prev) => ({
                                      ...prev,
                                      'proj-main-content': {
                                        ...(prev['proj-main-content'] || {}),
                                        description: e.target.value,
                                      },
                                    }))
                                  }
                                  placeholder="Section content / description..."
                                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm text-[#171717] leading-relaxed focus:outline-none focus:border-[#BFA16A] resize-y"
                                />
                              </div>
                            ) : activeSectionTab === 'proj-main-hero' ? (
                              /* PROJECT MAIN HERO & SEARCH BAR LABELS EDITOR */
                              <div className="space-y-6">
                                {(() => {
                                  const secData = customSectionsData['proj-main-hero'] || {};
                                  const updateHero = (key: string, val: any) => {
                                    setCustomSectionsData((prev) => ({
                                      ...prev,
                                      'proj-main-hero': {
                                        ...(prev['proj-main-hero'] || {}),
                                        [key]: val,
                                      },
                                    }));
                                  };

                                  return (
                                    <>
                                      {/* Hero Headings */}
                                      <div className="p-5 bg-[#FAF9F6] border border-[#E5E0D8] rounded-2xl space-y-4">
                                        <div className="border-b border-[#E5E0D8] pb-3">
                                          <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                                            Off-Plan Projects Hub Hero Titles
                                          </h4>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div>
                                            <label className="block text-xs font-semibold text-[#525252] mb-1">
                                              Title Line 1 (Dark Text)
                                            </label>
                                            <input
                                              type="text"
                                              value={secData.titleLine1 ?? 'OFF-PLAN PROPERTY'}
                                              onChange={(e) => updateHero('titleLine1', e.target.value)}
                                              placeholder="OFF-PLAN PROPERTY"
                                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-serif uppercase tracking-wider focus:outline-none focus:border-[#BFA16A]"
                                            />
                                          </div>

                                          <div>
                                            <label className="block text-xs font-semibold text-[#BFA16A] mb-1">
                                              Title Line 2 (Highlighted Gold)
                                            </label>
                                            <input
                                              type="text"
                                              value={secData.titleLine2 ?? 'FOR SALE IN DUBAI'}
                                              onChange={(e) => updateHero('titleLine2', e.target.value)}
                                              placeholder="FOR SALE IN DUBAI"
                                              className="w-full bg-white border border-[#BFA16A]/50 rounded-xl px-4 py-2.5 text-sm text-[#BFA16A] font-serif uppercase tracking-wider font-bold focus:outline-none focus:border-[#BFA16A]"
                                            />
                                          </div>
                                        </div>

                                        <div>
                                          <label className="block text-xs font-semibold text-[#525252] mb-1">
                                            Description
                                          </label>
                                          <textarea
                                            rows={3}
                                            value={
                                              secData.description ??
                                              ([secData.descriptionLine1, secData.descriptionLine2].filter(Boolean).join(' ') ||
                                                "Discover Dubai's Most Promising Off-Plan Communities, Homes & Investment Opportunities")
                                            }
                                            onChange={(e) => updateHero('description', e.target.value)}
                                            placeholder="Discover Dubai's Most Promising Off-Plan Communities, Homes & Investment Opportunities"
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A] resize-y"
                                          />
                                        </div>
                                      </div>

                                      {/* Search Bar Filter Titles */}
                                      <div className="p-5 bg-white border border-[#E5E0D8] rounded-2xl space-y-4">
                                        <div className="border-b border-[#E5E0D8] pb-3">
                                          <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                                            Floating Search Bar Titles
                                          </h4>
                                          <p className="text-xs text-[#737373] mt-0.5">
                                            Change the title labels of the 4 filter columns in the search bar.
                                          </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                          <div>
                                            <label className="block text-xs font-semibold text-[#525252] mb-1">
                                              Field 1 Title (Location)
                                            </label>
                                            <input
                                              type="text"
                                              value={secData.locationTitle ?? 'Location'}
                                              onChange={(e) => updateHero('locationTitle', e.target.value)}
                                              placeholder="Location"
                                              className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                            />
                                          </div>

                                          <div>
                                            <label className="block text-xs font-semibold text-[#525252] mb-1">
                                              Field 2 Title (Property Type)
                                            </label>
                                            <input
                                              type="text"
                                              value={secData.propertyTypeTitle ?? 'Property type'}
                                              onChange={(e) => updateHero('propertyTypeTitle', e.target.value)}
                                              placeholder="Property type"
                                              className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                            />
                                          </div>

                                          <div>
                                            <label className="block text-xs font-semibold text-[#525252] mb-1">
                                              Field 3 Title (Budget)
                                            </label>
                                            <input
                                              type="text"
                                              value={secData.budgetTitle ?? 'Budget'}
                                              onChange={(e) => updateHero('budgetTitle', e.target.value)}
                                              placeholder="Budget"
                                              className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                            />
                                          </div>

                                          <div>
                                            <label className="block text-xs font-semibold text-[#525252] mb-1">
                                              Field 4 Title (Handover)
                                            </label>
                                            <input
                                              type="text"
                                              value={secData.handoverTitle ?? 'Handover'}
                                              onChange={(e) => updateHero('handoverTitle', e.target.value)}
                                              placeholder="Handover"
                                              className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      {/* Hero Cover Image */}
                                      <CoverImagePicker
                                        label="Section Background / Skyline Cover Image"
                                        imageUrl={secData.bgImage || secData.backgroundImage || ''}
                                        onChange={(url) => updateHero('bgImage', url)}
                                        onFileUpload={handleFileUpload}
                                      />
                                    </>
                                  );
                                })()}
                              </div>
                            ) : activeSectionTab === 'report-score' ? (
                              /* OVERALL MATCH SCORE EDITOR FOR ADVISORY REPORT */
                              <div className="space-y-6">
                                {(() => {
                                  const secData = customSectionsData['report-score'] || {};
                                  const updateSec = (field: string, val: any) => {
                                    setCustomSectionsData((prev) => ({
                                      ...prev,
                                      'report-score': {
                                        ...(prev['report-score'] || {}),
                                        [field]: val,
                                      },
                                    }));
                                  };

                                  return (
                                    <>
                                      {/* Left Card: Heading, Main Overall Score, Match Label */}
                                      <div className="p-5 bg-[#FAF9F6] border border-[#E5E0D8] rounded-2xl space-y-4">
                                        <h4 className="text-xs font-bold text-[#BFA16A] uppercase tracking-wider">
                                          Match Score Card (Left Column)
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                          <div>
                                            <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                              Section Heading
                                            </label>
                                            <input
                                              type="text"
                                              value={secData.heading ?? 'Overall Match Score'}
                                              onChange={(e) => updateSec('heading', e.target.value)}
                                              placeholder="Overall Match Score"
                                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] font-semibold focus:outline-none focus:border-[#BFA16A]"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-[11px] font-semibold text-[#BFA16A] mb-1">
                                              Overall Match Score Box (e.g. 96%)
                                            </label>
                                            <input
                                              type="text"
                                              value={secData.matchScore ?? '96%'}
                                              onChange={(e) => updateSec('matchScore', e.target.value)}
                                              placeholder="96%"
                                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                              Match Status Subtitle
                                            </label>
                                            <input
                                              type="text"
                                              value={secData.matchLabel ?? 'Excellent Match'}
                                              onChange={(e) => updateSec('matchLabel', e.target.value)}
                                              placeholder="Excellent Match"
                                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      {/* 4 Radar Metric Numbers & Titles (5 Text Boxes in Total with Main Score) */}
                                      <div className="p-5 bg-white border border-[#E5E0D8] rounded-2xl space-y-4">
                                        <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
                                          <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                                            Radar Chart 4 Score Axes
                                          </h4>
                                          <span className="text-[11px] text-[#BFA16A] font-medium">4 Dimensions</span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                          {/* Top: Family Living */}
                                          <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-2">
                                            <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wide block">
                                              1. Top Axis
                                            </span>
                                            <div>
                                              <label className="block text-[10px] text-[#525252] font-semibold mb-0.5">
                                                Score Number
                                              </label>
                                              <input
                                                type="text"
                                                value={secData.familyLivingScore ?? '96'}
                                                onChange={(e) => updateSec('familyLivingScore', e.target.value)}
                                                className="w-full bg-white border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#171717]"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-[10px] text-[#525252] font-semibold mb-0.5">
                                                Label
                                              </label>
                                              <input
                                                type="text"
                                                value={secData.familyLivingLabel ?? 'Family Living'}
                                                onChange={(e) => updateSec('familyLivingLabel', e.target.value)}
                                                className="w-full bg-white border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs text-[#171717]"
                                              />
                                            </div>
                                          </div>

                                          {/* Right: Passive Inc */}
                                          <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-2">
                                            <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wide block">
                                              2. Right Axis
                                            </span>
                                            <div>
                                              <label className="block text-[10px] text-[#525252] font-semibold mb-0.5">
                                                Score Number
                                              </label>
                                              <input
                                                type="text"
                                                value={secData.passiveIncScore ?? '81'}
                                                onChange={(e) => updateSec('passiveIncScore', e.target.value)}
                                                className="w-full bg-white border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#171717]"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-[10px] text-[#525252] font-semibold mb-0.5">
                                                Label
                                              </label>
                                              <input
                                                type="text"
                                                value={secData.passiveIncLabel ?? 'Passive Inc'}
                                                onChange={(e) => updateSec('passiveIncLabel', e.target.value)}
                                                className="w-full bg-white border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs text-[#171717]"
                                              />
                                            </div>
                                          </div>

                                          {/* Bottom: Capital Growth */}
                                          <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-2">
                                            <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wide block">
                                              3. Bottom Axis
                                            </span>
                                            <div>
                                              <label className="block text-[10px] text-[#525252] font-semibold mb-0.5">
                                                Score Number
                                              </label>
                                              <input
                                                type="text"
                                                value={secData.capitalGrowthScore ?? '90'}
                                                onChange={(e) => updateSec('capitalGrowthScore', e.target.value)}
                                                className="w-full bg-white border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#171717]"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-[10px] text-[#525252] font-semibold mb-0.5">
                                                Label
                                              </label>
                                              <input
                                                type="text"
                                                value={secData.capitalGrowthLabel ?? 'Capital Growth'}
                                                onChange={(e) => updateSec('capitalGrowthLabel', e.target.value)}
                                                className="w-full bg-white border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs text-[#171717]"
                                              />
                                            </div>
                                          </div>

                                          {/* Left: Lifestyle */}
                                          <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-2">
                                            <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wide block">
                                              4. Left Axis
                                            </span>
                                            <div>
                                              <label className="block text-[10px] text-[#525252] font-semibold mb-0.5">
                                                Score Number
                                              </label>
                                              <input
                                                type="text"
                                                value={secData.lifestyleScore ?? '93'}
                                                onChange={(e) => updateSec('lifestyleScore', e.target.value)}
                                                className="w-full bg-white border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#171717]"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-[10px] text-[#525252] font-semibold mb-0.5">
                                                Label
                                              </label>
                                              <input
                                                type="text"
                                                value={secData.lifestyleLabel ?? 'Lifestyle'}
                                                onChange={(e) => updateSec('lifestyleLabel', e.target.value)}
                                                className="w-full bg-white border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs text-[#171717]"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Icon Upload & Size Selector Control */}
                                      <div className="p-5 bg-white border border-[#E5E0D8] rounded-2xl space-y-4">
                                        <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
                                          <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                                            Radar Chart Diagram Icon &amp; Display Size
                                          </h4>
                                          <span className="text-[11px] text-[#737373]">
                                            Current Size: <strong className="text-[#BFA16A]">{secData.iconSize ?? 340}px</strong>
                                          </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                          {/* Icon Picker / Upload */}
                                          <CoverImagePicker
                                            label="Radar Icon / Diagram Asset"
                                            imageUrl={secData.iconUrl ?? secData.bgImage ?? '/Layer_1 (3).png'}
                                            onChange={(url) => {
                                              updateSec('iconUrl', url);
                                              updateSec('bgImage', url);
                                            }}
                                            onFileUpload={handleFileUpload}
                                          />

                                          {/* Icon Size Controller */}
                                          <div className="p-4 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl space-y-3">
                                            <label className="block text-xs font-bold text-[#171717]">
                                              Icon Size (Pixels)
                                            </label>
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="range"
                                                min="150"
                                                max="500"
                                                step="10"
                                                value={secData.iconSize ?? 340}
                                                onChange={(e) => updateSec('iconSize', Number(e.target.value))}
                                                className="flex-1 accent-[#BFA16A] cursor-pointer"
                                              />
                                              <div className="flex items-center gap-1">
                                                <input
                                                  type="number"
                                                  min="100"
                                                  max="600"
                                                  value={secData.iconSize ?? 340}
                                                  onChange={(e) => updateSec('iconSize', Number(e.target.value))}
                                                  className="w-20 bg-white border border-[#E5E0D8] rounded-lg px-2.5 py-1 text-xs text-center font-bold text-[#171717]"
                                                />
                                                <span className="text-xs text-[#737373]">px</span>
                                              </div>
                                            </div>
                                            <p className="text-[11px] text-[#737373]">
                                              Adjust the slider or enter exact pixel value to scale the radar chart icon size on the page.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                            ) : activeSectionTab === 'valley-highlights' ? (
                              /* VALLEY HIGHLIGHTS & ACTION BUTTONS EDITOR */
                              <div className="space-y-6">
                                {(() => {
                                  const secData = customSectionsData['valley-highlights'] || {};
                                  const updateSec = (key: string, val: any) => {
                                    setCustomSectionsData((prev) => ({
                                      ...prev,
                                      'valley-highlights': {
                                        ...(prev['valley-highlights'] || {}),
                                        [key]: val,
                                      },
                                    }));
                                  };

                                  const items: any[] = secData.items || [
                                    {
                                      id: '1',
                                      icon: '/families.png',
                                      title: 'Great for families',
                                      description: 'Parks, schools &\nfamily amenities',
                                    },
                                    {
                                      id: '2',
                                      icon: '/fs score.png',
                                      title: 'Strong growth',
                                      description: 'High demand area with\nfuture infrastructure',
                                    },
                                    {
                                      id: '3',
                                      icon: '/exp guidance.png',
                                      title: 'Trusted developer',
                                      description: "Emaar's proven\ntrack record",
                                    },
                                  ];

                                  const updateItem = (index: number, field: string, val: any) => {
                                    const nextItems = [...items];
                                    nextItems[index] = { ...nextItems[index], [field]: val };
                                    updateSec('items', nextItems);
                                  };

                                  const addItem = () => {
                                    const nextItems = [
                                      ...items,
                                      {
                                        id: Date.now().toString(),
                                        icon: '/families.png',
                                        title: 'New Highlight',
                                        description: 'Highlight feature details',
                                      },
                                    ];
                                    updateSec('items', nextItems);
                                  };

                                  const removeItem = (index: number) => {
                                    const nextItems = items.filter((_, i) => i !== index);
                                    updateSec('items', nextItems);
                                  };

                                  return (
                                    <>
                                      {/* Highlight Cards Header */}
                                      <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                                        <div>
                                          <h3 className="text-sm font-bold text-[#171717] tracking-tight">
                                            Highlight Feature Cards
                                          </h3>
                                          <p className="text-xs text-[#737373] mt-0.5">
                                            Configure the feature cards with icons from your Global Icons library, titles, and descriptions.
                                          </p>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={addItem}
                                          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs flex items-center gap-1.5"
                                        >
                                          <span>+</span> Add Card
                                        </button>
                                      </div>

                                      {/* Highlight Cards Grid */}
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {items.map((item, idx) => (
                                          <div
                                            key={item.id || idx}
                                            className="p-4 bg-white border border-[#E5E0D8] rounded-2xl shadow-xs space-y-3 relative group"
                                          >
                                            <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE6]">
                                              <span className="text-xs font-bold text-[#BFA16A]">
                                                Card #{idx + 1}
                                              </span>
                                              {items.length > 1 && (
                                                <button
                                                  type="button"
                                                  onClick={() => removeItem(idx)}
                                                  className="text-red-500 hover:text-red-700 text-xs font-medium px-2 py-0.5 rounded hover:bg-red-50 transition"
                                                >
                                                  Delete
                                                </button>
                                              )}
                                            </div>

                                            {/* Icon Dropdown Selector */}
                                            <div>
                                              <label className="block text-xs font-semibold text-[#525252] mb-1.5">
                                                Select Icon
                                              </label>
                                              <IconDropdownSelect
                                                value={item.icon || '/families.png'}
                                                onChange={(val) => updateItem(idx, 'icon', val)}
                                                icons={iconsList}
                                              />
                                            </div>

                                            {/* Title */}
                                            <div>
                                              <label className="block text-xs font-semibold text-[#525252] mb-1">
                                                Title / Heading
                                              </label>
                                              <input
                                                type="text"
                                                value={item.title || ''}
                                                onChange={(e) => updateItem(idx, 'title', e.target.value)}
                                                placeholder="e.g. Great for families"
                                                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                              />
                                            </div>

                                            {/* Description */}
                                            <div>
                                              <label className="block text-xs font-semibold text-[#525252] mb-1">
                                                Description
                                              </label>
                                              <textarea
                                                rows={2}
                                                value={item.description || ''}
                                                onChange={(e) => updateItem(idx, 'description', e.target.value)}
                                                placeholder="e.g. Parks, schools & family amenities"
                                                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                              />
                                            </div>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Action Buttons Customization */}
                                      <div className="p-5 bg-white border border-[#E5E0D8] rounded-2xl space-y-4">
                                        <div className="border-b border-[#E5E0D8] pb-3">
                                          <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                                            Action Buttons (Bottom of Section)
                                          </h4>
                                          <p className="text-xs text-[#737373] mt-0.5">
                                            Customize the primary and secondary call-to-action button labels and destination links.
                                          </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          {/* Primary Button */}
                                          <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-3">
                                            <div className="flex items-center gap-2">
                                              <span className="w-2.5 h-2.5 rounded-full bg-[#BFA16A]"></span>
                                              <span className="text-xs font-bold text-[#171717] uppercase tracking-wide">
                                                Primary Button (Gold Filled)
                                              </span>
                                            </div>
                                            <div>
                                              <label className="block text-xs font-semibold text-[#525252] mb-1">
                                                Button Text
                                              </label>
                                              <input
                                                type="text"
                                                value={secData.primaryBtnText ?? 'View Available Properties'}
                                                onChange={(e) => updateSec('primaryBtnText', e.target.value)}
                                                className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-xs font-semibold text-[#525252] mb-1">
                                                Button Link URL
                                              </label>
                                              <input
                                                type="text"
                                                value={secData.primaryBtnLink ?? '/property-detail'}
                                                onChange={(e) => updateSec('primaryBtnLink', e.target.value)}
                                                placeholder="/property-detail"
                                                className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                              />
                                            </div>
                                          </div>

                                          {/* Secondary Button */}
                                          <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-3">
                                            <div className="flex items-center gap-2">
                                              <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                                              <span className="text-xs font-bold text-[#171717] uppercase tracking-wide">
                                                Secondary Button (Outline)
                                              </span>
                                            </div>
                                            <div>
                                              <label className="block text-xs font-semibold text-[#525252] mb-1">
                                                Button Text
                                              </label>
                                              <input
                                                type="text"
                                                value={secData.secondaryBtnText ?? 'Compare Community'}
                                                onChange={(e) => updateSec('secondaryBtnText', e.target.value)}
                                                className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-xs font-semibold text-[#525252] mb-1">
                                                Button Link URL
                                              </label>
                                              <input
                                                type="text"
                                                value={secData.secondaryBtnLink ?? '/compare-communities'}
                                                onChange={(e) => updateSec('secondaryBtnLink', e.target.value)}
                                                placeholder="/compare-communities"
                                                className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                            ) : activeSectionTab === 'proj-floorplans' ? (
                              /* FLOOR PLAN EDITOR MATCHING USER SCREENSHOT IMAGE 2 */
                              <div className="space-y-6">
                                {/* Title Input */}
                                <div>
                                  <label className="block text-xs font-semibold text-[#525252] mb-1.5">
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    value={customSectionsData['proj-floorplans']?.title ?? titleVal}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setCustomSectionsData((prev) => ({
                                        ...prev,
                                        'proj-floorplans': {
                                          ...(prev['proj-floorplans'] || {}),
                                          title: val,
                                        },
                                      }));
                                    }}
                                    placeholder="Saima Mangrove floor Plan"
                                    className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-semibold focus:outline-none focus:border-[#BFA16A]"
                                  />
                                </div>

                                {/* Description Textarea */}
                                <div>
                                  <label className="block text-xs font-semibold text-[#525252] mb-1.5">
                                    Description
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={
                                      customSectionsData['proj-floorplans']?.description ??
                                      customSectionsData['proj-floorplans']?.contentText ??
                                      contentTextVal
                                    }
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setCustomSectionsData((prev) => ({
                                        ...prev,
                                        'proj-floorplans': {
                                          ...(prev['proj-floorplans'] || {}),
                                          description: val,
                                          contentText: val,
                                        },
                                      }));
                                    }}
                                    placeholder="Saima Mangrove Residences is a modern high-rise residential development comprising Ground + 31 floors..."
                                    className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                  />
                                </div>

                                {/* Bed Room Details Subheading */}
                                <div className="pt-2 border-t border-[#E5E0D8]">
                                  <div className="flex items-center justify-between pb-3">
                                    <h4 className="text-lg font-bold text-[#171717]">
                                      Bed Room Details
                                    </h4>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const currentItems = customSectionsData['proj-floorplans']?.items || [
                                          {
                                            id: '1',
                                            bedrooms: '1',
                                            bed: '1',
                                            bathrooms: '1.5',
                                            propertyType: 'Apartment',
                                            startingPrice: 'AED 1,250,000',
                                            minSize: '785',
                                            maxSize: '950',
                                            description: '1 Bedroom luxury layout with private balcony.',
                                            image: '',
                                          },
                                        ];
                                        const nextBedNum = currentItems.length + 1;
                                        const newItem = {
                                          id: String(Date.now()),
                                          bedrooms: String(nextBedNum),
                                          bed: String(nextBedNum),
                                          bathrooms: String(nextBedNum),
                                          propertyType: 'Apartment',
                                          startingPrice: 'AED 1,500,000',
                                          minSize: '1,200',
                                          maxSize: '2,200',
                                          description: `Experience the ${nextBedNum} Bedroom Apartment at ${editingPage?.title || 'the development'}, designed with spacious rooms and high-end finishes.`,
                                          image: '',
                                        };
                                        setCustomSectionsData((prev) => ({
                                          ...prev,
                                          'proj-floorplans': {
                                            ...(prev['proj-floorplans'] || {}),
                                            items: [...currentItems, newItem],
                                          },
                                        }));
                                      }}
                                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs flex items-center gap-1.5"
                                    >
                                      <span>+</span> Add Bedroom Detail
                                    </button>
                                  </div>

                                  {/* Bedroom Cards List */}
                                  <div className="space-y-5">
                                    {(() => {
                                      const bedroomItems: any[] =
                                        customSectionsData['proj-floorplans']?.items || [
                                          {
                                            id: '1',
                                            bedrooms: '1',
                                            bed: '1',
                                            bathrooms: '1.5',
                                            propertyType: 'Apartment',
                                            startingPrice: 'AED 1,250,000',
                                            minSize: '785',
                                            maxSize: '950',
                                            description: 'Experience the 1 Bedroom Apartment designed with modern open plan and balcony.',
                                            image: '',
                                          },
                                          {
                                            id: '2',
                                            bedrooms: '2',
                                            bed: '2',
                                            bathrooms: '2.5',
                                            propertyType: 'Apartment',
                                            startingPrice: 'AED 2,150,000',
                                            minSize: '1,320',
                                            maxSize: '1,550',
                                            description: 'Experience the 2 Bedroom Apartment featuring panoramic views and expansive terraces.',
                                            image: '',
                                          },
                                          {
                                            id: '3',
                                            bedrooms: '3',
                                            bed: '3',
                                            bathrooms: '3.5',
                                            propertyType: 'Apartment',
                                            startingPrice: 'AED 2,980,000',
                                            minSize: '1,850',
                                            maxSize: '2,400',
                                            description: 'Experience the 3 Bedroom Apartment designed with spacious rooms and luxury fittings.',
                                            image: '',
                                          },
                                        ];

                                      const updateBedField = (idx: number, field: string, val: any) => {
                                        const nextList = [...bedroomItems];
                                        nextList[idx] = {
                                          ...nextList[idx],
                                          [field]: val,
                                        };
                                        if (field === 'bedrooms') nextList[idx].bed = val;
                                        setCustomSectionsData((prev) => ({
                                          ...prev,
                                          'proj-floorplans': {
                                            ...(prev['proj-floorplans'] || {}),
                                            items: nextList,
                                          },
                                        }));
                                      };

                                      const removeBedItem = (idx: number) => {
                                        const nextList = bedroomItems.filter((_, i) => i !== idx);
                                        setCustomSectionsData((prev) => ({
                                          ...prev,
                                          'proj-floorplans': {
                                            ...(prev['proj-floorplans'] || {}),
                                            items: nextList,
                                          },
                                        }));
                                      };

                                      return (
                                        <>
                                          {bedroomItems.map((item, idx) => (
                                            <div
                                              key={item.id || idx}
                                              className="bg-[#FAF9F6] border border-[#E5E0D8] rounded-2xl p-5 space-y-4 relative"
                                            >
                                              {/* Row 1: 5 Inputs matching Image 2 */}
                                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
                                                <div>
                                                  <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                    No. of Bedrooms
                                                  </label>
                                                  <input
                                                    type="text"
                                                    value={item.bedrooms || item.bed || ''}
                                                    onChange={(e) => updateBedField(idx, 'bedrooms', e.target.value)}
                                                    placeholder="3"
                                                    className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                                  />
                                                </div>

                                                <div>
                                                  <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                    No. of Bathroom
                                                  </label>
                                                  <input
                                                    type="text"
                                                    value={item.bathrooms || ''}
                                                    onChange={(e) => updateBedField(idx, 'bathrooms', e.target.value)}
                                                    placeholder="Enter no.of bathroo"
                                                    className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                                  />
                                                </div>

                                                <div>
                                                  <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                    Property Type
                                                  </label>
                                                  <select
                                                    value={item.propertyType || item.type || 'Apartment'}
                                                    onChange={(e) => updateBedField(idx, 'propertyType', e.target.value)}
                                                    className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                                  >
                                                    <option value="Apartment">Apartment</option>
                                                    <option value="Villa">Villa</option>
                                                    <option value="Townhouse">Townhouse</option>
                                                    <option value="Penthouse">Penthouse</option>
                                                    <option value="Duplex">Duplex</option>
                                                    <option value="Mansion">Mansion</option>
                                                    <option value="Studio">Studio</option>
                                                  </select>
                                                </div>

                                                <div>
                                                  <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                    Starting Price
                                                  </label>
                                                  <input
                                                    type="text"
                                                    value={item.startingPrice || ''}
                                                    onChange={(e) => updateBedField(idx, 'startingPrice', e.target.value)}
                                                    placeholder="Enter starting price"
                                                    className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-semibold text-[#BFA16A] focus:outline-none focus:border-[#BFA16A]"
                                                  />
                                                </div>

                                                <div>
                                                  <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                    Min Size (sqft)
                                                  </label>
                                                  <input
                                                    type="text"
                                                    value={item.minSize || ''}
                                                    onChange={(e) => updateBedField(idx, 'minSize', e.target.value)}
                                                    placeholder="Enter min size"
                                                    className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                                  />
                                                </div>
                                              </div>

                                              {/* Row 2: Max Size, description textarea, Image box, and Red X delete button */}
                                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
                                                <div className="lg:col-span-2">
                                                  <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                    Max Size (sqft)
                                                  </label>
                                                  <input
                                                    type="text"
                                                    value={item.maxSize || ''}
                                                    onChange={(e) => updateBedField(idx, 'maxSize', e.target.value)}
                                                    placeholder="Enter max size"
                                                    className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                                  />
                                                </div>

                                                <div className="lg:col-span-6">
                                                  <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                    description
                                                  </label>
                                                  <textarea
                                                    rows={3}
                                                    value={item.description || ''}
                                                    onChange={(e) => updateBedField(idx, 'description', e.target.value)}
                                                    placeholder="Experience the 3 Bedroom Apartment designed with spacious rooms..."
                                                    className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                                  />
                                                </div>

                                                {/* Image upload card */}
                                                <div className="lg:col-span-3">
                                                  <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                    Image
                                                  </label>
                                                  <div className="relative group">
                                                    <label className="flex flex-col items-center justify-center h-20 w-full rounded-xl border border-dashed border-[#D5D0C7] hover:border-[#BFA16A] bg-white cursor-pointer overflow-hidden transition">
                                                      {item.image ? (
                                                        <div className="relative w-full h-full">
                                                          <img
                                                            src={item.image}
                                                            alt=""
                                                            className="w-full h-full object-contain p-1"
                                                          />
                                                          <button
                                                            type="button"
                                                            onClick={(ev) => {
                                                              ev.preventDefault();
                                                              ev.stopPropagation();
                                                              updateBedField(idx, 'image', '');
                                                            }}
                                                            className="absolute top-1 right-1 w-5 h-5 rounded bg-black/60 text-white flex items-center justify-center text-[10px]"
                                                            title="Remove image"
                                                          >
                                                            ✕
                                                          </button>
                                                        </div>
                                                      ) : (
                                                        <div className="flex flex-col items-center justify-center text-center p-2">
                                                          <svg className="w-5 h-5 text-stone-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                          </svg>
                                                          <span className="text-[10px] text-stone-500 font-medium">Click to upload file</span>
                                                        </div>
                                                      )}
                                                      <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(ev) => {
                                                          if (ev.target.files && ev.target.files[0]) {
                                                            handleFileUpload(ev.target.files[0], (url) => {
                                                              updateBedField(idx, 'image', url);
                                                            });
                                                          }
                                                        }}
                                                      />
                                                    </label>
                                                  </div>
                                                </div>

                                                {/* Red X Delete Button matching Image 2 */}
                                                <div className="lg:col-span-1 flex items-center justify-center pt-5">
                                                  <button
                                                    type="button"
                                                    onClick={() => removeBedItem(idx)}
                                                    className="w-8 h-8 rounded-lg bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center font-bold text-sm shadow-xs transition"
                                                    title="Delete Bedroom Detail"
                                                  >
                                                    ✕
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </>
                                      );
                                    })()}
                                  </div>
                                </div>
                              </div>
                            ) : activeSectionTab === 'proj-gallery' ? (
                              /* PHOTO GALLERY EDITOR MATCHING USER SCREENSHOT IMAGE 4 */
                              <div className="space-y-6">
                                {/* Title Input */}
                                <div>
                                  <label className="block text-xs font-semibold text-[#525252] mb-1.5">
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    value={
                                      customSectionsData['proj-gallery']?.title ??
                                      titleVal ??
                                      'View Project Gallery'
                                    }
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setCustomSectionsData((prev) => ({
                                        ...prev,
                                        'proj-gallery': {
                                          ...(prev['proj-gallery'] || {}),
                                          title: val,
                                        },
                                      }));
                                    }}
                                    placeholder="View Project Gallery"
                                    className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-semibold focus:outline-none focus:border-[#BFA16A]"
                                  />
                                </div>

                                {/* Description Textarea */}
                                <div>
                                  <label className="block text-xs font-semibold text-[#525252] mb-1.5">
                                    Description
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={
                                      customSectionsData['proj-gallery']?.description ??
                                      customSectionsData['proj-gallery']?.contentText ??
                                      contentTextVal
                                    }
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setCustomSectionsData((prev) => ({
                                        ...prev,
                                        'proj-gallery': {
                                          ...(prev['proj-gallery'] || {}),
                                          description: val,
                                          contentText: val,
                                        },
                                      }));
                                    }}
                                    placeholder="Explore the project gallery of Saima Mangrove Residences by Saima Builders, showcasing luxury homes, elegant interiors, and world-class amenities that reflect modern design, comfort, and an upscale lifestyle."
                                    className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                  />
                                </div>

                                {/* 4-Section Categorized Drag & Copy Gallery Manager matching Reference */}
                                <div className="space-y-6 pt-3 border-t border-[#E5E0D8]">
                                  {(() => {
                                    const galData = customSectionsData['proj-gallery'] || {};
                                    const rawAll =
                                      galData.items ||
                                      galData.images || [
                                        '/gallery-bedroom.png',
                                        '/image-277.png',
                                        '/gallery1.png',
                                        '/gallery2.png',
                                        '/gallery-exterior.png',
                                        '/project-detail-hero.png',
                                        '/emaar_lagoon_community.jpg',
                                        '/property_detail_main.jpg',
                                      ];
                                    const rawInterior = galData.interiorImages || [
                                      '/gallery-bedroom.png',
                                      '/image-277.png',
                                      '/gallery1.png',
                                      '/gallery2.png',
                                    ];
                                    const rawExterior = galData.exteriorImages || [
                                      '/gallery-exterior.png',
                                      '/emaar_lagoon_community.jpg',
                                      '/property_detail_main.jpg',
                                    ];
                                    const rawLifestyle = galData.lifestyleImages || [
                                      '/project-detail-hero.png',
                                    ];

                                    const allImagesList: string[] = Array.isArray(rawAll) ? rawAll : [];
                                    const interiorList: string[] = Array.isArray(rawInterior) ? rawInterior : [];
                                    const exteriorList: string[] = Array.isArray(rawExterior) ? rawExterior : [];
                                    const lifestyleList: string[] = Array.isArray(rawLifestyle) ? rawLifestyle : [];

                                    const updateGalleryLists = (updates: Record<string, string[]>) => {
                                      setCustomSectionsData((prev) => {
                                        const curr = prev['proj-gallery'] || {
                                          items: allImagesList,
                                          images: allImagesList,
                                          interiorImages: interiorList,
                                          exteriorImages: exteriorList,
                                          lifestyleImages: lifestyleList,
                                        };
                                        const nextAll = updates.items ?? updates.images ?? curr.items ?? allImagesList;
                                        return {
                                          ...prev,
                                          'proj-gallery': {
                                            ...curr,
                                            ...updates,
                                            items: nextAll,
                                            images: nextAll,
                                          },
                                        };
                                      });
                                    };

                                    const addToAllImages = (newUrl: string) => {
                                      if (!newUrl) return;
                                      const nextAll = allImagesList.includes(newUrl)
                                        ? allImagesList
                                        : [...allImagesList, newUrl];
                                      updateGalleryLists({ items: nextAll, images: nextAll });
                                    };

                                    const removeFromAllImages = (idx: number) => {
                                      const nextAll = allImagesList.filter((_, i) => i !== idx);
                                      updateGalleryLists({ items: nextAll, images: nextAll });
                                    };

                                    const addToCategory = (
                                      categoryKey: 'interiorImages' | 'exteriorImages' | 'lifestyleImages',
                                      currentCatList: string[],
                                      newUrl: string
                                    ) => {
                                      if (!newUrl) return;
                                      const nextCat = currentCatList.includes(newUrl)
                                        ? currentCatList
                                        : [...currentCatList, newUrl];
                                      const nextAll = allImagesList.includes(newUrl)
                                        ? allImagesList
                                        : [...allImagesList, newUrl];
                                      updateGalleryLists({
                                        [categoryKey]: nextCat,
                                        items: nextAll,
                                        images: nextAll,
                                      });
                                    };

                                    const removeFromCategory = (
                                      categoryKey: 'interiorImages' | 'exteriorImages' | 'lifestyleImages',
                                      currentCatList: string[],
                                      idx: number
                                    ) => {
                                      const nextCat = currentCatList.filter((_, i) => i !== idx);
                                      updateGalleryLists({ [categoryKey]: nextCat });
                                    };

                                    const handleImageDragStart = (e: React.DragEvent, imgUrl: string) => {
                                      e.dataTransfer.setData('text/plain', imgUrl);
                                      e.dataTransfer.effectAllowed = 'copy';
                                    };

                                    const handleCategoryDrop = (
                                      e: React.DragEvent,
                                      categoryKey: 'interiorImages' | 'exteriorImages' | 'lifestyleImages',
                                      currentCatList: string[]
                                    ) => {
                                      e.preventDefault();
                                      e.stopPropagation();

                                      // 1. Check if dragged from All Images or another gallery section
                                      const draggedUrl = e.dataTransfer.getData('text/plain');
                                      if (draggedUrl && (draggedUrl.startsWith('/') || draggedUrl.startsWith('http') || draggedUrl.startsWith('data:'))) {
                                        addToCategory(categoryKey, currentCatList, draggedUrl);
                                        return;
                                      }

                                      // 2. Or if user dropped local image files from desktop
                                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                        Array.from(e.dataTransfer.files).forEach((file) => {
                                          handleFileUpload(file, (url) => {
                                            addToCategory(categoryKey, currentCatList, url);
                                          });
                                        });
                                      }
                                    };

                                    const renderGalleryBox = (
                                      sectionHeading: string | null,
                                      subLabel: string,
                                      list: string[],
                                      onRemove: (idx: number) => void,
                                      onUploadUrl: (url: string) => void,
                                      onDropHandler?: (e: React.DragEvent) => void,
                                      isSourceBox?: boolean
                                    ) => (
                                      <div className="space-y-2">
                                        {sectionHeading && (
                                          <h4 className="text-sm font-bold text-[#171717]">
                                            {sectionHeading}
                                          </h4>
                                        )}
                                        <div className="flex items-center justify-between">
                                          <label className="block text-xs font-medium text-[#525252]">
                                            {subLabel}
                                          </label>
                                          <span className="text-[11px] text-[#737373] font-medium">
                                            {isSourceBox
                                              ? `Drag any image below to copy into categories • (${list.length})`
                                              : `Drop images here to copy • (${list.length})`}
                                          </span>
                                        </div>

                                        <div
                                          onDragOver={(e) => {
                                            e.preventDefault();
                                            e.dataTransfer.dropEffect = 'copy';
                                          }}
                                          onDrop={
                                            onDropHandler ||
                                            ((e) => {
                                              e.preventDefault();
                                              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                                Array.from(e.dataTransfer.files).forEach((file) => {
                                                  handleFileUpload(file, (url) => {
                                                    onUploadUrl(url);
                                                  });
                                                });
                                              }
                                            })
                                          }
                                          className="bg-[#F3FAFF] border border-dashed border-[#38BDF8] rounded-xl p-6 min-h-[160px] transition hover:border-[#0284C7]"
                                        >
                                          <div className="flex flex-wrap items-center justify-center gap-4">
                                            {list.map((imgUrl, imgIdx) => (
                                              <div
                                                key={`${sectionHeading || 'all'}-img-${imgIdx}-${imgUrl}`}
                                                draggable
                                                onDragStart={(e) => handleImageDragStart(e, imgUrl)}
                                                title="Drag to copy into Interior, Exterior, or Lifestyle Gallery"
                                                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white border border-[#E5E0D8] shadow-xs group cursor-grab active:cursor-grabbing shrink-0"
                                              >
                                                <img
                                                  src={imgUrl}
                                                  alt=""
                                                  className="w-full h-full object-cover rounded-2xl pointer-events-none select-none"
                                                />

                                                {/* Top-Right Circular White 'x' Delete Button matching screenshot */}
                                                <button
                                                  type="button"
                                                  onClick={(ev) => {
                                                    ev.stopPropagation();
                                                    onRemove(imgIdx);
                                                  }}
                                                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white hover:bg-rose-50 text-[#737373] hover:text-rose-600 border border-[#E5E0D8] shadow-md flex items-center justify-center text-xs font-bold z-20 transition cursor-pointer"
                                                  title={isSourceBox ? 'Remove from All Images' : `Remove from ${sectionHeading}`}
                                                >
                                                  ×
                                                </button>
                                              </div>
                                            ))}

                                            {/* Upload / Add Image Card */}
                                            <label className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-2 border-dashed border-[#93C5FD] hover:border-[#0284C7] bg-white/80 hover:bg-white flex flex-col items-center justify-center cursor-pointer transition text-[#0284C7] shadow-2xs shrink-0 text-center p-2">
                                              <span className="text-2xl font-light leading-none">+</span>
                                              <span className="text-[11px] font-semibold mt-1">
                                                {isSourceBox ? 'Upload Images' : 'Drag Here or +'}
                                              </span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={(ev) => {
                                                  if (ev.target.files && ev.target.files.length > 0) {
                                                    Array.from(ev.target.files).forEach((file) => {
                                                      handleFileUpload(file, (url) => {
                                                        onUploadUrl(url);
                                                      });
                                                    });
                                                  }
                                                }}
                                              />
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    );

                                    return (
                                      <div className="space-y-6">
                                        {/* 1. ALL IMAGES (Master Upload Gallery) */}
                                        {renderGalleryBox(
                                          'All Images',
                                          'Upload Images To The Gallery',
                                          allImagesList,
                                          removeFromAllImages,
                                          addToAllImages,
                                          undefined,
                                          true
                                        )}

                                        {/* 2. INTERIOR GALLERY */}
                                        {renderGalleryBox(
                                          'Interior Gallery',
                                          'Upload Images To The Gallery',
                                          interiorList,
                                          (idx) => removeFromCategory('interiorImages', interiorList, idx),
                                          (url) => addToCategory('interiorImages', interiorList, url),
                                          (e) => handleCategoryDrop(e, 'interiorImages', interiorList)
                                        )}

                                        {/* 3. EXTERIOR GALLERY */}
                                        {renderGalleryBox(
                                          'Exterior Gallery',
                                          'Upload Images To The Gallery',
                                          exteriorList,
                                          (idx) => removeFromCategory('exteriorImages', exteriorList, idx),
                                          (url) => addToCategory('exteriorImages', exteriorList, url),
                                          (e) => handleCategoryDrop(e, 'exteriorImages', exteriorList)
                                        )}

                                        {/* 4. LIFESTYLE GALLERY */}
                                        {renderGalleryBox(
                                          'Lifestyle Gallery',
                                          'Upload Images To The Gallery',
                                          lifestyleList,
                                          (idx) => removeFromCategory('lifestyleImages', lifestyleList, idx),
                                          (url) => addToCategory('lifestyleImages', lifestyleList, url),
                                          (e) => handleCategoryDrop(e, 'lifestyleImages', lifestyleList)
                                        )}
                                      </div>
                                    );
                                  })()}
                                </div>
                              </div>
                            ) : activeSectionTab === 'blog-where-to-live' ? (
                              <div>
                                {(() => {
                                  const wtl = customSectionsData['blog-where-to-live'] || {};
                                  const updateWtl = (key: string, val: any) =>
                                    setCustomSectionsData((prev) => ({
                                      ...prev,
                                      'blog-where-to-live': {
                                        ...(prev['blog-where-to-live'] || {}),
                                        [key]: val,
                                      },
                                    }));

                                  const defaultList = [
                                    { id: '1', cityName: 'Sharjah', areasCount: '27 areas', imageSrc: '/sharjah.png' },
                                    { id: '2', cityName: 'Abu Dhabi', areasCount: '18 areas', imageSrc: '/abudabi.png' },
                                    { id: '3', cityName: 'Furjairah', areasCount: '22 areas', imageSrc: '/furjairah.png' },
                                    { id: '4', cityName: 'Dubai', areasCount: '27 areas', imageSrc: '/dubai.png' },
                                  ];

                                  const rawCities = Array.isArray(wtl.cities) && wtl.cities.length > 0 ? wtl.cities : defaultList;
                                  // Ensure exactly 4 items or allow editing up to 4 items
                                  const citiesList = rawCities.slice(0, 4);
                                  while (citiesList.length < 4) {
                                    citiesList.push({
                                      id: String(citiesList.length + 1),
                                      cityName: 'City Name',
                                      areasCount: '0 areas',
                                      imageSrc: '/dubai.png',
                                    });
                                  }

                                  const updateCityItem = (index: number, field: string, val: any) => {
                                    const next = [...citiesList];
                                    next[index] = { ...next[index], [field]: val };
                                    updateWtl('cities', next);
                                  };

                                  return (
                                    <div className="space-y-6">
                                      {/* Header Fields: Section Title, Tagline, Description */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2 border-b border-[#F0ECE6]">
                                        <div>
                                          <label className="block text-xs font-semibold text-[#525252] mb-1">
                                            Section Heading
                                          </label>
                                          <input
                                            type="text"
                                            value={wtl.title ?? 'Where to Live'}
                                            onChange={(e) => updateWtl('title', e.target.value)}
                                            placeholder="Where to Live"
                                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-semibold focus:outline-none focus:border-[#BFA16A]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs font-semibold text-[#525252] mb-1">
                                            Tagline / Badge
                                          </label>
                                          <input
                                            type="text"
                                            value={wtl.tagline ?? 'City guides'}
                                            onChange={(e) => updateWtl('tagline', e.target.value)}
                                            placeholder="City guides"
                                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                          />
                                        </div>
                                        <div className="md:col-span-2">
                                          <label className="block text-xs font-semibold text-[#525252] mb-1">
                                            Description / Subtitle
                                          </label>
                                          <input
                                            type="text"
                                            value={wtl.description ?? 'Explore the best areas to live across the UAE, with in-depth guides to help you find your perfect home.'}
                                            onChange={(e) => updateWtl('description', e.target.value)}
                                            placeholder="Explore the best areas to live across the UAE..."
                                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                          />
                                        </div>
                                      </div>

                                      {/* 4 City Lines: Each line has City Name (Text Box), Tag / Areas Count (Tag Box), and Cover Image Card */}
                                      <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                                            City Cards (4 Lines: Text Box + Tag Box + Image Card)
                                          </h4>
                                          <span className="text-[11px] text-[#8C8C8C]">
                                            Showing 4 City Guides
                                          </span>
                                        </div>

                                        <div className="space-y-4">
                                          {citiesList.map((item: any, idx: number) => (
                                            <div
                                              key={idx}
                                              className="p-4 bg-[#FAF9F6] border border-[#E5E0D8] rounded-2xl flex flex-col lg:flex-row items-center gap-4 hover:border-[#BFA16A]/60 transition-all shadow-2xs"
                                            >
                                              {/* Line number pill */}
                                              <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
                                                <span className="w-7 h-7 rounded-full bg-[#171717] text-white text-xs font-semibold flex items-center justify-center">
                                                  #{idx + 1}
                                                </span>
                                              </div>

                                              {/* 1. Text Box: City Name */}
                                              <div className="w-full lg:flex-1">
                                                <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                  City Name (Text Box)
                                                </label>
                                                <input
                                                  type="text"
                                                  value={item.cityName || ''}
                                                  onChange={(e) => updateCityItem(idx, 'cityName', e.target.value)}
                                                  placeholder="e.g. Dubai, Abu Dhabi, Sharjah..."
                                                  className="w-full bg-white border border-[#DFDAD2] rounded-xl px-3.5 py-2 text-sm text-[#171717] font-medium focus:outline-none focus:border-[#BFA16A]"
                                                />
                                              </div>

                                              {/* 2. Tag Box: Tag / Areas Count */}
                                              <div className="w-full lg:w-48">
                                                <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                  Tag / Badge (Tag Box)
                                                </label>
                                                <input
                                                  type="text"
                                                  value={item.areasCount || ''}
                                                  onChange={(e) => updateCityItem(idx, 'areasCount', e.target.value)}
                                                  placeholder="e.g. 27 areas, 18 areas..."
                                                  className="w-full bg-white border border-[#DFDAD2] rounded-xl px-3.5 py-2 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                                />
                                              </div>

                                              {/* 3. Card for Image: Preview + Upload/Picker */}
                                              <div className="w-full lg:w-72 shrink-0">
                                                <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                  Card Image
                                                </label>
                                                <div className="flex items-center gap-3 bg-white border border-[#DFDAD2] rounded-xl p-2">
                                                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#EFECE6] shrink-0 border border-[#E5E0D8]">
                                                    <img
                                                      src={item.imageSrc || '/dubai.png'}
                                                      alt={item.cityName || 'City'}
                                                      className="w-full h-full object-cover"
                                                      onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/dubai.png';
                                                      }}
                                                    />
                                                  </div>
                                                  <div className="flex-1 min-w-0">
                                                    <input
                                                      type="text"
                                                      value={item.imageSrc || ''}
                                                      onChange={(e) => updateCityItem(idx, 'imageSrc', e.target.value)}
                                                      placeholder="/city.png or URL"
                                                      className="w-full bg-transparent text-xs text-[#525252] focus:outline-none truncate mb-1"
                                                    />
                                                    <label className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF9F6] hover:bg-[#F3EFEA] border border-[#DFDAD2] text-[11px] font-medium text-[#171717] rounded-md cursor-pointer transition-colors">
                                                      <span>Upload / Change</span>
                                                      <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                          const file = e.target.files?.[0];
                                                          if (file) {
                                                            handleFileUpload(file).then((url) => {
                                                              if (url) updateCityItem(idx, 'imageSrc', url);
                                                            });
                                                          }
                                                        }}
                                                      />
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            ) : activeSectionTab === 'blog-hero' ? (
                              /* BLOG HERO SECTION EDITOR WITH COVER IMAGE PICKER */
                              <div className="space-y-6">
                                {(() => {
                                  const bh = customSectionsData['blog-hero'] || {};
                                  const updateBh = (key: string, val: any) =>
                                    setCustomSectionsData((prev) => ({
                                      ...prev,
                                      'blog-hero': {
                                        ...(prev['blog-hero'] || {}),
                                        [key]: val,
                                      },
                                    }));

                                  return (
                                    <div className="space-y-5">
                                      {/* Main Headings */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-xs font-semibold text-[#525252] mb-1">
                                            Heading Line 1 (Dark Text)
                                          </label>
                                          <input
                                            type="text"
                                            value={bh.titleLine1 ?? bh.headingLine1 ?? bh.title ?? 'REAL ESTATE'}
                                            onChange={(e) => {
                                              updateBh('titleLine1', e.target.value);
                                              updateBh('headingLine1', e.target.value);
                                            }}
                                            placeholder="REAL ESTATE"
                                            className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-semibold focus:outline-none focus:border-[#BFA16A]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs font-semibold text-[#BFA16A] mb-1">
                                            Heading Line 2 (Gold Accent)
                                          </label>
                                          <input
                                            type="text"
                                            value={bh.titleLine2 ?? bh.headingLine2 ?? 'NEWS & INSIGHTS'}
                                            onChange={(e) => {
                                              updateBh('titleLine2', e.target.value);
                                              updateBh('headingLine2', e.target.value);
                                            }}
                                            placeholder="NEWS & INSIGHTS"
                                            className="w-full bg-[#FAF9F6] border border-[#BFA16A]/50 rounded-xl px-4 py-2.5 text-sm text-[#BFA16A] font-semibold focus:outline-none focus:border-[#BFA16A]"
                                          />
                                        </div>
                                      </div>

                                      {/* Description */}
                                      <div>
                                        <label className="block text-xs font-semibold text-[#525252] mb-1">
                                          Description / Subheading
                                        </label>
                                        <textarea
                                          rows={3}
                                          value={
                                            bh.description ??
                                            bh.subheading ??
                                            bh.contentText ??
                                            "Expert insights, market analysis, and the latest updates on Dubai's thriving real estate market"
                                          }
                                          onChange={(e) => {
                                            updateBh('description', e.target.value);
                                            updateBh('subheading', e.target.value);
                                            updateBh('contentText', e.target.value);
                                          }}
                                          placeholder="Expert insights, market analysis, and the latest updates..."
                                          className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                        />
                                      </div>

                                      {/* Hero Cover Image with CoverImagePicker */}
                                      <CoverImagePicker
                                        label="Hero Cover Image (Right-Side Skyline Background)"
                                        imageUrl={bh.bgImage || bh.backgroundImage || bh.coverImage || '/blog-hero.png'}
                                        onChange={(url) => {
                                          updateBh('bgImage', url);
                                          updateBh('backgroundImage', url);
                                          updateBh('coverImage', url);
                                        }}
                                        onFileUpload={handleFileUpload}
                                      />
                                    </div>
                                  );
                                })()}
                              </div>
                            ) : activeSectionTab.startsWith('buy-detail-') || activeSectionTab === 'dev-grid' || activeSectionTab === 'blog-hero' || activeSectionTab === 'blog-where-to-live' ? null : (
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-xs font-semibold text-[#525252] mb-1">
                                      Section Heading
                                    </label>
                                    <input
                                      type="text"
                                      value={titleVal}
                                      onChange={(e) => setSectionTitle(activeSectionTab, e.target.value)}
                                      placeholder="Section Heading..."
                                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] font-semibold focus:outline-none focus:border-[#BFA16A]"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-xs font-semibold text-[#525252] mb-1">
                                      Tagline / Badge
                                    </label>
                                    <input
                                      type="text"
                                      value={taglineVal}
                                      onChange={(e) => setSectionTagline(activeSectionTab, e.target.value)}
                                      placeholder="Section Tagline / Badge..."
                                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-xs font-semibold text-[#525252] mb-1">
                                    Content / Description
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={contentTextVal}
                                    onChange={(e) => setSectionContentText(activeSectionTab, e.target.value)}
                                    placeholder="Section content / description..."
                                    className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Section Specific Controls: comm-opportunities has drag-drop, comm-amenities has dropdown selector, other sections have CoverImagePicker */}
                            {activeSectionTab === 'comm-amenities' || activeSectionTab === 'proj-amenities' || activeSectionTab === 'buy-detail-amenities' ? (
                              /* IN-PLACE MULTI-SELECT DROPDOWN (Matching Reference Image 2 & 3) */
                              <div className="space-y-4 pt-2 border-t border-[#E5E0D8]">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                  <div>
                                    <h4 className="text-base font-bold text-[#171717]">
                                      {activeSectionTab === 'proj-amenities'
                                        ? 'Project Amenities & Lifestyle Facilities'
                                        : activeSectionTab === 'buy-detail-amenities'
                                        ? 'Property Amenities & Features'
                                        : 'Community Amenities'}
                                    </h4>
                                  </div>
                                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#FAF9F6] border border-[#E5E0D8] rounded-lg text-[#525252] self-start sm:self-auto">
                                    {getSectionItems(
                                      activeSectionTab,
                                      activeSectionTab === 'buy-detail-amenities'
                                        ? [
                                            'Unfurnished',
                                            'Central A/C',
                                            'Built in Wardrobes',
                                            'Kitchen Appliances',
                                            'Security',
                                            'Barbecue Area',
                                            'Private Pool',
                                            'Walk-in Closet',
                                            'Private Garden',
                                          ]
                                        : [
                                            'Children Play Area',
                                            'Schools',
                                            'Restaurants',
                                            'Shopping Mall',
                                            'Walking Trails',
                                            'Sports Facilities',
                                            'Gym',
                                            'Parking Area',
                                            '24X7 Security',
                                            'Golf Course',
                                          ]
                                    ).length} Selected
                                  </span>
                                </div>

                                {(() => {
                                  const defaultInitialAmenities =
                                    activeSectionTab === 'buy-detail-amenities'
                                      ? [
                                          'Unfurnished',
                                          'Central A/C',
                                          'Built in Wardrobes',
                                          'Kitchen Appliances',
                                          'Security',
                                          'Barbecue Area',
                                          'Private Pool',
                                          'Walk-in Closet',
                                          'Private Garden',
                                        ]
                                      : [
                                          'Children Play Area',
                                          'Schools',
                                          'Restaurants',
                                          'Shopping Mall',
                                          'Walking Trails',
                                          'Sports Facilities',
                                          'Gym',
                                          'Parking Area',
                                          '24X7 Security',
                                          'Golf Course',
                                        ];
                                  const selectedAmenities: any[] = getSectionItems(
                                    activeSectionTab,
                                    defaultInitialAmenities
                                  );

                                  // Helper to extract amenity name string
                                  const getItemName = (item: any) =>
                                    typeof item === 'string' ? item : item?.name || '';

                                  const selectedNames = selectedAmenities.map(getItemName);

                                  // Toggle amenity selection
                                  const handleToggleAmenity = (amenityName: string) => {
                                    const isSelected = selectedNames.some(
                                      (n) => n.toLowerCase() === amenityName.toLowerCase()
                                    );
                                    if (isSelected) {
                                      setSectionItems(
                                        activeSectionTab,
                                        selectedAmenities.filter(
                                          (item) => getItemName(item).toLowerCase() !== amenityName.toLowerCase()
                                        )
                                      );
                                    } else {
                                      const foundAmenity = amenitiesList.find(
                                        (a) => a.name.toLowerCase() === amenityName.toLowerCase()
                                      );
                                      const newItem = foundAmenity?.iconSvg
                                        ? { name: foundAmenity.name, iconSvg: foundAmenity.iconSvg }
                                        : amenityName;
                                      setSectionItems(activeSectionTab, [...selectedAmenities, newItem]);
                                    }
                                  };

                                  const handleRemoveAmenity = (e: React.MouseEvent, amenityName: string) => {
                                    e.stopPropagation();
                                    setSectionItems(
                                      activeSectionTab,
                                      selectedAmenities.filter(
                                        (item) => getItemName(item).toLowerCase() !== amenityName.toLowerCase()
                                      )
                                    );
                                  };

                                  return (
                                    <div className="space-y-2">
                                      <label className="block text-xs font-semibold text-[#525252]">
                                        Amenities (Multi-select)
                                      </label>

                                      {/* Multi-Select Control matching User Reference Image */}
                                      <div className="relative">
                                        <div
                                          onClick={() => {
                                            const menu = document.getElementById('amenities-multiselect-menu');
                                            if (menu) menu.classList.toggle('hidden');
                                          }}
                                          className="w-full min-h-[46px] bg-white border border-[#3b82f6] rounded-xl px-3 py-2 flex flex-wrap items-center gap-1.5 cursor-pointer shadow-xs focus:ring-2 focus:ring-[#3b82f6]/20 transition"
                                        >
                                          {selectedAmenities.length === 0 ? (
                                            <span className="text-sm text-stone-400 select-none">
                                              Please select amenities...
                                            </span>
                                          ) : (
                                            selectedAmenities.map((item) => {
                                              const name = getItemName(item);
                                              const foundAm = amenitiesList.find(
                                                (a) => a.name.toLowerCase() === name.toLowerCase()
                                              );
                                              const iconCode =
                                                (typeof item === 'object' && item?.iconSvg) ||
                                                foundAm?.iconSvg ||
                                                iconsList.find((ic) => ic.name.toLowerCase() === name.toLowerCase())?.codeOrUrl ||
                                                '';
                                              return (
                                                <span
                                                  key={name}
                                                  className="inline-flex items-center gap-1.5 bg-[#FAF9F6] border border-[#E5E0D8] text-[#171717] px-2.5 py-1 rounded-lg text-xs font-medium shadow-2xs hover:border-[#BFA16A] transition"
                                                >
                                                  {iconCode && (
                                                    iconCode.trim().startsWith('<') ? (
                                                      <svg
                                                        className="w-3.5 h-3.5 text-[#BFA16A] shrink-0"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={1.8}
                                                        dangerouslySetInnerHTML={{ __html: iconCode }}
                                                      />
                                                    ) : iconCode.startsWith('/') || iconCode.startsWith('http') || iconCode.startsWith('data:') ? (
                                                      <img src={iconCode} alt={name} className="w-3.5 h-3.5 object-contain shrink-0" />
                                                    ) : null
                                                  )}
                                                  <span>{name}</span>
                                                  <button
                                                    type="button"
                                                    onClick={(e) => handleRemoveAmenity(e, name)}
                                                    className="text-stone-400 hover:text-rose-600 font-bold transition ml-0.5"
                                                    title={`Remove ${name}`}
                                                  >
                                                    ✕
                                                  </button>
                                                </span>
                                              );
                                            })
                                          )}

                                          {/* Dropdown Indicator Icon (Right side matching 3rd image) */}
                                          <div className="ml-auto pl-2 text-stone-400">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                              <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                          </div>
                                        </div>

                                        {/* Dropdown Options Menu (Matching Image 2: List items with blue checkmark on right) */}
                                        <div
                                          id="amenities-multiselect-menu"
                                          className="hidden absolute z-50 left-0 right-0 mt-1.5 bg-white border border-[#E5E0D8] rounded-xl shadow-xl max-h-72 overflow-y-auto divide-y divide-[#F0ECE1]"
                                        >
                                          <div className="p-2 bg-[#FAF9F6] sticky top-0 border-b border-[#E5E0D8] flex items-center justify-between text-xs text-[#737373]">
                                            <span className="font-semibold text-[#171717]">Select Amenities from Global List</span>
                                            {selectedAmenities.length > 0 && (
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSectionItems(activeSectionTab, []);
                                                }}
                                                className="text-rose-600 hover:underline text-[11px] font-medium"
                                              >
                                                Clear All
                                              </button>
                                            )}
                                          </div>

                                          {amenitiesList.map((amenity) => {
                                            const isSelected = selectedNames.some(
                                              (n) => n.toLowerCase() === amenity.name.toLowerCase()
                                            );
                                            const amIcon =
                                              amenity.iconSvg ||
                                              iconsList.find((ic) => ic.name.toLowerCase() === amenity.name.toLowerCase())?.codeOrUrl ||
                                              '';
                                            return (
                                              <div
                                                key={amenity.id || amenity.name}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleToggleAmenity(amenity.name);
                                                }}
                                                className={`px-4 py-3 text-sm cursor-pointer flex items-center justify-between transition select-none ${
                                                  isSelected
                                                    ? 'bg-[#F0F7FF] text-[#0284c7] font-semibold'
                                                    : 'text-[#374151] hover:bg-[#FAF9F6]'
                                                }`}
                                              >
                                                <div className="flex items-center gap-2.5">
                                                  {amIcon && amIcon.trim().startsWith('<') ? (
                                                    <svg
                                                      className="w-4 h-4 text-[#BFA16A] shrink-0"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      strokeWidth={1.8}
                                                      dangerouslySetInnerHTML={{ __html: amIcon }}
                                                    />
                                                  ) : amIcon && (amIcon.startsWith('/') || amIcon.startsWith('http') || amIcon.startsWith('data:')) ? (
                                                    <img src={amIcon} alt={amenity.name} className="w-4 h-4 object-contain shrink-0" />
                                                  ) : (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                                                  )}
                                                  <span>{amenity.name}</span>
                                                  <span className="text-[11px] text-stone-400 font-normal">
                                                    ({amenity.category})
                                                  </span>
                                                </div>

                                                {/* Blue Checkmark (Matching 2nd image) */}
                                                {isSelected && (
                                                  <svg
                                                    className="w-4 h-4 text-[#0284c7]"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2.5}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  >
                                                    <polyline points="20 6 9 17 4 12" />
                                                  </svg>
                                                )}
                                              </div>
                                            );
                                          })}

                                          {amenitiesList.length === 0 && (
                                            <div className="p-6 text-center text-xs text-stone-400">
                                              No options available in global database.
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            ) : activeSectionTab === 'dev-brief' ? (
                              /* DEVELOPER BRIEF & OVERVIEW + MEASURED TABLE CONTROLS */
                              <div className="space-y-6 pt-4 border-t border-[#E5E0D8]">
                                <div className="p-4 bg-[#FFF9EE] border border-[#F2E5C9] rounded-xl space-y-3">
                                  <h4 className="text-xs font-bold text-[#BFA16A] uppercase tracking-wider">
                                    Key Numbers Banner (Yellow Box)
                                  </h4>
                                  <div>
                                    <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                      Key Numbers Title / Tagline
                                    </label>
                                    <input
                                      type="text"
                                      value={
                                        customSectionsData['dev-brief']?.keyNumbersTagline ||
                                        'KEY NUMBERS · AS OF 6 OCTOBER 2026'
                                      }
                                      onChange={(e) =>
                                        setCustomSectionsData((prev) => ({
                                          ...prev,
                                          'dev-brief': {
                                            ...(prev['dev-brief'] || {}),
                                            keyNumbersTagline: e.target.value,
                                          },
                                        }))
                                      }
                                      placeholder="KEY NUMBERS · AS OF 6 OCTOBER 2026"
                                      className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                      Key Numbers Description
                                    </label>
                                    <textarea
                                      rows={2}
                                      value={
                                        customSectionsData['dev-brief']?.keyNumbersText ||
                                        '74 live off-plan projects by emaar, median entry price aed 3.06m. entry prices start at aed 1.1m. median down payment 10%. 0% of them offer a post-handover payment plan. most handovers are scheduled for 2029.'
                                      }
                                      onChange={(e) =>
                                        setCustomSectionsData((prev) => ({
                                          ...prev,
                                          'dev-brief': {
                                            ...(prev['dev-brief'] || {}),
                                            keyNumbersText: e.target.value,
                                          },
                                        }))
                                      }
                                      className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                      Source Citation
                                    </label>
                                    <input
                                      type="text"
                                      value={
                                        customSectionsData['dev-brief']?.keyNumbersSource ||
                                        'the vila properties project register, refreshed weekly from developer data.'
                                      }
                                      onChange={(e) =>
                                        setCustomSectionsData((prev) => ({
                                          ...prev,
                                          'dev-brief': {
                                            ...(prev['dev-brief'] || {}),
                                            keyNumbersSource: e.target.value,
                                          },
                                        }))
                                      }
                                      placeholder="the vila properties project register, refreshed weekly from developer data."
                                      className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                    />
                                  </div>
                                </div>

                                {/* Right Side: Measured Table Card Form */}
                                <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-3">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                                      Developer Measured Table (Right Column Card)
                                    </h4>
                                    <span className="text-[11px] text-[#BFA16A] font-medium">8 Metric Rows</span>
                                  </div>

                                  <div>
                                    <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                      Table Card Header Title
                                    </label>
                                    <input
                                      type="text"
                                      value={
                                        customSectionsData['dev-brief']?.tableTitle ||
                                        'Emaar, Measured'
                                      }
                                      onChange={(e) =>
                                        setCustomSectionsData((prev) => ({
                                          ...prev,
                                          'dev-brief': {
                                            ...(prev['dev-brief'] || {}),
                                            tableTitle: e.target.value,
                                          },
                                        }))
                                      }
                                      placeholder="e.g. Emaar, Measured"
                                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                    />
                                  </div>

                                  {/* Right Side Card Image (Optional Banner / Logo) */}
                                  <div className="pt-1">
                                    <CoverImagePicker
                                      label="Card Header / Developer Badge Image (Optional)"
                                      imageUrl={customSectionsData['dev-brief']?.tableImage || ''}
                                      onChange={(url) =>
                                        setCustomSectionsData((prev) => ({
                                          ...prev,
                                          'dev-brief': {
                                            ...(prev['dev-brief'] || {}),
                                            tableImage: url,
                                          },
                                        }))
                                      }
                                      onFileUpload={handleFileUpload}
                                    />
                                  </div>

                                  {/* Metric Rows Editor */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    {[
                                      { key: 'onRegister', label: 'On Register', def: '74' },
                                      { key: 'fromPrice', label: 'From Price', def: 'AED 1.1M' },
                                      { key: 'nextHandover', label: 'Next Handover', def: 'Q4 2026' },
                                      { key: 'communities', label: 'Communities', def: '22' },
                                      { key: 'medianPrice', label: 'Median Entry Price', def: 'AED 3.06M' },
                                      { key: 'downPayment', label: 'Median Down Payment', def: '10%' },
                                      { key: 'postHandover', label: 'Post-Handover Plans', def: '0%' },
                                      { key: 'mostHandovers', label: 'Most Handovers', def: '2029' },
                                    ].map((metric) => {
                                      const currentVal =
                                        customSectionsData['dev-brief']?.tableMetrics?.[metric.key] ?? metric.def;
                                      return (
                                        <div key={metric.key} className="flex items-center gap-2 bg-[#FAF9F6] p-2 rounded-lg border border-[#E5E0D8]">
                                          <span className="text-xs text-[#525252] flex-1 truncate">{metric.label}:</span>
                                          <input
                                            type="text"
                                            value={currentVal}
                                            onChange={(e) => {
                                              const newVal = e.target.value;
                                              setCustomSectionsData((prev) => ({
                                                ...prev,
                                                'dev-brief': {
                                                  ...(prev['dev-brief'] || {}),
                                                  tableMetrics: {
                                                    ...(prev['dev-brief']?.tableMetrics || {}),
                                                    [metric.key]: newVal,
                                                  },
                                                },
                                              }));
                                            }}
                                            className="w-24 bg-white border border-[#E5E0D8] rounded-md px-2 py-1 text-xs text-[#171717] font-semibold text-right"
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            ) : activeSectionTab === 'proj-overview' ? (
                              /* PROJECT OVERVIEW & METRICS STRUCTURED FORM */
                              <div className="space-y-6 pt-4 border-t border-[#E5E0D8]">
                                <div className="p-5 bg-[#FAF9F6] border border-[#E5E0D8] rounded-2xl space-y-4">
                                  <div className="border-b border-[#E5E0D8] pb-3">
                                    <h4 className="text-xs font-bold text-[#BFA16A] uppercase tracking-wider">
                                      Project Launch Key Metrics &amp; Commercial Terms
                                    </h4>
                                  </div>

                                  {(() => {
                                    const po = customSectionsData['proj-overview'] || {};
                                    const updatePo = (field: string, val: string) => {
                                      setCustomSectionsData((prev) => ({
                                        ...prev,
                                        'proj-overview': {
                                          ...(prev['proj-overview'] || {}),
                                          [field]: val,
                                        },
                                      }));
                                    };

                                    return (
                                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                            Starting Price
                                          </label>
                                          <input
                                            type="text"
                                            value={po.startingPrice || ''}
                                            onChange={(e) => updatePo('startingPrice', e.target.value)}
                                            placeholder="AED 2,490,000"
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-bold text-[#BFA16A] focus:outline-none focus:border-[#BFA16A]"
                                          />
                                        </div>

                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                            Developer Name
                                          </label>
                                          <input
                                            type="text"
                                            value={po.developer || ''}
                                            onChange={(e) => updatePo('developer', e.target.value)}
                                            placeholder="DAMAC Properties"
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                          />
                                        </div>

                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                            Handover / Completion
                                          </label>
                                          <input
                                            type="text"
                                            value={po.handover || ''}
                                            onChange={(e) => updatePo('handover', e.target.value)}
                                            placeholder="Q2 2029"
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                          />
                                        </div>

                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                            Payment Plan
                                          </label>
                                          <input
                                            type="text"
                                            value={po.paymentPlan || ''}
                                            onChange={(e) => updatePo('paymentPlan', e.target.value)}
                                            placeholder="70/30"
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                          />
                                        </div>

                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                            Unit Types
                                          </label>
                                          <input
                                            type="text"
                                            value={po.unitTypes || ''}
                                            onChange={(e) => updatePo('unitTypes', e.target.value)}
                                            placeholder="1–3 BR Townhouses"
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                          />
                                        </div>

                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                            Size Range
                                          </label>
                                          <input
                                            type="text"
                                            value={po.sizeRange || ''}
                                            onChange={(e) => updatePo('sizeRange', e.target.value)}
                                            placeholder="1,283 – 2,799 sqft"
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                          />
                                        </div>

                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                            Project Location
                                          </label>
                                          <input
                                            type="text"
                                            value={po.location || ''}
                                            onChange={(e) => updatePo('location', e.target.value)}
                                            placeholder="Dubai Islands, Dubai"
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                          />
                                        </div>

                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                            Status
                                          </label>
                                          <input
                                            type="text"
                                            value={po.status || 'Off Plan (Selling)'}
                                            onChange={(e) => updatePo('status', e.target.value)}
                                            placeholder="Off Plan (Selling)"
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                          />
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </div>
                              </div>
                            ) : activeSectionTab === 'proj-faqs' ? (
                              /* PROJECT FAQS MANAGER */
                              <div className="space-y-4 pt-2 border-t border-[#E5E0D8]">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-base font-bold text-[#171717]">
                                      Frequently Asked Questions
                                    </h4>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const curr = customSectionsData['proj-faqs']?.items || [];
                                      setCustomSectionsData((prev) => ({
                                        ...prev,
                                        'proj-faqs': {
                                          ...(prev['proj-faqs'] || {}),
                                          items: [
                                            ...curr,
                                            { q: 'New Project Question?', a: 'Answer explaining terms and process.' },
                                          ],
                                        },
                                      }));
                                    }}
                                    className="px-3 py-1.5 bg-[#BFA16A] text-white text-xs font-semibold rounded-xl hover:bg-[#a88d58] transition"
                                  >
                                    + Add FAQ
                                  </button>
                                </div>

                                {(() => {
                                  const faqList: any[] = customSectionsData['proj-faqs']?.items || [];
                                  return (
                                    <div className="space-y-3">
                                      {faqList.map((f, idx) => (
                                        <div
                                          key={idx}
                                          className="p-4 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl space-y-2 relative group"
                                        >
                                          <div className="flex items-center justify-between">
                                            <span className="text-[11px] font-bold text-[#BFA16A] uppercase">
                                              Question #{idx + 1}
                                            </span>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const filtered = faqList.filter((_, i) => i !== idx);
                                                setCustomSectionsData((prev) => ({
                                                  ...prev,
                                                  'proj-faqs': {
                                                    ...(prev['proj-faqs'] || {}),
                                                    items: filtered,
                                                  },
                                                }));
                                              }}
                                              className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
                                            >
                                              Remove
                                            </button>
                                          </div>

                                          <input
                                            type="text"
                                            value={f.q || f.question || ''}
                                            onChange={(e) => {
                                              const updated = [...faqList];
                                              updated[idx] = { ...updated[idx], q: e.target.value };
                                              setCustomSectionsData((prev) => ({
                                                ...prev,
                                                'proj-faqs': {
                                                  ...(prev['proj-faqs'] || {}),
                                                  items: updated,
                                                },
                                              }));
                                            }}
                                            placeholder="Question text..."
                                            className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-2 text-xs font-semibold text-[#171717]"
                                          />

                                          <textarea
                                            rows={2}
                                            value={f.a || f.answer || ''}
                                            onChange={(e) => {
                                              const updated = [...faqList];
                                              updated[idx] = { ...updated[idx], a: e.target.value };
                                              setCustomSectionsData((prev) => ({
                                                ...prev,
                                                'proj-faqs': {
                                                  ...(prev['proj-faqs'] || {}),
                                                  items: updated,
                                                },
                                              }));
                                            }}
                                            placeholder="Answer text..."
                                            className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3 py-2 text-xs text-[#525252]"
                                          />
                                        </div>
                                      ))}

                                      {faqList.length === 0 && (
                                        <p className="text-xs text-[#737373] text-center py-4">
                                          No custom FAQs added yet. Click &quot;+ Add FAQ&quot; above to create one.
                                        </p>
                                      )}
                                    </div>
                                  );
                                })()}
                              </div>
                            ) : activeSectionTab === 'proj-video' ? (
                              /* PROJECT VIDEO SETTINGS */
                              <div className="space-y-4 pt-2 border-t border-[#E5E0D8]">
                                <div className="p-4 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl space-y-3">
                                  <h4 className="text-xs font-bold text-[#BFA16A] uppercase tracking-wider">
                                    Video Tour &amp; Media Asset
                                  </h4>
                                  <div>
                                    <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                      YouTube / Video Tour URL
                                    </label>
                                    <input
                                      type="text"
                                      value={customSectionsData['proj-video']?.videoUrl || ''}
                                      onChange={(e) =>
                                        setCustomSectionsData((prev) => ({
                                          ...prev,
                                          'proj-video': {
                                            ...(prev['proj-video'] || {}),
                                            videoUrl: e.target.value,
                                          },
                                        }))
                                      }
                                      placeholder="https://www.youtube.com/watch?v=..."
                                      className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                    />
                                  </div>
                                </div>
                                <CoverImagePicker
                                  label="Video Showcase Poster / Cover Image"
                                  imageUrl={bgVal}
                                  onChange={(url) => setSectionBg(activeSectionTab, url)}
                                  onFileUpload={handleFileUpload}
                                />
                              </div>
                            ) : activeSectionTab === 'proj-location' ? (
                              /* PROJECT LOCATION SETTINGS - MAP COORDINATES */
                              <div className="space-y-4 pt-4 border-t border-[#E5E0D8]">
                                <div className="p-6 bg-white border border-[#E5E0D8] rounded-2xl space-y-5 shadow-2xs">
                                  <h4 className="text-base font-bold text-[#111827]">
                                    Add Map Coordinates
                                  </h4>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Latitude */}
                                    <div>
                                      <label className="block text-sm font-medium text-[#374151] mb-2">
                                        Latitude
                                      </label>
                                      <div className="relative flex items-center">
                                        <span className="absolute left-3.5 text-[#9CA3AF] pointer-events-none">
                                          <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.8}
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                            />
                                          </svg>
                                        </span>
                                        <input
                                          type="text"
                                          value={
                                            customSectionsData['proj-location']?.latitude ??
                                            '25.31528411624274'
                                          }
                                          onChange={(e) =>
                                            setCustomSectionsData((prev) => ({
                                              ...prev,
                                              'proj-location': {
                                                ...(prev['proj-location'] || {}),
                                                latitude: e.target.value,
                                              },
                                            }))
                                          }
                                          placeholder="e.g. 25.31528411624274"
                                          className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl pl-10 pr-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#BFA16A] focus:bg-white transition"
                                        />
                                      </div>
                                    </div>

                                    {/* Longitude */}
                                    <div>
                                      <label className="block text-sm font-medium text-[#374151] mb-2">
                                        Longitude
                                      </label>
                                      <div className="relative flex items-center">
                                        <span className="absolute left-3.5 text-[#9CA3AF] pointer-events-none">
                                          <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.8}
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                            />
                                          </svg>
                                        </span>
                                        <input
                                          type="text"
                                          value={
                                            customSectionsData['proj-location']?.longitude ??
                                            '55.322673566004696'
                                          }
                                          onChange={(e) =>
                                            setCustomSectionsData((prev) => ({
                                              ...prev,
                                              'proj-location': {
                                                ...(prev['proj-location'] || {}),
                                                longitude: e.target.value,
                                              },
                                            }))
                                          }
                                          placeholder="e.g. 55.322673566004696"
                                          className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl pl-10 pr-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#BFA16A] focus:bg-white transition"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : activeSectionTab === 'blog-content' ? (
                              <div className="space-y-6 pt-4 border-t border-[#E5E0D8]">
                                <div className="p-5 bg-[#FAF9F6] border border-[#E5E0D8] rounded-2xl space-y-5">
                                  <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
                                    <h4 className="text-xs font-bold text-[#BFA16A] uppercase tracking-wider">
                                      Article Details &amp; Story Information
                                    </h4>
                                    <span className="text-[11px] text-[#737373]">
                                      Edit metadata and write comprehensive story below
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                        Article Headline / Title
                                      </label>
                                      <input
                                        type="text"
                                        value={customSectionsData['blog-content']?.title ?? pageTitle}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          setPageTitle(val);
                                          setCustomSectionsData((prev) => ({
                                            ...prev,
                                            'blog-content': { ...(prev['blog-content'] || {}), title: val },
                                          }));
                                        }}
                                        className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-bold text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                        Article Category
                                      </label>
                                      <select
                                        value={customSectionsData['blog-content']?.category || 'Real Estate'}
                                        onChange={(e) =>
                                          setCustomSectionsData((prev) => ({
                                            ...prev,
                                            'blog-content': { ...(prev['blog-content'] || {}), category: e.target.value },
                                          }))
                                        }
                                        className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                      >
                                        <option value="Real Estate">Real Estate</option>
                                        <option value="Coming Soon">Coming Soon</option>
                                        <option value="News">News</option>
                                        <option value="City Guides">City Guides</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                        Author / Tagline
                                      </label>
                                      <input
                                        type="text"
                                        value={customSectionsData['blog-content']?.author || 'FS Editorial Advisory'}
                                        onChange={(e) =>
                                          setCustomSectionsData((prev) => ({
                                            ...prev,
                                            'blog-content': { ...(prev['blog-content'] || {}), author: e.target.value },
                                          }))
                                        }
                                        className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                        Publication Date
                                      </label>
                                      <input
                                        type="text"
                                        value={customSectionsData['blog-content']?.date || 'August 28, 2026'}
                                        onChange={(e) =>
                                          setCustomSectionsData((prev) => ({
                                            ...prev,
                                            'blog-content': { ...(prev['blog-content'] || {}), date: e.target.value },
                                          }))
                                        }
                                        className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                                      />
                                    </div>
                                  </div>

                                  {/* Rich Text Summernote for Full Article Story (Text, Images & Tables) */}
                                  <div className="pt-2">
                                    <RichTextSummernote
                                      label="Article Content, Images & Tables (Rich-Text Editor)"
                                      value={
                                        customSectionsData['blog-content']?.detailHtml ||
                                        customSectionsData['blog-html']?.detailHtml ||
                                        customSectionsData['blog-guide']?.detailHtml ||
                                        customSectionsData['blog-content']?.introParagraph ||
                                        ''
                                      }
                                      onChange={(val) =>
                                        setCustomSectionsData((prev) => ({
                                          ...prev,
                                          'blog-content': {
                                            ...(prev['blog-content'] || {}),
                                            detailHtml: val,
                                            introParagraph: prev['blog-content']?.introParagraph || val.replace(/<[^>]*>?/gm, '').slice(0, 200),
                                          },
                                          'blog-html': {
                                            ...(prev['blog-html'] || {}),
                                            detailHtml: val,
                                          },
                                        }))
                                      }
                                      placeholder="Write your blog article here. You can insert formatted text, paragraphs, headings, high-resolution images, and responsive data tables..."
                                      minHeight="420px"
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : activeSectionTab === 'comm-opportunities' || activeSectionTab === 'dev-projects' || activeSectionTab === 'proj-similar' || activeSectionTab === 'buy-detail-recommended' ? (
                              /* DRAG AND DROP PROJECT SELECTION (For comm-opportunities, dev-projects, proj-similar & buy-detail-recommended) */
                              <div className="space-y-4 pt-2">
                                <div className="border-t border-[#E5E0D8] pt-5">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                                    <div>
                                      <h4 className="text-base font-bold text-[#171717]">
                                        {activeSectionTab === 'dev-projects'
                                          ? 'Developer Projects Selector'
                                          : activeSectionTab === 'proj-similar'
                                          ? 'Similar Projects Selector'
                                          : activeSectionTab === 'buy-detail-recommended'
                                          ? 'Recommended Properties & Projects Selector'
                                          : 'Opportunities & Projects Selector'}
                                      </h4>
                                    </div>
                                    <span className="text-xs font-semibold px-2.5 py-1 bg-[#FAF9F6] border border-[#E5E0D8] rounded-lg text-[#525252] self-start sm:self-auto">
                                      {getSectionItems(activeSectionTab).length} Selected for Page
                                    </span>
                                  </div>

                                  {/* Two Column Sliding Drag-and-Drop Container Matching Images */}
                                  {(() => {
                                    const selectedItems: any[] = getSectionItems(activeSectionTab);
                                    
                                    // Available projects pool
                                    const defaultRecPool = [
                                      {
                                        id: 'golf-fields',
                                        badge: 'OFF-PLAN',
                                        type: 'Off-Plan Project',
                                        location: 'EMAAR SOUTH, DUBAI',
                                        tagline: 'EMAAR SOUTH, DUBAI',
                                        title: 'Golf Fields by Emaar',
                                        price: 'AED 100,000',
                                        imageUrl: '/similar-golf-fields.png',
                                        href: '/project-detail',
                                      },
                                      {
                                        id: 'terra-heights',
                                        badge: 'OFF-PLAN',
                                        type: 'Off-Plan Project',
                                        location: 'EMAAR SOUTH, DUBAI',
                                        tagline: 'EMAAR SOUTH, DUBAI',
                                        title: 'Terra Heights by Emaar at Emaar South',
                                        price: 'On Request',
                                        imageUrl: '/similar-terra-heights.png',
                                        href: '/project-detail',
                                      },
                                      {
                                        id: 'greenville-2',
                                        badge: 'OFF-PLAN',
                                        type: 'Off-Plan Project',
                                        location: 'EMAAR SOUTH, DUBAI',
                                        tagline: 'EMAAR SOUTH, DUBAI',
                                        title: 'Greenville 2 at Emaar South, Dubai',
                                        price: 'On Request',
                                        imageUrl: '/similar-greenville.png',
                                        href: '/project-detail',
                                      },
                                      {
                                        id: 'golf-edge',
                                        badge: 'NEW LAUNCH',
                                        type: 'Off-Plan Project',
                                        location: 'EMAAR SOUTH, DUBAI',
                                        tagline: 'EMAAR SOUTH, DUBAI',
                                        title: 'Golf Edge at Emaar South, Dubai',
                                        price: 'On Request',
                                        imageUrl: '/similar-golf-edge.png',
                                        href: '/project-detail',
                                      },
                                    ];

                                    const availablePool: any[] =
                                      activeSectionTab === 'dev-projects' || activeSectionTab === 'proj-similar'
                                        ? offplans.map((o) => ({
                                            id: `off-${o.id}`,
                                            title: o.title,
                                            type: o.type || 'Off-Plan Project',
                                            developer: o.developer,
                                            badge: 'OFF-PLAN',
                                            tagline: o.location ? o.location.toUpperCase() : 'DUBAI',
                                            price: o.starting_price || 'Price on request',
                                            plan: o.payment_plan || 'Flexible',
                                            handover: o.completion_date || 'Q4 2027',
                                            imageUrl: o.imageUrl || '/developers/damac-island-2.png',
                                            href: '/project-detail',
                                          }))
                                        : [
                                            ...(activeSectionTab === 'buy-detail-recommended' ? defaultRecPool : []),
                                            ...properties.map((p) => ({
                                              id: `prop-${p.id}`,
                                              title: p.title,
                                              type: p.type || 'Apartments',
                                              developer: 'Developer',
                                              badge: p.type?.toLowerCase().includes('off-plan') ? 'OFF-PLAN' : 'READY',
                                              location: p.location ? p.location.toUpperCase() : 'DUBAI',
                                              tagline: p.location ? p.location.toUpperCase() : 'DUBAI',
                                              price: p.price || 'Price on request',
                                              plan: 'Flexible',
                                              handover: 'Ready',
                                              imageUrl: p.image_url || '/bannerimg.png',
                                              href: '/buy-detail',
                                            })),
                                            ...offplans.map((o) => ({
                                              id: `off-${o.id}`,
                                              title: o.title,
                                              type: o.type || 'Off-Plan Project',
                                              developer: o.developer,
                                              badge: 'OFF-PLAN',
                                              location: o.location ? o.location.toUpperCase() : 'DUBAI',
                                              tagline: o.location ? o.location.toUpperCase() : 'CREEK HARBOUR',
                                              price: o.starting_price || 'Starting from AED 1.65M',
                                              plan: o.payment_plan || 'Flexible',
                                              handover: o.completion_date || 'Q4 2027',
                                              imageUrl: o.imageUrl || '/developers/damac-island-2.png',
                                              href: '/project-detail',
                                            })),
                                          ];

                                    // Deduplicate by title
                                    const seenTitles = new Set();
                                    const uniquePool = availablePool.filter((item) => {
                                      if (seenTitles.has(item.title)) return false;
                                      seenTitles.add(item.title);
                                      return true;
                                    });

                                    // Remaining unselected items for left container
                                    const selectedTitles = new Set(selectedItems.map((s) => s.title));
                                    const unselectedPool = uniquePool.filter((p) => !selectedTitles.has(p.title));

                                    const handleDragStart = (e: React.DragEvent, item: any) => {
                                      e.dataTransfer.setData('text/plain', JSON.stringify(item));
                                    };

                                    const handleDropToRight = (e: React.DragEvent) => {
                                      e.preventDefault();
                                      const dataStr = e.dataTransfer.getData('text/plain');
                                      if (!dataStr) return;
                                      try {
                                        const droppedItem = JSON.parse(dataStr);
                                        if (!selectedItems.some((s) => s.title === droppedItem.title)) {
                                          setSectionItems(activeSectionTab, [...selectedItems, droppedItem]);
                                        }
                                      } catch (err) {
                                        console.error('Error parsing dropped item:', err);
                                      }
                                    };

                                    const handleDropToLeft = (e: React.DragEvent) => {
                                      e.preventDefault();
                                      const dataStr = e.dataTransfer.getData('text/plain');
                                      if (!dataStr) return;
                                      try {
                                        const droppedItem = JSON.parse(dataStr);
                                        setSectionItems(
                                          activeSectionTab,
                                          selectedItems.filter((s) => s.title !== droppedItem.title)
                                        );
                                      } catch (err) {
                                        console.error('Error parsing dropped item:', err);
                                      }
                                    };

                                    const handleDragOver = (e: React.DragEvent) => {
                                      e.preventDefault();
                                    };

                                    return (
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAF9F6] p-5 rounded-2xl border border-[#E5E0D8]">
                                        {/* Left Container: Featured Popular Projects (Available) */}
                                        <div
                                          onDragOver={handleDragOver}
                                          onDrop={handleDropToLeft}
                                          className="bg-[#F8F9FA] rounded-2xl p-5 border border-[#E5E0D8]/80 flex flex-col h-[520px]"
                                        >
                                          <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[#E5E0D8]">
                                            <h5 className="text-sm font-bold text-[#171717] tracking-tight">
                                              Featured Popular Projects
                                            </h5>
                                            <span className="text-[11px] font-medium text-[#737373]">
                                              {unselectedPool.length} available
                                            </span>
                                          </div>

                                          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 custom-scrollbar">
                                            {unselectedPool.map((item) => (
                                              <div
                                                key={item.id || item.title}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, item)}
                                                onClick={() => {
                                                  setSectionItems(activeSectionTab, [...selectedItems, item]);
                                                }}
                                                className="bg-white border border-[#E5E0D8] hover:border-[#BFA16A] p-3.5 rounded-xl cursor-grab active:cursor-grabbing hover:shadow-sm transition-all group flex items-center justify-between"
                                                title="Drag to right container or click to add"
                                              >
                                                <div>
                                                  <h6 className="text-xs sm:text-[13px] font-bold text-[#171717] group-hover:text-[#BFA16A] transition-colors leading-snug">
                                                    {item.title}
                                                  </h6>
                                                  <p className="text-[11px] text-[#737373] mt-0.5">
                                                    {item.type}
                                                  </p>
                                                </div>
                                                <button
                                                  type="button"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSectionItems(activeSectionTab, [...selectedItems, item]);
                                                  }}
                                                  className="opacity-0 group-hover:opacity-100 px-2 py-1 bg-[#FAF9F6] hover:bg-[#BFA16A] hover:text-white text-[11px] font-semibold text-[#525252] rounded-lg transition"
                                                >
                                                  + Add &rarr;
                                                </button>
                                              </div>
                                            ))}
                                            {unselectedPool.length === 0 && (
                                              <div className="h-full flex items-center justify-center text-xs text-[#8A8A8A]">
                                                All projects have been added to Featured.
                                              </div>
                                            )}
                                          </div>
                                        </div>

                                        {/* Right Container: Featured (Active on Page) */}
                                        <div
                                          onDragOver={handleDragOver}
                                          onDrop={handleDropToRight}
                                          className="bg-white rounded-2xl p-5 border-2 border-dashed border-[#BFA16A]/50 hover:border-[#BFA16A] transition flex flex-col h-[520px] shadow-xs"
                                        >
                                          <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[#E5E0D8]">
                                            <h5 className="text-sm font-bold text-[#171717] tracking-tight flex items-center gap-2">
                                              <span>Featured</span>
                                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            </h5>
                                            <span className="text-[11px] font-medium text-[#BFA16A]">
                                              {selectedItems.length} active
                                            </span>
                                          </div>

                                          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 custom-scrollbar">
                                            {selectedItems.map((item, idx) => (
                                              <div
                                                key={item.id || item.title || idx}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, item)}
                                                className="bg-white border border-[#E5E0D8] p-3.5 rounded-xl shadow-xs hover:border-[#BFA16A] transition-all group flex items-center justify-between"
                                              >
                                                <div>
                                                  <h6 className="text-xs sm:text-[13px] font-bold text-[#171717] leading-snug">
                                                    {item.title}
                                                  </h6>
                                                  <p className="text-[11px] text-[#737373] mt-0.5">
                                                    {item.type}
                                                  </p>
                                                </div>
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    setSectionItems(
                                                      activeSectionTab,
                                                      selectedItems.filter((_, i) => i !== idx)
                                                    );
                                                  }}
                                                  className="p-1.5 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition text-xs font-bold"
                                                  title="Remove from page"
                                                >
                                                  ✕
                                                </button>
                                              </div>
                                            ))}
                                            {selectedItems.length === 0 && (
                                              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-xs text-[#8A8A8A] space-y-2">
                                                <span className="text-2xl">📥</span>
                                                <p className="font-semibold text-[#171717]">Drop Projects Here</p>
                                                <p>Drag any project card from the left container or click its + Add button to place it on this page.</p>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </div>
                              </div>
                            ) : activeSectionTab === 'dev-grid' ? (
                              /* DRAG AND DROP DEVELOPERS DIRECTORY GRID SELECTOR (From Developers Tab) */
                              <div className="space-y-4 pt-2">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                                  <div>
                                    <h4 className="text-base font-bold text-[#171717]">
                                      Developers Directory Grid Selector (Drag &amp; Drop from Developers Tab)
                                    </h4>
                                    <p className="text-xs text-[#737373] mt-0.5">
                                      Drag developers from the left pool (Developers tab) into the right box or reorder them for the live /developer page.
                                    </p>
                                  </div>
                                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#FAF9F6] border border-[#E5E0D8] rounded-lg text-[#525252] self-start sm:self-auto">
                                    {getSectionItems('dev-grid', developerCards).length} Active in Grid
                                  </span>
                                </div>

                                {(() => {
                                  const selectedDevs: any[] = getSectionItems('dev-grid', developerCards);
                                  const selectedKeys = new Set(
                                    selectedDevs.map((d) => String(d.slug || d.name || '').toLowerCase().trim())
                                  );
                                  const unselectedDevs = developerCards.filter(
                                    (d) => !selectedKeys.has(String(d.slug || d.name || '').toLowerCase().trim())
                                  );

                                  const handleDevDragStart = (e: React.DragEvent, devItem: any, fromIndex?: number) => {
                                    e.dataTransfer.setData(
                                      'text/plain',
                                      JSON.stringify({ devItem, fromIndex })
                                    );
                                  };

                                  const handleDevDropToRight = (e: React.DragEvent, targetIndex?: number) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const raw = e.dataTransfer.getData('text/plain');
                                    if (!raw) return;
                                    try {
                                      const { devItem, fromIndex } = JSON.parse(raw);
                                      if (!devItem) return;
                                      const key = String(devItem.slug || devItem.name || '').toLowerCase().trim();
                                      if (typeof fromIndex === 'number' && typeof targetIndex === 'number') {
                                        if (fromIndex === targetIndex) return;
                                        const reordered = [...selectedDevs];
                                        const [moved] = reordered.splice(fromIndex, 1);
                                        reordered.splice(targetIndex, 0, moved);
                                        setSectionItems('dev-grid', reordered);
                                        return;
                                      }
                                      if (!selectedDevs.some((s) => String(s.slug || s.name || '').toLowerCase().trim() === key)) {
                                        if (typeof targetIndex === 'number') {
                                          const next = [...selectedDevs];
                                          next.splice(targetIndex, 0, devItem);
                                          setSectionItems('dev-grid', next);
                                        } else {
                                          setSectionItems('dev-grid', [...selectedDevs, devItem]);
                                        }
                                      }
                                    } catch (_) {}
                                  };

                                  const handleDevDropToLeft = (e: React.DragEvent) => {
                                    e.preventDefault();
                                    const raw = e.dataTransfer.getData('text/plain');
                                    if (!raw) return;
                                    try {
                                      const { devItem } = JSON.parse(raw);
                                      if (!devItem) return;
                                      const key = String(devItem.slug || devItem.name || '').toLowerCase().trim();
                                      setSectionItems(
                                        'dev-grid',
                                        selectedDevs.filter(
                                          (s) => String(s.slug || s.name || '').toLowerCase().trim() !== key
                                        )
                                      );
                                    } catch (_) {}
                                  };

                                  const moveDev = (idx: number, dir: -1 | 1) => {
                                    const targetIdx = idx + dir;
                                    if (targetIdx < 0 || targetIdx >= selectedDevs.length) return;
                                    const next = [...selectedDevs];
                                    const [moved] = next.splice(idx, 1);
                                    next.splice(targetIdx, 0, moved);
                                    setSectionItems('dev-grid', next);
                                  };

                                  return (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAF9F6] p-5 rounded-2xl border border-[#E5E0D8]">
                                      {/* Left Container: Available Developers from Developers Tab */}
                                      <div
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={handleDevDropToLeft}
                                        className="bg-[#F8F9FA] rounded-2xl p-5 border border-[#E5E0D8]/80 flex flex-col h-[520px]"
                                      >
                                        <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[#E5E0D8]">
                                          <h5 className="text-sm font-bold text-[#171717] tracking-tight">
                                            Developers Tab Pool
                                          </h5>
                                          <span className="text-[11px] font-medium text-[#737373]">
                                            {unselectedDevs.length} available
                                          </span>
                                        </div>

                                        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 custom-scrollbar">
                                          {unselectedDevs.map((dev, dIdx) => (
                                            <div
                                              key={dev.id || dev.name || dIdx}
                                              draggable
                                              onDragStart={(e) => handleDevDragStart(e, dev)}
                                              onClick={() => setSectionItems('dev-grid', [...selectedDevs, dev])}
                                              className="bg-white border border-[#E5E0D8] hover:border-[#BFA16A] p-3 rounded-xl cursor-grab active:cursor-grabbing hover:shadow-sm transition-all group flex items-center justify-between gap-3"
                                              title="Drag to right container or click to add"
                                            >
                                              <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-14 h-10 rounded-lg bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-center p-1.5 shrink-0">
                                                  <img
                                                    src={dev.logo || '/developers/emaar.png'}
                                                    alt={dev.name}
                                                    className="max-h-full max-w-full object-contain"
                                                  />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-[#171717] group-hover:text-[#BFA16A] truncate">
                                                  {dev.name}
                                                </span>
                                              </div>
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSectionItems('dev-grid', [...selectedDevs, dev]);
                                                }}
                                                className="px-2.5 py-1 bg-[#FAF9F6] hover:bg-[#BFA16A] hover:text-white text-[11px] font-semibold text-[#525252] rounded-lg transition shrink-0 cursor-pointer"
                                              >
                                                + Add &rarr;
                                              </button>
                                            </div>
                                          ))}
                                          {unselectedDevs.length === 0 && (
                                            <div className="h-full flex items-center justify-center text-xs text-[#8A8A8A] text-center px-4">
                                              All developers from the Developers tab are currently active in the Directory Grid.
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      {/* Right Container: Active in Directory Grid (Drag to Reorder) */}
                                      <div
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => handleDevDropToRight(e)}
                                        className="bg-white rounded-2xl p-5 border-2 border-dashed border-[#BFA16A]/50 hover:border-[#BFA16A] transition flex flex-col h-[520px] shadow-xs"
                                      >
                                        <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[#E5E0D8]">
                                          <h5 className="text-sm font-bold text-[#171717] tracking-tight flex items-center gap-2">
                                            <span>Active Directory Grid Cards</span>
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                          </h5>
                                          <span className="text-[11px] font-medium text-[#BFA16A]">
                                            {selectedDevs.length} active
                                          </span>
                                        </div>

                                        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 custom-scrollbar">
                                          {selectedDevs.map((dev, idx) => (
                                            <div
                                              key={dev.id || dev.name || idx}
                                              draggable
                                              onDragStart={(e) => handleDevDragStart(e, dev, idx)}
                                              onDragOver={(e) => e.preventDefault()}
                                              onDrop={(e) => handleDevDropToRight(e, idx)}
                                              className="bg-white border border-[#E5E0D8] p-3 rounded-xl shadow-xs hover:border-[#BFA16A] transition-all group flex items-center justify-between gap-3 cursor-grab active:cursor-grabbing"
                                            >
                                              <div className="flex items-center gap-3 min-w-0">
                                                <span className="text-[10px] font-mono font-bold text-[#737373] w-5 text-center shrink-0">
                                                  #{idx + 1}
                                                </span>
                                                <div className="w-14 h-10 rounded-lg bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-center p-1.5 shrink-0">
                                                  <img
                                                    src={dev.logo || '/developers/emaar.png'}
                                                    alt={dev.name}
                                                    className="max-h-full max-w-full object-contain"
                                                  />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-[#171717] truncate">
                                                  {dev.name}
                                                </span>
                                              </div>
                                              <div className="flex items-center gap-1 shrink-0">
                                                <button
                                                  type="button"
                                                  onClick={() => moveDev(idx, -1)}
                                                  disabled={idx === 0}
                                                  className="p-1 text-stone-400 hover:text-[#171717] disabled:opacity-30 rounded text-xs cursor-pointer"
                                                  title="Move Up"
                                                >
                                                  ↑
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() => moveDev(idx, 1)}
                                                  disabled={idx === selectedDevs.length - 1}
                                                  className="p-1 text-stone-400 hover:text-[#171717] disabled:opacity-30 rounded text-xs cursor-pointer"
                                                  title="Move Down"
                                                >
                                                  ↓
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    setSectionItems(
                                                      'dev-grid',
                                                      selectedDevs.filter((_, i) => i !== idx)
                                                    )
                                                  }
                                                  className="p-1.5 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition text-xs font-bold cursor-pointer"
                                                  title="Remove from Directory Grid"
                                                >
                                                  ✕
                                                </button>
                                              </div>
                                            </div>
                                          ))}
                                          {selectedDevs.length === 0 && (
                                            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-xs text-[#8A8A8A] space-y-2">
                                              <span className="text-2xl">📥</span>
                                              <p className="font-semibold text-[#171717]">Drop Developers Here</p>
                                              <p>Drag any developer card from the left pool or click + Add to display it in the Directory Grid.</p>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}

                                {/* Bottom Textbox Below All Developers Grid */}
                                <div className="pt-4 border-t border-[#E5E0D8] space-y-2">
                                  <label className="block text-xs font-semibold text-[#525252]">
                                    Bottom Directory Text (Displayed Below All Developers Grid)
                                  </label>
                                  <textarea
                                    rows={4}
                                    value={
                                      customSectionsData['dev-grid']?.contentText ??
                                      '245 developers with live off-plan inventory, photographed by their own launches and measured from the VILA database.\n\nDeciding between two names? Compare developers side by side: Emaar vs Sobha Realty, Emaar vs Damac, Sobha Realty vs Binghatti and more, with live project counts, entry prices, down payments and handover years from the register.'
                                    }
                                    onChange={(e) => setSectionContentText('dev-grid', e.target.value)}
                                    placeholder="245 developers with live off-plan inventory..."
                                    className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm text-[#171717] leading-relaxed focus:outline-none focus:border-[#BFA16A]"
                                  />
                                </div>
                              </div>
                            ) : activeSectionTab === 'buy-detail-hero' ? (
                              /* BUY-DETAIL #1: HERO & PHOTO GALLERY */
                              <div className="space-y-4 pt-2">
                                {(() => {
                                  const bh = customSectionsData['buy-detail-hero'] || {};
                                  const updateBh = (key: string, val: any) =>
                                    setCustomSectionsData((prev) => ({
                                      ...prev,
                                      'buy-detail-hero': {
                                        ...(prev['buy-detail-hero'] || {}),
                                        [key]: val,
                                      },
                                    }));
                                  const rawImages: string[] = Array.isArray(bh.images) && bh.images.length > 0
                                    ? bh.images
                                    : Array.isArray(bh.items) && bh.items.length > 0
                                    ? bh.items
                                    : [
                                        bh.mainImage && bh.mainImage !== '/buy-details-hero1.png' ? bh.mainImage : '/bannerimg.png',
                                        bh.sideImage1 && bh.sideImage1 !== '/buy-details-hero2.png' ? bh.sideImage1 : '/property-card.png',
                                        bh.sideImage2 && bh.sideImage2 !== '/buy-details-hero3.png' ? bh.sideImage2 : '/banner_img.png',
                                      ].filter(Boolean);

                                  const allImagesList = rawImages.map((u) =>
                                    u === '/buy-details-hero1.png'
                                      ? '/bannerimg.png'
                                      : u === '/buy-details-hero2.png'
                                      ? '/property-card.png'
                                      : u === '/buy-details-hero3.png'
                                      ? '/banner_img.png'
                                      : u
                                  );

                                  const updateHeroGallery = (nextList: string[], extraUpdates: Record<string, any> = {}) => {
                                    setCustomSectionsData((prev) => {
                                      const curr = prev['buy-detail-hero'] || {};
                                      const nextMain = nextList[0] || curr.mainImage || '/bannerimg.png';
                                      const nextSide1 = nextList[1] || nextList[0] || curr.sideImage1 || '/property-card.png';
                                      const nextSide2 = nextList[2] || nextList[1] || nextList[0] || curr.sideImage2 || '/banner_img.png';
                                      return {
                                        ...prev,
                                        'buy-detail-hero': {
                                          ...curr,
                                          ...extraUpdates,
                                          images: nextList,
                                          items: nextList,
                                          mainImage: nextMain,
                                          sideImage1: nextSide1,
                                          sideImage2: nextSide2,
                                          photoCount: extraUpdates.photoCount ?? (nextList.length > 0 ? String(nextList.length) : curr.photoCount || '20'),
                                        },
                                      };
                                    });
                                  };

                                  const addToGallery = (newUrl: string) => {
                                    if (!newUrl) return;
                                    const nextList = allImagesList.includes(newUrl)
                                      ? allImagesList
                                      : [...allImagesList, newUrl];
                                    updateHeroGallery(nextList);
                                  };

                                  const removeFromGallery = (idx: number) => {
                                    const nextList = allImagesList.filter((_, i) => i !== idx);
                                    updateHeroGallery(nextList);
                                  };

                                  const makePrimary = (idx: number) => {
                                    if (idx === 0) return;
                                    const picked = allImagesList[idx];
                                    const rest = allImagesList.filter((_, i) => i !== idx);
                                    updateHeroGallery([picked, ...rest]);
                                  };

                                  return (
                                    <div className="space-y-6">
                                      {/* ALL IMAGES GALLERY UPLOAD BOX (Matching User Screenshot 2) */}
                                      <div className="space-y-2">
                                        <h4 className="text-sm font-bold text-[#171717]">
                                          All Images
                                        </h4>
                                        <div className="flex items-center justify-between">
                                          <label className="block text-xs font-medium text-[#525252]">
                                            Upload Images To The Gallery
                                          </label>
                                          <span className="text-[11px] text-[#737373] font-medium">
                                            First 3 images display in Hero Collage (Main + 2 Side) • ({allImagesList.length})
                                          </span>
                                        </div>

                                        <div
                                          onDragOver={(e) => {
                                            e.preventDefault();
                                            e.dataTransfer.dropEffect = 'copy';
                                          }}
                                          onDrop={(e) => {
                                            e.preventDefault();
                                            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                              Array.from(e.dataTransfer.files).forEach((file) => {
                                                handleFileUpload(file, (url) => {
                                                  addToGallery(url);
                                                });
                                              });
                                            }
                                          }}
                                          className="bg-[#F3FAFF] border border-dashed border-[#38BDF8] rounded-xl p-6 min-h-[160px] transition hover:border-[#0284C7]"
                                        >
                                          <div className="flex flex-wrap items-center justify-center gap-4">
                                            {allImagesList.map((imgUrl, imgIdx) => (
                                              <div
                                                key={`buy-hero-img-${imgIdx}-${imgUrl}`}
                                                onClick={() => makePrimary(imgIdx)}
                                                title={imgIdx === 0 ? 'Main Featured Cover Image' : 'Click to set as Main Featured Image'}
                                                className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white border ${
                                                  imgIdx === 0 ? 'border-2 border-[#BFA16A]' : 'border-[#E5E0D8]'
                                                } shadow-xs group cursor-pointer shrink-0`}
                                              >
                                                <img
                                                  src={imgUrl}
                                                  alt=""
                                                  className="w-full h-full object-cover rounded-2xl pointer-events-none select-none"
                                                />
                                                {imgIdx === 0 && (
                                                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/75 text-white text-[9px] font-bold">
                                                    Main
                                                  </span>
                                                )}
                                                {imgIdx === 1 && (
                                                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/65 text-white text-[9px] font-semibold">
                                                    Side 1
                                                  </span>
                                                )}
                                                {imgIdx === 2 && (
                                                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/65 text-white text-[9px] font-semibold">
                                                    Side 2
                                                  </span>
                                                )}

                                                {/* Top-Right Circular White 'x' Delete Button */}
                                                <button
                                                  type="button"
                                                  onClick={(ev) => {
                                                    ev.stopPropagation();
                                                    removeFromGallery(imgIdx);
                                                  }}
                                                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white hover:bg-rose-50 text-[#737373] hover:text-rose-600 border border-[#E5E0D8] shadow-md flex items-center justify-center text-xs font-bold z-20 transition cursor-pointer"
                                                  title="Remove from Gallery"
                                                >
                                                  ×
                                                </button>
                                              </div>
                                            ))}

                                            {/* Upload / Add Image Card */}
                                            <label className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-2 border-dashed border-[#93C5FD] hover:border-[#0284C7] bg-white/80 hover:bg-white flex flex-col items-center justify-center cursor-pointer transition text-[#0284C7] shadow-2xs shrink-0 text-center p-2">
                                              <span className="text-2xl font-light leading-none">+</span>
                                              <span className="text-[11px] font-semibold mt-1">
                                                Upload Images
                                              </span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={(ev) => {
                                                  if (ev.target.files && ev.target.files.length > 0) {
                                                    Array.from(ev.target.files).forEach((file) => {
                                                      handleFileUpload(file, (url) => {
                                                        addToGallery(url);
                                                      });
                                                    });
                                                  }
                                                }}
                                              />
                                            </label>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Breadcrumb & Badges Settings */}
                                      <div className="p-4 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl space-y-4">
                                        <h5 className="text-xs font-bold text-[#BFA16A] uppercase tracking-wider">
                                          Breadcrumb &amp; Gallery Badges
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                          <div className="md:col-span-2">
                                            <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                              Breadcrumb Path
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                bh.breadcrumbPath ??
                                                'Villas > Jumeirah Islands > Mediterranean Clusters > ' +
                                                  (editingPage?.title || '')
                                              }
                                              onChange={(e) =>
                                                setCustomSectionsData((prev) => ({
                                                  ...prev,
                                                  'buy-detail-hero': {
                                                    ...(prev['buy-detail-hero'] || {}),
                                                    breadcrumbPath: e.target.value,
                                                  },
                                                }))
                                              }
                                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                              Photo Count Badge
                                            </label>
                                            <input
                                              type="text"
                                              value={bh.photoCount ?? String(allImagesList.length || 20)}
                                              onChange={(e) =>
                                                setCustomSectionsData((prev) => ({
                                                  ...prev,
                                                  'buy-detail-hero': {
                                                    ...(prev['buy-detail-hero'] || {}),
                                                    photoCount: e.target.value,
                                                  },
                                                }))
                                              }
                                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                            />
                                          </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-6 pt-1">
                                          <label className="flex items-center gap-2 text-xs font-semibold text-[#171717] cursor-pointer">
                                            <input
                                              type="checkbox"
                                              checked={bh.verifiedBadge !== false}
                                              onChange={(e) =>
                                                setCustomSectionsData((prev) => ({
                                                  ...prev,
                                                  'buy-detail-hero': {
                                                    ...(prev['buy-detail-hero'] || {}),
                                                    verifiedBadge: e.target.checked,
                                                  },
                                                }))
                                              }
                                              className="rounded border-[#E5E0D8] text-[#BFA16A]"
                                            />
                                            Show &quot;Verified&quot; Badge
                                          </label>
                                          <label className="flex items-center gap-2 text-xs font-semibold text-[#171717] cursor-pointer">
                                            <input
                                              type="checkbox"
                                              checked={bh.superAgentBadge !== false}
                                              onChange={(e) =>
                                                setCustomSectionsData((prev) => ({
                                                  ...prev,
                                                  'buy-detail-hero': {
                                                    ...(prev['buy-detail-hero'] || {}),
                                                    superAgentBadge: e.target.checked,
                                                  },
                                                }))
                                              }
                                              className="rounded border-[#E5E0D8] text-[#BFA16A]"
                                            />
                                            Show &quot;SuperAgent&quot; Badge
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            ) : activeSectionTab === 'buy-detail-overview' ? (
                              /* BUY-DETAIL #2: PROPERTY DETAILS & PRICING */
                              <div className="space-y-4 pt-2">
                                {(() => {
                                  const bo = customSectionsData['buy-detail-overview'] || {};
                                  const updateBo = (key: string, val: any) =>
                                    setCustomSectionsData((prev) => ({
                                      ...prev,
                                      'buy-detail-overview': {
                                        ...(prev['buy-detail-overview'] || {}),
                                        [key]: val,
                                      },
                                    }));
                                  return (
                                    <div className="p-4 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl space-y-4">
                                      <h4 className="text-xs font-bold text-[#BFA16A] uppercase tracking-wider">
                                        Property Pricing &amp; Key Specifications
                                      </h4>
                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">Property Title</label>
                                          <input
                                            type="text"
                                            value={bo.title ?? editingPage?.title ?? ''}
                                            onChange={(e) => updateBo('title', e.target.value)}
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">Asking Price</label>
                                          <input
                                            type="text"
                                            value={bo.price ?? 'AED 24,750,000'}
                                            onChange={(e) => updateBo('price', e.target.value)}
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-bold text-[#BFA16A]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">Monthly Estimate Label</label>
                                          <input
                                            type="text"
                                            value={bo.monthlyEstimate ?? 'Own from AED 89,073 / month'}
                                            onChange={(e) => updateBo('monthlyEstimate', e.target.value)}
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">Property Type</label>
                                          <input
                                            type="text"
                                            value={bo.propertyType ?? 'Villa'}
                                            onChange={(e) => updateBo('propertyType', e.target.value)}
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">Furnishing Status</label>
                                          <input
                                            type="text"
                                            value={bo.furnishing ?? 'Unfurnished'}
                                            onChange={(e) => updateBo('furnishing', e.target.value)}
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">Bedrooms</label>
                                          <input
                                            type="text"
                                            value={bo.bedrooms ?? '4'}
                                            onChange={(e) => updateBo('bedrooms', e.target.value)}
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">Bathrooms</label>
                                          <input
                                            type="text"
                                            value={bo.bathrooms ?? '5'}
                                            onChange={(e) => updateBo('bathrooms', e.target.value)}
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">Plot / BUA Area</label>
                                          <input
                                            type="text"
                                            value={bo.areaSqft ?? '10,643 sq ft'}
                                            onChange={(e) => updateBo('areaSqft', e.target.value)}
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            ) : activeSectionTab === 'buy-detail-description' ? (
                              /* BUY-DETAIL #3: DESCRIPTION & KEY FEATURES */
                              <div className="space-y-4 pt-2">
                                {(() => {
                                  const bd = customSectionsData['buy-detail-description'] || {};
                                  const paragraphs: string[] = Array.isArray(bd.paragraphs) ? bd.paragraphs : [];
                                  const bullets: string[] = Array.isArray(bd.bullets) ? bd.bullets : [];
                                  const updateBd = (key: string, val: any) =>
                                    setCustomSectionsData((prev) => ({
                                      ...prev,
                                      'buy-detail-description': {
                                        ...(prev['buy-detail-description'] || {}),
                                        [key]: val,
                                      },
                                    }));
                                  return (
                                    <div className="space-y-4">
                                      <div className="p-4 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div>
                                            <label className="block text-[11px] font-semibold text-[#525252] mb-1">Eyebrow Subtitle</label>
                                            <input
                                              type="text"
                                              value={bd.eyebrow ?? ''}
                                              onChange={(e) => updateBd('eyebrow', e.target.value)}
                                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-[11px] font-semibold text-[#525252] mb-1">Availability Text</label>
                                            <input
                                              type="text"
                                              value={bd.availableFrom ?? 'Available from 28 Sep 2026'}
                                              onChange={(e) => updateBd('availableFrom', e.target.value)}
                                              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                            />
                                          </div>
                                        </div>

                                        <div>
                                          <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-bold text-[#171717]">Description Paragraphs</label>
                                            <button
                                              type="button"
                                              onClick={() => updateBd('paragraphs', [...paragraphs, 'New paragraph text...'])}
                                              className="px-2.5 py-1 bg-[#BFA16A] text-white text-[11px] font-semibold rounded-lg"
                                            >
                                              + Add Paragraph
                                            </button>
                                          </div>
                                          <div className="space-y-2">
                                            {paragraphs.map((pText, pIdx) => (
                                              <div key={pIdx} className="flex items-start gap-2">
                                                <textarea
                                                  rows={3}
                                                  value={pText}
                                                  onChange={(e) => {
                                                    const next = [...paragraphs];
                                                    next[pIdx] = e.target.value;
                                                    updateBd('paragraphs', next);
                                                  }}
                                                  className="flex-1 bg-white border border-[#E5E0D8] rounded-xl p-3 text-xs text-[#171717]"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() => updateBd('paragraphs', paragraphs.filter((_, i) => i !== pIdx))}
                                                  className="px-2 py-1 text-xs text-rose-500 hover:bg-rose-50 rounded-lg"
                                                >
                                                  ✕
                                                </button>
                                              </div>
                                            ))}
                                          </div>
                                        </div>

                                        <div>
                                          <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-bold text-[#171717]">Key Feature Bullet Points</label>
                                            <button
                                              type="button"
                                              onClick={() => updateBd('bullets', [...bullets, 'New key highlight'])}
                                              className="px-2.5 py-1 bg-[#BFA16A] text-white text-[11px] font-semibold rounded-lg"
                                            >
                                              + Add Bullet
                                            </button>
                                          </div>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {bullets.map((bText, bIdx) => (
                                              <div key={bIdx} className="flex items-center gap-2">
                                                <input
                                                  type="text"
                                                  value={bText}
                                                  onChange={(e) => {
                                                    const next = [...bullets];
                                                    next[bIdx] = e.target.value;
                                                    updateBd('bullets', next);
                                                  }}
                                                  className="flex-1 bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() => updateBd('bullets', bullets.filter((_, i) => i !== bIdx))}
                                                  className="px-2 py-1 text-xs text-rose-500 hover:bg-rose-50 rounded-lg"
                                                >
                                                  ✕
                                                </button>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            ) : activeSectionTab === 'buy-detail-trends' ? (
                              /* BUY-DETAIL #5: TRANSACTIONS & PRICE TRENDS */
                              <div className="space-y-5 pt-2">
                                {(() => {
                                  const bt = customSectionsData['buy-detail-trends'] || {};
                                  const soldList: any[] = Array.isArray(bt.soldTransactions) ? bt.soldTransactions : [];
                                  const rentedList: any[] = Array.isArray(bt.rentedTransactions) ? bt.rentedTransactions : [];
                                  const updateBt = (key: string, val: any) =>
                                    setCustomSectionsData((prev) => ({
                                      ...prev,
                                      'buy-detail-trends': {
                                        ...(prev['buy-detail-trends'] || {}),
                                        [key]: val,
                                      },
                                    }));
                                  return (
                                    <div className="space-y-5">
                                      {/* 1. SIMILAR PROPERTY TRANSACTIONS (Sold For & Rented For stacked vertically) */}
                                      <div className="p-4 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl space-y-4">
                                        <h4 className="text-xs font-bold text-[#BFA16A] uppercase tracking-wider">
                                          Transactions for Similar Properties
                                        </h4>

                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                            Subtitle (e.g. 4 Beds Villa in Cluster 50)
                                          </label>
                                          <input
                                            type="text"
                                            value={bt.similarSubtitle ?? '4 Beds Villa in Cluster 50'}
                                            onChange={(e) => updateBt('similarSubtitle', e.target.value)}
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                          />
                                        </div>

                                        {/* Sold For (Top) */}
                                        <div className="p-3.5 bg-white border border-[#E5E0D8] rounded-xl space-y-2.5">
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-[#171717]">Sold For (AED)</span>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                updateBt('soldTransactions', [
                                                  ...soldList,
                                                  { date: '1 Jan 2026', price: '20,000,000', area: '10,000' },
                                                ])
                                              }
                                              className="px-2.5 py-1 bg-[#BFA16A]/10 hover:bg-[#BFA16A]/20 text-[#BFA16A] rounded-lg text-[11px] font-semibold transition cursor-pointer"
                                            >
                                              + Add Row
                                            </button>
                                          </div>
                                          <div className="grid grid-cols-3 gap-2 text-[10px] font-semibold text-[#737373] uppercase px-1">
                                            <span>Date</span>
                                            <span>AED</span>
                                            <span>Area (sqft)</span>
                                          </div>
                                          {soldList.map((row, rIdx) => (
                                            <div key={rIdx} className="grid grid-cols-3 gap-2">
                                              <input
                                                type="text"
                                                value={row.date || ''}
                                                onChange={(e) => {
                                                  const next = [...soldList];
                                                  next[rIdx] = { ...row, date: e.target.value };
                                                  updateBt('soldTransactions', next);
                                                }}
                                                placeholder="Date"
                                                className="bg-[#FAF9F6] border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs text-[#171717]"
                                              />
                                              <input
                                                type="text"
                                                value={row.price || row.aed || ''}
                                                onChange={(e) => {
                                                  const next = [...soldList];
                                                  next[rIdx] = { ...row, price: e.target.value };
                                                  updateBt('soldTransactions', next);
                                                }}
                                                placeholder="Price AED"
                                                className="bg-[#FAF9F6] border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs text-[#171717]"
                                              />
                                              <div className="flex items-center gap-1.5">
                                                <input
                                                  type="text"
                                                  value={row.area || ''}
                                                  onChange={(e) => {
                                                    const next = [...soldList];
                                                    next[rIdx] = { ...row, area: e.target.value };
                                                    updateBt('soldTransactions', next);
                                                  }}
                                                  placeholder="Area (sqft)"
                                                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs text-[#171717]"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    updateBt(
                                                      'soldTransactions',
                                                      soldList.filter((_, i) => i !== rIdx)
                                                    )
                                                  }
                                                  className="text-rose-500 hover:bg-rose-50 rounded-lg text-xs px-1.5 py-1 cursor-pointer"
                                                >
                                                  ✕
                                                </button>
                                              </div>
                                            </div>
                                          ))}
                                        </div>

                                        {/* Rented For (Stacked Below Sold For) */}
                                        <div className="p-3.5 bg-white border border-[#E5E0D8] rounded-xl space-y-2.5">
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-[#171717]">Rented For (AED / year)</span>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                updateBt('rentedTransactions', [
                                                  ...rentedList,
                                                  { date: '1 Jan 2026', price: '720,000', area: '10,000' },
                                                ])
                                              }
                                              className="px-2.5 py-1 bg-[#BFA16A]/10 hover:bg-[#BFA16A]/20 text-[#BFA16A] rounded-lg text-[11px] font-semibold transition cursor-pointer"
                                            >
                                              + Add Row
                                            </button>
                                          </div>
                                          <div className="grid grid-cols-3 gap-2 text-[10px] font-semibold text-[#737373] uppercase px-1">
                                            <span>Date</span>
                                            <span>AED / year</span>
                                            <span>Area (sqft)</span>
                                          </div>
                                          {rentedList.map((row, rIdx) => (
                                            <div key={rIdx} className="grid grid-cols-3 gap-2">
                                              <input
                                                type="text"
                                                value={row.date || ''}
                                                onChange={(e) => {
                                                  const next = [...rentedList];
                                                  next[rIdx] = { ...row, date: e.target.value };
                                                  updateBt('rentedTransactions', next);
                                                }}
                                                placeholder="Date"
                                                className="bg-[#FAF9F6] border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs text-[#171717]"
                                              />
                                              <input
                                                type="text"
                                                value={row.price || row.aedYear || ''}
                                                onChange={(e) => {
                                                  const next = [...rentedList];
                                                  next[rIdx] = { ...row, price: e.target.value };
                                                  updateBt('rentedTransactions', next);
                                                }}
                                                placeholder="Rent AED/year"
                                                className="bg-[#FAF9F6] border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs text-[#171717]"
                                              />
                                              <div className="flex items-center gap-1.5">
                                                <input
                                                  type="text"
                                                  value={row.area || ''}
                                                  onChange={(e) => {
                                                    const next = [...rentedList];
                                                    next[rIdx] = { ...row, area: e.target.value };
                                                    updateBt('rentedTransactions', next);
                                                  }}
                                                  placeholder="Area (sqft)"
                                                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-lg px-2.5 py-1.5 text-xs text-[#171717]"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    updateBt(
                                                      'rentedTransactions',
                                                      rentedList.filter((_, i) => i !== rIdx)
                                                    )
                                                  }
                                                  className="text-rose-500 hover:bg-rose-50 rounded-lg text-xs px-1.5 py-1 cursor-pointer"
                                                >
                                                  ✕
                                                </button>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* 2. PRICE & TRENDS CARDS (2 separate stacked cards: Price vs. Average & Size vs. Average) */}
                                      <div className="p-4 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl space-y-4">
                                        <h4 className="text-xs font-bold text-[#BFA16A] uppercase tracking-wider">
                                          Price &amp; Trends
                                        </h4>

                                        {/* Card 1: PRICE VS. AVERAGE */}
                                        <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-3">
                                          <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider block">
                                            Card 1 — Price vs. Average
                                          </span>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                              <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                Price vs. Average Badge (e.g. 6% Lower)
                                              </label>
                                              <input
                                                type="text"
                                                value={bt.priceVsAverageBadge ?? '6% Lower'}
                                                onChange={(e) => updateBt('priceVsAverageBadge', e.target.value)}
                                                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717]"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                Comparison Description
                                              </label>
                                              <input
                                                type="text"
                                                value={bt.priceVsAverageDesc ?? 'This property costs 6% less than the average.'}
                                                onChange={(e) => updateBt('priceVsAverageDesc', e.target.value)}
                                                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                This property (Price)
                                              </label>
                                              <input
                                                type="text"
                                                value={bt.priceThisProperty ?? 'AED 24,750,000'}
                                                onChange={(e) => updateBt('priceThisProperty', e.target.value)}
                                                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                Average sale price
                                              </label>
                                              <input
                                                type="text"
                                                value={bt.priceAverageProperty ?? 'AED 26,236,304'}
                                                onChange={(e) => updateBt('priceAverageProperty', e.target.value)}
                                                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        {/* Card 2: SIZE VS. AVERAGE (Stacked Below Card 1) */}
                                        <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-3">
                                          <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider block">
                                            Card 2 — Size vs. Average
                                          </span>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                              <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                Size vs. Average Badge (e.g. 33% Larger)
                                              </label>
                                              <input
                                                type="text"
                                                value={bt.sizeVsAverageBadge ?? '33% Larger'}
                                                onChange={(e) => updateBt('sizeVsAverageBadge', e.target.value)}
                                                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717]"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                Comparison Description
                                              </label>
                                              <input
                                                type="text"
                                                value={bt.sizeVsAverageDesc ?? 'This property is 33% bigger than the average.'}
                                                onChange={(e) => updateBt('sizeVsAverageDesc', e.target.value)}
                                                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                This property (Size)
                                              </label>
                                              <input
                                                type="text"
                                                value={bt.sizeThisProperty ?? '10,643 sq ft'}
                                                onChange={(e) => updateBt('sizeThisProperty', e.target.value)}
                                                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-[11px] font-semibold text-[#525252] mb-1">
                                                Average size
                                              </label>
                                              <input
                                                type="text"
                                                value={bt.sizeAverageProperty ?? '8,026 sq ft'}
                                                onChange={(e) => updateBt('sizeAverageProperty', e.target.value)}
                                                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            ) : activeSectionTab === 'buy-detail-location' ? (
                              /* BUY-DETAIL #6: LOCATION & MAP WITH GPS COORDINATES */
                              <div className="space-y-4 pt-2">
                                {(() => {
                                  const bl = customSectionsData['buy-detail-location'] || {};
                                  const updateBl = (key: string, val: any) =>
                                    setCustomSectionsData((prev) => {
                                      const currentLoc = prev['buy-detail-location'] || {};
                                      const updated = {
                                        ...currentLoc,
                                        [key]: val,
                                      };
                                      // If updating latitude or longitude, auto-calculate Google Maps link
                                      if (key === 'latitude' || key === 'longitude') {
                                        const curLat = key === 'latitude' ? val : (currentLoc.latitude ?? '25.31528411624274');
                                        const curLng = key === 'longitude' ? val : (currentLoc.longitude ?? '55.322673566004696');
                                        if (curLat && curLng) {
                                          updated.mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(curLat)},${encodeURIComponent(curLng)}`;
                                        }
                                      }
                                      return {
                                        ...prev,
                                        'buy-detail-location': updated,
                                      };
                                    });

                                  const curLat = bl.latitude ?? '25.31528411624274';
                                  const curLng = bl.longitude ?? '55.322673566004696';
                                  const previewCoords = `${encodeURIComponent(curLat)},${encodeURIComponent(curLng)}`;
                                  const embedPreviewUrl = `https://maps.google.com/maps?q=${previewCoords}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
                                  const effectiveMapUrl = bl.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${previewCoords}`;

                                  return (
                                    <div className="space-y-4">
                                      {/* 1. Address Details Box */}
                                      <div className="p-5 bg-white border border-[#E5E0D8] rounded-2xl space-y-4 shadow-2xs">
                                        <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
                                          <div>
                                            <h4 className="text-sm font-bold text-[#171717]">
                                              Location &amp; Address Details
                                            </h4>
                                            <p className="text-[11px] text-[#737373] mt-0.5">
                                              Neighborhood and cluster address displayed on the property listing and details page.
                                            </p>
                                          </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div>
                                            <label className="block text-xs font-semibold text-[#525252] mb-1.5">
                                              Address Primary Line
                                            </label>
                                            <input
                                              type="text"
                                              value={bl.addressTitle ?? 'Cluster 50, Mediterranean Clusters,'}
                                              onChange={(e) => updateBl('addressTitle', e.target.value)}
                                              placeholder="e.g. Cluster 50, Mediterranean Clusters,"
                                              className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A] focus:bg-white transition"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-xs font-semibold text-[#525252] mb-1.5">
                                              Address Secondary Line
                                            </label>
                                            <input
                                              type="text"
                                              value={bl.addressSubtitle ?? 'Jumeirah Islands, Dubai'}
                                              onChange={(e) => updateBl('addressSubtitle', e.target.value)}
                                              placeholder="e.g. Jumeirah Islands, Dubai"
                                              className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A] focus:bg-white transition"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      {/* 2. Map Coordinates (Latitude & Longitude) - Matches Project Location Coordinates */}
                                      <div className="p-6 bg-white border border-[#E5E0D8] rounded-2xl space-y-5 shadow-2xs">
                                        <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
                                          <div>
                                            <h4 className="text-base font-bold text-[#111827]">
                                              Add Map Coordinates
                                            </h4>
                                            <p className="text-xs text-[#6B7280] mt-0.5">
                                              Enter precise GPS coordinates to pin the exact property location on the live interactive map.
                                            </p>
                                          </div>
                                          <span className="text-xs px-2.5 py-1 rounded-full bg-[#F5F1EB] text-[#BA955C] font-semibold">
                                            GPS Pin Active
                                          </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          {/* Latitude */}
                                          <div>
                                            <label className="block text-sm font-medium text-[#374151] mb-2">
                                              Latitude
                                            </label>
                                            <div className="relative flex items-center">
                                              <span className="absolute left-3.5 text-[#9CA3AF] pointer-events-none">
                                                <svg
                                                  className="w-4 h-4"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  stroke="currentColor"
                                                  strokeWidth={1.8}
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                                  />
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                                  />
                                                </svg>
                                              </span>
                                              <input
                                                type="text"
                                                value={bl.latitude ?? '25.31528411624274'}
                                                onChange={(e) => updateBl('latitude', e.target.value)}
                                                placeholder="e.g. 25.31528411624274"
                                                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl pl-10 pr-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#BFA16A] focus:bg-white transition"
                                              />
                                            </div>
                                          </div>

                                          {/* Longitude */}
                                          <div>
                                            <label className="block text-sm font-medium text-[#374151] mb-2">
                                              Longitude
                                            </label>
                                            <div className="relative flex items-center">
                                              <span className="absolute left-3.5 text-[#9CA3AF] pointer-events-none">
                                                <svg
                                                  className="w-4 h-4"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  stroke="currentColor"
                                                  strokeWidth={1.8}
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                                  />
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                                  />
                                                </svg>
                                              </span>
                                              <input
                                                type="text"
                                                value={bl.longitude ?? '55.322673566004696'}
                                                onChange={(e) => updateBl('longitude', e.target.value)}
                                                placeholder="e.g. 55.322673566004696"
                                                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl pl-10 pr-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#BFA16A] focus:bg-white transition"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        {/* Google Maps Link URL */}
                                        <div className="pt-2">
                                          <div className="flex items-center justify-between mb-1.5">
                                            <label className="block text-xs font-semibold text-[#525252]">
                                              Google Maps Link URL
                                            </label>
                                            {effectiveMapUrl && (
                                              <a
                                                href={effectiveMapUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[11px] text-[#BA955C] hover:underline font-semibold flex items-center gap-1"
                                              >
                                                Test in Google Maps ↗
                                              </a>
                                            )}
                                          </div>
                                          <input
                                            type="text"
                                            value={bl.mapUrl ?? effectiveMapUrl}
                                            onChange={(e) => updateBl('mapUrl', e.target.value)}
                                            placeholder="https://www.google.com/maps/search/?api=1&query=..."
                                            className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A] focus:bg-white transition"
                                          />
                                        </div>

                                        {/* Live Interactive Map Preview Viewport */}
                                        <div className="pt-2">
                                          <label className="block text-xs font-semibold text-[#525252] mb-2">
                                            Live Interactive Map Preview
                                          </label>
                                          <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-[#E5E0D8] bg-[#E9E5DE]">
                                            <iframe
                                              key={`cms-prop-map-${curLat}-${curLng}`}
                                              src={embedPreviewUrl}
                                              title="Property Location Preview"
                                              className="w-full h-full border-0"
                                              loading="lazy"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            ) : activeSectionTab === 'buy-detail-building' ? (
                              /* BUY-DETAIL #7: BUILDING & COMMUNITY INSIGHTS */
                              <div className="space-y-4 pt-2">
                                {(() => {
                                  const bb = customSectionsData['buy-detail-building'] || {};
                                  const scores: any[] = Array.isArray(bb.scores) ? bb.scores : [];
                                  const updateBb = (key: string, val: any) =>
                                    setCustomSectionsData((prev) => ({
                                      ...prev,
                                      'buy-detail-building': {
                                        ...(prev['buy-detail-building'] || {}),
                                        [key]: val,
                                      },
                                    }));
                                  return (
                                    <div className="p-4 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl space-y-4">
                                      <h4 className="text-xs font-bold text-[#BFA16A] uppercase tracking-wider">
                                        Building &amp; Community Insights
                                      </h4>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">Building Tab Heading</label>
                                          <input
                                            type="text"
                                            value={bb.buildingTitle ?? 'About Cluster 50'}
                                            onChange={(e) => updateBb('buildingTitle', e.target.value)}
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">Community Tab Heading</label>
                                          <input
                                            type="text"
                                            value={bb.communityTitle ?? 'About Mediterranean Clusters'}
                                            onChange={(e) => updateBb('communityTitle', e.target.value)}
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">Price Range</label>
                                          <input
                                            type="text"
                                            value={bb.priceRange ?? 'AED 21.9M - 43.9M'}
                                            onChange={(e) => updateBb('priceRange', e.target.value)}
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#171717]"
                                          />
                                        </div>
                                        <div className="md:col-span-3">
                                          <label className="block text-[11px] font-semibold text-[#525252] mb-1">Summary Description</label>
                                          <textarea
                                            rows={2}
                                            value={bb.summary ?? ''}
                                            onChange={(e) => updateBb('summary', e.target.value)}
                                            className="w-full bg-white border border-[#E5E0D8] rounded-xl p-3 text-xs text-[#171717]"
                                          />
                                        </div>
                                      </div>
                                      {scores.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                                          {scores.map((sc, sIdx) => (
                                            <div key={sIdx} className="bg-white border border-[#E5E0D8] rounded-xl p-3 space-y-1.5">
                                              <input
                                                type="text"
                                                value={sc.label || ''}
                                                onChange={(e) => {
                                                  const next = [...scores];
                                                  next[sIdx] = { ...sc, label: e.target.value };
                                                  updateBb('scores', next);
                                                }}
                                                className="w-full text-xs font-bold text-[#171717] border-b border-[#E5E0D8] pb-1"
                                              />
                                              <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-[#737373]">Score:</span>
                                                <input
                                                  type="text"
                                                  value={sc.score || '5.0'}
                                                  onChange={(e) => {
                                                    const next = [...scores];
                                                    next[sIdx] = { ...sc, score: e.target.value };
                                                    updateBb('scores', next);
                                                  }}
                                                  className="w-16 text-xs font-semibold text-[#BFA16A]"
                                                />
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })()}
                              </div>
                            ) : null}
                          </>
                        );
                      })()}
                    </div>
                  )}
                </main>
              </div>
              )}
            </div>
          </div>
        ) : editingItem && editingType === 'properties' ? (
          /* ========================================================================= */
          /* 1.5 FULL PAGE EDITOR VIEW FOR PROPERTIES                                  */
          /* ========================================================================= */
          <div className="flex-1 flex flex-col min-h-0 bg-[#F4F5F7]">
            {/* Top Bar for Property Editor */}
            <header className="bg-white border-b border-[#E5E0D8] px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xs sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-3.5 py-2 text-xs font-semibold text-[#525252] bg-[#FAF9F6] border border-[#E5E0D8] hover:border-[#BFA16A] hover:text-[#BFA16A] rounded-xl transition flex items-center gap-2 shadow-xs"
                >
                  <span>←</span> Back to Properties
                </button>
                <div>
                  <h2 className="text-xl font-bold text-[#171717] tracking-tight">
                    Update Property: {editingItem.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#525252] bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl hover:bg-white transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveItemEdits}
                  disabled={submitting}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-md shadow-[#BFA16A]/20 disabled:opacity-50"
                >
                  {submitting ? 'Saving Changes...' : '💾 Save & Update Property'}
                </button>
              </div>
            </header>

            {/* Property Form Workspace */}
            <div className="flex-1 p-6 lg:p-8 max-w-[1200px] w-full mx-auto space-y-6">
              <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6 lg:p-8 shadow-xs space-y-6">
                <div className="border-b border-[#E5E0D8] pb-4">
                  <h3 className="text-lg font-bold text-[#171717]">Property Core Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#525252] mb-1.5">Property Title / Name</label>
                    <input
                      type="text"
                      required
                      value={propTitle}
                      onChange={(e) => setPropTitle(e.target.value)}
                      placeholder="e.g. 5 Bed Luxury Villa in Palm Jumeirah"
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#171717]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1.5">Property Type</label>
                    <select
                      value={propType}
                      onChange={(e) => setPropType(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-xs text-[#171717]"
                    >
                      <option value="Ready Villa">Ready Villa</option>
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Mansion">Mansion</option>
                      <option value="Townhouse">Townhouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1.5">Price (e.g. AED 5,000,000)</label>
                    <input
                      type="text"
                      required
                      value={propPrice}
                      onChange={(e) => setPropPrice(e.target.value)}
                      placeholder="AED 5,000,000"
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-xs font-bold text-[#BFA16A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1.5">Location / Master Community</label>
                    <input
                      type="text"
                      required
                      value={propLocation}
                      onChange={(e) => setPropLocation(e.target.value)}
                      placeholder="e.g. Dubai Hills Estate, Dubai"
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-xs text-[#171717]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1.5">Availability Status</label>
                    <select
                      value={propStatus}
                      onChange={(e) => setPropStatus(e.target.value as any)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-xs text-[#171717]"
                    >
                      <option value="available">Available</option>
                      <option value="reserved">Reserved</option>
                      <option value="sold">Sold</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-[#E5E0D8] pt-6">
                  <h3 className="text-lg font-bold text-[#171717] mb-4">Specifications & Sizing</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#525252] mb-1.5">Bedrooms Count</label>
                      <input
                        type="number"
                        min={0}
                        value={propBeds}
                        onChange={(e) => setPropBeds(Number(e.target.value))}
                        className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-xs text-[#171717]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#525252] mb-1.5">Bathrooms Count</label>
                      <input
                        type="number"
                        min={0}
                        value={propBaths}
                        onChange={(e) => setPropBaths(Number(e.target.value))}
                        className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-xs text-[#171717]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#525252] mb-1.5">Built-up Area (Sq. Ft.)</label>
                      <input
                        type="number"
                        min={0}
                        value={propArea}
                        onChange={(e) => setPropArea(Number(e.target.value))}
                        className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-xs text-[#171717]"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#E5E0D8] pt-6 space-y-4">
                  <h3 className="text-lg font-bold text-[#171717]">Property Media</h3>
                  <CoverImagePicker
                    label="Property Cover Image"
                    imageUrl={propImage}
                    onChange={(url) => setPropImage(url)}
                    onFileUpload={handleFileUpload}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-[#E5E0D8]">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-5 py-2.5 text-xs font-semibold text-[#525252] bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl hover:bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveItemEdits}
                    disabled={submitting}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl shadow-md shadow-[#BFA16A]/20"
                  >
                    {submitting ? 'Saving...' : 'Save & Publish Property'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* 2. REGULAR DASHBOARD TAB VIEWS                                            */
          /* ========================================================================= */
          <>
            {/* Top Bar Header */}
            <header className="h-20 bg-white border-b border-[#E5E0D8] px-8 flex items-center justify-between shadow-xs sticky top-0 z-20">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#171717] capitalize">
                  {activeTab === 'pages' && 'Pages Collection'}
                  {activeTab === 'dynamic-pages' && 'Dynamic & Custom Pages'}
                  {activeTab === 'properties' && 'Property Listings (Ready & Resale)'}
                  {activeTab === 'offplans' && 'Off-Plan Project Launches'}
                  {activeTab === 'communities' && 'Master Communities & Neighborhoods'}
                  {activeTab === 'projects' && 'Developers'}
                  {activeTab === 'blogs' && 'Real Estate Blogs & Articles'}
                  {activeTab === 'reviews' && 'Client Reviews & Testimonials (Global)'}
                  {activeTab === 'amenities' && 'Community & Project Amenities'}
                  {activeTab === 'icons' && 'Icons & Vector Assets Library'}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="http://:3000"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold text-[#171717] bg-white border border-[#E5E0D8] hover:border-[#BFA16A] hover:text-[#BFA16A] rounded-xl transition shadow-xs flex items-center gap-2"
                >
                  <span>↗</span> Live Website
                </a>

                {activeTab === 'reviews' ? (
                  <button
                    onClick={handleSaveGlobalReviews}
                    disabled={submitting}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-md shadow-[#BFA16A]/20 flex items-center gap-2"
                  >
                    <span>💾</span>
                    {submitting ? 'Syncing...' : 'Save & Sync Reviews Across All Pages'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setPageTitle('');
                      setPageSlug('');
                      setPageMetaTitle('');
                      setPageMetaDesc('');
                      setPageStatus('draft');
                      setPropTitle('');
                      setPropPrice('AED 5,000,000');
                      setPropLocation('Dubai');
                      setPropType('Ready Villa');
                      setPropBeds(3);
                      setPropBaths(3);
                      setPropArea(2450);
                      setPropStatus('available');
                      setPropImage('/thevalley.png');
                      setOffTitle('');
                      setProjTitle('');
                      setCommName('');
                      setCommSlug('');
                      setCommIcon('/dubai_hills.png');
                      setCommImage('/dubai hills.png');
                      setCommLocation('Dubai, UAE');
                      setCommHref('#');
                      setCommStatus('Active');
                      setCommDesc('');
                      if (activeTab === 'dynamic-pages') {
                        handleCreateNewDynamicPage();
                      } else {
                        setIsAddModalOpen(true);
                      }
                    }}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-md shadow-[#BFA16A]/20 flex items-center gap-2"
                  >
                    <span className="text-sm">+</span>
                    {activeTab === 'dynamic-pages'
                      ? 'Add Dynamic Page'
                      : activeTab === 'properties'
                      ? 'Add Property Listing'
                      : activeTab === 'offplans'
                      ? 'Add Off-Plan Project'
                      : activeTab === 'communities'
                      ? 'Add Community'
                      : activeTab === 'amenities'
                      ? 'Add Amenity'
                      : activeTab === 'icons'
                      ? 'Upload / Add Icon'
                      : 'Add New Entry'}
                  </button>
                )}
              </div>
            </header>

            {/* Pages Tab */}
            {activeTab === 'pages' && (
              <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
                <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#171717]">All Website Pages</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setPageTitle('');
                          setPageSlug('');
                          setPageMetaTitle('');
                          setPageMetaDesc('');
                          setPageStatus('draft');
                          handleCreateNewDynamicPage();
                        }}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs"
                      >
                        + Add Dynamic Page
                      </button>
                      <button
                        onClick={checkBackendAndFetch}
                        className="px-3 py-1.5 text-xs font-semibold text-[#525252] bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl hover:bg-white"
                      >
                        🔄 Sync
                      </button>
                    </div>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#FAF9F6] text-[#737373] text-[11px] uppercase border-b border-[#E5E0D8]">
                      <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">URL Route</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E0D8]">
                      {pages
                        .filter((p) => coreStaticSlugs.includes(p.slug))
                        .map((p, pIdx) => {
                          const dynamic = isDynamicPage(p);
                        return (
                          <tr key={`all-page-${p.id ?? pIdx}-${p.slug}`} className="hover:bg-[#FAF9F6]">
                            <td className="px-6 py-4 font-semibold text-[#171717]">
                              <div className="flex items-center gap-2">
                                <span>{p.title}</span>
                                {dynamic && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#BFA16A]/10 text-[#BFA16A] border border-[#BFA16A]/30">
                                    Dynamic
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs text-[#BFA16A]">/{p.slug}</td>
                            <td className="px-6 py-4 text-xs font-medium text-[#737373]">
                              {dynamic ? (
                                <span className="inline-flex items-center gap-1 text-[#BFA16A]">
                                  <span>✨</span> Dynamic Custom
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[#525252]">
                                  <span>⚙️</span> Core System
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {p.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                              <a
                                href={`http://:3000/${p.slug === 'home' ? '' : p.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 text-xs font-semibold text-[#525252] bg-white hover:text-[#BFA16A] hover:border-[#BFA16A] rounded-lg transition border border-[#E5E0D8]"
                              >
                                ↗ View
                              </a>
                              <button
                                onClick={() => {
                                  setEditorReturnTab('pages');
                                  openPageEditor(p);
                                }}
                                className="px-3.5 py-1.5 text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 hover:bg-[#BFA16A]/20 rounded-lg transition border border-[#BFA16A]/30"
                              >
                                Edit Section Content
                              </button>
                              <button
                                onClick={() => handleDeleteItem('pages', p.id, p.title)}
                                className="px-3.5 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition border border-rose-200"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Dynamic Pages Dedicated Tab */}
            {activeTab === 'dynamic-pages' && (
              <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
                <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#171717]">Dynamic & Custom Pages</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setPageTitle('');
                          setPageSlug('');
                          setPageMetaTitle('');
                          setPageMetaDesc('');
                          handleCreateNewDynamicPage();
                        }}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs flex items-center gap-1.5"
                      >
                        <span className="text-sm font-bold">+</span> Add Dynamic Page
                      </button>
                      <button
                        onClick={checkBackendAndFetch}
                        className="px-3 py-1.5 text-xs font-semibold text-[#525252] bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl hover:bg-white"
                      >
                        🔄 Sync
                      </button>
                    </div>
                  </div>

                  {pages.filter(isDynamicPage).length === 0 ? (
                    <div className="p-12 text-center space-y-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#BFA16A]/10 text-[#BFA16A] flex items-center justify-center text-xl">
                        ✨
                      </div>
                      <h4 className="text-base font-bold text-[#171717]">No Dynamic Pages Created Yet</h4>
                      <button
                        onClick={() => {
                          setPageTitle('');
                          setPageSlug('');
                          setPageMetaTitle('');
                          setPageMetaDesc('');
                          setPageStatus('draft');
                          handleCreateNewDynamicPage();
                        }}
                        className="mt-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-sm"
                      >
                        + Create Your First Dynamic Page
                      </button>
                    </div>
                  ) : (
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#FAF9F6] text-[#737373] text-[11px] uppercase border-b border-[#E5E0D8]">
                        <tr>
                          <th className="px-6 py-4">Page Title</th>
                          <th className="px-6 py-4">URL Route</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Last Updated</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E0D8]">
                        {pages.filter(isDynamicPage).map((p, pIdx) => (
                          <tr key={`dyn-page-${p.id ?? pIdx}-${p.slug}`} className="hover:bg-[#FAF9F6]">
                            <td className="px-6 py-4 font-semibold text-[#171717]">
                              <div className="flex items-center gap-2">
                                <span>{p.title}</span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#BFA16A]/10 text-[#BFA16A] border border-[#BFA16A]/30">
                                  Dynamic
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs text-[#BFA16A]">/{p.slug}</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {p.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs text-[#737373]">
                              {'Recently'}
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                              <a
                                href={`http://:3000/${p.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 text-xs font-semibold text-[#525252] bg-white hover:text-[#BFA16A] hover:border-[#BFA16A] rounded-lg transition border border-[#E5E0D8]"
                              >
                                ↗ View
                              </a>
                              <button
                                onClick={() => {
                                  setEditorReturnTab('dynamic-pages');
                                  openPageEditor(p);
                                }}
                                className="px-3.5 py-1.5 text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 hover:bg-[#BFA16A]/20 rounded-lg transition border border-[#BFA16A]/30"
                              >
                                Edit Section Content
                              </button>
                              <button
                                onClick={() => handleDeleteItem('dynamic-pages', p.id, p.title)}
                                className="px-3.5 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition border border-rose-200"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* Property Listings Tab */}
            {activeTab === 'properties' && (
              <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
                <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-6 border-b border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#171717]">Ready &amp; Resale Property Listings</h3>
                      <p className="text-xs text-[#737373] mt-0.5">
                        Every property opens with all 10 Buy-Detail page sections (Hero Gallery, Pricing &amp; Specs, Description, Amenities, Price Trends, Location, Building Insights, Sidebar, Mortgage Calculator &amp; Recommended).
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={() => {
                          const buyDetailPage = pages.find((p) => p.slug === 'buy-detail') || {
                            id: 5,
                            title: 'Buy Detail',
                            slug: 'buy-detail',
                            status: 'published',
                            content: { hero: {}, customSections: {} },
                          };
                          setEditorReturnTab('properties');
                          openPageEditor(buyDetailPage);
                          setActiveSectionTab('buy-detail-hero');
                        }}
                        className="px-3.5 py-1.5 text-xs font-semibold text-[#171717] bg-[#FAF9F6] border border-[#E5E0D8] hover:border-[#BFA16A] hover:text-[#BFA16A] rounded-xl transition flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>📝</span> Edit Main Buy Detail Page
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingType('properties');
                          setEditingItem(null);
                          setPropTitle('');
                          setPropPrice('AED 5,000,000');
                          setPropLocation('Dubai');
                          setPropType('Ready Villa');
                          setPropBeds(3);
                          setPropBaths(3);
                          setPropArea(2450);
                          setPropStatus('available');
                          setPropImage('/bannerimg.png');
                          setIsAddModalOpen(true);
                        }}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="text-sm font-bold">+</span> Add Property Listing
                      </button>
                      <button
                        type="button"
                        onClick={handleSavePropertiesList}
                        disabled={submitting}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#171717] hover:bg-[#2c2c2c] rounded-xl transition shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <span>💾</span> {submitting ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={checkBackendAndFetch}
                        className="px-3 py-1.5 text-xs font-semibold text-[#525252] bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl"
                      >
                        🔄 Sync
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {properties.map((p, pIdx) => {
                        const pSlug = p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        return (
                          <div
                            key={`prop-card-${p.id ?? pIdx}-${p.slug ?? pIdx}-${pIdx}`}
                            className="bg-[#FAF9F6] border border-[#E5E0D8] hover:border-[#BFA16A] rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-2xs hover:shadow-md"
                          >
                            {/* Image Cover */}
                            <div className="relative h-40 w-full bg-[#EFEBE4] overflow-hidden">
                              <img
                                src={(!p.image_url || p.image_url === '/buy-details-hero1.png') ? '/bannerimg.png' : p.image_url}
                                alt={p.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                              
                              <div className="absolute top-2.5 left-2.5">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#BFA16A] text-white shadow-2xs">
                                  {p.type}
                                </span>
                              </div>

                              <div className="absolute top-2.5 right-2.5">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 text-[#171717] backdrop-blur-xs">
                                  {p.status || 'available'}
                                </span>
                              </div>

                              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                                <span className="text-base font-bold text-white drop-shadow-xs">
                                  {p.price}
                                </span>
                              </div>
                            </div>

                            {/* Details */}
                            <div className="p-4 flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="text-sm font-bold text-[#171717] group-hover:text-[#BFA16A] transition-colors line-clamp-1">
                                  {p.title}
                                </h4>
                                <p className="text-xs text-[#737373] mt-1 flex items-center gap-1.5">
                                  <span>📍</span> {p.location}
                                </p>
                                <div className="mt-2 flex items-center gap-2 text-[11px] text-[#525252] font-medium">
                                  <span className="bg-white border border-[#E5E0D8] px-2 py-0.5 rounded-md">🛏️ {p.bedrooms} Beds</span>
                                  <span className="bg-white border border-[#E5E0D8] px-2 py-0.5 rounded-md">🚿 {p.bathrooms} Baths</span>
                                  {p.area_sqft && (
                                    <span className="bg-white border border-[#E5E0D8] px-2 py-0.5 rounded-md">📐 {p.area_sqft} sqft</span>
                                  )}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="mt-4 pt-3 border-t border-[#E5E0D8] flex items-center gap-2">
                                <a
                                  href={`http://:3000/buy-detail?slug=${pSlug}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="py-1.5 px-2.5 text-xs font-semibold text-[#525252] bg-white hover:text-[#BFA16A] hover:border-[#BFA16A] rounded-xl transition border border-[#E5E0D8] flex items-center justify-center"
                                  title="View on Website"
                                >
                                  ↗
                                </a>
                                <button
                                  type="button"
                                  onClick={() => openPropertyEditor(p)}
                                  className="flex-1 py-1.5 px-3 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
                                >
                                  <span>✏️</span> Edit Property Sections
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteItem('properties', p.id, p.title)}
                                  className="p-1.5 text-xs font-semibold text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition border border-rose-200"
                                  title="Delete Property"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Off-Plan Projects Tab */}
            {activeTab === 'offplans' && (
              <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
                <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#171717]">Off-Plan Launches & Projects</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const projPage = pages.find((p) => p.slug === 'project-detail') || {
                            id: 9991,
                            title: 'Project Detail Page',
                            slug: 'project-detail',
                            status: 'published',
                            content: { hero: {}, customSections: {} },
                          };
                          setEditorReturnTab('offplans');
                          openPageEditor(projPage);
                        }}
                        className="px-3.5 py-1.5 text-xs font-semibold text-[#171717] bg-[#FAF9F6] border border-[#E5E0D8] hover:border-[#BFA16A] hover:text-[#BFA16A] rounded-xl transition flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>📝</span> Edit Main Project Detail Page
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingType('offplans');
                          setEditingItem(null);
                          setOffTitle('');
                          setOffDeveloper('DAMAC Properties');
                          setOffPrice('AED 2,490,000');
                          setOffLocation('Dubai');
                          setOffCompletion('Q4 2029');
                          setIsAddModalOpen(true);
                        }}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="text-sm font-bold">+</span> Add Off-Plan Project
                      </button>
                      <button
                        onClick={checkBackendAndFetch}
                        className="px-3 py-1.5 text-xs font-semibold text-[#525252] bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl"
                      >
                        🔄 Sync
                      </button>
                    </div>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#FAF9F6] text-[#737373] text-[11px] uppercase border-b border-[#E5E0D8]">
                      <tr>
                        <th className="px-6 py-4">Off-Plan Development</th>
                        <th className="px-6 py-4">Developer</th>
                        <th className="px-6 py-4">Starting Price</th>
                        <th className="px-6 py-4">Completion Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E0D8]">
                      {offplans.map((o, oIdx) => (
                        <tr key={`offplan-${o.id ?? oIdx}-${o.slug || o.title}`} className="hover:bg-[#FAF9F6]">
                          <td className="px-6 py-4 font-semibold text-[#171717]">{o.title}</td>
                          <td className="px-6 py-4 text-xs font-medium text-[#737373]">{o.developer}</td>
                          <td className="px-6 py-4 font-bold text-[#BFA16A]">{o.starting_price}</td>
                          <td className="px-6 py-4 text-xs text-[#525252]">{o.completion_date}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                              {o.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <a
                              href={`http://:3000/project-detail?slug=${o.slug || o.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 text-xs font-semibold text-[#525252] bg-white hover:text-[#BFA16A] hover:border-[#BFA16A] rounded-lg transition border border-[#E5E0D8] inline-flex items-center gap-1 shadow-2xs"
                              title="View on Website"
                            >
                              ↗ View
                            </a>
                            <button
                              onClick={() => openProjectEditor(o)}
                              className="px-3 py-1 text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 hover:bg-[#BFA16A]/20 rounded-lg transition border border-[#BFA16A]/30"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteItem('offplans', o.id, o.title)}
                              className="px-3 py-1 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition border border-rose-200"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Communities Tab (Pages Format matching second image) */}
            {activeTab === 'communities' && (
              <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
                <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-6 border-b border-[#E5E0D8] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#171717]">Communities Directory</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const commPage = pages.find((p) => p.slug === 'communities');
                          if (commPage) {
                            openPageEditor(commPage);
                          } else {
                            alert('Opening Communities Section Builder');
                          }
                        }}
                        className="px-4 py-2 text-xs font-semibold text-[#171717] bg-[#FAF9F6] border border-[#E5E0D8] hover:border-[#BFA16A] hover:text-[#BFA16A] rounded-xl transition shadow-2xs flex items-center gap-1.5"
                      >
                        <span>📝</span> Edit Communities Page
                      </button>

                      <button
                        onClick={() => {
                          setCommName('');
                          setCommTag('Waterfront living');
                          setCommSlug('');
                          setCommIcon('/dubai_hills.png');
                          setCommImage('/dubai hills.png');
                          setCommLocation('Dubai, UAE');
                          setCommHref('#');
                          setCommStatus('Active');
                          setCommDesc('');
                          setCommLongContent('');
                          setIsAddModalOpen(true);
                        }}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs flex items-center gap-1.5"
                      >
                        <span className="text-sm font-bold">+</span> Add Community
                      </button>
                      <button
                        onClick={checkBackendAndFetch}
                        className="px-3 py-1.5 text-xs font-semibold text-[#525252] bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl hover:bg-white"
                      >
                        🔄 Sync
                      </button>
                    </div>
                  </div>

                  {/* Grid Cards of All Communities */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {communities.map((c) => {
                        const slug = c.slug || c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        const targetUrl = c.href && c.href !== '#'
                          ? (c.href.startsWith('http') ? c.href : `http://:3000${c.href.startsWith('/') ? '' : '/'}${c.href}`)
                          : `http://:3000/community-detail`;

                        return (
                          <div
                            key={c.id || c.name}
                            className="bg-[#FAF9F6] border border-[#E5E0D8] hover:border-[#BFA16A] rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-2xs hover:shadow-md"
                          >
                            {/* Card Media Header */}
                            <div className="relative h-44 w-full bg-[#EFEBE4] overflow-hidden">
                              <img
                                src={c.image || '/dubai hills.png'}
                                alt={c.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                              
                              {/* Top Icon and Status */}
                              <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                                {c.icon ? (
                                  <div className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-xs p-1.5 shadow-xs border border-white/40 flex items-center justify-center">
                                    <img src={c.icon} alt="" className="w-full h-full object-contain" />
                                  </div>
                                ) : <div />}
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#171717] backdrop-blur-xs shadow-2xs">
                                  {c.status || 'Active'}
                                </span>
                              </div>

                              {/* Bottom Vibe/Tag */}
                              <div className="absolute bottom-3 left-3 right-3">
                                {c.tag && (
                                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#BFA16A] text-white shadow-2xs">
                                    {c.tag}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-4 flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="text-base font-serif font-bold text-[#171717] group-hover:text-[#BFA16A] transition-colors">
                                  {c.name}
                                </h4>
                                <p className="text-[11px] font-mono text-[#BFA16A] mt-0.5">
                                  /{slug}
                                </p>
                                {c.description && (
                                  <p className="text-xs text-[#737373] mt-2 line-clamp-2 leading-relaxed">
                                    {c.description}
                                  </p>
                                )}
                              </div>

                              {/* Card Action Buttons */}
                              <div className="mt-4 pt-3 border-t border-[#E5E0D8] flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    // Look for matching community detail page in pages list or create dynamic community page object
                                    const existingCommPage = pages.find((p) => p.slug === slug);
                                    const commDetailPage =
                                      existingCommPage || {
                                        id: 99900 + (typeof c.id === 'number' ? c.id : Number(String(c.id).replace(/\D/g, '')) || 1),
                                        title: `Update Community Detail (${c.name})`,
                                        slug: slug || 'community-detail',
                                        status: 'published',
                                        meta_title: `${c.name} | Community Detail`,
                                        meta_description: c.description || '',
                                        content: {
                                          hero: {
                                            breadcrumb: `Communities / ${c.name}`,
                                            titleLine1: c.name.split(' ')[0]?.toUpperCase() || 'DUBAI',
                                            titleLine2: c.name.split(' ').slice(1).join(' ')?.toUpperCase() || 'COMMUNITY',
                                            subheading: c.description,
                                          },
                                          customSections: {
                                            'comm-overview': {
                                              tagline: 'Community overview',
                                              title: 'WATERFRONT CALM,\nCITY CONNECTION',
                                              contentText: c.description || '',
                                            },
                                            'comm-opportunities': {
                                              tagline: 'Projects here',
                                              title: 'SELECTED OPPORTUNITIES\nIN THE COMMUNITY',
                                              items: [],
                                            },
                                            'comm-amenities': {
                                              tagline: 'COMMUNITY AMENITIES',
                                              title: 'EVERYDAY LIFE,\nCLOSE AT HAND',
                                              contentText: 'Connected promenades, road networks and lifestyle amenities',
                                            },
                                            'comm-guide': {
                                              detailHtml: c.longContent || DEFAULT_OFFPLAN_GUIDE_HTML,
                                            },
                                          },
                                        },
                                      };
                                    setEditorReturnTab('communities');
                                    openPageEditor(commDetailPage);
                                  }}
                                  className="flex-1 py-1.5 px-3 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
                                >
                                  <span>✏️</span> Edit Community
                                </button>
                                <a
                                  href={targetUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 text-xs font-semibold text-[#525252] bg-white hover:text-[#BFA16A] hover:border-[#BFA16A] rounded-xl transition border border-[#E5E0D8]"
                                  title="View Community Page"
                                >
                                  ↗
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteItem('communities', c.id || c.name, c.name)}
                                  className="p-1.5 text-xs font-semibold text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition border border-rose-200"
                                  title="Delete Community"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Developers Tab */}
            {(activeTab === 'projects' || activeTab === 'developers') && (
              <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
                <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-6 border-b border-[#E5E0D8] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#171717]">Master Developers Directory</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const devPage = pages.find((p) => p.slug === 'developers');
                          if (devPage) {
                            openPageEditor(devPage);
                          }
                        }}
                        className="px-4 py-2 text-xs font-semibold text-[#171717] bg-[#FAF9F6] border border-[#E5E0D8] hover:border-[#BFA16A] hover:text-[#BFA16A] rounded-xl transition shadow-2xs flex items-center gap-1.5"
                      >
                        <span>📝</span> Edit Developers Page
                      </button>
                      <button
                        onClick={() => {
                          setDevName('');
                          setDevTag('Master Developer');
                          setDevSlug('');
                          setDevLogo('/developers/emaar.png');
                          setDevImage('/thevalley.png');
                          setDevLocation('Dubai, UAE');
                          setDevHref('#');
                          setDevStatus('Active');
                          setDevDesc('');
                          setIsAddModalOpen(true);
                        }}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs flex items-center gap-1.5"
                      >
                        <span className="text-sm font-bold">+</span> Add Developer
                      </button>
                      <button
                        onClick={checkBackendAndFetch}
                        className="px-3 py-1.5 text-xs font-semibold text-[#525252] bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl hover:bg-white"
                      >
                        🔄 Sync
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {developerCards.map((d, dIdx) => {
                        const slug = d.slug || d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        const openDeveloperDetailEditor = () => {
                          const existingDevPage = pages.find((p) => p.slug === slug);
                          const devDetailPage: PageItem =
                            existingDevPage || {
                              id: 98900 + dIdx,
                              title: d.name,
                              slug,
                              status: 'published',
                              meta_title: `${d.name} | Developer Detail`,
                              meta_description: d.description || '',
                              content: {
                                isDeveloper: true,
                                hero: {
                                  titleLine1: d.name.toUpperCase(),
                                  titleLine2: 'MASTER DEVELOPER',
                                  subheading: d.description || '',
                                  backgroundImage: d.image || '/developer-hero.png',
                                },
                                customSections: {
                                  'dev-detail-hero': {
                                    title: d.name,
                                    tagline: `Developer / ${d.name}`,
                                    contentText:
                                      d.description ||
                                      'Pioneering master-planned communities with global acclaim, world-class amenities and a reliable delivery track record in Dubai.',
                                    bgImage: d.image || '/developer-hero.png',
                                  },
                                  'dev-guide': {
                                    detailHtml: DEFAULT_OFFPLAN_GUIDE_HTML,
                                  },
                                },
                              },
                            };
                          setEditorReturnTab('developers');
                          openPageEditor(devDetailPage);
                        };

                        return (
                          <div
                            key={d.id || d.name || dIdx}
                            onClick={openDeveloperDetailEditor}
                            className="bg-white border border-[#E5E0D8] hover:border-[#BFA16A] rounded-2xl p-6 flex flex-col items-center justify-between group transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer"
                          >
                            {/* Centered Developer Logo */}
                            <div className="w-full h-28 flex items-center justify-center p-4 bg-[#FAF9F6] rounded-xl border border-[#F0ECE1] group-hover:bg-white transition-colors">
                              <img
                                src={d.logo || '/developers/emaar.png'}
                                alt={d.name}
                                className="max-h-16 max-w-[160px] w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>

                            {/* Only Developer Name */}
                            <div className="mt-4 text-center w-full">
                              <h4 className="text-sm font-bold uppercase tracking-wider text-[#171717] group-hover:text-[#BFA16A] transition-colors truncate">
                                {d.name}
                              </h4>
                            </div>

                            {/* Action Buttons */}
                            <div
                              className="mt-4 pt-3 border-t border-[#E5E0D8] w-full flex items-center gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={openDeveloperDetailEditor}
                                className="flex-1 py-1.5 px-3 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <span>✏️</span> Edit Detail Page
                              </button>
                              <a
                                href={`http://:3000/developers/${slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 text-xs font-semibold text-[#525252] hover:text-[#BFA16A] bg-[#FAF9F6] hover:bg-white rounded-xl transition border border-[#E5E0D8]"
                                title={`Open /developers/${slug}`}
                              >
                                ↗
                              </a>
                              <button
                                type="button"
                                onClick={() => handleDeleteItem('developers', d.id || d.name, d.name)}
                                className="p-1.5 text-xs font-semibold text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition border border-rose-200 cursor-pointer"
                                title="Delete Developer"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Blogs Directory Tab */}
            {activeTab === 'blogs' && (
              <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
                <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#171717]">Blogs &amp; Insights Directory</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const newBlogItem: BlogCMSItem = {
                            id: Date.now(),
                            title: 'New Real Estate Article',
                            slug: `new-real-estate-article-${Date.now().toString().slice(-4)}`,
                            category: 'Real Estate',
                            date: new Date().toLocaleDateString('en-US', {
                              month: 'long',
                              day: '2-digit',
                              year: 'numeric',
                            }),
                            tag: 'Featured Guide',
                            author: 'FS Editorial Advisory',
                            introParagraph: 'Write your opening article introduction here...',
                            secondParagraph: 'Expand with market analysis, key figures, and investment takeaways...',
                            bodyParagraphs: [],
                            imageSrc: '/Rectangle 34625593.png',
                            secondImageSrc: '/image 299.png',
                            status: 'published',
                            keyFigures: {
                              developer: 'EMAAR PROPERTIES',
                              community: 'DUBAI HILLS ESTATE',
                              unitTypes: '1, 2 & 3-BEDROOM APARTMENTS',
                              unitSizes: '675 SQ. FT – 1,777 SQ. FT',
                              startingPrice: 'AED 1.2 – 1.8 MILLION',
                              downPayment: '10%',
                              paymentPlan: '80/20',
                              expectedHandover: '2029',
                            },
                          };
                          setBlogsList((prev) => [newBlogItem, ...prev]);
                          openBlogEditor(newBlogItem);
                        }}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs flex items-center gap-1.5"
                      >
                        <span className="text-sm font-bold">+</span> Create New Blog Post
                      </button>
                      <button
                        onClick={handleSaveBlogsList}
                        disabled={submitting}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#171717] hover:bg-[#2c2c2c] rounded-xl transition shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <span>💾</span> {submitting ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={checkBackendAndFetch}
                        className="px-3 py-1.5 text-xs font-semibold text-[#525252] bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl hover:bg-white"
                      >
                        🔄 Sync
                      </button>
                    </div>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#FAF9F6] text-[#737373] text-[11px] uppercase border-b border-[#E5E0D8]">
                      <tr>
                        <th className="px-6 py-4">Article Title</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Publish Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E0D8]">
                      {blogsList.map((b, bIdx) => (
                        <tr key={`blog-${b.id ?? bIdx}-${b.slug || bIdx}`} className="hover:bg-[#FAF9F6]">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={b.imageSrc || '/Rectangle 34625593.png'}
                                alt={b.title}
                                className="w-12 h-9 rounded-lg object-cover border border-[#E5E0D8]"
                              />
                              <div>
                                <p className="font-semibold text-[#171717] line-clamp-1">{b.title}</p>
                                <p className="text-[11px] font-mono text-[#BFA16A]">/{b.slug}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-[#737373]">{b.category}</td>
                          <td className="px-6 py-4 text-xs text-[#525252]">{b.date}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {b.status || 'published'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <a
                              href={`http://:3000/blog-details?slug=${b.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 text-xs font-semibold text-[#525252] bg-white hover:text-[#BFA16A] hover:border-[#BFA16A] rounded-lg transition border border-[#E5E0D8] inline-flex items-center gap-1 shadow-2xs"
                            >
                              ↗ View
                            </a>
                            <button
                              onClick={() => openBlogEditor(b)}
                              className="px-3 py-1 text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 hover:bg-[#BFA16A]/20 rounded-lg transition border border-[#BFA16A]/30"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteItem('blogs', b.id, b.title)}
                              className="px-3 py-1 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition border border-rose-200"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Global Client Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="p-8 space-y-6 max-w-5xl mx-auto w-full">
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 lg:p-8 shadow-xs space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#E5E0D8] pb-5">
                    <div>
                      <h3 className="text-lg font-bold text-[#171717]">Client Reviews &amp; Testimonials</h3>
                      <p className="text-xs text-[#737373] mt-0.5">
                        Manage verified client testimonials displayed across website pages.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setReviewsList([
                          ...reviewsList,
                          {
                            id: String(Date.now()),
                            name: 'New Client',
                            role: 'Verified Client',
                            content: 'Enter client review feedback here...',
                            rating: 5,
                          },
                        ])
                      }
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs"
                    >
                      + Add Client Review
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#525252] mb-1.5">Section Heading</label>
                      <input
                        type="text"
                        value={reviewsHeading}
                        onChange={(e) => setReviewsHeading(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#525252] mb-1.5">Tagline / Badge</label>
                      <input
                        type="text"
                        value={reviewsTagline}
                        onChange={(e) => setReviewsTagline(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-xs text-[#171717]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-[#525252] mb-1.5">Intro Description</label>
                      <textarea
                        rows={2}
                        value={reviewsIntroText}
                        onChange={(e) => setReviewsIntroText(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl p-3 text-xs text-[#171717]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {reviewsList.map((rev, idx) => (
                      <div
                        key={rev.id || idx}
                        className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#BFA16A]">
                            Review #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => setReviewsList(reviewsList.filter((_, i) => i !== idx))}
                            className="text-xs font-semibold text-rose-600 hover:underline"
                          >
                            ✕ Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            value={rev.name}
                            onChange={(e) => {
                              const updated = [...reviewsList];
                              updated[idx] = { ...rev, name: e.target.value };
                              setReviewsList(updated);
                            }}
                            className="bg-white border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#171717]"
                            placeholder="Client Name"
                          />
                          <input
                            type="text"
                            value={rev.role}
                            onChange={(e) => {
                              const updated = [...reviewsList];
                              updated[idx] = { ...rev, role: e.target.value };
                              setReviewsList(updated);
                            }}
                            className="bg-white border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#525252]"
                            placeholder="Role (e.g. Verified Client)"
                          />
                          <select
                            value={rev.rating || 5}
                            onChange={(e) => {
                              const updated = [...reviewsList];
                              updated[idx] = { ...rev, rating: Number(e.target.value) };
                              setReviewsList(updated);
                            }}
                            className="bg-white border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                          >
                            {[5, 4, 3, 2, 1].map((r) => (
                              <option key={r} value={r}>
                                {r} Stars
                              </option>
                            ))}
                          </select>
                        </div>
                        <textarea
                          rows={2}
                          value={rev.content}
                          onChange={(e) => {
                            const updated = [...reviewsList];
                            updated[idx] = { ...rev, content: e.target.value };
                            setReviewsList(updated);
                          }}
                          className="w-full bg-white border border-[#E5E0D8] rounded-xl p-3 text-xs text-[#525252]"
                          placeholder="Review content..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Amenities Dedicated Tab */}
            {activeTab === 'amenities' && (
              <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
                <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#171717]">
                        Community, Project &amp; Property Amenities ({amenitiesList.length})
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        setNewAmenityName('');
                        setNewAmenityCategory('Property Feature');
                        setNewAmenityIcon(iconsList[0]?.codeOrUrl || '');
                        setIsAddModalOpen(true);
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs"
                    >
                      + Add New Amenity
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {amenitiesList.map((am) => {
                        const iconVal =
                          am.iconSvg ||
                          iconsList.find((ic) => ic.name.toLowerCase() === am.name.toLowerCase())?.codeOrUrl ||
                          '';
                        return (
                          <div
                            key={am.id}
                            className="p-4 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E0D8] flex items-center justify-center shrink-0">
                                {iconVal && iconVal.trim().startsWith('<') ? (
                                  <svg
                                    className="w-5 h-5 text-[#BFA16A]"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    dangerouslySetInnerHTML={{ __html: iconVal }}
                                  />
                                ) : iconVal && (iconVal.startsWith('/') || iconVal.startsWith('http') || iconVal.startsWith('data:')) ? (
                                  <img src={iconVal} alt={am.name} className="w-5 h-5 object-contain" />
                                ) : (
                                  <svg
                                    className="w-5 h-5 text-[#BFA16A]"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                  >
                                    <circle cx="12" cy="12" r="4" />
                                  </svg>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-[#171717] truncate">{am.name}</p>
                                <p className="text-[11px] text-[#737373] mt-0.5 truncate">{am.category}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setAmenitiesList((prev) => prev.filter((item) => item.id !== am.id))
                              }
                              className="text-xs text-rose-500 hover:text-rose-700 px-2 py-1 rounded-lg hover:bg-rose-50 shrink-0"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Icons Dedicated Tab */}
            {activeTab === 'icons' && (
              <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
                <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#171717]">
                        Icons &amp; Vector Assets Library ({iconsList.length})
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        setNewIconName('');
                        setNewIconUrl('');
                        setNewIconSvg('');
                        setIsAddModalOpen(true);
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl transition shadow-xs"
                    >
                      + Upload / Add Icon
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {iconsList.map((ic) => (
                        <div
                          key={ic.id}
                          className="p-4 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl flex flex-col items-center text-center gap-2 relative group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E0D8] flex items-center justify-center p-2">
                            {ic.type === 'image' ? (
                              <img src={ic.codeOrUrl} alt={ic.name} className="w-full h-full object-contain" />
                            ) : (
                              <svg
                                className="w-6 h-6 text-[#BFA16A]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                dangerouslySetInnerHTML={{ __html: ic.codeOrUrl }}
                              />
                            )}
                          </div>
                          <p className="text-xs font-semibold text-[#171717] line-clamp-1">{ic.name}</p>
                          <span className="text-[10px] text-[#737373]">{ic.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Dynamic Add Entry Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E0D8] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
              <h3 className="text-base font-bold text-[#171717]">
                {activeTab === 'communities'
                  ? 'Add New Community'
                  : activeTab === 'offplans'
                  ? 'Add New Off-Plan Project'
                  : activeTab === 'properties'
                  ? 'Add New Property Listing'
                  : activeTab === 'projects'
                  ? 'Add New Developer'
                  : activeTab === 'amenities'
                  ? 'Add New Amenity'
                  : activeTab === 'icons'
                  ? 'Add New Icon Asset'
                  : 'Create New Page'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-sm text-[#737373] hover:text-[#171717]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              {(activeTab === 'pages' || activeTab === 'dynamic-pages') && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1">Page Title</label>
                    <input
                      type="text"
                      required
                      value={pageTitle}
                      onChange={(e) => setPageTitle(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                      placeholder="e.g. Waterfront Living Guide"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1">URL Slug</label>
                    <input
                      type="text"
                      value={pageSlug}
                      onChange={(e) => setPageSlug(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs font-mono text-[#171717]"
                      placeholder="e.g. waterfront-living-guide"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1">Meta Description</label>
                    <textarea
                      rows={2}
                      value={pageMetaDesc}
                      onChange={(e) => setPageMetaDesc(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl p-3 text-xs text-[#171717]"
                    />
                  </div>
                </>
              )}

              {activeTab === 'properties' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1">Property Title</label>
                    <input
                      type="text"
                      required
                      value={propTitle}
                      onChange={(e) => setPropTitle(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#525252] mb-1">Price</label>
                      <input
                        type="text"
                        value={propPrice}
                        onChange={(e) => setPropPrice(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#525252] mb-1">Location</label>
                      <input
                        type="text"
                        value={propLocation}
                        onChange={(e) => setPropLocation(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'offplans' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      value={offTitle}
                      onChange={(e) => setOffTitle(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#525252] mb-1">Developer</label>
                      <input
                        type="text"
                        value={offDeveloper}
                        onChange={(e) => setOffDeveloper(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#525252] mb-1">Starting Price</label>
                      <input
                        type="text"
                        value={offPrice}
                        onChange={(e) => setOffPrice(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#525252] mb-1">Location</label>
                      <input
                        type="text"
                        value={offLocation}
                        onChange={(e) => setOffLocation(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#525252] mb-1">Handover</label>
                      <input
                        type="text"
                        value={offCompletion}
                        onChange={(e) => setOffCompletion(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'communities' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1">Community Name</label>
                    <input
                      type="text"
                      required
                      value={commName}
                      onChange={(e) => setCommName(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1">Tag / Vibe</label>
                    <input
                      type="text"
                      value={commTag}
                      onChange={(e) => setCommTag(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={commDesc}
                      onChange={(e) => setCommDesc(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl p-3 text-xs text-[#171717]"
                    />
                  </div>
                </>
              )}

              {(activeTab === 'projects' || activeTab === 'developers') && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1">Developer Name</label>
                    <input
                      type="text"
                      required
                      value={devName}
                      onChange={(e) => setDevName(e.target.value)}
                      placeholder="e.g. Binghatti"
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                    />
                  </div>
                  <div>
                    <CoverImagePicker
                      label="Developer Logo"
                      imageUrl={devLogo}
                      onChange={(val) => setDevLogo(val)}
                      onFileUpload={handleFileUpload}
                    />
                  </div>
                </>
              )}

              {activeTab === 'amenities' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1">Amenity Name</label>
                    <input
                      type="text"
                      required
                      value={newAmenityName}
                      onChange={(e) => setNewAmenityName(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1">Category</label>
                    <input
                      type="text"
                      value={newAmenityCategory}
                      onChange={(e) => setNewAmenityCategory(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                    />
                  </div>
                  <div>
                    <IconDropdownSelect
                      label="Amenity Icon (From Global Icons Library)"
                      value={newAmenityIcon}
                      onChange={(val) => setNewAmenityIcon(val)}
                      icons={iconsList}
                      placeholder="Select amenity icon..."
                    />
                  </div>
                </>
              )}

              {activeTab === 'icons' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1">Icon Name</label>
                    <input
                      type="text"
                      required
                      value={newIconName}
                      onChange={(e) => setNewIconName(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#525252] mb-1">Icon Image URL</label>
                    <input
                      type="text"
                      value={newIconUrl}
                      onChange={(e) => setNewIconUrl(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-xs text-[#171717]"
                      placeholder="/dubai_hills.png"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E0D8]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#525252] bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#BFA16A] hover:bg-[#aa8e59] rounded-xl shadow-xs"
                >
                  {submitting ? 'Saving...' : 'Create & Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}