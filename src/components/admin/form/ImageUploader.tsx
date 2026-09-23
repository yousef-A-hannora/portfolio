'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { ACCEPTED_IMAGE_TYPES, uploadImage } from '@/lib/upload-client';
import { cn } from '@/lib/utils';

type ImageUploaderProps = {
  id?: string;
  value: string | null;
  onChange: (url: string | null) => void;
  invalid?: boolean;
};

export function ImageUploader({ id, value, onChange, invalid }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      onChange(await uploadImage(file));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      {value ? (
        <div className="relative aspect-video w-full max-w-md rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
          <Image src={value} alt="Thumbnail preview" fill sizes="448px" className="object-cover" />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="px-3 h-8 rounded-full bg-white/95 text-xs font-semibold text-gray-700 shadow hover:text-orange-500 transition-colors"
            >
              {uploading ? 'Uploading…' : 'Replace'}
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              disabled={uploading}
              className="w-8 h-8 rounded-full bg-white/95 text-gray-700 shadow flex items-center justify-center hover:text-red-500 transition-colors"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            'w-full max-w-md aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 text-sm font-semibold transition-colors',
            invalid ? 'border-red-300 text-red-500' : 'border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50/50',
          )}
        >
          {uploading ? <Loader2 size={24} className="animate-spin" /> : <ImagePlus size={24} />}
          {uploading ? 'Uploading…' : 'Upload image'}
          <span className="text-xs font-normal text-gray-400">JPG, PNG, WebP, GIF, AVIF · max 10 MB</span>
        </button>
      )}

      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
