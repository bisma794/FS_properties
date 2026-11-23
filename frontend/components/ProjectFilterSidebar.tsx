'use client';

import React, { useState, useEffect } from 'react';

export interface ProjectSidebarFilters {
  propertyType: string;
  area: string;
  priceRange: string;
  developer: string;
  searchQuery?: string;
  handover?: string;
  bedrooms?: string;
  onlyNew?: boolean;
}

interface ProjectFilterSidebarProps {
  filters?: ProjectSidebarFilters;
  onFilterChange?: (filters: ProjectSidebarFilters) => void;
  onResetFilters?: () => void;
  availableAreas?: string[];
  availableDevelopers?: string[];
}

const DEFAULT_AREAS = [
  'All areas',
  'Downtown Dubai',
  'Dubai Hills Estate',
  'Palm Jumeirah',
  'Palm Jebel Ali',
  'Dubai Marina',
  'Business Bay',
  'The Valley',
  'Damac Islands',
  'Dubailand',
  'MBR City',
  'Dubai Creek Harbour',
  'City Walk',
  'Emaar South',
  'Arabian Ranches III',
  'Tilal Al Ghaf',
  'DAMAC Lagoons',
  'The Oasis',
  'Emaar Beachfront',
  'Dubai South',
];

const DEFAULT_DEVELOPERS = [
  'All developers',
  'Emaar Properties',
  'DAMAC Properties',
  'Sobha Realty',
  'Nakheel',
  'Meraas',
  'Aldar',
  'Majid Al Futtaim',
];

