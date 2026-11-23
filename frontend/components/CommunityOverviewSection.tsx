'use client';

import React from 'react';

interface CommunityOverviewSectionProps {
  tagline?: string;
  headingLine1?: string;
  headingLine2?: string;
  title?: string;
  content?: string;
  contentText?: string;
}

export default function CommunityOverviewSection({
  tagline = 'Community overview',
  headingLine1,
  headingLine2,
  title,
  content,
  contentText,
}: CommunityOverviewSectionProps) {
  // Determine final heading lines
  let finalH1 = headingLine1 || '';
  let finalH2 = headingLine2 || '';

  if (title) {
    if (title.includes('\n')) {
      const parts = title.split('\n');
      finalH1 = parts[0].trim();
      finalH2 = parts.slice(1).join(' ').trim();
    } else if (title.includes(',') && !headingLine1) {
      const commaIdx = title.indexOf(',');
      finalH1 = title.slice(0, commaIdx + 1).trim();
      finalH2 = title.slice(commaIdx + 1).trim();
    } else if (!headingLine1) {
      finalH1 = title.trim();
    }
  }

  if (!finalH1) finalH1 = 'WATERFRONT CALM,';
  if (!finalH2 && !title) finalH2 = 'CITY CONNECTION';

  const finalContent =
    contentText ||
    content ||
    'Dubai Creek Harbour combines a relaxed waterfront lifestyle with a contemporary residential skyline, creating a setting that feels both modern and connected. Its walkable promenades, open waterfront views, landscaped spaces, and proximity to Downtown Dubai make the community appealing to both end users and investors. As the area continues to develop, the experience of living or investing can vary significantly from one building to another. Factors such as building position, view corridor, orientation, surrounding amenities, accessibility, and expected handover timing should therefore be carefully considered. Understanding the wider development plans and upcoming infrastructure is equally important, as these can influence both day-to-day convenience and long-term value. Comparing projects within the community helps identify not just the most attractive home, but the location and investment opportunity that best match your priorities.';

  return (
    <section className="w-full bg-[#FAF9F6] py-14 sm:py-20 lg:py-24 border-b border-[#E5E0D8]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full space-y-6 sm:space-y-8">
        {/* Header Block */}
        <div className="space-y-3 sm:space-y-4">
          {/* Tagline: Poppins Medium */}
          <span
            className="text-xs sm:text-[13.5px] font-medium text-[#171717] tracking-normal block"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            {tagline}
          </span>

          {/* Heading: Cinzel Regular */}
          <h2
            className="text-2xl sm:text-4xl lg:text-[44px] uppercase tracking-[0.03em] leading-[1.18]"
            style={{
              fontFamily: 'var(--font-cinzel), Cinzel, serif',
              fontWeight: 400,
            }}
          >
            <span className="block text-[#1B2538]">{finalH1}</span>
            {finalH2 && (
              <span className="block text-[#C2A468] mt-1 sm:mt-1.5">{finalH2}</span>
            )}
          </h2>
        </div>

        {/* Subtle Horizontal Divider Line */}
        <div className="w-full border-b border-[#E5E0D8]/90 pt-1" />

        {/* Content Paragraph: Poppins Light */}
        <p
          className="text-xs sm:text-[13.5px] lg:text-[14px] text-[#737373] leading-relaxed max-w-6xl font-light pt-1 whitespace-pre-line"
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontWeight: 300,
          }}
        >
          {finalContent}
        </p>
      </div>
    </section>
  );
}
