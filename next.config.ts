import type { NextConfig } from 'next';

type RemotePattern = NonNullable<NonNullable<NextConfig['images']>['remotePatterns']>[number];

function r2RemotePattern(): RemotePattern[] {
  const raw = process.env.R2_PUBLIC_URL;
  if (!raw) return [];
  try {
    const url = new URL(raw);
    const pathname = url.pathname.replace(/\/$/, '');
    return [
      {
        protocol: url.protocol === 'http:' ? 'http' : 'https',
        hostname: url.hostname,
        pathname: `${pathname}/**`,
      },
    ];
  } catch {
    console.warn('Invalid R2_PUBLIC_URL, skipping image remote pattern.');
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      ...r2RemotePattern(),
    ],
  },
};

export default nextConfig;
