'use client';

import React, { useState, useEffect } from 'react';

export const DEFAULT_OFFPLAN_GUIDE_HTML = `<h2>Off-Plan Properties in Dubai</h2>
<p>Off-plan property in Dubai refers to the purchase of a new home directly from the developer before construction is complete, typically at a launch price and with a flexible, staged payment plan. It has become the most widely used route into the Dubai real estate market, accounting for roughly three-quarters of all transactions in the emirate, largely because it combines the lowest entry price, instalment-based payments during construction, and strong potential for capital appreciation by the time the project is handed over.</p>
<p>Offplans.com lists more than 2,000 live off-plan projects from Dubai's leading developers, complete with verified pricing, detailed payment plans, and floor plans, giving investors a single, reliable source to research and compare opportunities across the city.</p>
<p>If you are new to off-plan investing, we recommend starting with our complete Off-Plan Dubai Guide, browsing our curated list of off-plan projects in Dubai and off-plan apartments in Dubai, comparing payment plans across developers, or exploring the full catalogue of live off-plan projects currently on the market.</p>

<h2>Why Buy Off-Plan Property in Dubai?</h2>
<p>Off-plan is the preferred entry point for most investors because it brings together several distinct advantages in a single transaction:</p>
<ul>
<li><strong>Lower entry price.</strong> Off-plan units are typically priced below comparable ready properties, since developers offer launch-stage pricing to attract early buyers.</li>
<li><strong>Staged payments.</strong> Rather than paying the full purchase price upfront, buyers pay in instalments spread across the construction period, keeping capital available for other investments.</li>
<li><strong>Favourable tax environment.</strong> Dubai imposes no annual property tax, no tax on rental income, and no capital gains tax, allowing investors to retain a greater share of their returns.</li>
<li><strong>Golden Visa eligibility.</strong> A property purchase of AED 2 million or more can qualify the buyer for a 10-year UAE Golden Visa, offering long-term residency benefits.</li>
<li><strong>Escrow-protected payments.</strong> Every off-plan payment is held in a government-regulated escrow account and released to the developer only once construction milestones have been independently certified, ensuring that funds are tied directly to verified progress on site.</li>
</ul>
<p>Together these factors make off-plan property one of the most accessible and structurally protected ways to enter the Dubai real estate market, whether for personal use or investment purposes.</p>

<h2>How to Buy an Off-Plan Property in Dubai</h2>
<p>The purchasing process is transparent and well-regulated, and it is open to international buyers with no residency requirement. It generally follows five key stages:</p>
<ol>
<li><strong>Shortlist and compare.</strong> Identify suitable projects based on community, developer reputation, budget, and expected handover date, and compare the available payment plans.</li>
<li><strong>Reserve the unit.</strong> Pay a booking fee and sign the developer's reservation form to secure your chosen unit.</li>
<li><strong>Sign the Sales &amp; Purchase Agreement (SPA).</strong> Formalise the purchase and pay the initial down payment, usually between 10% and 20% of the property value.</li>
<li><strong>Register with the Dubai Land Department.</strong> Pay the applicable registration fee and receive your Oqood, the interim title document confirming your ownership during the off-plan period.</li>
<li><strong>Complete the payment plan and take handover.</strong> Continue instalment payments through the construction period, then receive the finished unit along with the full title deed upon completion.</li>
</ol>

<h2>Off-Plan vs. Ready Property in Dubai</h2>
<p>Both off-plan and ready properties have a place in a well-balanced investment strategy, and the right choice depends largely on an investor's goals and timeline.</p>
<p>A ready property generates rental income immediately and allows buyers to inspect the exact unit before purchase, but it typically requires a larger upfront payment and comes at a higher overall price point. An off-plan property, by contrast, trades that immediate income for a lower entry cost, a longer and more manageable payment schedule, and the opportunity for the property's value to appreciate before the buyer even takes possession.</p>
<p>Many experienced investors in Dubai use both strategies in tandem — allocating capital to off-plan projects to build a growing portfolio over time, while relying on ready units to maintain steady rental cash flow. We encourage you to browse our full range of off-plan projects to compare current prices, developers, and payment structures side by side.</p>

<h2>Popular Off-Plan Areas in Dubai</h2>
<ul>
<li>Dubai Marina</li>
<li>Business Bay</li>
<li>Downtown Dubai</li>
<li>Dubai Creek Harbour</li>
<li>Dubai Hills Estate</li>
<li>Jumeirah Village Circle (JVC)</li>
<li>Dubai South</li>
<li>Palm Jumeirah</li>
</ul>

<h2>Leading Off-Plan Developers in Dubai</h2>
<ul>
<li>Emaar</li>
<li>DAMAC</li>
<li>Sobha</li>
<li>Binghatti</li>
<li>Nakheel</li>
<li>Danube</li>
</ul>`;

