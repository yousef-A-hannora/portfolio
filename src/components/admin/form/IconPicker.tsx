'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Icon, iconNames } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

type IconPickerProps = {
  id?: string;
  value: string;
  onChange: (name: string) => void;
  invalid?: boolean;
};

const MAX_RESULTS = 120;

export function IconPicker({ id, value, onChange, invalid }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase().replace(/[\s_-]+/g, '');
    const matches = normalized
      ? iconNames.filter((name) => name.toLowerCase().includes(normalized))
      : iconNames;
    return matches.slice(0, MAX_RESULTS);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          'w-full flex items-center gap-3 rounded-xl border bg-white px-3.5 py-2 text-sm text-left transition-colors focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20',
          invalid ? 'border-red-300' : 'border-gray-200 hover:border-orange-300',
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="w-8 h-8 shrink-0 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
          {value ? <Icon name={value} size={18} /> : null}
        </span>
        <span className={cn('flex-1 truncate', value ? 'text-gray-900 font-medium' : 'text-gray-400')}>
          {value || 'Choose an icon'}
        </span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full min-w-[280px] rounded-2xl border border-gray-100 bg-white shadow-xl p-3">
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${iconNames.length} icons...`}
              className="w-full rounded-xl border border-gray-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
          <div role="listbox" className="grid grid-cols-6 sm:grid-cols-8 gap-1 max-h-64 overflow-y-auto">
            {results.map((name) => (
              <button
                key={name}
                type="button"
                role="option"
                aria-selected={name === value}
                title={name}
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                  setQuery('');
                }}
                className={cn(
                  'aspect-square rounded-lg flex items-center justify-center transition-colors',
                  name === value ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500',
                )}
              >
                <Icon name={name} size={18} />
              </button>
            ))}
          </div>
          {results.length === 0 && <p className="py-6 text-center text-xs text-gray-400">No icons found.</p>}
          {results.length === MAX_RESULTS && (
            <p className="pt-2 text-center text-[11px] text-gray-400">Showing first {MAX_RESULTS} results — refine your search.</p>
          )}
        </div>
      )}
    </div>
  );
}
