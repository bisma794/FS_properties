import { getPageBySlug, PageData } from './api';

export interface BlogItem {
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

export const DEFAULT_BLOGS: BlogItem[] = [
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

export function findBlogBySlug(slug: string): BlogItem | undefined {
  const clean = slug.toLowerCase().trim().replace(/^\/+/g, '').replace(/\/+$/g, '');
  return DEFAULT_BLOGS.find(
    (b) =>
      b.slug.toLowerCase() === clean ||
      b.slug.toLowerCase() === `blog-${clean}` ||
      clean.includes(b.slug.toLowerCase())
  );
}

export async function getBlogDetailData(slug?: string): Promise<{
  page: PageData | null;
  blog: BlogItem;
  slug: string;
}> {
  const effectiveSlug = (slug || 'hillside-park-dubai-hills').trim();

  // Try fetching from backend pages table
  let page = await getPageBySlug(effectiveSlug);
  if (!page && !effectiveSlug.startsWith('blog-') && effectiveSlug !== 'blog-details') {
    page = await getPageBySlug(`blog-${effectiveSlug}`);
  }

  const matchedBlog = findBlogBySlug(effectiveSlug) || DEFAULT_BLOGS[0];

  return {
    page,
    blog: matchedBlog,
    slug: effectiveSlug,
  };
}

