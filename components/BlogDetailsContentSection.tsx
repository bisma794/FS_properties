'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import featureImage from '@/new fs images/Rectangle 34625593.png';
import secondFeatureImage from '@/new fs images/image 299.png';
import fsWatermarkLogo from '@/new fs images/Group 1000010786.png';

interface CategoryItem {
  label: string;
  count: number;
  href?: string;
}

const defaultCategories: CategoryItem[] = [
  { label: 'Coming Soon 6', count: 6, href: '/blog?category=coming-soon' },
  { label: 'News', count: 61, href: '/blog?category=news' },
  { label: 'Real Estate', count: 51, href: '/blog?category=real-estate' },
];

const nearDubaiMarinaPills = [
  'Business Bay',
  'Palm Jumeirah',
  'Residential District',
  'Dubai Island A',
  'Dubai Land Residence Complex DLRC',
  'Downtown Dubai',
  'Al Furjan',
  'District 10, JVC',
  'Azizi Riviera',
  'Dubai Hills Estate',
];

const extraMarinaPills = [
  'Dubai Marina',
];

const latestProjectsInUae = [
  'Avenew 888',
  'Talea by Beyond',
  'PASSO by Beyond',
  'Binghatti Skyblade',
  'Wynwood by Imtiaz',
  'Verso',
  'Yigo Luxe',
  'ICONA Residence',
  'Radiant Terrace',
  'Siana by Zaya',
];

const popularAreasList = [
  'Damac Islands',
  'Al Marjan Island',
  'Tilal al Ghaf',
  'Arabian Ranches',
  'Downtown Dubai',
  'Dubai Creek Harbour',
  'Madinat Jumeirah Living (MJL)',
  'Palm Jebel Ali',
  'Dubai Marina',
  'Business Bay',
];

const developersList = [
  'Emaar Properties',
  'Damac Properties',
  'Sobha Realty',
  'Meraas',
  'Nakheel',
  'Aldar Properties',
  'Danube Properties',
  'Ellington Properties',
];

const newProjectsList = [
  'Emaar Creek Waters',
  'Sobha SeaHaven',
  'Damac Bay by Cavalli',
  'Nakheel Como Residences',
  'Meraas Bluewaters Bay',
  'Ellington Ocean House',
];

const keyFiguresRows = [
  { detail: 'DETAIL', info: 'INFORMATION' },
  { detail: 'DEVELOPER', info: 'EMAAR PROPERTIES' },
  { detail: 'COMMUNITY', info: 'DUBAI HILLS ESTATE' },
  { detail: 'UNIT TYPES', info: '1, 2 & 3-BEDROOM APARTMENTS' },
  { detail: 'UNIT SIZES', info: '675 SQ. FT – 1,777 SQ. FT' },
  { detail: 'STARTING PRICE', info: 'AED 1.2 – 1.8 MILLION' },
  { detail: 'DOWN PAYMENT', info: '10%' },
  { detail: 'PAYMENT PLAN', info: '80/20' },
  { detail: 'EXPECTED HANDOVER', info: '2029' },
];

interface BlogDetailsContentSectionProps {
  blogData?: {
    title?: string;
    category?: string;
    date?: string;
    introParagraph?: string;
    secondParagraph?: string;
    bodyParagraphs?: string[];
    imageSrc?: string | StaticImageData;
    secondImageSrc?: string | StaticImageData;
    keyFigures?: {
      developer?: string;
      community?: string;
      unitTypes?: string;
      unitSizes?: string;
      startingPrice?: string;
      downPayment?: string;
      paymentPlan?: string;
      expectedHandover?: string;
    };
    detailHtml?: string;
  };
}

