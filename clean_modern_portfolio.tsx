import React, { useEffect, useState } from 'react';
import { 
  Code2, 
  Terminal, 
  Database, 
  Layout, 
  Server, 
  Smartphone, 
  Globe, 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  Download, 
  CheckCircle, 
  Briefcase, 
  Search, 
  PenTool, 
  Rocket, 
  Activity,
  ExternalLink,
  MapPin,
  Phone,
  Layers,
  Zap,
  Bug,
  Cpu
} from 'lucide-react';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    html {
      scroll-behavior: smooth;
    }

    :root {
      --primary: #f97316; /* Orange-500 */
      --primary-light: #ffedd5; /* Orange-100 */
      --text-main: #111827; /* Gray-900 */
      --text-muted: #4b5563; /* Gray-600 */
      --bg-main: #ffffff;
      --bg-alt: #fafafa;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--bg-main);
      color: var(--text-main);
      overflow-x: hidden;
      width: 100%;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: var(--bg-alt);
    }
    ::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--primary);
    }

    /* Keyframe Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }

    .animate-fade-up {
      animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    .animate-float {
      animation: float 5s ease-in-out infinite;
    }

    /* Card Hover Effects */
    .project-card {
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .project-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 15px 30px -10px rgba(249, 115, 22, 0.15);
      border-color: rgba(249, 115, 22, 0.4);
    }
  `}</style>
);

export default function Portfolio() {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden selection:bg-orange-500 selection:text-white bg-white">
      <GlobalStyles />
      <Navbar scrollToSection={scrollToSection} />
      
      <main className="relative z-10 w-full pt-16 sm:pt-20">
        <HeroSection scrollToSection={scrollToSection} />
        <ServicesSection />
        <SkillsSection />
        <ProjectsSection scrollToSection={scrollToSection} />
        <ExperienceSection />
        <ProcessSection />
        <ContactSection />
      </main>
    </div>
  );
}

function Navbar({ scrollToSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a 
          href="#hero" 
          onClick={(e) => scrollToSection(e, 'hero')}
          className="flex items-center gap-1 cursor-pointer"
        >
          <span className="font-bold text-xl sm:text-2xl text-gray-900 tracking-tight">YH</span>
          <span className="text-orange-500 text-2xl sm:text-3xl leading-none">.</span>
        </a>
        
        <div className="hidden md:flex space-x-8 text-sm font-semibold text-gray-600">
          <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-orange-500 transition-colors">Services</a>
          <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="hover:text-orange-500 transition-colors">Skills</a>
          <a href="#work" onClick={(e) => scrollToSection(e, 'work')} className="hover:text-orange-500 transition-colors">Work</a>
          <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hover:text-orange-500 transition-colors">Experience</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-orange-500 transition-colors">Contact</a>
        </div>

        <a 
          href="#contact" 
          onClick={(e) => scrollToSection(e, 'contact')} 
          className="inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-gray-900 text-white text-xs sm:text-sm font-semibold hover:bg-orange-500 transition-colors duration-300 shadow-sm"
        >
          Let's Talk <ArrowRight size={16} className="ml-2" />
        </a>
      </div>
    </nav>
  );
}

function HeroSection({ scrollToSection }) {
  const fallbackImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";

  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none -z-10"></div>
      
      {/* Mobile Layout: 1. Name -> 2. Image -> 3. Description & CTAs */}
      <div className="lg:hidden flex flex-col items-center text-center space-y-6">
        {/* 1. Name First */}
        <div className="w-full space-y-2">
          <p className="text-xs font-bold tracking-wider text-orange-500 uppercase">
            Hi, I'm
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Yousef <span className="text-orange-500">Hannora</span>
          </h1>
          <h2 className="text-base sm:text-lg font-semibold text-gray-600">
            Software Engineer & Full-Stack Developer
          </h2>
        </div>

        {/* 2. Image Second */}
        <div className="w-full flex justify-center py-2">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gray-100">
            <img 
              src="hero-image.png" 
              alt="Yousef Hannora" 
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 15%' }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackImage;
              }}
            />
          </div>
        </div>

        {/* 3. Description Third */}
        <div className="w-full max-w-md space-y-6">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            I build digital products that solve real problems and create meaningful impact. From idea to deployment, I turn complex challenges into simple, beautiful solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a 
              href="#work" 
              onClick={(e) => scrollToSection(e, 'work')}
              className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold text-sm hover:border-orange-500 hover:text-orange-500 transition-all"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-row items-center justify-between gap-12">
        <div className="w-1/2 space-y-8 animate-fade-up">
          <div>
            <p className="text-sm font-bold tracking-wider text-orange-500 uppercase mb-2">
              Hi, I'm
            </p>
            <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Yousef <span className="text-orange-500">Hannora</span>
            </h1>
            <h2 className="text-2xl font-medium text-gray-600 mt-2">
              Software Engineer & Full-Stack Developer
            </h2>
          </div>
          
          <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
            I build digital products that solve real problems and create meaningful impact. From idea to deployment, I turn complex challenges into simple, beautiful solutions.
          </p>
          
          <div className="flex items-center gap-4 pt-2">
            <a 
              href="#work" 
              onClick={(e) => scrollToSection(e, 'work')}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 group"
            >
              View My Work 
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-semibold hover:border-orange-500 hover:text-orange-500 transition-all duration-300 group"
            >
              Download CV 
              <Download size={18} className="ml-2 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="w-1/2 flex justify-end">
          <div className="relative">
            <div className="w-80 h-96 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl bg-gray-100">
              <img 
                src="hero-image.png" 
                alt="Yousef Hannora" 
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 15%' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackImage;
                }}
              />
            </div>
            
            <div className="absolute -bottom-6 -left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 animate-float">
               <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                 <CheckCircle size={20} />
               </div>
               <div>
                 <p className="text-xs text-gray-500 font-medium">Available for</p>
                 <p className="text-sm font-bold text-gray-900">Freelance Work</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      title: "Full Stack Development",
      desc: "End-to-end web applications built with modern frontend frameworks and scalable backend APIs.",
      icon: <Layers size={28} />
    },
    {
      title: "Web Application Improvement",
      desc: "Upgrading existing apps with modern UI/UX design, cleaner architecture, and new features.",
      icon: <Zap size={28} />
    },
    {
      title: "Third Party Integration",
      desc: "Seamless integration of APIs, payment gateways, authentication systems, and cloud tools.",
      icon: <Globe size={28} />
    },
    {
      title: "Bug Fixation",
      desc: "Isolating and resolving critical bugs, security vulnerabilities, and cross-platform glitches.",
      icon: <Bug size={28} />
    },
    {
      title: "Performance Enhancement",
      desc: "Optimizing website loading speeds, database queries, code size, and Core Web Vitals.",
      icon: <Cpu size={28} />
    }
  ];

  return (
    <section id="services" className="bg-gray-50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Services</h2>
          <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto sm:mx-0"></div>
        </div>

        {/* Responsive Grid: 2 cards per row on mobile, 5 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 flex flex-col justify-between group ${idx === 4 ? 'col-span-2 lg:col-span-1' : ''}`}
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const skills = [
    { name: "JavaScript", icon: <Code2 /> },
    { name: "TypeScript", icon: <Terminal /> },
    { name: "React.js", icon: <Layout /> },
    { name: "Next.js", icon: <Globe /> },
    { name: "Node.js", icon: <Server /> },
    { name: "MongoDB", icon: <Database /> },
    { name: "Tailwind CSS", icon: <PenTool /> },
    { name: "Git & GitHub", icon: <Github /> }
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center sm:text-left mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Skills & Technologies</h2>
        <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto sm:mx-0"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {skills.map((skill, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center justify-center p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-500 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="text-gray-400 group-hover:text-orange-500 mb-2 sm:mb-3 transition-colors">
              {React.cloneElement(skill.icon, { size: 28 })}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection({ scrollToSection }) {
  const projects = [
    {
      title: "CasaNest Procurement",
      category: "B2B Platform",
      desc: "Comprehensive procurement portal converting traditional processes into streamlined digital workflows with real-time analytics.",
      tech: ["Next.js", "TypeScript", "Tailwind", "Node.js"],
      link: "#contact",
      icon: <Layout size={36} className="text-orange-400" />
    },
    {
      title: "PolluScan Dashboard",
      category: "IoT Data Visualization",
      desc: "Industrial dashboard interfacing with IoT sensors for real-time air quality monitoring with interactive data reporting.",
      tech: ["React", "Recharts", "Express", "PostgreSQL"],
      link: "#contact",
      icon: <Activity size={36} className="text-orange-400" />
    },
    {
      title: "E-Commerce AI Workflows",
      category: "AI Integration",
      desc: "Autonomous multi-agent workflows to automate product SEO optimization, descriptions, and market trend analysis.",
      tech: ["Python", "LangChain", "OpenAI", "React"],
      link: "#contact",
      icon: <Smartphone size={36} className="text-orange-400" />
    }
  ];

  return (
    <section id="work" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-10 text-center sm:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Selected Work</h2>
            <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto sm:mx-0"></div>
          </div>
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, 'contact')} 
            className="mt-4 sm:mt-0 inline-flex items-center text-orange-500 font-semibold hover:text-orange-600 transition-colors text-sm group"
          >
            Get In Touch <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="project-card bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm">
              <div className="h-44 sm:h-48 bg-orange-50 flex items-center justify-center p-4 relative">
                 <div className="w-full h-full bg-white rounded-t-xl shadow-xs border border-gray-200 border-b-0 flex items-center justify-center relative">
                    <div className="absolute top-0 w-full h-5 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-1">
                       <div className="w-2 h-2 rounded-full bg-red-400"></div>
                       <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                       <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                    {project.icon}
                 </div>
              </div>

              <div className="p-5 sm:p-6 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {project.title}
                  </h3>
                  <a 
                    href="#contact" 
                    onClick={(e) => scrollToSection(e, 'contact')} 
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mb-5 flex-grow leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const experiences = [
    {
      role: "Web Developer",
      company: "Freelance / Independent",
      period: "2024 - Present",
      desc: "Building scalable web applications and admin dashboards for clients globally, focusing on React, Next.js, and Node."
    },
    {
      role: "Full Stack Intern",
      company: "Tech Solutions Inc.",
      period: "2023 - 2024",
      desc: "Worked on real-world projects and RESTful APIs using the MERN stack in an agile environment."
    },
    {
      role: "Security Researcher",
      company: "Bug Bounty Programs",
      period: "2022 - 2023",
      desc: "Identified and reported vulnerabilities in web applications to build robust web security standards."
    }
  ];

  return (
    <section id="experience" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center sm:text-left mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Experience</h2>
        <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto sm:mx-0"></div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-8 relative before:absolute before:inset-0 before:top-1/2 before:h-0.5 before:w-full before:bg-gray-200 before:-z-10">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-orange-500 border-4 border-white shadow-sm"></div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all text-center group">
               <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Briefcase size={20} />
               </div>
               <h3 className="text-base font-bold text-gray-900">{exp.role}</h3>
               <p className="text-orange-500 font-medium text-xs sm:text-sm mb-1">{exp.company}</p>
               <span className="inline-block px-3 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full font-semibold mb-3">{exp.period}</span>
               <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                 {exp.desc}
               </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View: Vertical line cut right through center of framed cards */}
      <div className="md:hidden relative max-w-md mx-auto space-y-8 py-2">
        {/* Continuous central vertical timeline line */}
        <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-orange-300 z-0"></div>

        {experiences.map((exp, idx) => (
          <div key={idx} className="relative z-10 my-6">
             {/* Framed Experience Card */}
             <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center relative z-10 pt-7">
               {/* Centered Timeline Dot cutting card top center */}
               <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-orange-500 border-4 border-white shadow-md flex items-center justify-center text-white z-20">
                 <Briefcase size={12} />
               </div>

               <h3 className="text-base font-bold text-gray-900">{exp.role}</h3>
               <p className="text-orange-500 font-semibold text-xs mt-0.5">{exp.company}</p>
               <span className="inline-block my-2 px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                 {exp.period}
               </span>
               <p className="text-xs text-gray-600 leading-relaxed">
                 {exp.desc}
               </p>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { num: "01", title: "Discover", desc: "Understand problem deeply.", icon: <Search /> },
    { num: "02", title: "Design", desc: "Plan simple solutions.", icon: <PenTool /> },
    { num: "03", title: "Develop", desc: "Write clean code.", icon: <Code2 /> },
    { num: "04", title: "Deploy", desc: "Test thoroughly & launch.", icon: <Rocket /> },
    { num: "05", title: "Improve", desc: "Monitor & iterate.", icon: <Activity /> }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">My Process</h2>
          <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto sm:mx-0"></div>
        </div>

        {/* Desktop Process View */}
        <div className="hidden md:flex justify-between items-start relative gap-4">
           <div className="absolute top-10 left-10 right-10 h-0.5 border-t-2 border-dashed border-gray-300 z-0"></div>

           {steps.map((step, idx) => (
             <div key={idx} className="relative z-10 flex flex-col items-center text-center w-full">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center text-gray-400 shadow-md mb-3 group hover:border-orange-200 transition-colors">
                   <div className="group-hover:text-orange-500 transition-colors">
                     {React.cloneElement(step.icon, { size: 28 })}
                   </div>
                </div>
                <p className="text-orange-500 font-bold text-xs mb-1">{step.num}</p>
                <h4 className="text-base font-bold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-xs text-gray-500 max-w-[130px]">{step.desc}</p>
             </div>
           ))}
        </div>

        {/* Mobile Process View: Framed cards cut down the center by dotted line */}
        <div className="md:hidden relative max-w-sm mx-auto py-2">
           {/* Center vertical dotted line cutting through cards */}
           <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 border-l-2 border-dashed border-orange-400 z-0"></div>

           {steps.map((step, idx) => (
             <div key={idx} className="relative z-10 my-5">
                {/* Framed card with small shadow */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs text-center relative z-10">
                   <div className="w-12 h-12 bg-orange-50 border-2 border-orange-200 rounded-full flex items-center justify-center text-orange-500 mx-auto mb-2 shadow-xs">
                     {React.cloneElement(step.icon, { size: 22 })}
                   </div>
                   <p className="text-orange-500 font-bold text-xs uppercase tracking-wider mb-0.5">{step.num}</p>
                   <h4 className="text-base font-bold text-gray-900 mb-1">{step.title}</h4>
                   <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <footer id="contact" className="bg-white pt-16 sm:pt-24 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          <div className="max-w-md">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Let's build something <br/> meaningful <span className="text-orange-500">together.</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Feel free to reach out if you're looking for a developer, have a question, or simply want to connect.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div className="space-y-5">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500">
                   <Mail size={18} />
                 </div>
                 <div>
                   <p className="text-xs text-gray-400 font-medium">Email</p>
                   <a href="mailto:contact@yousef.com" className="text-sm text-gray-900 font-semibold hover:text-orange-500 transition-colors">contact@yousef.com</a>
                 </div>
               </div>
               
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500">
                   <Phone size={18} />
                 </div>
                 <div>
                   <p className="text-xs text-gray-400 font-medium">Phone</p>
                   <p className="text-sm text-gray-900 font-semibold">+20 100 000 0000</p>
                 </div>
               </div>

               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500">
                   <MapPin size={18} />
                 </div>
                 <div>
                   <p className="text-xs text-gray-400 font-medium">Location</p>
                   <p className="text-sm text-gray-900 font-semibold">Suez, Egypt</p>
                 </div>
               </div>
            </div>

            <div>
              <p className="text-base font-bold text-gray-900 mb-4">Let's Connect</p>
              <div className="flex gap-3">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all">
                  <Github size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
           <div className="flex items-center gap-1">
             <span className="font-bold text-xl text-gray-900 tracking-tight">YH</span>
             <span className="text-orange-500 text-2xl leading-none">.</span>
           </div>
           <p className="text-gray-400 text-xs font-medium">
             © {new Date().getFullYear()} Yousef Hannora. All rights reserved.
           </p>
        </div>
      </div>
    </footer>
  );
}