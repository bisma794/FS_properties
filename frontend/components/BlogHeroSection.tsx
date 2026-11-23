'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogHeroSectionProps {
  breadcrumbHome?: string;
  breadcrumbCurrent?: string;
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  searchPlaceholder?: string;
  imageSrc?: string;
  onSearch?: (query: string) => void;
}

export default function BlogHeroSection({
  breadcrumbHome = 'Home',
  breadcrumbCurrent = 'Blogs',
  headingLine1 = 'REAL ESTATE',
  headingLine2 = 'NEWS & INSIGHTS',
  description,
  searchPlaceholder = 'Looking for Something Specific?',
  imageSrc = '/blog-hero.png',
  onSearch,
}: BlogHeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [liveHero, setLiveHero] = useState<{
    breadcrumbHome?: string;
    breadcrumbCurrent?: string;
    headingLine1?: string;
    headingLine2?: string;
    description?: string;
    searchPlaceholder?: string;
    imageSrc?: string;
  }>({});

  useEffect(() => {
    // Check localStorage cache first
    try {
      const cached = typeof window !== 'undefined' ? localStorage.getItem('fs_page_blog') : null;
      if (cached) {
        const parsed = JSON.parse(cached);
        const bh = parsed?.content?.customSections?.['blog-hero'] || parsed?.content?.hero;
        if (bh) {
          setLiveHero({
            breadcrumbHome: bh.breadcrumbHome,
            breadcrumbCurrent: bh.breadcrumbCurrent,
            headingLine1: bh.titleLine1 || bh.headingLine1,
            headingLine2: bh.titleLine2 || bh.headingLine2,
            description: bh.description || bh.subheading || bh.contentText,
            searchPlaceholder: bh.searchPlaceholder,
            imageSrc: bh.bgImage || bh.backgroundImage || bh.coverImage,
          });
        }
      }
    } catch (_) {}

    // Check cross-port cms-sync
    fetch('/api/cms-sync', { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => {
        const bh = json?.data?.pages?.blog?.content?.customSections?.['blog-hero'];
        if (bh) {
          setLiveHero({
            breadcrumbHome: bh.breadcrumbHome,
            breadcrumbCurrent: bh.breadcrumbCurrent,
            headingLine1: bh.titleLine1 || bh.headingLine1,
            headingLine2: bh.titleLine2 || bh.headingLine2,
            description: bh.description || bh.subheading || bh.contentText,
            searchPlaceholder: bh.searchPlaceholder,
            imageSrc: bh.bgImage || bh.backgroundImage || bh.coverImage,
          });
        }
      })
      .catch(() => {});
  }, []);

  const finalBreadcrumbHome = liveHero.breadcrumbHome || breadcrumbHome;
  const finalBreadcrumbCurrent = liveHero.breadcrumbCurrent || breadcrumbCurrent;
  const finalHeadingLine1 = liveHero.headingLine1 || headingLine1;
  const finalHeadingLine2 = liveHero.headingLine2 || headingLine2;
  const finalDescription = liveHero.description !== undefined ? liveHero.description : description;
  const finalSearchPlaceholder = liveHero.searchPlaceholder || searchPlaceholder;
  const finalImageSrc = liveHero.imageSrc || imageSrc;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <section className="relative w-full bg-[#FAF9F6] overflow-hidden min-h-[480px] sm:min-h-[520px] lg:min-h-[580px] flex items-center border-b border-[#EFECE6]">
      {/* Right Background Image Container with Soft Gradient Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[68%] xl:w-[65%] h-full z-0 overflow-hidden pointer-events-none">
        {finalImageSrc.startsWith('data:') || finalImageSrc.startsWith('http') ? (
          <img
            src={finalImageSrc}
            alt="Dubai Skyline Waterfront and Palm Trees Promenade at Sunset"
            className="w-full h-full object-cover object-center lg:object-[center_right]"
          />
        ) : (
          <Image
            src={finalImageSrc}
            alt="Dubai Skyline Waterfront and Palm Trees Promenade at Sunset"
            fill
            priority
            className="object-cover object-center lg:object-[center_right]"
            sizes="(max-width: 1024px) 100vw, 68vw"
          />
        )}

        {/* Soft horizontal gradient overlay to blend into the left cream background */}
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
          style={{
            background:
              'linear-gradient(90deg, #FAF9F6 0%, rgba(250, 249, 246, 0.95) 18%, rgba(250, 249, 246, 0.65) 42%, rgba(250, 249, 246, 0.15) 70%, transparent 100%)',
          }}
        />

        {/* Mobile/Tablet Overlay for readability */}
        <div className="absolute inset-0 bg-[#FAF9F6]/85 sm:bg-[#FAF9F6]/70 lg:hidden z-10 pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full py-14 sm:py-20 lg:py-24">
        <div className="max-w-xl text-left">
          {/* Breadcrumbs: Home / Blogs */}
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5">
            <ol className="flex items-center gap-1.5 text-xs sm:text-[13px] text-[#8C8C8C]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#BFA16A] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {finalBreadcrumbHome}
                </Link>
              </li>
              <li className="text-[#8C8C8C] select-none">/</li>
              <li
                className="text-[#666666] font-medium"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                {finalBreadcrumbCurrent}
              </li>
            </ol>
          </nav>

          {/* Hero Heading in Cinzel Serif */}
          <h1
            className="text-3xl sm:text-5xl lg:text-[54px] tracking-[0.04em] leading-[1.14] uppercase"
            style={{
              fontFamily: 'var(--font-cinzel), Cinzel, serif',
              fontWeight: 400,
            }}
          >
            {/* Dark Slate / Navy */}
            <span className="block text-[#1B2538]">{finalHeadingLine1}</span>
            {/* Luxury Gold / Mustard Accent */}
            <span className="block text-[#BFA16A] mt-1 sm:mt-1.5">{finalHeadingLine2}</span>
          </h1>

          {/* Subtitle / Description in Poppins */}
          {finalDescription ? (
            <p
              className="text-xs sm:text-sm lg:text-[14.5px] text-[#6E6E6E] leading-relaxed max-w-md sm:max-w-lg mt-4 sm:mt-5 font-normal"
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              }}
            >
              {finalDescription}
            </p>
          ) : null}

          {/* Search Box with Search Icon and Rounded Border */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-7 sm:mt-8 max-w-md w-full"
          >
            <div className="relative flex items-center bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl border border-[#E5E0D8] shadow-sm hover:border-[#BFA16A]/60 focus-within:border-[#BFA16A] focus-within:ring-1 focus-within:ring-[#BFA16A]/20 transition-all duration-200 px-4 py-3 sm:py-3.5">
              {/* Search Icon */}
              <svg
                className="w-4 h-4 text-[#8C8C8C] shrink-0 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={finalSearchPlaceholder}
                className="w-full bg-transparent text-xs sm:text-sm text-[#1B2538] placeholder-[#8C8C8C] focus:outline-none font-normal"
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
