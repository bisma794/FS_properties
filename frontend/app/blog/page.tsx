import React from 'react';
import type { Metadata } from 'next';
import BlogHeroSection from '@/components/BlogHeroSection';
import BlogFeaturedJournalSection from '@/components/BlogFeaturedJournalSection';
import BlogWhereToLiveSection from '@/components/BlogWhereToLiveSection';
import BlogArticlesGridSection from '@/components/BlogArticlesGridSection';
import BlogUaeOffplanBannerSection from '@/components/BlogUaeOffplanBannerSection';
import BlogMortgageCalculatorSection from '@/components/BlogMortgageCalculatorSection';
import { getPageBySlug } from '@/lib/api';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('blog');
  return {
    title: page?.meta_title || 'Real Estate News & Insights | FS Real Estate Advisory',
    description:
      page?.meta_description ||
      "Expert insights, market analysis, and the latest updates on Dubai's thriving real estate market.",
  };
}

export default async function BlogPage() {
  const page = await getPageBySlug('blog');
  const customSec = page?.content?.customSections || {};
  const heroSec = customSec['blog-hero'] || page?.content?.hero || {};
  const whereToLiveSec = customSec['blog-where-to-live'] || {};

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* 1. Blog Hero Section */}
      <BlogHeroSection
        breadcrumbHome={heroSec.breadcrumbHome || 'Home'}
        breadcrumbCurrent={heroSec.breadcrumbCurrent || 'Blogs'}
        headingLine1={heroSec.titleLine1 || heroSec.headingLine1 || 'REAL ESTATE'}
        headingLine2={heroSec.titleLine2 || heroSec.headingLine2 || 'NEWS & INSIGHTS'}
        description={
          heroSec.description ||
          heroSec.subheading ||
          heroSec.contentText ||
          "Expert insights, market analysis, and the latest updates on Dubai's thriving real estate market"
        }
        searchPlaceholder={heroSec.searchPlaceholder || 'Looking for Something Specific?'}
        imageSrc={heroSec.bgImage || heroSec.backgroundImage || heroSec.coverImage || '/blog-hero.png'}
      />

      {/* 2. Blog Featured Journal Section (Burj Al Arab + 3 Articles) */}
      <BlogFeaturedJournalSection />

      {/* 3. Where to Live City Guides Section */}
      <BlogWhereToLiveSection
        tagline={whereToLiveSec.tagline || 'City guides'}
        title={whereToLiveSec.title || 'Where to Live'}
        description={whereToLiveSec.description || 'Explore the best areas to live across the UAE, with in-depth guides to help you find your perfect home.'}
        cities={Array.isArray(whereToLiveSec.cities) && whereToLiveSec.cities.length > 0 ? whereToLiveSec.cities : undefined}
      />

      {/* 4. Categorized Blog Articles Grid Section (Coming Soon, News, Real Estate) */}
      <BlogArticlesGridSection />

      {/* 5. Full-width UAE Offplan Search Banner */}
      <BlogUaeOffplanBannerSection />

      {/* 6. Interactive Mortgage Calculator */}
      <BlogMortgageCalculatorSection />
    </main>
  );
}
