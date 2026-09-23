import type { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectGrid } from '@/components/project/ProjectGrid';
import { getPublishedProjects } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of projects I have designed, built, and shipped.',
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <section className="relative overflow-hidden bg-gray-50 min-h-[60vh]">
      <div className="absolute top-10 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <SectionHeading as="h1" title="All Projects" className="mb-4" />
        <p className="text-center sm:text-left text-sm sm:text-base text-gray-500 max-w-2xl mb-10">
          A collection of projects I&apos;ve designed, built, and shipped — from idea to deployment.
        </p>

        {projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <p className="text-center sm:text-left text-sm text-gray-500">Projects are coming soon.</p>
        )}
      </div>
    </section>
  );
}
