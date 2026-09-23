import { cn } from '@/lib/utils';

type TechBadgeProps = {
  label: string;
  size?: 'sm' | 'md';
};

export function TechBadge({ label, size = 'sm' }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'bg-gray-100 text-gray-600 font-semibold rounded-full',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3.5 py-1.5 text-sm',
      )}
    >
      {label}
    </span>
  );
}
