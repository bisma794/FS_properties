'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CommunityComparisonSectionProps {
  bannerText?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function CommunityComparisonSection({
  bannerText = 'The Valley Is Better For Families And Long-Term Growth, While Dubai Hills Offers Higher Rental Yields.',
  buttonText = 'View Full Comparison Report',
  buttonLink = '/advisory-report',
}: CommunityComparisonSectionProps) {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    'Overview',
    'Family',
    'Investment',
    'Lifestyle',
    'Connectivity',
    'Amenities',
  ];

  const comparisonData = [
    { metric: 'Overall FS Score', val1: '89%', val2: '89%' },
    { metric: 'Family Living', val1: '95%', val2: '95%' },
    { metric: 'Passive Income', val1: '82%', val2: '82%' },
    { metric: 'Capital Growth', val1: '88%', val2: '88%' },
    { metric: 'Average Price (3BR Villa)', val1: 'AED 4.1M', val2: 'AED 4.1M' },
    { metric: 'Rental Yield', val1: '6.1%', val2: '6.1%' },
    { metric: 'Schools Access', val1: '96%', val2: '96%' },
    { metric: 'Connectivity', val1: '90%', val2: '90%' },
    { metric: 'Green Space', val1: '92%', val2: '92%' },
  ];

  return (
    <section className="w-full bg-[#FAF9F6] py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 flex flex-col items-center">
        
        {/* Top Dropdowns Selector Row */}
        <div className="w-full flex items-center justify-between gap-3 sm:gap-6 mb-8">
          
          {/* Dropdown 1: Dubai Hills Estate */}
          <div className="flex-1 bg-white rounded-xl border border-neutral-200 px-4 py-3.5 shadow-sm flex items-center justify-between cursor-pointer hover:border-neutral-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 relative rounded-lg overflow-hidden flex-shrink-0 border border-neutral-100">
                <Image
                  src="/Rectangle 34624593.png"
                  alt="Dubai Hills Estate"
                  fill
                  className="object-cover"
                />
              </div>
              <span
                className="font-semibold text-neutral-800 text-sm sm:text-base"
                style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
              >
                Dubai Hills Estate
              </span>
            </div>
            <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* VS Badge */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C5A267] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm flex-shrink-0">
            VS
          </div>

          {/* Dropdown 2: The Valley */}
          <div className="flex-1 bg-white rounded-xl border border-neutral-200 px-4 py-3.5 shadow-sm flex items-center justify-between cursor-pointer hover:border-neutral-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 relative rounded-lg overflow-hidden flex-shrink-0 border border-neutral-100">
                <Image
                  src="/Rectangle 34624595.png"
                  alt="The Valley"
                  fill
                  className="object-cover"
                />
              </div>
              <span
                className="font-semibold text-neutral-800 text-sm sm:text-base"
                style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
              >
                The Valley
              </span>
            </div>
            <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

        </div>

        {/* Main Comparison Container Card - No side stroke, no corner radius */}
        <div className="w-full bg-white border-y border-neutral-200/80 p-6 sm:p-8">
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 sm:gap-8 border-b border-neutral-200 pb-3 mb-6 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm sm:text-base transition-colors relative pb-3 -mb-3 whitespace-nowrap ${
                    isActive
                      ? 'font-semibold text-neutral-900 border-b-2 border-[#C5A267]'
                      : 'font-normal text-neutral-500 hover:text-neutral-800'
                  }`}
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Table Headers */}
          <div className="grid grid-cols-12 pb-4 text-xs font-semibold text-neutral-400 tracking-wider uppercase">
            <div className="col-span-6"></div>
            <div className="col-span-3 text-center" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
              DUBAI HILLS ESTATE
            </div>
            <div className="col-span-3 text-center" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
              THE VALLEY
            </div>
          </div>

          {/* Alternating Data Rows */}
          <div className="space-y-1">
            {comparisonData.map((row, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={row.metric}
                  className={`grid grid-cols-12 items-center py-3.5 px-4 transition-colors ${
                    isEven ? 'bg-[#F9F9F8]' : 'bg-white'
                  }`}
                >
                  <div
                    className="col-span-6 text-xs sm:text-sm font-medium text-neutral-400"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {row.metric}
                  </div>
                  <div
                    className="col-span-3 text-center text-xs sm:text-sm font-bold text-neutral-900"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {row.val1}
                  </div>
                  <div
                    className="col-span-3 text-center text-xs sm:text-sm font-bold text-neutral-900"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {row.val2}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Gold Banner */}
          <div className="mt-6 bg-[#C5A267] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
            <p
              className="text-xs sm:text-sm font-medium text-center sm:text-left leading-relaxed max-w-xl"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              {bannerText}
            </p>

            <Link
              href={buttonLink}
              className="w-full sm:w-auto px-5 py-2.5 bg-white text-neutral-900 rounded-lg text-xs sm:text-sm font-medium hover:bg-neutral-100 transition-colors whitespace-nowrap shadow-sm flex items-center justify-center gap-1.5"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              <span>{buttonText}</span>
              <span>&rarr;</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
