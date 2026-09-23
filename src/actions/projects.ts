'use server';

import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';
import { revalidateSite } from '@/lib/revalidate';
import { reorderItems } from '@/lib/reorder';
import { deleteR2Objects, isR2Url } from '@/lib/r2';
import { validationFailure, type ActionResult, type FieldErrors } from '@/lib/action-result';
import { directionSchema, idSchema } from '@/lib/validations/common';
import { projectSchema, type ProjectData } from '@/lib/validations/project';

function checkImageHosts(data: ProjectData): FieldErrors | null {
  const errors: FieldErrors = {};
  if (data.thumbnailImage && !isR2Url(data.thumbnailImage)) {
    errors.thumbnailImage = ['Thumbnail must be uploaded through the dashboard.'];
  }
  data.images.forEach((image, index) => {
    if (!isR2Url(image.url)) {
      errors[`images.${index}.url`] = ['Image must be uploaded through the dashboard.'];
    }
  });
  return Object.keys(errors).length > 0 ? errors : null;
}

function toProjectFields(data: ProjectData) {
  return {
    title: data.title,
    slug: data.slug,
    category: data.category,
    shortDescription: data.shortDescription,
    description: data.description,
    thumbnailType: data.thumbnailType,
    thumbnailImage: data.thumbnailImage,
    youtubeUrl: data.youtubeUrl,
    liveUrl: data.liveUrl,
    repoUrl: data.repoUrl,
    techStack: Array.from(new Set(data.techStack)),
    featured: data.featured,
    published: data.published,
  };
}

function toNested(data: ProjectData) {
  return {
    images: data.images.map((image, order) => ({ url: image.url, alt: image.alt, order })),
    metrics: data.metrics.map((metric, order) => ({ ...metric, order })),
  };
}

function isUniqueSlugError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
}

export async function saveProject(id: string | null, input: unknown): Promise<ActionResult<{ id: string }>> {
  await requireAdmin();

  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error);

  const hostErrors = checkImageHosts(parsed.data);
  if (hostErrors) return { ok: false, error: 'Please fix the highlighted fields.', fieldErrors: hostErrors };

  const fields = toProjectFields(parsed.data);
  const nested = toNested(parsed.data);

  try {
    if (id) {
      const existing = await prisma.project.findUnique({
        where: { id: idSchema.parse(id) },
        include: { images: { select: { url: true } } },
      });
      if (!existing) return { ok: false, error: 'Project not found.' };

      await prisma.project.update({
        where: { id: existing.id },
        data: {
          ...fields,
          images: { deleteMany: {}, create: nested.images },
          metrics: { deleteMany: {}, create: nested.metrics },
        },
      });

      const keptUrls = new Set([fields.thumbnailImage, ...nested.images.map((image) => image.url)]);
      const removedUrls = [existing.thumbnailImage, ...existing.images.map((image) => image.url)].filter(
        (url): url is string => !!url && !keptUrls.has(url),
      );
      await deleteR2Objects(removedUrls);

      revalidateSite();
      return { ok: true, data: { id: existing.id } };
    }

    const { _max } = await prisma.project.aggregate({ _max: { order: true } });
    const created = await prisma.project.create({
      data: {
        ...fields,
        order: (_max.order ?? -1) + 1,
        images: { create: nested.images },
        metrics: { create: nested.metrics },
      },
      select: { id: true },
    });

    revalidateSite();
    return { ok: true, data: { id: created.id } };
  } catch (error) {
    if (isUniqueSlugError(error)) {
      return {
        ok: false,
        error: 'Please fix the highlighted fields.',
        fieldErrors: { slug: ['This slug is already used by another project.'] },
      };
    }
    throw error;
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  await requireAdmin();
  const project = await prisma.project.findUnique({
    where: { id: idSchema.parse(id) },
    include: { images: { select: { url: true } } },
  });
  if (!project) return { ok: false, error: 'Project not found.' };

  await prisma.project.delete({ where: { id: project.id } });
  await deleteR2Objects([project.thumbnailImage, ...project.images.map((image) => image.url)]);

  revalidateSite();
  return { ok: true };
}

export async function setProjectFlag(id: string, flag: string, value: boolean): Promise<ActionResult> {
  await requireAdmin();
  if (flag !== 'featured' && flag !== 'published') return { ok: false, error: 'Invalid flag.' };

  const result = await prisma.project.updateMany({
    where: { id: idSchema.parse(id) },
    data: { [flag]: value === true },
  });
  if (result.count === 0) return { ok: false, error: 'Project not found.' };

  revalidateSite();
  return { ok: true };
}

export async function moveProject(id: string, direction: string): Promise<ActionResult> {
  await requireAdmin();
  const items = await prisma.project.findMany({ orderBy: { order: 'asc' }, select: { id: true } });
  await reorderItems(items, idSchema.parse(id), directionSchema.parse(direction), (itemId, order) =>
    prisma.project.update({ where: { id: itemId }, data: { order } }),
  );
  revalidateSite();
  return { ok: true };
}
