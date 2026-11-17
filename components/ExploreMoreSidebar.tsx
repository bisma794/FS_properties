'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface ExploreMoreSidebarProps {
  activeArea?: string;
  activePropertyType?: string;
  activeBedrooms?: string;
  onlyNew?: boolean;
  onRecommendSelect?: (params: {
    label: string;
    area: string;
    propertyType?: string;
    bedrooms?: string;
  }) => void;
  onAreaSelect?: (area: string) => void;
  onInvestSelect?: (mode: 'all' | 'new') => void;
}

export default function ExploreMoreSidebar({
  activeArea = 'All areas',
  activePropertyType = 'All',
  activeBedrooms = '',
  onlyNew = false,
  onRecommendSelect,
  onAreaSelect,
  onInvestSelect,
}: ExploreMoreSidebarProps) {
  const [showMoreNear, setShowMoreNear] = useState(false);

  const recommendedSearches = [
    { label: '2 Bed in Dubai Marina', icon: 'bed', area: 'Dubai Marina', propertyType: 'Apartments', bedrooms: '2 Bed' },
    { label: '3 Bed in Dubai Marina', icon: 'bed', area: 'Dubai Marina', propertyType: 'Apartments', bedrooms: '3 Bed' },
    { label: '4 Bed in Dubai Marina', icon: 'bed', area: 'Dubai Marina', propertyType: 'Apartments', bedrooms: '4 Bed' },
    { label: 'Villas in Dubai Marina', icon: 'villa', area: 'Dubai Marina', propertyType: 'Villas', bedrooms: '' },
  ];

  const initialNearAreas = [
    'Business Bay',
    'Palm Jumeirah',
    'Residential District',
    'Dubai Island A',
    'Dubai Land Residence Complex DLRC',
    'Downtown Dubai',
    'Al Furjan',
    'District 10, JVC',
    'Azizi Riviera',
    'Dubai Hills Estate',
  ];

  const extraNearAreas = ['JBR'];

  const otherNearbyAreas = [
    'Wadi Al Safa 5',
    'Madinat Al Mataar',
    'Wadi Al Safa 2',
    'Wadi Al Safa 3',
    'Wadi Al Safa 4',
    'Al Barsha South 2',
  ];

  const isInteractive = Boolean(onRecommendSelect || onAreaSelect || onInvestSelect);

  return (
    <div
      className="w-full space-y-4"
      style={{ fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif' }}
    >
      {/* 1. Main Explore More Container */}
      <div className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden shadow-xs">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#BFA16A] to-[#B39359] p-3.5 sm:p-4 flex items-center gap-3 text-white">
          <div className="w-9 h-9 rounded-xl bg-white/95 flex items-center justify-center text-[#BFA16A] shadow-xs shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold leading-tight tracking-tight text-white">
              Explore More
            </h3>
            <p className="text-[11px] sm:text-xs text-white/90 font-medium">
              Related searches &amp; nearby areas
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-3.5 sm:p-4 space-y-4">
          {/* Section 1: Recommended Searches */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <h4 className="text-[11px] font-bold text-[#18181B] tracking-wider uppercase">
                RECOMMENDED SEARCHES
              </h4>
            </div>

            <div className="space-y-1.5">
              {recommendedSearches.map((item, idx) => {
                const isSelected =
                  isInteractive &&
                  activeArea === item.area &&
                  (item.bedrooms
                    ? activeBedrooms === item.bedrooms
                    : activePropertyType === item.propertyType && !activeBedrooms);

                const content = (
                  <>
                    <div className="flex items-center gap-2">
                      {item.icon === 'bed' ? (
                        <svg
                          className={`w-3.5 h-3.5 transition-colors ${
                            isSelected ? 'text-[#BFA16A]' : 'text-[#71717A] group-hover:text-[#18181B]'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.75 7.5h16.5M3.75 7.5a2.25 2.25 0 012.25-2.25h12a2.25 2.25 0 012.25 2.25" />
                        </svg>
                      ) : (
                        <svg
                          className={`w-3.5 h-3.5 transition-colors ${
                            isSelected ? 'text-[#BFA16A]' : 'text-[#71717A] group-hover:text-[#18181B]'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                      )}
                      <span
                        className={`text-[11.5px] sm:text-xs font-semibold ${
                          isSelected ? 'text-[#18181B]' : 'text-[#27272A] group-hover:text-[#111827]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <svg
                      className={`w-3.5 h-3.5 transition-all ${
                        isSelected
                          ? 'text-[#BFA16A] translate-x-0.5'
                          : 'text-[#A1A1AA] group-hover:text-[#18181B] group-hover:translate-x-0.5'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </>
                );

                if (onRecommendSelect) {
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onRecommendSelect(item)}
                      className={`w-full flex items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all group cursor-pointer text-left ${
                        isSelected
                          ? 'bg-[#FAF5EB] border-[#BFA16A] shadow-2xs'
                          : 'bg-[#F8F9FA] border-transparent hover:bg-[#F1F3F5]'
                      }`}
                    >
                      {content}
                    </button>
                  );
                }

                return (
                  <Link
                    key={idx}
                    href={`/project-main-page?area=${encodeURIComponent(item.area)}&type=${encodeURIComponent(item.propertyType)}`}
                    className="w-full flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] transition-all group cursor-pointer text-left"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section 2: Near Dubai Marina */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-full bg-[#F5EFE6] text-[#BFA16A] flex items-center justify-center shrink-0">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h4 className="text-[11px] font-bold text-[#18181B] tracking-wider uppercase">
                NEAR DUBAI MARINA
              </h4>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(showMoreNear ? [...initialNearAreas, ...extraNearAreas] : initialNearAreas).map((area, idx) => {
                const isSelected = isInteractive && activeArea.toLowerCase() === area.toLowerCase();
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onAreaSelect?.(area)}
                    className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#BFA16A] text-white font-semibold shadow-2xs'
                        : 'bg-[#F0F5FA] hover:bg-[#E2ECF5] text-[#374151]'
                    }`}
                  >
                    {area}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowMoreNear(!showMoreNear)}
              className="mt-2 text-[11px] font-bold text-[#BFA16A] hover:text-[#a88c56] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>{showMoreNear ? 'View Less' : 'View More (1)'}</span>
              <svg
                className={`w-3 h-3 transition-transform ${showMoreNear ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          {/* Section 3: Other Nearby Areas */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-full bg-[#F5EFE6] text-[#BFA16A] flex items-center justify-center shrink-0">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
              </div>
              <h4 className="text-[11px] font-bold text-[#18181B] tracking-wider uppercase">
                OTHER NEARBY AREAS
              </h4>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {otherNearbyAreas.map((area, idx) => {
                const isSelected = isInteractive && activeArea.toLowerCase() === area.toLowerCase();
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onAreaSelect?.(area)}
                    className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#18181B] text-white font-semibold shadow-2xs'
                        : 'bg-[#F4F4F5] hover:bg-[#E4E4E7] text-[#374151]'
                    }`}
                  >
                    {area}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Invest in Off Plan */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-full bg-[#F5EFE6] text-[#BFA16A] flex items-center justify-center shrink-0">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-[11px] font-bold text-[#18181B] tracking-wider uppercase">
                INVEST IN OFF PLAN
              </h4>
            </div>

            <div className="space-y-1.5">
              {onInvestSelect ? (
                <>
                  <button
                    type="button"
                    onClick={() => onInvestSelect('all')}
                    className={`w-full flex items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all group cursor-pointer text-left ${
                      !onlyNew && activeArea === 'All areas' && activePropertyType === 'All'
                        ? 'bg-[#FAF5EB] border-[#BFA16A]/60'
                        : 'bg-[#F8F9FA] border-transparent hover:bg-[#F1F3F5]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 flex items-center justify-center text-[#BFA16A]">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                        </svg>
                      </div>
                      <span className="text-[11.5px] sm:text-xs font-semibold text-[#27272A] group-hover:text-[#111827]">
                        Off Plan in UAE
                      </span>
                    </div>
                    <svg
                      className="w-3.5 h-3.5 text-[#BFA16A] group-hover:translate-x-0.5 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => onInvestSelect('new')}
                    className={`w-full flex items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all group cursor-pointer text-left ${
                      onlyNew
                        ? 'bg-[#FAF5EB] border-[#BFA16A]'
                        : 'bg-[#F8F9FA] border-transparent hover:bg-[#F1F3F5]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 flex items-center justify-center text-[#BFA16A]">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                      </div>
                      <span className="text-[11.5px] sm:text-xs font-semibold text-[#27272A] group-hover:text-[#111827]">
                        New Projects in UAE
                      </span>
                    </div>
                    <svg
                      className="w-3.5 h-3.5 text-[#BFA16A] group-hover:translate-x-0.5 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/project-main-page"
                    className="w-full flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] transition-all group cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 flex items-center justify-center text-[#BFA16A]">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                        </svg>
                      </div>
                      <span className="text-[11.5px] sm:text-xs font-semibold text-[#27272A] group-hover:text-[#111827]">
                        Off Plan in UAE
                      </span>
                    </div>
                    <svg
                      className="w-3.5 h-3.5 text-[#BFA16A] group-hover:translate-x-0.5 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>

                  <Link
                    href="/project-main-page"
                    className="w-full flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F3F5] transition-all group cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 flex items-center justify-center text-[#BFA16A]">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                      </div>
                      <span className="text-[11.5px] sm:text-xs font-semibold text-[#27272A] group-hover:text-[#111827]">
                        New Projects in UAE
                      </span>
                    </div>
                    <svg
                      className="w-3.5 h-3.5 text-[#BFA16A] group-hover:translate-x-0.5 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dark Consultation CTA Card */}
      <div className="bg-[#18181B] rounded-2xl p-4 text-white shadow-md space-y-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
            Interested in This Project?
          </h3>
          <p className="mt-1 text-[11px] text-[#A1A1AA] leading-relaxed">
            Speak with our expert advisors for exclusive offers and payment plans.
          </p>
        </div>

        <div className="space-y-2 pt-0.5">
          <Link
            href="/advisory-report"
            className="w-full block text-center bg-[#BFA16A] hover:bg-[#ab8f5b] active:scale-[0.99] text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition-colors"
          >
            Schedule a Consultation
          </Link>

          <a
            href="https://wa.me/971500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 bg-[#22C55E] hover:bg-[#16A34A] active:scale-[0.99] text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition-colors"
          >
            {/* WhatsApp bubble icon */}
            <svg className="w-3.5 h-3.5 fill-white shrink-0" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.073.043.419-.101.824z" />
            </svg>
            <span>Contact via WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 3. Recent Sale Transactions Card */}
      <div className="bg-white rounded-2xl border border-[#E8E8E8] p-4 shadow-xs space-y-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#18181B] tracking-tight">
            Recent Sale Transactions
          </h3>
          <span className="text-[11px] text-stone-400 font-medium mt-0.5 block">
            R. Hills
          </span>
        </div>

        {/* Gold Table Header */}
        <div className="bg-[#BA955C] rounded-lg px-2.5 py-1.5 flex items-center justify-between text-white text-[11px] font-bold">
          <span>Price</span>
          <span>Location</span>
        </div>

        {/* Transactions List: 2 items */}
        <div className="space-y-2.5 divide-y divide-stone-100">
          {[
            { price: 'AED 2.6M', location: 'R. Hills', areaFilter: 'Arabian Ranches III', type: 'Villa', beds: '5 Beds', size: '1,997 Sqft' },
            { price: 'AED 1.6M', location: 'R. Hills', areaFilter: 'Dubai Hills Estate', type: 'Villa', beds: '3 Beds', size: '1,614 Sqft' },
          ].map((tx, idx) => (
            <div
              key={idx}
              onClick={() => onAreaSelect?.(tx.areaFilter)}
              className={`pt-2 first:pt-0 space-y-1 ${onAreaSelect ? 'cursor-pointer hover:bg-stone-50/80 rounded-lg p-1 -mx-1 transition-colors' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">{tx.price}</span>
                <span className="text-[11px] text-stone-400">{tx.location}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded bg-[#F4F4F5] text-[10px] font-medium text-stone-600">
                    {tx.type}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#F4F4F5] text-[10px] font-medium text-stone-600">
                    {tx.beds}
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-medium">{tx.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
