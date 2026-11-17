'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SimilarProject {
  id: string;
  badge: 'OFF-PLAN' | 'NEW LAUNCH';
  location: string;
  title: string;
  startingPrice: string;
  imageSrc: string;
  href: string;
  isFeatured?: boolean;
}

const similarProjects: SimilarProject[] = [
  {
    id: 'golf-fields',
    badge: 'OFF-PLAN',
    location: 'EMAAR SOUTH, DUBAI',
    title: 'Golf Fields by Emaar',
    startingPrice: 'AED 100,000',
    imageSrc: '/Rectangle 34624629.png',
    href: '/project-detail?slug=golf-fields-by-emaar',
    isFeatured: true,
  },
  {
    id: 'terra-heights',
    badge: 'OFF-PLAN',
    location: 'EMAAR SOUTH, DUBAI',
    title: 'Terra Heights by Emaar at Emaar South',
    startingPrice: 'On Request',
    imageSrc: '/Rectangle 34624721-4.png',
    href: '/project-detail?slug=terra-heights-by-emaar',
  },
  {
    id: 'greenville-2',
    badge: 'OFF-PLAN',
    location: 'EMAAR SOUTH, DUBAI',
    title: 'Greenville 2 at Emaar South, Dubai',
    startingPrice: 'On Request',
    imageSrc: '/Rectangle 34625264.png',
    href: '/project-detail?slug=greenville-2-emaar-south',
  },
  {
    id: 'golf-edge',
    badge: 'NEW LAUNCH',
    location: 'EMAAR SOUTH, DUBAI',
    title: 'Golf Edge at Emaar South, Dubai',
    startingPrice: 'On Request',
    imageSrc: '/Rectangle 34625528-1.png',
    href: '/project-detail?slug=golf-edge-emaar-south',
  },
];

interface SimilarProjectsSectionProps {
  className?: string;
}

export default function SimilarProjectsSection({ className = '' }: SimilarProjectsSectionProps) {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className={`w-full pt-8 sm:pt-10 ${className}`}>
      {/* Header with Squircle Property Icon */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#BA955C] text-white flex items-center justify-center shrink-0 shadow-xs">
          {/* Architecture / Property Tower SVG Icon */}
          <svg
            className="w-5 h-5 fill-none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
            />
          </svg>
        </div>
        <h2
          className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight font-poppins"
          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
        >
          Similar Projects
        </h2>
      </div>

      {/* 4 Cards Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {similarProjects.map((project) => {
          const isFav = !!favorites[project.id];

          return (
            <div
              key={project.id}
              className={`relative rounded-[22px] sm:rounded-[26px] overflow-hidden bg-stone-900 group shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 aspect-[3/4.4] min-h-[440px] flex flex-col justify-between p-4 sm:p-5 ${
                project.isFeatured
                  ? 'ring-2 ring-[#3B82F6]'
                  : 'border border-stone-200/50'
              }`}
            >
              {/* Background Image */}
              <Image
                src={project.imageSrc}
                alt={project.title}
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 pointer-events-none" />

              {/* Top Row: Badge + Heart Favorite Button */}
              <div className="relative z-10 flex items-center justify-between w-full">
                {/* Status Pill Badge */}
                <span
                  className="px-3 py-1 rounded-full bg-white/95 text-stone-900 text-[10px] font-bold tracking-wider uppercase shadow-xs"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  {project.badge}
                </span>

                {/* Heart Button */}
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(project.id, e)}
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-red-500 flex items-center justify-center shadow-xs transition-all cursor-pointer backdrop-blur-xs"
                  title="Save to favorites"
                  aria-label="Save to favorites"
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

              {/* Bottom Content Area */}
              <div className="relative z-10 w-full text-white pt-10">
                {/* Location Eyebrow */}
                <span
                  className="text-[10px] sm:text-[10.5px] font-semibold text-stone-300 uppercase tracking-[0.16em] block"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  {project.location}
                </span>

                {/* Project Title */}
                <h3
                  className="text-base sm:text-[17px] font-bold text-white font-poppins leading-snug mt-1 min-h-[44px] flex items-center"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {project.title}
                </h3>

                {/* Divider Line */}
                <div className="w-full border-t border-white/20 my-3" />

                {/* Starting Price Block */}
                <div>
                  <span
                    className="text-[10.5px] text-stone-300 font-normal block leading-tight"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    Starting From
                  </span>
                  <span
                    className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug block mt-0.5"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {project.startingPrice}
                  </span>
                </div>

                {/* Action Button: View Project */}
                <Link
                  href={project.href}
                  className="w-full mt-3.5 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-semibold text-xs sm:text-[13px] text-center block transition-all shadow-sm cursor-pointer"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  View Project
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
