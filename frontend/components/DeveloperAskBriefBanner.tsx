'use client';

import React, { useState } from 'react';

interface DeveloperAskBriefBannerProps {
  eyebrow?: string;
  titleWord1?: string;
  titleWord2?: string;
  question?: string;
}

export default function DeveloperAskBriefBanner({
  eyebrow = 'BEGIN QUIETLY',
  titleWord1 = 'ASK ABOUT',
  titleWord2 = 'EMAAR.',
  question = 'What brings you to dubai property?',
}: DeveloperAskBriefBannerProps) {
  const [selectedIntent, setSelectedIntent] = useState<'INVEST' | 'LIVE IN' | 'BOTH'>('INVEST');

  return (
    <section className="w-full bg-[#FAF9F6] py-14 sm:py-20 border-b border-[#E5E0D8]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full space-y-10 sm:space-y-12">
        {/* Top Header Block: Eyebrow + Cinzel Heading */}
        <div className="text-center space-y-2.5 sm:space-y-3">
          {/* Eyebrow in Poppins Regular / Medium */}
          <span
            className="text-xs sm:text-[13px] tracking-[0.22em] text-[#8C8C8C] uppercase block"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 400,
            }}
          >
            {eyebrow}
          </span>

          {/* Heading in Cinzel */}
          <h2
            className="text-2xl sm:text-4xl lg:text-[42px] uppercase tracking-[0.04em] leading-[1.2]"
            style={{
              fontFamily: 'var(--font-cinzel), Cinzel, serif',
              fontWeight: 500,
            }}
          >
            <span className="text-[#C2A468]">{titleWord1} </span>
            <span className="text-[#C2A468]">{titleWord2}</span>
          </h2>
        </div>

        {/* Black Card Banner (bg-[#171717], Donegal One) */}
        <div className="w-full rounded-2xl sm:rounded-3xl bg-[#171717] border border-[#2B2B2B] p-8 sm:p-12 lg:p-16 text-center text-white shadow-xl space-y-8 sm:space-y-10">
          
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
          <h3
            className="text-2xl sm:text-3xl lg:text-[38px] text-[#C2A468] tracking-normal pt-2"
            style={{
              fontFamily: 'var(--font-donegal), "Donegal One", serif',
              fontWeight: 400,
            }}
          >
            {question}
          </h3>

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
