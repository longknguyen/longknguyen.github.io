import type {ReactNode} from 'react';
import {Reveal} from '@/components/ui/Reveal';
import {SectionHeading} from '@/components/ui/SectionHeading';
import type {SectionId} from '@/data/siteContent';

type SectionShellProps = {
    id: Exclude<SectionId, 'home'>;
    eyebrow?: string;
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
};

export const SectionShell = ({
    id,
    eyebrow,
    title,
    description,
    children,
    className = ''
}: SectionShellProps) => {
    return (
        <section id={id} className={`content-section px-5 py-20 sm:px-8 sm:py-24 ${className}`}>
            <div className="section-panel mx-auto w-full max-w-6xl">
                <Reveal className="mb-10 sm:mb-12" direction="up">
                    <SectionHeading eyebrow={eyebrow} title={title} description={description}/>
                </Reveal>
                {children}
            </div>
        </section>
    );
};
