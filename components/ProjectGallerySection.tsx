'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: 'interior' | 'exterior' | 'lifestyle';
}

const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'master-bedroom',
    src: '/gallery-bedroom.png',
    alt: 'Master Bedroom Suite at Golf Trails by Emaar',
    title: 'Master Bedroom Suite',
    category: 'interior',
  },
  {
    id: 'grand-living',
    src: '/image-277.png',
    alt: 'Double-Height Grand Living Lounge overlooking fairways',
    title: 'Double-Height Living Lounge',
    category: 'interior',
  },
  {
    id: 'dining-room',
    src: '/gallery1.png',
    alt: 'Bespoke Dining Hall & Contemporary Kitchen',
    title: 'Dining Room & Kitchen',
    category: 'interior',
  },
  {
    id: 'grand-staircase',
    src: '/gallery2.png',
    alt: 'Curved Architectural Staircase & Double-Height Lobby',
    title: 'Grand Staircase & Foyer',
    category: 'interior',
  },
  {
    id: 'exterior-dusk',
    src: '/gallery-exterior.png',
    alt: 'Golf Trails Dusk Promenade & Architectural Facade',
    title: 'Resort Promenade at Dusk',
    category: 'exterior',
  },
  {
    id: 'fairway-view',
    src: '/project-detail-hero.png',
    alt: 'Championship Golf Course Fairways & Community Skyline',
    title: 'Golf Course & Green Vistas',
    category: 'lifestyle',
  },
  {
    id: 'lagoon-lifestyle',
    src: '/emaar_lagoon_community.jpg',
    alt: 'Lagoon Waterside Living & Parklands',
    title: 'Waterfront Lagoon & Parks',
    category: 'exterior',
  },
  {
    id: 'luxury-facade',
    src: '/property_detail_main.jpg',
    alt: 'Luxury Architectural Elevation & Landscaped Grounds',
    title: 'Architectural Elevation',
    category: 'exterior',
  },
];

interface ProjectGallerySectionProps {
  projectName?: string;
  title?: string;
  description?: string;
  images?: string[];
  interiorImages?: string[];
  exteriorImages?: string[];
  lifestyleImages?: string[];
}

