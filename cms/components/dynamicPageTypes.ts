import React from 'react';

export interface DynamicComponentDefinition {
  type: string;
  name: string;
  category: 'Hero' | 'Content' | 'Amenities' | 'Projects' | 'Community' | 'Developer' | 'Contact' | 'FAQ';
  previewImage: string;
  defaultTitle: string;
  defaultDescription: string;
}

export const AVAILABLE_DYNAMIC_COMPONENTS: DynamicComponentDefinition[] = [
  {
    type: 'hero-3',
    name: 'Hero Section 3',
    category: 'Hero',
    previewImage: '/1793598348_buy-hero.png',
    defaultTitle: 'Explore Prime Real Estate In Dubai',
    defaultDescription: 'Curated luxury properties, off-plan projects and master developments across top communities.',
  },
  {
    type: 'hero-1',
    name: 'Hero Section 1',
    category: 'Hero',
    previewImage: '/buy_hero.png',
    defaultTitle: 'BUY IN DUBAI WITH CLARITY',
    defaultDescription: 'A measured search process for buyers who want context, comparison and practical guidance.',
  },
  {
    type: 'hero-2',
    name: 'Hero Section 2',
    category: 'Hero',
    previewImage: '/about_us_hero.jpg',
    defaultTitle: 'REDEFINING REAL ESTATE ADVISORY IN DUBAI',
    defaultDescription: 'Independent, data-backed guidance for off-plan property buyers and global investors.',
  },
  {
    type: 'hero-4',
    name: 'Hero Section 4',
    category: 'Hero',
    previewImage: '/valley_hero.png',
    defaultTitle: 'THE VALLEY BY EMAAR',
    defaultDescription: 'A quaint new town where life finds its inspiration amidst vast open space and world-class amenities.',
  },
  {
    type: 'amenity-1',
    name: 'Amenity Section 1',
    category: 'Amenities',
    previewImage: '/affordable-plans.png',
    defaultTitle: 'Key Features & Amenities',
    defaultDescription: 'Explore the handpicked luxury amenities and lifestyle facilities curated for this address.',
  },
  {
    type: 'trending-projects',
    name: 'Trending Projects',
    category: 'Projects',
    previewImage: '/1793600655_al-marjan.png',
    defaultTitle: 'Trending Projects',
    defaultDescription: 'Top off-plan projects and newly launched luxury developments in Dubai.',
  },
  {
    type: 'content-1',
    name: 'Content Section 1',
    category: 'Content',
    previewImage: '/pros-n-cons.png',
    defaultTitle: 'In-Depth Overview & Community Story',
    defaultDescription: 'Comprehensive overview and guide with rich-text, images and tables.',
  },
  {
    type: 'explore-more',
    name: 'Explore More Section 1',
    category: 'Community',
    previewImage: '/1793342026_community.png',
    defaultTitle: 'Explore More Communities',
    defaultDescription: 'Discover vibrant master-planned neighborhoods across the UAE.',
  },
  {
    type: 'developer-logos',
    name: 'Developer Logos',
    category: 'Developer',
    previewImage: '/developers/emaar.png',
    defaultTitle: 'Premier Master Developers',
    defaultDescription: 'Delivered by the most trusted, world-class developers in the United Arab Emirates.',
  },
  {
    type: 'footer-form',
    name: 'Footer Form',
    category: 'Contact',
    previewImage: '/advisory_hero.png',
    defaultTitle: 'Register Your Interest',
    defaultDescription: 'Schedule a private consultation with our senior advisory team.',
  },
  {
    type: 'faqs',
    name: 'Buyer Guide & FAQs',
    category: 'FAQ',
    previewImage: '/ai.png',
    defaultTitle: 'Frequently Asked Questions',
    defaultDescription: 'Answers to the questions we hear most from people exploring property in the UAE.',
  },
];

export interface DynamicSectionInstance {
  id: string; // unique instance id e.g. "dyn-hero-3-17290123"
  type: string; // e.g. "hero-3", "amenity-1", etc.
  name: string; // custom display label e.g. "Hero Section 3"
  title?: string;
  description?: string;
  detailHtml?: string;
  buttonText?: string;
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
