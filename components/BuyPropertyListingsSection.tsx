'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PropertyItem {
  id: string;
  price: string;
  type: string;
  beds: number;
  baths: number;
  builtUp: string;
  plot: string;
  title: string;
  location: string;
  validationDate: string;
  handover: string;
  paymentPlan: string;
  images: string[];
  slug?: string;
}

const propertiesList: PropertyItem[] = [
  {
    id: 'rhills-villa-1',
    price: 'AED 4,000,000',
    type: 'Villa',
    beds: 5,
    baths: 6,
    builtUp: '1,991 sqft',
    plot: '1,705 sqft',
    title: '5BR Villa | R. Hills | Pool & Garden Community',
    location: 'R. Hills, Dubai',
    validationDate: '23rd of September',
    handover: 'Q4 2028',
    paymentPlan: '30/70',
    images: ['/property-card.png', '/gallery-exterior.png', '/property_detail_main.jpg'],
  },
  {
    id: 'rhills-villa-2',
    price: 'AED 4,250,000',
    type: 'Villa',
    beds: 5,
    baths: 6,
    builtUp: '2,150 sqft',
    plot: '1,890 sqft',
    title: '5BR Luxury Villa | R. Hills | Direct Park Access',
    location: 'R. Hills, Dubai',
    validationDate: '24th of September',
    handover: 'Q4 2028',
    paymentPlan: '30/70',
    images: ['/property-card.png', '/gallery-exterior.png', '/property_detail_main.jpg'],
  },
  {
    id: 'rhills-villa-3',
    price: 'AED 3,850,000',
    type: 'Townhouse',
    beds: 4,
    baths: 5,
    builtUp: '1,850 sqft',
    plot: '1,620 sqft',
    title: '4BR Modern Townhouse | R. Hills | Prime Corner Plot',
    location: 'R. Hills, Dubai',
    validationDate: '25th of September',
    handover: 'Q1 2029',
    paymentPlan: '20/80',
    images: ['/property-card.png', '/gallery-exterior.png', '/property_detail_main.jpg'],
  },
  {
    id: 'rhills-villa-4',
    price: 'AED 4,700,000',
    type: 'Villa',
    beds: 5,
    baths: 6,
    builtUp: '2,340 sqft',
    plot: '2,100 sqft',
    title: '5BR Executive Villa | R. Hills | Sunset Boulevard View',
    location: 'R. Hills, Dubai',
    validationDate: '26th of September',
    handover: 'Q2 2028',
    paymentPlan: '30/70',
    images: ['/property-card.png', '/gallery-exterior.png', '/property_detail_main.jpg'],
  },
  {
    id: 'rhills-villa-5',
    price: 'AED 5,200,000',
    type: 'Villa',
    beds: 6,
    baths: 7,
    builtUp: '2,780 sqft',
    plot: '2,450 sqft',
    title: '6BR Grand Mansion | R. Hills | Private Lagoon Front',
    location: 'R. Hills, Dubai',
    validationDate: '28th of September',
    handover: 'Q3 2028',
    paymentPlan: '40/60',
    images: ['/property-card.png', '/gallery-exterior.png', '/property_detail_main.jpg'],
  },
  {
    id: 'rhills-villa-6',
    price: 'AED 3,950,000',
    type: 'Townhouse',
    beds: 4,
    baths: 5,
    builtUp: '1,920 sqft',
    plot: '1,710 sqft',
    title: '4BR Premium Townhouse | R. Hills | Green Spine Views',
    location: 'R. Hills, Dubai',
    validationDate: '29th of September',
    handover: 'Q4 2028',
    paymentPlan: '30/70',
    images: ['/property-card.png', '/gallery-exterior.png', '/property_detail_main.jpg'],
  },
  {
    id: 'rhills-villa-7',
    price: 'AED 4,400,000',
    type: 'Villa',
    beds: 5,
    baths: 6,
    builtUp: '2,200 sqft',
    plot: '1,950 sqft',
    title: '5BR Villa with Rooftop Terrace | R. Hills',
    location: 'R. Hills, Dubai',
    validationDate: '1st of October',
    handover: 'Q1 2029',
    paymentPlan: '30/70',
    images: ['/property-card.png', '/gallery-exterior.png', '/property_detail_main.jpg'],
  },
  {
    id: 'rhills-villa-8',
    price: 'AED 4,100,000',
    type: 'Villa',
    beds: 5,
    baths: 6,
    builtUp: '2,050 sqft',
    plot: '1,780 sqft',
    title: '5BR Contemporary Villa | R. Hills | Near Club House',
    location: 'R. Hills, Dubai',
    validationDate: '3rd of October',
    handover: 'Q4 2028',
    paymentPlan: '30/70',
    images: ['/property-card.png', '/gallery-exterior.png', '/property_detail_main.jpg'],
  },
  {
    id: 'rhills-villa-9',
    price: 'AED 3,750,000',
    type: 'Townhouse',
    beds: 4,
    baths: 4,
    builtUp: '1,810 sqft',
    plot: '1,590 sqft',
    title: '4BR Elegant Family Townhouse | R. Hills',
    location: 'R. Hills, Dubai',
    validationDate: '5th of October',
    handover: 'Q2 2029',
    paymentPlan: '20/80',
    images: ['/property-card.png', '/gallery-exterior.png', '/property_detail_main.jpg'],
  },
  {
    id: 'rhills-villa-10',
    price: 'AED 5,600,000',
    type: 'Villa',
    beds: 6,
    baths: 7,
    builtUp: '2,950 sqft',
    plot: '2,680 sqft',
    title: '6BR Signature Villa | R. Hills | Ultra Luxury Finish',
    location: 'R. Hills, Dubai',
    validationDate: '8th of October',
    handover: 'Q4 2028',
    paymentPlan: '40/60',
    images: ['/property-card.png', '/gallery-exterior.png', '/property_detail_main.jpg'],
  },
];

