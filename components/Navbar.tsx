'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'BUY', href: '/buy' },
  { name: 'COMMUNITIES', href: '/communities' },
  { name: 'DEVELOPERS', href: '/developer' },
  { name: 'INSIGHTS', href: '/blog' },
  { name: 'ABOUT US', href: '/about-us' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E0D8]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/fs logo.png"
            alt="FS Real Estate Advisory"
            width={180}
            height={48}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.name === 'BUY' && pathname === '/buy') ||
              (link.name === 'COMMUNITIES' && (pathname === '/communities' || pathname === '/the-valley' || pathname === '/community-detail')) ||
              (link.name === 'DEVELOPERS' && (pathname === '/developer' || pathname === '/developers' || pathname === '/developer-detail')) ||
              (link.name === 'INSIGHTS' && (pathname === '/blog' || pathname.startsWith('/blog/')));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-inter text-xs lg:text-sm tracking-wider uppercase transition-colors duration-200 ${
                  isActive
                    ? 'text-[#BFA16A] font-semibold'
                    : 'text-[#171717] font-normal hover:text-[#BFA16A]'
                }`}
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="#"
            className="font-inter font-semibold text-xs lg:text-sm tracking-wider uppercase px-6 py-2.5 bg-[#BFA16A] hover:bg-[#aa8e59] text-white rounded-lg shadow-sm transition-all duration-200 text-center"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            SIGN IN
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#171717] hover:text-[#BFA16A] focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-b border-[#E5E0D8] px-6 pt-4 pb-6 space-y-4">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.name === 'BUY' && pathname === '/buy') ||
              (link.name === 'COMMUNITIES' && (pathname === '/communities' || pathname === '/the-valley' || pathname === '/community-detail')) ||
              (link.name === 'DEVELOPERS' && (pathname === '/developer' || pathname === '/developers' || pathname === '/developer-detail'));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block font-inter text-sm tracking-wider uppercase transition-colors py-1 ${
                  isActive ? 'text-[#BFA16A] font-semibold' : 'text-[#171717] font-normal hover:text-[#BFA16A]'
                }`}
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full font-inter font-semibold text-sm tracking-wider uppercase px-6 py-2.5 bg-[#BFA16A] hover:bg-[#aa8e59] text-white rounded-lg shadow-sm transition-all duration-200 text-center"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              SIGN IN
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
