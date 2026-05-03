import { GraduationCap } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionShell } from '@/components/ui/SectionShell';
import { education } from '@/data/siteContent';

export const EducationSection = () => {
  return (
    <SectionShell
      title="Education"
      icon={GraduationCap}
    >
      <Reveal direction="left" delay={180}>
        <article className="glass-panel grid gap-6 p-6 md:grid-cols-[140px_1fr] md:items-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-white/85 p-4 shadow-[0_16px_40px_rgba(12,38,74,0.2)]">
            <img src={education.image} alt={education.school} className="max-h-full max-w-full object-contain" />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white">{education.degree}</h3>
            <p className="mt-2 text-lg text-blue-50/88">{education.school}</p>
            <p className="mt-4 inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm text-blue-50/82">
              {education.graduation}
            </p>
          </div>
        </article>
      </Reveal>
    </SectionShell>
  );
};