interface AgentItem {
  id: string;
  name: string;
  agency: string;
  image: string;
}

const agentsList: AgentItem[] = [
  {
    id: 'agent-1',
    name: 'Jaxon Troff',
    agency: 'IOD Real Estate',
    image: '/agent-1.png',
  },
  {
    id: 'agent-2',
    name: 'Sarah Helal',
    agency: 'Seagate Properties',
    image: '/agent-2.png',
  },
  {
    id: 'agent-3',
    name: 'Abdullah Kadwani',
    agency: 'IOD Real Estate',
    image: '/agent-3.png',
  },
  {
    id: 'agent-4',
    name: 'Nayli David',
    agency: 'IOD Real Estate',
    image: '/agent-4.png',
  },
  {
    id: 'agent-5',
    name: 'Paul Nixon',
    agency: 'IOD Real Estate',
    image: '/agent-5.png',
  },
];

interface BuyPropertyListingsSectionProps {
  className?: string;
  aboutHtml?: string;
  initialProperties?: any[];
}

export default function BuyPropertyListingsSection({
  className = '',
  aboutHtml,
  initialProperties,
}: BuyPropertyListingsSectionProps) {
  const formatProperty = (p: any): PropertyItem => {
    const pSlug = p.slug || (p.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const img = p.image_url || p.images?.[0] || '/bannerimg.png';
    const gallery = Array.isArray(p.images) && p.images.length > 0 ? p.images : [img, '/gallery-exterior.png', '/property_detail_main.jpg'];
    const builtUp = p.area_sqft ? `${Number(p.area_sqft).toLocaleString('en-US')} sqft` : (p.builtUp || '2,450 sqft');
    const plot = p.plot || (p.area_sqft ? `${Math.round(Number(p.area_sqft) * 0.85).toLocaleString('en-US')} sqft` : '2,100 sqft');
    return {
      id: String(p.id || pSlug),
      price: p.price || 'AED 5,000,000',
      type: p.type || 'Villa',
      beds: Number(p.bedrooms ?? p.beds ?? 3),
      baths: Number(p.bathrooms ?? p.baths ?? 3),
      builtUp,
      plot,
      title: p.title || 'Dubai Luxury Property',
      location: p.location || 'Dubai, UAE',
      validationDate: p.validationDate || 'Recently Added',
      handover: p.handover || 'Ready / Handover on Request',
      paymentPlan: p.paymentPlan || 'Standard Payment Plan',
      images: gallery,
      slug: pSlug,
    };
  };

  const [liveProperties, setLiveProperties] = useState<PropertyItem[]>(() => {
    if (Array.isArray(initialProperties) && initialProperties.length > 0) {
      return initialProperties.map(formatProperty);
    }
    return propertiesList;
  });
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({});
  const [viewMode, setViewMode] = useState<'List' | 'Map'>('List');
  const [downloading, setDownloading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAboutExpanded, setIsAboutExpanded] = useState<boolean>(true);

  useEffect(() => {
    const getDeletedSet = (extraDeleted: string[] = []) => {
      try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem('fs_deleted_properties') : null;
        const localArr = raw ? JSON.parse(raw).map((s: any) => String(s).toLowerCase().trim()) : [];
        return new Set([...localArr, ...extraDeleted.map((s) => String(s).toLowerCase().trim())]);
      } catch {
        return new Set<string>(extraDeleted.map((s) => String(s).toLowerCase().trim()));
      }
    };

    const filterAndMerge = (customItems: any[], deletedSet: Set<string>) => {
      const formattedCustom: PropertyItem[] = customItems
        .filter((p: any) => {
          const id = String(p.id ?? '').toLowerCase().trim();
          const title = String(p.title ?? '').toLowerCase().trim();
          const slug = String(p.slug ?? '').toLowerCase().trim();
          return !deletedSet.has(id) && !deletedSet.has(title) && !deletedSet.has(slug);
        })
        .map(formatProperty);

      // If user has properties in CMS / backend, show ONLY those live properties!
      if (formattedCustom.length > 0) {
        return formattedCustom;
      }

      // If items were deleted, do not restore hardcoded defaults
      if (deletedSet.size > 0 || (Array.isArray(customItems) && customItems.length === 0)) {
        return [];
      }

      const filteredDefaults = propertiesList.filter((dp) => {
        const id = String(dp.id).toLowerCase().trim();
        const title = dp.title.toLowerCase().trim();
        return !deletedSet.has(id) && !deletedSet.has(title);
      });

      return filteredDefaults;
    };

    // 1. Try reading from localStorage immediately
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('fs_properties_list');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setLiveProperties(filterAndMerge(parsed, getDeletedSet()));
          }
        }
      }
    } catch (_) {}

    // 2. Fetch from /api/cms-sync
    fetch('/api/cms-sync', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          const deleted = getDeletedSet(json.data.deletedProperties || []);
          const syncedProps = json.data.properties;
          if (Array.isArray(syncedProps)) {
            setLiveProperties(filterAndMerge(syncedProps, deleted));
          }
        }
      })
      .catch(() => {});

    // 3. Also check Laravel backend API if reachable
    const apiUrl = typeof window !== 'undefined'
      ? `http://${window.location.hostname}:8000/api/properties`
      : 'http://127.0.0.1:8000/api/properties';

    fetch(apiUrl, { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const deleted = getDeletedSet();
          setLiveProperties(filterAndMerge(json.data, deleted));
        }
      })
      .catch(() => {});

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'fs_properties_list' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setLiveProperties(filterAndMerge(parsed, getDeletedSet()));
          }
        } catch (_) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);


  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrevImage = (id: string, total: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndices((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) === 0 ? total - 1 : (prev[id] || 0) - 1,
    }));
  };

  const handleNextImage = (id: string, total: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndices((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) === total - 1 ? 0 : (prev[id] || 0) + 1,
    }));
  };

  const handleDownloadBrochure = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('R. Hills Project Brochure download started!');
    }, 800);
  };

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/971500000000?text=Hello%20FS%20Advisory%2C%20I%20am%20interested%20in%20R.%20Hills.', '_blank');
  };

  return (
    <section className={`w-full py-6 sm:py-8 ${className}`}>
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
        {/* 12-Column Grid: 9 Cols (Left Properties) + 3 Cols (Right Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: 9 COLUMNS (Properties Header + 10 Listings) */}
          {/* ======================================================== */}
          <div className="lg:col-span-9 space-y-5 sm:space-y-6">
            
            {/* Header: Title + Controls (Popular & View Switcher) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
              <h2
                className="text-lg sm:text-xl lg:text-[22px] font-normal text-[#6B7280] tracking-tight"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                Properties for sale in R. Hills
              </h2>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                {/* Popular Dropdown Button */}
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200/90 bg-white text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors shadow-2xs cursor-pointer"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <svg className="w-3.5 h-3.5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                  </svg>
                  <span>Popular</span>
                  <svg className="w-3 h-3 text-stone-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* List / Map Switcher Pills */}
                <div className="inline-flex items-center rounded-lg border border-stone-200/90 bg-white p-0.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setViewMode('List')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === 'List'
                        ? 'bg-[#BA955C] text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5.25A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                    <span>List</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('Map')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === 'Map'
                        ? 'bg-[#BA955C] text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    <svg className="w-3.5 h-3.5 fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>Map</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 10 Properties Stacked Cards */}
            <div className="space-y-5">
              {liveProperties.map((property) => {
                const currentImgIdx = imageIndices[property.id] || 0;
                const isFav = !!favorites[property.id];
                const detailHref = property.slug ? `/buy-detail?slug=${property.slug}` : '/buy-detail';

                return (
                  <div
                    key={property.id}
                    className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col md:flex-row items-stretch hover:shadow-md transition-shadow group"
                  >
                    {/* Left Side: Image Slider Container */}
                    <div className="relative md:w-[48%] lg:w-[46%] min-h-[250px] sm:min-h-[280px] bg-stone-100 overflow-hidden shrink-0">
                      <Image
                        src={property.images[currentImgIdx] || '/property-card.png'}
                        alt={property.title}
                        fill
                        className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />

                      {/* Image Navigation Arrows */}
                      <button
                        type="button"
                        onClick={(e) => handlePrevImage(property.id, property.images.length, e)}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-stone-700 flex items-center justify-center shadow-xs cursor-pointer transition-all opacity-0 group-hover:opacity-100"
                        title="Previous Image"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleNextImage(property.id, property.images.length, e)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-stone-700 flex items-center justify-center shadow-xs cursor-pointer transition-all opacity-0 group-hover:opacity-100"
                        title="Next Image"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>

                      {/* Bottom Badges on Image: Off-Plan Pill (Left) & Heart Button (Right) */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span
                          className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-medium tracking-wide pointer-events-auto"
                          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                        >
                          OFF-PLAN | Initial Sale
                        </span>

                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(property.id, e)}
                          className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 text-stone-700 hover:text-red-500 flex items-center justify-center shadow-sm cursor-pointer transition-colors pointer-events-auto"
                          title="Save Property"
                        >
                          <svg
                            className={`w-4 h-4 transition-colors ${
                              isFav ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'
                            }`}
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Right Side: Property Details & Actions */}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                      <div>
                        {/* Price & Signature Badge Row */}
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-poppins"
                            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                          >
                            {property.price}
                          </span>
                          <span
                            className="px-2.5 py-0.5 rounded bg-[#BAE6FD]/60 text-[#0284C7] font-semibold text-[10.5px] uppercase tracking-wider"
                            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                          >
                            SIGNATURE
                          </span>
                        </div>

                        {/* Specs Row */}
                        <div
                          className="flex items-center flex-wrap gap-2 text-xs sm:text-[13px] text-stone-600 font-medium mt-1.5"
                          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                        >
                          <span>{property.type}</span>
                          <span className="flex items-center gap-1">
                            {/* Bed Icon */}
                            <svg className="w-3.5 h-3.5 text-stone-400 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            {property.beds}
                          </span>
                          <span className="flex items-center gap-1">
                            {/* Bath Icon */}
                            <svg className="w-3.5 h-3.5 text-stone-400 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            {property.baths}
                          </span>
                          <span className="text-stone-300">|</span>
                          <span>Built-up: {property.builtUp}</span>
                          <span>Plot: {property.plot}</span>
                        </div>

                        {/* Title */}
                        <h3
                          className="text-sm sm:text-base font-bold text-stone-900 leading-snug mt-2"
                          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                        >
                          <Link href={detailHref} className="hover:text-[#BA955C] transition-colors">
                            {property.title}
                          </Link>
                        </h3>

                        {/* Location */}
                        <div
                          className="flex items-center gap-1 text-xs text-stone-500 mt-1"
                          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                        >
                          <svg className="w-3.5 h-3.5 text-stone-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          <span>{property.location}</span>
                        </div>

                        {/* Validation Note with Sparkle */}
                        <div
                          className="flex items-center gap-1.5 text-[11px] text-[#BA955C] italic mt-2"
                          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                        >
                          <svg className="w-3.5 h-3.5 text-[#BA955C] fill-[#BA955C]" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>Property authenticity was validated on {property.validationDate}</span>
                        </div>

                        {/* Handover & Payment Plan Badges */}
                        <div className="flex items-center gap-2.5 mt-3.5">
                          <div className="px-3 py-1.5 rounded-lg bg-[#F8F8F8] border border-stone-200/60 text-left">
                            <span className="text-[9.5px] uppercase tracking-wider text-stone-400 block font-semibold leading-tight">
                              HANDOVER
                            </span>
                            <span className="text-xs font-bold text-stone-800 block mt-0.5 leading-tight">
                              {property.handover}
                            </span>
                          </div>

                          <div className="px-3 py-1.5 rounded-lg bg-[#F8F8F8] border border-stone-200/60 text-left">
                            <span className="text-[9.5px] uppercase tracking-wider text-stone-400 block font-semibold leading-tight">
                              PAYMENT PLAN
                            </span>
                            <span className="text-xs font-bold text-stone-800 block mt-0.5 leading-tight">
                              {property.paymentPlan}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Buttons Row */}
                      <div className="pt-4 mt-2 flex items-center justify-between border-t border-stone-100 gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Email Button */}
                          <a
                            href="mailto:advisor@fs-properties.com?subject=Enquiry%20regarding%20R.%20Hills"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#BA955C] hover:bg-[#a6834d] text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            <span>Email</span>
                          </a>

                          {/* Call Button */}
                          <a
                            href="tel:+971500000000"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#BA955C] hover:bg-[#a6834d] text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            <span>Call</span>
                          </a>

                          {/* WhatsApp Icon Button */}
                          <button
                            type="button"
                            onClick={handleWhatsAppContact}
                            className="w-8 h-8 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                            title="Chat on WhatsApp"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.971.53 1.77.822 2.791.822 3.184 0 5.77-2.587 5.771-5.767.001-3.183-2.585-5.807-5.77-5.807zm3.374 8.212c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.12-.519-1.572-.65-2.581-2.239-2.66-2.344-.077-.105-.638-.85-.638-1.621 0-.771.404-1.15.548-1.306.144-.156.314-.195.42-.195.105 0 .21.002.302.007.098.005.23-.037.36.275.144.346.495 1.206.538 1.294.043.088.072.19.014.305-.058.115-.088.187-.175.289-.088.102-.185.228-.264.306-.089.088-.182.185-.078.363.104.178.463.764.993 1.237.684.61 1.26.799 1.439.887.179.088.283.073.389-.044.106-.117.452-.527.573-.708.121-.181.242-.151.406-.09.164.06 1.04.49 1.218.579.178.088.297.132.341.205.044.073.044.422-.1.827z" />
                              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.685 0-3.25-.502-4.568-1.365l-.328-.215-2.964.832.842-2.883-.217-.346A8.125 8.125 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
                            </svg>
                          </button>
                        </div>

                        {/* Developer Logo Mark */}
                        <div className="text-stone-300 font-serif italic text-lg tracking-wider select-none font-bold">
                          JR
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls: 1 2 3 4 5 ▶ + Total Properties Count */}
            <div className="flex items-center justify-between pt-4 pb-2 border-t border-stone-200/80">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[1, 2, 3, 4, 5].map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                      currentPage === pageNum
                        ? 'border border-[#BA955C] text-[#BA955C] bg-[#BA955C]/10 shadow-2xs'
                        : 'border border-stone-200/90 text-stone-600 hover:border-stone-400 bg-white'
                    }`}
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-stone-200/90 text-stone-600 hover:border-stone-400 bg-white flex items-center justify-center text-xs cursor-pointer transition-all"
                  title="Next Page"
                >
                  <span className="text-[10px]">▶</span>
                </button>
              </div>

              <span
                className="text-xs text-stone-400 font-medium"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                1 to {liveProperties.length} of {Math.max(liveProperties.length, 400)} Properties
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: 3 COLUMNS (Sidebar Widgets in Continuity)  */}
          {/* ======================================================== */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Widget 1: Contact Us (Black Background Card) */}
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
                {/* WhatsApp Logo */}
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.971.53 1.77.822 2.791.822 3.184 0 5.77-2.587 5.771-5.767.001-3.183-2.585-5.807-5.77-5.807zm3.374 8.212c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.12-.519-1.572-.65-2.581-2.239-2.66-2.344-.077-.105-.638-.85-.638-1.621 0-.771.404-1.15.548-1.306.144-.156.314-.195.42-.195.105 0 .21.002.302.007.098.005.23-.037.36.275.144.346.495 1.206.538 1.294.043.088.072.19.014.305-.058.115-.088.187-.175.289-.088.102-.185.228-.264.306-.089.088-.182.185-.078.363.104.178.463.764.993 1.237.684.61 1.26.799 1.439.887.179.088.283.073.389-.044.106-.117.452-.527.573-.708.121-.181.242-.151.406-.09.164.06 1.04.49 1.218.579.178.088.297.132.341.205.044.073.044.422-.1.827z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.685 0-3.25-.502-4.568-1.365l-.328-.215-2.964.832.842-2.883-.217-.346A8.125 8.125 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
                </svg>
              </button>
            </div>

            {/* Widget 2: R. Hills Brochure (White Card with Image + Download) */}
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

            {/* Widget 3: Explore Top Agents In R. Hills (TruBroker™) */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-sm space-y-4">
              {/* Header: TruBroker Badge + Title */}
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
                      {/* Avatar */}
                      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border border-stone-100 bg-stone-100">
                        <Image
                          src={agent.image}
                          alt={agent.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>

                      {/* Name & Agency */}
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

                    {/* Chevron Icon */}
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
                {/* Header Row */}
                <div className="bg-[#BA955C] px-4 py-2.5 text-white flex items-center justify-between text-xs font-bold">
                  <span>Price</span>
                  <span>Location</span>
                </div>

                {/* Rows */}
                <div className="divide-y divide-stone-100">
                  {/* Row 1 */}
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

                  {/* Row 2 */}
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

                  {/* Row 3 */}
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

                {/* View More Button */}
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
                {/* Bell Icon */}
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span>GET NEW LISTING ALERTS</span>
              </button>
            </div>

            {/* Widget 7: Quick Searches & Nearby Links */}
            <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm">
              {/* Recommended searches */}
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

              {/* NEAR R. HILLS */}
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

              {/* INVEST IN OFF PLAN */}
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
              {/* Collage Header: Left Large Photo + Right 2 Stacked Photos */}
              <div className="grid grid-cols-12 h-44 sm:h-48 gap-1 bg-stone-100 p-1">
                {/* Left Exterior */}
                <div className="relative col-span-8 h-full rounded-l-xl overflow-hidden">
                  <Image
                    src="/rhills-collage-1.png"
                    alt="R. Hills Exterior"
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>

                {/* Right Stacked Interiors */}
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

              {/* Card Body */}
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

                {/* Specs Rows */}
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

        {/* ======================================================== */}
        {/* FULL-WIDTH CONTINUATION: About R. Hills & Properties to explore */}
        {/* ======================================================== */}
        <div className="mt-14 sm:mt-16 space-y-10 sm:space-y-12">
          
          {/* 1. About R. Hills */}
          {aboutHtml ? (
            <div
              className="space-y-3.5 max-w-5xl text-xs sm:text-[13px] text-[#878787] leading-relaxed [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-bold [&>h2]:text-[#6D6D6D] [&>h3]:text-lg [&>h3]:sm:text-xl [&>h3]:font-semibold [&>h3]:text-[#6D6D6D] [&>h4]:text-base [&>h4]:font-semibold [&>h4]:text-[#6D6D6D] [&_strong]:text-[#444] [&>ul]:list-disc [&>ul]:pl-5 [&>p]:my-2"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: aboutHtml }}
            />
          ) : (
            <div className="space-y-3.5 max-w-5xl">
              <h3
                className="text-lg sm:text-xl font-semibold text-[#6D6D6D] tracking-tight"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                About R. Hills
              </h3>
              
              <div
                className="space-y-3.5 text-xs sm:text-[13px] text-[#878787] leading-relaxed"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                <p>
                  Reportage Hills is a premium townhouse community in Dubailand, situated close to Sheikh Zayed Bin Hamdan Al Nahyan Street (D54). The development will feature meticulously designed 3 to 5-bedroom townhouses with high-end finishes and thoughtful layouts. Each residence will boast double-glazed windows, private balconies and built-in wardrobes.
                </p>
                
                {isAboutExpanded && (
                  <p>
                    The family-friendly community will be equipped with exceptional amenities including a swimming pool, gym, kids&apos; play areas and landscaped community spaces. Strategically located, Reportage Hills ensures easy access to key destinations such as Dubai Sports City, Global Village and Al Maktoum International Airport. Its unparalleled connectivity and lifestyle-focused offerings make it an excellent choice for families.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#BA955C] hover:text-[#a6834d] transition-colors cursor-pointer pt-1"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                <span>{isAboutExpanded ? 'Read Less' : 'Read More'}</span>
                <span>{isAboutExpanded ? '▲' : '▼'}</span>
              </button>
            </div>
          )}


          {/* 2. Properties to Explore Full-Width Container */}
          <div
            className="w-full rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#9F9F9F]/30"
            style={{
              backgroundColor: 'rgba(159, 159, 159, 0.12)',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Column 1: Title */}
              <div className="md:col-span-3 pr-0 md:pr-4 md:border-r border-[#9F9F9F]/25 h-full">
                <h3
                  className="text-2xl sm:text-3xl font-semibold text-[#6D6D6D] leading-tight"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  Properties<br />to explore
                </h3>
              </div>

              {/* Column 2: Rent */}
              <div className="md:col-span-2 px-0 md:px-4 md:border-r border-[#9F9F9F]/25 h-full space-y-3">
                <h4
                  className="text-base font-semibold text-[#6D6D6D]"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  Rent
                </h4>
                <div
                  className="space-y-2 text-xs sm:text-[13px] text-[#878787]"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <p className="hover:text-stone-900 transition-colors cursor-pointer">
                    Properties for rent in UAE
                  </p>
                </div>
              </div>

              {/* Column 3: Off-plan */}
              <div className="md:col-span-4 px-0 md:px-4 md:border-r border-[#9F9F9F]/25 h-full space-y-3">
                <h4
                  className="text-base font-semibold text-[#6D6D6D]"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  Off-plan
                </h4>
                <div
                  className="space-y-2.5 text-xs sm:text-[13px] text-[#878787]"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <p className="hover:text-stone-900 transition-colors cursor-pointer">
                    New projects in Dubai
                  </p>
                  <p className="hover:text-stone-900 transition-colors cursor-pointer">
                    New projects in Abu Dhabi
                  </p>
                  <p className="hover:text-stone-900 transition-colors cursor-pointer">
                    New projects in Sharjah
                  </p>
                  <p className="hover:text-stone-900 transition-colors cursor-pointer">
                    New projects in Ras Al Khaimah
                  </p>
                  <p className="hover:text-stone-900 transition-colors cursor-pointer">
                    New projects in Ajman
                  </p>
                </div>
              </div>

              {/* Column 4: More */}
              <div className="md:col-span-3 pl-0 md:pl-4 space-y-3">
                <h4
                  className="text-base font-semibold text-[#6D6D6D]"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  More
                </h4>
                <div
                  className="space-y-2.5 text-xs sm:text-[13px] text-[#878787]"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <p className="hover:text-stone-900 transition-colors cursor-pointer">Semi-detached</p>
                  <p className="hover:text-stone-900 transition-colors cursor-pointer">Brand new</p>
                  <p className="hover:text-stone-900 transition-colors cursor-pointer">Independent</p>
                  <p className="hover:text-stone-900 transition-colors cursor-pointer">Freehold</p>
                  <p className="hover:text-stone-900 transition-colors cursor-pointer">Standalone</p>
                  <p className="hover:text-stone-900 transition-colors cursor-pointer">Distressed</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
