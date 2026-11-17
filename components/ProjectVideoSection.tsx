'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProjectVideoSectionProps {
  coverImage?: string;
  videoUrl?: string;
  title?: string;
  subtitle?: string;
  projectName?: string;
}

export default function ProjectVideoSection({
  coverImage = '/project-detail-hero.png',
  videoUrl,
  title = 'Experience Golf Trails & Tessera in Motion',
  subtitle = 'Explore the architectural craftsmanship, panoramic golf vistas, and resort-grade amenities through an immersive video walkthrough.',
  projectName = 'Golf Trails by Emaar',
}: ProjectVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaceholderModal, setShowPlaceholderModal] = useState(false);

  const handlePlayClick = () => {
    if (videoUrl) {
      setIsPlaying(true);
    } else {
      setShowPlaceholderModal(true);
    }
  };

  const poppinsRegularStyle: React.CSSProperties = {
    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
    fontWeight: 400,
  };

  return (
    <section id="video-tour-section" className="space-y-6 pt-4 border-t border-stone-200/80">
      {/* Section Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#BA955C] text-white flex items-center justify-center shrink-0 shadow-xs">
          <svg
            className="w-4 h-4 fill-none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <div>
          <span className="text-[11px] font-bold text-[#BA955C] uppercase tracking-[0.2em] block">
            VIRTUAL EXPERIENCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] font-poppins tracking-tight mt-0.5">
            Project Video Tour
          </h2>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200/90 shadow-md bg-stone-950 aspect-[16/9] min-h-[340px] sm:min-h-[440px] lg:min-h-[500px] flex items-center justify-center group cursor-pointer">
        {isPlaying && videoUrl ? (
          <div className="relative w-full h-full">
            {videoUrl.includes('youtube.com') || videoUrl.includes('vimeo.com') ? (
              <iframe
                src={videoUrl}
                title={`${projectName} Video Tour`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            )}
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-30 bg-black/70 hover:bg-black text-white px-3.5 py-1.5 rounded-full text-xs font-poppins font-normal transition-colors cursor-pointer"
              style={poppinsRegularStyle}
            >
              Close Video ✕
            </button>
          </div>
        ) : (
          <div
            onClick={handlePlayClick}
            className="relative w-full h-full flex flex-col justify-between p-4 sm:p-7 lg:p-9 select-none"
          >
            {/* Cover Image Background */}
            <Image
              src={coverImage}
              alt={`${projectName} Video Cover`}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1440px) 100vw, 1200px"
              priority={false}
            />

            {/* Gradient Overlays for High Contrast and Cinematic Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />

            {/* Top Bar Badges (All Poppins Regular) */}
            <div className="relative z-10 flex items-center justify-between gap-3 w-full">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs sm:text-[13px]"
                style={poppinsRegularStyle}
              >
                <span className="w-2 h-2 rounded-full bg-[#BA955C] animate-pulse" />
                <span style={poppinsRegularStyle}>Official Video Walkthrough</span>
              </div>

              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-[13px]"
                style={poppinsRegularStyle}
              >
                <svg className="w-3.5 h-3.5 text-[#BA955C]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span style={poppinsRegularStyle}>4K Ultra HD</span>
              </div>
            </div>

            {/* Center Play Button with Animated Ripple Glow */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6">
              <div className="relative flex items-center justify-center">
                {/* Ping wave */}
                <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#BA955C]/40 animate-ping pointer-events-none" />
                
                {/* Secondary halo ring */}
                <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/30 pointer-events-none group-hover:scale-110 transition-transform duration-500" />

                {/* Main Play Circle Button */}
                <button
                  type="button"
                  aria-label="Play project video tour"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#BA955C] hover:bg-[#BA955C] hover:text-white shadow-2xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 active:scale-95 cursor-pointer z-10"
                >
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 ml-1 transition-transform group-hover:scale-105"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              <span
                className="mt-3.5 text-xs sm:text-sm text-white/95 tracking-wide drop-shadow-sm group-hover:text-[#BA955C] transition-colors"
                style={poppinsRegularStyle}
              >
                Click to Watch Video Tour
              </span>
            </div>

            {/* Bottom Overlay Text Container (All Poppins Regular) */}
            <div className="relative z-10 max-w-3xl space-y-2">
              <span
                className="text-xs sm:text-[13px] text-[#BA955C] tracking-wider uppercase block"
                style={poppinsRegularStyle}
              >
                {projectName}
              </span>

              <h3
                className="text-lg sm:text-2xl lg:text-[26px] text-white leading-snug drop-shadow-md"
                style={poppinsRegularStyle}
              >
                {title}
              </h3>

              <p
                className="text-xs sm:text-sm text-stone-200/90 leading-relaxed max-w-2xl drop-shadow-sm line-clamp-2 sm:line-clamp-none"
                style={poppinsRegularStyle}
              >
                {subtitle}
              </p>

              {/* Feature Tags */}
              <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-2.5">
                {[
                  'Architectural Masterplan',
                  'Residences & Suites',
                  'Resort Amenities',
                  'Emaar South Community',
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-xs text-white/90 text-[11px] sm:text-xs border border-white/10"
                    style={poppinsRegularStyle}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal / Toast when video is pending ("video hum baad me laga lienge") */}
      {showPlaceholderModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowPlaceholderModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200 space-y-4 relative"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowPlaceholderModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-xl bg-[#BA955C]/15 text-[#BA955C] flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>

            <div>
              <h4
                className="text-lg font-bold text-stone-900 leading-snug"
                style={poppinsRegularStyle}
              >
                Video Tour Coming Soon
              </h4>
              <p
                className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed"
                style={poppinsRegularStyle}
              >
                The official 4K walkthrough video for {projectName} is currently being prepared and will be available here soon. In the meantime, you can review the floor plans, amenities, and project brochures below.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPlaceholderModal(false)}
                className="w-full py-2.5 px-4 bg-[#BA955C] hover:bg-[#a6824b] text-white rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-xs"
                style={poppinsRegularStyle}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
