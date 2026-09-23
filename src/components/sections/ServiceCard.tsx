import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
  className?: string;
};

export function ServiceCard({ title, description, icon, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 flex flex-col justify-between group',
        className,
      )}
    >
      <div>
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
          <Icon name={icon} size={28} />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 leading-snug">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
