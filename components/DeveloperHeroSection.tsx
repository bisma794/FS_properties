'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface DeveloperHeroSectionProps {
  breadcrumb?: string;
  headingWord1?: string;
  headingWord2?: string;
  description?: string;
  imageSrc?: string;
  pageSlug?: string;
}

export default function DeveloperHeroSection({
  breadcrumb = 'Developer / Dubai creek harbour',
  headingWord1 = 'ALL',
  headingWord2 = 'DEVELOPERS',
  description,
  imageSrc = '/developer-hero.png',
  pageSlug,
}: DeveloperHeroSectionProps) {
  const [liveHero, setLiveHero] = useState<{
    breadcrumb?: string;
    word1?: string;
    word2?: string;
    desc?: string;
    img?: string;
  }>({});

  useEffect(() => {
    if (pageSlug !== 'developers') return;
    fetch('/api/cms-sync', { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => {
        const devHero = json?.data?.pages?.developers?.content?.customSections?.['dev-hero'];
        if (devHero) {
          const words = (devHero.title || 'ALL DEVELOPERS').trim().split(/\s+/);
          setLiveHero({
            breadcrumb: devHero.tagline,
            word1: words[0],
            word2: words.slice(1).join(' '),
            desc: devHero.contentText,
            img: devHero.bgImage,
          });
        }
      })
      .catch(() => {});
  }, [pageSlug]);

  const finalBreadcrumb = liveHero.breadcrumb || breadcrumb;
  const finalWord1 = liveHero.word1 || headingWord1;
  const finalWord2 = liveHero.word2 || headingWord2;
  const finalDesc = liveHero.desc || description;
  const finalImg = liveHero.img || imageSrc;

  return (
    <section className="relative w-full bg-[#FAF8F5] overflow-hidden min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex items-center border-b border-[#EFECE6]">
      {/* Right Background Image Container with Soft Gradient Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[65%] h-full z-0 overflow-hidden pointer-events-none">
        {finalImg.startsWith('data:') || finalImg.startsWith('http') ? (
          <img
            src={finalImg}
            alt="Dubai Creek Harbour Modern Waterfront and Skyline"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <Image
            src={finalImg}
            alt="Dubai Creek Harbour Modern Waterfront and Skyline"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 65vw"
          />
        )}

        {/* Horizontal Gradient Fade Overlay - Dissolves left edge smoothly into solid cream background */}
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
          {/* Breadcrumb (Developer / Dubai creek harbour) */}
          <span
            className="text-xs sm:text-[13px] text-[#8C8C8C] tracking-wide block mb-3.5 sm:mb-4 select-none"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 400,
            }}
          >
            {finalBreadcrumb}
          </span>

          {/* Main Hero Heading (Cinzel Regular) */}
          <h1
            className="text-3xl sm:text-5xl lg:text-[54px] tracking-[0.04em] leading-[1.12] uppercase"
            style={{
              fontFamily: 'var(--font-cinzel), Cinzel, serif',
              fontWeight: 400,
            }}
          >
            <span className="text-[#1B2538]">{finalWord1} </span>
            <span className="text-[#C2A468]">{finalWord2}</span>
          </h1>

          {/* Description Text (Poppins Regular) */}
          {finalDesc ? (
            <p
              className="text-xs sm:text-sm lg:text-[14.5px] text-[#737373] leading-relaxed max-w-md sm:max-w-lg mt-5 sm:mt-6"
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontWeight: 400,
              }}
            >
              {finalDesc}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
