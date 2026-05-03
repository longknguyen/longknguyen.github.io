import {ExternalLink, FolderKanban} from 'lucide-react';
import {Reveal} from '@/components/ui/Reveal';
import {SectionShell} from '@/components/ui/SectionShell';
import {projects} from '@/data/siteContent';

export const ProjectsSection = () => {
    return (
        <SectionShell
            title="Projects"
            icon={FolderKanban}
        >
            <div className="grid items-start gap-5 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <Reveal key={project.title} direction={index % 2 === 0 ? 'up' : 'scale'} delay={160 + index * 110}>
                        <article className="glass-panel flex flex-col overflow-hidden">
                            <div className="relative overflow-hidden rounded-[1.5rem]">
                                <img
                                    src={project.image}
                                    alt={`${project.title} preview`}
                                    className="h-56 w-full object-cover transition duration-700 hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(7,25,51,0.5)_100%)]"/>
                            </div>

                            <div className="flex flex-col p-6">
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag}
                                              className="rounded-full border border-white/16 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-blue-50/80">
                      {tag}
                    </span>
                                    ))}
                                </div>

                                <h3 className="mt-5 text-2xl font-semibold text-white">{project.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-blue-50/78">{project.description}</p>

                                <a
                                    href={project.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-100 transition hover:text-white"
                                >
                                    View repository
                                    <ExternalLink className="h-4 w-4"/>
                                </a>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </SectionShell>
    );
};
