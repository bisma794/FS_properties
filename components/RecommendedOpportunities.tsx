'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface OpportunityCard {
  id: string;
  image: string;
  score: number;
  title: string;
  developer: string;
  tag: string;
  bestFor: string;
  price: string;
}

const defaultOpportunities: OpportunityCard[] = [
  {
    id: '1',
    image: '/thevalley.png',
    score: 92,
    title: 'The Valley',
    developer: 'By Emaar',
    tag: 'FAMILY LIVING',
    bestFor: 'Growing Families',
    price: 'AED 1.6M',
  },
  {
    id: '2',
    image: '/grandpolo_club.png',
    score: 89,
    title: 'Grand Polo Club & Resort',
    developer: 'By Emaar',
    tag: 'LUXURY LIVING',
    bestFor: 'Luxury Lifestyle',
    price: 'AED 4.2M',
  },
  {
    id: '3',
    image: '/dubai hills.png',
    score: 87,
    title: 'Dubai Hills Estate',
    developer: 'By Emaar',
    tag: 'FAMILY LIVING',
    bestFor: 'End Users & Investors',
    price: 'AED 1.8M',
  },
];

export default function RecommendedOpportunities() {
  const [titleLine1, setTitleLine1] = useState('Opportunities We');
  const [titleLine2, setTitleLine2] = useState('Currently Recommend');
  const [tagline, setTagline] = useState('FEATURED INVESTMENTS');
  const [description, setDescription] = useState('');
  const [viewAllLink, setViewAllLink] = useState('/project-main-page');
  const [cards, setCards] = useState<OpportunityCard[]>(defaultOpportunities);

  const applyOppData = (opp: any) => {
    if (!opp) return;
    if (opp.titleLine1) setTitleLine1(opp.titleLine1);
    if (opp.titleLine2) setTitleLine2(opp.titleLine2);
    if (opp.title && (!opp.titleLine1 || !opp.titleLine2)) {
      const words = opp.title.trim().split(/\s+/).filter(Boolean);
      if (words.length <= 2) {
        setTitleLine1(words[0] || '');
        setTitleLine2(words.slice(1).join(' ') || '');
      } else {
        setTitleLine1(words.slice(0, 2).join(' '));
        setTitleLine2(words.slice(2).join(' '));
      }
    }
    if (opp.tagline || opp.badge) setTagline(opp.tagline || opp.badge);
    if (opp.description !== undefined || opp.contentText !== undefined) {
      setDescription(opp.description ?? opp.contentText ?? '');
    }
    if (opp.viewAllLink) setViewAllLink(opp.viewAllLink);
    if (Array.isArray(opp.cards) && opp.cards.length > 0) {
      setCards(opp.cards);
    }
  };

  useEffect(() => {
    // 1. Read from localStorage for immediate preview
    try {
      const localPage = typeof window !== 'undefined' ? localStorage.getItem('fs_page_home') : null;
      if (localPage) {
        const parsed = JSON.parse(localPage);
        applyOppData(parsed?.content?.opportunities);
      }
    } catch (_) {}

    // 2. Fetch live data from backend API
    fetch('http://127.0.0.1:8000/api/pages/home', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.content?.opportunities) {
          applyOppData(json.data.content.opportunities);
        }
      })
      .catch(() => {
        // Fallback to default
      });

    // 3. Storage listener for cross-tab sync
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'fs_page_home' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          applyOppData(parsed?.content?.opportunities);
        } catch (_) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <section className="w-full bg-[#F8F6F2] py-16 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            {tagline && (
              <span className="block text-xs font-semibold text-[#BFA16A] tracking-[0.2em] uppercase mb-2">
                {tagline}
              </span>
            )}
            <h2
              className="font-playfair text-3xl sm:text-4xl lg:text-[44px] font-medium leading-[1.2]"
              style={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif' }}
            >
              <span className="block text-[#171717]">{titleLine1}</span>
              <span className="block text-[#BFA16A] mt-1">{titleLine2}</span>
            </h2>
            {description && (
              <p className="font-poppins font-light text-sm sm:text-base text-[#737373] mt-3 max-w-xl">
                {description}
              </p>
            )}
          </div>

          <Link
            href={viewAllLink || '/project-main-page'}
            className="inline-flex items-center gap-1.5 font-inter font-semibold text-sm text-[#BFA16A] hover:text-[#aa8e59] transition-colors shrink-0"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            <span>View All</span>
            <span className="text-base">→</span>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
          {cards.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-[402px] bg-white rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              {/* Image & FS Score Badge */}
              <div className="relative w-full h-[220px] shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 402px"
                  className="object-cover"
                  priority
                />
                
                {/* FS Score Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-sm text-center min-w-[70px]">
                  <span
                    className="block font-inter font-bold text-[#171717] text-sm leading-none"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    {item.score}
                  </span>
                  <span
                    className="block font-inter font-semibold text-[9px] text-[#555555] uppercase tracking-wider mt-1 leading-none"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    FS SCORE
                  </span>
                </div>
              </div>

              {/* Card Details Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                {/* Top Info Row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3
                      className="font-inter font-bold text-[#111111] text-lg sm:text-[19px] leading-tight"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-inter font-light text-[#999999] text-xs sm:text-sm mt-1"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      {item.developer}
                    </p>
                  </div>

                  {/* Category Tag Badge */}
                  <span
                    className="shrink-0 bg-[#FAF4EA] text-[#C5A267] font-inter font-medium text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-md"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Divider */}
                <div className="w-full border-t border-neutral-200/80 my-5" />

                {/* Bottom Details Row */}
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <span
                      className="block font-inter font-light text-[#999999] text-xs sm:text-sm"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      Best For
                    </span>
                    <span
                      className="block font-inter font-bold text-[#111111] text-sm sm:text-base mt-1"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      {item.bestFor}
                    </span>
                  </div>

                  <div className="text-right">
                    <span
                      className="block font-inter font-light text-[#999999] text-xs sm:text-sm"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      Price From
                    </span>
                    <span
                      className="block font-inter font-bold text-[#111111] text-sm sm:text-base mt-1"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
