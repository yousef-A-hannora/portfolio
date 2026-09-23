'use server';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';
import { revalidateSite } from '@/lib/revalidate';
import { validationFailure, type ActionResult } from '@/lib/action-result';
import { idSchema } from '@/lib/validations/common';
import { siteMetricSchema } from '@/lib/validations/content';

export async function updateSiteMetric(id: string, input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsedId = idSchema.parse(id);
  const parsed = siteMetricSchema.safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error);

  const result = await prisma.siteMetric.updateMany({ where: { id: parsedId }, data: parsed.data });
  if (result.count === 0) return { ok: false, error: 'Metric not found.' };
  revalidateSite();
  return { ok: true };
}
