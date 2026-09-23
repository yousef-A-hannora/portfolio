'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ConfirmDeleteButtonProps = {
  onConfirm: () => void;
  disabled?: boolean;
  label?: string;
};

export function ConfirmDeleteButton({ onConfirm, disabled, label = 'Delete' }: ConfirmDeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const timeout = setTimeout(() => setConfirming(false), 4000);
    return () => clearTimeout(timeout);
  }, [confirming]);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (confirming) {
          setConfirming(false);
          onConfirm();
        } else {
          setConfirming(true);
        }
      }}
      className={cn(
        'inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none',
        confirming ? 'bg-red-500 text-white hover:bg-red-600' : 'text-gray-500 hover:bg-red-50 hover:text-red-500',
      )}
      aria-label={confirming ? `Confirm ${label.toLowerCase()}` : label}
    >
      <Trash2 size={14} />
      <span className={confirming ? '' : 'sr-only sm:not-sr-only'}>{confirming ? 'Confirm?' : label}</span>
    </button>
  );
}
