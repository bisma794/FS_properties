'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RecommendedProject {
  id: string;
  badge: string;
  location: string;
  title: string;
  price: string;
  imageUrl: string;
  href?: string;
}

const recommendedProjects: RecommendedProject[] = [
  {
    id: 'golf-fields',
    badge: 'OFF-PLAN',
    location: 'EMAAR SOUTH, DUBAI',
    title: 'Golf Fields by Emaar',
    price: 'AED 100,000',
    imageUrl: '/similar-golf-fields.png',
    href: '/project-detail',
  },
  {
    id: 'terra-heights',
    badge: 'OFF-PLAN',
    location: 'EMAAR SOUTH, DUBAI',
    title: 'Terra Heights by Emaar at Emaar South',
    price: 'On Request',
    imageUrl: '/similar-terra-heights.png',
    href: '/project-detail',
  },
  {
    id: 'greenville-2',
    badge: 'OFF-PLAN',
    location: 'EMAAR SOUTH, DUBAI',
    title: 'Greenville 2 at Emaar South, Dubai',
    price: 'On Request',
    imageUrl: '/similar-greenville.png',
    href: '/project-detail',
  },
  {
    id: 'golf-edge',
    badge: 'NEW LAUNCH',
    location: 'EMAAR SOUTH, DUBAI',
    title: 'Golf Edge at Emaar South, Dubai',
    price: 'On Request',
    imageUrl: '/similar-golf-edge.png',
    href: '/project-detail',
  },
];

interface BuyDetailRecommendedSectionProps {
  slug?: string;
  recommendedData?: Record<string, any>;
}

export default function BuyDetailRecommendedSection({
  slug = 'buy-detail',
  recommendedData,
}: BuyDetailRecommendedSectionProps = {}) {
  const [favorites, setFavorites] = useState<{ [id: string]: boolean }>({});
  const [liveRec, setLiveRec] = useState<Record<string, any>>(recommendedData || {});

  useEffect(() => {
    setLiveRec(recommendedData || {});
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
            const recSec = parsed?.content?.customSections?.['buy-detail-recommended'];
            if (recSec) {
              setLiveRec(recSec);
              break;
            }
          }
        }
      }
    } catch (_) {}
  }, [slug, recommendedData]);

  const rawItems: any[] = Array.isArray(liveRec?.items) ? liveRec.items : [];
  const isLegacyPlaceholder =
    rawItems.length > 0 && String(rawItems[0]?.title || '').includes('Renovated Entertainment Foyer');

  const displayProjects: RecommendedProject[] =
    rawItems.length > 0 && !isLegacyPlaceholder
      ? rawItems.map((item, idx) => ({
          id: String(item.id || idx),
          badge: item.badge || 'OFF-PLAN',
          location: (item.location || item.tagline || 'DUBAI').toUpperCase(),
          title: item.title || 'Featured Project',
          price: item.price || 'On Request',
          imageUrl: item.imageUrl || item.image || '/similar-golf-fields.png',
          href: item.href || '/project-detail',
        }))
      : recommendedProjects;

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCall = (title: string) => {
    window.location.href = 'tel:+971500000000';
  };

  const handleWhatsApp = (title: string) => {
    window.open(
      `https://wa.me/971500000000?text=Hello%20FS%20Advisory%2C%20I%20am%20interested%20in%20${encodeURIComponent(
        title
      )}.`,
      '_blank'
    );
  };

  return (
    <section className="w-full bg-[#FAF9F6] py-10 sm:py-14 border-t border-stone-200/90">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8">
          <h2
            className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-poppins"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            {liveRec?.heading || liveRec?.title || 'Recommended for you'}
          </h2>
        </div>

        {/* Full-Width Equal Alignment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full">
          {displayProjects.map((project) => {
            const isFav = !!favorites[project.id];

            return (
              <div
                key={project.id}
                className="relative w-full h-[350px] sm:h-[370px] rounded-2xl overflow-hidden shadow-sm group flex flex-col justify-between p-4 sm:p-5 select-none"
              >
                {/* Background Image */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out z-0"
                />

                {/* Dark Gradient Overlay for optimal readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-[1] pointer-events-none" />

                {/* Top Row: Badge & Wishlist Button */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="px-2 py-0.5 rounded-md bg-white text-[9.5px] font-bold text-stone-900 tracking-wider uppercase shadow-xs">
                    {project.badge}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(project.id);
                    }}
                    className="w-6 h-6 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                    aria-label="Add to wishlist"
                  >
                    <svg
                      className={`w-3.5 h-3.5 transition-colors ${
                        isFav ? 'fill-rose-500 text-rose-500' : 'fill-none stroke-current stroke-2'
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

                {/* Bottom Content Area: Location, Title, Price, Actions */}
                <div className="relative z-10 mt-auto space-y-2">
                  <div>
                    <span className="block text-[9.5px] font-semibold text-white/75 tracking-wider uppercase">
                      {project.location}
                    </span>
                    <Link
                      href={project.href || '/project-detail'}
                      className="block text-xs sm:text-[13px] font-bold text-white hover:text-[#BA955C] leading-snug line-clamp-2 mt-0.5 transition-colors"
                      title={project.title}
                    >
                      {project.title}
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/20 pt-1">
                    <span className="block text-[9px] text-white/70 font-medium">
                      Starting From
                    </span>
                    <span className="block text-xs sm:text-[13px] font-bold text-white mt-0.5">
                      {project.price}
                    </span>
                  </div>

                  {/* Action Buttons: Call & WhatsApp */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {/* Call Button */}
                    <button
                      type="button"
                      onClick={() => handleCall(project.title)}
                      className="py-1.5 px-2 rounded-lg bg-[#BA955C] hover:bg-[#a6834d] text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors shadow-2xs cursor-pointer"
                    >
                      <svg className="w-3 h-3 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.28-.28.36-.67.25-1.02A11.36 11.36 0 019 5.25c0-.55-.45-1-1-1H4.5c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.87c0-.55-.45-1-1-1z" />
                      </svg>
                      <span>Call</span>
                    </button>

                    {/* WhatsApp Button */}
                    <button
                      type="button"
                      onClick={() => handleWhatsApp(project.title)}
                      className="py-1.5 px-2 rounded-lg bg-[#22C55E] hover:bg-[#16a34a] text-white text-[11px] font-semibold flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                      title="Chat on WhatsApp"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.971.53 1.77.822 2.791.822 3.184 0 5.77-2.587 5.771-5.767.001-3.183-2.585-5.807-5.77-5.807zm3.374 8.212c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.12-.519-1.572-.65-2.581-2.239-2.66-2.344-.077-.105-.638-.85-.638-1.621 0-.771.404-1.15.548-1.306.144-.156.314-.195.42-.195.105 0 .21.002.302.007.098.005.23-.037.36.275.144.346.495 1.206.538 1.294.043.088.072.19.014.305-.058.115-.088.187-.175.289-.088.102-.185.228-.264.306-.089.088-.182.185-.078.363.104.178.463.764.993 1.237.684.61 1.26.799 1.439.887.179.088.283.073.389-.044.106-.117.452-.527.573-.708.121-.181.242-.151.406-.09.164.06 1.04.49 1.218.579.178.088.297.132.341.205.044.073.044.422-.1.827z" />
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.685 0-3.25-.502-4.568-1.365l-.328-.215-2.964.832.842-2.883-.217-.346A8.125 8.125 0 013.833 12c0-4.503 3.664-8.167 8.167-8.167 4.503 0 8.167 3.664 8.167 8.167 0 4.503-3.664 8.167-8.167 8.167z" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

