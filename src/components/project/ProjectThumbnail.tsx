import Image from 'next/image';
import type { ThumbnailType } from '@prisma/client';
import { getYouTubeEmbedUrl, getYouTubeId } from '@/lib/youtube';

type ProjectThumbnailProps = {
  title: string;
  thumbnailType: ThumbnailType;
  thumbnailImage: string | null;
  youtubeUrl: string | null;
};

const frameClass =
  'relative w-full aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-gray-100';

export function ProjectThumbnail({ title, thumbnailType, thumbnailImage, youtubeUrl }: ProjectThumbnailProps) {
  const videoId = thumbnailType === 'VIDEO' ? getYouTubeId(youtubeUrl) : null;

  if (videoId) {
    return (
      <div className={frameClass}>
        <iframe
          src={getYouTubeEmbedUrl(videoId)}
          title={`${title} video`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  if (thumbnailImage) {
    return (
      <div className={frameClass}>
        <Image src={thumbnailImage} alt={title} fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
      </div>
    );
  }

  return null;
}
