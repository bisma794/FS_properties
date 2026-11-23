import React from 'react';
import type { Metadata } from 'next';
import CommunityHeroSection from '@/components/CommunityHeroSection';
import CommunityGridSection from '@/components/CommunityGridSection';
import OffPlanGuideSection from '@/components/OffPlanGuideSection';
import BuyerGuideFaqSection from '@/components/BuyerGuideFaqSection';
import { getPageBySlug } from '@/lib/api';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Communities in Dubai | Dubai Creek Harbour & Top Areas | FS Advisory',
  description:
    'From waterfront energy to green family neighbourhoods, every community offers a different way to live. Explore top Dubai communities with FS Real Estate Advisory.',
};

export default async function CommunitiesPage() {
  const page = (await getPageBySlug('communities')) || (await getPageBySlug('community'));
  const customSec = page?.content?.customSections || {};
  const commHero = customSec['comm-hero'] || page?.content?.hero || {};
  const commGuideHtml = customSec['comm-guide']?.detailHtml;

  const heroHeading = commHero.heading !== undefined ? commHero.heading : (commHero.title !== undefined ? commHero.title : undefined);
  const headingParts = heroHeading ? heroHeading.split('\n') : [];
  const headingLine1 = commHero.titleLine1 !== undefined ? commHero.titleLine1 : (headingParts[0] !== undefined ? headingParts[0] : (heroHeading !== undefined ? heroHeading : undefined));
  const headingLine2 = commHero.titleLine2 !== undefined ? commHero.titleLine2 : (headingParts[1] !== undefined ? headingParts[1] : (heroHeading !== undefined ? '' : undefined));

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FAF9F6]">
      {/* 1. Hero Section */}
      <CommunityHeroSection
        breadcrumb={commHero.tagline !== undefined ? commHero.tagline : commHero.badge}
        headingLine1={headingLine1}
        headingLine2={headingLine2}
        description={commHero.subheading !== undefined ? commHero.subheading : commHero.description}
        imageSrc={commHero.bgImage || commHero.backgroundImage}
      />

      {/* 2. Six Distinct Ways - 12 Community Cards Grid (3 in one row, 4 rows) */}
      <CommunityGridSection />

      {/* 3. Long Educational Off-Plan Guide (Exact same as Project Detail page) */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
        <OffPlanGuideSection contentHtml={commGuideHtml} pageSlug="communities" />
      </div>

      {/* 4. FAQs Section (Exact same as Project Detail page) */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
        <BuyerGuideFaqSection id="faq-section" pageSlug="communities" />
      </div>
    </main>
  );
}
