import React from 'react';
import ProjectGridSection from './ProjectGridSection';
import ProjectOffPlanGuide from './ProjectOffPlanGuide';

interface ProjectMainContentProps {
  children?: React.ReactNode;
  description?: string;
  guideHtml?: string;
}

const DEFAULT_DESCRIPTION =
  "Explore Dubai’s complete range of off-plan properties in one place, including apartments, villas, townhouses, and penthouses from some of the city’s leading developers. Compare projects by launch price, payment plan, expected handover, location, developer, and property type to find an opportunity that matches your lifestyle or investment goals. Off-plan properties can offer access to new communities and modern developments at attractive launch prices, with flexible payment structures that allow buyers to spread payments throughout the construction period. Whether you are looking for a future home, a high-growth investment, or a property with strong rental potential, comparing projects carefully can help you make a more informed decision.";

export default function ProjectMainContent({ children, description, guideHtml }: ProjectMainContentProps) {
  const text = description?.trim() || DEFAULT_DESCRIPTION;
  return (
    <section className="w-full bg-white pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full space-y-12 sm:space-y-16">
        {/* Intro Paragraph */}
        <div>
          <p
            className="text-sm sm:text-base lg:text-[15.5px] text-[#A4A4A4] font-normal leading-[1.8] sm:leading-[1.85] whitespace-pre-line"
            style={{ fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif' }}
          >
            {text}
          </p>
        </div>

        {/* Filter and Cards Section (with golden Load more button) */}
        <ProjectGridSection />

        {/* Informational Guide Section */}
        <ProjectOffPlanGuide contentHtml={guideHtml} />

        {children}
      </div>
    </section>
  );
}
