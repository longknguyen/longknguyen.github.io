import { ArrowRight, Download } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { heroContent, socialLinks } from '@/data/siteContent';

type HeroSectionProps = {
  onNavigate: (sectionId: 'projects' | 'contact') => void;
};

export const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <div
      data-section-panel
      className="hero-stage w-full max-w-3xl px-6 py-8 text-center sm:px-8 sm:py-10"
    >
      <div className="space-y-5">
        <Reveal direction="scale" delay={100}>
          <div className="relative mx-auto flex w-full justify-center">
            <div className="hero-portrait-glow absolute inset-0 mx-auto h-52 w-52 rounded-full" />
            <img
              src={heroContent.image}
              alt="Long Nguyen"
              className="relative h-44 w-44 rounded-full border-4 border-white/70 object-cover object-center shadow-[0_20px_40px_rgba(12,38,74,0.35)] sm:h-48 sm:w-48"
            />
          </div>
        </Reveal>

        <Reveal direction="up" delay={180}>
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-sky-100/24 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-blue-50/80">
              {heroContent.eyebrow}
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-[3.2rem]">
              {heroContent.title}
            </h1>
            <p className="mx-auto max-w-xl text-base leading-8 text-blue-50/78 sm:text-lg">{heroContent.summary}</p>
          </div>
        </Reveal>

        <Reveal direction="up" delay={280}>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white px-5 py-3 text-sm font-semibold text-blue-800 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
              onClick={() => onNavigate('projects')}
            >
              View projects
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/16"
              onClick={() => onNavigate('contact')}
            >
              Contact me
              <Download className="h-4 w-4" />
            </button>
          </div>
        </Reveal>

        <Reveal direction="up" delay={360}>
          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2.5 text-sm text-blue-50/84 transition duration-300 hover:-translate-y-0.5 hover:bg-white/16 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};
