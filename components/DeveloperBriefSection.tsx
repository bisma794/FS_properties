'use client';

import React from 'react';

export interface DeveloperBriefSectionProps {
  developerName?: string;
  tagline?: string;
  description?: string;
  keyNumbersTagline?: string;
  keyNumbersText?: string;
  keyNumbersSource?: string;
  tableTitle?: string;
  tableImage?: string;
  tableMetrics?: {
    onRegister?: string;
    fromPrice?: string;
    nextHandover?: string;
    communities?: string;
    medianPrice?: string;
    downPayment?: string;
    postHandover?: string;
    mostHandovers?: string;
  };
}

export default function DeveloperBriefSection({
  developerName = 'EMAAR',
  tagline = 'Developer Brief',
  description = '74 off-plan projects on the live register, from 1.1m. every entry reads straight from the vila database: prices, payment plans, handover dates and photography.',
  keyNumbersTagline = 'KEY NUMBERS · AS OF 6 OCTOBER 2026',
  keyNumbersText = '74 live off-plan projects by emaar, median entry price aed 3.06m. entry prices start at aed 1.1m. median down payment 10%. 0% of them offer a post-handover payment plan. most handovers are scheduled for 2029.',
  keyNumbersSource = 'the vila properties project register, refreshed weekly from developer data.',
  tableTitle = 'Emaar, Measured',
  tableImage = '',
  tableMetrics = {},
}: DeveloperBriefSectionProps) {
  const metricsList = [
    { label: 'On Register', value: tableMetrics.onRegister || '74' },
    { label: 'From', value: tableMetrics.fromPrice || 'AED 1.1M' },
    { label: 'Next Handover', value: tableMetrics.nextHandover || 'Q4 2026' },
    { label: 'Communities', value: tableMetrics.communities || '22' },
    { label: 'Median Entry Price', value: tableMetrics.medianPrice || 'AED 3.06M' },
    { label: 'Median Down Payment', value: tableMetrics.downPayment || '10%' },
    { label: 'Post-Handover Plans', value: tableMetrics.postHandover || '0%' },
    { label: 'Most Handovers', value: tableMetrics.mostHandovers || '2029' },
  ];

  return (
    <section className="w-full bg-[#FAF9F6] py-12 sm:py-16 lg:py-20 border-b border-[#E5E0D8]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full space-y-12 sm:space-y-16">
        
        {/* ======================================================== */}
        {/* TOP SECTION: Left Brief + Right Measured Table Card      */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (7 cols): Developer Brief & Key Numbers Card */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Header Block */}
            <div className="space-y-2">
              <span
                className="text-xs sm:text-[13px] text-[#737373] tracking-wide block font-normal"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                {tagline}
              </span>

              <h2
                className="text-3xl sm:text-4xl lg:text-[44px] uppercase tracking-[0.04em] text-[#C2A468] leading-tight font-medium"
                style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
              >
                {developerName}
              </h2>
            </div>

            {/* Description Paragraph */}
            <p
              className="text-xs sm:text-[13.5px] lg:text-[14px] text-[#737373] leading-relaxed font-light"
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontWeight: 300,
              }}
            >
              {description}
            </p>

            {/* Subtle Divider */}
            <div className="w-full border-b border-[#E5E0D8]/90" />

            {/* Light Gold Box: Key Numbers */}
            <div className="rounded-2xl bg-[#FFF9EE] border border-[#F2E5C9] p-6 sm:p-7 space-y-4 shadow-2xs">
              <span
                className="text-xs sm:text-[13px] tracking-[0.14em] text-[#BFA16A] font-semibold uppercase block"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                {keyNumbersTagline}
              </span>

              <p
                className="text-xs sm:text-[13.5px] leading-relaxed text-[#7A715F] font-normal"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                {keyNumbersText}
              </p>

              <div className="pt-2 border-t border-[#F2E5C9]/80">
                <span
                  className="text-[11px] sm:text-xs text-[#BFA16A] font-normal"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  <strong className="font-semibold">Source:</strong> {keyNumbersSource}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Emaar, Measured Table Card */}
          <div className="lg:col-span-5">
            <div className="w-full rounded-2xl overflow-hidden border border-[#E5E0D8] bg-white shadow-sm">
              {/* Header: Gold banner */}
              <div className="bg-[#BA9864] px-6 py-4 text-white flex items-center justify-between gap-3">
                <h3
                  className="text-base sm:text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {tableTitle}
                </h3>
                {tableImage && (
                  <img
                    src={tableImage}
                    alt={tableTitle}
                    className="h-7 w-auto max-w-[100px] object-contain brightness-0 invert opacity-95"
                  />
                )}
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#F0ECE4] text-xs sm:text-[13px]">
                {metricsList.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-[#FAF8F5] transition-colors"
                  >
                    <span
                      className="text-[#555555] font-normal"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      {row.label}
                    </span>
                    <span
                      className="text-[#1A1A1A] font-medium"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* BOTTOM SECTION: 01 On The Register                        */}
        {/* ======================================================== */}
        <div className="space-y-3 pt-6 border-t border-[#E5E0D8]">
          <div className="flex items-baseline gap-2.5">
            <span
              className="text-base sm:text-lg font-semibold text-[#858585]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              01
            </span>
            <h3
              className="text-base sm:text-lg font-semibold text-[#858585] tracking-normal"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              On The Register
            </h3>
          </div>

          <p
            className="text-xs sm:text-[13.5px] leading-relaxed text-[#858585] font-light max-w-6xl"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 300,
            }}
          >
            The Register Below Is The Complete Picture, Not A Curated Shortlist. Filter It Against The Full Market On The Projects Page, Or Ask Us Which Of These We Would Shortlist For Your Brief; That Answer Depends On You, And It Is Free.
          </p>
        </div>

      </div>
    </section>
  );
}
