'use client';

import React, { useState, useMemo, useEffect } from 'react';
import ProjectFilterSidebar, { ProjectSidebarFilters } from './ProjectFilterSidebar';
import ExploreMoreSidebar from './ExploreMoreSidebar';
import ProjectCard, { ProjectCardData } from './ProjectCard';
import { ALL_OFFPLAN_PROJECTS, OffPlanProject, normalizeSlug } from '@/lib/projects';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
const CARDS_PER_PAGE = 12;

function getDeveloperBadge(developer: string): string {
  const upper = (developer || 'EMAAR').toUpperCase();
  if (upper.includes('EMAAR')) return 'EMAAR';
  if (upper.includes('DAMAC')) return 'DAMAC';
  if (upper.includes('SOBHA')) return 'SOBHA';
  if (upper.includes('NAKHEEL')) return 'NAKHEEL';
  if (upper.includes('MERAAS')) return 'MERAAS';
  if (upper.includes('ALDAR')) return 'ALDAR';
  if (upper.includes('MAJID') || upper.includes('FUTTAIM')) return 'MAJID AL FUTTAIM';
  return upper.replace(/\s+PROPERTIES|\s+REALTY|\s+DEVELOPMENTS/g, '').trim() || 'EMAAR';
}

function mapOffPlanToCard(p: OffPlanProject, index: number, isNew = false): ProjectCardData {
  // Preserve the exact initial 12 card display titles/badges where applicable
  const slug = p.slug || normalizeSlug(p.title);
  return {
    id: String(p.id || `proj-${index}`),
    isFeatured: true,
    isNew,
    developerBadge: getDeveloperBadge(p.developer),
    developer: p.developer || 'Emaar Properties',
    developerCategory: isNew ? 'NEW LAUNCH PROJECT' : 'FEATURED DEVELOPER',
    title: p.title,
    location: p.location || 'Dubai, Dubai',
    plan: p.payment_plan || '70/30',
    handover: p.completion_date || 'Q4 2028',
    price: p.starting_price || 'AED 1,990,000',
    propertyType: p.type || 'Apartments',
    imageUrl: p.imageUrl,
    link: `/project-detail?slug=${slug}`,
    createdAt: isNew ? Date.now() + (1000 - index) : 1000 - index,
  };
}

const STATIC_PROJECTS: ProjectCardData[] = ALL_OFFPLAN_PROJECTS.map((p, idx) =>
  mapOffPlanToCard(p, idx, false)
);

function parsePriceToAED(priceStr: string): number {
  if (!priceStr) return 0;
  const cleaned = priceStr.toUpperCase().replace(/,/g, '').trim();
  const mMatch = cleaned.match(/(\d+(?:\.\d+)?)\s*M/);
  if (mMatch) {
    return Math.round(parseFloat(mMatch[1]) * 1_000_000);
  }
  const kMatch = cleaned.match(/(\d+(?:\.\d+)?)\s*K/);
  if (kMatch) {
    return Math.round(parseFloat(kMatch[1]) * 1_000);
  }
  const digits = cleaned.replace(/[^0-9]/g, '');
  return parseInt(digits, 10) || 0;
}

