import CompareCommunitiesHero from '@/components/CompareCommunitiesHero';
import CommunityComparisonSection from '@/components/CommunityComparisonSection';
import BuyerGuideFaqSection from '@/components/BuyerGuideFaqSection';
import { getPageBySlug } from '@/lib/api';

export const revalidate = 0;

export async function generateMetadata() {
  const page = await getPageBySlug('compare-communities');
  return {
    title: page?.meta_title || 'Compare Communities | FS Real Estate Advisory',
    description: page?.meta_description || 'Select communities to compare side by side.',
  };
}

export default async function CompareCommunitiesPage() {
  const page = await getPageBySlug('compare-communities');
  const heroData = page?.content?.customSections?.['compare-hero'] || page?.content?.hero || {};

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <CompareCommunitiesHero
        title={heroData.title || (heroData.titleLine1 ? `${heroData.titleLine1}\n${heroData.titleLine2 || ''}` : 'COMPARE\nCOMMUNITIES')}
        subtitle={heroData.subheading || heroData.contentText || 'Select communities to compare side by side.'}
        bgImage={heroData.bgImage || heroData.backgroundImage || '/compare-comm-hero.png'}
      />
      <CommunityComparisonSection />
      <BuyerGuideFaqSection pageSlug="compare-communities" />
    </main>
  );
}
