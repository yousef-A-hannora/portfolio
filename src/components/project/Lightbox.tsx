'use client';

import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type LightboxProps = {
  images: { url: string; alt: string }[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const count = images.length;
  const current = images[index];

  const prev = useCallback(() => onChange((index - 1 + count) % count), [index, count, onChange]);
  const next = useCallback(() => onChange((index + 1) % count), [index, count, onChange]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') prev();
      if (event.key === 'ArrowRight') next();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, prev, next]);

  if (!current) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[100] bg-gray-900/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-orange-500 transition-colors"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {count > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            prev();
          }}
          className="absolute left-2 sm:left-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-orange-500 transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      <div className="relative w-full max-w-6xl h-full max-h-[80vh]" onClick={(event) => event.stopPropagation()}>
        <Image src={current.url} alt={current.alt} fill sizes="100vw" className="object-contain" />
      </div>

      {count > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            next();
          }}
          className="absolute right-2 sm:right-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-orange-500 transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight size={22} />
        </button>
      )}

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/80">
        {index + 1} / {count}
      </p>
    </div>,
    document.body,
  );
}
