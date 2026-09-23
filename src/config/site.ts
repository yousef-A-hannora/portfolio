export const siteConfig = {
  name: 'Yousef Hannora',
  firstName: 'Yousef',
  lastName: 'Hannora',
  initials: 'YH',
  title: 'Software Engineer & Full-Stack Developer',
  description:
    'I build digital products that solve real problems and create meaningful impact. From idea to deployment, I turn complex challenges into simple, beautiful solutions.',
  profileImage: '/hero-image.png',
  fallbackImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  cvUrl: '/cv.pdf',
  availability: {
    label: 'Available for',
    value: 'Freelance Work',
  },
  contact: {
    email: 'contact@yousef.com',
    phone: '+20 100 000 0000',
    location: 'Suez, Egypt',
  },
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  navLinks: [
    { label: 'Services', href: '/#services' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Work', href: '/#work' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Contact', href: '#contact' },
  ],
  processSteps: [
    { num: '01', title: 'Discover', desc: 'Understand problem deeply.', icon: 'Search' },
    { num: '02', title: 'Design', desc: 'Plan simple solutions.', icon: 'PenTool' },
    { num: '03', title: 'Develop', desc: 'Write clean code.', icon: 'CodeXml' },
    { num: '04', title: 'Deploy', desc: 'Test thoroughly & launch.', icon: 'Rocket' },
    { num: '05', title: 'Improve', desc: 'Monitor & iterate.', icon: 'Activity' },
  ],
} as const;
