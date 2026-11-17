'use client';

import React from 'react';
import Image from 'next/image';

interface ProjectLocationSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  mapImageSrc?: string;
  latitude?: string | number;
  longitude?: string | number;
  googleMapsUrl?: string;
  directionsUrl?: string;
}

export default function ProjectLocationSection({
  eyebrow = 'On the Map',
  title = 'Location & Surroundings',
  description = 'Discover where Coral Isle Residences sits within Dubai Island A — explore the neighbourhood at your own pace.',
  latitude = '25.31528411624274',
  longitude = '55.322673566004696',
  googleMapsUrl,
  directionsUrl,
}: ProjectLocationSectionProps) {
  const latStr = String(latitude ?? '25.31528411624274').trim() || '25.31528411624274';
  const lngStr = String(longitude ?? '55.322673566004696').trim() || '55.322673566004696';
  const coordsQuery = `${encodeURIComponent(latStr)},${encodeURIComponent(lngStr)}`;

  const embedMapUrl = `https://maps.google.com/maps?q=${coordsQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const effectiveGoogleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordsQuery}`;
  const effectiveDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordsQuery}`;

  return (
    <section id="location-section" className="space-y-6 pt-6 border-t border-stone-200/80">
      {/* Centered Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span
          className="text-xs sm:text-sm font-medium text-[#C09D62] tracking-wide block"
          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
        >
          {eyebrow}
        </span>
        <h2
          className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#111827] tracking-tight leading-tight"
          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
        >
          {title}
        </h2>
        <p
          className="text-xs sm:text-sm lg:text-[14.5px] text-[#6B7280] leading-relaxed max-w-xl mx-auto pt-0.5"
          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
        >
          {description}
        </p>
      </div>

      {/* Main Map Card Container */}
      <div className="bg-white rounded-[22px] sm:rounded-[26px] border border-stone-200/80 shadow-xs overflow-hidden">
        {/* Live Interactive Google Map Viewport */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] min-h-[320px] sm:min-h-[420px] lg:min-h-[480px] bg-[#E9E5DE] overflow-hidden">
          <iframe
            key={`${latStr}-${lngStr}`}
            src={embedMapUrl}
            title={`${title} Interactive Map`}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        {/* Footer Bar with "Plan your visit" and CTA Buttons */}
        <div className="p-4 sm:p-5 lg:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border-t border-stone-100">
          {/* Left: Direction Compass Icon + Description Text */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-center justify-center shrink-0">
              {/* Compass Navigation Arrow */}
              <svg
                className="w-5 h-5 text-stone-900 -rotate-45"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </div>
            <div>
              <h4
                className="text-sm sm:text-base font-bold text-stone-900 leading-tight"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                Plan your visit
              </h4>
              <p
                className="text-xs sm:text-[13px] text-stone-500 mt-0.5"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                Open in Google Maps or get turn-by-turn directions
              </p>
            </div>
          </div>

          {/* Right: Action Buttons (Get Directions & Open in Maps) */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {/* Get Directions Button (Golden) */}
            <a
              href={effectiveDirectionsUrl || directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#BA955C] hover:bg-[#a8844f] text-white text-xs sm:text-[13.5px] font-semibold transition-all duration-200 shadow-xs cursor-pointer"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              <svg
                className="w-4 h-4 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              <span>Get Directions</span>
            </a>

            {/* Open in Maps Button (White with Border) */}
            <a
              href={effectiveGoogleMapsUrl || googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-800 hover:text-stone-950 border border-stone-300 text-xs sm:text-[13.5px] font-semibold transition-all duration-200 shadow-2xs cursor-pointer"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              <svg
                className="w-4 h-4 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                <path d="M19.5 15.75l2.25 2.25-2.25 2.25" />
              </svg>
              <span>Open in Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
