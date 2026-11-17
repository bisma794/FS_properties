const getBaseHost = () => {
  if (typeof window !== 'undefined') return window.location.hostname;
  return process.env.NEXT_PUBLIC_HOST || '127.0.0.1';
};

const API_BASE_URL = typeof window !== 'undefined'
  ? `http://${window.location.hostname}:8000/api`
  : 'http://127.0.0.1:8000/api';

const LOCAL_SYNC_URL = typeof window !== 'undefined'
  ? `http://${window.location.hostname}:3000/api/cms-sync`
  : 'http://127.0.0.1:3000/api/cms-sync';

async function getLocalSyncedPage(slug: string): Promise<PageData | null> {
  // 1. Direct file read on server side (fastest & 100% reliable)
  if (typeof window === 'undefined') {
    try {
      const fsSync = await import('fs/promises');
      const pathSync = await import('path');
      const storePath = pathSync.join(process.cwd(), '.cms-sync.json');
      const raw = await fsSync.readFile(storePath, 'utf-8');
      const json = JSON.parse(raw);
      if (json?.pages && json.pages[slug]) {
        return json.pages[slug];
      }
    } catch {
      // fallback to http
    }
  }

  // 2. HTTP fetch fallback
  try {
    const res = await fetch(LOCAL_SYNC_URL, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    if (json?.success && json.data?.pages && json.data.pages[slug]) {
      return json.data.pages[slug];
    }
  } catch {
    // ignore if local sync route is unavailable
  }
  return null;
}

export interface PageData {
  id: number;
  title: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  content?: {
    hero?: {
      heading?: string;
      subheading?: string;
      ctaText?: string;
      [key: string]: any;
    };
    features?: Array<{ title: string; desc: string }>;
    [key: string]: any;
  };

  status: 'draft' | 'published';
  created_at?: string;
  updated_at?: string;
}

/**
 * Fetch a single page by slug from Laravel Backend API
 */
export async function getPageBySlug(slug: string): Promise<PageData | null> {
  const localSynced = await getLocalSyncedPage(slug);
  try {
    const res = await fetch(`${API_BASE_URL}/pages/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) return localSynced;

    const json = await res.json();
    if (json.success && json.data) {
      if (localSynced?.content) {
        return {
          ...json.data,
          ...localSynced,
          content: {
            ...(json.data.content || {}),
            ...(localSynced.content || {}),
          },
        };
      }
      return json.data;
    }
    return localSynced;
  } catch (error) {
    return localSynced;
  }
}

/**
 * Fetch all published pages from Laravel Backend API
 */
export async function getAllPages(): Promise<PageData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/pages`, {
      cache: 'no-store',
    });

    if (!res.ok) return [];

    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching pages from Laravel API:', error);
    return [];
  }
}

/**
 * Fetch all published property listings from persistent sync store (.cms-sync.json) or Laravel API
 */
export async function getSyncedProperties(): Promise<any[]> {
  // 1. Direct file read on server side (SSR)
  if (typeof window === 'undefined') {
    try {
      const fsSync = await import('fs/promises');
      const pathSync = await import('path');
      const storePath = pathSync.join(process.cwd(), '.cms-sync.json');
      const raw = await fsSync.readFile(storePath, 'utf-8');
      const json = JSON.parse(raw);
      if (Array.isArray(json?.properties) && json.properties.length > 0) {
        const deleted = new Set(
          Array.isArray(json.deletedProperties)
            ? json.deletedProperties.map((s: any) => String(s).toLowerCase().trim())
            : []
        );
        const filtered = json.properties.filter(
          (p: any) =>
            !deleted.has(String(p.id).toLowerCase().trim()) &&
            !deleted.has(String(p.title).toLowerCase().trim()) &&
            !deleted.has(String(p.slug || '').toLowerCase().trim())
        );
        if (filtered.length > 0) return filtered;
      }
    } catch {
      // fallback
    }
  }

  // 2. HTTP fetch from Laravel backend
  try {
    const res = await fetch(`${API_BASE_URL}/properties`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch {
    // ignore
  }

  return [];
}

/**
 * Fetch all active developers from persistent sync store (.cms-sync.json) or Laravel API
 */
export async function getSyncedDevelopers(): Promise<any[]> {
  // 1. Direct file read on server side (SSR)
  if (typeof window === 'undefined') {
    try {
      const fsSync = await import('fs/promises');
      const pathSync = await import('path');
      const storePath = pathSync.join(process.cwd(), '.cms-sync.json');
      const raw = await fsSync.readFile(storePath, 'utf-8');
      const json = JSON.parse(raw);
      const devs =
        json?.developerCards ||
        json?.pages?.developers?.content?.developerCards ||
        json?.pages?.developers?.content?.customSections?.['dev-grid']?.items;
      if (Array.isArray(devs) && devs.length > 0) {
        const deleted = new Set(
          Array.isArray(json.deletedDevelopers)
            ? json.deletedDevelopers.map((s: any) => String(s).toLowerCase().trim())
            : []
        );
        const filtered = devs.filter((d: any) => {
          const id = String(d.id || '').toLowerCase().trim();
          const name = String(d.name || '').toLowerCase().trim();
          const slug = String(d.slug || d.href || '').replace(/^\/developers\//, '').toLowerCase().trim();
          return !deleted.has(id) && !deleted.has(name) && !deleted.has(slug);
        });
        if (filtered.length > 0) return filtered;
      }
    } catch {
      // fallback
    }
  }

  // 2. HTTP fetch from Laravel backend
  try {
    const res = await fetch(`${API_BASE_URL}/pages/developers`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      const devs =
        json.data?.content?.developerCards ||
        json.data?.content?.customSections?.['dev-grid']?.items;
      if (Array.isArray(devs) && devs.length > 0) {
        return devs;
      }
    }
  } catch {
    // ignore
  }

  return [];
}

