'use client';

import Image from 'next/image';

interface AdvisoryReportHeroProps {
  title?: string;
  tagline?: string;
  description?: string;
  backgroundImage?: string;
}

export default function AdvisoryReportHero({
  title = 'YOUR ADVISORY REPORT',
  tagline,
  description = 'Based on your goals and preferences',
  backgroundImage = '/advisory_hero.png',
}: AdvisoryReportHeroProps) {
  // Split title if it contains multiple words to give stylish two-tone Cinzel styling
  const words = title.trim().split(/\s+/);
  const firstWord = words.length > 1 ? words[0] : '';
  const restWords = words.length > 1 ? words.slice(1).join(' ') : title;

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9F6] h-[550px] lg:h-[620px] flex items-center">
      {/* Background Image Layer with soft left gradient fade */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="relative w-full h-full lg:w-[72%] xl:w-[68%]">
          <Image
            src={backgroundImage}
            alt="Your Advisory Report background"
            fill
            priority
            className="object-cover object-center lg:object-left-top"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
          {/* Soft white gradient overlay blending into left text area */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/80 via-35% sm:via-45% to-transparent" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full py-12 lg:py-20">
        <div className="max-w-xl lg:max-w-2xl">
          {tagline && (
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#BFA16A] mb-3">
              {tagline}
            </span>
          )}

          {/* Main Heading in Cinzel */}
          <h1
            className="font-cinzel text-3xl sm:text-5xl lg:text-[52px] xl:text-[60px] tracking-[0.03em] uppercase font-normal leading-[1.15]"
            style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
          >
            {firstWord && <span className="block text-[#111111]">{firstWord}</span>}
            <span className="block text-[#BFA16A] mt-1">{restWords}</span>
          </h1>

          {/* Subtitle Content in Poppins */}
          {description && (
            <p
              className="text-[#666666] text-lg sm:text-xl lg:text-2xl font-light mt-4 sm:mt-6 tracking-wide"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
