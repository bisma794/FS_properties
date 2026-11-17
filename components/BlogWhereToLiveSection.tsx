'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CityGuideItem {
  id: string | number;
  cityName: string;
  areasCount: string;
  imageSrc: string;
  href?: string;
}

interface BlogWhereToLiveSectionProps {
  tagline?: string;
  title?: string;
  description?: string;
  cities?: CityGuideItem[];
}

const defaultCities: CityGuideItem[] = [
  {
    id: 'sharjah',
    cityName: 'Sharjah',
    areasCount: '27 areas',
    imageSrc: '/sharjah.png',
    href: '/communities?city=sharjah',
  },
  {
    id: 'abu-dhabi',
    cityName: 'Abu Dhabi',
    areasCount: '18 areas',
    imageSrc: '/abudabi.png',
    href: '/communities?city=abu-dhabi',
  },
  {
    id: 'furjairah',
    cityName: 'Furjairah',
    areasCount: '22 areas',
    imageSrc: '/furjairah.png',
    href: '/communities?city=furjairah',
  },
  {
    id: 'dubai',
    cityName: 'Dubai',
    areasCount: '27 areas',
    imageSrc: '/dubai.png',
    href: '/communities?city=dubai',
  },
];

export default function BlogWhereToLiveSection({
  tagline = 'City guides',
  title = 'Where to Live',
  description = 'Explore the best areas to live across the UAE, with in-depth guides to help you find your perfect home.',
  cities = defaultCities,
}: BlogWhereToLiveSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [liveCities, setLiveCities] = React.useState<CityGuideItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('fs_page_blog');
        if (cached) {
          const parsed = JSON.parse(cached);
          const wtl = parsed?.content?.customSections?.['blog-where-to-live'];
          if (Array.isArray(wtl?.cities) && wtl.cities.length > 0) return wtl.cities;
        }
      } catch {}
    }
    return cities;
  });
  const [liveTagline, setLiveTagline] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('fs_page_blog');
        if (cached) {
          const parsed = JSON.parse(cached);
          const wtl = parsed?.content?.customSections?.['blog-where-to-live'];
          if (wtl?.tagline) return wtl.tagline;
        }
      } catch {}
    }
    return tagline;
  });
  const [liveTitle, setLiveTitle] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('fs_page_blog');
        if (cached) {
          const parsed = JSON.parse(cached);
          const wtl = parsed?.content?.customSections?.['blog-where-to-live'];
          if (wtl?.title) return wtl.title;
        }
      } catch {}
    }
    return title;
  });
  const [liveDesc, setLiveDesc] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('fs_page_blog');
        if (cached) {
          const parsed = JSON.parse(cached);
          const wtl = parsed?.content?.customSections?.['blog-where-to-live'];
          if (wtl?.description) return wtl.description;
        }
      } catch {}
    }
    return description;
  });

  React.useEffect(() => {
    fetch('/api/cms-sync?slug=blog')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const wtl = data?.page?.content?.customSections?.['blog-where-to-live'];
        if (wtl) {
          if (Array.isArray(wtl.cities) && wtl.cities.length > 0) setLiveCities(wtl.cities);
          if (wtl.tagline) setLiveTagline(wtl.tagline);
          if (wtl.title) setLiveTitle(wtl.title);
          if (wtl.description) setLiveDesc(wtl.description);
        }
      })
      .catch(() => {});
  }, []);

  const activeCities = liveCities && liveCities.length > 0 ? liveCities : cities;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 260;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full bg-[#FBFBFB] py-14 sm:py-18 lg:py-20 border-t border-[#F0ECE6]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-xl">
            {/* Tag with dot */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C8C8C]" />
              <span
                className="text-xs sm:text-[13px] text-[#767676] font-normal tracking-wide"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                {liveTagline || tagline}
              </span>
            </div>

            {/* Section Main Title */}
            <h2
              className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#141414] leading-[1.15] tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              {liveTitle || title}
            </h2>

            {/* Description */}
            <p
              className="text-xs sm:text-sm text-[#737373] leading-relaxed max-w-lg font-normal"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              {liveDesc || description}
            </p>
          </div>

          {/* Navigation Arrows (Prev / Next) */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-[#DFDAD2] bg-white flex items-center justify-center text-[#555555] hover:border-[#111111] hover:text-[#111111] hover:bg-[#F7F5F0] transition-all duration-200 shadow-2xs cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-[#DFDAD2] bg-white flex items-center justify-center text-[#555555] hover:border-[#111111] hover:text-[#111111] hover:bg-[#F7F5F0] transition-all duration-200 shadow-2xs cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards Grid / Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-4 gap-5 sm:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory"
        >
          {activeCities.map((city, cIdx) => (
            <Link
              key={city.id || cIdx}
              href={city.href || `/communities?city=${encodeURIComponent(city.cityName?.toLowerCase() || '')}`}
              className="group flex flex-col shrink-0 w-[229px] sm:w-[240px] md:w-auto snap-start"
            >
              {/* Image Container with Exact corner radius [21px] and aspect ratio / height [292px] */}
              <div
                className="relative w-full h-[292px] overflow-hidden bg-[#EFECE6] shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                style={{ borderRadius: '21px' }}
              >
                <Image
                  src={city.imageSrc}
                  alt={`${city.cityName} - ${city.areasCount}`}
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 229px, (max-width: 1024px) 25vw, 229px"
                />

                {/* Badge top-left: Areas count pill */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span
                    className="inline-block px-3 py-1 bg-white/90 backdrop-blur-md text-[11px] sm:text-xs font-normal text-[#2D2D2D] rounded-full shadow-xs"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {city.areasCount}
                  </span>
                </div>
              </div>

              {/* Bottom Label Row: City Name in Serif + Circular Arrow Icon */}
              <div className="flex items-center justify-between pt-3.5 px-1">
                <span
                  className="text-lg sm:text-xl text-[#1E1E1E] group-hover:text-[#BFA16A] transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontWeight: 500,
                  }}
                >
                  {city.cityName}
                </span>

                {/* Circular subtle arrow icon */}
                <div className="w-7 h-7 rounded-full border border-[#E5E0D8] group-hover:border-[#BFA16A] group-hover:bg-[#BFA16A] group-hover:text-white flex items-center justify-center text-[#8C8C8C] transition-all duration-200">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
