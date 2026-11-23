'use client';

import React, { useState, useEffect } from 'react';

interface DevelopersIntroSectionProps {
  totalCount?: number | string;
  countLabel?: string;
  headingWord1?: string;
  headingWord2?: string;
  content?: string;
}

export default function DevelopersIntroSection({
  totalCount = 566,
  countLabel = 'Developers',
  headingWord1 = 'ALL',
  headingWord2 = 'DEVELOPERS',
  content,
}: DevelopersIntroSectionProps) {
  const [activeSort, setActiveSort] = useState<'most' | 'az'>('most');
  const [liveIntro, setLiveIntro] = useState<{
    word1?: string;
    word2?: string;
    count?: string | number;
    label?: string;
    content?: string;
  }>({});

  useEffect(() => {
    fetch('/api/cms-sync', { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => {
        const devIntro = json?.data?.pages?.developers?.content?.customSections?.['dev-intro'];
        if (devIntro) {
          const words = (devIntro.title || 'ALL DEVELOPERS').trim().split(/\s+/);
          const tagParts = (devIntro.tagline || '566 Developers').trim().split(/\s+/);
          setLiveIntro({
            word1: words[0],
            word2: words.slice(1).join(' '),
            count: tagParts[0],
            label: tagParts.slice(1).join(' '),
            content: devIntro.contentText,
          });
        }
      })
      .catch(() => {});
  }, []);

  const finalWord1 = liveIntro.word1 || headingWord1;
  const finalWord2 = liveIntro.word2 || headingWord2;
  const finalCount = liveIntro.count || totalCount;
  const finalLabel = liveIntro.label || countLabel;
  const finalContent = liveIntro.content || content;

  return (
    <section className="w-full bg-[#FAF9F6] py-12 sm:py-16 lg:py-20 border-b border-[#E5E0D8]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full space-y-6 sm:space-y-8">
        
        {/* Top Row: Heading & Count on Left, Sort Toggle Buttons on Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2 sm:space-y-3">
            {/* Heading: Cinzel Bold */}
            <h2
              className="text-2xl sm:text-4xl lg:text-[44px] uppercase tracking-[0.03em] leading-[1.15]"
              style={{
                fontFamily: 'var(--font-cinzel), Cinzel, serif',
                fontWeight: 700,
              }}
            >
              <span className="text-[#1B2538]">{finalWord1} </span>
              <span className="text-[#C2A468]">{finalWord2}</span>
            </h2>

            {/* 566 Poppins Bold, Developers Poppins Regular */}
            <div className="text-sm sm:text-base text-[#171717] tracking-normal">
              <span
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontWeight: 700,
                }}
              >
                {finalCount}{' '}
              </span>
              <span
                className="text-[#666666]"
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontWeight: 400,
                }}
              >
                {finalLabel}
              </span>
            </div>
          </div>

          {/* Right Action Buttons: "Most Project" & "A - Z" */}
          <div className="flex items-center gap-2.5 self-start sm:self-end">
            {/* Most Project Button (Solid Gold Pill) */}
            <button
              type="button"
              onClick={() => setActiveSort('most')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-[13px] transition-all cursor-pointer shadow-xs ${
                activeSort === 'most'
                  ? 'bg-[#BFA16A] text-white hover:bg-[#aa8e59]'
                  : 'bg-white text-[#737373] border border-[#E5E0D8] hover:border-[#BFA16A] hover:text-[#171717]'
              }`}
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontWeight: 500,
              }}
            >
              Most Project
            </button>

            {/* A - Z Button (Outline White Pill) */}
            <button
              type="button"
              onClick={() => setActiveSort('az')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-[13px] transition-all cursor-pointer ${
                activeSort === 'az'
                  ? 'bg-[#BFA16A] text-white'
                  : 'bg-white text-[#737373] border border-[#E5E0D8] hover:border-[#BFA16A] hover:text-[#171717]'
              }`}
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontWeight: 400,
              }}
            >
              A - Z
            </button>
          </div>
        </div>

        {/* Subtle Horizontal Divider Line */}
        <div className="w-full border-b border-[#E5E0D8]/90 pt-1" />

        {/* Content Paragraph: Poppins Light */}
        {finalContent ? (
          <p
            className="text-xs sm:text-[13.5px] lg:text-[14px] text-[#737373] leading-relaxed max-w-6xl font-light pt-1"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 300,
            }}
          >
            {finalContent}
          </p>
        ) : null}

      </div>
    </section>
  );
}
