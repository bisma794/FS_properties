import React from 'react';
import type { Metadata } from 'next';
import CommunityDetailHero from '@/components/CommunityDetailHero';
import CommunityOverviewSection from '@/components/CommunityOverviewSection';
import SelectedOpportunitiesSection from '@/components/SelectedOpportunitiesSection';
import CommunityAmenitiesLocationSection from '@/components/CommunityAmenitiesLocationSection';
import OffPlanGuideSection from '@/components/OffPlanGuideSection';
import BuyerGuideFaqSection from '@/components/BuyerGuideFaqSection';
import { getPageBySlug } from '@/lib/api';

export const revalidate = 0;

interface CommunityDetailPageProps {
  searchParams?: Promise<{ slug?: string }>;
}

export async function generateMetadata({
  searchParams,
}: CommunityDetailPageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {};
  const effectiveSlug = resolvedParams.slug || 'community-detail';
  const page = (await getPageBySlug(effectiveSlug)) || (await getPageBySlug('community-detail'));
  return {
    title: page?.meta_title || (page?.title ? `${page.title} | Community Detail | FS Real Estate Advisory` : 'Dubai Creek Harbour | Community Detail | FS Real Estate Advisory'),
    description:
      page?.meta_description ||
      'A modern waterfront district with open skyline views, connected promenades and a growing collection of homes.',
  };
}

export default async function CommunityDetailPage({ searchParams }: CommunityDetailPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const effectiveSlug = resolvedParams.slug || 'community-detail';
  const page = (await getPageBySlug(effectiveSlug)) || (await getPageBySlug('community-detail'));
  const hero = page?.content?.hero || {};
  const commHeroSection = page?.content?.customSections?.['comm-detail-hero'] || {};
  const overviewData =
    page?.content?.customSections?.['comm-overview'] ||
    page?.content?.overview ||
    {};

  const heroImage =
    commHeroSection.bgImage ||
    commHeroSection.backgroundImage ||
    hero.backgroundImage ||
    hero.bgImage ||
    undefined;

  const titleWords = (commHeroSection.title || page?.title || hero.titleLine1 || 'Dubai Creek Harbour').trim().split(/\s+/);
  const word1 = titleWords[0] || 'DUBAI CREEK';
  const word2 = titleWords.slice(1).join(' ') || (titleWords.length === 1 ? 'HARBOUR' : '');

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FAF9F6]">
      {/* 1. Community Detail Hero Section (Live dynamic data from CMS) */}
      <CommunityDetailHero
        breadcrumb={commHeroSection.tagline || hero.breadcrumb || `Communities / ${word1} ${word2}`}
        headingWord1={commHeroSection.titleLine1 || word1.toUpperCase()}
        headingWord2={commHeroSection.titleLine2 || word2.toUpperCase()}
        description={
          commHeroSection.contentText ||
          hero.subheading ||
          'A modern waterfront district with open skyline views, connected promenades and a growing collection of homes.'
        }
        imageSrc={heroImage}
      />

      {/* 2. Community Overview Section (Live dynamic data from CMS) */}
      <CommunityOverviewSection
        tagline={overviewData.tagline || 'Community overview'}
        title={overviewData.title}
        headingLine1={overviewData.headingLine1}
        headingLine2={overviewData.headingLine2}
        content={
          overviewData.contentText ||
          overviewData.content ||
          'Dubai Creek Harbour combines a relaxed waterfront lifestyle with a contemporary residential skyline, creating a setting that feels both modern and connected.'
        }
      />

      {/* 3. Selected Opportunities Section */}
      <SelectedOpportunitiesSection
        eyebrow={
          page?.content?.customSections?.['comm-opportunities']?.tagline ||
          'Projects here'
        }
        title={page?.content?.customSections?.['comm-opportunities']?.title}
        headingLine1={
          page?.content?.customSections?.['comm-opportunities']?.headingLine1 ||
          'SELECTED OPPORTUNITIES'
        }
        headingLine2={
          page?.content?.customSections?.['comm-opportunities']?.headingLine2 ||
          'IN THE COMMUNITY'
        }
        items={page?.content?.customSections?.['comm-opportunities']?.items}
      />

      {/* 4. Community Amenities & Location Connections Section (Live from CMS) */}
      <CommunityAmenitiesLocationSection
        communityName={`${word1} ${word2}`}
        tagline={
          page?.content?.customSections?.['comm-amenities']?.tagline ||
          'COMMUNITY AMENITIES'
        }
        title={page?.content?.customSections?.['comm-amenities']?.title}
        description={page?.content?.customSections?.['comm-amenities']?.contentText}
        amenities={page?.content?.customSections?.['comm-amenities']?.items}
      />

      {/* 5. Strategic Off-Plan Investment Guide */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pt-10 sm:pt-14 pb-8 sm:pb-12">
        <OffPlanGuideSection
          contentHtml={page?.content?.customSections?.['comm-guide']?.detailHtml}
          pageSlug={effectiveSlug}
        />
      </div>

      {/* 6. FAQs Section */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
        <BuyerGuideFaqSection id="faq-section" pageSlug={effectiveSlug} />
      </div>
    </main>
  );
}
