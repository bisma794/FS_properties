'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutUsSection() {
  const pillars = [
    {
      number: '01',
      title: 'Data-Driven Insights',
      description: 'We evaluate communities based on rental yields, future infrastructure growth, and long-term capital appreciation so your capital is deployed with total clarity.',
    },
    {
      number: '02',
      title: 'Tailored Strategy',
      description: 'Whether you seek passive income generation or a luxury sanctuary for your family, our advisory framework matches options directly to your goals.',
    },
    {
      number: '03',
      title: 'Unbiased Representation',
      description: 'We represent your interests, not developer targets. Our recommendation score (FS Score) provides an objective benchmark for every property.',
    },
  ];

  return (
    <section className="w-full bg-[#FAF9F6] py-16 sm:py-20 lg:py-24 border-t border-[#E5E0D8]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 space-y-20">
        
        {/* Mission Statement Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span
              className="text-xs font-semibold tracking-widest uppercase text-[#C5A267]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              OUR PHILOSOPHY
            </span>

            <h2
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#111111] leading-tight"
              style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
            >
              Guiding Investors & Families to High-Performing Real Estate Assets
            </h2>

            <p
              className="text-base sm:text-lg text-[#858585] font-light leading-relaxed"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              FS Real Estate Advisory was founded on a simple principle: real estate decisions should never be transactional sales pitches. In a market as dynamic as Dubai, success requires precision, master-plan forecasting, and disciplined advisory.
            </p>

            <p
              className="text-base sm:text-lg text-[#858585] font-light leading-relaxed"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              From master-planned villa communities like The Valley and Emaar South to high-yielding urban hubs like Dubai Hills, we empower clients with structural insights before they make a move.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
              <Image
                src="/dubai hills.png"
                alt="FS Real Estate Strategic Advisory"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-neutral-900/20" />
            </div>
          </div>
        </div>

        {/* 3 Pillars / Key Strengths Grid */}
        <div className="pt-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span
              className="text-xs font-semibold tracking-widest uppercase text-[#C5A267]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              WHY WORK WITH US
            </span>

            <h2
              className="text-3xl sm:text-4xl font-semibold text-[#111111] mt-3"
              style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
            >
              The FS Advisory Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="group p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:bg-[#C5A267] hover:border-[#C5A267] hover:text-white transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <span
                    className="text-3xl font-bold text-[#C5A267] group-hover:text-white/80 transition-colors"
                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                  >
                    {pillar.number}
                  </span>

                  <h3
                    className="text-xl font-semibold text-neutral-900 group-hover:text-white mt-4 mb-3 transition-colors"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    className="text-sm font-light text-[#858585] group-hover:text-white/90 leading-relaxed transition-colors"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
