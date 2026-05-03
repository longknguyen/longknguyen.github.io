import { Fragment } from 'react';
import { Sparkles } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionShell } from '@/components/ui/SectionShell';
import { skillGroups } from '@/data/siteContent';

export const SkillsSection = () => {
  return (
    <SectionShell
      title="Skills"
      icon={Sparkles}
    >
      <div className="space-y-8">
        {skillGroups.map(({ title, items }, index) => (
          <Fragment key={title}>
            <Reveal direction={index % 2 === 0 ? 'left' : 'right'} delay={160 + index * 90}>
              <div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  {items.map((item) => (
                    <span key={item} className="rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm text-blue-50/84">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            {index < skillGroups.length - 1 ? (
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/16 to-transparent" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </SectionShell>
  );
};
