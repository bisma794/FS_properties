'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const defaultLeftColumnFaqs: FaqItem[] = [
  {
    id: 'off-plan-meaning-1',
    question: 'What Does "Off-Plan" Actually Mean?',
    answer:
      'Off-plan property is real estate purchased before it is fully constructed. Buyers invest in architectural plans and specifications directly from developers at launch pricing with structured milestone-based installment plans until handover.',
  },
  {
    id: 'payment-plans',
    question: 'How Do Off-Plan Payment Plans Typically Work?',
    answer:
      'Payment plans are structured schedules spread across the construction timeline. Typically, buyers pay an initial 10%–20% down payment, followed by installments tied to construction milestones, and a final balance upon handover or via post-handover installments.',
  },
  {
    id: 'residency-visa',
    question: 'Can An Off-Plan Purchase Qualify Me For A UAE Residency Visa?',
    answer:
      'Yes, investing in UAE property valued at AED 750,000 or more can qualify you for an investor visa, while properties valued at AED 2 Million or higher qualify for the 10-year UAE Golden Visa once payment thresholds are reached.',
  },
  {
    id: 'buyer-protection',
    question: 'How Are Off-Plan Buyer Payments Protected?',
    answer:
      'In Dubai and the UAE, all buyer funds are deposited directly into government-regulated RERA project escrow accounts. Developers can only withdraw funds in proportion to verified construction milestones certified by official DLD inspectors.',
  },
  {
    id: 'project-delayed',
    question: "What Happens If A Project Is Delayed Or Doesn't Complete?",
    answer:
      "Regulated Developers Are Required To Keep Buyer Funds In Escrow And Can Face Penalties For Missing Registered Timelines, Which Gives Buyers Some Recourse. Even So, Delays Happen Across The Market, So It's Worth Reviewing A Developer's History On Previous Projects Before Committing To A New Launch.",
  },
];

const defaultRightColumnFaqs: FaqItem[] = [
  {
    id: 'most-activity-areas',
    question: 'Which Cities And Areas See The Most Off-Plan Activity?',
    answer:
      'Dubai and Abu Dhabi see the highest off-plan activity. Key hotspot areas in Dubai include Downtown Dubai, Dubai Marina, Business Bay, Dubai Hills Estate, Palm Jumeirah, Dubai Creek Harbour, and master-planned communities like DAMAC Lagoons and The Valley.',
  },
  {
    id: 'off-plan-meaning-2',
    question: 'What Does "Off-Plan" Actually Mean?',
    answer:
      'Purchasing off-plan secures lower entry prices, high capital appreciation potential during construction, and structured installment options that are not available in the secondary ready property market.',
  },
  {
    id: 'check-before-choosing',
    question: 'What Should I Check Before Choosing An Off-Plan Project?',
    answer:
      'Verify developer track record and past completions, official RERA project registration, verified escrow account details, location infrastructure plans, handover timelines, and payment milestone terms before signing the SPA.',
  },
  {
    id: 'good-investment',
    question: 'Is Off-Plan Property A Good Investment?',
    answer:
      'Off-plan real estate provides significant potential for capital growth, manageable cash flow via phased installments, attractive launch discounts, strong anticipated rental yields, and zero tax on capital gains.',
  },
  {
    id: 'how-to-buy',
    question: 'How Do I Actually Go About Buying Off-Plan?',
    answer:
      'The process begins with selecting a project and unit, paying a reservation deposit, signing the booking form, completing the down payment, executing the Sales & Purchase Agreement (SPA), and registering with DLD for your interim title deed (Oqood).',
  },
];

interface BuyerGuideFaqSectionProps {
  variant?: 'clean' | 'card';
  id?: string;
  className?: string;
  pageSlug?: string;
  detailHtml?: string;
  faqs?: FaqItem[];
}

