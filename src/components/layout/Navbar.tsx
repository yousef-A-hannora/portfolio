'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        solid ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Logo />

        <div className="hidden md:flex space-x-8 text-sm font-semibold text-gray-600">
          {siteConfig.navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-orange-500 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-gray-900 text-white text-xs sm:text-sm font-semibold hover:bg-orange-500 transition-colors duration-300 shadow-sm"
          >
            Let&apos;s Talk <ArrowRight size={16} className="ml-2" />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden w-9 h-9 inline-flex items-center justify-center rounded-full text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 pt-3">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-2 flex flex-col">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
