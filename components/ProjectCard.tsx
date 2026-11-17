'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface ProjectCardData {
  id: string;
  isFeatured?: boolean;
  isNew?: boolean;
  developerBadge?: string;
  developer?: string;
  developerCategory?: string;
  title: string;
  location: string;
  plan: string;
  handover: string;
  price: string;
  propertyType?: string;
  imageUrl?: string;
  link?: string;
  createdAt?: number;
}

interface ProjectCardProps {
  project: ProjectCardData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className="relative w-full max-w-[340px] mx-auto rounded-2xl overflow-hidden bg-gradient-to-b from-[#1F2937] via-[#111827] to-[#090D16] border border-stone-800/80 p-4 sm:p-4.5 flex flex-col justify-between min-h-[300px] sm:min-h-[315px] shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
      style={{ fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif' }}
    >
      {/* Subtle luxury ambient pattern overlay (no image) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-700/20 via-transparent to-transparent pointer-events-none" />

      {/* Top Header Badges */}
      <div className="relative z-10 flex items-center justify-between gap-2 w-full">
        {project.isNew ? (
          <span className="px-3 py-1 rounded-full bg-[#BFA16A] text-[10px] font-extrabold text-white tracking-wider uppercase shadow-sm">
            NEW LAUNCH
          </span>
        ) : project.isFeatured !== false ? (
          <span className="px-3 py-1 rounded-full bg-white text-[10px] font-extrabold text-[#111827] tracking-wider uppercase shadow-sm">
            FEATURED
          </span>
        ) : (
          <div />
        )}

        {project.developerBadge && (
          <div className="px-3 py-1 rounded-lg bg-white text-[10px] font-extrabold text-[#111827] tracking-wider uppercase shadow-sm truncate max-w-[140px]">
            {project.developerBadge}
          </div>
        )}
      </div>

      {/* Middle & Bottom Information Content */}
      <div className="relative z-10 mt-auto pt-5 sm:pt-6">
        {/* Developer Category */}
        <span className="block text-[10px] font-bold text-white/70 tracking-widest uppercase mb-1 truncate">
          {project.developerCategory || 'FEATURED DEVELOPER'}
        </span>

        {/* Project Title */}
        <h3 className="text-base sm:text-[17px] font-extrabold text-white tracking-tight leading-snug line-clamp-1">
          {project.title}
        </h3>

        {/* Location with bullet */}
        <div className="flex items-center gap-1.5 text-[11.5px] text-white/80 font-medium mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
          <span className="truncate">{project.location}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-2.5" />

        {/* 3 Metric Columns */}
        <div className="grid grid-cols-3 gap-2">
          {/* Plan */}
          <div className="min-w-0">
            <p className="text-[10.5px] font-medium text-white/70">Plan</p>
            <p className="text-xs sm:text-[13.5px] font-extrabold text-white mt-0.5 tracking-tight truncate">
              {project.plan}
            </p>
          </div>

          {/* Handover */}
          <div className="min-w-0">
            <p className="text-[10.5px] font-medium text-white/70">Handover</p>
            <p className="text-xs sm:text-[13.5px] font-extrabold text-white mt-0.5 tracking-tight truncate">
              {project.handover}
            </p>
          </div>

          {/* Price */}
          <div className="min-w-0">
            <p className="text-[10.5px] font-medium text-white/70">From</p>
            <p className="text-xs sm:text-[13.5px] font-extrabold text-white mt-0.5 tracking-tight truncate">
              {project.price}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-2.5" />

        {/* View Project Button */}
        <div className="relative flex items-center">
          <Link
            href={project.link || '#'}
            className="w-full bg-white hover:bg-stone-50 active:scale-[0.99] text-[#BFA16A] hover:text-[#aa8e59] font-bold text-xs sm:text-[13px] py-2 sm:py-2.5 px-4 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm"
          >
            <span>View Project</span>
          </Link>

          {/* Wishlist Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            aria-label="Save to favorites"
            className="absolute right-3.5 p-1 text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <svg
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-red-500 text-red-500' : 'fill-none stroke-current stroke-2'
              }`}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