export default function BuyerGuideFaqSection({
  variant = 'clean',
  id,
  className = '',
  pageSlug,
  detailHtml,
  faqs,
}: BuyerGuideFaqSectionProps) {
  const [leftColumnFaqs, setLeftColumnFaqs] = useState<FaqItem[]>(defaultLeftColumnFaqs);
  const [rightColumnFaqs, setRightColumnFaqs] = useState<FaqItem[]>(defaultRightColumnFaqs);
  const [dynamicDetail, setDynamicDetail] = useState<string>(detailHtml || '');
  const [dynamicTagline, setDynamicTagline] = useState<string>('UAE off-plan property · Buyer guide');
  const [dynamicMainHeading, setDynamicMainHeading] = useState<string>('Everything you need to know about UAE off-plan property');
  const [dynamicContentText, setDynamicContentText] = useState<string>(
    'Answers To The Questions We Hear Most From People Exploring An Off-Plan Purchase In The UAE — From How The Process Works To Ownership, Payment Plans, And What To Check Before You Commit.'
  );

  // Pre-expand item 'project-delayed' by default to match the design mockup
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'project-delayed': true,
  });

  useEffect(() => {
    let resolvedSlug = pageSlug;
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const querySlug = urlParams.get('slug');
      if (
        (!resolvedSlug ||
          resolvedSlug === 'blog-details' ||
          resolvedSlug === 'project-detail' ||
          resolvedSlug === 'developer-detail' ||
          resolvedSlug === 'community-detail' ||
          resolvedSlug === 'buy-detail') &&
        querySlug
      ) {
        resolvedSlug = querySlug;
      }
    }

    const currentPath = typeof window !== 'undefined'
      ? window.location.pathname.replace(/^\/+|\/+$/g, '') || 'home'
      : 'home';
    const targetSlug = resolvedSlug || (currentPath === '' ? 'home' : currentPath);

    const applyFaqData = (fq: any) => {
      if (!fq) return;
      if (fq.detailHtml !== undefined && fq.detailHtml !== null) setDynamicDetail(fq.detailHtml);
      if (fq.tagline) setDynamicTagline(fq.tagline);
      if (fq.mainHeading || fq.heading) setDynamicMainHeading(fq.mainHeading || fq.heading);
      if (fq.contentText) setDynamicContentText(fq.contentText);
      if (Array.isArray(fq.items) && fq.items.length > 0) {
        const formatted = fq.items.map((it: any, idx: number) => ({
          id: it.id || `faq-item-${idx}`,
          question: it.question || it.q || '',
          answer: it.answer || it.a || '',
        }));
        const midpoint = Math.ceil(formatted.length / 2);
        setLeftColumnFaqs(formatted.slice(0, midpoint));
        setRightColumnFaqs(formatted.slice(midpoint));
      }
    };

    if (faqs && Array.isArray(faqs) && faqs.length > 0) {
      const midpoint = Math.ceil(faqs.length / 2);
      setLeftColumnFaqs(faqs.slice(0, midpoint));
      setRightColumnFaqs(faqs.slice(midpoint));
      if (detailHtml !== undefined) setDynamicDetail(detailHtml);
      return;
    }

    // 1. Check local storage cache for immediate client-side sync
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(`fs_page_${targetSlug}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          const fq = parsed.content?.faqs || parsed.content?.customSections?.['faqs'] || parsed.content?.customSections?.['buyer-faqs'];
          applyFaqData(fq);
        }
      }
    } catch (_) {}

    // 2. Check /api/cms-sync for fast local sync
    fetch('/api/cms-sync')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.pages) {
          const matchedPage = json.data.pages[targetSlug] || json.data.pages[`/${targetSlug}`] || json.data.pages[targetSlug.trim()];
          if (matchedPage?.content) {
            const fq = matchedPage.content.faqs || matchedPage.content.customSections?.['faqs'] || matchedPage.content.customSections?.['buyer-faqs'];
            applyFaqData(fq);
            return;
          }
        }

        // 3. Fallback to backend API
        return fetch(`http://127.0.0.1:8000/api/pages/${targetSlug}`)
          .then((res) => res.json())
          .then((backendJson) => {
            if (backendJson.success && backendJson.data?.content) {
              const pageFq = backendJson.data.content.faqs || backendJson.data.content.customSections?.['faqs'] || backendJson.data.content.customSections?.['buyer-faqs'];
              applyFaqData(pageFq);
            }
          });
      })
      .catch(() => {
        fetch(`http://127.0.0.1:8000/api/pages/${targetSlug}`)
          .then((res) => res.json())
          .then((backendJson) => {
            if (backendJson.success && backendJson.data?.content) {
              const pageFq = backendJson.data.content.faqs || backendJson.data.content.customSections?.['faqs'] || backendJson.data.content.customSections?.['buyer-faqs'];
              applyFaqData(pageFq);
            }
          })
          .catch(() => {});
      });
  }, [pageSlug, faqs, detailHtml]);


  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderFaqItem = (item: FaqItem) => {
    const isOpen = !!openItems[item.id];

    return (
      <div key={item.id} className="border-b border-[#E5E7EB] py-4 sm:py-5">
        <button
          type="button"
          onClick={() => toggleItem(item.id)}
          className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
          aria-expanded={isOpen}
        >
          <span
            className="text-[13.5px] sm:text-[14.5px] font-normal text-[#374151] group-hover:text-[#111827] transition-colors pr-4 leading-snug font-poppins"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            {item.question}
          </span>
          <span className="text-lg sm:text-xl font-light text-[#9CA3AF] shrink-0 select-none w-4 text-center leading-none">
            {isOpen ? '−' : '+'}
          </span>
        </button>

        {isOpen && (
          <div className="mt-2.5 pr-6 animate-fadeIn">
            <p
              className="text-xs sm:text-[12.5px] font-normal text-[#9CA3AF] leading-relaxed font-poppins"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              {item.answer}
            </p>
          </div>
        )}
      </div>
    );
  };

  if (variant === 'clean') {
    return (
      <section id={id} className={`w-full bg-white py-12 sm:py-16 lg:py-20 rounded-2xl border border-stone-200/80 shadow-xs ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          {/* Header Badge */}
          <div className="flex items-center gap-2 mb-3">
            <svg
              className="w-4 h-4 text-[#BFA16A]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 21V12h6v9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="text-xs sm:text-[13px] font-medium text-[#9CA3AF] tracking-wide"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              {dynamicTagline || 'UAE off-plan property · Buyer guide'}
            </span>
          </div>

          {/* Section Heading */}
          {dynamicDetail ? (
            <div
              className="text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.18] max-w-4xl [&>h1]:text-2xl [&>h1]:sm:text-4xl [&>h1]:lg:text-[42px] [&>h1]:font-bold [&>h2]:text-2xl [&>h2]:sm:text-4xl [&>h2]:lg:text-[42px] [&>h2]:font-bold [&_span]:text-[#BFA16A] [&>p]:text-xs [&>p]:sm:text-[13px] [&>p]:font-normal [&>p]:text-[#9CA3AF] [&>p]:mt-3"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: dynamicDetail }}
            />
          ) : dynamicMainHeading ? (
            <>
              <h2
                className="text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.18] max-w-4xl text-[#111827]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                {dynamicMainHeading}
              </h2>
              {dynamicContentText && (
                <p
                  className="text-xs sm:text-[13px] font-normal text-[#9CA3AF] max-w-3xl mt-4 leading-relaxed whitespace-pre-line"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  {dynamicContentText}
                </p>
              )}
            </>
          ) : (
            <>
              <h2
                className="text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.18] max-w-4xl"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                <span className="block text-[#BFA16A]">Everything you need to know</span>
                <span className="block text-[#111827] mt-1 sm:mt-1.5">about UAE off-plan property</span>
              </h2>

              {/* Subtitle / Tagline */}
              <p
                className="text-xs sm:text-[13px] font-normal text-[#9CA3AF] max-w-3xl mt-4 leading-relaxed"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                {dynamicContentText || 'Answers To The Questions We Hear Most From People Exploring An Off-Plan Purchase In The UAE — From How The Process Works To Ownership, Payment Plans, And What To Check Before You Commit.'}
              </p>
            </>
          )}

          {/* Divider Line */}
          <div className="border-t border-[#E5E7EB] mt-8 sm:mt-10 mb-2" />


          {/* Two-Column Accordion Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16">
            {/* Left Column */}
            <div>{leftColumnFaqs.map(renderFaqItem)}</div>

            {/* Right Column */}
            <div>{rightColumnFaqs.map(renderFaqItem)}</div>
          </div>

          {/* Bottom Action Row */}
          <div className="mt-8 bg-[#F8F9FA] rounded-xl px-5 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span
              className="text-xs sm:text-[13px] text-[#9CA3AF] font-normal text-center sm:text-left"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              Still Have A Question That Isn&apos;t Covered Here?
            </span>

            <Link
              href="/ai-assessment"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#18181B] hover:bg-[#27272A] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.99] shrink-0"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              <span>Talk To A Property Advisor</span>
              <svg
                className="w-4 h-4 stroke-[2]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`w-full bg-[#FAF9F6] py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        {/* Header Badge */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {/* Outline House Icon */}
          <svg
            className="w-4 h-4 text-[#B5905B]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 21V12h6v9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="text-xs sm:text-[13px] font-medium text-[#9E9E9E] tracking-wide font-inter"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            {dynamicTagline || 'UAE off-plan property · Buyer guide'}
          </span>
        </div>

        {/* Section Heading */}
        <h2
          className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#525252] text-center tracking-tight leading-[1.25] font-poppins max-w-3xl mx-auto"
          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
        >
          {dynamicMainHeading ? (
            dynamicMainHeading
          ) : (
            <>
              Everything you need to know
              <br className="hidden sm:inline" /> about UAE off-plan property
            </>
          )}
        </h2>

        {/* Subtitle / Tagline */}
        <p
          className="text-xs sm:text-[13px] font-medium text-[#9E9E9E] text-center max-w-2xl sm:max-w-3xl mx-auto mt-4 leading-relaxed font-inter px-2 whitespace-pre-line"
          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
        >
          {dynamicContentText || 'Answers To The Questions We Hear Most From People Exploring An Off-Plan Purchase In The UAE — From How The Process Works To Ownership, Payment Plans, And What To Check Before You Commit.'}
        </p>

        {/* Main FAQ White Card Container */}
        <div className="mt-10 sm:mt-14 bg-white rounded-2xl sm:rounded-3xl border border-[#ECECEC] p-6 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16">
            {/* Left Column */}
            <div>{leftColumnFaqs.map(renderFaqItem)}</div>

            {/* Right Column */}
            <div>{rightColumnFaqs.map(renderFaqItem)}</div>
          </div>

          {/* Bottom Action Row */}
          <div className="mt-8 sm:mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span
              className="text-xs sm:text-[13px] text-[#AAAAAA] font-poppins font-normal text-center sm:text-left"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              Still Have A Question That Isn&apos;t Covered Here?
            </span>

            <Link
              href="/ai-assessment"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B5905B] hover:bg-[#a07d4a] text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.99] font-poppins shrink-0"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              <span>Talk To A Property Advisor</span>
              <svg
                className="w-4 h-4 stroke-[2]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
