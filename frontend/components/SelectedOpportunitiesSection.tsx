'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface CommunityProjectOpportunity {
  id?: string | number;
  badge?: 'READY' | 'OFF-PLAN' | string;
  tagline?: string;
  headingLine1?: string;
  headingLine2?: string;
  title?: string;
  slug?: string;
  price?: string;
  startingPrice?: string;
  href?: string;
  link?: string;
  imageUrl?: string;
  image?: string;
  developer?: string;
  plan?: string;
  handover?: string;
}

const opportunitiesData: CommunityProjectOpportunity[] = [
  // Row 1
  {
    badge: 'OFF-PLAN',
    tagline: 'CREEK HARBOUR',
    headingLine1: 'CREEKSIDE',
    headingLine2: 'RESIDENCES',
    price: 'Sample from AED 1.65M',
    href: '/project-detail',
  },
  {
    badge: 'READY',
    tagline: 'DUBAI HILLS',
    headingLine1: 'PARKSIDE',
    headingLine2: 'VILLAS',
    price: 'Sample from AED 5.2M',
    href: '/property-detail',
  },
  {
    badge: 'OFF-PLAN',
    tagline: 'BUSINESS BAY',
    headingLine1: 'CANAL',
    headingLine2: 'HOUSE',
    price: 'Sample from AED 2.1M',
    href: '/project-detail',
  },
  {
    badge: 'OFF-PLAN',
    tagline: 'CREEK HARBOUR',
    headingLine1: 'CREEKSIDE',
    headingLine2: 'RESIDENCES',
    price: 'Sample from AED 1.65M',
    href: '/project-detail',
  },

  // Row 2
  {
    badge: 'READY',
    tagline: 'DOWNTOWN DUBAI',
    headingLine1: 'OPERA',
    headingLine2: 'DISTRICT SUITES',
    price: 'Sample from AED 3.4M',
    href: '/project-detail',
  },
  {
    badge: 'OFF-PLAN',
    tagline: 'PALM JUMEIRAH',
    headingLine1: 'SEAFRONT',
    headingLine2: 'MANSIONS',
    price: 'Sample from AED 18.5M',
    href: '/property-detail',
  },
  {
    badge: 'READY',
    tagline: 'THE VALLEY',
    headingLine1: 'FARM',
    headingLine2: 'GARDENS II',
    price: 'Sample from AED 4.1M',
    href: '/the-valley',
  },
  {
    badge: 'OFF-PLAN',
    tagline: 'EMAAR SOUTH',
    headingLine1: 'GREENVILLE',
    headingLine2: 'TOWNS',
    price: 'Sample from AED 2.8M',
    href: '/project-detail',
  },

  // Row 3
  {
    badge: 'OFF-PLAN',
    tagline: 'TILAL AL GHAF',
    headingLine1: 'HARMONY',
    headingLine2: 'RESIDENCES',
    price: 'Sample from AED 4.6M',
    href: '/project-detail',
  },
  {
    badge: 'READY',
    tagline: 'DUBAI MARINA',
    headingLine1: 'HARBOUR GATE',
    headingLine2: 'TOWERS',
    price: 'Sample from AED 2.9M',
    href: '/property-detail',
  },
  {
    badge: 'OFF-PLAN',
    tagline: 'DAMAC LAGOONS',
    headingLine1: 'MEDITERRANEAN',
    headingLine2: 'VILLAS',
    price: 'Sample from AED 3.2M',
    href: '/project-detail',
  },
  {
    badge: 'READY',
    tagline: 'THE OASIS',
    headingLine1: 'PALMERA',
    headingLine2: 'ESTATES',
    price: 'Sample from AED 8.9M',
    href: '/project-detail',
  },
];

interface SelectedOpportunitiesSectionProps {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  title?: string;
  items?: CommunityProjectOpportunity[];
}

