'use server';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';
import { revalidateSite } from '@/lib/revalidate';
import { reorderItems } from '@/lib/reorder';
import { validationFailure, type ActionResult } from '@/lib/action-result';
import { directionSchema, idSchema } from '@/lib/validations/common';
import { skillSchema } from '@/lib/validations/content';

export async function createSkill(input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = skillSchema.safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error);

  const { _max } = await prisma.skill.aggregate({ _max: { order: true } });
  await prisma.skill.create({ data: { ...parsed.data, order: (_max.order ?? -1) + 1 } });
  revalidateSite();
  return { ok: true };
}

export async function updateSkill(id: string, input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsedId = idSchema.parse(id);
  const parsed = skillSchema.safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error);

  const result = await prisma.skill.updateMany({ where: { id: parsedId }, data: parsed.data });
  if (result.count === 0) return { ok: false, error: 'Skill not found.' };
  revalidateSite();
  return { ok: true };
}

export async function deleteSkill(id: string): Promise<ActionResult> {
  await requireAdmin();
  await prisma.skill.deleteMany({ where: { id: idSchema.parse(id) } });
  revalidateSite();
  return { ok: true };
}

export async function moveSkill(id: string, direction: string): Promise<ActionResult> {
  await requireAdmin();
  const items = await prisma.skill.findMany({ orderBy: { order: 'asc' }, select: { id: true } });
  await reorderItems(items, idSchema.parse(id), directionSchema.parse(direction), (itemId, order) =>
    prisma.skill.update({ where: { id: itemId }, data: { order } }),
  );
  revalidateSite();
  return { ok: true };
}
