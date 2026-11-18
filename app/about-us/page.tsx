import AboutUsHero from '@/components/AboutUsHero';
import AboutUsSection from '@/components/AboutUsSection';
import BuyerGuideFaqSection from '@/components/BuyerGuideFaqSection';
import { getPageBySlug } from '@/lib/api';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about-us');
  return {
    title: page?.meta_title || 'About Us | FS Real Estate Advisory',
    description: page?.meta_description || "We don't sell properties. We build strategies. Discover FS Real Estate Advisory.",
  };
}

export default async function AboutUsPage() {
  const page = await getPageBySlug('about-us');
  const hero = page?.content?.hero || {};
  const aboutSec = page?.content?.customSections?.['about-section'] || (page?.content as any)?.aboutSection || {};

  const heroTitle = hero.titleLine1 && hero.titleLine2
    ? `${hero.titleLine1}\n${hero.titleLine2}`
    : hero.heading || 'REDEFINING REAL ESTATE\nADVISORY IN DUBAI';

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <AboutUsHero
        title={heroTitle}
        subheading={hero.subheading || "We don't sell properties. We build strategies."}
        ctaText={hero.primaryCtaText || 'Contact Our Advisory Team'}
        ctaLink={hero.primaryCtaLink || '/ai-assessment'}
        backgroundImage={hero.backgroundImage || hero.coverImage || '/about_us_hero.jpg'}
      />
      <AboutUsSection
        philosophyTagline={aboutSec.tagline || aboutSec.philosophyTagline || 'OUR PHILOSOPHY'}
        philosophyHeading={aboutSec.heading || aboutSec.philosophyHeading || 'Guiding Investors & Families to High-Performing Real Estate Assets'}
        paragraph1={aboutSec.paragraph1 || aboutSec.description1 || 'FS Real Estate Advisory was founded on a simple principle: real estate decisions should never be transactional sales pitches. In a market as dynamic as Dubai, success requires precision, master-plan forecasting, and disciplined advisory.'}
        paragraph2={aboutSec.paragraph2 || aboutSec.description2 || 'From master-planned villa communities like The Valley and Emaar South to high-yielding urban hubs like Dubai Hills, we empower clients with structural insights before they make a move.'}
        image={aboutSec.image || aboutSec.coverImage || '/dubai hills.png'}
        pillarsTagline={aboutSec.pillarsTagline || 'WHY WORK WITH US'}
        pillarsTitle={aboutSec.pillarsTitle || 'The FS Advisory Difference'}
        pillars={aboutSec.pillars}
      />
      <BuyerGuideFaqSection pageSlug="about-us" />
    </main>
  );
}
