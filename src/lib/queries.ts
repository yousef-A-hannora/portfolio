import 'server-only';
import { cache } from 'react';
import { prisma } from './prisma';

export function getServices() {
  return prisma.service.findMany({ orderBy: { order: 'asc' } });
}

export function getSkills() {
  return prisma.skill.findMany({ orderBy: { order: 'asc' } });
}

export function getExperiences() {
  return prisma.experience.findMany({ orderBy: { order: 'asc' } });
}

export function getSiteMetrics() {
  return prisma.siteMetric.findMany({ orderBy: { order: 'asc' } });
}

export function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { published: true, featured: true },
    orderBy: { order: 'asc' },
  });
}

export function getPublishedProjects() {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });
}

export const getProjectBySlug = cache(async (slug: string) => {
  return prisma.project.findFirst({
    where: { slug, published: true },
    include: {
      images: { orderBy: { order: 'asc' } },
      metrics: { orderBy: { order: 'asc' } },
    },
  });
});

export async function getAdjacentProjects(order: number, id: string) {
  const [previous, next] = await Promise.all([
    prisma.project.findFirst({
      where: { published: true, id: { not: id }, order: { lt: order } },
      orderBy: { order: 'desc' },
      select: { slug: true, title: true },
    }),
    prisma.project.findFirst({
      where: { published: true, id: { not: id }, order: { gt: order } },
      orderBy: { order: 'asc' },
      select: { slug: true, title: true },
    }),
  ]);
  return { previous, next };
}

export function getAdminProjects() {
  return prisma.project.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { images: true, metrics: true } } },
  });
}

export function getAdminProject(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: 'asc' } },
      metrics: { orderBy: { order: 'asc' } },
    },
  });
}

export async function getDashboardCounts() {
  const [projects, services, skills, experiences, siteMetrics] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.skill.count(),
    prisma.experience.count(),
    prisma.siteMetric.count(),
  ]);
  return { projects, services, skills, experiences, siteMetrics };
}
