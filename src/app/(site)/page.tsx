import { HeroSection } from '@/components/sections/HeroSection';
import { MetricsSection } from '@/components/sections/MetricsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { getExperiences, getFeaturedProjects, getServices, getSiteMetrics, getSkills } from '@/lib/queries';

export default async function HomePage() {
  const [metrics, services, skills, projects, experiences] = await Promise.all([
    getSiteMetrics(),
    getServices(),
    getSkills(),
    getFeaturedProjects(),
    getExperiences(),
  ]);

  return (
    <>
      <HeroSection />
      <MetricsSection metrics={metrics} />
      <ServicesSection services={services} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <ProcessSection />
    </>
  );
}
