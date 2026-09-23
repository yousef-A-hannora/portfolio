import { ExternalLink, Github } from 'lucide-react';

type ProjectLinksProps = {
  liveUrl: string | null;
  repoUrl: string | null;
};

export function ProjectLinks({ liveUrl, repoUrl }: ProjectLinksProps) {
  if (!liveUrl && !repoUrl) return null;

  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-3">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 group"
        >
          Live Demo
          <ExternalLink size={16} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
        </a>
      )}
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
        >
          <Github size={16} className="mr-2" />
          Source Code
        </a>
      )}
    </div>
  );
}
