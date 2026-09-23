import { Icon } from '@/components/ui/Icon';

type ProcessStepProps = {
  num: string;
  title: string;
  desc: string;
  icon: string;
  variant: 'desktop' | 'mobile';
};

export function ProcessStep({ num, title, desc, icon, variant }: ProcessStepProps) {
  if (variant === 'desktop') {
    return (
      <div className="relative z-10 flex flex-col items-center text-center w-full">
        <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center text-gray-400 shadow-md mb-3 group hover:border-orange-200 transition-colors">
          <div className="group-hover:text-orange-500 transition-colors">
            <Icon name={icon} size={28} />
          </div>
        </div>
        <p className="text-orange-500 font-bold text-xs mb-1">{num}</p>
        <h4 className="text-base font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-xs text-gray-500 max-w-[130px]">{desc}</p>
      </div>
    );
  }

  return (
    <div className="relative z-10 my-5">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs text-center relative z-10">
        <div className="w-12 h-12 bg-orange-50 border-2 border-orange-200 rounded-full flex items-center justify-center text-orange-500 mx-auto mb-2 shadow-xs">
          <Icon name={icon} size={22} />
        </div>
        <p className="text-orange-500 font-bold text-xs uppercase tracking-wider mb-0.5">{num}</p>
        <h4 className="text-base font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">{desc}</p>
      </div>
    </div>
  );
}
