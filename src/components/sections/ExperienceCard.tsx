import { Briefcase } from 'lucide-react';

type ExperienceCardProps = {
  role: string;
  company: string;
  period: string;
  description: string;
  variant: 'desktop' | 'mobile';
};

export function ExperienceCard({ role, company, period, description, variant }: ExperienceCardProps) {
  if (variant === 'desktop') {
    return (
      <div className="relative pt-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-orange-500 border-4 border-white shadow-sm"></div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all text-center group h-full">
          <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500 group-hover:text-white transition-colors">
            <Briefcase size={20} />
          </div>
          <h3 className="text-base font-bold text-gray-900">{role}</h3>
          <p className="text-orange-500 font-medium text-xs sm:text-sm mb-1">{company}</p>
          <span className="inline-block px-3 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full font-semibold mb-3">{period}</span>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 my-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center relative z-10 pt-7">
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-orange-500 border-4 border-white shadow-md flex items-center justify-center text-white z-20">
          <Briefcase size={12} />
        </div>
        <h3 className="text-base font-bold text-gray-900">{role}</h3>
        <p className="text-orange-500 font-semibold text-xs mt-0.5">{company}</p>
        <span className="inline-block my-2 px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">{period}</span>
        <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
