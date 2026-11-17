'use client';

import React, { useState } from 'react';

interface BuySearchFilterSectionProps {
  className?: string;
}

const propertyTypePills = [
  { label: 'Apartments', count: '118,299' },
  { label: 'Villas', count: '40,403' },
  { label: 'Townhouses', count: '17,092' },
  { label: 'Land', count: '8,024' },
  { label: 'Penthouses', count: '1,544' },
  { label: 'Whole Buildings', count: '1,529' },
  { label: 'Duplexes', count: '932' },
];

export default function BuySearchFilterSection({ className = '' }: BuySearchFilterSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Buy' | 'Map'>('Buy');

  const filterItemStyle =
    'font-inter font-normal text-xs sm:text-[13.5px] text-stone-600 hover:font-bold hover:text-[#504F4F] transition-all cursor-pointer whitespace-nowrap';

  return (
    <section className={`w-full py-8 sm:py-10 ${className}`}>
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full space-y-4">
        {/* Breadcrumb at Top */}
        <div
          className="flex items-center gap-1.5 text-xs sm:text-[13px] font-inter font-normal select-none px-1"
          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
        >
          <span className="text-[#18181B] font-medium">New</span>
          <span className="text-[#A1A1AA] text-[11px]">&gt;</span>
          <span className="text-[#C5A265] font-medium">Properties for sale in UAE</span>
        </div>

        {/* Main Search Filter Card */}
        <div className="bg-white rounded-[22px] sm:rounded-[26px] border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 sm:p-8 lg:p-9 space-y-5">
          {/* Row 1: Heading with Total Count */}
          <div className="flex flex-wrap items-baseline gap-2.5">
            <h2
              className="text-2xl sm:text-3xl lg:text-[32px] text-[#111827] tracking-tight"
              style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontWeight: 600,
              }}
            >
              Properties for sale in UAE
            </h2>
            <span
              className="text-xs sm:text-sm text-[#888888] font-inter font-normal ml-1"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 400 }}
            >
              190,509 listed
            </span>
          </div>

          {/* Row 2: Search Input with Icon */}
          <div className="relative flex items-center pt-1">
            {/* Search Magnifying Glass Icon */}
            <svg
              className="w-5 h-5 text-[#9CA3AF] shrink-0 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="City, community or building"
              className="w-full bg-transparent text-sm sm:text-base text-stone-900 placeholder:text-[#9CA3AF] focus:outline-none font-inter font-normal"
              style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontWeight: 400,
              }}
            />
          </div>

          {/* Divider Line */}
          <div className="w-full border-b border-stone-200/90" />

          {/* Row 3: Filters Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
            {/* Left Filter Criteria */}
            <div className="flex items-center gap-6 sm:gap-7 overflow-x-auto no-scrollbar py-1">
              {/* Active "Buy" Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('Buy')}
                className="relative pb-1 font-inter text-xs sm:text-[13.5px] cursor-pointer text-[#111827] font-semibold"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                Buy
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-900 rounded-full" />
              </button>

              <button type="button" className={filterItemStyle}>
                Property type
              </button>

              <button type="button" className={filterItemStyle}>
                Beds &amp; baths
              </button>

              <button type="button" className={filterItemStyle}>
                Price
              </button>

              <button type="button" className={filterItemStyle}>
                Off-plan / Ready
              </button>
            </div>

            {/* Right Controls: Filters, Sort, Alerts, Map */}
            <div className="flex items-center gap-5 sm:gap-6 shrink-0 self-start md:self-auto py-1">
              <button type="button" className={filterItemStyle}>
                Filters
              </button>

              <button type="button" className={filterItemStyle}>
                Sort
              </button>

              <button type="button" className={filterItemStyle}>
                Alerts
              </button>

              {/* Map Button with Active Underline */}
              <button
                type="button"
                onClick={() => setActiveTab('Map')}
                className="relative pb-1 font-inter text-xs sm:text-[13.5px] cursor-pointer text-[#111827] font-bold"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                Map
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-900 rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 4: Property Category Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pt-2 px-1">
          {propertyTypePills.map((pill, idx) => (
            <button
              key={idx}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-200/80 text-xs sm:text-[13px] text-stone-700 hover:font-bold hover:text-[#504F4F] hover:border-stone-400 transition-all shadow-2xs whitespace-nowrap cursor-pointer"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              <span>{pill.label}</span>
              <span className="text-[#9CA3AF] text-[11px]">•</span>
              <span className="text-stone-500 font-normal">{pill.count}</span>
            </button>
          ))}

          {/* View All Button */}
          <button
            type="button"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-transparent text-xs sm:text-[13px] text-[#C5A265] font-semibold hover:text-[#b08e50] transition-colors whitespace-nowrap cursor-pointer shrink-0"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            <span>View All</span>
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
