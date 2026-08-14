import {Menu, Moon, Sun, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import type {NavigationItem, SectionId} from '@/data/siteContent';
import type {Theme} from '@/hooks/useTheme';

type NavigationProps = {
    items: NavigationItem[];
    activeSection: SectionId;
    theme: Theme;
    onToggleTheme: () => void;
    onNavigate: (sectionId: SectionId) => void;
};

export const Navigation = ({items, activeSection, theme, onToggleTheme, onNavigate}: NavigationProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const isCompact = activeSection !== 'home';

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

    const handleNavigate = (sectionId: SectionId) => {
        onNavigate(sectionId);
        setIsOpen(false);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-5">
            <div className={`nav-shell mx-auto flex items-center justify-between px-3 py-2.5 ${isCompact ? 'nav-shell-compact' : ''}`}>
                <button
                    type="button"
                    className="nav-brand rounded-full text-xs font-bold uppercase tracking-[0.2em] transition"
                    aria-label="Go to Home"
                    onClick={() => handleNavigate('home')}
                >
                    <span className="nav-brand-full">Long Nguyen</span>
                    <span className="nav-brand-short" aria-hidden="true">LN</span>
                </button>

                <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
                    {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                className={`nav-link rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? 'nav-link-active' : ''}`}
                                aria-current={isActive ? 'page' : undefined}
                                title={isCompact && !isActive ? item.label : undefined}
                                onClick={() => handleNavigate(item.id)}
                            >
                                <Icon className="nav-link-icon shrink-0" aria-hidden="true"/>
                                <span className="nav-link-label">{item.label}</span>
                            </button>
                        );
                    })}
                    <span className="nav-theme-divider" aria-hidden="true"/>
                    <button
                        type="button"
                        className="theme-toggle inline-flex h-9 w-8 items-center justify-center transition"
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        onClick={onToggleTheme}
                    >
                        {theme === 'light' ? <Moon className="h-4 w-4"/> : <Sun className="h-4 w-4"/>}
                    </button>
                </nav>

                <div className="flex items-center md:hidden">
                    <button
                        type="button"
                        className="theme-toggle inline-flex h-11 w-11 items-center justify-center transition"
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        onClick={onToggleTheme}
                    >
                        {theme === 'light' ? <Moon className="h-4 w-4"/> : <Sun className="h-4 w-4"/>}
                    </button>
                    <span className="mobile-theme-divider" aria-hidden="true"/>
                    <button
                        type="button"
                        className="mobile-menu-toggle inline-flex h-11 w-11 items-center justify-center rounded-full transition"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                        onClick={() => setIsOpen((current) => !current)}
                    >
                        {isOpen ? <X className="h-4 w-4"/> : <Menu className="h-4 w-4"/>}
                    </button>
                </div>
            </div>

            <div
                className={`nav-mobile-panel mx-auto mt-2 max-w-4xl overflow-hidden rounded-[1.5rem] transition-all duration-300 md:hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
                }`}
            >
                <nav className="flex flex-col gap-1 p-3" aria-label="Mobile navigation">
                    {items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                className={`nav-link rounded-xl px-4 py-3 text-left text-sm font-medium transition ${activeSection === item.id ? 'nav-link-active' : ''}`}
                                aria-current={activeSection === item.id ? 'page' : undefined}
                                onClick={() => handleNavigate(item.id)}
                            >
                                <Icon className="nav-link-icon shrink-0" aria-hidden="true"/>
                                <span className="nav-link-label">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
};
