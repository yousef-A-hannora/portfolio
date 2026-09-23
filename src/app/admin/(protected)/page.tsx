import Link from 'next/link';
import { ArrowRight, BarChart3, Briefcase, FolderKanban, Sparkles, Wrench } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { getDashboardCounts } from '@/lib/queries';

export default async function AdminOverviewPage() {
  const counts = await getDashboardCounts();

  const cards = [
    { href: '/admin/projects', label: 'Projects', count: counts.projects, icon: FolderKanban },
    { href: '/admin/metrics', label: 'Homepage metrics', count: counts.siteMetrics, icon: BarChart3 },
    { href: '/admin/services', label: 'Services', count: counts.services, icon: Wrench },
    { href: '/admin/skills', label: 'Skills', count: counts.skills, icon: Sparkles },
    { href: '/admin/experience', label: 'Experience', count: counts.experiences, icon: Briefcase },
  ];

  return (
    <>
      <AdminPageHeader title="Overview" description="Manage the content shown on your portfolio. Changes appear on the site immediately after saving." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ href, label, count, icon: CardIcon }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-300 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <CardIcon size={24} />
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-3xl font-extrabold text-gray-900">{count}</p>
            <p className="text-sm font-medium text-gray-500">{label}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
