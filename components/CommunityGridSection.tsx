'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface CommunityCardData {
  id?: string | number;
  tag?: string;
  title?: string;
  name?: string;
  description?: string;
  href?: string;
}

const defaultCommunityCards: CommunityCardData[] = [
  {
    id: 'dubai-creek-harbour',
    tag: 'Waterfront living',
    title: 'Dubai Creek Harbour',
    description: 'Promenades, skyline views and a calm waterfront character.',
    href: '/communities/dubai-creek-harbour',
  },
  {
    id: 'palm-jumeirah',
    tag: 'Waterfront living',
    title: 'Palm Jumeirah',
    description: 'World-famous iconic island offering waterfront mansions, private beaches and penthouses.',
    href: '/communities/palm-jumeirah',
  },
  {
    id: 'business-bay',
    tag: 'Urban waterfront',
    title: 'Business Bay',
    description: 'City energy, canal walks and quick access to Downtown.',
    href: '/communities/business-bay',
  },
  {
    id: 'dubai-hills-estate',
    tag: 'Golf & park community',
    title: 'Dubai Hills Estate',
    description: 'Vast central park, golf course fairways and family neighbourhood ease.',
    href: '/communities/dubai-hills-estate',
  },
  {
    id: 'downtown-dubai',
    tag: 'Iconic city living',
    title: 'Downtown Dubai',
    description: 'World-class cultural landmarks, boulevard dining and skyline energy.',
    href: '/communities/downtown-dubai',
  },
  {
    id: 'the-valley',
    tag: 'Suburban family living',
    title: 'The Valley',
    description: 'Tranquil suburban rhythm, golden beaches and expansive green parks.',
    href: '/the-valley',
  },
  {
    id: 'arabian-ranches-iii',
    tag: 'Gated community',
    title: 'Arabian Ranches III',
    description: 'Clubhouses, splash pads, sports courts and pedestrian-friendly pathways.',
    href: '/communities/arabian-ranches-iii',
  },
  {
    id: 'damac-lagoons',
    tag: 'Resort lagoon living',
    title: 'DAMAC Lagoons',
    description: 'Crystal lagoons, Mediterranean vibes and vibrant recreation islands.',
    href: '/communities/damac-lagoons',
  },
  {
    id: 'tilal-al-ghaf',
    tag: 'Wellness & nature',
    title: 'Tilal Al Ghaf',
    description: 'Swimmable crystal lagoon, sandy beaches and sustainable modern design.',
    href: '/communities/tilal-al-ghaf',
  },
  {
    id: 'dubai-marina',
    tag: 'Coastal high-rise',
    title: 'Dubai Marina',
    description: 'Yacht club promenades, beach access and lively waterside dining.',
    href: '/communities/dubai-marina',
  },
  {
    id: 'emaar-south',
    tag: 'Master planned suburban',
    title: 'Emaar South',
    description: 'Championship golf course living near Al Maktoum International Airport.',
    href: '/communities/emaar-south',
  },
  {
    id: 'the-oasis',
    tag: 'Ultra-luxury living',
    title: 'The Oasis',
    description: 'Secluded luxury mansions surrounded by flowing waterways and calm greenery.',
    href: '/communities/the-oasis',
  },
];

