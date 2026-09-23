import { Icon } from '@/components/ui/Icon';
import { CountUp } from '@/components/ui/CountUp';

export type MetricCardData = {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  icon: string;
};

export function MetricCard({ value, prefix, suffix, label, icon }: MetricCardData) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-300 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 group">
      <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
        <Icon name={icon} size={28} />
      </div>
      <div className="min-w-0">
        <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-none">
          <CountUp value={value} prefix={prefix} suffix={suffix} affixClassName="text-orange-500" />
        </p>
        <p className="mt-2 text-xs sm:text-sm font-medium text-gray-500 leading-snug">{label}</p>
      </div>
    </div>
  );
}
