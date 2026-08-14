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

const getPreferredScrollBehavior = (): ScrollBehavior =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

export const useSectionNavigation = () => {
    const [activeSection, setActiveSection] = useState<SectionId>(getSectionFromHash);

    const navigateTo = useCallback((sectionId: SectionId) => {
        setActiveSection(sectionId);

        if (window.location.hash !== `#${sectionId}`) {
            window.history.pushState(null, '', `#${sectionId}`);
        }

        scrollToSection(sectionId, getPreferredScrollBehavior());
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
            scrollToSection(sectionId, getPreferredScrollBehavior());
        };

        const initialSection = getSectionFromHash();

        window.addEventListener('scroll', updateActiveSection, {passive: true});
        window.addEventListener('resize', updateActiveSection);
        window.addEventListener('popstate', handlePopState);
        window.addEventListener('hashchange', handlePopState);

        animationFrame = window.requestAnimationFrame(() => {
            scrollToSection(initialSection, 'auto');
            updateActiveSection();
        });

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener('scroll', updateActiveSection);
            window.removeEventListener('resize', updateActiveSection);
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('hashchange', handlePopState);
        };
    }, []);

    return {activeSection, navigateTo};
};
