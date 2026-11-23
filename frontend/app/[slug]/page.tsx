import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Core Layout
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Data Helpers
import { getBlogDetailData } from '@/lib/blogs';
import { getPageBySlug, getSyncedProperties, getSyncedDevelopers } from '@/lib/api';

// Hero Components
import HeroSection from '@/components/HeroSection';
import BuyHeroSection from '@/components/BuyHeroSection';
import AboutUsHero from '@/components/AboutUsHero';
import TheValleyHero from '@/components/TheValleyHero';
import BlogHeroSection from '@/components/BlogHeroSection';
import AIAssessmentHero from '@/components/AIAssessmentHero';
import CommunityHeroSection from '@/components/CommunityHeroSection';
import DeveloperHeroSection from '@/components/DeveloperHeroSection';

// Properties & Off-Plan Components
import BuyPropertyListingsSection from '@/components/BuyPropertyListingsSection';
import BuySearchFilterSection from '@/components/BuySearchFilterSection';
import RecommendedOpportunities from '@/components/RecommendedOpportunities';
import SimilarProjectsSection from '@/components/SimilarProjectsSection';
import BuyDetailMortgageCalculator from '@/components/BuyDetailMortgageCalculator';
import ProjectGridSection from '@/components/ProjectGridSection';

// Communities Components
import ExploreCommunity from '@/components/ExploreCommunity';
import CommunityGridSection from '@/components/CommunityGridSection';
import CommunityOverviewSection from '@/components/CommunityOverviewSection';
import CommunityComparisonSection from '@/components/CommunityComparisonSection';
import CommunityAmenitiesLocationSection from '@/components/CommunityAmenitiesLocationSection';

// Developers Components
import DevelopersDirectoryGrid from '@/components/DevelopersDirectoryGrid';
import DevelopersIntroSection from '@/components/DevelopersIntroSection';
import DeveloperProjectsSection from '@/components/DeveloperProjectsSection';
import DeveloperAskBriefBanner from '@/components/DeveloperAskBriefBanner';

// The Valley & Score Components
import ValleyOverviewScoreSection from '@/components/ValleyOverviewScoreSection';
import WhyFSRecommendsValleySection from '@/components/WhyFSRecommendsValleySection';
import ValleyHighlightsSection from '@/components/ValleyHighlightsSection';

// Blog & Editorial Components
import BlogFeaturedJournalSection from '@/components/BlogFeaturedJournalSection';
import BlogArticlesGridSection from '@/components/BlogArticlesGridSection';
import BlogWhereToLiveSection from '@/components/BlogWhereToLiveSection';
import BlogUaeOffplanBannerSection from '@/components/BlogUaeOffplanBannerSection';
import BlogDetailsContentSection from '@/components/BlogDetailsContentSection';

// About Us & Advisory Components
import AboutUsSection from '@/components/AboutUsSection';
import FeatureBar from '@/components/FeatureBar';
import LatestReviewsSection from '@/components/LatestReviewsSection';
import OverallMatchScoreSection from '@/components/OverallMatchScoreSection';

// General, Guides & Forms Components
import OffPlanGuideSection from '@/components/OffPlanGuideSection';
import BuyerGuideFaqSection from '@/components/BuyerGuideFaqSection';
import BookStrategySessionBanner from '@/components/BookStrategySessionBanner';
import ProjectEnquiryForm from '@/components/ProjectEnquiryForm';

export const revalidate = 0; // Dynamic route

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // 1. Try finding as blog post first
  const { page: blogPage, blog } = await getBlogDetailData(slug);
  if (blogPage || (blog && (blog.slug === slug || blog.slug === `blog-${slug}`))) {
    return {
      title: blogPage?.meta_title || `${blog.title} | Blog Details | FS Real Estate Advisory`,
      description:
        blogPage?.meta_description ||
        blog.introParagraph ||
        "Expert insights, market analysis, and the latest updates on Dubai's thriving real estate market.",
    };
  }

  // 2. Fallback to standard dynamic page
  const page = await getPageBySlug(slug);
  if (!page) return { title: 'Page Not Found' };

  return {
    title: page.meta_title || page.title,
    description: page.meta_description || '',
  };
}

