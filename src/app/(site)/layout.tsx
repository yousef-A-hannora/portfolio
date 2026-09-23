import { Navbar } from '@/components/layout/Navbar';
import { ContactSection } from '@/components/sections/ContactSection';

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen max-w-full overflow-x-hidden selection:bg-orange-500 selection:text-white bg-white">
      <Navbar />
      <main className="relative z-10 w-full pt-16 sm:pt-20">{children}</main>
      <ContactSection />
    </div>
  );
}
