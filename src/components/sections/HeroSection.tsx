import Link from 'next/link';
import { ArrowRight, CheckCircle, Download } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HeroImage } from './HeroImage';

export function HeroSection() {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute top-10 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none -z-10"></div>

      <div className="lg:hidden flex flex-col items-center text-center space-y-6">
        <div className="w-full space-y-2">
          <p className="text-xs font-bold tracking-wider text-orange-500 uppercase">Hi, I&apos;m</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            {siteConfig.firstName} <span className="text-orange-500">{siteConfig.lastName}</span>
          </h1>
          <h2 className="text-base sm:text-lg font-semibold text-gray-600">{siteConfig.title}</h2>
        </div>

        <div className="w-full flex justify-center py-2">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gray-100">
            <HeroImage sizes="256px" />
          </div>
        </div>

        <div className="w-full max-w-md space-y-6">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{siteConfig.description}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="#work"
              className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20"
            >
              View My Work
            </Link>
            <a
              href={siteConfig.cvUrl}
              download
              className="px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold text-sm hover:border-orange-500 hover:text-orange-500 transition-all"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-row items-center justify-between gap-12">
        <div className="w-1/2 space-y-8 animate-fade-up">
          <div>
            <p className="text-sm font-bold tracking-wider text-orange-500 uppercase mb-2">Hi, I&apos;m</p>
            <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {siteConfig.firstName} <span className="text-orange-500">{siteConfig.lastName}</span>
            </h1>
            <h2 className="text-2xl font-medium text-gray-600 mt-2">{siteConfig.title}</h2>
          </div>

          <p className="text-lg text-gray-500 max-w-lg leading-relaxed">{siteConfig.description}</p>

          <div className="flex items-center gap-4 pt-2">
            <Link
              href="#work"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 group"
            >
              View My Work
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={siteConfig.cvUrl}
              download
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-semibold hover:border-orange-500 hover:text-orange-500 transition-all duration-300 group"
            >
              Download CV
              <Download size={18} className="ml-2 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="w-1/2 flex justify-end">
          <div className="relative">
            <div className="relative w-80 h-96 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl bg-gray-100">
              <HeroImage sizes="320px" priority />
            </div>

            <div className="absolute -bottom-6 -left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 animate-float">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{siteConfig.availability.label}</p>
                <p className="text-sm font-bold text-gray-900">{siteConfig.availability.value}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
