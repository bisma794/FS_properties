'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const defaultFeatures: FeatureItem[] = [
  {
    id: 'ai-advisory',
    icon: '/ai.png',
    title: 'AI Advisory Engine',
    description: 'Personalized recommendations based on your goals.',
  },
  {
    id: 'fs-scores',
    icon: '/fs score.png',
    title: 'FS Advisory Scores',
    description: 'Proprietary rating across 10+ key factors.',
  },
  {
    id: 'curated-oppo',
    icon: '/curated oppo.png',
    title: 'Curated Opportunities',
    description: 'Only opportunities that meet our advisory standards.',
  },
  {
    id: 'expert-guidance',
    icon: '/exp guidance.png',
    title: 'Expert Guidance',
    description: 'Human expertise at every step of your journey.',
  },
];

export default function FeatureBar() {
  const [featureList, setFeatureList] = useState<FeatureItem[]>(defaultFeatures);

  useEffect(() => {
    // 1. Read from localStorage for instant preview
    try {
      const localPage = typeof window !== 'undefined' ? localStorage.getItem('fs_page_home') : null;
      if (localPage) {
        const parsed = JSON.parse(localPage);
        if (Array.isArray(parsed?.content?.featureBar) && parsed.content.featureBar.length > 0) {
          setFeatureList(parsed.content.featureBar);
        }
      }
    } catch (_) {}

    // 2. Fetch live data from backend API
    fetch('http://127.0.0.1:8000/api/pages/home', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data?.content?.featureBar) && json.data.content.featureBar.length > 0) {
          setFeatureList(json.data.content.featureBar);
        }
      })
      .catch((err) => {
        console.log('Using default feature bar items');
      });

    // 3. Listen for cross-tab storage changes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'fs_page_home' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed?.content?.featureBar) && parsed.content.featureBar.length > 0) {
            setFeatureList(parsed.content.featureBar);
          }
        } catch (_) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <section className="w-full bg-white border-y border-[#EAE6DF] py-8 lg:py-10">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-6 items-start">
          {featureList.map((feature, idx) => (
            <div key={feature.id || idx} className="flex items-start gap-4 group">
              {/* Icon Container */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                <Image
                  src={feature.icon || '/ai.png'}
                  alt={feature.title}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text Container */}
              <div className="flex flex-col justify-start">
                <h3 className="font-poppins font-bold text-[#1A1A1A] text-base sm:text-[17px] leading-snug tracking-tight">
                  {feature.title}
                </h3>
                <p className="font-poppins font-light text-[#858585] text-xs sm:text-[13px] leading-relaxed mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
