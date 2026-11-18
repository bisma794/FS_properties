'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ALL_COMMUNITIES, CommunityComparisonItem } from '@/lib/communitiesData';

interface CommunityComparisonSectionProps {
  bannerText?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function CommunityComparisonSection({
  bannerText,
  buttonText = 'View Full Comparison Report',
  buttonLink = '/advisory-report',
}: CommunityComparisonSectionProps) {
  const [selectedComm1, setSelectedComm1] = useState<CommunityComparisonItem>(
    () => ALL_COMMUNITIES.find((c) => c.id === 'dubai-hills-estate') || ALL_COMMUNITIES[0]
  );
  const [selectedComm2, setSelectedComm2] = useState<CommunityComparisonItem>(
    () => ALL_COMMUNITIES.find((c) => c.id === 'the-valley') || ALL_COMMUNITIES[1]
  );

  const [activeTab, setActiveTab] = useState<'Overview' | 'Family' | 'Investment' | 'Lifestyle' | 'Connectivity' | 'Amenities'>('Overview');
  const [openDropdown, setOpenDropdown] = useState<1 | 2 | null>(null);
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');

  const dropdownRef1 = useRef<HTMLDivElement>(null);
  const dropdownRef2 = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openDropdown === 1 &&
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
      if (
        openDropdown === 2 &&
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const tabs: Array<'Overview' | 'Family' | 'Investment' | 'Lifestyle' | 'Connectivity' | 'Amenities'> = [
    'Overview',
    'Family',
    'Investment',
    'Lifestyle',
    'Connectivity',
    'Amenities',
  ];

  // Filter communities based on search query
  const filteredCommunities1 = ALL_COMMUNITIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery1.toLowerCase()) ||
    c.tag.toLowerCase().includes(searchQuery1.toLowerCase())
  );

