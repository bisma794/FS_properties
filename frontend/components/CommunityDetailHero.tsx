'use client';

import React from 'react';
import Image from 'next/image';

interface CommunityDetailHeroProps {
  breadcrumb?: string;
  headingWord1?: string;
  headingWord2?: string;
  description?: string;
  imageSrc?: string;
}

export default function CommunityDetailHero({
  breadcrumb = 'Communities / Dubai creek harbour',
  headingWord1 = 'DUBAI CREEK',
  headingWord2 = 'HARBOUR',
  description = 'A modern waterfront district with open skyline views, connected promenades and a growing collection of homes.',
  imageSrc,
}: CommunityDetailHeroProps) {
  return (
    <section className="relative w-full bg-[#FAF8F5] overflow-hidden min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex items-center border-b border-[#EFECE6]">
      {/* Right Background Image with smooth gradient fade into cream */}
      {imageSrc && (
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[65%] h-full z-0 overflow-hidden pointer-events-none">
          <Image
            src={imageSrc}
            alt={headingWord1 ? `${headingWord1} ${headingWord2 || ''}` : 'Community Hero'}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 65vw"
          />

          {/* Smooth Horizontal Gradient Fade Overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, #FAF8F5 0%, rgba(250, 248, 245, 0.95) 20%, rgba(250, 248, 245, 0.6) 45%, rgba(250, 248, 245, 0.1) 70%, transparent 100%)',
            }}
          />

          {/* Mobile/Tablet Vertical Gradient Overlay to ensure full text readability */}
          <div className="absolute inset-0 bg-[#FAF8F5]/80 sm:bg-transparent z-10 lg:hidden pointer-events-none" />
        </div>
      )}

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full py-16 sm:py-20 lg:py-28">
        <div className="max-w-2xl text-left">
          {/* Breadcrumb (Communities / Dubai creek harbour) */}
          <span
            className="text-xs sm:text-[13px] text-[#8C8C8C] tracking-wide block mb-3.5 sm:mb-4 select-none font-normal"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            }}
          >
            {breadcrumb}
          </span>

          {/* Main Hero Heading in Cinzel */}
          <h1
            className="text-3xl sm:text-5xl lg:text-[54px] tracking-[0.04em] leading-[1.12] uppercase"
            style={{
              fontFamily: 'var(--font-cinzel), Cinzel, serif',
              fontWeight: 400,
            }}
          >
            {/* DUBAI CREEK (Dark Navy/Slate) */}
            <span className="block text-[#1B2538]">{headingWord1}</span>
            {/* HARBOUR (Luxury Warm Gold) */}
            <span className="block text-[#C2A468] mt-1 sm:mt-1.5">{headingWord2}</span>
          </h1>

          {/* Subtitle / Description */}
          <p
            className="text-xs sm:text-sm lg:text-[14.5px] text-[#737373] leading-relaxed max-w-md sm:max-w-lg mt-5 sm:mt-6 font-normal"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
