'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PropertyDetailSection() {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    'Overview',
    'FS Perspective',
    'Payment Plan',
    'Amenities',
    'Location',
    'Community',
    'Documents',
  ];

  const insights = [
    {
      title: 'Strong Growth',
      desc: 'High demand area with future infrastructure',
      bgStyle: 'bg-white border-neutral-200 text-neutral-900 hover:bg-[#C5A267] hover:border-[#C5A267] hover:text-white',
      iconBg: 'bg-neutral-50 text-neutral-700 border-neutral-200 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30',
      icon: (
        <svg className="w-5 h-5 text-neutral-800 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Great Connectivity',
      desc: 'Easy access to Al Ain Road and key locations',
      bgStyle: 'bg-white border-neutral-200 text-neutral-900 hover:bg-[#C5A267] hover:border-[#C5A267] hover:text-white',
      iconBg: 'bg-neutral-50 text-neutral-700 border-neutral-200 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30',
      icon: (
        <svg className="w-5 h-5 text-neutral-800 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
    {
      title: 'Family Friendly',
      desc: 'Parks, schools and community amenities',
      bgStyle: 'bg-white border-neutral-200 text-neutral-900 hover:bg-[#C5A267] hover:border-[#C5A267] hover:text-white',
      iconBg: 'bg-neutral-50 text-neutral-700 border-neutral-200 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30',
      icon: (
        <svg className="w-5 h-5 text-neutral-800 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Developer Trust',
      desc: "Emaar's proven track record",
      bgStyle: 'bg-white border-neutral-200 text-neutral-900 hover:bg-[#C5A267] hover:border-[#C5A267] hover:text-white',
      iconBg: 'bg-neutral-50 text-neutral-700 border-neutral-200 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30',
      icon: (
        <svg className="w-5 h-5 text-neutral-800 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  const thumbnailImages = [
    '/thevalley-img.png',
    '/dubaihillestate.png',
    '/grandpolo.png',
    '/banner_img.png',
  ];

  return (
    <section className="w-full bg-[#FAF9F6] py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        
        {/* Top Back & Action Links */}
        <div className="flex items-center justify-between mb-6 text-sm text-neutral-500 font-poppins">
          <Link
            href="/the-valley"
            className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
          >
            <span>&lt;</span> Back
          </Link>

          <div className="flex items-center gap-6">
            <button
              type="button"
              className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>Save</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-5.367 3 3 0 000 5.367zm0 8a3 3 0 100-5.367 3 3 0 000 5.367z" />
              </svg>
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Top Main Grid: Left Gallery + Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Side: Images Gallery Column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Featured Main Image */}
            <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] rounded-2xl overflow-hidden shadow-sm border border-neutral-200/60">
              <Image
                src="/property_detail_main.jpg"
                alt="4 Bedroom Villa Farm Gardens 2"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {thumbnailImages.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden border border-neutral-200/60 cursor-pointer group"
                >
                  <Image
                    src={src}
                    alt={`Property view ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* +10 overlay on the last thumbnail */}
                  {idx === 3 && (
                    <div className="absolute inset-0 bg-neutral-900/60 flex items-center justify-center text-white font-semibold text-base sm:text-lg">
                      +10
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Property Information & Perspective Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3.5 py-1 bg-[#FAF4EA] text-[#BFA16A] rounded-full text-xs font-medium border border-[#EFE3CF]">
                  The Valley
                </span>
                <span className="px-3.5 py-1 bg-[#F5F4F0] text-neutral-600 rounded-full text-xs font-medium border border-neutral-200">
                  Farm Gardens
                </span>
              </div>

              {/* Title in Playfair */}
              <h1
                className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-neutral-900 leading-tight"
                style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
              >
                4 Bedroom Villa<br />Farm Gardens 2
              </h1>
              
              <p
                className="text-sm text-neutral-500 font-light mt-1.5"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                by Emaar
              </p>

              {/* Price */}
              <div className="mt-5">
                <div
                  className="text-2xl sm:text-3xl font-bold text-neutral-900"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  AED 2,850,000
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">Starting Price</p>
              </div>

              {/* Key Features / Stats Grid */}
              <div className="grid grid-cols-4 gap-2 border-y border-neutral-200 py-4 my-6">
                <div>
                  <div className="text-lg font-bold text-neutral-900">4</div>
                  <div className="text-xs text-neutral-500 font-light">Bedrooms</div>
                </div>
                <div className="border-l border-neutral-200 pl-3">
                  <div className="text-lg font-bold text-neutral-900">5</div>
                  <div className="text-xs text-neutral-500 font-light">Bathrooms</div>
                </div>
                <div className="border-l border-neutral-200 pl-3">
                  <div className="text-lg font-bold text-neutral-900">3,200</div>
                  <div className="text-xs text-neutral-500 font-light">Sq.ft</div>
                </div>
                <div className="border-l border-neutral-200 pl-3">
                  <div className="text-lg font-bold text-neutral-900">2</div>
                  <div className="text-xs text-neutral-500 font-light">Parking</div>
                </div>
              </div>

              {/* FS Advisory Perspective Card */}
              <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 shadow-sm">
                <h3
                  className="text-lg font-semibold text-neutral-900 mb-2"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  FS Advisory Perspective
                </h3>
                <p
                  className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed mb-6"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  Excellent choice for families looking for a modern home in a green community with strong long-term appreciation potential.
                </p>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-neutral-100 text-xs">
                  <div>
                    <span className="text-neutral-400 block text-[11px] mb-0.5">Best For</span>
                    <span className="font-bold text-neutral-900">Families</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px] mb-0.5">Investment Horizon</span>
                    <span className="font-bold text-neutral-900">7 - 10 Years</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px] mb-0.5">Rental Potential</span>
                    <span className="font-bold text-neutral-900">AED 160K - 180K / yr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Call to Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                className="w-full py-3.5 px-4 bg-white border border-neutral-300 rounded-xl text-neutral-900 font-medium text-sm hover:bg-neutral-50 transition-colors shadow-sm text-center"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                View Floor Plan
              </button>
              
              <button
                type="button"
                className="w-full py-3.5 px-4 bg-[#C5A267] text-white rounded-xl font-medium text-sm hover:bg-[#b59257] transition-colors shadow-sm text-center"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Enquire Now
              </button>
            </div>

          </div>

        </div>

        {/* Continuity Section: Navigation Tabs & FS Key Insights */}
        <div className="mt-16 sm:mt-20 pt-4">
          
          {/* Navigation Tabs Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4 overflow-x-auto no-scrollbar gap-6 sm:gap-10">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm sm:text-base transition-colors relative pb-4 -mb-4 whitespace-nowrap ${
                    isActive
                      ? 'font-semibold text-neutral-900 border-b-2 border-[#C5A267]'
                      : 'font-normal text-neutral-400 hover:text-neutral-700'
                  }`}
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Section Heading */}
          <div className="mt-10 mb-6">
            <h2
              className="text-xl sm:text-2xl font-semibold text-neutral-900"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              FS Key Insights
            </h2>
          </div>

          {/* Key Insights 4-Container Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {insights.map((item, idx) => (
              <div
                key={idx}
                className={`group p-6 rounded-2xl border ${item.bgStyle} transition-all duration-200 shadow-sm flex flex-col justify-between min-h-[180px] cursor-pointer`}
              >
                {/* Icon Box */}
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-6 transition-colors ${item.iconBg}`}>
                  {item.icon}
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="text-base font-semibold mb-1.5 text-neutral-900 group-hover:text-white transition-colors"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm font-normal leading-relaxed text-neutral-400 group-hover:text-white/90 transition-colors"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {item.desc}
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
