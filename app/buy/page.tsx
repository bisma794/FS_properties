import React from 'react';
import type { Metadata } from 'next';
import BuyHeroSection from '@/components/BuyHeroSection';
import BuySearchFilterSection from '@/components/BuySearchFilterSection';
import BuyPropertyListingsSection from '@/components/BuyPropertyListingsSection';
import OffPlanGuideSection from '@/components/OffPlanGuideSection';
import BuyerGuideFaqSection from '@/components/BuyerGuideFaqSection';
import { getPageBySlug, getSyncedProperties } from '@/lib/api';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('buy');
  return {
    title: page?.meta_title || 'Buy Property in Dubai | Dubai Creek Harbour & R. Hills | FS Advisory',
    description:
      page?.meta_description ||
      'Buy in Dubai with clarity. A measured search process for buyers who want context, comparison, and practical guidance across Dubai Creek Harbour, R. Hills, and top developments.',
  };
}

export default async function BuyPage() {
  const page = await getPageBySlug('buy');
  const initialProperties = await getSyncedProperties();
  const customSec = page?.content?.customSections || {};
  const heroSec = customSec['buy-hero'] || page?.content?.hero || {};
  const aboutSec = customSec['buy-about'] || {};
  const guideSec = customSec['buy-guide'] || page?.content?.longContent || page?.content?.offPlanGuide || {};
  const faqsSec = customSec['buy-faqs'] || page?.content?.faqs || {};

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* 1. Buy Hero Section */}
      <BuyHeroSection
        detailHtml={heroSec.detailHtml}
        imageSrc={heroSec.bgImage || heroSec.backgroundImage || '/buy-hero.png'}
      />

      {/* 2. Buy Search & Filter Section */}
      <BuySearchFilterSection />

      {/* 3. 9-Col Properties + 3-Col Sidebar + About R. Hills + Properties to Explore */}
      <BuyPropertyListingsSection aboutHtml={aboutSec.detailHtml} initialProperties={initialProperties} />

      {/* 4. Long Educational Off-Plan Guide */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
        <OffPlanGuideSection contentHtml={guideSec.detailHtml} pageSlug="buy" />
      </div>

      {/* 5. FAQs Section (Controlled via CMS Section) */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
        <BuyerGuideFaqSection id="faq-section" pageSlug="buy" />
      </div>
    </main>
  );
}

