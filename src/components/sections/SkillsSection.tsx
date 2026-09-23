import type { Skill } from '@prisma/client';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillCard } from './SkillCard';

type SkillsSectionProps = {
  skills: Skill[];
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Skills & Technologies" className="mb-10" />

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {skills.map((skill) => (
          <SkillCard key={skill.id} name={skill.name} icon={skill.icon} />
        ))}
      </div>
    </section>
  );
}
