import {useCallback, useEffect, useState} from 'react';
import {navigationItems, type SectionId} from '@/data/siteContent';

const sectionIds = navigationItems.map(({id}) => id);

const isSectionId = (value: string): value is SectionId =>
    sectionIds.includes(value as SectionId);

const getSectionFromHash = (): SectionId => {
    const section = window.location.hash.slice(1);
    return isSectionId(section) ? section : 'home';
};

const scrollToSection = (sectionId: SectionId, behavior: ScrollBehavior) => {
    document.getElementById(sectionId)?.scrollIntoView({behavior, block: 'start'});
};

export const useSectionNavigation = () => {
    const [activeSection, setActiveSection] = useState<SectionId>(getSectionFromHash);

    const navigateTo = useCallback((sectionId: SectionId) => {
        setActiveSection(sectionId);

        if (window.location.hash !== `#${sectionId}`) {
            window.history.pushState(null, '', `#${sectionId}`);
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        scrollToSection(sectionId, prefersReducedMotion ? 'auto' : 'smooth');
    }, []);

    useEffect(() => {
        let animationFrame = 0;

        const updateActiveSection = () => {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = window.requestAnimationFrame(() => {
                const marker = window.scrollY + window.innerHeight * 0.36;
                let currentSection: SectionId = 'home';

                for (const sectionId of sectionIds) {
                    const section = document.getElementById(sectionId);

                    if (section && section.offsetTop <= marker) {
                        currentSection = sectionId;
                    }
                }

                setActiveSection((current) => current === currentSection ? current : currentSection);

                if (window.location.hash !== `#${currentSection}`) {
                    window.history.replaceState(null, '', `#${currentSection}`);
                }
            });
        };

        const handlePopState = () => {
            const sectionId = getSectionFromHash();
            setActiveSection(sectionId);
            scrollToSection(sectionId, 'smooth');
        };

        window.addEventListener('scroll', updateActiveSection, {passive: true});
        window.addEventListener('resize', updateActiveSection);
        window.addEventListener('popstate', handlePopState);
        updateActiveSection();

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener('scroll', updateActiveSection);
            window.removeEventListener('resize', updateActiveSection);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return {activeSection, navigateTo};
};