export default async function DynamicCatchAllPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Check if this slug is a Blog Post
  const { page: blogPage, blog } = await getBlogDetailData(slug);
  const isBlog =
    Boolean(blogPage?.content?.blogMeta) ||
    Boolean(blogPage?.content?.customSections?.['blog-content']) ||
    (blog && (blog.slug.toLowerCase() === slug.toLowerCase() || blog.slug.toLowerCase() === `blog-${slug.toLowerCase()}`));

  if (isBlog && blog) {
    const customSec = blogPage?.content?.customSections || {};
    const heroSec = customSec['blog-hero'] || customSec['blog-details-hero'] || blogPage?.content?.hero || {};

    const blogContent = customSec['blog-content'] || {};
    const blogImages = customSec['blog-images'] || {};
    const blogKeyFigures = customSec['blog-keyfigures'] || {};
    const blogHtml = blogContent.detailHtml || customSec['blog-html']?.detailHtml || customSec['blog-guide']?.detailHtml;

    const blogData = {
      title: blogContent.title || blogPage?.title || blog.title,
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
        {/* Blog Hero Section */}
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

        {/* Blog Main Content & Sidebar */}
        <BlogDetailsContentSection blogData={blogData} />

        {/* Global FAQs Section */}
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
          <BuyerGuideFaqSection pageSlug={blogPage?.slug || slug || 'blog-details'} />
        </div>
      </main>
    );
  }

  // 2. Fetch Page Data from API / Sync
  const page = await getPageBySlug(slug);

  if (!page || (page.status !== 'published' && page.status !== 'draft')) {
    notFound();
  }

  const isDynamicBuilderPage = Boolean(
    page.content?.isDynamic ||
    (page.content?.dynamicSections && Array.isArray(page.content.dynamicSections))
  );

  const dynamicSections = Array.isArray(page.content?.dynamicSections)
    ? page.content.dynamicSections
    : [];

  // =========================================================================
  // IF CREATED VIA DYNAMIC PAGE BUILDER: Render stacked dynamic sections
  // =========================================================================
  if (isDynamicBuilderPage) {
    const initialProperties = await getSyncedProperties();
    const initialDevelopers = await getSyncedDevelopers();

    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#171717] flex flex-col font-sans">
        <Navbar />

        {dynamicSections.map((sec: any) => {
          // -------------------------------------------------------------
          // 1. HERO SECTIONS
          // -------------------------------------------------------------
          if (sec.type === 'hero-homepage') {
            return (
              <HeroSection
                key={sec.id}
                initialData={{
                  title: sec.title || 'A DIFFERENT WAY TO BUY REAL ESTATE IN DUBAI',
                  subheading: sec.description || 'Data-driven, independent real estate advisory built for long-term investors.',
                  backgroundImage: sec.bgImage || '/buy_hero.png',
                }}
              />
            );
          }

          if (sec.type === 'hero-1' || sec.type === 'hero-buy') {
            return (
              <BuyHeroSection
                key={sec.id}
                detailHtml={sec.detailHtml}
                imageSrc={sec.bgImage || '/buy-hero.png'}
              />
            );
          }

          if (sec.type === 'hero-2' || sec.type === 'hero-about') {
            return (
              <AboutUsHero
                key={sec.id}
                title={sec.title || 'REDEFINING REAL ESTATE ADVISORY IN DUBAI'}
                subheading={sec.description || 'We do not sell properties. We build strategies.'}
                ctaText={sec.buttonText || 'Contact Advisory Team'}
                ctaLink={sec.buttonLink || '/about-us'}
                backgroundImage={sec.bgImage || '/about_us_hero.jpg'}
              />
            );
          }

          if (sec.type === 'hero-4' || sec.type === 'hero-valley') {
            return (
              <TheValleyHero
                key={sec.id}
                title={sec.title || 'THE VALLEY'}
                subtitle={sec.description || 'By Emaar'}
                backgroundImage={sec.bgImage || '/valley_hero.png'}
              />
            );
          }

          if (sec.type === 'hero-blog') {
            return (
              <BlogHeroSection
                key={sec.id}
                headingLine1={sec.title || 'REAL ESTATE'}
                headingLine2=""
                description={sec.description || 'Expert insights, market analysis and the latest updates.'}
                imageSrc={sec.bgImage || '/blog-hero.png'}
              />
            );
          }

          if (sec.type === 'hero-advisory') {
            return (
              <AIAssessmentHero
                key={sec.id}
                headingWord1={sec.title ? sec.title.split(' ')[0] : 'AI ADVISORY'}
                headingWord2={sec.title ? sec.title.split(' ').slice(1).join(' ') : 'ENGINE'}
                subheading={sec.description}
                detailHtml={sec.detailHtml}
                backgroundImage={sec.bgImage || '/ai_engine_hero.jpg'}
              />
            );
          }

          if (sec.type === 'hero-community') {
            return (
              <CommunityHeroSection
                key={sec.id}
                headingLine1={sec.title || 'FIND YOUR'}
                headingLine2="PLACE IN DUBAI"
                description={sec.description}
                imageSrc={sec.bgImage || '/community.png'}
              />
            );
          }

          if (sec.type === 'hero-developer') {
            return (
              <DeveloperHeroSection
                key={sec.id}
                headingWord1={sec.title ? sec.title.split(' ')[0] : 'ALL'}
                headingWord2={sec.title ? sec.title.split(' ').slice(1).join(' ') : 'DEVELOPERS'}
                description={sec.description}
                imageSrc={sec.bgImage || '/developer-hero.png'}
              />
            );
          }

          // Fallback Generic Hero (for hero-3 or custom hero types)
          if (sec.type?.startsWith('hero-')) {
            return (
              <section
                key={sec.id}
                className="relative py-24 sm:py-32 bg-cover bg-center flex items-center justify-center text-center text-white overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(rgba(17, 17, 17, 0.65), rgba(17, 17, 17, 0.75)), url(${sec.bgImage || '/1793598348_buy-hero.png'})`,
                }}
              >
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-5">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-[#BFA16A]/20 backdrop-blur-xs border border-[#BFA16A]/50 text-[#E5D7BE] text-xs uppercase tracking-widest font-semibold">
                    {sec.name || 'Featured Destination'}
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight max-w-4xl mx-auto">
                    {sec.title || page.title}
                  </h1>
                  {sec.description && (
                    <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                      {sec.description}
                    </p>
                  )}
                  {sec.detailHtml && (
                    <div
                      className="mt-6 text-white/95 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-2 [&_p]:mb-3 [&_span]:text-[#BFA16A]"
                      dangerouslySetInnerHTML={{ __html: sec.detailHtml }}
                    />
                  )}
                  {sec.buttonText && (
                    <div className="pt-4 flex justify-center gap-4">
                      <Link
                        href={sec.buttonLink || '/buy'}
                        className="px-8 py-3.5 bg-[#BFA16A] hover:bg-[#aa8e59] text-white font-semibold text-xs tracking-wider uppercase rounded-xl shadow-md transition"
                        style={{ backgroundColor: sec.buttonColor || undefined }}
                      >
                        {sec.buttonText}
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            );
          }

          // -------------------------------------------------------------
          // 2. PROPERTIES & OFF-PLAN SECTIONS
          // -------------------------------------------------------------
          if (sec.type === 'property-listings') {
            return (
              <div key={sec.id} className="py-12 bg-[#FAF9F6] border-b border-[#E5E0D8]">
                <BuyPropertyListingsSection aboutHtml={sec.detailHtml} initialProperties={initialProperties} />
              </div>
            );
          }

          if (sec.type === 'property-search') {
            return (
              <div key={sec.id} className="py-4 bg-[#FAF9F6] border-b border-[#E5E0D8]">
                <BuySearchFilterSection />
              </div>
            );
          }

          if (sec.type === 'trending-projects') {
            return (
              <div key={sec.id} className="py-16 bg-[#FAF9F6] border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#BFA16A] block mb-1">
                      Off-Plan Spotlight
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-[#171717]">
                      {sec.title || 'Trending Projects'}
                    </h2>
                    {sec.description && <p className="text-sm text-[#737373] mt-1">{sec.description}</p>}
                  </div>
                  <ProjectGridSection />
                </div>
              </div>
            );
          }

          if (sec.type === 'recommended-opportunities') {
            return <RecommendedOpportunities key={sec.id} />;
          }

          if (sec.type === 'similar-projects') {
            return <SimilarProjectsSection key={sec.id} />;
          }

          if (sec.type === 'mortgage-calc') {
            return (
              <div key={sec.id} className="py-16 bg-white border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <BuyDetailMortgageCalculator />
                </div>
              </div>
            );
          }

          // -------------------------------------------------------------
          // 3. COMMUNITIES SECTIONS
          // -------------------------------------------------------------
          if (sec.type === 'explore-community') {
            return <ExploreCommunity key={sec.id} />;
          }

          if (sec.type === 'communities-grid' || sec.type === 'explore-more') {
            return (
              <div key={sec.id} className="py-16 bg-[#FAF9F6] border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#BFA16A] block mb-1">
                      Master Communities
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-[#171717]">
                      {sec.title || 'Explore Communities'}
                    </h2>
                    {sec.description && <p className="text-sm text-[#737373] mt-1">{sec.description}</p>}
                  </div>
                  <CommunityGridSection />
                </div>
              </div>
            );
          }

          if (sec.type === 'community-overview') {
            return (
              <div key={sec.id} className="py-12 bg-white border-b border-[#E5E0D8]">
                <CommunityOverviewSection title={sec.title} contentText={sec.description || sec.detailHtml} />
              </div>
            );
          }

          if (sec.type === 'community-comparison') {
            return (
              <div key={sec.id} className="py-16 bg-[#FAF9F6] border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <CommunityComparisonSection />
                </div>
              </div>
            );
          }

          if (sec.type === 'community-amenities-map') {
            return (
              <div key={sec.id} className="py-16 bg-white border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <CommunityAmenitiesLocationSection />
                </div>
              </div>
            );
          }

          // -------------------------------------------------------------
          // 4. DEVELOPERS SECTIONS
          // -------------------------------------------------------------
          if (sec.type === 'developer-logos') {
            const devs = Array.isArray(sec.selectedDevelopers) && sec.selectedDevelopers.length > 0
              ? sec.selectedDevelopers
              : ['Emaar Properties', 'Damac', 'Nakheel', 'Meraas', 'Sobha Realty', 'Danube'];

            return (
              <section key={sec.id} className="py-16 bg-white border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
                      {sec.title || 'Premier Master Developers'}
                    </h2>
                    {sec.description && (
                      <p className="text-xs sm:text-sm text-[#737373] max-w-xl mx-auto mt-2">
                        {sec.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-80 hover:opacity-100 transition-opacity">
                    {devs.map((dName: string, dIdx: number) => (
                      <div key={dIdx} className="p-4 rounded-xl border border-[#E5E0D8] bg-[#FAF9F6] min-w-[140px] text-center font-bold text-sm text-[#333333]">
                        {dName}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          if (sec.type === 'developers-grid') {
            return (
              <div key={sec.id} className="py-16 bg-[#FAF9F6] border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <DevelopersDirectoryGrid initialDevelopers={initialDevelopers} />
                </div>
              </div>
            );
          }

          if (sec.type === 'developers-intro') {
            return (
              <div key={sec.id} className="py-12 bg-white border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <DevelopersIntroSection />
                </div>
              </div>
            );
          }

          if (sec.type === 'developer-projects') {
            return (
              <div key={sec.id} className="py-16 bg-[#FAF9F6] border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <DeveloperProjectsSection />
                </div>
              </div>
            );
          }

          if (sec.type === 'developer-ask-banner') {
            return (
              <div key={sec.id} className="py-12 bg-white border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <DeveloperAskBriefBanner />
                </div>
              </div>
            );
          }

          // -------------------------------------------------------------
          // 5. THE VALLEY & MASTERPLAN SECTIONS
          // -------------------------------------------------------------
          if (sec.type === 'valley-score') {
            return (
              <div key={sec.id} className="py-12 bg-white border-b border-[#E5E0D8]">
                <ValleyOverviewScoreSection scoreCircleImage={sec.bgImage || '/92&.png'} />
              </div>
            );
          }

          if (sec.type === 'valley-why') {
            return (
              <div key={sec.id} className="py-12 bg-[#FAF9F6] border-b border-[#E5E0D8]">
                <WhyFSRecommendsValleySection
                  title={sec.title || 'Why FS Recommends'}
                  description={sec.description || sec.detailHtml}
                />
              </div>
            );
          }

          if (sec.type === 'valley-highlights') {
            return (
              <div key={sec.id} className="py-12 bg-white border-b border-[#E5E0D8]">
                <ValleyHighlightsSection
                  primaryBtnText={sec.buttonText}
                  primaryBtnLink={sec.buttonLink}
                />
              </div>
            );
          }

          // -------------------------------------------------------------
          // 6. BLOG & EDITORIAL SECTIONS
          // -------------------------------------------------------------
          if (sec.type === 'blog-featured') {
            return (
              <div key={sec.id} className="py-12 bg-white border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <BlogFeaturedJournalSection />
                </div>
              </div>
            );
          }

          if (sec.type === 'blog-grid') {
            return (
              <div key={sec.id} className="py-16 bg-[#FAF9F6] border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <BlogArticlesGridSection />
                </div>
              </div>
            );
          }

          if (sec.type === 'blog-where-to-live') {
            return (
              <div key={sec.id} className="py-12 bg-white border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <BlogWhereToLiveSection />
                </div>
              </div>
            );
          }

          if (sec.type === 'blog-uae-offplan-banner') {
            return (
              <div key={sec.id} className="py-12 bg-[#FAF9F6] border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <BlogUaeOffplanBannerSection />
                </div>
              </div>
            );
          }

          // -------------------------------------------------------------
          // 7. ABOUT US & ADVISORY SECTIONS
          // -------------------------------------------------------------
          if (sec.type === 'about-story') {
            return (
              <div key={sec.id} className="py-16 bg-white border-b border-[#E5E0D8]">
                <AboutUsSection />
              </div>
            );
          }

          if (sec.type === 'feature-bar') {
            return <FeatureBar key={sec.id} />;
          }

          if (sec.type === 'match-score') {
            return (
              <div key={sec.id} className="py-16 bg-[#FAF9F6] border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                  <OverallMatchScoreSection />
                </div>
              </div>
            );
          }

          if (sec.type === 'client-reviews') {
            return <LatestReviewsSection key={sec.id} />;
          }

          // -------------------------------------------------------------
          // 8. GENERAL, FORMS & FAQS SECTIONS
          // -------------------------------------------------------------
          if (sec.type === 'amenity-1') {
            const amenities = Array.isArray(sec.selectedAmenities) && sec.selectedAmenities.length > 0
              ? sec.selectedAmenities
              : ['Private Pool', 'State-of-the-art Gym', 'Concierge & Valet', 'Landscaped Parks', 'Kids Play Zone', 'Jogging Tracks'];

            return (
              <section key={sec.id} className="py-20 bg-white border-b border-[#E5E0D8]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E0D8] pb-8">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#BFA16A] block mb-2">
                        Lifestyle & Comfort
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#171717]">
                        {sec.title || 'Key Features & Amenities'}
                      </h2>
                      {sec.description && (
                        <p className="text-sm sm:text-base text-[#666666] max-w-2xl mt-2 leading-relaxed">
                          {sec.description}
                        </p>
                      )}
                    </div>
                    {sec.buttonText && (
                      <Link
                        href={sec.buttonLink || '/buy'}
                        className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:opacity-90 shrink-0 self-start md:self-auto"
                        style={{ backgroundColor: sec.buttonColor || '#BFA16A' }}
                      >
                        {sec.buttonText}
                      </Link>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {amenities.map((item: string, aIdx: number) => (
                      <div
                        key={aIdx}
                        className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E5E0D8] hover:border-[#BFA16A] hover:bg-white transition-all shadow-2xs group flex flex-col items-center text-center space-y-3"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E0D8] group-hover:border-[#BFA16A]/50 flex items-center justify-center text-[#BFA16A] shadow-xs">
                          <svg className="w-6 h-6 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-bold text-[#171717]">{item}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          if (sec.type === 'content-1') {
            return (
              <section key={sec.id} className="py-20 bg-white border-b border-[#E5E0D8]">
                <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
                  {sec.title && (
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#171717] border-b border-[#E5E0D8] pb-4">
                      {sec.title}
                    </h2>
                  )}
                  {sec.detailHtml ? (
                    <div
                      className="prose prose-lg max-w-none text-[#333333] leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_p]:mb-4 [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_th]:bg-[#FAF9F6] [&_th]:p-3 [&_th]:border [&_td]:p-3 [&_td]:border [&_img]:rounded-xl [&_img]:my-6"
                      dangerouslySetInnerHTML={{ __html: sec.detailHtml }}
                    />
                  ) : (
                    <p className="text-base text-[#666666] leading-relaxed">
                      {sec.description || 'Comprehensive content guide will appear here.'}
                    </p>
                  )}
                </div>
              </section>
            );
          }

          if (sec.type === 'offplan-guide') {
            return (
              <div key={sec.id} className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full py-16">
                <OffPlanGuideSection contentHtml={sec.detailHtml} pageSlug={page.slug} />
              </div>
            );
          }

          if (sec.type === 'faqs') {
            return (
              <div key={sec.id} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
                <BuyerGuideFaqSection pageSlug={page.slug} />
              </div>
            );
          }

          if (sec.type === 'strategy-session') {
            return (
              <div key={sec.id} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
                <BookStrategySessionBanner />
              </div>
            );
          }

          if (sec.type === 'footer-form') {
            return (
              <section key={sec.id} className="py-20 bg-[#FAF9F6] border-b border-[#E5E0D8]">
                <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
                  <div className="text-center space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#BFA16A]">
                      Direct Advisory
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-[#171717]">
                      {sec.title || 'Register Your Interest'}
                    </h2>
                    {sec.description && (
                      <p className="text-sm text-[#666666] max-w-lg mx-auto leading-relaxed">
                        {sec.description}
                      </p>
                    )}
                  </div>
                  <ProjectEnquiryForm />
                </div>
              </section>
            );
          }

          return null;
        })}

        {/* Clean Message if No Sections Added */}
        {dynamicSections.length === 0 && (
          <div className="py-32 text-center max-w-xl mx-auto px-4 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#EFE5D3] text-[#BFA16A] text-2xl flex items-center justify-center mx-auto shadow-xs">
              ✨
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#171717]">{page.title}</h1>
            <p className="text-sm text-[#737373] leading-relaxed">
              {page.meta_description || 'This page was created with the Dynamic Page Builder. Add sections in the CMS to populate content.'}
            </p>
          </div>
        )}

        <Footer />
      </div>
    );
  }

  // =========================================================================
  // Standard Default Dynamic Page Fallback
  // =========================================================================
  const hero = page.content?.hero || {};
  const features = page.content?.features || [];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#171717] flex flex-col font-sans">
      <Navbar />

      {/* Dynamic Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#FAF9F6] via-[#F4F1EA] to-[#FAF9F6] border-b border-[#E5E0D8]">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 text-center space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#BFA16A]/10 border border-[#BFA16A]/30 text-[#BFA16A] text-xs uppercase tracking-widest font-semibold">
            {page.title}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#171717] leading-tight">
            {hero.heading || page.title}
          </h1>
          <p className="text-lg sm:text-xl text-[#525252] max-w-3xl mx-auto leading-relaxed">
            {hero.subheading || 'Explore premium real estate opportunities curated for you.'}
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-3.5 bg-[#BFA16A] hover:bg-[#aa8e59] text-white font-semibold text-sm tracking-wider uppercase rounded-lg shadow-md transition"
            >
              {hero.ctaText || 'Contact Advisor'}
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Features / Sections */}
      {features.length > 0 && (
        <section className="py-20 max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat: { title: string; desc: string }, idx: number) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-[#E5E0D8] shadow-sm hover:shadow-md transition"
              >
                <div className="w-12 h-12 rounded-xl bg-[#BFA16A]/10 text-[#BFA16A] flex items-center justify-center font-bold text-lg mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-[#171717] mb-2">{feat.title}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs Section */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full pb-8 sm:pb-12">
        <BuyerGuideFaqSection pageSlug={slug} />
      </div>

      <Footer />
    </div>
  );
}
