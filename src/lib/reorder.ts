import 'server-only';
import type { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export type Direction = 'up' | 'down';

export async function reorderItems(
  items: { id: string }[],
  id: string,
  direction: Direction,
  updateOrder: (id: string, order: number) => Prisma.PrismaPromise<unknown>,
) {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return false;

  const target = direction === 'up' ? index - 1 : index + 1;
  if (target < 0 || target >= items.length) return false;

  const reordered = [...items];
  [reordered[index], reordered[target]] = [reordered[target], reordered[index]];

  await prisma.$transaction(reordered.map((item, order) => updateOrder(item.id, order)));
  return true;
}
