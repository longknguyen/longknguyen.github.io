import {Reveal} from '@/components/ui/Reveal';
import {ParticleField} from '@/components/ui/ParticleField';
import {heroContent, socialLinks, type SectionId} from '@/data/siteContent';

type HeroSectionProps = {
    onNavigate: (sectionId: SectionId) => void;
};

export const HeroSection = ({onNavigate}: HeroSectionProps) => {
    return (
        <section id="home" className="hero-section flex min-h-svh scroll-mt-0 items-center px-5 py-32 sm:px-8">
            <ParticleField/>

            <div className="hero-content relative z-10 mx-auto w-full max-w-3xl text-center">
                <Reveal direction="scale" delay={80}>
                    <img
                        src={heroContent.image}
                        alt="Long Nguyen"
                        className="profile-image mx-auto h-36 w-36 rounded-full border-4 object-cover object-center sm:h-40 sm:w-40"
                    />
                </Reveal>

                <Reveal direction="up" delay={160}>
                    <div className="mt-7">
                        <span className="hero-badge inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
                            {heroContent.eyebrow}
                        </span>
                        <h1 className="hero-title mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
                            {heroContent.title}
                        </h1>
                        <p className="hero-summary mx-auto mt-5 max-w-2xl text-base leading-8 sm:text-lg">
                            {heroContent.summary}
                        </p>
                    </div>
                </Reveal>

                <Reveal direction="up" delay={250}>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <button
                            type="button"
                            className="hero-primary-button inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition"
                            onClick={() => onNavigate('projects')}
                        >
                            View projects
                        </button>
                        <button
                            type="button"
                            className="hero-secondary-button rounded-full px-6 py-3 text-sm font-semibold transition"
                            onClick={() => onNavigate('contact')}
                        >
                            Contact me
                        </button>
                    </div>
                </Reveal>

                <Reveal direction="up" delay={330}>
                    <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                        {socialLinks.map(({href, icon: Icon, label}) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="hero-social-link inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition"
                            >
                                <Icon className="h-4 w-4"/>
                                {label}
                            </a>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
