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
  const reportComm = customSections['report-comm'] || {};

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <AdvisoryReportHero
        title={reportHero.title !== undefined ? reportHero.title : (reportHero.heading !== undefined ? reportHero.heading : 'YOUR ADVISORY REPORT')}
        tagline={reportHero.tagline}
        description={
          reportHero.description !== undefined
            ? reportHero.description
            : reportHero.contentText !== undefined
            ? reportHero.contentText
            : reportHero.subheading
        }
        backgroundImage={reportHero.backgroundImage || reportHero.bgImage || '/advisory_hero.png'}
      />
      <OverallMatchScoreSection
        heading={reportScore.heading !== undefined ? reportScore.heading : (reportScore.title !== undefined ? reportScore.title : 'Overall Match Score')}
        matchScore={reportScore.matchScore !== undefined ? reportScore.matchScore : '96%'}
        matchLabel={reportScore.matchLabel !== undefined ? reportScore.matchLabel : (reportScore.contentText !== undefined ? reportScore.contentText : 'Excellent Match')}
        familyLivingScore={reportScore.familyLivingScore !== undefined ? reportScore.familyLivingScore : '96'}
        familyLivingLabel={reportScore.familyLivingLabel !== undefined ? reportScore.familyLivingLabel : 'Family Living'}
        passiveIncScore={reportScore.passiveIncScore !== undefined ? reportScore.passiveIncScore : '81'}
        passiveIncLabel={reportScore.passiveIncLabel !== undefined ? reportScore.passiveIncLabel : 'Passive Inc'}
        capitalGrowthScore={reportScore.capitalGrowthScore !== undefined ? reportScore.capitalGrowthScore : '90'}
        capitalGrowthLabel={reportScore.capitalGrowthLabel !== undefined ? reportScore.capitalGrowthLabel : 'Capital Growth'}
        lifestyleScore={reportScore.lifestyleScore !== undefined ? reportScore.lifestyleScore : '93'}
        lifestyleLabel={reportScore.lifestyleLabel !== undefined ? reportScore.lifestyleLabel : 'Lifestyle'}
        iconUrl={reportScore.iconUrl || reportScore.bgImage || '/Layer_1 (3).png'}
        iconSize={reportScore.iconSize || 340}
      />
      <RecommendedCommunitiesSection
        heading={reportComm.title !== undefined ? reportComm.title : (reportComm.heading !== undefined ? reportComm.heading : 'Top Recommended Communities')}
        tagline={reportComm.tagline !== undefined ? reportComm.tagline : 'How we score communities'}
        taglineLink={reportComm.taglineLink || '#score-info'}
        cards={reportComm.cards}
      />
      <BookStrategySessionBanner />
    </main>
  );
}
