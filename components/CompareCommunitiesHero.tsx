'use client';

import Image from 'next/image';

interface CompareCommunitiesHeroProps {
  title?: string;
  subtitle?: string;
  bgImage?: string;
}

export default function CompareCommunitiesHero({
  title = 'COMPARE\nCOMMUNITIES',
  subtitle,
  bgImage = '/compare-comm-hero.png',
}: CompareCommunitiesHeroProps) {
  const titleLines = (title || 'COMPARE\nCOMMUNITIES').split('\n');

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9F6] h-[550px] flex items-center">
      {/* Background Image Layer with soft gradient fade from left */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="relative w-full h-full lg:w-[75%] xl:w-[70%]">
          <Image
            src={bgImage || '/compare-comm-hero.png'}
            alt="Compare Communities Hero"
            fill
            priority
            className="object-cover object-center lg:object-left-top"
            sizes="(max-width: 1024px) 100vw, 75vw"
          />
          {/* Gradient overlay to blend left side smoothly with solid background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/85 via-35% sm:via-45% to-transparent" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full py-12 lg:py-20">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Heading in Cinzel Regular */}
          <h1
            className="text-3xl sm:text-5xl lg:text-[56px] tracking-[0.03em] uppercase font-normal leading-[1.15] text-[#111111]"
            style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
          >
            {titleLines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Subtitle / Content in Inter Light */}
          {subtitle ? (
            <p
              className="text-[#555555] text-lg sm:text-xl font-light mt-5 tracking-wide max-w-lg"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      {/* Navigation Arrow on right */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden sm:flex">
        <button
          type="button"
          aria-label="Next slide"
          className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md hover:bg-white/60 border border-white/50 flex items-center justify-center text-white transition-all cursor-pointer shadow-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
