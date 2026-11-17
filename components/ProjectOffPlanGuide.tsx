'use client';

import React, { useState, useEffect } from 'react';

const DEFAULT_GUIDE_HTML = `<h2>Types of off-plan property in Dubai</h2>
<p>Off-plan stock spans the whole market. Studios and 1–bedroom apartments are the most liquid and carry the lowest entry price, which is why they dominate investor demand. 2– and 3–bedroom apartments serve end users and families and clear the AED 2m threshold that can qualify a buyer for the Golden Visa. Townhouses and villas sit at the top of the ticket range and are bought more for lifestyle and long-term hold than for yield. Filter the listing above by unit type to compare like with like.</p>

<h2>How buying off-plan works</h2>
<p>You reserve a unit with a booking deposit, then pay the balance in instalments tied to construction milestones, with the remainder due on handover. Funds are held in a RERA-regulated escrow account released to the developer against verified progress. The 4% Dubai Land Department fee sits on top of the price. Every listing above shows the launch price and, where the developer publishes it, the full payment schedule — so you can see the real day-one cash requirement before you enquire.</p>

<h2>Choosing a community and developer</h2>
<p>Location and developer track record matter more off-plan than in any ready market, because you are buying against a drawing and a delivery promise. Established communities price in their amenities; emerging districts offer lower entry prices in exchange for build-out risk. Browse by community or by developer to compare, or explore every launch on the interactive map.</p>`;

interface ProjectOffPlanGuideProps {
  contentHtml?: string;
}

export default function ProjectOffPlanGuide({ contentHtml }: ProjectOffPlanGuideProps) {
  const [html, setHtml] = useState(contentHtml || '');

  useEffect(() => {
    if (contentHtml) {
      setHtml(contentHtml);
      return;
    }
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('fs_page_project-main-page');
        if (cached) {
          const parsed = JSON.parse(cached);
          const customSecs = parsed?.content?.customSections;
          const liveHtml =
            customSecs?.['proj-main-guide']?.detailHtml ||
            customSecs?.['proj-guide']?.detailHtml;
          if (liveHtml) {
            setHtml(liveHtml);
          }
        }
      } catch (_) {}
    }
  }, [contentHtml]);

  const displayHtml = html?.trim() ? html : DEFAULT_GUIDE_HTML;

  return (
    <div
      className="w-full pt-8 sm:pt-12 border-t border-[#F0EFEA] space-y-6 max-w-5xl text-sm sm:text-[15.5px] text-[#71717A] font-normal leading-[1.8] sm:leading-[1.85] [&>h1]:text-2xl [&>h1]:sm:text-3xl [&>h1]:font-bold [&>h1]:text-[#18181B] [&>h1]:tracking-tight [&>h1]:mt-8 [&>h1]:mb-3 [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-bold [&>h2]:text-[#18181B] [&>h2]:tracking-tight [&>h2]:mt-8 [&>h2]:mb-3.5 [&>h2:first-child]:mt-0 [&>h3]:text-lg [&>h3]:sm:text-xl [&>h3]:font-semibold [&>h3]:text-[#18181B] [&>h3]:mt-6 [&>h3]:mb-2 [&>p]:my-3.5 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2 [&_strong]:text-[#18181B] [&_strong]:font-semibold [&_img]:rounded-xl [&_img]:my-4 [&_a]:text-[#BFA16A] [&_a]:underline"
      style={{ fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif' }}
      dangerouslySetInnerHTML={{ __html: displayHtml }}
    />
  );
}