  const filteredCommunities2 = ALL_COMMUNITIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery2.toLowerCase()) ||
    c.tag.toLowerCase().includes(searchQuery2.toLowerCase())
  );

  // Extract metric keys for the active tab from both selected communities
  const metrics1 = selectedComm1.metrics[activeTab] || {};
  const metrics2 = selectedComm2.metrics[activeTab] || {};
  const allMetricKeys = Array.from(
    new Set([...Object.keys(metrics1), ...Object.keys(metrics2)])
  );

  // Dynamic banner calculation
  const dynamicBannerText =
    `${selectedComm1.name} ${selectedComm1.summary.replace(/^[a-z]/, (c) => c.toLowerCase())}, while ${selectedComm2.name} ${selectedComm2.summary.replace(/^[a-z]/, (c) => c.toLowerCase())}`;

  const displayBannerText =
    bannerText &&
    selectedComm1.id === 'dubai-hills-estate' &&
    selectedComm2.id === 'the-valley'
      ? bannerText
      : dynamicBannerText;

  return (
    <section className="w-full bg-[#FAF9F6] py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 flex flex-col items-center">

        {/* Top Dropdowns Selector Row */}
        <div className="w-full flex items-center justify-between gap-3 sm:gap-6 mb-8 relative z-30">

          {/* Dropdown 1 */}
          <div className="flex-1 relative" ref={dropdownRef1}>
            <div
              onClick={() => {
                setOpenDropdown(openDropdown === 1 ? null : 1);
                setSearchQuery1('');
              }}
              role="button"
              tabIndex={0}
              className={`w-full bg-white rounded-xl border px-4 py-3.5 shadow-sm flex items-center justify-between cursor-pointer transition-colors ${
                openDropdown === 1 ? 'border-[#C5A267] ring-1 ring-[#C5A267]' : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 relative rounded-lg overflow-hidden flex-shrink-0 border border-neutral-100 bg-neutral-100">
                  <Image
                    src={selectedComm1.image}
                    alt={selectedComm1.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0 text-left">
                  <span
                    className="block font-semibold text-neutral-800 text-sm sm:text-base truncate"
                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                  >
                    {selectedComm1.name}
                  </span>
                  <span className="block text-[11px] text-[#A68848] truncate font-medium">
                    {selectedComm1.tag}
                  </span>
                </div>
              </div>
              <svg
                className={`w-4 h-4 text-neutral-500 flex-shrink-0 transition-transform ${openDropdown === 1 ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Dropdown 1 Menu */}
            {openDropdown === 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-neutral-200 shadow-xl z-50 overflow-hidden">
                <div className="p-2.5 border-b border-neutral-100 bg-[#FAF9F6]">
                  <input
                    type="text"
                    value={searchQuery1}
                    onChange={(e) => setSearchQuery1(e.target.value)}
                    placeholder="Search community..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#C5A267]"
                    autoFocus
                  />
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-neutral-100">
                  {filteredCommunities1.length === 0 ? (
                    <div className="p-4 text-xs text-neutral-400 text-center">No community found</div>
                  ) : (
                    filteredCommunities1.map((comm) => {
                      const isSelected = comm.id === selectedComm1.id;
                      return (
                        <button
                          key={comm.id}
                          type="button"
                          onClick={() => {
                            setSelectedComm1(comm);
                            setOpenDropdown(null);
                          }}
                          className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors hover:bg-neutral-50 ${
                            isSelected ? 'bg-[#FAF6EE]' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 relative rounded-md overflow-hidden flex-shrink-0 bg-neutral-100 border border-neutral-200">
                              <Image
                                src={comm.image}
                                alt={comm.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-semibold text-neutral-800 truncate">
                                {comm.name}
                              </div>
                              <div className="text-[10px] text-neutral-400 truncate">
                                {comm.tag}
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <svg className="w-4 h-4 text-[#C5A267] flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* VS Badge */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C5A267] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm flex-shrink-0">
            VS
          </div>

          {/* Dropdown 2 */}
          <div className="flex-1 relative" ref={dropdownRef2}>
            <div
              onClick={() => {
                setOpenDropdown(openDropdown === 2 ? null : 2);
                setSearchQuery2('');
              }}
              role="button"
              tabIndex={0}
              className={`w-full bg-white rounded-xl border px-4 py-3.5 shadow-sm flex items-center justify-between cursor-pointer transition-colors ${
                openDropdown === 2 ? 'border-[#C5A267] ring-1 ring-[#C5A267]' : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 relative rounded-lg overflow-hidden flex-shrink-0 border border-neutral-100 bg-neutral-100">
                  <Image
                    src={selectedComm2.image}
                    alt={selectedComm2.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0 text-left">
                  <span
                    className="block font-semibold text-neutral-800 text-sm sm:text-base truncate"
                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                  >
                    {selectedComm2.name}
                  </span>
                  <span className="block text-[11px] text-[#A68848] truncate font-medium">
                    {selectedComm2.tag}
                  </span>
                </div>
              </div>
              <svg
                className={`w-4 h-4 text-neutral-500 flex-shrink-0 transition-transform ${openDropdown === 2 ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Dropdown 2 Menu */}
            {openDropdown === 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-neutral-200 shadow-xl z-50 overflow-hidden">
                <div className="p-2.5 border-b border-neutral-100 bg-[#FAF9F6]">
                  <input
                    type="text"
                    value={searchQuery2}
                    onChange={(e) => setSearchQuery2(e.target.value)}
                    placeholder="Search community..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#C5A267]"
                    autoFocus
                  />
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-neutral-100">
                  {filteredCommunities2.length === 0 ? (
                    <div className="p-4 text-xs text-neutral-400 text-center">No community found</div>
                  ) : (
                    filteredCommunities2.map((comm) => {
                      const isSelected = comm.id === selectedComm2.id;
                      return (
                        <button
                          key={comm.id}
                          type="button"
                          onClick={() => {
                            setSelectedComm2(comm);
                            setOpenDropdown(null);
                          }}
                          className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors hover:bg-neutral-50 ${
                            isSelected ? 'bg-[#FAF6EE]' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 relative rounded-md overflow-hidden flex-shrink-0 bg-neutral-100 border border-neutral-200">
                              <Image
                                src={comm.image}
                                alt={comm.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-semibold text-neutral-800 truncate">
                                {comm.name}
                              </div>
                              <div className="text-[10px] text-neutral-400 truncate">
                                {comm.tag}
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <svg className="w-4 h-4 text-[#C5A267] flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Main Comparison Container Card */}
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
            <div className="col-span-3 text-center px-2 truncate" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
              {selectedComm1.name.toUpperCase()}
            </div>
            <div className="col-span-3 text-center px-2 truncate" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
              {selectedComm2.name.toUpperCase()}
            </div>
          </div>

          {/* Dynamic Alternating Data Rows */}
          <div className="space-y-1">
            {allMetricKeys.map((metricKey, idx) => {
              const isEven = idx % 2 === 0;
              const val1 = metrics1[metricKey] || '—';
              const val2 = metrics2[metricKey] || '—';

              return (
                <div
                  key={metricKey}
                  className={`grid grid-cols-12 items-center py-3.5 px-4 transition-colors ${
                    isEven ? 'bg-[#F9F9F8]' : 'bg-white'
                  }`}
                >
                  <div
                    className="col-span-6 text-xs sm:text-sm font-medium text-neutral-500 pr-2"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {metricKey}
                  </div>
                  <div
                    className="col-span-3 text-center text-xs sm:text-sm font-bold text-neutral-900 px-2"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {val1}
                  </div>
                  <div
                    className="col-span-3 text-center text-xs sm:text-sm font-bold text-neutral-900 px-2"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {val2}
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
              {displayBannerText}
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
