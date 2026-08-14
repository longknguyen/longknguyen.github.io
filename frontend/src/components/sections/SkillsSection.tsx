import {Fragment} from 'react';
import {Reveal} from '@/components/ui/Reveal';
import {SectionShell} from '@/components/ui/SectionShell';
import {skillGroups} from '@/data/siteContent';

export const SkillsSection = () => {
    return (
        <SectionShell id="skills" title="Skills" className="section-muted">
            <div className="skills-list">
                {skillGroups.map(({title, items}, index) => (
                    <Fragment key={title}>
                        <Reveal direction="up" delay={70 + index * 60}>
                            <div className="skill-row grid gap-5 py-7 sm:grid-cols-[180px_1fr] sm:items-start sm:py-8">
                                <h3 className="heading-text text-lg font-bold">{title}</h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {items.map((item) => (
                                        <span key={item} className="skill-pill rounded-full px-4 py-2 text-sm">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                        {index < skillGroups.length - 1 ? <div className="section-divider"/> : null}
                    </Fragment>
                ))}
            </div>
        </SectionShell>
    );
};
