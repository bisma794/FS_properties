import AboutUsHero from '@/components/AboutUsHero';
import AboutUsSection from '@/components/AboutUsSection';
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

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <AboutUsHero
        title={`${hero.titleLine1 || 'REDEFINING REAL ESTATE'}\n${hero.titleLine2 || 'ADVISORY IN DUBAI'}`}
        subheading={hero.subheading || "We don't sell properties. We build strategies."}
        ctaText={hero.primaryCtaText || 'Contact Our Advisory Team'}
        ctaLink={hero.primaryCtaLink || '/about-us'}
        backgroundImage={hero.backgroundImage || '/about_us_hero.jpg'}
      />
      <AboutUsSection />
    </main>
  );
}
