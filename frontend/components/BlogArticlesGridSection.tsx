'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface ArticleCard {
  id: string | number;
  title: string;
  slug?: string;
  date: string;
  tag: string;
  excerpt: string;
  imageSrc: string;
  category: string;
  href?: string;
}

export interface BlogArticlesGridSectionProps {
  initialCategory?: string;
  articles?: ArticleCard[];
}

const defaultArticles: ArticleCard[] = [
  {
    id: 1,
    title: 'Pros and Cons of Living in Palm Jebel Ali',
    slug: 'pros-and-cons-of-living-in-palm-jebel-ali',
    date: 'August 28, 2024',
    tag: 'Coming-soon',
    excerpt:
      'Palm Jebel Ali is a breathtaking project that redefines the idea of luxurious living. The exceptional architecture of pa...',
    imageSrc: '/pros-n-cons.png',
    category: 'coming-soon',
    href: '/blog-details?slug=pros-and-cons-of-living-in-palm-jebel-ali',
  },
  {
    id: 2,
    title: 'Luxury Apartments on Al Marjan Island',
    slug: 'luxury-apartments-on-al-marjan-island',
    date: 'August 28, 2024',
    tag: 'Coming-soon',
    excerpt:
      'Today Damac developer Launch New Project Shoreline residential complex that is located on Al Marjan Island, in Ras Al Kh...',
    imageSrc: '/al-marjan.png',
    category: 'coming-soon',
    href: '/blog-details?slug=luxury-apartments-on-al-marjan-island',
  },
  {
    id: 3,
    title: 'Experience Modern Living Elegant Apartments Surrounded by Nshama...',
    slug: 'experience-modern-living-elegant-apartments-nshama',
    date: 'July 7, 2024',
    tag: 'Coming-soon',
    excerpt:
      'Introducing a wide range of apartments with Stylish 1 bedrooms, 2 bedrooms, and 3 bedrooms for sale in Townsquare; in ad...',
    imageSrc: '/modern-living.png',
    category: 'coming-soon',
    href: '/blog-details?slug=experience-modern-living-elegant-apartments-nshama',
  },
  {
    id: 4,
    title: 'Marina Views at Rashid Yachts and Marina Redefining luxury living in...',
    slug: 'marina-views-at-rashid-yachts-and-marina',
    date: 'July 4, 2024',
    tag: 'Coming-soon',
    excerpt:
      'Dubai, UAE - Welcome to Marina Views, a distinguished Emaar Properties development situated in the energetic Mina Rashid...',
    imageSrc: '/marina-view.png',
    category: 'coming-soon',
    href: '/blog-details?slug=marina-views-at-rashid-yachts-and-marina',
  },
  {
    id: 5,
    title: 'Latest Pros And Cons Of Living In The Valley Phase 2 Community',
    slug: 'pros-and-cons-of-living-in-the-valley-phase-2',
    date: 'August 28, 2024',
    tag: 'Coming-soon',
    excerpt:
      'The Pros and Cons of Moving to the Country Of Residing In The Valley Phase 2 Emaar Community The News provides a thoroug...',
    imageSrc: '/thevalley-phase2.png',
    category: 'coming-soon',
    href: '/blog-details?slug=pros-and-cons-of-living-in-the-valley-phase-2',
  },
  {
    id: 6,
    title: 'Dubai Expo City launches limited edition villas starting at Dh6.1 million',
    slug: 'dubai-expo-city-launches-limited-edition-villas',
    date: 'July 7, 2024',
    tag: 'Coming-soon',
    excerpt:
      'If you want to become the owner of luxurious limited edition villas at Expo City Dubai, then you are in the right place...',
    imageSrc: '/dubai-expocity.png',
    category: 'coming-soon',
    href: '/blog-details?slug=dubai-expo-city-launches-limited-edition-villas',
  },
];

const tabs = [
  { id: 'all', label: 'All Articles' },
  { id: 'coming-soon', label: 'Coming Soon' },
  { id: 'news', label: 'News' },
  { id: 'real-estate', label: 'Real Estate' },
];

function normalizeCategory(cat?: string): string {
  if (!cat) return 'coming-soon';
  const c = cat.toLowerCase().trim().replace(/\s+/g, '-');
  if (c.includes('coming')) return 'coming-soon';
  if (c.includes('news')) return 'news';
  if (c.includes('estate') || c.includes('real')) return 'real-estate';
  return c;
}

