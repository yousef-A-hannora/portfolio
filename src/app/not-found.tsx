import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-white">
      <div className="absolute top-10 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"></div>
      <div className="relative text-center space-y-6 animate-fade-up">
        <div className="flex justify-center">
          <Logo />
        </div>
        <p className="text-7xl sm:text-8xl font-extrabold text-gray-900 tracking-tight">
          404<span className="text-orange-500">.</span>
        </p>
        <p className="text-base text-gray-500 max-w-sm mx-auto">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
