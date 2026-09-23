import { z } from 'zod';
import { getYouTubeId } from '@/lib/youtube';
import { metricFields, requiredText } from './common';

const emptyToNull = (value: unknown) =>
  typeof value === 'string' && value.trim() === '' ? null : value;

const optionalUrl = (label: string) =>
  z.preprocess(emptyToNull, z.string().trim().url(`${label} must be a valid URL`).nullable());

export const projectMetricSchema = z.object(metricFields);

export const projectImageSchema = z.object({
  url: z.string().url('Invalid image URL'),
  alt: z.string().trim().max(200, 'Alt text must be at most 200 characters').default(''),
});

export const projectSchema = z
  .object({
    title: requiredText('Title', 120),
    slug: requiredText('Slug', 120).regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Use lowercase letters, numbers and single hyphens only',
    ),
    category: requiredText('Category', 80),
    shortDescription: requiredText('Short description', 300),
    description: requiredText('Description', 20000),
    thumbnailType: z.enum(['IMAGE', 'VIDEO']),
    thumbnailImage: optionalUrl('Thumbnail image'),
    youtubeUrl: optionalUrl('YouTube URL'),
    liveUrl: optionalUrl('Live URL'),
    repoUrl: optionalUrl('Repository URL'),
    techStack: z
      .array(z.string().trim().min(1).max(40, 'Each technology must be at most 40 characters'))
      .max(30, 'At most 30 technologies'),
    featured: z.boolean(),
    published: z.boolean(),
    images: z.array(projectImageSchema).max(30, 'At most 30 gallery images'),
    metrics: z.array(projectMetricSchema).max(12, 'At most 12 metrics'),
  })
  .superRefine((data, ctx) => {
    if (data.thumbnailType === 'VIDEO') {
      if (!data.youtubeUrl) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['youtubeUrl'], message: 'YouTube URL is required for a video thumbnail' });
      } else if (!getYouTubeId(data.youtubeUrl)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['youtubeUrl'], message: 'Enter a valid YouTube video URL' });
      }
    } else if (data.youtubeUrl && !getYouTubeId(data.youtubeUrl)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['youtubeUrl'], message: 'Enter a valid YouTube video URL' });
    }
  });

export type ProjectInput = z.input<typeof projectSchema>;
export type ProjectData = z.output<typeof projectSchema>;
