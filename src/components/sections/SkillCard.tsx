import { Icon } from '@/components/ui/Icon';

type SkillCardProps = {
  name: string;
  icon: string;
};

export function SkillCard({ name, icon }: SkillCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-500 hover:-translate-y-1 transition-all duration-300 group">
      <div className="text-gray-400 group-hover:text-orange-500 mb-2 sm:mb-3 transition-colors">
        <Icon name={icon} size={28} />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center">{name}</span>
    </div>
  );
}
