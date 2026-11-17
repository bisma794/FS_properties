import ProjectHeroSection from '@/components/ProjectHeroSection';
import ProjectMainContent from '@/components/ProjectMainContent';
import BuyerGuideFaqSection from '@/components/BuyerGuideFaqSection';
import { getPageBySlug } from '@/lib/api';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('project-main-page');
  return {
    title: page?.meta_title || 'Off-Plan Property For Sale In Dubai | FS Real Estate Advisory',
    description:
      page?.meta_description ||
      "Discover Dubai's most promising off-plan communities, homes & investment opportunities with FS Advisory.",
  };
}

export default async function ProjectMainPage() {
  const page = await getPageBySlug('project-main-page');
  const customSections = page?.content?.customSections || {};
  const heroSec = customSections['proj-main-hero'] || {};
  const globalHero = page?.content?.hero || {};

  return (
    <main className="min-h-screen bg-white">
      <ProjectHeroSection
        titleLine1={heroSec.titleLine1 || globalHero.titleLine1 || 'OFF-PLAN PROPERTY'}
        titleLine2={heroSec.titleLine2 || globalHero.titleLine2 || 'FOR SALE IN DUBAI'}
        description={
          heroSec.description ||
          [heroSec.descriptionLine1, heroSec.descriptionLine2].filter(Boolean).join(' ') ||
          globalHero.description ||
          "Discover Dubai's Most Promising Off-Plan Communities, Homes & Investment Opportunities"
        }
        heroImage={heroSec.bgImage || heroSec.backgroundImage || globalHero.backgroundImage || '/project-main-hero.png'}
        locationTitle={heroSec.locationTitle || 'Location'}
        propertyTypeTitle={heroSec.propertyTypeTitle || 'Property type'}
        budgetTitle={heroSec.budgetTitle || 'Budget'}
        handoverTitle={heroSec.handoverTitle || 'Handover'}
      />
      <ProjectMainContent
        description={customSections['proj-main-content']?.description}
        guideHtml={
          customSections['proj-main-guide']?.detailHtml ||
          customSections['proj-guide']?.detailHtml
        }
      />
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
        <BuyerGuideFaqSection pageSlug="project-main-page" />
      </div>
    </main>
  );
}
