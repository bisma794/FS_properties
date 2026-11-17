'use client';

import React from 'react';

interface WhyFSRecommendsProps {
  title?: string;
  description?: string;
}

export default function WhyFSRecommendsValleySection({
  title = 'Why FS Recommends',
  description = "The Valley is an excellent choice for families seeking a balanced lifestyle with abundant green spaces, modern amenities, and easy access to key areas of Dubai. Its master-planned design and Emaar's track record make it a strong long-term investment.",
}: WhyFSRecommendsProps) {
  return (
    <section className="w-full bg-[#F8F6F2] min-h-[380px] flex items-center py-12">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
        <div className="w-full text-left space-y-6">
          {/* Heading in Playfair Display Semi-Bold */}
          <h2
            className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#111111] leading-tight"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
          >
            {title}
          </h2>

          {/* Content in Poppins Regular #858585 with line-height 146% */}
          <p
            className="text-lg sm:text-xl lg:text-[22px] font-normal text-[#858585] w-full"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              lineHeight: '1.46',
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
