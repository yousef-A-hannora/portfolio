import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@prisma/client';
import { ArrowUpRight, ImageIcon, Play } from 'lucide-react';
import { TechBadge } from '@/components/ui/TechBadge';
import { getProjectCover } from '@/lib/project-media';

type ProjectCardProps = {
  project: Pick<
    Project,
    'slug' | 'title' | 'category' | 'shortDescription' | 'techStack' | 'thumbnailType' | 'thumbnailImage' | 'youtubeUrl'
  >;
};

const MAX_BADGES = 4;

export function ProjectCard({ project }: ProjectCardProps) {
  const cover = getProjectCover(project);
  const extraTech = project.techStack.length - MAX_BADGES;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="project-card bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm group"
    >
      <div className="h-44 sm:h-48 bg-orange-50 flex items-center justify-center p-4 relative">
        <div className="w-full h-full bg-white rounded-t-xl border border-gray-200 border-b-0 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-5 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-1 z-10">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </div>
          <div className="absolute inset-x-0 top-5 bottom-0 flex items-center justify-center">
            {cover ? (
              <Image
                src={cover}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-top"
              />
            ) : (
              <ImageIcon size={36} className="text-orange-400" />
            )}
            {project.thumbnailType === 'VIDEO' && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-white/90 text-orange-500 shadow-lg flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Play size={20} className="ml-0.5" fill="currentColor" />
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-grow flex flex-col">
        <p className="text-orange-500 text-xs font-semibold uppercase tracking-wider mb-1">{project.category}</p>
        <div className="flex items-center justify-between gap-3 mb-2">
          <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
          <ArrowUpRight size={18} className="shrink-0 text-gray-400 group-hover:text-orange-500 transition-colors" />
        </div>
        <p className="text-gray-600 text-xs sm:text-sm mb-5 flex-grow leading-relaxed">{project.shortDescription}</p>
        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.techStack.slice(0, MAX_BADGES).map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
            {extraTech > 0 && <TechBadge label={`+${extraTech}`} />}
          </div>
        )}
      </div>
    </Link>
  );
}
