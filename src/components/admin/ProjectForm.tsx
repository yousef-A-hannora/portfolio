'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExternalLink, ImageIcon, Youtube } from 'lucide-react';
import { saveProject } from '@/actions/projects';
import type { FieldErrors } from '@/lib/action-result';
import { getYouTubeId, getYouTubeThumbnail } from '@/lib/youtube';
import { cn, slugify } from '@/lib/utils';
import { FormSection } from './FormSection';
import { Field } from './form/Field';
import { FormMessage } from './form/FormMessage';
import { ImageUploader } from './form/ImageUploader';
import { GalleryManager, type GalleryItem } from './form/GalleryManager';
import { MetricsEditor, type MetricItem } from './form/MetricsEditor';
import { TagInput } from './form/TagInput';
import { inputClass, primaryButtonClass, secondaryButtonClass } from './form/styles';

export type ProjectFormProject = {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  thumbnailType: 'IMAGE' | 'VIDEO';
  thumbnailImage: string | null;
  youtubeUrl: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
  techStack: string[];
  featured: boolean;
  published: boolean;
  images: { url: string; alt: string }[];
  metrics: { value: number; prefix: string; suffix: string; label: string; icon: string }[];
};

type ProjectFormProps = {
  project: ProjectFormProject | null;
};

