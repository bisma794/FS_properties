'use client';

import { useState, useEffect } from 'react';

interface Review {
  id: string;
  name: string;
  role: string;
  avatarText?: string;
  avatarBg?: string;
  content: string;
  rating: number;
}

const defaultReviews: Review[] = [
  {
    id: '1',
    name: 'Omer Khan',
    role: 'Verified Client',
    avatarText: 'OK',
    avatarBg: 'bg-[#2A3441]',
    content:
      "I was looking at the real estate market of Dubai and got in contact with Ms. Hana Taghdis of FS Advisory. She showed me multiple projects and finally I was able to select a unit of my choice. I've had a great experience...",
    rating: 5,
  },
  {
    id: '2',
    name: 'Nathalie Syvak',
    role: 'Verified Client',
    avatarText: 'NS',
    avatarBg: 'bg-[#3A334A]',
    content:
      'Our real estate agent is Yulia Kravchenko, we are very pleased with her work and I would like to note her approach to the client. Starting from the first conversation, where I was asked all the necessary questions...',
    rating: 5,
  },
  {
    id: '3',
    name: 'Mike Mike',
    role: 'Verified Client',
    avatarText: 'MM',
    avatarBg: 'bg-[#2C3B35]',
    content:
      'Ultimate admiration! I wanted to know more about the real estate business in Dubai. God sent me a unique intelligent young lady Yulia Kravchenko, who has undoubtedly the utmost competence in this skill. Very content...',
    rating: 5,
  },
  {
    id: '4',
    name: 'Giuseppe Iorio',
    role: 'Verified Client',
    avatarText: 'GI',
    avatarBg: 'bg-[#3D3028]',
    content:
      'Nadia is the person to talk with. She loves her job and is really prepared for any question you may have. Love makes business with her and hopefully we will make so many more..',
    rating: 5,
  },
];

export default function LatestReviewsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [heading, setHeading] = useState('What Our Clients Say');
  const [reviewsList, setReviewsList] = useState<Review[]>(defaultReviews);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/pages/home')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data?.content?.reviews) {
          const rev = json.data.content.reviews;
          if (rev.heading) setHeading(rev.heading);
          if (Array.isArray(rev.items) && rev.items.length > 0) {
            setReviewsList(
              rev.items.map((r: any, idx: number) => ({
                id: r.id || String(idx),
                name: r.name || 'Client',
                role: r.role || 'Verified Client',
                avatarText: (r.name || 'CL').slice(0, 2).toUpperCase(),
                avatarBg: ['bg-[#2A3441]', 'bg-[#3A334A]', 'bg-[#2C3B35]', 'bg-[#3D3028]'][idx % 4],
                content: r.content || '',
                rating: Number(r.rating) || 5,
              }))
            );
          }
        }
      })
      .catch(() => {
        // Fallback
      });
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? reviewsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const displayedReviews = [
    ...reviewsList.slice(startIndex),
    ...reviewsList.slice(0, startIndex),
  ];

  // Calculate dynamic average rating and review count
  const totalReviews = reviewsList.length;
  const avgRating = totalReviews > 0
    ? (reviewsList.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0) / totalReviews).toFixed(1)
    : '5.0';

  return (
    <section className="w-full bg-[#111111] text-white py-16 sm:py-20 lg:py-24 border-t border-neutral-900">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 sm:mb-16">
          {/* Main Title */}
          <h2
            className="font-playfair font-light text-3xl sm:text-4xl lg:text-[44px] text-[#BFA16A] tracking-normal"
            style={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif' }}
          >
            {heading}
          </h2>

          {/* Rating Summary */}
          <div className="flex items-center gap-2.5 font-poppins text-xs sm:text-sm text-neutral-300">
            <span className="font-semibold text-white text-base">{avgRating}</span>
            <div className="flex items-center text-[#BFA16A] text-sm tracking-widest" aria-label={`${avgRating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={s <= Math.round(Number(avgRating)) ? 'text-[#BFA16A]' : 'text-neutral-600'}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="font-light uppercase tracking-wider text-neutral-400 text-xs sm:text-[13px] ml-1">
              FROM {totalReviews} CLIENT REVIEWS
            </span>
          </div>
        </div>

        {/* Reviews Cards Container with Navigation Arrows */}
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous review"
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1a1a1a]/90 hover:bg-[#BFA16A] text-neutral-300 hover:text-white border border-white/20 hover:border-[#BFA16A] flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer"
          >
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {displayedReviews.map((review) => (
              <div
                key={review.id}
                className="group rounded-2xl bg-[#171717] p-6 sm:p-7 flex flex-col justify-between border border-white/25 hover:border-[#BFA16A] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Reviewer Header */}
                <div>
                  <div className="flex items-center gap-3.5 mb-5">
                    {/* Avatar Circle */}
                    <div
                      className={`w-11 h-11 rounded-full ${review.avatarBg} border border-white/20 flex items-center justify-center shrink-0 text-white font-poppins font-medium text-xs tracking-wider`}
                    >
                      {review.avatarText}
                    </div>
                    <div>
                      <h3
                        className="font-poppins font-semibold text-white text-sm sm:text-base leading-snug"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                      >
                        {review.name}
                      </h3>
                      <p
                        className="font-poppins font-light text-neutral-400 text-xs mt-0.5"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                      >
                        {review.role}
                      </p>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p
                    className="font-poppins font-light text-neutral-300 text-xs sm:text-[13px] leading-relaxed line-clamp-6"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {review.content}
                  </p>
                </div>

                {/* Bottom Row: Divider + Stars + Read More */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  {/* Dynamic Stars */}
                  <div className="flex items-center text-xs sm:text-sm tracking-wider" aria-label={`${review.rating} stars`}>
                    {[1, 2, 3, 4, 5].map((starIdx) => (
                      <span
                        key={starIdx}
                        className={starIdx <= Number(review.rating || 5) ? 'text-[#BFA16A]' : 'text-neutral-600'}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <button
                    type="button"
                    className="font-poppins font-light text-xs sm:text-[13px] text-neutral-300 group-hover:text-[#BFA16A] hover:underline transition-colors cursor-pointer"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next review"
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1a1a1a]/90 hover:bg-[#BFA16A] text-neutral-300 hover:text-white border border-white/20 hover:border-[#BFA16A] flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer"
          >
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Centered Show All Button */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <button
            type="button"
            className="font-poppins font-medium text-xs sm:text-sm tracking-wider uppercase px-8 sm:px-10 py-3 bg-[#BFA16A] hover:bg-[#aa8e59] text-white rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            SHOW ALL
          </button>
        </div>
      </div>
    </section>
  );
}
