'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface RecommendedCommunityCardItem {
  id?: string;
  communityId?: string;
  name: string;
  subtitle?: string;
  matchScore?: string;
  whyFitsHeading?: string;
  whyFits?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string;
}

interface RecommendedCommunitiesSectionProps {
  heading?: string;
  tagline?: string;
  taglineLink?: string;
  cards?: RecommendedCommunityCardItem[];
}

const DEFAULT_CARDS: RecommendedCommunityCardItem[] = [
  {
    id: 'card-1',
    communityId: 'the-valley',
    name: 'The Valley',
    subtitle: 'by Emaar',
    matchScore: '96%',
    whyFitsHeading: 'Why it fits you',
    whyFits:
      'Excellent for families with children, great schools nearby, master-planned community with strong future growth potential.',
    buttonText: 'View Community',
    buttonLink: '/the-valley',
    image: '/thevalley-img.png',
  },
  {
    id: 'card-2',
    communityId: 'dubai-hills-estate',
    name: 'Dubai Hills Estate',
    subtitle: 'by Emaar',
    matchScore: '92%',
    whyFitsHeading: 'Why it fits you',
    whyFits:
      'Established community with premium infrastructure and high rental demand.',
    buttonText: 'View Community',
    buttonLink: '/compare-communities',
    image: '/dubaihillestate.png',
  },
  {
    id: 'card-3',
    communityId: 'grand-polo-club-resort',
    name: 'Grand Polo Club & Resort',
    subtitle: 'by Emaar',
    matchScore: '89%',
    whyFitsHeading: 'Why it fits you',
    whyFits:
      'Luxury lifestyle with strong capital appreciation potential and limited supply.',
    buttonText: 'View Community',
    buttonLink: '/communities',
    image: '/grandpolo.png',
  },
];

export default function RecommendedCommunitiesSection({
  heading = 'Top Recommended Communities',
  tagline = 'How we score communities',
  taglineLink = '#score-info',
  cards,
}: RecommendedCommunitiesSectionProps) {
  const displayCards = Array.isArray(cards) && cards.length > 0 ? cards : DEFAULT_CARDS;

  return (
    <div className="w-full">
      {/* Section Header */}
      <section className="w-full bg-[#F8F6F2] pt-16 md:pt-24 pb-8">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4">
          <h2
            className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#BFA16A] leading-tight max-w-md"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
          >
            {heading}
          </h2>

          {tagline && (
            <Link
              href={taglineLink}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-normal text-[#666666] hover:text-[#111111] transition-colors"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              {tagline}
              <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          )}
        </div>
      </section>

      {/* Dynamic Community Cards */}
      {displayCards.map((card, idx) => {
        const isOdd = idx % 2 === 0;
        const isLast = idx === displayCards.length - 1;
        const sectionBg = isOdd ? 'bg-[#F8F6F2]' : 'bg-white';
        const paddingBottom = isLast ? 'pb-16 md:pb-24' : '';

        return (
          <section
            key={card.id || idx}
            className={`w-full ${sectionBg} py-8 md:py-10 ${paddingBottom}`}
          >
            <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
              <div className="group relative w-full bg-white rounded-[20px] p-6 sm:p-10 lg:p-12 shadow-sm border border-[#EBEBEB]">
                {/* Top Left Badge Number */}
                <div className="absolute -top-5 left-8 sm:left-12 w-12 h-12 rounded-[10px] bg-[#858585] group-hover:bg-[#BFA16A] text-white font-bold text-xl flex items-center justify-center shadow-md transition-colors duration-300">
                  {idx + 1}
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
                            {card.name}
                          </h3>
                          {card.subtitle && (
                            <p
                              className="text-lg sm:text-xl text-[#111111] font-normal mt-1"
                              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                            >
                              {card.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Top Right Match Score */}
                        {card.matchScore && (
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
                              {card.matchScore}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Why it fits you section */}
                      {card.whyFits && (
                        <div className="mt-4 sm:mt-6">
                          <h4
                            className="text-xl sm:text-2xl font-semibold text-[#111111] mb-2 sm:mb-3"
                            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                          >
                            {card.whyFitsHeading || 'Why it fits you'}
                          </h4>
                          <p
                            className="text-lg sm:text-xl font-normal text-[#858585] leading-relaxed max-w-xl"
                            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                          >
                            {card.whyFits}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* View Community Button */}
                    {card.buttonText && (
                      <div className="mt-6 sm:mt-8">
                        <Link
                          href={card.buttonLink || '/communities'}
                          className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-[#858585] group-hover:bg-[#BFA16A] text-white font-medium text-lg rounded-[8px] transition-colors duration-300 shadow-sm"
                          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                        >
                          {card.buttonText}
                          <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Right Image Container */}
                  <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-[16px] overflow-hidden flex items-center justify-center">
                    <Image
                      src={card.image || '/thevalley-img.png'}
                      alt={`${card.name} community view`}
                      fill
                      priority={idx === 0}
                      className="object-contain object-center"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
