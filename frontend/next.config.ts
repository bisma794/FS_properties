import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.100.9",
    "192.168.1.22",
    "192.168.1.43",
    "192.168.1.15",
    "192.168.1.29",
    "192.168.1.14",
    "localhost:3000",
    "127.0.0.1:3000",
    "192.168.100.9:3000",
    "192.168.1.22:3000",
    "192.168.1.43:3000",
    "192.168.1.15:3000",
    "192.168.1.29:3000",
    "192.168.1.14:3000",
  ],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
