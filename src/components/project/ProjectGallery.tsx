'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { Lightbox } from './Lightbox';

type ProjectGalleryProps = {
  title: string;
  images: { id: string; url: string; alt: string }[];
};

export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const items = images.map((image, index) => ({
    url: image.url,
    alt: image.alt || `${title} screenshot ${index + 1}`,
  }));

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center sm:text-left mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Gallery</h2>
        <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto sm:mx-0"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((image, index) => (
          <button
            key={images[index].id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="project-card relative aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm group"
            aria-label={`Open ${image.alt}`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/30 transition-colors flex items-center justify-center">
              <span className="w-11 h-11 rounded-full bg-white text-orange-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Maximize2 size={18} />
              </span>
            </span>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox images={items} index={activeIndex} onClose={() => setActiveIndex(null)} onChange={setActiveIndex} />
      )}
    </section>
  );
}
