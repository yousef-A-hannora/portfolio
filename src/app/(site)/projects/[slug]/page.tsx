import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectHero } from '@/components/project/ProjectHero';
import { ProjectThumbnail } from '@/components/project/ProjectThumbnail';
import { ProjectMetrics } from '@/components/project/ProjectMetrics';
import { ProjectDescription } from '@/components/project/ProjectDescription';
import { ProjectTechStack } from '@/components/project/ProjectTechStack';
import { ProjectGallery } from '@/components/project/ProjectGallery';
import { ProjectNavigation } from '@/components/project/ProjectNavigation';
import { getAdjacentProjects, getProjectBySlug, getPublishedProjects } from '@/lib/queries';
import { getProjectCover } from '@/lib/project-media';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project not found' };

  const cover = getProjectCover(project);

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.shortDescription,
      images: cover ? [{ url: cover }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { previous, next } = await getAdjacentProjects(project.order, project.id);

  return (
    <article>
      <section className="relative overflow-hidden">
        <div className="absolute top-10 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-12">
          <ProjectHero
            title={project.title}
            category={project.category}
            shortDescription={project.shortDescription}
            liveUrl={project.liveUrl}
            repoUrl={project.repoUrl}
          />
          <ProjectThumbnail
            title={project.title}
            thumbnailType={project.thumbnailType}
            thumbnailImage={project.thumbnailImage}
            youtubeUrl={project.youtubeUrl}
          />
        </div>
      </section>

      <ProjectMetrics metrics={project.metrics} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <ProjectDescription description={project.description} />
          </div>
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <ProjectTechStack techStack={project.techStack} />
            </div>
          </aside>
        </div>
      </section>

      <ProjectGallery
        title={project.title}
        images={project.images.map((image) => ({ id: image.id, url: image.url, alt: image.alt }))}
      />

      <ProjectNavigation previous={previous} next={next} />
    </article>
  );
}
