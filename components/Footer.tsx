'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/the-valley?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <footer className="w-full bg-[#141414] text-white pt-12 sm:pt-16 pb-8 border-t border-neutral-900">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        {/* Top Header Row: Logo & CONTACT */}
        <div className="flex items-center justify-between pb-6 sm:pb-8">
          {/* Left Brand Logo */}
          <Link href="/" className="inline-block">
            <Image
              src="/footerlogo.png"
              alt="FS Real Estate Advisory"
              width={220}
              height={60}
              priority
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Right Header: CONTACT */}
          <h3
            className="text-lg sm:text-2xl font-light text-white tracking-[0.25em] uppercase font-poppins"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            CONTACT
          </h3>
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full border-t border-[#262626]" />

        {/* Middle Main Content Grid */}
        <div className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Left Navigation Columns (8 Cols on Desktop) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* 1. COMPANY */}
            <div>
              <h4
                className="font-poppins font-semibold text-xs sm:text-[13px] tracking-wider uppercase text-[#BFA16A] mb-4 sm:mb-5"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                COMPANY
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: 'Buy', href: '/the-valley' },
                  { name: 'Communities', href: '/the-valley' },
                  { name: 'Developers', href: '/the-valley' },
                  { name: 'Insights', href: '/homepage' },
                  { name: 'About Us', href: '/homepage' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="font-poppins font-normal text-xs sm:text-[13.5px] text-[#E5E5E5] hover:text-[#BFA16A] transition-colors leading-relaxed"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. OPPORTUNITIES */}
            <div>
              <h4
                className="font-poppins font-semibold text-xs sm:text-[13px] tracking-wider uppercase text-[#BFA16A] mb-4 sm:mb-5"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                OPPORTUNITIES
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: 'All Opportunities', href: '/the-valley' },
                  { name: 'Off-Plan', href: '/the-valley' },
                  { name: 'Ready Properties', href: '/the-valley' },
                  { name: 'Communities', href: '/the-valley' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="font-poppins font-normal text-xs sm:text-[13.5px] text-[#E5E5E5] hover:text-[#BFA16A] transition-colors leading-relaxed"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. INSIGHTS */}
            <div>
              <h4
                className="font-poppins font-semibold text-xs sm:text-[13px] tracking-wider uppercase text-[#BFA16A] mb-4 sm:mb-5"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                INSIGHTS
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: 'Market Outlook', href: '/homepage' },
                  { name: 'Investment Guides', href: '/homepage' },
                  { name: 'Community Insights', href: '/the-valley' },
                  { name: 'News & Updates', href: '/homepage' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="font-poppins font-normal text-xs sm:text-[13.5px] text-[#E5E5E5] hover:text-[#BFA16A] transition-colors leading-relaxed"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. SERVICES */}
            <div>
              <h4
                className="font-poppins font-semibold text-xs sm:text-[13px] tracking-wider uppercase text-[#BFA16A] mb-4 sm:mb-5"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                SERVICES
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: 'Property Advisory', href: '/ai-assessment' },
                  { name: 'Property Management', href: '/homepage' },
                  { name: 'Visa Assistance', href: '/homepage' },
                  { name: 'Legal Services', href: '/homepage' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="font-poppins font-normal text-xs sm:text-[13.5px] text-[#E5E5E5] hover:text-[#BFA16A] transition-colors leading-relaxed"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Brand Info & Social (4 Cols on Desktop) */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between">
            {/* Dubai, UAE and Taglines */}
            <div className="text-left lg:text-right">
              <h4
                className="text-2xl sm:text-[28px] font-semibold text-white tracking-tight font-poppins"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Dubai, UAE
              </h4>
              <p
                className="font-poppins font-light text-neutral-300 text-sm sm:text-base mt-2"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                we don&apos;t sell properties.
              </p>
              <p
                className="font-poppins font-light text-neutral-300 text-sm sm:text-base mt-0.5"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                we build strategies.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3.5 mt-5 justify-start lg:justify-end">
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-[#BFA16A] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-[#BFA16A] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-[#BFA16A] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Row: Search Bar & Call Us Button */}
        <div className="pb-8 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
          {/* Left: Pill Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full sm:w-[280px] md:w-[320px] rounded-full border border-[#3A3A3A] bg-transparent px-4 py-2.5 flex items-center gap-3 focus-within:border-[#BFA16A] transition-colors"
          >
            <svg
              className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none font-poppins"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            />
          </form>

          {/* Right: Pill "Call us" Button */}
          <a
            href="tel:+971501234567"
            className="w-full sm:w-[280px] md:w-[320px] rounded-full border border-[#BFA16A] py-2.5 sm:py-3 px-6 flex items-center justify-center gap-2.5 text-[#BFA16A] hover:bg-[#BFA16A]/10 transition-colors font-poppins text-sm sm:text-base cursor-pointer"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            <svg
              className="w-4 h-4 stroke-[1.8]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            <span>Call us</span>
          </a>
        </div>

        {/* Bottom Bar: Copyright & Contact Info */}
        <div className="border-t border-[#262626] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-neutral-400 font-poppins font-light">
          {/* Copyright & Legal Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-center">
            <span>© 2026 Www.Fsadvisory.Ae. All Rights Reserved.</span>
            <Link href="#" className="hover:text-white transition-colors">
              Terms Of Use
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>

          {/* Right Phone & Email */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 text-neutral-400 text-center">
            <span>+971 50 123 4567</span>
            <span>·</span>
            <span>Info@Fsadvisory.Ae</span>
            <span>·</span>
            <span>Dubai, UAE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
