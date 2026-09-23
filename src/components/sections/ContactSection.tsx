import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/layout/Logo';
import { ContactItem } from './ContactItem';

export function ContactSection() {
  const { contact, socials } = siteConfig;

  return (
    <footer id="contact" className="bg-white pt-16 sm:pt-24 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-md">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Let&apos;s build something <br /> meaningful <span className="text-orange-500">together.</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Feel free to reach out if you&apos;re looking for a developer, have a question, or simply want to connect.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div className="space-y-5">
              <ContactItem icon={<Mail size={18} />} label="Email" value={contact.email} href={`mailto:${contact.email}`} />
              <ContactItem icon={<Phone size={18} />} label="Phone" value={contact.phone} href={`tel:${contact.phone.replace(/\s+/g, '')}`} />
              <ContactItem icon={<MapPin size={18} />} label="Location" value={contact.location} />
            </div>

            <div>
              <p className="text-base font-bold text-gray-900 mb-4">Let&apos;s Connect</p>
              <div className="flex gap-3">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all"
                >
                  <Github size={18} />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <Logo size="md" />
          <p className="text-gray-400 text-xs font-medium">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
