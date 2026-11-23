import React from 'react';
import type { Metadata } from 'next';
import ProjectDetailPage, { generateMetadata as baseMetadata } from '../page';

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  return baseMetadata({ searchParams: Promise.resolve({ slug: resolvedParams.slug }) });
}

export default async function ProjectDetailSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  return <ProjectDetailPage searchParams={Promise.resolve({ slug: resolvedParams.slug })} />;
}
