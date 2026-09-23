'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Briefcase, ExternalLink, FolderKanban, LayoutDashboard, LogOut, Sparkles, Wrench } from 'lucide-react';
import { logoutAction } from '@/actions/auth';
import { Logo } from '@/components/layout/Logo';
import { cn } from '@/lib/utils';

const links = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/metrics', label: 'Metrics', icon: BarChart3 },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/skills', label: 'Skills', icon: Sparkles },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <aside className="lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-100 z-40 flex flex-col">
      <div className="px-5 py-4 lg:py-6 flex items-center justify-between">
        <Logo href="/admin" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">Admin</span>
      </div>

      <nav className="px-3 pb-3 lg:pb-0 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible lg:flex-1">
        {links.map(({ href, label, icon: LinkIcon, exact }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors',
              isActive(href, exact) ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500',
            )}
          >
            <LinkIcon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="hidden lg:block p-3 border-t border-gray-100 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors"
        >
          <ExternalLink size={18} /> View site
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} /> Sign out
          </button>
        </form>
      </div>

      <div className="lg:hidden px-3 pb-3 flex gap-2">
        <Link href="/" target="_blank" className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-50 hover:text-orange-500">
          <ExternalLink size={14} /> View site
        </Link>
        <form action={logoutAction} className="flex-1">
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-50 hover:text-red-500">
            <LogOut size={14} /> Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
