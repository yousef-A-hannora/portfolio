import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type AdjacentProject = { slug: string; title: string } | null;

type ProjectNavigationProps = {
  previous: AdjacentProject;
  next: AdjacentProject;
};

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20" aria-label="Project navigation">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {previous ? (
          <Link
            href={`/projects/${previous.slug}`}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-300 transition-all group"
          >
            <span className="flex items-center text-xs font-semibold text-gray-400 mb-1">
              <ArrowLeft size={14} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Previous Project
            </span>
            <span className="text-base font-bold text-gray-900 group-hover:text-orange-500 transition-colors">{previous.title}</span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-300 transition-all group text-right"
          >
            <span className="flex items-center justify-end text-xs font-semibold text-gray-400 mb-1">
              Next Project <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-base font-bold text-gray-900 group-hover:text-orange-500 transition-colors">{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
