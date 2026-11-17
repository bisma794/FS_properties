import AIAssessmentHero from '@/components/AIAssessmentHero';
import GoalSelectionStep from '@/components/GoalSelectionStep';
import { getPageBySlug } from '@/lib/api';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('ai-assessment');
  return {
    title: page?.meta_title || 'AI Advisory Engine | Real Estate Advisory',
    description:
      page?.meta_description ||
      'Intelligent AI engine analysis for luxury real estate and property opportunities in Dubai.',
  };
}

export default async function AIAssessmentPage() {
  const page = await getPageBySlug('ai-assessment');
  const hero = page?.content?.hero || {};
  const assessment = page?.content?.assessment || {};

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <AIAssessmentHero
        headingWord1={hero.titleLine1 || hero.headingWord1 || 'AI ADVISORY'}
        headingWord2={hero.titleLine2 || hero.headingWord2 || 'ENGINE'}
        headingWord3={hero.titleLine3}
        subheading={hero.subheading || hero.tagline}
        detailHtml={hero.detailHtml}
        backgroundImage={hero.backgroundImage || hero.coverImage || '/ai_engine_hero.jpg'}
      />
      <GoalSelectionStep
        heading={assessment.heading || 'What is your primary goal?'}
        subheading={assessment.subheading || 'This helps us tailor recommendations to what matters most to you.'}
        detailHtml={assessment.detailHtml}
        goals={assessment.goals}
      />
    </main>
  );
}



