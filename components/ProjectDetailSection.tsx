'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ExploreMoreSidebar from './ExploreMoreSidebar';
import ProjectVideoSection from './ProjectVideoSection';
import ProjectGallerySection from './ProjectGallerySection';
import ProjectLocationSection from './ProjectLocationSection';
import OffPlanGuideSection from './OffPlanGuideSection';
import BuyerGuideFaqSection from './BuyerGuideFaqSection';
import ProjectEnquiryForm from './ProjectEnquiryForm';
import SimilarProjectsSection from './SimilarProjectsSection';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export interface ProjectDetailSectionProps {
  pageData?: any;
  customSections?: Record<string, any>;
  slug?: string;
}

export default function ProjectDetailSection({
  pageData,
  customSections = {},
  slug = 'project-detail',
}: ProjectDetailSectionProps = {}) {
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [liveCustomSections, setLiveCustomSections] = useState<Record<string, any>>(customSections || {});

  useEffect(() => {
    setLiveCustomSections(customSections || {});
  }, [customSections]);

  useEffect(() => {
    let isMounted = true;
    const syncLiveSections = async () => {
      try {
        let merged = { ...(customSections || {}) };

        if (typeof window !== 'undefined') {
          const baseCached = localStorage.getItem('fs_page_project-detail');
          if (baseCached) {
            const parsedBase = JSON.parse(baseCached);
            const baseVideoHide = parsedBase?.content?.customSections?.['proj-video']?.hideSection;
            if (typeof baseVideoHide === 'boolean') {
              merged['proj-video'] = { ...(merged['proj-video'] || {}), hideSection: baseVideoHide };
            }
            if (parsedBase?.content?.customSections?.['proj-gallery']) {
              merged['proj-gallery'] = {
                ...(merged['proj-gallery'] || {}),
                ...parsedBase.content.customSections['proj-gallery'],
              };
            }
            if (parsedBase?.content?.customSections?.['proj-location']) {
              merged['proj-location'] = {
                ...(merged['proj-location'] || {}),
                ...parsedBase.content.customSections['proj-location'],
              };
            }
          }
          const slugCached = localStorage.getItem(`fs_page_${slug}`);
          if (slugCached) {
            const parsedSlug = JSON.parse(slugCached);
            if (parsedSlug?.content?.customSections) {
              merged = { ...merged, ...parsedSlug.content.customSections };
            }
          }
        }

        const [slugRes, baseRes] = await Promise.all([
          fetch(`${API_BASE}/pages/${slug}`, { cache: 'no-store' }).catch(() => null),
          slug !== 'project-detail'
            ? fetch(`${API_BASE}/pages/project-detail`, { cache: 'no-store' }).catch(() => null)
            : Promise.resolve(null),
        ]);

        if (baseRes && baseRes.ok) {
          const baseJson = await baseRes.json().catch(() => null);
          const baseVideoHide = baseJson?.data?.content?.customSections?.['proj-video']?.hideSection;
          if (typeof baseVideoHide === 'boolean') {
            merged['proj-video'] = { ...(merged['proj-video'] || {}), hideSection: baseVideoHide };
          }
          if (baseJson?.data?.content?.customSections?.['proj-gallery']) {
            merged['proj-gallery'] = {
              ...(merged['proj-gallery'] || {}),
              ...baseJson.data.content.customSections['proj-gallery'],
            };
          }
          if (baseJson?.data?.content?.customSections?.['proj-location']) {
            merged['proj-location'] = {
              ...(merged['proj-location'] || {}),
              ...baseJson.data.content.customSections['proj-location'],
            };
          }
        }

        if (slugRes && slugRes.ok) {
          const slugJson = await slugRes.json().catch(() => null);
          if (slugJson?.data?.content?.customSections) {
            merged = { ...merged, ...slugJson.data.content.customSections };
          }
        }

        if (isMounted) {
          setLiveCustomSections(merged);
        }
      } catch (_) {}
    };

    syncLiveSections();
    return () => {
      isMounted = false;
    };
  }, [slug, customSections]);

  const overviewSec = liveCustomSections?.['proj-overview'] || {};
  const floorplansSec = liveCustomSections?.['proj-floorplans'] || {};
  const amenitiesSec = liveCustomSections?.['proj-amenities'] || {};
  const videoSec = liveCustomSections?.['proj-video'] || {};
  const gallerySec = liveCustomSections?.['proj-gallery'] || {};
  const locationSec = liveCustomSections?.['proj-location'] || {};
  const guideSec = liveCustomSections?.['proj-guide'] || {};
  const faqsSec = liveCustomSections?.['proj-faqs'] || {};
  const isVideoHidden = Boolean(videoSec?.hideSection || videoSec?.isHidden);
  const projectMeta = pageData?.content?.projectMeta || {};

  const projectTitle = pageData?.title || 'Golf Trails';
  const projectLocation = projectMeta.location || overviewSec.location || 'Dubai';
  const startingPriceDisplay = overviewSec.startingPrice || projectMeta.starting_price || '1,250,000';
  const developerDisplay = overviewSec.developer || projectMeta.developer || 'Emaar';
  const unitTypesDisplay = overviewSec.unitTypes || projectMeta.type || '1-3 BR';
  const sizeRangeDisplay = overviewSec.sizeRange || '1,283 – 2,799 sqft';
  const handoverDisplay = overviewSec.handover || projectMeta.completion_date || 'Q4-2030';
  const paymentPlanDisplay = overviewSec.paymentPlan || projectMeta.payment_plan || 'On Request';

  // Dynamic Floor Plan configurations from CMS
  const rawFloorItems = (floorplansSec?.items && Array.isArray(floorplansSec.items) && floorplansSec.items.length > 0)
    ? floorplansSec.items
    : [
        {
          id: '1',
          bedrooms: '1',
          bed: '1',
          title: '1 Bedroom Apartment',
          bathrooms: '1.5',
          propertyType: 'Apartment',
          startingPrice: startingPriceDisplay || 'AED 1,250,000',
          minSize: '785',
          maxSize: '950',
          description: 'Open-concept layout featuring a modern gourmet kitchen, spacious living and dining area, master bedroom with ensuite bath, and private sun terrace.',
          image: '',
        },
        {
          id: '2',
          bedrooms: '2',
          bed: '2',
          title: '2 Bedroom Luxury Suite',
          bathrooms: '2.5',
          propertyType: 'Apartment',
          startingPrice: 'AED 2,150,000',
          minSize: '1,320',
          maxSize: '1,550',
          description: 'Expansive corner layout with dual-aspect floor-to-ceiling windows, two master suites with private ensuites, and wraparound terrace framing park views.',
          image: '',
        },
        {
          id: '3',
          bedrooms: '3',
          bed: '3',
          title: '3 Bedroom Signature Residence',
          bathrooms: '3.5',
          propertyType: 'Apartment',
          startingPrice: 'AED 2,980,000',
          minSize: '1,850',
          maxSize: '2,400',
          description: 'Signature floor plan with separate formal living, private family lounge, and massive outdoor entertaining deck.',
          image: '',
        },
      ];

  const parsedFloorPlans = rawFloorItems.map((item: any, idx: number) => {
    const bedVal = String(item.bedrooms || item.bed || idx + 1);
    const sPrice = item.startingPrice ? String(item.startingPrice).replace(/^AED\s*/i, '') : '1,250,000';
    const minS = item.minSize || item.totalArea?.replace(/\D/g, '') || '1,283';
    const maxS = item.maxSize || '';
    const numericPrice = Number(String(sPrice).replace(/\D/g, '')) || 1250000;
    const numericSize = Number(String(minS).replace(/\D/g, '')) || 1283;
    const approxPerSq = Math.round(numericPrice / (numericSize || 1));

    return {
      id: bedVal,
      bed: bedVal,
      label: `${bedVal} ${Number(bedVal) === 1 ? 'Bedroom' : 'Bedrooms'}`,
      title: item.title || `${bedVal} Bedroom ${item.propertyType || 'Apartment'}`,
      bedrooms: bedVal,
      bathrooms: item.bathrooms || '2',
      propertyType: item.propertyType || 'Apartment',
      startingPrice: sPrice,
      approxPerSqft: String(approxPerSq),
      minSize: minS,
      maxSize: maxS,
      totalArea: maxS && maxS !== minS ? `${minS} – ${maxS} sq.ft` : `${minS} sq.ft`,
      description: item.description || '',
      image: item.image || item.imageUrl || null,
    };
  });

  const [selectedBed, setSelectedBed] = useState<string>(parsedFloorPlans[0]?.id || '1');

  const handleDownloadBrochure = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('Project brochure download started!');
    }, 800);
  };

  const keyHighlights: Array<{ label: string; value: string }> = overviewSec.keyHighlights || [
    { label: 'Developer', value: developerDisplay },
    { label: 'Status', value: 'Off Plan' },
    { label: 'Type', value: 'Apartments, Townhouses' },
    { label: 'Title type', value: 'Freehold' },
    { label: 'Total Units', value: 'Launch Q4 2030' },
    { label: 'Completion', value: handoverDisplay },
    { label: 'Progress', value: '0%' },
    { label: 'Payment Plan', value: paymentPlanDisplay },
  ];

  const tabs = [
    'OVERVIEW',
    'FLOOR PLANS',
    'AMENITIES',
    ...(!isVideoHidden ? ['VIDEO TOUR'] : []),
    'GALLERY',
    'LOCATION',
    'FAQ',
  ];

  const floorPlanDetails = {
    '1': {
      title: '1 Bedroom Apartment',
      totalArea: '785 sq.ft (72.9 sq.m)',
      suiteArea: '692 sq.ft',
      balconyArea: '93 sq.ft',
      bathrooms: '1.5',
      parking: '1 Dedicated Bay',
      startingPrice: 'AED 1,250,000',
      description: 'Open-concept layout featuring a modern gourmet kitchen, spacious living and dining area, master bedroom with ensuite bath, powder room, and private sun terrace overlooking the golf fairways.',
      rooms: [
        { name: 'Living & Dining', size: '4.2m x 5.8m' },
        { name: 'Master Bedroom', size: '3.8m x 4.2m' },
        { name: 'Balcony Terrace', size: '2.1m x 4.0m' },
        { name: 'Ensuite Bathroom', size: '2.4m x 2.2m' },
      ],
    },
    '2': {
      title: '2 Bedroom Luxury Suite',
      totalArea: '1,320 sq.ft (122.6 sq.m)',
      suiteArea: '1,175 sq.ft',
      balconyArea: '145 sq.ft',
      bathrooms: '2.5',
      parking: '1 Dedicated Bay',
      startingPrice: 'AED 2,150,000',
      description: 'Expansive corner layout with dual-aspect floor-to-ceiling windows, two master suites with private ensuites, laundry room, built-in wardrobes, and wraparound terrace framing park views.',
      rooms: [
        { name: 'Living & Dining', size: '5.6m x 6.4m' },
        { name: 'Master Bedroom 1', size: '4.2m x 4.6m' },
        { name: 'Bedroom 2', size: '3.8m x 4.0m' },
        { name: 'Wraparound Balcony', size: '2.4m x 6.2m' },
      ],
    },
    '3': {
      title: '3 Bedroom Signature Residence',
      totalArea: '1,850 sq.ft (171.9 sq.m)',
      suiteArea: '1,640 sq.ft',
      balconyArea: '210 sq.ft',
      bathrooms: '3.5',
      parking: '2 Covered Bays',
      startingPrice: 'AED 2,980,000',
      description: 'Prestigious family residence with private foyer, expansive family lounge, show and wet kitchen, maid’s room with attached bath, three lavish bedrooms, and dual panoramic terraces.',
      rooms: [
        { name: 'Grand Living Hall', size: '6.8m x 7.2m' },
        { name: 'Master Suite', size: '4.8m x 5.2m' },
        { name: 'Bedroom 2 & 3', size: '3.8m x 4.2m each' },
        { name: 'Dual Terraces', size: '3.0m x 7.0m' },
      ],
    },
  };



  const faqs = [
    {
      q: 'Is Golf Trails a freehold property for international buyers?',
      a: 'Yes, Golf Trails by Emaar in Emaar South is 100% freehold. Both UAE nationals and international foreign investors can own properties here with complete ownership rights and title deeds issued directly by the Dubai Land Department (DLD).',
    },
    {
      q: 'What is the scheduled handover date and current progress?',
      a: 'Handover is scheduled for Q4 2030. Construction milestones and escrow account funds are rigorously audited and monitored under Dubai Land Department regulations (RERA).',
    },
    {
      q: 'What are the available payment plan options?',
      a: 'Emaar offers convenient construction-linked payment plans including the popular 80/20 plan (10% on booking, 70% in phased milestones during construction, and 20% upon completion), as well as investor-specific post-handover options.',
    },
    {
      q: 'Are properties at Golf Trails eligible for the UAE Golden Visa?',
      a: 'Yes! Properties with an acquisition value of AED 2,000,000 or above qualify buyers and their immediate family members for the prestigious 10-Year Renewable UAE Golden Visa with zero sponsor requirements.',
    },
    {
      q: 'What lifestyle amenities are available to residents?',
      a: 'Residents enjoy privileged access to an 18-hole championship golf course, modern clubhouse, infinity swimming pools, fully equipped fitness center, shaded children’s splash zones, outdoor barbecue lawns, bicycle trails, and a vibrant community retail center.',
    },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const idMap: { [key: string]: string } = {
      'OVERVIEW': 'overview-section',
      'FLOOR PLANS': 'floor-plans-section',
      'AMENITIES': 'amenities-section',
      'VIDEO TOUR': 'video-tour-section',
      'GALLERY': 'gallery-section',
      'LOCATION': 'location-section',
      'FAQ': 'faq-section',
    };
    const el = document.getElementById(idMap[tab]);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentPlan = parsedFloorPlans.find((p: any) => p.id === selectedBed) || parsedFloorPlans[0] || (floorPlanDetails as any)[selectedBed];

  return (
    <section className="w-full bg-[#FAF9F6] py-6 sm:py-8 lg:py-10">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        {/* Top 2-Column Section: Overview & Key Info (Left) + Explore More Sidebar (Right) */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          
          {/* Left Column: Key Metrics, Brochure, Highlights, Tabs, Overview, Stepper, Developer */}
          <div className="flex-1 min-w-0 w-full space-y-7 sm:space-y-8">
            
            {/* 1. Key Metrics Strip Card */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-2.5 sm:p-3 shadow-sm flex flex-col md:flex-row items-stretch gap-3">
              {/* Dark Starting Price Block */}
              <div className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between text-white shadow-sm md:w-[36%] lg:w-[34%] shrink-0">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                    STARTING PRICE
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-xs sm:text-sm font-bold text-[#BA955C]">AED</span>
                    <span className="text-2xl sm:text-[28px] font-extrabold text-white tracking-tight leading-none font-poppins">
                      {startingPriceDisplay.replace(/^AED\s*/i, '')}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#272727] text-[11px] text-stone-300 border border-white/5">
                    <span>Developer</span>
                    <span className="text-[#BA955C] font-semibold">{developerDisplay}</span>
                  </div>
                </div>
              </div>

              {/* 4 Stats Metrics in White Section */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 items-center py-2 sm:py-3 px-2">
                {/* 1. Unit Types */}
                <div className="flex flex-col justify-center px-3 sm:px-4 border-r border-stone-200/80 h-full">
                  <div className="w-6 h-6 flex items-center justify-center text-[#BA955C]">
                    <svg className="w-5 h-5 text-[#BA955C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5M3.75 7.5a2.25 2.25 0 012.25-2.25h12a2.25 2.25 0 012.25 2.25M3.75 7.5v10.5m16.5-10.5v10.5M3.75 18h16.5" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mt-2.5 block">
                    UNIT TYPES
                  </span>
                  <span className="text-sm sm:text-base font-bold text-stone-900 mt-0.5 block">
                    {unitTypesDisplay}
                  </span>
                </div>

                {/* 2. Size Range */}
                <div className="flex flex-col justify-center px-3 sm:px-4 border-r border-stone-200/80 h-full">
                  <div className="w-6 h-6 flex items-center justify-center text-[#BA955C]">
                    <svg className="w-5 h-5 text-[#BA955C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mt-2.5 block">
                    SIZE RANGE
                  </span>
                  <span className="text-xs sm:text-[13px] font-bold text-stone-900 mt-0.5 block truncate">
                    {sizeRangeDisplay}
                  </span>
                </div>

                {/* 3. Handover */}
                <div className="flex flex-col justify-center px-3 sm:px-4 border-r border-stone-200/80 h-full">
                  <div className="w-6 h-6 flex items-center justify-center text-[#BA955C]">
                    <svg className="w-5 h-5 text-[#BA955C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mt-2.5 block">
                    HANDOVER
                  </span>
                  <span className="text-sm sm:text-base font-bold text-stone-900 mt-0.5 block">
                    {handoverDisplay}
                  </span>
                </div>

                {/* 4. Payment Plan */}
                <div className="flex flex-col justify-center px-3 sm:px-4 h-full">
                  <div className="w-6 h-6 flex items-center justify-center text-[#BA955C]">
                    <svg className="w-5 h-5 text-[#BA955C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mt-2.5 block">
                    PAYMENT PLAN
                  </span>
                  <span className="text-sm sm:text-base font-bold text-stone-900 mt-0.5 block">
                    {paymentPlanDisplay}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Download Project Brochure Banner */}
            <div
              onClick={handleDownloadBrochure}
              className="w-full bg-[#BA955C] hover:bg-[#aa864e] transition-colors rounded-2xl p-5 sm:p-6 flex items-center justify-between text-white shadow-sm cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {downloading ? 'Preparing Brochure...' : 'Download Project Brochure'}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-white/90 font-normal mt-0.5">
                    Full brochure with floor plans and pricing
                  </p>
                </div>
              </div>

              <div className="shrink-0 pl-4 group-hover:translate-y-0.5 transition-transform">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
            </div>

            {/* 3. Key Highlights Section */}
            <div className="space-y-5 pt-1">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#BA955C] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.4h7.6l-6.1 4.5 2.3 7.1-6.2-4.6-6.2 4.6 2.3-7.1-6.1-4.5h7.6z" />
                  </svg>
                </div>

                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#BA955C] uppercase tracking-[0.2em] block">
                    WHY THIS PROJECT
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#111827] font-poppins tracking-tight mt-0.5">
                    Key Highlights
                  </h2>
                </div>
              </div>

              {/* 2-Column Grid of Highlight Pills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {keyHighlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-stone-200/80 px-4 py-3.5 sm:py-4 flex items-center gap-3.5 shadow-2xs hover:border-stone-300 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#BA955C] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l2.4 7.4h7.6l-6.1 4.5 2.3 7.1-6.2-4.6-6.2 4.6 2.3-7.1-6.1-4.5h7.6z" />
                      </svg>
                    </div>

                    <span className="text-xs sm:text-[13.5px] text-[#374151] font-medium">
                      {item.label}:{' '}
                      <span className="font-bold text-[#111827]">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ======================================================== */}
            {/* CONTINUITY NAVIGATION TABS & SECTIONS (MATCHING SCREENSHOT) */}
            {/* ======================================================== */}

            {/* Navigation Tabs Bar */}
            <div className="bg-white rounded-2xl border border-stone-200/80 p-2 shadow-xs flex items-center gap-2 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleTabClick(tab)}
                    className={`px-5 sm:px-7 py-3 rounded-xl text-xs sm:text-[13px] font-bold tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#BA955C] text-white shadow-xs'
                        : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* SECTION 1: OVERVIEW */}
            <div id="overview-section" className="space-y-6 pt-1">
              <div>
                <span className="text-[11px] font-bold text-[#BA955C] uppercase tracking-[0.2em] block mb-1.5">
                  ABOUT THE PROJECT
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] font-poppins tracking-tight mb-3">
                  Project Overview
                </h2>
                <p className="text-sm sm:text-[15px] text-[#525252] leading-relaxed">
                  {overviewSec.contentText || overviewSec.description || `${projectTitle} by ${developerDisplay} in ${projectLocation} introduces luxury ${unitTypesDisplay} residences with starting prices from ${startingPriceDisplay} AED. Handover is scheduled for ${handoverDisplay}, offering strategic investment appeal and seamless city connectivity.`}
                </p>

                {isExpanded && (
                  <div className="mt-3.5 space-y-3 text-sm sm:text-[15px] text-[#525252] leading-relaxed">
                    <p>
                      Crafted for discerning homeowners and high-yield investors alike, {projectTitle} integrates floor-to-ceiling panoramic windows, wide private balconies framing landscaped vistas, and modern open-plan living spaces finished with premium fixtures.
                    </p>
                    <p>
                      Residents benefit from an array of resort-grade amenities, including an infinity pool deck, state-of-the-art health and wellness club, landscaped barbecue gardens, children’s splash play areas, and dedicated running and cycling trails connected to community promenades.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#BA955C] hover:text-[#a17e47] cursor-pointer transition-colors"
                >
                  <span>{isExpanded ? 'Read less' : 'Read more'}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>

              {/* Gold Payment Plan Card */}
              <div className="bg-[#BA955C] rounded-2xl p-4 sm:p-5 text-white shadow-sm transition-all">
                <div
                  onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                        Payment Plan
                      </h3>
                      <p className="text-xs sm:text-[13px] text-white/90 font-normal mt-0.5">
                        Starting from AED {startingPriceDisplay.replace(/^AED\s*/i, '')} • {paymentPlanDisplay}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-white/95 bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-xl transition-colors">
                    <span>3 Options</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${showPaymentOptions ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>

                {/* Expandable 3 Payment Options */}
                {showPaymentOptions && (
                  <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { title: '80/20 Standard', down: '10% Down Payment', during: '70% Construction (7 Milestones)', handover: '20% on Handover (Q4 2030)' },
                      { title: '70/30 Investor Plan', down: '10% Down Payment', during: '60% Construction', handover: '30% on Handover (Q4 2030)' },
                      { title: '50/50 Post-Handover', down: '10% Down Payment', during: '40% Construction', handover: '50% Post-Handover over 24 Months' },
                    ].map((opt, i) => (
                      <div key={i} className="bg-white/10 rounded-xl p-3.5 border border-white/15 text-xs text-white space-y-1.5">
                        <span className="font-bold text-[13px] block text-white">{opt.title}</span>
                        <div className="text-white/80">{opt.down}</div>
                        <div className="text-white/80">{opt.during}</div>
                        <div className="text-white font-medium">{opt.handover}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3-Step Payment Milestone Stepper & Explainer Card */}
              <div className="space-y-6 pt-2">
                {/* Horizontal Stepper */}
                <div className="relative py-4 max-w-2xl mx-auto">
                  {/* Subtle Background Connector Line connecting circles */}
                  <div className="absolute left-[16%] right-[16%] top-10 h-0.5 bg-stone-200/90 -z-0" />

                  <div className="grid grid-cols-3 gap-2 relative z-10 text-center">
                    {/* Step 1: On Booking */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[#374151] text-white flex items-center justify-center shadow-xs">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                        </svg>
                      </div>
                      <h4 className="text-sm sm:text-[15px] font-bold text-[#111827] mt-3 tracking-tight">
                        On Booking
                      </h4>
                      <p className="text-[11px] sm:text-xs text-stone-400 font-medium mt-0.5">
                        Step 1 · 20% paid
                      </p>
                      <span className="text-base sm:text-lg font-bold text-stone-600 mt-2 block">
                        20%
                      </span>
                    </div>

                    {/* Step 2: During Construction */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[#8E8E93] text-white flex items-center justify-center shadow-xs">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                      </div>
                      <h4 className="text-sm sm:text-[15px] font-bold text-[#111827] mt-3 tracking-tight">
                        During Construction
                      </h4>
                      <p className="text-[11px] sm:text-xs text-stone-400 font-medium mt-0.5">
                        Step 2 · 60% paid
                      </p>
                      <span className="text-base sm:text-lg font-bold text-stone-600 mt-2 block">
                        40%
                      </span>
                    </div>

                    {/* Step 3: On Handover */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[#BA955C] text-white flex items-center justify-center shadow-xs">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-sm sm:text-[15px] font-bold text-[#111827] mt-3 tracking-tight">
                        On Handover
                      </h4>
                      <p className="text-[11px] sm:text-xs text-stone-400 font-medium mt-0.5">
                        Step 3 · 100% paid
                      </p>
                      <span className="text-base sm:text-lg font-bold text-[#BA955C] mt-2 block">
                        40%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Explainer paragraph box */}
                <div className="p-4 sm:p-5 rounded-2xl border border-stone-200/80 bg-white shadow-2xs">
                  <p className="text-xs sm:text-[13px] text-stone-500 leading-relaxed">
                    Emaar offers a buyer-friendly payment structure designed to make luxury home ownership more accessible. 20% down payment on booking. 40% during construction. 40% payable upon handover. Transparent pricing with no hidden charges. Suitable for both investors and end-users. Professional assistance throughout the purchasing process
                  </p>
                </div>

                {/* About the Developer Card */}
                <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs relative">
                  {/* Top Gold Accent Bar */}
                  <div className="h-1 bg-[#BA955C] w-full" />

                  <div className="p-4 sm:p-6 space-y-5">
                    {/* Header with Building Icon */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF4EA] text-[#BA955C] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#BA955C] uppercase tracking-[0.2em] block">
                          DEVELOPER
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#111827] font-poppins tracking-tight mt-0.5">
                          About the Developer
                        </h3>
                      </div>
                    </div>

                    {/* 2-Column Content: Left Details + Right Image */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                      
                      {/* Left Column: Info + Stat + Button */}
                      <div className="md:col-span-7 flex flex-col justify-between space-y-5">
                        
                        {/* Logo and Description */}
                        <div className="flex items-start gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-[#BA955C] text-white flex items-center justify-center font-bold text-2xl shrink-0 font-poppins shadow-xs">
                            {developerDisplay.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-[#111827] leading-snug">
                              {developerDisplay}
                            </h4>
                            <p className="text-xs sm:text-[13px] text-stone-500 mt-1 leading-relaxed">
                              {developerDisplay} is a leading real estate developer in the UAE, renowned for delivering premier residential projects across prime locations in Dubai.
                            </p>
                          </div>
                        </div>

                        {/* Stat Box: 376+ Projects Delivered */}
                        <div className="bg-[#FAF9F6] rounded-2xl border border-stone-200/80 p-5 text-center flex flex-col items-center justify-center">
                          <svg className="w-5 h-5 text-stone-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                          </svg>
                          <span className="text-2xl sm:text-3xl font-extrabold text-[#111827] font-poppins tracking-tight block">
                            376+
                          </span>
                          <span className="text-xs text-stone-400 font-medium mt-0.5 block">
                            Projects Delivered
                          </span>
                        </div>

                        {/* View Developer Profile Button */}
                        <div>
                          <Link
                            href="/developers"
                            className="w-full bg-[#BA955C] hover:bg-[#a8844d] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm py-3.5 px-5 rounded-xl flex items-center justify-between transition-all shadow-xs cursor-pointer group"
                          >
                            <span>View Developer Profile</span>
                            <svg
                              className="w-4 h-4 transition-transform group-hover:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        </div>

                      </div>

                      {/* Right Column: Master Community Image */}
                      <div className="md:col-span-5 relative min-h-[260px] rounded-2xl overflow-hidden shadow-2xs border border-stone-200/60">
                        <Image
                          src="/emaar_lagoon_community.jpg"
                          alt="Emaar Master Community Lagoon"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 35vw"
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Explore More Sidebar (Narrow Width ~260px-275px, ending before Floor Plan) */}
          <aside className="w-full lg:w-[260px] xl:w-[275px] shrink-0">
            <ExploreMoreSidebar />
          </aside>
        </div>

        {/* Subsequent Sections: Full Width Continuity from Floor Plan Onwards */}
        <div className="w-full space-y-12 sm:space-y-14 pt-8 sm:pt-10">

          {/* SECTION 2: FLOOR PLANS */}
          <div id="floor-plans-section" className="space-y-6 pt-4 border-t border-stone-200/80">
              
              {/* Header with House Icon */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#BA955C] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#BA955C] uppercase tracking-[0.2em] block">
                    {floorplansSec.tagline || 'BROWSE UNITS'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] font-poppins tracking-tight mt-0.5">
                    {floorplansSec.title || 'Floor Plan'}
                  </h2>
                  {(floorplansSec.description || floorplansSec.contentText) && (
                    <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl leading-relaxed">
                      {floorplansSec.description || floorplansSec.contentText}
                    </p>
                  )}
                </div>
              </div>

              {/* Bedroom Tabs Bar */}
              <div className="bg-[#F8F7F4] rounded-2xl p-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {parsedFloorPlans.map((item: any) => {
                  const isActive = selectedBed === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedBed(item.id)}
                      className={`px-6 sm:px-8 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#BA955C] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* 2-Column Content: Left Unit Specs & Actions + Right Floor Plan on Request Canvas */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Left Column */}
                <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
                  
                  {/* Title & Status Pills */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                        {currentPlan.title || `${currentPlan.bedrooms} ${Number(currentPlan.bedrooms) === 1 ? 'Bedroom' : 'Bedrooms'}`}
                      </h3>
                      <span className="text-xs text-stone-400 font-medium block mt-0.5">
                        {projectTitle}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200/60 text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span>Out of Stock</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Available</span>
                      </span>
                    </div>
                  </div>

                  {/* Dark Price Strip Card */}
                  <div className="bg-[#242424] rounded-2xl p-5 sm:p-6 text-white flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                        STARTING FROM
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-xs sm:text-sm font-bold text-[#BA955C]">AED</span>
                        <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none font-poppins">
                          {currentPlan.startingPrice || startingPriceDisplay.replace(/^AED\s*/i, '')}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] sm:text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                        APPROX. PRICE PER SQ. FT.
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white mt-1 block">
                        AED {currentPlan.approxPerSqft || '974'}
                      </span>
                    </div>
                  </div>

                  {/* 3 Metric Stat Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {/* Bedrooms */}
                    <div className="bg-white rounded-2xl border border-stone-200/80 p-4 text-center flex flex-col items-center justify-center shadow-2xs">
                      <svg className="w-5 h-5 text-stone-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.75 7.5h16.5M3.75 7.5a2.25 2.25 0 012.25-2.25h12a2.25 2.25 0 012.25 2.25" />
                      </svg>
                      <span className="text-lg sm:text-xl font-bold text-[#111827] block">
                        {currentPlan.bedrooms}
                      </span>
                      <span className="text-xs text-stone-400 font-light block mt-0.5">
                        {Number(currentPlan.bedrooms) === 1 ? 'Bedroom' : 'Bedrooms'}
                      </span>
                    </div>

                    {/* Baths */}
                    <div className="bg-white rounded-2xl border border-stone-200/80 p-4 text-center flex flex-col items-center justify-center shadow-2xs">
                      <svg className="w-5 h-5 text-stone-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <span className="text-lg sm:text-xl font-bold text-[#111827] block">
                        {currentPlan.bathrooms}
                      </span>
                      <span className="text-xs text-stone-400 font-light block mt-0.5">
                        Baths
                      </span>
                    </div>

                    {/* Sq. Ft. */}
                    <div className="bg-white rounded-2xl border border-stone-200/80 p-4 text-center flex flex-col items-center justify-center shadow-2xs">
                      <svg className="w-5 h-5 text-stone-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                      <span className="text-lg sm:text-xl font-bold text-[#111827] block">
                        {currentPlan.minSize || currentPlan.totalArea?.replace(/\s*sq\.ft.*$/i, '') || '1,283'}
                      </span>
                      <span className="text-xs text-stone-400 font-light block mt-0.5">
                        Sq. Ft.
                      </span>
                    </div>
                  </div>

                  {/* Optional Plan Description from CMS */}
                  {currentPlan.description && (
                    <div className="p-4 rounded-xl bg-white border border-stone-200/80 text-xs sm:text-[13px] text-stone-600 leading-relaxed shadow-2xs">
                      {currentPlan.description}
                    </div>
                  )}

                  {/* 2 CTA Buttons: Enquire & Book a Viewing */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <a
                      href="https://wa.me/971500000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#22C55E] hover:bg-[#16A34A] active:scale-[0.99] text-white font-semibold text-xs sm:text-[13px] py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.073.043.419-.101.824z" />
                      </svg>
                      <span>Enquire about this unit</span>
                    </a>

                    <Link
                      href="/advisory-report"
                      className="w-full bg-white hover:bg-stone-50 border border-stone-200/90 active:scale-[0.99] text-stone-700 font-semibold text-xs sm:text-[13px] py-3.5 px-4 rounded-xl flex items-center justify-center shadow-xs transition-colors cursor-pointer text-center"
                    >
                      Book a viewing
                    </Link>
                  </div>

                </div>

                {/* Right Column: Floor Plan Layout Image or Blueprint Canvas */}
                {currentPlan.image ? (
                  <div className="lg:col-span-6 bg-white border border-stone-200/80 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden min-h-[340px] shadow-2xs group">
                    <img
                      src={currentPlan.image}
                      alt={currentPlan.title}
                      className="max-w-full max-h-[360px] object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div
                    className="lg:col-span-6 bg-[#FAF9F6] border border-stone-200/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[340px]"
                    style={{
                      backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  >
                    {/* Document Icon Box */}
                    <div className="w-16 h-16 rounded-2xl bg-[#BA955C] text-white flex items-center justify-center shadow-sm">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>

                    {/* Title & Subtitle */}
                    <h4 className="text-base sm:text-lg font-bold text-[#111827] font-poppins mt-4">
                      Floor Plan on Request
                    </h4>
                    <p className="text-xs sm:text-[13px] text-stone-500 font-normal mt-1 max-w-xs leading-relaxed">
                      Contact us to receive the full floor plan for this unit
                    </p>

                    {/* Request Button */}
                    <button
                      type="button"
                      onClick={handleDownloadBrochure}
                      className="mt-6 px-8 py-3 bg-[#BA955C] hover:bg-[#a8844d] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      Request Floor Plan
                    </button>
                  </div>
                )}

              </div>
            </div>

            {/* SECTION: AMENITIES & FACILITIES */}
            <div id="amenities-section" className="space-y-6 pt-4 border-t border-stone-200/80">
              
              {/* Header with Star Icon */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#BA955C] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <svg className="w-4 h-4 fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#BA955C] uppercase tracking-[0.2em] block">
                    LIFESTYLE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] font-poppins tracking-tight mt-0.5">
                    Amenities &amp; Facilities
                  </h2>
                </div>
              </div>

              {/* 10 Amenities Grid (5 columns on desktop, 3 on tablet, 2 on mobile) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8 gap-x-4 pt-3">
                
                {/* 1. Children Play Area */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#BA955C]/45 bg-white flex items-center justify-center text-[#BA955C] group-hover:border-[#BA955C] group-hover:bg-[#FAF4EA]/40 transition-all shadow-2xs">
                    <svg className="w-8 h-8 text-[#BA955C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="4" r="1.5" />
                      <circle cx="8" cy="10" r="1.5" />
                      <path d="M8 11.5v3.5m0 0l-2 3m2-3l2 3M5.5 11l2.5 1.5 2-2" />
                      <circle cx="16" cy="10" r="1.5" />
                      <path d="M16 11.5v3.5m0 0l-2 3m2-3l2 3M18.5 11l-2.5 1.5-2-2" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium text-stone-800 text-center mt-3 group-hover:text-[#BA955C] transition-colors leading-tight">
                    Children Play Area
                  </span>
                </div>

                {/* 2. Schools */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#BA955C]/45 bg-white flex items-center justify-center text-[#BA955C] group-hover:border-[#BA955C] group-hover:bg-[#FAF4EA]/40 transition-all shadow-2xs">
                    <svg className="w-8 h-8 text-[#BA955C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3L4 7v14h16V7l-8-4z" />
                      <path d="M9 21v-7a3 3 0 016 0v7" />
                      <circle cx="12" cy="8.5" r="1.5" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium text-stone-800 text-center mt-3 group-hover:text-[#BA955C] transition-colors leading-tight">
                    Schools
                  </span>
                </div>

                {/* 3. Restaurants */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#BA955C]/45 bg-white flex items-center justify-center text-[#BA955C] group-hover:border-[#BA955C] group-hover:bg-[#FAF4EA]/40 transition-all shadow-2xs">
                    <svg className="w-8 h-8 text-[#BA955C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5" />
                      <path d="M5 6v5a2 2 0 002 2v5M7 6v7M20 6v12M17 6v6a2 2 0 002 2" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium text-stone-800 text-center mt-3 group-hover:text-[#BA955C] transition-colors leading-tight">
                    Restaurants
                  </span>
                </div>

                {/* 4. Shopping Mall */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#BA955C]/45 bg-white flex items-center justify-center text-[#BA955C] group-hover:border-[#BA955C] group-hover:bg-[#FAF4EA]/40 transition-all shadow-2xs">
                    <svg className="w-8 h-8 text-[#BA955C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l2-5h14l2 5v1a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 01-3 3 3 3 0 01-3-3V9z" />
                      <path d="M5 13v8h14v-8M9 21v-5h6v5" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium text-stone-800 text-center mt-3 group-hover:text-[#BA955C] transition-colors leading-tight">
                    Shopping Mall
                  </span>
                </div>

                {/* 5. Walking Trails */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#BA955C]/45 bg-white flex items-center justify-center text-[#BA955C] group-hover:border-[#BA955C] group-hover:bg-[#FAF4EA]/40 transition-all shadow-2xs">
                    <svg className="w-8 h-8 text-[#BA955C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19c4-5 6-8 10-8s5-2 6-6" strokeDasharray="1.5 2" />
                      <path d="M6 21c4-5 6-8 10-8s5-2 6-6" />
                      <circle cx="10" cy="13" r="1" />
                      <circle cx="14" cy="9" r="1" />
                      <circle cx="7" cy="17" r="1" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium text-stone-800 text-center mt-3 group-hover:text-[#BA955C] transition-colors leading-tight">
                    Walking Trails
                  </span>
                </div>

                {/* 6. Sports Facilities */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#BA955C]/45 bg-white flex items-center justify-center text-[#BA955C] group-hover:border-[#BA955C] group-hover:bg-[#FAF4EA]/40 transition-all shadow-2xs">
                    <svg className="w-8 h-8 text-[#BA955C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="15" cy="5" r="2" />
                      <path d="M4 11h4M3 15h4M10 11l3-2 3 2 3-1" />
                      <path d="M13 9v5l-4 4-2-2" />
                      <path d="M13 14l3 3 3-1" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium text-stone-800 text-center mt-3 group-hover:text-[#BA955C] transition-colors leading-tight">
                    Sports Facilities
                  </span>
                </div>

                {/* 7. Gym */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#BA955C]/45 bg-white flex items-center justify-center text-[#BA955C] group-hover:border-[#BA955C] group-hover:bg-[#FAF4EA]/40 transition-all shadow-2xs">
                    <svg className="w-8 h-8 text-[#BA955C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6.5 6.5l11 11M5 9l2-2M15 19l2-2M3.5 10.5l3-3M13.5 20.5l3-3M6.5 5l-2 2M19.5 18l-2 2" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium text-stone-800 text-center mt-3 group-hover:text-[#BA955C] transition-colors leading-tight">
                    Gym
                  </span>
                </div>

                {/* 8. Parking Area */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#BA955C]/45 bg-white flex items-center justify-center text-[#BA955C] group-hover:border-[#BA955C] group-hover:bg-[#FAF4EA]/40 transition-all shadow-2xs">
                    <svg className="w-8 h-8 text-[#BA955C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l1.8-4.5a2 2 0 011.8-1.5h6.8a2 2 0 011.8 1.5L19 13v5a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H7v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-5z" />
                      <circle cx="7.5" cy="13.5" r="1.5" />
                      <circle cx="16.5" cy="13.5" r="1.5" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium text-stone-800 text-center mt-3 group-hover:text-[#BA955C] transition-colors leading-tight">
                    Parking Area
                  </span>
                </div>

                {/* 9. 24X7 Security */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#BA955C]/45 bg-white flex items-center justify-center text-[#BA955C] group-hover:border-[#BA955C] group-hover:bg-[#FAF4EA]/40 transition-all shadow-2xs">
                    <svg className="w-8 h-8 text-[#BA955C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="11" width="14" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 018 0v4" />
                      <circle cx="12" cy="16" r="1" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium text-stone-800 text-center mt-3 group-hover:text-[#BA955C] transition-colors leading-tight">
                    24X7 Security
                  </span>
                </div>

                {/* 10. Golf Course */}
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#BA955C]/45 bg-white flex items-center justify-center text-[#BA955C] group-hover:border-[#BA955C] group-hover:bg-[#FAF4EA]/40 transition-all shadow-2xs">
                    <svg className="w-8 h-8 text-[#BA955C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 17c3-2 7-3 10-1s6 2 6 0-3-3-6-3-7 1-10 4z" />
                      <path d="M12 15V4l6 3-6 3" />
                      <circle cx="12" cy="15" r="1.5" fill="#BA955C" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium text-stone-800 text-center mt-3 group-hover:text-[#BA955C] transition-colors leading-tight">
                    Golf Course
                  </span>
                </div>

              </div>
            </div>

            {/* SECTION: PROJECT VIDEO TOUR */}
            {!isVideoHidden && (
              <ProjectVideoSection
                coverImage={videoSec.bgImage || videoSec.backgroundImage || pageData?.content?.hero?.backgroundImage || "/project-detail-hero.png"}
                projectName={projectTitle}
                title={videoSec.title || `Experience ${projectTitle} in Motion`}
                subtitle={videoSec.contentText || `Explore the architectural elegance, expansive green landscapes, and resort-grade amenities of ${projectTitle} by ${developerDisplay}.`}
                videoUrl={videoSec.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
              />
            )}

            {/* SECTION: PROJECT PHOTO GALLERY */}
            <ProjectGallerySection
              projectName={projectTitle}
              title={gallerySec.title}
              description={gallerySec.description || gallerySec.contentText}
              images={gallerySec.items || gallerySec.images}
              interiorImages={gallerySec.interiorImages}
              exteriorImages={gallerySec.exteriorImages}
              lifestyleImages={gallerySec.lifestyleImages}
            />

            {/* SECTION 3: LOCATION */}
            <ProjectLocationSection
              mapImageSrc={locationSec.bgImage || "/map.png"}
              eyebrow={locationSec.tagline || "On the Map"}
              title={locationSec.title || "Location & Surroundings"}
              description={locationSec.contentText || `Centrally positioned in ${projectLocation} with effortless connectivity to international transit corridors and business hubs.`}
              latitude={locationSec.latitude}
              longitude={locationSec.longitude}
              googleMapsUrl={locationSec.locationUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(projectLocation + ' Dubai UAE')}`}
              directionsUrl={locationSec.locationUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(projectLocation + ' Dubai UAE')}`}
            />

            {/* SECTION: OFF-PLAN GUIDE BLOG / EDUCATIONAL CONTENT */}
            <OffPlanGuideSection contentHtml={guideSec.detailHtml} pageSlug={slug} />

            {/* SECTION 5: FAQ (EXACT SAME SECTION AS PROJECT-MAIN-PAGE) */}
            <BuyerGuideFaqSection
              id="faq-section"
              pageSlug={slug}
              faqs={Array.isArray(faqsSec.items) && faqsSec.items.length > 0
                ? faqsSec.items.map((f: any, idx: number) => ({
                    id: `proj-faq-${idx}`,
                    question: f.q || f.question || '',
                    answer: f.a || f.answer || '',
                  }))
                : undefined}
              detailHtml={faqsSec.detailHtml}
            />

            {/* SECTION 6: PROJECT ENQUIRY FORM (FULL WIDTH UNDER FAQS) */}
            <ProjectEnquiryForm projectName={projectTitle} />

            {/* SECTION 7: SIMILAR PROJECTS */}
            <SimilarProjectsSection />



        </div>
      </div>
    </section>
  );
}