let keySeed = 0;
const createKey = () => `item-${++keySeed}`;

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(project?.title ?? '');
  const [slug, setSlug] = useState(project?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(!!project);
  const [category, setCategory] = useState(project?.category ?? '');
  const [shortDescription, setShortDescription] = useState(project?.shortDescription ?? '');
  const [description, setDescription] = useState(project?.description ?? '');
  const [thumbnailType, setThumbnailType] = useState<'IMAGE' | 'VIDEO'>(project?.thumbnailType ?? 'IMAGE');
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(project?.thumbnailImage ?? null);
  const [youtubeUrl, setYoutubeUrl] = useState(project?.youtubeUrl ?? '');
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl ?? '');
  const [repoUrl, setRepoUrl] = useState(project?.repoUrl ?? '');
  const [techStack, setTechStack] = useState<string[]>(project?.techStack ?? []);
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [published, setPublished] = useState(project?.published ?? true);
  const [gallery, setGallery] = useState<GalleryItem[]>(() =>
    (project?.images ?? []).map((image) => ({ key: createKey(), url: image.url, alt: image.alt })),
  );
  const [metrics, setMetrics] = useState<MetricItem[]>(() =>
    (project?.metrics ?? []).map((metric) => ({
      key: createKey(),
      value: String(metric.value),
      prefix: metric.prefix,
      suffix: metric.suffix,
      label: metric.label,
      icon: metric.icon,
    })),
  );

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const youtubeId = getYouTubeId(youtubeUrl);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrors({});
    setFormError(null);
    setSuccess(null);

    const payload = {
      title,
      slug,
      category,
      shortDescription,
      description,
      thumbnailType,
      thumbnailImage,
      youtubeUrl,
      liveUrl,
      repoUrl,
      techStack,
      featured,
      published,
      images: gallery.map(({ url, alt }) => ({ url, alt })),
      metrics: metrics.map(({ value, prefix, suffix, label, icon }) => ({ value, prefix, suffix, label, icon })),
    };

    startTransition(async () => {
      try {
        const result = await saveProject(project?.id ?? null, payload);
        if (!result.ok) {
          setFormError(result.error);
          setErrors(result.fieldErrors ?? {});
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (!project && result.data) {
          router.push(`/admin/projects/${result.data.id}?created=1`);
          return;
        }
        setSuccess('Project saved successfully.');
      } catch {
        setFormError('Something went wrong while saving. Please try again.');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormMessage type="error" message={formError} />
      <FormMessage type="success" message={success} />

      <FormSection title="Basic information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title" htmlFor="title" error={errors.title}>
            <input id="title" type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} className={inputClass} maxLength={120} />
          </Field>
          <Field label="Slug" htmlFor="slug" error={errors.slug} hint={`URL: /projects/${slug || 'your-slug'}`}>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value.toLowerCase());
              }}
              className={inputClass}
              maxLength={120}
            />
          </Field>
          <Field label="Category" htmlFor="category" error={errors.category}>
            <input id="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} placeholder="e.g. B2B Platform" maxLength={80} />
          </Field>
          <Field label="Tech stack" htmlFor="techStack" error={errors.techStack} hint="Press Enter or comma to add">
            <TagInput id="techStack" value={techStack} onChange={setTechStack} placeholder="Next.js, TypeScript…" invalid={!!errors.techStack} />
          </Field>
          <Field label="Short description" htmlFor="shortDescription" error={errors.shortDescription} className="md:col-span-2" hint="Shown on project cards (max 300 characters)">
            <textarea id="shortDescription" rows={2} value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className={inputClass} maxLength={300} />
          </Field>
          <Field label="Full description" htmlFor="description" error={errors.description} className="md:col-span-2" hint="Separate paragraphs with an empty line">
            <textarea id="description" rows={8} value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Thumbnail" description="Shown at the top of the project page and on project cards.">
        <div className="inline-flex p-1 rounded-full bg-gray-100">
          {(['IMAGE', 'VIDEO'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setThumbnailType(type)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors',
                thumbnailType === type ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-500 hover:text-gray-800',
              )}
              aria-pressed={thumbnailType === type}
            >
              {type === 'IMAGE' ? <ImageIcon size={16} /> : <Youtube size={16} />}
              {type === 'IMAGE' ? 'Image' : 'YouTube video'}
            </button>
          ))}
        </div>

        {thumbnailType === 'VIDEO' && (
          <Field label="YouTube URL" htmlFor="youtubeUrl" error={errors.youtubeUrl}>
            <input
              id="youtubeUrl"
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className={inputClass}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            {youtubeId && (
              <div className="relative mt-3 aspect-video w-full max-w-md rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                <Image src={getYouTubeThumbnail(youtubeId)} alt="YouTube preview" fill sizes="448px" className="object-cover" />
              </div>
            )}
          </Field>
        )}

        <Field
          label={thumbnailType === 'VIDEO' ? 'Cover image (optional)' : 'Thumbnail image'}
          htmlFor="thumbnailImage"
          error={errors.thumbnailImage}
          hint={thumbnailType === 'VIDEO' ? 'Used on project cards instead of the YouTube thumbnail.' : undefined}
        >
          <ImageUploader id="thumbnailImage" value={thumbnailImage} onChange={setThumbnailImage} invalid={!!errors.thumbnailImage} />
        </Field>
      </FormSection>

      <FormSection title="Links">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Live URL (optional)" htmlFor="liveUrl" error={errors.liveUrl}>
            <input id="liveUrl" type="url" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className={inputClass} placeholder="https://..." />
          </Field>
          <Field label="Repository URL (optional)" htmlFor="repoUrl" error={errors.repoUrl}>
            <input id="repoUrl" type="url" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} className={inputClass} placeholder="https://github.com/..." />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Metrics" description="Results shown as animated cards on the project page (e.g. 10,000+ Active users).">
        <MetricsEditor value={metrics} onChange={setMetrics} createKey={createKey} errors={errors} />
      </FormSection>

      <FormSection title="Gallery" description="Screenshots shown in a grid with a full-screen viewer.">
        <GalleryManager value={gallery} onChange={setGallery} createKey={createKey} errors={errors} />
      </FormSection>

      <FormSection title="Visibility">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="mt-0.5 w-4 h-4 accent-orange-500" />
          <span>
            <span className="block text-sm font-semibold text-gray-900">Published</span>
            <span className="block text-xs text-gray-500">Visible on the website and in the projects list.</span>
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="mt-0.5 w-4 h-4 accent-orange-500" />
          <span>
            <span className="block text-sm font-semibold text-gray-900">Featured</span>
            <span className="block text-xs text-gray-500">Shown in the &quot;Selected Work&quot; section on the homepage.</span>
          </span>
        </label>
      </FormSection>

      <div className="sticky bottom-0 -mx-4 sm:mx-0 px-4 sm:px-0 py-4 bg-gray-50/95 backdrop-blur border-t border-gray-100 sm:border-0 flex flex-wrap items-center gap-3">
        <button type="submit" className={primaryButtonClass} disabled={isPending}>
          {isPending ? 'Saving…' : project ? 'Save changes' : 'Create project'}
        </button>
        <Link href="/admin/projects" className={secondaryButtonClass}>
          Back to projects
        </Link>
        {project && project.published && (
          <Link
            href={`/projects/${project.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors"
          >
            View on site <ExternalLink size={14} />
          </Link>
        )}
      </div>
    </form>
  );
}
