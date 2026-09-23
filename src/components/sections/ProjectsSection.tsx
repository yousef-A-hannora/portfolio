import Link from 'next/link';
import type { Project } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectGrid } from '@/components/project/ProjectGrid';

type ProjectsSectionProps = {
  projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="work" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-10 text-center sm:text-left">
          <SectionHeading title="Selected Work" />
          <Link
            href="/projects"
            className="mt-4 sm:mt-0 inline-flex items-center text-orange-500 font-semibold hover:text-orange-600 transition-colors text-sm group"
          >
            View All Projects <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <p className="text-center sm:text-left text-sm text-gray-500">Projects are coming soon.</p>
        )}
      </div>
    </section>
  );
}
