'use client';

import Image from 'next/image';

interface TheValleyHeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function TheValleyHero({
  title = 'THE VALLEY',
  subtitle,
  backgroundImage = '/valley_hero.png',
}: TheValleyHeroProps) {
  const words = (title || 'RECOMMENDATION RESULT').trim().split(/\s+/);
  const word1 = words.length > 1 ? words[0] : '';
  const word2 = words.length > 1 ? words.slice(1).join(' ') : title;

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9F6] h-[520px] lg:h-[600px] flex items-center">
      {/* Background Image Layer with soft left gradient fade */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="relative w-full h-full lg:w-[75%] xl:w-[70%]">
          <Image
            src={backgroundImage}
            alt={`${title} background`}
            fill
            priority
            className="object-cover object-center lg:object-left-top"
            sizes="(max-width: 1024px) 100vw, 75vw"
          />

          {/* Soft white gradient overlay blending into left text area */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/85 via-35% sm:via-45% to-transparent" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full py-12 lg:py-20">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Main Heading in Cinzel Regular */}
          <h1
            className="font-cinzel text-3xl sm:text-5xl lg:text-[56px] tracking-[0.04em] uppercase font-normal leading-[1.12]"
            style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
          >
            {word1 && <span className="block text-[#111111]">{word1}</span>}
            <span className="block text-[#BFA16A] mt-1">{word2}</span>
          </h1>

          {/* Subtitle Content in Poppins Regular */}
          {subtitle && (
            <p
              className="text-[#777777] text-xl sm:text-2xl font-normal mt-3 sm:mt-4 tracking-wide"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              {subtitle}
            </p>
          )}

        </div>
      </div>

      {/* Right Arrow Navigation Button */}
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
