'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BlogUaeOffplanBannerSectionProps {
  headingLine1?: string;
  headingLine2Prefix?: string;
  headingLine2Highlight?: string;
  searchPlaceholder?: string;
  imageSrc?: string;
  onSearch?: (query: string) => void;
}

export default function BlogUaeOffplanBannerSection({
  headingLine1 = 'START YOUR SEARCH FOR YOUR',
  headingLine2Prefix = 'DREAM HOME WITH ',
  headingLine2Highlight = 'UAE OFFPLAN',
  searchPlaceholder = 'Looking for Something Specific?',
  imageSrc = '/uae-offplan-banner.png',
  onSearch,
}: BlogUaeOffplanBannerSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <section className="relative w-full overflow-hidden h-[794px] flex items-center justify-center">
      {/* Full-width Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt="Luxury waterfront community resort view"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* 72% Black Overlay (#000000 at 72% opacity) */}
        <div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.72)' }}
        />
      </div>

      {/* Center Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-16 sm:py-24 text-center flex flex-col items-center">
        {/* Main Heading in Cinzel Serif */}
        <h2
          className="text-2xl sm:text-4xl lg:text-[46px] tracking-[0.04em] leading-[1.2] uppercase text-white font-normal drop-shadow-md max-w-4xl"
          style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
        >
          {/* Line 1: White */}
          <span className="block mb-1 sm:mb-2">{headingLine1}</span>
          {/* Line 2: White + Gold UAE OFFPLAN */}
          <span className="block">
            {headingLine2Prefix}
            <span className="text-[#C2A468] font-normal drop-shadow-sm">{headingLine2Highlight}</span>
          </span>
        </h2>

        {/* Search Bar with Search Icon and Rounded Border */}
        <form
          onSubmit={handleSearchSubmit}
          className="mt-8 sm:mt-10 w-full max-w-lg"
        >
          <div className="relative flex items-center bg-white/95 backdrop-blur-md rounded-xl border border-white/40 shadow-lg hover:border-[#C2A468] focus-within:border-[#C2A468] focus-within:ring-2 focus-within:ring-[#C2A468]/30 transition-all duration-200 px-4 py-3 sm:py-3.5">
            {/* Search Icon */}
            <svg
              className="w-4 h-4 text-[#8C8C8C] shrink-0 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-xs sm:text-sm text-[#1B2538] placeholder-[#8C8C8C] focus:outline-none font-normal"
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              }}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
