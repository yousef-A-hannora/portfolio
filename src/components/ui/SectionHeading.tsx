import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  title: string;
  className?: string;
  as?: 'h1' | 'h2';
};

export function SectionHeading({ title, className, as: Tag = 'h2' }: SectionHeadingProps) {
  return (
    <div className={cn('text-center sm:text-left', className)}>
      <Tag className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{title}</Tag>
      <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto sm:mx-0"></div>
    </div>
  );
}