export default function BlogDetailsContentSection({ blogData }: BlogDetailsContentSectionProps = {}) {
  const [showMoreNearMarina, setShowMoreNearMarina] = useState(false);

  const articleTitle = blogData?.title || 'Hillside Park By Emaar At Dubai Hills Estate';
  const articleCategory = blogData?.category || 'Real Estate';
  const articleIntro = blogData?.introParagraph || "If You've Spent Any Time Scrolling Through Dubai's Off-Plan Market Lately, You've Probably Come Across Hillside Park By Emaar. It's One Of Those Projects That Keeps Popping Up In Every “Top Picks” List For Dubai Hills Estate, And Honestly, Once You Look At The Numbers, It's Easy To See Why. But Rather Than Repeat The Same Glossy Marketing Lines Every Other Site Uses, Let's Actually Walk Through What Hillside Park By Emaar Offers, What It Costs, And Who It's Really Built For.";
  const articleSecond = blogData?.secondParagraph || "This Isn't A Project With Flashy Skyline Views Or Beachfront Drama. What Hillside Park Dubai Hills Estate Offers Instead Is Something Quieter. It Has Rolling Green Surroundings, A Walkable Community Feel, And A Location That Puts You Close To Almost Everything Without The Price Tag Of Downtown Or The Marina.";
  const articleBody = blogData?.bodyParagraphs || [
    "Hillside Park Emaar Is A Residential Development Of 1, 2, And 3-Bedroom Apartments Tucked Into Dubai Hills Estate, One Of The City's Most Established Master-Planned Communities. Emaar Describes The Design As Blending Contemporary Architecture With The Natural Topography Of The Area, Which Is A Nice Way Of Saying The Buildings Are Arranged To Take Advantage Of The Green, Slightly Hilly Landscape Rather Than Fighting Against It.",
    "Unit Sizes Run From Around 675 Sq. Ft For The Smaller Layouts Up To 1,777 Sq. Ft For The Larger Three-Bedroom Options. That's A Fairly Wide Range, Which Means Hillside Park Apartments Can Work For A Single Professional Just As Easily As A Small Family Looking To Upgrade From A Rental.",
    "Let's Talk Numbers, Since That's Usually The First Question Anyone Asks. The Hillside Park Price Starts From Around AED 1.2–1.8 Million, Based On The Launch Pricing Shared By Emaar's Sales Channels. That Entry Point Applies To The Smaller Apartment Layouts, With Larger 2 And 3-Bedroom Units Priced Higher Depending On Floor Level, View, And Layout.",
  ];

  const primaryImg = blogData?.imageSrc || featureImage;
  const secondaryImg = blogData?.secondImageSrc || secondFeatureImage;

  const currentKeyFigures = blogData?.keyFigures
    ? [
        { detail: 'DETAIL', info: 'INFORMATION' },
        { detail: 'DEVELOPER', info: (blogData.keyFigures.developer || 'EMAAR PROPERTIES').toUpperCase() },
        { detail: 'COMMUNITY', info: (blogData.keyFigures.community || 'DUBAI HILLS ESTATE').toUpperCase() },
        { detail: 'UNIT TYPES', info: (blogData.keyFigures.unitTypes || '1, 2 & 3-BEDROOM APARTMENTS').toUpperCase() },
        { detail: 'UNIT SIZES', info: (blogData.keyFigures.unitSizes || '675 SQ. FT – 1,777 SQ. FT').toUpperCase() },
        { detail: 'STARTING PRICE', info: (blogData.keyFigures.startingPrice || 'AED 1.2 – 1.8 MILLION').toUpperCase() },
        { detail: 'DOWN PAYMENT', info: (blogData.keyFigures.downPayment || '10%').toUpperCase() },
        { detail: 'PAYMENT PLAN', info: (blogData.keyFigures.paymentPlan || '80/20').toUpperCase() },
        { detail: 'EXPECTED HANDOVER', info: (blogData.keyFigures.expectedHandover || '2029').toUpperCase() },
      ]
    : keyFiguresRows;

  const visiblePills = showMoreNearMarina
    ? [...nearDubaiMarinaPills, ...extraMarinaPills]
    : nearDubaiMarinaPills;

  const hasDetailHtml = Boolean(blogData?.detailHtml && blogData.detailHtml.trim().length > 0);

  return (
    <section className="w-full bg-white py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 w-full">
        
        {/* Top Pill Breadcrumbs Row */}
        <nav aria-label="Article Breadcrumb" className="mb-6 sm:mb-8">
          <ol className="flex flex-wrap items-center gap-2 sm:gap-3">
            <li>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#171717] text-xs sm:text-[13px] font-medium transition-colors"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#171717] text-xs sm:text-[13px] font-medium transition-colors"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                <span>Blog</span>
                <span className="text-[#525252] font-semibold">›</span>
              </Link>
            </li>
            <li>
              <Link
                href={`/blog?category=${encodeURIComponent(articleCategory.toLowerCase().replace(/\s+/g, '-'))}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#171717] text-xs sm:text-[13px] font-medium transition-colors"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                <span>{articleCategory}</span>
                <span className="text-[#525252] font-semibold">›</span>
              </Link>
            </li>
            <li>
              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F5F5F5] text-[#171717] text-xs sm:text-[13px] font-medium"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                <span>{articleTitle}</span>
                <span className="text-[#525252] font-semibold">›</span>
              </span>
            </li>
          </ol>
        </nav>

        {/* Main 12-Column Grid: 9 Cols (Left Content) + 3 Cols (Sticky Right Sidebar Widget) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: 9 COLUMNS (Main Blog Article Content)       */}
          {/* ======================================================== */}
          <div className="lg:col-span-9 space-y-6 sm:space-y-8 min-w-0">
            
            {/* 1. Gold Banner: Table Of Contents */}
                <div className="w-full bg-[#C2A268] rounded-md px-5 py-3 sm:py-3.5 shadow-2xs">
                  <h2
                    className="text-white text-sm sm:text-base font-semibold tracking-wide"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    Table Of Contents
                  </h2>
                </div>

                {/* 2. First Intro Paragraph */}
                <p
                  className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {articleIntro}
                </p>

                {/* 3. First Featured Image Container with Centered FS Logo Overlay */}
                <div className="relative w-full overflow-hidden rounded-2xl shadow-xs aspect-[16/9] sm:aspect-[16/8.6] bg-stone-100">
                  {typeof primaryImg === 'string' ? (
                    <img
                      src={primaryImg}
                      alt={articleTitle}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <Image
                      src={primaryImg}
                      alt={articleTitle}
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 75vw"
                    />
                  )}

                  {/* Centered FS Real Estate Advisory Logo Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="relative w-44 sm:w-56 md:w-64 lg:w-72 h-16 sm:h-20 md:h-24 translate-y-6 sm:translate-y-8">
                      <Image
                        src={fsWatermarkLogo}
                        alt="FS Real Estate Advisory"
                        fill
                        className="object-contain drop-shadow-md opacity-95"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Second Paragraph */}
                <p
                  className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal pt-1"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {articleSecond}
                </p>

                {/* 5. Second Featured Image with Centered FS Logo Overlay */}
                <div className="relative w-full overflow-hidden rounded-2xl shadow-xs aspect-[16/10] sm:aspect-[16/9.5] bg-stone-100">
                  {typeof secondaryImg === 'string' ? (
                    <img
                      src={secondaryImg}
                      alt={articleTitle}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <Image
                      src={secondaryImg}
                      alt={articleTitle}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 75vw"
                    />
                  )}

                  {/* Centered FS Real Estate Advisory Logo Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="relative w-44 sm:w-56 md:w-64 lg:w-72 h-16 sm:h-20 md:h-24">
                      <Image
                        src={fsWatermarkLogo}
                        alt="FS Real Estate Advisory"
                        fill
                        className="object-contain drop-shadow-md opacity-95"
                      />
                    </div>
                  </div>
                </div>

                {/* 6. Continuity Text Paragraphs */}
                <div className="space-y-6 sm:space-y-7 pt-2">
                  {articleBody.map((para: string, pIdx: number) => (
                    <p
                      key={pIdx}
                      className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* 7. Key Figures Snapshot Table (adjusted in 9 columns) */}
                <div className="mt-8 sm:mt-10 w-full rounded-xl border border-stone-200/80 overflow-hidden bg-white shadow-2xs">
                  <div className="w-full bg-[#FDF8EE] px-5 sm:px-8 py-3.5 sm:py-4 border-b border-stone-100">
                    <h3
                      className="text-sm sm:text-base font-bold text-[#B39359]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      A quick snapshot of the key figures:
                    </h3>
                  </div>

                  <div className="w-full divide-y divide-stone-100/80">
                    {currentKeyFigures.map((row, index) => {
                      const isEven = index % 2 === 1;
                      return (
                        <div
                          key={row.detail}
                          className={`grid grid-cols-1 sm:grid-cols-12 items-center px-5 sm:px-8 py-3.5 sm:py-4 ${
                            isEven ? 'bg-[#FAFAFA]' : 'bg-white'
                          }`}
                        >
                          <div
                            className="sm:col-span-6 text-xs sm:text-[13px] font-bold uppercase tracking-wide text-[#737373]"
                            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                          >
                            {row.detail}
                          </div>
                          <div
                            className="sm:col-span-6 text-xs sm:text-[13px] font-medium uppercase tracking-wide text-[#737373] mt-1 sm:mt-0"
                            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                          >
                            {row.info}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

            {/* ======================================================== */}
            {/* CONTINUITY SECTION: PAYMENT PLAN, HILLSIDE BUILDING,     */}
            {/* LOCATION DRIVE TIME TABLE, WHO SHOULD CONSIDER, HONEST   */}
            {/* THOUGHTS & CONSIDERATIONS (Appended In Full Continuity) */}
            {/* ======================================================== */}
            <div className="space-y-6 sm:space-y-8 pt-4">
              {/* If user provided custom detailHtml from Summernote, render it */}
              {hasDetailHtml && (
                <div
                  className="prose prose-stone max-w-none text-[#4B5563] text-sm sm:text-[15px] leading-[1.85] font-normal break-words pt-4 [&_img]:rounded-2xl [&_img]:shadow-xs [&_img]:max-w-full [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_th]:bg-[#FDF8EE] [&_th]:text-[#B39359] [&_th]:p-3 [&_td]:border [&_td]:border-stone-200 [&_td]:p-3"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  dangerouslySetInnerHTML={{ __html: blogData?.detailHtml || '' }}
                />
              )}

              {/* Show default Hillside Park continuity content only if no custom detailHtml is provided or if this is the default Hillside Park blog */}
              {(!hasDetailHtml || blogData?.title?.toLowerCase().includes('hillside')) && (
                <>
                  {/* Payment Plan narrative */}
                  <div className="space-y-4">
                    <p
                      className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      This Is Where Hillside Park By <span className="underline decoration-[#B39359] underline-offset-4 text-[#171717] font-medium">Emaar Properties</span> Gets Very Appealing For A Lot Of Buyers. Hillside Park Payment Plan Is Based On 80/20 With 10% Down Payment To Hold Your Unit.
                    </p>
                    <p
                      className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      In Plain Terms, That Means You&apos;re Not Required To Pay The Full Amount Upfront The Way You Would With A Ready Property. Instead, The Bulk Of Your Payment Is Spread Out, With The Remaining Balance Typically Due Closer To Or At Handover.
                    </p>
                    <p
                      className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      This Kind Of Plan Is Fairly Common Across Emaar&apos;s Dubai Hills Estate Launches, But It&apos;s Still Worth Noting Because It Lowers The Barrier To Entry Considerably Compared To Secondary Market Villas In The Same Community. If You&apos;re Comparing This Against Other Hillside Park Off-Plan Style Projects, The 80/20 Split Is On The More Accessible End Of What&apos;s Currently Available In The Market.
                    </p>
                    <p
                      className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      Buyers Browsing Hillside Park Properties For Sale Are Usually Drawn In By The Lifestyle Package As Much As The Apartment Itself, And This Project Doesn&apos;t Skimp On It. Depending On Which Listing Source You Check, The Amenity List Includes:
                    </p>
                  </div>

                  {/* Hillside Emaar Building Image Container */}
                  <div className="relative w-full overflow-hidden rounded-2xl shadow-xs aspect-[16/9] sm:aspect-[16/8.6] bg-stone-100">
                    <img
                      src="/hillside-emaar-building.png"
                      alt="Hillside Park by Emaar Towers"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Underlined highlight link statement */}
                  <p
                    className="text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal text-[#171717] underline underline-offset-4 decoration-stone-300"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    There&apos;s A Huge Effort Here To Build Something For Different Age Groups And Lifestyles Rather Than Just Ticking The &quot;Pool And Gym&quot; Boxes. Families With Young Kids Get Dedicated Play Zones, While Residents Who Want A Quieter Evening Have Yoga Decks And Landscaped Walking Areas To Fall Back On.
                  </p>

                  {/* Location Heading & Text */}
                  <div className="space-y-3 pt-2">
                    <h3
                      className="text-base sm:text-lg lg:text-xl font-bold text-[#171717]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      Location: Why Dubai Hills Estate Keeps Coming Up
                    </h3>
                    <p
                      className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      If You&apos;re Weighing Up Hillside Park Dubai Hills Against Other Communities, Location Is Honestly One Of Its Biggest Selling Points. Dubai Hills Estate Sits Centrally Enough That You&apos;re Never Too Far From Anywhere That Matters, Without Being Stuck In The Middle Of Constant Traffic And Noise.
                    </p>
                  </div>

                  {/* Destination & Approximate Drive Time Table */}
                  <div className="w-full rounded-xl border border-stone-200/80 overflow-hidden bg-white shadow-2xs">
                    <div className="grid grid-cols-2 bg-[#FDF8EE] px-5 sm:px-8 py-3.5 sm:py-4 border-b border-stone-100">
                      <div
                        className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#B39359]"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                      >
                        Destination
                      </div>
                      <div
                        className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#B39359] text-right sm:text-left"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                      >
                        Approximate Drive Time
                      </div>
                    </div>

                    <div className="w-full divide-y divide-stone-100/80">
                      {[
                        { dest: 'Al Quoz', time: '10 Minutes' },
                        { dest: 'Downtown Dubai', time: '15 Minutes' },
                        { dest: 'Dubai Marina', time: '15 Minutes' },
                        { dest: 'Dubai International Airport (DXB)', time: '20 Minutes' },
                        { dest: 'Expo City Dubai', time: '25 Minutes' },
                        { dest: 'Al Maktoum International Airport', time: '30 Minutes' },
                      ].map((row, rIdx) => (
                        <div
                          key={row.dest}
                          className={`grid grid-cols-2 items-center px-5 sm:px-8 py-3.5 sm:py-4 ${
                            rIdx % 2 === 1 ? 'bg-[#FAFAFA]' : 'bg-white'
                          }`}
                        >
                          <div
                            className="text-xs sm:text-[13px] font-bold uppercase tracking-wide text-[#737373]"
                            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                          >
                            {row.dest}
                          </div>
                          <div
                            className="text-xs sm:text-[13px] font-medium uppercase tracking-wide text-[#737373] text-right sm:text-left"
                            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                          >
                            {row.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Commute summary text */}
                  <p
                    className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    That Kind Of Spread Means Whether You Work In Downtown, Spend Weekends At The Marina, Or Fly Frequently For Business, You&apos;re Never Dealing With An Unreasonable Commute. Add In The Neighbourhood&apos;s Own Golf Course, Retail Options, And Schools, And It&apos;s Clear Why Dubai Hills Estate Keeps Landing On &quot;Best Community&quot; Shortlists.
                  </p>

                  {/* Who Should Actually Consider Hillside Park Off Plan? */}
                  <div className="space-y-3 pt-2">
                    <h3
                      className="text-base sm:text-lg lg:text-xl font-bold text-[#171717]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      Who Should Actually Consider Hillside Park Off Plan?
                    </h3>
                    <p
                      className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      Not Every Project Suits Every Buyer, So Let&apos;s Be Honest About Who Hillside Park Off Plan Makes The Most Sense For:
                    </p>
                    <ul className="space-y-3 pl-4 sm:pl-5 list-disc text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85]">
                      <li>
                        <strong className="text-[#171717] font-semibold">End Users And Families</strong> Will Likely Appreciate The Green Surroundings, The Play Areas, And The Relatively Central Location. If You Want A Home That Doesn&apos;t Feel Cramped Into A High-Rise Tower But Still Keeps You Close To The City, This Fits Well.
                      </li>
                      <li>
                        <strong className="text-[#171717] font-semibold">First-Time Investors</strong> Looking At Hillside Park Properties For Sale May Find The 80/20 Payment Plan Attractive, Since It Reduces The Amount Of Capital Tied Up Before Handover. The Dubai Hills Estate Track Record For Rental Demand Also Works In Favour Of Long-Term Investors.
                      </li>
                      <li>
                        <strong className="text-[#171717] font-semibold">Buyers Chasing Pure Luxury</strong> Or Beachfront Prestige Might Find This Project A Step Down From Something Like Palm Jumeirah Or Emaar Beachfront. Hillside Park Isn&apos;t Trying To Be That. It&apos;s Positioned As Accessible, Family-Oriented, And Community-Focused Rather Than Ultra-High-End.
                      </li>
                    </ul>
                  </div>

                  {/* A Few Honest Thoughts Before You Decide */}
                  <div className="space-y-4 pt-3">
                    <h3
                      className="text-base sm:text-lg lg:text-xl font-bold text-[#171717]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      A Few Honest Thoughts Before You Decide
                    </h3>
                    <p
                      className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      There Are Trade-Offs With Any Off-Plan Project, And A Few Are Worth Considering Before Signing On The Dotted Line:
                    </p>

                    <div className="space-y-4 pt-1">
                      <div>
                        <h4
                          className="text-sm sm:text-base font-bold text-[#171717] mb-1"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          Timing Of Handover Is Critical
                        </h4>
                        <p
                          className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          What You Are Signing Up For Is A Wait. Completion Is Expected In Years To Come. Make Sure That Timeline Works With Your Own Plans, Whether That&apos;s Moving In Or Renting The Unit Out.
                        </p>
                      </div>

                      <div>
                        <h4
                          className="text-sm sm:text-base font-bold text-[#171717] mb-1"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          Off-Plan Carries Uncertainty
                        </h4>
                        <p
                          className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          Even With A Reputable Developer Like Emaar, Construction Timelines Can Change. It&apos;s Better To Build Some Flexibility In Rather Than Assume A Fixed Move-In Date.
                        </p>
                      </div>

                      <div>
                        <h4
                          className="text-sm sm:text-base font-bold text-[#171717] mb-1"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          Compare Before You Commit
                        </h4>
                        <p
                          className="text-[#4B5563] text-xs sm:text-[13.5px] lg:text-[14px] leading-[1.85] font-normal"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          There Are Several Emaar Launches For Sale In <span className="underline decoration-[#B39359] underline-offset-4 text-[#171717] font-medium">Dubai Hills Estate</span> At Various Price Points. It&apos;s Worth Putting Hillside Park By Emaar Side By Side With Sister Projects To See Which Layout And Price Bracket Genuinely Fits Your Budget.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: 3 COLUMNS (Sticky Sidebar Widget)          */}
          {/* Sticks while scrolling down until the end of the grid    */}
          {/* ======================================================== */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 self-start">
            <div className="w-full rounded-2xl border border-stone-200/80 bg-white overflow-hidden shadow-xs">
              
              {/* Dark Header: Categories */}
              <div className="bg-[#1C1B1A] px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#C2A268] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-white text-base sm:text-[17px] font-bold tracking-tight"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  Categories
                </h3>
              </div>

              {/* Widget Body */}
              <div className="p-4 sm:p-5 space-y-6">
                
                {/* Category Rows */}
                <div className="space-y-3">
                  {defaultCategories.map((cat) => (
                    <Link
                      key={cat.label}
                      href={cat.href || '/blog'}
                      className="flex items-center justify-between w-full rounded-xl bg-[#F8F8F8] hover:bg-[#F2EFE9] transition-colors overflow-hidden border border-stone-100 group"
                    >
                      <span
                        className="text-xs sm:text-[13px] font-medium text-[#1E1E1E] px-4 py-3 group-hover:text-[#9A7B4F] transition-colors"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                      >
                        {cat.label}
                      </span>
                      <div className="bg-[#D3B478] text-white w-9 h-9 flex items-center justify-center shrink-0">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* 1. NEAR DUBAI MARINA */}
                <div className="pt-2 space-y-3">
                  <div className="w-full bg-[#FDF8EE] px-3.5 py-2.5 rounded-md">
                    <h4
                      className="text-xs font-bold uppercase tracking-wide text-[#9A7B4F]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      NEAR DUBAI MARINA
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {visiblePills.map((pill) => (
                      <Link
                        key={pill}
                        href="/communities"
                        className="inline-block px-3 py-1.5 rounded-full border border-stone-200 text-[11px] font-normal text-[#555555] bg-white hover:border-[#9A7B4F] hover:text-[#9A7B4F] hover:bg-[#FDF8EE] transition-all"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                      >
                        {pill}
                      </Link>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowMoreNearMarina(!showMoreNearMarina)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#9A7B4F] hover:text-[#7A5F3A] font-medium pt-1 cursor-pointer transition-colors"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    <span>{showMoreNearMarina ? 'Show less' : 'More'}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        showMoreNearMarina ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* 2. LATEST PROJECTS IN UAE */}
                <div className="pt-2 space-y-3">
                  <div className="w-full bg-[#FDF8EE] px-3.5 py-2.5 rounded-md">
                    <h4
                      className="text-xs font-bold uppercase tracking-wide text-[#9A7B4F]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      LATEST PROJECTS IN UAE
                    </h4>
                  </div>

                  <ul className="space-y-2.5 px-1">
                    {latestProjectsInUae.map((proj) => (
                      <li key={proj}>
                        <Link
                          href="/project-detail"
                          className="flex items-start gap-2 text-xs text-[#6B7280] hover:text-[#9A7B4F] transition-colors leading-relaxed"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          <span className="text-[#9CA3AF] shrink-0">•</span>
                          <span>{proj}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. POPULAR AREAS */}
                <div className="pt-2 space-y-3">
                  <div className="w-full bg-[#FDF8EE] px-3.5 py-2.5 rounded-md">
                    <h4
                      className="text-xs font-bold uppercase tracking-wide text-[#9A7B4F]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      POPULAR AREAS
                    </h4>
                  </div>
                  <ul className="space-y-2.5 px-1">
                    {popularAreasList.map((area) => (
                      <li key={area}>
                        <Link
                          href="/communities"
                          className="flex items-start gap-2 text-xs text-[#6B7280] hover:text-[#9A7B4F] transition-colors leading-relaxed"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          <span className="text-[#9CA3AF] shrink-0">•</span>
                          <span>{area}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. DEVELOPERS */}
                <div className="pt-2 space-y-3">
                  <div className="w-full bg-[#FDF8EE] px-3.5 py-2.5 rounded-md">
                    <h4
                      className="text-xs font-bold uppercase tracking-wide text-[#9A7B4F]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      DEVELOPERS
                    </h4>
                  </div>
                  <ul className="space-y-2.5 px-1">
                    {developersList.map((dev) => (
                      <li key={dev}>
                        <Link
                          href="/developers"
                          className="flex items-start gap-2 text-xs text-[#6B7280] hover:text-[#9A7B4F] transition-colors leading-relaxed"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          <span className="text-[#9CA3AF]">•</span>
                          <span>{dev}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5. NEW PROJECTS */}
                <div className="pt-2 space-y-3">
                  <div className="w-full bg-[#FDF8EE] px-3.5 py-2.5 rounded-md">
                    <h4
                      className="text-xs font-bold uppercase tracking-wide text-[#9A7B4F]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      NEW PROJECTS
                    </h4>
                  </div>
                  <ul className="space-y-2.5 px-1">
                    {newProjectsList.map((proj) => (
                      <li key={proj}>
                        <Link
                          href="/project-detail"
                          className="flex items-start gap-2 text-xs text-[#6B7280] hover:text-[#9A7B4F] transition-colors leading-relaxed"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          <span className="text-[#9CA3AF] shrink-0">•</span>
                          <span>{proj}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </aside>

        </div>

      </div>
    </section>
  );
}
