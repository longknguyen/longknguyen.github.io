import type {LucideIcon} from 'lucide-react';
import type {ReactNode} from 'react';
import {Reveal} from '@/components/ui/Reveal';
import {SectionHeading} from '@/components/ui/SectionHeading';

type SectionShellProps = {
    eyebrow?: string;
    title: string;
    description?: string;
    children: ReactNode;
    icon?: LucideIcon;
    className?: string;
};

export const SectionShell = ({
                                 eyebrow,
                                 title,
                                 description,
                                 children,
                                 icon: Icon,
                                 className = ''
                             }: SectionShellProps) => {
    return (
        <div data-section-panel
             className={`w-full max-w-5xl rounded-[2rem] border border-white/10 bg-slate-900/22 p-6 shadow-[0_30px_80px_rgba(7,25,51,0.28)] backdrop-blur-2xl sm:p-8 lg:p-10 ${className}`}>
            <Reveal className="mb-8" direction="up" delay={80}>
                <div className="mb-5 flex items-center gap-3">
                    {Icon ? (
                        <span
                            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              <Icon className="h-5 w-5"/>
            </span>
                    ) : null}
                    <SectionHeading eyebrow={eyebrow} title={title} description={description}/>
                </div>
            </Reveal>
            {children}
        </div>
    );
};
