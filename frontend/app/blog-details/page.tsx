import React from 'react';
import type { Metadata } from 'next';
import BlogHeroSection from '@/components/BlogHeroSection';
import BlogDetailsContentSection from '@/components/BlogDetailsContentSection';
import BuyerGuideFaqSection from '@/components/BuyerGuideFaqSection';
import { getBlogDetailData } from '@/lib/blogs';

export const revalidate = 0;

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ slug?: string }>;
}): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {};
  const { page, blog } = await getBlogDetailData(resolvedParams.slug);

  return {
    title:
      page?.meta_title ||
      `${blog.title} | Blog Details | FS Real Estate Advisory`,
    description:
      page?.meta_description ||
      blog.introParagraph ||
      "Expert insights, market analysis, and the latest updates on Dubai's thriving real estate market.",
  };
}

export default async function BlogDetailsPage({
  searchParams,
}: {
  searchParams?: Promise<{ slug?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const { page, blog } = await getBlogDetailData(resolvedParams.slug);

  const customSec = page?.content?.customSections || {};
  const heroSec = customSec['blog-hero'] || customSec['blog-details-hero'] || page?.content?.hero || {};

  // Build merged blogData
  const blogContent = customSec['blog-content'] || {};
  const blogImages = customSec['blog-images'] || {};
  const blogKeyFigures = customSec['blog-keyfigures'] || {};
  const blogHtml = blogContent.detailHtml || customSec['blog-html']?.detailHtml || customSec['blog-guide']?.detailHtml;

  const blogData = {
    title: blogContent.title || page?.title || blog.title,
    category: blogContent.category || blog.category,
    date: blogContent.date || blog.date,
    introParagraph: blogContent.introParagraph || blog.introParagraph,
    secondParagraph: blogContent.secondParagraph || blog.secondParagraph,
    bodyParagraphs: blogContent.bodyParagraphs || blog.bodyParagraphs,
    imageSrc: blogImages.primaryImage || blog.imageSrc,
    secondImageSrc: blogImages.secondaryImage || blog.secondImageSrc,
    keyFigures: {
      ...blog.keyFigures,
      ...(blogKeyFigures.metrics || blogKeyFigures || {}),
    },
    detailHtml: blogHtml,
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* 1. Blog Details Hero Section */}
      <BlogHeroSection
        breadcrumbHome={heroSec.breadcrumbHome || 'Home'}
        breadcrumbCurrent={heroSec.breadcrumbCurrent || 'Blogs'}
        headingLine1={heroSec.titleLine1 || 'REAL ESTATE'}
        headingLine2={heroSec.titleLine2 || 'NEWS & INSIGHTS'}
        description={
          heroSec.subheading ||
          "Expert insights, market analysis, and the latest updates on Dubai's thriving real estate market"
        }
        searchPlaceholder={heroSec.searchPlaceholder || 'Looking for Something Specific?'}
        imageSrc={heroSec.bgImage || '/blog-hero.png'}
      />

      {/* 2. Blog Details Main Content & Sidebar Widget Continuity Section */}
      <BlogDetailsContentSection blogData={blogData} />

      {/* 3. Global FAQs Section */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
        <BuyerGuideFaqSection
          pageSlug={resolvedParams.slug || page?.slug || 'blog-details'}
          faqs={page?.content?.faqs?.items || customSec['faqs']?.items}
          detailHtml={page?.content?.faqs?.detailHtml || customSec['faqs']?.detailHtml}
        />
      </div>
    </main>
  );
}
