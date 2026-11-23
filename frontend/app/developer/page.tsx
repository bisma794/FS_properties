import React from 'react';
import type { Metadata } from 'next';
import DeveloperHeroSection from '@/components/DeveloperHeroSection';
import DevelopersIntroSection from '@/components/DevelopersIntroSection';
import DevelopersDirectoryGrid from '@/components/DevelopersDirectoryGrid';
import DevelopersCompareAndBriefSection from '@/components/DevelopersCompareAndBriefSection';
import OffPlanGuideSection from '@/components/OffPlanGuideSection';
import BuyerGuideFaqSection from '@/components/BuyerGuideFaqSection';
import { getPageBySlug, getSyncedDevelopers } from '@/lib/api';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'All Developers in Dubai | FS Real Estate Advisory',
  description:
    'A modern waterfront district with open skyline views, connected promenades and a growing collection of homes. Explore leading Dubai developers with FS Advisory.',
};

export default async function DeveloperPage() {
  const [page, syncedDevs] = await Promise.all([
    getPageBySlug('developers').then(async (p) => p || (await getPageBySlug('developer'))),
    getSyncedDevelopers(),
  ]);
  const hero = page?.content?.hero || {};
  const devHero = page?.content?.customSections?.['dev-hero'] || {};
  const devIntro = page?.content?.customSections?.['dev-intro'] || {};
  const devGrid = page?.content?.customSections?.['dev-grid'] || {};
  const devGuideHtml = page?.content?.customSections?.['dev-guide']?.detailHtml;

  const activeDevelopers = Array.isArray(syncedDevs) && syncedDevs.length > 0
    ? syncedDevs
    : (Array.isArray(devGrid.items) && devGrid.items.length > 0 ? devGrid.items : undefined);

  const rawHeroTitle = devHero.title !== undefined ? devHero.title : (hero.heading !== undefined ? hero.heading : 'ALL DEVELOPERS');
  const heroTitleWords = (rawHeroTitle || '').trim().split(/\s+/);
  const heroWord1 = devHero.title !== undefined ? (heroTitleWords[0] || '') : (hero.titleLine1 !== undefined ? hero.titleLine1 : 'ALL');
  const heroWord2 = devHero.title !== undefined ? heroTitleWords.slice(1).join(' ') : (hero.titleLine2 !== undefined ? hero.titleLine2 : 'DEVELOPERS');

  const rawIntroTitle = devIntro.title !== undefined ? devIntro.title : 'ALL DEVELOPERS';
  const introTitleWords = (rawIntroTitle || '').trim().split(/\s+/);
  const introWord1 = rawIntroTitle !== undefined ? (introTitleWords[0] || '') : 'ALL';
  const introWord2 = rawIntroTitle !== undefined ? introTitleWords.slice(1).join(' ') : 'DEVELOPERS';
  const introTaglineParts = (devIntro.tagline !== undefined ? devIntro.tagline : '566 Developers').trim().split(/\s+/);
  const introCount = introTaglineParts[0] || (devIntro.tagline !== undefined ? '' : 566);
  const introCountLabel = introTaglineParts.slice(1).join(' ') || (devIntro.tagline !== undefined ? '' : 'Developers');

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FAF9F6]">
      {/* 1. Hero Section */}
      <DeveloperHeroSection
        breadcrumb={devHero.tagline !== undefined ? devHero.tagline : (hero.tagline !== undefined ? hero.tagline : 'Developer / Dubai creek harbour')}
        headingWord1={heroWord1}
        headingWord2={heroWord2}
        description={
          devHero.contentText !== undefined
            ? devHero.contentText
            : hero.subheading !== undefined
            ? hero.subheading
            : 'A modern waterfront district with open skyline views, connected promenades and a growing collection of homes.'
        }
        imageSrc={devHero.bgImage || hero.backgroundImage || '/developer-hero.png'}
        pageSlug="developers"
      />

      {/* 2. Developers Intro Section */}
      <DevelopersIntroSection
        totalCount={introCount}
        countLabel={introCountLabel}
        headingWord1={introWord1}
        headingWord2={introWord2}
        content={devIntro.contentText}
      />

      {/* 3. Developers Directory Grid Boxes */}
      <DevelopersDirectoryGrid initialDevelopers={activeDevelopers} />

      {/* 4. Developers Comparison Info & Tell Us The Brief Banner */}
      <DevelopersCompareAndBriefSection bottomText={devGrid.contentText} />

      {/* 5. Long Educational Off-Plan Guide (Exact same as Project Detail page) */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pt-10 sm:pt-14 pb-8 sm:pb-12">
        <OffPlanGuideSection contentHtml={devGuideHtml} pageSlug="developers" />
      </div>

      {/* 6. FAQs Section (Controlled via CMS Section) */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
        <BuyerGuideFaqSection id="faq-section" pageSlug="developers" />
      </div>
    </main>
  );
}
