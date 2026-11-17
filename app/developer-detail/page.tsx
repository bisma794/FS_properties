import React from 'react';
import type { Metadata } from 'next';
import DeveloperHeroSection from '@/components/DeveloperHeroSection';
import DeveloperBriefSection from '@/components/DeveloperBriefSection';
import DeveloperProjectsSection from '@/components/DeveloperProjectsSection';
import DeveloperAskBriefBanner from '@/components/DeveloperAskBriefBanner';
import OffPlanGuideSection from '@/components/OffPlanGuideSection';
import BuyerGuideFaqSection from '@/components/BuyerGuideFaqSection';

import { getPageBySlug } from '@/lib/api';

export const revalidate = 0;

interface DeveloperDetailPageProps {
  searchParams?: Promise<{ slug?: string }>;
}

export async function generateMetadata({
  searchParams,
}: DeveloperDetailPageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {};
  const effectiveSlug = resolvedParams.slug || 'developer-detail';
  const page = (await getPageBySlug(effectiveSlug)) || (await getPageBySlug('developer-detail'));
  return {
    title: page?.meta_title || (page?.title ? `${page.title} | Developer Details | FS Real Estate Advisory` : 'Emaar Properties | Developer Details | FS Real Estate Advisory'),
    description:
      page?.meta_description ||
      'Explore leading developer communities in Dubai, track record, live project launches and strategic advisory insights.',
  };
}

export default async function DeveloperDetailPage({ searchParams }: DeveloperDetailPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const effectiveSlug = resolvedParams.slug || 'developer-detail';
  const page = (await getPageBySlug(effectiveSlug)) || (await getPageBySlug('developer-detail'));
  const hero = page?.content?.hero || {};
  const devHeroSection = page?.content?.customSections?.['dev-detail-hero'] || {};
  const brief = page?.content?.customSections?.['dev-brief'] || {};
  const devProjectsSection = page?.content?.customSections?.['dev-projects'] || {};
  const devGuideHtml = page?.content?.customSections?.['dev-guide']?.detailHtml;

  const heroImage =
    devHeroSection.bgImage ||
    devHeroSection.backgroundImage ||
    hero.backgroundImage ||
    hero.bgImage ||
    '/developer-hero.png';

  const titleWords = (devHeroSection.title || page?.title || hero.titleLine1 || 'Emaar Properties').trim().split(/\s+/);
  const word1 = titleWords[0] || 'EMAAR';
  const word2 = titleWords.slice(1).join(' ') || (titleWords.length === 1 ? 'PROPERTIES' : '');

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FAF9F6]">
      {/* 1. Developer Hero Section */}
      <DeveloperHeroSection
        breadcrumb={devHeroSection.tagline || hero.breadcrumb || `Developer / ${word1} ${word2}`}
        headingWord1={devHeroSection.titleLine1 || word1.toUpperCase()}
        headingWord2={devHeroSection.titleLine2 || word2.toUpperCase()}
        description={
          devHeroSection.contentText ||
          hero.subheading ||
          'Pioneering master-planned communities with global acclaim, world-class amenities and a reliable delivery track record in Dubai.'
        }
        imageSrc={heroImage}
      />

      {/* 2. Developer Brief & Measured Overview Section */}
      <DeveloperBriefSection
        developerName={brief.heading || word1}
        tagline={brief.tagline || 'Developer Brief'}
        description={
          brief.contentText ||
          '74 off-plan projects on the live register, from 1.1m. every entry reads straight from the vila database: prices, payment plans, handover dates and photography.'
        }
        keyNumbersTagline={brief.keyNumbersTagline}
        keyNumbersText={brief.keyNumbersText}
        keyNumbersSource={brief.keyNumbersSource}
        tableTitle={brief.tableTitle || `${word1}, Measured`}
        tableImage={brief.tableImage}
        tableMetrics={brief.tableMetrics}
      />

      {/* 3. Developer Projects Cards Grid (Live projects from CMS or default fallback) */}
      <DeveloperProjectsSection
        headingLine={devProjectsSection.title}
        developerName={word1}
        projects={devProjectsSection.items}
      />

      {/* 4. Banner: BEGIN QUIETLY - ASK ABOUT DEVELOPER (Before the long content section) */}
      <DeveloperAskBriefBanner
        eyebrow="BEGIN QUIETLY"
        titleWord1="ASK ABOUT"
        titleWord2={`${word1}.`}
        question="What brings you to dubai property?"
      />

      {/* 5. Long Educational Off-Plan Guide Section */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pt-10 sm:pt-14 pb-8 sm:pb-12">
        <OffPlanGuideSection contentHtml={devGuideHtml} pageSlug={effectiveSlug} />
      </div>

      {/* 6. FAQs Section */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
        <BuyerGuideFaqSection id="faq-section" pageSlug={effectiveSlug} />
      </div>
    </main>
  );
}
