import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SiteMetricForm } from '@/components/admin/SiteMetricForm';
import { getSiteMetrics } from '@/lib/queries';

export default async function AdminMetricsPage() {
  const metrics = await getSiteMetrics();

  return (
    <>
      <AdminPageHeader
        title="Homepage metrics"
        description="The three impact cards shown right after the hero section. Use prefix/suffix for units, e.g. suffix “M+ EGP” or “K+”."
      />
      {metrics.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center text-sm text-gray-500">
          No metrics found. Run <code className="font-mono text-orange-500">npm run db:seed</code> to create the three default cards.
        </div>
      ) : (
        <div className="space-y-6">
          {metrics.map((metric, index) => (
            <SiteMetricForm key={metric.id} metric={metric} index={index} />
          ))}
        </div>
      )}
    </>
  );
}
