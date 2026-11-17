'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface DeveloperProjectCardData {
  id: string;
  isFeatured?: boolean;
  developerBadge?: string;
  developerCategory?: string;
  title: string;
  location: string;
  plan: string;
  handover: string;
  price: string;
  imageUrl: string;
  link?: string;
}

const baseCards: Omit<DeveloperProjectCardData, 'id'>[] = [
  // Card 1
  {
    isFeatured: true,
    developerBadge: 'EMAAR',
    developerCategory: 'FEATURED DEVELOPER',
    title: 'DAMAC ISLAND 2',
    location: 'Dubai, Dubai',
    plan: '30/70',
    handover: 'Q1 2030',
    price: 'AED 3,550,000',
    imageUrl: '/developers/damac-island-2.png',
    link: '/project-detail',
  },
  // Card 2
  {
    isFeatured: true,
    developerBadge: 'EMAAR',
    developerCategory: 'FEATURED DEVELOPER',
    title: '"DAMAC ISLANDS - HAWAII"',
    location: 'Dubai, Dubai',
    plan: '70/30',
    handover: 'Q2 2029',
    price: 'AED 2,490,000',
    imageUrl: '/developers/damac-hawaii.png',
    link: '/project-detail',
  },
  // Card 3
  {
    isFeatured: true,
    developerBadge: 'EMAAR',
    developerCategory: 'FEATURED DEVELOPER',
    title: '"DAMAC DISTRICT" NEW LAUNCH',
    location: 'Dubai, Dubai',
    plan: '40/60',
    handover: 'Update soon',
    price: 'AED 780,000',
    imageUrl: '/developers/damac-district.png',
    link: '/project-detail',
  },
  // Card 4
  {
    isFeatured: true,
    developerBadge: 'EMAAR',
    developerCategory: 'FEATURED DEVELOPER',
    title: 'EMAAR "CREEK CRESCENT"',
    location: 'Dubai, Dubai',
    plan: 'Flexible',
    handover: 'Q2 2027',
    price: 'AED 1,750,000',
    imageUrl: '/developers/emaar-creek-crescent.png',
    link: '/project-detail',
  },
  // Card 5
  {
    isFeatured: true,
    developerBadge: 'EMAAR',
    developerCategory: 'FEATURED DEVELOPER',
    title: 'DAMAC ISLAND 2',
    location: 'Dubai, Dubai',
    plan: '70/30',
    handover: 'Q4 2029',
    price: 'AED 2,700,000',
    imageUrl: '/developers/damac-island-lagoon.png',
    link: '/project-detail',
  },
  // Card 6
  {
    isFeatured: true,
    developerBadge: 'EMAAR',
    developerCategory: 'FEATURED DEVELOPER',
    title: 'EMAAR "RAYA"',
    location: 'Dubai, Dubai',
    plan: 'Flexible',
    handover: 'On request',
    price: 'AED 2,670,000',
    imageUrl: '/developers/emaar-raya.png',
    link: '/project-detail',
  },
  // Card 7
  {
    isFeatured: true,
    developerBadge: 'EMAAR',
    developerCategory: 'FEATURED DEVELOPER',
    title: 'DAMAC ISLAND 2',
    location: 'Dubai, Dubai',
    plan: '70/30',
    handover: 'Q4 2029',
    price: 'AED 2,700,000',
    imageUrl: '/developers/damac-island-lagoon.png',
    link: '/project-detail',
  },
  // Card 8
  {
    isFeatured: true,
    developerBadge: 'EMAAR',
    developerCategory: 'FEATURED DEVELOPER',
    title: 'EMAAR "RAYA"',
    location: 'Dubai, Dubai',
    plan: 'Flexible',
    handover: 'On request',
    price: 'AED 2,670,000',
    imageUrl: '/developers/emaar-raya.png',
    link: '/project-detail',
  },
];

// Repeat to create exactly 16 cards (8 + 8)
const allCards: DeveloperProjectCardData[] = [...baseCards, ...baseCards].map((c, idx) => ({
  ...c,
  id: `dev-card-${idx + 1}`,
}));

interface DeveloperProjectsSectionProps {
  headingLine?: string;
  developerName?: string;
  projects?: Array<{
    id?: string | number;
    title: string;
    type?: string;
    developer?: string;
    badge?: string;
    tagline?: string;
    price?: string;
    plan?: string;
    handover?: string;
    imageUrl?: string;
    href?: string;
    link?: string;
  }>;
}

