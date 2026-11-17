'use client';

import React from 'react';
import Image from 'next/image';

export default function RecommendedCommunitiesSection() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <section className="w-full bg-[#F8F6F2] pt-16 md:pt-24 pb-8">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4">
          <h2
            className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#BFA16A] leading-tight max-w-md"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
          >
            Top Recommended Communities
          </h2>

          <a
            href="#score-info"
            className="inline-flex items-center gap-1.5 text-sm sm:text-base font-normal text-[#666666] hover:text-[#111111] transition-colors"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            How we score communities
            <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Card 1: The Valley (bg-[#F8F6F2]) */}
      <section className="w-full bg-[#F8F6F2] py-8 md:py-10">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
          <div className="group relative w-full bg-white rounded-[20px] p-6 sm:p-10 lg:p-12 shadow-sm border border-[#EBEBEB]">
            {/* Top Left Badge "1" */}
            <div className="absolute -top-5 left-8 sm:left-12 w-12 h-12 rounded-[10px] bg-[#858585] group-hover:bg-[#BFA16A] text-white font-bold text-xl flex items-center justify-center shadow-md transition-colors duration-300">
              1
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
              {/* Left Content Area */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                <div>
                  {/* Title & Developer & Match Score */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3
                        className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111111] group-hover:text-[#BFA16A] leading-snug transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      >
                        The Valley
                      </h3>
                      <p
                        className="text-lg sm:text-xl text-[#111111] font-normal mt-1"
                        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      >
                        by Emaar
                      </p>
                    </div>

                    {/* Top Right Match Score */}
                    <div className="text-right">
                      <span
                        className="block text-base sm:text-lg font-normal text-[#888888]"
                        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      >
                        Overall Match
                      </span>
                      <span
                        className="block text-4xl sm:text-5xl font-bold text-[#111111] leading-none mt-1"
                        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      >
                        96%
                      </span>
                    </div>
                  </div>

                  {/* Why it fits you section */}
                  <div className="mt-4 sm:mt-6">
                    <h4
                      className="text-xl sm:text-2xl font-semibold text-[#111111] mb-2 sm:mb-3"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      Why it fits you
                    </h4>
                    <p
                      className="text-lg sm:text-xl font-normal text-[#858585] leading-relaxed max-w-xl"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      Excellent for families with children, great schools nearby, master-planned community with strong future growth potential.
                    </p>
                  </div>
                </div>

                {/* View Community Button */}
                <div className="mt-6 sm:mt-8">
                  <a
                    href="#community-detail-1"
                    className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-[#858585] group-hover:bg-[#BFA16A] text-white font-medium text-lg rounded-[8px] transition-colors duration-300 shadow-sm"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    View Community
                    <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Image Container */}
              <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-[16px] overflow-hidden flex items-center justify-center">
                <Image
                  src="/thevalley-img.png"
                  alt="The Valley by Emaar community view"
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card 2: Dubai Hills Estate (bg-white) */}
      <section className="w-full bg-white py-8 md:py-10">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
          <div className="group relative w-full bg-white rounded-[20px] p-6 sm:p-10 lg:p-12 shadow-sm border border-[#EBEBEB]">
            {/* Top Left Badge "2" */}
            <div className="absolute -top-5 left-8 sm:left-12 w-12 h-12 rounded-[10px] bg-[#858585] group-hover:bg-[#BFA16A] text-white font-bold text-xl flex items-center justify-center shadow-md transition-colors duration-300">
              2
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
              {/* Left Content Area */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                <div>
                  {/* Title & Developer & Match Score */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3
                        className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111111] group-hover:text-[#BFA16A] leading-snug transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      >
                        Dubai Hills Estate
                      </h3>
                      <p
                        className="text-lg sm:text-xl text-[#111111] font-normal mt-1"
                        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      >
                        by Emaar
                      </p>
                    </div>

                    {/* Top Right Match Score */}
                    <div className="text-right">
                      <span
                        className="block text-base sm:text-lg font-normal text-[#888888]"
                        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      >
                        Overall Match
                      </span>
                      <span
                        className="block text-4xl sm:text-5xl font-bold text-[#111111] leading-none mt-1"
                        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      >
                        92%
                      </span>
                    </div>
                  </div>

                  {/* Why it fits you section */}
                  <div className="mt-4 sm:mt-6">
                    <h4
                      className="text-xl sm:text-2xl font-semibold text-[#111111] mb-2 sm:mb-3"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      Why it fits you
                    </h4>
                    <p
                      className="text-lg sm:text-xl font-normal text-[#858585] leading-relaxed max-w-xl"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      Established community with premium infrastructure and high rental demand.
                    </p>
                  </div>
                </div>

                {/* View Community Button */}
                <div className="mt-6 sm:mt-8">
                  <a
                    href="#community-detail-2"
                    className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-[#858585] group-hover:bg-[#BFA16A] text-white font-medium text-lg rounded-[8px] transition-colors duration-300 shadow-sm"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    View Community
                    <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Image Container */}
              <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-[16px] overflow-hidden flex items-center justify-center">
                <Image
                  src="/dubaihillestate.png"
                  alt="Dubai Hills Estate by Emaar community view"
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card 3: Grand Polo Club & Resort (bg-[#F8F6F2]) */}
      <section className="w-full bg-[#F8F6F2] py-8 md:py-10 pb-16 md:pb-24">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
          <div className="group relative w-full bg-white rounded-[20px] p-6 sm:p-10 lg:p-12 shadow-sm border border-[#EBEBEB]">
            {/* Top Left Badge "3" */}
            <div className="absolute -top-5 left-8 sm:left-12 w-12 h-12 rounded-[10px] bg-[#858585] group-hover:bg-[#BFA16A] text-white font-bold text-xl flex items-center justify-center shadow-md transition-colors duration-300">
              3
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
              {/* Left Content Area */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                <div>
                  {/* Title & Developer & Match Score */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3
                        className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111111] group-hover:text-[#BFA16A] leading-snug transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      >
                        Grand Polo Club & Resort
                      </h3>
                      <p
                        className="text-lg sm:text-xl text-[#111111] font-normal mt-1"
                        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      >
                        by Emaar
                      </p>
                    </div>

                    {/* Top Right Match Score */}
                    <div className="text-right">
                      <span
                        className="block text-base sm:text-lg font-normal text-[#888888]"
                        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      >
                        Overall Match
                      </span>
                      <span
                        className="block text-4xl sm:text-5xl font-bold text-[#111111] leading-none mt-1"
                        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                      >
                        89%
                      </span>
                    </div>
                  </div>

                  {/* Why it fits you section */}
                  <div className="mt-4 sm:mt-6">
                    <h4
                      className="text-xl sm:text-2xl font-semibold text-[#111111] mb-2 sm:mb-3"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      Why it fits you
                    </h4>
                    <p
                      className="text-lg sm:text-xl font-normal text-[#858585] leading-relaxed max-w-xl"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      Luxury lifestyle with strong capital appreciation potential and limited supply.
                    </p>
                  </div>
                </div>

                {/* View Community Button */}
                <div className="mt-6 sm:mt-8">
                  <a
                    href="#community-detail-3"
                    className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-[#858585] group-hover:bg-[#BFA16A] text-white font-medium text-lg rounded-[8px] transition-colors duration-300 shadow-sm"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    View Community
                    <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Image Container */}
              <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-[16px] overflow-hidden flex items-center justify-center">
                <Image
                  src="/grandpolo.png"
                  alt="Grand Polo Club & Resort by Emaar community view"
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
