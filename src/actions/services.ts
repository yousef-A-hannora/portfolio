'use server';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';
import { revalidateSite } from '@/lib/revalidate';
import { reorderItems } from '@/lib/reorder';
import { validationFailure, type ActionResult } from '@/lib/action-result';
import { directionSchema, idSchema } from '@/lib/validations/common';
import { serviceSchema } from '@/lib/validations/content';

export async function createService(input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = serviceSchema.safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error);

  const { _max } = await prisma.service.aggregate({ _max: { order: true } });
  await prisma.service.create({ data: { ...parsed.data, order: (_max.order ?? -1) + 1 } });
  revalidateSite();
  return { ok: true };
}

export async function updateService(id: string, input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsedId = idSchema.parse(id);
  const parsed = serviceSchema.safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error);

  const result = await prisma.service.updateMany({ where: { id: parsedId }, data: parsed.data });
  if (result.count === 0) return { ok: false, error: 'Service not found.' };
  revalidateSite();
  return { ok: true };
}

export async function deleteService(id: string): Promise<ActionResult> {
  await requireAdmin();
  await prisma.service.deleteMany({ where: { id: idSchema.parse(id) } });
  revalidateSite();
  return { ok: true };
}

export async function moveService(id: string, direction: string): Promise<ActionResult> {
  await requireAdmin();
  const items = await prisma.service.findMany({ orderBy: { order: 'asc' }, select: { id: true } });
  await reorderItems(items, idSchema.parse(id), directionSchema.parse(direction), (itemId, order) =>
    prisma.service.update({ where: { id: itemId }, data: { order } }),
  );
  revalidateSite();
  return { ok: true };
}
