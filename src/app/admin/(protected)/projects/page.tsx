import Link from 'next/link';
import { Plus } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ProjectsTable } from '@/components/admin/ProjectsTable';
import { primaryButtonClass } from '@/components/admin/form/styles';
import { getAdminProjects } from '@/lib/queries';
import { getProjectCover } from '@/lib/project-media';

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <>
      <AdminPageHeader
        title="Projects"
        description="Featured projects appear on the homepage. All published projects appear on the /projects page."
        actions={
          <Link href="/admin/projects/new" className={primaryButtonClass}>
            <Plus size={16} /> New project
          </Link>
        }
      />
      <ProjectsTable
        projects={projects.map((project) => ({
          id: project.id,
          slug: project.slug,
          title: project.title,
          category: project.category,
          cover: getProjectCover(project),
          featured: project.featured,
          published: project.published,
          imageCount: project._count.images,
          metricCount: project._count.metrics,
        }))}
      />
    </>
  );
}
