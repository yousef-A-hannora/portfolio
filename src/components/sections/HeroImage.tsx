'use client';

import { useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

type HeroImageProps = {
  sizes: string;
  priority?: boolean;
};

export function HeroImage({ sizes, priority }: HeroImageProps) {
  const [src, setSrc] = useState<string>(siteConfig.profileImage);

  return (
    <Image
      src={src}
      alt={siteConfig.name}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
      style={{ objectPosition: '50% 15%' }}
      onError={() => {
        if (src !== siteConfig.fallbackImage) setSrc(siteConfig.fallbackImage);
      }}
    />
  );
}
