'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BuyDetailFirstSectionProps {
  breadcrumbTitle?: string;
  slug?: string;
  customSections?: Record<string, any>;
}

const agentsList = [
  { id: '1', name: 'Nathalie Syvak', agency: 'Espace Real Estate', image: '/agent-1.png' },
  { id: '2', name: 'Alparslan Danaci', agency: 'White & Co Real Estate', image: '/agent-2.png' },
  { id: '3', name: 'Firas Almsaddi', agency: 'Fam Properties', image: '/agent-3.png' },
  { id: '4', name: 'Liaqat Ali Khan', agency: 'Driven Properties', image: '/agent-4.png' },
  { id: '5', name: 'Kseniia Gladkikh', agency: 'Dacha Real Estate', image: '/agent-5.png' },
];

const amenitiesList = [
  {
    name: 'Unfurnished',
    icon: (
      <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M5 10v8m14-8v8M4 18h16" />
      </svg>
    ),
  },
  {
    name: 'Central A/C',
    icon: (
      <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3m15.364-6.364l-12.728 12.728m0-12.728l12.728 12.728" />
      </svg>
    ),
  },
  {
    name: 'Built in Wardrobes',
    icon: (
      <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4V4zm8 0v16M8 12h.01M16 12h.01" />
      </svg>
    ),
  },
  {
    name: 'Kitchen Appliances',
    icon: (
      <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-4-16v6a2 2 0 002 2h0a2 2 0 002-2V4m6 0v16m0-10a3 3 0 00-3-3" />
      </svg>
    ),
  },
  {
    name: 'Security',
    icon: (
      <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    name: 'Barbecue Area',
    icon: (
      <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 11a8 8 0 0016 0H4zm2 4l-2 5m14-5l2 5M12 15v5m-4-9V7m8 4V7" />
      </svg>
    ),
  },
  {
    name: 'Private Pool',
    icon: (
      <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 17c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M2 12c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M7 5a2 2 0 100-4 2 2 0 000 4zm0 0v5" />
      </svg>
    ),
  },
  {
    name: 'Walk-in Closet',
    icon: (
      <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h7v16H4V4zm9 0h7v16h-7V4zm2 8h1m-10 0h1" />
      </svg>
    ),
  },
  {
    name: 'Private Garden',
    icon: (
      <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V9m0 0a5 5 0 015-5c0 4-3 6-5 6zm0 0a5 5 0 00-5-5c0 4 3 6 5 6zm-7 12h14" />
      </svg>
    ),
  },
];

const soldForTransactions = [
  { date: '16 Jun 2026', aed: '16,000,000', area: '10,302' },
  { date: '5 Dec 2025', aed: '22,000,000', area: '10,643' },
  { date: '4 Dec 2025', aed: '30,400,000', area: '10,643' },
];

const rentedForTransactions = [
  { date: '17 Sep 2026', aedYear: '720,000', area: '11,034' },
  { date: '13 Sep 2026', aedYear: '500,000', area: '10,627' },
  { date: '11 Sep 2025', aedYear: '720,000', area: '11,034' },
  { date: '18 Sep 2024', aedYear: '720,000', area: '11,034' },
  { date: '30 Jan 2024', aedYear: '360,000', area: '10,302' },
];

export default function BuyDetailFirstSection({
  breadcrumbTitle = 'Lake View | Rare to Market | Garden Hall',
  slug = 'buy-detail',
  customSections = {},
}: BuyDetailFirstSectionProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [activeTab, setActiveTab] = useState<'building' | 'community'>('building');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [liveSections, setLiveSections] = useState<Record<string, any>>(customSections || {});

  useEffect(() => {
    setLiveSections(customSections || {});
    try {
      if (typeof window !== 'undefined') {
        const candidates = [
          slug ? `fs_page_${slug}` : null,
          slug === 'buy-detail' ? 'fs_page_lake-view-garden-hall-jumeirah-islands' : null,
          'fs_page_buy-detail',
        ].filter(Boolean) as string[];
        for (const key of candidates) {
          const cached = localStorage.getItem(key);
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed?.content?.customSections && Object.keys(parsed.content.customSections).length > 0) {
              setLiveSections((prev) => ({
                ...prev,
                ...parsed.content.customSections,
              }));
              break;
            }
          }
        }
      }
    } catch (_) {}
  }, [slug, customSections]);

  const heroSec = liveSections['buy-detail-hero'] || {};
  const overviewSec = liveSections['buy-detail-overview'] || {};
  const descSec = liveSections['buy-detail-description'] || {};
  const amenitiesSec = liveSections['buy-detail-amenities'] || {};
  const trendsSec = liveSections['buy-detail-trends'] || {};
  const locSec = liveSections['buy-detail-location'] || {};
  const buildingSec = liveSections['buy-detail-building'] || {};
  const sidebarSec = liveSections['buy-detail-sidebar'] || {};

  const normalizeImg = (url: string | undefined, fallback: string) => {
    if (!url || url === '/buy-details-hero1.png') return fallback;
    if (url === '/buy-details-hero2.png') return '/property-card.png';
    if (url === '/buy-details-hero3.png') return '/banner_img.png';
    if (url === '/brochure.png') return '/r.hill-brochure.png';
    return url;
  };

  const galleryImages: string[] =
    Array.isArray(heroSec.images) && heroSec.images.length > 0
      ? heroSec.images.map((u: string, i: number) =>
          normalizeImg(u, i === 0 ? '/bannerimg.png' : i === 1 ? '/property-card.png' : '/banner_img.png')
        )
      : Array.isArray(heroSec.items) && heroSec.items.length > 0
      ? heroSec.items.map((u: string, i: number) =>
          normalizeImg(u, i === 0 ? '/bannerimg.png' : i === 1 ? '/property-card.png' : '/banner_img.png')
        )
      : [
          normalizeImg(heroSec.mainImage, '/bannerimg.png'),
          normalizeImg(heroSec.sideImage1, '/property-card.png'),
          normalizeImg(heroSec.sideImage2, '/banner_img.png'),
        ];

  const mainHeroImg = galleryImages[0] || '/bannerimg.png';
  const sideHeroImg1 = galleryImages[1] || galleryImages[0] || '/property-card.png';
  const sideHeroImg2 = galleryImages[2] || galleryImages[1] || galleryImages[0] || '/banner_img.png';
  const photoCountText = heroSec.photoCount || String(galleryImages.length || 20);
  const displayUspsText =
    Array.isArray(overviewSec.usps) && overviewSec.usps.filter((u: string) => String(u || '').trim() !== '').length > 0
      ? overviewSec.usps.filter((u: string) => String(u || '').trim() !== '').join(' | ')
      : '';
  const displayTitle = displayUspsText || overviewSec.title || breadcrumbTitle || 'Lake View | Rare to Market | Garden Hall';
  const displayDetailsHeading = overviewSec.detailsHeading || 'Property Details';
  const displayPrice = overviewSec.price || 'AED 24,750,000';
  const displayMonthly = overviewSec.monthlyEstimate || 'Own from AED 89,073 / month';
  const displayType = overviewSec.propertyType || 'Villa';
  const displayFurnishing = overviewSec.furnishing || 'Unfurnished';
  const displayBeds = overviewSec.bedrooms || '4';
  const displayBaths = overviewSec.bathrooms || '5';
  const displayArea = overviewSec.areaSqft || '10,643 sq ft';

  const displayParagraphs: string[] =
    Array.isArray(descSec.paragraphs) && descSec.paragraphs.length > 0
      ? descSec.paragraphs
      : [
          'Engel & Voelkers is proud to present a rare opportunity to acquire a Garden Hall Villa in the prestigious Jumeirah Islands community.',
          'This vacant property is situated on a 10,643 plot, offering enhanced privacy and stunning views of the lake. The villa features four generously sized bedrooms, a separate study room, a maid’s room with private access, and three spacious living areas, providing ample space for family living and entertaining.',
        ];

  const displayBullets: string[] =
    Array.isArray(descSec.bullets) && descSec.bullets.length > 0
      ? descSec.bullets
      : [
          'Garden Hall',
          '4 Bedrooms + Maid’s',
          'Study room and 3 living rooms',
          'Private swimming pool & landscaped garden',
          'Direct unobstructed lake views',
          'Built up area: 5,340 sq ft',
          'Plot area: 10,643 sq ft',
          'Vacant on transfer',
        ];

  const displayAmenityItems: any[] =
    Array.isArray(amenitiesSec.items) && amenitiesSec.items.length > 0
      ? amenitiesSec.items
      : amenitiesList.map((a) => a.name);

  const displaySoldTx =
    Array.isArray(trendsSec.soldTransactions) && trendsSec.soldTransactions.length > 0
      ? trendsSec.soldTransactions.map((t: any) => ({
          date: t.date,
          aed: t.price || t.aed,
          area: t.area,
        }))
      : soldForTransactions;

  const displayRentedTx =
    Array.isArray(trendsSec.rentedTransactions) && trendsSec.rentedTransactions.length > 0
      ? trendsSec.rentedTransactions.map((t: any) => ({
          date: t.date,
          aedYear: t.price || t.aedYear,
          area: t.area,
        }))
      : rentedForTransactions;

  const handleWhatsAppContact = () => {
    window.open(
      'https://wa.me/971500000000?text=Hello%20FS%20Advisory%2C%20I%20am%20interested%20in%20R.%20Hills.',
      '_blank'
    );
  };

  const handleDownloadBrochure = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('R. Hills Project Brochure download started!');
    }, 800);
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: breadcrumbTitle,
          url: window.location.href,
        });
      } catch {
        // Dismissed
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="w-full bg-[#FAF9F6] pt-6 sm:pt-8 pb-12">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 1. TOP BREADCRUMB & ACTION BUTTONS (Save, Share, Report)                   */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-5">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-500 overflow-x-auto no-scrollbar py-0.5"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            <Link
              href="/"
              className="text-neutral-500 hover:text-neutral-900 transition-colors flex items-center shrink-0"
              title="Home"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
            <span className="text-neutral-400 select-none text-[10px]">&gt;</span>

            <Link
              href="/buy"
              className="text-neutral-500 hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0"
            >
              Villas
            </Link>
            <span className="text-neutral-400 select-none text-[10px]">&gt;</span>

            <Link
              href="/communities"
              className="text-neutral-500 hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0"
            >
              Jumeirah Islands
            </Link>
            <span className="text-neutral-400 select-none text-[10px]">&gt;</span>

            <Link
              href="/communities"
              className="text-neutral-500 hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0"
            >
              Mediterranean Clusters
            </Link>
            <span className="text-neutral-400 select-none text-[10px]">&gt;</span>

            <Link
              href="/communities"
              className="text-neutral-500 hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0"
            >
              Cluster 5
            </Link>
            <span className="text-neutral-400 select-none text-[10px]">&gt;</span>

            <span className="text-neutral-800 font-medium whitespace-nowrap truncate max-w-[220px] sm:max-w-none">
              {breadcrumbTitle}
            </span>
          </nav>

          <div
            className="flex items-center gap-4 sm:gap-5 text-xs text-neutral-500 shrink-0 ml-auto"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors cursor-pointer group"
            >
              <svg
                className={`w-3.5 h-3.5 transition-colors ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'fill-none stroke-current stroke-2'
                }`}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
              <span>Share</span>
            </button>

            <button
              type="button"
              onClick={() => alert('Report listing submitted.')}
              className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.779V4.5l-3.114.779a9 9 0 01-6.086-.71l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                />
              </svg>
              <span>Report</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. GALLERY ROW: LEFT COL-9 (IMAGE CONTAINERS) + RIGHT COL-3 (SIDEBAR TOP)  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          
          {/* LEFT 9 COLUMNS: IMAGES GALLERY */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
              
              {/* Big Featured Left Image Container (md:col-span-8) */}
              <div
                onClick={() => {
                  setLightboxIndex(0);
                  setLightboxOpen(true);
                }}
                className="md:col-span-8 relative w-full h-[340px] sm:h-[420px] md:h-[480px] lg:h-[500px] rounded-2xl overflow-hidden bg-neutral-200 shadow-xs border border-neutral-200/70 group cursor-pointer"
              >
                <img
                  src={mainHeroImg}
                  alt={displayTitle}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />

                {/* Bottom Left Badges: Verified & SuperAgent */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                  {heroSec.verifiedBadge !== false && (
                    <span className="px-3 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[11px] font-semibold text-neutral-900 shadow-sm flex items-center gap-1.5 border border-white/40">
                      <svg className="w-3.5 h-3.5 text-emerald-600 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  )}

                  {heroSec.superAgentBadge !== false && (
                    <span className="px-3 py-1 rounded-md bg-black/75 backdrop-blur-xs text-[11px] font-semibold text-white shadow-sm flex items-center gap-1.5 border border-white/20">
                      <svg className="w-3.5 h-3.5 text-[#BFA16A] fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l2.4 7.4h7.6l-6.1 4.5 2.3 7.1-6.2-4.6-6.2 4.6 2.3-7.1-6.1-4.5h7.6z" />
                      </svg>
                      SuperAgent
                    </span>
                  )}
                </div>

                {/* Bottom Right Photo Count: [Camera] 20 */}
                <div className="absolute bottom-4 right-4 z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(0);
                      setLightboxOpen(true);
                    }}
                    className="px-3 py-1 rounded-md bg-black/70 backdrop-blur-xs text-[11px] font-semibold text-white shadow-sm flex items-center gap-1.5 border border-white/20 hover:bg-black/90 transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <span>{photoCountText}</span>
                  </button>
                </div>
              </div>

              {/* 2 Stacked Right Image Containers (md:col-span-4) */}
              <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4 h-[240px] sm:h-[300px] md:h-[480px] lg:h-[500px]">
                <div
                  onClick={() => {
                    setLightboxIndex(1 < galleryImages.length ? 1 : 0);
                    setLightboxOpen(true);
                  }}
                  className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-200 shadow-xs border border-neutral-200/70 group cursor-pointer"
                >
                  <img
                    src={sideHeroImg1}
                    alt="Property Villa Exterior"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                </div>

                <div
                  onClick={() => {
                    setLightboxIndex(2 < galleryImages.length ? 2 : 0);
                    setLightboxOpen(true);
                  }}
                  className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-200 shadow-xs border border-neutral-200/70 group cursor-pointer"
                >
                  <img
                    src={sideHeroImg2}
                    alt="Community & Garden View"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                  {galleryImages.length > 3 && (
                    <div className="absolute inset-0 bg-black/45 hover:bg-black/55 transition flex items-center justify-center">
                      <span className="text-white font-bold text-sm sm:text-base tracking-wide">
                        +{galleryImages.length - 3} Photos
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT 3 COLUMNS: TOP WIDGETS (Widget 1 & 2) */}
          <div className="lg:col-span-3 space-y-5">
            {/* Widget 1: Contact Us */}
            <div className="bg-[#18181B] rounded-2xl p-6 text-white shadow-sm">
              <h3
                className="text-xl font-bold text-white tracking-tight font-poppins"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Contact Us
              </h3>
              <p
                className="text-xs text-[#9CA3AF] mt-1"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                Register Your Interest For <span className="text-white font-medium">R. Hills</span>
              </p>

              <button
                type="button"
                onClick={handleWhatsAppContact}
                className="w-full mt-5 py-3 px-4 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] active:scale-[0.99] text-white font-semibold text-xs sm:text-[13px] transition-all shadow-sm flex items-center justify-between cursor-pointer"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                <span>Register Interest</span>
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.971.53 1.77.822 2.791.822 3.184 0 5.77-2.587 5.771-5.767.001-3.183-2.585-5.807-5.77-5.807zm3.374 8.212c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.12-.519-1.572-.65-2.581-2.239-2.66-2.344-.077-.105-.638-.85-.638-1.621 0-.771.404-1.15.548-1.306.144-.156.314-.195.42-.195.105 0 .21.002.302.007.098.005.23-.037.36.275.144.346.495 1.206.538 1.294.043.088.072.19.014.305-.058.115-.088.187-.175.289-.088.102-.185.228-.264.306-.089.088-.182.185-.078.363.104.178.463.764.993 1.237.684.61 1.26.799 1.439.887.179.088.283.073.389-.044.106-.117.452-.527.573-.708.121-.181.242-.151.406-.09.164.06 1.04.49 1.218.579.178.088.297.132.341.205.044.073.044.422-.1.827z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.685 0-3.25-.502-4.568-1.365l-.328-.215-2.964.832.842-2.883-.217-.346A8.125 8.125 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
                </svg>
              </button>
            </div>

            {/* Widget 2: R. Hills Brochure */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 text-center shadow-sm space-y-4">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-xl overflow-hidden shadow-2xs">
                <Image
                  src="/r.hill-brochure.png"
                  alt="R. Hills Brochure Landmark"
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>

              <div>
                <h3
                  className="text-base sm:text-lg font-bold text-stone-900 font-poppins"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  R. Hills Brochure
                </h3>
                <p
                  className="text-xs text-stone-500 mt-1 max-w-[220px] mx-auto leading-relaxed"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  Download the project brochure to learn more.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadBrochure}
                disabled={downloading}
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#BA955C] hover:bg-[#a6834d] active:scale-[0.99] text-white font-semibold text-xs sm:text-[13px] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                <span>{downloading ? 'Downloading...' : 'Download Brochure'}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. CONTINUITY SECTION: COL-9 CONTENT + ALL REMAINING SIDEBAR WIDGETS      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 mt-8 sm:mt-10 items-start">
          
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT 9 COLUMNS: ORDER 1 -> ORDER 2 -> ORDER 3 -> TRENDS -> AD -> LOC    */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-9 space-y-10 sm:space-y-12">
            
            {/* --------------------------------------------------------------------- */}
            {/* ORDER 1: Lake View | Rare to Market | Garden Hall & Property Details  */}
            {/* --------------------------------------------------------------------- */}
            <div className="space-y-6">
              <div>
                <h1
                  className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-poppins"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {displayTitle}
                </h1>

                {/* Verified & SuperAgent Tags */}
                <div className="flex items-center gap-2 mt-3">
                  {heroSec.verifiedBadge !== false && (
                    <span className="px-3 py-0.5 rounded bg-[#EEF2F6] text-[#475569] text-xs font-medium">
                      Verified
                    </span>
                  )}
                  {heroSec.superAgentBadge !== false && (
                    <span className="px-3 py-0.5 rounded bg-[#EEF2F6] text-[#475569] text-xs font-medium">
                      SuperAgent
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Upfront/Monthly stats */}
              <div>
                <div
                  className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight font-poppins"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {displayPrice}
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-xs sm:text-[13px] text-stone-600">
                  <span className="cursor-pointer hover:underline text-stone-600">
                    {overviewSec.upfrontCostsLabel || 'Estimated upfront costs'}
                  </span>
                  <span className="text-stone-700 font-medium">{displayMonthly}</span>
                </div>
              </div>

              {/* Property Details Specs Table */}
              <div className="pt-2">
                <h2
                  className="text-lg sm:text-xl font-bold text-stone-900 font-poppins pb-3"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {displayDetailsHeading}
                </h2>

                <div className="border-t border-stone-200 divide-y divide-stone-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200 py-3 text-xs sm:text-sm">
                    <div className="flex items-center justify-between pr-0 md:pr-8 py-1.5 md:py-0">
                      <span className="text-stone-500">Property type</span>
                      <span className="font-bold text-stone-900">{displayType}</span>
                    </div>
                    <div className="flex items-center justify-between pl-0 md:pl-8 py-1.5 md:py-0">
                      <span className="text-stone-500">Furnishing</span>
                      <span className="font-bold text-stone-900">{displayFurnishing}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200 py-3 text-xs sm:text-sm">
                    <div className="flex items-center justify-between pr-0 md:pr-8 py-1.5 md:py-0">
                      <span className="text-stone-500">Bedrooms</span>
                      <span className="font-bold text-stone-900">{displayBeds}</span>
                    </div>
                    <div className="flex items-center justify-between pl-0 md:pl-8 py-1.5 md:py-0">
                      <span className="text-stone-500">Area</span>
                      <span className="font-bold text-stone-900">{displayArea}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200 py-3 text-xs sm:text-sm">
                    <div className="flex items-center justify-between pr-0 md:pr-8 py-1.5 md:py-0">
                      <span className="text-stone-500">Bathrooms</span>
                      <span className="font-bold text-stone-900">{displayBaths}</span>
                    </div>
                    <div className="hidden md:block pl-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* ORDER 2: Villa for sale in Cluster 50, Mediterranean Clusters Content */}
            {/* --------------------------------------------------------------------- */}
            <div className="pt-2 border-t border-stone-200/90 space-y-4">
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
                {descSec.eyebrow || 'Villa for sale in Cluster 50, Mediterranean Clusters'}
              </span>

              {/* Available from date */}
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <svg className="w-4 h-4 text-stone-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{descSec.availableFrom || 'Available from 28 Sep 2026'}</span>
              </div>

              {/* Description Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {displayParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}

                {/* Bullet Points */}
                <ul className="space-y-1.5 text-stone-700 font-medium pt-1">
                  {(showFullDesc ? displayBullets : displayBullets.slice(0, 2)).map((bullet, bIdx) => (
                    <li key={bIdx}>- {bullet}</li>
                  ))}
                </ul>
              </div>

              {/* See Full Description Button */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="px-4 py-2 rounded-xl border border-[#BA955C] text-[#BA955C] hover:bg-[#BA955C] hover:text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  {showFullDesc ? 'Show less' : 'See full description'}
                </button>
              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* ORDER 3: Amenities & Transactions for Similar Properties             */}
            {/* --------------------------------------------------------------------- */}
            <div className="pt-2 border-t border-stone-200/90 space-y-10">
              
              {/* Amenities Grid */}
              <div className="space-y-4">
                <h2
                  className="text-lg sm:text-xl font-bold text-stone-900 font-poppins"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {amenitiesSec.title || 'Amenities'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 pt-1">
                  {displayAmenityItems.map((item, idx) => {
                    const name = typeof item === 'string' ? item : item?.name || '';
                    const customIconSvg = typeof item === 'object' ? item?.iconSvg || '' : '';
                    const matchedIcon = amenitiesList.find(
                      (a) => a.name.toLowerCase() === String(name).toLowerCase()
                    )?.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3 text-xs sm:text-[13px] text-stone-700">
                        <div className="shrink-0">
                          {matchedIcon ? (
                            matchedIcon
                          ) : customIconSvg && customIconSvg.trim().startsWith('<') ? (
                            <svg
                              className="w-5 h-5 text-neutral-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.7}
                              dangerouslySetInnerHTML={{ __html: customIconSvg }}
                            />
                          ) : customIconSvg && (customIconSvg.startsWith('/') || customIconSvg.startsWith('http') || customIconSvg.startsWith('data:')) ? (
                            <img src={customIconSvg} alt={name} className="w-5 h-5 object-contain" />
                          ) : (
                            amenitiesList[idx % amenitiesList.length].icon
                          )}
                        </div>
                        <span>{name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Transactions for Similar Properties Section */}
              <div className="space-y-5 pt-4 border-t border-stone-200/90">
                <div>
                  <h2
                    className="text-lg sm:text-xl font-bold text-stone-900 font-poppins"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    Transactions for Similar Properties
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    {trendsSec.similarSubtitle || '4 Beds Villa in Cluster 50'}
                  </p>
                </div>

                {/* 2 Side-by-side Tables: Sold for & Rented for */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                  
                  {/* Left Table: Sold for */}
                  <div className="space-y-3">
                    <h3 className="text-sm sm:text-base font-bold text-stone-900">
                      Sold for
                    </h3>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-[13px]">
                        <thead>
                          <tr className="bg-[#F8F9FA] text-stone-600 font-semibold border-b border-stone-200">
                            <th className="py-2.5 px-3">Date</th>
                            <th className="py-2.5 px-3">AED</th>
                            <th className="py-2.5 px-3 text-right">Area (sqft)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-700">
                          {displaySoldTx.map((tx: any, idx: number) => (
                            <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                              <td className="py-3 px-3 text-stone-600">{tx.date}</td>
                              <td className="py-3 px-3 font-semibold text-stone-900">{tx.aed}</td>
                              <td className="py-3 px-3 text-right text-stone-600">{tx.area}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right Table: Rented for */}
                  <div className="space-y-3">
                    <h3 className="text-sm sm:text-base font-bold text-stone-900">
                      Rented for
                    </h3>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-[13px]">
                        <thead>
                          <tr className="bg-[#F8F9FA] text-stone-600 font-semibold border-b border-stone-200">
                            <th className="py-2.5 px-3">Date</th>
                            <th className="py-2.5 px-3">AED/yea</th>
                            <th className="py-2.5 px-3 text-right">Area (sqft)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-700">
                          {displayRentedTx.map((tx: any, idx: number) => (
                            <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                              <td className="py-3 px-3 text-stone-600">{tx.date}</td>
                              <td className="py-3 px-3 font-semibold text-stone-900">{tx.aedYear}</td>
                              <td className="py-3 px-3 text-right text-stone-600">{tx.area}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* See All Transactions In This Location Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    className="px-4 py-2.5 rounded-xl border border-[#BA955C] text-[#BA955C] hover:bg-[#BA955C] hover:text-white text-xs sm:text-[13px] font-semibold transition-colors cursor-pointer"
                  >
                    See all transactions in this location
                  </button>
                </div>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* SECTION: Price & Trends                                             */}
              {/* ------------------------------------------------------------------- */}
              <div className="space-y-4 pt-6 border-t border-stone-200/90">
                <h2
                  className="text-lg sm:text-xl font-bold text-stone-900 font-poppins"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  Price &amp; Trends
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  
                  {/* Card 1: PRICE VS. AVERAGE (6% Lower) */}
                  <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                    <div>
                      <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                        PRICE VS. AVERAGE
                      </span>
                      <div
                        className="text-2xl sm:text-3xl font-bold text-[#BA955C] font-poppins mt-1"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                      >
                        {trendsSec.priceVsAverageBadge || '6% Lower'}
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {trendsSec.priceVsAverageDesc || 'This property costs 6% less than the average.'}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 text-xs">
                      <div>
                        <div className="flex items-center justify-between text-stone-700 font-medium mb-1.5">
                          <span>This property</span>
                          <span className="font-bold text-stone-900">{trendsSec.priceThisProperty || displayPrice}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                          <div className="h-full bg-[#BA955C] rounded-full" style={{ width: '94%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-stone-500 mb-1.5">
                          <span>Average sale price</span>
                          <span className="font-semibold text-stone-700">{trendsSec.priceAverageProperty || 'AED 26,236,304'}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-stone-200" />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: SIZE VS. AVERAGE (33% Larger) */}
                  <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                    <div>
                      <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                        SIZE VS. AVERAGE
                      </span>
                      <div
                        className="text-2xl sm:text-3xl font-bold text-[#BA955C] font-poppins mt-1"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                      >
                        {trendsSec.sizeVsAverageBadge || '33% Larger'}
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {trendsSec.sizeVsAverageDesc || 'This property is 33% bigger than the average.'}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 text-xs">
                      <div>
                        <div className="flex items-center justify-between text-stone-700 font-medium mb-1.5">
                          <span>This property</span>
                          <span className="font-bold text-stone-900">{trendsSec.sizeThisProperty || displayArea}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                          <div className="h-full bg-[#BA955C] rounded-full" style={{ width: '100%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-stone-500 mb-1.5">
                          <span>Average size</span>
                          <span className="font-semibold text-stone-700">{trendsSec.sizeAverageProperty || '8,026 sq ft'}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                          <div className="h-full bg-stone-300 rounded-full" style={{ width: '75%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <p className="text-[11px] text-stone-500 pt-1">
                  Based on the average prices and sizes of all listings live on Property Finder in Jumeirah Islands.
                </p>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* SECTION: AD BANNER (Invest in Dubai's next landmark by Binghatti)   */}
              {/* ------------------------------------------------------------------- */}
              <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs p-3 sm:p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* Left: Ad Image with 'AD' badge */}
                  <div className="relative md:col-span-4 h-48 sm:h-52 w-full rounded-xl overflow-hidden bg-stone-100">
                    <Image
                      src="/property-card.png"
                      alt="Binghatti Property Interior"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold tracking-wider uppercase">
                      AD
                    </span>
                  </div>

                  {/* Right: Ad Copy, Logo & Enquire Now button */}
                  <div className="md:col-span-8 p-1 sm:p-2 flex flex-col justify-between h-full space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-base sm:text-lg font-bold text-[#BA955C] block">
                          Invest in Dubai's next
                        </span>
                        <h3
                          className="text-xl sm:text-2xl font-bold text-stone-900 font-poppins leading-tight mt-0.5"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          landmark by Binghatti
                        </h3>
                      </div>

                      <div className="shrink-0 pt-1">
                        <Image
                          src="/developers/binghatti.png"
                          alt="Binghatti Developers"
                          width={85}
                          height={28}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <p className="text-xs sm:text-[13px] text-stone-600">
                        Studios to 5 BR apartments <span className="text-stone-400">|</span> From AED 1.1M
                      </p>

                      <button
                        type="button"
                        onClick={handleWhatsAppContact}
                        className="py-2 px-5 rounded-xl bg-[#BA955C] hover:bg-[#a6834d] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                      >
                        Enquire now
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* SECTION: LOCATION CONTAINER (WITH ADDRESS, GPS MAP & DIRECTIONS)     */}
              {/* ------------------------------------------------------------------- */}
              <div id="location-section" className="space-y-4 pt-4 border-t border-stone-200/80">
                <h2
                  className="text-lg sm:text-xl font-bold text-stone-900 font-poppins"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {locSec.title || 'Location'}
                </h2>

                {/* 1. Address Summary Bar */}
                <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#BA955C] border border-[#EBE3D5] flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>

                    <div className="truncate">
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                        {locSec.addressTitle || 'Cluster 50, Mediterranean Clusters,'}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-stone-500 truncate mt-0.5">
                        {locSec.addressSubtitle || 'Jumeirah Islands, Dubai'}
                      </p>
                    </div>
                  </div>

                  <a
                    href={
                      locSec.mapUrl ||
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${locSec.latitude || '25.31528411624274'},${locSec.longitude || '55.322673566004696'}`
                      )}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-stone-300 text-stone-700 hover:border-[#BA955C] hover:text-[#BA955C] text-xs font-semibold shrink-0 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>View on map</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </div>

                {/* 2. Interactive Google Maps Embed with GPS Pin & Directions */}
                {(() => {
                  const latStr = String(locSec.latitude || '25.31528411624274').trim();
                  const lngStr = String(locSec.longitude || '55.322673566004696').trim();
                  const coordsQuery = `${encodeURIComponent(latStr)},${encodeURIComponent(lngStr)}`;
                  const embedUrl = `https://maps.google.com/maps?q=${coordsQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
                  const effectiveGoogleMapsUrl = locSec.mapUrl || `https://www.google.com/maps/search/?api=1&query=${coordsQuery}`;
                  const effectiveDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordsQuery}`;

                  return (
                    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden">
                      <div className="relative w-full aspect-[16/9] min-h-[260px] sm:min-h-[320px] bg-[#E9E5DE]">
                        <iframe
                          key={`map-${latStr}-${lngStr}`}
                          src={embedUrl}
                          title="Property Location Interactive Map"
                          className="w-full h-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          allowFullScreen
                        />
                      </div>

                      {/* Map Footer Bar with Plan your visit & CTAs */}
                      <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF9F6] border-t border-stone-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-stone-800 -rotate-45" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-900 leading-tight">
                              Plan your visit
                            </p>
                            <p className="text-[11px] text-stone-500">
                              Lat: {latStr} · Long: {lngStr}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={effectiveDirectionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#BA955C] hover:bg-[#a8844f] text-white text-xs font-semibold transition shadow-xs"
                          >
                            <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                            <span>Get Directions</span>
                          </a>
                          <a
                            href={effectiveGoogleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-semibold transition"
                          >
                            <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                              <path d="M19.5 15.75l2.25 2.25-2.25 2.25" />
                            </svg>
                            <span>Open in Maps</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT 3 COLUMNS: COMPLETE SIDEBAR WIDGETS (WIDGETS 3 TO 8)              */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Widget 3: Explore Top Agents In R. Hills (TruBroker™) */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="px-2.5 py-1 rounded-lg bg-[#044343] text-[#2DD4BF] text-[11px] font-semibold tracking-wide shrink-0 shadow-2xs"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  TruBroker™
                </span>
                <h3
                  className="text-xs sm:text-[13px] text-stone-800 font-medium leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  Explore Top Agents In <span className="font-bold text-stone-900">R. Hills</span>
                </h3>
              </div>

              {/* List of 5 Agents */}
              <div className="space-y-2.5">
                {agentsList.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-stone-200/80 hover:border-stone-300 hover:shadow-xs transition-all bg-white cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border border-stone-100 bg-stone-100">
                        <Image
                          src={agent.image}
                          alt={agent.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>

                      <div className="truncate">
                        <div
                          className="text-xs sm:text-[13.5px] font-bold text-stone-900 truncate group-hover:text-[#BA955C] transition-colors"
                          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                        >
                          {agent.name}
                        </div>
                        <div
                          className="text-[11px] text-stone-400 font-normal truncate mt-0.5"
                          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                        >
                          {agent.agency}
                        </div>
                      </div>
                    </div>

                    <svg
                      className="w-4 h-4 text-stone-400 group-hover:text-stone-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                ))}
              </div>

              {/* View All TruBrokers Button */}
              <button
                type="button"
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#BA955C] hover:bg-[#a6834d] active:scale-[0.99] text-white font-semibold text-xs sm:text-[13px] transition-all shadow-xs flex items-center justify-center cursor-pointer"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                <span>View All TruBrokers™</span>
              </button>
            </div>

            {/* Widget 4: Sell Or Rent Your Property (Dark Card) */}
            <div className="bg-[#18181B] rounded-2xl p-6 text-white shadow-sm space-y-3">
              <div>
                <h3
                  className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug font-poppins"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  Sell Or Rent Your Property
                </h3>
                <p
                  className="text-xs text-[#9CA3AF] mt-1.5 leading-relaxed"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  Connect with a trusted agent to secure the best deal, faster.
                </p>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppContact}
                className="w-full mt-4 py-2.5 sm:py-3 px-4 rounded-xl bg-white hover:bg-stone-100 active:scale-[0.99] text-stone-900 font-semibold text-xs sm:text-[13px] transition-all shadow-xs flex items-center justify-between cursor-pointer"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                <span>Get Started</span>
                <svg className="w-4 h-4 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Widget 5: Recent Sale Transactions */}
            <div className="space-y-2">
              <div className="px-1">
                <h3
                  className="text-base sm:text-[17px] font-bold text-[#2563EB] underline decoration-2 underline-offset-4 cursor-pointer hover:text-blue-700 transition-colors inline-block tracking-tight"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  Recent Sale Transactions
                </h3>
                <p
                  className="text-xs text-stone-400 mt-1"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  R. Hills
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm">
                <div className="bg-[#BA955C] px-4 py-2.5 text-white flex items-center justify-between text-xs font-bold">
                  <span>Price</span>
                  <span>Location</span>
                </div>

                <div className="divide-y divide-stone-100">
                  <div className="p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900 text-[13px]">AED 2.6M</span>
                      <span className="text-stone-500">R. Hills</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded bg-[#F4F4F5] text-stone-600 text-[11px] font-medium">Villa</span>
                      <span className="px-2.5 py-1 rounded bg-[#F4F4F5] text-stone-600 text-[11px] font-medium">5 Beds</span>
                      <span className="px-2.5 py-1 rounded bg-[#F4F4F5] text-stone-600 text-[11px] font-medium">1,997 Sqft</span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900 text-[13px]">AED 1.6M</span>
                      <span className="text-stone-500">R. Hills</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded bg-[#F4F4F5] text-stone-600 text-[11px] font-medium">Villa</span>
                      <span className="px-2.5 py-1 rounded bg-[#F4F4F5] text-stone-600 text-[11px] font-medium">3 Beds</span>
                      <span className="px-2.5 py-1 rounded bg-[#F4F4F5] text-stone-600 text-[11px] font-medium">1,614 Sqft</span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900 text-[13px]">AED 1.6M</span>
                      <span className="text-stone-500">R. Hills</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded bg-[#F4F4F5] text-stone-600 text-[11px] font-medium">Villa</span>
                      <span className="px-2.5 py-1 rounded bg-[#F4F4F5] text-stone-600 text-[11px] font-medium">3 Beds</span>
                      <span className="px-2.5 py-1 rounded bg-[#F4F4F5] text-stone-600 text-[11px] font-medium">1,614 Sqft</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 pt-2 border-t border-stone-100">
                  <button
                    type="button"
                    className="w-full py-2.5 px-3 rounded-xl border border-[#BA955C] text-[#BA955C] hover:bg-[#BA955C]/5 text-xs font-semibold transition-colors cursor-pointer text-center"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    View 283 More Transactions
                  </button>
                </div>
              </div>
            </div>

            {/* Widget 6: Get New Listing Alerts */}
            <div className="text-center space-y-2">
              <p
                className="text-xs text-stone-500 leading-tight"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                Be The First To Hear About New Properties
              </p>
              <button
                type="button"
                className="w-full py-3 px-4 rounded-xl bg-[#BA955C] hover:bg-[#a6834d] active:scale-[0.99] text-white font-bold text-xs sm:text-[13px] uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span>GET NEW LISTING ALERTS</span>
              </button>
            </div>

            {/* Widget 7: Quick Searches & Nearby Links */}
            <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm">
              <div>
                <div
                  className="bg-[#F4F4F5] px-4 py-2 text-[11px] font-bold text-stone-700 uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  Recommended searches
                </div>
                <div
                  className="p-4 space-y-2 text-xs text-stone-600"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <p className="hover:text-stone-900 cursor-pointer transition-colors">3 Bedroom Properties For Sale In R. Hills</p>
                  <p className="hover:text-stone-900 cursor-pointer transition-colors">4 Bedroom Properties For Sale In R. Hills</p>
                  <p className="hover:text-stone-900 cursor-pointer transition-colors">5 Bedroom Properties For Sale In R. Hills</p>
                  <p className="hover:text-stone-900 cursor-pointer transition-colors">Villas For Sale In R. Hills</p>
                  <p className="hover:text-stone-900 cursor-pointer transition-colors">Townhouses For Sale In R. Hills</p>
                  <p className="font-bold text-stone-900 hover:text-[#BA955C] cursor-pointer pt-0.5">View More...</p>
                </div>
              </div>

              <div className="border-t border-stone-200/80">
                <div
                  className="bg-[#F4F4F5] px-4 py-2 text-[11px] font-bold text-stone-700 uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  NEAR R. HILLS
                </div>
                <div
                  className="p-4 space-y-2 text-xs text-stone-600"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <p className="hover:text-stone-900 cursor-pointer transition-colors">DAMAC Lagoons Properties</p>
                  <p className="hover:text-stone-900 cursor-pointer transition-colors">Paradise Hills Properties</p>
                  <p className="hover:text-stone-900 cursor-pointer transition-colors">Tilal Al Ghaf Properties</p>
                  <p className="hover:text-stone-900 cursor-pointer transition-colors">Dubai Sports City Properties</p>
                  <p className="hover:text-stone-900 cursor-pointer transition-colors">Dubai Studio City Properties</p>
                  <p className="font-bold text-stone-900 hover:text-[#BA955C] cursor-pointer pt-0.5">View More...</p>
                </div>
              </div>

              <div className="border-t border-stone-200/80">
                <div
                  className="bg-[#F4F4F5] px-4 py-2 text-[11px] font-bold text-stone-700 uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  INVEST IN OFF PLAN
                </div>
                <div
                  className="p-4 space-y-2 text-xs text-stone-600"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <p className="hover:text-stone-900 cursor-pointer transition-colors">Off Plan Properties In Dubai</p>
                  <p className="hover:text-stone-900 cursor-pointer transition-colors">New Projects In Dubai</p>
                </div>
              </div>
            </div>

            {/* Widget 8: R. Hills Project Overview Card */}
            <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm">
              <div className="grid grid-cols-12 h-44 sm:h-48 gap-1 bg-stone-100 p-1">
                <div className="relative col-span-8 h-full rounded-l-xl overflow-hidden">
                  <Image
                    src="/rhills-collage-1.png"
                    alt="R. Hills Exterior"
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>

                <div className="col-span-4 flex flex-col gap-1 h-full">
                  <div className="relative flex-1 rounded-tr-xl overflow-hidden">
                    <Image
                      src="/rhills-collage-2.png"
                      alt="R. Hills Interior Lounge"
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                  <div className="relative flex-1 rounded-br-xl overflow-hidden">
                    <Image
                      src="/rhills-collage-3.png"
                      alt="R. Hills Interior Dining"
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3
                    className="text-2xl font-bold text-[#BA955C] tracking-tight font-poppins"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    R. Hills
                  </h3>
                  <div
                    className="flex items-center gap-1.5 text-xs text-stone-700 font-semibold mt-1"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    <svg className="w-3.5 h-3.5 text-[#BA955C] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433 1.244-.77 2.87-2.029 4.33-3.794C17.158 12.825 18 10.59 18 8A8 8 0 102 8c0 2.59.842 4.825 2.3 6.558 1.46 1.765 3.086 3.024 4.33 3.794.311.193.571.337.757.433a5.74 5.74 0 00.28.14l.019.008.006.003.002.001zm.31-7.933a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <span>Dubai</span>
                  </div>
                </div>

                <div
                  className="divide-y divide-stone-100 text-xs text-stone-600 font-medium"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-stone-600 font-medium">Developer</span>
                    <span className="text-[#BA955C] font-semibold text-[13px]">Reportage Properties</span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-stone-600 font-medium">Project Status</span>
                    <span className="px-2.5 py-1 rounded-md bg-[#BA955C] text-white text-[11px] font-semibold">
                      Under Construction
                    </span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-stone-600 font-medium">Handover</span>
                    <span className="text-stone-900 font-bold text-[13px]">Q4 2028</span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-stone-600 font-medium">Launch Price</span>
                    <span className="text-stone-900 font-bold text-[13px]">AED 2.59M</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. FULL-WIDTH CONTINUATION: BUILDING & COMMUNITY (AFTER SIDEBAR ENDS)     */}
        {/* ========================================================================= */}
        <div className="mt-12 sm:mt-16 space-y-5">
          
          {/* Tab Bar: Building | Community */}
          <div className="border-b border-stone-200 flex items-center gap-6 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('building')}
              className={`pb-2.5 transition-colors relative cursor-pointer ${
                activeTab === 'building'
                  ? 'text-stone-900 border-b-2 border-stone-900 font-bold'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Building
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('community')}
              className={`pb-2.5 transition-colors relative cursor-pointer ${
                activeTab === 'community'
                  ? 'text-stone-900 border-b-2 border-stone-900 font-bold'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Community
            </button>
          </div>

          {/* About Cluster 50 Card Container (Full-Width) */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Header Row: Title & Learn More */}
            <div className="flex items-center justify-between gap-4">
              <h3
                className="text-lg sm:text-xl font-bold text-stone-900 font-poppins"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                {activeTab === 'building' ? 'About Cluster 50' : 'About Mediterranean Clusters'}
              </h3>

              <Link
                href="/communities"
                className="text-xs sm:text-[13px] text-stone-600 hover:text-[#BA955C] font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Learn More</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Summary Text */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-5xl">
              Cluster 50 in Jumeirah Islands offers 4 to 5 bedroom properties averaging 10,283–10,792 sq ft. It currently has 4 active sale listings.
            </p>

            {/* Two Stats Boxes: Properties Listed & Price Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-[#FAF9F6] rounded-xl border border-stone-200/80 p-4 sm:p-5">
                <span className="text-xs text-stone-400 font-medium block">
                  Properties Listed
                </span>
                <span className="text-lg sm:text-2xl font-bold text-stone-900 block mt-1 font-poppins">
                  4
                </span>
              </div>

              <div className="bg-[#FAF9F6] rounded-xl border border-stone-200/80 p-4 sm:p-5">
                <span className="text-xs text-stone-400 font-medium block">
                  Price Range
                </span>
                <span className="text-lg sm:text-2xl font-bold text-stone-900 block mt-1 font-poppins">
                  AED 21.9M - 43.9M
                </span>
              </div>
            </div>

            {/* Score Breakdown Section: 5.0 Star + Metric Bars */}
            <div className="pt-6 border-t border-stone-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left: Overall 5.0 Score & Review Action */}
              <div className="lg:col-span-3 flex flex-col items-center justify-center text-center p-4 lg:border-r border-stone-100">
                <div
                  className="text-4xl sm:text-5xl font-bold text-[#BA955C] font-poppins"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  5.0
                </div>

                <div className="flex items-center gap-1 text-[#BA955C] my-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <span className="text-xs text-stone-400 font-medium">1 review</span>

                <button
                  type="button"
                  onClick={() => alert('Review modal opened')}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-[#BA955C] hover:bg-[#a6834d] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  Review the building
                </button>
              </div>

              {/* Right: Score Breakdown Progress Metrics */}
              <div className="lg:col-span-9 space-y-4">
                <h4 className="text-sm font-bold text-stone-900">
                  Score Breakdown
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-xs sm:text-[13px]">
                  {/* 1. Connectivity & Traffic */}
                  <div>
                    <div className="flex items-center justify-between text-stone-700 font-medium mb-1.5">
                      <span>Connectivity &amp; Traffic</span>
                      <span className="font-bold text-stone-900">5.0</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div className="h-full bg-[#BA955C] rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  {/* 2. Peace & Quiet */}
                  <div>
                    <div className="flex items-center justify-between text-stone-700 font-medium mb-1.5">
                      <span>Peace &amp; Quiet</span>
                      <span className="font-bold text-stone-900">5.0</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div className="h-full bg-[#BA955C] rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  {/* 3. Family Friendly */}
                  <div>
                    <div className="flex items-center justify-between text-stone-700 font-medium mb-1.5">
                      <span>Family Friendly</span>
                      <span className="font-bold text-stone-900">5.0</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div className="h-full bg-[#BA955C] rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  {/* 4. Maintenance */}
                  <div>
                    <div className="flex items-center justify-between text-stone-700 font-medium mb-1.5">
                      <span>Maintenance</span>
                      <span className="font-bold text-stone-900">5.0</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div className="h-full bg-[#BA955C] rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  {/* 5. Parking Area */}
                  <div>
                    <div className="flex items-center justify-between text-stone-700 font-medium mb-1.5">
                      <span>Parking Area</span>
                      <span className="font-bold text-stone-900">5.0</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div className="h-full bg-[#BA955C] rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  {/* 6. Amenities */}
                  <div>
                    <div className="flex items-center justify-between text-stone-700 font-medium mb-1.5">
                      <span>Amenities</span>
                      <span className="font-bold text-stone-900">5.0</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div className="h-full bg-[#BA955C] rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>

                {/* Pagination arrows */}
                <div className="flex items-center justify-end gap-3 pt-3 text-stone-400">
                  <button type="button" className="p-1 hover:text-stone-700 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                  </button>
                  <button type="button" className="p-1 hover:text-stone-700 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Modal for Full Photo Gallery */}
      {lightboxOpen && galleryImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between text-white px-2">
              <span className="text-xs sm:text-sm font-semibold">
                {displayTitle} ({lightboxIndex + 1} / {galleryImages.length})
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center text-base font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full h-[55vh] sm:h-[68vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={galleryImages[lightboxIndex] || mainHeroImg}
                alt={`${displayTitle} - Photo ${lightboxIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
                    }
                    className="absolute left-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((prev) => (prev + 1) % galleryImages.length)
                    }
                    className="absolute right-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2.5 overflow-x-auto max-w-full py-1 px-2">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={`lb-thumb-${idx}`}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 shrink-0 transition cursor-pointer ${
                    idx === lightboxIndex ? 'border-[#BA955C] scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
