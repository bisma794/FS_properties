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

// Format title case helper
function formatTitleCase(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  const fallbackTitle = `${formatTitleCase(slug)} | Community Detail | FS Real Estate Advisory`;
  return {
    title: page?.meta_title || page?.title || fallbackTitle,
    description:
      page?.meta_description ||
      `A master-planned modern district with open views, connected promenades and a growing collection of homes in ${formatTitleCase(
        slug
      )}.`,
  };
}

export default async function DynamicCommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try fetching community page by specific slug, or fallback to general community-detail page
  const page = (await getPageBySlug(slug)) || (await getPageBySlug('community-detail'));
  const hero = page?.content?.hero || {};
  const commHeroSection = page?.content?.customSections?.['comm-detail-hero'] || {};
  const overviewData =
    page?.content?.customSections?.['comm-overview'] ||
    page?.content?.overview ||
    {};

  const communityNameFormatted = formatTitleCase(slug);
  const titleWords = communityNameFormatted.split(' ');
  const defaultWord1 = titleWords[0]?.toUpperCase() || 'DUBAI';
  const defaultWord2 = titleWords.slice(1).join(' ').toUpperCase() || 'COMMUNITY';

  // Extract hero image from comm-detail-hero section, hero object, or community image
  const heroImage =
    commHeroSection.bgImage ||
    commHeroSection.backgroundImage ||
    hero.backgroundImage ||
    hero.bgImage ||
    undefined;

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FAF9F6]">
      {/* 1. Community Detail Hero Section (Live dynamic data from CMS) */}
      <CommunityDetailHero
        breadcrumb={
          commHeroSection.tagline !== undefined
            ? commHeroSection.tagline
            : hero.breadcrumb !== undefined
            ? hero.breadcrumb
            : `Communities / ${communityNameFormatted}`
        }
        headingWord1={
          commHeroSection.title !== undefined
            ? commHeroSection.title.split(' ')[0] || ''
            : hero.titleLine1 !== undefined
            ? hero.titleLine1
            : defaultWord1
        }
        headingWord2={
          commHeroSection.title !== undefined
            ? commHeroSection.title.split(' ').slice(1).join(' ') || ''
            : hero.titleLine2 !== undefined
            ? hero.titleLine2
            : defaultWord2
        }
        description={
          commHeroSection.contentText !== undefined
            ? commHeroSection.contentText
            : hero.subheading !== undefined
            ? hero.subheading
            : `A modern waterfront and suburban district with open views, connected promenades and a premier collection of homes in ${communityNameFormatted}.`
        }
        imageSrc={heroImage}
      />

      {/* 2. Community Overview Section (Live dynamic data from CMS) */}
      <CommunityOverviewSection
        tagline={overviewData.tagline !== undefined ? overviewData.tagline : 'Community overview'}
        title={overviewData.title}
        headingLine1={overviewData.headingLine1}
        headingLine2={overviewData.headingLine2}
        content={
          overviewData.contentText !== undefined
            ? overviewData.contentText
            : overviewData.content !== undefined
            ? overviewData.content
            : `${communityNameFormatted} combines a relaxed lifestyle with a contemporary residential skyline, creating a setting that feels both modern and connected. Walkable promenades, open scenic views, landscaped spaces, and seamless connectivity make the community highly appealing to both end users and investors. As the district continues to flourish, comparing projects within the community helps identify the ideal location and investment opportunity that best match your priorities.`
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

      {/* 4. Community Amenities & Location Connections Section */}
      <CommunityAmenitiesLocationSection
        communityName={communityNameFormatted}
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
          pageSlug={slug}
        />
      </div>

      {/* 6. FAQs Section */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
        <BuyerGuideFaqSection id="faq-section" pageSlug={slug} />
      </div>
    </main>
  );
}
