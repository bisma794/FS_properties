'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AboutUsHeroProps {
  title?: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

export default function AboutUsHero({
  title = 'ABOUT\nFS ADVISORY',
  subheading = "We don't sell properties. We build strategies.",
  ctaText = 'Get Strategic Advice',
  ctaLink = '/ai-assessment',
  backgroundImage = '/about_us_hero.jpg',
}: AboutUsHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9F6] h-[550px] flex items-center">
      {/* Background Image Layer with soft gradient overlay */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="relative w-full h-full lg:w-[75%] xl:w-[70%]">
          <Image
            src={backgroundImage || '/about_us_hero.jpg'}
            alt="FS Real Estate Advisory Office"
            fill
            priority
            className="object-cover object-center lg:object-left-top"
            sizes="(max-width: 1024px) 100vw, 75vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/85 via-35% sm:via-45% to-transparent" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full py-12 lg:py-20">
        <div className="max-w-xl lg:max-w-2xl">
          <h1
            className="text-3xl sm:text-5xl lg:text-[56px] tracking-[0.03em] uppercase font-normal leading-[1.15] text-[#111111] whitespace-pre-line"
            style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
          >
            {title}
          </h1>

          <p
            className="text-[#555555] text-lg sm:text-xl font-light mt-5 tracking-wide max-w-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            {subheading}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href={ctaLink || '/ai-assessment'}
              className="px-8 py-3.5 bg-[#C5A267] text-white rounded-lg font-medium text-sm hover:bg-[#b59257] transition-colors shadow-sm flex items-center justify-center gap-2"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              <span>{ctaText || 'Get Strategic Advice'}</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
