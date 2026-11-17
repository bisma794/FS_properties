import React from 'react';
import type { Metadata } from 'next';
import BuyDetailFirstSection from '@/components/BuyDetailFirstSection';
import BuyDetailMortgageCalculator from '@/components/BuyDetailMortgageCalculator';
import BuyDetailRecommendedSection from '@/components/BuyDetailRecommendedSection';
import LatestReviewsSection from '@/components/LatestReviewsSection';
import BuyerGuideFaqSection from '@/components/BuyerGuideFaqSection';
import { getPropertyDetailData } from '@/lib/properties';

export const revalidate = 0;

interface BuyDetailPageProps {
  searchParams?: Promise<{ slug?: string }>;
}

export async function generateMetadata({ searchParams }: BuyDetailPageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {};
  const { page } = await getPropertyDetailData(resolvedParams?.slug);
  return {
    title:
      page?.meta_title ||
      'Lake View | Rare to Market | Garden Hall | Buy Details | FS Advisory',
    description:
      page?.meta_description ||
      'Exclusive Lake View Garden Hall Villa in Jumeirah Islands. Explore detailed floor plans, views, payment plans and advisory insights with FS Advisory.',
  };
}

export default async function BuyDetailPage({ searchParams }: BuyDetailPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const { page, slug } = await getPropertyDetailData(resolvedParams?.slug);
  const customSections = page?.content?.customSections || {};
  const heroSec = customSections['buy-detail-hero'] || page?.content?.hero || {};
  const overviewSec = customSections['buy-detail-overview'] || {};

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* 1. Main Upper Section: Gallery + Sidebar Widgets + Details + Trends + Binghatti AD + Location + Full-Width Building & Community */}
      <BuyDetailFirstSection
        breadcrumbTitle={
          overviewSec.title ||
          heroSec.title ||
          page?.title ||
          'Lake View | Rare to Market | Garden Hall'
        }
        slug={slug}
        customSections={customSections}
      />

      {/* 2. Full-Width Latest Reviews Section (Exact same as Home Page) */}
      <LatestReviewsSection />

      {/* 3. Mortgage Calculator & Free Consultation Section */}
      <BuyDetailMortgageCalculator
        slug={slug}
        mortgageData={customSections['buy-detail-mortgage']}
      />

      {/* 4. Recommended for you Section (Card width 226.1px, height 298.52px) */}
      <BuyDetailRecommendedSection
        slug={slug}
        recommendedData={customSections['buy-detail-recommended']}
      />

      {/* 5. Global FAQs Section */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
        <BuyerGuideFaqSection id="faq-section" pageSlug={slug || 'buy-detail'} />
      </div>
    </main>
  );
}


