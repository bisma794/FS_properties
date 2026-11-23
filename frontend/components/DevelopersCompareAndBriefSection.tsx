'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const DEFAULT_BOTTOM_TEXT =
  '245 developers with live off-plan inventory, photographed by their own launches and measured from the VILA database.\n\nDeciding between two names? Compare developers side by side: Emaar vs Sobha Realty, Emaar vs Damac, Sobha Realty vs Binghatti and more, with live project counts, entry prices, down payments and handover years from the register.';

export default function DevelopersCompareAndBriefSection({
  bottomText,
}: {
  bottomText?: string;
} = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntent, setSelectedIntent] = useState<'INVEST' | 'LIVE IN' | 'BOTH'>('INVEST');
  const [liveBottomText, setLiveBottomText] = useState<string | undefined>(bottomText);

  useEffect(() => {
    fetch('/api/cms-sync', { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => {
        const text = json?.data?.pages?.developers?.content?.customSections?.['dev-grid']?.contentText;
        if (text) setLiveBottomText(text);
      })
      .catch(() => {});
  }, []);

  const finalBottomText = liveBottomText || bottomText || DEFAULT_BOTTOM_TEXT;
  const paragraphs = finalBottomText
    .split(/\n\s*\n|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="w-full bg-[#FAF9F6] py-10 sm:py-14 border-b border-[#E5E0D8]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full space-y-10 sm:space-y-12">
        
        {/* ======================================================== */}
        {/* TOP ROW: Continuity Text (Left) + Search Bar (Right)    */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12">
          {/* Left Text in Poppins Regular #939393 */}
          <div
            className="space-y-4 max-w-3xl text-xs sm:text-[13.5px] lg:text-[14px] leading-relaxed text-[#939393]"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 400,
            }}
          >
            {paragraphs.map((para, idx) => {
              if (para.includes('Compare developers side by side')) {
                const [before, after] = para.split('Compare developers side by side');
                return (
                  <p key={idx}>
                    {before}
                    <Link
                      href="/compare-communities"
                      className="underline underline-offset-2 hover:text-[#BFA16A] transition-colors font-medium text-[#737373]"
                    >
                      Compare developers side by side
                    </Link>
                    {after}
                  </p>
                );
              }
              return <p key={idx}>{para}</p>;
            })}
          </div>

          {/* Right: Find a developer Search Bar in Poppins Light */}
          <div className="w-full sm:w-[280px] md:w-[320px] shrink-0 self-start lg:self-start">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Find a developer"
                className="w-full bg-white rounded-lg border border-[#E5E0D8] px-4 py-2.5 sm:py-3 pr-10 text-xs sm:text-[13px] text-[#171717] placeholder-[#A3A3A3] focus:outline-none focus:border-[#BFA16A] transition-colors shadow-2xs"
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontWeight: 300,
                }}
              />
              <svg
                className="absolute right-3.5 w-4 h-4 text-[#A3A3A3] pointer-events-none stroke-[1.8]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM ROW: Black Card Banner (bg-[#171717], Donegal One)*/}
        {/* ======================================================== */}
        <div className="w-full rounded-2xl sm:rounded-3xl bg-[#171717] border border-[#2B2B2B] p-8 sm:p-12 lg:p-16 text-center text-white shadow-xl space-y-8 sm:space-y-10">
          
          {/* Top Banner Heading: Donegal One */}
          <h3
            className="text-2xl sm:text-3xl lg:text-4xl text-[#C2A468] tracking-normal"
            style={{
              fontFamily: 'var(--font-donegal), "Donegal One", serif',
              fontWeight: 400,
            }}
          >
            Tell us the brief instead.
          </h3>

          {/* Stepper Navigation: 01 Intent — 02 Budget — 03 Timeline — 04 Contact */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-[13.5px] text-[#D4D4D4] tracking-wide">
            <span
              className="text-white font-medium"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              01 Intent
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#404040]" />

            <span
              className="text-[#8E8E8E]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              02 Budget
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#404040]" />

            <span
              className="text-[#8E8E8E]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              03 Timeline
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#404040]" />

            <span
              className="text-[#8E8E8E]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              04 Contact
            </span>
          </div>

          {/* Question: What brings you to dubai property? (Donegal One) */}
          <h4
            className="text-2xl sm:text-3xl lg:text-[38px] text-[#C2A468] tracking-normal pt-2"
            style={{
              fontFamily: 'var(--font-donegal), "Donegal One", serif',
              fontWeight: 400,
            }}
          >
            What brings you to dubai property?
          </h4>

          {/* 3 Intent Selection Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
            {/* 1. INVEST (Active Gold Pill) */}
            <button
              type="button"
              onClick={() => setSelectedIntent('INVEST')}
              className={`min-w-[140px] sm:min-w-[160px] py-3 px-6 rounded-lg text-xs sm:text-sm uppercase tracking-wider font-medium transition-all cursor-pointer ${
                selectedIntent === 'INVEST'
                  ? 'bg-[#BFA16A] text-white shadow-md'
                  : 'bg-transparent text-white border border-[#404040] hover:border-[#BFA16A]'
              }`}
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              INVEST
            </button>

            {/* 2. LIVE IN (White Pill) */}
            <button
              type="button"
              onClick={() => setSelectedIntent('LIVE IN')}
              className={`min-w-[140px] sm:min-w-[160px] py-3 px-6 rounded-lg text-xs sm:text-sm uppercase tracking-wider font-medium transition-all cursor-pointer ${
                selectedIntent === 'LIVE IN'
                  ? 'bg-white text-[#171717] shadow-md'
                  : 'bg-transparent text-white border border-[#404040] hover:border-white'
              }`}
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              LIVE IN
            </button>

            {/* 3. BOTH (Dark Outline Pill) */}
            <button
              type="button"
              onClick={() => setSelectedIntent('BOTH')}
              className={`min-w-[140px] sm:min-w-[160px] py-3 px-6 rounded-lg text-xs sm:text-sm uppercase tracking-wider font-medium transition-all cursor-pointer ${
                selectedIntent === 'BOTH'
                  ? 'bg-[#BFA16A] text-white shadow-md'
                  : 'bg-transparent text-white border border-[#404040] hover:border-[#BFA16A]'
              }`}
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              BOTH
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
