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
  const tableData = page?.content?.customSections?.['compare-table'] || {};

  const heroTitle =
    heroData.title !== undefined
      ? heroData.title
      : heroData.titleLine1
      ? `${heroData.titleLine1}\n${heroData.titleLine2 || ''}`
      : 'COMPARE\nCOMMUNITIES';

  const heroSubtitle =
    heroData.subheading !== undefined
      ? heroData.subheading
      : heroData.contentText !== undefined
      ? heroData.contentText
      : 'Select communities to compare side by side.';

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <CompareCommunitiesHero
        title={heroTitle}
        subtitle={heroSubtitle}
        bgImage={heroData.bgImage || heroData.backgroundImage || '/compare-comm-hero.png'}
      />
      <CommunityComparisonSection
        bannerText={tableData.contentText !== undefined ? tableData.contentText : tableData.description}
        buttonText={tableData.buttonText !== undefined ? tableData.buttonText : tableData.ctaText}
        buttonLink={tableData.buttonLink || tableData.ctaLink || '/advisory-report'}
      />
      <BuyerGuideFaqSection pageSlug="compare-communities" />
    </main>
  );
}
