import { getPageBySlug, PageData } from './api';

export interface OffPlanProject {
  id: number;
  title: string;
  slug: string;
  developer: string;
  starting_price: string;
  location: string;
  completion_date: string;
  payment_plan: string;
  status: 'selling' | 'coming_soon' | 'sold_out';
  type: string;
  imageUrl: string;
}

export const ALL_OFFPLAN_PROJECTS: OffPlanProject[] = [
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
    slug: 'sobha-hartland-sky-villas',
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

/**
 * Normalizes a slug or string for matching
 */
export function normalizeSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/^project-/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Finds an offplan project from static/default directory by slug or title
 */
export function findOffPlanProjectBySlug(slug: string): OffPlanProject | undefined {
  const norm = normalizeSlug(slug);
  return ALL_OFFPLAN_PROJECTS.find(
    (p) => normalizeSlug(p.slug) === norm || normalizeSlug(p.title) === norm
  );
}

/**
 * Builds complete fallback Project Detail Page data for any project
 */
export function buildDefaultProjectPage(project: OffPlanProject): PageData {
  const cleanPrice = project.starting_price.replace(/^AED\s*/i, '');

  const hero = {
    eyebrow: 'LIMITED AVAILABILITY',
    titleLine1: project.title.toUpperCase(),
    titleLine2: `BY ${(project.developer || 'DEVELOPER').toUpperCase()}`,
    subheading: `${project.title} is an exclusive off-plan residential development by ${project.developer}, offering curated ${project.type || 'residences'} in ${project.location || 'Dubai'}.`,
    ctaText: 'CHECK AVAILABILITY',
    backgroundImage: project.imageUrl || '/project-detail-hero.png',
  };

  const overview = {
    title: 'Project Overview & Key Metrics',
    tagline: 'OVERVIEW',
    startingPrice: project.starting_price,
    developer: project.developer,
    unitTypes: project.type || '1–3 Bedroom Residences',
    sizeRange: '1,283 – 2,799 sqft',
    handover: project.completion_date || 'Q4 2028',
    paymentPlan: project.payment_plan || 'Flexible',
    contentText: `${project.title} introduces luxury living by ${project.developer} in ${project.location}, featuring spacious floor plans with modern finishes and panoramic views. Handover is scheduled for ${project.completion_date || 'Q4 2028'} with an attractive ${project.payment_plan || 'milestone-linked'} payment structure.`,
    keyHighlights: [
      { label: 'Developer', value: project.developer },
      { label: 'Status', value: project.status === 'selling' ? 'Off Plan (Selling)' : 'Coming Soon' },
      { label: 'Type', value: project.type },
      { label: 'Title type', value: 'Freehold' },
      { label: 'Location', value: project.location },
      { label: 'Completion', value: project.completion_date },
      { label: 'Progress', value: '0%' },
      { label: 'Payment Plan', value: project.payment_plan },
    ],
  };

  const floorplans = {
    title: 'Villas & Floor Plans',
    tagline: 'RESIDENTIAL CONFIGURATIONS',
    items: [
      {
        id: '1',
        bed: '1',
        title: '1 Bedroom Apartment',
        totalArea: '785 sq.ft (72.9 sq.m)',
        suiteArea: '692 sq.ft',
        balconyArea: '93 sq.ft',
        bathrooms: '1.5',
        parking: '1 Dedicated Bay',
        startingPrice: project.starting_price,
      },
      {
        id: '2',
        bed: '2',
        title: '2 Bedroom Luxury Suite',
        totalArea: '1,320 sq.ft (122.6 sq.m)',
        suiteArea: '1,175 sq.ft',
        balconyArea: '145 sq.ft',
        bathrooms: '2.5',
        parking: '1 Dedicated Bay',
        startingPrice: `AED ${(Number(cleanPrice.replace(/,/g, '')) * 1.6).toLocaleString('en-US')}`,
      },
      {
        id: '3',
        bed: '3',
        title: '3 Bedroom Signature Residence',
        totalArea: '1,850 sq.ft (171.9 sq.m)',
        suiteArea: '1,640 sq.ft',
        balconyArea: '210 sq.ft',
        bathrooms: '3.5',
        parking: '2 Covered Bays',
        startingPrice: `AED ${(Number(cleanPrice.replace(/,/g, '')) * 2.2).toLocaleString('en-US')}`,
      },
    ],
  };

  const amenities = {
    title: 'Amenities & Facilities',
    tagline: 'LIFESTYLE',
    items: [
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
    ],
  };

  const video = {
    title: `Experience ${project.title} in Motion`,
    tagline: 'VIDEO SHOWCASE',
    contentText: `Explore the architectural elegance, expansive green landscapes, and resort-grade amenities of ${project.title} by ${project.developer}.`,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    bgImage: project.imageUrl || '/project-detail-hero.png',
  };

  const gallery = {
    title: 'Project Photo Gallery',
    tagline: 'PHOTO SHOWCASE',
    items: [
      project.imageUrl || '/project-detail-hero.png',
      '/grandpolo.png',
      '/thevalley.png',
      '/dubai hills.png',
    ],
  };

  const location = {
    title: 'Location & Surroundings',
    tagline: 'ON THE MAP',
    contentText: `Centrally positioned in ${project.location} with immediate transit links to Downtown Dubai, international airports, and lifestyle hubs.`,
    latitude: '25.31528411624274',
    longitude: '55.322673566004696',
    bgImage: '/map.png',
    locationUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location + ' Dubai UAE')}`,
  };

  const faqs = {
    title: 'Frequently Asked Questions',
    tagline: 'PROJECT FAQ',
    items: [
      {
        q: `Is ${project.title} a freehold property for international buyers?`,
        a: `Yes, ${project.title} is 100% freehold. Both UAE nationals and international foreign investors can purchase properties here with complete ownership rights and title deeds issued directly by the Dubai Land Department (DLD).`,
      },
      {
        q: 'What is the scheduled handover date and current progress?',
        a: `Handover is scheduled for ${project.completion_date}. Construction milestones and escrow account funds are rigorously audited and monitored under Dubai Land Department regulations (RERA).`,
      },
      {
        q: 'What are the available payment plan options?',
        a: `${project.developer} offers structured construction-linked payment plans (${project.payment_plan}), with options for milestone payments during construction and balance upon completion.`,
      },
      {
        q: 'Are properties eligible for the UAE Golden Visa?',
        a: 'Yes! Properties with an acquisition value of AED 2,000,000 or above qualify buyers and their immediate family members for the 10-Year Renewable UAE Golden Visa.',
      },
    ],
  };

  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    meta_title: `${project.title} by ${project.developer} | Project Details | FS Real Estate Advisory`,
    meta_description: `${project.title} in ${project.location}. Starting from ${project.starting_price}. Handover ${project.completion_date}. Explore floor plans, amenities, and payment options.`,
    status: 'published',
    content: {
      hero,
      customSections: {
        'proj-hero': hero,
        'proj-overview': overview,
        'proj-floorplans': floorplans,
        'proj-amenities': amenities,
        'proj-video': video,
        'proj-gallery': gallery,
        'proj-location': location,
        'proj-faqs': faqs,
        'proj-similar': {
          title: 'Similar Projects You May Like',
          tagline: 'RECOMMENDED ALTERNATIVES',
          items: [],
        },
      },
      projectMeta: {
        offplanId: project.id,
        developer: project.developer,
        starting_price: project.starting_price,
        location: project.location,
        completion_date: project.completion_date,
        payment_plan: project.payment_plan,
        status: project.status,
        type: project.type,
        imageUrl: project.imageUrl,
      },
    },
  };
}

/**
 * Retrieves project detail data for a slug:
 * 1. Checks Laravel backend `pages` table for dynamic saved content
 * 2. If not found or incomplete, builds default data from matching offplan record
 * 3. Falls back to base 'project-detail' page
 */
export async function getProjectDetailData(slug?: string): Promise<{
  page: PageData | null;
  slug: string;
}> {
  const effectiveSlug = (slug || 'project-detail').trim();

  // Try fetching directly by slug from backend
  let page = await getPageBySlug(effectiveSlug);

  // If not found and slug doesn't start with 'project-', try with 'project-' prefix
  if (!page && !effectiveSlug.startsWith('project-') && effectiveSlug !== 'project-detail') {
    page = await getPageBySlug(`project-${effectiveSlug}`);
  }

  // Also check base 'project-detail' template for global section visibility overrides (e.g. hideSection on proj-video)
  const baseTemplate = effectiveSlug !== 'project-detail' ? await getPageBySlug('project-detail') : page;
  const baseVideoHide = baseTemplate?.content?.customSections?.['proj-video']?.hideSection;

  // If found in backend with customSections, return it (merging base video visibility if not explicitly set on project)
  if (page && page.content?.customSections && Object.keys(page.content.customSections).length > 0) {
    if (
      typeof baseVideoHide === 'boolean' &&
      typeof page.content.customSections['proj-video']?.hideSection === 'undefined'
    ) {
      page.content.customSections['proj-video'] = {
        ...(page.content.customSections['proj-video'] || {}),
        hideSection: baseVideoHide,
      };
    }
    return { page, slug: effectiveSlug };
  }

  // If not in pages table or no customSections, look up in 38 projects directory
  const matchedProject = findOffPlanProjectBySlug(effectiveSlug);
  if (matchedProject) {
    const defaultPage = buildDefaultProjectPage(matchedProject);
    if (typeof baseVideoHide === 'boolean' && defaultPage.content?.customSections) {
      defaultPage.content.customSections['proj-video'] = {
        ...(defaultPage.content.customSections['proj-video'] || {}),
        hideSection: baseVideoHide,
      };
    }
    if (page) {
      // Merge saved backend page over default project template
      return {
        page: {
          ...defaultPage,
          ...page,
          content: {
            ...defaultPage.content,
            ...(page.content || {}),
            customSections: {
              ...defaultPage.content?.customSections,
              ...(page.content?.customSections || {}),
            },
          },
        },
        slug: effectiveSlug,
      };
    }
    return { page: defaultPage, slug: effectiveSlug };
  }

  // Fallback to base 'project-detail'
  if (!page && effectiveSlug !== 'project-detail') {
    page = baseTemplate;
  }

  return { page, slug: effectiveSlug };
}

