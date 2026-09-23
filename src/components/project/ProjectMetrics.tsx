import type { ProjectMetric } from '@prisma/client';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MetricCard } from '@/components/sections/MetricCard';
import { cn } from '@/lib/utils';

type ProjectMetricsProps = {
  metrics: ProjectMetric[];
};

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  if (metrics.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Results" className="mb-10" />
        <div
          className={cn(
            'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6',
            metrics.length % 3 === 0 || metrics.length > 4 ? 'lg:grid-cols-3' : metrics.length === 4 ? 'lg:grid-cols-4' : '',
          )}
        >
          {metrics.map((metric) => (
            <MetricCard
              key={metric.id}
              value={metric.value}
              prefix={metric.prefix}
              suffix={metric.suffix}
              label={metric.label}
              icon={metric.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
