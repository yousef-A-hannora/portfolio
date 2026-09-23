import type { Service } from '@prisma/client';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from './ServiceCard';

type ServicesSectionProps = {
  services: Service[];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  if (services.length === 0) return null;

  const isOdd = services.length % 2 === 1;

  return (
    <section id="services" className="bg-gray-50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Services" className="mb-10" />

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
          {services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              className={isOdd && idx === services.length - 1 ? 'col-span-2 lg:col-span-1' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
