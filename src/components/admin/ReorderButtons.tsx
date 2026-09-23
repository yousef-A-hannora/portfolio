'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { iconButtonClass } from './form/styles';

type ReorderButtonsProps = {
  isFirst: boolean;
  isLast: boolean;
  disabled?: boolean;
  onMove: (direction: 'up' | 'down') => void;
};

export function ReorderButtons({ isFirst, isLast, disabled, onMove }: ReorderButtonsProps) {
  return (
    <div className="flex flex-col">
      <button
        type="button"
        className={`${iconButtonClass} h-6`}
        onClick={() => onMove('up')}
        disabled={disabled || isFirst}
        aria-label="Move up"
      >
        <ChevronUp size={16} />
      </button>
      <button
        type="button"
        className={`${iconButtonClass} h-6`}
        onClick={() => onMove('down')}
        disabled={disabled || isLast}
        aria-label="Move down"
      >
        <ChevronDown size={16} />
      </button>
    </div>
  );
}
