import React from 'react';
import type { Metadata } from 'next';
import BlogHeroSection from '@/components/BlogHeroSection';
import BlogDetailsContentSection from '@/components/BlogDetailsContentSection';
import { getBlogDetailData } from '@/lib/blogs';

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { page, blog } = await getBlogDetailData(slug);

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

export default async function DynamicBlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { page, blog } = await getBlogDetailData(slug);

  const customSec = page?.content?.customSections || {};
  const heroSec = customSec['blog-hero'] || customSec['blog-details-hero'] || page?.content?.hero || {};

  // Build merged blogData
  const blogContent = customSec['blog-content'] || {};
  const blogImages = customSec['blog-images'] || {};
  const blogKeyFigures = customSec['blog-keyfigures'] || {};
  const blogHtml = customSec['blog-html']?.detailHtml || customSec['blog-guide']?.detailHtml;

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

      <BlogDetailsContentSection blogData={blogData} />
    </main>
  );
}

