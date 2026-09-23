import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { FormMessage } from '@/components/admin/form/FormMessage';
import { getAdminProject } from '@/lib/queries';

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
};

export default async function EditProjectPage({ params, searchParams }: EditProjectPageProps) {
  const [{ id }, { created }] = await Promise.all([params, searchParams]);
  const project = await getAdminProject(id);
  if (!project) notFound();

  return (
    <>
      <AdminPageHeader title={`Edit: ${project.title}`} />
      {created === '1' && (
        <div className="mb-6">
          <FormMessage type="success" message="Project created successfully." />
        </div>
      )}
      <ProjectForm
        key={project.id}
        project={{
          id: project.id,
          title: project.title,
          slug: project.slug,
          category: project.category,
          shortDescription: project.shortDescription,
          description: project.description,
          thumbnailType: project.thumbnailType,
          thumbnailImage: project.thumbnailImage,
          youtubeUrl: project.youtubeUrl,
          liveUrl: project.liveUrl,
          repoUrl: project.repoUrl,
          techStack: project.techStack,
          featured: project.featured,
          published: project.published,
          images: project.images.map((image) => ({ url: image.url, alt: image.alt })),
          metrics: project.metrics.map((metric) => ({
            value: metric.value,
            prefix: metric.prefix,
            suffix: metric.suffix,
            label: metric.label,
            icon: metric.icon,
          })),
        }}
      />
    </>
  );
}
