'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface DeveloperItem {
  id?: string | number;
  name: string;
  slug?: string;
  logo: string;
  href?: string;
}

// 12 developer logos directed to their respective developer detail pages
const baseDevelopers: DeveloperItem[] = [
  // Row 1
  { id: '1', name: 'BINGHATTI', slug: 'binghatti', logo: '/developers/binghatti.png', href: '/developers/binghatti' },
  { id: '2', name: 'SOBHA REALTY', slug: 'sobha', logo: '/developers/sobha.png', href: '/developers/sobha' },
  { id: '3', name: 'MERAAS', slug: 'meraas', logo: '/developers/meraas.png', href: '/developers/meraas' },
  { id: '4', name: 'DAMAC', slug: 'damac', logo: '/developers/damac.png', href: '/developers/damac' },

  // Row 2
  { id: '5', name: 'EMAAR', slug: 'emaar', logo: '/developers/emaar.png', href: '/developers/emaar' },
  { id: '6', name: 'AZIZI DEVELOPMENTS', slug: 'azizi', logo: '/developers/azizi.png', href: '/developers/azizi' },
  { id: '7', name: 'NAKHEEL', slug: 'nakheel', logo: '/developers/nakheel.png', href: '/developers/nakheel' },
  { id: '8', name: 'OMNIYAT', slug: 'omniyat', logo: '/developers/omniyat.png', href: '/developers/omniyat' },

  // Row 3
  { id: '9', name: 'DANUBE PROPERTIES', slug: 'danube', logo: '/developers/danube.png', href: '/developers/danube' },
  { id: '10', name: 'ELLINGTON PROPERTIES', slug: 'ellington', logo: '/developers/ellington.png', href: '/developers/ellington' },
  { id: '11', name: 'SELECT GROUP', slug: 'select-group', logo: '/developers/select-group.png', href: '/developers/select-group' },
  { id: '12', name: 'SAMANA DEVELOPERS', slug: 'samana', logo: '/developers/samana.png', href: '/developers/samana' },
];

const defaultDevelopersList: DeveloperItem[] = [...baseDevelopers];

export default function DevelopersDirectoryGrid({
  initialDevelopers,
}: {
  initialDevelopers?: DeveloperItem[];
} = {}) {
  const [developersList, setDevelopersList] = useState<DeveloperItem[]>(
    Array.isArray(initialDevelopers) && initialDevelopers.length > 0
      ? initialDevelopers
      : defaultDevelopersList
  );

  useEffect(() => {
    const getDeletedSet = (extraDeleted: string[] = []) => {
      try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem('fs_deleted_developers') : null;
        const localArr = raw ? JSON.parse(raw).map((s: any) => String(s).toLowerCase().trim()) : [];
        return new Set([...localArr, ...extraDeleted.map((s) => String(s).toLowerCase().trim())]);
      } catch {
        return new Set<string>(extraDeleted.map((s) => String(s).toLowerCase().trim()));
      }
    };

    const filterDeleted = (list: any[], deleted: Set<string>) =>
      list.filter((d) => {
        const id = String(d.id || '').toLowerCase().trim();
        const name = String(d.name || '').toLowerCase().trim();
        const slug = String(d.slug || d.href || '').replace(/^\/developers\//, '').toLowerCase().trim();
        return !deleted.has(id) && !deleted.has(name) && !deleted.has(slug);
      });

    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('fs_developers_list') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDevelopersList(filterDeleted(parsed, getDeletedSet()));
        }
      }
    } catch (_) {}

    // Fetch from cross-port CMS store (/api/cms-sync)
    fetch('/api/cms-sync', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          const deleted = getDeletedSet(json.data.deletedDevelopers || []);
          const syncedDevs =
            json.data.developerCards ||
            json.data.pages?.developers?.content?.developerCards ||
            json.data.pages?.developers?.content?.customSections?.['dev-grid']?.items;
          if (Array.isArray(syncedDevs) && syncedDevs.length > 0) {
            setDevelopersList(filterDeleted(syncedDevs, deleted));
          }
        }
      })
      .catch(() => {});

    // Also check Laravel backend if available
    const apiHost = typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1';
    fetch(`http://${apiHost}:8000/api/pages/developers`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.content?.developerCards) {
          const backendCards = json.data.content.developerCards;
          if (Array.isArray(backendCards) && backendCards.length > 0) {
            setDevelopersList((prev) => {
              const deleted = getDeletedSet();
              const filteredBackend = filterDeleted(backendCards, deleted);
              // Merge preserving any newly added custom cards present in prev
              const existingSlugs = new Set(filteredBackend.map((d: any) => String(d.slug || d.name).toLowerCase().trim()));
              const missingFromBackend = prev.filter((d) => !existingSlugs.has(String(d.slug || d.name).toLowerCase().trim()));
              return [...missingFromBackend, ...filteredBackend];
            });
          }
        }
      })
      .catch(() => {});

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'fs_developers_list' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setDevelopersList(filterDeleted(parsed, getDeletedSet()));
          }
        } catch (_) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  return (
    <section className="w-full bg-[#FAF9F6] py-8 sm:py-12 border-b border-[#E5E0D8]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
        {/* Outer Grid Container with outer border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#E5E0D8] bg-white divide-y sm:divide-y-0 lg:divide-y divide-[#E5E0D8]">
          {developersList.map((dev, idx) => {
            const resolvedSlug =
              dev.slug ||
              dev.name
                .toLowerCase()
                .replace(/\s+(properties|developments|developers|realty)$/i, '')
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            const resolvedHref =
              dev.href && dev.href.startsWith('/developers/')
                ? dev.href
                : `/developers/${resolvedSlug}`;

            return (
              <Link
                key={idx}
                href={resolvedHref}
                className="group relative flex flex-col justify-between p-7 sm:p-9 h-[180px] sm:h-[195px] border-[#E5E0D8] hover:bg-[#FAF8F5] transition-all duration-200 border-r border-b"
              >
              {/* Centered Developer Logo + Name */}
              <div className="flex-1 flex flex-col items-center justify-center p-2 gap-2">
                <div className="relative w-full max-w-[160px] h-[50px] sm:h-[58px] flex items-center justify-center">
                  <img
                    src={dev.logo || '/developers/emaar.png'}
                    alt={dev.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#171717] group-hover:text-[#BFA16A] transition-colors text-center truncate max-w-full">
                  {dev.name}
                </span>
              </div>

              {/* Bottom Action Row: "SEE THE PROJECTS" button + Arrow */}
              <div className="flex items-center justify-between pt-2">
                <span
                  className="px-3 py-1 rounded-[3px] border border-[#E5E0D8] bg-white text-[10px] sm:text-[10.5px] uppercase tracking-wider text-[#666666] group-hover:border-[#BFA16A] group-hover:text-[#BFA16A] transition-colors"
                  style={{
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  SEE THE PROJECTS
                </span>

                {/* Diagonal Arrow Icon ↗ */}
                <svg
                  className="w-3.5 h-3.5 text-[#888888] group-hover:text-[#BFA16A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
