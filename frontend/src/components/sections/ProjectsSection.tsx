import {ExternalLink} from 'lucide-react';
import {Reveal} from '@/components/ui/Reveal';
import {SectionShell} from '@/components/ui/SectionShell';
import {projects} from '@/data/siteContent';

export const ProjectsSection = () => {
    return (
        <SectionShell id="projects" title="Projects">
            <div className="space-y-7 sm:space-y-9">
                {projects.map((project, index) => (
                    <Reveal key={project.title} direction="up" delay={80 + index * 70}>
                        <article className="project-card grid overflow-hidden lg:grid-cols-2">
                            <div className={`project-media min-h-64 overflow-hidden ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                <img
                                    src={project.image}
                                    alt={`${project.title} preview`}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full min-h-64 w-full object-cover transition duration-700"
                                />
                            </div>

                            <div className={`flex flex-col justify-center p-7 sm:p-9 lg:p-11 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="tag-pill rounded-full px-3 py-1.5 text-xs font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="heading-text mt-6 text-2xl font-bold sm:text-3xl">{project.title}</h3>
                                <p className="body-copy mt-4 text-sm leading-7 sm:text-base">{project.description}</p>

                                <a
                                    href={project.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-link mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold transition"
                                >
                                    View repository
                                    <ExternalLink className="h-4 w-4" aria-hidden="true"/>
                                </a>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </SectionShell>
    );
};
