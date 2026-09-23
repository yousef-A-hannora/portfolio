import type { ThumbnailType } from '@prisma/client';
import { getYouTubeId, getYouTubeThumbnail } from './youtube';

type ProjectMediaFields = {
  thumbnailType: ThumbnailType;
  thumbnailImage: string | null;
  youtubeUrl: string | null;
};

export function getProjectCover(project: ProjectMediaFields): string | null {
  if (project.thumbnailImage) return project.thumbnailImage;
  if (project.thumbnailType === 'VIDEO') {
    const id = getYouTubeId(project.youtubeUrl);
    if (id) return getYouTubeThumbnail(id);
  }
  return null;
}
