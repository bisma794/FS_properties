import React from 'react';

export type DynamicCategory =
  | 'Hero'
  | 'Properties'
  | 'Community'
  | 'Developer'
  | 'The Valley'
  | 'Blog'
  | 'Advisory'
  | 'General';

export interface DynamicComponentDefinition {
  type: string;
  name: string;
  category: DynamicCategory;
  previewImage: string;
  defaultTitle: string;
  defaultDescription: string;
}

export const AVAILABLE_DYNAMIC_COMPONENTS: DynamicComponentDefinition[] = [
  // -------------------------------------------------------------
  // 1. HERO SECTIONS (From all main pages)
  // -------------------------------------------------------------
  {
    type: 'hero-homepage',
    name: 'Homepage Main Hero',
    category: 'Hero',
    previewImage: '/buy_hero.png',
    defaultTitle: 'A DIFFERENT WAY TO BUY REAL ESTATE IN DUBAI',
    defaultDescription: 'Data-driven, independent real estate advisory built for long-term investors and homebuyers.',
  },
  {
    type: 'hero-1',
    name: 'Buy In Dubai Hero',
    category: 'Hero',
    previewImage: '/buy-hero.png',
    defaultTitle: 'BUY IN DUBAI WITH CLARITY',
    defaultDescription: 'A measured search process for buyers who want context, comparison and practical guidance.',
  },
  {
    type: 'hero-2',
    name: 'About Us Advisory Hero',
    category: 'Hero',
    previewImage: '/about_us_hero.jpg',
    defaultTitle: 'REDEFINING REAL ESTATE ADVISORY IN DUBAI',
    defaultDescription: 'We do not sell properties. We build strategies for wealth creation and secure living.',
  },
  {
    type: 'hero-3',
    name: 'Explore Prime Real Estate Hero',
    category: 'Hero',
    previewImage: '/1793598348_buy-hero.png',
    defaultTitle: 'Explore Prime Real Estate In Dubai',
    defaultDescription: 'Curated luxury properties, off-plan projects and master developments across top communities.',
  },
  {
    type: 'hero-4',
    name: 'The Valley By Emaar Hero',
    category: 'Hero',
    previewImage: '/valley_hero.png',
    defaultTitle: 'THE VALLEY BY EMAAR',
    defaultDescription: 'A quaint new town where life finds its inspiration amidst vast open space and world-class amenities.',
  },
  {
    type: 'hero-blog',
    name: 'News & Insights Journal Hero',
    category: 'Hero',
    previewImage: '/blog-hero.png',
    defaultTitle: 'REAL ESTATE NEWS & INSIGHTS',
    defaultDescription: 'Expert insights, market analysis, and the latest updates on Dubai thriving real estate market.',
  },
  {
    type: 'hero-advisory',
    name: 'AI Assessment & Matching Hero',
    category: 'Hero',
    previewImage: '/ai_engine_hero.jpg',
    defaultTitle: 'FIND YOUR IDEAL PROPERTY MATCH',
    defaultDescription: 'Answer a few key questions and our intelligence engine will recommend tailored opportunities.',
  },
  {
    type: 'hero-community',
    name: 'Communities Master Guide Hero',
    category: 'Hero',
    previewImage: '/1793342026_community.png',
    defaultTitle: 'DUBAI MASTER COMMUNITIES',
    defaultDescription: 'Discover vibrant master-planned neighborhoods, lifestyle amenities, and infrastructure growth.',
  },
  {
    type: 'hero-developer',
    name: 'Developers Directory Hero',
    category: 'Hero',
    previewImage: '/developer-hero.png',
    defaultTitle: 'DUBAI MASTER DEVELOPERS',
    defaultDescription: 'Evaluate leading government and private developers with verified delivery records.',
  },

  // -------------------------------------------------------------
  // 2. PROPERTIES & OFF-PLAN (From Buy, Projects & Homepage)
  // -------------------------------------------------------------
  {
    type: 'property-listings',
    name: 'Ready & Resale Property Listings',
    category: 'Properties',
    previewImage: '/property-card.png',
    defaultTitle: 'Properties for Sale in Dubai',
    defaultDescription: 'Explore verified ready villas, penthouses, townhouses and apartments.',
  },
  {
    type: 'property-search',
    name: 'Property Search & Filter Bar',
    category: 'Properties',
    previewImage: '/buy-hero.png',
    defaultTitle: 'Search Properties',
    defaultDescription: 'Filter properties by location, type, price bracket, and completion status.',
  },
  {
    type: 'trending-projects',
    name: 'Trending Off-Plan Projects',
    category: 'Properties',
    previewImage: '/1793600655_al-marjan.png',
    defaultTitle: 'Trending Projects in Dubai',
    defaultDescription: 'Top off-plan projects and newly launched luxury developments with high ROI.',
  },
  {
    type: 'recommended-opportunities',
    name: 'Recommended Investment Opportunities',
    category: 'Properties',
    previewImage: '/1793600825_marina-view.png',
    defaultTitle: 'Recommended Opportunities',
    defaultDescription: 'Curated high-yield off-plan developments handpicked by our advisory team.',
  },
  {
    type: 'similar-projects',
    name: 'Similar Luxury Projects Showcase',
    category: 'Properties',
    previewImage: '/similar-greenville.png',
    defaultTitle: 'Similar Projects in Dubai',
    defaultDescription: 'Compare alternative developments offering comparable unit layouts and payment plans.',
  },
  {
    type: 'mortgage-calc',
    name: 'Interactive Mortgage Calculator',
    category: 'Properties',
    previewImage: '/mortgage-bg.png',
    defaultTitle: 'Mortgage Calculator',
    defaultDescription: 'Estimate your monthly installments, down payment, and mortgage interest rates.',
  },

  // -------------------------------------------------------------
  // 3. COMMUNITIES (From Communities & Detail Pages)
  // -------------------------------------------------------------
  {
    type: 'explore-community',
    name: 'Explore Community Featured Showcase',
    category: 'Community',
    previewImage: '/1793342026_community.png',
    defaultTitle: 'Explore Iconic Communities',
    defaultDescription: 'Discover vibrant master-planned neighborhoods across Dubai and the UAE.',
  },
  {
    type: 'communities-grid',
    name: 'Master Communities Directory Grid',
    category: 'Community',
    previewImage: '/1793339902_community.png',
    defaultTitle: 'Dubai Communities Directory',
    defaultDescription: 'Browse Dubai Hills Estate, Palm Jumeirah, Dubai Creek Harbour, and emerging districts.',
  },
  {
    type: 'community-overview',
    name: 'Community Overview & Investment Insights',
    category: 'Community',
    previewImage: '/community.png',
    defaultTitle: 'Community Overview',
    defaultDescription: 'In-depth capital growth forecast, connectivity, rental yield and master plan specs.',
  },
  {
    type: 'community-comparison',
    name: 'Community Comparison Matrix',
    category: 'Community',
    previewImage: '/compare-comm-hero.png',
    defaultTitle: 'Community Comparison',
    defaultDescription: 'Side-by-side comparison of amenities, price per sqft, and lifestyle scores.',
  },
  {
    type: 'community-amenities-map',
    name: 'Community Amenities & Map Location',
    category: 'Community',
    previewImage: '/map.png',
    defaultTitle: 'Location & Lifestyle Amenities',
    defaultDescription: 'Interactive map and nearby schools, healthcare, parks, and retail destinations.',
  },

  // -------------------------------------------------------------
  // 4. DEVELOPERS (From Developers & Detail Pages)
  // -------------------------------------------------------------
  {
    type: 'developer-logos',
    name: 'Premier Master Developers Logos Grid',
    category: 'Developer',
    previewImage: '/developers/emaar.png',
    defaultTitle: 'Premier Master Developers',
    defaultDescription: 'Delivered by the most trusted, world-class developers in the United Arab Emirates.',
  },
  {
    type: 'developers-grid',
    name: 'Developers Full Directory Grid',
    category: 'Developer',
    previewImage: '/developers/damac.png',
    defaultTitle: 'Developers Directory',
    defaultDescription: 'Explore Emaar, Damac, Sobha, Meraas, Nakheel, and emerging developers.',
  },
  {
    type: 'developers-intro',
    name: 'Developers Market Overview & Stats',
    category: 'Developer',
    previewImage: '/developer-hero.png',
    defaultTitle: 'Trusted Developers Track Record',
    defaultDescription: 'Comprehensive track record analysis, handover reliability, and construction quality ratings.',
  },
  {
    type: 'developer-projects',
    name: 'Developer Flagship Projects Portfolio',
    category: 'Developer',
    previewImage: '/hillside-emaar-building.png',
    defaultTitle: 'Flagship Developments Portfolio',
    defaultDescription: 'Iconic master communities and waterfront residences delivered by this developer.',
  },
  {
    type: 'developer-ask-banner',
    name: 'Developer Consultation Banner',
    category: 'Developer',
    previewImage: '/advisory_hero.png',
    defaultTitle: 'Ask About This Developer',
    defaultDescription: 'Get independent feedback on developer reputation, escrow accounts, and handover timing.',
  },

  // -------------------------------------------------------------
  // 5. THE VALLEY & MASTERPLAN SHOWCASE
  // -------------------------------------------------------------
  {
    type: 'valley-score',
    name: 'Development Score & Overview Card',
    category: 'The Valley',
    previewImage: '/92&.png',
    defaultTitle: 'FS Match & Investment Score',
    defaultDescription: 'Comprehensive suitability score evaluating family lifestyle, infrastructure, and ROI.',
  },
  {
    type: 'valley-why',
    name: 'Why FS Recommends This Development',
    category: 'The Valley',
    previewImage: '/pros-n-cons.png',
    defaultTitle: 'Why FS Recommends',
    defaultDescription: 'Strategic investment thesis, competitive pricing analysis, and long-term capital outlook.',
  },
  {
    type: 'valley-highlights',
    name: 'Lifestyle Highlights & Masterplan Amenities',
    category: 'The Valley',
    previewImage: '/modern-living.png',
    defaultTitle: 'Master Community Highlights',
    defaultDescription: 'Golden beach, sports village, town center, and verdant green open spaces.',
  },

  // -------------------------------------------------------------
  // 6. BLOG & EDITORIAL (From Blog Pages)
  // -------------------------------------------------------------
  {
    type: 'blog-featured',
    name: 'Featured Editorial Cover Story',
    category: 'Blog',
    previewImage: '/dubaiproperty-journal.png',
    defaultTitle: 'Featured Journal Story',
    defaultDescription: 'Deep-dive analysis on Dubai real estate trends, regulations, and golden visa reforms.',
  },
  {
    type: 'blog-grid',
    name: 'Market Articles & Analysis Grid',
    category: 'Blog',
    previewImage: '/blog-hero.png',
    defaultTitle: 'Latest Insights & Articles',
    defaultDescription: 'Read our latest market reports, buyer guides, and community spotlights.',
  },
  {
    type: 'blog-where-to-live',
    name: 'Where To Live In Dubai Strategic Guide',
    category: 'Blog',
    previewImage: '/buying-landin-dubai.png',
    defaultTitle: 'Where to Live in Dubai',
    defaultDescription: 'Compare lifestyle, schooling, commuting times, and budget for different neighborhoods.',
  },
  {
    type: 'blog-uae-offplan-banner',
    name: 'UAE Off-Plan Opportunities Banner',
    category: 'Blog',
    previewImage: '/uae-offplan-banner.png',
    defaultTitle: 'Exclusive UAE Off-Plan Releases',
    defaultDescription: 'Gain priority VIP booking access before public market release.',
  },

  // -------------------------------------------------------------
  // 7. ABOUT US & ADVISORY (From About & AI Assessment)
  // -------------------------------------------------------------
  {
    type: 'about-story',
    name: 'The FS Advisory Philosophy & Story',
    category: 'Advisory',
    previewImage: '/about_us_hero.jpg',
    defaultTitle: 'We Don Not Sell Properties. We Build Strategies.',
    defaultDescription: 'Learn how our objective, research-first approach protects buyers from market noise.',
  },
  {
    type: 'feature-bar',
    name: 'Advisory Pillars / Feature Bar',
    category: 'Advisory',
    previewImage: '/fs score.png',
    defaultTitle: 'Advisory Value Pillars',
    defaultDescription: 'Zero commission bias, rigorous due diligence, end-to-end conveyance, and portfolio review.',
  },
  {
    type: 'ai-assessment-goals',
    name: 'AI Property Matcher Form',
    category: 'Advisory',
    previewImage: '/ai.png',
    defaultTitle: 'Tell Us Your Investment Goals',
    defaultDescription: 'Interactive multi-step questionnaire to determine your risk profile and preferred unit types.',
  },
  {
    type: 'client-reviews',
    name: 'Verified Client Reviews & Testimonials',
    category: 'Advisory',
    previewImage: '/agent-1.png',
    defaultTitle: 'What Our Clients Say',
    defaultDescription: 'Authentic testimonials from international investors and UAE residents.',
  },

  // -------------------------------------------------------------
  // 8. GENERAL, FORMS & FAQS
  // -------------------------------------------------------------
  {
    type: 'amenity-1',
    name: 'Key Features & Amenities Badges',
    category: 'General',
    previewImage: '/affordable-plans.png',
    defaultTitle: 'Key Features & Amenities',
    defaultDescription: 'Explore the handpicked luxury amenities and lifestyle facilities curated for this address.',
  },
  {
    type: 'content-1',
    name: 'Rich-Text & Custom Editorial Section',
    category: 'General',
    previewImage: '/pros-n-cons.png',
    defaultTitle: 'In-Depth Overview & Editorial Story',
    defaultDescription: 'Comprehensive overview and guide with rich-text, images, quotes and tables.',
  },
  {
    type: 'offplan-guide',
    name: 'Comprehensive Off-Plan Buyer Guide',
    category: 'General',
    previewImage: '/best-investment.png',
    defaultTitle: 'A Complete Guide to Buying Off-Plan in Dubai',
    defaultDescription: 'Payment plans, escrow protection, handover inspection, and registration fees explained.',
  },
  {
    type: 'faqs',
    name: 'Buyer Guide & FAQs Accordion',
    category: 'General',
    previewImage: '/ai.png',
    defaultTitle: 'Frequently Asked Questions',
    defaultDescription: 'Answers to the questions we hear most from people exploring property in the UAE.',
  },
  {
    type: 'strategy-session',
    name: 'Book Private Strategy Session Banner',
    category: 'General',
    previewImage: '/banner_img.png',
    defaultTitle: 'Book a 1-on-1 Strategy Session',
    defaultDescription: 'Schedule a 30-minute confidential consultation with our principal property advisor.',
  },
  {
    type: 'footer-form',
    name: 'VIP Interest Registration & Contact Form',
    category: 'General',
    previewImage: '/advisory_hero.png',
    defaultTitle: 'Register Your Interest',
    defaultDescription: 'Schedule a private consultation and receive priority pricing and floor plans.',
  },
];

export interface DynamicSectionInstance {
  id: string; // unique instance id e.g. "dyn-hero-3-17290123"
  type: string; // component type identifier
  name: string; // custom display label e.g. "Hero Section 3"
  title?: string;
  description?: string;
  detailHtml?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonColor?: string;
  selectedAmenities?: string[];
  selectedProjects?: string[];
  selectedCommunities?: string[];
  selectedDevelopers?: string[];
  bgImage?: string;
  formEyebrow?: string;
  formSubmitText?: string;
  items?: any[];
}
