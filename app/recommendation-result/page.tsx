import TheValleyHero from '@/components/TheValleyHero';
import ValleyOverviewScoreSection from '@/components/ValleyOverviewScoreSection';
import WhyFSRecommendsValleySection from '@/components/WhyFSRecommendsValleySection';
import ValleyHighlightsSection from '@/components/ValleyHighlightsSection';
import { getPageBySlug } from '@/lib/api';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = (await getPageBySlug('recommendation-result')) || (await getPageBySlug('the-valley'));
  return {
    title: page?.meta_title || 'Recommendation Result | FS Real Estate Advisory',
    description:
      page?.meta_description ||
      'Personalized property recommendation results tailored to your investment and lifestyle goals.',
  };
}

export default async function RecommendationResultPage() {
  const page = (await getPageBySlug('recommendation-result')) || (await getPageBySlug('the-valley'));
  const customSections = page?.content?.customSections || {};
  const heroSec = customSections['valley-hero'] || {};
  const globalHero = page?.content?.hero || {};

  // Read hero fields from customSections['valley-hero'] first, fallback to page.content.hero, then defaults
  const heroTitle = heroSec.title || heroSec.heading || globalHero.heading || globalHero.title || 'THE VALLEY';
  const heroSubtitle = heroSec.contentText || heroSec.description || heroSec.subheading || heroSec.tagline || globalHero.subheading || globalHero.tagline || 'By Emaar';
  const heroBg = heroSec.bgImage || heroSec.backgroundImage || heroSec.coverImage || globalHero.backgroundImage || globalHero.bgImage || '/valley_hero.png';

  const overviewSec = customSections['valley-overview'] || {};
  const whySec = customSections['valley-why-recommends'] || {};
  const highlightsSec = customSections['valley-highlights'] || {};

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <TheValleyHero
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundImage={heroBg}
      />
      <ValleyOverviewScoreSection
        scoreCircleImage={overviewSec.bgImage || overviewSec.backgroundImage || '/92&.png'}
      />
      <WhyFSRecommendsValleySection
        title={whySec.title || whySec.heading || 'Why FS Recommends'}
        description={whySec.contentText || whySec.description}
      />
      <ValleyHighlightsSection
        highlights={Array.isArray(highlightsSec.items) && highlightsSec.items.length > 0 ? highlightsSec.items : undefined}
        primaryBtnText={highlightsSec.primaryBtnText}
        primaryBtnLink={highlightsSec.primaryBtnLink}
        secondaryBtnText={highlightsSec.secondaryBtnText}
        secondaryBtnLink={highlightsSec.secondaryBtnLink}
      />
    </main>
  );
}


