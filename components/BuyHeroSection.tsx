'use client';

import React from 'react';
import Image from 'next/image';

interface BuyHeroSectionProps {
  breadcrumb?: string;
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  detailHtml?: string;
  imageSrc?: string;
}

export default function BuyHeroSection({
  breadcrumb = 'Buy / Dubai creek harbour',
  headingLine1 = 'BUY IN DUBAI',
  headingLine2 = 'WITH CLARITY',
  description,
  detailHtml,
  imageSrc = '/buy-hero.png',
}: BuyHeroSectionProps) {

  return (
    <section className="relative w-full bg-[#FAF8F5] overflow-hidden min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex items-center border-b border-[#EFECE6]">
      {/* Right Background Image Container with Soft Gradient Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[65%] h-full z-0 overflow-hidden pointer-events-none">
        <Image
          src={imageSrc}
          alt="Dubai Creek Harbour Marina and Skyline at Sunset"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 65vw"
        />

        {/* Horizontal Gradient Fade Overlay - Dissolves left edge into solid cream */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, #FAF8F5 0%, rgba(250, 248, 245, 0.95) 20%, rgba(250, 248, 245, 0.6) 45%, rgba(250, 248, 245, 0.1) 70%, transparent 100%)',
          }}
        />

        {/* Mobile/Tablet Vertical Gradient Overlay to ensure full text readability */}
        <div className="absolute inset-0 bg-[#FAF8F5]/80 sm:bg-transparent z-10 lg:hidden pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full py-14 sm:py-20 lg:py-24">
        <div className="max-w-xl text-left">
          {/* Breadcrumb / Location Tagline (Poppins Regular) */}
          <span
            className="text-xs sm:text-[13px] text-[#8C8C8C] tracking-wide block mb-3.5 sm:mb-4 select-none"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 400,
            }}
          >
            {breadcrumb}
          </span>

          {/* Main Hero Content */}
          {detailHtml ? (
            <div
              className="font-cinzel text-3xl sm:text-5xl lg:text-[54px] tracking-[0.04em] leading-[1.12] uppercase [&>h1]:text-3xl [&>h1]:sm:text-5xl [&>h1]:lg:text-[54px] [&>h1]:font-normal [&>h1]:uppercase [&>h2]:text-3xl [&>h2]:sm:text-5xl [&>h2]:font-normal [&>h2]:uppercase [&_span]:text-[#C2A468] [&>p]:text-xs [&>p]:sm:text-sm [&>p]:lg:text-[14.5px] [&>p]:text-[#737373] [&>p]:normal-case [&>p]:font-sans [&>p]:mt-5 [&>p]:leading-relaxed"
              style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
              dangerouslySetInnerHTML={{ __html: detailHtml }}
            />
          ) : (
            <>
              {/* Main Hero Heading (Cinzel Regular) */}
              <h1
                className="text-3xl sm:text-5xl lg:text-[54px] tracking-[0.04em] leading-[1.12] uppercase"
                style={{
                  fontFamily: 'var(--font-cinzel), Cinzel, serif',
                  fontWeight: 400,
                }}
              >
                {/* Line 1: Dark Navy / Slate */}
                <span className="block text-[#1B2538]">{headingLine1}</span>
                {/* Line 2: Luxury Muted Gold */}
                <span className="block text-[#C2A468] mt-1 sm:mt-1.5">{headingLine2}</span>
              </h1>

              {/* Description Text (Poppins Regular) */}
              {description ? (
                <p
                  className="text-xs sm:text-sm lg:text-[14.5px] text-[#737373] leading-relaxed max-w-md sm:max-w-lg mt-5 sm:mt-6"
                  style={{
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    fontWeight: 400,
                  }}
                >
                  {description}
                </p>
              ) : null}
            </>
          )}
        </div>
      </div>

    </section>
  );
}
