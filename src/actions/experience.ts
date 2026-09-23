'use server';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';
import { revalidateSite } from '@/lib/revalidate';
import { reorderItems } from '@/lib/reorder';
import { validationFailure, type ActionResult } from '@/lib/action-result';
import { directionSchema, idSchema } from '@/lib/validations/common';
import { experienceSchema } from '@/lib/validations/content';

export async function createExperience(input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = experienceSchema.safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error);

  const { _max } = await prisma.experience.aggregate({ _max: { order: true } });
  await prisma.experience.create({ data: { ...parsed.data, order: (_max.order ?? -1) + 1 } });
  revalidateSite();
  return { ok: true };
}

export async function updateExperience(id: string, input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsedId = idSchema.parse(id);
  const parsed = experienceSchema.safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error);

  const result = await prisma.experience.updateMany({ where: { id: parsedId }, data: parsed.data });
  if (result.count === 0) return { ok: false, error: 'Experience not found.' };
  revalidateSite();
  return { ok: true };
}

export async function deleteExperience(id: string): Promise<ActionResult> {
  await requireAdmin();
  await prisma.experience.deleteMany({ where: { id: idSchema.parse(id) } });
  revalidateSite();
  return { ok: true };
}

export async function moveExperience(id: string, direction: string): Promise<ActionResult> {
  await requireAdmin();
  const items = await prisma.experience.findMany({ orderBy: { order: 'asc' }, select: { id: true } });
  await reorderItems(items, idSchema.parse(id), directionSchema.parse(direction), (itemId, order) =>
    prisma.experience.update({ where: { id: itemId }, data: { order } }),
  );
  revalidateSite();
  return { ok: true };
}