export default function DeveloperProjectsSection({
  headingLine,
  developerName = 'Emaar',
  projects,
}: DeveloperProjectsSectionProps) {
  const [favorites, setFavorites] = useState<{ [id: string]: boolean }>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // If projects are provided from CMS, format them into DeveloperProjectCardData
  const displayCards: DeveloperProjectCardData[] =
    Array.isArray(projects) && projects.length > 0
      ? projects.map((p, idx) => ({
          id: String(p.id || `cms-dev-card-${idx}`),
          isFeatured: true,
          developerBadge: (p.developer || developerName || 'DEVELOPER').toUpperCase(),
          developerCategory: `${(p.type || 'OFF-PLAN').toUpperCase()} RESIDENCES`,
          title: p.title,
          location: p.tagline ? `${p.tagline}, Dubai` : 'Dubai, UAE',
          plan: p.plan || 'Flexible',
          handover: p.handover || 'Update soon',
          price: p.price || 'Price on request',
          imageUrl:
            p.imageUrl ||
            (idx % 4 === 0
              ? '/developers/damac-island-2.png'
              : idx % 4 === 1
              ? '/developers/damac-hawaii.png'
              : idx % 4 === 2
              ? '/developers/damac-district.png'
              : '/developers/emaar-creek-crescent.png'),
          link:
            p.href && p.href !== '/project-detail'
              ? p.href
              : p.link && p.link !== '/project-detail'
              ? p.link
              : `/project-detail?slug=${((p as any).slug || p.title || 'project-detail').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`,
        }))
      : allCards;

  return (
    <section className="w-full bg-[#FAF9F6] py-10 sm:py-14 border-b border-[#E5E0D8]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2.5">
            <span
              className="text-xs sm:text-sm tracking-widest text-[#BFA16A] uppercase font-medium"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              02
            </span>
            <span
              className="text-sm sm:text-base font-medium tracking-wide text-[#858585]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              {headingLine || `On The Register, ${developerName}`}
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-[#E5E0D8]" />
        </div>

        {/* Cards Grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayCards.map((card) => {
            const isFav = !!favorites[card.id];
            return (
              <div
                key={card.id}
                className="relative rounded-2xl overflow-hidden min-h-[460px] sm:min-h-[490px] flex flex-col justify-between p-5 shadow-md hover:shadow-xl transition-all duration-300 group"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                {/* Background Image with smooth zoom on hover */}
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  priority={parseInt(card.id.split('-')[2]) <= 4}
                />

                {/* Gradient Overlays: Top subtle dark & Bottom strong dark for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-[1] pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent z-[1] pointer-events-none" />

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="px-3 py-1 rounded-md bg-white text-[10px] font-bold text-[#1A1A1A] tracking-wider uppercase shadow-xs">
                    FEATURED
                  </span>

                  <span className="px-3 py-1 rounded-md bg-white text-[10px] font-bold text-[#1A1A1A] tracking-wider uppercase shadow-xs">
                    {card.developerBadge}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 mt-auto pt-6">
                  {/* Category */}
                  <span className="block text-[10px] font-bold text-white/80 tracking-widest uppercase mb-1">
                    {card.developerCategory}
                  </span>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide leading-tight line-clamp-1">
                    {card.title}
                  </h3>

                  {/* Location with bullet */}
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
                    <span>{card.location}</span>
                  </div>

                  {/* Horizontal Divider */}
                  <div className="border-t border-white/20 my-3" />

                  {/* 3 Metric Columns: Plan, Handover, From */}
                  <div className="grid grid-cols-3 gap-2 text-white">
                    <div>
                      <p className="text-[10px] text-white/70 font-medium">Plan</p>
                      <p className="text-xs sm:text-sm font-bold tracking-tight mt-0.5">{card.plan}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/70 font-medium">Handover</p>
                      <p className="text-xs sm:text-sm font-bold tracking-tight mt-0.5 truncate">{card.handover}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/70 font-medium">From</p>
                      <p className="text-xs sm:text-sm font-bold tracking-tight mt-0.5 truncate">{card.price}</p>
                    </div>
                  </div>

                  {/* Horizontal Divider */}
                  <div className="border-t border-white/20 my-3" />

                  {/* Bottom Action Button & Wishlist Heart */}
                  <div className="relative flex items-center">
                    <Link
                      href={card.link || '#'}
                      className="w-full bg-white hover:bg-[#FAF9F6] active:scale-[0.99] text-[#1A1A1A] hover:text-[#BFA16A] font-semibold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center transition-all duration-200 shadow-xs"
                    >
                      <span>View Project</span>
                    </Link>

                    {/* Wishlist Heart Icon */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(card.id);
                      }}
                      aria-label="Save to favorites"
                      className="absolute right-3 p-1 text-[#888888] hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <svg
                        className={`w-3.5 h-3.5 transition-colors ${
                          isFav ? 'fill-red-500 text-red-500' : 'fill-none stroke-current stroke-2'
                        }`}
                        viewBox="0 0 24 24"
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
              </div>
            );
          })}
        </div>

        {/* Bottom Section: Comparison text & Load More Projects Button */}
        <div className="mt-12 sm:mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Comparison line: Poppins Regular & Poppins Extra Light in #858585 */}
          <p
            className="text-xs sm:text-sm text-[#858585] tracking-wide"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            <span className="font-normal text-[#525252]">Compare Emaar With: </span>
            <span className="font-extralight text-[#858585]">
              Aldar Properties, Binghatti, Damac Properties, Sobha Realty
            </span>
          </p>

          {/* Load More Projects Button */}
          <button
            type="button"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#BFA16A] hover:bg-[#b0935d] active:scale-[0.98] text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap self-end md:self-auto"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            Load more projects
          </button>
        </div>
      </div>
    </section>
  );
}
