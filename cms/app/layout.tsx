import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FS Properties - Luxury CMS Dashboard',
  description: 'Control Panel and Content Management System for FS Real Estate Website',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
      </head>
      <body className="bg-[#FAF9F6] text-[#171717] min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
