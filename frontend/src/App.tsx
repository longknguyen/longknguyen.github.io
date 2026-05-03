import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties} from 'react';
import {Navigation} from '@/components/layout/Navigation';
import {navigationItems} from '@/data/siteContent';
import {
    ContactPage,
    EducationPage,
    HomePage,
    ProjectsPage,
    SkillsPage
} from '@/pages';

const SECTION_IDS = navigationItems.map((item) => item.id);
const TRANSITION_MS = 520;

type SectionId = 'home' | 'projects' | 'skills' | 'education' | 'contact';

const isSectionId = (value: string): value is SectionId =>
    SECTION_IDS.includes(value as SectionId);

const App = () => {
    const initialSection = useMemo<SectionId>(() => {
        const hashSection = window.location.hash.replace('#', '');
        return isSectionId(hashSection) ? hashSection : 'home';
    }, []);

    const [activeSection, setActiveSection] = useState<SectionId>(initialSection);
    const [previousSection, setPreviousSection] = useState<SectionId | null>(null);
    const [previousContentFits, setPreviousContentFits] = useState(true);
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [contentFits, setContentFits] = useState(true);
    const scrollRegionRef = useRef<HTMLDivElement | null>(null);
    const transitionTimerRef = useRef<number | null>(null);
    const wheelLockRef = useRef(false);

    const syncHash = useCallback((sectionId: SectionId) => {
        if (window.location.hash !== `#${sectionId}`) {
            window.history.pushState(null, '', `#${sectionId}`);
        }
    }, []);

    const measureCurrentSection = () => {
        const region = scrollRegionRef.current;

        if (!region) {
            return;
        }

        const fits = region.scrollHeight <= region.clientHeight + 2;
        setContentFits(fits);
    };

    const goToSection = useCallback((nextSection: SectionId) => {
        if (nextSection === activeSection || isTransitioning) {
            return;
        }

        const currentIndex = SECTION_IDS.indexOf(activeSection);
        const nextIndex = SECTION_IDS.indexOf(nextSection);

        setDirection(nextIndex > currentIndex ? 'forward' : 'backward');
        setPreviousSection(activeSection);
        setPreviousContentFits(contentFits);
        setActiveSection(nextSection);
        setIsTransitioning(true);
        syncHash(nextSection);

        if (transitionTimerRef.current) {
            window.clearTimeout(transitionTimerRef.current);
        }

        transitionTimerRef.current = window.setTimeout(() => {
            setPreviousSection(null);
            setIsTransitioning(false);
            wheelLockRef.current = false;
        }, TRANSITION_MS);
    }, [activeSection, contentFits, isTransitioning, syncHash]);

    useEffect(() => {
        syncHash(initialSection);
    }, [initialSection]);

    useEffect(() => {
        const initialLoadTimer = window.setTimeout(() => {
            setIsInitialLoad(false);
        }, TRANSITION_MS + 120);

        return () => {
            window.clearTimeout(initialLoadTimer);
        };
    }, []);

    useLayoutEffect(() => {
        measureCurrentSection();

        const region = scrollRegionRef.current;
        if (!region) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => {
            measureCurrentSection();
        });

        resizeObserver.observe(region);
        Array.from(region.children).forEach((child) => {
            if (child instanceof HTMLElement) {
                resizeObserver.observe(child);
            }
        });

        window.addEventListener('resize', measureCurrentSection);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', measureCurrentSection);
        };
    }, [activeSection]);

    useEffect(() => {
        const onPopState = () => {
            const hashSection = window.location.hash.replace('#', '');
            if (isSectionId(hashSection)) {
                goToSection(hashSection);
            }
        };

        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, [goToSection]);

    const renderSection = (sectionId: SectionId) => {
        switch (sectionId) {
            case 'home':
                return <HomePage onNavigate={goToSection}/>;
            case 'projects':
                return <ProjectsPage/>;
            case 'skills':
                return <SkillsPage/>;
            case 'education':
                return <EducationPage/>;
            case 'contact':
                return <ContactPage/>;
        }
    };

    useEffect(() => {
        return () => {
            if (transitionTimerRef.current) {
                window.clearTimeout(transitionTimerRef.current);
            }
        };
    }, []);

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        const region = scrollRegionRef.current;

        if (!region || isTransitioning || wheelLockRef.current) {
            return;
        }

        const nextDelta = event.deltaY;
        if (Math.abs(nextDelta) < 18) {
            return;
        }

        const canScrollDown = region.scrollTop + region.clientHeight < region.scrollHeight - 2;
        const canScrollUp = region.scrollTop > 2;

        if (nextDelta > 0) {
            if (canScrollDown) {
                return;
            }

            const currentIndex = SECTION_IDS.indexOf(activeSection);
            const nextSection = SECTION_IDS[currentIndex + 1] as SectionId | undefined;
            if (nextSection) {
                event.preventDefault();
                wheelLockRef.current = true;
                goToSection(nextSection);
            }
            return;
        }

        if (canScrollUp) {
            return;
        }

        const currentIndex = SECTION_IDS.indexOf(activeSection);
        const previous = SECTION_IDS[currentIndex - 1] as SectionId | undefined;
        if (previous) {
            event.preventDefault();
            wheelLockRef.current = true;
            goToSection(previous);
        }
    };

    return (
        <div className="app-frame">
            <div
                className="app-shell relative flex h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top,#284a7a_0%,#102847_34%,#071220_72%,#050b16_100%)] text-slate-50">
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="ambient-orb left-[8%] top-24 h-64 w-64"
                    style={{'--orb-color': 'rgba(74, 163, 255, 0.24)'} as CSSProperties}
                />
                <div
                    className="ambient-orb right-[10%] top-[18rem] h-72 w-72 [animation-delay:300ms]"
                    style={{'--orb-color': 'rgba(191, 219, 254, 0.14)'} as CSSProperties}
                />
                <div
                    className="ambient-orb bottom-24 left-1/2 h-80 w-80 -translate-x-1/2 [animation-delay:600ms]"
                    style={{'--orb-color': 'rgba(103, 232, 249, 0.12)'} as CSSProperties}
                />
                <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_18%,transparent_84%,rgba(255,255,255,0.03))]"/>
            </div>

            <div className={`relative z-20 shrink-0 ${isInitialLoad ? 'page-nav-enter' : ''}`}>
                <Navigation
                    items={navigationItems}
                    activeSection={activeSection}
                    onNavigate={(sectionId) => {
                        if (isSectionId(sectionId)) {
                            goToSection(sectionId);
                        }
                    }}
                />
            </div>

            <main
                className="relative z-10 min-h-0 flex-1 overflow-hidden px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-5 lg:px-8 lg:pb-10 lg:pt-6"
                onWheel={handleWheel}>
                <div className="relative h-full overflow-hidden">
                    {previousSection ? (
                        <div
                            className={`page-layer ${
                                direction === 'forward' ? 'page-layer-exit-up' : 'page-layer-exit-down'
                            } page-layer-previous`}
                        >
                            <div
                                className={previousContentFits ? 'page-shell page-shell-center' : 'page-shell page-shell-start'}>
                                {renderSection(previousSection)}
                            </div>
                        </div>
                    ) : null}

                    <div
                        className={`page-layer ${
                            isInitialLoad
                                ? 'page-layer-initial'
                                : isTransitioning
                                    ? direction === 'forward'
                                        ? 'page-layer-enter-up'
                                        : 'page-layer-enter-down'
                                    : 'page-layer-active'
                        }`}
                    >
                        <div
                            ref={scrollRegionRef}
                            className={`page-scroll-region ${contentFits ? 'page-shell-center' : 'page-shell-start'}`}
                        >
                            {renderSection(activeSection)}
                        </div>
                    </div>
                </div>
            </main>
            </div>
        </div>
    );
};

export default App;