export default function BlogArticlesGridSection({
  initialCategory = 'all',
  articles,
}: BlogArticlesGridSectionProps) {
  const [activeTab, setActiveTab] = useState(initialCategory);

  const [liveArticles, setLiveArticles] = useState<ArticleCard[]>(() => {
    if (articles && articles.length > 0) return articles;
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('fs_blogs_list');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((b: Record<string, unknown>, idx: number) => ({
              id: (b.id as string | number) || idx + 1,
              title: (b.title as string) || 'Blog Post',
              slug: b.slug as string | undefined,
              date: (b.date as string) || 'Recent',
              tag: (b.tag as string) || (b.category as string) || 'Article',
              excerpt: (b.introParagraph as string) || (b.excerpt as string) || (b.secondParagraph as string) || 'Read the full guide...',
              imageSrc: (b.imageSrc as string) || '/pros-n-cons.png',
              category: normalizeCategory(b.category as string | undefined),
              href: `/blog-details?slug=${(b.slug as string) || b.id}`,
            }));
          }
        }
      } catch {}
    }
    return defaultArticles;
  });

  useEffect(() => {
    fetch('/api/cms-sync')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const blogs = data?.data?.blogs;
        if (Array.isArray(blogs) && blogs.length > 0) {
          const mapped: ArticleCard[] = blogs.map((b: Record<string, unknown>, idx: number) => ({
            id: (b.id as string | number) || idx + 1,
            title: (b.title as string) || 'Blog Post',
            slug: b.slug as string | undefined,
            date: (b.date as string) || 'Recent',
            tag: (b.tag as string) || (b.category as string) || 'Article',
            excerpt: (b.introParagraph as string) || (b.excerpt as string) || (b.secondParagraph as string) || 'Read the full guide...',
            imageSrc: (b.imageSrc as string) || '/pros-n-cons.png',
            category: normalizeCategory(b.category as string | undefined),
            href: `/blog-details?slug=${(b.slug as string) || b.id}`,
          }));
          setLiveArticles(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const currentList = articles && articles.length > 0 ? articles : liveArticles;

  const filteredArticles = currentList.filter(
    (item) => activeTab === 'all' || normalizeCategory(item.category) === activeTab
  );

  return (
    <section className="w-full bg-[#FAF9F6] py-10 sm:py-14 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm sm:text-[15px] transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'px-5 py-2.5 rounded-xl bg-[#C2A468] text-white font-medium shadow-xs'
                    : 'px-3 py-2 text-[#666666] hover:text-[#111111] font-normal'
                }`}
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Articles Grid: 3 columns, cards width 350px / responsive, height 404px */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 justify-items-center">
          {filteredArticles.map((card) => (
            <Link
              key={card.id}
              href={card.href || `/blog-details?slug=${card.slug || card.id}`}
              className="group block w-full max-w-[350px] bg-white rounded-2xl border border-[#ECE8E1] p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              style={{
                width: '100%',
                maxWidth: '350px',
                height: '404px',
              }}
            >
              {/* Card Image with curved corners */}
              <div className="relative w-full h-[184px] shrink-0 rounded-xl overflow-hidden bg-[#F2EFE9]">
                <Image
                  src={card.imageSrc || '/pros-n-cons.png'}
                  alt={card.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-col flex-1 justify-between pt-3.5 overflow-hidden">
                {/* Heading (Inter Bold) */}
                <h3
                  className="text-[15px] sm:text-[16px] text-[#111111] leading-[1.3] line-clamp-2 group-hover:text-[#C2A468] transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  {card.title}
                </h3>

                {/* Metadata row: Date + Tag */}
                <div className="flex items-center gap-4 text-[11px] sm:text-xs text-[#7A7A7A] my-2 shrink-0">
                  {/* Date with calendar icon */}
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-[#8C8C8C] shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{card.date}</span>
                  </div>

                  {/* Tag with price/tag icon */}
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-[#8C8C8C] shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V5a2 2 0 012-2z" />
                    </svg>
                    <span>{card.tag}</span>
                  </div>
                </div>

                {/* Excerpt Content (Poppins Regular) */}
                <p
                  className="text-xs text-[#777777] leading-relaxed line-clamp-2"
                  style={{
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    fontWeight: 400,
                  }}
                >
                  {card.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
