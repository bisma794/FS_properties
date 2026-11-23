'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface HeroContent {
  heading?: string;
  mainHeading?: string;
  title?: string;
  tagline?: string;
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  titleLine3?: string;
  subheading?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  coverImage?: string;
  bgImage?: string;
}

interface HeroSectionProps {
  initialData?: HeroContent;
}

export default function HeroSection({ initialData }: HeroSectionProps = {}) {
  const [heroData, setHeroData] = useState<HeroContent>(() => {
    // If initialData is provided from SSR (from .cms-sync.json / MySQL), respect it directly
    if (initialData && Object.keys(initialData).length > 0) {
      return initialData;
    }
    return {
      titleLine1: 'DISCOVER THE',
      titleLine2: 'RIGHT PROPERTY',
      titleLine3: 'OPPORTUNITY.',
      subheading: 'Curated opportunities. Intelligent insights. Aligned with your goals.',
      primaryCtaText: 'Start AI Assessment',
      primaryCtaLink: '/ai-assessment',
      secondaryCtaText: 'Browse Opportunities',
      secondaryCtaLink: '/the-valley',
      backgroundImage: '/buy_hero.png',
    };
  });

  useEffect(() => {
    // 1. Fetch live page sync from internal /api/cms-sync (reliable across all hostnames/LAN)
    const fetchSyncedData = async () => {
      try {
        const res = await fetch('/api/cms-sync', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          const page = json?.data?.pages?.home || json?.data?.pages?.homepage;
          if (page?.content?.hero) {
            setHeroData(page.content.hero);
          }
        }
      } catch (_) {}
    };

    fetchSyncedData();

    // 2. Listen for storage changes across tabs / windows during live editing
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'fs_hero_home' || e.key === 'fs_page_home') {
        try {
          if (e.key === 'fs_hero_home' && e.newValue) {
            setHeroData(JSON.parse(e.newValue));
          } else if (e.key === 'fs_page_home' && e.newValue) {
            const parsed = JSON.parse(e.newValue);
            if (parsed?.content?.hero) {
              setHeroData(parsed.content.hero);
            }
          }
        } catch (_) {}
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Derive title lines intelligently:
  const rawHeading = heroData.mainHeading !== undefined ? heroData.mainHeading : (heroData.heading !== undefined ? heroData.heading : heroData.title);
  let line1 = heroData.titleLine1 !== undefined ? heroData.titleLine1 : '';
  let line2 = heroData.titleLine2 !== undefined ? heroData.titleLine2 : '';
  let line3 = heroData.titleLine3 !== undefined ? heroData.titleLine3 : '';

  // If user explicitly left heading empty in CMS (empty string)
  const isExplicitlyCleared = rawHeading !== undefined && rawHeading.trim() === '';

  if (rawHeading && rawHeading.trim() !== '') {
    const rawTrimmed = rawHeading.trim();
    const combinedCurrent = [line1, line2, line3].filter(Boolean).join(' ').trim();
    if (!line1 && !line2 && !line3) {
      const words = rawTrimmed.split(/\s+/).filter(Boolean);
      if (words.length <= 1) {
        line1 = rawTrimmed;
      } else if (words.length === 2) {
        line1 = words[0];
        line2 = words[1];
      } else if (words.length <= 4) {
        line1 = words[0];
        line2 = words.slice(1, -1).join(' ');
        line3 = words[words.length - 1];
      } else {
        line1 = words.slice(0, 2).join(' ');
        line2 = words.slice(2, 4).join(' ');
        line3 = words.slice(4).join(' ');
      }
    } else if (rawTrimmed !== combinedCurrent) {
      const words = rawTrimmed.split(/\s+/).filter(Boolean);
      if (words.length >= 5) {
        line1 = words.slice(0, 2).join(' ');
        line2 = words.slice(2, 4).join(' ');
        line3 = words.slice(4).join(' ');
      } else if (words.length >= 3) {
        line1 = words[0];
        line2 = words.slice(1, -1).join(' ');
        line3 = words[words.length - 1];
      } else if (words.length === 2) {
        line1 = words[0];
        line2 = words[1];
        line3 = '';
      } else {
        line1 = rawTrimmed;
        line2 = '';
        line3 = '';
      }
    }
  } else if (isExplicitlyCleared) {
    line1 = '';
    line2 = '';
    line3 = '';
  }

  const subheading =
    heroData.subheading !== undefined && heroData.subheading !== null
      ? heroData.subheading
      : heroData.tagline !== undefined && heroData.tagline !== null
      ? heroData.tagline
      : '';

  const primaryText = heroData.primaryCtaText !== undefined ? heroData.primaryCtaText : 'Start AI Assessment';
  const primaryLink = heroData.primaryCtaLink || '/ai-assessment';
  const secondaryText = heroData.secondaryCtaText !== undefined ? heroData.secondaryCtaText : 'Browse Opportunities';
  const secondaryLink = heroData.secondaryCtaLink || '/opportunities';
  const bgImage = heroData.backgroundImage || heroData.coverImage || heroData.bgImage || '/buy_hero.png';

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9F6] h-[600px] flex items-center">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="relative w-full h-full lg:w-[70%] xl:w-[65%]">
          <Image
            src={bgImage}
            alt="Dubai Skyline Hero Poster"
            fill
            priority
            className="object-cover object-right lg:object-center"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
          {/* Soft overlay gradient fading from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/80 via-30% sm:via-40% to-transparent" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full py-12 lg:py-20">
        <div className="max-w-xl xl:max-w-2xl">
          {/* Main Heading */}
          <h1
            className="font-cinzel text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] tracking-[0.04em] uppercase font-normal leading-[1.15] text-[#111111]"
            style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
          >
            {line1 && <span className="block text-[#111111]">{line1}</span>}
            {line2 && <span className="block text-[#BFA16A] my-1">{line2}</span>}
            {line3 && <span className="block text-[#111111]">{line3}</span>}
          </h1>

          {/* Divider Line */}
          <div className="w-full my-6 sm:my-8 border-t border-[#E5E0D8]" />

          {/* Subtitle / Content */}
          {subheading ? (
            <p
              className="font-poppins font-light text-[#858585] text-sm sm:text-base lg:text-lg tracking-normal leading-relaxed"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              {subheading}
            </p>
          ) : null}

          {/* Action Buttons */}
          {(primaryText || secondaryText) && (
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {primaryText && (
                <Link
                  href={primaryLink}
                  className="px-7 py-3.5 bg-[#BFA16A] hover:bg-[#aa8e59] text-white font-poppins text-sm sm:text-base font-medium rounded-lg shadow-[0_4px_14px_rgba(191,161,106,0.35)] transition-all duration-200 cursor-pointer active:scale-[0.99] text-center"
                >
                  {primaryText}
                </Link>
              )}
              {secondaryText && (
                <Link
                  href={secondaryLink}
                  className="px-7 py-3.5 bg-white hover:bg-gray-50 text-[#333333] font-poppins text-sm sm:text-base font-medium rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-200 cursor-pointer active:scale-[0.99] text-center"
                >
                  {secondaryText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Slider / Carousel Navigation Control */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden sm:flex">
        <button
          type="button"
          aria-label="Next slide"
          className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/50 border border-white/40 flex items-center justify-center text-white transition-all cursor-pointer shadow-sm"
        >
          <svg
            className="w-5 h-5 text-white stroke-[2.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </section>
  );
}
