'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type TagInputProps = {
  id?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  invalid?: boolean;
};

export function TagInput({ id, value, onChange, placeholder, invalid }: TagInputProps) {
  const [draft, setDraft] = useState('');

  function addTags(raw: string) {
    const incoming = raw
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    if (incoming.length === 0) return;
    const existing = new Set(value.map((tag) => tag.toLowerCase()));
    const next = [...value];
    for (const tag of incoming) {
      if (!existing.has(tag.toLowerCase())) {
        next.push(tag);
        existing.add(tag.toLowerCase());
      }
    }
    onChange(next);
    setDraft('');
  }

  return (
    <div
      className={cn(
        'w-full flex flex-wrap items-center gap-1.5 rounded-xl border bg-white px-2.5 py-2 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-colors',
        invalid ? 'border-red-300' : 'border-gray-200',
      )}
    >
      {value.map((tag) => (
        <span key={tag} className="inline-flex items-center gap-1 pl-2.5 pr-1 py-0.5 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full">
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((item) => item !== tag))}
            className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
            aria-label={`Remove ${tag}`}
          >
            <X size={10} />
          </button>
        </span>
      ))}
      <input
        id={id}
        type="text"
        value={draft}
        onChange={(event) => {
          const next = event.target.value;
          if (next.includes(',')) addTags(next);
          else setDraft(next);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            addTags(draft);
          } else if (event.key === 'Backspace' && !draft && value.length > 0) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => addTags(draft)}
        placeholder={value.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] px-1 py-0.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
      />
    </div>
  );
}