export default function ProjectFilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  availableAreas,
  availableDevelopers,
}: ProjectFilterSidebarProps) {
  const [selectedType, setSelectedType] = useState(filters?.propertyType || 'All');
  const [selectedArea, setSelectedArea] = useState(filters?.area || 'All areas');
  const [selectedPrice, setSelectedPrice] = useState(filters?.priceRange || 'Any price');
  const [selectedDeveloper, setSelectedDeveloper] = useState(filters?.developer || 'All developers');

  useEffect(() => {
    if (filters) {
      setSelectedType(filters.propertyType || 'All');
      setSelectedArea(filters.area || 'All areas');
      setSelectedPrice(filters.priceRange || 'Any price');
      setSelectedDeveloper(filters.developer || 'All developers');
    }
  }, [filters]);

  const propertyTypes = ['All', 'Apartments', 'Townhouses', 'Villas'];
  const priceRanges = ['Any price', 'Under 1M', '1M – 3M', '3M – 5M', 'Above 5M'];

  const areaOptions = React.useMemo(() => {
    const base = availableAreas && availableAreas.length > 0 ? availableAreas : DEFAULT_AREAS;
    if (selectedArea && selectedArea !== 'All areas' && !base.includes(selectedArea)) {
      return [base[0], selectedArea, ...base.slice(1)];
    }
    return base;
  }, [availableAreas, selectedArea]);

  const developerOptions = React.useMemo(() => {
    const base =
      availableDevelopers && availableDevelopers.length > 0 ? availableDevelopers : DEFAULT_DEVELOPERS;
    if (
      selectedDeveloper &&
      selectedDeveloper !== 'All developers' &&
      !base.includes(selectedDeveloper)
    ) {
      return [base[0], selectedDeveloper, ...base.slice(1)];
    }
    return base;
  }, [availableDevelopers, selectedDeveloper]);

  const hasActiveFilters =
    selectedType !== 'All' ||
    selectedArea !== 'All areas' ||
    selectedPrice !== 'Any price' ||
    selectedDeveloper !== 'All developers' ||
    Boolean(filters?.searchQuery) ||
    Boolean(filters?.handover && filters.handover !== 'Any date') ||
    Boolean(filters?.bedrooms) ||
    Boolean(filters?.onlyNew);

  const emitChange = (next: Partial<ProjectSidebarFilters>) => {
    onFilterChange?.({
      propertyType: next.propertyType ?? selectedType,
      area: next.area ?? selectedArea,
      priceRange: next.priceRange ?? selectedPrice,
      developer: next.developer ?? selectedDeveloper,
      searchQuery: filters?.searchQuery,
      handover: filters?.handover,
      bedrooms: next.bedrooms !== undefined ? next.bedrooms : filters?.bedrooms,
      onlyNew: next.onlyNew !== undefined ? next.onlyNew : filters?.onlyNew,
    });
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    emitChange({ propertyType: type });
  };

  const handlePriceChange = (price: string) => {
    setSelectedPrice(price);
    emitChange({ priceRange: price });
  };

  const handleAreaChange = (area: string) => {
    setSelectedArea(area);
    emitChange({ area });
  };

  const handleDeveloperChange = (developer: string) => {
    setSelectedDeveloper(developer);
    emitChange({ developer });
  };

  const handleReset = () => {
    setSelectedType('All');
    setSelectedArea('All areas');
    setSelectedPrice('Any price');
    setSelectedDeveloper('All developers');
    if (onResetFilters) {
      onResetFilters();
    } else {
      onFilterChange?.({
        propertyType: 'All',
        area: 'All areas',
        priceRange: 'Any price',
        developer: 'All developers',
        searchQuery: '',
        handover: 'Any date',
        bedrooms: '',
        onlyNew: false,
      });
    }
  };

  return (
    <aside
      className="bg-white rounded-2xl border border-[#E8E8E8] p-5 sm:p-6 shadow-sm w-full"
      style={{ fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#111827] tracking-tight">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-bold text-[#BFA16A] hover:text-[#9c804e] transition-colors cursor-pointer"
          >
            Reset all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* 1. Property Type */}
        <div>
          <label className="block text-xs font-bold text-[#9CA3AF] tracking-wider uppercase mb-3">
            PROPERTY TYPE
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {propertyTypes.map((type) => {
              const isActive = selectedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeChange(type)}
                  className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-150 cursor-pointer text-center truncate ${
                    isActive
                      ? 'border-[#18181B] bg-[#18181B] text-white shadow-sm'
                      : 'border-[#E5E7EB] bg-white text-[#1F2937] hover:border-gray-400 hover:bg-stone-50'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Area */}
        <div>
          <label className="block text-xs font-bold text-[#9CA3AF] tracking-wider uppercase mb-3">
            AREA
          </label>
          <div className="relative">
            <select
              value={selectedArea}
              onChange={(e) => handleAreaChange(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-9 text-sm font-semibold text-[#1F2937] focus:outline-none focus:ring-1 focus:ring-[#BFA16A] focus:border-[#BFA16A] cursor-pointer transition-colors"
            >
              {areaOptions.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#1F2937]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 3. Price Range */}
        <div>
          <label className="block text-xs font-bold text-[#9CA3AF] tracking-wider uppercase mb-3">
            PRICE RANGE
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {priceRanges.map((price, idx) => {
              const isActive = selectedPrice === price;
              const isFullWidth = idx === priceRanges.length - 1 && priceRanges.length % 2 !== 0;
              return (
                <button
                  key={price}
                  type="button"
                  onClick={() => handlePriceChange(price)}
                  className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-150 cursor-pointer text-center truncate ${
                    isFullWidth ? 'col-span-1' : ''
                  } ${
                    isActive
                      ? 'bg-[#BFA16A] border-[#BFA16A] text-white shadow-sm'
                      : 'border-[#E5E7EB] bg-white text-[#1F2937] hover:border-gray-400 hover:bg-stone-50'
                  }`}
                >
                  {price}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Developer */}
        <div>
          <label className="block text-xs font-bold text-[#9CA3AF] tracking-wider uppercase mb-3">
            DEVELOPER
          </label>
          <div className="relative">
            <select
              value={selectedDeveloper}
              onChange={(e) => handleDeveloperChange(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-9 text-sm font-semibold text-[#1F2937] focus:outline-none focus:ring-1 focus:ring-[#BFA16A] focus:border-[#BFA16A] cursor-pointer transition-colors"
            >
              {developerOptions.map((dev) => (
                <option key={dev} value={dev}>
                  {dev}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#1F2937]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
