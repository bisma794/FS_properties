import { getPageBySlug, PageData } from './api';

export interface PropertyListingItem {
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
  image_url: string;
  gallery?: string[];
  furnishing?: string;
  available_from?: string;
  description?: string[];
  bullets?: string[];
  amenities?: string[];
}

export const ALL_PROPERTY_LISTINGS: PropertyListingItem[] = [
  // Featured Buy-Detail Property (Jumeirah Islands)
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
    gallery: ['/bannerimg.png', '/property-card.png', '/banner_img.png'],
    furnishing: 'Unfurnished',
    available_from: '28 Sep 2026',
    description: [
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
    amenities: [
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
  },
];

export function normalizePropertySlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/^property-/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function findPropertyBySlug(slug: string): PropertyListingItem | undefined {
  const norm = normalizePropertySlug(slug);
  if (norm === 'buy-detail') return ALL_PROPERTY_LISTINGS[0];
  return ALL_PROPERTY_LISTINGS.find(
    (p) => normalizePropertySlug(p.slug) === norm || normalizePropertySlug(p.title) === norm
  );
}

export function buildDefaultPropertyDetailPage(property: PropertyListingItem): PageData {
  const numericPrice = Number((property.price || '24750000').replace(/[^0-9.]/g, '')) || 24750000;
  const monthlyEstimate = `AED ${Math.round((numericPrice * 0.8 * 0.045) / 12).toLocaleString('en-US')} / month`;
  const locationParts = (property.location || 'Jumeirah Islands, Dubai').split(',').map((s) => s.trim());
  const clusterName = locationParts[0] || 'Cluster 50';
  const communityName = locationParts[1] || locationParts[0] || 'Mediterranean Clusters';

  const heroGallery = {
    breadcrumbPath: `Villas > ${locationParts.slice(0, 3).join(' > ')} > ${property.title}`,
    mainImage: property.image_url || '/bannerimg.png',
    sideImage1: property.gallery?.[1] || '/property-card.png',
    sideImage2: property.gallery?.[2] || '/banner_img.png',
    images: property.gallery || [
      property.image_url || '/bannerimg.png',
      '/property-card.png',
      '/banner_img.png',
    ],
    photoCount: '20',
    verifiedBadge: true,
    superAgentBadge: true,
  };

  const parsedUsps = (property.title || 'Lake View | Rare to Market | Garden Hall')
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean);

  const overview = {
    usps: parsedUsps.length > 0 ? parsedUsps : ['Lake View', 'Rare to Market', 'Garden Hall'],
    title: property.title,
    price: property.price || 'AED 24,750,000',
    monthlyEstimate: `Own from ${monthlyEstimate}`,
    upfrontCostsLabel: 'Estimated upfront costs',
    detailsHeading: 'Property Details',
    propertyType: property.type || 'Villa',
    furnishing: property.furnishing || 'Unfurnished',
    bedrooms: String(property.bedrooms ?? 4),
    bathrooms: String(property.bathrooms ?? 5),
    areaSqft: `${Number(property.area_sqft || 10643).toLocaleString('en-US')} sq ft`,
    status: property.status || 'available',
    mapJumpText: 'Map',
  };

  const description = {
    eyebrow: `${property.type || 'Villa'} for sale in ${property.location || 'Cluster 50, Mediterranean Clusters'}`,
    heading: property.title,
    availableFrom: `Available from ${property.available_from || '28 Sep 2026'}`,
    paragraphs: property.description || [
      `FS Real Estate is excited to bring to market this stunning ${property.title}. Situated in ${property.location}, this residence offers refined architectural finishes and scenic community views.`,
      `The property spans a generous built-up area of ${Number(property.area_sqft || 2450).toLocaleString('en-US')} sqft with ${property.bedrooms} bedrooms and ${property.bathrooms} bathrooms, offering exceptional family living and strong investment potential.`,
    ],
    bullets: property.bullets || [
      property.type || 'Luxury Residence',
      `${property.bedrooms} Bedrooms + Maids`,
      `${property.bathrooms} Bathrooms`,
      `Area ${Number(property.area_sqft || 2450).toLocaleString('en-US')} sqft`,
      '2 Covered Parking Spaces',
      'Prime Community Location',
      'Please call Agent today for more information or to arrange a viewing.',
    ],
  };

  const amenities = {
    title: 'Amenities',
    items: property.amenities || [
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

  const trends = {
    similarSubtitle: `${property.bedrooms} Beds ${property.type || 'Villa'} in ${clusterName}`,
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
    priceThisProperty: property.price || 'AED 24,750,000',
    priceAverageProperty: 'AED 26,236,304',
    sizeVsAverageBadge: '33% Larger',
    sizeThisProperty: `${Number(property.area_sqft || 10643).toLocaleString('en-US')} sq ft`,
    sizeAverageProperty: '8,026 sq ft',
    adBannerImage: '/banner_img.png',
    adBannerTitle: "Invest in Dubai's next landmark by Binghatti",
    adBannerSubtitle: 'Studios to 5 BR apartments | From AED 1.1M',
    adBannerCtaText: 'Enquire now',
  };

  const location = {
    title: 'Location',
    addressTitle: `${clusterName}, ${communityName},`,
    addressSubtitle: locationParts.slice(2).join(', ') || 'Jumeirah Islands, Dubai',
    latitude: '25.31528411624274',
    longitude: '55.322673566004696',
    mapUrl: `https://www.google.com/maps/search/?api=1&query=25.31528411624274,55.322673566004696`,
  };

  const building = {
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

  const sidebar = {
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

  const mortgage = {
    heading: 'Mortgage Calculator',
    defaultPrice: numericPrice,
    defaultDownPaymentPct: 20,
    defaultLoanPeriodYears: 25,
    defaultInterestRate: 3.75,
    formHeading: 'Need a Mortgage? Get Pre-Approved Easily',
    formSubheading: 'Fill In Your Details, And Our Mortgage Specialists Will Help You Secure The Best Financing Options.',
  };

  const recommended = {
    heading: 'Recommended for you',
    items: [
      {
        id: '1',
        price: 'AED 21,950,000',
        type: 'Villa',
        beds: 5,
        baths: 6,
        area: '5,285 sqft',
        title: 'Renovated Entertainment Foyer | Extended | Vacant',
        location: 'Cluster 19, European Clusters, Jumeirah Islands, Dubai',
        image: '/bannerimg.png',
      },
      {
        id: '2',
        price: 'AED 28,500,000',
        type: 'Villa',
        beds: 4,
        baths: 5,
        area: '10,850 sqft',
        title: 'Full Lake View | Fully Upgraded | Turnkey Mansion',
        location: 'Cluster 42, Oasis Clusters, Jumeirah Islands, Dubai',
        image: '/property-card.png',
      },
      {
        id: '3',
        price: 'AED 23,000,000',
        type: 'Villa',
        beds: 4,
        baths: 5,
        area: '9,940 sqft',
        title: 'Master View | Large Plot | Private Swimming Pool',
        location: 'Cluster 12, Islamic Clusters, Jumeirah Islands, Dubai',
        image: '/banner_img.png',
      },
    ],
  };

  return {
    id: property.id,
    title: property.title,
    slug: property.slug,
    meta_title: `${property.title} | Buy Details | FS Real Estate Advisory`,
    meta_description: `${property.title} in ${property.location}. Price ${property.price}. ${property.bedrooms} Bedrooms, ${property.bathrooms} Bathrooms, ${property.area_sqft} sq ft.`,
    status: 'published',
    content: {
      hero: heroGallery,
      customSections: {
        'buy-detail-hero': heroGallery,
        'buy-detail-overview': overview,
        'buy-detail-description': description,
        'buy-detail-amenities': amenities,
        'buy-detail-trends': trends,
        'buy-detail-location': location,
        'buy-detail-building': building,
        'buy-detail-sidebar': sidebar,
        'buy-detail-mortgage': mortgage,
        'buy-detail-recommended': recommended,
      },
      propertyMeta: {
        propertyId: property.id,
        title: property.title,
        slug: property.slug,
        type: property.type,
        price: property.price,
        location: property.location,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area_sqft: property.area_sqft,
        status: property.status,
        image_url: property.image_url,
      },
    },
  };
}

export async function getPropertyDetailData(slug?: string): Promise<{
  page: PageData | null;
  slug: string;
}> {
  const effectiveSlug = (slug || 'buy-detail').trim();

  // 1. Try fetching directly by slug from backend
  let page = await getPageBySlug(effectiveSlug);

  if (!page && !effectiveSlug.startsWith('property-') && effectiveSlug !== 'buy-detail') {
    page = await getPageBySlug(`property-${effectiveSlug}`);
  }

  // 2. Look up matching property in ALL_PROPERTY_LISTINGS
  const matchedProperty = findPropertyBySlug(effectiveSlug) || ALL_PROPERTY_LISTINGS[0];
  const defaultPage = buildDefaultPropertyDetailPage(matchedProperty);

  if (page && page.content?.customSections && Object.keys(page.content.customSections).length > 0) {
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

  // Fallback to base 'buy-detail' if effectiveSlug was custom and not saved yet
  if (!page && effectiveSlug !== 'buy-detail') {
    const basePage = await getPageBySlug('buy-detail');
    if (basePage?.content?.customSections) {
      return {
        page: {
          ...defaultPage,
          content: {
            ...defaultPage.content,
            customSections: {
              ...basePage.content.customSections,
              ...defaultPage.content?.customSections,
            },
          },
        },
        slug: effectiveSlug,
      };
    }
  }

  return { page: defaultPage, slug: effectiveSlug };
}

