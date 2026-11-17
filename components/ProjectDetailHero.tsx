'use client';

import React from 'react';
import Image from 'next/image';

export interface ProjectDetailHeroProps {
  onCheckAvailability?: () => void;
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  ctaText?: string;
  backgroundImage?: string;
}

export default function ProjectDetailHero({
  onCheckAvailability,
  eyebrow,
  titleLine1,
  titleLine2,
  description,
  ctaText,
  backgroundImage,
}: ProjectDetailHeroProps = {}) {
  const handleScrollToInquiry = () => {
    if (onCheckAvailability) {
      onCheckAvailability();
      return;
    }
    const inquirySection = document.getElementById('inquiry') || document.getElementById('villas-&-floorplans');
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const imageSrc = backgroundImage || '/project-detail-hero.png';
  const heading1 = titleLine1 || 'TESSERA RESIDENCES';
  const heading2 = titleLine2 || 'BY AL GHURAIR';
  const eyebrowText = eyebrow || 'LIMITED AVAILABILITY';
  const descText =
    description ||
    'Tessera is the first UAE project by Aires Mateus, offering 80 2–3BR residences with private foyers, open-air terraces and adaptable extra suites.';
  const btnText = ctaText || 'CHECK AVAILABILITY';

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9F6] min-h-[500px] sm:min-h-[560px] lg:h-[620px] xl:h-[640px] flex items-center">
      {/* Background Image Layer with soft left gradient fade */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="relative w-full h-full lg:w-[78%] xl:w-[72%]">
          <Image
            src={imageSrc}
            alt={`${heading1} ${heading2}`}
            fill
            priority
            className="object-cover object-right sm:object-[center_right] lg:object-right"
            sizes="(max-width: 1024px) 100vw, 75vw"
          />
          {/* Smooth gradient fade overlay into left text container */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/90 via-35% sm:via-42% lg:via-48% to-transparent pointer-events-none" />

          {/* Subtle mobile overlay to guarantee high contrast */}
          <div className="absolute inset-0 bg-[#FAF9F6]/50 sm:hidden pointer-events-none" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full py-14 sm:py-20 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Subtitle / Eyebrow */}
          <p
            className="text-stone-500 text-xs sm:text-[13px] font-semibold tracking-[0.25em] uppercase mb-3.5 sm:mb-4"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            {eyebrowText}
          </p>

          {/* Main Heading in 2 Lines using Cinzel */}
          <h1
            className="font-cinzel text-3xl sm:text-5xl lg:text-[54px] xl:text-[58px] tracking-[0.03em] uppercase font-normal leading-[1.12] text-[#1B2A3A]"
            style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
          >
            {heading1}
            {heading2 && <span className="block mt-1 sm:mt-2">{heading2}</span>}
          </h1>

          {/* Subtitle Description Paragraph */}
          <p
            className="text-[#525252] text-sm sm:text-[15.5px] font-normal mt-4 sm:mt-5 max-w-lg leading-[1.65]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            {descText}
          </p>

          {/* Check Availability CTA Button */}
          <div className="mt-7 sm:mt-8">
            <button
              type="button"
              onClick={handleScrollToInquiry}
              className="inline-flex items-center justify-center px-8 py-3.5 sm:px-9 sm:py-4 rounded-lg bg-[#BA955C] hover:bg-[#a6824b] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm tracking-[0.08em] uppercase transition-all duration-200 shadow-sm cursor-pointer"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              {btnText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
