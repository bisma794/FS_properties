'use client';

import Image from 'next/image';

interface AIAssessmentHeroProps {
  headingWord1?: string;
  headingWord2?: string;
  headingWord3?: string;
  subheading?: string;
  detailHtml?: string;
  backgroundImage?: string;
}

export default function AIAssessmentHero({
  headingWord1 = 'AI ADVISORY',
  headingWord2 = 'ENGINE',
  headingWord3,
  subheading,
  detailHtml,
  backgroundImage = '/ai_engine_hero.jpg',
}: AIAssessmentHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9F6] h-[600px] flex items-center">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="relative w-full h-full lg:w-[70%] xl:w-[65%]">
          <Image
            src={backgroundImage}
            alt="AI Advisory Engine Hero Poster"
            fill
            priority
            className="object-cover object-right lg:object-center"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
          {/* Soft overlay gradient fading from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/85 via-30% sm:via-40% to-transparent" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full py-16 lg:py-24">
        <div className="max-w-xl xl:max-w-2xl">
          <h1
            className="font-cinzel text-4xl sm:text-6xl lg:text-[64px] xl:text-[72px] tracking-[0.04em] uppercase font-normal leading-[1.12]"
            style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
          >
            <span className="block text-[#111111]">{headingWord1}</span>
            <span className="block text-[#BFA16A] mt-2">{headingWord2}</span>
            {headingWord3 && (
              <span className="block text-[#111111] mt-2">{headingWord3}</span>
            )}
          </h1>
          {subheading && (
            <p className="font-poppins text-sm sm:text-base text-[#666666] mt-4 max-w-lg leading-relaxed">
              {subheading}
            </p>
          )}
        </div>
      </div>



      {/* Right Slider Navigation Control */}
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
