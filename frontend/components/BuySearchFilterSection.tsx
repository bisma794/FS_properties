'use client';

import React, { useState, useEffect, useRef } from 'react';

interface BuySearchFilterSectionProps {
  className?: string;
}

interface FilterCounts {
  total: number;
  apartments: number;
  villas: number;
  townhouses: number;
  land: number;
  penthouses: number;
  wholeBuildings: number;
  duplexes: number;
}

export default function BuySearchFilterSection({ className = '' }: BuySearchFilterSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Buy' | 'Map'>('Buy');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedBeds, setSelectedBeds] = useState<number | 'Any'>('Any');
  const [selectedPrice, setSelectedPrice] = useState<string>('Any');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedSort, setSelectedSort] = useState<string>('Popular');

  // Open dropdown menus state
  const [openDropdown, setOpenDropdown] = useState<'type' | 'beds' | 'price' | 'status' | 'sort' | null>(null);

  // Dynamic counts received from properties database / listings
  const [counts, setCounts] = useState<FilterCounts>({
    total: 10,
    apartments: 2,
    villas: 6,
    townhouses: 3,
    land: 1,
    penthouses: 1,
    wholeBuildings: 1,
    duplexes: 1,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen for property counts emitted from listings / database
  useEffect(() => {
    const handleCounts = (e: any) => {
      if (e.detail) {
        setCounts((prev) => ({ ...prev, ...e.detail }));
      }
    };
    window.addEventListener('fs-property-counts', handleCounts);
    return () => window.removeEventListener('fs-property-counts', handleCounts);
  }, []);

  // Emit filter changes whenever state changes
  useEffect(() => {
    const event = new CustomEvent('fs-property-filter-change', {
      detail: {
        query: searchQuery,
        type: selectedType,
        beds: selectedBeds,
        price: selectedPrice,
        status: selectedStatus,
        sort: selectedSort,
        viewMode: activeTab === 'Map' ? 'Map' : 'List',
      },
    });
    window.dispatchEvent(event);
  }, [searchQuery, selectedType, selectedBeds, selectedPrice, selectedStatus, selectedSort, activeTab]);

  const propertyTypePills = [
    { label: 'Apartments', key: 'Apartment', count: counts.apartments },
    { label: 'Villas', key: 'Villa', count: counts.villas },
    { label: 'Townhouses', key: 'Townhouse', count: counts.townhouses },
    { label: 'Land', key: 'Land', count: counts.land },
    { label: 'Penthouses', key: 'Penthouse', count: counts.penthouses },
    { label: 'Whole Buildings', key: 'Whole Building', count: counts.wholeBuildings },
    { label: 'Duplexes', key: 'Duplex', count: counts.duplexes },
  ];

  const handlePillClick = (key: string) => {
    if (selectedType.toLowerCase() === key.toLowerCase()) {
      setSelectedType('All');
    } else {
      setSelectedType(key);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedBeds('Any');
    setSelectedPrice('Any');
    setSelectedStatus('All');
    setSelectedSort('Popular');
    setActiveTab('Buy');
  };

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
        <div
          ref={dropdownRef}
          className="bg-white rounded-[22px] sm:rounded-[26px] border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 sm:p-8 lg:p-9 space-y-5 relative"
        >
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
              {counts.total > 0 ? `${counts.total.toLocaleString()} listed` : '190,509 listed'}
            </span>
          </div>

          {/* Row 2: Search Input with Icon */}
          <div className="relative flex items-center pt-1">
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
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-stone-400 hover:text-stone-700 px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Divider Line */}
          <div className="w-full border-b border-stone-200/90" />

          {/* Row 3: Filters Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
            {/* Left Filter Criteria with Interactive Dropdowns */}
            <div className="flex items-center gap-6 sm:gap-7 overflow-x-visible py-1 flex-wrap">
              {/* "Buy" Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('Buy')}
                className={`relative pb-1 font-inter text-xs sm:text-[13.5px] cursor-pointer transition-all ${
                  activeTab === 'Buy' ? 'text-[#111827] font-semibold' : 'text-stone-600 hover:text-[#504F4F]'
                }`}
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                Buy
                {activeTab === 'Buy' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-900 rounded-full" />
                )}
              </button>

              {/* Property Type Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
                  className={`font-inter text-xs sm:text-[13.5px] transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    selectedType !== 'All' ? 'font-bold text-[#BFA16A]' : 'text-stone-600 hover:font-bold hover:text-[#504F4F]'
                  }`}
                >
                  <span>{selectedType !== 'All' ? selectedType : 'Property type'}</span>
                  <svg className={`w-3 h-3 transition-transform ${openDropdown === 'type' ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdown === 'type' && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-xl z-50 py-1 text-xs">
                    {['All', 'Villa', 'Townhouse', 'Apartment', 'Penthouse', 'Duplex', 'Land', 'Whole Building'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setSelectedType(t);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-stone-50 transition ${
                          selectedType.toLowerCase() === t.toLowerCase() ? 'bg-stone-100 font-bold text-[#BFA16A]' : 'text-stone-700'
                        }`}
                      >
                        {t === 'All' ? 'All Types' : t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Beds & Baths Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'beds' ? null : 'beds')}
                  className={`font-inter text-xs sm:text-[13.5px] transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    selectedBeds !== 'Any' ? 'font-bold text-[#BFA16A]' : 'text-stone-600 hover:font-bold hover:text-[#504F4F]'
                  }`}
                >
                  <span>{selectedBeds !== 'Any' ? `${selectedBeds}+ Beds` : 'Beds & baths'}</span>
                  <svg className={`w-3 h-3 transition-transform ${openDropdown === 'beds' ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdown === 'beds' && (
                  <div className="absolute top-full left-0 mt-2 w-44 bg-white border border-stone-200 rounded-xl shadow-xl z-50 py-1 text-xs">
                    {(['Any', 1, 2, 3, 4, 5, 6] as (number | 'Any')[]).map((b) => (
                      <button
                        key={String(b)}
                        type="button"
                        onClick={() => {
                          setSelectedBeds(b);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-stone-50 transition ${
                          selectedBeds === b ? 'bg-stone-100 font-bold text-[#BFA16A]' : 'text-stone-700'
                        }`}
                      >
                        {b === 'Any' ? 'Any Bedrooms' : `${b}+ Bedrooms`}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
                  className={`font-inter text-xs sm:text-[13.5px] transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    selectedPrice !== 'Any' ? 'font-bold text-[#BFA16A]' : 'text-stone-600 hover:font-bold hover:text-[#504F4F]'
                  }`}
                >
                  <span>{selectedPrice !== 'Any' ? selectedPrice : 'Price'}</span>
                  <svg className={`w-3 h-3 transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdown === 'price' && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-stone-200 rounded-xl shadow-xl z-50 py-1 text-xs">
                    {[
                      { label: 'Any Price', val: 'Any' },
                      { label: 'Under AED 3M', val: '<3M' },
                      { label: 'AED 3M - AED 4.5M', val: '3M-4.5M' },
                      { label: 'AED 4.5M - AED 6M', val: '4.5M-6M' },
                      { label: 'Above AED 6M', val: '>6M' },
                    ].map((p) => (
                      <button
                        key={p.val}
                        type="button"
                        onClick={() => {
                          setSelectedPrice(p.val);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-stone-50 transition ${
                          selectedPrice === p.val ? 'bg-stone-100 font-bold text-[#BFA16A]' : 'text-stone-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Off-plan / Ready Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
                  className={`font-inter text-xs sm:text-[13.5px] transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    selectedStatus !== 'All' ? 'font-bold text-[#BFA16A]' : 'text-stone-600 hover:font-bold hover:text-[#504F4F]'
                  }`}
                >
                  <span>{selectedStatus !== 'All' ? selectedStatus : 'Off-plan / Ready'}</span>
                  <svg className={`w-3 h-3 transition-transform ${openDropdown === 'status' ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdown === 'status' && (
                  <div className="absolute top-full left-0 mt-2 w-44 bg-white border border-stone-200 rounded-xl shadow-xl z-50 py-1 text-xs">
                    {['All', 'Off-Plan', 'Ready'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSelectedStatus(s);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-stone-50 transition ${
                          selectedStatus.toLowerCase() === s.toLowerCase() ? 'bg-stone-100 font-bold text-[#BFA16A]' : 'text-stone-700'
                        }`}
                      >
                        {s === 'All' ? 'All (Off-Plan & Ready)' : s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Controls: Filters, Sort, Alerts, Map */}
            <div className="flex items-center gap-5 sm:gap-6 shrink-0 self-start md:self-auto py-1">
              <button
                type="button"
                onClick={handleResetFilters}
                className="font-inter font-normal text-xs sm:text-[13.5px] text-stone-600 hover:font-bold hover:text-[#504F4F] transition-all cursor-pointer whitespace-nowrap"
              >
                Reset Filters
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
                  className="font-inter font-normal text-xs sm:text-[13.5px] text-stone-600 hover:font-bold hover:text-[#504F4F] transition-all cursor-pointer whitespace-nowrap flex items-center gap-1"
                >
                  <span>Sort{selectedSort !== 'Popular' ? `: ${selectedSort}` : ''}</span>
                  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdown === 'sort' && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-xl z-50 py-1 text-xs">
                    {[
                      { label: 'Popular / Featured', val: 'Popular' },
                      { label: 'Price: Low to High', val: 'Price: Low to High' },
                      { label: 'Price: High to Low', val: 'Price: High to Low' },
                      { label: 'Bedrooms: High to Low', val: 'Bedrooms: High to Low' },
                    ].map((s) => (
                      <button
                        key={s.val}
                        type="button"
                        onClick={() => {
                          setSelectedSort(s.val);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-stone-50 transition ${
                          selectedSort === s.val ? 'bg-stone-100 font-bold text-[#BFA16A]' : 'text-stone-700'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => alert('Search alerts are now enabled for this filter criteria.')}
                className="font-inter font-normal text-xs sm:text-[13.5px] text-stone-600 hover:font-bold hover:text-[#504F4F] transition-all cursor-pointer whitespace-nowrap"
              >
                Alerts
              </button>

              {/* Map Button with Active Underline */}
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'Map' ? 'Buy' : 'Map')}
                className={`relative pb-1 font-inter text-xs sm:text-[13.5px] cursor-pointer transition-all ${
                  activeTab === 'Map' ? 'text-[#111827] font-bold' : 'text-stone-600 hover:font-bold hover:text-[#504F4F]'
                }`}
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                Map
                {activeTab === 'Map' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-900 rounded-full" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Row 4: Property Category Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pt-2 px-1">
          {propertyTypePills.map((pill) => {
            const isSelected = selectedType.toLowerCase() === pill.key.toLowerCase();
            return (
              <button
                key={pill.key}
                type="button"
                onClick={() => handlePillClick(pill.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs sm:text-[13px] transition-all shadow-2xs whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 border-stone-900 text-white font-semibold'
                    : 'bg-white border-stone-200/80 text-stone-700 hover:font-bold hover:text-[#504F4F] hover:border-stone-400'
                }`}
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                <span>{pill.label}</span>
                <span className={isSelected ? 'text-white/60 text-[11px]' : 'text-[#9CA3AF] text-[11px]'}>•</span>
                <span className={isSelected ? 'text-white/90 font-normal' : 'text-stone-500 font-normal'}>
                  {pill.count > 0 ? pill.count.toLocaleString() : '1'}
                </span>
              </button>
            );
          })}

          {/* View All Button */}
          <button
            type="button"
            onClick={() => setSelectedType('All')}
            className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
              selectedType === 'All' ? 'text-[#BFA16A] bg-[#BFA16A]/10' : 'text-[#C5A265] hover:text-[#b08e50]'
            }`}
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
