import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessStep } from './ProcessStep';

export function ProcessSection() {
  const steps = siteConfig.processSteps;

  return (
    <section className="py-16 sm:py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="My Process" className="mb-12" />

        <div className="hidden md:flex justify-between items-start relative gap-4">
          <div className="absolute top-10 left-10 right-10 h-0.5 border-t-2 border-dashed border-gray-300 z-0"></div>
          {steps.map((step) => (
            <ProcessStep key={step.num} variant="desktop" {...step} />
          ))}
        </div>

        <div className="md:hidden relative max-w-sm mx-auto py-2">
          <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 border-l-2 border-dashed border-orange-400 z-0"></div>
          {steps.map((step) => (
            <ProcessStep key={step.num} variant="mobile" {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
