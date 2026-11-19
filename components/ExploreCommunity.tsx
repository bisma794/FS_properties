'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import OffPlanGuideSection from '@/components/OffPlanGuideSection';

interface CommunityItem {
  name: string;
  icon: string;
  href?: string;
}

const defaultCommunities: CommunityItem[] = [
  {
    name: 'Dubai Hills Estate',
    icon: '/dubai_hills.png',
    href: '/communities/dubai-hills-estate',
  },
  {
    name: 'The Valley',
    icon: '/valleyicon.png',
    href: '/the-valley',
  },
  {
    name: 'Dubai Creek Harbour',
    icon: '/creekicon.png',
    href: '/communities/dubai-creek-harbour',
  },
  {
    name: 'The Oasis',
    icon: '/oasisicon.png',
    href: '/communities/the-oasis',
  },
  {
    name: 'Palm Jumeirah',
    icon: '/palmjumeriah icon.png',
    href: '/communities/palm-jumeirah',
  },
  {
    name: 'Arabian Ranches III',
    icon: '/arabian 3 icon.png',
    href: '/communities/arabian-ranches-iii',
  },
];

interface ExploreCommunityProps {
  initialData?: any;
}

export default function ExploreCommunity({ initialData }: ExploreCommunityProps = {}) {
  const [heading, setHeading] = useState(() => initialData?.heading !== undefined ? initialData.heading : 'Explore by Community');
  const [tagline, setTagline] = useState(() => initialData?.tagline !== undefined ? initialData.tagline : 'FEATURED DISTRICTS');
  const [description, setDescription] = useState(() => initialData?.description ?? initialData?.contentText ?? '');
  const [items, setItems] = useState<CommunityItem[]>(() => {
    if (Array.isArray(initialData?.items) && initialData.items.length > 0) {
      return initialData.items;
    }
    return defaultCommunities;
  });

  const applyCommData = (comm: any) => {
    if (!comm) return;
    if (comm.heading !== undefined) setHeading(comm.heading);
    if (comm.tagline !== undefined || comm.badge !== undefined) setTagline(comm.tagline ?? comm.badge ?? '');
    if (comm.description !== undefined || comm.contentText !== undefined) {
      setDescription(comm.description ?? comm.contentText ?? '');
    }
    if (Array.isArray(comm.items) && comm.items.length > 0) {
      setItems(comm.items);
    }
  };

  useEffect(() => {
    // 1. Fetch live data from /api/cms-sync
    fetch('/api/cms-sync', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        const home = json?.data?.pages?.home || json?.data?.pages?.homepage;
        if (home?.content?.community) {
          applyCommData(home.content.community);
        }
      })
      .catch(() => {});

    // 2. Storage listener for cross-tab sync
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'fs_page_home' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          applyCommData(parsed?.content?.community);
        } catch (_) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        {/* Heading */}
        <div className="mb-12">
          {tagline && (
            <span className="block text-xs font-semibold text-[#BFA16A] tracking-[0.2em] uppercase mb-2">
              {tagline}
            </span>
          )}
          <h2
            className="font-playfair text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#171717]"
            style={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif' }}
          >
            {heading}
          </h2>
          {description && (
            <p className="font-poppins font-light text-sm sm:text-base text-[#737373] mt-3 max-w-xl">
              {description}
            </p>
          )}
        </div>

        {/* Communities Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
          {items.map((item) => {
            const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const targetHref = item.href && item.href !== '#' ? item.href : slug === 'the-valley' ? '/the-valley' : `/communities/${slug}`;
            return (
              <Link
                key={item.name}
                href={targetHref}
                className="group flex flex-col items-center text-center cursor-pointer transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Circle Container with F8F6F2 background */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F8F6F2] rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-[#f2ece2]">
                  <Image
                    src={item.icon || '/dubai_hills.png'}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-200 group-hover:scale-110"
                  />
                </div>

                {/* Title */}
                <span
                  className="mt-4 font-inter font-semibold text-xs sm:text-sm text-[#171717] max-w-[130px] leading-tight group-hover:text-[#BFA16A] transition-colors"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* AI Assessment Banner Container */}
        <div className="mt-16 sm:mt-20 w-full min-h-[430px] lg:h-[430px] bg-[#F8F6F2] rounded-2xl overflow-hidden relative flex flex-col lg:flex-row items-center justify-between px-8 sm:px-12 lg:px-16 py-10 lg:py-0 gap-8">
          {/* Left Text Content */}
          <div className="max-w-xl z-10 py-4">
            <h3
              className="font-playfair font-light text-3xl sm:text-4xl lg:text-[46px] leading-[1.2]"
              style={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif' }}
            >
              <span className="block text-[#171717]">Not Sure</span>
              <span className="block text-[#BFA16A] mt-1">Where To Start?</span>
            </h3>

            <p
              className="font-poppins font-light text-[#858585] text-sm sm:text-base leading-relaxed mt-4 max-w-md"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              Let our AI engine analyze thousands of data points to find what’s best for you.
            </p>

            <div className="mt-8">
              <Link
                href="/ai-assessment"
                className="inline-block font-poppins font-normal text-xs sm:text-sm tracking-wider uppercase px-7 py-3.5 bg-[#BFA16A] hover:bg-[#aa8e59] text-white rounded-lg shadow-sm transition-all duration-200 cursor-pointer text-center"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                START AI ASSESMENT
              </Link>
            </div>
          </div>

          {/* Right Corner Image */}
          <div className="relative w-full lg:w-[50%] h-[260px] sm:h-[340px] lg:h-full flex items-center justify-end z-0">
            <div className="relative w-full h-full max-h-[380px]">
              <Image
                src="/banner_img.png"
                alt="AI Assessment Preview"
                fill
                priority
                className="object-contain object-center lg:object-right"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Off-Plan Guide Information Section */}
        <OffPlanGuideSection />
      </div>
    </section>
  );
}
