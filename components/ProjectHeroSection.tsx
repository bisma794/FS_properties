'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectHeroProps {
  breadcrumbHome?: string;
  breadcrumbCurrent?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  heroImage?: string;
  locationTitle?: string;
  propertyTypeTitle?: string;
  budgetTitle?: string;
  handoverTitle?: string;
  onFilterSubmit?: (filters: {
    location: string;
    propertyType: string;
    budget: string;
    handover: string;
  }) => void;
}

export default function ProjectHeroSection({
  breadcrumbHome = 'Home',
  breadcrumbCurrent = 'Projects',
  titleLine1 = 'OFF-PLAN PROPERTY',
  titleLine2 = 'FOR SALE IN DUBAI',
  description = "Discover Dubai's Most Promising Off-Plan Communities, Homes & Investment Opportunities",
  heroImage = '/project-main-hero.png',
  locationTitle = 'Location',
  propertyTypeTitle = 'Property type',
  budgetTitle = 'Budget',
  handoverTitle = 'Handover',
  onFilterSubmit,
}: ProjectHeroProps) {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Any type');
  const [budget, setBudget] = useState('Any price');
  const [handover, setHandover] = useState('Any date');

  const handleFilterClick = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { location, propertyType, budget, handover };
    if (onFilterSubmit) {
      onFilterSubmit(payload);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('fs-project-hero-filter', { detail: payload }));
      const gridEl = document.getElementById('project-catalog-grid');
      if (gridEl) {
        gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9F6] pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Hero Image with smooth horizontal gradient overlay */}
      <div className="absolute inset-y-0 right-0 z-0 w-full lg:w-[68%] xl:w-[64%] pointer-events-none select-none">
        <div className="relative w-full h-full">
          <Image
            src={heroImage}
            alt="Dubai Skyline Off-Plan Properties"
            fill
            priority
            unoptimized={/^(https?:|data:)/.test(heroImage)}
            className="object-cover object-right lg:object-center"
            sizes="(max-width: 1024px) 100vw, 68vw"
          />
          {/* Subtle multi-stop gradient ensuring seamless blend into background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/85 via-25% md:via-35% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent opacity-60" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
          <ol className="flex items-center space-x-2 text-sm text-[#737373]">
            <li>
              <Link
                href="/"
                className="hover:text-[#BFA16A] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                {breadcrumbHome}
              </Link>
            </li>
            <li className="text-[#A3A3A3]">/</li>
            <li
              className="font-normal text-[#525252]"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              {breadcrumbCurrent}
            </li>
          </ol>
        </nav>

        {/* Main Headings and Description */}
        <div className="max-w-2xl">
          <h1
            className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[58px] tracking-[0.03em] uppercase leading-[1.12]"
            style={{ fontFamily: 'var(--font-cinzel), Cinzel, serif' }}
          >
            <span className="block font-medium text-[#1A1A1A]">{titleLine1}</span>
            <span className="block font-medium text-[#BFA16A] mt-1 sm:mt-2">{titleLine2}</span>
          </h1>

          <p
            className="mt-6 sm:mt-7 text-sm sm:text-base lg:text-[18px] text-[#666666] font-light leading-relaxed max-w-xl"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            {description}
          </p>
        </div>

        {/* Floating Search & Filter Bar */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <form
            onSubmit={handleFilterClick}
            className="bg-white rounded-2xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)] border border-[#EBE7DF] p-2.5 sm:p-3 lg:p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-0"
          >
            {/* Field 1: Location */}
            <div className="flex-1 flex items-center px-4 py-2.5 sm:py-3 cursor-pointer hover:bg-stone-50/70 rounded-xl transition-colors group">
              <div className="text-[#737373] group-hover:text-[#BFA16A] transition-colors mr-3 shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <label
                  htmlFor="location-input"
                  className="block text-xs sm:text-sm font-medium text-[#18181B] leading-snug cursor-pointer"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  {locationTitle}
                </label>
                <input
                  id="location-input"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Community, project or developer"
                  className="w-full bg-transparent text-xs sm:text-[13px] text-[#525252] placeholder-[#A1A1AA] focus:outline-none truncate"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                />
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-10 w-[1px] bg-[#E5E0D8] shrink-0" />

            {/* Field 2: Property Type */}
            <div className="flex-1 flex items-center px-4 py-2.5 sm:py-3 cursor-pointer hover:bg-stone-50/70 rounded-xl transition-colors group relative">
              <div className="text-[#737373] group-hover:text-[#BFA16A] transition-colors mr-3 shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className="block text-xs sm:text-sm font-medium text-[#18181B] leading-snug"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  {propertyTypeTitle}
                </span>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-[13px] text-[#A1A1AA] focus:text-[#18181B] focus:outline-none cursor-pointer -ml-0.5 appearance-none"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <option value="Any type">Any type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Duplex">Duplex</option>
                </select>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-10 w-[1px] bg-[#E5E0D8] shrink-0" />

            {/* Field 3: Budget */}
            <div className="flex-1 flex items-center px-4 py-2.5 sm:py-3 cursor-pointer hover:bg-stone-50/70 rounded-xl transition-colors group relative">
              <div className="text-[#737373] group-hover:text-[#BFA16A] transition-colors mr-3 shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className="block text-xs sm:text-sm font-medium text-[#18181B] leading-snug"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  {budgetTitle}
                </span>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-[13px] text-[#A1A1AA] focus:text-[#18181B] focus:outline-none cursor-pointer -ml-0.5 appearance-none"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <option value="Any price">Any price</option>
                  <option value="Under AED 1.5M">Under AED 1.5M</option>
                  <option value="AED 1.5M - 3M">AED 1.5M - 3M</option>
                  <option value="AED 3M - 5M">AED 3M - 5M</option>
                  <option value="AED 5M - 10M">AED 5M - 10M</option>
                  <option value="AED 10M+">AED 10M+</option>
                </select>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-10 w-[1px] bg-[#E5E0D8] shrink-0" />

            {/* Field 4: Handover */}
            <div className="flex-1 flex items-center px-4 py-2.5 sm:py-3 cursor-pointer hover:bg-stone-50/70 rounded-xl transition-colors group relative">
              <div className="text-[#737373] group-hover:text-[#BFA16A] transition-colors mr-3 shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className="block text-xs sm:text-sm font-medium text-[#18181B] leading-snug"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  {handoverTitle}
                </span>
                <select
                  value={handover}
                  onChange={(e) => setHandover(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-[13px] text-[#A1A1AA] focus:text-[#18181B] focus:outline-none cursor-pointer -ml-0.5 appearance-none"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <option value="Any date">Any date</option>
                  <option value="Ready Now">Ready Now</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027+">2027+</option>
                </select>
              </div>
            </div>

            {/* Filter Action Button */}
            <div className="shrink-0 p-1 sm:p-0">
              <button
                type="submit"
                className="w-full lg:w-auto px-7 py-3.5 sm:px-8 sm:py-3.5 bg-[#BFA16A] hover:bg-[#aa8e59] active:scale-[0.98] text-white rounded-xl shadow-[0_4px_14px_rgba(191,161,106,0.35)] transition-all duration-200 flex items-center justify-center gap-2.5 font-medium text-sm tracking-wide cursor-pointer"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L3 21l3.39-1.97C7.93 20.26 9.88 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"
                    className="hidden"
                  />
                  {/* Funnel/Filter lines icon matching the screenshot */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12M10 18h4" />
                </svg>
                <span>Filter</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
