'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface GoalOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const goalOptions: GoalOption[] = [
  {
    id: 'family-home',
    title: 'Family Home',
    subtitle: 'Find The Perfect Place To Put Down Roots',
    icon: (
      <svg className="w-7 h-7 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.016-.941l.9-2.316A7.95 7.95 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    id: 'investment',
    title: 'Investment',
    subtitle: 'Build Wealth Through Real Estate',
    icon: (
      <svg className="w-7 h-7 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a.5.5 0 00.71 0l7.234-7.234M21 8.25V12m0-3.75h-3.75" />
      </svg>
    ),
  },
  {
    id: 'global-clients',
    title: 'Global Clients',
    subtitle: 'Cross-Border Advisory With Local Expertise You Can Trust.',
    icon: (
      <svg className="w-7 h-7 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 3a17.5 17.5 0 000 18M12.5 3a17.5 17.5 0 010 18" />
      </svg>
    ),
  },
  {
    id: 'passive-income',
    title: 'Passive Income',
    subtitle: 'Finding The Right Home In The Right Community.',
    icon: (
      <svg className="w-7 h-7 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-9h4.5a2.25 2.25 0 010 4.5H9.75a2.25 2.25 0 000 4.5H15" />
      </svg>
    ),
  },
  {
    id: 'capital-growth',
    title: 'Capital Growth',
    subtitle: 'Building Wealth Through Strategic Real Estate Investments.',
    icon: (
      <svg className="w-7 h-7 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.25V21h4.5v-7.75H3zm6.75-4.5V21h4.5V8.75h-4.5zm6.75-5.75V21H21V3h-4.5z" />
      </svg>
    ),
  },
  {
    id: 'luxury-lifestyle',
    title: 'Luxury Lifestyle',
    subtitle: 'Cross-Border Advisory With Local Expertise You Can Trust.',
    icon: (
      <svg className="w-7 h-7 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

interface GoalSelectionStepProps {
  heading?: string;
  subheading?: string;
  detailHtml?: string;
  goals?: Array<{
    id: string;
    title: string;
    subtitle: string;
    icon?: string;
  }>;
}

export default function GoalSelectionStep({
  heading = 'What is your primary goal?',
  subheading = 'This helps us tailor recommendations to what matters most to you.',
  detailHtml,
  goals,
}: GoalSelectionStepProps) {
  const [selectedId, setSelectedId] = useState<string>('family-home');
  const [activeStep, setActiveStep] = useState<number>(1);
  const totalSteps = 6;

  // Helper to render dynamic icon (SVG code or Image URL) or fallback
  const renderIcon = (customIcon?: string, defaultNode?: React.ReactNode) => {
    if (!customIcon) return defaultNode;
    if (customIcon.includes('<') && customIcon.includes('>')) {
      return (
        <svg
          className="w-7 h-7 stroke-[1.5]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          dangerouslySetInnerHTML={{ __html: customIcon }}
        />
      );
    }
    return (
      <img
        src={customIcon}
        alt="Goal Icon"
        className="w-7 h-7 object-contain"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
    );
  };

  // Merge dynamic goals with default icons
  const activeGoals: GoalOption[] = (goals && goals.length > 0)
    ? goals.map((g, idx) => {
        const defaultMatch = goalOptions.find((opt) => opt.id === g.id) || goalOptions[idx % goalOptions.length];
        return {
          id: g.id || `goal-${idx}`,
          title: g.title,
          subtitle: g.subtitle,
          icon: renderIcon(g.icon, defaultMatch ? defaultMatch.icon : goalOptions[0].icon),
        };
      })
    : goalOptions;

  const handleGoalSelect = (goalId: string, index: number) => {
    setSelectedId(goalId);
    // Cycle or map step number (1 to 6) based on clicked card
    const newStep = ((index % totalSteps) + 1);
    setActiveStep(newStep);
  };

  const handleContinue = () => {
    if (activeStep < totalSteps) {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <section className="w-full bg-[#FAF9F6] py-16 md:py-24">
      {/* Container aligned exactly with AI Advisory Engine heading (max-w-7xl px-6 sm:px-10 lg:px-16) */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-10 gap-4">
          <div>
            {detailHtml ? (
              <div
                className="font-playfair text-3xl md:text-[38px] font-medium text-[#111111] leading-tight [&>h2]:text-3xl [&>h2]:md:text-[38px] [&>h2]:font-medium [&>h2]:text-[#111111] [&>h2]:leading-tight [&_span]:text-[#BFA16A] [&>p]:text-[#666666] [&>p]:font-light [&>p]:text-base [&>p]:md:text-[17px] [&>p]:mt-2"
                style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                dangerouslySetInnerHTML={{ __html: detailHtml }}
              />
            ) : (
              <>
                <h2
                  className="text-3xl md:text-[38px] font-medium text-[#111111] leading-tight"
                  style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                >
                  {heading}
                </h2>
                <p
                  className="text-[#666666] font-light text-base md:text-[17px] mt-2"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {subheading}
                </p>
              </>
            )}
          </div>
          <div
            className="text-right text-[#777777] font-light text-base"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            <div>Step</div>
            <div className="text-lg font-normal text-[#444444] transition-all duration-300">
              {activeStep} of {totalSteps}
            </div>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-14 justify-items-center">
          {activeGoals.map((goal, idx) => {
            const isSelected = selectedId === goal.id;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => handleGoalSelect(goal.id, idx)}
                className={`group relative flex flex-col items-center justify-center p-6 text-center rounded-[6px] border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#BFA16A] text-white border-[#BFA16A] shadow-md scale-[1.01]'
                    : 'bg-[#FCFCFC] text-[#111111] border-[#E5E5E5] hover:bg-[#BFA16A] hover:text-white hover:border-[#BFA16A] hover:shadow-md'
                }`}
                style={{
                  width: '100%',
                  maxWidth: '397px',
                  height: '234px',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                {/* Selected Checkmark Badge (top right) */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white text-[#BFA16A] flex items-center justify-center shadow-sm">
                    <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                )}

                {/* Icon Box Container */}
                <div
                  className={`w-14 h-14 rounded-[8px] border flex items-center justify-center mb-5 transition-colors duration-300 ${
                    isSelected
                      ? 'border-white/40 bg-white/20 text-white'
                      : 'border-[#111111]/30 bg-transparent text-[#111111] group-hover:border-white/40 group-hover:bg-white/20 group-hover:text-white'
                  }`}
                >
                  {goal.icon}
                </div>

                {/* Card Title (Inter font) */}
                <h3 className="font-semibold text-lg md:text-[19px] leading-snug tracking-tight">
                  {goal.title}
                </h3>

                {/* Card Subtitle */}
                <p
                  className={`text-xs md:text-[13px] leading-relaxed mt-2 max-w-[280px] font-normal transition-colors duration-300 ${
                    isSelected ? 'text-white/90' : 'text-[#777777] group-hover:text-white/90'
                  }`}
                >
                  {goal.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Full Golden Continue Button Aligned With Cards */}
        <div className="mt-14">
          {activeStep < totalSteps ? (
            <button
              type="button"
              onClick={handleContinue}
              className="w-full h-[56px] bg-[#BFA16A] hover:bg-[#a88c57] text-white font-medium text-base md:text-[17px] tracking-wider uppercase rounded-[4px] shadow-sm transition-colors duration-200 cursor-pointer flex items-center justify-center"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              CONTINUE
            </button>
          ) : (
            <Link href="/advisory-report" className="block w-full">
              <button
                type="button"
                className="w-full h-[56px] bg-[#BFA16A] hover:bg-[#a88c57] text-white font-medium text-base md:text-[17px] tracking-wider uppercase rounded-[4px] shadow-sm transition-colors duration-200 cursor-pointer flex items-center justify-center"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                VIEW ADVISORY REPORT
              </button>
            </Link>
          )}
        </div>

        {/* Stepper Progress Indicator */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center justify-center">
          <span
            className="text-xs uppercase tracking-[0.2em] text-[#888888] font-medium mb-3 transition-all duration-300"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            STEP {activeStep} TO {totalSteps}
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            {Array.from({ length: totalSteps }).map((_, stepIdx) => {
              const isCurrent = stepIdx + 1 === activeStep;
              const isPassed = stepIdx + 1 < activeStep;
              return (
                <button
                  key={stepIdx}
                  type="button"
                  onClick={() => setActiveStep(stepIdx + 1)}
                  className={`w-10 sm:w-14 h-[3px] rounded-full transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#BFA16A] h-[4px] scale-y-110 shadow-xs'
                      : isPassed
                      ? 'bg-[#BFA16A]/70'
                      : 'bg-[#D9D9D9] hover:bg-[#C4C4C4]'
                  }`}
                  aria-label={`Go to step ${stepIdx + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Methodology Banner */}
        <div className="mt-14 sm:mt-16 w-full bg-[#FCFCFC] border border-[#EEEEEE] rounded-[12px] p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 shadow-sm">
          {/* Banner Text Content */}
          <div className="max-w-2xl text-left">
            <h3
              className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#111111] leading-tight"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              How The Engine Reads A Property
            </h3>
            <p
              className="text-[#858585] font-normal text-sm sm:text-base lg:text-[17px] leading-relaxed mt-4"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              We Weigh 50+ Signals — Schools, Transit, Infrastructure, Historical Pricing, Rental Demand, Developer Track Record, And Forecast Growth.
            </p>
            <a
              href="#methodology"
              className="inline-flex items-center gap-2 text-[#BFA16A] hover:text-[#a88c57] font-medium text-sm sm:text-base mt-6 transition-colors"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              Learn About Our Methodology
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Banner Image with FS Logo overlay */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex-shrink-0 flex items-center justify-center">
            <img
              src="/bannerimg.png"
              alt="Engine methodology orbital diagram"
              className="w-full h-full object-contain"
            />
            {/* Center FS Text overlay over golden circle */}
            <span
              className="absolute text-white font-serif italic text-2xl sm:text-3xl lg:text-4xl font-normal select-none pointer-events-none"
              style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
            >
              FS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