export default function CommunityGridSection() {
  const [cards, setCards] = useState<CommunityCardData[]>(defaultCommunityCards);
  const [sectionHeading1, setSectionHeading1] = useState('SIX DISTINCT WAYS');
  const [sectionHeading2, setSectionHeading2] = useState('TO EXPERIENCE THE CITY');
  const [sectionTagline, setSectionTagline] = useState('Explore communities');
  const [sectionContent, setSectionContent] = useState(
    'Start with lifestyle, access, and daily rhythm to understand what each district truly offers. Look at how easily you can reach workplaces, schools, shopping, dining, healthcare, and other everyday essentials. Consider the pace of life, community atmosphere, connectivity, and the overall character of each neighbourhood. Think about what your typical day would look like and how well each district supports your routines and priorities. Once you understand the lifestyle differences, move on to comparing the homes available within each district. Assess the range of properties, architectural styles, layouts, sizes, amenities, and price points. Consider not only what each home looks like, but also how practical and comfortable it would be for everyday living. Compare the quality, value, location, and long-term potential of the homes on offer. Ultimately, the goal is to find the right balance between the district you want to live in and the home that best complements your lifestyle.'
  );

  useEffect(() => {
    // Check localStorage cache and tombstones first
    const getDeletedSet = () => {
      try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem('fs_deleted_communities') : null;
        return new Set(raw ? JSON.parse(raw).map((s: any) => String(s).toLowerCase().trim()) : []);
      } catch {
        return new Set<string>();
      }
    };

    const deleted = getDeletedSet();
    const filterDeleted = (list: CommunityCardData[]) =>
      list.filter((c) => {
        const id = String(c.id || '').toLowerCase().trim();
        const title = String(c.title || c.name || '').toLowerCase().trim();
        const slug = String(c.href || '').replace(/^\/communities\//, '').toLowerCase().trim();
        return !deleted.has(id) && !deleted.has(title) && !deleted.has(slug);
      });

    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('fs_communities_list') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCards(filterDeleted(parsed));
        }
      }
    } catch (_) {}

    fetch('http://127.0.0.1:8000/api/pages/communities')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.content) {
          const c = json.data.content;
          if (Array.isArray(c.communityCards) && c.communityCards.length > 0) {
            setCards(filterDeleted(c.communityCards));
          } else if (Array.isArray(c.customSections?.['comm-grid']?.cards)) {
            setCards(filterDeleted(c.customSections['comm-grid'].cards));
          }

          const gridSec = c.customSections?.['comm-grid'];
          if (gridSec?.title) {
            setSectionHeading1(gridSec.title);
            setSectionHeading2('');
          }
          if (gridSec?.tagline) {
            setSectionTagline(gridSec.tagline);
          }
          if (gridSec?.contentText) {
            setSectionContent(gridSec.contentText);
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="w-full bg-[#FAF9F6] py-14 sm:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full space-y-10 sm:space-y-12">
        
        {/* ======================================================== */}
        {/* HEADER SECTION: Eyebrow + Cinzel Heading + Poppins Light Body */}
        {/* ======================================================== */}
        <div className="space-y-5">
          {/* Eyebrow Label */}
          <span
            className="text-xs sm:text-[13px] font-medium text-stone-600 tracking-wide block"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            {sectionTagline}
          </span>

          {/* Heading (Cinzel Regular) */}
          <h2
            className="text-3xl sm:text-4xl lg:text-[44px] uppercase tracking-[0.04em] leading-[1.15]"
            style={{
              fontFamily: 'var(--font-cinzel), Cinzel, serif',
              fontWeight: 400,
            }}
          >
            <span className="block text-[#1B2538]">{sectionHeading1}</span>
            {sectionHeading2 && (
              <span className="block text-[#C2A468] mt-1 sm:mt-1.5">{sectionHeading2}</span>
            )}
          </h2>

          {/* Subtle Horizontal Divider */}
          <div className="w-full border-b border-stone-200/90 pt-2" />

          {/* Content (Poppins Light) */}
          <p
            className="text-xs sm:text-[13.5px] lg:text-[14px] text-[#737373] leading-relaxed max-w-6xl pt-2 whitespace-pre-line"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 300,
            }}
          >
            {sectionContent}
          </p>
        </div>

        {/* ======================================================== */}
        {/* 12 COMMUNITY CARDS (3 in one row, 4 rows total)           */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {cards.map((card, idx) => {
            const cardTitle = card.title || (card as any).name || '';
            const cardSlug =
              (card as any).slug ||
              card.id ||
              cardTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const cardHref =
              card.href && card.href !== '#'
                ? card.href
                : `/communities/${cardSlug}`;

            return (
              <Link
                key={`${card.id || card.name}-${idx}`}
                href={cardHref}
                className="group relative rounded-2xl sm:rounded-3xl h-[360px] sm:h-[390px] overflow-hidden flex flex-col justify-end p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-stone-800/20 block"
                style={{
                  background: 'linear-gradient(180deg, #242D38 0%, #171E26 50%, #0E1318 100%)',
                }}
              >
                {/* Subtle Ambient Glow Effect inside card */}
                <div className="absolute inset-0 bg-radial from-white/[0.04] to-transparent pointer-events-none" />

                {/* Bottom Card Content */}
                <div className="relative z-10 space-y-2">
                  {/* Community Vibe / Tag */}
                  <span
                    className="text-[11px] sm:text-xs text-stone-300 tracking-wide font-light block"
                    style={{
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      fontWeight: 300,
                    }}
                  >
                    {card.tag}
                  </span>

                  {/* Community Title (Cinzel / Serif) */}
                  <h3
                    className="text-lg sm:text-xl font-normal text-white tracking-wide"
                    style={{
                      fontFamily: 'var(--font-cinzel), Cinzel, serif',
                      fontWeight: 400,
                    }}
                  >
                    {cardTitle}
                  </h3>

                  {/* Short Description */}
                  <p
                    className="text-xs text-stone-400 font-light leading-relaxed line-clamp-2"
                    style={{
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      fontWeight: 300,
                    }}
                  >
                    {card.description}
                  </p>

                  {/* Bottom Action Row: Explore + Arrow Icon */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span
                      className="text-xs sm:text-[13px] font-medium text-white group-hover:text-[#C2A468] transition-colors"
                      style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    >
                      Explore
                    </span>

                    {/* Diagonal Arrow Icon ↗ */}
                    <svg
                      className="w-4 h-4 text-white group-hover:text-[#C2A468] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
