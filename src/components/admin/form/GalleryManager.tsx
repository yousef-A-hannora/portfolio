'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ImagePlus, Loader2, X } from 'lucide-react';
import { ACCEPTED_IMAGE_TYPES, uploadImage } from '@/lib/upload-client';
import type { FieldErrors } from '@/lib/action-result';
import { inputClass } from './styles';

export type GalleryItem = { key: string; url: string; alt: string };

type GalleryManagerProps = {
  value: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
  createKey: () => string;
  errors?: FieldErrors;
  maxItems?: number;
};

export function GalleryManager({ value, onChange, createKey, errors, maxItems = 30 }: GalleryManagerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const itemsRef = useRef(value);
  itemsRef.current = value;

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setError(null);
    const files = Array.from(fileList).slice(0, Math.max(0, maxItems - value.length));
    if (files.length < fileList.length) setError(`You can add up to ${maxItems} images.`);

    setUploadingCount(files.length);
    for (const file of files) {
      try {
        const url = await uploadImage(file);
        onChange([...itemsRef.current, { key: createKey(), url, alt: '' }]);
      } catch (uploadError) {
        setError(uploadError instanceof Error ? `${file.name}: ${uploadError.message}` : 'Upload failed.');
      } finally {
        setUploadingCount((count) => count - 1);
      }
    }
    if (inputRef.current) inputRef.current.value = '';
  }

  function move(index: number, offset: -1 | 1) {
    const target = index + offset;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        className="sr-only"
        onChange={(event) => handleFiles(event.target.files)}
      />

      {value.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {value.map((item, index) => (
            <div key={item.key} className="rounded-2xl border border-gray-100 bg-gray-50 p-2 space-y-2">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <Image src={item.url} alt={item.alt || `Gallery image ${index + 1}`} fill sizes="300px" className="object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 text-[11px] font-bold text-gray-700">
                  {index + 1}
                </span>
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="w-7 h-7 rounded-full bg-white/95 text-gray-700 flex items-center justify-center hover:text-orange-500 disabled:opacity-40"
                    aria-label="Move left"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === value.length - 1}
                    className="w-7 h-7 rounded-full bg-white/95 text-gray-700 flex items-center justify-center hover:text-orange-500 disabled:opacity-40"
                    aria-label="Move right"
                  >
                    <ChevronRight size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange(value.filter((entry) => entry.key !== item.key))}
                    className="w-7 h-7 rounded-full bg-white/95 text-gray-700 flex items-center justify-center hover:text-red-500"
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={item.alt}
                onChange={(event) =>
                  onChange(value.map((entry) => (entry.key === item.key ? { ...entry, alt: event.target.value } : entry)))
                }
                placeholder="Alt text (optional)"
                className={`${inputClass} py-2 text-xs`}
                maxLength={200}
              />
              {errors?.[`images.${index}.url`] && (
                <p className="text-xs font-medium text-red-500">{errors[`images.${index}.url`]?.[0]}</p>
              )}
              {errors?.[`images.${index}.alt`] && (
                <p className="text-xs font-medium text-red-500">{errors[`images.${index}.alt`]?.[0]}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploadingCount > 0 || value.length >= maxItems}
        className="w-full rounded-2xl border-2 border-dashed border-gray-200 py-6 flex flex-col items-center justify-center gap-1.5 text-sm font-semibold text-gray-500 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50/50 transition-colors disabled:opacity-60 disabled:pointer-events-none"
      >
        {uploadingCount > 0 ? <Loader2 size={22} className="animate-spin" /> : <ImagePlus size={22} />}
        {uploadingCount > 0 ? `Uploading ${uploadingCount} image(s)…` : 'Add gallery images'}
        <span className="text-xs font-normal text-gray-400">
          {value.length}/{maxItems} · select multiple files at once
        </span>
      </button>

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      {errors?.images && <p className="text-xs font-medium text-red-500">{errors.images[0]}</p>}
    </div>
  );
}
