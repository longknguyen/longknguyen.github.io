import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { NavigationItem } from '@/data/siteContent';

type NavigationProps = {
  items: NavigationItem[];
  activeSection: string;
  onNavigate: (sectionId: NavigationItem['id']) => void;
};

export const Navigation = ({ items, activeSection, onNavigate }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, [isOpen]);

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8 lg:pt-7">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/12 bg-slate-900/28 px-3 py-3 shadow-[0_18px_60px_rgba(7,25,51,0.36)] backdrop-blur-2xl">
        <button
          type="button"
          className="rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-white/92 transition hover:bg-white/10"
          onClick={() => handleNavigate('home')}
        >
          Long Nguyen
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {items.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                  isActive
                    ? 'bg-white/14 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
                    : 'text-blue-50/72 hover:bg-white/8 hover:text-white'
                }`}
                onClick={() => handleNavigate(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:bg-white/14 md:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`mx-auto mt-3 max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/12 bg-slate-950/36 shadow-[0_18px_60px_rgba(7,25,51,0.24)] backdrop-blur-2xl transition-all duration-300 md:hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-2 p-3">
          {items.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  isActive ? 'bg-white/18 text-white' : 'text-blue-50/80 hover:bg-white/10'
                }`}
                onClick={() => handleNavigate(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
