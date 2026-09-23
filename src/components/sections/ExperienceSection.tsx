import type { Experience } from '@prisma/client';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExperienceCard } from './ExperienceCard';

type ExperienceSectionProps = {
  experiences: Experience[];
};

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Experience" className="mb-12" />

      <div className="hidden md:grid grid-cols-3 gap-8 relative before:absolute before:inset-0 before:top-1/2 before:h-0.5 before:w-full before:bg-gray-200 before:-z-10">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} variant="desktop" role={exp.role} company={exp.company} period={exp.period} description={exp.description} />
        ))}
      </div>

      <div className="md:hidden relative max-w-md mx-auto space-y-8 py-2">
        <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-orange-300 z-0"></div>
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} variant="mobile" role={exp.role} company={exp.company} period={exp.period} description={exp.description} />
        ))}
      </div>
    </section>
  );
}
