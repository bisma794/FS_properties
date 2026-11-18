'use client';

import React from 'react';

interface WhyFSRecommendsProps {
  title?: string;
  description?: string;
}

export default function WhyFSRecommendsValleySection({
  title = 'Why FS Recommends',
  description,
}: WhyFSRecommendsProps) {
  return (
    <section className="w-full bg-[#F8F6F2] min-h-[380px] flex items-center py-12">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
        <div className="w-full text-left space-y-6">
          {/* Heading in Playfair Display Semi-Bold */}
          {title ? (
            <h2
              className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#111111] leading-tight"
              style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
            >
              {title}
            </h2>
          ) : null}

          {/* Content in Poppins Regular #858585 with line-height 146% */}
          {description ? (
            <p
              className="text-lg sm:text-xl lg:text-[22px] font-normal text-[#858585] w-full"
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                lineHeight: '1.46',
              }}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
