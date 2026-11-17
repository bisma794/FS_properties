import AdvisoryReportHero from '@/components/AdvisoryReportHero';
import OverallMatchScoreSection from '@/components/OverallMatchScoreSection';
import RecommendedCommunitiesSection from '@/components/RecommendedCommunitiesSection';
import BookStrategySessionBanner from '@/components/BookStrategySessionBanner';
import { getPageBySlug } from '@/lib/api';

export const revalidate = 0;

export async function generateMetadata() {
  const page = await getPageBySlug('advisory-report');
  return {
    title: page?.meta_title || 'Your Advisory Report | FS Real Estate Advisory',
    description: page?.meta_description || 'Customized real estate advisory report tailored specifically based on your goals and preferences.',
  };
}

export default async function AdvisoryReportPage() {
  const page = await getPageBySlug('advisory-report');
  const customSections = page?.content?.customSections || {};
  const reportHero = customSections['report-hero'] || page?.content?.hero || {};
  const reportScore = customSections['report-score'] || {};

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <AdvisoryReportHero
        title={reportHero.title || reportHero.heading || 'YOUR ADVISORY REPORT'}
        tagline={reportHero.tagline}
        description={reportHero.description || reportHero.contentText || reportHero.subheading || 'Based on your goals and preferences'}
        backgroundImage={reportHero.backgroundImage || reportHero.bgImage || '/advisory_hero.png'}
      />
      <OverallMatchScoreSection
        heading={reportScore.heading || reportScore.title || 'Overall Match Score'}
        matchScore={reportScore.matchScore || '96%'}
        matchLabel={reportScore.matchLabel || reportScore.contentText || 'Excellent Match'}
        familyLivingScore={reportScore.familyLivingScore || '96'}
        familyLivingLabel={reportScore.familyLivingLabel || 'Family Living'}
        passiveIncScore={reportScore.passiveIncScore || '81'}
        passiveIncLabel={reportScore.passiveIncLabel || 'Passive Inc'}
        capitalGrowthScore={reportScore.capitalGrowthScore || '90'}
        capitalGrowthLabel={reportScore.capitalGrowthLabel || 'Capital Growth'}
        lifestyleScore={reportScore.lifestyleScore || '93'}
        lifestyleLabel={reportScore.lifestyleLabel || 'Lifestyle'}
        iconUrl={reportScore.iconUrl || reportScore.bgImage || '/Layer_1 (3).png'}
        iconSize={reportScore.iconSize || 340}
      />
      <RecommendedCommunitiesSection />
      <BookStrategySessionBanner />
    </main>
  );
}
