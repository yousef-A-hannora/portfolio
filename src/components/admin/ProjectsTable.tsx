'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ImageIcon, Pencil, Star } from 'lucide-react';
import { deleteProject, moveProject, setProjectFlag } from '@/actions/projects';
import type { ActionResult } from '@/lib/action-result';
import { cn } from '@/lib/utils';
import { ConfirmDeleteButton } from './ConfirmDeleteButton';
import { ReorderButtons } from './ReorderButtons';
import { FormMessage } from './form/FormMessage';
import { cardClass } from './form/styles';

export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  cover: string | null;
  featured: boolean;
  published: boolean;
  imageCount: number;
  metricCount: number;
};

type ProjectsTableProps = {
  projects: ProjectRow[];
};

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function run(action: () => Promise<ActionResult>) {
    setError(null);
    startTransition(async () => {
      try {
        const result = await action();
        if (!result.ok) setError(result.error);
      } catch {
        setError('Something went wrong. Please try again.');
      }
    });
  }

  if (projects.length === 0) {
    return (
      <div className={`${cardClass} p-10 text-center text-sm text-gray-500`}>
        No projects yet. Click &quot;New project&quot; to add your first one.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FormMessage type="error" message={error} />
      <ul className="space-y-3">
        {projects.map((project, index) => (
          <li key={project.id} className={`${cardClass} p-4 flex flex-col sm:flex-row sm:items-center gap-4`}>
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <ReorderButtons
                isFirst={index === 0}
                isLast={index === projects.length - 1}
                disabled={isPending}
                onMove={(direction) => run(() => moveProject(project.id, direction))}
              />
              <div className="relative w-24 h-14 shrink-0 rounded-lg overflow-hidden bg-orange-50 flex items-center justify-center">
                {project.cover ? (
                  <Image src={project.cover} alt={project.title} fill sizes="96px" className="object-cover" />
                ) : (
                  <ImageIcon size={20} className="text-orange-400" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{project.title}</p>
                <p className="text-xs text-orange-500 font-medium truncate">{project.category}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {project.imageCount} images · {project.metricCount} metrics
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <button
                type="button"
                disabled={isPending}
                onClick={() => run(() => setProjectFlag(project.id, 'featured', !project.featured))}
                className={cn(
                  'inline-flex items-center gap-1 h-8 px-3 rounded-full text-xs font-semibold transition-colors',
                  project.featured ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-500',
                )}
                title="Toggle featured on homepage"
              >
                <Star size={12} fill={project.featured ? 'currentColor' : 'none'} /> Featured
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => run(() => setProjectFlag(project.id, 'published', !project.published))}
                className={cn(
                  'inline-flex items-center h-8 px-3 rounded-full text-xs font-semibold transition-colors',
                  project.published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
                )}
                title="Toggle published"
              >
                {project.published ? 'Published' : 'Draft'}
              </button>
              <Link
                href={`/admin/projects/${project.id}`}
                className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-xs font-semibold text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors"
              >
                <Pencil size={14} /> Edit
              </Link>
              {project.published && (
                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                  aria-label="View on site"
                >
                  <ExternalLink size={14} />
                </Link>
              )}
              <ConfirmDeleteButton disabled={isPending} onConfirm={() => run(() => deleteProject(project.id))} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
