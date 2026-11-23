import React from 'react';
import type { Metadata } from 'next';
import ProjectDetailHero from '@/components/ProjectDetailHero';
import ProjectDetailSection from '@/components/ProjectDetailSection';
import { getProjectDetailData } from '@/lib/projects';

export const revalidate = 0;

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ slug?: string }>;
}): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {};
  const { page, slug } = await getProjectDetailData(resolvedParams.slug);

  return {
    title:
      page?.meta_title ||
      (page?.title ? `${page.title} | Project Details | FS Real Estate Advisory` : 'Project Details | FS Real Estate Advisory'),
    description:
      page?.meta_description ||
      'Explore off-plan residences with private foyers, floor plans, pricing, payment structures and luxury amenities in Dubai.',
  };
}

export default async function ProjectDetailPage({
  searchParams,
}: {
  searchParams?: Promise<{ slug?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const { page, slug } = await getProjectDetailData(resolvedParams.slug);

  const customSec = page?.content?.customSections || {};
  const heroSec = customSec['proj-hero'] || {};
  const baseHero = page?.content?.hero || {};

  const heroEyebrow = heroSec.eyebrow || heroSec.tagline || baseHero.eyebrow || 'LIMITED AVAILABILITY';
  const heroTitle1 = heroSec.titleLine1 || heroSec.title || baseHero.titleLine1 || (page?.title ? page.title.toUpperCase() : 'PROJECT DETAILS');
  const heroTitle2 = heroSec.titleLine2 || baseHero.titleLine2 || '';
  const heroDescription = heroSec.subheading || heroSec.contentText || baseHero.subheading || baseHero.description;
  const heroCtaText = heroSec.ctaText || baseHero.ctaText || 'CHECK AVAILABILITY';
  const heroBg = heroSec.backgroundImage || heroSec.bgImage || baseHero.backgroundImage || '/project-detail-hero.png';

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <ProjectDetailHero
        eyebrow={heroEyebrow}
        titleLine1={heroTitle1}
        titleLine2={heroTitle2}
        description={heroDescription}
        ctaText={heroCtaText}
        backgroundImage={heroBg}
      />
      <ProjectDetailSection
        pageData={page}
        customSections={customSec}
        slug={slug}
      />
    </main>
  );
}
