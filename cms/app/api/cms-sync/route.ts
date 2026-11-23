import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

function getStorePath(): string {
  const inFrontend = path.resolve(process.cwd(), '..', 'frontend', '.cms-sync.json');
  const inCurrent = path.resolve(process.cwd(), '.cms-sync.json');
  try {
    const fsSync = require('fs');
    if (fsSync.existsSync(inFrontend)) return inFrontend;
    if (fsSync.existsSync(inCurrent)) return inCurrent;
  } catch {}
  return inFrontend;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

async function readStore(): Promise<Record<string, any>> {
  try {
    const raw = await fs.readFile(getStorePath(), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeStore(data: Record<string, any>): Promise<void> {
  await fs.writeFile(getStorePath(), JSON.stringify(data, null, 2), 'utf-8');
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  const store = await readStore();
  return NextResponse.json({ success: true, data: store }, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = await readStore();
    const updated = {
      ...current,
      ...body,
      pages: {
        ...(current.pages || {}),
        ...(body.pages || {}),
      },
      updatedAt: new Date().toISOString(),
    };

    if (Array.isArray(body.deletedPages)) {
      body.deletedPages.forEach((slug: string) => {
        if (updated.pages && updated.pages[slug]) {
          delete updated.pages[slug];
        }
      });
    }

    if (Array.isArray(body.deletedProperties)) {
      const delSet = new Set(body.deletedProperties.map((s: any) => String(s).toLowerCase().trim()));
      if (Array.isArray(updated.properties)) {
        updated.properties = updated.properties.filter(
          (p: any) =>
            !delSet.has(String(p.id).toLowerCase().trim()) &&
            !delSet.has(String(p.title).toLowerCase().trim()) &&
            !delSet.has(String(p.slug || '').toLowerCase().trim())
        );
      }
    }

    if (Array.isArray(body.deletedDevelopers)) {
      const delSet = new Set(body.deletedDevelopers.map((s: any) => String(s).toLowerCase().trim()));
      if (Array.isArray(updated.developerCards)) {
        updated.developerCards = updated.developerCards.filter(
          (d: any) =>
            !delSet.has(String(d.id || '').toLowerCase().trim()) &&
            !delSet.has(String(d.name || '').toLowerCase().trim()) &&
            !delSet.has(String(d.slug || d.href || '').replace(/^\/developers\//, '').toLowerCase().trim())
        );
      }
    }

    await writeStore(updated);
    return NextResponse.json({ success: true, data: updated }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to sync CMS store' },
      { status: 500, headers: corsHeaders }
    );
  }
}
