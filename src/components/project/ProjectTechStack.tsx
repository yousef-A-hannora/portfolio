import { Layers } from 'lucide-react';
import { TechBadge } from '@/components/ui/TechBadge';

type ProjectTechStackProps = {
  techStack: string[];
};

export function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  if (techStack.length === 0) return null;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
          <Layers size={20} />
        </div>
        <h2 className="text-base font-bold text-gray-900">Tech Stack</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <TechBadge key={tech} label={tech} size="md" />
        ))}
      </div>
    </div>
  );
}
