'use client';

import React from 'react';

export default function BookStrategySessionBanner() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
        <div className="w-full bg-[#F5F5F3] border border-[#EBEBE8] rounded-[24px] p-8 sm:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-sm">
          {/* Left Text */}
          <div
            className="text-lg sm:text-xl lg:text-[22px] text-[#888888] leading-relaxed max-w-2xl font-normal"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            <strong className="font-bold text-[#555555]">Book a strategy session</strong> with our experts to discuss these recommendations in detail.
          </div>

          {/* Right Button */}
          <div className="flex-shrink-0">
            <a
              href="#book-session"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#BFA16A] hover:bg-[#a88c57] text-white font-semibold text-base sm:text-lg rounded-[12px] shadow-sm transition-colors duration-200"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              Book Strategy Session
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
