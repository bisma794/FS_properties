import { redirect } from 'next/navigation';
import TheValleyHero from '@/components/TheValleyHero';
import ValleyOverviewScoreSection from '@/components/ValleyOverviewScoreSection';
import WhyFSRecommendsValleySection from '@/components/WhyFSRecommendsValleySection';
import ValleyHighlightsSection from '@/components/ValleyHighlightsSection';
import { getPageBySlug } from '@/lib/api';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = (await getPageBySlug('opportunities')) || (await getPageBySlug('the-valley'));
  return {
    title: page?.meta_title || 'Opportunities | FS Real Estate Advisory',
    description:
      page?.meta_description ||
      'Explore prime real estate opportunities and recommended communities in Dubai.',
  };
}

export default async function OpportunitiesPage() {
  const page =
    (await getPageBySlug('opportunities')) ||
    (await getPageBySlug('the-valley')) ||
    (await getPageBySlug('recommendation-result'));

  // If the CMS updated the slug to something else, redirect dynamically
  if (page?.slug && page.slug !== 'opportunities') {
    redirect(`/${page.slug}`);
  }

  const customSections = page?.content?.customSections || {};
  const heroSec = customSections['valley-hero'] || {};
  const globalHero = page?.content?.hero || {};

  const heroTitle = heroSec.title || heroSec.heading || globalHero.heading || globalHero.title || 'OPPORTUNITIES';
  const heroSubtitle =
    heroSec.contentText !== undefined
      ? heroSec.contentText
      : heroSec.description !== undefined
      ? heroSec.description
      : heroSec.subheading !== undefined
      ? heroSec.subheading
      : heroSec.tagline || '';
  const heroBg = heroSec.bgImage || heroSec.backgroundImage || heroSec.coverImage || globalHero.backgroundImage || globalHero.bgImage || '/valley_hero.png';

  const overviewSec = customSections['valley-overview'] || {};
  const whySec = customSections['valley-why-recommends'] || {};
  const highlightsSec = customSections['valley-highlights'] || {};

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <TheValleyHero
        title={heroTitle}
        subtitle={heroSubtitle || undefined}
        backgroundImage={heroBg}
      />
      <ValleyOverviewScoreSection
        scoreCircleImage={overviewSec.bgImage || overviewSec.backgroundImage || '/92&.png'}
      />
      <WhyFSRecommendsValleySection
        title={whySec.title || whySec.heading || 'Why FS Recommends'}
        description={whySec.contentText !== undefined ? whySec.contentText : whySec.description}
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


