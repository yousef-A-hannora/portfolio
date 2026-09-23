import type { SiteMetric } from '@prisma/client';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MetricCard } from './MetricCard';

type MetricsSectionProps = {
  metrics: SiteMetric[];
};

export function MetricsSection({ metrics }: MetricsSectionProps) {
  if (metrics.length === 0) return null;

  return (
    <section id="impact" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Impact in Numbers" className="mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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
    </section>
  );
}
