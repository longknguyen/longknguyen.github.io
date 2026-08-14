import {Reveal} from '@/components/ui/Reveal';
import {SectionShell} from '@/components/ui/SectionShell';
import {education} from '@/data/siteContent';

export const EducationSection = () => {
    return (
        <SectionShell id="education" title="Education">
            <Reveal direction="up" delay={100}>
                <article className="education-card mx-auto grid max-w-4xl gap-7 p-7 sm:p-9 md:grid-cols-[150px_1fr] md:items-center">
                    <div className="education-logo mx-auto flex h-32 w-32 items-center justify-center rounded-[1.5rem] p-5">
                        <img src={education.image} alt={education.school} className="max-h-full max-w-full object-contain"/>
                    </div>

                    <div className="text-center md:text-left">
                        <h3 className="heading-text text-2xl font-bold sm:text-3xl">{education.degree}</h3>
                        <p className="body-copy mt-2 text-lg">{education.school}</p>
                        <p className="tag-pill mt-5 inline-flex rounded-full px-4 py-2 text-sm">
                            {education.graduation}
                        </p>
                    </div>
                </article>
            </Reveal>
        </SectionShell>
    );
};
