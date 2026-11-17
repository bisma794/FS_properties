'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HighlightItem {
  icon?: string;
  title: string;
  description: string;
}

interface ValleyHighlightsProps {
  highlights?: HighlightItem[];
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
}

export default function ValleyHighlightsSection({
  highlights: customHighlights,
  primaryBtnText = 'View Available Properties',
  primaryBtnLink = '/property-detail',
  secondaryBtnText = 'Compare Community',
  secondaryBtnLink = '/compare-communities',
}: ValleyHighlightsProps) {
  const defaultHighlights = [
    {
      icon: '/families.png',
      title: 'Great for families',
      description: 'Parks, schools &\nfamily amenities',
    },
    {
      icon: '/fs score.png',
      title: 'Strong growth',
      description: 'High demand area with\nfuture infrastructure',
    },
    {
      icon: '/exp guidance.png',
      title: 'Trusted developer',
      description: "Emaar's proven\ntrack record",
    },
  ];

  const highlights = customHighlights && customHighlights.length > 0 ? customHighlights : defaultHighlights;

  // Helper to render icon (custom SVG code or image URL)
  const renderIcon = (iconSrc?: string) => {
    const src = iconSrc || '/families.png';
    if (src.includes('<') && src.includes('>')) {
      return (
        <svg
          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-[#BFA16A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          dangerouslySetInnerHTML={{ __html: src }}
        />
      );
    }
    return (
      <Image
        src={src}
        alt="Highlight Icon"
        width={64}
        height={64}
        className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
      />
    );
  };

  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20 border-t border-[#EDE8E1]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 flex flex-col gap-10 sm:gap-12">
        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 w-full items-start">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 sm:gap-5">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex-shrink-0 flex items-start justify-center pt-1">
                {renderIcon(item.icon)}
              </div>
              <div className="flex flex-col">
                <h3
                  className="text-[24px] sm:text-[32px] lg:text-[42px] font-semibold text-[#1A1A1A] leading-[1.15]"
                  style={{
                    fontFamily: 'var(--font-playfair), Playfair Display, serif',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[15px] sm:text-[18px] lg:text-[22px] font-normal text-[#8C8C8C] mt-2 whitespace-pre-line leading-[1.35]"
                  style={{
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons Row - Full Width Aligned Left and Right */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full pt-2">
          {/* Primary View Available Properties Button */}
          {primaryBtnText && (
            <Link
              href={primaryBtnLink || '/property-detail'}
              className="w-full py-4 sm:py-4.5 px-6 sm:px-8 bg-[#BA9864] hover:bg-[#a98653] text-white rounded-[6px] font-medium text-[15px] sm:text-[16px] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] min-h-[54px] sm:min-h-[58px]"
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              }}
            >
              <span>{primaryBtnText}</span>
              <span className="text-xl leading-none">&rarr;</span>
            </Link>
          )}

          {/* Secondary Compare Community Button */}
          {secondaryBtnText && (
            <Link
              href={secondaryBtnLink || '/compare-communities'}
              className="w-full py-4 sm:py-4.5 px-6 sm:px-8 bg-[#EBEBEB] hover:bg-[#dedede] text-[#1A1A1A] border border-[#D5D5D5] rounded-[6px] font-medium text-[15px] sm:text-[16px] transition-all flex items-center justify-center cursor-pointer active:scale-[0.99] min-h-[54px] sm:min-h-[58px]"
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              }}
            >
              <span>{secondaryBtnText}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
