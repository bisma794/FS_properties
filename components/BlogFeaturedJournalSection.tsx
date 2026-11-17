'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedArticle {
  tag?: string;
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
}

interface BlogCardItem {
  id: string | number;
  title: string;
  date: string;
  category: string;
  imageSrc: string;
  href?: string;
}

interface BlogFeaturedJournalSectionProps {
  featured?: FeaturedArticle;
  articles?: BlogCardItem[];
}

const defaultFeatured: FeaturedArticle = {
  tag: 'Dubai property journal',
  title: 'Where every life finds a home',
  description: 'Guides, market updates, and neighborhood stories for buyers across the UAE.',
  imageSrc: '/dubaiproperty-journal.png',
  href: '/blog/where-every-life-finds-a-home',
};

const defaultArticles: BlogCardItem[] = [
  {
    id: 1,
    title: 'Rent to Own Properties in Dubai in 2026 – Affordable Payment Plans',
    date: 'September 01 2026',
    category: 'Real-estate',
    imageSrc: '/affordable-plans.png',
    href: '/blog/rent-to-own-properties-dubai-affordable-payment-plans',
  },
  {
    id: 2,
    title: 'Rent to Own Properties in Dubai in 2026 – Best Investment Options',
    date: 'September 01 2026',
    category: 'Real-estate',
    imageSrc: '/best-investment.png',
    href: '/blog/rent-to-own-properties-dubai-best-investment-options',
  },
  {
    id: 3,
    title: 'Buying Land in Dubai | Residential & Commercial Guide 2026',
    date: 'September 01 2026',
    category: 'Real-estate',
    imageSrc: '/buying-landin-dubai.png',
    href: '/blog/buying-land-in-dubai-residential-commercial-guide-2026',
  },
];

export default function BlogFeaturedJournalSection({
  featured = defaultFeatured,
  articles = defaultArticles,
}: BlogFeaturedJournalSectionProps) {
  return (
    <section className="w-full bg-[#FAF9F6] py-10 sm:py-14 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
        {/* Grid layout: 1 larger featured card + 3 article cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-6 items-stretch">
          {/* Featured Large Journal Card (span 5 or 4.5 cols on desktop) */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl shadow-sm min-h-[460px] sm:min-h-[500px] flex flex-col justify-end p-6 sm:p-8">
            {/* Background Image */}
            <Image
              src={featured.imageSrc}
              alt={featured.title}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />

            {/* Gradient Overlay for high text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />

            {/* Content Container */}
            <div className="relative z-20 flex flex-col justify-end">
              {/* Tag with dot */}
              {featured.tag && (
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BFA16A]" />
                  <span
                    className="text-xs sm:text-[13px] text-white/90 font-normal tracking-wide"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {featured.tag}
                  </span>
                </div>
              )}

              {/* Title */}
              <h2
                className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-white leading-[1.2] mb-3 tracking-tight"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                {featured.title}
              </h2>

              {/* Description */}
              <p
                className="text-xs sm:text-sm text-white/80 leading-relaxed font-light max-w-sm"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                {featured.description}
              </p>
            </div>
          </div>

          {/* 3 Right Blog Cards (span 7 cols on desktop: each 1 col of a 3-col subgrid) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4 lg:gap-5">
            {articles.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#ECE8E1] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
              >
                {/* Upper section: Image, Title, Meta */}
                <div>
                  {/* Card Thumbnail */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#F2EFE9]">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[14px] sm:text-[15px] font-semibold text-[#111111] leading-[1.35] line-clamp-3 mb-3.5"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {item.title}
                  </h3>

                  {/* Meta items: Date and Category */}
                  <div className="space-y-1.5 mb-5">
                    {/* Date with calendar icon */}
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#7A7A7A]">
                      <svg
                        className="w-3.5 h-3.5 text-[#8C8C8C] shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>{item.date}</span>
                    </div>

                    {/* Category with tag/price icon */}
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#7A7A7A]">
                      <svg
                        className="w-3.5 h-3.5 text-[#8C8C8C] shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V5a2 2 0 012-2z" />
                      </svg>
                      <span>{item.category}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Button: Explore More ↗ */}
                <Link
                  href={item.href || '#'}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#C2A468] hover:bg-[#b09257] text-white text-xs sm:text-[13px] font-medium transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  <span>Explore More</span>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