function isTrivialStub(html?: string): boolean {
  if (!html || !html.trim()) return true;
  const stripped = html.replace(/<[^>]*>/g, '').trim();
  if (
    stripped.length < 150 &&
    (stripped.toLowerCase().includes('strategic buyer roadmap') ||
      stripped.toLowerCase().includes('understanding builder delivery') ||
      stripped.toLowerCase().includes('educational framework') ||
      stripped.toLowerCase().includes('strategic investment roadmap') ||
      !stripped.toLowerCase().includes('why buy off-plan'))
  ) {
    return true;
  }
  return false;
}

export interface OffPlanGuideSectionProps {
  contentHtml?: string;
  pageSlug?: string;
}

export default function OffPlanGuideSection({
  contentHtml: initialContentHtml,
  pageSlug,
}: OffPlanGuideSectionProps = {}) {
  const [contentHtml, setContentHtml] = useState<string>(
    initialContentHtml && !isTrivialStub(initialContentHtml)
      ? initialContentHtml
      : ''
  );

  useEffect(() => {
    if (initialContentHtml && !isTrivialStub(initialContentHtml)) {
      setContentHtml(initialContentHtml);
      return;
    }

    const targetSlug = pageSlug || 'home';
    fetch(`http://127.0.0.1:8000/api/pages/${targetSlug}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.content) {
          const c = json.data.content;
          const html =
            c.customSections?.['dev-guide']?.detailHtml ||
            c.customSections?.['comm-guide']?.detailHtml ||
            c.customSections?.['buy-guide']?.detailHtml ||
            c.longContent?.detailHtml ||
            c.offPlanGuide?.detailHtml;
          if (html && !isTrivialStub(html)) {
            setContentHtml(html);
          }
        }
      })
      .catch(() => {});
  }, [initialContentHtml, pageSlug]);

  const displayHtml = contentHtml && !isTrivialStub(contentHtml) ? contentHtml : DEFAULT_OFFPLAN_GUIDE_HTML;

  return (
    <section className="pt-8 sm:pt-10 border-t border-stone-200/80 w-full">
      <div
        className="space-y-4 max-w-full text-xs sm:text-[14px] font-normal text-[#4B5563] leading-[1.75] [&>h1]:text-2xl [&>h1]:sm:text-3xl [&>h1]:font-bold [&>h1]:text-[#111827] [&>h1]:tracking-tight [&>h1]:mt-8 [&>h1]:mb-3 [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-bold [&>h2]:text-[#111827] [&>h2]:tracking-tight [&>h2]:mt-6 [&>h2]:mb-2 [&>h3]:text-lg [&>h3]:sm:text-xl [&>h3]:font-semibold [&>h3]:text-[#111827] [&>h3]:mt-5 [&>h3]:mb-2 [&>h4]:text-base [&>h4]:font-semibold [&>h4]:text-[#111827] [&>p]:my-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2 [&_strong]:text-[#111827] [&_strong]:font-semibold [&_img]:rounded-xl [&_img]:my-4 [&>blockquote]:border-l-4 [&>blockquote]:border-[#BFA16A] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4"
        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
        dangerouslySetInnerHTML={{ __html: displayHtml }}
      />
    </section>
  );
}