export default function SelectedOpportunitiesSection({
  eyebrow = 'Projects here',
  headingLine1 = 'SELECTED OPPORTUNITIES',
  headingLine2 = 'IN THE COMMUNITY',
  title,
  items,
}: SelectedOpportunitiesSectionProps) {
  const displayItems = items && items.length > 0 ? items : opportunitiesData;

  // Split title if passed as a single string
  let finalH1 = headingLine1;
  let finalH2 = headingLine2;
  if (title) {
    if (title.includes('\n')) {
      const parts = title.split('\n');
      finalH1 = parts[0];
      finalH2 = parts.slice(1).join(' ');
    } else {
      finalH1 = title;
      finalH2 = '';
    }
  }

  return (
    <section className="w-full bg-[#FAF9F6] py-14 sm:py-20 lg:py-24 border-b border-[#E5E0D8]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="space-y-2 sm:space-y-3">
          {/* Eyebrow: Projects here */}
          <span
            className="text-xs sm:text-[13.5px] font-medium text-[#171717] tracking-normal block"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            {eyebrow}
          </span>

          {/* Section Heading: Cinzel Medium (font-medium, weight 500) */}
          <h2
            className="text-2xl sm:text-4xl lg:text-[44px] uppercase tracking-[0.03em] leading-[1.18]"
            style={{
              fontFamily: 'var(--font-cinzel), Cinzel, serif',
              fontWeight: 500,
            }}
          >
            <span className="block text-[#1B2538]">{finalH1}</span>
            {finalH2 && (
              <span className="block text-[#C2A468] mt-1 sm:mt-1.5">{finalH2}</span>
            )}
          </h2>
        </div>

        {/* 4 Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayItems.map((item, idx) => {
            const badge = (item.badge || 'OFF-PLAN').toUpperCase();
            const tagline = item.tagline || item.developer?.toUpperCase() || 'DUBAI';
            const price = item.price || item.startingPrice || 'Price on request';
            const itemSlug = item.slug || item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const linkHref =
              item.href && item.href !== '/project-detail'
                ? item.href
                : item.link && item.link !== '/project-detail'
                ? item.link
                : itemSlug
                ? `/project-detail?slug=${itemSlug}`
                : '/project-detail';
            const img = item.imageUrl || item.image;

            return (
              <Link
                key={item.id ? String(item.id) : `opp-${idx}`}
                href={linkHref}
                className="group flex flex-col justify-between h-[322px] rounded-2xl bg-white border border-[#E8E4DD] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Top Card Area */}
                <div className="relative flex-1 bg-gradient-to-br from-[#F5F2EB] via-[#ECE7DD] to-[#E3DDCF] p-4 flex items-start justify-between overflow-hidden">
                  {/* Subtle luxury ambient pattern overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#C2A468_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

                  {/* If card has image, render image */}
                  {img && (
                    <div className="absolute inset-0">
                      <Image
                        src={img}
                        alt={item.title || item.headingLine1 || 'Project'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Badge: READY or OFF-PLAN */}
                  <span
                    className={`relative z-10 px-3.5 py-1 rounded-full text-[10.5px] uppercase tracking-wider ${
                      badge === 'READY'
                        ? 'bg-[#5B8FB9] text-white'
                        : 'bg-[#FAF8F5]/90 text-[#4A4A4A] backdrop-blur-sm border border-black/5 shadow-2xs'
                    }`}
                    style={{
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      fontWeight: 600,
                    }}
                  >
                    {badge}
                  </span>
                </div>

                {/* Bottom Details Content Area */}
                <div className="p-4 sm:p-5 flex flex-col justify-between bg-white border-t border-[#F0ECE4]">
                  {/* Tagline of Card: Poppins Medium */}
                  <span
                    className="text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-[#8C8C8C] block truncate"
                    style={{
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    {tagline}
                  </span>

                  {/* Heading of Card: Cinzel Bold */}
                  <h3
                    className="text-sm sm:text-[15px] uppercase tracking-wider text-[#171717] group-hover:text-[#C2A468] transition-colors leading-tight mt-1.5 line-clamp-2 min-h-[38px] flex flex-col justify-center"
                    style={{
                      fontFamily: 'var(--font-cinzel), Cinzel, serif',
                      fontWeight: 700,
                    }}
                  >
                    {item.headingLine1 ? (
                      <>
                        <span className="block">{item.headingLine1}</span>
                        {item.headingLine2 && (
                          <span className="block">{item.headingLine2}</span>
                        )}
                      </>
                    ) : (
                      <span className="block">{item.title || 'Project Launch'}</span>
                    )}
                  </h3>

                  {/* Price Line: Poppins Regular + Arrow Icon */}
                  <div className="mt-3.5 pt-2.5 border-t border-[#F5F3EE] flex items-center justify-between text-[#8A8A8A]">
                    <span
                      className="text-[11px] sm:text-[11.5px] font-semibold text-[#171717]"
                      style={{
                        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      }}
                    >
                      {price}
                    </span>

                    {/* Diagonal Arrow Icon ↗ */}
                    <svg
                      className="w-3.5 h-3.5 text-[#A58852] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
