import Link from 'next/link';
import { siteConfig } from '@/config/site';

type LogoProps = {
  size?: 'md' | 'lg';
  href?: string;
};

export function Logo({ size = 'lg', href = '/' }: LogoProps) {
  return (
    <Link href={href} className="flex items-center gap-1" aria-label={`${siteConfig.name} - Home`}>
      <span className={size === 'lg' ? 'font-bold text-xl sm:text-2xl text-gray-900 tracking-tight' : 'font-bold text-xl text-gray-900 tracking-tight'}>
        {siteConfig.initials}
      </span>
      <span className={size === 'lg' ? 'text-orange-500 text-2xl sm:text-3xl leading-none' : 'text-orange-500 text-2xl leading-none'}>.</span>
    </Link>
  );
}