export default function ProjectGallerySection({
  projectName = 'Golf Trails by Emaar',
  title,
  description,
  images,
  interiorImages,
  exteriorImages,
  lifestyleImages,
}: ProjectGallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'interior' | 'exterior' | 'lifestyle'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hasCustomCategorized =
    Array.isArray(interiorImages) ||
    Array.isArray(exteriorImages) ||
    Array.isArray(lifestyleImages);

  const mapUrlsToPhotos = (
    urls: string[],
    cat: 'interior' | 'exterior' | 'lifestyle',
    prefix: string
  ): GalleryPhoto[] =>
    urls.filter(Boolean).map((src, idx) => ({
      id: `${prefix}-${idx}-${src}`,
      src,
      alt: `${projectName} ${cat} photo ${idx + 1}`,
      title:
        cat === 'interior'
          ? idx === 0
            ? 'Master Bedroom Suite'
            : idx === 1
            ? 'Double-Height Living Lounge'
            : idx === 2
            ? 'Dining Room & Kitchen'
            : idx === 3
            ? 'Grand Staircase & Foyer'
            : `Interior Showcase ${idx + 1}`
          : cat === 'exterior'
          ? idx === 0
            ? 'Resort Promenade at Dusk'
            : idx === 1
            ? 'Waterfront Lagoon & Parks'
            : `Architectural Exterior ${idx + 1}`
          : idx === 0
          ? 'Golf Course & Green Vistas'
          : `Community Lifestyle ${idx + 1}`,
      category: cat,
    }));

  const interiorPhotosList: GalleryPhoto[] = hasCustomCategorized
    ? mapUrlsToPhotos(
        Array.isArray(interiorImages)
          ? interiorImages
          : galleryPhotos.filter((p) => p.category === 'interior').map((p) => p.src),
        'interior',
        'int'
      )
    : images && images.length > 0
    ? images
        .filter((_, idx) => idx % 3 === 0)
        .map((src, idx) => ({
          id: `int-fallback-${idx}`,
          src,
          alt: `${projectName} Interior ${idx + 1}`,
          title: idx === 0 ? 'Master Bedroom Suite' : `Interior Suite ${idx + 1}`,
          category: 'interior',
        }))
    : galleryPhotos.filter((p) => p.category === 'interior');

  const exteriorPhotosList: GalleryPhoto[] = hasCustomCategorized
    ? mapUrlsToPhotos(
        Array.isArray(exteriorImages)
          ? exteriorImages
          : galleryPhotos.filter((p) => p.category === 'exterior').map((p) => p.src),
        'exterior',
        'ext'
      )
    : images && images.length > 0
    ? images
        .filter((_, idx) => idx % 3 === 1)
        .map((src, idx) => ({
          id: `ext-fallback-${idx}`,
          src,
          alt: `${projectName} Exterior ${idx + 1}`,
          title: idx === 0 ? 'Resort Promenade at Dusk' : `Architectural Elevation ${idx + 1}`,
          category: 'exterior',
        }))
    : galleryPhotos.filter((p) => p.category === 'exterior');

  const lifestylePhotosList: GalleryPhoto[] = hasCustomCategorized
    ? mapUrlsToPhotos(
        Array.isArray(lifestyleImages)
          ? lifestyleImages
          : galleryPhotos.filter((p) => p.category === 'lifestyle').map((p) => p.src),
        'lifestyle',
        'life'
      )
    : images && images.length > 0
    ? images
        .filter((_, idx) => idx % 3 === 2)
        .map((src, idx) => ({
          id: `life-fallback-${idx}`,
          src,
          alt: `${projectName} Lifestyle ${idx + 1}`,
          title: idx === 0 ? 'Golf Course & Green Vistas' : `Resort Lifestyle ${idx + 1}`,
          category: 'lifestyle',
        }))
    : galleryPhotos.filter((p) => p.category === 'lifestyle');

  const allPhotosList: GalleryPhoto[] = (() => {
    const baseUrls =
      images && images.length > 0
        ? [...images]
        : galleryPhotos.map((p) => p.src);
    if (hasCustomCategorized) {
      [...(interiorImages || []), ...(exteriorImages || []), ...(lifestyleImages || [])].forEach((u) => {
        if (u && !baseUrls.includes(u)) baseUrls.push(u);
      });
    }
    return baseUrls.filter(Boolean).map((src, idx) => {
      const matchedCat: 'interior' | 'exterior' | 'lifestyle' =
        interiorPhotosList.some((p) => p.src === src)
          ? 'interior'
          : exteriorPhotosList.some((p) => p.src === src)
          ? 'exterior'
          : lifestylePhotosList.some((p) => p.src === src)
          ? 'lifestyle'
          : idx % 3 === 0
          ? 'interior'
          : idx % 3 === 1
          ? 'exterior'
          : 'lifestyle';
      return {
        id: `all-photo-${idx}-${src}`,
        src,
        alt: `${projectName} Photo ${idx + 1}`,
        title:
          idx === 0
            ? 'Master Bedroom Suite'
            : idx === 1
            ? 'Double-Height Living Lounge'
            : idx === 2
            ? 'Dining Room & Kitchen'
            : idx === 3
            ? 'Grand Staircase & Foyer'
            : `Project Showcase ${idx + 1}`,
        category: matchedCat,
      };
    });
  })();

  const filteredPhotos: GalleryPhoto[] =
    activeCategory === 'all'
      ? allPhotosList
      : activeCategory === 'interior'
      ? interiorPhotosList
      : activeCategory === 'exterior'
      ? exteriorPhotosList
      : lifestylePhotosList;

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevPhoto = useCallback(() => {
    if (lightboxIndex === null || filteredPhotos.length === 0) return;
    setLightboxIndex((prev) => (prev === null || prev === 0 ? filteredPhotos.length - 1 : prev - 1));
  }, [lightboxIndex, filteredPhotos.length]);

  const handleNextPhoto = useCallback(() => {
    if (lightboxIndex === null || filteredPhotos.length === 0) return;
    setLightboxIndex((prev) => (prev === null || prev === filteredPhotos.length - 1 ? 0 : prev + 1));
  }, [lightboxIndex, filteredPhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handlePrevPhoto, handleNextPhoto]);

  const p1 = filteredPhotos[0] || allPhotosList[0] || galleryPhotos[0];
  const p2 = filteredPhotos[1] || allPhotosList[1] || galleryPhotos[1];
  const p3 = filteredPhotos[2] || allPhotosList[2] || galleryPhotos[2];
  const p4 = filteredPhotos[3] || allPhotosList[3] || galleryPhotos[3];
  const p5 = filteredPhotos[4] || allPhotosList[4] || galleryPhotos[4];
  const remainingCount = Math.max(0, filteredPhotos.length - 4);

  return (
    <section id="gallery-section" className="space-y-6 pt-4 border-t border-stone-200/80">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#BA955C] text-white flex items-center justify-center shrink-0 shadow-xs">
            {/* Gallery / Photos Icon */}
            <svg
              className="w-4 h-4 fill-none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#BA955C] uppercase tracking-[0.2em] block">
              PHOTO GALLERY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] font-poppins tracking-tight mt-0.5">
              {title || 'Project Visual Showcase'}
            </h2>
          </div>
        </div>

        {/* View All Button */}
        <button
          type="button"
          onClick={() => handleOpenLightbox(0)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-200/90 text-stone-700 hover:text-[#BA955C] hover:border-[#BA955C]/60 text-xs sm:text-[13px] font-bold transition-all shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <svg className="w-4 h-4 text-[#BA955C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
          <span>View All {filteredPhotos.length} Photos</span>
        </button>
      </div>

      <p className="text-xs sm:text-sm text-stone-500 max-w-3xl leading-relaxed">
        {description || `Immerse yourself in the bespoke craftsmanship of ${projectName}. From expansive living rooms framed by double-height glass to master suites and community resort amenities.`}
      </p>

      {/* Filter Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {[
          { key: 'all', label: `All Photos (${allPhotosList.length})` },
          { key: 'interior', label: `Interiors (${interiorPhotosList.length})` },
          { key: 'exterior', label: `Exteriors (${exteriorPhotosList.length})` },
          { key: 'lifestyle', label: `Lifestyle (${lifestylePhotosList.length})` },
        ].map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => {
              setActiveCategory(cat.key as any);
              setLightboxIndex(null);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat.key
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-950 border border-stone-200/80 hover:bg-stone-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Responsive Gallery Grid */}
      {filteredPhotos.length < 5 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => handleOpenLightbox(idx)}
              className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs bg-stone-100 group cursor-pointer aspect-[16/10]"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <span className="text-[10px] font-bold text-[#BA955C] uppercase tracking-wider block">
                  {photo.category.toUpperCase()}
                </span>
                <h3 className="text-sm sm:text-base font-bold font-poppins leading-tight mt-0.5">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4.5 pt-1">
        {/* Column 1 (Left): Master Bedroom - Tall Vertical Card */}
        <div
          onClick={() => handleOpenLightbox(0)}
          className="md:col-span-4 relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs bg-stone-100 group cursor-pointer aspect-[3/4] md:aspect-auto md:h-full min-h-[340px]"
        >
          <img
            src={p1.src}
            alt={p1.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[10px] font-bold text-[#BA955C] uppercase tracking-wider block">
              INTERIOR SUITE
            </span>
            <h3 className="text-base sm:text-lg font-bold font-poppins leading-tight mt-0.5">
              {p1.title}
            </h3>
            <p className="text-xs text-stone-300 mt-1 line-clamp-1">
              Custom headboard panelling &amp; en-suite finishes
            </p>
          </div>

          <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
          </div>
        </div>

        {/* Column 2 (Center): Wide Living Lounge (Top) + Dining Hall (Bottom) */}
        <div className="md:col-span-5 flex flex-col gap-3.5 sm:gap-4.5">
          {/* Top: Double-Height Living Lounge */}
          <div
            onClick={() => handleOpenLightbox(1)}
            className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs bg-stone-100 group cursor-pointer aspect-[16/10] sm:aspect-[16/9]"
          >
            <img
              src={p2.src}
              alt={p2.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            
            <div className="absolute bottom-3.5 left-4 right-4 text-white">
              <span className="text-[10px] font-bold text-[#BA955C] uppercase tracking-wider block">
                MAIN LIVING
              </span>
              <h3 className="text-sm sm:text-base font-bold font-poppins leading-tight mt-0.5">
                {p2.title}
              </h3>
              <p className="text-xs text-stone-300 mt-0.5 line-clamp-1">
                Floor-to-ceiling panoramic glass facing verdant parklands
              </p>
            </div>

            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
          </div>

          {/* Bottom: Dining Hall */}
          <div
            onClick={() => handleOpenLightbox(2)}
            className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs bg-stone-100 group cursor-pointer aspect-[16/10] sm:aspect-[16/9]"
          >
            <img
              src={p3.src}
              alt={p3.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            
            <div className="absolute bottom-3.5 left-4 right-4 text-white">
              <span className="text-[10px] font-bold text-[#BA955C] uppercase tracking-wider block">
                DINING &amp; ENTERTAINMENT
              </span>
              <h3 className="text-sm sm:text-base font-bold font-poppins leading-tight mt-0.5">
                {p3.title}
              </h3>
              <p className="text-xs text-stone-300 mt-0.5 line-clamp-1">
                Warm artisanal fixtures &amp; open terrace transitions
              </p>
            </div>

            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Column 3 (Right): Grand Staircase + Dusk Exterior with "+N" overlay */}
        <div className="md:col-span-3 flex flex-col gap-3.5 sm:gap-4.5">
          {/* Top: Grand Curved Staircase */}
          <div
            onClick={() => handleOpenLightbox(3)}
            className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs bg-stone-100 group cursor-pointer aspect-[4/3] md:aspect-auto md:h-1/2 min-h-[170px]"
          >
            <img
              src={p4.src}
              alt={p4.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            
            <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
              <span className="text-[10px] font-bold text-[#BA955C] uppercase tracking-wider block">
                GRAND FOYER
              </span>
              <h3 className="text-xs sm:text-sm font-bold font-poppins leading-tight mt-0.5">
                {p4.title}
              </h3>
            </div>
          </div>

          {/* Bottom: Dusk Building Exterior with "+N Photos" Badge */}
          <div
            onClick={() => handleOpenLightbox(4)}
            className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs bg-stone-100 group cursor-pointer aspect-[4/3] md:aspect-auto md:h-1/2 min-h-[170px]"
          >
            <img
              src={p5.src}
              alt={p5.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark Dimmer with "+N Photos" Interactive Overlay */}
            <div className="absolute inset-0 bg-stone-950/45 group-hover:bg-stone-950/35 transition-colors flex flex-col items-center justify-center text-white p-3 text-center">
              <div className="w-10 h-10 rounded-full bg-[#BA955C]/90 backdrop-blur-sm flex items-center justify-center text-white mb-1.5 shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight font-poppins">
                +{remainingCount > 0 ? remainingCount : 1} Photos
              </span>
              <span className="text-[11px] text-stone-200 font-medium">
                Click to explore all
              </span>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-fade-in">
          {/* Top Bar: Title, Counter, and Close Button */}
          <div className="w-full max-w-6xl flex items-center justify-between text-white py-2">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#BA955C] font-semibold block">
                {filteredPhotos[lightboxIndex].category.toUpperCase()} • PHOTO {lightboxIndex + 1} OF {filteredPhotos.length}
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-poppins mt-0.5">
                {filteredPhotos[lightboxIndex].title}
              </h3>
            </div>

            <button
              type="button"
              onClick={handleCloseLightbox}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Central Showcase with Prev / Next Arrows */}
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-3 min-h-[300px]">
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-2 sm:-left-6 lg:-left-12 z-10 w-11 h-11 rounded-full bg-white/15 hover:bg-[#BA955C] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg"
              title="Previous Photo (Left Arrow)"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Current Large Photo */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] max-h-[700px] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
              <img
                src={filteredPhotos[lightboxIndex].src}
                alt={filteredPhotos[lightboxIndex].alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-2 sm:-right-6 lg:-right-12 z-10 w-11 h-11 rounded-full bg-white/15 hover:bg-[#BA955C] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg"
              title="Next Photo (Right Arrow)"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="w-full max-w-4xl overflow-x-auto no-scrollbar py-2">
            <div className="flex items-center justify-center gap-2.5 min-w-max mx-auto px-2">
              {filteredPhotos.map((photo, idx) => {
                const isSelected = idx === lightboxIndex;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative w-14 sm:w-16 h-10 sm:h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? 'border-[#BA955C] scale-105 shadow-md ring-2 ring-[#BA955C]/40'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
