import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProjectLinks } from './ProjectLinks';

type ProjectHeroProps = {
  title: string;
  category: string;
  shortDescription: string;
  liveUrl: string | null;
  repoUrl: string | null;
};

export function ProjectHero({ title, category, shortDescription, liveUrl, repoUrl }: ProjectHeroProps) {
  return (
    <div className="text-center sm:text-left space-y-5 animate-fade-up">
      <Link
        href="/projects"
        className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors group"
      >
        <ArrowLeft size={16} className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
        All Projects
      </Link>
      <div className="space-y-3">
        <span className="inline-block px-3 py-1 bg-orange-50 text-orange-500 text-xs font-bold uppercase tracking-wider rounded-full">
          {category}
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {title}
          <span className="text-orange-500">.</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-3xl leading-relaxed mx-auto sm:mx-0">{shortDescription}</p>
      </div>
      <ProjectLinks liveUrl={liveUrl} repoUrl={repoUrl} />
    </div>
  );
}
