import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const services = [
  {
    title: 'Full Stack Development',
    description: 'End-to-end web applications built with modern frontend frameworks and scalable backend APIs.',
    icon: 'Layers',
  },
  {
    title: 'Web Application Improvement',
    description: 'Upgrading existing apps with modern UI/UX design, cleaner architecture, and new features.',
    icon: 'Zap',
  },
  {
    title: 'Third Party Integration',
    description: 'Seamless integration of APIs, payment gateways, authentication systems, and cloud tools.',
    icon: 'Globe',
  },
  {
    title: 'Bug Fixation',
    description: 'Isolating and resolving critical bugs, security vulnerabilities, and cross-platform glitches.',
    icon: 'Bug',
  },
  {
    title: 'Performance Enhancement',
    description: 'Optimizing website loading speeds, database queries, code size, and Core Web Vitals.',
    icon: 'Cpu',
  },
];

const skills = [
  { name: 'JavaScript', icon: 'CodeXml' },
  { name: 'TypeScript', icon: 'Terminal' },
  { name: 'React.js', icon: 'PanelsTopLeft' },
  { name: 'Next.js', icon: 'Globe' },
  { name: 'Node.js', icon: 'Server' },
  { name: 'MongoDB', icon: 'Database' },
  { name: 'Tailwind CSS', icon: 'PenTool' },
  { name: 'Git & GitHub', icon: 'Github' },
];

const experiences = [
  {
    role: 'Web Developer',
    company: 'Freelance / Independent',
    period: '2024 - Present',
    description:
      'Building scalable web applications and admin dashboards for clients globally, focusing on React, Next.js, and Node.',
  },
  {
    role: 'Full Stack Intern',
    company: 'Tech Solutions Inc.',
    period: '2023 - 2024',
    description: 'Worked on real-world projects and RESTful APIs using the MERN stack in an agile environment.',
  },
  {
    role: 'Security Researcher',
    company: 'Bug Bounty Programs',
    period: '2022 - 2023',
    description: 'Identified and reported vulnerabilities in web applications to build robust web security standards.',
  },
];

const siteMetrics = [
  { key: 'customers', value: 20, prefix: '', suffix: '+', label: 'Happy Customers', icon: 'Smile' },
  { key: 'users', value: 10000, prefix: '', suffix: '+', label: 'Users Served by My Applications', icon: 'Users' },
  { key: 'revenue', value: 1, prefix: '', suffix: 'M+ EGP', label: 'Revenue Generated for My Customers', icon: 'TrendingUp' },
];

const projects = [
  {
    slug: 'casanest-procurement',
    title: 'CasaNest Procurement',
    category: 'B2B Platform',
    shortDescription:
      'Comprehensive procurement portal converting traditional processes into streamlined digital workflows with real-time analytics.',
    description:
      'CasaNest Procurement is a comprehensive procurement portal that converts traditional, paper-based processes into streamlined digital workflows.\n\nIt provides real-time analytics, approval flows, and supplier management in a single, easy-to-use dashboard.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Node.js'],
  },
  {
    slug: 'polluscan-dashboard',
    title: 'PolluScan Dashboard',
    category: 'IoT Data Visualization',
    shortDescription:
      'Industrial dashboard interfacing with IoT sensors for real-time air quality monitoring with interactive data reporting.',
    description:
      'PolluScan is an industrial dashboard that interfaces with IoT sensors to monitor air quality in real time.\n\nInteractive charts and reports help teams spot trends and act quickly.',
    techStack: ['React', 'Recharts', 'Express', 'PostgreSQL'],
  },
  {
    slug: 'e-commerce-ai-workflows',
    title: 'E-Commerce AI Workflows',
    category: 'AI Integration',
    shortDescription:
      'Autonomous multi-agent workflows to automate product SEO optimization, descriptions, and market trend analysis.',
    description:
      'A set of autonomous multi-agent workflows that automate product SEO optimization, product descriptions, and market trend analysis for e-commerce stores.',
    techStack: ['Python', 'LangChain', 'OpenAI', 'React'],
  },
];

async function main() {
  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({ data: services.map((s, order) => ({ ...s, order })) });
  }

  if ((await prisma.skill.count()) === 0) {
    await prisma.skill.createMany({ data: skills.map((s, order) => ({ ...s, order })) });
  }

  if ((await prisma.experience.count()) === 0) {
    await prisma.experience.createMany({ data: experiences.map((e, order) => ({ ...e, order })) });
  }

  for (const [order, metric] of siteMetrics.entries()) {
    await prisma.siteMetric.upsert({
      where: { key: metric.key },
      update: {},
      create: { ...metric, order },
    });
  }

  if ((await prisma.project.count()) === 0) {
    for (const [order, project] of projects.entries()) {
      await prisma.project.create({
        data: { ...project, featured: true, published: true, order },
      });
    }
  }

  console.log('Database seeded.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
