'use client';

import React from 'react';
import Image from 'next/image';

interface ScoreItem {
  label: string;
  score: number;
}

const scoreItems: ScoreItem[] = [
  { label: 'Family Living', score: 96 },
  { label: 'Passive Income', score: 81 },
  { label: 'Capital Growth', score: 90 },
  { label: 'Schools Access', score: 95 },
  { label: 'Healthcare Access', score: 88 },
  { label: 'Connectivity', score: 84 },
  { label: 'Green Space', score: 98 },
  { label: 'Developer Confidence', score: 95 },
  { label: 'Future Infrastructure', score: 91 },
  { label: 'Liquidity', score: 86 },
];

const navTabs = [
  { name: 'Overview', active: false },
  { name: 'FS Advisory Score', active: true },
  { name: 'Properties', active: false },
  { name: 'Amenities', active: false },
  { name: 'Schools', active: false },
  { name: 'Why Invest', active: false },
  { name: 'Insights', active: false },
];

interface ValleyOverviewScoreProps {
  scoreCircleImage?: string;
}

export default function ValleyOverviewScoreSection({ scoreCircleImage = '/92&.png' }: ValleyOverviewScoreProps) {
  return (
    <section className="w-full bg-white border-b border-[#E5E0D8]">
      {/* Top Navigation Tabs Header */}
      <div className="w-full border-b border-[#EEEEEE]">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full flex items-center justify-between overflow-x-auto no-scrollbar py-7 sm:py-8 gap-6 sm:gap-10">
          {navTabs.map((tab) => (
            <button
              key={tab.name}
              type="button"
              className="group relative font-poppins font-normal text-base sm:text-lg whitespace-nowrap pb-2 text-[#888888] hover:text-[#BFA16A] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              {tab.name}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#BFA16A] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: 92% Circle Image */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <Image
                src={scoreCircleImage || '/92&.png'}
                alt="Overall FS Score 92% Excellent"
                fill
                priority
                className="object-contain object-center"
              />
            </div>
          </div>

          {/* Right Side: Score Bars Breakdown in Poppins Regular */}
          <div
            className="lg:col-span-7 space-y-4 sm:space-y-5"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            {scoreItems.map((item) => (
              <div key={item.label} className="flex items-center gap-4 sm:gap-6">
                {/* Score Label */}
                <span className="w-40 sm:w-48 text-sm sm:text-base lg:text-[17px] font-normal text-[#777777] text-left">
                  {item.label}
                </span>

                {/* Progress Bar Container */}
                <div className="flex-1 h-[6px] bg-[#E5E5E5] rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-[#BFA16A] rounded-full transition-all duration-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>

                {/* Score Value */}
                <span className="w-8 text-right text-sm sm:text-base lg:text-[17px] font-normal text-[#666666]">
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
