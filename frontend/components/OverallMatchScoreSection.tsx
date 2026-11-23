'use client';

import React from 'react';

export interface OverallMatchScoreProps {
  heading?: string;
  matchScore?: string | number;
  matchLabel?: string;
  // 4 Axis Numbers & Labels
  familyLivingScore?: string | number;
  familyLivingLabel?: string;
  passiveIncScore?: string | number;
  passiveIncLabel?: string;
  capitalGrowthScore?: string | number;
  capitalGrowthLabel?: string;
  lifestyleScore?: string | number;
  lifestyleLabel?: string;
  // Radar Icon / Image asset & size
  iconUrl?: string;
  iconSize?: number | string; // in px, e.g. 340
}

export default function OverallMatchScoreSection({
  heading = 'Overall Match Score',
  matchScore = '96%',
  matchLabel = 'Excellent Match',
  familyLivingScore = '96',
  familyLivingLabel = 'Family Living',
  passiveIncScore = '81',
  passiveIncLabel = 'Passive Inc',
  capitalGrowthScore = '90',
  capitalGrowthLabel = 'Capital Growth',
  lifestyleScore = '93',
  lifestyleLabel = 'Lifestyle',
  iconUrl = '/Layer_1 (3).png',
  iconSize = 340,
}: OverallMatchScoreProps) {
  // Format score to ensure % sign if not present
  const displayScore =
    typeof matchScore === 'number'
      ? `${matchScore}%`
      : matchScore.includes('%')
      ? matchScore
      : `${matchScore}%`;

  const sizeNum = typeof iconSize === 'number' ? iconSize : parseInt(String(iconSize), 10) || 340;

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Side - Match Score Card */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Heading in Playfair Display Medium */}
            <h2
              className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#BFA16A] leading-tight mb-5"
              style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
            >
              {heading}
            </h2>

            {/* Score Box */}
            <div className="w-[280px] sm:w-[320px] h-[140px] sm:h-[150px] bg-white rounded-[12px] border border-[#E0E0E0] shadow-sm flex items-center justify-center mb-6">
              <span
                className="text-7xl sm:text-8xl lg:text-[88px] font-bold text-[#111111] tracking-tight"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                {displayScore}
              </span>
            </div>

            {/* Match Label in Poppins */}
            <p
              className="text-xl sm:text-2xl font-normal text-[#111111]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              {matchLabel}
            </p>
          </div>

          {/* Right Side - Radar Chart with 4 Axis Labels */}
          <div className="relative w-full max-w-[580px] flex items-center justify-center p-8 sm:p-14">
            {/* Top Label: Family Living */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-3 whitespace-nowrap z-10">
              <span
                className="text-3xl sm:text-4xl font-bold text-[#111111]"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                {familyLivingScore}
              </span>
              <span
                className="text-2xl sm:text-3xl font-medium text-[#111111]"
                style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
              >
                {familyLivingLabel}
              </span>
            </div>

            {/* Right Label: Passive Inc */}
            <div className="absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center whitespace-nowrap z-10">
              <span
                className="text-2xl sm:text-3xl font-medium text-[#111111]"
                style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
              >
                {passiveIncLabel}
              </span>
              <span
                className="text-3xl sm:text-4xl font-bold text-[#111111] mt-1"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                {passiveIncScore}
              </span>
            </div>

            {/* Bottom Label: Capital Growth */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-3 whitespace-nowrap z-10">
              <span
                className="text-3xl sm:text-4xl font-bold text-[#111111]"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                {capitalGrowthScore}
              </span>
              <span
                className="text-2xl sm:text-3xl font-medium text-[#111111]"
                style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
              >
                {capitalGrowthLabel}
              </span>
            </div>

            {/* Left Label: Lifestyle */}
            <div className="absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center whitespace-nowrap z-10">
              <span
                className="text-2xl sm:text-3xl font-medium text-[#111111]"
                style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
              >
                {lifestyleLabel}
              </span>
              <span
                className="text-3xl sm:text-4xl font-bold text-[#111111] mt-1"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                {lifestyleScore}
              </span>
            </div>

            {/* Radar Chart Center Icon/Image with Custom Dynamic Size */}
            <div
              className="my-6 flex items-center justify-center transition-all duration-300"
              style={{
                width: `${sizeNum}px`,
                height: `${sizeNum}px`,
                maxWidth: '100%',
              }}
            >
              <img
                src={iconUrl || '/Layer_1 (3).png'}
                alt="Match Score Radar Chart Diagram"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/Layer_1 (3).png';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
