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

const DEVELOPER_DEFAULTS: Record<string, { fullName: string; word1: string; word2: string; desc: string }> = {
  binghatti: {
    fullName: 'Binghatti Properties',
    word1: 'BINGHATTI',
    word2: 'PROPERTIES',
    desc: 'Hyper-tower developer collaborating with world icons including Bugatti, Mercedes-Benz, and Jacob & Co.',
  },
  sobha: {
    fullName: 'Sobha Realty',
    word1: 'SOBHA',
    word2: 'REALTY',
    desc: 'Self-sufficient backward-integrated developer famous for luxury waterfront sky villas and signature forest communities.',
  },
  meraas: {
    fullName: 'Meraas Properties',
    word1: 'MERAAS',
    word2: 'PROPERTIES',
    desc: 'Master developers behind premier urban lifestyle districts including Bluewaters Island, City Walk, and Port De La Mer.',
  },
  damac: {
    fullName: 'DAMAC Properties',
    word1: 'DAMAC',
    word2: 'PROPERTIES',
    desc: 'Renowned for ultra-luxury residential towers, branded fashion residences, and resort-inspired lagoon master communities.',
  },
  emaar: {
    fullName: 'Emaar Properties',
    word1: 'EMAAR',
    word2: 'PROPERTIES',
    desc: 'Pioneering master-planned communities with global acclaim, world-class amenities and a reliable delivery track record in Dubai.',
  },
  azizi: {
    fullName: 'Azizi Developments',
    word1: 'AZIZI',
    word2: 'DEVELOPMENTS',
    desc: 'Leading developer delivering major residential projects across prime locations including Riviera at Meydan.',
  },
  nakheel: {
    fullName: 'Nakheel Properties',
    word1: 'NAKHEEL',
    word2: 'PROPERTIES',
    desc: 'The master visionary behind the world-famous Palm Jumeirah, Palm Jebel Ali, and Dubai Islands.',
  },
  omniyat: {
    fullName: 'Omniyat Properties',
    word1: 'OMNIYAT',
    word2: 'PROPERTIES',
    desc: 'Bespoke architectural collector pieces curated in collaboration with Dorchester Collection and Zaha Hadid.',
  },
  danube: {
    fullName: 'Danube Properties',
    word1: 'DANUBE',
    word2: 'PROPERTIES',
    desc: 'Pioneers of affordable luxury in Dubai with innovative 1% monthly payment plans and resort facilities.',
  },
  ellington: {
    fullName: 'Ellington Properties',
    word1: 'ELLINGTON',
    word2: 'PROPERTIES',
    desc: 'Design-centric boutique developer known for handcrafted resort-style residences and hotel-grade lobbies.',
  },
  'select-group': {
    fullName: 'Select Group',
    word1: 'SELECT',
    word2: 'GROUP',
    desc: 'Specialists in prime waterfront living with extensive developments throughout Dubai Marina and Business Bay.',
  },
  samana: {
    fullName: 'Samana Developers',
    word1: 'SAMANA',
    word2: 'DEVELOPERS',
    desc: 'Fastest-growing developer renowned for incorporating private plunge pools into apartment balconies.',
  },
};

function formatTitleCase(slug: string): string {
  if (DEVELOPER_DEFAULTS[slug]) return DEVELOPER_DEFAULTS[slug].fullName;
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
  const developerName = formatTitleCase(slug);
  const fallbackTitle = `${developerName} | Developer Details | FS Real Estate Advisory`;
  return {
    title: page?.meta_title || page?.title || fallbackTitle,
    description:
      page?.meta_description ||
      `Explore ${developerName} in Dubai. Master-planned communities, track record, live project launches and strategic advisory insights.`,
  };
}

export default async function DynamicDeveloperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch developer page by specific slug
  const page = await getPageBySlug(slug);
  const hero = page?.content?.hero || {};

  const devDefault = DEVELOPER_DEFAULTS[slug];
  const developerNameFormatted = formatTitleCase(slug);
  const titleWords = developerNameFormatted.split(' ');
  const defaultWord1 = devDefault?.word1 || titleWords[0]?.toUpperCase() || 'EMAAR';
  const defaultWord2 = devDefault?.word2 || titleWords.slice(1).join(' ').toUpperCase() || 'PROPERTIES';
  const defaultDesc =
    devDefault?.desc ||
    'Pioneering master-planned communities with global acclaim, world-class amenities and a reliable delivery track record in Dubai.';

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

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FAF9F6]">
      {/* 1. Developer Hero Section */}
      <DeveloperHeroSection
        breadcrumb={devHeroSection.tagline || hero.breadcrumb || `Developer / ${developerNameFormatted}`}
        headingWord1={devHeroSection.title?.split(' ')[0] || hero.titleLine1 || defaultWord1}
        headingWord2={
          devHeroSection.title?.split(' ').slice(1).join(' ') ||
          hero.titleLine2 ||
          defaultWord2
        }
        description={
          devHeroSection.contentText ||
          hero.subheading ||
          defaultDesc
        }
        imageSrc={heroImage}
      />

      {/* 2. Developer Brief & Measured Overview Section */}
      <DeveloperBriefSection
        developerName={brief.heading || defaultWord1}
        tagline={brief.tagline || 'Developer Brief'}
        description={
          brief.contentText ||
          `74 off-plan projects on the live register, from 1.1m. every entry reads straight from the vila database: prices, payment plans, handover dates and photography.`
        }
        keyNumbersTagline={brief.keyNumbersTagline}
        keyNumbersText={brief.keyNumbersText}
        keyNumbersSource={brief.keyNumbersSource}
        tableTitle={brief.tableTitle || `${developerNameFormatted}, Measured`}
        tableImage={brief.tableImage}
        tableMetrics={brief.tableMetrics}
      />

      {/* 3. Developer Projects Cards Grid (Live projects from CMS or default fallback) */}
      <DeveloperProjectsSection
        headingLine={devProjectsSection.title}
        developerName={developerNameFormatted}
        projects={devProjectsSection.items}
      />

      {/* 4. Banner: BEGIN QUIETLY - ASK ABOUT DEVELOPER */}
      <DeveloperAskBriefBanner
        eyebrow="BEGIN QUIETLY"
        titleWord1="ASK ABOUT"
        titleWord2={`${defaultWord1}.`}
        question="What brings you to dubai property?"
      />

      {/* 5. Long Educational Off-Plan Guide Section */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pt-10 sm:pt-14 pb-8 sm:pb-12">
        <OffPlanGuideSection contentHtml={devGuideHtml} pageSlug={slug} />
      </div>

      {/* 6. FAQs Section */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
        <BuyerGuideFaqSection id="faq-section" pageSlug={slug} />
      </div>
    </main>
  );
}
