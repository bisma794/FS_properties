'use client';

import React from 'react';
import Link from 'next/link';

interface AmenityItem {
  name: string;
  icon: React.ReactNode;
}

const amenitiesData: AmenityItem[] = [
  {
    name: 'Children Play Area',
    icon: (
      <svg className="w-8 h-8 text-[#C2A468]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="4" r="1.5" />
        <circle cx="8" cy="10" r="1.5" />
        <path d="M8 11.5v3.5m0 0l-2 3m2-3l2 3M5.5 11l2.5 1.5 2-2" />
        <circle cx="16" cy="10" r="1.5" />
        <path d="M16 11.5v3.5m0 0l-2 3m2-3l2 3M18.5 11l-2.5 1.5-2-2" />
      </svg>
    ),
  },
  {
    name: 'Schools',
    icon: (
      <svg className="w-8 h-8 text-[#C2A468]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L4 7v14h16V7l-8-4z" />
        <path d="M9 21v-7a3 3 0 016 0v7" />
        <circle cx="12" cy="8.5" r="1.5" />
      </svg>
    ),
  },
  {
    name: 'Restaurants',
    icon: (
      <svg className="w-8 h-8 text-[#C2A468]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M5 6v5a2 2 0 002 2v5M7 6v7M20 6v12M17 6v6a2 2 0 002 2" />
      </svg>
    ),
  },
  {
    name: 'Shopping Mall',
    icon: (
      <svg className="w-8 h-8 text-[#C2A468]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l2-5h14l2 5v1a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 01-3 3 3 3 0 01-3-3V9z" />
        <path d="M5 13v8h14v-8M9 21v-5h6v5" />
      </svg>
    ),
  },
  {
    name: 'Walking Trails',
    icon: (
      <svg className="w-8 h-8 text-[#C2A468]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19c4-5 6-8 10-8s5-2 6-6" strokeDasharray="1.5 2" />
        <path d="M6 21c4-5 6-8 10-8s5-2 6-6" />
        <circle cx="10" cy="13" r="1" />
        <circle cx="14" cy="9" r="1" />
        <circle cx="7" cy="17" r="1" />
      </svg>
    ),
  },
  {
    name: 'Sports Facilities',
    icon: (
      <svg className="w-8 h-8 text-[#C2A468]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="15" cy="5" r="2" />
        <path d="M4 11h4M3 15h4M10 11l3-2 3 2 3-1" />
        <path d="M13 9v5l-4 4-2-2" />
        <path d="M13 14l3 3 3-1" />
      </svg>
    ),
  },
  {
    name: 'Gym',
    icon: (
      <svg className="w-8 h-8 text-[#C2A468]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5l11 11M5 9l2-2M15 19l2-2M3.5 10.5l3-3M13.5 20.5l3-3M6.5 5l-2 2M19.5 18l-2 2" />
      </svg>
    ),
  },
  {
    name: 'Parking Area',
    icon: (
      <svg className="w-8 h-8 text-[#C2A468]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l1.8-4.5a2 2 0 011.8-1.5h6.8a2 2 0 011.8 1.5L19 13v5a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H7v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-5z" />
        <circle cx="7.5" cy="13.5" r="1.5" />
        <circle cx="16.5" cy="13.5" r="1.5" />
      </svg>
    ),
  },
  {
    name: '24X7 Security',
    icon: (
      <svg className="w-8 h-8 text-[#C2A468]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 018 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
  },
  {
    name: 'Golf Course',
    icon: (
      <svg className="w-8 h-8 text-[#C2A468]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17c3-2 7-3 10-1s6 2 6 0-3-3-6-3-7 1-10 4z" />
        <path d="M12 15V4l6 3-6 3" />
        <circle cx="12" cy="15" r="1.5" fill="#C2A468" />
      </svg>
    ),
  },
];

interface LocationItem {
  destination: string;
  time: string;
}

const locationConnections: LocationItem[] = [
  { destination: 'DOWNTOWN DUBAI', time: 'APPROX. 15 MIN' },
  { destination: 'DXB AIRPORT', time: 'APPROX. 15 MIN' },
  { destination: 'BUSINESS BAY', time: 'APPROX. 15 MIN' },
];

interface CommunityAmenitiesLocationSectionProps {
  tagline?: string;
  headingLine1?: string;
  headingLine2?: string;
  title?: string;
  communityName?: string;
  description?: string;
  amenities?: string[] | { name: string; iconSvg?: string }[];
  locationConnections?: LocationItem[];
  mapQuery?: string;
}

export default function CommunityAmenitiesLocationSection({
  tagline = 'COMMUNITY AMENITIES',
  headingLine1 = 'EVERYDAY LIFE, ',
  headingLine2 = 'CLOSE AT HAND',
  title,
  communityName,
  description,
  amenities,
  locationConnections: customLocationConnections,
  mapQuery,
}: CommunityAmenitiesLocationSectionProps) {
  // Determine heading lines
  let finalH1 = headingLine1;
  let finalH2 = headingLine2;
  if (title) {
    if (title.includes('\n')) {
      const parts = title.split('\n');
      finalH1 = parts[0].trim();
      finalH2 = parts.slice(1).join(' ').trim();
    } else if (title.includes(',')) {
      const commaIdx = title.indexOf(',');
      finalH1 = title.slice(0, commaIdx + 1).trim();
      finalH2 = title.slice(commaIdx + 1).trim();
    } else {
      finalH1 = title.trim();
      finalH2 = '';
    }
  }

  const connections =
    customLocationConnections && customLocationConnections.length > 0
      ? customLocationConnections
      : locationConnections;

  const displayName = communityName || 'DUBAI';
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    mapQuery || communityName ? `${communityName}, Dubai` : 'Dubai'
  )}`;
  // Map passed amenity names to known icons or fallback icon
  const getAmenityIcon = (name: string, customSvg?: string) => {
    if (customSvg) {
      return (
        <span
          className="w-8 h-8 text-[#C2A468] flex items-center justify-center [&>svg]:w-8 [&>svg]:h-8"
          dangerouslySetInnerHTML={{ __html: customSvg }}
        />
      );
    }
    const match = amenitiesData.find((a) => a.name.toLowerCase() === name.toLowerCase());
    if (match) return match.icon;
    return (
      <svg className="w-8 h-8 text-[#C2A468]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    );
  };

  const displayAmenities =
    amenities && amenities.length > 0
      ? amenities.map((item) => {
          const name = typeof item === 'string' ? item : item.name;
          const svg = typeof item === 'object' ? item.iconSvg : undefined;
          return {
            name,
            icon: getAmenityIcon(name, svg),
          };
        })
      : amenitiesData;

  return (
    <section className="w-full bg-[#FAF9F6] py-14 sm:py-20 lg:py-24 border-b border-[#E5E0D8]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full space-y-12 sm:space-y-16">
        
        {/* ======================================================== */}
        {/* 1. TOP PART: COMMUNITY AMENITIES                         */}
        {/* ======================================================== */}
        <div className="space-y-8 sm:space-y-10">
          {/* Header Block */}
          <div className="space-y-2 sm:space-y-3">
            {/* Tagline: Poppins Regular */}
            <span
              className="text-xs sm:text-[13px] tracking-wide text-[#737373] uppercase block"
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontWeight: 400,
              }}
            >
              {tagline}
            </span>

            {/* Page Heading: Cinzel Regular */}
            <h2
              className="text-2xl sm:text-4xl lg:text-[44px] tracking-[0.03em] leading-[1.18] uppercase"
              style={{
                fontFamily: 'var(--font-cinzel), Cinzel, serif',
                fontWeight: 400,
              }}
            >
              <span className="text-[#1B2538]">{finalH1}</span>
              {finalH2 && (
                <span className="text-[#C2A468] block mt-1 sm:mt-1.5">{finalH2}</span>
              )}
            </h2>
          </div>

          {/* Dynamic Amenities Grid: 5 columns on desktop, 3 on tablet, 2 on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8 sm:gap-y-10 gap-x-4 pt-2">
            {displayAmenities.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center group cursor-pointer text-center">
                {/* Rounded Icon Box with gold border */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#C2A468]/50 bg-white flex items-center justify-center text-[#C2A468] group-hover:border-[#C2A468] group-hover:bg-[#FAF8F5] transition-all shadow-2xs">
                  {item.icon}
                </div>
                {/* Amenity Name in Poppins Regular */}
                <span
                  className="text-xs sm:text-[12.5px] text-[#4A4A4A] group-hover:text-[#1B2538] transition-colors mt-3 leading-tight max-w-[110px]"
                  style={{
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    fontWeight: 400,
                  }}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. BOTTOM PART: LOCATION CONNECTIONS BANNER               */}
        {/* (No background image: exact text and colours)            */}
        {/* ======================================================== */}
        <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#2A2A2A] shadow-lg grid grid-cols-1 lg:grid-cols-12 min-h-[420px] sm:min-h-[460px]">
          {/* Left Column: Dark Slate Panel with Content */}
          <div className="lg:col-span-5 bg-[#171A1E] p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Tagline: Poppins Regular */}
              <span
                className="text-[11px] sm:text-xs tracking-wider text-[#A1A1AA] uppercase block"
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontWeight: 400,
                }}
              >
                LOCATION CONNECTIONS
              </span>

              {/* Heading: Cinzel Regular */}
              <h3
                className="text-2xl sm:text-3xl lg:text-[32px] tracking-[0.03em] leading-[1.2] uppercase"
                style={{
                  fontFamily: 'var(--font-cinzel), Cinzel, serif',
                  fontWeight: 400,
                }}
              >
                <span className="block text-white">CLOSE TO THE CITY,</span>
                <span className="block text-[#C2A468] mt-1">OPEN TO THE WATER</span>
              </h3>

              {/* Destination Times List */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                {locationConnections.map((loc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 border-b border-white/10 text-xs sm:text-[13px] tracking-wider"
                  >
                    <span
                      className="text-white font-normal uppercase"
                      style={{
                        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      }}
                    >
                      {loc.destination}
                    </span>
                    <span
                      className="text-[#C2A468] font-medium"
                      style={{
                        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      }}
                    >
                      {loc.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button: OPEN IN MAPS */}
            <div className="pt-8">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 text-white hover:border-[#C2A468] hover:text-[#C2A468] text-xs sm:text-[12.5px] uppercase tracking-wider transition-colors"
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontWeight: 400,
                }}
              >
                <span>OPEN IN MAPS</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Architectural Colour Backdrop (No image as instructed) */}
          <div className="lg:col-span-7 bg-gradient-to-tr from-[#222831] via-[#2F3640] to-[#1E232A] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient subtle architectural geometric grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Subtle luxury ambient gold glow */}
            <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-[#C2A468]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <span
                className="text-xs text-[#C2A468] tracking-widest uppercase font-medium"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                {displayName.toUpperCase()}
              </span>
              <h4
                className="text-2xl sm:text-3xl text-white font-normal uppercase leading-tight max-w-md"
                style={{
                  fontFamily: 'var(--font-cinzel), Cinzel, serif',
                }}
              >
                Seamless connectivity across Dubai
              </h4>
              <p
                className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-lg font-light pt-2 whitespace-pre-line"
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                }}
              >
                {description ||
                  `Ideally positioned in ${displayName} with direct arterial access and convenient travel corridors, offering swift transit to Dubai International Airport, Downtown Dubai, and major business and leisure districts.`}
              </p>
            </div>

            {/* Quick Stat Tags */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div>
                <span className="block text-xl sm:text-2xl text-[#C2A468] font-medium" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                  15 min
                </span>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider block mt-0.5" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                  To Airport
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl text-[#C2A468] font-medium" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                  10 min
                </span>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider block mt-0.5" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                  To Downtown
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-xl sm:text-2xl text-[#C2A468] font-medium" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                  Waterfront
                </span>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider block mt-0.5" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                  Promenade Access
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