function cleanTitleForSort(title: string): string {
  return (title || '').replace(/^["'\s]+|["'\s]+$/g, '').trim();
}

function matchesAreaFilter(project: ProjectCardData, selectedArea: string): boolean {
  if (!selectedArea || selectedArea === 'All areas') return true;
  const areaLower = selectedArea.toLowerCase().trim();
  const locLower = (project.location || '').toLowerCase();
  const titleLower = (project.title || '').toLowerCase();
  const combined = `${locLower} ${titleLower}`;

  // Direct substring match
  if (combined.includes(areaLower)) return true;

  // Smart alias / sub-community mapping for Sidebar & ExploreMoreSidebar chips
  const areaAliases: Record<string, string[]> = {
    'dubai hills estate': ['dubai hills', 'parkside', 'grand polo'],
    'damac islands': ['dubai island', 'damac island', 'hawaii', 'lagoon'],
    'dubai island a': ['dubai island', 'damac island', 'hawaii'],
    'the valley': ['the valley', 'dubailand'],
    'dubai marina': ['dubai marina', 'marina shores', 'emaar beachfront', 'grand bleu'],
    'jbr': ['dubai marina', 'emaar beachfront', 'marina', 'grand bleu', 'palm'],
    'palm jumeirah': ['palm jumeirah', 'palm jebel ali', 'seafront'],
    'business bay': ['business bay', 'canal house', 'damac district', 'downtown'],
    'downtown dubai': ['downtown', 'opera district', 'boulevard heights', 'city walk'],
    'residential district': ['dubai south', 'emaar south', 'dubailand', 'riverside'],
    'dubai land residence complex dlrc': ['dubailand', 'the valley', 'haven', 'arabian ranches'],
    'al furjan': ['dubai south', 'emaar south', 'riverside', 'expo'],
    'district 10, jvc': ['dubai hills', 'tilal al ghaf', 'mbr city', 'sobha'],
    'azizi riviera': ['mbr city', 'sobha hartland', 'dubai creek'],
    'wadi al safa 5': ['dubailand', 'arabian ranches', 'the valley', 'haven'],
    'wadi al safa 2': ['dubailand', 'the valley', 'haven'],
    'wadi al safa 3': ['dubailand', 'the oasis', 'palmera', 'arabian ranches'],
    'wadi al safa 4': ['dubailand', 'arabian ranches', 'caya', 'spring', 'may'],
    'madinat al mataar': ['emaar south', 'dubai south', 'expo golf', 'greenville', 'terra heights', 'golf'],
    'al barsha south 2': ['dubai hills', 'tilal al ghaf', 'harmony'],
  };

  const aliases = areaAliases[areaLower];
  if (aliases && aliases.some((kw) => combined.includes(kw))) {
    return true;
  }

  return false;
}

function matchesPropertyTypeFilter(project: ProjectCardData, selectedType: string): boolean {
  if (!selectedType || selectedType === 'All' || selectedType === 'Any type') return true;
  const tLower = selectedType.toLowerCase();
  const projTypeLower = (project.propertyType || '').toLowerCase();
  const titleLower = (project.title || '').toLowerCase();
  const combined = `${projTypeLower} ${titleLower}`;

  if (tLower.startsWith('apartment')) {
    return (
      combined.includes('apartment') ||
      combined.includes('suite') ||
      combined.includes('waterfront') ||
      combined.includes('creek') ||
      combined.includes('marina') ||
      combined.includes('central park') ||
      combined.includes('district')
    );
  }
  if (tLower.startsWith('townhouse')) {
    return (
      combined.includes('townhouse') ||
      combined.includes('valley') ||
      combined.includes('hawaii') ||
      combined.includes('riverside') ||
      combined.includes('parkside') ||
      combined.includes('raya') ||
      combined.includes('greenville')
    );
  }
  if (tLower.startsWith('villa')) {
    return (
      combined.includes('villa') ||
      combined.includes('mansion') ||
      combined.includes('estate') ||
      combined.includes('island') ||
      combined.includes('haven') ||
      combined.includes('beach collection') ||
      combined.includes('harmony') ||
      combined.includes('polo')
    );
  }
  return combined.includes(tLower);
}

function matchesPriceRangeFilter(project: ProjectCardData, priceRange: string): boolean {
  if (!priceRange || priceRange === 'Any price') return true;
  const price = parsePriceToAED(project.price);
  if (!price) return true;

  switch (priceRange) {
    case 'Under 1M':
      return price < 1_000_000;
    case 'Under AED 1.5M':
      return price < 1_500_000;
    case '1M – 3M':
      return price >= 1_000_000 && price <= 3_000_000;
    case 'AED 1.5M - 3M':
      return price >= 1_500_000 && price <= 3_000_000;
    case '3M – 5M':
    case 'AED 3M - 5M':
      return price > 3_000_000 && price <= 5_000_000;
    case 'Above 5M':
      return price > 5_000_000;
    case 'AED 5M - 10M':
      return price > 5_000_000 && price <= 10_000_000;
    case 'AED 10M+':
      return price > 10_000_000;
    default:
      return true;
  }
}

function matchesDeveloperFilter(project: ProjectCardData, selectedDev: string): boolean {
  if (!selectedDev || selectedDev === 'All developers') return true;
  const devLower = selectedDev.toLowerCase();
  const projDev = (project.developer || '').toLowerCase();
  const projBadge = (project.developerBadge || '').toLowerCase();

  if (projDev.includes(devLower) || devLower.includes(projBadge)) return true;
  const firstWord = devLower.split(' ')[0];
  return firstWord ? projDev.includes(firstWord) || projBadge.includes(firstWord) : false;
}

export default function ProjectGridSection() {
  const [projects, setProjects] = useState<ProjectCardData[]>(STATIC_PROJECTS);
  const [sortBy, setSortBy] = useState('Newest First');
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
  const [filters, setFilters] = useState<ProjectSidebarFilters>({
    propertyType: 'All',
    area: 'All areas',
    priceRange: 'Any price',
    developer: 'All developers',
    searchQuery: '',
    handover: 'Any date',
    bedrooms: '',
    onlyNew: false,
  });

  // Load dynamic / newly added projects from CMS Backend & localStorage, placing new projects at the very start
  useEffect(() => {
    let isMounted = true;

    async function fetchLiveProjects() {
      try {
        const staticSlugs = new Set(
          ALL_OFFPLAN_PROJECTS.map((p) => normalizeSlug(p.slug || p.title))
        );
        const staticTitles = new Set(
          ALL_OFFPLAN_PROJECTS.map((p) => p.title.trim().toLowerCase())
        );

        const newCards: ProjectCardData[] = [];
        const overridesBySlug = new Map<string, Partial<ProjectCardData>>();
        const seenNewSlugs = new Set<string>();

        const processRawProject = (raw: any, priorityIndex: number) => {
          if (!raw || !raw.title) return;
          const titleStr = String(raw.title).trim();
          const slug = normalizeSlug(raw.slug || titleStr);
          if (!slug) return;

          const isStatic =
            staticSlugs.has(slug) || staticTitles.has(titleStr.toLowerCase());

          const cardData: ProjectCardData = {
            id: String(raw.id || `cms-${slug}`),
            isFeatured: true,
            isNew: !isStatic,
            developerBadge: getDeveloperBadge(raw.developer || 'Emaar Properties'),
            developer: raw.developer || 'Emaar Properties',
            developerCategory: !isStatic ? 'NEW LAUNCH PROJECT' : 'FEATURED DEVELOPER',
            title: titleStr,
            location: raw.location || 'Dubai, Dubai',
            plan: raw.payment_plan || raw.paymentPlan || '70/30',
            handover: raw.completion_date || raw.handover || 'Q4 2028',
            price: raw.starting_price || raw.startingPrice || 'AED 2,500,000',
            propertyType: raw.type || raw.unitTypes || 'Apartments & Villas',
            imageUrl: raw.imageUrl || raw.image_url,
            link: `/project-detail?slug=${slug}`,
            createdAt: Number(raw.createdAt || raw.id || Date.now()) + (100000 - priorityIndex),
          };

          if (isStatic) {
            overridesBySlug.set(slug, cardData);
          } else if (!seenNewSlugs.has(slug)) {
            seenNewSlugs.add(slug);
            newCards.push(cardData);
          }
        };

        // 1. Check localStorage cache first (instant sync when adding in CMS on same browser)
        if (typeof window !== 'undefined') {
          try {
            const cachedOffplans = localStorage.getItem('fs_offplans_list');
            if (cachedOffplans) {
              const parsed = JSON.parse(cachedOffplans);
              if (Array.isArray(parsed)) {
                parsed.forEach((item, idx) => processRawProject(item, idx));
              }
            }
          } catch (_) {}
        }

        // 2. Fetch from Backend API (/off-plans and /pages)
        const [offRes, pagesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/off-plans`, { cache: 'no-store' }).catch(() => null),
          fetch(`${API_BASE_URL}/pages`, { cache: 'no-store' }).catch(() => null),
        ]);

        if (offRes?.ok) {
          const offJson = await offRes.json().catch(() => null);
          if (offJson?.success && Array.isArray(offJson.data)) {
            // Sort by ID descending so newest added projects come first
            const sortedOff = [...offJson.data].sort(
              (a, b) => Number(b.id || 0) - Number(a.id || 0)
            );
            sortedOff.forEach((item, idx) => processRawProject(item, idx));
          }
        }

        if (pagesRes?.ok) {
          const pagesJson = await pagesRes.json().catch(() => null);
          if (pagesJson?.success && Array.isArray(pagesJson.data)) {
            const sortedPages = [...pagesJson.data].sort(
              (a, b) => Number(b.id || 0) - Number(a.id || 0)
            );
            sortedPages.forEach((p: any, idx: number) => {
              if (!p || p.slug === 'project-detail' || p.slug === 'project-main-page' || p.slug === 'the-valley') {
                return;
              }
              const meta = p.content?.projectMeta;
              const overview = p.content?.customSections?.['proj-overview'];
              const hero = p.content?.customSections?.['proj-hero'];
              if (meta || overview || p.content?.isOffPlan) {
                processRawProject(
                  {
                    id: p.id,
                    title: p.title,
                    slug: p.slug,
                    developer: overview?.developer || meta?.developer || 'Emaar Properties',
                    starting_price: overview?.startingPrice || meta?.starting_price || 'AED 2,490,000',
                    location: overview?.location || meta?.location || 'Dubai, Dubai',
                    completion_date: overview?.handover || meta?.completion_date || 'Q4 2029',
                    payment_plan: overview?.paymentPlan || meta?.payment_plan || '70/30',
                    type: overview?.unitTypes || meta?.type || 'Apartments & Villas',
                    imageUrl: hero?.backgroundImage || hero?.bgImage || meta?.imageUrl,
                  },
                  idx
                );
              }
            });
          }
        }

        if (!isMounted) return;

        // Merge: newly added projects at the VERY TOP, followed by static projects (with any CMS edits applied)
        const updatedStatic = STATIC_PROJECTS.map((sp) => {
          const slug = sp.link?.split('slug=')[1] || normalizeSlug(sp.title);
          const override = overridesBySlug.get(slug);
          return override ? { ...sp, ...override, isNew: false } : sp;
        });

        setProjects([...newCards, ...updatedStatic]);
      } catch (_) {
        // Keep static projects on error
      }
    }

    fetchLiveProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  // Listen for Hero Filter Bar submissions
  useEffect(() => {
    const handleHeroFilter = (e: Event) => {
      const customEvent = e as CustomEvent<{
        location: string;
        propertyType: string;
        budget: string;
        handover: string;
      }>;
      if (!customEvent.detail) return;
      const { location, propertyType, budget, handover } = customEvent.detail;

      let mappedType = 'All';
      if (propertyType && propertyType !== 'Any type') {
        if (propertyType === 'Apartment' || propertyType === 'Penthouse' || propertyType === 'Duplex') {
          mappedType = 'Apartments';
        } else if (propertyType === 'Villa') {
          mappedType = 'Villas';
        } else if (propertyType === 'Townhouse') {
          mappedType = 'Townhouses';
        } else {
          mappedType = propertyType;
        }
      }

      setFilters((prev) => ({
        ...prev,
        propertyType: mappedType,
        priceRange: budget || 'Any price',
        searchQuery: location?.trim() || '',
        handover: handover || 'Any date',
        bedrooms: '',
      }));
      setVisibleCount(CARDS_PER_PAGE);
    };

    window.addEventListener('fs-project-hero-filter', handleHeroFilter);
    return () => window.removeEventListener('fs-project-hero-filter', handleHeroFilter);
  }, []);

  // Reset pagination to 12 whenever filters or sort change
  const handleFilterChange = (nextFilters: ProjectSidebarFilters) => {
    setFilters(nextFilters);
    setVisibleCount(CARDS_PER_PAGE);
  };

  const handleResetFilters = () => {
    setFilters({
      propertyType: 'All',
      area: 'All areas',
      priceRange: 'Any price',
      developer: 'All developers',
      searchQuery: '',
      handover: 'Any date',
      bedrooms: '',
      onlyNew: false,
    });
    setVisibleCount(CARDS_PER_PAGE);
  };

  const handleSortChange = (nextSort: string) => {
    setSortBy(nextSort);
    setVisibleCount(CARDS_PER_PAGE);
  };

  // ExploreMoreSidebar handlers
  const handleRecommendSelect = (item: {
    label: string;
    area: string;
    propertyType?: string;
    bedrooms?: string;
  }) => {
    setFilters((prev) => {
      const isAlreadyActive =
        prev.area === item.area &&
        (item.bedrooms
          ? prev.bedrooms === item.bedrooms
          : prev.propertyType === (item.propertyType || 'All') && !prev.bedrooms);

      if (isAlreadyActive) {
        return {
          ...prev,
          area: 'All areas',
          propertyType: 'All',
          bedrooms: '',
        };
      }
      return {
        ...prev,
        area: item.area,
        propertyType: item.propertyType || 'All',
        bedrooms: item.bedrooms || '',
      };
    });
    setVisibleCount(CARDS_PER_PAGE);
  };

  const handleAreaChipSelect = (area: string) => {
    setFilters((prev) => ({
      ...prev,
      area: prev.area.toLowerCase() === area.toLowerCase() ? 'All areas' : area,
      bedrooms: '',
    }));
    setVisibleCount(CARDS_PER_PAGE);
  };

  const handleInvestSelect = (mode: 'all' | 'new') => {
    if (mode === 'all') {
      handleResetFilters();
      setSortBy('Newest First');
    } else {
      setFilters((prev) => ({
        ...prev,
        onlyNew: !prev.onlyNew,
      }));
      setSortBy('Newest First');
      setVisibleCount(CARDS_PER_PAGE);
    }
  };

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      if (!matchesPropertyTypeFilter(project, filters.propertyType)) return false;
      if (!matchesAreaFilter(project, filters.area)) return false;
      if (!matchesPriceRangeFilter(project, filters.priceRange)) return false;
      if (!matchesDeveloperFilter(project, filters.developer)) return false;

      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase().trim();
        const hay = `${project.title} ${project.location} ${project.developer || ''} ${project.developerBadge || ''} ${project.propertyType || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      if (filters.handover && filters.handover !== 'Any date') {
        const h = (project.handover || '').toLowerCase();
        if (filters.handover === 'Ready Now') {
          if (!h.includes('ready') && !h.includes('2025') && !h.includes('2026')) return false;
        } else if (filters.handover === '2027+') {
          if (!h.includes('2027') && !h.includes('2028') && !h.includes('2029') && !h.includes('2030')) return false;
        } else if (!h.includes(filters.handover.toLowerCase())) {
          return false;
        }
      }

      if (filters.onlyNew) {
        const isRecentLaunch =
          Boolean(project.isNew) ||
          project.title.toLowerCase().includes('new') ||
          project.handover.includes('2029') ||
          project.handover.includes('2030');
        if (!isRecentLaunch) return false;
      }

      return true;
    });

    const list = [...filtered];
    if (sortBy === 'Newest First') {
      // Newly added projects (isNew === true) always stay at the very top, sorted by newest created first
      list.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        if (a.isNew && b.isNew) {
          return (b.createdAt || 0) - (a.createdAt || 0);
        }
        return 0;
      });
    } else if (sortBy === 'Name (A-Z)') {
      list.sort((a, b) =>
        cleanTitleForSort(a.title).localeCompare(cleanTitleForSort(b.title), undefined, {
          sensitivity: 'base',
        })
      );
    } else if (sortBy === 'Name (Z-A)') {
      list.sort((a, b) =>
        cleanTitleForSort(b.title).localeCompare(cleanTitleForSort(a.title), undefined, {
          sensitivity: 'base',
        })
      );
    } else if (sortBy === 'Price: Low to High') {
      list.sort((a, b) => parsePriceToAED(a.price) - parsePriceToAED(b.price));
    } else if (sortBy === 'Price: High to Low') {
      list.sort((a, b) => parsePriceToAED(b.price) - parsePriceToAED(a.price));
    }
    return list;
  }, [projects, filters, sortBy]);

  // Slice to only show visibleCount (12 initially, +12 on each "Load more projects" click)
  const visibleProjects = useMemo(
    () => filteredAndSortedProjects.slice(0, visibleCount),
    [filteredAndSortedProjects, visibleCount]
  );

  const hasMoreProjects = visibleCount < filteredAndSortedProjects.length;

  const activeFilterTags = useMemo(() => {
    const tags: { label: string; onRemove: () => void }[] = [];
    if (filters.propertyType !== 'All') {
      tags.push({
        label: `Type: ${filters.propertyType}`,
        onRemove: () => handleFilterChange({ ...filters, propertyType: 'All' }),
      });
    }
    if (filters.area !== 'All areas') {
      tags.push({
        label: `Area: ${filters.area}`,
        onRemove: () => handleFilterChange({ ...filters, area: 'All areas', bedrooms: '' }),
      });
    }
    if (filters.priceRange !== 'Any price') {
      tags.push({
        label: `Price: ${filters.priceRange}`,
        onRemove: () => handleFilterChange({ ...filters, priceRange: 'Any price' }),
      });
    }
    if (filters.developer !== 'All developers') {
      tags.push({
        label: `Developer: ${filters.developer}`,
        onRemove: () => handleFilterChange({ ...filters, developer: 'All developers' }),
      });
    }
    if (filters.bedrooms) {
      tags.push({
        label: filters.bedrooms,
        onRemove: () => handleFilterChange({ ...filters, bedrooms: '' }),
      });
    }
    if (filters.searchQuery) {
      tags.push({
        label: `Search: "${filters.searchQuery}"`,
        onRemove: () => handleFilterChange({ ...filters, searchQuery: '' }),
      });
    }
    if (filters.handover && filters.handover !== 'Any date') {
      tags.push({
        label: `Handover: ${filters.handover}`,
        onRemove: () => handleFilterChange({ ...filters, handover: 'Any date' }),
      });
    }
    if (filters.onlyNew) {
      tags.push({
        label: 'New Launches Only',
        onRemove: () => handleFilterChange({ ...filters, onlyNew: false }),
      });
    }
    return tags;
  }, [filters]);

  return (
    <div
      id="project-catalog-grid"
      className="w-full"
      style={{ fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif' }}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 gap-4">
        {/* Results Count & Active Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs sm:text-sm text-[#71717A]">
            Showing <span className="font-bold text-[#18181B]">{visibleProjects.length}</span> of{' '}
            <span className="font-bold text-[#18181B]">{filteredAndSortedProjects.length}</span> projects · updated today
          </p>

          {activeFilterTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 ml-1">
              {activeFilterTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF5EB] border border-[#BFA16A]/40 text-[11px] font-semibold text-[#18181B]"
                >
                  <span>{tag.label}</span>
                  <button
                    type="button"
                    onClick={tag.onRemove}
                    className="text-[#71717A] hover:text-[#18181B] cursor-pointer font-bold"
                    aria-label={`Remove ${tag.label} filter`}
                  >
                    ✕
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-[#BFA16A] hover:underline ml-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <label htmlFor="sort-select" className="text-xs sm:text-sm text-[#71717A] shrink-0 font-medium">
            Sort
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="appearance-none bg-white border border-[#E4E4E7] rounded-xl px-4 py-2 pr-9 text-xs sm:text-sm font-semibold text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#BFA16A] focus:border-[#BFA16A] cursor-pointer"
            >
              <option value="Newest First">Newest First</option>
              <option value="Name (A-Z)">Name (A–Z)</option>
              <option value="Name (Z-A)">Name (Z–A)</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#18181B]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout: Filter Sidebar (Left) & 3-Column Cards Grid (Right) */}
      <div className="flex flex-col lg:flex-row items-start gap-6 xl:gap-7">
        {/* Left: Filter & Explore More Sidebar Containers */}
        <div className="w-full lg:w-[260px] xl:w-[275px] shrink-0 space-y-6">
          <ProjectFilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
          <ExploreMoreSidebar
            activeArea={filters.area}
            activePropertyType={filters.propertyType}
            activeBedrooms={filters.bedrooms}
            onlyNew={filters.onlyNew}
            onRecommendSelect={handleRecommendSelect}
            onAreaSelect={handleAreaChipSelect}
            onInvestSelect={handleInvestSelect}
          />
        </div>

        {/* Right: Project Cards Grid (3 cards per row on desktop, slightly reduced card width) */}
        <div className="flex-1 w-full min-w-0">
          {visibleProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="bg-[#FAF9F6] border border-[#E5E0D8] rounded-2xl p-12 text-center space-y-4">
              <p className="text-base sm:text-lg font-bold text-[#18181B]">
                No off-plan projects match your selected filters
              </p>
              <p className="text-xs sm:text-sm text-[#71717A] max-w-md mx-auto">
                Try adjusting your property type, area, price range, or developer filters to explore more available developments.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center justify-center bg-[#BFA16A] hover:bg-[#ab8f5b] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Centered Golden Button (Load more projects) - Only shown when more than 12 / visibleCount cards exist */}
      {hasMoreProjects && (
        <div className="flex justify-center pt-10 sm:pt-14 pb-2">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + CARDS_PER_PAGE)}
            className="bg-[#BFA16A] hover:bg-[#ab8f5b] active:scale-[0.98] text-white font-semibold text-sm sm:text-[15px] px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl shadow-[0_4px_14px_rgba(191,161,106,0.25)] transition-all duration-200 cursor-pointer"
          >
            Load more projects ({filteredAndSortedProjects.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
